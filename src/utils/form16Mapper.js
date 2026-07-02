/**
 * form16Mapper.js
 * 
 * Intelligent mapper that converts the Form 16 extractor API response
 * into structured ITR store fields (details, income, taxes, etc.)
 * 
 * API Response shape (from the extractor at /extract):
 * {
 *   success: true,
 *   data: {
 *     employee: { pan, details },
 *     employer: { details },
 *     deductor: { tan, pan },
 *     salary_details: {
 *       salary_u_s_17_1, perquisites_17_2, profit_in_lieu_17_3,
 *       gross_salary, allowances_exempt_u_s_10, hra_exemption,
 *       standard_deduction, net_salary, professional_tax,
 *       entertainment_allowance, net_taxable_salary,
 *       gross_total_income, total_tds_deducted, net_tax_payable,
 *       ...
 *     },
 *     deductions: {
 *       section_80C, section_80D, section_80E, section_80G,
 *       section_80CCD_1B, total_deductions, ...
 *     },
 *     assessment_year,
 *     employer_period: { from, to },
 *     quarterly_tds: [ { quarter, amount_paid, tax_deducted } ],
 *     challan_details: [ { sl_no, tax_deposited, bsr_code, date, serial } ]
 *   }
 * }
 */

import { statesList } from '@/config/constant';

const parseAmount = (val) => {
  if (val === null || val === undefined || val === '') return 0;
  const num = parseFloat(String(val).replace(/,/g, ''));
  return isNaN(num) ? 0 : Math.round(num);
};

/**
 * Parses an employee address string from Form 16
 * into individual parts (flatNo, roadStreet, city, state, pincode)
 */
const parseEmployeeAddress = (addressStr) => {
  if (!addressStr) return {};
  const lines = addressStr.split('\n').map(l => l.trim()).filter(Boolean);

  let flatNo = '';
  let roadStreet = '';
  let areaLocality = '';
  let city = '';
  let state = '';
  let pincode = '';

  if (lines.length >= 2) {
    const addrParts = lines[1].split(',').map(p => p.trim());
    flatNo = addrParts[0] || '';
    roadStreet = addrParts[1] || '';
    areaLocality = addrParts[2] || '';
  }

  const lastLine = lines[lines.length - 1] || '';
  const pinMatch = lastLine.match(/\d{6}/);
  if (pinMatch) pincode = pinMatch[0];

  const segments = lastLine.split('-').map(s => s.trim());
  if (segments.length >= 1) {
    const citySplit = segments[0].split(',');
    city = citySplit[0]?.trim() || '';
  }
  if (segments.length >= 2) {
    state = segments[1].replace(/\d{6}/, '').trim();
  }

  return { flatNo, roadStreet, areaLocality, city, state, pincode };
};

/**
 * Parses a name string into first/middle/last
 */
const parseName = (nameStr) => {
  if (!nameStr) return {};
  const parts = nameStr.trim().split(/\s+/).filter(Boolean);
  const firstName = parts[0] || '';
  const lastName = parts.length > 1 ? parts[parts.length - 1] : '';
  const middleName = parts.length > 2 ? parts.slice(1, -1).join(' ') : '';
  return { firstName, middleName, lastName };
};

/**
 * Extracts TDS rows from challan_details for the taxes > tds section
 */
const buildTdsRows = (challanDetails = [], employerName = '', tanDeductor = '') => {
  const rows = challanDetails
    .filter(c => parseAmount(c.tax_deposited) > 0)
    .map((c, idx) => ({
      slNo: idx + 1,
      tanDeductor: tanDeductor,
      nameDeductor: employerName,
      grossAmountPaid: 0,
      taxDeductedSalary: parseAmount(c.tax_deposited),
      tdsClaimedThisYear: parseAmount(c.tax_deposited),
      bsrCode: c.bsr_code || '',
      dateDeposit: c.date || '',
      challanSerialNo: c.serial || '',
    }));
  return rows;
};

/**
 * Extracts structured data from the raw API response.
 *
 * The extractor API can return two shapes:
 *  (A) Pages-based: { filename, total_pages, pages: [{text, tables}] }
 *  (B) Structured:  { data: { employee, employer, salary_details, deductions, ... } }
 *
 * This function normalises both into a single `resData` object.
 */
const extractStructuredData = (apiResponse) => {
  // Shape C — new structuredData format
  if (apiResponse?.structuredData) {
    const sd = apiResponse.structuredData;
    return {
      employee: {
        pan: sd.employee?.pan || '',
        details: sd.employee?.name || '',
      },
      employer: {
        details: sd.employer?.name || '',
        pan: sd.employer?.pan || '',
        tan: sd.employer?.tan || '',
      },
      deductor: {
        tan: sd.employer?.tan || '',
        pan: sd.employer?.pan || '',
      },
      salary_details: {
        salary_u_s_17_1: sd.salary?.salary17_1 || 0,
        salary_17_1: sd.salary?.salary17_1 || 0,
        perquisites_17_2: sd.salary?.perquisites17_2 || 0,
        profit_in_lieu_17_3: sd.salary?.profits17_3 || 0,
        standard_deduction: sd.salary?.standardDeduction || 0,
        net_taxable_salary: sd.salary?.incomeChargeableSalaries || 0,
        income_chargeable_salaries: sd.salary?.incomeChargeableSalaries || 0,
        gross_salary: (sd.salary?.salary17_1 || 0) + (sd.salary?.perquisites17_2 || 0) + (sd.salary?.profits17_3 || 0),
        total_tds_deducted: sd.taxes?.netTaxPayable || sd.taxes?.taxPayable || 0,
      },
      taxes: {
        taxOnIncome: sd.taxes?.taxOnIncome || 0,
        healthEducationCess: sd.taxes?.healthEducationCess || 0,
        taxPayable: sd.taxes?.taxPayable || 0,
        netTaxPayable: sd.taxes?.netTaxPayable || 0,
      },
      deductions: {
        section_80C: sd.deductions?.section80C || 0,
        section_80D: sd.deductions?.section80D || 0,
        total_deductions: sd.deductions?.totalDeductions || 0,
      },
      quarterly_tds: [],
      challan_details: [],
      assessment_year: sd.assessment?.assessmentYear || '2025-26',
      employer_period: {
        from: sd.assessment?.periodFrom || '',
        to: sd.assessment?.periodTo || '',
      },
    };
  }

  // Shape B — already structured
  if (apiResponse?.data?.employee || apiResponse?.data?.salary_details) {
    return apiResponse.data;
  }

  // Shape A — raw pages, parse text with regex
  const pages = apiResponse?.pages || [];
  const fullText = pages.map(p => p?.text || '').join('\n');

  // ── Employee info ─────────────────────────────────────────────────────────
  const employeeNameMatch = fullText.match(/Name and address of the Employee.*?\n([A-Z][A-Z ]+)\n/s);
  const employeeName = employeeNameMatch?.[1]?.trim() || '';

  const employeeAddrMatch = fullText.match(/Name and address of the Employee.*?\n[A-Z][A-Z ]+\n([\s\S]+?)\n(?:PAN of the|$)/);
  const employeeAddr = employeeAddrMatch?.[1]?.trim() || '';

  const employeePanMatch = fullText.match(/PAN of the\s+Employee[^\n]*\n([A-Z]{5}[0-9]{4}[A-Z])/);
  const employeePan = employeePanMatch?.[1]?.trim() || '';

  // ── Employer info ─────────────────────────────────────────────────────────
  const employerNameMatch = fullText.match(/Name and address of the Employer[^\n]*\n([A-Z][A-Z ]+)\n/);
  const employerName = employerNameMatch?.[1]?.trim() || '';

  const tanMatch = fullText.match(/TAN of the Deductor\s+([A-Z]{4}[0-9]{5}[A-Z])/);
  const tanDeductor = tanMatch?.[1]?.trim() || '';

  const deductorPanMatch = fullText.match(/PAN of the Deductor\s+([A-Z]{5}[0-9]{4}[A-Z])/);
  const deductorPan = deductorPanMatch?.[1]?.trim() || '';

  // ── Quarterly summary ──────────────────────────────────────────────────────
  // Extracts lines like: Q1 QVUIPVBE 175800.00 0.00 0.00
  const quarterlyRows = [];
  const quarterPattern = /(Q[1-4])\s+\S+\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g;
  let qm;
  while ((qm = quarterPattern.exec(fullText)) !== null) {
    quarterlyRows.push({
      quarter: qm[1],
      amount_paid: qm[2],
      tax_deducted: qm[3],
      tax_deposited: qm[4],
    });
  }

  // Total TDS from "Total (Rs.) ..." line
  const totalLineMatch = fullText.match(/Total \(Rs\.\)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
  const totalAmountPaid = parseAmount(totalLineMatch?.[1]);
  const totalTdsDeducted = parseAmount(totalLineMatch?.[2]);

  // ── Challan details ────────────────────────────────────────────────────────
  const challanRows = [];
  // Matches: 9 6761.00 6910013 06-01-2025 18782 F
  const challanPattern = /(\d+)\s+([\d.]+)\s+(\d{7})\s+(\d{2}-\d{2}-\d{4})\s+(\d+)\s+F/g;
  let cm;
  while ((cm = challanPattern.exec(fullText)) !== null) {
    challanRows.push({
      sl_no: cm[1],
      tax_deposited: cm[2],
      bsr_code: cm[3],
      date: cm[4],
      serial: cm[5],
    });
  }

  // Assessment year
  const ayMatch = fullText.match(/Assessment Year\s+(\d{4}-\d{2})/);
  const assessmentYear = ayMatch?.[1] || '2025-26';

  // Period
  const fromMatch = fullText.match(/From\s+(\d{2}-\w{3}-\d{4})/);
  const toMatch = fullText.match(/To\s+(\d{2}-\w{3}-\d{4})/);

  return {
    employee: {
      pan: employeePan,
      details: `${employeeName}\n${employeeAddr}`,
    },
    employer: {
      details: employerName,
    },
    deductor: {
      tan: tanDeductor,
      pan: deductorPan,
    },
    salary_details: {
      gross_salary: totalAmountPaid,
      total_tds_deducted: totalTdsDeducted,
    },
    deductions: {},
    quarterly_tds: quarterlyRows,
    challan_details: challanRows,
    assessment_year: assessmentYear,
    employer_period: {
      from: fromMatch?.[1] || '',
      to: toMatch?.[1] || '',
    },
  };
};

const mapStateName = (stateStr) => {
  if (!stateStr) return '';
  const lower = stateStr.toLowerCase().trim();
  const matched = statesList.find(s => s.value.toLowerCase() === lower || s.label.toLowerCase() === lower);
  if (matched) return matched.value;

  const lowerTrimmed = lower.replace(/[^a-z]/g, '');
  if (lowerTrimmed === 'delhi' || lowerTrimmed === 'newdelhi') return 'Delhi';
  if (lowerTrimmed === 'maharashtra' || lowerTrimmed === 'mumbai') return 'Maharashtra';
  if (lowerTrimmed === 'karnataka' || lowerTrimmed === 'bangalore' || lowerTrimmed === 'bengaluru') return 'Karnataka';
  if (lowerTrimmed === 'up' || lowerTrimmed === 'uttarpradesh') return 'Uttar Pradesh';
  if (lowerTrimmed === 'mp' || lowerTrimmed === 'madhyapradesh') return 'Madhya Pradesh';
  if (lowerTrimmed === 'ap' || lowerTrimmed === 'andhrapradesh') return 'Andhra Pradesh';
  if (lowerTrimmed === 'wb' || lowerTrimmed === 'westbengal') return 'West Bengal';
  if (lowerTrimmed === 'tn' || lowerTrimmed === 'tamilnadu') return 'Tamil Nadu';

  const substringMatch = statesList.find(s => lower.includes(s.value.toLowerCase()));
  if (substringMatch) return substringMatch.value;

  const superstringMatch = statesList.find(s => s.value.toLowerCase().includes(lower));
  if (superstringMatch) return superstringMatch.value;

  return stateStr;
};

/**
 * Main mapper: converts API response to ITR store fields
 * Returns an object ready to be passed to setItrFields()
 */
export const mapForm16ToStore = (apiResponse) => {
  // Normalise both API response shapes into a single flat object
  const resData = extractStructuredData(apiResponse);

  // ── Employee & Employer info ─────────────────────────────────────────────
  const employeeDetails = resData.employee?.details || '';
  const employeeName = employeeDetails.split('\n')[0]?.trim() || '';
  const employeeAddress = parseEmployeeAddress(employeeDetails);
  const { firstName, middleName, lastName } = parseName(employeeName);

  const employerRaw = resData.employer?.details || '';
  const employerName = employerRaw.split('\n')[0]?.trim() || '';

  const employeePan = resData.employee?.pan || '';
  const tanDeductor = resData.deductor?.tan || '';

  // ── Salary details ────────────────────────────────────────────────────────
  const sal = resData.salary_details || {};
  const grossSalary17_1 = parseAmount(sal.salary_u_s_17_1 || sal.salary_17_1 || sal.gross_salary || 0);
  const perquisites17_2 = parseAmount(sal.perquisites_17_2 || sal.perquisites || 0);
  const profitInLieu17_3 = parseAmount(sal.profit_in_lieu_17_3 || sal.profit_in_lieu || 0);
  const hraExemption = parseAmount(sal.hra_exemption || sal.hra_exempt || 0);
  const otherExemptAllowances = parseAmount(sal.allowances_exempt_u_s_10 || sal.exempt_allowances || 0);
  const totalExemptAllowances = hraExemption + otherExemptAllowances;
  const standardDeduction = parseAmount(sal.standard_deduction || 75000);
  const professionalTax = parseAmount(sal.professional_tax || 0);
  const entertainmentAllowance = parseAmount(sal.entertainment_allowance || 0);
  const netTaxableSalary = parseAmount(
    sal.net_taxable_salary || sal.income_chargeable_salaries || sal.income_from_salaries || 0
  );
  const grossTotalIncome = parseAmount(sal.gross_total_income || 0);
  const totalTdsDeducted = parseAmount(sal.total_tds_deducted || sal.total_tax_deducted || 0);

  // ── Deductions ────────────────────────────────────────────────────────────
  const ded = resData.deductions || {};
  const sec80C = parseAmount(ded.section_80C || ded['80C'] || 0);
  const sec80D = parseAmount(ded.section_80D || ded['80D'] || 0);
  const sec80E = parseAmount(ded.section_80E || ded['80E'] || 0);
  const sec80G = parseAmount(ded.section_80G || ded['80G'] || 0);
  const sec80CCD1B = parseAmount(ded.section_80CCD_1B || ded['80CCD_1B'] || 0);
  const totalDeductions = parseAmount(ded.total_deductions || 0) || (sec80C + sec80D + sec80E + sec80G + sec80CCD1B);

  // ── TDS rows from challan details ─────────────────────────────────────────
  const challanDetails = resData.challan_details || [];
  const tdsRows = buildTdsRows(challanDetails, employerName, tanDeductor);

  // Also add a single consolidated TDS entry from quarterly summary
  const quarterlyTds = resData.quarterly_tds || resData.quarterly || [];
  const quarterlyTdsRows = quarterlyTds
    .filter(q => parseAmount(q.tax_deducted || q.amount_of_tax_deducted) > 0)
    .map((q, idx) => ({
      slNo: tdsRows.length + idx + 1,
      tanDeductor: tanDeductor,
      nameDeductor: employerName,
      grossAmountPaid: parseAmount(q.amount_paid || q.amount_paid_credited || 0),
      taxDeductedSalary: parseAmount(q.tax_deducted || q.amount_of_tax_deducted || 0),
      tdsClaimedThisYear: parseAmount(q.tax_deposited || q.tax_deducted || 0),
      quarter: q.quarter || '',
    }));

  // Combined TDS rows (prefer challan-level detail, fall back to quarterly)
  const finalTdsRows = tdsRows.length > 0 ? tdsRows : quarterlyTdsRows;

  // If still empty but total TDS known, create one summary row
  const effectiveTdsRows = finalTdsRows.length > 0
    ? finalTdsRows
    : totalTdsDeducted > 0
      ? [{
        slNo: 1,
        tanDeductor: tanDeductor,
        nameDeductor: employerName,
        grossAmountPaid: grossSalary17_1,
        taxDeductedSalary: totalTdsDeducted,
        tdsClaimedThisYear: totalTdsDeducted,
      }]
      : [];

  // ── Assessment year & period ──────────────────────────────────────────────
  const assessmentYear = resData.assessment_year || '2025-26';
  const periodFrom = resData.employer_period?.from || '';
  const periodTo = resData.employer_period?.to || '';

  // ── Build Details Payloads for ITR forms ──────────────────────────────────
  const itr1DetailsPayload = {
    'personal-identity': {
      firstName,
      middleName,
      lastName,
      pan: employeePan,
      dob: '',
      hasAadhaar: 'No',
      natureOfEmployment: 'OTH',
    },
    'contact-communications': {
      primaryEmailId: '',
      primaryMobileNumber: '',
    },
    'address-specifications': {
      primaryFlatDoorBlockNo: employeeAddress.flatNo || '',
      primaryBuildingPremisesVillage: employeeAddress.roadStreet || '',
      primaryRoadStreetPostOffice: employeeAddress.roadStreet || '',
      primaryAreaLocality: employeeAddress.areaLocality || '',
      primaryTownCityDistrict: employeeAddress.city || '',
      primaryState: mapStateName(employeeAddress.state) || '',
      primaryCountryRegion: 'India',
      primaryPinCode: employeeAddress.pincode || '',
      isSecondaryAddressSameAsPrimary: 'Yes',
    }
  };

  const itr2DetailsPayload = {
    'part-a-gen': {
      firstName,
      middleName,
      lastName,
      pan: employeePan,
      dobFormation: '',
      // Address
      pFlatDoorBlock: employeeAddress.flatNo || '',
      pBuildingPremisesVillage: employeeAddress.roadStreet || '',
      pRoadStreetPostOffice: employeeAddress.roadStreet || '',
      pAreaLocality: employeeAddress.areaLocality || '',
      pTownCityDistrict: employeeAddress.city || '',
      pState: mapStateName(employeeAddress.state) || '',
      pCountryRegion: 'India',
      pPinCode: employeeAddress.pincode || '',
      // Contact
      primaryEmail: '',
      primaryMobileNumber: '',
    }
  };

  const itr3DetailsPayload = {
    'general_info': {
      firstName,
      middleName,
      lastName,
      pan: employeePan,
      dobFormation: '',
      // Address
      pFlatDoorBlock: employeeAddress.flatNo || '',
      pBuildingPremisesVillage: employeeAddress.roadStreet || '',
      pRoadStreetPostOffice: employeeAddress.roadStreet || '',
      pAreaLocality: employeeAddress.areaLocality || '',
      pTownCityDistrict: employeeAddress.city || '',
      pState: mapStateName(employeeAddress.state) || '',
      pCountryRegion: 'India',
      pPinCode: employeeAddress.pincode || '',
      // Contact
      primaryEmail: '',
      primaryMobileNumber: '',
    }
  };

  const itr4DetailsPayload = {
    'permanent': {
      firstName,
      middleName,
      lastName,
      pan: employeePan,
      dobFormation: '',
      // Address
      pFlatDoorBlock: employeeAddress.flatNo || '',
      pBuildingPremisesVillage: employeeAddress.roadStreet || '',
      pRoadStreetPostOffice: employeeAddress.roadStreet || '',
      pAreaLocality: employeeAddress.areaLocality || '',
      pTownCityDistrict: employeeAddress.city || '',
      pState: mapStateName(employeeAddress.state) || '',
      pCountryRegion: 'India',
      pPinCode: employeeAddress.pincode || '',
      // Contact
      primaryEmail: '',
      primaryMobileNumber: '',
    }
  };

  // ── Build the ITR1-compatible income subsection payload ───────────────────
  // Keys match the subsection IDs used in ITR1's income step
  const salaryIncomeSubsection = {
    // Salary breakdown
    salaryAsPerSection17_1: grossSalary17_1.toString(),
    valueIOfPerquisitesuS17_2: perquisites17_2.toString(),
    profitInLieuOfSalaryuS17_3: profitInLieu17_3.toString(),
    grossSalaryTotal: (grossSalary17_1 + perquisites17_2 + profitInLieu17_3).toString(),
    // Exemptions
    hra10_13A_subTotal: hraExemption.toString(),
    totalAllowancesExempt_ii: totalExemptAllowances.toString(),
    // Net & deductions
    netSalary: (grossSalary17_1 + perquisites17_2 + profitInLieu17_3 - totalExemptAllowances).toString(),
    standardDeduction16_ia: standardDeduction.toString(),
    entertainmentAllowance16_ii: entertainmentAllowance.toString(),
    professionalTax16_iii: professionalTax.toString(),
    totalDeductions16: (standardDeduction + entertainmentAllowance + professionalTax).toString(),
    // Final
    incomeChargeableUnderSalaries: netTaxableSalary.toString(),
  };

  // ── Build ITR2/ITR3-compatible salary schedule ────────────────────────────
  const scheduleSFields = {
    nameEmployer: employerName,
    tanEmployer: tanDeductor,
    salary17_1: grossSalary17_1,
    perquisites17_2: perquisites17_2,
    profitInLieu17_3: profitInLieu17_3,
    grossSalary: grossSalary17_1 + perquisites17_2 + profitInLieu17_3,
    hraExemptSec10: hraExemption,
    allowancesExempt10: totalExemptAllowances,
    standardDeduction16ia: standardDeduction,
    professionalTax16iii: professionalTax,
    entertainmentAllowance16ii: entertainmentAllowance,
    incomeChargeableSalaries: netTaxableSalary,
  };

  // ── Deductions chapter VI-A mapping ──────────────────────────────────────
  const chapterVIAFields = {
    deduction80C: sec80C,
    deduction80D: sec80D,
    deduction80E: sec80E,
    deduction80G: sec80G,
    deduction80CCD1B: sec80CCD1B,
    totalDeductions: totalDeductions,
  };

  // ── Top-level store fields ────────────────────────────────────────────────
  const topLevel = {
    // Personal info
    firstName,
    middleName,
    lastName,
    employeeName,
    panNumber: employeePan,
    employeePan,

    // Address
    flatNo: employeeAddress.flatNo,
    roadStreet: employeeAddress.roadStreet,
    areaLocality: employeeAddress.areaLocality,
    city: employeeAddress.city,
    state: employeeAddress.state,
    pincode: employeeAddress.pincode,

    // Employer details
    employerName,
    employerPan: resData.employer?.pan || '',
    employerTan: tanDeductor,

    // Assessment details
    assessmentYear,
    periodFrom,
    periodTo,

    // Tax details
    taxOnIncome: resData.taxes?.taxOnIncome || 0,
    healthEducationCess: resData.taxes?.healthEducationCess || 0,
    taxPayable: resData.taxes?.taxPayable || 0,
    netTaxPayable: resData.taxes?.netTaxPayable || 0,

    // Legacy income fields
    salaryIncome: netTaxableSalary || grossSalary17_1,
    taxSavingsDeductions: totalDeductions,
    taxesPaid: totalTdsDeducted,

    // Form 16 raw cache (for debugging / future use)
    form16RawData: {
      employeeName,
      employeePan,
      employerName,
      employerPan: resData.employer?.pan || '',
      employerTan: tanDeductor,
      tanDeductor,
      assessmentYear,
      periodFrom,
      periodTo,
      salary17_1: grossSalary17_1,
      perquisites17_2: perquisites17_2,
      profits17_3: profitInLieu17_3,
      standardDeduction,
      incomeChargeableSalaries: netTaxableSalary,
      taxOnIncome: resData.taxes?.taxOnIncome || 0,
      healthEducationCess: resData.taxes?.healthEducationCess || 0,
      taxPayable: resData.taxes?.taxPayable || 0,
      netTaxPayable: resData.taxes?.netTaxPayable || 0,
      totalSalary: grossSalary17_1,
      totalTdsDeducted,
    },
  };

  // ── ITR1-style income subsections (nested under income step) ─────────────
  const itr1IncomePayload = {
    'salary-pension-income': salaryIncomeSubsection,
    'house-property-income': {
      isAnyHouseProperty: 'No',
    },
    'other-sources-income': {
      IncomeSourceOther: 'No',
    },
  };

  // ── ITR1-style deductions subsections ─────────────────────────────────────
  const itr1DeductionsPayload = {
    'savings-and-pension-deductions': {
      claim80C: sec80C > 0 ? 'Yes' : 'No',
      sec80cNatureOfPayment: sec80C > 0 ? 'LIC premium' : '',
      sec80cEligibleAmount: sec80C > 0 ? sec80C.toString() : '',
      totalDeductionUsh80C: sec80C > 0 ? sec80C.toString() : '',
      claim80CCC: 'No',
    },
    'medical-health-deductions': {
      claim80D: sec80D > 0 ? 'Yes' : 'No',
      sec80dIsFamilySeniorCitizen: sec80D > 0 ? 'No' : '',
      sec80dSelfFamilyHealthInsurancePremium: sec80D > 0 ? sec80D.toString() : '',
      claim80DParents: 'No',
    },
    'loan-interest-deductions': {
      claim80E: sec80E > 0 ? 'Yes' : 'No',
      loanIntSourceType: sec80E > 0 ? 'Bank' : '',
      loanIntLenderName: sec80E > 0 ? 'Bank' : '',
      loanIntAccountNumber: sec80E > 0 ? '1234567890' : '',
      loanIntSanctionDate: sec80E > 0 ? '01/04/2024' : '',
      loanIntTotalAmount: sec80E > 0 ? sec80E.toString() : '',
      loanIntOutstandingYearEnd: sec80E > 0 ? sec80E.toString() : '',
      loanIntInterestAmountClaimed: sec80E > 0 ? sec80E.toString() : '',
    },
    'charitable-donations-schedule': {
      claim80G: sec80G > 0 ? 'Yes' : 'No',
      donNameOfDonee: sec80G > 0 ? 'Prime Minister National Relief Fund' : '',
      donAddress: sec80G > 0 ? 'New Delhi' : '',
      donCityTownDistrict: sec80G > 0 ? 'New Delhi' : '',
      donStateCode: sec80G > 0 ? 'Delhi' : '',
      donPinCode: sec80G > 0 ? '110001' : '',
      donPanOfDonee: sec80G > 0 ? 'GGGGG0000G' : '',
      donAmountOtherMode: sec80G > 0 ? sec80G.toString() : '',
    },
    'scientific-political-disability-deductions': {
      claim80GGA: 'No',
      claim80GGC: 'No',
      claim80U: 'No',
      claim80DD: 'No',
    }
  };

  // ── ITR1/ITR2/ITR3/ITR4 taxes > TDS subsections ──────────────────────────
  const itr1TaxesPayload = {
    'tds-schedules-ledger': {
      isForm16Available: 'Yes',
      tds1EmployerTan: tanDeductor,
      tds1EmployerName: employerName,
      tds1IncomeChargeableSalaries: netTaxableSalary.toString(),
      tds1TotalTaxDeductedRow: totalTdsDeducted.toString(),
      isForm16ANonSalary: 'No',
      isForm16CRental: 'No',
    },
    'tcs-and-challan-schedules': {
      isTcs: 'No',
      isAdvanceTaxPaid: 'No',
    },
  };  

  // ITR2-style taxes
  const itr2TaxesPayload = {
    'tax-payments-schedules': {
      tds1TotalTaxDeductedRow: totalTdsDeducted,
    },
  };

  // ITR3-style taxes
  const itr3TaxesPayload = {
    'tax_payments_schedules': {
      tds1TotalTaxDeductedRow: totalTdsDeducted,
    },
  };

  // ITR4-style taxes
  const itr4TaxesPayload = {
    tds: {
      claimedTotalTDS: totalTdsDeducted,
    },
  };

  // ── ITR2 (Individual2) income subsections ─────────────────────────────────
  const itr2IncomePayload = {
    'schedule-s-salary': scheduleSFields,
    'schedule-hp-house-property': {},
    'schedule-os-other-sources': {},
  };

  // ── ITR2 deductions ───────────────────────────────────────────────────────
  const itr2DeductionsPayload = {
    'schedule-via-deductions': chapterVIAFields,
  };

  // ── ITR3 income subsections ───────────────────────────────────────────────
  const itr3IncomePayload = {
    'salary_house_property_schedules': {
      ...scheduleSFields,
      scheduleS: scheduleSFields,
    },
    'business_profession_regular': {},
    'business_profession_presumptive': {},
  };

  // ── ITR3 deductions ───────────────────────────────────────────────────────
  const itr3DeductionsPayload = {
    'chapter_via_and_10a': chapterVIAFields,
  };

  // ── ITR4 income subsections ───────────────────────────────────────────────
  const itr4IncomePayload = {
    business: {
      salaryIncome: netTaxableSalary || grossSalary17_1,
      ...scheduleSFields,
    },
    house_property: {},
    other: {},
  };

  // ── ITR4 deductions ───────────────────────────────────────────────────────
  const itr4DeductionsPayload = {
    chapter6a: chapterVIAFields,
  };

  return {
    topLevel,
    itr1: {
      details: itr1DetailsPayload,
      income: itr1IncomePayload,
      deductions: itr1DeductionsPayload,
      taxes: itr1TaxesPayload,
    },
    itr2: {
      details: itr2DetailsPayload,
      income: itr2IncomePayload,
      deductions: itr2DeductionsPayload,
      taxes: itr2TaxesPayload,
    },
    itr3: {
      details: itr3DetailsPayload,
      income: itr3IncomePayload,
      deductions: itr3DeductionsPayload,
      taxes: itr3TaxesPayload,
    },
    itr4: {
      details: itr4DetailsPayload,
      income: itr4IncomePayload,
      deductions: itr4DeductionsPayload,
      taxes: itr4TaxesPayload,
    },
    // Shared fields
    salaryDetails: salaryIncomeSubsection,
    chapterVIAFields,
    effectiveTdsRows,
    totalTdsDeducted,
    assessmentYear,
    periodFrom,
    periodTo,
    employerName,
    tanDeductor,
    employeePan,
  };
};

/**
 * Applies the mapped Form 16 data to the ITR store based on the current filing type.
 * Returns the final object to pass into setItrFields().
 */
export const buildStorePayload = (mapped, filingType) => {
  const { topLevel, itr1, itr2, itr3, itr4 } = mapped;

  let incomePayload, deductionsPayload, taxesPayload, detailsPayload;

  switch (filingType) {
    case 'ITR1':
      incomePayload = itr1.income;
      deductionsPayload = itr1.deductions;
      taxesPayload = itr1.taxes;
      detailsPayload = itr1.details;
      break;
    case 'ITR2':
    case 'Individual2':
      incomePayload = itr2.income;
      deductionsPayload = itr2.deductions;
      taxesPayload = itr2.taxes;
      detailsPayload = itr2.details;
      break;
    case 'ITR3':
      incomePayload = itr3.income;
      deductionsPayload = itr3.deductions;
      taxesPayload = itr3.taxes;
      detailsPayload = itr3.details;
      break;
    case 'ITR4':
    case 'Individual4':
      incomePayload = itr4.income;
      deductionsPayload = itr4.deductions;
      taxesPayload = itr4.taxes;
      detailsPayload = itr4.details;
      break;
    default:
      // Fallback: ITR1-style
      incomePayload = itr1.income;
      deductionsPayload = itr1.deductions;
      taxesPayload = itr1.taxes;
      detailsPayload = itr1.details;
  }

  return {
    ...topLevel,
    details: detailsPayload,
    income: incomePayload,
    deductions: deductionsPayload,
    taxes: taxesPayload,
    form16Data: topLevel.form16RawData,
  };
};
