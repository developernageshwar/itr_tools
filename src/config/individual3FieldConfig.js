/**
 * itr3FieldConfig - ITR-3 UI Field Configuration Object
 * Assessment Year 2025–26
 * * Hierarchy Mapping: Main Section -> Subsection -> Field Section -> Fields[]
 */
const itr3FieldConfig = {
  // ==========================================
  // MAIN SECTION 1: PROFILE AND GENERAL INFO
  // ==========================================
  profileAndGeneralInfo: {
    label: "Part A: General Information & Disclosures",
    subsections: {
      personalAndIdentity: {
        label: "Personal Profile, Contact & Identity",
        fieldSections: {
          personalIdentity: {
            label: "Personal Identity",
            fields: [
              { name: "firstName", label: "First Name", type: "Text", required: true, validation: { pattern: "Alpha only", max: 75 } },
              { name: "middleName", label: "Middle Name", type: "Text", required: false, validation: { pattern: "Alpha only" } },
              { name: "lastName", label: "Last Name", type: "Text", required: true, validation: { pattern: "Alpha only" } },
              { name: "pan", label: "PAN", type: "Text", required: true, validation: { pattern: "AAAAA0000A", length: 10 } },
              { name: "status", label: "Status", type: "Dropdown", required: true, options: [{ value: "I", label: "Individual" }, { value: "H", label: "HUF" }] },
              { name: "dob", label: "Date of Birth / Formation", type: "Date", required: true, notes: "DOB for Individual, Formation date for HUF" },
              { name: "dateOfCommencementBusiness", label: "Date of Commencement of Business", type: "Date", required: true, notes: "ITR-3 Specific field" },
              { name: "aadhaarNumber", label: "Aadhaar Number", type: "Text", required: "Conditional", validation: { length: 12 }, notes: "Individual only; required if allotted" },
              { name: "aadhaarEnrolmentId", label: "Aadhaar Enrolment ID", type: "Text", required: "Conditional", validation: { length: 28 }, notes: "Required if Aadhaar not allotted" },
              { name: "passportNumber", label: "Passport Number", type: "Text", required: false, notes: "Individual only" },
              { name: "isFpi", label: "Whether FPI?", type: "Dropdown", required: false, options: ["Yes", "No"] },
              { name: "sebiRegistrationNumber", label: "SEBI Registration Number", type: "Text", required: "Conditional", visibilityTrigger: { field: "isFpi", value: "Yes" } }
            ]
          },
          addressDetails: {
            label: "1.2 Address Configurations (Primary & Secondary)",
            fields: [
              { name: "flatDoorBlockNo", label: "Flat / Door / Block No.", type: "Text", required: true },
              { name: "buildingPremisesName", label: "Name of Premises / Building / Village", type: "Text", required: false },
              { name: "roadStreetPostOffice", label: "Road / Street / Post Office", type: "Text", required: false },
              { name: "areaLocality", label: "Area / Locality", type: "Text", required: false },
              { name: "townCityDistrict", label: "Town / City / District", type: "Text", required: true },
              { name: "state", label: "State", type: "Dropdown", required: true, notes: "Includes 37 states/UTs + Foreign" },
              { name: "country", label: "Country / Region", type: "Dropdown", required: true, defaultValue: "91-INDIA" },
              { name: "pinCode", label: "PIN Code", type: "Text", required: "Conditional", validation: { length: 6 }, notes: "Mandatory for Indian addresses" },
              { name: "noZipCode", label: "No ZIP Code", type: "Checkbox", required: false, notes: "Tick for foreign addresses without ZIP" },
              { name: "zipCode", label: "ZIP Code", type: "Text", required: "Conditional", notes: "Foreign addresses" },
              { name: "isSecondaryAddressSame", label: "Is the secondary address same as primary address?", type: "Dropdown", required: true, options: ["Yes", "No"], notes: "If Yes, collapse secondary block" }
            ]
          },
          contactDetails: {
            label: "1.3 Contact Metadata",
            fields: [
              { name: "emailPrimary", label: "Email Address 1 (Self)", type: "Email", required: true },
              { name: "emailSecondary", label: "Email Address 2", type: "Email", required: false },
              { name: "mobilePrimary", label: "Mobile No. 1", type: "Tel", required: true },
              { name: "stdIsdCode", label: "STD/ISD Code", type: "Text", required: false },
              { name: "phoneOfficeResidence", label: "Residential/Office Phone Number", type: "Tel", required: false },
              { name: "mobileSecondary", label: "Mobile No. 2", type: "Tel", required: false }
            ]
          },
          residentialStatus: {
            label: "Residential Status & Jurisdictions",
            fields: [
              { name: "residentialStatus", label: "Residential Status in India", type: "Dropdown", required: true, options: ["RES - Resident", "NRI - Non Resident", "NOR - Resident but not Ordinarily Resident"] },
              { name: "residentialConditions", label: "Conditions for Residential Status", type: "Dropdown", required: "Conditional", options: ["182-day rule", "60-day rule", "Citizen 120-day rule", "6(1A) 15-lakh rule", "NOR conditions", "NRI conditions"] },
              { name: "jurisdictionOfResidence", label: "Jurisdiction of Residence Grid", type: "Table", required: "Conditional", maxRows: 2, columns: ["Country Dropdown", "TIN Text"] },
              { name: "totalStayPreviousYear", label: "Total period of stay in India during previous year (days)", type: "Number", required: "Conditional" },
              { name: "totalStayPrecedingFourYears", label: "Total period of stay in India during 4 preceding years (days)", type: "Number", required: "Conditional" },
              { name: "hasPeInIndia", label: "In case of non-resident: permanent establishment (PE) in India?", type: "Radio", required: "Conditional", notes: "NR only" },
              { name: "claimBenefit115H", label: "Do you want to claim benefit u/s 115H (Resident)?", type: "Radio", required: false },
              { name: "hasSepInIndia", label: "Significant Economic Presence (SEP) in India?", type: "Dropdown", required: "Conditional", notes: "NR only" },
              { name: "sepAggregatePayments", label: "SEP — Aggregate of payments during PY", type: "Amount", required: "Conditional", visibilityTrigger: { field: "hasSepInIndia", value: "Yes" } },
              { name: "sepUserCount", label: "SEP — Number of users in India", type: "Number", required: "Conditional", visibilityTrigger: { field: "hasSepInIndia", value: "Yes" } },
              { name: "hasIfscUnitForeignEx", label: "Unit in IFSC deriving income in foreign exchange?", type: "Dropdown", required: false, options: ["Yes", "No"] }
            ]
          }
        }
      },
      filingAndRegimeCompliance: {
        label: "Filing Framework, 115BAC Regime Decision & Audits",
        fieldSections: {
          taxRegime115BAC: {
            label: "1.5 Tax Regime Configuration Tree (Section 115BAC)",
            fields: [
              { name: "optedNewRegimeEarlier", label: "Have you ever opted for New Tax Regime in earlier years?", type: "Radio", required: true },
              { name: "assessmentYearExercised", label: "Assessment Year in which option was exercised", type: "Dropdown", required: "Conditional" },
              { name: "dateFilingForm10IE", label: "Date of filing Form 10IE", type: "Date", required: "Conditional" },
              { name: "ackNumberForm10IE", label: "Acknowledgement number of Form 10IE", type: "Text", required: "Conditional" },
              { name: "optedOutEarlier", label: "Have you ever opted OUT in earlier years?", type: "Dropdown", required: "Conditional", options: ["Yes", "No"] },
              { name: "assessmentYearOptedOut", label: "AY in which opted out", type: "Dropdown", required: "Conditional" },
              { name: "dateFilingForm10IEOptOut", label: "Date of filing Form 10IE (opt-out)", type: "Date", required: "Conditional" },
              { name: "ackNumberForm10IEOptOut", label: "Acknowledgement number (opt-out)", type: "Text", required: "Conditional" },
              { name: "optionCurrentAY", label: "Option for current AY", type: "Dropdown", required: true, options: ["Opting in now", "Continue to opt", "Opt out", "Not opting", "Not eligible"] },
              { name: "dateFilingForm10IECurrent", label: "Date of filing Form 10IE (current AY)", type: "Date", required: "Conditional" },
              { name: "ackNumberForm10IECurrent", label: "Acknowledgement number (current AY)", type: "Text", required: "Conditional" },
              { name: "optOut115BAC6", label: "Have you exercised option u/s 115BAC(6) to opt out?", type: "Dropdown", required: true, options: ["No", "Yes within due date", "Yes but beyond due date"] },
              { name: "dateFilingForm10IEA", label: "Date of filing Form 10-IEA", type: "Date", required: "Conditional" },
              { name: "ackNumberForm10IEA", label: "Acknowledgement number of Form 10-IEA", type: "Text", required: "Conditional" },
              { name: "methodOfOptingOut", label: "Method of opting out", type: "Dropdown", required: "Conditional", options: ["By filing 10IEA (having BP income)", "By exercising option in return (Form 10IEA not applicable)"] },
              { name: "filed10IEAAy2425", label: "10IEA filed in AY 2024-25?", type: "Dropdown", required: "Conditional", options: ["Yes", "No"] },
              { name: "subPathA_continueOptOut", label: "Sub-path (a)(i): Continue to opt out for current AY?", type: "Dropdown", required: "Conditional" },
              { name: "subPathA_date10IEA", label: "Sub-path (a) — Date of Form 10-IEA for AY 2025-26", type: "Date", required: "Conditional" },
              { name: "subPathA_ack10IEA", label: "Sub-path (a) — Ack. no. of Form 10-IEA for AY 2025-26", type: "Text", required: "Conditional" },
              { name: "subPathB_optOutCurrent", label: "Sub-path (b)(i): Opt out for current AY?", type: "Dropdown", required: "Conditional" },
              { name: "subPathB_date10IEA", label: "Sub-path (b) — Date of Form 10-IEA for AY 2025-26", type: "Date", required: "Conditional" },
              { name: "subPathB_ack10IEA", label: "Sub-path (b) — Ack. no. of Form 10-IEA for AY 2025-26", type: "Text", required: "Conditional" },
              { name: "subPathC_optOutCurrentNon10IEA", label: "Sub-path (c)(i): Opt out for current AY? (non-10IEA filers)", type: "Dropdown", required: "Conditional" },
              { name: "subPathC_date10IEA", label: "Sub-path (c) — Date of Form 10-IEA for AY 2025-26", type: "Date", required: "Conditional" },
              { name: "subPathC_ack10IEA", label: "Sub-path (c) — Ack. no. of Form 10-IEA for AY 2025-26", type: "Text", required: "Conditional" }
            ]
          },
          filingMetadata: {
            label: "1.6 Return Section Classification & Notices",
            fields: [
              { name: "filedSection", label: "Filed u/s (Section)", type: "Dropdown", required: true, options: ["139(1)", "139(4)", "139(5)", "92CD", "119(2)(b)", "139(8A)", "139(9)", "142(1)", "148", "153A", "153C"] },
              { name: "filedInResponseToNotice", label: "Filed in response to notice u/s", type: "Dropdown", required: "Conditional", options: ["139(9)", "142(1)", "148", "153C", "153A"] },
              { name: "revisedDefectiveReceiptNo", label: "If revised/defective — Receipt No.", type: "Text", required: "Conditional" },
              { name: "dateFilingOriginalReturn", label: "Date of filing of Original Return", type: "Date", required: "Conditional" },
              { name: "dinNoticeNumber", label: "Unique Number / DIN (for notice)", type: "Text", required: "Conditional" },
              { name: "dateOfNoticeOrder", label: "Date of Notice / Order", type: "Date", required: "Conditional" },
              { name: "dueDateFiling", label: "Due Date for filing return", type: "Date", required: true, autoCalculated: true }
            ]
          },
          seventhProviso: {
            label: "1.7 Seventh Proviso to Section 139(1) Thresholds",
            fields: [
              { name: "filingUnderSeventhProviso", label: "Filing under Seventh Proviso?", type: "Radio", required: true },
              { name: "depositedAmountCurrentAcc", label: "Deposited > ₹1 Crore in current account(s)?", type: "Radio", required: "Conditional" },
              { name: "spentForeignTravel", label: "Incurred > ₹2 lakh on foreign travel?", type: "Radio", required: "Conditional" },
              { name: "spentElectricity", label: "Incurred > ₹1 lakh on electricity?", type: "Radio", required: "Conditional" },
              { name: "salesTurnoverExceeds60Lakh", label: "Sales/turnover > ₹60 lakh?", type: "Radio", required: "Conditional" },
              { name: "professionReceiptsExceeds10Lakh", label: "Gross receipts in profession > ₹10 lakh?", type: "Radio", required: "Conditional" },
              { name: "tdsTcsThreshold", label: "TDS+TCS ≥ ₹25,000 (or ₹50,000 for senior citizen)?", type: "Radio", required: "Conditional" },
              { name: "savingsBankDepositsThreshold", label: "Savings bank deposits ≥ ₹50 lakh?", type: "Radio", required: "Conditional" }
            ]
          },
          representativeAssessee: {
            label: "1.8 Representative Assessee Sub-Form",
            fields: [
              { name: "isRepresentativeAssessee", label: "Filed by representative assessee?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "nameOfRepresentative", label: "Name of Representative", type: "Text", required: "Conditional" },
              { name: "capacityOfRepresentative", label: "Capacity of Representative", type: "Dropdown", required: "Conditional", options: ["Legal Heir", "Manager", "Guardian", "Other"] },
              { name: "addressOfRepresentative", label: "Address of Representative", type: "Text", required: "Conditional" },
              { name: "panOfRepresentative", label: "PAN of Representative", type: "Text", required: "Conditional", validation: { pattern: "PAN" } },
              { name: "aadhaarOfRepresentative", label: "Aadhaar Number of Representative", type: "Text", required: "Conditional" }
            ]
          },
          specialDisclosures: {
            label: "1.9 Corporate & Investment Tables (Director, Partner, Unlisted Equity)",
            fields: [
              { name: "isDirector", label: "Director in a Company?", type: "Radio", required: false },
              { name: "directorTable", label: "Director Metadata Layout Grid", type: "Table", maxRows: 3, columns: ["Name", "Type", "PAN", "Listed-Unlisted", "DIN"], required: "Conditional" },
              { name: "isPartner", label: "Partner in a Firm?", type: "Dropdown", required: false },
              { name: "partnerTable", label: "Partnership Details Grid", type: "Table", maxRows: 2, columns: ["Name of Firm", "PAN"], required: "Conditional" },
              { name: "heldUnlistedEquity", label: "Held Unlisted Equity Shares?", type: "Dropdown", required: false },
              { name: "unlistedEquityTable", label: "Unlisted Equity Transaction Tracking Grid", type: "Table", maxRows: 3, columns: ["Company", "Type", "PAN", "Opening Balance Shares", "Opening Balance Cost", "Acquisition Date", "Acquisition Face Value", "Acquisition Issue Price", "Acquisition Purchase Price", "Transfer Shares", "Transfer Consideration", "Closing Balance Shares", "Closing Balance Cost"], required: "Conditional" }
            ]
          },
          statutoryBenefits: {
            label: "1.10 Section 115H, Portuguese Civil Code, LEI",
            fields: [
              { name: "governedPortugueseCivilCode", label: "Governed by Portuguese Civil Code (Sec 5A)?", type: "Dropdown", required: true, options: ["Yes", "No"], notes: "If Yes, Schedule 5A becomes mandatory" },
              { name: "leiNumber", label: "LEI Number", type: "Text", required: "Conditional", notes: "Mandatory if refund ≥ ₹50 Crore" },
              { name: "leiValidUptoDate", label: "LEI Valid Upto Date", type: "Date", required: "Conditional" }
            ]
          },
          auditInformation: {
            label: "1.11 Audit Core Information Rules (ITR-3 Specific Matrix)",
            fields: [
              { name: "liableMaintainAccounts44AA", label: "a1. Liable to maintain accounts u/s 44AA?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "declaringIncomePresumptiveOnly", label: "a2. Declaring income only u/s 44AE/44B/44BB/44AD/44ADA/44BBA?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "turnoverBetween1Cr10Cr", label: "a2i. If No at a2 — Total sales/turnover between ₹1 Cr and ₹10 Cr?", type: "Dropdown", required: "Conditional", options: ["Yes", "No"] },
              { name: "cashReceiptsThreshold", label: "a2ii. If Yes at a2i — Cash receipts ≤ 5% of total receipts?", type: "Radio", required: "Conditional" },
              { name: "cashPaymentsThreshold", label: "a2iii. If Yes at a2i — Cash payments ≤ 5% of total payments?", type: "Radio", required: "Conditional" },
              { name: "liableAudit44AB", label: "b. Liable for audit u/s 44AB?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "auditConditionsMultiSelect", label: "Which condition? (44AB Multi-select)", type: "CheckboxGroup", required: "Conditional", options: ["44AD", "44ADA", "44AE", "44BB"] },
              { name: "accountsAuditedByAccountant", label: "c. If b = Yes — Accounts audited by accountant?", type: "Radio", required: "Conditional" },
              { name: "dateFurnishingAuditReport", label: "c-a. Date of furnishing audit report", type: "Date", required: "AuditOnly" },
              { name: "nameAuditorSigning", label: "c-b. Name of auditor signing tax audit report", type: "Text", required: "AuditOnly" },
              { name: "membershipNoAuditor", label: "c-c. Membership No. of auditor", type: "Text", required: "AuditOnly" },
              { name: "nameAuditFirm", label: "c-d. Name of audit firm (proprietorship/firm)", type: "Text", required: "AuditOnly" },
              { name: "firmRegistrationNumber", label: "c-e. Proprietorship/Firm Registration Number", type: "Text", required: "AuditOnly" },
              { name: "panAuditFirm", label: "c-f. PAN of proprietorship/firm", type: "Text", required: "AuditOnly", validation: { pattern: "PAN" } },
              { name: "aadhaarProprietorship", label: "c-g. Aadhaar of proprietorship", type: "Text", required: "Conditional" },
              { name: "dateAuditReport", label: "c-h. Date of audit report", type: "Date", required: "AuditOnly" },
              { name: "ackNumberAuditReport", label: "c-i. Acknowledgement number of audit report", type: "Text", required: "AuditOnly" },
              { name: "udin", label: "c-j. UDIN", type: "Text", required: "AuditOnly", validation: { length: 18 } },
              { name: "liableAudit92E", label: "d(i). Liable for audit u/s 92E?", type: "Dropdown", required: false, options: ["Yes", "No"], notes: "Transfer Pricing Trigger" },
              { name: "accountsAudited92E", label: "d(ii). If d(i) = Yes — Accounts audited u/s 92E?", type: "Dropdown", required: "Conditional", options: ["Yes", "No"] }
            ]
          }
        }
      }
    }
  },

  // ==========================================
  // MAIN SECTION 2: BUSINESS ACCOUNTS AND SCHEDULES
  // ==========================================
  businessAccountsAndSchedules: {
    label: "Part A: Business Nature, Balance Sheet, Manufacturing, Trading & P&L",
    subsections: {
      natureOfBusiness: {
        label: "Section 2: Nature of Business Matrix",
        fieldSections: {
          businessClassification: {
            label: "Activity Registry (Up to 3 Entries)",
            fields: [
              { name: "businessSerialNo", label: "Sl. No.", type: "Auto", required: true, autoCalculated: true },
              { name: "businessCode", label: "Code", type: "Dropdown", required: true, notes: "100+ industrial codes options" },
              { name: "tradeNameProprietorship", label: "Trade Name of Proprietorship", type: "Text", required: false },
              { name: "businessDescription", label: "Description", type: "Text", required: true, autoCalculated: true }
            ]
          }
        }
      },
      balanceSheet: {
        label: "Section 3: Part A-BS (Balance Sheet Accounts)",
        fieldSections: {
          sourcesOfFunds: {
            label: "3.1 Sources of Funds Grid",
            fields: [
              { name: "proprietorsCapital", ref: "a", label: "Proprietor's Capital", type: "Amount", required: false },
              { name: "revaluationReserve", ref: "bi", label: "Revaluation Reserve", type: "Amount", required: false },
              { name: "capitalReserve", ref: "bii", label: "Capital Reserve", type: "Amount", required: false },
              { name: "statutoryReserve", ref: "biii", label: "Statutory Reserve", type: "Amount", required: false },
              { name: "anyOtherReserve", ref: "biv", label: "Any Other Reserve", type: "Amount", required: false },
              { name: "totalReserves", ref: "bv", label: "Total Reserves (bi+bii+biii+biv)", type: "Amount", required: true, autoCalculated: true },
              { name: "totalProprietorsFund", ref: "1c", label: "Total Proprietor's Fund (a+bv)", type: "Amount", required: true, autoCalculated: true },
              { name: "foreignCurrencyLoansSecured", ref: "ai", label: "Foreign Currency Loans (Secured)", type: "Amount", required: false },
              { name: "rupeeLoansBanks", ref: "iiA", label: "Rupee Loans — From Banks", type: "Amount", required: false },
              { name: "rupeeLoansOthers", ref: "iiB", label: "Rupee Loans — From Others", type: "Amount", required: false },
              { name: "totalRupeeLoans", ref: "iiC", label: "Total Rupee Loans (iiA+iiB)", type: "Amount", required: true, autoCalculated: true },
              { name: "totalSecuredLoans", ref: "aiii", label: "Total Secured Loans (ai+iiC)", type: "Amount", required: true, autoCalculated: true },
              { name: "unsecuredLoansBanks", ref: "bi", label: "Unsecured Loans from Banks", type: "Amount", required: false },
              { name: "unsecuredLoansOthers", ref: "bii", label: "Unsecured Loans from Others", type: "Amount", required: false },
              { name: "totalUnsecuredLoans", ref: "biii", label: "Total Unsecured Loans", type: "Amount", required: true, autoCalculated: true },
              { name: "totalLoanFunds", ref: "2c", label: "Total Loan Funds (aiii+biii)", type: "Amount", required: true, autoCalculated: true },
              { name: "deferredTaxLiability", ref: "3", label: "Deferred Tax Liability", type: "Amount", required: false },
              { name: "advancesPersons40A2b", ref: "4i", label: "Advances from Persons u/s 40A(2)(b)", type: "Amount", required: false },
              { name: "advancesOthers", ref: "4ii", label: "Advances from Others", type: "Amount", required: false },
              { name: "totalAdvances", ref: "4iii", label: "Total Advances (i+ii)", type: "Amount", required: true, autoCalculated: true },
              { name: "totalSources", ref: "5", label: "TOTAL SOURCES (1c+2c+3+4iii)", type: "Amount", required: true, autoCalculated: true }
            ]
          },
          applicationOfFunds: {
            label: "3.2 Application of Funds Grid & No-Account Provisions",
            fields: [
              { name: "grossBlockFixedAssets", ref: "1a", label: "Gross Block of Fixed Assets", type: "Amount", required: false },
              { name: "depreciationBS", ref: "1b", label: "Depreciation", type: "Amount", required: false },
              { name: "netBlock", ref: "1c", label: "Net Block (1a–1b)", type: "Amount", required: true, autoCalculated: true },
              { name: "capitalWorkInProgress", ref: "1d", label: "Capital Work-in-Progress", type: "Amount", required: false },
              { name: "totalFixedAssets", ref: "1e", label: "Total Fixed Assets (1c+1d)", type: "Amount", required: true, autoCalculated: true },
              { name: "longTermInvestmentsQuoted", ref: "ai", label: "Long-term Investments — Govt & Other Securities (Quoted)", type: "Amount", required: false },
              { name: "longTermInvestmentsUnquoted", ref: "aii", label: "Long-term Investments — Govt & Other Securities (Unquoted)", type: "Amount", required: false },
              { name: "totalLongTermInvestments", ref: "aiii", label: "Total Long-term Investments", type: "Amount", required: true, autoCalculated: true },
              { name: "shortTermEquityShares", ref: "bi", label: "Short-term — Equity Shares incl. share application money", type: "Amount", required: false },
              { name: "shortTermPreferenceShares", ref: "bii", label: "Short-term — Preference Shares", type: "Amount", required: false },
              { name: "shortTermDebentures", ref: "biii", label: "Short-term — Debentures", type: "Amount", required: false },
              { name: "totalShortTermInvestments", ref: "biv", label: "Total Short-term Investments", type: "Amount", required: true, autoCalculated: true },
              { name: "totalInvestments", ref: "2c", label: "Total Investments (aiii+biv)", type: "Amount", required: true, autoCalculated: true },
              { name: "inventoriesConsumables", ref: "iA", label: "Inventories — Stores/Consumables", type: "Amount", required: false },
              { name: "inventoriesRawMaterials", ref: "iB", label: "Inventories — Raw Materials", type: "Amount", required: false },
              { name: "inventoriesStockInProcess", ref: "iC", label: "Inventories — Stock-in-Process", type: "Amount", required: false },
              { name: "inventoriesFinishedTradedGoods", ref: "iD", label: "Inventories — Finished/Traded Goods", type: "Amount", required: false },
              { name: "totalInventories", ref: "iE", label: "Total Inventories", type: "Amount", required: true, autoCalculated: true },
              { name: "sundryDebtors", ref: "aii", label: "Sundry Debtors", type: "Amount", required: false },
              { name: "cashInHand", ref: "iiiA", label: "Cash-in-Hand", type: "Amount", required: false },
              { name: "balanceWithBank", ref: "iiiB", label: "Balance with Bank", type: "Amount", required: false },
              { name: "totalCashBank", ref: "iiiC", label: "Total Cash & Bank", type: "Amount", required: true, autoCalculated: true },
              { name: "otherCurrentAssets", ref: "aiv", label: "Other Current Assets", type: "Amount", required: false },
              { name: "totalCurrentAssets", ref: "av", label: "Total Current Assets", type: "Amount", required: true, autoCalculated: true },
              { name: "advancesRecoverableCashKind", ref: "bi", label: "Advances recoverable in cash or kind", type: "Amount", required: false },
              { name: "depositsLoansAdvancesCorporates", ref: "bii", label: "Deposits, loans & advances to corporates etc.", type: "Amount", required: false },
              { name: "balanceRevenueAuthorities", ref: "biii", label: "Balance with Revenue Authorities", type: "Amount", required: false },
              { name: "totalLoansAdvances", ref: "biv", label: "Total Loans & Advances", type: "Amount", required: true, autoCalculated: true },
              { name: "totalCurrentAssetsLoansAdvances", ref: "3c", label: "Total Current Assets + Loans & Advances", type: "Amount", required: true, autoCalculated: true },
              { name: "sundryCreditors", ref: "iA", label: "Sundry Creditors", type: "Amount", required: false },
              { name: "liabilityLeasedAssets", ref: "iB", label: "Liability for Leased Assets", type: "Amount", required: false },
              { name: "interestAccruedAbove", ref: "iC", label: "Interest Accrued on above", type: "Amount", required: false },
              { name: "interestAccruedNotDueLoans", ref: "iD", label: "Interest Accrued but not due on loans", type: "Amount", required: false },
              { name: "totalCurrentLiabilities", ref: "iE", label: "Total Current Liabilities", type: "Amount", required: true, autoCalculated: true },
              { name: "provisionIncomeTax", ref: "iiA", label: "Provision for Income Tax", type: "Amount", required: false },
              { name: "provisionEmployeeBenefits", ref: "iiB", label: "Provision for Leave Encash/Superannuation/Gratuity", type: "Amount", required: false },
              { name: "otherProvisionsBS", ref: "iiC", label: "Other Provisions", type: "Amount", required: false },
              { name: "totalProvisionsBS", ref: "iiD", label: "Total Provisions", type: "Amount", required: true, autoCalculated: true },
              { name: "totalCurrentLiabilitiesProvisions", ref: "diii", label: "Total Current Liabilities + Provisions", type: "Amount", required: true, autoCalculated: true },
              { name: "netCurrentAssets", ref: "3e", label: "Net Current Assets (3c–diii)", type: "Amount", required: true, autoCalculated: true },
              { name: "miscExpenditureNotWrittenOff", ref: "4a", label: "Miscellaneous Expenditure not written off", type: "Amount", required: false },
              { name: "deferredTaxAsset", ref: "4b", label: "Deferred Tax Asset", type: "Amount", required: false },
              { name: "profitAndLossAccumulatedBalance", ref: "4c", label: "Profit and Loss Account / Accumulated Balance", type: "Amount", required: false },
              { name: "totalMiscDtaPl", ref: "4d", label: "Total Misc + DTA + P&L", type: "Amount", required: true, autoCalculated: true },
              { name: "totalApplication", ref: "5", label: "TOTAL APPLICATION (1e+2c+3e+4d)", type: "Amount", required: true, autoCalculated: true },
              // No account sub-group definitions
              { name: "noAccountSundryDebtors", ref: "6a", label: "No Account Case — Total Sundry Debtors", type: "Amount", required: "Conditional" },
              { name: "noAccountSundryCreditors", ref: "6b", label: "No Account Case — Total Sundry Creditors", type: "Amount", required: "Conditional" },
              { name: "noAccountStockInTrade", ref: "6c", label: "No Account Case — Total Stock-in-Trade", type: "Amount", required: "Conditional" },
              { name: "noAccountCashBalance", ref: "6d", label: "No Account Case — Cash Balance", type: "Amount", required: "Conditional" }
            ]
          }
        }
      },
      manufacturingTradingPL: {
        label: "Sections 4, 5, 6: Manufacturing, Trading & Core Profit & Loss Statements",
        fieldSections: {
          manufacturingAccount: {
            label: "Part A-Manufacturing Account Operational Dr/Cr",
            fields: [
              { name: "openingStockRawMaterial", ref: "Ai", label: "Opening Stock of Raw Materials", type: "Amount", required: false },
              { name: "openingStockWIP", ref: "Aii", label: "Opening Stock of Work-in-Progress", type: "Amount", required: false },
              { name: "totalOpeningInventoryMfg", ref: "Aiii", label: "Total Opening Inventory (Ai+Aii)", type: "Amount", required: true, autoCalculated: true },
              { name: "purchasesMfg", ref: "B", label: "Purchases (net of refunds & duty)", type: "Amount", required: false },
              { name: "directWages", ref: "C", label: "Direct Wages", type: "Amount", required: false },
              { name: "carriageInwardMfg", ref: "Di", label: "Carriage Inward", type: "Amount", required: false },
              { name: "powerFuelDirect", ref: "Dii", label: "Power and Fuel (Direct)", type: "Amount", required: false },
              { name: "otherDirectExpensesMfg", ref: "Diii", label: "Other Direct Expenses", type: "Amount", required: false },
              { name: "totalDirectExpensesMfg", ref: "D", label: "Total Direct Expenses (Di+Dii+Diii)", type: "Amount", required: true, autoCalculated: true },
              { name: "indirectWages", ref: "Ei", label: "Indirect Wages", type: "Amount", required: false },
              { name: "factoryRentRates", ref: "Eii", label: "Factory Rent and Rates", type: "Amount", required: false },
              { name: "factoryInsurance", ref: "Eiii", label: "Factory Insurance", type: "Amount", required: false },
              { name: "factoryFuelPower", ref: "Eiv", label: "Factory Fuel and Power", type: "Amount", required: false },
              { name: "factoryGeneralExpenses", ref: "Ev", label: "Factory General Expenses", type: "Amount", required: false },
              { name: "depreciationFactoryMachinery", ref: "Evi", label: "Depreciation of Factory Machinery", type: "Amount", required: false },
              { name: "totalFactoryOverheads", ref: "Evii", label: "Total Factory Overheads", type: "Amount", required: true, autoCalculated: true },
              { name: "totalDebitsManufacturing", ref: "F", label: "Total Debits to Manufacturing Account", type: "Amount", required: true, autoCalculated: true },
              { name: "closingStockRawMaterial", ref: "i", label: "Closing Stock of Raw Material", type: "Amount", required: false },
              { name: "closingStockWIP", ref: "ii", label: "Closing Stock of Work-in-Progress", type: "Amount", required: false },
              { name: "totalClosingStockMfg", ref: "iii", label: "Total Closing Stock", type: "Amount", required: true, autoCalculated: true },
              { name: "costOfGoodsProduced", ref: "3", label: "Cost of Goods Produced → Trading Account (F–iii)", type: "Amount", required: true, autoCalculated: true }
            ]
          },
          tradingAccountCredits: {
            label: "Part A-Trading Account — Revenue & Credits",
            fields: [
              { name: "saleOfGoods", ref: "Ai", label: "Sale of Goods (net of returns & duty)", type: "Amount", required: false },
              { name: "saleOfServices", ref: "Aii", label: "Sale of Services", type: "Amount", required: false },
              { name: "otherOperatingRevenuesGrid", ref: "Aiii", label: "Other Operating Revenues Repeat Block", type: "Table", columns: ["Nature", "Amount"], required: false },
              { name: "totalRevenueBusiness", ref: "Aiv", label: "Total Revenue from Business (Ai+Aii+Aiii)", type: "Amount", required: true, autoCalculated: true },
              { name: "grossReceiptsProfession", ref: "B", label: "Gross Receipts from Profession", type: "Amount", required: false },
              { name: "unionExciseDutiesReceived", ref: "Ci", label: "Union Excise Duties received", type: "Amount", required: false },
              { name: "serviceTaxReceived", ref: "Cii", label: "Service Tax received", type: "Amount", required: false },
              { name: "vatSalesTaxReceived", ref: "Ciii", label: "VAT/Sales Tax received", type: "Amount", required: false },
              { name: "cgstReceived", ref: "Civ", label: "CGST received", type: "Amount", required: false },
              { name: "sgstReceived", ref: "Cv", label: "SGST received", type: "Amount", required: false },
              { name: "igstReceived", ref: "Cvi", label: "IGST received", type: "Amount", required: false },
              { name: "utgstReceived", ref: "Cvii", label: "UTGST received", type: "Amount", required: false },
              { name: "anyOtherDutyTaxReceived", ref: "Cviii", label: "Any other duty/tax", type: "Amount", required: false },
              { name: "totalTaxesDutiesReceived", ref: "Cix", label: "Total Taxes/Duties received", type: "Amount", required: true, autoCalculated: true },
              { name: "totalRevenueOperations", ref: "4D", label: "Total Revenue from Operations (Aiv+B+Cix)", type: "Amount", required: true, autoCalculated: true },
              { name: "closingStockFinishedGoods", ref: "5", label: "Closing Stock of Finished Goods", type: "Amount", required: false },
              { name: "totalCreditsTrading", ref: "6", label: "Total Credits to Trading Account (4D+5)", type: "Amount", required: true, autoCalculated: true }
            ]
          },
          tradingAccountDebits: {
            label: "Part A-Trading Account — Expenses & Debits",
            fields: [
              { name: "openingStockFinishedGoods", ref: "7", label: "Opening Stock of Finished Goods", type: "Amount", required: false },
              { name: "purchasesTrading", ref: "8", label: "Purchases (net of refunds & duty)", type: "Amount", required: false },
              { name: "carriageInwardTrading", ref: "9i", label: "Carriage Inward", type: "Amount", required: false },
              { name: "powerFuelTrading", ref: "9ii", label: "Power and Fuel (Trading)", type: "Amount", required: false },
              { name: "otherDirectExpensesTradingGrid", ref: "9iii", label: "Other Direct Expenses Repeat Block", type: "Table", columns: ["Nature", "Amount"], required: false },
              { name: "totalDirectExpensesTrading", ref: "9", label: "Total Direct Expenses", type: "Amount", required: true, autoCalculated: true },
              { name: "customDutyPaid", ref: "10i", label: "Custom Duty", type: "Amount", required: false },
              { name: "counterVailingDutyPaid", ref: "10ii", label: "Counter Veiling Duty", type: "Amount", required: false },
              { name: "specialAdditionalDutyPaid", ref: "10iii", label: "Special Additional Duty", type: "Amount", required: false },
              { name: "unionExciseDutyPaid", ref: "10iv", label: "Union Excise Duty (paid)", type: "Amount", required: false },
              { name: "serviceTaxPaid", ref: "10v", label: "Service Tax (paid)", type: "Amount", required: false },
              { name: "vatSalesTaxPaid", ref: "10vi", label: "VAT/Sales Tax (paid)", type: "Amount", required: false },
              { name: "cgstPaid", ref: "10vii", label: "CGST (paid)", type: "Amount", required: false },
              { name: "sgstPaid", ref: "10viii", label: "SGST (paid)", type: "Amount", required: false },
              { name: "igstPaid", ref: "10ix", label: "IGST (paid)", type: "Amount", required: false },
              { name: "utgstPaid", ref: "10x", label: "UTGST (paid)", type: "Amount", required: false },
              { name: "anyOtherTaxPaid", ref: "10xi", label: "Any other tax paid", type: "Amount", required: false },
              { name: "totalDutiesTaxesPaid", ref: "10xii", label: "Total Duties & Taxes paid", type: "Amount", required: true, autoCalculated: true },
              { name: "costOfGoodsProducedFromMfg", ref: "11", label: "Cost of Goods Produced (from Manufacturing Account)", type: "Amount", required: true, autoCalculated: true },
              { name: "grossProfitTrading", ref: "12", label: "Gross Profit → P&L (6–7–8–9–10xii–11)", type: "Amount", required: true, autoCalculated: true },
              { name: "turnoverIntradayTrading", ref: "12a", label: "Turnover from Intraday Trading", type: "Amount", required: false },
              { name: "incomeIntradayTrading", ref: "12b", label: "Income from Intraday Trading → P&L", type: "Amount", required: false }
            ]
          },
          plCreditsIncome: {
            label: "6.1 Profit & Loss — Credits & Income",
            fields: [
              { name: "grossProfitFromTrading", ref: "13", label: "Gross Profit from Trading Account", type: "Amount", required: true, autoCalculated: true },
              { name: "otherIncomeRent", ref: "14i", label: "Other Income — Rent", type: "Amount", required: false },
              { name: "otherIncomeCommission", ref: "14ii", label: "Other Income — Commission", type: "Amount", required: false },
              { name: "otherIncomeDividend", ref: "14iii", label: "Other Income — Dividend Income", type: "Amount", required: false },
              { name: "otherIncomeInterest", ref: "14iv", label: "Other Income — Interest Income", type: "Amount", required: false },
              { name: "otherIncomeProfitSaleFixedAssets", ref: "14v", label: "Other Income — Profit on sale of fixed assets", type: "Amount", required: false },
              { name: "otherIncomeProfitSaleSttInvestments", ref: "14vi", label: "Other Income — Profit on sale of STT investments", type: "Amount", required: false },
              { name: "otherIncomeProfitSaleOtherInvestments", ref: "14vii", label: "Other Income — Profit on sale of other investments", type: "Amount", required: false },
              { name: "otherIncomeGainLossForex", ref: "14viii", label: "Other Income — Gain/Loss on forex fluctuation u/s 43AA", type: "Amount", required: false },
              { name: "otherIncomeProfitConversionAsset", ref: "14ix", label: "Other Income — Profit on conversion of inventory to capital asset u/s 28(via)", type: "Amount", required: false },
              { name: "otherIncomeAgriculture", ref: "14x", label: "Other Income — Agriculture Income", type: "Amount", required: false },
              { name: "otherIncomeLiabilitiesWrittenBackGrid", ref: "14xia", label: "Other Income — Liabilities written back Repeat Block (Max 3)", type: "Table", columns: ["Nature", "Amount"], required: false },
              { name: "otherIncomeMiscGrid", ref: "14xib", label: "Other Income — Other incomes (not in turnover) Repeat Block (Max 3)", type: "Table", columns: ["Nature", "Amount"], required: false },
              { name: "totalOtherIncome", ref: "14xii", label: "Total Other Income", type: "Amount", required: true, autoCalculated: true },
              { name: "totalCreditsPL", ref: "15", label: "Total Credits to P&L (13+14xii)", type: "Amount", required: true, autoCalculated: true }
            ]
          },
          plDebitsExpenses: {
            label: "6.2 Profit & Loss — Debits & Expenses Structure",
            fields: [
              { name: "freightOutward", ref: "16", label: "Freight Outward", type: "Amount", required: false },
              { name: "consumptionStoresSpareParts", ref: "17", label: "Consumption of Stores & Spare Parts", type: "Amount", required: false },
              { name: "powerAndFuelPL", ref: "18", label: "Power and Fuel", type: "Amount", required: false },
              { name: "rentPL", ref: "19", label: "Rent", type: "Amount", required: false },
              { name: "repairsBuilding", ref: "20", label: "Repairs to Building", type: "Amount", required: false },
              { name: "repairsMachinery", ref: "21", label: "Repairs to Machinery", type: "Amount", required: false },
              { name: "salariesWages", ref: "22i", label: "Salaries and Wages", type: "Amount", required: false },
              { name: "bonus", ref: "22ii", label: "Bonus", type: "Amount", required: false },
              { name: "reimbursementMedicalExpenses", ref: "22iii", label: "Reimbursement of Medical Expenses", type: "Amount", required: false },
              { name: "leaveEncashmentPL", ref: "22iv", label: "Leave Encashment", type: "Amount", required: false },
              { name: "leaveTravelBenefits", ref: "22v", label: "Leave Travel Benefits", type: "Amount", required: false },
              { name: "contributionApprovedSuperannuationFund", ref: "22vi", label: "Contribution to Approved Superannuation Fund", type: "Amount", required: false },
              { name: "contributionRecognisedPF", ref: "22vii", label: "Contribution to Recognised PF", type: "Amount", required: false },
              { name: "contributionRecognisedGratuityFund", ref: "22viii", label: "Contribution to Recognised Gratuity Fund", type: "Amount", required: false },
              { name: "contributionAnyOtherFund", ref: "22ix", label: "Contribution to Any Other Fund", type: "Amount", required: false },
              { name: "anyOtherBenefitEmployees", ref: "22x", label: "Any Other Benefit to Employees", type: "Amount", required: false },
              { name: "totalCompensationEmployees", ref: "22xi", label: "Total Compensation to Employees (22i–22x)", type: "Amount", required: true, autoCalculated: true },
              { name: "isCompensationNonResidentsIncluded", ref: "22xii-a", label: "Whether compensation to non-residents included?", type: "Dropdown", required: "Conditional", options: ["Yes", "No"] },
              { name: "amountPaidNonResidents", ref: "22xii-b", label: "Amount paid to non-residents", type: "Amount", required: "Conditional" },
              { name: "medicalInsurancePL", ref: "23i", label: "Medical Insurance", type: "Amount", required: false },
              { name: "lifeInsurancePL", ref: "23ii", label: "Life Insurance", type: "Amount", required: false },
              { name: "keymansInsurance", ref: "23iii", label: "Keyman's Insurance", type: "Amount", required: false },
              { name: "otherInsurancePL", ref: "23iv", label: "Other Insurance", type: "Amount", required: false },
              { name: "totalInsurancePL", ref: "23v", label: "Total Insurance", type: "Amount", required: true, autoCalculated: true },
              { name: "workmenStaffWelfareExpenses", ref: "24", label: "Workmen and Staff Welfare Expenses", type: "Amount", required: false },
              { name: "entertainment", ref: "25", label: "Entertainment", type: "Amount", required: false },
              { name: "hospitality", ref: "26", label: "Hospitality", type: "Amount", required: false },
              { name: "conferencePL", ref: "27", label: "Conference", type: "Amount", required: false },
              { name: "salesPromotion", ref: "28", label: "Sales Promotion (excl. advertisement)", type: "Amount", required: false },
              { name: "advertisement", ref: "29", label: "Advertisement", type: "Amount", required: false },
              { name: "commissionNonResidentCompany", ref: "30i", label: "Commission — NR/Non-resident company", type: "Amount", required: false },
              { name: "commissionOthers", ref: "30ii", label: "Commission — Others", type: "Amount", required: false },
              { name: "totalCommissionPL", ref: "30iii", label: "Total Commission", type: "Amount", required: true, autoCalculated: true },
              { name: "royaltyNonResidentCompany", ref: "31i", label: "Royalty — NR/Non-resident company", type: "Amount", required: false },
              { name: "royaltyOthers", ref: "31ii", label: "Royalty — Others", type: "Amount", required: false },
              { name: "totalRoyaltyPL", ref: "31iii", label: "Total Royalty", type: "Amount", required: true, autoCalculated: true },
              { name: "professionalConsultancyTechServicesNR", ref: "32i", label: "Professional/Consultancy/Tech Services — NR", type: "Amount", required: false },
              { name: "professionalConsultancyTechServicesOthers", ref: "32ii", label: "Professional/Consultancy/Tech Services — Others", type: "Amount", required: false },
              { name: "totalProfessionalFees", ref: "32iii", label: "Total Professional Fees", type: "Amount", required: true, autoCalculated: true },
              { name: "hotelBoardingLodging", ref: "33", label: "Hotel, Boarding and Lodging", type: "Amount", required: false },
              { name: "travelingExpensesDomestic", ref: "34", label: "Traveling Expenses (other than foreign)", type: "Amount", required: false },
              { name: "foreignTravellingExpenses", ref: "35", label: "Foreign Travelling Expenses", type: "Amount", required: false },
              { name: "conveyanceExpenses", ref: "36", label: "Conveyance Expenses", type: "Amount", required: false },
              { name: "telephoneExpenses", ref: "37", label: "Telephone Expenses", type: "Amount", required: false },
              { name: "guestHouseExpenses", ref: "38", label: "Guest House Expenses", type: "Amount", required: false },
              { name: "clubExpenses", ref: "39", label: "Club Expenses", type: "Amount", required: false },
              { name: "festivalCelebrationExpenses", ref: "40", label: "Festival Celebration Expenses", type: "Amount", required: false },
              { name: "scholarship", ref: "41", label: "Scholarship", type: "Amount", required: false },
              { name: "gift", ref: "42", label: "Gift", type: "Amount", required: false },
              { name: "donationPL", ref: "43", label: "Donation", type: "Amount", required: false },
              { name: "unionExciseDutyRatesTaxes", ref: "44i", label: "Union Excise Duty (rates & taxes)", type: "Amount", required: false },
              { name: "serviceTaxRatesTaxes", ref: "44ii", label: "Service Tax (rates & taxes)", type: "Amount", required: false },
              { name: "vatSalesTaxPL", ref: "44iii", label: "VAT/Sales Tax", type: "Amount", required: false },
              { name: "cessPL", ref: "44iv", label: "Cess", type: "Amount", required: false },
              { name: "cgstPaidRatesTaxes", ref: "44v", label: "CGST", type: "Amount", required: false },
              { name: "sgstPaidRatesTaxes", ref: "44vi", label: "SGST", type: "Amount", required: false },
              { name: "igstPaidRatesTaxes", ref: "44vii", label: "IGST", type: "Amount", required: false },
              { name: "utgstPaidRatesTaxes", ref: "44viii", label: "UTGST", type: "Amount", required: false },
              { name: "anyOtherRateTaxDutyCess", ref: "44ix", label: "Any other rate/tax/duty/cess incl. STT/CTT", type: "Amount", required: false },
              { name: "totalRatesTaxes", ref: "44x", label: "Total Rates & Taxes", type: "Amount", required: true, autoCalculated: true },
              { name: "auditFee", ref: "45", label: "Audit Fee", type: "Amount", required: false },
              { name: "otherExpensesGrid", ref: "46", label: "Other Expenses Repeat Block (Max 4)", type: "Table", columns: ["Nature", "Amount"], required: false },
              { name: "badDebtsWithPanGrid", ref: "47i", label: "Bad Debts — with PAN/Aadhaar ≥ ₹1 lakh Repeat Block (Max 7)", type: "Table", columns: ["PAN/Aadhaar", "Amount"], required: false },
              { name: "badDebtsWithoutPanGrid", ref: "47ii", label: "Bad Debts — without PAN/Aadhaar ≥ ₹1 lakh Repeat Block (Max 4)", type: "Table", columns: ["Name", "Full Address", "State Dropdown", "Country Dropdown", "Amount"], required: false },
              { name: "badDebtsOthers", ref: "47iii", label: "Bad Debts — Others < ₹1 lakh", type: "Amount", required: false },
              { name: "totalBadDebts", ref: "47iv", label: "Total Bad Debts (47i+47ii+47iii)", type: "Amount", required: true, autoCalculated: true },
              { name: "provisionBadDoubtfulDebts", ref: "48", label: "Provision for Bad and Doubtful Debts", type: "Amount", required: false },
              { name: "otherProvisionsPL", ref: "49", label: "Other Provisions", type: "Amount", required: false },
              { name: "profitBeforeInterestDeprTaxes", ref: "50", label: "Profit before Interest, Depreciation & Taxes", type: "Amount", required: true, autoCalculated: true },
              { name: "interestPaidNonResident", ref: "51i", label: "Interest — Paid to NR/Non-resident company", type: "Amount", required: false },
              { name: "interestPaidOthers", ref: "51ii", label: "Interest — To Others", type: "Amount", required: false },
              { name: "totalInterestPL", ref: "51iii", label: "Total Interest", type: "Amount", required: true, autoCalculated: true },
              { name: "depreciationAmortizationPL", ref: "52", label: "Depreciation and Amortization", type: "Amount", required: false },
              { name: "netProfitBeforeTaxes", ref: "53", label: "Net Profit before Taxes (50–51iii–52)", type: "Amount", required: true, autoCalculated: true },
              { name: "provisionCurrentTaxPL", ref: "54", label: "Provision for Current Tax", type: "Amount", required: false },
              { name: "provisionDeferredTaxPL", ref: "55", label: "Provision for Deferred Tax", type: "Amount", required: false },
              { name: "profitAfterTaxPL", ref: "56", label: "Profit after Tax (53–54–55)", type: "Amount", required: true, autoCalculated: true },
              { name: "balanceBroughtForwardPreviousYear", ref: "57", label: "Balance Brought Forward from Previous Year", type: "Amount", required: false }
            ]
          },
          presumptiveIncomeNoAccount: {
            label: "6.3 Presumptive Income / No Account Case Blocks",
            fields: [
              { name: "grossReceipts44AD", ref: "61i", label: "61. Gross Receipts (44AD)", type: "Amount", required: "Conditional" },
              { name: "netProfitLoss44AD", ref: "61ii", label: "61. Net Profit or Loss (44AD)", type: "Amount", required: "Conditional" },
              { name: "grossReceipts44ADA", ref: "62i", label: "62. Gross Receipts (44ADA — Professionals)", type: "Amount", required: "Conditional" },
              { name: "netProfitLoss44ADA", ref: "62ii", label: "62. Net Profit or Loss (44ADA)", type: "Amount", required: "Conditional" },
              { name: "goodsCarriageTable44AE", ref: "63", label: "63. Goods carriage table (44AE)", type: "Table", columns: ["Owner status", "Vehicle No.", "Months", "Amount per vehicle"], required: "Conditional" },
              { name: "netProfit44AE", ref: "63ii", label: "63. Net Profit (44AE)", type: "Amount", required: "Conditional" },
              { name: "incomeShipping44B", ref: "64", label: "64. Income from shipping (44B)", type: "Amount", required: "Conditional" },
              { name: "noAccountSummaryBlock", ref: "65i-iv", label: "65. No-account case summary", type: "SubForm", fields: ["Total receipts", "Total expenses", "Net profit"], required: "Conditional" }
            ]
          }
        }
      },
      auditOtherAndQuantativeDetails: {
        label: "Sections 7 & 8: Part A-OI (Other Information) & Part A-QD (Quantitative Details)",
        fieldSections: {
          partA_OI: {
            label: "7. Part A-OI: Audit Mandated Accounting Adjustments",
            fields: [
              { name: "methodOfAccounting", ref: "1", label: "Method of Accounting", type: "Dropdown", required: "AuditOnly", options: ["Mercantile", "Cash"] },
              { name: "changeMethodOfAccounting", ref: "2", label: "Change in method of accounting?", type: "Dropdown", required: "AuditOnly", options: ["Yes", "No"] },
              { name: "increaseProfitIcdsDeviations", ref: "3a", label: "Increase in profit due to ICDS deviations", type: "Amount", required: "AuditOnly", autoCalculated: true },
              { name: "decreaseProfitIcdsDeviations", ref: "3b", label: "Decrease in profit due to ICDS deviations", type: "Amount", required: "AuditOnly", autoCalculated: true },
              { name: "methodValuationRawMaterial", ref: "4a", label: "Method of valuation of Raw Material closing stock", type: "Dropdown", required: "AuditOnly", options: ["1-Cost or market rate", "2-At cost", "3-At market rate"] },
              { name: "methodValuationFinishedGoods", ref: "4b", label: "Method of valuation of Finished Goods closing stock", type: "Dropdown", required: "AuditOnly", options: ["1-Cost or market rate", "2-At cost", "3-At market rate"] },
              { name: "changeStockValuationMethod", ref: "4c", label: "Change in stock valuation method?", type: "Dropdown", required: "AuditOnly", options: ["Yes", "No"] },
              { name: "increaseProfitDeviation145A", ref: "4d", label: "Increase in profit due to deviation u/s 145A", type: "Amount", required: "Conditional" },
              { name: "decreaseProfitDeviation145A", ref: "4e", label: "Decrease in profit due to deviation u/s 145A", type: "Amount", required: "Conditional" },
              { name: "amountsNotCreditedSec28", ref: "5a", label: "Amounts not credited — Items u/s 28", type: "Amount", required: false },
              { name: "proformaCreditsGstRefunds", ref: "5b", label: "Proforma credits / GST refunds not credited", type: "Amount", required: false },
              { name: "escalationClaimsAccepted", ref: "5c", label: "Escalation claims accepted", type: "Amount", required: false },
              { name: "anyOtherItemOfIncomeOI", ref: "5d", label: "Any other item of income", type: "Amount", required: false },
              { name: "capitalReceiptsOI", ref: "5e", label: "Capital receipts", type: "Amount", required: false },
              { name: "totalItemsNotCredited", ref: "5f", label: "Total (5a+5b+5c+5d+5e)", type: "Amount", required: true, autoCalculated: true },
              { name: "disallowableSec36Fields", ref: "6a-6r", label: "Disallowable u/s 36 (19 items)", type: "AmountVector", size: 19, required: "AuditOnly" },
              { name: "totalDisallowableSec36", ref: "6s", label: "Total disallowable u/s 36", type: "Amount", required: true, autoCalculated: true },
              { name: "disallowableSec37Fields", ref: "7a-7i", label: "Disallowable u/s 37 (9 items)", type: "AmountVector", size: 9, required: false },
              { name: "totalDisallowableSec37", ref: "7j", label: "Total disallowable u/s 37", type: "Amount", required: true, autoCalculated: true },
              { name: "disallowableSec40Fields", ref: "8Aa-8Ai", label: "Disallowable u/s 40 (9 items)", type: "AmountVector", size: 9, required: false },
              { name: "totalDisallowableSec40", ref: "8Aj", label: "Total disallowable u/s 40", type: "Amount", required: true, autoCalculated: true },
              { name: "amountDisallowedSec40PriorYearNowAllowable", ref: "8B", label: "Amount disallowed u/s 40 in prior years but now allowable", type: "Amount", required: false },
              { name: "disallowableSec40AFields", ref: "9a-9e", label: "Disallowable u/s 40A (5 items)", type: "AmountVector", size: 5, required: false },
              { name: "totalDisallowableSec40A", ref: "9f", label: "Total disallowable u/s 40A", type: "Amount", required: true, autoCalculated: true },
              { name: "allowableSec43BPriorYearsFields", ref: "10a-10h", label: "Allowable u/s 43B in prior years (8 items)", type: "AmountVector", size: 8, required: false },
              { name: "totalAllowableSec43B", ref: "10i", label: "Total allowable u/s 43B", type: "Amount", required: true, autoCalculated: true },
              { name: "disallowableSec43BFields", ref: "11a-11h", label: "Disallowable u/s 43B (8 items)", type: "AmountVector", size: 8, required: false },
              { name: "totalDisallowableSec43B", ref: "11i", label: "Total disallowable u/s 43B", type: "Amount", required: true, autoCalculated: true },
              { name: "creditOutstandingTaxesFields", ref: "12a-12h", label: "Credit outstanding for taxes (8 items)", type: "AmountVector", size: 8, required: false },
              { name: "totalCreditOutstandingTaxes", ref: "12i", label: "Total credit outstanding", type: "Amount", required: true, autoCalculated: true },
              { name: "deemedProfitsSec33AB_ABA", ref: "13a_13b", label: "Deemed profits u/s 33AB / 33ABA", type: "AmountVector", size: 2, required: false },
              { name: "profitChargeableSec41", ref: "14", label: "Any amount of profit chargeable u/s 41", type: "Amount", required: false },
              { name: "priorPeriodIncomeExpenditureNet", ref: "15", label: "Prior period income/expenditure (net)", type: "Amount", required: false },
              { name: "expenditureDisallowedSec14A", ref: "16", label: "Expenditure disallowed u/s 14A", type: "Amount", required: false },
              { name: "exercisingOptionSec92CE2A", ref: "17", label: "Exercising option u/s 92CE(2A)?", type: "Dropdown", required: false, options: ["Yes", "No"] }
            ]
          },
          quantitativeDetails: {
            label: "8. Part A-QD: Inventory Quantity Ledger Tracking (Audit Only)",
            fields: [
              { name: "tradingConcernGrid", ref: "8.1", label: "8.1 Trading Concern Product Matrix", type: "Table", maxRows: 4, columns: ["Item Name Dropdown", "Unit of Measure Dropdown", "Opening Stock", "Purchase during the Year", "Sales during the Year", "Closing Stock", "Shortage / Excess"], required: "Conditional" },
              { name: "mfgRawMaterialsGrid", ref: "8.2", label: "8.2 Manufacturing — Raw Materials Ledger", type: "Table", maxRows: 4, columns: ["Item Name Dropdown", "Unit", "Opening Stock", "Purchase", "Consumption", "Sales", "Closing Stock", "Yield", "% of Yield", "Shortage/Excess"], required: "Conditional" },
              { name: "mfgFinishedProductsGrid", ref: "8.3", label: "8.3 Manufacturing — Finished / By-products Matrix", type: "Table", maxRows: 4, columns: ["Item Name Dropdown", "Unit", "Opening Stock", "Purchase", "Qty Manufactured", "Sales", "Closing Stock", "Shortage/Excess"], required: "Conditional" }
            ]
          }
        }
      }
    }
  },

  // ==========================================
  // MAIN SECTION 3: HEADS OF INCOME COMPUTATION
  // ==========================================
  headsOfIncomeComputation: {
    label: "Schedules S, HP, and BP: Core Computations",
    subsections: {
      scheduleS_Salaries: {
        label: "Section 9: Schedule S (Salary Income)",
        fieldSections: {
          employerRegistry: {
            label: "Employer Particulars (Up to 2 Employers)",
            fields: [
              { name: "nameOfEmployer", label: "Name of Employer", type: "Text", required: true },
              { name: "natureOfEmployer", label: "Nature of Employer", type: "Dropdown", required: true, options: ["Central Government", "State Government", "PSU", "CG-Pensioners", "SG-Pensioners", "PSU-Pensioners", "Others-Pensioners", "Others"] },
              { name: "tanOfEmployer", label: "TAN of Employer", type: "Text", required: "Conditional", validation: { pattern: "TAN" } },
              { name: "employerAddressSubForm", label: "Address Blocks", type: "SubForm", fields: ["Address", "Town", "State Dropdown", "Pincode"], required: true }
            ]
          },
          salaryBreakupDrilldown: {
            label: "Salary Breakdown Fields & Section 16 Deductions",
            fields: [
              { name: "salarySec17_1_Grid", ref: "1a", label: "Salary u/s 17(1) Sub-Table", type: "Table", maxRows: 3, columns: ["Nature Dropdown", "Description", "Amount"], required: true },
              { name: "perquisitesSec17_2_Grid", ref: "1b", label: "Perquisites u/s 17(2) Sub-Table", type: "Table", maxRows: 3, columns: ["Nature Dropdown", "Description", "Amount"], required: false },
              { name: "profitInLieuSalarySec17_3_Grid", ref: "1c", label: "Profit in lieu of salary u/s 17(3) Sub-Table", type: "Table", maxRows: 2, columns: ["Nature Dropdown", "Description", "Amount"], required: false },
              { name: "retirementBenefit89A_NotifiedGrid", ref: "1d", label: "Retirement benefit account — Notified Country u/s 89A Table", type: "Table", maxRows: 3, columns: ["Country Dropdown", "Amount"], required: false },
              { name: "retirementBenefit89A_NonNotified", ref: "1e", label: "Retirement benefit account — Non-Notified Country u/s 89A", type: "Amount", required: false },
              { name: "incomeTaxableReliefClaimedEarlier", ref: "1f", label: "Income taxable this year on which 89A relief claimed earlier", type: "Amount", required: false },
              { name: "grossSalaryPerEmployer", label: "Gross Salary per employer", type: "Amount", required: true, autoCalculated: true },
              { name: "totalGrossSalaryAllEmployers", label: "Total Gross Salary (all employers combined)", type: "Amount", required: true, autoCalculated: true },
              { name: "incomeForReliefSec89A", ref: "3a", label: "Income for relief u/s 89A", type: "Amount", required: true, autoCalculated: true },
              { name: "allowancesExemptSec10Grid", ref: "3", label: "Allowances exempt u/s 10 Table (Max 4)", type: "Table", columns: ["Nature Dropdown", "Description", "Amount"], required: false },
              { name: "hraSubForm", label: "HRA u/s 10(13A) Sub-Form", type: "SubForm", required: "Conditional", fields: ["Place of Work Dropdown", "HRA received", "Rent paid", "Salary", "Eligible HRA"] },
              { name: "netSalary", ref: "4", label: "Net Salary (2–3a–3)", type: "Amount", required: true, autoCalculated: true },
              { name: "standardDeduction16ia", ref: "5a", label: "Standard Deduction u/s 16(ia)", type: "Amount", required: true, autoCalculated: true },
              { name: "entertainmentAllowance16ii", ref: "5b", label: "Entertainment Allowance u/s 16(ii)", type: "Amount", required: false },
              { name: "professionalTax16iii", ref: "5c", label: "Professional Tax u/s 16(iii)", type: "Amount", required: false },
              { name: "totalDeductionsSec16", ref: "5", label: "Total Deductions u/s 16", type: "Amount", required: true, autoCalculated: true },
              { name: "incomeChargeableSalaries", ref: "6", label: "Income chargeable under Salaries (4–5)", type: "Amount", required: true, autoCalculated: true }
            ]
          }
        }
      },
      scheduleHP_HouseProperty: {
        label: "Section 10: Schedule HP (Income from House Property)",
        fieldSections: {
          propertyStructureAndCoownership: {
            label: "Property Mapping & Co-owners (Supports 2 Properties)",
            fields: [
              { name: "propertyAddressSubForm", label: "Property Address Layout", type: "SubForm", fields: ["Address", "Town", "State Dropdown", "Country Dropdown", "PIN Code", "ZIP Code"], required: true },
              { name: "propertyOwnerType", label: "Owner type", type: "Dropdown", required: true },
              { name: "isPropertyCoOwned", label: "Co-owned?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "propertyOwnershipPercentage", label: "Percentage share", type: "Number", required: "Conditional" },
              { name: "coOwnersGrid", label: "Co-owner Ledger Table", type: "Table", maxRows: 7, columns: ["Co-owner Name", "PAN/Aadhaar", "Percentage Share"], required: "Conditional" }
            ]
          },
          tenantAndHPComputation: {
            label: "Tenant Particulars & House Property Income Computation Engine",
            fields: [
              { name: "tenantsGrid", label: "Tenant Grid Allocation", type: "Table", maxRows: 3, columns: ["Tenant Name", "PAN", "Aadhaar", "PAN/TAN for TDS"], required: false },
              { name: "typeOfHP", label: "Type of HP", type: "Dropdown", required: true, options: ["Self-Occupied", "Let Out", "Deemed Let Out"] },
              { name: "grossRentReceived", label: "Gross rent received/receivable", type: "Amount", required: false },
              { name: "unrealisedRent", label: "Unrealised rent", type: "Amount", required: false },
              { name: "localTaxesPaid", label: "Local tax paid to local authority", type: "Amount", required: false },
              { name: "annualValue", label: "Annual Value", type: "Amount", required: true, autoCalculated: true },
              { name: "standardDeductionSec24a", label: "30% Standard Deduction u/s 24(a)", type: "Amount", required: true, autoCalculated: true },
              { name: "interestBorrowedCapitalSec24b", label: "Interest payable on borrowed capital u/s 24(b)", type: "Amount", required: false },
              { name: "loanTableSec24b", label: "Section 24(b) Loan Drilldown Table", type: "Table", maxRows: 4, columns: ["Loan Source Dropdown", "Bank Name", "Account No.", "Sanction Date", "Loan Amount", "Outstanding Principal", "Interest Paid"], required: false },
              { name: "totalHPDeductions", label: "Total deductions", type: "Amount", required: true, autoCalculated: true },
              { name: "arrearsRentReceived", label: "Arrears of rent received", type: "Amount", required: false },
              { name: "netHPIncome", label: "Net HP income", type: "Amount", required: true, autoCalculated: true },
              { name: "passThroughIncomeHP", label: "Pass-Through Income from HP (Schedule PTI)", type: "Amount", required: false },
              { name: "totalHPIncomeFinal", label: "Total HP Income (Σ1k + 2)", type: "Amount", required: true, autoCalculated: true }
            ]
          }
        }
      },
      scheduleBP_BusinessComputation: {
        label: "Section 11: Schedule BP (Business and Profession Income)",
        fieldSections: {
          regularBusinessReconciliation: {
            label: "11.1 Section A — Profit Reconciliation for Regular Business",
            fields: [
              { name: "netProfitBeforeTaxBP", ref: "1", label: "Net Profit before tax from P&L", type: "Amount", required: true, notes: "Flows from entry 53 or 61ii-65iv" },
              { name: "speculativeProfitLossIncluded", ref: "2a", label: "Net profit/loss from speculative business included in 1", type: "Amount", required: false },
              { name: "specifiedProfitLoss35ADIncluded", ref: "2b", label: "Net profit/loss from Specified Business u/s 35AD included in 1", type: "Amount", required: false },
              { name: "incomeOtherHeadsCreditedPL", ref: "3a-3g", label: "Income/receipts credited to P&L under other heads vector", type: "SubForm", fields: ["Salary", "HP", "CG", "OS", "115BBF", "115BBG", "115BBH"], required: false },
              { name: "profitCoveredPresumptiveSections", ref: "4a", label: "Profit covered by 44AD/44ADA/44AE/44B/44BB/44BBA/44BBC/44DA", type: "SubForm", fields: ["44AD", "44ADA", "44AE", "44B", "44BB", "44BBA", "44BBC", "44DA"], required: false },
              { name: "profitActivitiesAgriculturalRules", ref: "4b", label: "Profit from activities under Rule 7/7A/7B(1)/7B(1A)/8", type: "SubForm", fields: ["Rule7", "Rule7A", "Rule7B_1", "Rule7B_1A", "Rule8"], required: false },
              { name: "exemptIncomeShareFirmAop", ref: "5a-5d", label: "Exempt income sub-block", type: "SubForm", fields: ["Firm Share", "AOP Share", "Other Exempt"], required: false },
              { name: "balanceReconciliation", ref: "6", label: "Balance (1–2a–2b–3–4a–4b–5d)", type: "Amount", required: true, autoCalculated: true },
              { name: "expensesOtherHeadsDebitedPL", ref: "7a-7g", label: "Expenses debited to P&L under other heads / 115BBF / 115BBG / 115BBH", type: "Amount", required: false },
              { name: "expensesExemptIncomeDisallowed14A", ref: "8a_8b", label: "Expenses for exempt income / disallowed u/s 14A", type: "Amount", required: false },
              { name: "totalExpensesReconciliationAdditions", ref: "9", label: "Total Expenses additions", type: "Amount", required: true, autoCalculated: true },
              { name: "adjustedProfitBP", ref: "10", label: "Adjusted Profit (6+9)", type: "Amount", required: true, autoCalculated: true },
              { name: "depreciationDebitedPL", ref: "11", label: "Depreciation debited to P&L", type: "Amount", required: false },
              { name: "depreciationAllowableScheduleDEP", ref: "12i-12iii", label: "Depreciation allowable (Schedule DEP + own computation)", type: "Amount", required: true, autoCalculated: true },
              { name: "profitAfterDepreciationAdjustment", ref: "13", label: "Profit after depreciation adjustment", type: "Amount", required: true, autoCalculated: true },
              { name: "additionsOI_Disallowances", ref: "14-25", label: "Additions (disallowable u/s 36/37/40/40A/43B + deemed income rows)", type: "Amount", required: true, autoCalculated: true },
              { name: "totalAdditionsBP", ref: "26", label: "Total additions (14+…+25)", type: "Amount", required: true, autoCalculated: true },
              { name: "deductionsAllowableBP", ref: "27-33", label: "Deductions (32(1)(iii) / 32AD / 35ESR / Prior 40 / Prior 43B / 35AC / Other / ICDS decrease)", type: "Amount", required: false },
              { name: "netRegularBusinessIncome", ref: "34", label: "Net Income (13+26–33)", type: "Amount", required: true, autoCalculated: true },
              { name: "presumptiveIncomeSchedulesBP", ref: "35i-35viii", label: "Presumptive income vector summary block", type: "SubForm", fields: ["44AD", "44ADA", "44AE", "44B", "44BB", "44BBA", "44BBA_Deemed"], required: true, autoCalculated: true }
            ]
          }
        }
      }
    }
  },

  // ==========================================
  // MAIN SECTION 4: GLOBAL TAX COMPUTATION & VERIFICATION
  // ==========================================
  globalTaxComputationAndVerification: {
    label: "Schedules Deductions, Tax Payments, TTI & Updated Return Configuration",
    subsections: {
      deductionsAndSchedules: {
        label: "Section 15, 16, 17: Deductions & Tax Ledgers",
        fieldSections: {
          chapterVIA_Deductions: {
            label: "Chapter VI-A Statutory Deductions (Old Regime Only)",
            fields: [
              { name: "deductionSec10A", label: "Deduction u/s 10A", type: "Amount", required: "Conditional" },
              { name: "deductionSec10AA", label: "Deduction u/s 10AA", type: "Amount", required: "Conditional", autoCalculated: true },
              { name: "deductionSec10B", label: "Deduction u/s 10B", type: "Amount", required: "Conditional" },
              { name: "deductionSec10BA", label: "Deduction u/s 10BA", type: "Amount", required: "Conditional" },
              { name: "totalChapterVIADeductions", label: "Total Deductions", type: "Amount", required: true, autoCalculated: true }
            ]
          },
          amtTaxComputation: {
            label: "Alternate Minimum Tax (Schedule AMT Framework)",
            fields: [
              { name: "totalIncomePartB_TI", ref: "1", label: "Total Income from Part B-TI", type: "Amount", required: true, autoCalculated: true },
              { name: "deductionClaimedChapterVIA_PartC", ref: "2a", label: "Deduction claimed u/s Chapter VI-A (Part C)", type: "Amount", required: true, autoCalculated: true },
              { name: "deductionClaimedSec10AA_AMT", ref: "2b", label: "Deduction claimed u/s 10AA", type: "Amount", required: true, autoCalculated: true },
              { name: "deductionClaimedSec35AD_MinusDepr", ref: "2c", label: "Deduction claimed u/s 35AD minus depreciation", type: "Amount", required: true, autoCalculated: true },
              { name: "totalAdjustmentAMT", ref: "2d", label: "Total Adjustment", type: "Amount", required: true, autoCalculated: true },
              { name: "adjustedTotalIncomeSec115JC", ref: "3", label: "Adjusted Total Income u/s 115JC(1) (1+2d)", type: "Amount", required: true, autoCalculated: true },
              { name: "adjustedTotalIncomeIfscUnits", ref: "3a", label: "From IFSC units", type: "Amount", required: true, autoCalculated: true },
              { name: "adjustedTotalIncomeOtherUnits", ref: "3b", label: "From other units (3–3a)", type: "Amount", required: true, autoCalculated: true },
              { name: "amtTaxLiability", ref: "4", label: "AMT Tax (9% of 3a + 18.5% of 3b) if 3 > ₹20 lakh", type: "Amount", required: true, autoCalculated: true }
            ]
          },
          exemptIncomeGrid: {
            label: "Schedule EI: Exempt Income Elements",
            fields: [
              { name: "exemptInterestIncome", label: "1. Interest income", type: "Amount", required: false },
              { name: "exemptDividendDomesticCompany", label: "2. Dividend from domestic company (≤ ₹10 lakh)", type: "Amount", required: false },
              { name: "exemptLtcgStt", label: "3. LTCG from STT transactions", type: "Amount", required: false },
              { name: "grossAgriculturalReceiptsEI", ref: "2(i)", label: "2(i) Gross Agricultural Receipts", type: "Amount", required: false },
              { name: "expenditureOnAgricultureEI", ref: "2(ii)", label: "2(ii) Expenditure on agriculture", type: "Amount", required: false },
              { name: "unabsorbedAgriculturalLossEI", ref: "2(iii)", label: "2(iii) Unabsorbed agricultural loss (8 AYs)", type: "Amount", required: false },
              { name: "agricultureIncomePortionRules", ref: "2(iv)", label: "2(iv) Agriculture income portion from Rules 7/7A/7B/8", type: "Amount", required: true, autoCalculated: true },
              { name: "netAgriculturalIncome", ref: "2(v)", label: "2(v) Net Agricultural Income", type: "Amount", required: true, autoCalculated: true },
              { name: "agriculturalLandGridTable", label: "Agricultural Land Details (If Net Income > ₹5 lakh)", type: "Table", maxRows: 4, columns: ["District", "PIN", "Acres", "Owned-Leased Dropdown", "Irrigated-Rain-fed Dropdown"], required: "Conditional" },
              { name: "shareProfitFirmAopBoi", ref: "5", label: "5. Share in profit of firm/AOP/BOI", type: "Amount", required: false },
              { name: "otherExemptIncomeGridTable", ref: "3", label: "3. Other exempt income table (Max 4)", type: "Table", columns: ["Category Dropdown", "Description", "Amount"], required: false },
              { name: "incomeNotChargeableDtaaGridTable", ref: "4", label: "4. Income claimed as not chargeable to tax per DTAA Table", type: "Table", columns: ["Country Dropdown", "Amount", "Nature", "DTAA Article", "Head of Income", "TRC Compliance Checkbox"], required: "Conditional", notes: "NR only table" },
              { name: "ptiExemptIncomeFromSchedule", ref: "5", label: "5. PTI claimed as not chargeable to tax (from Schedule PTI)", type: "Amount", required: true, autoCalculated: true },
              { name: "totalExemptIncomeFinal", ref: "6", label: "6. Total exempt income", type: "Amount", required: true, autoCalculated: true }
            ]
          },
          foreignSourceIncomeSummary: {
            label: "Schedules FSI & TR: Foreign Source Income & Relief Summaries",
            fields: [
              { name: "scheduleFSICountryBlocks", label: "Schedule FSI Multi-Block Registry (Max 4 Countries)", type: "Table", columns: ["Country Code Dropdown", "TIN", "Head: Salary", "Head: HP", "Head: Business or Profession", "Head: Capital Gains", "Head: Other Sources"], required: "Conditional", notes: "ITR-3 specific Business/Profession head included" },
              { name: "scheduleTRSummaryRows", label: "Schedule TR Summary Breakdown (Max 4 Countries)", type: "Table", columns: ["Country Code Dropdown", "TIN", "Tax paid outside India", "Tax payable in India", "Tax Relief", "DTAA Article"], required: "Conditional" }
            ]
          },
          tds2NonSalaryLedger: {
            label: "17.2 Schedule TDS2 (Form 16A Non-Salary Processing Matrix)",
            fields: [
              { name: "tds2TaxCreditsTable", label: "TDS2 Ledger Matrix Grid (Max 4 Rows)", type: "Table", columns: ["Sl.No.", "TDS Credit Type Dropdown", "PAN/Aadhaar of Other Person", "TAN of Deductor", "Section under TDS Dropdown", "FY of TDS Dropdown", "TDS b/f Balance", "Deducted Own Hands Amount", "Deducted Spouse/Other Amount", "Claimed Own Amount", "Claimed Spouse Amount", "Gross Amount", "Head of Income Dropdown"], required: "Conditional" }
            ]
          },
          tcsLedger: {
            label: "Schedule TCS: Tax Collected at Source",
            fields: [
              {
                name: "scheduleTCSCollected",
                label: "Schedule TCS: Tax Collected at Source (Form 27D Sourced)",
                type: "Table",
                required: false,
                columns: ["TAN of Collector", "Name of Collector", "Total TCS Collected", "TCS Credit Claimed Current Year"]
              }
            ]
          },
          advanceTaxLedger: {
            label: "Schedule IT: Advance Tax & Self-Assessment Tax Payments",
            fields: [
              {
                name: "scheduleITAdvanceSelfAssessment",
                label: "Challan Deposits Matrix",
                type: "Table",
                required: false,
                columns: ["BSR Code", "Date of Deposit", "Challan Serial Number", "Tax Paid Amount (₹)"]
              }
            ]
          }
        }
      },
      partB_TTI_AndUpdatedReturn: {
        label: "Section 18 & 21: Bank Verification, Final Computation (TTI) & ITR-U Layouts",
        fieldSections: {
          bankAccountsGrid: {
            label: "18.3 Bank Account Routing Matrix & Refund Selectors",
            fields: [
              { name: "hasBankAccountInIndia", label: "Bank Account in India?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "totalActiveAccountsCount", label: "Total savings + current accounts (excl. dormant)", type: "Number", required: true },
              { name: "primaryBankRow", label: "(a) Primary Account Setup Layout", type: "SubForm", fields: ["IFSC Lookup", "Bank Name", "Account No."], required: true },
              { name: "otherBankAccountsTable", label: "(b) Other Bank Accounts Grid Allocation", type: "Table", columns: ["IFSC Lookup", "Bank Name", "Account No.", "Account Type Dropdown", "Select for refund Checkbox"], required: true },
              { name: "foreignBankAccountRefundGrid", label: "Foreign bank account for NR refund layout", type: "Table", columns: ["SWIFT Code", "Bank Name", "Country Dropdown", "IBAN"], required: "Conditional" },
              { name: "hasForeignAssetsResidentDeclaration", label: "Foreign assets declaration (res. 14)", type: "Radio", required: true, notes: "Resident only; triggers Schedule FA" },
              { name: "trpDetailsBlock", label: "TRP Registry Fields", type: "SubForm", fields: ["TRP ID", "TRP Name", "Counter Signature", "Reimbursement amount"], required: false }
            ]
          },
          updatedReturnMetadata: {
            label: "21. Part A 139(8A) Updated Return Metadata (ITR-U Entry Point)",
            fields: [
              { name: "updatedPan", label: "(A1) PAN", type: "Text", required: true, autoCalculated: true },
              { name: "updatedName", label: "(A2) Name", type: "Text", required: true, autoCalculated: true },
              { name: "updatedAadhaarNumber", label: "(A3) Aadhaar Number", type: "Text", required: "Conditional" },
              { name: "updatedAadhaarEnrolmentId", label: "(A3a) Aadhaar Enrolment ID", type: "Text", required: "Conditional" },
              { name: "updatedAssessmentYear", label: "(A4) Assessment Year", type: "Dropdown", required: true, options: ["AY 2025-26", "Prior AYs up to 48 months"] },
              { name: "returnPreviouslyFiled", label: "(A5) Return previously filed?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "previouslyFiledUnderSection", label: "(A6) If Yes, filed u/s", type: "Dropdown", required: "Conditional", options: ["139(1)", "139(4)", "139(5)"] },
              { name: "previousReturnReceiptDetails", label: "(A7) Previous Return Core Identifiers", type: "SubForm", fields: ["ITR Type Dropdown", "Ack. No.", "Date"], required: "Conditional" },
              { name: "isEligibleUpdatedReturn", label: "(A8) Eligible for updated return?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "updatedItrForm", label: "(A9) ITR form", type: "Dropdown", required: true, defaultValue: "ITR3", disabled: true },
              { name: "reasonsForUpdating", label: "(A10) Reasons for updating", type: "Dropdown", required: true, notes: "Multi-select up to 2 items; 7 options available" },
              { name: "filingPeriodItrU", label: "(A11) Filing period", type: "Dropdown", required: true, options: ["Up to 12 months", "12–24 months", "24–36 months", "36–48 months"] },
              { name: "isReducingCflDeprTaxCredit", label: "(A12) Reducing CFL/depreciation/tax credit?", type: "Radio", required: true },
              { name: "ayRowsAffectedItrU", label: "(A12b) AY rows affected", type: "Table", columns: ["Assessment Year", "Rows Affected"], required: "Conditional" }
            ]
          },
          updatedReturnComputation: {
            label: "21. Part B-ATI: Updated Tax Calculation Summary Engine",
            fields: [
              { name: "additionalIncomePerHeadGrid", label: "1A-a to 1A-f Additional income per head matrix", type: "SubForm", fields: ["Salary", "HP", "BP", "CG", "OS", "Total Additional Income"], required: true, autoCalculated: true },
              { name: "totalIncomeLastValidReturn", label: "1B. Total Income as per last valid return", type: "Amount", required: true, autoCalculated: true },
              { name: "totalIncomePartB_TI_Current", label: "2. Total Income per Part B-TI", type: "Amount", required: true, autoCalculated: true },
              { name: "amountPayablePartB_TTI_Current", label: "3. Amount Payable from Part B-TTI", type: "Amount", required: true, autoCalculated: true },
              { name: "amountRefundablePartB_TTI_Current", label: "4. Amount Refundable from Part B-TTI", type: "Amount", required: true, autoCalculated: true },
              { name: "amountPayableLastValidReturn", label: "5. Amount payable per last valid return", type: "Amount", required: true, autoCalculated: true },
              { name: "refundTrackingLastValidReturn", label: "6i / 6ii Refund tracking block", type: "SubForm", fields: ["Refund claimed", "Total refund issued incl 244A interest"], required: true, autoCalculated: true },
              { name: "feeSec234F_ItrU", label: "7. Fee u/s 234F", type: "Amount", required: true, autoCalculated: true },
              { name: "regularAssessmentTaxItrU", label: "8. Regular Assessment Tax", type: "Amount", required: false },
              { name: "aggregateLiabilityItrU", label: "9i / 9ii Aggregate liability evaluation block", type: "Amount", required: true, autoCalculated: true },
              { name: "additionalIncomeTaxPercentage", label: "10. Additional income-tax calculation row", type: "Amount", required: true, autoCalculated: true, notes: "Calculated @ 25%/50%/60%/70% of (9-7)" },
              { name: "netAmountPayableItrU", label: "11. Net Amount Payable (9+10)", type: "Amount", required: true, autoCalculated: true },
              { name: "taxPaidSec140B", label: "12. Tax Paid u/s 140B (from payment table A)", type: "Amount", required: true, autoCalculated: true },
              { name: "taxDueFinalItrU", label: "13. Tax Due (11–12)", type: "Amount", required: true, autoCalculated: true },
              { name: "taxPaymentsSec140BTable", label: "14A. Tax payments u/s 140B Challan Table (Max 3 Rows)", type: "Table", columns: ["BSR Code", "Date of Deposit", "Challan Serial Number", "Amount"], required: "Conditional" },
              { name: "additionalTaxPaymentsTable", label: "14B. Prior Tax Clearances Unclaimed Grid (Max 2 Rows)", type: "Table", columns: ["Challan Reference", "Amount"], required: "Conditional", notes: "Advance Tax / SAT / Regular Assessment Tax not claimed earlier" },
              { name: "reliefClaimsSec89_90_91_ItrU", label: "15. Relief claims section", type: "Amount", required: false }
            ]
          }
        }
      }
    }
  }
};

export default itr3FieldConfig;

function mapFieldSection(fieldSection) {
  const normalFields = [];
  const extraSections = [];

  fieldSection.fields.forEach(field => {
    if (field.type === 'Table' || field.type === 'Matrix') {
      extraSections.push({
        title: field.label,
        description: field.notes,
        isList: true,
        listName: field.name,
        fields: (field.columns || []).map(col => ({
          name: typeof col === 'string' ? col.replace(/[^a-zA-Z0-9]/g, '') : (col.name || 'col'),
          label: typeof col === 'string' ? col : col.label,
          type: 'Text', // fallback
          required: false
        }))
      });
    } else if (field.type === 'FormProfile' || field.type === 'FormSubModule' || field.type === 'SubForm') {
      extraSections.push({
        title: field.label,
        description: field.notes,
        fields: (field.fields || []).map(subF => typeof subF === 'string' ? {name: subF.replace(/[^a-zA-Z0-9]/g, ''), label: subF, type: 'Text'} : subF)
      });
    } else {
      normalFields.push(field);
    }
  });

  const sections = [];
  if (normalFields.length > 0) {
    sections.push({
      title: fieldSection.label || fieldSection.title,
      fields: normalFields
    });
  }
  return [...sections, ...extraSections];
}

function mapSubsectionsToSections(subsections) {
  let allSections = [];
  if (!subsections) return allSections;
  Object.values(subsections).forEach(sub => {
    if (sub.fieldSections) {
      Object.values(sub.fieldSections).forEach(fs => {
        allSections = allSections.concat(mapFieldSection(fs));
      });
    }
  });
  return allSections;
}

export const individual3ConfigMapping = {
  details: {
    permanent: {
      title: itr3FieldConfig.profileAndGeneralInfo.label,
      sections: mapSubsectionsToSections({
        personalAndIdentity: {
          fieldSections: {
            personalIdentity: itr3FieldConfig.profileAndGeneralInfo.subsections.personalAndIdentity.fieldSections.personalIdentity,
            addressDetails: itr3FieldConfig.profileAndGeneralInfo.subsections.personalAndIdentity.fieldSections.addressDetails,
            contactDetails: itr3FieldConfig.profileAndGeneralInfo.subsections.personalAndIdentity.fieldSections.contactDetails
          }
        }
      })
    },
    karta: {
      title: itr3FieldConfig.profileAndGeneralInfo.label,
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            residentialStatus: itr3FieldConfig.profileAndGeneralInfo.subsections.personalAndIdentity.fieldSections.residentialStatus,
            taxRegime115BAC: itr3FieldConfig.profileAndGeneralInfo.subsections.filingAndRegimeCompliance.fieldSections.taxRegime115BAC
          }
        }
      })
    },
    members: {
      title: itr3FieldConfig.profileAndGeneralInfo.label,
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            filingMetadata: itr3FieldConfig.profileAndGeneralInfo.subsections.filingAndRegimeCompliance.fieldSections.filingMetadata,
            seventhProviso: itr3FieldConfig.profileAndGeneralInfo.subsections.filingAndRegimeCompliance.fieldSections.seventhProviso,
            representativeAssessee: itr3FieldConfig.profileAndGeneralInfo.subsections.filingAndRegimeCompliance.fieldSections.representativeAssessee
          }
        }
      })
    },
    additional: {
      title: itr3FieldConfig.profileAndGeneralInfo.label,
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            specialDisclosures: itr3FieldConfig.profileAndGeneralInfo.subsections.filingAndRegimeCompliance.fieldSections.specialDisclosures,
            statutoryBenefits: itr3FieldConfig.profileAndGeneralInfo.subsections.filingAndRegimeCompliance.fieldSections.statutoryBenefits,
            auditInformation: itr3FieldConfig.profileAndGeneralInfo.subsections.filingAndRegimeCompliance.fieldSections.auditInformation,
            businessClassification: itr3FieldConfig.businessAccountsAndSchedules.subsections.natureOfBusiness.fieldSections.businessClassification
          }
        }
      })
    }
  },
  income: {
    business: {
      title: itr3FieldConfig.headsOfIncomeComputation.subsections.scheduleBP_BusinessComputation.label,
      sections: mapSubsectionsToSections({
        scheduleBP_BusinessComputation: itr3FieldConfig.headsOfIncomeComputation.subsections.scheduleBP_BusinessComputation
      })
    },
    house_property: {
      title: itr3FieldConfig.headsOfIncomeComputation.subsections.scheduleHP_HouseProperty.label,
      sections: mapSubsectionsToSections({
        scheduleHP_HouseProperty: itr3FieldConfig.headsOfIncomeComputation.subsections.scheduleHP_HouseProperty
      })
    },
    other: {
      title: itr3FieldConfig.headsOfIncomeComputation.subsections.scheduleS_Salaries.label,
      sections: mapSubsectionsToSections({
        scheduleS_Salaries: itr3FieldConfig.headsOfIncomeComputation.subsections.scheduleS_Salaries
      })
    }
  },
  financials: {
    balance_sheet: {
      title: itr3FieldConfig.businessAccountsAndSchedules.subsections.balanceSheet.label,
      sections: mapSubsectionsToSections({
        balanceSheet: itr3FieldConfig.businessAccountsAndSchedules.subsections.balanceSheet
      })
    },
    profit_loss: {
      title: itr3FieldConfig.businessAccountsAndSchedules.subsections.manufacturingTradingPL.label,
      sections: mapSubsectionsToSections({
        manufacturingTradingPL: itr3FieldConfig.businessAccountsAndSchedules.subsections.manufacturingTradingPL,
        auditOtherAndQuantativeDetails: itr3FieldConfig.businessAccountsAndSchedules.subsections.auditOtherAndQuantativeDetails
      })
    }
  },
  deductions: {
    chapter6a: {
      title: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.chapterVIA_Deductions.label,
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            chapterVIA_Deductions: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.chapterVIA_Deductions,
            amtTaxComputation: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.amtTaxComputation
          }
        }
      })
    },
    exempt_income: {
      title: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.exemptIncomeGrid.label,
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            exemptIncomeGrid: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.exemptIncomeGrid,
            foreignSourceIncomeSummary: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.foreignSourceIncomeSummary
          }
        }
      })
    }
  },
  taxes: {
    tds: {
      title: "Tax Deducted at Source",
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            tds2NonSalaryLedger: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.tds2NonSalaryLedger
          }
        }
      })
    },
    tcs: {
      title: "Tax Collected at Source",
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            tcsLedger: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.tcsLedger
          }
        }
      })
    },
    advance_tax: {
      title: "Advance Tax",
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            advanceTaxLedger: itr3FieldConfig.globalTaxComputationAndVerification.subsections.deductionsAndSchedules.fieldSections.advanceTaxLedger
          }
        }
      })
    }
  },
  filing: {
    bank: {
      title: itr3FieldConfig.globalTaxComputationAndVerification.subsections.partB_TTI_AndUpdatedReturn.fieldSections.bankAccountsGrid.label,
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            bankAccountsGrid: itr3FieldConfig.globalTaxComputationAndVerification.subsections.partB_TTI_AndUpdatedReturn.fieldSections.bankAccountsGrid
          }
        }
      })
    },
    efiling: {
      title: "E-Filing & Verification",
      sections: mapSubsectionsToSections({
        mixed: {
          fieldSections: {
            updatedReturnMetadata: itr3FieldConfig.globalTaxComputationAndVerification.subsections.partB_TTI_AndUpdatedReturn.fieldSections.updatedReturnMetadata,
            updatedReturnComputation: itr3FieldConfig.globalTaxComputationAndVerification.subsections.partB_TTI_AndUpdatedReturn.fieldSections.updatedReturnComputation
          }
        }
      })
    }
  }
};