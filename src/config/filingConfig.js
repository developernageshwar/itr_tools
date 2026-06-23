export const filingTypeConfig = {
  'ITR1': {
    id: 'ITR1',
    name: 'ITR1',
    baseRoute: '/dashboard/ITR1',
    detailsRoute: '/dashboard/ITR1/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Deductions', route: 'deductions' },
      { id: 4, label: 'Taxes Paid', route: 'taxes' },
      { id: 5, label: 'Filing', route: 'filing' },
      { id: 6, label: 'Tax Summary', route: 'tax-summary' },
    ],
    subTabs: {
      details: [
        { id: 'personal-identity', label: 'Personal Identity & Employment' },
        { id: 'contact-communications', label: 'Contact & Communications' },
        { id: 'address-specifications', label: 'Address Specifications' },
      ],
      income: [
        { id: 'salary-pension-income', label: 'Salary / Pension Income' },
        { id: 'house-property-income', label: 'House Property Income' },
        { id: 'hra-calculation-schedule', label: 'HRA Calculation Schedule' },
        { id: 'standalone-loan-interest-schedule', label: 'Loan Interest u/s 24(b)' },
        { id: 'other-sources-income', label: 'Other Sources Income' },
      ],
      deductions: [
        { id: 'savings-and-pension-deductions', label: 'Savings & Pension (80C / 80CCC)' },
        { id: 'medical-health-deductions', label: 'Medical & Health (80D)' },
        { id: 'loan-interest-deductions', label: 'Loan Interest (80E / 80EE / 80EEA / 80EEB)' },
        { id: 'charitable-donations-schedule', label: 'Donations (80G / 80GGA)' },
        { id: 'scientific-political-disability-deductions', label: 'Scientific, Political & Disability (80GGA / 80GGC / 80U / 80DD)' },
      ],
      taxes: [
        { id: 'tds-schedules-ledger', label: 'TDS Schedules (Form 16 / 16A / 16C)' },
        { id: 'tcs-and-challan-schedules', label: 'TCS & Advance Tax Challans' },
      ],
      filing: [
        { id: 'voluntary-filing-criteria', label: 'Voluntary Filing Criteria (7th Proviso)' },
        { id: 'representative-metadata', label: 'Representative Assessee' },
        { id: 'statutory-filing-details', label: 'Statutory Filing Details' },
        { id: 'updated-return-schedule-itru', label: 'Updated Return (ITR-U)' },
        { id: 'taxation-reconciliation-ledger', label: 'Tax Reconciliation Ledger' },
        { id: 'exempt-income-reporting', label: 'Exempt Income Reporting' },
        { id: 'banking-payment-channels', label: 'Bank Account Details' },
        { id: 'legal-signatures-verification', label: 'Verification & Signature' },
        { id: 'itru-computation-matrix', label: 'ITR-U Computation Matrix' },
        // { id: 'efiling', label: 'E-Filing' } 
      ]
    }
  },
  'ITR2': {
    id: 'ITR2',
    name: 'ITR2',
    baseRoute: '/dashboard/ITR2',
    detailsRoute: '/dashboard/ITR2/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Deductions', route: 'deductions' },
      { id: 4, label: 'Taxes Paid', route: 'taxes' },
      { id: 5, label: 'Filing', route: 'filing' },
      { id: 6, label: 'Tax Summary', route: 'tax-summary' },
    ],
    subTabs: {
      details: [
        { id: 'part-a-gen', label: 'Part A: General Information' },
        { id: 'filing-status-blocks', label: 'Filing Status & Conditional Disclosures' },
      ],
      income: [
        { id: 'schedule-s-salary', label: 'Schedule S: Income from Salary' },
        { id: 'schedule-hp-house-property', label: 'Schedule HP: Income from House Property' },
        { id: 'schedule-cg-capital-gains', label: 'Schedule CG: Capital Gains' },
        { id: 'schedule-os-other-sources', label: 'Schedule OS: Income from Other Sources' },
        { id: 'special-exempt-clubbed', label: 'Exempt Income, Clubbing & Special Schedules' },
      ],
      deductions: [
        { id: 'schedule-via-deductions', label: 'Schedule VI-A: Deductions (Chapter VI-A)' },
      ],
      taxes: [
        { id: 'tax-payments-schedules', label: 'Tax Payments & Credits Verification' },
      ],
      filing: [
        { id: 'filing-verification-step', label: 'Filing, Verification & Bank Accounts Setup' },
        // { id: 'efiling', label: 'E-Filing' }
      ]
    }
  },

  'ITR4': {
    id: 'ITR4',
    name: 'ITR4',
    baseRoute: '/dashboard/ITR4',
    detailsRoute: '/dashboard/ITR4/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Deductions', route: 'deductions' },
      { id: 4, label: 'Taxes Paid', route: 'taxes' },
      { id: 5, label: 'Filing', route: 'filing' },
      { id: 6, label: 'Tax Summary', route: 'tax-summary' },
    ],
    subTabs: {
      details: [
        { id: 'permanent', label: 'General Information' },
        { id: 'karta', label: 'Aadhaar & Employment Rules' },
        // { id: 'members', label: 'Filing Structure & Regimes' },
        // { id: 'additional', label: 'Special Provisos & Representatives' }, 
      ],
      income: [
        { id: 'business', label: 'Presumptive Schedules (Schedule BP)' },
        { id: 'house_property', label: 'House Property Component' },
        { id: 'other', label: 'Other Sources & Salaries' },
      ],
      deductions: [
        { id: 'chapter6a', label: 'Chapter VI-A Core Deductions' },
        { id: 'more', label: 'Other Deductions & Exempt Incomes' },
      ],
      taxes: [
        { id: 'tds', label: 'Tax Deducted Sourced (TDS/TCS)' },
        { id: 'advance_tax', label: 'Challan Deposits Matrix' },
      ],
      filing: [
        { id: 'bank', label: 'Bank Accounts & Global Controls' },
        // { id: 'efiling', label: 'E-Filing' }
      ]
    }
  },
  'ITR3': {
    id: 'ITR3',
    name: 'ITR3',
    baseRoute: '/dashboard/ITR3',
    detailsRoute: '/dashboard/ITR3/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Deductions', route: 'deductions' },
      { id: 4, label: 'Taxes Paid', route: 'taxes' },
      { id: 5, label: 'Filing', route: 'filing' },
      { id: 6, label: 'Tax Summary', route: 'tax-summary' },
    ],
    subTabs: {
      details: [
        { id: 'general_info', label: 'Part A: General Information' },
        { id: 'nature_of_business_subsection', label: 'SECTION 2 — Nature of Business' },
      ],
      income: [
        { id: 'business_profession_regular', label: 'Business / Profession Regular Accounts' },
        { id: 'business_profession_presumptive', label: 'Business / Profession Presumptive' },
        { id: 'salary_house_property_schedules', label: 'Salary, House Property & BP' },
      ],
      deductions: [
        { id: 'schedule_dep_scientific_research', label: 'Depreciation & Scientific Research' },
        { id: 'chapter_via_and_10a', label: 'Chapter VI-A & 10A Deductions' },
      ],
      taxes: [
        { id: 'tax_payments_schedules', label: 'TDS, TCS & Advance Tax Paid' },
      ],
      filing: [
        { id: 'bank_details_schedules', label: 'Bank Accounts & Filing' },
        // { id: 'efiling', label: 'E-Filing' }
      ]
    }
  },
  'Company Private': {
    id: 'company-private',
    name: 'Company Private',
    baseRoute: '/dashboard/company-private',
    detailsRoute: '/dashboard/company-private/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Financials', route: 'financials' },
      { id: 4, label: 'Deductions', route: 'deductions' },
      { id: 5, label: 'Taxes Paid', route: 'taxes' },
      { id: 6, label: 'Filing', route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general', label: 'General Information' },
        { id: 'address', label: 'Registered Address' },
        { id: 'key_persons', label: 'Key Persons (Directors)' },
        { id: 'shareholders', label: 'Shareholders (≥10%)' },
        { id: 'holding_status', label: 'Holding / Subsidiary Status' },
        { id: 'special_reg', label: 'Special Registrations' },
        { id: 'tax_regime', label: 'Tax Regime' },
        { id: 'audit', label: 'Audit Information' },
      ],
      income: [
        { id: 'business', label: 'Business & Profession' },
        { id: 'house_property', label: 'House Property' },
        { id: 'capital_gains', label: 'Capital Gains' },
        { id: 'other_sources', label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_equity_liabilities', label: 'Balance Sheet — Equity & Liabilities' },
        { id: 'bs_assets', label: 'Balance Sheet — Assets' },
        { id: 'profit_loss', label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a', label: 'Chapter VI-A' },
        { id: 'exempt_income', label: 'Exempt Income' },
        { id: 'losses', label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds', label: 'TDS' },
        { id: 'tcs', label: 'TCS' },
        { id: 'advance_tax', label: 'Advance & Self-Assessment Tax' },
        { id: 'mat', label: 'MAT Credit' },
      ],
      filing: [
        { id: 'shareholding_sh1', label: 'Schedule SH-1 (Unlisted)' },
        { id: 'shareholding_sh2', label: 'Schedule SH-2 (Start-up)' },
        { id: 'gst', label: 'GST Details' },
        { id: 'bank', label: 'Bank Accounts' },
        { id: 'efiling', label: 'E-Filing & Verification' },
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
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Financials', route: 'financials' },
      { id: 4, label: 'Deductions', route: 'deductions' },
      { id: 5, label: 'Taxes Paid', route: 'taxes' },
      { id: 6, label: 'Filing', route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general', label: 'General Information' },
        { id: 'address', label: 'Registered Address' },
        { id: 'partners', label: 'Members Details' },
        { id: 'business_nature', label: 'Nature of Business' },
        { id: 'tax_regime', label: 'Tax Regime' },
        { id: 'audit', label: 'Audit Information' },
      ],
      income: [
        { id: 'business', label: 'Business & Profession' },
        { id: 'presumptive', label: 'Presumptive Income' },
        { id: 'house_property', label: 'House Property' },
        { id: 'capital_gains', label: 'Capital Gains' },
        { id: 'other_sources', label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_sources', label: 'Balance Sheet - Sources' },
        { id: 'bs_application', label: 'Balance Sheet - Application' },
        { id: 'profit_loss', label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a', label: 'Chapter VI-A' },
        { id: 'exempt_income', label: 'Exempt Income' },
        { id: 'losses', label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds', label: 'TDS' },
        { id: 'tcs', label: 'TCS' },
        { id: 'advance_tax', label: 'Advance & Self-Assessment Tax' },
        { id: 'amt', label: 'AMT Credit' },
      ],
      filing: [
        { id: 'gst', label: 'GST Details' },
        { id: 'bank', label: 'Bank Accounts' },
        { id: 'efiling', label: 'E-Filing & Verification' },
      ],
    }
  },
  'Company Public': {
    id: 'company-public',
    name: 'Company Public',
    baseRoute: '/dashboard/company-public',
    detailsRoute: '/dashboard/company-public/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Financials', route: 'financials' },
      { id: 4, label: 'Deductions', route: 'deductions' },
      { id: 5, label: 'Taxes Paid', route: 'taxes' },
      { id: 6, label: 'Filing', route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general', label: 'General Information' },
        { id: 'address', label: 'Registered Address' },
        { id: 'key_persons', label: 'Key Persons (Directors)' },
        { id: 'shareholders', label: 'Shareholders (≥10%)' },
        { id: 'holding_status', label: 'Holding / Subsidiary Status' },
        { id: 'special_reg', label: 'Special Registrations' },
        { id: 'tax_regime', label: 'Tax Regime' },
        { id: 'audit', label: 'Audit Information' },
      ],
      income: [
        { id: 'business', label: 'Business & Profession' },
        { id: 'house_property', label: 'House Property' },
        { id: 'capital_gains', label: 'Capital Gains' },
        { id: 'other_sources', label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_equity_liabilities', label: 'Balance Sheet — Equity & Liabilities' },
        { id: 'bs_assets', label: 'Balance Sheet — Assets' },
        { id: 'profit_loss', label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a', label: 'Chapter VI-A' },
        { id: 'exempt_income', label: 'Exempt Income' },
        { id: 'losses', label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds', label: 'TDS' },
        { id: 'tcs', label: 'TCS' },
        { id: 'advance_tax', label: 'Advance & Self-Assessment Tax' },
        { id: 'mat', label: 'MAT Credit' },
      ],
      filing: [
        { id: 'gst', label: 'GST Details' },
        { id: 'bank', label: 'Bank Accounts' },
        { id: 'efiling', label: 'E-Filing & Verification' },
      ],
    }
  },
  'Firm': {
    id: 'firm',
    name: 'Firm',
    baseRoute: '/dashboard/firm',
    detailsRoute: '/dashboard/firm/details',
    steps: [
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Financials', route: 'financials' },
      { id: 4, label: 'Deductions', route: 'deductions' },
      { id: 5, label: 'Taxes Paid', route: 'taxes' },
      { id: 6, label: 'Filing', route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general', label: 'General Information' },
        { id: 'address', label: 'Registered Address' },
        { id: 'partners', label: 'Partners Details' },
        { id: 'business_nature', label: 'Nature of Business' },
        { id: 'tax_regime', label: 'Tax Regime' },
        { id: 'audit', label: 'Audit Information' },
      ],
      income: [
        { id: 'business', label: 'Business & Profession' },
        { id: 'presumptive', label: 'Presumptive Income' },
        { id: 'house_property', label: 'House Property' },
        { id: 'capital_gains', label: 'Capital Gains' },
        { id: 'other_sources', label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_sources', label: 'Balance Sheet - Sources' },
        { id: 'bs_application', label: 'Balance Sheet - Application' },
        { id: 'profit_loss', label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a', label: 'Chapter VI-A' },
        { id: 'exempt_income', label: 'Exempt Income' },
        { id: 'losses', label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds', label: 'TDS' },
        { id: 'tcs', label: 'TCS' },
        { id: 'advance_tax', label: 'Advance & Self-Assessment Tax' },
        { id: 'amt', label: 'AMT Credit' },
      ],
      filing: [
        { id: 'gst', label: 'GST Details' },
        { id: 'bank', label: 'Bank Accounts' },
        { id: 'efiling', label: 'E-Filing & Verification' },
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
      { id: 1, label: 'Details', route: 'details' },
      { id: 2, label: 'Income Sources', route: 'income' },
      { id: 3, label: 'Financials', route: 'financials' },
      { id: 4, label: 'Deductions', route: 'deductions' },
      { id: 5, label: 'Taxes Paid', route: 'taxes' },
      { id: 6, label: 'Filing', route: 'filing' },
    ],
    subTabs: {
      details: [
        { id: 'general', label: 'General Information' },
        { id: 'address', label: 'Registered Address' },
        { id: 'partners', label: 'Partners/Members' },
        { id: 'business_nature', label: 'Nature of Business' },
        { id: 'tax_regime', label: 'Tax Regime' },
        { id: 'audit', label: 'Audit Information' },
      ],
      income: [
        { id: 'business', label: 'Business & Profession' },
        { id: 'presumptive', label: 'Presumptive Income' },
        { id: 'house_property', label: 'House Property' },
        { id: 'capital_gains', label: 'Capital Gains' },
        { id: 'other_sources', label: 'Other Sources' },
      ],
      financials: [
        { id: 'bs_sources', label: 'Balance Sheet - Sources' },
        { id: 'bs_application', label: 'Balance Sheet - Application' },
        { id: 'profit_loss', label: 'Profit & Loss' },
      ],
      deductions: [
        { id: 'chapter6a', label: 'Chapter VI-A' },
        { id: 'exempt_income', label: 'Exempt Income' },
        { id: 'losses', label: 'Losses & Carry Forward' },
      ],
      taxes: [
        { id: 'tds', label: 'TDS' },
        { id: 'tcs', label: 'TCS' },
        { id: 'advance_tax', label: 'Advance & Self-Assessment Tax' },
        { id: 'amt', label: 'AMT Credit' },
      ],
      filing: [
        { id: 'gst', label: 'GST Details' },
        { id: 'bank', label: 'Bank Accounts' },
        { id: 'efiling', label: 'E-Filing & Verification' },
      ],
    },
  },
  'Trust & Exempt Entities': {
    id: 'trust_exempt',
    name: 'Trust & Exempt Entities',
    baseRoute: '/dashboard/trust-exempt',
    detailsRoute: '/dashboard/trust-exempt/basic',
    steps: [
      { id: 1, label: 'Basic', route: 'basic' },
      { id: 2, label: 'Personal Details', route: 'personal' },
      { id: 3, label: 'Audit', route: 'audit' },
      { id: 4, label: 'Schedules', route: 'schedules' },
      { id: 5, label: 'Income Sources', route: 'income' },
      { id: 6, label: 'Tax & Filing', route: 'tax' },
    ],
    subTabs: {
      basic: [
        { id: 'entity_details', label: 'Entity Details' },
        { id: 'projects_institutions', label: 'Projects & Institutions' },
      ],
      personal: [
        { id: 'registration_it', label: 'IT Registration' },
        { id: 'registration_other', label: 'Other Registrations' },
        { id: 'filing_status', label: 'Filing Status' },
        { id: 'other_details', label: 'Other Details' },
      ],
      audit: [
        { id: 'transfer_pricing', label: 'Transfer Pricing (92E)' },
        { id: 'income_tax_audit', label: 'Income Tax Audit' },
        { id: 'other_act_audit', label: 'Other Act Audit' },
        { id: 'aop_members', label: 'Members & Trustees' },
      ],
      schedules: [
        { id: 'schedule_i', label: 'Schedule I — Accumulations' },
        { id: 'schedule_vc', label: 'Schedule VC — Contributions' },
        { id: 'schedule_ai_er', label: 'Schedules AI / ER / EC' },
        { id: 'schedule_j', label: 'Schedule J — Corpus & Investments' },
        { id: 'schedule_la_et', label: 'Schedules LA & ET' },
        { id: 'balance_sheet', label: 'Balance Sheet & Schedule R' },
      ],
      income: [
        { id: 'house_property', label: 'House Property' },
        { id: 'capital_gains', label: 'Capital Gains' },
        { id: 'other_sources', label: 'Other Sources' },
        { id: 'business_profession', label: 'Business & Profession' },
        { id: 'loss_setoff', label: 'Loss, PTI & Special Income' },
        { id: 'foreign_income', label: 'Foreign Income & Assets' },
      ],
      tax: [
        { id: 'total_income', label: 'Total Income & Tax' },
        { id: 'advance_tds', label: 'Advance Tax / TDS / TCS' },
        { id: 'verification', label: 'Verification' },
      ],
    },
  },
};
