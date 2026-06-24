/**
 * form16Parser.js
 *
 * Converts the raw Form 16 extractor API response (pages-based or structured)
 * into a clean, canonical JSON object.
 *
 * The normalized object is stored in the Zustand store under `form16Data`
 * and acts as the single source of truth for all auto-fill operations.
 *
 * Normalized shape:
 * {
 *   certificateNo,
 *   assessmentYear,
 *   employer:  { name, address, pan, tan },
 *   employee:  { name, firstName, middleName, lastName, pan, address,
 *                flatNo, roadStreet, areaLocality, city, state, pincode },
 *   period:    { from, to },
 *   quarterly: [{ quarter, receiptNo, amountPaid, taxDeducted, taxDeposited }],
 *   totals:    { amountPaid, taxDeducted, taxDeposited },
 *   challans:  [{ slNo, taxDeposited, bsrCode, date, challanSerialNo, status }],
 *   salary:    { grossSalary, perquisites, profitInLieu, hraExemption,
 *                otherExemptAllowances, standardDeduction, professionalTax,
 *                entertainmentAllowance, netTaxableSalary, totalTdsDeducted },
 *   deductions:{ sec80C, sec80CCC, sec80CCD1B, sec80D, sec80E, sec80G,
 *                sec80GG, sec80TTA, sec80U, total },
 *   partBNotes: string   (raw Part B text if present)
 * }
 */

// ── Helpers ───────────────────────────────────────────────────────────────────

const num = (val) => {
  if (val === null || val === undefined || val === '' || val === '-') return 0;
  const n = parseFloat(String(val).replace(/,/g, ''));
  return isNaN(n) ? 0 : Math.round(n);
};

/** Split a full name string into parts */
const splitName = (fullName = '') => {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  const firstName  = parts[0]  || '';
  const lastName   = parts.length > 1 ? parts[parts.length - 1] : '';
  const middleName = parts.length > 2 ? parts.slice(1, -1).join(' ') : '';
  return { firstName, middleName, lastName };
};

/** Parse a multi-line employee address block */
const parseAddress = (addrStr = '') => {
  const lines = addrStr.split('\n').map(l => l.trim()).filter(Boolean);
  let flatNo = '', roadStreet = '', areaLocality = '', city = '', state = '', pincode = '';

  if (lines.length >= 1) {
    const parts = lines[0].split(',').map(p => p.trim());
    flatNo      = parts[0] || '';
    roadStreet  = parts[1] || '';
    areaLocality = parts[2] || '';
  }

  const lastLine = lines[lines.length - 1] || '';
  const pinMatch = lastLine.match(/\d{6}/);
  if (pinMatch) pincode = pinMatch[0];

  const segments = lastLine.split('-').map(s => s.trim());
  if (segments.length >= 1) city  = segments[0].split(',')[0]?.trim() || '';
  if (segments.length >= 2) state = segments[1].replace(/\d{6}/, '').trim();

  return { flatNo, roadStreet, areaLocality, city, state, pincode };
};

// ── Table-based extractor (Shape A - pages with tables) ────────────────────────

/**
 * Extracts data from the tables array of the API response.
 * The tables are 2D arrays of cells (some null for merged cells).
 * We flatten each table row to its non-null values.
 */
const extractFromTables = (pages = []) => {
  let employer = { name: '', address: '', pan: '', tan: '' };
  let employee = { name: '', address: '', pan: '' };
  let quarterly = [];
  let challans  = [];
  let certificateNo  = '';
  let assessmentYear = '2025-26';
  let periodFrom = '';
  let periodTo   = '';
  let totalAmountPaid  = 0;
  let totalTaxDeducted = 0;
  let totalTaxDeposited = 0;

  for (const page of pages) {
    const tables = page?.tables || [];
    for (const table of tables) {
      for (const row of table) {
        // Flatten nulls
        const cells = row.filter(c => c !== null && c !== undefined && String(c).trim() !== '');

        if (!cells.length) continue;

        const first = String(cells[0]).trim();
        const second = cells[1] ? String(cells[1]).trim() : '';

        // Certificate No
        if (first.startsWith('Certificate No.')) {
          const m = first.match(/Certificate No\.\s+(\S+)/);
          if (m) certificateNo = m[1];
        }

        // Employer / Employee name+address cell (merged cell)
        if (first.startsWith('PLAN') || first.match(/^[A-Z][A-Z ]{3,}$/)) {
          if (cells.length >= 2 && String(cells[1]).trim().match(/^[A-Z][A-Z ]+$/)) {
            // Row: [employerDetails, employeeDetails]
            employer.name    = first.split('\n')[0].trim();
            employer.address = first.split('\n').slice(1).join(', ').trim();
            employee.name    = String(cells[1]).split('\n')[0].trim();
            employee.address = String(cells[1]).split('\n').slice(1).join('\n').trim();
          }
        }

        // PAN / TAN row
        if (first.match(/^[A-Z]{5}[0-9]{4}[A-Z]$/) && second.match(/^[A-Z]{4}[0-9]{5}[A-Z]$/)) {
          employer.pan = first;
          employer.tan = second;
          if (cells[2]) employee.pan = String(cells[2]).trim();
        }

        // Assessment Year
        if (first.match(/^\d{4}-\d{2}$/) && !assessmentYear) {
          assessmentYear = first;
        }
        if (first === '2025-26' || first === '2026-27' || first === '2024-25') {
          assessmentYear = first;
          // Period
          const fromCell = String(cells[1] || '');
          const toCell   = String(cells[cells.length - 1] || '');
          if (fromCell.includes('Apr') || fromCell.includes('-')) periodFrom = fromCell.replace('From\n', '').trim();
          if (toCell.includes('Mar')   || toCell.includes('-'))   periodTo   = toCell.replace('To\n', '').trim();
        }

        // Quarterly row Q1/Q2/Q3/Q4
        if (['Q1', 'Q2', 'Q3', 'Q4'].includes(first)) {
          quarterly.push({
            quarter:      first,
            receiptNo:    String(cells[1] || '').trim(),
            amountPaid:   num(cells[2]),
            taxDeducted:  num(cells[3]),
            taxDeposited: num(cells[4]),
          });
        }

        // Total row
        if (first === 'Total (Rs.)' && cells.length >= 4) {
          const vals = cells.slice(1).map(c => num(c)).filter(v => v > 0);
          if (vals.length >= 3) {
            [totalAmountPaid, totalTaxDeducted, totalTaxDeposited] = vals;
          } else if (vals.length === 1) {
            // Page 2 total row "Total (Rs.) 27045.00"
            totalTaxDeposited = vals[0];
          }
        }

        // Challan rows (numeric sl.no, amount, bsr code 7 digits, date, serial)
        if (first.match(/^\d+$/) && second && second.match(/^[\d.]+$/)) {
          const taxDep = num(second);
          const bsr    = String(cells[2] || '').trim();
          const date   = String(cells[3] || '').trim();
          const serial = String(cells[4] || '').trim();
          const status = String(cells[cells.length - 1] || '').trim();

          if (date.match(/\d{2}-\d{2}-\d{4}/) || date.match(/\d{2}-\w{3}-\d{4}/)) {
            challans.push({
              slNo:          parseInt(first, 10),
              taxDeposited:  taxDep,
              bsrCode:       bsr !== '-' ? bsr : '',
              date,
              challanSerialNo: serial !== '-' ? serial : '',
              status,
            });
          }
        }
      }
    }
  }

  return {
    certificateNo, assessmentYear, employer, employee,
    periodFrom, periodTo, quarterly, challans,
    totalAmountPaid, totalTaxDeducted, totalTaxDeposited,
  };
};

// ── Text-based extractor fallback (regex over raw page text) ──────────────────

const extractFromText = (pages = []) => {
  const fullText = pages.map(p => p?.text || '').join('\n');

  // Certificate No
  const certMatch = fullText.match(/Certificate No\.\s+(\S+)/);
  const certificateNo = certMatch?.[1] || '';

  // Assessment year
  const ayMatch = fullText.match(/Assessment Year\s+(\d{4}-\d{2})/);
  const assessmentYear = ayMatch?.[1] || '2025-26';

  // Period
  const fromMatch = fullText.match(/From\s+(\d{2}-\w{3}-\d{4})/);
  const toMatch   = fullText.match(/To\s+(\d{2}-\w{3}-\d{4})/);

  // Employer
  const empNameMatch = fullText.match(/Name and address of the Employer[^\n]*\n([A-Z][A-Z ]+)\n/);
  const employerName = empNameMatch?.[1]?.trim() || '';

  const deductorPanMatch = fullText.match(/PAN of the Deductor\s+([A-Z]{5}[0-9]{4}[A-Z])/);
  const tanMatch          = fullText.match(/TAN of the Deductor\s+([A-Z]{4}[0-9]{5}[A-Z])/);

  // Employee — use page 2 header which is clean
  const page2Header = (pages[1]?.text || '');
  const panPage2 = page2Header.match(/PAN of Employee:([A-Z]{5}[0-9]{4}[A-Z])/)?.[1] || '';

  // Employee name from page 1 table text
  const empDetailMatch = fullText.match(
    /Name and address of the Employee[^\n]*\n([A-Z][A-Z ]+)\n([\s\S]*?)(?=\nPAN of the|$)/
  );
  const employeeName = empDetailMatch?.[1]?.trim() || '';
  const employeeAddr = empDetailMatch?.[2]?.split('\n').slice(0, 2).join('\n').trim() || '';

  // Quarterly rows
  const quarterly = [];
  const qRe = /(Q[1-4])\s+(\S+)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/g;
  let qm;
  while ((qm = qRe.exec(fullText)) !== null) {
    quarterly.push({
      quarter:      qm[1],
      receiptNo:    qm[2],
      amountPaid:   num(qm[3]),
      taxDeducted:  num(qm[4]),
      taxDeposited: num(qm[5]),
    });
  }

  // Total row
  const totRe = /Total \(Rs\.\)\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/;
  const totMatch = fullText.match(totRe);

  // Challan rows (only non-zero ones — 7-digit BSR code)
  const challans = [];
  const cRe = /(\d+)\s+([\d.]+)\s+(\d{7})\s+(\d{2}-\d{2}-\d{4})\s+(\d+)\s+F/g;
  let cm;
  while ((cm = cRe.exec(fullText)) !== null) {
    challans.push({
      slNo:           parseInt(cm[1], 10),
      taxDeposited:   num(cm[2]),
      bsrCode:        cm[3],
      date:           cm[4],
      challanSerialNo: cm[5],
      status:         'F',
    });
  }

  return {
    certificateNo,
    assessmentYear,
    employer: {
      name:    employerName,
      address: '',
      pan:     deductorPanMatch?.[1] || '',
      tan:     tanMatch?.[1] || '',
    },
    employee: {
      name:    employeeName,
      address: employeeAddr,
      pan:     panPage2,
    },
    periodFrom: fromMatch?.[1] || '',
    periodTo:   toMatch?.[1]   || '',
    quarterly,
    challans,
    totalAmountPaid:   num(totMatch?.[1]),
    totalTaxDeducted:  num(totMatch?.[2]),
    totalTaxDeposited: num(totMatch?.[3]),
  };
};

// ── Shape B extractor (pre-structured response from backend) ──────────────────

const extractFromStructured = (data) => {
  const sal = data.salary_details || {};
  const ded = data.deductions     || {};

  const quarterly = (data.quarterly_tds || []).map((q, i) => ({
    quarter:      q.quarter || `Q${i + 1}`,
    receiptNo:    q.receipt_no || '',
    amountPaid:   num(q.amount_paid || q.amount_paid_credited),
    taxDeducted:  num(q.tax_deducted || q.amount_of_tax_deducted),
    taxDeposited: num(q.tax_deposited),
  }));

  const challans = (data.challan_details || []).map(c => ({
    slNo:           parseInt(c.sl_no, 10) || 0,
    taxDeposited:   num(c.tax_deposited),
    bsrCode:        c.bsr_code || '',
    date:           c.date || '',
    challanSerialNo: c.serial || '',
    status:         c.status || 'F',
  }));

  const employeeDetails = data.employee?.details || '';
  const employeeName    = employeeDetails.split('\n')[0]?.trim() || '';
  const employeeAddr    = employeeDetails.split('\n').slice(1).join('\n').trim();

  return {
    certificateNo:  data.certificate_no || '',
    assessmentYear: data.assessment_year || '2025-26',
    employer: {
      name:    (data.employer?.details || '').split('\n')[0]?.trim() || '',
      address: (data.employer?.details || '').split('\n').slice(1).join(', ').trim(),
      pan:     data.deductor?.pan || '',
      tan:     data.deductor?.tan || '',
    },
    employee: {
      name:    employeeName,
      address: employeeAddr,
      pan:     data.employee?.pan || '',
    },
    periodFrom: data.employer_period?.from || '',
    periodTo:   data.employer_period?.to   || '',
    quarterly,
    challans,
    totalAmountPaid:   num(sal.gross_salary || sal.salary_u_s_17_1),
    totalTaxDeducted:  num(sal.total_tds_deducted || sal.total_tax_deducted),
    totalTaxDeposited: num(sal.total_tds_deducted || sal.total_tax_deducted),
    salaryDetails: {
      grossSalary:           num(sal.salary_u_s_17_1 || sal.gross_salary),
      perquisites:           num(sal.perquisites_17_2),
      profitInLieu:          num(sal.profit_in_lieu_17_3),
      hraExemption:          num(sal.hra_exemption),
      otherExemptAllowances: num(sal.allowances_exempt_u_s_10),
      standardDeduction:     num(sal.standard_deduction),
      professionalTax:       num(sal.professional_tax),
      entertainmentAllowance: num(sal.entertainment_allowance),
      netTaxableSalary:      num(sal.net_taxable_salary || sal.income_chargeable_salaries),
    },
    deductionDetails: {
      sec80C:    num(ded.section_80C),
      sec80CCC:  num(ded.section_80CCC),
      sec80CCD1B: num(ded.section_80CCD_1B),
      sec80D:    num(ded.section_80D),
      sec80E:    num(ded.section_80E),
      sec80G:    num(ded.section_80G),
      sec80GG:   num(ded.section_80GG),
      sec80TTA:  num(ded.section_80TTA),
      sec80U:    num(ded.section_80U),
      total:     num(ded.total_deductions),
    },
  };
};

// ── Main parser ────────────────────────────────────────────────────────────────

/**
 * parseForm16Response(rawApiResponse)
 *
 * Accepts the raw extractor API response (either pages-based or structured)
 * and returns a normalized Form 16 data object.
 */
export const parseForm16Response = (rawApiResponse) => {
  // Shape B — pre-structured backend response
  if (rawApiResponse?.data?.employee || rawApiResponse?.data?.salary_details) {
    const raw = extractFromStructured(rawApiResponse.data);
    return finalizeNormalized(raw);
  }

  // Shape A — pages-based response
  const pages = rawApiResponse?.pages || [];

  // Try table extraction first (more accurate)
  const fromTables = extractFromTables(pages);
  // Supplement with text-based extraction
  const fromText   = extractFromText(pages);

  // Merge: prefer table data, fill gaps with text data
  const merged = {
    certificateNo:  fromTables.certificateNo  || fromText.certificateNo,
    assessmentYear: fromTables.assessmentYear || fromText.assessmentYear,
    employer: {
      name:    fromTables.employer.name    || fromText.employer.name,
      address: fromTables.employer.address || fromText.employer.address,
      pan:     fromTables.employer.pan     || fromText.employer.pan,
      tan:     fromTables.employer.tan     || fromText.employer.tan,
    },
    employee: {
      name:    fromTables.employee.name    || fromText.employee.name,
      address: fromTables.employee.address || fromText.employee.address,
      pan:     fromTables.employee.pan     || fromText.employee.pan,
    },
    periodFrom: fromTables.periodFrom || fromText.periodFrom,
    periodTo:   fromTables.periodTo   || fromText.periodTo,
    quarterly:  fromTables.quarterly.length  ? fromTables.quarterly  : fromText.quarterly,
    challans:   fromTables.challans.length   ? fromTables.challans   : fromText.challans,
    totalAmountPaid:   fromTables.totalAmountPaid   || fromText.totalAmountPaid,
    totalTaxDeducted:  fromTables.totalTaxDeducted  || fromText.totalTaxDeducted,
    totalTaxDeposited: fromTables.totalTaxDeposited || fromText.totalTaxDeposited,
  };

  return finalizeNormalized(merged);
};

/**
 * finalizeNormalized — enriches a merged raw extraction with derived fields
 */
const finalizeNormalized = (raw) => {
  const { firstName, middleName, lastName } = splitName(raw.employee?.name || '');
  const addrParsed = parseAddress(raw.employee?.address || '');

  // Compute salary from quarterly if not already set
  const grossSalary = raw.salaryDetails?.grossSalary
    || raw.totalAmountPaid
    || raw.quarterly.reduce((s, q) => s + q.amountPaid, 0);

  const totalTdsDeducted = raw.salaryDetails
    ? (raw.salaryDetails.netTaxableSalary === 0
        ? (raw.totalTaxDeducted || raw.totals?.taxDeducted || 0)
        : raw.totalTaxDeducted)
    : raw.totalTaxDeducted
      || raw.quarterly.reduce((s, q) => s + q.taxDeducted, 0)
      || raw.challans.reduce((s, c) => s + c.taxDeposited, 0);

  return {
    // ── Meta ──────────────────────────────────────────────────────────────
    certificateNo:  raw.certificateNo  || '',
    assessmentYear: raw.assessmentYear || '2025-26',

    // ── Employer ──────────────────────────────────────────────────────────
    employer: {
      name:    raw.employer?.name    || '',
      address: raw.employer?.address || '',
      pan:     raw.employer?.pan     || '',
      tan:     raw.employer?.tan     || '',
    },

    // ── Employee ──────────────────────────────────────────────────────────
    employee: {
      name:        raw.employee?.name || '',
      firstName,
      middleName,
      lastName,
      pan:         raw.employee?.pan  || '',
      // full address
      address:     raw.employee?.address || '',
      flatNo:      addrParsed.flatNo,
      roadStreet:  addrParsed.roadStreet,
      areaLocality: addrParsed.areaLocality,
      city:        addrParsed.city,
      state:       addrParsed.state,
      pincode:     addrParsed.pincode,
    },

    // ── Employment period ─────────────────────────────────────────────────
    period: {
      from: raw.periodFrom || '',
      to:   raw.periodTo   || '',
    },

    // ── Quarterly TDS summary ─────────────────────────────────────────────
    quarterly: raw.quarterly || [],

    // ── Grand totals ──────────────────────────────────────────────────────
    totals: {
      amountPaid:   raw.totalAmountPaid   || 0,
      taxDeducted:  raw.totalTaxDeducted  || 0,
      taxDeposited: raw.totalTaxDeposited || 0,
    },

    // ── Challan details ───────────────────────────────────────────────────
    challans: (raw.challans || []).filter(c => c.taxDeposited > 0),

    // ── Salary figures (Part B if available, else derived) ────────────────
    salary: {
      grossSalary:           raw.salaryDetails?.grossSalary           || grossSalary,
      perquisites:           raw.salaryDetails?.perquisites           || 0,
      profitInLieu:          raw.salaryDetails?.profitInLieu          || 0,
      hraExemption:          raw.salaryDetails?.hraExemption          || 0,
      otherExemptAllowances: raw.salaryDetails?.otherExemptAllowances || 0,
      standardDeduction:     raw.salaryDetails?.standardDeduction     || 75000,
      professionalTax:       raw.salaryDetails?.professionalTax       || 0,
      entertainmentAllowance: raw.salaryDetails?.entertainmentAllowance || 0,
      netTaxableSalary:      raw.salaryDetails?.netTaxableSalary      || 0,
      totalTdsDeducted,
    },

    // ── Chapter VI-A deductions (Part B if available) ─────────────────────
    deductions: {
      sec80C:     raw.deductionDetails?.sec80C     || 0,
      sec80CCC:   raw.deductionDetails?.sec80CCC   || 0,
      sec80CCD1B: raw.deductionDetails?.sec80CCD1B || 0,
      sec80D:     raw.deductionDetails?.sec80D     || 0,
      sec80E:     raw.deductionDetails?.sec80E     || 0,
      sec80G:     raw.deductionDetails?.sec80G     || 0,
      sec80GG:    raw.deductionDetails?.sec80GG    || 0,
      sec80TTA:   raw.deductionDetails?.sec80TTA   || 0,
      sec80U:     raw.deductionDetails?.sec80U     || 0,
      total:      raw.deductionDetails?.total      || 0,
    },

    // ── Timestamp ────────────────────────────────────────────────────────
    parsedAt: new Date().toISOString(),
  };
};
