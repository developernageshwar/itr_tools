const statesList = [
  { value: 'Andaman and Nicobar Islands', label: 'Andaman and Nicobar Islands' },
  { value: 'Andhra Pradesh', label: 'Andhra Pradesh' },
  { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh' },
  { value: 'Assam', label: 'Assam' },
  { value: 'Bihar', label: 'Bihar' },
  { value: 'Chandigarh', label: 'Chandigarh' },
  { value: 'Chhattisgarh', label: 'Chhattisgarh' },
  { value: 'Dadra and Nagar Haveli and Daman and Diu', label: 'Dadra and Nagar Haveli and Daman and Diu' },
  { value: 'Delhi', label: 'Delhi' },
  { value: 'Goa', label: 'Goa' },
  { value: 'Gujarat', label: 'Gujarat' },
  { value: 'Haryana', label: 'Haryana' },
  { value: 'Himachal Pradesh', label: 'Himachal Pradesh' },
  { value: 'Jammu and Kashmir', label: 'Jammu and Kashmir' },
  { value: 'Jharkhand', label: 'Jharkhand' },
  { value: 'Karnataka', label: 'Karnataka' },
  { value: 'Kerala', label: 'Kerala' },
  { value: 'Ladakh', label: 'Ladakh' },
  { value: 'Lakshadweep', label: 'Lakshadweep' },
  { value: 'Madhya Pradesh', label: 'Madhya Pradesh' },
  { value: 'Maharashtra', label: 'Maharashtra' },
  { value: 'Manipur', label: 'Manipur' },
  { value: 'Meghalaya', label: 'Meghalaya' },
  { value: 'Mizoram', label: 'Mizoram' },
  { value: 'Nagaland', label: 'Nagaland' },
  { value: 'Odisha', label: 'Odisha' },
  { value: 'Puducherry', label: 'Puducherry' },
  { value: 'Punjab', label: 'Punjab' },
  { value: 'Rajasthan', label: 'Rajasthan' },
  { value: 'Sikkim', label: 'Sikkim' },
  { value: 'Tamil Nadu', label: 'Tamil Nadu' },
  { value: 'Telangana', label: 'Telangana' },
  { value: 'Tripura', label: 'Tripura' },
  { value: 'Uttar Pradesh', label: 'Uttar Pradesh' },
  { value: 'Uttarakhand', label: 'Uttarakhand' },
  { value: 'West Bengal', label: 'West Bengal' }
];

export const itr3FieldConfig = [
  {
    id: 1,
    label: 'Details',
    route: 'details',
    subsections: [
      {
        id: 'general_info',
        label: 'Part A: General Information',
        fieldSections: [
          {
            id: 'personal_identity',
            label: '1.1 Personal Identity',
            fields: [
              { name: 'firstName', label: 'First Name', type: 'text', required: true, validation: { type: 'alpha', maxChars: 75 } },
              { name: 'middleName', label: 'Middle Name', type: 'text', required: false },
              { name: 'lastName', label: 'Last Name', type: 'text', required: true },
              { name: 'pan', label: 'PAN', type: 'text', required: true, validation: { pattern: '^[A-Z]{5}[0-9]{4}[A-Z]{1}$' } },
              { name: 'status', label: 'Status', type: 'dropdown', required: true, options: [{ value: 'I', label: 'I – Individual' }, { value: 'H', label: 'H – HUF' }] },
              { name: 'dobOrFormation', label: 'Date of Birth / Formation', type: 'date', required: true, notes: 'DOB for Individual, Formation date for HUF' },
              { name: 'dateOfCommencementBusiness', label: 'Date of Commencement of Business', type: 'date', required: true, notes: 'Specific to ITR-3' },
              { name: 'hasAadhaar', label: 'Do you have an Aadhaar Number?', type: 'dropdown', required: 'conditional', condition: 'status === "I"', options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }] },
              { name: 'aadhaarNumber', label: 'Aadhaar Number', type: 'text', required: 'conditional', validation: { length: 12 }, condition: 'status === "I" && hasAadhaar === "Yes"' },
              { name: 'aadhaarEnrolmentId', label: 'Aadhaar Enrolment ID', type: 'text', required: 'conditional', validation: { length: 28 }, condition: 'status === "I" && hasAadhaar === "No"' },
              { name: 'passportNumber', label: 'Passport Number', type: 'text', required: false, condition: 'status === "I"' },
              { name: 'isFpi', label: 'Whether FPI?', type: 'dropdown', required: false, options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }] },
              { name: 'sebiRegistrationNumber', label: 'SEBI Registration Number', type: 'text', required: 'conditional', condition: 'isFpi === "Yes"' }
            ]
          },
          {
            id: 'address',
            label: '1.2 Address',
            fields: [
              { name: 'isSecondarySameAsPrimary', label: 'Is the secondary address same as primary address?', type: 'dropdown', required: true, options: [{ value: 'Yes', label: 'Yes' }, { value: 'No', label: 'No' }] },
              { name: 'flatDoorBlockNo', label: 'Flat / Door / Block No.', type: 'text', required: true },
              { name: 'buildingPremisesVillage', label: 'Name of Premises / Building / Village', type: 'text', required: false },
              { name: 'roadStreetPostOffice', label: 'Road / Street / Post Office', type: 'text', required: false },
              { name: 'areaLocality', label: 'Area / Locality', type: 'text', required: false },
              { name: 'townCityDistrict', label: 'Town / City / District', type: 'text', required: true },
              { name: 'state', label: 'State', type: 'dropdown', required: true, options: statesList },
              { name: 'country', label: 'Country / Region', type: 'dropdown', required: true, options: [{ value: 'India', label: 'India' }], defaultValue: 'India', disabled: true },
              { name: 'pinCode', label: 'PIN Code', type: 'text', required: 'conditional', validation: { length: 6 }, condition: 'country === "91-INDIA"' },
              { name: 'noZipCode', label: 'No ZIP Code', type: 'checkbox', required: false, condition: 'country !== "91-INDIA"' },
              { name: 'zipCode', label: 'ZIP Code', type: 'text', required: 'conditional', condition: 'country !== "91-INDIA" && !noZipCode' }
            ]
          },
          {
            id: 'contact_details',
            label: '1.3 Contact Details',
            fields: [
              { name: 'emailSelf', label: 'Email Address 1 (Self)', type: 'email', required: true },
              { name: 'emailSecondary', label: 'Email Address 2', type: 'email', required: false },
              { name: 'mobileSelf', label: 'Mobile No. 1', type: 'tel', required: true },
              { name: 'stdIsdCode', label: 'STD/ISD Code', type: 'text', required: false },
              { name: 'phoneLandline', label: 'Residential/Office Phone Number', type: 'tel', required: false },
              { name: 'mobileSecondary', label: 'Mobile No. 2', type: 'tel', required: false }
            ]
          },
          {
            id: 'residential_status',
            label: '1.4 Residential Status (Individual only)',
            fields: [
              {
                name: 'residentialStatus',
                label: 'Residential Status in India',
                type: 'dropdown',
                required: true,
                options: [
                  { value: 'RES', label: 'RES – Resident' },
                  { value: 'NRI', label: 'NRI – Non Resident' },
                  { value: 'NOR', label: 'NOR – Resident but not Ordinarily Resident' }
                ]
              },
              {
                name: 'residentialStatusConditions',
                label: 'Conditions for Residential Status',
                type: 'dropdown',
                required: 'conditional',
                options: [
                  { value: '182_day_rule', label: '182-day rule' },
                  { value: '60_day_rule', label: '60-day rule' },
                  { value: 'citizen_120_day_rule', label: 'Citizen 120-day rule' },
                  { value: '115bac_15_lakh_rule', label: '6(1A) 15-lakh rule' },
                  { value: 'nor_conditions', label: 'NOR conditions' },
                  { value: 'nri_conditions', label: 'NRI conditions' }
                ]
              },
              { name: 'jurisdictionOfResidence', label: 'Jurisdiction of Residence (up to 2 rows)', type: 'table', required: 'conditional', columns: ['Country Dropdown', 'TIN Text'] },
              { name: 'stayInIndiaPreviousYear', label: 'Total stay in India during previous year (days)', type: 'number', required: 'conditional' },
              { name: 'stayInIndiaPrecedingYears', label: 'Total stay in India during 4 preceding years (days)', type: 'number', required: 'conditional' },
              { name: 'hasPermanentEstablishment', label: 'Permanent Establishment (PE) in India?', type: 'radio', required: 'conditional', options: ['Yes', 'No'], condition: 'residentialStatus === "NRI"' },
              { name: 'hasSignificantEconomicPresence', label: 'Significant Economic Presence (SEP) in India?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'], condition: 'residentialStatus === "NRI"' },
              { name: 'sepAggregatePayments', label: 'SEP — Aggregate of payments during PY (₹)', type: 'amount', required: 'conditional', condition: 'hasSignificantEconomicPresence === "Yes"' },
              { name: 'sepNumberOfUsers', label: 'SEP — Number of users in India', type: 'number', required: 'conditional', condition: 'hasSignificantEconomicPresence === "Yes"' },
              { name: 'hasIfscUnitForeignExchange', label: 'Unit in IFSC deriving income in foreign exchange?', type: 'dropdown', required: false, options: ['Yes', 'No'] }
            ]
          },
          {
            id: 'tax_regime_switching',
            label: '1.5 Tax Regime — 115BAC switching logic',
            fields: [
              { name: 'everOptedNewRegimeEarlier', label: 'Have you ever opted for New Tax Regime in earlier years?', type: 'radio', required: true, options: ['Yes', 'No'] },
              { name: 'ayOptionExercised', label: 'Assessment Year in which option was exercised', type: 'dropdown', required: 'conditional', condition: 'everOptedNewRegimeEarlier === "Yes"' },
              { name: 'dateFilingForm10IE', label: 'Date of filing Form 10IE', type: 'date', required: 'conditional' },
              { name: 'ackNumberForm10IE', label: 'Acknowledgement number of Form 10IE', type: 'text', required: 'conditional' },
              { name: 'everOptedOutEarlier', label: 'Have you ever opted OUT in earlier years?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'ayOptedOut', label: 'AY in which opted out', type: 'dropdown', required: 'conditional' },
              { name: 'dateFilingForm10IEOptOut', label: 'Date of filing Form 10IE (opt-out)', type: 'date', required: 'conditional' },
              { name: 'ackNumberForm10IEOptOut', label: 'Acknowledgement number (opt-out)', type: 'text', required: 'conditional' },
              {
                name: 'optionCurrentAY',
                label: 'Option for current AY',
                type: 'dropdown',
                required: true,
                options: [
                  { value: 'opting_in', label: 'Opting in now' },
                  { value: 'continue_opt', label: 'Continue to opt' },
                  { value: 'opt_out', label: 'Opt out' },
                  { value: 'not_opting', label: 'Not opting' },
                  { value: 'not_eligible', label: 'Not eligible' }
                ]
              },
              { name: 'dateFilingForm10IECurrent', label: 'Date of filing Form 10IE (current AY)', type: 'date', required: 'conditional' },
              { name: 'ackNumberForm10IECurrent', label: 'Acknowledgement number (current AY)', type: 'text', required: 'conditional' },
              { name: 'exercisedOptionOptOut6', label: 'Have you exercised option u/s 115BAC(6) to opt out?', type: 'dropdown', required: true, options: ['No', 'Yes within due date', 'Yes but beyond due date'] },
              { name: 'dateFilingForm10IEA', label: 'Date of filing Form 10-IEA', type: 'date', required: 'conditional' },
              { name: 'ackNumberForm10IEA', label: 'Acknowledgement number of Form 10-IEA', type: 'text', required: 'conditional' },
              { name: 'methodOfOptingOut', label: 'Method of opting out', type: 'dropdown', required: 'conditional', options: ['By filing 10IEA (having BP income)', 'By exercising option in return (Form 10IEA not applicable)'] },
              { name: 'form10IeaFiledAY2425', label: '10IEA filed in AY 2024-25?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'subPathA_continueOptOut', label: 'Sub-path (a)(i): Continue to opt out for current AY?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'subPathA_dateForm10Iea', label: 'Sub-path (a) — Date of Form 10-IEA for AY 2025-26', type: 'date', required: 'conditional' },
              { name: 'subPathA_ackForm10Iea', label: 'Sub-path (a) — Ack. no. of Form 10-IEA for AY 2025-26', type: 'text', required: 'conditional' },
              { name: 'subPathB_optOutCurrent', label: 'Sub-path (b)(i): Opt out for current AY?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'subPathB_dateForm10Iea', label: 'Sub-path (b) — Date of Form 10-IEA for AY 2025-26', type: 'date', required: 'conditional' },
              { name: 'subPathB_ackForm10Iea', label: 'Sub-path (b) — Ack. no. of Form 10-IEA for AY 2025-26', type: 'text', required: 'conditional' },
              { name: 'subPathC_optOutCurrent', label: 'Sub-path (c)(i): Opt out for current AY? (non-10IEA filers)', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'subPathC_dateForm10Iea', label: 'Sub-path (c) — Date of Form 10-IEA for AY 2025-26', type: 'date', required: 'conditional' },
              { name: 'subPathC_ackForm10Iea', label: 'Sub-path (c) — Ack. no. of Form 10-IEA for AY 2025-26', type: 'text', required: 'conditional' }
            ]
          },
          {
            id: 'filing_metadata',
            label: '1.6 Filing Type & Return Metadata',
            fields: [
              {
                name: 'filedUnderSection',
                label: 'Filed u/s (Section)',
                type: 'dropdown',
                required: true,
                options: [
                  { value: '139_1', label: '139(1) On or before due date' },
                  { value: '139_4', label: '139(4) Belated' },
                  { value: '139_5', label: '139(5) Revised' },
                  { value: '92CD', label: '92CD Modified' },
                  { value: '119_2_b', label: '119(2)(b)' },
                  { value: '139_8A', label: '139(8A) Updated' },
                  { value: '139_9', label: '139(9) Defective' },
                  { value: '142_1', label: '142(1)' },
                  { value: '148', label: '148' },
                  { value: '153A', label: '153A' },
                  { value: '153C', label: '153C' }
                ]
              },
              { name: 'filedInResponseNotice', label: 'Filed in response to notice u/s', type: 'dropdown', required: 'conditional', options: ['139(9)', '142(1)', '148', '153C', '153A'] },
              { name: 'revisedDefectiveReceiptNo', label: 'If revised/defective — Receipt No.', type: 'text', required: 'conditional' },
              { name: 'dateFilingOriginalReturn', label: 'Date of filing of Original Return', type: 'date', required: 'conditional' },
              { name: 'uniqueNumberDinNotice', label: 'Unique Number / DIN (for notice)', type: 'text', required: 'conditional' },
              { name: 'dateNoticeOrder', label: 'Date of Notice / Order', type: 'date', required: 'conditional' },
              { name: 'dueDateFiling', label: 'Due Date for filing return', type: 'date', readOnly: true, computed: true }
            ]
          },
          {
            id: 'seventh_proviso',
            label: '1.7 Seventh Proviso to Section 139(1)',
            fields: [
              { name: 'isFilingUnderSeventhProviso', label: 'Filing under Seventh Proviso?', type: 'radio', required: true, options: ['Yes', 'No'] },
              { name: 'depositedAmountCurrentAccount', label: 'Deposited > ₹1 Crore in current account(s)?', type: 'radio', required: 'conditional', options: ['Yes', 'No'], condition: 'isFilingUnderSeventhProviso === "Yes"' },
              { name: 'incurredForeignTravelExpense', label: 'Incurred > ₹2 lakh on foreign travel?', type: 'radio', required: 'conditional', options: ['Yes', 'No'], condition: 'isFilingUnderSeventhProviso === "Yes"' },
              { name: 'incurredElectricityExpense', label: 'Incurred > ₹1 lakh on electricity?', type: 'radio', required: 'conditional', options: ['Yes', 'No'], condition: 'isFilingUnderSeventhProviso === "Yes"' },
              { name: 'salesTurnoverExceeds60Lakh', label: 'Sales/turnover > ₹60 lakh?', type: 'radio', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'grossReceiptsProfessionExceeds10Lakh', label: 'Gross receipts in profession > ₹10 lakh?', type: 'radio', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'tdsTcsExceedsThreshold', label: 'TDS+TCS ≥ ₹25,000 (or ₹50,000 for senior citizen)?', type: 'radio', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'savingsBankDepositsExceeds50Lakh', label: 'Savings bank deposits ≥ ₹50 lakh?', type: 'radio', required: 'conditional', options: ['Yes', 'No'] }
            ]
          },
          {
            id: 'representative_assessee',
            label: '1.8 Representative Assessee',
            fields: [
              { name: 'isFiledByRepresentative', label: 'Filed by representative assessee?', type: 'dropdown', required: true, options: ['Yes', 'No'] },
              { name: 'representativeName', label: 'Name of Representative', type: 'text', required: 'conditional', condition: 'isFiledByRepresentative === "Yes"' },
              { name: 'representativeCapacity', label: 'Capacity of Representative', type: 'dropdown', required: 'conditional', options: ['Legal Heir', 'Manager', 'Guardian', 'Other'], condition: 'isFiledByRepresentative === "Yes"' },
              { name: 'representativeAddress', label: 'Address of Representative', type: 'text', required: 'conditional', condition: 'isFiledByRepresentative === "Yes"' },
              { name: 'representativePan', label: 'PAN of Representative', type: 'text', required: 'conditional', validation: { type: 'PAN' }, condition: 'isFiledByRepresentative === "Yes"' },
              { name: 'representativeAadhaar', label: 'Aadhaar Number of Representative', type: 'text', required: 'conditional', condition: 'isFiledByRepresentative === "Yes"' }
            ]
          },
          {
            id: 'corporate_disclosures',
            label: '1.9 Directorship, Partnership & Unlisted Equity Shares',
            fields: [
              { name: 'isDirectorInCompany', label: 'Director in a Company?', type: 'dropdown', required: false, options: ['Yes', 'No'], tableColumns: ['Name', 'Type', 'PAN', 'Listed-Unlisted', 'DIN'], maxRows: 3 },
              { name: 'isPartnerInFirm', label: 'Partner in a Firm?', type: 'dropdown', required: false, options: ['Yes', 'No'], tableColumns: ['Name of Firm', 'PAN'], maxRows: 2 },
              { name: 'heldUnlistedEquityShares', label: 'Held Unlisted Equity Shares?', type: 'dropdown', required: false, options: ['Yes', 'No'], tableColumns: ['Company', 'Type', 'PAN', 'Opening balance (shares+cost)', 'Acquisitions (date, face value, issue price, purchase price)', 'Transfers (shares, consideration)', 'Closing balance'], maxRows: 3 }
            ]
          },
          {
            id: 'special_benefits_lei',
            label: '1.10 Benefit u/s 115H, Portuguese Civil Code, FPI, LEI',
            fields: [
              { name: 'claimBenefit115H', label: 'Do you want to claim benefit u/s 115H (Resident)?', type: 'radio', required: false, options: ['Yes', 'No'] },
              { name: 'governedByPortugueseCivilCode', label: 'Governed by Portuguese Civil Code (Sec 5A)?', type: 'dropdown', required: true, options: ['Yes', 'No'], notes: 'If Yes → Schedule 5A mandatory' },
              { name: 'leiNumber', label: 'LEI Number', type: 'text', required: 'conditional', notes: 'Mandatory if refund ≥ ₹50 Crore' },
              { name: 'leiValidUptoDate', label: 'LEI Valid Upto Date', type: 'date', required: 'conditional' }
            ]
          },
          {
            id: 'audit_info',
            label: '1.11 Audit Information',
            fields: [
              { name: 'liableToMaintainAccounts44AA', label: 'a1. Liable to maintain accounts u/s 44AA?', type: 'dropdown', required: true, options: ['Yes', 'No'] },
              { name: 'isDeclaringIncomeOnlyPresumptive', label: 'a2. Declaring income only u/s 44AE/44B/44BB/44AD/44ADA/44BBA?', type: 'dropdown', required: true, options: ['Yes', 'No'] },
              { name: 'turnoverBetween1CrAnd10Cr', label: 'a2i. If No at a2 — Total sales/turnover between ₹1 Cr and ₹10 Cr?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'cashReceiptsLess5Percent', label: 'a2ii. If Yes at a2i — Cash receipts ≤ 5% of total receipts?', type: 'radio', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'cashPaymentsLess5Percent', label: 'a2iii. If Yes at a2i — Cash payments ≤ 5% of total payments?', type: 'radio', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'liableForAudit44AB', label: 'b. Liable for audit u/s 44AB?', type: 'dropdown', required: true, options: ['Yes', 'No'] },
              { name: 'auditConditionsMultiSelect', label: 'Which condition u/s 44AB applies?', type: 'checkbox_group', required: 'conditional', options: ['44AD', '44ADA', '44AE', '44BB'], condition: 'liableForAudit44AB === "Yes"' },
              { name: 'accountsAuditedByAccountant', label: 'c. Accounts audited by accountant?', type: 'radio', required: 'conditional', options: ['Yes', 'No'], condition: 'liableForAudit44AB === "Yes"' },
              { name: 'dateFurnishingAuditReport', label: 'c-a. Date of furnishing audit report', type: 'date', required: 'conditional' },
              { name: 'nameAuditorSigning', label: 'c-b. Name of auditor signing tax audit report', type: 'text', required: 'conditional' },
              { name: 'membershipNoAuditor', label: 'c-c. Membership No. of auditor', type: 'text', required: 'conditional' },
              { name: 'nameAuditFirm', label: 'c-d. Name of audit firm (proprietorship/firm)', type: 'text', required: 'conditional' },
              { name: 'firmRegistrationNumber', label: 'c-e. Proprietorship/Firm Registration Number', type: 'text', required: 'conditional' },
              { name: 'panAuditFirm', label: 'c-f. PAN of proprietorship/firm', type: 'text', required: 'conditional', validation: { type: 'PAN' } },
              { name: 'aadhaarProprietorship', label: 'c-g. Aadhaar of proprietorship', type: 'text', required: 'conditional' },
              { name: 'dateAuditReport', label: 'c-h. Date of audit report', type: 'date', required: 'conditional' },
              { name: 'ackNumberAuditReport', label: 'c-i. Acknowledgement number of audit report', type: 'text', required: 'conditional' },
              { name: 'udin', label: 'c-j. UDIN', type: 'text', required: 'conditional', validation: { type: 'alphanumeric', length: 18 } },
              { name: 'liableForAudit92E', label: 'd(i). Liable for audit u/s 92E?', type: 'dropdown', required: false, options: ['Yes', 'No'] },
              { name: 'accountsAudited92E', label: 'd(ii). If d(i) = Yes — Accounts audited u/s 92E?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] }
            ]
          }
        ]
      },
      {
        id: 'nature_of_business_subsection',
        label: 'SECTION 2 — Nature of Business',
        fieldSections: [
          {
            id: 'business_nature_entries',
            label: 'Nature of Business (Up to 3 Entries)',
            fields: [
              {
                name: 'natureOfBusinessTable',
                label: 'Business Classification Table',
                type: 'table',
                maxRows: 3,
                columns: [
                  { name: 'slNo', label: 'Sl. No.', type: 'auto' },
                  { name: 'code', label: 'Code', type: 'dropdown', required: true, notes: '100+ business codes list' },
                  { name: 'tradeName', label: 'Trade Name of Proprietorship', type: 'text', required: false },
                  { name: 'description', label: 'Description', type: 'auto', notes: 'Auto-populated from code' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 2,
    label: 'Income Sources',
    route: 'income',
    subsections: [
      {
        id: 'business_profession_regular',
        label: 'Business / Profession Regular Accounts',
        fieldSections: [
          {
            id: 'balance_sheet_sources',
            label: '3.1 Balance Sheet - Sources of Funds',
            fields: [
              { name: 'proprietorsCapital', ref: 'a', label: "Proprietor's Capital", type: 'amount', required: false },
              { name: 'revaluationReserve', ref: 'bi', label: 'Revaluation Reserve', type: 'amount', required: false },
              { name: 'capitalReserve', ref: 'bii', label: 'Capital Reserve', type: 'amount', required: false },
              { name: 'statutoryReserve', ref: 'biii', label: 'Statutory Reserve', type: 'amount', required: false },
              { name: 'anyOtherReserve', ref: 'biv', label: 'Any Other Reserve', type: 'amount', required: false },
              { name: 'totalReserves', ref: 'bv', label: 'Total Reserves (bi+bii+biii+biv)', type: 'amount', readOnly: true, computed: true },
              { name: 'totalProprietorsFund', ref: '1c', label: "Total Proprietor's Fund (a+bv)", type: 'amount', readOnly: true, computed: true },
              { name: 'foreignCurrencyLoansSecured', ref: 'ai', label: 'Foreign Currency Loans (Secured)', type: 'amount', required: false },
              { name: 'rupeeLoansBanks', ref: 'iiA', label: 'Rupee Loans — From Banks', type: 'amount', required: false },
              { name: 'rupeeLoansOthers', ref: 'iiB', label: 'Rupee Loans — From Others', type: 'amount', required: false },
              { name: 'totalRupeeLoans', ref: 'iiC', label: 'Total Rupee Loans (iiA+iiB)', type: 'amount', readOnly: true, computed: true },
              { name: 'totalSecuredLoans', ref: 'aiii', label: 'Total Secured Loans (ai+iiC)', type: 'amount', readOnly: true, computed: true },
              { name: 'unsecuredLoansBanks', ref: 'bi', label: 'Unsecured Loans from Banks', type: 'amount', required: false },
              { name: 'unsecuredLoansOthers', ref: 'bii', label: 'Unsecured Loans from Others', type: 'amount', required: false },
              { name: 'totalUnsecuredLoans', ref: 'biii', label: 'Total Unsecured Loans', type: 'amount', readOnly: true, computed: true },
              { name: 'totalLoanFunds', ref: '2c', label: 'Total Loan Funds (aiii+biii)', type: 'amount', readOnly: true, computed: true },
              { name: 'deferredTaxLiability', ref: '3', label: 'Deferred Tax Liability', type: 'amount', required: false },
              { name: 'advancesPersons40A2b', ref: '4i', label: 'Advances from Persons u/s 40A(2)(b)', type: 'amount', required: false },
              { name: 'advancesOthers', ref: '4ii', label: 'Advances from Others', type: 'amount', required: false },
              { name: 'totalAdvances', ref: '4iii', label: 'Total Advances (i+ii)', type: 'amount', readOnly: true, computed: true },
              { name: 'totalSources', ref: '5', label: 'TOTAL SOURCES (1c+2c+3+4iii)', type: 'amount', readOnly: true, computed: true }
            ]
          },
          {
            id: 'balance_sheet_application',
            label: '3.2 Balance Sheet - Application of Funds & No Account Cases',
            fields: [
              { name: 'grossBlockFixedAssets', ref: '1a', label: 'Gross Block of Fixed Assets', type: 'amount', required: false },
              { name: 'depreciation', ref: '1b', label: 'Depreciation', type: 'amount', required: false },
              { name: 'netBlock', ref: '1c', label: 'Net Block (1a–1b)', type: 'amount', readOnly: true, computed: true },
              { name: 'capitalWorkInProgress', ref: '1d', label: 'Capital Work-in-Progress', type: 'amount', required: false },
              { name: 'totalFixedAssets', ref: '1e', label: 'Total Fixed Assets (1c+1d)', type: 'amount', readOnly: true, computed: true },
              { name: 'longTermInvestmentsQuoted', ref: 'ai', label: 'Long-term Investments — Govt & Other Securities (Quoted)', type: 'amount', required: false },
              { name: 'longTermInvestmentsUnquoted', ref: 'aii', label: 'Long-term Investments — Govt & Other Securities (Unquoted)', type: 'amount', required: false },
              { name: 'totalLongTermInvestments', ref: 'aiii', label: 'Total Long-term Investments', type: 'amount', readOnly: true, computed: true },
              { name: 'shortTermEquityShares', ref: 'bi', label: 'Short-term — Equity Shares incl. share application money', type: 'amount', required: false },
              { name: 'shortTermPreferenceShares', ref: 'bii', label: 'Short-term — Preference Shares', type: 'amount', required: false },
              { name: 'shortTermDebentures', ref: 'biii', label: 'Short-term — Debentures', type: 'amount', required: false },
              { name: 'totalShortTermInvestments', ref: 'biv', label: 'Total Short-term Investments', type: 'amount', readOnly: true, computed: true },
              { name: 'totalInvestments', ref: '2c', label: 'Total Investments (aiii+biv)', type: 'amount', readOnly: true, computed: true },
              { name: 'inventoriesStores', ref: 'iA', label: 'Inventories — Stores/Consumables', type: 'amount', required: false },
              { name: 'inventoriesRawMaterials', ref: 'iB', label: 'Inventories — Raw Materials', type: 'amount', required: false },
              { name: 'inventoriesStockInProcess', ref: 'iC', label: 'Inventories — Stock-in-Process', type: 'amount', required: false },
              { name: 'inventoriesFinishedGoods', ref: 'iD', label: 'Inventories — Finished/Traded Goods', type: 'amount', required: false },
              { name: 'totalInventories', ref: 'iE', label: 'Total Inventories', type: 'amount', readOnly: true, computed: true },
              { name: 'sundryDebtors', ref: 'aii', label: 'Sundry Debtors', type: 'amount', required: false },
              { name: 'cashInHand', ref: 'iiiA', label: 'Cash-in-Hand', type: 'amount', required: false },
              { name: 'balanceWithBank', ref: 'iiiB', label: 'Balance with Bank', type: 'amount', required: false },
              { name: 'totalCashBank', ref: 'iiiC', label: 'Total Cash & Bank', type: 'amount', readOnly: true, computed: true },
              { name: 'otherCurrentAssets', ref: 'aiv', label: 'Other Current Assets', type: 'amount', required: false },
              { name: 'totalCurrentAssets', ref: 'av', label: 'Total Current Assets', type: 'amount', readOnly: true, computed: true },
              { name: 'advancesRecoverableCashKind', ref: 'bi', label: 'Advances recoverable in cash or kind', type: 'amount', required: false },
              { name: 'depositsLoansAdvancesCorporates', ref: 'bii', label: 'Deposits, loans & advances to corporates etc.', type: 'amount', required: false },
              { name: 'balanceRevenueAuthorities', ref: 'biii', label: 'Balance with Revenue Authorities', type: 'amount', required: false },
              { name: 'totalLoansAdvances', ref: 'biv', label: 'Total Loans & Advances', type: 'amount', readOnly: true, computed: true },
              { name: 'totalCurrentAssetsLoansAdvances', ref: '3c', label: 'Total Current Assets + Loans & Advances', type: 'amount', readOnly: true, computed: true },
              { name: 'sundryCreditors', ref: 'iA', label: 'Sundry Creditors', type: 'amount', required: false },
              { name: 'liabilityLeasedAssets', ref: 'iB', label: 'Liability for Leased Assets', type: 'amount', required: false },
              { name: 'interestAccruedAbove', ref: 'iC', label: 'Interest Accrued on above', type: 'amount', required: false },
              { name: 'interestAccruedNotDueLoans', ref: 'iD', label: 'Interest Accrued but not due on loans', type: 'amount', required: false },
              { name: 'totalCurrentLiabilities', ref: 'iE', label: 'Total Current Liabilities', type: 'amount', readOnly: true, computed: true },
              { name: 'provisionIncomeTax', ref: 'iiA', label: 'Provision for Income Tax', type: 'amount', required: false },
              { name: 'provisionLeaveEncashSuperannuation', ref: 'iiB', label: 'Provision for Leave Encash/Superannuation/Gratuity', type: 'amount', required: false },
              { name: 'otherProvisions', ref: 'iiC', label: 'Other Provisions', type: 'amount', required: false },
              { name: 'totalProvisions', ref: 'iiD', label: 'Total Provisions', type: 'amount', readOnly: true, computed: true },
              { name: 'totalCurrentLiabilitiesProvisions', ref: 'diii', label: 'Total Current Liabilities + Provisions', type: 'amount', readOnly: true, computed: true },
              { name: 'netCurrentAssets', ref: '3e', label: 'Net Current Assets (3c–diii)', type: 'amount', readOnly: true, computed: true },
              { name: 'miscExpenditureNotWrittenOff', ref: '4a', label: 'Miscellaneous Expenditure not written off', type: 'amount', required: false },
              { name: 'deferredTaxAsset', ref: '4b', label: 'Deferred Tax Asset', type: 'amount', required: false },
              { name: 'accumulatedPlBalance', ref: '4c', label: 'Profit and Loss Account / Accumulated Balance', type: 'amount', required: false },
              { name: 'totalMiscDtaPl', ref: '4d', label: 'Total Misc + DTA + P&L', type: 'amount', readOnly: true, computed: true },
              { name: 'totalApplication', ref: '5', label: 'TOTAL APPLICATION (1e+2c+3e+4d)', type: 'amount', readOnly: true, computed: true },
              { name: 'noAccountSundryDebtors', ref: '6a', label: 'No Account Case — Total Sundry Debtors', type: 'amount', required: 'conditional' },
              { name: 'noAccountSundryCreditors', ref: '6b', label: 'No Account Case — Total Sundry Creditors', type: 'amount', required: 'conditional' },
              { name: 'noAccountStockInTrade', ref: '6c', label: 'No Account Case — Total Stock-in-Trade', type: 'amount', required: 'conditional' },
              { name: 'noAccountCashBalance', ref: '6d', label: 'No Account Case — Cash Balance', type: 'amount', required: 'conditional' }
            ]
          },
          {
            id: 'manufacturing_account',
            label: 'SECTION 4 — Part A-Manufacturing Account',
            fields: [
              { name: 'openingStockRawMaterials', ref: 'Ai', label: 'Opening Stock of Raw Materials', type: 'amount', required: false },
              { name: 'openingStockWip', ref: 'Aii', label: 'Opening Stock of Work-in-Progress', type: 'amount', required: false },
              { name: 'totalOpeningInventoryMfg', ref: 'Aiii', label: 'Total Opening Inventory (Ai+Aii)', type: 'amount', readOnly: true, computed: true },
              { name: 'purchasesMfg', ref: 'B', label: 'Purchases (net of refunds & duty)', type: 'amount', required: false },
              { name: 'directWages', ref: 'C', label: 'Direct Wages', type: 'amount', required: false },
              { name: 'carriageInwardMfg', ref: 'Di', label: 'Carriage Inward', type: 'amount', required: false },
              { name: 'powerFuelDirect', ref: 'Dii', label: 'Power and Fuel (Direct)', type: 'amount', required: false },
              { name: 'otherDirectExpensesMfg', ref: 'Diii', label: 'Other Direct Expenses', type: 'amount', required: false },
              { name: 'totalDirectExpensesMfg', ref: 'D', label: 'Total Direct Expenses (Di+Dii+Diii)', type: 'amount', readOnly: true, computed: true },
              { name: 'indirectWages', ref: 'Ei', label: 'Indirect Wages', type: 'amount', required: false },
              { name: 'factoryRentRates', ref: 'Eii', label: 'Factory Rent and Rates', type: 'amount', required: false },
              { name: 'factoryInsurance', ref: 'Eiii', label: 'Factory Insurance', type: 'amount', required: false },
              { name: 'factoryFuelPower', ref: 'Eiv', label: 'Factory Fuel and Power', type: 'amount', required: false },
              { name: 'factoryGeneralExpenses', ref: 'Ev', label: 'Factory General Expenses', type: 'amount', required: false },
              { name: 'depreciationFactoryMachinery', ref: 'Evi', label: 'Depreciation of Factory Machinery', type: 'amount', required: false },
              { name: 'totalFactoryOverheads', ref: 'Evii', label: 'Total Factory Overheads', type: 'amount', readOnly: true, computed: true },
              { name: 'totalDebitsManufacturing', ref: 'F', label: 'Total Debits to Manufacturing Account', type: 'amount', readOnly: true, computed: true },
              { name: 'closingStockRawMaterial', ref: 'i', label: 'Closing Stock of Raw Material', type: 'amount', required: false },
              { name: 'closingStockWip', ref: 'ii', label: 'Closing Stock of Work-in-Progress', type: 'amount', required: false },
              { name: 'totalClosingStockMfg', ref: 'iii', label: 'Total Closing Stock', type: 'amount', readOnly: true, computed: true },
              { name: 'costOfGoodsProduced', ref: '3', label: 'Cost of Goods Produced → Trading Account (F–iii)', type: 'amount', readOnly: true, computed: true }
            ]
          },
          {
            id: 'trading_account',
            label: 'SECTION 5 — Part A-Trading Account',
            fields: [
              { name: 'saleOfGoods', ref: 'Ai', label: 'Sale of Goods (net of returns & duty)', type: 'amount', required: false },
              { name: 'saleOfServices', ref: 'Aii', label: 'Sale of Services', type: 'amount', required: false },
              { name: 'otherOperatingRevenues', ref: 'Aiii', label: 'Other Operating Revenues — Sl. 1–2 (Nature + Amount)', type: 'table', required: false, columns: ['Nature', 'Amount'] },
              { name: 'totalRevenueBusiness', ref: 'Aiv', label: 'Total Revenue from Business (Ai+Aii+Aiii)', type: 'amount', readOnly: true, computed: true },
              { name: 'grossReceiptsProfession', ref: 'B', label: 'Gross Receipts from Profession', type: 'amount', required: false },
              { name: 'unionExciseDutiesReceived', ref: 'Ci', label: 'Union Excise Duties received', type: 'amount', required: false },
              { name: 'serviceTaxReceived', ref: 'Cii', label: 'Service Tax received', type: 'amount', required: false },
              { name: 'vatSalesTaxReceived', ref: 'Ciii', label: 'VAT/Sales Tax received', type: 'amount', required: false },
              { name: 'cgstReceived', ref: 'Civ', label: 'CGST received', type: 'amount', required: false },
              { name: 'sgstReceived', ref: 'Cv', label: 'SGST received', type: 'amount', required: false },
              { name: 'igstReceived', ref: 'Cvi', label: 'IGST received', type: 'amount', required: false },
              { name: 'utgstReceived', ref: 'Cvii', label: 'UTGST received', type: 'amount', required: false },
              { name: 'anyOtherDutyTaxReceived', ref: 'Cviii', label: 'Any other duty/tax', type: 'amount', required: false },
              { name: 'totalTaxesDutiesReceived', ref: 'Cix', label: 'Total Taxes/Duties received', type: 'amount', readOnly: true, computed: true },
              { name: 'totalRevenueOperations', ref: '4D', label: 'Total Revenue from Operations (Aiv+B+Cix)', type: 'amount', readOnly: true, computed: true },
              { name: 'closingStockFinishedGoods', ref: '5', label: 'Closing Stock of Finished Goods', type: 'amount', required: false },
              { name: 'totalCreditsTrading', ref: '6', label: 'Total Credits to Trading Account (4D+5)', type: 'amount', readOnly: true, computed: true },
              { name: 'openingStockFinishedGoods', ref: '7', label: 'Opening Stock of Finished Goods', type: 'amount', required: false },
              { name: 'purchasesTrading', ref: '8', label: 'Purchases (net of refunds & duty)', type: 'amount', required: false },
              { name: 'carriageInwardTrading', ref: '9i', label: 'Carriage Inward', type: 'amount', required: false },
              { name: 'powerFuelTrading', ref: '9ii', label: 'Power and Fuel (Trading)', type: 'amount', required: false },
              { name: 'otherDirectExpensesTrading', ref: '9iii', label: 'Other Direct Expenses (Sl. 1–2, Nature + Amount)', type: 'table', required: false, columns: ['Nature', 'Amount'] },
              { name: 'totalDirectExpensesTrading', ref: '9', label: 'Total Direct Expenses', type: 'amount', readOnly: true, computed: true },
              { name: 'customDutyPaid', ref: '10i', label: 'Custom Duty', type: 'amount', required: false },
              { name: 'counterVailingDutyPaid', ref: '10ii', label: 'Counter Veiling Duty', type: 'amount', required: false },
              { name: 'specialAdditionalDutyPaid', ref: '10iii', label: 'Special Additional Duty', type: 'amount', required: false },
              { name: 'unionExciseDutyPaid', ref: '10iv', label: 'Union Excise Duty (paid)', type: 'amount', required: false },
              { name: 'serviceTaxPaid', ref: '10v', label: 'Service Tax (paid)', type: 'amount', required: false },
              { name: 'vatSalesTaxPaid', ref: '10vi', label: 'VAT/Sales Tax (paid)', type: 'amount', required: false },
              { name: 'cgstPaid', ref: '10vii', label: 'CGST (paid)', type: 'amount', required: false },
              { name: 'sgstPaid', ref: '10viii', label: 'SGST (paid)', type: 'amount', required: false },
              { name: 'igstPaid', ref: '10ix', label: 'IGST (paid)', type: 'amount', required: false },
              { name: 'utgstPaid', ref: '10x', label: 'UTGST (paid)', type: 'amount', required: false },
              { name: 'anyOtherTaxPaid', ref: '10xi', label: 'Any other tax paid', type: 'amount', required: false },
              { name: 'totalDutiesTaxesPaid', ref: '10xii', label: 'Total Duties & Taxes paid', type: 'amount', readOnly: true, computed: true },
              { name: 'costOfGoodsProducedFromMfg', ref: '11', label: 'Cost of Goods Produced (from Manufacturing Account)', type: 'amount', readOnly: true, computed: true },
              { name: 'grossProfit', ref: '12', label: 'Gross Profit → P&L (6–7–8–9–10xii–11)', type: 'amount', readOnly: true, computed: true },
              { name: 'turnoverIntradayTrading', ref: '12a', label: 'Turnover from Intraday Trading', type: 'amount', required: false },
              { name: 'incomeIntradayTrading', ref: '12b', label: 'Income from Intraday Trading → P&L', type: 'amount', required: false }
            ]
          },
          {
            id: 'pnl_credits',
            label: '6.1 Profit & Loss - Income / Credits side',
            fields: [
              { name: 'grossProfitPl', ref: '13', label: 'Gross Profit from Trading Account', type: 'amount', readOnly: true, computed: true },
              { name: 'otherIncomeRent', ref: '14i', label: 'Other Income — Rent', type: 'amount', required: false },
              { name: 'otherIncomeCommission', ref: '14ii', label: 'Other Income — Commission', type: 'amount', required: false },
              { name: 'otherIncomeDividend', ref: '14iii', label: 'Other Income — Dividend Income', type: 'amount', required: false },
              { name: 'otherIncomeInterest', ref: '14iv', label: 'Other Income — Interest Income', type: 'amount', required: false },
              { name: 'otherIncomeProfitSaleFixedAssets', ref: '14v', label: 'Other Income — Profit on sale of fixed assets', type: 'amount', required: false },
              { name: 'otherIncomeProfitSaleSttInvestments', ref: '14vi', label: 'Other Income — Profit on sale of STT investments', type: 'amount', required: false },
              { name: 'otherIncomeProfitSaleOtherInvestments', ref: '14vii', label: 'Other Income — Profit on sale of other investments', type: 'amount', required: false },
              { name: 'otherIncomeGainLossForex43AA', ref: '14viii', label: 'Other Income — Gain/Loss on forex fluctuation u/s 43AA', type: 'amount', required: false },
              { name: 'otherIncomeConversionInventoryCapital28via', ref: '14ix', label: 'Other Income — Profit on conversion of inventory to capital asset u/s 28(via)', type: 'amount', required: false },
              { name: 'otherIncomeAgriculture', ref: '14x', label: 'Other Income — Agriculture Income', type: 'amount', required: false },
              { name: 'otherIncomeLiabilitiesWrittenBack', ref: '14xia', label: 'Other Income — Liabilities written back (Sl. 1–3, Nature + Amount)', type: 'table', required: false, columns: ['Nature', 'Amount'] },
              { name: 'otherIncomeOtherIncomes', ref: '14xib', label: 'Other Income — Other incomes (not in turnover) (Sl. 1–3, Nature + Amount)', type: 'table', required: false, columns: ['Nature', 'Amount'] },
              { name: 'totalOtherIncome', ref: '14xii', label: 'Total Other Income', type: 'amount', readOnly: true, computed: true },
              { name: 'totalCreditsPl', ref: '15', label: 'Total Credits to P&L (13+14xii)', type: 'amount', readOnly: true, computed: true }
            ]
          },
          {
            id: 'pnl_debits_expenses',
            label: '6.2 Profit & Loss - Expenses / Debits side',
            fields: [
              { name: 'freightOutward', ref: '16', label: 'Freight Outward', type: 'amount', required: false },
              { name: 'consumptionStoresSpareParts', ref: '17', label: 'Consumption of Stores & Spare Parts', type: 'amount', required: false },
              { name: 'powerAndFuelPl', ref: '18', label: 'Power and Fuel', type: 'amount', required: false },
              { name: 'rentPl', ref: '19', label: 'Rent', type: 'amount', required: false },
              { name: 'repairsBuilding', ref: '20', label: 'Repairs to Building', type: 'amount', required: false },
              { name: 'repairsMachinery', ref: '21', label: 'Repairs to Machinery', type: 'amount', required: false },
              { name: 'salariesAndWagesPl', ref: '22i', label: 'Salaries and Wages', type: 'amount', required: false },
              { name: 'bonusPl', ref: '22ii', label: 'Bonus', type: 'amount', required: false },
              { name: 'reimbursementMedicalExpenses', ref: '22iii', label: 'Reimbursement of Medical Expenses', type: 'amount', required: false },
              { name: 'leaveEncashmentPl', ref: '22iv', label: 'Leave Encashment', type: 'amount', required: false },
              { name: 'leaveTravelBenefits', ref: '22v', label: 'Leave Travel Benefits', type: 'amount', required: false },
              { name: 'contributionApprovedSuperannuationFund', ref: '22vi', label: 'Contribution to Approved Superannuation Fund', type: 'amount', required: false },
              { name: 'contributionRecognisedPf', ref: '22vii', label: 'Contribution to Recognised PF', type: 'amount', required: false },
              { name: 'contributionRecognisedGratuityFund', ref: '22viii', label: 'Contribution to Recognised Gratuity Fund', type: 'amount', required: false },
              { name: 'contributionAnyOtherFund', ref: '22ix', label: 'Contribution to Any Other Fund', type: 'amount', required: false },
              { name: 'anyOtherBenefitEmployees', ref: '22x', label: 'Any Other Benefit to Employees', type: 'amount', required: false },
              { name: 'totalCompensationEmployees', ref: '22xi', label: 'Total Compensation to Employees (22i–22x)', type: 'amount', readOnly: true, computed: true },
              { name: 'isCompensationNonResidentsIncluded', ref: '22xii-a', label: 'Whether compensation to non-residents included?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'amountPaidNonResidents', ref: '22xii-b', label: 'Amount paid to non-residents', type: 'amount', required: 'conditional', condition: 'isCompensationNonResidentsIncluded === "Yes"' },
              { name: 'medicalInsurancePl', ref: '23i', label: 'Medical Insurance', type: 'amount', required: false },
              { name: 'lifeInsurancePl', ref: '23ii', label: 'Life Insurance', type: 'amount', required: false },
              { name: 'keymansInsurance', ref: '23iii', label: "Keyman's Insurance", type: 'amount', required: false },
              { name: 'otherInsurance', ref: '23iv', label: 'Other Insurance', type: 'amount', required: false },
              { name: 'totalInsurance', ref: '23v', label: 'Total Insurance', type: 'amount', readOnly: true, computed: true },
              { name: 'workmenStaffWelfareExpenses', ref: '24', label: 'Workmen and Staff Welfare Expenses', type: 'amount', required: false },
              { name: 'entertainmentPl', ref: '25', label: 'Entertainment', type: 'amount', required: false },
              { name: 'hospitalityPl', ref: '26', label: 'Hospitality', type: 'amount', required: false },
              { name: 'conferencePl', ref: '27', label: 'Conference', type: 'amount', required: false },
              { name: 'salesPromotion', ref: '28', label: 'Sales Promotion (excl. advertisement)', type: 'amount', required: false },
              { name: 'advertisementPl', ref: '29', label: 'Advertisement', type: 'amount', required: false },
              { name: 'commissionNonResident', ref: '30i', label: 'Commission — NR/Non-resident company', type: 'amount', required: false },
              { name: 'commissionOthers', ref: '30ii', label: 'Commission — Others', type: 'amount', required: false },
              { name: 'totalCommission', ref: '30iii', label: 'Total Commission', type: 'amount', readOnly: true, computed: true },
              { name: 'royaltyNonResident', ref: '31i', label: 'Royalty — NR/Non-resident company', type: 'amount', required: false },
              { name: 'royaltyOthers', ref: '31ii', label: 'Royalty — Others', type: 'amount', required: false },
              { name: 'totalRoyalty', ref: '31iii', label: 'Total Royalty', type: 'amount', readOnly: true, computed: true },
              { name: 'professionalTechServicesNr', ref: '32i', label: 'Professional/Consultancy/Tech Services — NR', type: 'amount', required: false },
              { name: 'professionalTechServicesOthers', ref: '32ii', label: 'Professional/Consultancy/Tech Services — Others', type: 'amount', required: false },
              { name: 'totalProfessionalFees', ref: '32iii', label: 'Total Professional Fees', type: 'amount', readOnly: true, computed: true },
              { name: 'hotelBoardingLodging', ref: '33', label: 'Hotel, Boarding and Lodging', type: 'amount', required: false },
              { name: 'travellingExpensesDomestic', ref: '34', label: 'Traveling Expenses (other than foreign)', type: 'amount', required: false },
              { name: 'foreignTravellingExpenses', ref: '35', label: 'Foreign Travelling Expenses', type: 'amount', required: false },
              { name: 'conveyanceExpenses', ref: '36', label: 'Conveyance Expenses', type: 'amount', required: false },
              { name: 'telephoneExpenses', ref: '37', label: 'Telephone Expenses', type: 'amount', required: false },
              { name: 'guestHouseExpenses', ref: '38', label: 'Guest House Expenses', type: 'amount', required: false },
              { name: 'clubExpenses', ref: '39', label: 'Club Expenses', type: 'amount', required: false },
              { name: 'festivalCelebrationExpenses', ref: '40', label: 'Festival Celebration Expenses', type: 'amount', required: false },
              { name: 'scholarshipPl', ref: '41', label: 'Scholarship', type: 'amount', required: false },
              { name: 'giftPl', ref: '42', label: 'Gift', type: 'amount', required: false },
              { name: 'donationPl', ref: '43', label: 'Donation', type: 'amount', required: false },
              { name: 'unionExciseDutyRatesTaxes', ref: '44i', label: 'Union Excise Duty (rates & taxes)', type: 'amount', required: false },
              { name: 'serviceTaxRatesTaxes', ref: '44ii', label: 'Service Tax (rates & taxes)', type: 'amount', required: false },
              { name: 'vatSalesTaxPl', ref: '44iii', label: 'VAT/Sales Tax', type: 'amount', required: false },
              { name: 'cessPl', ref: '44iv', label: 'Cess', type: 'amount', required: false },
              { name: 'cgstPl', ref: '44v', label: 'CGST', type: 'amount', required: false },
              { name: 'sgstPl', ref: '44vi', label: 'SGST', type: 'amount', required: false },
              { name: 'igstPl', ref: '44vii', label: 'IGST', type: 'amount', required: false },
              { name: 'utgstPl', ref: '44viii', label: 'UTGST', type: 'amount', required: false },
              { name: 'anyOtherRateTaxDutyCess', ref: '44ix', label: 'Any other rate/tax/duty/cess incl. STT/CTT', type: 'amount', required: false },
              { name: 'totalRatesTaxes', ref: '44x', label: 'Total Rates & Taxes', type: 'amount', readOnly: true, computed: true },
              { name: 'auditFee', ref: '45', label: 'Audit Fee', type: 'amount', required: false },
              { name: 'otherExpensesPl', ref: '46', label: 'Other Expenses (Sl. 1–4, Nature + Amount)', type: 'table', required: false, columns: ['Nature', 'Amount'] },
              { name: 'badDebtsWithPan', ref: '47i', label: 'Bad Debts — with PAN/Aadhaar ≥ ₹1 lakh (Sl. 1–7)', type: 'table', required: false, columns: ['Sl.No.', 'PAN/Aadhaar', 'Amount'] },
              { name: 'badDebtsWithoutPan', ref: '47ii', label: 'Bad Debts — without PAN/Aadhaar ≥ ₹1 lakh (Sl. 1–4)', type: 'table', required: false, columns: ['Name', 'Full Address (State Dropdown, Country Dropdown)', 'Amount'] },
              { name: 'badDebtsOthers', ref: '47iii', label: 'Bad Debts — Others < ₹1 lakh', type: 'amount', required: false },
              { name: 'totalBadDebts', ref: '47iv', label: 'Total Bad Debts (47i+47ii+47iii)', type: 'amount', readOnly: true, computed: true },
              { name: 'provisionBadDoubtfulDebts', ref: '48', label: 'Provision for Bad and Doubtful Debts', type: 'amount', required: false },
              { name: 'otherProvisionsPl', ref: '49', label: 'Other Provisions', type: 'amount', required: false },
              { name: 'profitBeforeInterestDeprTax', ref: '50', label: 'Profit before Interest, Depreciation & Taxes (Row 50)', type: 'amount', readOnly: true, computed: true },
              { name: 'interestPaidNr', ref: '51i', label: 'Interest — Paid to NR/Non-resident company', type: 'amount', required: false },
              { name: 'interestPaidOthers', ref: '51ii', label: 'Interest — To Others', type: 'amount', required: false },
              { name: 'totalInterestPl', ref: '51iii', label: 'Total Interest', type: 'amount', readOnly: true, computed: true },
              { name: 'depreciationAmortization', ref: '52', label: 'Depreciation and Amortization', type: 'amount', required: false },
              { name: 'netProfitBeforeTaxes', ref: '53', label: 'Net Profit before Taxes (50–51iii–52)', type: 'amount', readOnly: true, computed: true },
              { name: 'provisionCurrentTax', ref: '54', label: 'Provision for Current Tax', type: 'amount', required: false },
              { name: 'provisionDeferredTax', ref: '55', label: 'Provision for Deferred Tax', type: 'amount', required: false },
              { name: 'profitAfterTax', ref: '56', label: 'Profit after Tax (53–54–55)', type: 'amount', readOnly: true, computed: true },
              { name: 'balanceBfFromPreviousYear', ref: '57', label: 'Balance Brought Forward from Previous Year', type: 'amount', required: false }
            ]
          }
        ]
      },
      {
        id: 'business_profession_presumptive',
        label: 'Business / Profession Presumptive & Other Information',
        fieldSections: [
          {
            id: 'presumptive_income_entries',
            label: '6.3 Presumptive Income Entries — No Account Case',
            fields: [
              { name: 'grossReceipts44AD', ref: '61i', label: '61. Gross Receipts (44AD)', type: 'amount', required: 'conditional' },
              { name: 'netProfit44AD', ref: '61ii', label: '61. Net Profit or Loss (44AD)', type: 'amount', required: 'conditional' },
              { name: 'grossReceipts44ADA', ref: '62i', label: '62. Gross Receipts (44ADA — Professionals)', type: 'amount', required: 'conditional' },
              { name: 'netProfit44ADA', ref: '62ii', label: '62. Net Profit or Loss (44ADA)', type: 'amount', required: 'conditional' },
              { name: 'goodsCarriage44AETable', ref: '63', label: '63. Goods carriage (44AE Table Row)', type: 'table', required: 'conditional', columns: ['Owner', 'Vehicle No.', 'Months', 'Amount per vehicle'] },
              { name: 'netProfit44AE', ref: '63ii', label: '63. Net Profit (44AE)', type: 'amount', required: 'conditional' },
              { name: 'incomeShipping44B', ref: '64', label: '64. Income from shipping (44B)', type: 'amount', required: 'conditional' },
              { name: 'noAccountCaseTotalReceiptsExp', ref: '65i-iv', label: '65. No-account case: Total receipts, total expenses, net profit', type: 'amount', required: 'conditional' }
            ]
          },
          {
            id: 'part_a_oi',
            label: 'SECTION 7 — Part A-OI: Other Information',
            fields: [
              { name: 'methodOfAccounting', item: '1', label: 'Method of Accounting', type: 'dropdown', required: 'conditional', options: ['Mercantile', 'Cash'] },
              { name: 'changeInMethodAccounting', item: '2', label: 'Change in method of accounting?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'increaseProfitIcdsDeviations', item: '3a', label: 'Increase in profit due to ICDS deviations', type: 'amount', readOnly: true, computed: true },
              { name: 'decreaseProfitIcdsDeviations', item: '3b', label: 'Decrease in profit due to ICDS deviations', type: 'amount', readOnly: true, computed: true },
              { name: 'methodValuationRawMaterialStock', item: '4a', label: 'Method of valuation of Raw Material closing stock', type: 'dropdown', required: 'conditional', options: ['1-Cost or market rate', '2-At cost', '3-At market rate'] },
              { name: 'methodValuationFinishedGoodsStock', item: '4b', label: 'Method of valuation of Finished Goods closing stock', type: 'dropdown', required: 'conditional', options: ['1-Cost or market rate', '2-At cost', '3-At market rate'] },
              { name: 'changeStockValuationMethod', item: '4c', label: 'Change in stock valuation method?', type: 'dropdown', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'increaseProfitDeviation145A', item: '4d', label: 'Increase in profit due to deviation u/s 145A', type: 'amount', required: 'conditional' },
              { name: 'decreaseProfitDeviation145A', item: '4e', label: 'Decrease in profit due to deviation u/s 145A', type: 'amount', required: 'conditional' },
              { name: 'amountsNotCredited28', item: '5a', label: 'Amounts not credited — Items u/s 28', type: 'amount', required: false },
              { name: 'proformaCreditsGstRefunds', item: '5b', label: 'Proforma credits / GST refunds not credited', type: 'amount', required: false },
              { name: 'escalationClaimsAccepted', item: '5c', label: 'Escalation claims accepted', type: 'amount', required: false },
              { name: 'anyOtherItemIncomeOi', item: '5d', label: 'Any other item of income', type: 'amount', required: false },
              { name: 'capitalReceiptsOi', item: '5e', label: 'Capital receipts', type: 'amount', required: false },
              { name: 'totalSection5Oi', item: '5f', label: 'Total (5a+5b+5c+5d+5e)', type: 'amount', readOnly: true, computed: true },
              { name: 'disallowable36SubItems', item: '6a-6r', label: 'Disallowable u/s 36 (19 sub-items a–r)', type: 'amount_multiply_19', required: 'conditional' },
              { name: 'totalDisallowable36', item: '6s', label: 'Total disallowable u/s 36', type: 'amount', readOnly: true, computed: true },
              { name: 'disallowable37SubItems', item: '7a-7i', label: 'Disallowable u/s 37 (9 sub-items)', type: 'amount_multiply_9', required: false },
              { name: 'totalDisallowable37', item: '7j', label: 'Total disallowable u/s 37', type: 'amount', readOnly: true, computed: true },
              { name: 'disallowable40SubItems', item: '8Aa-8Ai', label: 'Disallowable u/s 40 (9 sub-items)', type: 'amount_multiply_9', required: false },
              { name: 'totalDisallowable40', item: '8Aj', label: 'Total disallowable u/s 40', type: 'amount', readOnly: true, computed: true },
              { name: 'amountDisallowed40PriorYearsNowAllowable', item: '8B', label: 'Amount disallowed u/s 40 in prior years but now allowable', type: 'amount', required: false },
              { name: 'disallowable40ASubItems', item: '9a-9e', label: 'Disallowable u/s 40A (5 sub-items)', type: 'amount_multiply_5', required: false },
              { name: 'totalDisallowable40A', item: '9f', label: 'Total disallowable u/s 40A', type: 'amount', readOnly: true, computed: true },
              { name: 'allowable43BPriorYearsSubItems', item: '10a-10h', label: 'Allowable u/s 43B in prior years (8 sub-items)', type: 'amount_multiply_8', required: false },
              { name: 'totalAllowable43B', item: '10i', label: 'Total allowable u/s 43B', type: 'amount', readOnly: true, computed: true },
              { name: 'disallowable43BSubItems', item: '11a-11h', label: 'Disallowable u/s 43B (8 sub-items)', type: 'amount_multiply_8', required: false },
              { name: 'totalDisallowable43B', item: '11i', label: 'Total disallowable u/s 43B', type: 'amount', readOnly: true, computed: true },
              { name: 'creditOutstandingTaxesSubItems', item: '12a-12h', label: 'Credit outstanding for taxes (8 sub-items: Excise/Service Tax/VAT/GST)', type: 'amount_multiply_8', required: false },
              { name: 'totalCreditOutstanding Taxes', item: '12i', label: 'Total credit outstanding', type: 'amount', readOnly: true, computed: true },
              { name: 'deemedProfits33AB_33ABA', item: '13a_13b', label: 'Deemed profits u/s 33AB / 33ABA', type: 'amount_multiply_2', required: false },
              { name: 'profitChargeable41', item: '14', label: 'Any amount of profit chargeable u/s 41', type: 'amount', required: false },
              { name: 'priorPeriodIncomeExpenditureNet', item: '15', label: 'Prior period income/expenditure (net)', type: 'amount', required: false },
              { name: 'expenditureDisallowed14A', item: '16', label: 'Expenditure disallowed u/s 14A', type: 'amount', required: false },
              { name: 'exercisingOption92CE2A', item: '17', label: 'Exercising option u/s 92CE(2A)?', type: 'dropdown', required: false, options: ['Yes', 'No'] }
            ]
          },
          {
            id: 'part_a_qd',
            label: 'SECTION 8 — Part A-QD: Quantitative Details (Audit only)',
            fields: [
              { name: 'tradingConcernTable', label: '8.1 Trading Concern', type: 'table', maxRows: 4, columns: ['Item Name (commodity type dropdown)', 'Unit of Measure (101-Gms to 999-Residual)', 'Opening Stock', 'Purchase during the Year', 'Sales during the Year', 'Closing Stock', 'Shortage / Excess'] },
              { name: 'mfgRawMaterialsTable', label: '8.2 Manufacturing — Raw Materials', type: 'table', maxRows: 4, columns: ['Item Name', 'Unit', 'Opening Stock', 'Purchase', 'Consumption', 'Sales', 'Closing Stock', 'Yield (Finished Products)', '% of Yield', 'Shortage/Excess'] },
              { name: 'mfgFinishedProductsTable', label: '8.3 Manufacturing — Finished Products/By-products', type: 'table', maxRows: 4, columns: ['Item Name', 'Unit', 'Opening Stock', 'Purchase', 'Qty Manufactured', 'Sales', 'Closing Stock', 'Shortage/Excess'] }
            ]
          }
        ]
      },
      {
        id: 'salary_house_property_schedules',
        label: 'Schedules Salary, House Property & BP Computation',
        fieldSections: [
          {
            id: 'schedule_s',
            label: 'SECTION 9 — Schedule S: Income from Salary (Up to 2 Employers)',
            fields: [
              { name: 'nameEmployer', label: 'Name of Employer', type: 'text', required: true },
              { name: 'natureEmployer', label: 'Nature of Employer', type: 'dropdown', required: true, options: ['Central Government', 'State Government', 'PSU', 'CG-Pensioners', 'SG-Pensioners', 'PSU-Pensioners', 'Others-Pensioners', 'Others'] },
              { name: 'tanEmployer', label: 'TAN of Employer', type: 'text', required: 'conditional', validation: { type: 'TAN' } },
              { name: 'addressEmployer', label: 'Address of Employer / Town / State / Pincode', type: 'text_dropdown_combo', required: true },
              { name: 'salary17_1_subTable', label: '1a. Salary u/s 17(1) — Sub-table (up to 3 rows)', type: 'table', required: true, columns: ['Nature (Basic / DA / HRA / LTA / Other Allowance / Any Other)', 'Description', 'Amount'] },
              { name: 'perquisites17_2_subTable', label: '1b. Perquisites u/s 17(2) — Sub-table (up to 3 rows)', type: 'table', required: false, columns: ['Nature (Accommodation / Cars / Gas-electricity-water / Gifts / Free meals / Club / ESOP / Stock options / NPS 17(2)(vii) / Other benefits)', 'Description', 'Amount'] },
              { name: 'profitInLieuSalary17_3_subTable', label: '1c. Profit in lieu of salary u/s 17(3) — Sub-table (up to 2 rows)', type: 'table', required: false, columns: ['Nature (Compensation on termination / Keyman / Before joining / Any other)', 'Description', 'Amount'] },
              { name: 'retirementBenefit89A_notified', label: '1d. Retirement benefit account — Notified Country u/s 89A (up to 3 rows)', type: 'table', required: false, columns: ['Country (USA / UK / Canada)', 'Amount'] },
              { name: 'retirementBenefit89A_nonNotified', label: '1e. Retirement benefit account — Non-Notified Country u/s 89A', type: 'amount', required: false },
              { name: 'incomeTaxableReliefClaimedEarlier', label: '1f. Income taxable this year on which 89A relief claimed earlier', type: 'amount', required: false },
              { name: 'grossSalaryPerEmployer', label: 'Gross Salary per employer (1a+1b+1c+1d+1e+1f)', type: 'amount', readOnly: true, computed: true },
              { name: 'totalGrossSalaryCombined', label: 'Total Gross Salary (all employers combined)', type: 'amount', readOnly: true, computed: true },
              { name: 'incomeRelief89A', label: '3a. Income for relief u/s 89A', type: 'amount', readOnly: true, computed: true },
              { name: 'allowancesExempt10', label: '3. Allowances exempt u/s 10 (up to 4 rows)', type: 'table', required: false, columns: ['Nature (Sec 10(5) LTA / 10(6) Embassy / 10(7) Foreign Allowance / 10(10)–10(19) / 10(26) / 10(26AAA) / 10(12C) Agniveer / Any Other)', 'Description', 'Amount'] },
              { name: 'hraSubForm', label: 'HRA u/s 10(13A) sub-form', type: 'sub_form', required: 'conditional', fields: ['Place of Work Dropdown (Metro/Non-metro)', 'HRA received', 'Rent paid', 'Salary', 'Eligible HRA'] },
              { name: 'netSalary', label: '4. Net Salary (2–3a–3)', type: 'amount', readOnly: true, computed: true },
              { name: 'standardDeduction16ia', label: '5a. Standard Deduction u/s 16(ia)', type: 'amount', readOnly: true, computed: true },
              { name: 'entertainmentAllowance16ii', label: '5b. Entertainment Allowance u/s 16(ii)', type: 'amount', required: false, notes: 'Government employees' },
              { name: 'professionalTax16iii', label: '5c. Professional Tax u/s 16(iii)', type: 'amount', required: false },
              { name: 'totalDeductions16', label: '5. Total Deductions u/s 16', type: 'amount', readOnly: true, computed: true },
              { name: 'incomeChargeableSalaries', label: '6. Income chargeable under Salaries (4–5)', type: 'amount', readOnly: true, computed: true }
            ]
          },
          {
            id: 'schedule_hp',
            label: 'SECTION 10 — Schedule HP: Income from House Property (Supports 2 properties)',
            fields: [
              { name: 'hpAddressOwnership', label: 'Property Address & Ownership sub-form', type: 'sub_form', fields: ['Address', 'Town', 'State Dropdown', 'Country Dropdown', 'PIN', 'ZIP', 'Owner type', 'Co-owned? Dropdown', '% share (up to 7 co-owner rows)'] },
              { name: 'tenantDetails', label: 'Tenant Details (up to 3 tenant rows)', type: 'table', columns: ['Name', 'PAN', 'Aadhaar', 'PAN/TAN for TDS'] },
              { name: 'typeOfHp', label: 'Type of HP', type: 'dropdown', required: true, options: ['Self-Occupied', 'Let Out', 'Deemed Let Out'] },
              { name: 'hpIncomeComputationFields', label: 'HP Income Computation (a to k)', type: 'group', fields: ['Gross rent', 'Unrealised rent', 'Local tax', 'Annual Value', '30%', 'Interest 24(b)', 'Total deduction', 'Arrears', 'Net HP income'] },
              { name: 'loanTable24b', label: 'Section 24(b) Loan Table (up to 4 rows per property)', type: 'table', columns: ['Loan source dropdown', 'Bank name', 'Account No.', 'Sanction date', 'Loan amount', 'Outstanding', 'Interest'] },
              { name: 'passThroughIncomeHp', label: 'Pass-Through Income from HP', type: 'amount', required: false, notes: 'From Schedule PTI' },
              { name: 'totalHpIncome', label: 'Total HP Income (Σ1k + 2)', type: 'amount', readOnly: true, computed: true }
            ]
          },
          {
            id: 'schedule_bp_core',
            label: 'SECTION 11 — Schedule BP: Computation of Income from Business / Profession',
            fields: [
              { name: 'bpNetProfitBeforeTaxPl', row: '1', label: 'Net Profit before tax from P&L (Item 53 or 61ii/62ii/63iii/64iii/65iv)', type: 'amount' },
              { name: 'bpSpeculativeBusinessProfitLoss', row: '2a', label: 'Net profit/loss from speculative business included in 1', type: 'amount' },
              { name: 'bpSpecifiedBusinessProfitLoss35AD', row: '2b', label: 'Net profit/loss from Specified Business u/s 35AD included in 1', type: 'amount' },
              { name: 'bpIncomeConsideredOtherHeads', row: '3a-3g', label: 'Income/receipts credited to P&L considered under other heads (Salary/HP/CG/OS/115BBF/115BBG/115BBH)', type: 'amount_group', notes: '3g net of Cost of Acquisition for VDA' },
              { name: 'bpProfitCoveredPresumptiveSections', row: '4a', label: 'Profit covered by 44AD/44ADA/44AE/44B/44BB/44BBA/44BBC/44DA (sub-rows per section)', type: 'amount_group' },
              { name: 'bpProfitActivitiesRules', row: '4b', label: 'Profit from activities under Rule 7/7A/7B(1)/7B(1A)/8 (5 sub-rows)', type: 'amount_group' },
              { name: 'bpExemptIncomeItems', row: '5a-5d', label: 'Exempt income (firm share / AOP share / other exempt items)', type: 'amount_group' },
              { name: 'bpBalanceRow6', row: '6', label: 'Balance (1–2a–2b–3–4a–4b–5d)', type: 'amount', readOnly: true, computed: true },
              { name: 'bpExpensesDebitedOtherHeads', row: '7a-7g', label: 'Expenses debited to P&L under other heads / 115BBF / 115BBG / 115BBH', type: 'amount_group' },
              { name: 'bpExpensesExemptIncomeDisallowed14A', row: '8a, 8b', label: 'Expenses for exempt income / disallowed u/s 14A', type: 'amount_group' },
              { name: 'bpTotalRow9', row: '9', label: 'Total (7+8a+8b)', type: 'amount', readOnly: true, computed: true },
              { name: 'bpAdjustedProfit', row: '10', label: 'Adjusted Profit (6+9)', type: 'amount', readOnly: true, computed: true },
              { name: 'bpDepreciationDebitedPl', row: '11', label: 'Depreciation debited to P&L', type: 'amount' },
              { name: 'bpDepreciationAllowableScheduleDep', row: '12i-12iii', label: 'Depreciation allowable (Schedule DEP + own computation)', type: 'amount', readOnly: true, computed: true },
              { name: 'bpProfitAfterDepreciationAdjustment', row: '13', label: 'Profit after depreciation adjustment', type: 'amount', readOnly: true, computed: true },
              { name: 'bpAdditionsDisallowableOI', row: '14-25', label: 'Additions (disallowable u/s 36/37/40/40A/43B + deemed income sections 41/32AD/33AB/33ABA/35ABA/35ABB/40A(3A)/72A/80HHD/80IA + 43CA + other items)', type: 'amount_group', readOnly: true, computed: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 3,
    label: 'Deductions',
    route: 'deductions',
    subsections: [
      {
        id: 'schedule_dep_scientific_research',
        label: 'Schedules Depreciation & Scientific Research',
        fieldSections: [
          {
            id: 'schedule_dep_fields',
            label: 'Schedule DEP / Fixed Assets Technical Calculations',
            fields: [
              { name: 'wdvFirstDayPy', row: '3a', label: 'Written Down Value on 1st day of PY', type: 'amount', notes: 'Per block input' },
              { name: 'wdvOldRateAssets', row: '3(b)', label: 'WDV of old-rate assets (50%/60%/80%)', type: 'amount' },
              { name: 'wdvAdjustment115Bac', row: '3a_adj', label: 'Adjustment for 115BAC option', type: 'amount' },
              { name: 'additionsMoreThan180Days', row: '4', label: 'Additions for ≥180 days in PY', type: 'amount' },
              { name: 'considerationRealizationRow3or4', row: '5', label: 'Consideration/realization (out of row 3 or 4)', type: 'amount' },
              { name: 'amountFullRateDepreciation', row: '6', label: 'Amount for full rate depreciation (3+4–5; min 0)', type: 'amount', readOnly: true, computed: true },
              { name: 'additionsLessThan180Days', row: '7', label: 'Additions for <180 days in PY', type: 'amount' },
              { name: 'considerationRealizationRow7', row: '8', label: 'Consideration/realization (out of row 7)', type: 'amount' },
              { name: 'amountHalfRateDepreciation', row: '9', label: 'Amount for half rate depreciation (7–8; min 0)', type: 'amount', readOnly: true, computed: true },
              { name: 'depreciationFullHalfRate', row: '10-11', label: 'Depreciation at full & half rate', type: 'amount', readOnly: true, computed: true },
              { name: 'additionalDepreciation', row: '12-14', label: 'Additional depreciation', type: 'amount' },
              { name: 'totalDepreciationDep', row: '15', label: 'Total Depreciation', type: 'amount', readOnly: true, computed: true },
              { name: 'depreciationDisallowed38_2', row: '16', label: 'Depreciation disallowed u/s 38(2)', type: 'amount' },
              { name: 'netAggregateDepreciation', row: '17', label: 'Net Aggregate Depreciation', type: 'amount', readOnly: true, computed: true },
              { name: 'expenditureTransferAssets', row: '19', label: 'Expenditure on transfer of assets', type: 'amount' },
              { name: 'capitalGainsLoss50', row: '20', label: 'Capital Gains/Loss u/s 50', type: 'amount', readOnly: true, computed: true },
              { name: 'wdvAtEndOfYear', row: '21', label: 'WDV at end of year', type: 'amount', readOnly: true, computed: true },
              { name: 'blockCeasesToExist', label: 'Block Ceases to Exist', type: 'dropdown', options: ['Y', 'N'], notes: 'Per block execution' }
            ]
          },
          {
            id: 'schedule_esr_fields',
            label: 'Schedule ESR — Scientific Research Deductions',
            fields: [
              { name: 'esr_35_1_i', label: '35(1)(i) Scientific research expenditures', type: 'amount_columns_combo', notes: 'Amount debited to P&L + Amount allowable' },
              { name: 'esr_35_1_ii', label: '35(1)(ii) Donation to research association', type: 'amount_columns_combo' },
              { name: 'esr_35_1_iia', label: '35(1)(iia) Scientific research entity development', type: 'amount_columns_combo' },
              { name: 'esr_35_1_iii', label: '35(1)(iii) Social science/statistical research', type: 'amount_columns_combo' },
              { name: 'esr_35_1_iv', label: '35(1)(iv) Plant/machinery for research', type: 'amount_columns_combo' },
              { name: 'esr_35_2AA', label: '35(2AA) National laboratory / university payment', type: 'amount_columns_combo' },
              { name: 'esr_35_2AB', label: '35(2AB) R&D expenditure company', type: 'amount_columns_combo' },
              { name: 'esr_35CCC', label: '35CCC Agricultural extension project', type: 'amount_columns_combo' },
              { name: 'esr_35CCD', label: '35CCD Skill development project', type: 'amount_columns_combo' },
              { name: 'totalEsrDeductions', label: 'Total ESR Deductions', type: 'amount', readOnly: true, computed: true }
            ]
          }
        ]
      },
      {
        id: 'chapter_via_and_10a',
        label: 'Schedule 10A & Chapter VI-A Deductions',
        fieldSections: [
          {
            id: 'section_10a_10aa_deductions',
            label: 'Section 10A/10AA/10B/10BA Deductions',
            fields: [
              { name: 'deduction10A', label: 'Deduction u/s 10A', type: 'amount', required: 'conditional' },
              { name: 'deduction10AA', label: 'Deduction u/s 10AA', type: 'amount', required: 'conditional', notes: 'Auto from Schedule 10AA' },
              { name: 'deduction10B', label: 'Deduction u/s 10B', type: 'amount', required: 'conditional' },
              { name: 'deduction10BA', label: 'Deduction u/s 10BA', type: 'amount', required: 'conditional' },
              { name: 'totalSection10Deductions', label: 'Total Deductions (10A+10AA+10B+10BA)', type: 'amount', readOnly: true, computed: true }
            ]
          },
          {
            id: 'chapter_via_deductions',
            label: 'Schedule VI-A: Chapter VI-A Deductions',
            fields: [
              { name: 'dedSec80C_LIC_PF', label: '80C Sub-table (Life insurance, PF, ELSS, tuition etc.)', type: 'formsubmodule', required: false },
              { name: 'dedSec80CCC_Pension', label: '80CCC (Payment to Pension Fund)', type: 'amount', required: false },
              { name: 'dedSec80CCD_1_NPS', label: '80CCD(1) NPS Contribution Employee', type: 'amount', required: false },
              { name: 'dedSec80CCD_1B_NPS', label: '80CCD(1B) Additional NPS', type: 'amount', required: false },
              { name: 'dedSec80CCD_2_NPS', label: '80CCD(2) Employer contribution to NPS', type: 'amount', required: false, notes: 'Allowed under both Regimes' },
              { name: 'dedSec80D_Health', label: '80D Health Insurance Premium', type: 'amount', required: false, notes: 'Linked to 80D wizard' },
              { name: 'dedSec80DD_DisabledDep', label: '80DD Maintenance of disabled dependent', type: 'amount', required: false },
              { name: 'dedSec80DDB_MedicalDisease', label: '80DDB Medical treatment — specified disease', type: 'amount', required: false },
              { name: 'dedSec80E_EducationLoan', label: '80E Interest on higher education loan', type: 'amount', required: false },
              { name: 'dedSec80EE_HomeLoan', label: '80EE Interest on home loan (residential HP)', type: 'amount', required: false },
              { name: 'dedSec80EEA_AffordableHome', label: '80EEA Interest on home loan (affordable housing)', type: 'amount', required: false },
              { name: 'dedSec80EEB_EVLoan', label: '80EEB Interest on EV loan', type: 'amount', required: false },
              { name: 'dedSec80G_Charitable', label: '80G Donations to charitable institutions', type: 'amount', required: false },
              { name: 'dedSec80GG_Rent', label: '80GG Rent paid (Form 10BA)', type: 'amount', required: false },
              { name: 'dedSec80GGA_Research', label: '80GGA Scientific research donations', type: 'amount', required: false },
              { name: 'dedSec80GGC_Political', label: '80GGC Political party contributions', type: 'amount', required: false },
              { name: 'dedSec80TTA_SavingsInt', label: '80TTA Interest on savings bank — non-senior citizens', type: 'amount', required: false, validation: { maxLimit: 10000 } },
              { name: 'dedSec80TTB_DepositsInt', label: '80TTB Interest on deposits — resident senior citizens', type: 'amount', required: false, validation: { maxLimit: 50000 } },
              { name: 'dedSec80U_SelfDisability', label: '80U Self disability deduction', type: 'amount', required: false },
              { name: 'dedSec80CCH_Agnipath', label: '80CCH Contribution to Agnipath Scheme', type: 'amount', required: false, notes: 'Allowed under both Regimes' },
              { name: 'totalChapterVIADeductions', label: 'Total Deductions u/s Chapter VI-A', type: 'amount', readOnly: true, computed: true }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 4,
    label: 'Taxes Paid',
    route: 'taxes',
    subsections: [
      {
        id: 'tax_payments_schedules',
        label: 'TDS, TCS & Advance Tax Paid',
        fieldSections: [
          {
            id: 'tds_non_salary_schedule',
            label: '17.2 TDS2 — Non-Salary TDS (Form 16A)',
            fields: [
              {
                name: 'tds2NonSalaryTable',
                label: 'TDS on Income other than Salary Table (Up to 4 rows)',
                type: 'table',
                maxRows: 4,
                columns: [
                  { name: 'slNo', label: 'Sl.No.' },
                  { name: 'tdsCredit', label: 'TDS Credit mapping', type: 'dropdown', options: ['Self', 'Spouse 5A', 'Other 37BA(2)'] },
                  { name: 'panAadhaarOtherPerson', label: 'PAN + Aadhaar of Other Person' },
                  { name: 'tanDeductor', label: 'TAN of Deductor' },
                  { name: 'sectionUnderTds', label: 'Section under TDS', type: 'dropdown' },
                  { name: 'fyTds', label: 'Financial Year of TDS', type: 'dropdown' },
                  { name: 'tdsBf', label: 'TDS b/f amount' },
                  { name: 'deductedOwnHands', label: 'Deducted own hands' },
                  { name: 'deductedSpouseOther', label: 'Deducted spouse/other' },
                  { name: 'claimedOwn', label: 'Claimed own return' },
                  { name: 'claimedSpouse', label: 'Claimed spouse' },
                  { name: 'grossAmount', label: 'Gross Amount' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 5,
    label: 'Filing',
    route: 'filing',
    subsections: [
      {
        id: 'bank_details_schedules',
        label: 'Bank Accounts, Foreign Income & Updated Returns',
        fieldSections: [
          {
            id: 'bank_account_inputs',
            label: '18.3 Bank Accounts Verification',
            fields: [
              { name: 'hasBankAccountInIndia', label: 'Bank Account in India?', type: 'dropdown', required: true, options: ['Yes', 'No'], notes: 'NR without Indian account may select No' },
              { name: 'totalAccountsCount', label: 'Total savings + current accounts (excl. dormant)', type: 'number', required: true },
              { name: 'primaryAccountTable', label: '(a) All accounts held — IFSC / Bank Name / Account No.', type: 'table', required: true, columns: ['IFSC', 'Bank Name', 'Account No.'], minRows: 1 },
              { name: 'secondaryAccountTable', label: '(b) Other accounts details', type: 'table', required: true, columns: ['IFSC', 'Bank', 'Account No.', 'Type (Dropdown: Savings/Current/Others)', 'Select for refund (Checkbox)'] },
              { name: 'foreignBankAccountSubTable', label: 'Foreign bank account for NR refund', type: 'table', required: 'conditional', columns: ['SWIFT Code', 'Bank Name', 'Country Dropdown', 'IBAN'], condition: 'hasBankAccountInIndia === "No"' },
              { name: 'foreignAssetsDeclarationRadio', label: 'Foreign assets declaration (res. 14)', type: 'radio', required: true, options: ['Yes', 'No'], notes: 'Resident only; triggers Schedule FA' },
              { name: 'trpDetails', label: 'Tax Return Preparer (TRP) Details', type: 'group', required: false, fields: ['TRP ID', 'TRP Name', 'Counter Signature', 'Reimbursement amount'] }
            ]
          },
          {
            id: 'schedule_esop_fields',
            label: 'SECTION 20 — Schedule ESop Information',
            fields: [
              { name: 'panEligibleStartupEmployer', label: 'PAN of Eligible Start-up Employer', type: 'text', required: true, validation: { type: 'PAN' } },
              { name: 'dpiitRegistrationNumber', label: 'DPIIT Registration Number', type: 'text', required: true },
              { name: 'assessmentYearRows', label: 'Assessment Year Rows (2021-22 to 2025-26)', type: 'auto', notes: '5 static template rows' },
              { name: 'amountTaxDeferredBf', label: 'Amount of Tax Deferred BF', type: 'amount', required: true, notes: 'User input for prior AYs' },
              { name: 'securitiesSoldDate', label: 'Securities sold — Date (Col 4i)', type: 'date', required: 'conditional' },
              { name: 'amountTaxAttributedSale', label: 'Amount of Tax Attributed to sale (Col 4ii)', type: 'amount', readOnly: true, computed: true, notes: 'Calculated from sub-table' },
              { name: 'ceasedToBeEmployee', label: 'Ceased to be employee? (Col 5)', type: 'radio', required: 'conditional', options: ['Yes', 'No'] },
              { name: 'dateOfCeasing', label: 'Date of Ceasing (Col 5i)', type: 'date', required: 'conditional', condition: 'ceasedToBeEmployee === "Yes"' },
              { name: 'expiry48MonthsDate', label: '48 months expiry — specify date (Col 6)', type: 'date', required: 'conditional' },
              { name: 'amountTaxPayableCurrentAY', label: 'Amount of tax payable in current AY (Col 7)', type: 'amount', readOnly: true, computed: true },
              { name: 'balanceTaxDeferredCf', label: 'Balance tax deferred c/f (Col 8 = Col 3 – Col 7)', type: 'amount', readOnly: true, computed: true },
              { name: 'saleEventsSubTable', label: 'Sub-table for sale events (up to 4 rows)', type: 'table', required: 'conditional', maxRows: 4, columns: ['AY', 'Date', 'Amount of Tax Attributed'] }
            ]
          },
          {
            id: 'updated_return_itru',
            label: 'SECTION 21 — Part A 139(8A) & Part B-ATI: Updated Return (ITR-U)',
            fields: [
              { name: 'itruPan', label: '(A1) PAN', type: 'text', required: true, readOnly: true },
              { name: 'itruName', label: '(A2) Name', type: 'text', required: true, readOnly: true },
              { name: 'itruAadhaarNumber', label: '(A3) Aadhaar Number', type: 'text', required: 'conditional' },
              { name: 'itruAadhaarEnrolmentId', label: '(A3a) Aadhaar Enrolment ID', type: 'text', required: 'conditional' },
              { name: 'itruAssessmentYear', label: '(A4) Assessment Year', type: 'dropdown', required: true, options: ['AY 2025-26', 'Prior AYs up to 48 months'] },
              { name: 'itruReturnPreviouslyFiled', label: '(A5) Return previously filed?', type: 'dropdown', required: true, options: ['Yes', 'No'] },
              { name: 'itruFiledUnderSection', label: '(A6) If Yes, filed u/s', type: 'dropdown', required: 'conditional' },
              { name: 'itruAckDetails', label: '(A7) ITR Type / Ack. No. / Date', type: 'dropdown_text_date_combo', required: 'conditional' },
              { name: 'itruEligibleUpdatedReturn', label: '(A8) Eligible for updated return?', type: 'dropdown', required: true, options: ['Yes', 'No'], notes: 'Per conditions in 1st–4th provisos' },
              { name: 'itruFormType', label: '(A9) ITR form', type: 'dropdown', required: true, defaultValue: 'ITR3', readOnly: true },
              { name: 'itruReasonsUpdating', label: '(A10) Reasons for updating (up to 2)', type: 'dropdown', required: true, multiple: true, notes: '7 reasons available' },
              { name: 'itruFilingPeriod', label: '(A11) Filing period', type: 'dropdown', required: true, options: ['Up to 12 months', '12–24 months', '24–36 months', '36–48 months'] },
              { name: 'itruReducingCflDepreciationCredit', label: '(A12) Reducing CFL/depreciation/tax credit?', type: 'radio', required: true, options: ['Yes', 'No'] },
              { name: 'itruAyRowsAffected', label: '(A12b) AY rows affected (2 rows)', type: 'table', required: 'conditional', columns: ['AY', 'Filed?'] }
            ]
          }
        ]
      }
    ]
  },
  {
    id: 6,
    label: 'Tax Summary',
    route: 'tax-summary',
    subsections: [
      {
        id: 'tax_computation_dashboard',
        label: 'Tax Summary Dashboard & Validation Metadata',
        fieldSections: [
          {
            id: 'amt_computation_fields',
            label: 'Schedule AMT — Alternate Minimum Tax Computations',
            fields: [
              { name: 'amtTotalIncomePartB', item: '1', label: 'Total Income from Part B-TI', type: 'amount', readOnly: true, computed: true },
              { name: 'amtDeductionChapterVia', item: '2a', label: 'Deduction claimed u/s Chapter VI-A (Part C)', type: 'amount', readOnly: true, computed: true },
              { name: 'amtDeduction10AA', item: '2b', label: 'Deduction claimed u/s 10AA', type: 'amount', readOnly: true, computed: true },
              { name: 'amtDeduction35AD', item: '2c', label: 'Deduction claimed u/s 35AD minus depreciation', type: 'amount', readOnly: true, computed: true },
              { name: 'amtTotalAdjustment', item: '2d', label: 'Total Adjustment', type: 'amount', readOnly: true, computed: true },
              { name: 'amtAdjustedTotalIncome', item: '3', label: 'Adjusted Total Income u/s 115JC(1) (1+2d)', type: 'amount', readOnly: true, computed: true },
              { name: 'amtFromIfscUnits', item: '3a', label: 'From IFSC units', type: 'amount', readOnly: true, computed: true },
              { name: 'amtFromOtherUnits', item: '3b', label: 'From other units (3–3a)', type: 'amount', readOnly: true, computed: true },
              { name: 'amtTaxCalculated', item: '4', label: 'AMT Tax (9% of 3a + 18.5% of 3b) if 3 > ₹20 lakh', type: 'amount', readOnly: true, computed: true }
            ]
          },
          {
            id: 'foreign_income_summary_fields',
            label: 'Schedules FSI & TR — Foreign Source Income Relief',
            fields: [
              { name: 'fsiCountryBlock', label: '16.9 Schedule FSI — Foreign Source Income (Residents, up to 4 countries)', type: 'table', columns: ['Country Code Dropdown', 'TIN', 'Salary Head Row', 'HP Head Row', 'Business or Profession Head Row', 'Capital Gains Head Row', 'Other Sources Head Row'], notes: 'Columns track: Income outside India / Tax paid outside / Tax payable in India / Tax Relief / DTAA Article' },
              { name: 'trTaxReliefSummary', label: '16.10 Schedule TR — Tax Relief Summary (Residents)', type: 'auto', notes: 'Aggregates values from individual country sheets' }
            ]
          }
        ]
      }
    ]
  }
];

export const individual3ConfigMapping = {};

itr3FieldConfig.forEach(step => {
  individual3ConfigMapping[step.route] = {};
  step.subsections.forEach(sub => {
    individual3ConfigMapping[step.route][sub.id] = {
      title: sub.label,
      sections: sub.fieldSections.map(fs => {
        const normalFields = [];
        const extraSections = [];
        fs.fields.forEach(f => {
          let fieldConfig = { ...f };

          if (fieldConfig.type) {
            fieldConfig.type = fieldConfig.type.toLowerCase();
          }

          if (fieldConfig.dependOn) {
            fieldConfig.conditionalOn = fieldConfig.dependOn;
            delete fieldConfig.dependOn;
          }

          if (typeof fieldConfig.condition === 'string') {
            const matchEq = fieldConfig.condition.match(/([a-zA-Z0-9_]+)\s*===\s*['"]([^'"]+)['"]/);
            if (matchEq) {
              fieldConfig.conditionalOn = {
                field: matchEq[1],
                value: matchEq[2]
              };
            }
          }

          if (fieldConfig.type === 'table' || fieldConfig.type === 'matrix') {
            extraSections.push({
              title: fieldConfig.label,
              description: fieldConfig.note || fieldConfig.notes,
              isList: true,
              listName: fieldConfig.name,
              fields: (fieldConfig.columns || []).map(col => {
                if (typeof col === 'string') {
                  return { name: col.replace(/[^a-zA-Z0-9]/g, ''), label: col, type: 'text', required: false };
                }
                return {
                  ...col,
                  type: col.type ? col.type.toLowerCase() : 'text',
                  required: false
                };
              })
            });
          } else if (fieldConfig.type === 'formprofile' || fieldConfig.type === 'formsubmodule' || fieldConfig.type === 'sub_form') {
            if (fieldConfig.fields) {
              extraSections.push({
                title: fieldConfig.label,
                description: fieldConfig.note || fieldConfig.notes,
                fields: fieldConfig.fields.map(sub => {
                  if (typeof sub === 'string') {
                    return { name: sub.replace(/[^a-zA-Z0-9]/g, ''), label: sub, type: 'text' };
                  }
                  return {
                    ...sub,
                    type: sub.type ? sub.type.toLowerCase() : 'text'
                  };
                })
              });
            } else {
              normalFields.push(fieldConfig);
            }
          } else {
            normalFields.push(fieldConfig);
          }
        });
        const sections = [];
        if (normalFields.length > 0) sections.push({ title: fs.label, fields: normalFields });
        return [...sections, ...extraSections];
      }).flat()
    };
  });
});

// Provide a fallback for efiling if requested by DynamicFilingStep
if (individual3ConfigMapping.filing && individual3ConfigMapping.filing['bank_details_schedules']) {
  individual3ConfigMapping.filing.efiling = individual3ConfigMapping.filing['bank_details_schedules'];
}

export default itr3FieldConfig;   