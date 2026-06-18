// ============================================================
//  ITR Tax Calculation Engine — AY 2026-27
//  Covers ITR-1 / 2 / 3 / 4 / 5 / 6 / 7
// ============================================================

// ──────────────────────────────────────────────
//  1. Slab Tables
// ──────────────────────────────────────────────
export const NEW_REGIME_SLABS = [
  { min: 0,       max: 400000,  rate: 0  },
  { min: 400000,  max: 800000,  rate: 5  },
  { min: 800000,  max: 1200000, rate: 10 },
  { min: 1200000, max: 1600000, rate: 15 },
  { min: 1600000, max: 2000000, rate: 20 },
  { min: 2000000, max: 2400000, rate: 25 },
  { min: 2400000, max: Infinity, rate: 30 },
];

export const OLD_REGIME_SLABS = [
  { min: 0,      max: 250000,  rate: 0  },
  { min: 250000, max: 500000,  rate: 5  },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 },
];

// Cooperative Society old-regime slabs
const COOP_SLABS = [
  { min: 0,     max: 10000,  rate: 10 },
  { min: 10000, max: 20000,  rate: 20 },
  { min: 20000, max: Infinity, rate: 30 },
];

// ──────────────────────────────────────────────
//  2. Helper — apply slab table to an income
// ──────────────────────────────────────────────
function applySlabs(income, slabs) {
  let totalTax = 0;
  const breakdown = [];
  for (const slab of slabs) {
    if (income > slab.min) {
      const taxable = Math.min(income, slab.max === Infinity ? income : slab.max) - slab.min;
      const taxAmt  = (taxable * slab.rate) / 100;
      totalTax += taxAmt;
      breakdown.push({
        min: slab.min,
        max: slab.max === Infinity ? `Above ${slab.min.toLocaleString('en-IN')}` : slab.max,
        rate: slab.rate,
        taxableAmount: taxable,
        taxAmount: taxAmt,
      });
    } else {
      breakdown.push({
        min: slab.min,
        max: slab.max === Infinity ? `Above ${slab.min.toLocaleString('en-IN')}` : slab.max,
        rate: slab.rate,
        taxableAmount: 0,
        taxAmount: 0,
      });
    }
  }
  return { totalTax, breakdown };
}

// ──────────────────────────────────────────────
//  3. Surcharge rates
// ──────────────────────────────────────────────
function surchargeRate(income, filingType, regime) {
  const isCompany = filingType.includes('Company');
  const isFirmLLP = ['Firm', 'LLP'].includes(filingType);

  if (isCompany) {
    // New regimes (115BAA / 115BAB) → flat 10 %
    if (regime === 'new') return 0.10;
    // Normal company: 7 % if 1cr–10cr, 12 % above 10cr
    if (income > 100_000_000) return 0.12;
    if (income > 10_000_000)  return 0.07;
    return 0;
  }

  if (filingType === 'Cooperative Society') {
    if (income > 100_000_000) return 0.12;
    if (income > 10_000_000)  return 0.07;
    return 0;
  }

  if (isFirmLLP || filingType === 'AOP/BOI') {
    return income > 10_000_000 ? 0.12 : 0;
  }

  if (filingType === 'Trust & Exempt Entities') {
    return income > 10_000_000 ? 0.12 : 0;
  }

  // Individual / HUF
  if (regime === 'new') {
    // Surcharge capped at 25 % in new regime
    if (income > 50_000_000)  return 0.25;
    if (income > 20_000_000)  return 0.25;
    if (income > 10_000_000)  return 0.15;
    if (income > 5_000_000)   return 0.10;
    return 0;
  }
  // Old regime
  if (income > 50_000_000)  return 0.37;
  if (income > 20_000_000)  return 0.25;
  if (income > 10_000_000)  return 0.15;
  if (income > 5_000_000)   return 0.10;
  return 0;
}

// ──────────────────────────────────────────────
//  4. Main tax calculator
// ──────────────────────────────────────────────
/**
 * @param {number}  income      – Net taxable income (≥ 0)
 * @param {Array}   slabs       – Slab table (used only for slab-based entities)
 * @param {'old'|'new'|'115BA'|'115BAA'|'115BAB'} regime
 * @param {string}  filingType  – Entity type string from store
 * @param {number}  anonymousDonations – ITR-7 only; taxed separately at 30 %
 */
export const calculateTax = (
  income,
  slabs,
  regime = 'new',
  filingType = 'Individual',
  anonymousDonations = 0,
) => {
  let totalTax  = 0;
  let breakdown = [];
  const isCompany   = filingType.includes('Company');
  const isFirmLLP   = ['Firm', 'LLP'].includes(filingType);
  const isAOPBOI    = filingType === 'AOP/BOI';
  const isCoop      = filingType === 'Cooperative Society';
  const isTrust     = filingType === 'Trust & Exempt Entities';

  // ── Flat-rate entities ──────────────────────────────────
  if (isFirmLLP || isAOPBOI) {
    totalTax = income * 0.30;
    breakdown = [{ min: 0, max: 'Flat 30%', rate: 30, taxableAmount: income, taxAmount: totalTax }];
  } else if (isCompany) {
    let rate;
    switch (regime) {
      case '115BAB': rate = 0.15; break;
      case '115BAA': rate = 0.22; break;
      case '115BA':  rate = 0.25; break;
      default:       rate = income <= 400_000_000 ? 0.25 : 0.30; // turnover proxy
    }
    totalTax = income * rate;
    breakdown = [{ min: 0, max: 'Flat Rate', rate: rate * 100, taxableAmount: income, taxAmount: totalTax }];
  } else if (isCoop) {
    if (regime === 'new') {
      totalTax = income * 0.22;
      breakdown = [{ min: 0, max: 'Flat 22%', rate: 22, taxableAmount: income, taxAmount: totalTax }];
    } else {
      const r = applySlabs(income, COOP_SLABS);
      totalTax  = r.totalTax;
      breakdown = r.breakdown;
    }
  } else if (isTrust) {
    // Regular income taxed at MMR (30%) for unapproved / excess income
    totalTax = income * 0.30;
    // Anonymous donations taxed separately at flat 30 %
    const anonTax = anonymousDonations * 0.30;
    totalTax += anonTax;
    breakdown = [
      { min: 0, max: 'MMR 30%',             rate: 30, taxableAmount: income,            taxAmount: income * 0.30 },
      { min: 0, max: 'Anon. Donation 30%',  rate: 30, taxableAmount: anonymousDonations, taxAmount: anonTax },
    ];
  } else {
    // ── Individual / HUF — slab-based ──────────────────
    const r = applySlabs(income, slabs);
    totalTax  = r.totalTax;
    breakdown = r.breakdown;
  }

  // ── Rebate u/s 87A (only Resident Individual) ──────────
  let rebate = 0;
  if (['Individual', 'Individual2', 'Individual3', 'Individual4'].includes(filingType)) {
    if (regime === 'new'  && income <= 700_000)  rebate = Math.min(totalTax, 25_000);
    if (regime === 'old'  && income <= 500_000)  rebate = Math.min(totalTax, 12_500);
  }

  const taxAfterRebate = Math.max(0, totalTax - rebate);

  // ── Surcharge ──────────────────────────────────────────
  const sc   = taxAfterRebate * surchargeRate(income, filingType, regime);
  const base = taxAfterRebate + sc;

  // ── Health & Education Cess @ 4 % ─────────────────────
  const cess     = base * 0.04;
  const finalTax = Math.round(base + cess);

  return {
    slabWiseBreakdown: breakdown,
    taxBeforeRebate:   Math.round(totalTax),
    rebate:            Math.round(rebate),
    surcharge:         Math.round(sc),
    totalTax:          Math.round(base),   // tax + surcharge, before cess
    cess:              Math.round(cess),
    finalTax,
  };
};

// ──────────────────────────────────────────────
//  5. Dynamic ITR-type detector
// ──────────────────────────────────────────────
export const determineITRType = (state) => {
  const filingType = state.selectedFilingType || state.filingType || 'Individual';

  if (filingType === 'Individual2') {
    return { type: 'ITR-2', reason: 'Individual with detailed Salary, House Property or Capital Gains' };
  }
  if (filingType === 'Individual3') {
    return { type: 'ITR-3', reason: 'Individual with detailed Business/Profession Income (Schedule BP & Financials)' };
  }
  if (filingType === 'Individual4') {
    return { type: 'ITR-4', reason: 'Individual with Presumptive Business/Profession Income' };
  }

  // ITR-7: Trust & Exempt Entities
  if (
    filingType === 'Trust & Exempt Entities' ||
    state.isSection139_4 === 'Yes' ||
    state.isTrust === 'Yes'
  ) {
    return { type: 'ITR-7', reason: 'Applicable for Trusts / Entities u/s 139(4A/B/C/D)' };
  }

  // ITR-6: Companies
  if (filingType.includes('Company')) {
    return { type: 'ITR-6', reason: 'Applicable for Companies (Private / Public)' };
  }

  // ITR-5: LLP / AOP-BOI / Cooperative / Firm (non-presumptive)
  if (['LLP', 'AOP/BOI', 'Cooperative Society'].includes(filingType)) {
    return { type: 'ITR-5', reason: `Applicable for ${filingType}` };
  }

  if (filingType === 'Firm') {
    const income     = state.income || {};
    const presumptive = income.presumptive || {};
    const p44AD  = Number(presumptive.presumptiveIncome44AD  || state.presumptiveIncome44AD  || 0);
    const p44ADA = Number(presumptive.presumptiveIncome44ADA || state.presumptiveIncome44ADA || 0);
    const p44AE  = Number(presumptive.presumptiveIncome44AE  || state.presumptiveIncome44AE  || 0);
    const hasPresumptive = p44AD > 0 || p44ADA > 0 || p44AE > 0;
    if (hasPresumptive) {
      return { type: 'ITR-4', reason: 'Presumptive Business Income for Firm (≤ ₹50 Lakhs)' };
    }
    return { type: 'ITR-5', reason: 'Partnership Firm — normal business income' };
  }

  // HUF
  if (filingType === 'HUF') {
    const income       = state.income || {};
    const deductionsSec = state.deductions || {};
    const businessHP   = income.business || {};

    const p44AD   = Number(businessHP.presumptiveIncome44AD  || 0);
    const p44ADA  = Number(businessHP.presumptiveIncome44ADA || 0);
    const p44AE   = Number(businessHP.presumptiveIncome44AE  || 0);
    if (p44AD > 0 || p44ADA > 0 || p44AE > 0) {
      return { type: 'ITR-4', reason: 'HUF with Presumptive Business Income u/s 44AD/ADA/AE' };
    }

    const hasBusiness =
      Number(businessHP.netBusinessIncome || 0) > 0 ||
      Number(state.businessIncome || 0) > 0 ||
      Number(state.cryptoIncome   || 0) > 0;
    if (hasBusiness) {
      return { type: 'ITR-3', reason: 'HUF with Business / Professional Income' };
    }

    return { type: 'ITR-2', reason: 'HUF — Capital Gains / House Property / Other Sources' };
  }

  // Individual
  const income        = state.income || {};
  const businessHP    = income.business || {};
  const presumptive   = income.presumptive || {};

  const p44AD  = Number(presumptive.presumptiveIncome44AD  || businessHP.presumptiveIncome44AD  || state.businessIncome44AD  || 0);
  const p44ADA = Number(presumptive.presumptiveIncome44ADA || businessHP.presumptiveIncome44ADA || state.businessIncome44ADA || 0);
  const p44AE  = Number(presumptive.presumptiveIncome44AE  || businessHP.presumptiveIncome44AE  || state.businessIncome44AE  || 0);
  const hasPresumptive = p44AD > 0 || p44ADA > 0 || p44AE > 0;

  const hasBusiness =
    Number(businessHP.netBusinessIncome || 0)  > 0 ||
    Number(state.businessIncome         || 0)  > 0 ||
    Number(state.businessIncomeNormal   || 0)  > 0 ||
    Number(state.cryptoIncome           || 0)  > 0;

  const hasCapitalGains =
    Number(state.capitalGains || 0) > 0 ||
    Number(state.stcg         || 0) > 0 ||
    Number(state.ltcg         || 0) > 0 ||
    Number(state.deductions?.more?.stcg || 0) > 0 ||
    Number(state.deductions?.more?.ltcg || 0) > 0 ||
    Number(state.deductions?.more?.stcg111A || 0) > 0 ||
    Number(state.deductions?.more?.ltcg112A || 0) > 0;

  const hasForeignAssets =
    Number(state.foreignAssets      || 0) > 0 ||
    Number(state.otherDisclosures   || 0) > 0 ||
    Number(state.deductions?.more?.foreignAssets || 0) > 0 ||
    Number(state.deductions?.more?.otherDisclosures || 0) > 0;

  const salary   = Number(state.salaryIncome || 0) + Number(state.income?.salary?.grossSalary || 0);
  const interest = Number(state.interestIncome || 0) +
    Number(state.income?.other?.savingsInterest || 0) +
    Number(state.income?.other?.depositInterest || 0) +
    Number(state.income?.other?.refundInterest || 0);
  const total    = salary + interest + Number(state.capitalGains || state.deductions?.more?.stcg || state.deductions?.more?.ltcg || 0) + Number(state.businessIncome || state.income?.business?.netBusinessIncome || 0);
  const isHigh   = total > 5_000_000;

  if (hasPresumptive && !hasCapitalGains && !hasForeignAssets && !isHigh) {
    return { type: 'ITR-4', reason: 'Presumptive Business Income u/s 44AD / 44ADA / 44AE (≤ ₹50 Lakhs)' };
  }

  if (hasBusiness) {
    return { type: 'ITR-3', reason: 'Income from Business or Profession' };
  }

  if (hasCapitalGains || hasForeignAssets || isHigh) {
    const reasons = [];
    if (hasCapitalGains)          reasons.push('Capital Gains');
    if (hasForeignAssets)         reasons.push('Foreign Assets / Other Disclosures');
    if (isHigh)                   reasons.push('Income > ₹50 Lakhs');
    return { type: 'ITR-2', reason: reasons.join(' | ') };
  }

  return { type: 'ITR-1', reason: 'Salary / Single House Property / Other Sources (≤ ₹50 Lakhs)' };
};
