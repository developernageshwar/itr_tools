export const NEW_REGIME_SLABS = [
  { min: 0, max: 400000, rate: 0 },
  { min: 400000, max: 800000, rate: 5 },
  { min: 800000, max: 1200000, rate: 10 },
  { min: 1200000, max: 1600000, rate: 15 },
  { min: 1600000, max: 2000000, rate: 20 },
  { min: 2000000, max: 2400000, rate: 25 },
  { min: 2400000, max: Infinity, rate: 30 },
];

export const OLD_REGIME_SLABS = [
  { min: 0, max: 250000, rate: 0 },
  { min: 250000, max: 500000, rate: 5 },
  { min: 500000, max: 1000000, rate: 20 },
  { min: 1000000, max: Infinity, rate: 30 }, 
];

export const calculateTax = (income, slabs, regime = 'new') => {
  let totalTax = 0;
  const slabWiseBreakdown = [];

  for (const slab of slabs) {
    if (income > slab.min) {
      const taxableAmountInSlab = Math.min(income, slab.max) - slab.min;
      const taxAmount = (taxableAmountInSlab * slab.rate) / 100; 
      totalTax += taxAmount;

      slabWiseBreakdown.push({
        min: slab.min,
        max: slab.max === Infinity ? 'Above ' + slab.min : slab.max,
        rate: slab.rate,
        taxableAmount: taxableAmountInSlab,
        taxAmount: taxAmount
      });
    } else {
      slabWiseBreakdown.push({
        min: slab.min,
        max: slab.max === Infinity ? 'Above ' + slab.min : slab.max,
        rate: slab.rate,
        taxableAmount: 0,
        taxAmount: 0
      });
    }
  }

  // Rebate u/s 87A
  let rebate = 0;
  if (regime === 'new' && income <= 700000) {
    rebate = Math.min(totalTax, 25000);
  } else if (regime === 'old' && income <= 500000) {
    rebate = Math.min(totalTax, 12500);
  }

  let taxAfterRebate = totalTax - rebate;
  if (taxAfterRebate < 0) taxAfterRebate = 0; 

  // Surcharge
  let surchargeRate = 0;
  if (income > 5000000 && income <= 10000000) surchargeRate = 0.10;
  else if (income > 10000000 && income <= 20000000) surchargeRate = 0.15;
  else if (income > 20000000) {
    if (regime === 'new') surchargeRate = 0.25; // Capped at 25% in new regime
    else if (income <= 50000000) surchargeRate = 0.25;
    else surchargeRate = 0.37;
  }

  const surcharge = taxAfterRebate * surchargeRate;
  const taxAndSurcharge = taxAfterRebate + surcharge;

  const cess = taxAndSurcharge * 0.04;
  const finalTax = taxAndSurcharge + cess;

  return {
    slabWiseBreakdown,
    taxBeforeRebate: totalTax,
    rebate,
    surcharge,
    totalTax: taxAndSurcharge,
    cess,
    finalTax
  };
};

export const determineITRType = (state) => {
  const filingType = state.selectedFilingType || state.filingType || 'Individual';

  console.log(filingType, 'filingType')

  const totalIncome =
    Number(state.salaryIncome || 0) +
    Number(state.interestIncome || 0) +
    Number(state.capitalGains || 0) +
    Number(state.houseProperties || 0) +
    Number(state.dividendIncome || 0) +
    Number(state.businessIncome || 0) +
    Number(state.cryptoIncome || 0) +
    Number(state.otherIncome || 0);

  if (filingType === 'Company') return { type: 'ITR-6', reason: 'Applicable for Companies' };
  if (['Firm', 'LLP', 'AOP', 'BOI', 'Artificial Juridical Person', 'Local Authority', 'Cooperative Society'].includes(filingType)) {
    return { type: 'ITR-5', reason: `Applicable for ${filingType}` };
  }

  const hasBusinessIncome = Number(state.businessIncome || 0) > 0 || Number(state.cryptoIncome || 0) > 0;
  const hasPresumptiveIncome = Number(state.presumptiveIncome || 0) > 0; // In case added later
  const hasCapitalGains = Number(state.capitalGains || 0) > 0;
  const hasForeignAssets = Number(state.foreignAssets || 0) > 0;
  const hasOtherDisclosures = Number(state.otherDisclosures || 0) > 0;
  const isHighIncome = totalIncome > 5000000;

  if (hasPresumptiveIncome) {
    if (!isHighIncome && !hasCapitalGains && !hasForeignAssets && !hasOtherDisclosures && filingType !== 'LLP') {
      return { type: 'ITR-4', reason: 'Presumptive Business Income (≤ ₹50 Lakhs)' };
    }
  }

  if (hasBusinessIncome) {
    return { type: 'ITR-3', reason: 'Income from Business or Profession' };
  }

  if (hasCapitalGains || hasForeignAssets || hasOtherDisclosures || isHighIncome || filingType === 'HUF') {
    const reasons = [];
    if (hasCapitalGains) reasons.push('Capital Gains');
    if (hasForeignAssets || hasOtherDisclosures) reasons.push('Foreign Assets');
    if (isHighIncome) reasons.push('Income > ₹50 Lakhs');
    if (filingType === 'HUF') reasons.push('HUF Filing');
    return { type: 'ITR-2', reason: `${reasons.join(', ')}` }; 
  }

  return { type: 'ITR-1', reason: 'Income from Salary/Interest (≤ ₹50 Lakhs)' };
};
