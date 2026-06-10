export const filingTypeConfig = {
  'Individual': {
    id: 'individual',
    name: 'Individual',
    baseRoute: '/dashboard/pan-details',
    detailsRoute: '/dashboard/pan-details', 
    steps: [
      { id: 1, label: 'Personal Info', route: 'personal-info' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Deductions', route: 'deductions' },
      { id: 4, label: 'Taxes Paid', route: 'taxes' },
      { id: 5, label: 'Filing', route: 'filing' },
    ],
    subTabs: {} 
  },
  'Company Private': {
    id: 'company-private',
    name: 'Company Private',
    baseRoute: '/dashboard/company-private',
    detailsRoute: '/dashboard/company-private/details',
    steps: [
      { id: 1, label: 'Details',         route: 'details' },
      { id: 2, label: 'Income Sources',  route: 'income' },
      { id: 3, label: 'Financials',      route: 'financials' },
      { id: 4, label: 'Deductions',      route: 'deductions' },
      { id: 5, label: 'Taxes Paid',      route: 'taxes' },
      { id: 6, label: 'Filing',          route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general',        label: 'General Information' },
        { id: 'address',        label: 'Registered Address' },
        { id: 'key_persons',    label: 'Key Persons (Directors)' },
        { id: 'shareholders',   label: 'Shareholders (≥10%)' },
        { id: 'holding_status', label: 'Holding / Subsidiary Status' },
        { id: 'special_reg',    label: 'Special Registrations' },
        { id: 'tax_regime',     label: 'Tax Regime' },
        { id: 'audit',          label: 'Audit Information' },
      ],
      income: [
        { id: 'business',       label: 'Business & Profession' },
        { id: 'house_property', label: 'House Property' },
        { id: 'capital_gains',  label: 'Capital Gains' },
        { id: 'other_sources',  label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_equity_liabilities', label: 'Balance Sheet — Equity & Liabilities' },
        { id: 'bs_assets',             label: 'Balance Sheet — Assets' },
        { id: 'profit_loss',           label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a',      label: 'Chapter VI-A' },
        { id: 'exempt_income',  label: 'Exempt Income' },
        { id: 'losses',         label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds',            label: 'TDS' },
        { id: 'tcs',            label: 'TCS' },
        { id: 'advance_tax',    label: 'Advance & Self-Assessment Tax' },
        { id: 'mat',            label: 'MAT Credit' },
      ],
      filing: [
        { id: 'shareholding_sh1', label: 'Schedule SH-1 (Unlisted)' },
        { id: 'shareholding_sh2', label: 'Schedule SH-2 (Start-up)' },
        { id: 'gst',              label: 'GST Details' },
        { id: 'bank',             label: 'Bank Accounts' },
        { id: 'efiling',          label: 'E-Filing & Verification' },
      ],
    }
  },
  'HUF': {  
    id: 'huf', 
    name: 'HUF',
    baseRoute: '/dashboard/huf',
    detailsRoute: '/dashboard/huf/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Deductions', route: 'deductions' },
      { id: 4, label: 'Taxes Paid', route: 'taxes' },
      { id: 5, label: 'Filing', route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'permanent', label: 'General Information' },
        { id: 'karta', label: 'Karta Details' }, 
        { id: 'members', label: 'Co-parceners Details' },
        { id: 'additional', label: 'Permanent Address' },
      ],
      income: [
        { id: 'business', label: 'Business Income' },
        { id: 'house_property', label: 'House Property' },
        { id: 'other', label: 'Other Sources' },
      ],
      deductions: [
        { id: 'chapter6a', label: 'Chapter VI-A' },
        { id: 'more', label: 'Exempt Income' },
      ],
      taxes: [
        { id: 'tds', label: 'TDS' },
      ],
      filing: [
        { id: 'bank', label: 'Bank Info' },
        { id: 'efiling', label: 'E-Filing' },
      ]
    }
  },
  'AOP/BOI': {
    id: 'aop-boi',
    name: 'AOP/BOI',
    baseRoute: '/dashboard/aop-boi',
    detailsRoute: '/dashboard/aop-boi/details',
    steps: [
      { id: 1, label: 'Details',         route: 'details' },
      { id: 2, label: 'Income Sources',  route: 'income' },
      { id: 3, label: 'Financials',      route: 'financials' },
      { id: 4, label: 'Deductions',      route: 'deductions' },
      { id: 5, label: 'Taxes Paid',      route: 'taxes' },
      { id: 6, label: 'Filing',          route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general',         label: 'General Information' },
        { id: 'address',         label: 'Registered Address' },
        { id: 'partners',        label: 'Members Details' },
        { id: 'business_nature', label: 'Nature of Business' },
        { id: 'tax_regime',      label: 'Tax Regime' },
        { id: 'audit',           label: 'Audit Information' },
      ],
      income: [
        { id: 'business',        label: 'Business & Profession' },
        { id: 'presumptive',     label: 'Presumptive Income' },
        { id: 'house_property',  label: 'House Property' },
        { id: 'capital_gains',   label: 'Capital Gains' },
        { id: 'other_sources',   label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_sources',      label: 'Balance Sheet - Sources' },
        { id: 'bs_application',  label: 'Balance Sheet - Application' },
        { id: 'profit_loss',     label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a',       label: 'Chapter VI-A' },
        { id: 'exempt_income',   label: 'Exempt Income' },
        { id: 'losses',          label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds',             label: 'TDS' },
        { id: 'tcs',             label: 'TCS' },
        { id: 'advance_tax',     label: 'Advance & Self-Assessment Tax' },
        { id: 'amt',             label: 'AMT Credit' },
      ],
      filing: [
        { id: 'gst',             label: 'GST Details' },
        { id: 'bank',            label: 'Bank Accounts' },
        { id: 'efiling',         label: 'E-Filing & Verification' },
      ],
    }
  },
  'Company Public': {
    id: 'company-public',
    name: 'Company Public',
    baseRoute: '/dashboard/company-public',
    detailsRoute: '/dashboard/company-public/details',
    steps: [
      { id: 1, label: 'Details',         route: 'details' },
      { id: 2, label: 'Income Sources',  route: 'income' },
      { id: 3, label: 'Financials',      route: 'financials' },
      { id: 4, label: 'Deductions',      route: 'deductions' },
      { id: 5, label: 'Taxes Paid',      route: 'taxes' },
      { id: 6, label: 'Filing',          route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general',        label: 'General Information' },
        { id: 'address',        label: 'Registered Address' },
        { id: 'key_persons',    label: 'Key Persons (Directors)' },
        { id: 'shareholders',   label: 'Shareholders (≥10%)' },
        { id: 'holding_status', label: 'Holding / Subsidiary Status' },
        { id: 'special_reg',    label: 'Special Registrations' },
        { id: 'tax_regime',     label: 'Tax Regime' },
        { id: 'audit',          label: 'Audit Information' },
      ],
      income: [
        { id: 'business',       label: 'Business & Profession' },
        { id: 'house_property', label: 'House Property' },
        { id: 'capital_gains',  label: 'Capital Gains' },
        { id: 'other_sources',  label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_equity_liabilities', label: 'Balance Sheet — Equity & Liabilities' },
        { id: 'bs_assets',             label: 'Balance Sheet — Assets' },
        { id: 'profit_loss',           label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a',      label: 'Chapter VI-A' },
        { id: 'exempt_income',  label: 'Exempt Income' },
        { id: 'losses',         label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds',            label: 'TDS' },
        { id: 'tcs',            label: 'TCS' },
        { id: 'advance_tax',    label: 'Advance & Self-Assessment Tax' },
        { id: 'mat',            label: 'MAT Credit' },
      ],
      filing: [
        { id: 'gst',            label: 'GST Details' },
        { id: 'bank',           label: 'Bank Accounts' },
        { id: 'efiling',        label: 'E-Filing & Verification' },
      ],
    } 
  },
  'Firm': {
    id: 'firm',
    name: 'Firm',
    baseRoute: '/dashboard/firm',
    detailsRoute: '/dashboard/firm/details',
    steps: [
      { id: 1, label: 'Details',         route: 'details' },
      { id: 2, label: 'Income Sources',  route: 'income' },
      { id: 3, label: 'Financials',      route: 'financials' },
      { id: 4, label: 'Deductions',      route: 'deductions' },
      { id: 5, label: 'Taxes Paid',      route: 'taxes' },
      { id: 6, label: 'Filing',          route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general',         label: 'General Information' },
        { id: 'address',         label: 'Registered Address' },
        { id: 'partners',        label: 'Partners Details' },
        { id: 'business_nature', label: 'Nature of Business' },
        { id: 'tax_regime',      label: 'Tax Regime' },
        { id: 'audit',           label: 'Audit Information' },
      ],
      income: [
        { id: 'business',        label: 'Business & Profession' },
        { id: 'presumptive',     label: 'Presumptive Income' },
        { id: 'house_property',  label: 'House Property' },
        { id: 'capital_gains',   label: 'Capital Gains' },
        { id: 'other_sources',   label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_sources',      label: 'Balance Sheet - Sources' },
        { id: 'bs_application',  label: 'Balance Sheet - Application' },
        { id: 'profit_loss',     label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a',       label: 'Chapter VI-A' },
        { id: 'exempt_income',   label: 'Exempt Income' },
        { id: 'losses',          label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds',             label: 'TDS' },
        { id: 'tcs',             label: 'TCS' },
        { id: 'advance_tax',     label: 'Advance & Self-Assessment Tax' },
        { id: 'amt',             label: 'AMT Credit' },
      ],
      filing: [
        { id: 'gst',             label: 'GST Details' },
        { id: 'bank',            label: 'Bank Accounts' },
        { id: 'efiling',         label: 'E-Filing & Verification' },
      ],
    }
  },
  'Cooperative Society': {
    id: 'cooperative-society',
    name: 'Cooperative Society',
    baseRoute: '/dashboard/cooperative-society',
    detailsRoute: '/dashboard/cooperative-society/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Deductions', route: 'deductions' },
      { id: 4, label: 'Taxes Paid', route: 'taxes' },
      { id: 5, label: 'Filing', route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'permanent', label: 'Permanent Info' },
        { id: 'address', label: 'Address' },
        { id: 'members', label: 'Members Details' },
        { id: 'additional', label: 'Additional Info' },
        { id: 'registration', label: 'Registration' },
      ],
      income: [
        { id: 'business', label: 'Business Income' },
        { id: 'capital', label: 'Capital Gains' },
        { id: 'other', label: 'Other Sources' },
      ],
      deductions: [
        { id: 'chapter6a', label: 'Chapter VI-A' },
        { id: 'more', label: 'More Deductions' },
      ],
      taxes: [
        { id: 'ais', label: 'AIS' },
        { id: 'tds', label: 'TDS/TCS' },
        { id: 'self', label: 'Self Tax Payments' },
        { id: 'loss', label: 'Loss Summary' },
      ],
      filing: [
        { id: 'bank', label: 'Bank Info' },
        { id: 'more', label: 'More Info' },
        { id: 'efiling', label: 'E-Filing' },
      ]
    }
  },
  'LLP': {
    id: 'llp',
    name: 'LLP',
    baseRoute: '/dashboard/llp',
    detailsRoute: '/dashboard/llp/details',
    steps: [
      { id: 1, label: 'Details',         route: 'details' },
      { id: 2, label: 'Income Sources',  route: 'income' },
      { id: 3, label: 'Financials',      route: 'financials' },
      { id: 4, label: 'Deductions',      route: 'deductions' },
      { id: 5, label: 'Taxes Paid',      route: 'taxes' },
      { id: 6, label: 'Filing',          route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general',         label: 'General Information' },
        { id: 'address',         label: 'Registered Address' },
        { id: 'partners',        label: 'Partners/Members' },
        { id: 'business_nature', label: 'Nature of Business' },
        { id: 'tax_regime',      label: 'Tax Regime' },
        { id: 'audit',           label: 'Audit Information' },
      ],
      income: [
        { id: 'business',        label: 'Business & Profession' },
        { id: 'presumptive',     label: 'Presumptive Income' },
        { id: 'house_property',  label: 'House Property' },
        { id: 'capital_gains',   label: 'Capital Gains' },
        { id: 'other_sources',   label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_sources',      label: 'Balance Sheet - Sources' },
        { id: 'bs_application',  label: 'Balance Sheet - Application' },
        { id: 'profit_loss',     label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a',       label: 'Chapter VI-A' },
        { id: 'exempt_income',   label: 'Exempt Income' },
        { id: 'losses',          label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds',             label: 'TDS' },
        { id: 'tcs',             label: 'TCS' },
        { id: 'advance_tax',     label: 'Advance & Self-Assessment Tax' },
        { id: 'amt',             label: 'AMT Credit' },
      ],
      filing: [
        { id: 'gst',             label: 'GST Details' },
        { id: 'bank',            label: 'Bank Accounts' },
        { id: 'efiling',         label: 'E-Filing & Verification' },
      ],
    },
  },
  'Trust & Exempt Entities': {
    id: 'trust_exempt',
    name: 'Trust & Exempt Entities',
    baseRoute: '/dashboard/trust-exempt',
    detailsRoute: '/dashboard/trust-exempt/basic',
    steps: [
      { id: 1, label: 'Basic',    route: 'basic' },
      { id: 2, label: 'Personal Details', route: 'personal' },
      { id: 3, label: 'Audit',  route: 'audit' },
      { id: 4, label: 'Schedules',        route: 'schedules' },
      { id: 5, label: 'Income Sources',   route: 'income' },
      { id: 6, label: 'Tax & Filing',     route: 'tax' },
    ],
    subTabs: { 
      basic: [
        { id: 'entity_details',         label: 'Entity Details' },
        { id: 'projects_institutions',  label: 'Projects & Institutions' },
      ],
      personal: [
        { id: 'registration_it',   label: 'IT Registration' },
        { id: 'registration_other', label: 'Other Registrations' },
        { id: 'filing_status',     label: 'Filing Status' },
        { id: 'other_details',     label: 'Other Details' },
      ],
      audit: [
        { id: 'transfer_pricing',   label: 'Transfer Pricing (92E)' },
        { id: 'income_tax_audit',   label: 'Income Tax Audit' },
        { id: 'other_act_audit',    label: 'Other Act Audit' },
        { id: 'aop_members',        label: 'Members & Trustees' },
      ],
      schedules: [
        { id: 'schedule_i',      label: 'Schedule I — Accumulations' },
        { id: 'schedule_vc',     label: 'Schedule VC — Contributions' },
        { id: 'schedule_ai_er',  label: 'Schedules AI / ER / EC' },
        { id: 'schedule_j',      label: 'Schedule J — Corpus & Investments' },
        { id: 'schedule_la_et',  label: 'Schedules LA & ET' },
        { id: 'balance_sheet',   label: 'Balance Sheet & Schedule R' },
      ],
      income: [
        { id: 'house_property',      label: 'House Property' },
        { id: 'capital_gains',       label: 'Capital Gains' },
        { id: 'other_sources',       label: 'Other Sources' },
        { id: 'business_profession', label: 'Business & Profession' },
        { id: 'loss_setoff',         label: 'Loss, PTI & Special Income' },
        { id: 'foreign_income',      label: 'Foreign Income & Assets' },
      ],
      tax: [
        { id: 'total_income',  label: 'Total Income & Tax' },
        { id: 'advance_tds',   label: 'Advance Tax / TDS / TCS' },
        { id: 'verification',  label: 'Verification' },
      ],
    },
  },
};
