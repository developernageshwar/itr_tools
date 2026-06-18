const companyCommonDetails = {
  general: {
    title: 'General Information',
    subtitle: 'Basic identity details of the company.',
    sections: [
      {
        title: 'Company Identity Details', 
        fields: [
          { name: 'companyName', label: 'Name of Company *', type: 'text', required: true },
          { name: 'oldCompanyName', label: 'Old Name (if name changed during the year)', type: 'text', required: false },
          { name: 'panNumber', label: 'PAN of Company *', type: 'text', required: true },
          { name: 'cin', label: 'Corporate Identity Number (CIN) *', type: 'text', required: false },
          { name: 'dateOfIncorporation', label: 'Date of Incorporation *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
          { name: 'dateOfCommencementOfBusiness', label: 'Date of Commencement of Business', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
          { name: 'status', label: 'Status *', type: 'select', options: ['Domestic Company', 'Foreign Company'], required: true },
          { name: 'isDomestic', label: 'Domestic Company? *', type: 'select', options: ['Yes', 'No'], required: true },
          { name: 'residentialStatus', label: 'Residential Status *', type: 'select', options: ['Resident', 'Non-Resident'], required: true },
          { name: 'filingSection', label: 'Filing Section (Filed u/s) *', type: 'select', options: ['139(1) - On or before due date', '139(4) - Belated', '139(5) - Revised', '139(8A) - Updated Return'], required: true },
          { name: 'receiptNoIfRevised', label: 'Receipt No. (if revised/defective)', type: 'text', required: false },
          { name: 'dateOfOriginalReturn', label: 'Date of filing original return', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
          { name: 'dinNumber', label: 'Notice DIN Number', type: 'text', required: false },
          { name: 'dateOfNotice', label: 'Date of Notice/Order', type: 'text', placeholder: 'DD/MM/YYYY', required: false }
        ] 
      } 
    ]
  },
  address: {
    title: 'Registered Address',
    subtitle: 'Registered office contact details of the company.',
    sections: [
      {
        title: 'Office Contact Details',
        fields: [
          { name: 'flatNo', label: 'Flat/Door/Block No. *', type: 'text', required: true },
          { name: 'premiseName', label: 'Name of Premises/Building/Village', type: 'text', required: false },
          { name: 'roadStreet', label: 'Road/Street/Post Office', type: 'text', required: false },
          { name: 'areaLocality', label: 'Area/Locality *', type: 'text', required: true },
          { name: 'city', label: 'Town/City/District *', type: 'text', required: true },
          { name: 'state', label: 'State *', type: 'select', options: ['ANDHRA PRADESH', 'ASSAM', 'BIHAR', 'CHHATTISGARH', 'DELHI', 'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH', 'JAMMU & KASHMIR', 'JHARKHAND', 'KARNATAKA', 'KERALA', 'MADHYA PRADESH', 'MAHARASHTRA', 'ODISHA', 'PUNJAB', 'RAJASTHAN', 'TAMIL NADU', 'TELANGANA', 'UTTAR PRADESH', 'UTTARAKHAND', 'WEST BENGAL'], required: true },
          { name: 'country', label: 'Country/Region *', type: 'select', options: ['INDIA'], required: true },
          { name: 'pincode', label: 'PIN Code *', type: 'number', required: true },
          { name: 'email1', label: 'Email Address - 1 *', type: 'text', required: true },
          { name: 'email2', label: 'Email Address - 2', type: 'text', required: false },
          { name: 'countryCode1', label: 'Country Code (Mobile 1)', type: 'text', required: false },
          { name: 'mobile1', label: 'Mobile No. 1 *', type: 'text', required: true },
          { name: 'stdIsdCode', label: 'STD/ISD Code (Office Phone)', type: 'text', required: false },
          { name: 'officePhone', label: 'Office Phone Number', type: 'text', required: false },
          { name: 'countryCode2', label: 'Country Code (Mobile 2)', type: 'text', required: false },
          { name: 'mobile2', label: 'Mobile No. 2', type: 'text', required: false }
        ]
      }
    ]
  },
  key_persons: {
    title: 'Key Persons',
    subtitle: 'Provide details of Directors and key officials.',
    sections: [
      {
        title: 'Directors and Key Persons Details',
        isList: true,
        listName: 'keyPersons',
        fields: [
          { name: 'personName', label: 'Name *', type: 'text', required: true },
          { name: 'designation', label: 'Designation *', type: 'select', options: ['Managing Director', 'Director', 'Secretary', 'Principal Officer'], required: true },
          { name: 'address', label: 'Residential Address', type: 'text', required: false },
          { name: 'personCity', label: 'City', type: 'text', required: false },
          { name: 'personState', label: 'State', type: 'select', options: ['ANDHRA PRADESH', 'ASSAM', 'BIHAR', 'CHHATTISGARH', 'DELHI', 'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH', 'JAMMU & KASHMIR', 'JHARKHAND', 'KARNATAKA', 'KERALA', 'MADHYA PRADESH', 'MAHARASHTRA', 'ODISHA', 'PUNJAB', 'RAJASTHAN', 'TAMIL NADU', 'TELANGANA', 'UTTAR PRADESH', 'UTTARAKHAND', 'WEST BENGAL'], required: false },
          { name: 'personCountry', label: 'Country', type: 'select', options: ['INDIA'], required: false },
          { name: 'personPinCode', label: 'PIN Code', type: 'text', required: false },
          { name: 'personPan', label: 'PAN *', type: 'text', required: true },
          { name: 'personAadhaar', label: 'Aadhaar No.', type: 'text', required: false },
          { name: 'din', label: 'DIN (Director Identification Number)', type: 'text', required: false }
        ] 
      }
    ]
  },
  shareholders: {
    title: 'Shareholders Details',
    subtitle: 'Beneficial owners holding 10% or more voting power.',
    sections: [
      {
        title: 'Shareholder Information',
        isList: true,
        listName: 'shareholders',
        fields: [
          { name: 'shareholderName', label: 'Name *', type: 'text', required: true },
          { name: 'shareholderAddress', label: 'Address', type: 'text', required: false },
          { name: 'shareholderCity', label: 'City', type: 'text', required: false },
          { name: 'shareholderState', label: 'State', type: 'select', options: ['ANDHRA PRADESH', 'ASSAM', 'BIHAR', 'CHHATTISGARH', 'DELHI', 'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH', 'JAMMU & KASHMIR', 'JHARKHAND', 'KARNATAKA', 'KERALA', 'MADHYA PRADESH', 'MAHARASHTRA', 'ODISHA', 'PUNJAB', 'RAJASTHAN', 'TAMIL NADU', 'TELANGANA', 'UTTAR PRADESH', 'UTTARAKHAND', 'WEST BENGAL'], required: false },
          { name: 'shareholderCountry', label: 'Country', type: 'select', options: ['INDIA'], required: false },
          { name: 'shareholderPinCode', label: 'PIN Code', type: 'text', required: false },
          { name: 'shareholderSharePercent', label: 'Percentage of Shares Held *', type: 'number', required: true },
          { name: 'shareholderPan', label: 'PAN (if allotted)', type: 'text', required: false },
          { name: 'shareholderAadhaar', label: 'Aadhaar No.', type: 'text', required: false }
        ]
      }
    ]
  },
  holding_status: {
    title: 'Holding / Subsidiary Status',
    subtitle: 'Holding company and specific entity options.',
    sections: [
      {
        title: 'Holding Details',
        fields: [
          { name: 'holdingStatus', label: 'Nature of Company *', type: 'select', options: ['Holding', 'Subsidiary', 'Both', 'Other'], required: true }
        ]
      },
      {
        title: 'Holding Company Details', 
        isList: true,
        listName: 'holdingCompanies',
        condition: (state) => ['Subsidiary', 'Both'].includes(state.details?.holding_status?.holdingStatus),
        fields: [
          { name: 'holdingCompanyName', label: 'Name of Holding Company *', type: 'text', required: true },
          { name: 'holdingCompanyAddress', label: 'Address', type: 'text', required: false },
          { name: 'holdingCompanyCity', label: 'City', type: 'text', required: false },
          { name: 'holdingCompanyState', label: 'State', type: 'select', options: ['DELHI', 'MAHARASHTRA', 'KARNATAKA'], required: false },
          { name: 'holdingCompanyCountry', label: 'Country', type: 'select', options: ['INDIA'], required: false },
          { name: 'holdingCompanyPinCode', label: 'PIN Code', type: 'text', required: false },
          { name: 'holdingCompanyPan', label: 'PAN *', type: 'text', required: true },
          { name: 'holdingSharePercent', label: 'Percentage of Shares Held *', type: 'number', required: true }
        ]
      },
      {
        title: 'Nature of Company and Sector',
        fields: [
          { name: 'isPublicSectorCompany', label: 'Whether a public sector company u/s 2(36A)?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isRBIOwned', label: 'Whether owned by the Reserve Bank of India?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isBankingCompany', label: 'Whether a banking company?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isScheduledBank', label: 'Whether a scheduled bank?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isIRDAIRegistered', label: 'Whether registered with IRDAI?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isMSME', label: 'Whether recognized as MSME?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isNBFC', label: 'Whether a Non-Banking Financial Institution?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isUnlisted', label: 'Whether company is Unlisted?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isProducerCompany', label: 'Whether a producer company u/s 581A?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isUnderLiquidation', label: 'Whether company is under liquidation?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isFIIorFPI', label: 'Whether you are an FII/FPI?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'sebiRegNo', label: 'SEBI Registration Number (if FII/FPI)', type: 'text', required: false }
        ]
      }
    ]
  },
  special_reg: {
    title: 'Special Registrations',
    subtitle: 'Details regarding DPIIT, MSME, IFSC and accounting standards.',
    sections: [
      {
        title: 'Start-up & MSME details',
        fields: [
          { name: 'isStartupByDPIIT', label: 'Whether recognized as start-up by DPIIT?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'dpiitRecognitionNo', label: 'Start-up recognition number allotted by DPIIT', type: 'text', required: false },
          { name: 'imboardCertificationReceived', label: 'Whether certificate from inter-ministerial', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'imboardCertificationNo', label: 'Certification number (if yes)', type: 'text', required: false },
          { name: 'form2Filed', label: 'Whether declaration in Form-2 has been filed?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'form2DateOfFiling', label: 'Date of filing Form-2', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
          { name: 'msmeRegNo', label: 'MSME Registration Number', type: 'text', required: false }
        ]
      },
      {
        title: 'Convertible Exchange & Standards',
        fields: [
          { name: 'isIFSCUnit', label: 'Whether unit in IFSC deriving income solely', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'isIndASCompliant', label: 'Whether financials drawn up in compliance *', type: 'select', options: ['No', 'Yes'], required: true },
          { name: 'leiNumber', label: 'LEI Number (for refund >= 50 cr)', type: 'text', required: false },
          { name: 'leiValidUpto', label: 'LEI Valid Upto Date', type: 'text', placeholder: 'DD/MM/YYYY', required: false }
        ]
      },
      {
        title: 'Representative Assessee Info',
        fields: [
          { name: 'isRepresentativeAssessee', label: 'Whether return filed by representative assessee?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'representativeName', label: 'Name of representative assessee', type: 'text', required: false },
          { name: 'representativeCapacity', label: 'Capacity of representative', type: 'select', options: ['Managing Director', 'Director', 'Secretary', 'Principal Officer', 'Karta', 'Other'], required: false },
          { name: 'representativeAddress', label: 'Address of representative', type: 'text', required: false },
          { name: 'representativePan', label: 'PAN of representative', type: 'text', required: false },
          { name: 'representativeAadhaar', label: 'Aadhaar No. of representative', type: 'text', required: false }
        ]
      }
    ]
  },
  tax_regime: {
    title: 'Tax Regime Choice',
    subtitle: 'Options under Section 115BA, 115BAA, or 115BAB.',
    sections: [
      {
        title: 'Regime Section Choice',
        fields: [
          { name: 'optedFor115BA_BAA_BAB', label: 'Whether opted for taxation u/s 115BA/115BAA/115BAB? *', type: 'select', options: ['No', 'Yes'], required: true },
          { name: 'section115BASelectedOption', label: 'Which section opted (115BA / 115BAA / 115BAB)', type: 'select', options: ['115BA', '115BAA', '115BAB'], required: false },
          { name: 'form10IB_IC_IDFilingDate', label: 'Date of filing Form 10-IB/10-IC/10-ID', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
          { name: 'form10IB_IC_IDAckNo', label: 'Acknowledgement number', type: 'text', required: false },
          { name: 'optingFor115BAThisYear', label: 'If not previously opted, opting this year?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'form10IB_IC_IDFilingDateNew', label: 'Date of filing form (if opting now)', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
          { name: 'form10IB_IC_IDAckNoNew', label: 'Acknowledgement number (if opting now)', type: 'text', required: false },
          { name: 'turnoverExceeds400Cr', label: 'Whether total turnover/gross receipts in PY 2022-23 exceeded ₹400 Crore?', type: 'select', options: ['No', 'Yes'], required: false }
        ]
      }
    ]
  },
  audit: {
    title: 'Audit Information',
    subtitle: 'Details of book maintenance, turnover levels, and audit report signings.',
    sections: [
      {
        title: 'Liability to Maintenance and Audit',
        fields: [
          { name: 'liableToMaintainAccounts44AA', label: 'Whether liable to maintain accounts u/s 44AA? *', type: 'select', options: ['No', 'Yes'], required: true },
          { name: 'declaringIncomeUnderPresumptive', label: 'Whether declaring income only u/s 44AE/44B/etc.? *', type: 'select', options: ['No', 'Yes'] },
          { name: 'turnoverBetween1CrTo10Cr', label: 'gross receipts between ₹1 Cr and ₹10 Cr?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'cashReceiptsLessThan5Percent', label: 'Whether cash receipts ≤ 5% of total receipts?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'cashPaymentsLessThan5Percent', label: 'Whether cash payments ≤ 5% of total payments?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'liableForAudit44AB', label: 'Whether liable for audit u/s 44AB? *', type: 'select', options: ['No', 'Yes'], required: true },
          { name: 'auditCondition', label: 'Condition by virtue of which liable for audit', type: 'select', options: ['44AB(a) - Sales/turnover exceeds limit', '44AB(b) - Professional receipts exceed limit', '44AB(c) - Lower profits declared', '44AB(d) - Presumptive tax limits exceeded', '44AB(e) - Other'], required: false }
        ]
      },
      {
        title: 'Auditor Details',
        fields: [
          { name: 'accountsAuditedByAccountant', label: 'Whether accounts audited by an accountant?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'auditReportFurnishingDate', label: 'Date of furnishing audit report', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
          { name: 'auditorSigningName', label: 'Name of auditor signing the report', type: 'text', required: false },
          { name: 'auditorMembershipNo', label: 'Membership No. of the auditor', type: 'text', required: false },
          { name: 'auditorFirmName', label: 'Name of auditor (firm)', type: 'text', required: false },
          { name: 'auditorFirmRegNo', label: 'Firm registration number', type: 'text', required: false },
          { name: 'auditorPan', label: 'PAN of auditor (firm)', type: 'text', required: false },
          { name: 'auditorAadhaar', label: 'Aadhaar No. of auditor', type: 'text', required: false },
          { name: 'dateOfAuditReport', label: 'Date of Audit Report', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
          { name: 'auditAcknowledgementNo', label: 'Acknowledgement number of audit report', type: 'text', required: false },
          { name: 'udin', label: 'UDIN', type: 'text', required: false }
        ]
      },
      {
        title: 'Transfer Pricing Audit (Section 92E)',
        fields: [
          { name: 'liableForAudit92E', label: 'Are you liable for Audit u/s 92E?', type: 'select', options: ['No', 'Yes'], required: false },
          { name: 'audit92EDate', label: 'Date of furnishing audit report u/s 92E', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
          { name: 'audit92EAckNo', label: 'Acknowledgement number for 92E audit', type: 'text', required: false }
        ]
      }
    ]
  }
};

const companyCommonIncome = {
  business: {
    title: 'Business & Profession',
    subtitle: 'Net profits and adjustments as per Schedule BP.',
    sections: [
      {
        title: 'Business Income Adjustments',
        fields: [
          { name: 'netProfitAsPerPL', label: 'Net Profit/(Loss) as per Profit & Loss Account *', type: 'number', required: true },
          { name: 'grossTurnover', label: 'Gross Turnover / Gross Receipts *', type: 'number', required: true },
          { name: 'remunerationToDirectors', label: 'Remuneration to Directors debited in P&L', type: 'number', required: false },
          { name: 'incomeNotCreditedToPL', label: 'Income not credited to P&L', type: 'number', required: false },
          { name: 'expensesDisallowed37', label: 'Expenses disallowed u/s 37', type: 'number', required: false },
          { name: 'expensesDisallowed40A3', label: 'Cash payments disallowed u/s 40A(3)', type: 'number', required: false },
          { name: 'depreciation', label: 'Depreciation as per books', type: 'number', required: false },
          { name: 'depreciationAllowable', label: 'Depreciation allowable under IT Act', type: 'number', required: false },
          { name: 'netIncomeFromBusiness', label: 'Net Income from Business (Calculated)', type: 'number', required: false }
        ]
      }
    ]
  },
  house_property: {
    title: 'House Property',
    subtitle: 'Provide income or loss from house properties.',
    sections: [
      {
        title: 'House Property Details',
        fields: [
          { name: 'housePropertyType', label: 'Type of House Property *', type: 'select', options: ['Let Out', 'Self Occupied', 'Deemed Let Out'], required: true },
          { name: 'propertyAddress', label: 'Address of Property', type: 'text', required: false },
          { name: 'tenantPan', label: 'PAN of Tenant (if applicable)', type: 'text', required: false },
          { name: 'grossAnnualRent', label: 'Annual Lettable Value / Gross Rent', type: 'number', required: false },
          { name: 'municipalTaxesPaid', label: 'Municipal Taxes Paid', type: 'number', required: false },
          { name: 'netAnnualValue', label: 'Net Annual Value (Calculated)', type: 'number', required: false },
          { name: 'standardDeduction30', label: '30% Standard Deduction u/s 24(a) (Calculated)', type: 'number', required: false },
          { name: 'homeLoanInterest24b', label: 'Interest on borrowed capital u/s 24(b)', type: 'number', required: false },
          { name: 'incomeFromHP', label: 'Income from House Property (Calculated)', type: 'number', required: false }
        ]
      }
    ]
  },
  capital_gains: {
    title: 'Capital Gains',
    subtitle: 'Schedule CG details.',
    sections: [
      {
        title: 'Capital Gains Breakdown',
        fields: [
          { name: 'shortTermCG15Percent', label: 'STCG u/s 111A (taxable @ 15%)', type: 'number', required: false },
          { name: 'shortTermCGOther', label: 'STCG taxable at normal rates', type: 'number', required: false },
          { name: 'longTermCG10Percent', label: 'LTCG u/s 112A (taxable @ 10%)', type: 'number', required: false },
          { name: 'longTermCG20Percent', label: 'LTCG (taxable @ 20% with indexation)', type: 'number', required: false },
          { name: 'totalCapitalGains', label: 'Total Capital Gains (Calculated)', type: 'number', required: false }
        ]
      }
    ]
  },
  other_sources: {
    title: 'Other Sources',
    subtitle: 'Income from other sources as per Schedule OS.',
    sections: [ 
      {
        title: 'Interest and Dividends',
        fields: [
          { name: 'dividendIncome', label: 'Dividends u/s 56(2)(i)', type: 'number', required: false },
          { name: 'interestFromSavings', label: 'Interest from Savings Bank Accounts', type: 'number', required: false },
          { name: 'interestFromDeposits', label: 'Interest from Deposits (FD/RD)', type: 'number', required: false },
          { name: 'interestFromITRefund', label: 'Income Tax Refund Interest', type: 'number', required: false },
          { name: 'interCorpDividend80M', label: 'Inter-corporate dividend u/s 80M', type: 'number', required: false },
          { name: 'incomeFromVDA', label: 'Income from Virtual Digital Assets (VDA)', type: 'number', required: false },
          { name: 'otherIncome', label: 'Any other income from other sources', type: 'number', required: false }
        ]
      }
    ]
  }
};

const companyCommonFinancials = {
  bs_equity_liabilities: {
    title: 'Equity & Liabilities',
    subtitle: 'Balance sheet liabilities and equity sections.',
    sections: [
      {
        title: 'Share Capital & Reserves',
        fields: [
          { name: 'authorisedShareCapital', label: 'Authorised Share Capital', type: 'number', required: false },
          { name: 'issuedSubscribedFullyPaid', label: 'Issued, Subscribed & Fully Paid Capital *', type: 'number', required: true },
          { name: 'subscribedNotFullyPaid', label: 'Subscribed but not Fully Paid', type: 'number', required: false },
          { name: 'capitalReserve', label: 'Capital Reserve', type: 'number', required: false },
          { name: 'capitalRedemptionReserve', label: 'Capital Redemption Reserve', type: 'number', required: false },
          { name: 'securitiesPremiumReserve', label: 'Securities Premium Reserve', type: 'number', required: false },
          { name: 'debentureRedemptionReserve', label: 'Debenture Redemption Reserve', type: 'number', required: false },
          { name: 'revaluationReserve', label: 'Revaluation Reserve', type: 'number', required: false },
          { name: 'shareOptionsOutstanding', label: 'Share Options Outstanding Amount', type: 'number', required: false },
          { name: 'plSurplusBalance', label: 'Surplus (Balance in P&L Account)', type: 'number', required: false }
        ]
      },
      {
        title: 'Pending Share Money & Loans',
        fields: [
          { name: 'moneyAgainstShareWarrants', label: 'Money received against Share Warrants', type: 'number', required: false },
          { name: 'shareApplicationMoneyLess1Yr', label: 'Share Application Money pending (<1 year)', type: 'number', required: false },
          { name: 'shareApplicationMoneyMore1Yr', label: 'Share Application Money pending (>1 year)', type: 'number', required: false },
          { name: 'bondsForeignCurrency', label: 'Bonds/Debentures — Foreign Currency', type: 'number', required: false },
          { name: 'bondsRupee', label: 'Bonds/Debentures — Rupee', type: 'number', required: false },
          { name: 'termLoanForeignCurrency', label: 'Term Loans — Foreign Currency', type: 'number', required: false },
          { name: 'termLoanRupeeFromBanks', label: 'Term Loans — Rupee from Banks', type: 'number', required: false },
          { name: 'termLoanRupeeFromOthers', label: 'Term Loans — Rupee from Others', type: 'number', required: false }
        ]
      },
      {
        title: 'Liabilities & Provisions',
        fields: [
          { name: 'deferredTaxLiabilities', label: 'Deferred Tax Liabilities (net)', type: 'number', required: false },
          { name: 'otherLongTermLiabilities', label: 'Other Long-term Liabilities', type: 'number', required: false },
          { name: 'longTermProvisions', label: 'Long-term Provisions', type: 'number', required: false },
          { name: 'shortTermBorrowings', label: 'Short-term Borrowings', type: 'number', required: false },
          { name: 'tradePayables', label: 'Trade Payables', type: 'number', required: false },
          { name: 'otherCurrentLiabilities', label: 'Other Current Liabilities', type: 'number', required: false },
          { name: 'shortTermProvisions', label: 'Short-term Provisions', type: 'number', required: false }
        ]
      }
    ]
  },
  bs_assets: {
    title: 'Assets',
    subtitle: 'Balance sheet assets section.',
    sections: [
      {
        title: 'Fixed Assets',
        fields: [
          { name: 'tangibleAssetsGrossBlock', label: 'Tangible Assets — Gross Block', type: 'number', required: false },
          { name: 'tangibleAssetsDepreciation', label: 'Tangible Assets — Accumulated Depreciation', type: 'number', required: false },
          { name: 'intangibleAssetsGrossBlock', label: 'Intangible Assets — Gross Block', type: 'number', required: false },
          { name: 'intangibleAssetsAmortization', label: 'Intangible Assets — Amortization', type: 'number', required: false },
          { name: 'capitalWIP', label: 'Capital Work-in-Progress', type: 'number', required: false },
          { name: 'intangibleAssetsUnderDev', label: 'Intangible Assets Under Development', type: 'number', required: false }
        ]
      },
      {
        title: 'Investments & Current Assets',
        fields: [
          { name: 'investmentsInProperty', label: 'Investment in Property', type: 'number', required: false },
          { name: 'listedEquities', label: 'Non-current Investments — Listed Equities', type: 'number', required: false },
          { name: 'unlistedEquities', label: 'Non-current Investments — Unlisted Equities', type: 'number', required: false },
          { name: 'closingStock', label: 'Inventories / Closing Stock', type: 'number', required: false },
          { name: 'sundryDebtors', label: 'Sundry Debtors / Trade Receivables', type: 'number', required: false },
          { name: 'cashAndCashEquivalents', label: 'Cash and Cash Equivalents', type: 'number', required: false },
          { name: 'otherCurrentAssets', label: 'Other Current Assets', type: 'number', required: false }
        ]
      }
    ]
  },
  profit_loss: {
    title: 'Profit & Loss Statement',
    subtitle: 'Revenue, direct and indirect expenses.',
    sections: [
      {
        title: 'Revenue and Direct Earnings',
        fields: [
          { name: 'grossProfitFromTrading', label: 'Gross Profit from Trading Account', type: 'number', required: false },
          { name: 'otherOperatingIncome', label: 'Other Operating Income', type: 'number', required: false }
        ]
      },
      {
        title: 'Operating and Administrative Expenses',
        fields: [
          { name: 'salariesWagesBonuses', label: 'Salaries, Wages and Bonuses', type: 'number', required: false },
          { name: 'rentRatesTaxes', label: 'Rent, Rates and Taxes', type: 'number', required: false },
          { name: 'repairsAndMaintenance', label: 'Repairs and Maintenance', type: 'number', required: false },
          { name: 'insurancePremium', label: 'Insurance Premium', type: 'number', required: false },
          { name: 'depreciationPL', label: 'Depreciation', type: 'number', required: false },
          { name: 'interestFinanceCharges', label: 'Interest and Finance Charges', type: 'number', required: false },
          { name: 'directorRemuneration', label: 'Directors\' Remuneration', type: 'number', required: false },
          { name: 'advertisingExpenses', label: 'Advertising and Marketing Expenses', type: 'number', required: false },
          { name: 'provisionForTax', label: 'Provision for Income Tax', type: 'number', required: false },
          { name: 'netProfitBeforeTax', label: 'Net Profit Before Tax (Calculated)', type: 'number', required: false }
        ]
      }
    ]
  }
};

const companyCommonDeductions = {
  chapter6a: {
    title: 'Chapter VI-A Deductions',
    subtitle: 'Claim deductions under Chapter VI-A.',
    sections: [
      {
        title: 'Corporate Deductions',
        fields: [
          { name: 'deduction80G', label: 'Section 80G (Donations)', type: 'number', required: false },
          { name: 'deduction80GGB', label: 'Section 80GGB (Political Contributions by Companies)', type: 'number', required: false },
          { name: 'deduction80GGA', label: 'Section 80GGA (Scientific Research)', type: 'number', required: false },
          { name: 'deduction80GGC', label: 'Section 80GGC (Political Contributions by Others)', type: 'number', required: false },
          { name: 'deduction80IA', label: 'Section 80-IA (Infrastructure)', type: 'number', required: false },
          { name: 'deduction80IAB', label: 'Section 80-IAB (SEZ)', type: 'number', required: false },
          { name: 'deduction80IAC', label: 'Section 80-IAC (Start-up)', type: 'number', required: false },
          { name: 'deduction80IB', label: 'Section 80-IB (Undertakings)', type: 'number', required: false },
          { name: 'deduction80IBA', label: 'Section 80-IBA (Housing Projects)', type: 'number', required: false },
          { name: 'deduction80IE', label: 'Section 80-IE (North East)', type: 'number', required: false },
          { name: 'deduction80JJA', label: 'Section 80JJA (Bio-degradable Waste)', type: 'number', required: false },
          { name: 'deduction80JJAA', label: 'Section 80JJAA (New Employees)', type: 'number', required: false },
          { name: 'deduction80LA', label: 'Section 80LA (Offshore Banking)', type: 'number', required: false },
          { name: 'deduction80M', label: 'Section 80M (Inter-corporate Dividends)', type: 'number', required: false },
          { name: 'deduction80PA', label: 'Section 80PA (Producer Companies)', type: 'number', required: false },
          { name: 'totalDeductionsVIA', label: 'Total VI-A Deductions (Calculated)', type: 'number', required: false }
        ]
      }
    ]
  },
  exempt_income: {
    title: 'Exempt Income',
    subtitle: 'Report exempt incomes under section 10.',
    sections: [
      {
        title: 'Exempt Income Details',
        fields: [
          { name: 'agriculturalIncome', label: 'Agricultural Income u/s 10', type: 'number', required: false },
          { name: 'shareFromFirmOrLLP', label: 'Share of profit from Firm/LLP u/s 10(2A)', type: 'number', required: false },
          { name: 'exemptDividend', label: 'Exempt Dividend', type: 'number', required: false },
          { name: 'otherExemptIncome', label: 'Other Exempt Income', type: 'number', required: false }
        ]
      }
    ]
  },
  losses: {
    title: 'Losses & Carry Forward',
    subtitle: 'Brought forward and speculative losses.',
    sections: [
      {
        title: 'Current and Brought Forward Losses',
        fields: [
          { name: 'hpLossCurrentYear', label: 'Current Year Loss from House Property', type: 'number', required: false },
          { name: 'businessLossCurrentYear', label: 'Current Year Business Loss (non-speculative)', type: 'number', required: false },
          { name: 'speculativeLoss', label: 'Speculative Business Loss', type: 'number', required: false },
          { name: 'stcgLoss', label: 'Short-Term Capital Loss', type: 'number', required: false },
          { name: 'ltcgLoss', label: 'Long-Term Capital Loss', type: 'number', required: false },
          { name: 'bfBusinessLoss', label: 'Brought Forward Business Loss set off this year', type: 'number', required: false },
          { name: 'bfHPLoss', label: 'Brought Forward HP Loss set off this year', type: 'number', required: false },
          { name: 'unabsorbedDepreciation', label: 'Unabsorbed Depreciation set off this year', type: 'number', required: false }
        ]
      }
    ]
  }
};

const companyCommonTaxes = {
  tds: {
    title: 'TDS details',
    subtitle: 'Tax Deducted at Source details.',
    sections: [
      {
        title: 'Schedule TDS',
        isList: true,
        listName: 'tdsRows',
        fields: [
          { name: 'tdsRelation', label: 'TDS credit relating to *', type: 'select', options: ['Self', 'Other Person'], required: true },
          { name: 'otherPersonPan', label: 'PAN of Other Person', type: 'text', required: false },
          { name: 'tanOfDeductor', label: 'TAN of Deductor *', type: 'text', required: true },
          { name: 'tdsSection', label: 'Section under which TDS deducted *', type: 'select', options: ['194C', '194J', '194I', '194A', '195', 'Others'], required: true },
          { name: 'unclaimedTdsBfFy', label: 'Financial Year of unclaimed TDS brought forward', type: 'text', required: false },
          { name: 'unclaimedTDSBF', label: 'Unclaimed TDS brought forward amount', type: 'number', required: false },
          { name: 'totalTaxDeducted', label: 'TDS of current FY *', type: 'number', required: true },
          { name: 'amountClaimed', label: 'TDS credit claimed this year *', type: 'number', required: true }
        ]
      }
    ]
  },
  tcs: {
    title: 'TCS details',
    subtitle: 'Tax Collected at Source details.',
    sections: [
      {
        title: 'Schedule TCS',
        isList: true,
        listName: 'tcsRows',
        fields: [
          { name: 'tcsRelation', label: 'TCS credit relating to *', type: 'select', options: ['Self', 'Other Person'], required: true },
          { name: 'tanOfCollector', label: 'TAN of Collector *', type: 'text', required: true },
          { name: 'otherPersonPanTCS', label: 'PAN of Other Person', type: 'text', required: false },
          { name: 'unclaimedTcsBfFy', label: 'Financial Year of unclaimed TCS brought forward', type: 'text', required: false },
          { name: 'unclaimedTCSBF', label: 'Unclaimed TCS brought forward amount', type: 'number', required: false },
          { name: 'totalTaxCollected', label: 'TCS of current FY *', type: 'number', required: true },
          { name: 'amountClaimedTCS', label: 'TCS credit claimed this year *', type: 'number', required: true }
        ]
      }
    ]
  },
  advance_tax: {
    title: 'Self/Advance Tax',
    subtitle: 'Advance and Self-Assessment Tax payments.',
    sections: [
      {
        title: 'Tax Challan Details',
        isList: true,
        listName: 'taxPayments',
        fields: [
          { name: 'bsrCode', label: 'BSR Code (6 digits) *', type: 'text', required: true },
          { name: 'dateOfDeposit', label: 'Date of Deposit *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
          { name: 'challanSerial', label: 'Challan Serial Number (5 digits) *', type: 'text', required: true },
          { name: 'taxAmountDeposited', label: 'Tax Amount Deposited *', type: 'number', required: true },
          { name: 'taxType', label: 'Type of Tax *', type: 'select', options: ['Advance Tax', 'Self Assessment Tax'], required: true }
        ]
      }
    ]
  },
  mat: {
    title: 'MAT Credit',
    subtitle: 'Minimum Alternate Tax credit u/s 115JAA.',
    sections: [
      {
        title: 'MAT Details',
        fields: [
          { name: 'matTax115JB', label: 'Tax under section 115JB', type: 'number', required: false },
          { name: 'taxUnderOtherProvisions', label: 'Tax under other provisions', type: 'number', required: false },
          { name: 'matCreditBroughtForward', label: 'MAT Credit brought forward', type: 'number', required: false },
          { name: 'matCreditUtilizedCurrentYear', label: 'MAT Credit utilised current year', type: 'number', required: false },
          { name: 'matCreditCarriedForward', label: 'MAT Credit carried forward (Calculated)', type: 'number', required: false }
        ] 
      }
    ]
  }
}; 

export const fieldsConfig = { 
  'HUF': {
    details: {
      permanent: {
        title: 'General Information',
        subtitle: 'Basic identity details of the Hindu Undivided Family.',
        sections: [
          {
            title: 'HUF Credentials',
            description: 'Provide basic HUF identity information.',
            fields: [
              { name: 'hufName', label: 'Name of HUF *', type: 'text', required: true },
              { name: 'panNumber', label: 'PAN of HUF *', type: 'text', required: true },
              { name: 'formationDate', label: 'Date of Formation *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'residentialStatus', label: 'Residential Status *', type: 'select', options: ['Resident', 'Non-Resident'], required: true },
              { name: 'filingSection', label: 'Filing Status Type *', type: 'select', options: ['139(1) - On or before due date', '139(4) - Belated', '139(5) - Revised'], required: true },
              { name: 'optingOutNewRegime', label: 'Opting out of New Tax Regime u/s 115BAC? *', type: 'select', options: ['No', 'Yes'], required: true }
            ]
          }
        ]
      },
      karta: {
        title: 'Karta Details',
        subtitle: 'Details of the Karta (Manager) of the HUF.',
        sections: [
          {
            title: 'Karta Information',
            description: 'Enter credentials for the Karta of the HUF.',
            fields: [
              { name: 'kartaName', label: 'Name of Karta *', type: 'text', required: true },
              { name: 'kartaPan', label: 'PAN of Karta *', type: 'text', required: true },
              { name: 'kartaAadhaar', label: 'Aadhaar Number *', type: 'text', placeholder: '12-digit Aadhaar', required: true },
              { name: 'kartaMobile', label: 'Mobile Number *', type: 'text', placeholder: '10-digit Mobile', required: true },
              { name: 'kartaEmail', label: 'Email Address *', type: 'text', placeholder: 'Email Address', required: true }
            ]
          }
        ]
      },
      members: {
        title: 'Co-parceners Details',
        subtitle: 'HUF Co-parceners (Members) list.',
        sections: [
          {
            title: 'Co-parceners List',
            description: 'List of Co-parceners within the family.',
            isList: true,
            listName: 'coparceners',
            fields: [
              { name: 'memberName', label: 'Name of Member *', type: 'text', required: true },
              { name: 'memberPan', label: 'PAN of Member', type: 'text', required: false },
              { name: 'memberRelation', label: 'Relationship with Karta *', type: 'select', options: ['Son', 'Daughter', 'Spouse', 'Other'], required: true },
              { name: 'memberAadhaar', label: 'Aadhaar Card Number', type: 'text', required: false }
            ]
          }
        ]
      },
      additional: {
        title: 'Permanent Address',
        subtitle: 'Provide the registered permanent address details of the HUF.',
        sections: [
          {
            title: 'Address details',
            description: 'Registered address for communications.',
            fields: [
              { name: 'flatNo', label: 'Flat/Door/Block No. *', type: 'text', required: true },
              { name: 'premiseName', label: 'Name of Premises/Building', type: 'text', required: false },
              { name: 'roadStreet', label: 'Road/Street/Lane', type: 'text', required: false },
              { name: 'areaLocality', label: 'Area/Locality *', type: 'text', required: true },
              { name: 'city', label: 'Town/City/District *', type: 'text', required: true },
              { name: 'state', label: 'State *', type: 'select', options: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'], required: true },
              { name: 'pincode', label: 'PIN Code *', type: 'number', required: true }
            ]
          }
        ]
      }
    },
    income: {
      business: {
        title: 'Business Income',
        subtitle: 'Declaration of presumptive business income.',
        sections: [
          {
            title: 'Presumptive Income u/s 44AD / 44ADA',
            description: 'Determine presumptive earnings from business or professional operations.',
            fields: [
              { name: 'businessName', label: 'Name of Business *', type: 'text', required: true },
              { name: 'businessCode', label: 'Business Code *', type: 'select', options: ['01001 - Agriculture support services', '02001 - Mining', '03001 - Manufacturing', '04001 - Electricity/Water supply', '05001 - Construction', '06001 - Wholesale trade', '07001 - Retail trade', '08001 - Transport services', '09001 - Accommodation and food', '10001 - Information & communication', '11001 - Financial services', '12001 - Real estate', '13001 - Professional/Scientific services', '14001 - Administrative services', '15001 - Education services', '16001 - Health and social work', '17001 - Entertainment/Recreation', '18001 - Other services'], required: true },
              { name: 'turnoverDigital', label: 'Turnover - Received via Electronic/Digital modes', type: 'number', required: false },
              { name: 'turnoverCash', label: 'Turnover - Received via Cash/Other modes', type: 'number', required: false },
              { name: 'presumptiveIncome44AD', label: 'Presumptive Net Income', type: 'number', required: false }
            ]
          }
        ]
      },
      house_property: {
        title: 'House Property Income',
        subtitle: 'Rent and loans related to house property ownership.',
        sections: [
          {
            title: 'House Property Income Details',
            description: 'Enter rent and interest payable u/s 24.',
            fields: [
              { name: 'housePropertyType', label: 'Type of House Property *', type: 'select', options: ['Self-Occupied', 'Let Out', 'Deemed Let Out'], required: true },
              { name: 'grossRent', label: 'Gross Rent Received', type: 'number', required: false },
              { name: 'municipalTaxes', label: 'Tax Paid to Local Authorities', type: 'number', required: false },
              { name: 'annualValue', label: 'Annual Value', type: 'number', disabled: true, required: false },
              { name: 'homeLoanInterest', label: 'Interest payable on borrowed capital (Section 24)', type: 'number', required: false }
            ]
          }
        ]
      },
      other: {
        title: 'Income from Other Sources',
        subtitle: 'Earnings from dividends, interest, etc.',
        sections: [
          {
            title: 'Other Source Income Details',
            description: 'Interest and dividend earnings u/s 56.',
            fields: [
              { name: 'dividendIncome', label: 'Dividends', type: 'number', required: false },
              { name: 'savingsInterest', label: 'Interest from Savings Bank Accounts', type: 'number', required: false },
              { name: 'depositInterest', label: 'Interest from Deposits (FD/Post Office)', type: 'number', required: false },
              { name: 'refundInterest', label: 'Income Tax Refund Interest', type: 'number', required: false }
            ]
          }
        ]
      }
    },
    deductions: {
      chapter6a: {
        title: 'Chapter VI-A Deductions',
        subtitle: 'Deductions that reduce taxable income.',
        sections: [
          {
            title: 'Deductions u/s 80',
            description: 'Chapter VI-A savings and donations.',
            fields: [
              { name: 'deduction80C', label: 'Section 80C (Max 1,50,000)', type: 'number', required: false },
              { name: 'deduction80D', label: 'Section 80D (Health Insurance)', type: 'number', required: false },
              { name: 'deduction80G', label: 'Section 80G (Donations)', type: 'number', required: false },
              { name: 'deduction80TTA', label: 'Section 80TTA (Max 10,000)', type: 'number', required: false }
            ]
          }
        ]
      },
      more: {
        title: 'Exempt Income',
        subtitle: 'Incomes exempt from taxation under Section 10.',
        sections: [
          {
            title: 'Exempt Incomes',
            description: 'Declare agricultural or other exempt incomes.',
            fields: [
              { name: 'agriculturalIncome', label: 'Section 10(38) / Agricultural Income', type: 'number', required: false }
            ]
          }
        ]
      }
    },
    taxes: {
      tds: {
        title: 'TDS details',
        subtitle: 'Tax Deducted at Source summary.',
        sections: [
          {
            title: 'TDS Claims',
            description: 'Declare TDS deducted by counter-parties.',
            isList: true,
            listName: 'tdsRows',
            fields: [
              { name: 'tanOfDeductor', label: 'TAN of Deductor *', type: 'text', required: true },
              { name: 'nameOfDeductor', label: 'Name of Deductor *', type: 'text', required: true },
              { name: 'totalTaxDeducted', label: 'Total Tax Deducted *', type: 'number', required: true },
              { name: 'amountClaimed', label: 'Amount Claimed this Year *', type: 'number', required: true }
            ]
          }
        ]
      },
      advance_tax: {
        title: 'Advance & Self-Assessment Tax',
        subtitle: 'Challan tax deposit payments.',
        sections: [
          {
            title: 'Tax Payments List',
            description: 'Add manually deposited tax challans.',
            isList: true,
            listName: 'taxPayments',
            fields: [
              { name: 'bsrCode', label: 'BSR Code (6 digits) *', type: 'text', required: true },
              { name: 'dateOfDeposit', label: 'Date of Deposit *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'challanSerial', label: 'Challan Serial Number (5 digits) *', type: 'text', required: true },
              { name: 'taxAmountDeposited', label: 'Tax Amount Deposited *', type: 'number', required: true }
            ]
          }
        ]
      }
    },
    filing: {
      bank: {
        title: 'Bank Accounts',
        subtitle: 'Provide active bank details.',
        sections: [
          {
            title: 'Refund Destination Bank',
            description: 'Add bank accounts and select one for refund destination.',
            isList: true,
            listName: 'bankAccounts',
            fields: [
              { name: 'bankIfscCode', label: 'IFSC Code *', type: 'text', required: true },
              { name: 'bankName', label: 'Bank Name *', type: 'text', required: true },
              { name: 'bankAccountNumber', label: 'Account Number *', type: 'text', required: true },
              { name: 'selectedForRefund', label: 'Select for Refund *', type: 'select', options: ['Yes', 'No'], required: true }
            ]
          }
        ]
      }
    }
  }, 


  






  // Skeleton config structure for other filing types to make the architecture fully reusable
  'AOP/BOI': {
    details: {
      permanent: {
        title: 'AOP/BOI Permanent Information',
        subtitle: 'Provide all details for Association of Persons / Body of Individuals.',
        sections: [
          {
            title: 'Entity Details',
            fields: [
              { name: 'entityName', label: 'Name of AOP/BOI *', type: 'text', required: true },
              { name: 'formationDate', label: 'Date of Formation *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'panNumber', label: 'PAN of AOP/BOI *', type: 'text', required: true }
            ]
          }
        ]
      },
      address: {
        title: 'Registered Address',
        subtitle: 'Provide registration address of AOP/BOI.',
        sections: [
          {
            title: 'Address Details',
            fields: [
              { name: 'flatNo', label: 'Flat/Door/Block Number *', type: 'text', required: true },
              { name: 'pincode', label: 'Pincode *', type: 'text', required: true },
              { name: 'areaLocality', label: 'Area / Locality *', type: 'text', required: true },
              { name: 'city', label: 'Town / City *', type: 'text', required: true },
              { name: 'state', label: 'State *', type: 'select', options: ['DELHI', 'MAHARASHTRA', 'KARNATAKA'], required: true },
              { name: 'country', label: 'Country *', type: 'select', options: ['INDIA'], required: true }
            ]
          }
        ]
      },
      members: {
        title: 'Members Details',
        subtitle: 'Provide members details.',
        sections: [
          {
            title: 'AOP/BOI Members List',
            isList: true,
            listName: 'aopMembers',
            fields: [
              { name: 'memberName', label: 'Member Name *', type: 'text', required: true },
              { name: 'memberPan', label: 'Member PAN *', type: 'text', required: true },
              { name: 'memberShare', label: 'Percentage Share (%) *', type: 'number', required: true }
            ]
          }
        ]
      },
      additional: {
        title: 'Additional Information',
        subtitle: 'Provide registrations details.',
        sections: [
          {
            title: 'Special Registrations',
            fields: [
              { name: 'isSection139_4', label: 'Are you filing under Sec 139(4A/B/C/D) (ITR-7)?', type: 'select', options: ['No', 'Yes'], required: false }
            ]
          }
        ]
      }
    }
  },

  'Company Private': {
    details: {
      permanent: {
        title: 'Company Permanent Info',
        subtitle: 'Provide registration credentials for Private Company.',
        sections: [
          {
            title: 'Company details',
            fields: [
              { name: 'companyName', label: 'Name of Company *', type: 'text', required: true },
              { name: 'formationDate', label: 'Date of Incorporation *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'panNumber', label: 'PAN of Company *', type: 'text', required: true }
            ]
          }
        ]
      },
      incorporation: {
        title: 'Address & Incorporation',
        subtitle: 'Provide incorporation details.',
        sections: [
          {
            title: 'Address details',
            fields: [
              { name: 'flatNo', label: 'Flat/Door/Block Number *', type: 'text', required: true },
              { name: 'pincode', label: 'Pincode *', type: 'text', required: true },
              { name: 'areaLocality', label: 'Area / Locality *', type: 'text', required: true },
              { name: 'city', label: 'Town / City *', type: 'text', required: true },
              { name: 'state', label: 'State *', type: 'select', options: ['DELHI', 'MAHARASHTRA', 'KARNATAKA'], required: true },
              { name: 'country', label: 'Country *', type: 'select', options: ['INDIA'], required: true }
            ]
          }
        ]
      },
      directors: {
        title: 'Directors Details',
        subtitle: 'List of all Directors.',
        sections: [
          {
            title: 'Directors list',
            isList: true,
            listName: 'directors',
            fields: [
              { name: 'memberName', label: 'Director Name *', type: 'text', required: true },
              { name: 'memberDin', label: 'Director DIN *', type: 'text', required: true },
              { name: 'memberPan', label: 'PAN *', type: 'text', required: true }
            ]
          }
        ]
      }
    }
  },

  'Company Private': {
    details: companyCommonDetails,
    income: companyCommonIncome,
    financials: companyCommonFinancials,
    deductions: companyCommonDeductions,
    taxes: companyCommonTaxes,
    filing: {
      shareholding_sh1: {
        title: 'Schedule SH-1 (Unlisted)',
        subtitle: 'Details of shareholding in unlisted companies.',
        sections: [
          {
            title: 'Current Shareholders',
            isList: true,
            listName: 'sh1CurrentShareholders',
            fields: [
              { name: 'sh1ShareholderName', label: 'Name of Shareholder *', type: 'text', required: true },
              { name: 'sh1ResidentialStatus', label: 'Residential Status in India *', type: 'select', options: ['Resident', 'Non-Resident'], required: true },
              { name: 'sh1TypeOfShare', label: 'Type of Share *', type: 'select', options: ['Equity Shares', 'Preference Shares'], required: true },
              { name: 'sh1Pan', label: 'PAN', type: 'text', required: false },
              { name: 'sh1Aadhaar', label: 'Aadhaar', type: 'text', required: false },
              { name: 'sh1DateOfAllotment', label: 'Date of Allotment', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
              { name: 'sh1NoOfShares', label: 'Number of Shares Held *', type: 'number', required: true },
              { name: 'sh1FaceValue', label: 'Face Value per Share *', type: 'number', required: true },
              { name: 'sh1IssuePrice', label: 'Issue Price per Share', type: 'number', required: false },
              { name: 'sh1AmountReceived', label: 'Amount Received', type: 'number', required: false }
            ]
          }
        ]
      },
      shareholding_sh2: {
        title: 'Schedule SH-2 (Start-up)',
        subtitle: 'Details of shareholding in recognized start-ups.',
        sections: [
          {
            title: 'Startup Shareholders',
            isList: true,
            listName: 'sh2CurrentShareholders',
            fields: [
              { name: 'sh2ShareholderName', label: 'Name of Shareholder *', type: 'text', required: true },
              { name: 'sh2Category', label: 'Category of Shareholder *', type: 'select', options: ['Promoter', 'Non-Promoter'], required: true },
              { name: 'sh2TypeOfShare', label: 'Type of Share *', type: 'select', options: ['Equity Shares', 'Preference Shares'], required: true },
              { name: 'sh2Pan', label: 'PAN', type: 'text', required: false },
              { name: 'sh2Aadhaar', label: 'Aadhaar', type: 'text', required: false },
              { name: 'sh2DateOfAllotment', label: 'Date of Allotment', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
              { name: 'sh2NoOfShares', label: 'Number of Shares Held *', type: 'number', required: true },
              { name: 'sh2FaceValue', label: 'Face Value per Share *', type: 'number', required: true },
              { name: 'sh2IssuePrice', label: 'Issue Price per Share', type: 'number', required: false },
              { name: 'sh2PaidUpValuePerShare', label: 'Paid-up Value per Share', type: 'number', required: false },
              { name: 'sh2SharePremium', label: 'Share Premium', type: 'number', required: false }
            ]
          }
        ]
      },
      gst: {
        title: 'GST Details',
        subtitle: 'Provide annual value of outward supplies declared in GST returns.',
        sections: [
          {
            title: 'Schedule GST',
            isList: true,
            listName: 'gstRows',
            fields: [
              { name: 'gstinNo', label: 'GSTIN Number *', type: 'text', required: true },
              { name: 'turnoverAsPerGST', label: 'Turnover as per GST Return *', type: 'number', required: true }
            ]
          }
        ]
      },
      bank: {
        title: 'Bank Accounts',
        subtitle: 'Provide active bank details for refund.',
        sections: [
          {
            title: 'Active Bank Accounts',
            isList: true,
            listName: 'bankAccounts',
            fields: [
              { name: 'bankIfscCode', label: 'IFSC Code *', type: 'text', required: true },
              { name: 'bankName', label: 'Bank Name *', type: 'text', required: true },
              { name: 'bankAccountNumber', label: 'Account Number *', type: 'text', required: true },
              { name: 'bankAccountType', label: 'Account Type *', type: 'select', options: ['SAVING', 'CURRENT', 'NRE', 'NRO'], required: true },
              { name: 'selectedForRefund', label: 'Select for Refund *', type: 'select', options: ['Yes', 'No'], required: true }
            ]
          }
        ]
      },
      efiling: {
        title: 'E-Filing & Verification',
        subtitle: 'Verification details of the Director/Principal Officer.',
        sections: [
          {
            title: 'Verification Info',
            fields: [
              { name: 'verifierName', label: 'Name of Director/Principal Officer (Verifier) *', type: 'text', required: true },
              { name: 'verifierDesignation', label: 'Designation *', type: 'select', options: ['Managing Director', 'Director', 'Secretary', 'Principal Officer'], required: true },
              { name: 'verifierPan', label: 'PAN of Verifier *', type: 'text', required: true },
              { name: 'verifierDin', label: 'DIN of Verifier *', type: 'text', required: true },
              { name: 'verifierAadhaar', label: 'Aadhaar of Verifier', type: 'text', required: false },
              { name: 'placeOfSigning', label: 'Place of Signing *', type: 'text', required: true },
              { name: 'dateOfSigning', label: 'Date of Signing (DD/MM/YYYY) *', type: 'text', required: true }
            ]
          }
        ]
      }
    }
  },

  'Company Public': {
    details: companyCommonDetails,
    income: companyCommonIncome,
    financials: companyCommonFinancials,
    deductions: companyCommonDeductions,
    taxes: companyCommonTaxes,
    filing: {
      gst: {
        title: 'GST Details',
        subtitle: 'Provide annual value of outward supplies declared in GST returns.',
        sections: [
          {
            title: 'Schedule GST',
            isList: true,
            listName: 'gstRows',
            fields: [
              { name: 'gstinNo', label: 'GSTIN Number *', type: 'text', required: true },
              { name: 'turnoverAsPerGST', label: 'Turnover as per GST Return *', type: 'number', required: true }
            ]
          }
        ]
      },
      bank: {
        title: 'Bank Accounts',
        subtitle: 'Provide active bank details for refund.',
        sections: [
          {
            title: 'Active Bank Accounts',
            isList: true,
            listName: 'bankAccounts',
            fields: [
              { name: 'bankIfscCode', label: 'IFSC Code *', type: 'text', required: true },
              { name: 'bankName', label: 'Bank Name *', type: 'text', required: true },
              { name: 'bankAccountNumber', label: 'Account Number *', type: 'text', required: true },
              { name: 'bankAccountType', label: 'Account Type *', type: 'select', options: ['SAVING', 'CURRENT', 'NRE', 'NRO'], required: true },
              { name: 'selectedForRefund', label: 'Select for Refund *', type: 'select', options: ['Yes', 'No'], required: true }
            ]
          }
        ]
      },
      efiling: {
        title: 'E-Filing & Verification',
        subtitle: 'Verification details of the Director/Principal Officer.',
        sections: [
          {
            title: 'Verification Info',
            fields: [
              { name: 'verifierName', label: 'Name of Director/Principal Officer (Verifier) *', type: 'text', },
              { name: 'verifierDesignation', label: 'Designation *', type: 'select', options: ['Managing Director', 'Director', 'Secretary', 'Principal Officer'] },
              { name: 'verifierPan', label: 'PAN of Verifier *', type: 'text', },
              { name: 'verifierDin', label: 'DIN of Verifier *', type: 'text', },
              { name: 'verifierAadhaar', label: 'Aadhaar of Verifier', type: 'text', },
              { name: 'placeOfSigning', label: 'Place of Signing *', type: 'text', },
              { name: 'dateOfSigning', label: 'Date of Signing (DD/MM/YYYY) *', type: 'text', }
            ]
          }
        ]
      }
    }
  },

  'Firm': {
    details: {
      permanent: {
        title: 'Firm Permanent Info',
        subtitle: 'Provide credentials for the Partnership Firm.',
        sections: [
          {
            title: 'Firm Details',
            fields: [
              { name: 'firmName', label: 'Name of Partnership Firm *', type: 'text', required: true },
              { name: 'formationDate', label: 'Date of Formation *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'panNumber', label: 'PAN of Firm *', type: 'text', required: true }
            ]
          }
        ]
      }
    }
  },

  'Cooperative Society': {
    details: {
      permanent: {
        title: 'Cooperative Society Info',
        subtitle: 'Provide registration details for Cooperative Society.',
        sections: [
          {
            title: 'Society Details',
            fields: [
              { name: 'societyName', label: 'Name of Cooperative Society *', type: 'text', required: true },
              { name: 'formationDate', label: 'Date of Incorporation *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'panNumber', label: 'PAN of Society *', type: 'text', required: true }
            ]
          }
        ]
      }
    }
  },


  'Trust & Exempt Entities': {
    basic: {
      entity_details: {
        title: 'Trust & Exempt Entity — Basic Information',
        subtitle: 'ITR-7 (AY 2025-26) — Provide core registration details.',
        sections: [
          {
            title: 'ITR-7 Category',
            description: 'Select the section under which this return is being filed.',
            fields: [
              {
                name: 'itr7Category',
                label: 'ITR-7 Filing Category *',
                type: 'select',
                required: true,
                options: [
                  {
                    value: '139_4A',
                    label: '139(4A) – Income from Property held under Trust (Charitable/Religious)'
                  },
                  {
                    value: '139_4B',
                    label: '139(4B) – Chief Executive Officer of every Political Party'
                  },
                  {
                    value: '139_4C',
                    label: '139(4C) – Research Association / News Agency / Section 10 Entities'
                  },
                  {
                    value: '139_4D',
                    label: '139(4D) – University, College or Institution referred in Section 35'
                  }
                ],
                placeholder: 'Select applicable category',
                helpText: 'Choose based on the nature and section of the entity. This determines applicable schedules.',
              },
            ],
          },
          {
            title: 'Entity Identification',
            fields: [
              { name: 'entityName', label: 'Name of Trust/Institution (as in deed) *', type: 'text', required: true },
              { name: 'panNumber', label: 'PAN *', type: 'text', required: true, maxLength: 10, pattern: '[A-Z]{5}[0-9]{4}[A-Z]' },
              { name: 'formationDate', label: 'Date of Formation/Incorporation *', type: 'text', required: true, placeholder: 'DD/MM/YYYY' },
              {
                name: 'status',
                label: 'Status *',
                type: 'select',
                required: true,
                options: [
                  { value: 'trust', label: 'Trust' },
                  { value: 'society', label: 'Society' },
                  { value: 'company', label: 'Company (Section 8)' },
                  { value: 'aop', label: 'Association of Persons (AOP)' },
                  { value: 'institution', label: 'Institution' },
                  { value: 'other', label: 'Other' },
                ],
                placeholder: 'Select Status'
              },
              { name: 'subStatus', label: 'Sub Status', type: 'text' },
            ],
          },
          {
            title: 'Registered Address',
            fields: [
              { name: 'flatDoorBlock', label: 'Flat / Door / Block No.', type: 'text' },
              { name: 'premisesName', label: 'Name of Premises / Building / Village', type: 'text' },
              { name: 'roadStreet', label: 'Road / Street / Post Office', type: 'text' },
              { name: 'areaLocality', label: 'Area / Locality', type: 'text' },
              { name: 'townCity', label: 'Town / City / District', type: 'text' },
              {
                name: 'state', label: 'State', type: 'select',
                options: [
                  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
                  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
                  'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
                  'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana',
                  'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
                  'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu',
                  'Delhi', 'Jammu & Kashmir', 'Ladakh', 'Lakshadweep', 'Puducherry',
                ].map(s => ({ value: s.toLowerCase().replace(/ /g, '_'), label: s })),
                placeholder: 'Select State'
              },
              { name: 'pinCode', label: 'Pin Code', type: 'text', maxLength: 6 },
              { name: 'zipCode', label: 'Zip Code', type: 'text' },
            ],
          },
          {
            title: 'Contact Details',
            fields: [
              { name: 'stdCode', label: 'STD Code', type: 'text', maxLength: 5 },
              { name: 'phoneOffice', label: 'Phone Number (Office)', type: 'text' },
              { name: 'mobile1', label: 'Mobile No. 1 *', type: 'text', required: true },
              { name: 'mobile2', label: 'Mobile No. 2', type: 'text' },
              { name: 'email1', label: 'Email Address 1 *', type: 'text', required: true },
              { name: 'email2', label: 'Email Address 2', type: 'text' },
            ],
          },
        ]
      },
      projects_institutions: {
        title: 'Trust & Exempt Entity — Projects & Institutions',
        subtitle: 'ITR-7 (AY 2025-26) — Provide projects, institutions and GPU details.',
        sections: [
          {
            title: 'Projects / Institutions Run by Assessee',
            description: 'If the assessee runs any project or institution, provide details below.',
            fields: [
              {
                name: 'hasProjects',
                label: 'Whether any project/institution is run by the assessee? *',
                type: 'select',
                required: true,
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
            ],
          },
          {
            title: 'Projects/Institutions List',
            isList: true,
            listName: 'projectsList',
            condition: (state) => state.basic?.projects_institutions?.hasProjects === 'Y',
            fields: [
              { name: 'projectName', label: 'Name of the project/institution *', type: 'text', required: true },
              { name: 'natureActivity', label: 'Nature of activity *', type: 'text', required: true },
              { name: 'classification', label: 'Classification *', type: 'text', required: true },
            ],
          },
          {
            title: 'General Public Utility — Trade / Commerce',
            fields: [
              {
                name: 'hasGpuActivity',
                label: 'Is advancement of any other',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'tradeCommerceActivity',
                label: 'Is there any activity in the nature ',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'tradeCommercePercentage', label: 'Percentage of receipt', type: 'number' },
              {
                name: 'serviceActivity',
                label: 'Any activity of rendering service related',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'servicePercentage', label: 'Percentage of receipt', type: 'number' },
            ],
          },
          {
            title: 'Institution Annual Receipts',
            isList: true,
            listName: 'tradeCommerceList',
            condition: (state) => state.basic?.projects_institutions?.tradeCommerceActivity === 'Y',
            fields: [
              { name: 'institutionName', label: 'Name of Project/Institution *', type: 'text', required: true },
              { name: 'aggregateAnnualReceipts', label: 'Amount of Aggregate Annual Receipts (₹) *', type: 'number', required: true },
            ],
          },
          {
            title: 'University / Educational / Hospital — Sec 10(23C)',
            fields: [
              {
                name: 'hasUniversityInstitution',
                label: 'University/Educational/Hospital eligible for exemption u/s 10(23C)?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
            ],
          },
          {
            title: 'University/Educational/Hospital Institutions List',
            isList: true,
            listName: 'universityInstitutionList',
            condition: (state) => state.basic?.projects_institutions?.hasUniversityInstitution === 'Y',
            fields: [
              {
                name: 'section', label: 'Section *', type: 'select',
                options: ['10(23C)(iiiab)', '10(23C)(iiiac)', '10(23C)(iiiad)', '10(23C)(iiiae)'].map(s => ({ value: s, label: s })),
                placeholder: 'Select Section',
                required: true
              },
              { name: 'institutionName', label: 'Name of University/Institution *', type: 'text', required: true },
              { name: 'aggregateAnnualRec', label: 'Aggregate Annual Receipts (₹) *', type: 'number', required: true },
            ],
          },
        ]
      }
    },
    personal: {
      registration_it: {
        title: 'IT Registration Details',
        subtitle: 'Details of registration/approval under the Income Tax Act.',
        sections: [
          {
            title: 'Registration / Approval under Income Tax Act',
            description: 'Mandatory if required to be registered. Where regular registration granted, provisional details not required.',
            isList: true,
            listName: 'sectionRegisteredRows',
            fields: [
              {
                name: 'sectionRegistered',
                label: 'Section registered/approved u/s *',
                type: 'select',
                options: [
                  '10(23C)(iv)', '10(23C)(v)', '10(23C)(vi)', '10(23C)(via)',
                  '10(23C)(iiiab)', '10(23C)(iiiac)', '10(23C)(iiiad)', '10(23C)(iiiae)',
                  '12A', '12AA', '12AB', '80G', '35',
                ].map(s => ({ value: s, label: s })),
                placeholder: 'Select Section',
                required: true
              },
              {
                name: 'exemptionClaimedSection',
                label: 'Section for exemption *',
                type: 'select',
                options: [
                  '10(23C)(iv)', '10(23C)(v)', '10(23C)(vi)', '10(23C)(via)',
                  '10(23C)(iiiab)', '10(23C)(iiiac)', '10(23C)(iiiad)', '10(23C)(iiiae)',
                  '11 and 12', '80G',
                ].map(s => ({ value: s, label: s })),
                placeholder: 'Select Exemption',
                required: true
              },
              { name: 'registrationDate', label: 'Date of Registration', type: 'text', placeholder: 'DD/MM/YYYY' },
              { name: 'approvalNotificationUrn', label: 'Unique Registration No. (URN)', type: 'text' },
              { name: 'approvingAuthority', label: 'Approving Authority', type: 'text' },
              { name: 'effectiveFromDate', label: 'Date registration is effective', type: 'text', placeholder: 'DD/MM/YYYY' },
            ],
          },
        ]
      },
      registration_other: {
        title: 'Other Registration Details',
        subtitle: 'Details of registration/approval under other laws/portals.',
        sections: [
          {
            title: 'Registration under Laws other than Income Tax Act',
            description: 'Including Foreign Contribution (Regulation) Act 2010, DARPAN portal, SEBI registration.',
            isList: true,
            listName: 'lawPortalRows',
            fields: [
              {
                name: 'lawPortal',
                label: 'Law / Portal *',
                type: 'select',
                options: [
                  { value: 'fcra', label: 'Foreign Contribution (Regulation) Act, 2010' },
                  { value: 'darpan', label: 'DARPAN Portal of NITI Aayog' },
                  { value: 'sebi', label: 'SEBI' },
                  { value: 'other', label: 'Any Other Law' },
                ],
                placeholder: 'Select Portal',
                required: true
              },
              { name: 'otherLawSpecify', label: 'Specify if "Any other Law"', type: 'text' },
              { name: 'regDate', label: 'Date of Registration', type: 'text', placeholder: 'DD/MM/YYYY' },
              { name: 'approvalRegNo', label: 'Registration No.', type: 'text' },
              { name: 'authority', label: 'Approving Authority', type: 'text' },
              { name: 'effectiveFrom', label: 'Date registration is effective', type: 'text', placeholder: 'DD/MM/YYYY' },
            ],
          },
        ]
      },
      filing_status: {
        title: 'Filing Status',
        subtitle: 'Details regarding return filing section and representation.',
        sections: [
          {
            title: 'Return Filing Section',
            fields: [
              {
                name: 'returnFurnishedSection',
                label: 'Return furnished under section *',
                type: 'select',
                required: true,
                options: [
                  { value: '139(1)', label: '139(1) — Original Return' },
                  { value: '139(4)', label: '139(4) — Belated Return' },
                  { value: '139(5)', label: '139(5) — Revised Return' },
                  { value: '139(8A)', label: '139(8A) — Updated Return' },
                  { value: '142(1)', label: '142(1) — In response to notice' },
                  { value: '148', label: '148 — In response to notice' },
                  { value: '153A', label: '153A' },
                  { value: '153C', label: '153C' },
                  { value: '119(2)(b)', label: '119(2)(b)' },
                  { value: '92CD', label: '92CD' },
                ],
                placeholder: 'Select Section'
              },
              {
                name: 'exemptionClaimedSectionReturn',
                label: 'Section under which exemption is claimed',
                type: 'select',
                options: [
                  '11 and 12', '10(23C)(iv)', '10(23C)(v)', '10(23C)(vi)', '10(23C)(via)',
                  '10(23C)(iiiab)', '10(23C)(iiiac)', '10(23C)(iiiad)', '10(23C)(iiiae)',
                  '10(21)', '10(22B)', '10(23A)', '10(23AAA)', '10(23B)', '10(23D)',
                  '10(23DA)', '10(23EC)', '10(23ED)', '10(23EE)', '10(29A)',
                  '10(46)', '10(47)',
                ].map(s => ({ value: s, label: s })),
                placeholder: 'Select Section'
              },
            ],
          },
          {
            title: 'Revised / Defective Return Details',
            fields: [
              { name: 'originalReceiptNo', label: 'Receipt No. of Original Return', type: 'text' },
              { name: 'originalFilingDate', label: 'Date of Filing of Original Return', type: 'text', placeholder: 'DD/MM/YYYY' },
            ],
          },
          {
            title: 'Notice / Order Details',
            fields: [
              { name: 'noticeDin', label: 'Unique Number / DIN', type: 'text' },
              { name: 'noticeDate', label: 'Date of Notice or Order', type: 'text', placeholder: 'DD/MM/YYYY' },
            ],
          },
          {
            title: 'Other Status',
            fields: [
              {
                name: 'residentialStatus',
                label: 'Residential Status',
                type: 'select',
                options: [
                  { value: 'resident', label: 'Resident' },
                  { value: 'non_resident', label: 'Non-Resident' },
                ],
                placeholder: 'Select Status'
              },
              {
                name: 'foreignIncomeClaim',
                label: 'Any income included for claim u/s 90/90A/91?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'representativeAssessee',
                label: 'Is return filed by a representative assessee?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'representativeName', label: 'Name of Representative', type: 'text', conditionalOn: { field: 'representativeAssessee', value: 'Y' } },
              {
                name: 'representativeCapacity', label: 'Capacity of Representative',
                type: 'select',
                conditionalOn: { field: 'representativeAssessee', value: 'Y' },
                options: ['Guardian', 'Trustee', 'Agent', 'Manager', 'Other'].map(s => ({ value: s.toLowerCase(), label: s })),
                placeholder: 'Select Capacity'
              },
              { name: 'representativeAddress', label: 'Address of Representative', type: 'text', conditionalOn: { field: 'representativeAssessee', value: 'Y' } },
              { name: 'representativePan', label: 'PAN of Representative', type: 'text', conditionalOn: { field: 'representativeAssessee', value: 'Y' } },
              { name: 'representativeAadhaar', label: 'Aadhaar No. of Representative', type: 'text', conditionalOn: { field: 'representativeAssessee', value: 'Y' } },
              {
                name: 'isPartnerInFirm',
                label: 'Whether Partner in a Firm?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'partnerFirmName', label: 'Name of Firm', type: 'text', conditionalOn: { field: 'isPartnerInFirm', value: 'Y' } },
              { name: 'partnerFirmPan', label: 'PAN of Firm', type: 'text', conditionalOn: { field: 'isPartnerInFirm', value: 'Y' } },
              {
                name: 'leiNumber',
                label: 'Legal Entity Identifier (LEI) Number',
                type: 'text',
                helpText: 'Mandatory if refund is ₹50 crores or more',
              },
              { name: 'leiValidUpto', label: 'LEI Valid upto Date', type: 'text', placeholder: 'DD/MM/YYYY' },
            ],
          },
        ]
      },
      other_details: {
        title: 'Other Details',
        subtitle: 'Statutory approvals, unlisted shares, change in objects and FCRA registration.',
        sections: [
          {
            title: 'Unlisted Equity Shares',
            fields: [
              {
                name: 'hasUnlistedShares',
                label: 'Whether unlisted equity shares held during previous year?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
            ],
          },
          {
            title: 'Unlisted Shares List',
            isList: true,
            listName: 'hasUnlistedSharesRows',
            condition: (state) => state.personal?.other_details?.hasUnlistedShares === 'Y',
            fields: [
              { name: 'companyName', label: 'Name of Company *', type: 'text', required: true },
              { name: 'companyType', label: 'Type of Company', type: 'text' },
              { name: 'pan', label: 'PAN', type: 'text' },
              { name: 'openingShares', label: 'Opening Shares (No.)', type: 'number' },
              { name: 'openingCost', label: 'Opening Cost (₹)', type: 'number' },
              { name: 'sharesAcquired', label: 'Shares Acquired (No.)', type: 'number' },
              { name: 'dateSubscription', label: 'Date acquired', type: 'text', placeholder: 'DD/MM/YYYY' },
              { name: 'faceValue', label: 'Face Value (₹)', type: 'number' },
              { name: 'issuePrice', label: 'Issue Price (₹)', type: 'number' },
              { name: 'purchasePrice', label: 'Purchase Price (₹)', type: 'number' },
              { name: 'sharesTransferred', label: 'Shares Transferred (No.)', type: 'number' },
              { name: 'saleConsideration', label: 'Sale Consideration (₹)', type: 'number' },
              { name: 'closingShares', label: 'Closing Shares (No.)', type: 'number' },
              { name: 'closingCost', label: 'Closing Cost (₹)', type: 'number' },
            ],
          },
          {
            title: 'Registration u/s 12A / 12AA',
            fields: [
              {
                name: 'registered12A',
                label: 'Whether Registered u/s 12A / 12AA?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'reg12ANo', label: 'Registration No.', type: 'text', conditionalOn: { field: 'registered12A', value: 'Y' } },
              { name: 'reg12AAuthority', label: 'Commissioner who granted reg', type: 'text', conditionalOn: { field: 'registered12A', value: 'Y' } },
              { name: 'reg12ADate', label: 'Date of Registration', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'registered12A', value: 'Y' } },
              {
                name: 'activityType',
                label: 'Whether activity is',
                type: 'select',
                conditionalOn: { field: 'registered12A', value: 'Y' },
                options: [
                  { value: 'charitable', label: 'Charitable' },
                  { value: 'religious', label: 'Religious' },
                  { value: 'both', label: 'Both' },
                ],
                placeholder: 'Select Type'
              },
            ],
          },
          {
            title: 'Approval u/s 35',
            fields: [
              {
                name: 'approved35',
                label: 'Whether approval obtained under section 35?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'sec35Clause', label: 'Relevant clause of Section 35', type: 'text', conditionalOn: { field: 'approved35', value: 'Y' } },
              { name: 'sec35RegNo', label: 'Registration No.', type: 'text', conditionalOn: { field: 'approved35', value: 'Y' } },
              { name: 'sec35ApprDate', label: 'Date of Approval', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'approved35', value: 'Y' } },
              { name: 'sec35Authority', label: 'Approving Authority', type: 'text', conditionalOn: { field: 'approved35', value: 'Y' } },
              {
                name: 'researchType',
                label: 'Whether research is',
                type: 'select',
                conditionalOn: { field: 'approved35', value: 'Y' },
                options: [
                  { value: 'scientific', label: 'Scientific Research' },
                  { value: 'social_statistical', label: 'Social/Statistical Research' },
                ],
                placeholder: 'Select Type'
              },
            ],
          },
          {
            title: 'Approval u/s 80G',
            fields: [
              {
                name: 'approved80G',
                label: 'Whether approval obtained u/s 80G?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'approvalNo80G', label: 'Approval No.', type: 'text', conditionalOn: { field: 'approved80G', value: 'Y' } },
              { name: 'approvalDate80G', label: 'Date of Approval', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'approved80G', value: 'Y' } },
            ],
          },
          {
            title: 'Change in Objects',
            fields: [
              {
                name: 'changeInObjects',
                label: 'Is there any change in objects/activities during the year?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'changeDate', label: 'Date of such change', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'changeInObjects', value: 'Y' } },
              {
                name: 'freshRegApplied',
                label: 'Application for fresh registration made within 30 days?',
                type: 'select',
                conditionalOn: { field: 'changeInObjects', value: 'Y' },
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'freshRegGranted',
                label: 'Fresh registration granted u/s 12AB?',
                type: 'select',
                conditionalOn: { field: 'changeInObjects', value: 'Y' },
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'freshRegDate', label: 'Date of fresh registration', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'changeInObjects', value: 'Y' } },
            ],
          },
          {
            title: 'FCRA Registration',
            fields: [
              {
                name: 'registeredFcra',
                label: 'Whether registered under FCRA, 2010?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'fcraRegNo', label: 'FCRA Registration No.', type: 'text', conditionalOn: { field: 'registeredFcra', value: 'Y' } },
              { name: 'fcraRegDate', label: 'Date of FCRA Registration', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'registeredFcra', value: 'Y' } },
              { name: 'foreignContribAmt', label: 'Total foreign contribution (₹)', type: 'number', conditionalOn: { field: 'registeredFcra', value: 'Y' } },
              { name: 'foreignContribPurpose', label: 'Purpose of foreign contribution', type: 'text', conditionalOn: { field: 'registeredFcra', value: 'Y' } },
            ],
          },
          {
            title: 'SEBI Business Trust',
            fields: [
              {
                name: 'sebiBusinessTrust',
                label: 'Whether a business trust registered with SEBI?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'sebiRegNo', label: 'SEBI Registration No.', type: 'text', conditionalOn: { field: 'sebiBusinessTrust', value: 'Y' } },
              { name: 'sebiRegDate', label: 'Date of SEBI Registration', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'sebiBusinessTrust', value: 'Y' } },
            ],
          },
          {
            title: 'Miscellaneous',
            fields: [
              {
                name: 'firstReturn',
                label: 'Is this your first return?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'maxMarginalRateLiable',
                label: 'Whether liable to tax at maximum marginal',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'sec22ProvisionApplicable',
                label: 'Whether provisions of 22nd proviso to Sec 10(23C)',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
            ],
          },
        ]
      }
    },
    audit: {
      transfer_pricing: {
        title: 'Transfer Pricing Audit',
        subtitle: 'Details of liability and audit u/s 92E.',
        sections: [
          {
            title: 'Audit u/s 92E',
            fields: [
              {
                name: 'liableAudit92E',
                label: 'Are you liable for Audit u/s 92E?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'audit92EDate', label: 'Date of Audit Report', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'liableAudit92E', value: 'Y' } },
              { name: 'auditor92EName', label: 'Name of Auditor Signing', type: 'text', conditionalOn: { field: 'liableAudit92E', value: 'Y' } },
              { name: 'auditor92EMembership', label: 'Membership No. of Auditor', type: 'text', conditionalOn: { field: 'liableAudit92E', value: 'Y' } },
              { name: 'auditor92EFirm', label: 'Name of Auditor Firm', type: 'text', conditionalOn: { field: 'liableAudit92E', value: 'Y' } },
              { name: 'auditor92EPan', label: 'PAN of Auditor Firm', type: 'text', conditionalOn: { field: 'liableAudit92E', value: 'Y' } },
              { name: 'audit92EReportDate', label: 'Date of Audit Report', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'liableAudit92E', value: 'Y' } },
              { name: 'audit92EFurnishingDate', label: 'Date of Furnishing of Report', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'liableAudit92E', value: 'Y' } },
            ],
          },
        ]
      },
      income_tax_audit: {
        title: 'Income Tax Audit',
        subtitle: 'Details of audit under the Income Tax Act.',
        sections: [
          {
            title: 'Audit under Income Tax Act',
            fields: [
              {
                name: 'liableItAudit',
                label: 'Are you liable for audit under Income Tax Act?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'itAuditSection', label: 'Section under which liable for audit', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'otherSectionName', label: 'Other Section Name (if "Others")', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditDate', label: 'Date of Audit', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditorName', label: 'Name of Auditor', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditorMembership', label: 'Membership No. of Auditor', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditorFirm', label: 'Name of Auditor Firm', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditorFirmPan', label: 'PAN of Auditor Firm', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditorAadhaar', label: 'Aadhaar Number of CA', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditReportDate', label: 'Date of Audit Report', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditFurnishDate', label: 'Date of Furnishing Audit Report', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditAckNo', label: 'Ack No. of Audit Report', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
              { name: 'itAuditUdin', label: 'UDIN', type: 'text', conditionalOn: { field: 'liableItAudit', value: 'Y' } },
            ],
          },
        ]
      },
      other_act_audit: {
        title: 'Other Act Audit',
        subtitle: 'Details of audit under any other law.',
        sections: [
          {
            title: 'Audit under any Act other than Income Tax Act',
            isList: true,
            listName: 'otherActAuditRows',
            fields: [
              { name: 'act', label: 'Act *', type: 'text', required: true },
              { name: 'desc', label: 'Description', type: 'text' },
              { name: 'section', label: 'Section *', type: 'text', required: true },
              { name: 'date', label: 'Date of Furnishing Audit Report', type: 'text', placeholder: 'DD/MM/YYYY' },
            ],
          },
        ]
      },
      aop_members: {
        title: 'Members & Trustees',
        subtitle: 'Details of founders, trustees, substantial contributors, and key members.',
        sections: [
          {
            title: 'Members in AOP on 31st March 2025',
            description: 'To be filled by venture capital fund/investment fund.',
            isList: true,
            listName: 'membersAopRows',
            fields: [
              { name: 'name', label: 'Name *', type: 'text', required: true },
              { name: 'address', label: 'Address', type: 'text' },
              { name: 'city', label: 'City', type: 'text' },
              { name: 'state', label: 'State', type: 'text' },
              { name: 'country', label: 'Country', type: 'text' },
              { name: 'pinCode', label: 'Pin Code', type: 'text' },
              { name: 'sharePercentage', label: 'Share %', type: 'number' },
              { name: 'pan', label: 'PAN', type: 'text' },
              { name: 'aadhaar', label: 'Aadhaar Number', type: 'text' },
              {
                name: 'status', label: 'Status', type: 'select',
                options: ['Individual', 'HUF', 'Company', 'Firm', 'Trust', 'Other'].map(s => ({ value: s.toLowerCase(), label: s })),
                placeholder: 'Select Status'
              },
            ],
          },
          {
            title: 'Author(s) / Founder(s) / Trustee(s) / Manager(s)',
            isList: true,
            listName: 'trusteeFounderRows',
            fields: [
              { name: 'name', label: 'Name *', type: 'text', required: true },
              { name: 'relation', label: 'Relation', type: 'text' },
              { name: 'shareholding', label: 'Shareholding %', type: 'number' },
              {
                name: 'residentIndia',
                label: 'Resident of India?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'idType', label: 'ID Type', type: 'select',
                options: ['PAN', 'Aadhaar', 'Passport', 'Other'].map(s => ({ value: s.toLowerCase(), label: s })),
                placeholder: 'Select Type'
              },
              { name: 'idNumber', label: 'ID Number', type: 'text' },
              { name: 'address', label: 'Address', type: 'text' },
              { name: 'mobile', label: 'Mobile Number', type: 'text' },
              { name: 'email', label: 'Email Address', type: 'text' },
            ],
          },
          {
            title: 'Beneficial Owners of Non-Individual Trustees',
            isList: true,
            listName: 'beneficialOwnerRows',
            fields: [
              { name: 'name', label: 'Name *', type: 'text', required: true },
              {
                name: 'residentIndia', label: 'Resident of India?', type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'idType', label: 'ID Type', type: 'select',
                options: ['PAN', 'Aadhaar', 'Passport', 'Other'].map(s => ({ value: s.toLowerCase(), label: s })),
                placeholder: 'Select Type'
              },
              { name: 'idNumber', label: 'ID Number', type: 'text' },
              { name: 'address', label: 'Address', type: 'text' },
              { name: 'beneficialOwnership', label: 'Beneficial Ownership %', type: 'number' },
            ],
          },
          {
            title: 'Substantial Contributors u/s 13(3)(b)',
            isList: true,
            listName: 'substantialContributorRows',
            fields: [
              { name: 'name', label: 'Name *', type: 'text', required: true },
              { name: 'address', label: 'Address', type: 'text' },
              { name: 'pan', label: 'PAN', type: 'text' },
              { name: 'aadhaar', label: 'Aadhaar Number', type: 'text' },
            ],
          },
          {
            title: 'Relatives of Trustees / Contributors',
            isList: true,
            listName: 'relativeRows',
            fields: [
              { name: 'name', label: 'Name *', type: 'text', required: true },
              { name: 'address', label: 'Address', type: 'text' },
              { name: 'pan', label: 'PAN', type: 'text' },
              { name: 'aadhaar', label: 'Aadhaar Number', type: 'text' },
            ],
          },
        ]
      }
    },
    schedules: {
      schedule_i: {
        title: 'Schedule I — Accumulations',
        subtitle: 'Details of amounts accumulated/set apart u/s 11(2) or 10(23C) proviso.',
        sections: [
          {
            title: 'Accumulated Amounts',
            isList: true,
            listName: 'scheduleIRows',
            fields: [
              { name: 'yearAccumulation', label: 'Year of Accumulation (F.Yr.) *', type: 'text', required: true },
              { name: 'amountAccumulated', label: 'Amount Accumulated (₹) *', type: 'number', required: true },
              { name: 'purpose', label: 'Purpose of Accumulation', type: 'text' },
              { name: 'amountApplied', label: 'Amount Applied (₹)', type: 'number' },
              { name: 'balance', label: 'Balance (₹)', type: 'number' },
              { name: 'amountTaxedEarlier', label: 'Amount Taxed in Earlier AY (₹)', type: 'number' },
              { name: 'balanceForApplication', label: 'Balance for Application (₹)', type: 'number' },
              { name: 'appliedFromPrevYears', label: 'Amount Applied from Prev Years (₹)', type: 'number' },
            ],
          },
        ]
      },
      schedule_vc: {
        title: 'Schedule VC — Contributions',
        subtitle: 'Details of voluntary contributions received.',
        sections: [
          {
            title: 'Domestic Contributions',
            fields: [
              { name: 'vcCorpusDonationRenovation', label: 'Corpus: Donations for renovation/repair u/s 80G(2)(b) (₹)', type: 'number' },
              { name: 'vcCorpusOther', label: 'Corpus: Other than above (₹)', type: 'number' },
              { name: 'vcGrantsGovt', label: 'Grants from Government (₹)', type: 'number' },
              { name: 'vcGrantsCsr', label: 'Grants from Companies under CSR (₹)', type: 'number' },
              { name: 'vcSpecificGrants', label: 'Other Specific Grants (₹)', type: 'number' },
              { name: 'vcOtherDonations', label: 'Other Donations (₹)', type: 'number' },
            ],
          },
          {
            title: 'Foreign Contributions',
            fields: [
              { name: 'vcForeignCorpusRenovation', label: 'Foreign Corpus: Renovation/repair places u/s 80G(2)(b) (₹)', type: 'number' },
              { name: 'vcForeignCorpusOther', label: 'Foreign Corpus: Other (₹)', type: 'number' },
              { name: 'vcForeignOther', label: 'Foreign: Other than corpus donation (₹)', type: 'number' },
              { name: 'vcForeignPurpose', label: 'Purpose of foreign contribution received', type: 'text' },
            ],
          },
          {
            title: 'Anonymous Donations u/s 115BBC',
            fields: [
              { name: 'vcAnonymousDonations', label: 'Aggregate anonymous donations received (₹)', type: 'number' },
            ],
          },
        ]
      },
      schedule_ai_er: {
        title: 'Schedules AI & ER/EC',
        subtitle: 'Aggregate Income & Revenue/Capital account application details.',
        sections: [
          {
            title: 'Schedule AI — Aggregate Income',
            fields: [
              { name: 'aiReceiptsMainObjects', label: 'Receipts from main objects (₹)', type: 'number' },
              { name: 'aiReceiptsIncidentalObjects', label: 'Receipts from incidental objects (₹)', type: 'number' },
              { name: 'aiRent', label: 'Rent (₹)', type: 'number' },
              { name: 'aiCommission', label: 'Commission (₹)', type: 'number' },
              { name: 'aiDividend', label: 'Dividend income (₹)', type: 'number' },
              { name: 'aiInterest', label: 'Interest income (₹)', type: 'number' },
              { name: 'aiAgriculture', label: 'Agriculture income (₹)', type: 'number' },
              { name: 'aiCapitalAssetConsideration', label: 'Net consideration on transfer of capital asset (₹)', type: 'number' },
              { name: 'aiOtherIncome', label: 'Any other income (₹)', type: 'number' },
            ],
          },
          {
            title: 'Schedule ER — Revenue Account Application',
            fields: [
              { name: 'erRents', label: 'Rents (₹)', type: 'number' },
              { name: 'erRepairs', label: 'Repairs and Maintenance (₹)', type: 'number' },
              { name: 'erCompensation', label: 'Compensation to Employees (₹)', type: 'number' },
              { name: 'erInsurance', label: 'Insurance (₹)', type: 'number' },
              { name: 'erStaffWelfare', label: 'Workmen and Staff Welfare (₹)', type: 'number' },
              { name: 'erEntertainment', label: 'Entertainment & Hospitality (₹)', type: 'number' },
              { name: 'erAdvertisement', label: 'Advertisement (₹)', type: 'number' },
              { name: 'erProfessionalFees', label: 'Professional/Consultancy Fees (₹)', type: 'number' },
              { name: 'erConveyance', label: 'Conveyance & Traveling Expenses (₹)', type: 'number' },
              { name: 'erRemunerationSec13', label: 'Remuneration to persons u/s 13(3) (₹)', type: 'number' },
              { name: 'erRatesTaxes', label: 'Rates & Taxes to Government (₹)', type: 'number' },
              { name: 'erInterest', label: 'Interest (₹)', type: 'number' },
              { name: 'erAuditFee', label: 'Audit Fee (₹)', type: 'number' },
              { name: 'erDepreciation', label: 'Depreciation/Amortization (₹)', type: 'number' },
              { name: 'erDonationNonCorpus', label: 'Donation to registered trust — Non-Corpus (₹)', type: 'number' },
              { name: 'erReligious', label: 'Religious (₹)', type: 'number' },
              { name: 'erReliefPoor', label: 'Relief of Poor (₹)', type: 'number' },
              { name: 'erEducational', label: 'Educational (₹)', type: 'number' },
              { name: 'erYoga', label: 'Yoga (₹)', type: 'number' },
              { name: 'erMedicalRelief', label: 'Medical Relief (₹)', type: 'number' },
              { name: 'erEnvironment', label: 'Preservation of Environment (₹)', type: 'number' },
              { name: 'erMonuments', label: 'Preservation of Monuments (₹)', type: 'number' },
              { name: 'erGeneralPublicUtility', label: 'General Public Utility (₹)', type: 'number' },
              { name: 'erAmountNotPaid', label: 'Amount not actually paid during year (₹)', type: 'number' },
              { name: 'erAmountPaidEarlier', label: 'Amount paid during year which accrued in earlier year (₹)', type: 'number' },
            ],
          },
          {
            title: 'Schedule EC — Capital Account Application',
            fields: [
              { name: 'ecCapitalWIP', label: 'Addition to Capital WIP (₹)', type: 'number' },
              { name: 'ecCapitalAsset', label: 'Acquisition of Capital Asset (₹)', type: 'number' },
              { name: 'ecExemption11_1A', label: 'Cost of new asset for claim of Exemption u/s 11(1A) (₹)', type: 'number' },
              { name: 'ecAmountNotPaid', label: 'Amount not actually paid (₹)', type: 'number' },
              { name: 'ecAmountPaidEarlier', label: 'Amount paid in year, accrued in earlier year (₹)', type: 'number' },
            ],
          },
        ]
      },
      schedule_j: {
        title: 'Schedule J — Corpus & Investments',
        subtitle: 'Details of corpus fund, loans and investments.',
        sections: [
          {
            title: 'Corpus Fund Details',
            isList: true,
            listName: 'corpusJRows',
            fields: [
              { name: 'corpusDonationType', label: 'Corpus Donation Type *', type: 'text', required: true },
              { name: 'openingBalance', label: 'Opening Balance as on 01.04.2024 (₹)', type: 'number' },
              { name: 'receivedDuringYear', label: 'Received during year (₹)', type: 'number' },
              { name: 'appliedDuringYear', label: 'Applied during year (₹)', type: 'number' },
              { name: 'reinvestedAmount', label: 'Reinvested amount u/s 11(5) (₹)', type: 'number' },
              { name: 'fyAppliedEarlier', label: 'FY applied in earlier years', type: 'text' },
              { name: 'closingBalance', label: 'Closing Balance as on 31.03.2025 (₹)', type: 'number' },
              { name: 'investedSec11_5', label: 'Invested in modes u/s 11(5) (₹)', type: 'number' },
              { name: 'taxedInAY2024_25', label: 'Taxed in AY 2024-25 (₹)', type: 'number' },
              { name: 'investedOtherThanSec11_5', label: 'Invested in modes other than u/s 11(5) (₹)', type: 'number' },
            ],
          },
          {
            title: 'Loan & Borrowings',
            isList: true,
            listName: 'loanJRows',
            fields: [
              { name: 'openingBalance', label: 'Opening Balance (₹)', type: 'number' },
              { name: 'loanTaken', label: 'Loan taken during year (₹)', type: 'number' },
              { name: 'appliedForObj', label: 'Applied for objects (₹)', type: 'number' },
              { name: 'repaidAmount', label: 'Repaid (out of earlier applied) (₹)', type: 'number' },
              { name: 'fyApplied', label: 'FY in which applied', type: 'text' },
              { name: 'totalRepayment', label: 'Total Repayment during year (₹)', type: 'number' },
              { name: 'closingBalance', label: 'Closing Balance as on 31.03.2025 (₹)', type: 'number' },
            ],
          },
          {
            title: 'Corpus Investments u/s 11(5)',
            isList: true,
            listName: 'investJRows',
            fields: [
              { name: 'investmentSource', label: 'Investment source *', type: 'text', required: true },
              { name: 'modeOfInvestment', label: 'Mode u/s 11(5) *', type: 'text', required: true },
              { name: 'amount', label: 'Amount (₹) *', type: 'number', required: true },
            ],
          },
        ]
      },
      schedule_la_et: {
        title: 'Schedules LA & ET',
        subtitle: 'Details for Political Parties and Electoral Trusts.',
        sections: [
          {
            title: 'Schedule LA — Political Party',
            fields: [
              {
                name: 'laRegisteredUnder29A',
                label: 'Registered under Section 29A of Representation of People Act, 1951?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'laRegNumber', label: 'Registration Number', type: 'text', conditionalOn: { field: 'laRegisteredUnder29A', value: 'Y' } },
              { name: 'laRegDate', label: 'Date of Registration', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'laRegisteredUnder29A', value: 'Y' } },
              {
                name: 'laRecognizedByECI',
                label: 'Whether recognized by Election Commission of India?',
                type: 'select',
                conditionalOn: { field: 'laRegisteredUnder29A', value: 'Y' },
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'laEciRecognitionDate', label: 'Date of Recognition by ECI', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'laRecognizedByECI', value: 'Y' } },
              {
                name: 'laBooksMainained',
                label: 'Whether books of account maintained?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'laVolContribAbove20K',
                label: 'Any voluntary contribution >₹20,000 received?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'laAccountsAudited',
                label: 'Whether accounts audited?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'laAuditReportDate', label: 'Date of furnishing audit report', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'laAccountsAudited', value: 'Y' } },
              { name: 'laAuditorName', label: 'Name of Auditor', type: 'text', conditionalOn: { field: 'laAccountsAudited', value: 'Y' } },
              { name: 'laAuditorPan', label: 'PAN of Auditor', type: 'text', conditionalOn: { field: 'laAccountsAudited', value: 'Y' } },
              {
                name: 'la29CReportSubmitted',
                label: 'Whether report u/s 29C of Rep. of People Act submitted?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'laFeeSubscriptions', label: 'Fee & Subscriptions income (₹)', type: 'number' },
              { name: 'laContribElectoralTrusts', label: 'Contributions from Electoral Trusts (₹)', type: 'number' },
              { name: 'laContribElectoralBonds', label: 'Donations via Electoral Bonds (₹)', type: 'number' },
              { name: 'laOtherDonations', label: 'Other Donations (₹)', type: 'number' },
              { name: 'laElectionExpenditure', label: 'Election Expenditure (₹)', type: 'number' },
              { name: 'laEmployeeCosts', label: 'Employee Costs (₹)', type: 'number' },
              { name: 'laAdminExpenses', label: 'Administrative and General Expenses (₹)', type: 'number' },
            ],
          },
          {
            title: 'Schedule ET — Electoral Trust',
            fields: [
              {
                name: 'etBooksMainained',
                label: 'Whether books of account maintained?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'etContribRecordMaintained',
                label: 'Whether record of each voluntary contribution maintained?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              {
                name: 'etAccountsAudited',
                label: 'Whether accounts audited as per rule 17CA(12)?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'etAuditReportDate', label: 'Date of audit report in Form 10BC', type: 'text', placeholder: 'DD/MM/YYYY', conditionalOn: { field: 'etAccountsAudited', value: 'Y' } },
              { name: 'etOpeningBalance', label: 'Opening balance as on 1st April (₹)', type: 'number' },
              { name: 'etContributionsReceived', label: 'Voluntary contributions received during year (₹) *', type: 'number', required: true },
              { name: 'etDistributedToParties', label: 'Amount distributed to Political Parties (₹)', type: 'number' },
              { name: 'etAdminSpend', label: 'Amount spent on admin/management (₹)', type: 'number' },
              { name: 'etAmountEligibleExemption', label: 'Total amount eligible for exemption u/s 13B (₹)', type: 'number' },
            ],
          },
        ]
      },
      balance_sheet: {
        title: 'Balance Sheet & Schedule R',
        subtitle: 'Consolidated balance sheet and corpus reconciliation.',
        sections: [
          {
            title: 'Consolidated Balance Sheet — Sources of Funds',
            fields: [
              { name: 'bsCorpus80G', label: 'Corpus u/s 80G(2)(b) (₹)', type: 'number' },
              { name: 'bsCorpusOtherAfter21', label: 'Other Corpus from 01.04.2021 (₹)', type: 'number' },
              { name: 'bsCorpusOther', label: 'Corpus other than above (₹)', type: 'number' },
              { name: 'bsIncomeAccumulated', label: 'Income accumulated u/s 11(2) (₹)', type: 'number' },
              { name: 'bsDeemedIncomeBal', label: 'Balance of Deemed Income (₹)', type: 'number' },
              { name: 'bsSecuredLoans', label: 'Secured Loans (₹)', type: 'number' },
              { name: 'bsUnsecuredLoans', label: 'Unsecured Loans / Deposits (₹)', type: 'number' },
              { name: 'bsAdvances', label: 'Advances (₹)', type: 'number' },
            ],
          },
          {
            title: 'Consolidated Balance Sheet — Application of Funds',
            fields: [
              { name: 'bsGrossFixedAssets', label: 'Gross Fixed Assets (₹)', type: 'number' },
              { name: 'bsDepreciation', label: 'Depreciation (₹)', type: 'number' },
              { name: 'bsInvestments', label: 'Investments (₹)', type: 'number' },
              { name: 'bsInvestmentsNonSec11_5', label: 'Investments in modes other than u/s 11(5) (₹)', type: 'number' },
              { name: 'bsInventories', label: 'Inventories (₹)', type: 'number' },
              { name: 'bsSundryDebtors', label: 'Sundry Debtors (₹)', type: 'number' },
              { name: 'bsCashBank', label: 'Balance with Banks (₹)', type: 'number' },
              { name: 'bsCashInHand', label: 'Cash in Hand (₹)', type: 'number' },
              { name: 'bsLoansAdvances', label: 'Loans and Advances (₹)', type: 'number' },
              { name: 'bsSundryCreditors', label: 'Sundry Creditors (₹)', type: 'number' },
              { name: 'bsOtherPayables', label: 'Other Payables (₹)', type: 'number' },
              { name: 'bsProvisions', label: 'Provisions (₹)', type: 'number' },
              { name: 'bsAccumulatedDeficit', label: 'Deficit / Reserve (deficit) (₹)', type: 'number' },
            ],
          },
          {
            title: 'Schedule R — Reconciliation of Corpus',
            fields: [
              { name: 'rClosingBalanceJ_1', label: 'Closing balance J — Col 1 (₹)', type: 'number' },
              { name: 'rClosingBalanceJ_2', label: 'Closing balance J — Col 2 (₹)', type: 'number' },
              { name: 'rClosingBalanceJ_3', label: 'Closing balance J — Col 3 (₹)', type: 'number' },
              { name: 'rDiffFixedAssetPurchase', label: 'Difference: Fixed asset purchase (₹)', type: 'number' },
              { name: 'rDiffDepreciation', label: 'Difference: Depreciation (₹)', type: 'number' },
              { name: 'rDiffOther', label: 'Difference: Other reasons (₹)', type: 'number' },
            ],
          },
        ]
      }
    },
    income: {
      house_property: {
        title: 'House Property',
        subtitle: 'Details of income/loss from House Property.',
        sections: [
          {
            title: 'Schedule HP — Income from House Property',
            isList: true,
            listName: 'housePropertiesList',
            fields: [
              { name: 'propertyAddress', label: 'Address of Property *', type: 'text', required: true },
              { name: 'town', label: 'Town/City *', type: 'text', required: true },
              { name: 'state', label: 'State *', type: 'text', required: true },
              {
                name: 'owner', label: 'Owner', type: 'select',
                options: ['Self', 'Co-owner'].map(s => ({ value: s.toLowerCase(), label: s })),
                placeholder: 'Select Owner'
              },
              { name: 'coOwnedPct', label: 'Assessee Share %', type: 'number' },
              {
                name: 'propertyType', label: 'Property Type', type: 'select',
                options: ['Let Out', 'Self Occupied', 'Deemed Let Out'].map(s => ({ value: s.toLowerCase().replace(/ /g, '_'), label: s })),
                placeholder: 'Select Type'
              },
              { name: 'annualRentReceivable', label: 'Gross Rent Received/Receivable (₹)', type: 'number' },
              { name: 'unrealizedRent', label: 'Rent which cannot be realized (₹)', type: 'number' },
              { name: 'taxPaidLocal', label: 'Local Authority Taxes Paid (₹)', type: 'number' },
              { name: 'interestBorrowedCapital', label: 'Interest on Borrowed Capital (₹)', type: 'number' },
              { name: 'arrearUnrealizedRent', label: 'Arrears less 30% (₹)', type: 'number' },
            ],
          },
        ]
      },
      capital_gains: {
        title: 'Capital Gains',
        subtitle: 'Details of Short-Term and Long-Term Capital Gains.',
        sections: [
          {
            title: 'Short-Term Capital Gains (STCG)',
            fields: [
              { name: 'stcgSec111A', label: 'STCG u/s 111A (STT paid) (₹)', type: 'number' },
              { name: 'stcgOther', label: 'STCG (other assets) (₹)', type: 'number' },
              { name: 'stcgDepreciableAsset', label: 'Deemed STCG on depreciable assets (₹)', type: 'number' },
              { name: 'stcgExemptions', label: 'Exemptions (other than 11(1A)) (₹)', type: 'number' },
            ],
          },
          {
            title: 'Long-Term Capital Gains (LTCG)',
            fields: [
              { name: 'ltcgSec112', label: 'LTCG u/s 112 (without indexation proviso) (₹)', type: 'number' },
              { name: 'ltcgSec112A', label: 'LTCG u/s 112A / 112(1) proviso (₹)', type: 'number' },
              { name: 'ltcgExemptions', label: 'Exemptions u/s 54 etc. (₹)', type: 'number' },
            ],
          },
        ]
      },
      other_sources: {
        title: 'Other Sources',
        subtitle: 'Details of income from other sources.',
        sections: [
          {
            title: 'Schedule OS — Income from Other Sources',
            fields: [
              { name: 'osDividend', label: 'Dividend (₹)', type: 'number' },
              { name: 'osInterestSavings', label: 'Interest from Savings Account (₹)', type: 'number' },
              { name: 'osInterestDeposits', label: 'Interest from Deposits (₹)', type: 'number' },
              { name: 'osInterestITRefund', label: 'Interest on Income Tax Refund (₹)', type: 'number' },
              { name: 'osRentalIncome', label: 'Rental income (₹)', type: 'number' },
              { name: 'osAnonymousDonations', label: 'Anonymous donations u/s 115BBC (₹)', type: 'number' },
              { name: 'osOtherIncome', label: 'Any other income (₹)', type: 'number' },
              { name: 'osDeductions', label: 'Deductions (₹)', type: 'number' },
            ],
          },
        ]
      },
      business_profession: {
        title: 'Business & Profession',
        subtitle: 'Details of business and professional income.',
        sections: [
          {
            title: 'Schedule BP — Business / Profession',
            fields: [
              {
                name: 'hasBusinessIncome',
                label: 'Do you have any income under Business and Profession?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
              { name: 'bpGrossProfitPL', label: 'Net Profit/Loss from P&L (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
              { name: 'bpSpecifiedBusinessProfit', label: 'Profits from Specified Business u/s 35AD (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
              { name: 'bpSpeculativeProfit', label: 'Speculative Profit (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
              { name: 'bpDepreciation', label: 'Depreciation claimed in books (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
              { name: 'bpDepreciationAllowable', label: 'Depreciation allowable under IT Act (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
              { name: 'bpDisallowanceSec36', label: 'Disallowance under Section 36 (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
              { name: 'bpDisallowanceSec37', label: 'Disallowance under Section 37 (e.g. CSR expenditure) (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
              { name: 'bpDeemedIncomeSec41', label: 'Deemed income taxable u/s 41 (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
              { name: 'bpDeductions32Ac', label: 'Deductions u/s 32AC (₹)', type: 'number', conditionalOn: { field: 'hasBusinessIncome', value: 'Y' } },
            ],
          },
        ]
      },
      loss_setoff: {
        title: 'Loss & Set-off',
        subtitle: 'Details of loss set-off and special income.',
        sections: [
          {
            title: 'Schedule CYLA — Current Year Losses Set-off',
            fields: [
              { name: 'cylaHousePropertyLoss', label: 'House Property Loss set off (₹)', type: 'number' },
              { name: 'cylaBusinessLoss', label: 'Business Loss set off (₹)', type: 'number' },
            ],
          },
          {
            title: 'Schedule PTI — Pass Through Income',
            fields: [
              { name: 'ptiBusinessTrustIncome', label: 'Pass through from business trust (₹)', type: 'number' },
              { name: 'ptiInvestmentFundIncome', label: 'Pass through from investment fund (₹)', type: 'number' },
            ],
          },
          {
            title: 'Schedule SI — Income at Special Rates',
            fields: [
              { name: 'siAnonymousDonations', label: 'Anonymous donations taxable @ 30% u/s 115BBC (₹)', type: 'number' },
              { name: 'siAccretedIncome115TD', label: 'Accreted income u/s 115TD (₹)', type: 'number' },
              { name: 'si115BBI', label: 'Specified income u/s 115BBI (₹)', type: 'number' },
            ],
          },
        ]
      },
      foreign_income: {
        title: 'Foreign Income & Assets',
        subtitle: 'Details of foreign assets and income earned outside India.',
        sections: [
          {
            title: 'Schedule FSI — Foreign Income Details',
            isList: true,
            listName: 'foreignIncomeList',
            fields: [
              { name: 'country', label: 'Country *', type: 'text', required: true },
              { name: 'taxIdentificationNo', label: 'Taxpayer ID No.', type: 'text' },
              { name: 'headOfIncome', label: 'Head of Income', type: 'text' },
              { name: 'incomeOutsideIndia', label: 'Income accruing outside India (₹) *', type: 'number', required: true },
              { name: 'taxPaidOutside', label: 'Tax paid outside India (₹)', type: 'number' },
              { name: 'taxReliefClaimed', label: 'Tax Relief Claimed (₹)', type: 'number' },
            ],
          },
          {
            title: 'Schedule FA — Foreign Assets',
            fields: [
              {
                name: 'hasForeignAssets',
                label: 'Do you have any foreign assets?',
                type: 'select',
                options: [{ value: 'Y', label: 'Yes' }, { value: 'N', label: 'No' }],
                placeholder: 'Select Option'
              },
            ],
          },
          {
            title: 'Foreign Assets List',
            isList: true,
            listName: 'foreignAssetsList',
            condition: (state) => state.income?.foreign_income?.hasForeignAssets === 'Y',
            fields: [
              { name: 'countryName', label: 'Country Name *', type: 'text', required: true },
              { name: 'assetType', label: 'Type of Asset *', type: 'text', required: true },
              { name: 'assetDetails', label: 'Asset Details', type: 'text' },
              { name: 'dateAcquisition', label: 'Date of Acquisition', type: 'text', placeholder: 'DD/MM/YYYY' },
              { name: 'acquisitionCost', label: 'Acquisition Cost (₹) *', type: 'number', required: true },
              { name: 'incomeFromAsset', label: 'Income from Asset (₹)', type: 'number' },
            ],
          },
        ]
      }
    },
    tax: {
      total_income: {
        title: 'Total Income & Tax',
        subtitle: 'Statement of Total Income and Tax Liability.',
        sections: [
          {
            title: 'Part B-TI — Statement of Total Income',
            fields: [
              { name: 'tiHouseProperty', label: 'Income from House Property (₹)', type: 'number' },
              { name: 'tiBusinessProfession', label: 'Income from Business/Profession (₹)', type: 'number' },
              { name: 'tiCapitalGains', label: 'Income from Capital Gains (₹)', type: 'number' },
              { name: 'tiOtherSources', label: 'Income from Other Sources (₹)', type: 'number' },
              { name: 'tiVoluntaryContributions', label: 'Voluntary Contributions / Donations received (₹)', type: 'number' },
              { name: 'tiCorpusDonations', label: 'Corpus Donations u/s 11(1)(d) (₹)', type: 'number' },
              { name: 'tiAggregateIncome', label: 'Aggregate Income (₹)', type: 'number' },
              { name: 'tiGrossTotal', label: 'Gross Total Income (₹)', type: 'number' },
              { name: 'tiExemptIncome', label: 'Exempt Income u/s 11/12/10 (₹)', type: 'number' },
              { name: 'tiTotalIncome', label: 'Total Income (₹)', type: 'number' },
            ],
          },
          {
            title: 'Part B-TTI — Tax Liability',
            fields: [
              { name: 'ttiTaxOnTotalIncome', label: 'Tax on total income (₹)', type: 'number' },
              { name: 'ttiSurcharge', label: 'Surcharge (₹)', type: 'number' },
              { name: 'ttiHealthEducationCess', label: 'Health & Education Cess (4%) (₹)', type: 'number' },
              { name: 'ttiTotalTaxPayable', label: 'Total Tax Payable (₹)', type: 'number' },
              { name: 'ttiTaxRelief', label: 'Tax Relief u/s 90/90A/91 (₹)', type: 'number' },
              { name: 'ttiNetTaxPayable', label: 'Net Tax Payable (₹)', type: 'number' },
            ],
          },
        ]
      },
      advance_tds: {
        title: 'Advance Tax / TDS / TCS',
        subtitle: 'Details of advance tax, TDS, and TCS payments.',
        sections: [
          {
            title: 'Advance Tax & Self-Assessment Payments',
            isList: true,
            listName: 'advanceTaxPayments',
            fields: [
              {
                name: 'paymentType',
                label: 'Type of Payment *',
                type: 'select',
                options: [
                  { value: 'advance_tax', label: 'Advance Tax' },
                  { value: 'self_assessment', label: 'Self-Assessment Tax' },
                ],
                placeholder: 'Select Type',
                required: true
              },
              { name: 'bsrCode', label: 'BSR Code *', type: 'text', required: true },
              { name: 'dateDeposit', label: 'Date of Deposit *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'serialNo', label: 'Serial Number of Challan *', type: 'text', required: true },
              { name: 'amount', label: 'Tax Paid (₹) *', type: 'number', required: true },
            ],
          },
          {
            title: 'Tax Deducted at Source',
            isList: true,
            listName: 'tdsRows',
            fields: [
              { name: 'tanDeductor', label: 'TAN of Deductor *', type: 'text', required: true },
              { name: 'nameDeductor', label: 'Name of Deductor', type: 'text' },
              { name: 'panDeductor', label: 'PAN of Deductor', type: 'text' },
              { name: 'year', label: 'Year of Tax Deduction', type: 'text', placeholder: 'YYYY' },
              { name: 'incomeType', label: 'Nature of Income', type: 'text' },
              { name: 'amountPaidCredited', label: 'Amount Paid/Credited (₹)', type: 'number' },
              { name: 'tdsAmount', label: 'Tax Deducted (₹) *', type: 'number', required: true },
              { name: 'tdsClaimed', label: 'TDS Claimed (₹) *', type: 'number', required: true },
            ],
          },
          {
            title: 'Tax Collected at Source',
            isList: true,
            listName: 'tcsRows',
            fields: [
              { name: 'tanCollector', label: 'TAN of Collector *', type: 'text', required: true },
              { name: 'nameCollector', label: 'Name of Collector', type: 'text' },
              { name: 'panCollector', label: 'PAN of Collector', type: 'text' },
              { name: 'year', label: 'Year of Tax Collection', type: 'text', placeholder: 'YYYY' },
              { name: 'amountPaid', label: 'Amount Paid (₹)', type: 'number' },
              { name: 'tcsAmount', label: 'Tax Collected (₹) *', type: 'number', required: true },
              { name: 'tcsClaimed', label: 'TCS Claimed (₹) *', type: 'number', required: true },
            ],
          },
        ]
      },
      verification: {
        title: 'Verification',
        subtitle: 'Solemn declaration and e-filing verification details.',
        sections: [
          {
            title: 'Verification Details',
            fields: [
              { name: 'verificationName', label: 'Name of Signatory *', type: 'text' },
              { name: 'verificationFatherName', label: "Father's Name", type: 'text' },
              { name: 'verificationDesignation', label: 'Designation / Capacity *', type: 'text' },
              { name: 'verificationPan', label: 'PAN of Signatory *', type: 'text' },
              { name: 'verificationAadhaar', label: 'Aadhaar of Signatory', type: 'text' },
              { name: 'verificationPlace', label: 'Place *', type: 'text' },
              { name: 'verificationDate', label: 'Date *', type: 'text', placeholder: 'DD/MM/YYYY' },
              {
                name: 'verificationDeclaration',
                label: 'Declaration',
                type: 'checkbox',

                checkboxLabel: 'I solemnly declare that to the best of my knowledge and belief, the information given in the return and its schedules is correct and complete and in accordance with the provisions of the Income-tax Act, 1961. I further declare that I am making this return in my capacity as the authorized signatory and I am also competent to make this return and verify it.',
              },
            ],
          },
        ]
      }
    }
  },

  'LLP': {
    details: {
      general: {
        title: 'General Information',
        subtitle: 'Provide basic identity details of the LLP.',
        sections: [
          {
            title: 'LLP Credentials',
            fields: [
              { name: 'llpName', label: 'Name of LLP *', type: 'text', required: true },
              { name: 'panNumber', label: 'PAN of LLP *', type: 'text', required: true },
              { name: 'llpin', label: 'LLPIN (LLP Identification Number) *', type: 'text', required: true },
              { name: 'dateOfFormation', label: 'Date of Formation *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'dateOfCommencementOfBusiness', label: 'Date of Commencement of Business', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
              { name: 'status', label: 'Status *', type: 'select', options: ['Firm', 'LLP'], required: true },
              { name: 'subStatus', label: 'Sub Status', type: 'select', options: ['LLP'], required: false },
              { name: 'residentialStatus', label: 'Residential Status *', type: 'select', options: ['Resident', 'Non-Resident'], required: true }
            ]
          }
        ]
      },
      address: {
        title: 'Registered Address',
        subtitle: 'Registered office contact details of the LLP.',
        sections: [
          {
            title: 'Office Contact Details',
            fields: [
              { name: 'flatNo', label: 'Flat / Door / Block Number *', type: 'text', required: true },
              { name: 'premiseName', label: 'Building Name', type: 'text', required: false },
              { name: 'roadStreet', label: 'Road / Street *', type: 'text', required: true },
              { name: 'areaLocality', label: 'Area / Locality *', type: 'text', required: true },
              { name: 'city', label: 'City *', type: 'text', required: true },
              { name: 'state', label: 'State *', type: 'select', options: ['ANDHRA PRADESH', 'ASSAM', 'BIHAR', 'CHHATTISGARH', 'DELHI', 'GUJARAT', 'HARYANA', 'HIMACHAL PRADESH', 'JAMMU & KASHMIR', 'JHARKHAND', 'KARNATAKA', 'KERALA', 'MADHYA PRADESH', 'MAHARASHTRA', 'ODISHA', 'PUNJAB', 'RAJASTHAN', 'TAMIL NADU', 'TELANGANA', 'UTTAR PRADESH', 'UTTARAKHAND', 'WEST BENGAL'], required: true },
              { name: 'country', label: 'Country *', type: 'select', options: ['INDIA'], required: true },
              { name: 'pincode', label: 'PIN Code *', type: 'text', required: true },
              { name: 'email', label: 'Email Address *', type: 'text', required: true },
              { name: 'mobileNumber', label: 'Mobile Number *', type: 'text', required: true }
            ]
          }
        ]
      },
      partners: {
        title: 'Partners Details',
        subtitle: 'Provide details of Partners and designated partners.',
        sections: [
          {
            title: 'Designated and Other Partners',
            isList: true,
            listName: 'partners',
            fields: [
              { name: 'partnerName', label: 'Partner Name *', type: 'text', required: true },
              { name: 'partnerPan', label: 'PAN *', type: 'text', required: true },
              { name: 'partnerAadhaar', label: 'Aadhaar', type: 'text', required: false },
              { name: 'partnerType', label: 'Partner Type *', type: 'select', options: ['Designated Partner', 'Partner', 'Nominee Partner'], required: true },
              { name: 'sharePercentage', label: 'Profit Sharing % *', type: 'number', required: true },
              { name: 'remunerationPaid', label: 'Remuneration Paid', type: 'number', required: false },
              { name: 'interestPaid', label: 'Interest Paid on Capital', type: 'number', required: false }
            ]
          },
          {
            title: 'Partner Changes Status',
            fields: [
              { name: 'changeInPartners', label: 'Has there been any change in partners during the year? *', type: 'select', options: ['No', 'Yes'], required: true }
            ]
          },
          {
            title: 'Partner Changes During the Year',
            description: 'Provide details of admission, retirement, or change in profit sharing during the year.',
            isList: true,
            listName: 'partnerChanges',
            condition: (state) => state.details?.partners?.changeInPartners === 'Yes',
            fields: [
              { name: 'changedPartnerName', label: 'Changed Partner Name *', type: 'text', required: true },
              { name: 'admittedOrRetired', label: 'Admitted / Retired / Changed *', type: 'select', options: ['Admitted', 'Retired', 'Changed Profit Sharing', 'Death'], required: true },
              { name: 'changedPartnerPan', label: 'PAN *', type: 'text', required: true },
              { name: 'dateOfChange', label: 'Date of Change *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'remunerationRetiring', label: 'Remuneration paid to retiring partner (if any)', type: 'number', required: false }
            ]
          }
        ]
      },
      business_nature: {
        title: 'Nature of Business',
        subtitle: 'Provide business codes and activities.',
        sections: [
          {
            title: 'Business Nature Details',
            isList: true,
            listName: 'businessNatures',
            fields: [
              { name: 'sector', label: 'Sector *', type: 'select', options: ['Manufacturing', 'Trading', 'Services', 'Profession', 'Others'], required: true },
              { name: 'subSector', label: 'Sub-Sector *', type: 'text', required: true },
              { name: 'description', label: 'Description', type: 'text', required: false }
            ]
          }
        ]
      },
      tax_regime: {
        title: 'Tax Regime Opted',
        subtitle: 'Provide information regarding section 115BAD / 115BAE options.',
        sections: [
          {
            title: 'Regime Choice',
            fields: [
              { name: 'optingOutNewRegime', label: 'Opting out of New Tax Regime u/s 115BAC? *', type: 'select', options: ['No', 'Yes'], required: true },
              { name: 'form10IEADate', label: 'Date of filing Form 10-IEA', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
              { name: 'form10IEAAck', label: 'Form 10-IEA Ack No', type: 'text', required: false }
            ]
          }
        ]
      },
      audit: {
        title: 'Audit Information',
        subtitle: 'Audit liability and auditor details.',
        sections: [
          {
            title: 'Liability to Audit',
            fields: [
              { name: 'liableToAudit', label: 'Liable to Audit u/s 44AB? *', type: 'select', options: ['No', 'Yes'], required: true },
              { name: 'sectionAudit', label: 'Filing under Section Audit', type: 'select', options: ['44AB(a)', '44AB(b)', '44AB(c)', '44AB(d)', '44AB(e)'], required: false },
              { name: 'dateOfAuditReport', label: 'Date of Audit Report', type: 'text', placeholder: 'DD/MM/YYYY', required: false },
              { name: 'caName', label: 'Name of Auditor (CA)', type: 'text', required: false },
              { name: 'caMembershipNo', label: 'Auditor Membership No', type: 'text', required: false },
              { name: 'caFirmPan', label: 'Auditor Firm PAN', type: 'text', required: false }
            ]
          }
        ]
      }
    },
    income: {
      business: {
        title: 'Business Income',
        subtitle: 'Profit & Loss details u/s 28 to 44D.',
        sections: [
          {
            title: 'Net Profit Adjustments u/s 28 to 44D',
            fields: [
              { name: 'netProfitAsPerPL', label: 'Net Profit as per Profit & Loss A/c *', type: 'number', required: true },
              { name: 'adjustmentsAdd', label: 'Amounts to be added back', type: 'number', required: false },
              { name: 'adjustmentsLess', label: 'Amounts to be reduced u/s 28 to 44D', type: 'number', required: false },
              { name: 'netBusinessIncome', label: 'Net Business Income (Calculated)', type: 'number', required: false }
            ]
          }
        ]
      },
      presumptive: {
        title: 'Presumptive Income',
        subtitle: 'Enter business presumptive receipts u/s 44AD / 44ADA.',
        sections: [
          {
            title: 'Section 44AD (Presumptive Business)',
            fields: [
              { name: 'turnoverDigital', label: 'Turnover u/s 44AD (Digital)', type: 'number', required: false },
              { name: 'turnoverCash', label: 'Turnover u/s 44AD (Cash)', type: 'number', required: false },
              { name: 'presumptiveIncome44AD', label: 'Presumptive Income 44AD', type: 'number', required: false }
            ]
          },
          {
            title: 'Section 44ADA (Presumptive Profession)',
            fields: [
              { name: 'turnover44ADA', label: 'Gross Receipt u/s 44ADA', type: 'number', required: false },
              { name: 'presumptiveIncome44ADA', label: 'Presumptive Income 44ADA', type: 'number', required: false }
            ]
          }
        ]
      },
      house_property: {
        title: 'House Property',
        subtitle: 'Details of Income from House Property.',
        sections: [
          {
            title: 'Schedule HP List',
            isList: true,
            listName: 'housePropertiesList',
            fields: [
              { name: 'propertyAddress', label: 'Property Address *', type: 'text', required: true },
              { name: 'propertyType', label: 'Property Type *', type: 'select', options: ['Let Out', 'Self Occupied', 'Deemed Let Out'], required: true },
              { name: 'rentReceived', label: 'Rent Received / Receivable *', type: 'number', required: true },
              { name: 'municipalTaxes', label: 'Municipal Taxes Paid', type: 'number', required: false },
              { name: 'homeLoanInterest', label: 'Interest on Loan', type: 'number', required: false },
              { name: 'incomeFromProperty', label: 'Income from Property *', type: 'number', required: true }
            ]
          }
        ]
      },
      capital_gains: {
        title: 'Capital Gains',
        subtitle: 'Provide details of Short Term and Long Term Capital Gains.',
        sections: [
          {
            title: 'Capital Gain Details',
            fields: [
              { name: 'shortTermCG15Percent', label: 'STCG (taxed at 15% u/s 111A)', type: 'number', required: false },
              { name: 'shortTermCGOther', label: 'STCG (taxed at normal rate)', type: 'number', required: false },
              { name: 'longTermCG10Percent', label: 'LTCG (taxed at 10% u/s 112A)', type: 'number', required: false },
              { name: 'longTermCG20Percent', label: 'LTCG (taxed at 20%)', type: 'number', required: false }
            ]
          }
        ]
      },
      other_sources: {
        title: 'Other Sources',
        subtitle: 'Income from other sources.',
        sections: [
          {
            title: 'Interest and Miscellaneous Income',
            fields: [
              { name: 'interestFromSavings', label: 'Interest on Savings Bank A/c', type: 'number', required: false },
              { name: 'interestFromDeposits', label: 'Interest on Fixed/Term Deposits', type: 'number', required: false },
              { name: 'interestFromITRefund', label: 'Interest on IT Refund', type: 'number', required: false },
              { name: 'dividendIncome', label: 'Dividend Income', type: 'number', required: false },
              { name: 'incomeFromVDA', label: 'Income from VDA (Crypto)', type: 'number', required: false },
              { name: 'otherIncome', label: 'Other Miscellaneous Income', type: 'number', required: false }
            ]
          }
        ]
      }
    },
    financials: {
      bs_sources: {
        title: 'Balance Sheet Sources',
        subtitle: 'Provide Sources of Funds for the LLP.',
        sections: [
          {
            title: 'Sources of Funds',
            fields: [
              { name: 'partnerCapital', label: 'Partners Capital Account *', type: 'number', required: true },
              { name: 'securedLoans', label: 'Secured Loans', type: 'number', required: false },
              { name: 'unsecuredLoans', label: 'Unsecured Loans', type: 'number', required: false },
              { name: 'sundryCreditors', label: 'Sundry Creditors', type: 'number', required: false },
              { name: 'otherLiabilities', label: 'Other Liabilities & Provisions', type: 'number', required: false },
              { name: 'totalLiabilities', label: 'Total Sources of Funds', type: 'number', required: false }
            ]
          }
        ]
      },
      bs_application: {
        title: 'Balance Sheet Application',
        subtitle: 'Provide Application of Funds for the LLP.',
        sections: [
          {
            title: 'Application of Funds',
            fields: [
              { name: 'grossBlockFixedAssets', label: 'Fixed Assets - Gross Block', type: 'number', required: false },
              { name: 'depreciationAccumulated', label: 'Accumulated Depreciation', type: 'number', required: false },
              { name: 'netBlockFixedAssets', label: 'Fixed Assets - Net Block', type: 'number', required: false },
              { name: 'investments', label: 'Investments', type: 'number', required: false },
              { name: 'sundryDebtors', label: 'Sundry Debtors', type: 'number', required: false },
              { name: 'cashAndBankBalances', label: 'Cash & Bank Balances *', type: 'number', required: true },
              { name: 'inventories', label: 'Inventories / Stock-in-hand', type: 'number', required: false },
              { name: 'loansAndAdvances', label: 'Loans & Advances', type: 'number', required: false },
              { name: 'totalAssets', label: 'Total Application of Funds', type: 'number', required: false }
            ]
          }
        ]
      },
      profit_loss: {
        title: 'Profit & Loss Statement',
        subtitle: 'Income and Expenses as per PL A/c.',
        sections: [
          {
            title: 'Revenue and Direct Expenses',
            fields: [
              { name: 'grossProfit', label: 'Gross Profit *', type: 'number', required: true },
              { name: 'otherOperatingIncome', label: 'Other Operating Income', type: 'number', required: false }
            ]
          },
          {
            title: 'Indirect Expenses and Net Profit',
            fields: [
              { name: 'salariesWages', label: 'Salaries & Wages', type: 'number', required: false },
              { name: 'rentRatesAndTaxes', label: 'Rent, Rates & Taxes', type: 'number', required: false },
              { name: 'repairsAndMaintenance', label: 'Repairs & Maintenance', type: 'number', required: false },
              { name: 'insurancePremium', label: 'Insurance Premium', type: 'number', required: false },
              { name: 'printingAndStationery', label: 'Printing & Stationery', type: 'number', required: false },
              { name: 'depreciationPL', label: 'Depreciation', type: 'number', required: false },
              { name: 'interestExpense', label: 'Interest Expense', type: 'number', required: false },
              { name: 'partnerRemuneration', label: 'Partner Remuneration', type: 'number', required: false },
              { name: 'partnerInterest', label: 'Partner Interest', type: 'number', required: false },
              { name: 'netProfitPL', label: 'Net Profit (Calculated) *', type: 'number', required: true }
            ]
          }
        ]
      }
    },
    deductions: {
      chapter6a: {
        title: 'Chapter VI-A Deductions',
        subtitle: 'Provide deduction details.',
        sections: [
          {
            title: 'Deductions Allowed',
            fields: [
              { name: 'deduction80G', label: 'Section 80G (Donations)', type: 'number', required: false },
              { name: 'deduction80GGA', label: 'Section 80GGA (Scientific Research)', type: 'number', required: false },
              { name: 'deduction80GGC', label: 'Section 80GGC (Political Contribution)', type: 'number', required: false },
              { name: 'deduction80IA', label: 'Section 80IA (Infrastructure Development)', type: 'number', required: false },
              { name: 'deduction80IB', label: 'Section 80IB (Industrial Undertakings)', type: 'number', required: false },
              { name: 'deduction80IC', label: 'Section 80IC (Special Category States)', type: 'number', required: false },
              { name: 'deduction80IE', label: 'Section 80IE (North Eastern States)', type: 'number', required: false },
              { name: 'deduction80P', label: 'Section 80P (Cooperative Societies)', type: 'number', required: false }
            ]
          }
        ]
      },
      exempt_income: {
        title: 'Exempt Income',
        subtitle: 'Provide exempt income details.',
        sections: [
          {
            title: 'Schedule Exempt Income',
            fields: [
              { name: 'exemptInterest', label: 'Exempt Interest Income', type: 'number', required: false },
              { name: 'partnerShareExempt', label: 'Share of profit from firm/LLP u/s 10(2A)', type: 'number', required: false },
              { name: 'agriculturalIncome', label: 'Agricultural Income', type: 'number', required: false },
              { name: 'otherExemptIncome', label: 'Other Exempt Incomes', type: 'number', required: false }
            ]
          }
        ]
      },
      losses: {
        title: 'Schedule Losses',
        subtitle: 'Brought forward and carry forward losses.',
        sections: [
          {
            title: 'Schedule Loss Info',
            fields: [
              { name: 'broughtForwardBusinessLoss', label: 'Brought Forward Business Loss', type: 'number', required: false },
              { name: 'broughtForwardDepreciation', label: 'Brought Forward Depreciation', type: 'number', required: false },
              { name: 'carryForwardBusinessLoss', label: 'Carry Forward Business Loss', type: 'number', required: false },
              { name: 'carryForwardDepreciation', label: 'Carry Forward Depreciation', type: 'number', required: false }
            ]
          }
        ]
      }
    },
    taxes: {
      tds: {
        title: 'TDS Details',
        subtitle: 'Tax Deducted at Source details.',
        sections: [
          {
            title: 'Schedule TDS',
            isList: true,
            listName: 'tdsRows',
            fields: [
              { name: 'deductorTan', label: 'TAN of Deductor *', type: 'text', required: true },
              { name: 'deductorName', label: 'Deductor Name *', type: 'text', required: true },
              { name: 'incomeAmount', label: 'Gross Income Amount *', type: 'number', required: true },
              { name: 'tdsAmount', label: 'TDS Amount Deposited *', type: 'number', required: true },
              { name: 'section', label: 'Section (e.g., 194C, 194J) *', type: 'text', required: true },
              { name: 'amountClaimed', label: 'TDS Claimed this Year *', type: 'number', required: true }
            ]
          }
        ]
      },
      tcs: {
        title: 'TCS Details',
        subtitle: 'Tax Collected at Source details.',
        sections: [
          {
            title: 'Schedule TCS',
            isList: true,
            listName: 'tcsRows',
            fields: [
              { name: 'collectorTan', label: 'TAN of Collector *', type: 'text', required: true },
              { name: 'collectorName', label: 'Collector Name *', type: 'text', required: true },
              { name: 'transactionAmount', label: 'Transaction Amount *', type: 'number', required: true },
              { name: 'tcsAmount', label: 'TCS Amount Deposited *', type: 'number', required: true },
              { name: 'amountClaimedTCS', label: 'TCS Claimed this Year *', type: 'number', required: true }
            ]
          }
        ]
      },
      advance_tax: {
        title: 'Self/Advance Tax',
        subtitle: 'Advance Tax / Self Assessment Tax details.',
        sections: [
          {
            title: 'Tax Challan Details',
            isList: true,
            listName: 'taxPayments',
            fields: [
              { name: 'bsrCode', label: 'BSR Code *', type: 'text', required: true },
              { name: 'paymentDate', label: 'Date of Deposit *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
              { name: 'challanNumber', label: 'Challan Number *', type: 'text', required: true },
              { name: 'taxAmountDeposited', label: 'Amount Paid *', type: 'number', required: true }
            ]
          }
        ]
      },
      amt: {
        title: 'Alternate Minimum Tax',
        subtitle: 'Schedule AMT u/s 115JC.',
        sections: [
          {
            title: 'Schedule AMT Details',
            fields: [
              { name: 'adjustedTotalIncome', label: 'Adjusted Total Income u/s 115JC', type: 'number', required: false },
              { name: 'amtLiability', label: 'AMT Liability (calculated)', type: 'number', required: false },
              { name: 'amtCreditBroughtForward', label: 'AMT Credit Brought Forward', type: 'number', required: false },
              { name: 'amtCreditUtilised', label: 'AMT Credit Utilised', type: 'number', required: false }
            ]
          }
        ]
      }
    },
    filing: {
      gst: {
        title: 'GST Details',
        subtitle: 'Turnover declared in GST returns.',
        sections: [
          {
            title: 'Schedule GST',
            isList: true,
            listName: 'gstRows',
            fields: [
              { name: 'gstin', label: 'GSTIN *', type: 'text', required: true },
              { name: 'turnoverAsPerGST', label: 'Turnover as per GST return *', type: 'number', required: true }
            ]
          }
        ]
      },
      bank: {
        title: 'Bank Accounts',
        subtitle: 'Provide active bank details.',
        sections: [
          {
            title: 'Refund Destination Bank',
            isList: true,
            listName: 'bankAccounts',
            fields: [
              { name: 'bankIfscCode', label: 'IFSC Code *', type: 'text', required: true },
              { name: 'bankName', label: 'Bank Name *', type: 'text', required: true },
              { name: 'bankAccountNumber', label: 'Account Number *', type: 'text', required: true },
              { name: 'selectedForRefund', label: 'Select for Refund *', type: 'select', options: ['Yes', 'No'], required: true }
            ]
          }
        ]
      }
    }
  }
};

// Dynamically generate fields configuration for Firm and AOP/BOI by copying LLP
if (fieldsConfig['LLP']) {
  // 1. Setup Firm Configuration
  fieldsConfig['Firm'] = JSON.parse(JSON.stringify(fieldsConfig['LLP']));
  fieldsConfig['Firm'].details.general.title = 'Firm — General Information';
  fieldsConfig['Firm'].details.general.subtitle = 'Provide basic identity details of the Firm.';
  fieldsConfig['Firm'].details.general.sections[0].title = 'Firm Credentials';
  fieldsConfig['Firm'].details.general.sections[0].fields = fieldsConfig['Firm'].details.general.sections[0].fields.filter(
    (f) => f.name !== 'llpin' && f.name !== 'subStatus'
  );
  fieldsConfig['Firm'].details.general.sections[0].fields.forEach((f) => {
    if (f.name === 'llpName') {
      f.name = 'firmName';
      f.label = 'Name of Firm *';
    }
    if (f.name === 'panNumber') {
      f.label = 'PAN of Firm *';
    }
    if (f.name === 'dateOfFormation') {
      f.label = 'Date of Formation *';
    }
    if (f.name === 'status') {
      f.options = ['Firm'];
    }
  });
  fieldsConfig['Firm'].details.address.subtitle = 'Registered office contact details of the Firm.';
  fieldsConfig['Firm'].details.partners.title = 'Partners Details';
  fieldsConfig['Firm'].details.partners.subtitle = 'Provide details of the partners.';
  fieldsConfig['Firm'].details.partners.sections[0].title = 'Schedule of Partners';
  if (fieldsConfig['Firm'].details.partners.sections[0].fields) {
    fieldsConfig['Firm'].details.partners.sections[0].fields[0].label = 'Partner Name *';
    fieldsConfig['Firm'].details.partners.sections[0].fields[1].label = 'Partner PAN *';
    fieldsConfig['Firm'].details.partners.sections[0].fields[2].label = 'Partner Aadhaar';
    fieldsConfig['Firm'].details.partners.sections[0].fields[3].label = 'Partner Capital Contribution (₹)';
    fieldsConfig['Firm'].details.partners.sections[0].fields[4].label = 'Profit Sharing Ratio (%) *';
  }

  // 2. Setup AOP/BOI Configuration
  fieldsConfig['AOP/BOI'] = JSON.parse(JSON.stringify(fieldsConfig['LLP']));
  fieldsConfig['AOP/BOI'].details.general.title = 'AOP/BOI — General Information';
  fieldsConfig['AOP/BOI'].details.general.subtitle = 'Provide basic identity details of the AOP/BOI.';
  fieldsConfig['AOP/BOI'].details.general.sections[0].title = 'AOP/BOI Credentials';
  fieldsConfig['AOP/BOI'].details.general.sections[0].fields = fieldsConfig['AOP/BOI'].details.general.sections[0].fields.filter(
    (f) => f.name !== 'llpin' && f.name !== 'subStatus'
  );
  fieldsConfig['AOP/BOI'].details.general.sections[0].fields.forEach((f) => {
    if (f.name === 'llpName') {
      f.name = 'aopName';
      f.label = 'Name of AOP/BOI *';
    }
    if (f.name === 'panNumber') {
      f.label = 'PAN of AOP/BOI *';
    }
    if (f.name === 'dateOfFormation') {
      f.label = 'Date of Formation/Creation *';
    }
    if (f.name === 'status') {
      f.options = ['AOP/BOI'];
    }
  });
  fieldsConfig['AOP/BOI'].details.address.subtitle = 'Registered office contact details of the AOP/BOI.';
  fieldsConfig['AOP/BOI'].details.partners.title = 'Members Details';
  fieldsConfig['AOP/BOI'].details.partners.subtitle = 'Provide details of the members.';
  fieldsConfig['AOP/BOI'].details.partners.sections[0].title = 'Schedule of Members';
  if (fieldsConfig['AOP/BOI'].details.partners.sections[0].fields) {
    fieldsConfig['AOP/BOI'].details.partners.sections[0].fields[0].label = 'Member Name *';
    fieldsConfig['AOP/BOI'].details.partners.sections[0].fields[1].label = 'Member PAN *';
    fieldsConfig['AOP/BOI'].details.partners.sections[0].fields[2].label = 'Member Aadhaar';
    fieldsConfig['AOP/BOI'].details.partners.sections[0].fields[3].label = 'Member Capital Contribution (₹)';
    fieldsConfig['AOP/BOI'].details.partners.sections[0].fields[4].label = 'Profit/Loss Sharing Ratio (%) *';
  }
}

// 3. Setup configurations for Individual2, Individual3, and Individual4
const individualCommonDetails = {
  general: {
    title: 'General Information',
    subtitle: 'Basic identity details of the individual.',
    sections: [
      {
        title: 'Identity Details',
        fields: [
          { name: 'fullName', label: 'Full Name *', type: 'text', required: true },
          { name: 'pan', label: 'PAN *', type: 'text', required: true },
          { name: 'dateOfBirth', label: 'Date of Birth *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
          { name: 'aadhaar', label: 'Aadhaar Number *', type: 'text', placeholder: '12-digit Aadhaar', required: true },
          { name: 'gender', label: 'Gender *', type: 'select', options: ['Male', 'Female', 'Other'], required: true },
          { name: 'residentialStatus', label: 'Residential Status *', type: 'select', options: ['Resident', 'Non-Resident'], required: true },
          { name: 'filingSection', label: 'Filing Status Type *', type: 'select', options: ['139(1) - On or before due date', '139(4) - Belated', '139(5) - Revised'], required: true },
          { name: 'optingOutNewRegime', label: 'Opting out of New Tax Regime u/s 115BAC? *', type: 'select', options: ['No', 'Yes'], required: true }
        ]
      }
    ]
  },
  address: {
    title: 'Registered Address',
    subtitle: 'Provide the residential/communication address details.',
    sections: [
      {
        title: 'Address details',
        fields: [
          { name: 'flatNo', label: 'Flat/Door/Block No. *', type: 'text', required: true },
          { name: 'premiseName', label: 'Name of Premises/Building', type: 'text', required: false },
          { name: 'roadStreet', label: 'Road/Street/Lane', type: 'text', required: false },
          { name: 'areaLocality', label: 'Area/Locality *', type: 'text', required: true },
          { name: 'city', label: 'Town/City/District *', type: 'text', required: true },
          { name: 'state', label: 'State *', type: 'select', options: ['Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Delhi'], required: true },
          { name: 'pincode', label: 'PIN Code *', type: 'number', required: true },
          { name: 'country', label: 'Country *', type: 'select', options: ['INDIA'], required: true },
          { name: 'mobile', label: 'Mobile Number *', type: 'text', placeholder: '10-digit Mobile', required: true },
          { name: 'email', label: 'Email Address *', type: 'text', placeholder: 'Email Address', required: true }
        ]
      }
    ]
  },
  additional: {
    title: 'Additional Details',
    subtitle: 'Disclosures under Seventh Proviso to Section 139(1).',
    sections: [
      {
        title: 'Seventh Proviso Disclosures',
        fields: [
          { name: 'depositedExceeding1Cr', label: 'Have you deposited amount exceeding 1 Crore in current accounts? *', type: 'select', options: ['No', 'Yes'], required: true },
          { name: 'depositedAmount', label: 'Deposit Amount (₹) *', type: 'number', required: true, conditionalOn: { field: 'depositedExceeding1Cr', value: 'Yes' } },
          { name: 'foreignTravelExceeding2L', label: 'Have you incurred foreign travel expenditure exceeding 2 Lakhs? *', type: 'select', options: ['No', 'Yes'], required: true },
          { name: 'travelAmount', label: 'Travel Expenditure (₹) *', type: 'number', required: true, conditionalOn: { field: 'foreignTravelExceeding2L', value: 'Yes' } },
          { name: 'electricityExceeding1L', label: 'Have you incurred electricity expenditure exceeding 1 Lakh? *', type: 'select', options: ['No', 'Yes'], required: true },
          { name: 'electricityAmount', label: 'Electricity Expenditure (₹) *', type: 'number', required: true, conditionalOn: { field: 'electricityExceeding1L', value: 'Yes' } }
        ]
      }
    ]
  }
};

const individualCommonIncome = {
  salary: {
    title: 'Salary / Pension Income',
    subtitle: 'Provide details of salary, perquisites, and profits in lieu of salary.',
    sections: [
      {
        title: 'Salary details u/s 17',
        fields: [
          { name: 'salary17_1', label: 'Salary as per Section 17(1) (₹) *', type: 'number', required: true },
          { name: 'salary17_2', label: 'Value of perquisites as per Section 17(2) (₹)', type: 'number', required: false },
          { name: 'salary17_3', label: 'Profits in lieu of salary as per Section 17(3) (₹)', type: 'number', required: false },
          { name: 'grossSalary', label: 'Gross Salary (i) (₹)', type: 'number', required: false, disabled: true },
          { name: 'sec10_13A', label: 'Sec 10(13A) - HRA Exemption (₹)', type: 'number', required: false },
          { name: 'exemptAllowances', label: 'Less: Exempt Allowances u/s 10 (₹)', type: 'number', required: false },
          { name: 'deductionStandard', label: 'Standard Deduction u/s 16(ia) (₹)', type: 'number', required: false, disabled: true },
          { name: 'professionalTax', label: 'Professional Tax paid u/s 16(iii) (₹)', type: 'number', required: false },
          { name: 'incomeChargeableSalaries', label: 'Income chargeable under Head "Salaries" (v) (₹)', type: 'number', required: false, disabled: true }
        ]
      }
    ]
  },
  house_property: {
    title: 'House Property Income',
    subtitle: 'Details of income/loss from House Property.',
    sections: [
      {
        title: 'House Property List',
        isList: true,
        listName: 'housePropertiesList',
        fields: [
          { name: 'propertyAddress', label: 'Address of Property *', type: 'text', required: true },
          { name: 'propertyType', label: 'Property Type *', type: 'select', options: ['Self Occupied', 'Let Out', 'Deemed Let Out'], required: true },
          { name: 'rentReceived', label: 'Gross Rent Received *', type: 'number', required: true },
          { name: 'municipalTaxes', label: 'Municipal Taxes Paid', type: 'number', required: false },
          { name: 'homeLoanInterest', label: 'Interest on Home Loan u/s 24', type: 'number', required: false },
          { name: 'incomeFromProperty', label: 'Income from Property *', type: 'number', required: true }
        ]
      }
    ]
  },
  other_sources: {
    title: 'Other Sources',
    subtitle: 'Interest, dividend, and miscellaneous incomes.',
    sections: [
      {
        title: 'Interest and Dividends',
        fields: [
          { name: 'savingsInterest', label: 'Interest from Savings Bank Accounts (₹)', type: 'number', required: false },
          { name: 'depositInterest', label: 'Interest from Deposits (FD/Post Office) (₹)', type: 'number', required: false },
          { name: 'refundInterest', label: 'Income Tax Refund Interest (₹)', type: 'number', required: false },
          { name: 'dividendIncome', label: 'Dividend Income (₹)', type: 'number', required: false },
          { name: 'otherIncome', label: 'Other Miscellaneous Income (₹)', type: 'number', required: false }
        ]
      }
    ]
  }
};

const individualCommonDeductions = {
  chapter6a: {
    title: 'Chapter VI-A Deductions',
    subtitle: 'Deductions that reduce taxable income.',
    sections: [
      {
        title: 'Deductions u/s 80',
        fields: [
          { name: 'deduction80C', label: 'Section 80C (Max 1,50,000) (₹)', type: 'number', required: false },
          { name: 'deduction80D', label: 'Section 80D (Health Insurance) (₹)', type: 'number', required: false },
          { name: 'deduction80G', label: 'Section 80G (Donations) (₹)', type: 'number', required: false },
          { name: 'deduction80TTA', label: 'Section 80TTA (Max 10,000) (₹)', type: 'number', required: false },
          { name: 'deduction80TTB', label: 'Section 80TTB (Max 50,000 for Senior Citizens) (₹)', type: 'number', required: false },
          { name: 'deduction80E', label: 'Section 80E (Education Loan Interest) (₹)', type: 'number', required: false },
          { name: 'deduction80GGC', label: 'Section 80GGC (Political Contribution) (₹)', type: 'number', required: false }
        ]
      }
    ]
  },
  exempt_income: {
    title: 'Exempt Income',
    subtitle: 'Incomes exempt from taxation under Section 10.',
    sections: [
      {
        title: 'Exempt Incomes',
        fields: [
          { name: 'agriculturalIncome', label: 'Section 10(38) / Agricultural Income (₹)', type: 'number', required: false },
          { name: 'exemptInterest', label: 'Exempt Interest Income (₹)', type: 'number', required: false },
          { name: 'otherExemptIncome', label: 'Other Exempt Incomes (₹)', type: 'number', required: false }
        ]
      }
    ]
  }
};

const individualCommonTaxes = {
  tds: {
    title: 'TDS details',
    subtitle: 'Tax Deducted at Source details.',
    sections: [
      {
        title: 'TDS Claims',
        isList: true,
        listName: 'tdsRows',
        fields: [
          { name: 'tanOfDeductor', label: 'TAN of Deductor *', type: 'text', required: true },
          { name: 'nameOfDeductor', label: 'Name of Deductor *', type: 'text', required: true },
          { name: 'tdsRelation', label: 'TDS credit relating to *', type: 'select', options: ['Self', 'Other Person'], required: true },
          { name: 'grossIncomeAmount', label: 'Gross Income Amount *', type: 'number', required: true },
          { name: 'totalTaxDeducted', label: 'TDS of current FY *', type: 'number', required: true },
          { name: 'tdsSection', label: 'Section *', type: 'select', options: ['194C', '194J', '194I', '194A', '195', 'Others'], required: true },
          { name: 'amountClaimed', label: 'TDS credit claimed this year *', type: 'number', required: true }
        ]
      }
    ]
  },
  tcs: {
    title: 'TCS details',
    subtitle: 'Tax Collected at Source details.',
    sections: [
      {
        title: 'TCS Claims',
        isList: true,
        listName: 'tcsRows',
        fields: [
          { name: 'tanOfCollector', label: 'TAN of Collector *', type: 'text', required: true },
          { name: 'nameOfCollector', label: 'Collector Name *', type: 'text', required: true },
          { name: 'tcsRelation', label: 'TCS credit relating to *', type: 'select', options: ['Self', 'Other Person'], required: true },
          { name: 'transactionAmount', label: 'Transaction Amount *', type: 'number', required: true },
          { name: 'totalTaxCollected', label: 'TCS of current FY *', type: 'number', required: true },
          { name: 'amountClaimedTCS', label: 'TCS credit claimed this year *', type: 'number', required: true }
        ]
      }
    ]
  },
  advance_tax: {
    title: 'Advance & Self-Assessment Tax',
    subtitle: 'Challan tax deposit payments.',
    sections: [
      {
        title: 'Tax Payments List',
        isList: true,
        listName: 'taxPayments',
        fields: [
          { name: 'bsrCode', label: 'BSR Code (6 digits) *', type: 'text', required: true },
          { name: 'dateOfDeposit', label: 'Date of Deposit *', type: 'text', placeholder: 'DD/MM/YYYY', required: true },
          { name: 'challanSerial', label: 'Challan Serial Number (5 digits) *', type: 'text', required: true },
          { name: 'taxAmountDeposited', label: 'Tax Amount Deposited *', type: 'number', required: true },
          { name: 'taxType', label: 'Type of Tax *', type: 'select', options: ['Advance Tax', 'Self Assessment Tax'], required: true }
        ]
      }
    ]
  }
};

const individualCommonFiling = {
  bank: {
    title: 'Bank Accounts',
    subtitle: 'Provide active bank details.',
    sections: [
      {
        title: 'Refund Destination Bank',
        isList: true,
        listName: 'bankAccounts',
        fields: [
          { name: 'bankIfscCode', label: 'IFSC Code *', type: 'text', required: true },
          { name: 'bankName', label: 'Bank Name *', type: 'text', required: true },
          { name: 'bankAccountNumber', label: 'Account Number *', type: 'text', required: true },
          { name: 'selectedForRefund', label: 'Select for Refund *', type: 'select', options: ['Yes', 'No'], required: true }
        ]
      }
    ]
  },
  efiling: {
    title: 'E-Filing & Verification',
    subtitle: 'Verification details of the individual.',
    sections: [
      {
        title: 'Verification Info',
        fields: [
          { name: 'verifierName', label: 'Name of Verifier *', type: 'text', required: true },
          { name: 'verifierPan', label: 'PAN of Verifier *', type: 'text', required: true },
          { name: 'verifierAadhaar', label: 'Aadhaar of Verifier', type: 'text', required: false },
          { name: 'placeOfSigning', label: 'Place of Signing *', type: 'text', required: true },
          { name: 'dateOfSigning', label: 'Date of Signing *', type: 'text', placeholder: 'DD/MM/YYYY', required: true }
        ]
      }
    ]
  }
};
