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

export const calculateTax = (income, slabs) => {
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

  const cess = totalTax * 0.04;
  const finalTax = totalTax + cess;

  return {
    slabWiseBreakdown,
    totalTax,
    cess,
    finalTax
  };
};
