// // const itr2FieldConfig = {
// //   partAGeneral: {
// //     // title: "",  
// //     subsections: {
// //       personalAndContact: {
// //         title: "Personal Identity & Contact Profiles",
// //         fieldSections: {
// //           personalIdentity: {
// //             title: "Personal Identity",
// //             fields: [
// //               { name: "firstName", label: "First Name", type: "Text", required: true, validation: "Alpha only, max 75 chars" },
// //               { name: "middleName", label: "Middle Name", type: "Text", required: false, validation: "Alpha only" },
// //               { name: "lastName", label: "Last Name", type: "Text", required: true, validation: "Alpha only" },
// //               { name: "pan", label: "PAN", type: "Text", required: true, validation: "Format: AAAAA0000A" },
// //               { name: "status", label: "Status (I / H)", type: "Dropdown", required: true, options: ["I – Individual", "H – HUF"] },
// //               { name: "dobFormationDate", label: "Date of Birth / Formation", type: "Date", required: true },
// //               { name: "aadhaarNumber", label: "Aadhaar Number", type: "Text", required: "Conditional", validation: "12 digits, required for Individual if allotted" },
// //               { name: "aadhaarEnrolmentId", label: "Aadhaar Enrolment ID", type: "Text", required: "Conditional", validation: "28 digits, required if Aadhaar not allotted" },
// //               { name: "passportNumber", label: "Passport Number (Individual)", type: "Text", required: false },
// //               { name: "isFpi", label: "Whether you are an FPI?", type: "Dropdown", required: false, options: ["Yes", "No"] },
// //               { name: "sebiRegNumber", label: "SEBI Registration Number", type: "Text", required: "Conditional", dependOn: { field: "isFpi", value: "Yes" } }
// //             ]
// //           },
// //           residentialStatus: {
// //             title: "Residential Status & Jurisdictions",
// //             fields: [
// //               { name: "residentialStatus", label: "Residential Status in India", type: "Dropdown", required: true, options: ["RES – Resident", "NRI – Non Resident", "NOR – Resident but not Ordinarily Resident"] },
// //               { name: "residentialConditions", label: "Conditions for Residential Status", type: "Dropdown", required: "Conditional", notes: "Sub-options for 182 days rule, 60 days rule, 120-day citizen rule, etc." },
// //               { 
// //                 name: "foreignJurisdictions", 
// //                 label: "Jurisdiction(s) of Residence & TIN", 
// //                 type: "Table", 
// //                 required: "Conditional", 
// //                 columns: [
// //                   { name: "country", label: "Country", type: "Dropdown" },
// //                   { name: "tin", label: "Taxpayer Identification Number (TIN)", type: "Text" }
// //                 ]
// //               },
// //               { name: "stayPeriodPreviousYear", label: "Total period of stay in India during previous year (days)", type: "Number", required: "Conditional" },
// //               { name: "stayPeriodPrecedingYears", label: "Total period of stay in India during 4 preceding years (days)", type: "Number", required: "Conditional" },
// //               { name: "hasPeInIndia", label: "In case of non-resident: permanent establishment (PE) in India?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
// //               { name: "claim115HBenefit", label: "Do you want to claim benefit u/s 115H (Resident)?", type: "Radio", required: "Conditional", options: ["Yes", "No"] }
// //             ]
// //           },
// //           addressDetails: {
// //             title: "Primary & Secondary Addresses",
// //             fields: [
// //               { name: "primaryFlatDoorBlock", label: "Flat / Door / Block No. (Primary)", type: "Text", required: true },
// //               { name: "primaryPremisesBuilding", label: "Name of Premises / Building / Village (Primary)", type: "Text", required: false },
// //               { name: "primaryRoadStreet", label: "Road / Street / Post Office (Primary)", type: "Text", required: false },
// //               { name: "primaryAreaLocality", label: "Area / Locality (Primary)", type: "Text", required: false },
// //               { name: "primaryTownCityDistrict", label: "Town / City / District (Primary)", type: "Text", required: true },
// //               { name: "primaryState", label: "State (Primary)", type: "Dropdown", required: true, validation: "37 states/UTs + Foreign 99" },
// //               { name: "primaryCountry", label: "Country / Region (Primary)", type: "Dropdown", required: true, default: "91-INDIA" },
// //               { name: "primaryPinCode", label: "PIN Code (Primary)", type: "Text", required: "Conditional", validation: "6 digits for Indian address" },
// //               { name: "primaryZipCode", label: "ZIP Code (Primary)", type: "Text", required: "Conditional" },
// //               { name: "isSecondarySame", label: "Is the secondary address same as primary address?", type: "Dropdown", required: true, options: ["Yes", "No"] },
// //               // Secondary Address Block conditional fields mapped dynamically in rendering engine
// //               { name: "secondaryFlatDoorBlock", label: "Flat / Door / Block No. (Secondary)", type: "Text", required: "Conditional" },
// //               { name: "secondaryPremisesBuilding", label: "Name of Premises / Building / Village (Secondary)", type: "Text", required: false },
// //               { name: "secondaryRoadStreet", label: "Road / Street / Post Office (Secondary)", type: "Text", required: false },
// //               { name: "secondaryAreaLocality", label: "Area / Locality (Secondary)", type: "Text", required: false },
// //               { name: "secondaryTownCityDistrict", label: "Town / City / District (Secondary)", type: "Text", required: "Conditional" },
// //               { name: "secondaryState", label: "State (Secondary)", type: "Dropdown", required: "Conditional" },
// //               { name: "secondaryCountry", label: "Country / Region (Secondary)", type: "Dropdown", required: "Conditional" },
// //               { name: "secondaryPinCode", label: "PIN Code (Secondary)", type: "Text", required: "Conditional" },
// //               { name: "secondaryZipCode", label: "ZIP Code (Secondary)", type: "Text", required: "Conditional" }
// //             ]
// //           },
// //           contactDetails: {
// //             title: "Contact Details",
// //             fields: [
// //               { name: "primaryEmail", label: "Primary Email ID", type: "Email", required: true },
// //               { name: "secondaryEmail", label: "Secondary Email ID", type: "Email", required: false },
// //               { name: "primaryMobile", label: "Primary Mobile No.", type: "Tel", required: true, validation: "10-digit with auto +91 country code" },
// //               { name: "stdIsdCode", label: "STD/ISD Code", type: "Text", required: false },
// //               { name: "landlinePhone", label: "Residential/Office Phone Number", type: "Tel", required: false },
// //               { name: "secondaryMobile", label: "Secondary Mobile No.", type: "Tel", required: false }
// //             ]
// //           }
// //         }
// //       },
// //       filingRegimeDisclosures: {
// //         title: "Filing Status, Regime & Disclosures",
// //         fieldSections: {
// //           taxRegimeSelection: {
// //             title: "Tax Regime Selection",
// //             fields: [
// //               { name: "optOutNewRegime", label: "Opt out of New Tax Regime u/s 115BAC(6)?", type: "Dropdown", required: true, options: ["Continue to opt", "Opt out", "Not opting", "Opting in now", "Old"], default: "New Regime" },
// //               { name: "form10IeFilingDate", label: "Date of filing of Form 10-IE", type: "Date", required: "Conditional", dependOn: { field: "optOutNewRegime", value: "Opt out" } },
// //               { name: "form10IeAckNo", label: "Acknowledgement number of Form 10-IE", type: "Text", required: "Conditional", dependOn: { field: "optOutNewRegime", value: "Opt out" } }
// //             ] 
// //           },
// //           filingDetails: {
// //             title: "Filing Details & Return Type",
// //             fields: [
// //               { name: "filedUnderSection", label: "Filed u/s (Section)", type: "Dropdown", required: true, options: ["139(1)-On or before due date", "139(4)-Belated", "139(5)-Revised", "92CD-Modified", "119(2)(b)", "139(8A)", "139(9)", "142(1)", "148", "153A", "153C"] },
// //               { name: "noticeResponseSection", label: "Filed in response to notice u/s", type: "Dropdown", required: "Conditional", options: ["139(9)", "142(1)", "148", "153C", "153A"] },
// //               { name: "receiptNo", label: "Receipt no.", type: "Text", required: "Conditional", notes: "Show when 139(5)/139(9)/defective return" },
// //               { name: "originalReturnFilingDate", label: "Date of filing of Original Return", type: "Date", required: "Conditional" },
// //               { name: "uniqueNumberDin", label: "Unique Number / DIN", type: "Text", required: "Conditional", notes: "For notice-response filings" },
// //               { name: "noticeOrderDate", label: "Date of such Notice/Order", type: "Date", required: "Conditional" },
// //               { name: "dueDate139_1", label: "Due Date u/s 139(1)", type: "Date", required: "Auto", prefilled: "31/07/2026" }
// //             ]
// //           },
// //           seventhProviso: {
// //             title: "Seventh Proviso to Section 139(1)",
// //             fields: [
// //               { name: "isFilingSeventhProviso", label: "Filing under Seventh Proviso?", type: "Dropdown", required: true, options: ["Yes", "No"] },
// //               { name: "depositedAmountCurrentAcc", label: "Deposited > ₹1 Crore in current account(s)?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
// //               { name: "foreignTravelExpense", label: "Incurred > ₹2 lakh on foreign travel?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
// //               { name: "electricityExpense", label: "Incurred > ₹1 lakh on electricity?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
// //               { name: "salesTurnoverExceedLimit", label: "Sales/turnover > ₹60 lakh?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
// //               { name: "profReceiptsExceedLimit", label: "Gross receipts in profession > ₹10 lakh?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
// //               { name: "tdsTcsExceedLimit", label: "TDS+TCS ≥ ₹25,000 (or ₹50,000 senior citizen)?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
// //               { name: "savingsDepositExceedLimit", label: "Savings bank deposits ≥ ₹50 lakh?", type: "Radio", required: "Conditional", options: ["Yes", "No"] }
// //             ]
// //           },
// //           representativeAssessee: {
// //             title: "Representative Assessee",
// //             fields: [
// //               { name: "isRepresentativeAssessee", label: "Filed by representative assessee?", type: "Dropdown", required: true, options: ["Yes", "No"] },
// //               { name: "representativeName", label: "Name of Representative", type: "Text", required: "Conditional" },
// //               { name: "representativeEmail", label: "E-mail ID of Representative", type: "Email", required: "Conditional" },
// //               { name: "representativeContact", label: "Contact Number of Representative", type: "Tel", required: "Conditional" },
// //               { name: "representativeCapacity", label: "Capacity of Representative", type: "Dropdown", required: "Conditional", options: ["Legal Heir", "Manager", "Guardian", "Other"] },
// //               { name: "representativeAddress", label: "Address of Representative", type: "Text", required: "Conditional" },
// //               { name: "representativePan", label: "PAN of Representative", type: "Text", required: "Conditional" },
// //               { name: "representativeAadhaar", label: "Aadhaar Number of Representative", type: "Text", required: false, validation: "12 digits" }
// //             ]
// //           },
// //           specialDisclosures: {
// //             title: "Special Entity Disclosures",
// //             fields: [
// //               { name: "isPartnerInFirm", label: "Whether Partner in a Firm?", type: "Dropdown", required: true, options: ["Yes", "No"] },
// //               { name: "firmName", label: "Name of Firm", type: "Text", required: "Conditional" },
// //               { name: "firmPan", label: "PAN of Firm", type: "Text", required: "Conditional" },
// //               { name: "isPortugueseCivilCode", label: "Governed by Portuguese Civil Code (Section 5A)?", type: "Dropdown", required: true, options: ["Yes", "No"], notes: "Enables Schedule 5A" },
// //               { name: "leiNumber", label: "LEI Number", type: "Text", required: "Conditional", notes: "Mandatory if refund ≥ ₹50 crore" },
// //               { name: "leiValidUpto", label: "Valid Upto Date", type: "Date", required: "Conditional" }
// //             ]
// //           }
// //         }
// //       },
// //       corporateDisclosures: {
// //         title: "Corporate Disclosures (Tables)",
// //         fieldSections: {
// //           directorshipTable: {
// //             title: "Directorship Table",
// //             fields: [
// //               {
// //                 name: "directorships",
// //                 label: "Directorship Details",
// //                 type: "Table",
// //                 required: false,
// //                 columns: [
// //                   { name: "companyName", label: "Name of Company", type: "Text" },
// //                   { name: "companyType", label: "Type of Company", type: "Dropdown" },
// //                   { name: "companyPan", label: "PAN of Company", type: "Text" },
// //                   { name: "shareListingStatus", label: "Whether shares listed or unlisted", type: "Dropdown", options: ["Listed", "Unlisted"] },
// //                   { name: "din", label: "Director Identification Number (DIN)", type: "Text" }
// //                 ]
// //               }
// //             ]
// //           },
// //           unlistedSharesTable: {
// //             title: "Unlisted Equity Shares Table",
// //             fields: [
// //               {
// //                 name: "unlistedShares",
// //                 label: "Unlisted Equity Shares Details",
// //                 type: "Table",
// //                 required: false,
// //                 columns: [
// //                   { name: "companyName", label: "Name of Company", type: "Text" },
// //                   { name: "companyType", label: "Type of Company", type: "Text" },
// //                   { name: "companyPan", label: "PAN", type: "Text" },
// //                   { name: "openingNoOfShares", label: "Opening Balance — No. of Shares", type: "Number" },
// //                   { name: "openingCostOfAcquisition", label: "Opening Balance — Cost of Acquisition (₹)", type: "Amount" },
// //                   { name: "sharesAcquiredNo", label: "Shares Acquired — No.", type: "Number" },
// //                   { name: "acquisitionDate", label: "Date of Subscription/Purchase", type: "Date" },
// //                   { name: "faceValuePerShare", label: "Face Value per Share (₹)", type: "Amount" },
// //                   { name: "issuePricePerShare", label: "Issue Price per Share (fresh issue) (₹)", type: "Amount" },
// //                   { name: "purchasePricePerShare", label: "Purchase Price per Share (₹)", type: "Amount" },
// //                   { name: "sharesTransferredNo", label: "Shares Transferred — No.", type: "Number" },
// //                   { name: "saleConsideration", label: "Sale Consideration (₹)", type: "Amount" },
// //                   { name: "closingNoOfShares", label: "Closing Balance — No. of Shares", type: "Auto", logic: "openingNoOfShares + sharesAcquiredNo - sharesTransferredNo" },
// //                   { name: "closingCostOfAcquisition", label: "Closing Balance — Cost of Acquisition (₹)", type: "Auto" }
// //                 ]
// //               }
// //             ]
// //           }
// //         }
// //       }
// //     }
// //   },

// //   // ==========================================
// //   // MAIN SECTION 2: SCHEDULE S — INCOME FROM SALARY
// //   // ==========================================
// //   scheduleSalary: {
// //     title: "Schedule S: Income from Salary",
// //     subsections: {
// //       employerIdentification: {
// //         title: "Employer Identification & Base Form",
// //         fieldSections: {
// //           employerDetails: {
// //             title: "Employer Details (Repeatable Matrix)",
// //             fields: [
// //               {
// //                 name: "employers",
// //                 label: "Employer Ledger Records",
// //                 type: "Table",
// //                 required: true,
// //                 maxRows: 3,
// //                 columns: [
// //                   { name: "employerName", label: "Name of Employer", type: "Text" },
// //                   { name: "employerNature", label: "Nature of Employer", type: "Dropdown", options: ["Central Government", "State Government", "Public Sector Undertaking", "CG-Pensioners", "SG-Pensioners", "PSU-Pensioners", "Others-Pensioners", "Others"] },
// //                   { name: "employerTan", label: "TAN of Employer", type: "Text", validation: "Required if tax is deducted" },
// //                   { name: "employerAddress", label: "Address of Employer", type: "Text" },
// //                   { name: "employerTownCity", label: "Town / City", type: "Text" },
// //                   { name: "employerState", label: "State", type: "Dropdown" },
// //                   { name: "employerPin", label: "PIN Code", type: "Text" },
// //                   { name: "employerZip", label: "ZIP Code", type: "Text" }
// //                 ]
// //               }
// //             ]
// //           }
// //         }
// //       },
// //       structuralIncomeBreakdown: {
// //         title: "Structural Income Breakdowns & Deductions",
// //         fieldSections: {
// //           grossSalaryElements: {
// //             title: "Gross Salary Elements (Section 17)",
// //             fields: [
// //               {
// //                 name: "salarySec17_1",
// //                 label: "Salary as per Section 17(1)",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "nature", label: "Nature", type: "Dropdown", options: ["Basic Salary", "DA", "HRA", "LTA", "Other Allowance", "Any Other"] },
// //                   { name: "description", label: "Description", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               {
// //                 name: "perquisitesSec17_2",
// //                 label: "Value of Perquisites u/s 17(2)",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "nature", label: "Nature", type: "Dropdown", options: ["Accommodation", "Cars", "Gas-electricity-water", "Gifts", "Free meals", "Club expenses", "ESOP", "Stock options", "Contribution u/s 17(2)(vii)", "Other benefits"] },
// //                   { name: "description", label: "Description", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               {
// //                 name: "profitsInLieuSec17_3",
// //                 label: "Profit in lieu of Salary u/s 17(3)",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "nature", label: "Nature", type: "Dropdown", options: ["Compensation on termination", "Keyman Insurance", "Any amount before joining", "Any other"] },
// //                   { name: "description", label: "Description", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               {
// //                 name: "retirementAccountNotified89A",
// //                 label: "Income from Retirement Benefit Account — Notified Country u/s 89A",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "country", label: "Country", type: "Dropdown", options: ["Canada", "UK", "USA"] },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               { name: "retirementAccountNonNotified89A", label: "Income from Retirement Benefit Account — Non-Notified Country u/s 89A", type: "Amount", required: false },
// //               { name: "relief89AClaimedEarlier", label: "Income taxable this year on which relief u/s 89A claimed earlier", type: "Amount", required: false },
// //               { name: "totalGrossSalaryCalculated", label: "Gross Salary (1a+1b+1c+1d+1e+1f)", type: "Auto" }
// //             ]
// //           },
// //           aggregationsAndDeductions: {
// //             title: "Aggregations & Deductions",
// //             fields: [
// //               { name: "combinedGrossSalaryAllEmployers", label: "Total Gross Salary (all employers combined)", type: "Auto" },
// //               { name: "lessRelief89A", label: "Less: Income claimed for relief u/s 89A", type: "Auto" },
// //               {
// //                 name: "exemptAllowancesSec10",
// //                 label: "Less: Allowances exempt u/s 10",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "nature", label: "Nature", type: "Dropdown", options: ["Sec 10(5)", "Sec 10(6)", "Sec 10(7)", "Sec 10(10)", "Sec 10(10A)", "Sec 10(10AA)", "Sec 10(10B)", "Sec 10(10C)", "Sec 10(10CC)", "Sec 10(14)(i)", "Sec 10(14)(ii)", "Sec 10(16)", "Sec 10(17)", "Sec 10(17A)", "Sec 10(18)", "Sec 10(19)", "Sec 10(26)", "Sec 10(26AAA)", "Sec 10(12C) Agniveer", "Any Other"] },
// //                   { name: "description", label: "Description", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               { name: "exemptHraSec10_13A", label: "HRA exempt u/s 10(13A)", type: "Auto", source: "hraSubForm.eligibleExemptHra" },
// //               { name: "netSalary", label: "Net Salary", type: "Auto" },
// //               { name: "standardDeduction16_ia", label: "Standard Deduction u/s 16(ia)", type: "Auto" },
// //               { name: "entertainmentAllowance16_ii", label: "Entertainment Allowance u/s 16(ii)", type: "Amount", notes: "Government employees only" },
// //               { name: "professionalTax16_iii", label: "Professional Tax u/s 16(iii)", type: "Amount" },
// //               { name: "totalDeductionsSec16", label: "Total Deductions u/s 16", type: "Auto" },
// //               { name: "incomeChargeableSalaries", label: "Income chargeable under 'Salaries'", type: "Auto" }
// //             ]
// //           },
// //           hraSubForm: {
// //             title: "House Rent Allowance (HRA) Sub-Form",
// //             fields: [
// //               { name: "placeOfResidence", label: "Place of Residence", type: "Dropdown", options: ["Metro City", "Non-Metro City"] },
// //               { name: "actualHraReceived", label: "Actual HRA Received (A) (₹)", type: "Amount", required: true },
// //               { name: "actualRentPaid", label: "Actual Rent Paid (₹)", type: "Amount", required: true },
// //               { name: "salaryBasicPlusDa", label: "Details of Salary u/s 17(1) — Basic + DA", type: "Amount", required: true },
// //               { name: "rentPaidLessTenPercentSalary", label: "Actual Rent Paid – 10% of Salary (B)", type: "Auto" },
// //               { name: "salaryPercentageCap", label: "50% / 40% of Salary (C)", type: "Auto" },
// //               { name: "eligibleExemptHra", label: "Eligible Exempt HRA = Min(A, B, C)", type: "Auto" }
// //             ]
// //           }
// //         }
// //       }
// //     }
// //   },

// //   // ==========================================
// //   // MAIN SECTION 3: SCHEDULE HP — INCOME FROM HOUSE PROPERTY
// //   // ==========================================
// //   scheduleHouseProperty: {
// //     title: "Schedule HP: Income from House Property",
// //     subsections: {
// //       profileAndComputations: {
// //         title: "Profile & Structural Computations",
// //         fieldSections: {
// //           propertyProfile: {
// //             title: "Property Address & Profile (Max 2 Properties)",
// //             fields: [
// //               {
// //                 name: "properties",
// //                 label: "Property Profiles Block",
// //                 type: "Table",
// //                 maxRows: 2,
// //                 columns: [
// //                   { name: "address", label: "Address", type: "Text" },
// //                   { name: "townCity", label: "Town / City", type: "Text" },
// //                   { name: "state", label: "State", type: "Dropdown" },
// //                   { name: "country", label: "Country", type: "Dropdown", default: "91-INDIA" },
// //                   { name: "pinCode", label: "PIN Code", type: "Text" },
// //                   { name: "zipCode", label: "ZIP Code", type: "Text" },
// //                   { name: "propertyOwner", label: "Owner of the Property", type: "Dropdown", options: ["Self", "Co-owner"] },
// //                   { name: "isCoOwned", label: "Is the property co-owned?", type: "Dropdown", options: ["Yes", "No"] },
// //                   { name: "percentageShare", label: "Your percentage share in property (%)", type: "Number", validation: "0–100, 2 decimals" }
// //                 ]
// //               }
// //             ]
// //           },
// //           computationEngine: {
// //             title: "Income Computation Engine",
// //             fields: [
// //               { name: "typeOfProperty", label: "Type of House Property", type: "Dropdown", options: ["Self-Occupied", "Let Out", "Deemed Let Out"] },
// //               { name: "grossRentReceivable", label: "Gross rent received / receivable / lettable value", type: "Amount", required: "Conditional" },
// //               { name: "unrealizedRent", label: "Amount of rent which cannot be realized", type: "Amount" },
// //               { name: "localAuthorityTaxes", label: "Tax paid to local authorities", type: "Amount" },
// //               { name: "totalTaxesUnrealizedRent", label: "Total (b + c)", type: "Auto" },
// //               { name: "annualValue", label: "Annual Value (a – d)", type: "Auto" },
// //               { name: "annualValueOwnedShare", label: "Annual Value owned (% share × e)", type: "Auto" },
// //               { name: "standardDeduction30Percent", label: "30% of Annual Value", type: "Auto" },
// //               { name: "interestBorrowedCapital", label: "Interest on borrowed capital u/s 24(b)", type: "Auto", notes: "Max ₹2 lakh if Self-Occupied" },
// //               { name: "totalHpDeductions", label: "Total deductions (g + h)", type: "Auto" },
// //               { name: "arrearsRentReceived", label: "Arrears/Unrealised Rent received (less 30%)", type: "Amount" },
// //               { name: "incomeFromHouseProperty", label: "Income from House Property (f – i + j)", type: "Auto" },
// //               { name: "passThroughIncomeHp", label: "Pass Through Income/Loss from HP", type: "Amount", source: "schedulePti.hpIncome" },
// //               { name: "totalIncomeHouseProperty", label: "Total Income under 'House Property'", type: "Auto" }
// //             ]
// //           }
// //         }
// //       },
// //       linkedStakeholders: {
// //         title: "Linked Stakeholder Tables",
// //         fieldSections: {
// //           coOwnerDetails: {
// //             title: "Co-Owner Details Table",
// //             fields: [
// //               {
// //                 name: "coOwners",
// //                 label: "Co-Owner Records",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "name", label: "Name of Other Co-owner(s)", type: "Text" },
// //                   { name: "pan", label: "PAN of Other Co-owner(s)", type: "Text" },
// //                   { name: "aadhaar", label: "Aadhaar No. of Other Co-owner(s)", type: "Text" },
// //                   { name: "sharePercentage", label: "Percentage share (%)", type: "Number" }
// //                 ]
// //               }
// //             ]
// //           },
// //           tenantDetails: {
// //             title: "Tenant Details Table",
// //             fields: [
// //               {
// //                 name: "tenants",
// //                 label: "Tenant Records",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "name", label: "Name(s) of Tenant", type: "Text" },
// //                   { name: "pan", label: "PAN of Tenant", type: "Text" },
// //                   { name: "aadhaar", label: "Aadhaar No. of Tenant", type: "Text" },
// //                   { name: "tanPanTenant", label: "PAN/TAN of Tenant", type: "Text", notes: "Required if TDS credit claimed u/s 194-IB/194-I" }
// //                 ]
// //               }
// //             ]
// //           },
// //           loanInterestTable: {
// //             title: "Section 24(b) Loan Interest Table",
// //             fields: [
// //               {
// //                 name: "loans",
// //                 label: "Property Loan Records",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "loanSource", label: "Loan taken from", type: "Dropdown", options: ["Bank", "Institution", "Person"] },
// //                   { name: "lenderName", label: "Name of Bank / Institution / Person", type: "Text" },
// //                   { name: "loanAccountNo", label: "Loan Account Number", type: "Text" },
// //                   { name: "sanctionDate", label: "Date of Sanction", type: "Date" },
// //                   { name: "totalLoanAmount", label: "Total Amount of Loan (₹)", type: "Amount" },
// //                   { name: "outstandingAmount", label: "Loan Outstanding at FY end (₹)", type: "Amount" },
// //                   { name: "interestAmount", label: "Interest on Borrowed Capital u/s 24(b) (₹)", type: "Amount" }
// //                 ]
// //               }
// //             ]
// //           }
// //         }
// //       }
// //     }
// //   },

// //   // ==========================================
// //   // MAIN SECTION 4: SCHEDULE CG & VDA — CAPITAL GAINS LEDGER
// //   // ==========================================
// //   scheduleCapitalGains: {
// //     title: "Schedule CG & VDA: Capital Gains Ledger",
// //     subsections: {
// //       shortTermCapitalGains: {
// //         title: "Short-Term Capital Gains (STCG)",
// //         fieldSections: {
// //           stcgImmovableProperty: {
// //             title: "STCG — A1: Immovable Property",
// //             fields: [
// //               { name: "immovAcquisitionDate", label: "Date of Purchase/Acquisition", type: "Date" },
// //               { name: "immovSaleDate", label: "Date of Sale/Transfer", type: "Date" },
// //               { name: "considerationReceived", label: "Full Value of Consideration received/receivable", type: "Amount" },
// //               { name: "stampValuationAuthorityValue", label: "Value of property as per Stamp Valuation Authority", type: "Amount" },
// //               { name: "fullValueAdoptedSec50C", label: "Full Value adopted as per Sec 50C", type: "Auto" },
// //               { name: "costOfAcquisitionNoIndex", label: "Cost of Acquisition without indexation", type: "Amount" },
// //               { name: "costOfImprovementNoIndex", label: "Cost of Improvement without indexation", type: "Amount" },
// //               { name: "transferExpenditure", label: "Expenditure in connection with transfer", type: "Amount" },
// //               { name: "totalCostMatrix", label: "Total Cost Matrix (bi+bii+biii)", type: "Auto" },
// //               { name: "balanceConsiderationLessCost", label: "Balance (aiii – biv)", type: "Auto" },
// //               { name: "deductionSec54B", label: "Deduction u/s 54B", type: "Amount" },
// //               { name: "stcgImmovablePropertyFinal", label: "STCG on Immovable Property", type: "Auto" },
// //               {
// //                 name: "buyerDetails",
// //                 label: "Buyer Details Block Table",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "name", label: "Name", type: "Text" },
// //                   { name: "pan", label: "PAN", type: "Text" },
// //                   { name: "aadhaar", label: "Aadhaar", type: "Text" },
// //                   { name: "sharePercentage", label: "% Share", type: "Number" },
// //                   { name: "amount", label: "Amount", type: "Amount" },
// //                   { name: "address", label: "Property Address", type: "Text" },
// //                   { name: "state", label: "State", type: "Dropdown" },
// //                   { name: "country", label: "Country", type: "Dropdown" },
// //                   { name: "pinCode", label: "Pin Code", type: "Text" },
// //                   { name: "zipCode", label: "ZIP Code", type: "Text" }
// //                 ]
// //               }
// //             ]
// //           },
// //           stcgSlumpSaleAndEquity: {
// //             title: "STCG — A2: Slump Sale & Equity Shares (u/s 111A)",
// //             fields: [
// //               { name: "fmvRule11Uae_2", label: "Fair Market Value u/s Rule 11UAE(2)", type: "Amount" },
// //               { name: "fmvRule11Uae_3", label: "Fair Market Value u/s Rule 11UAE(3)", type: "Amount" },
// //               { name: "considerationSlumpSale", label: "Full Value of Consideration (Slump Sale)", type: "Auto" },
// //               { name: "netWorthUndertaking", label: "Net Worth of undertaking/division", type: "Amount" },
// //               { name: "stcgSlumpSaleFinal", label: "STCG from Slump Sale", type: "Auto" },
// //               { name: "considerationSec111A", label: "Full Value of Consideration (Sec 111A)", type: "Amount" },
// //               { name: "costOfAcquisitionSec111A", label: "Cost of Acquisition without indexation (Sec 111A)", type: "Amount" },
// //               { name: "costOfImprovementSec111A", label: "Cost of Improvement without indexation (Sec 111A)", type: "Amount" },
// //               { name: "transferExpenditureSec111A", label: "Expenditure in connection with transfer (Sec 111A)", type: "Amount" },
// //               { name: "totalDeductionsSec111A", label: "Total Deductions (Sec 111A)", type: "Auto" },
// //               { name: "balanceSec111A", label: "Balance (ia – ibiv)", type: "Auto" },
// //               { name: "lossDisallowedSec94_7_8", label: "Loss disallowed u/s 94(7) or 94(8)", type: "Amount" },
// //               { name: "stcgEquityPost23Jul2024", label: "STCG on Equity/STT-paid (Transfers on/after 23 Jul 2024)", type: "Auto", notes: "Taxed @ 20%" },
// //               { name: "stcgEquityPre23Jul2024", label: "STCG on Equity/STT-paid (Transfers before 23 Jul 2024)", type: "Auto", notes: "Taxed @ 15%" }
// //             ]
// //           },
// //           stcgNonResidentFii: {
// //             title: "STCG — A3 & A4: Non-Resident & FII Asset Provisioning",
// //             fields: [
// //               { name: "stcgSec111APre23Jul2024Nr", label: "STCG u/s 111A — before 23 Jul 2024 (Non-Resident)", type: "Amount" },
// //               { name: "stcgSec111APost23Jul2024Nr", label: "STCG u/s 111A — on/after 23 Jul 2024 (Non-Resident)", type: "Amount" },
// //               { name: "stcgOtherSharesNr", label: "STCG from shares/debentures not in 3a", type: "Amount" },
// //               { name: "considerationUnquotedFii", label: "Full Value of Consideration — unquoted shares (FII u/s 115AD)", type: "Amount" },
// //               { name: "fmvUnquotedFii", label: "Fair Market Value of unquoted shares (FII)", type: "Amount" },
// //               { name: "higherConsiderationFmvSec50CA", label: "Higher of consideration or FMV (Sec 50CA)", type: "Auto" },
// //               { name: "considerationOtherThanUnquotedFii", label: "Full Value of Consideration — other than unquoted (FII)", type: "Amount" },
// //               { name: "totalValuationConsiderationFii", label: "Total Valuation Consideration", type: "Auto" },
// //               { name: "costOfAcquisitionFii", label: "Cost of Acquisition (FII)", type: "Amount" },
// //               { name: "costOfImprovementFii", label: "Cost of Improvement (FII)", type: "Amount" },
// //               { name: "transferExpenditureFii", label: "Expenditure on transfer (FII)", type: "Amount" },
// //               { name: "totalDeductionsFii", label: "Total Deductions Matrix", type: "Auto" },
// //               { name: "lossDisallowedFii", label: "Loss disallowed u/s 94(7)/94(8) (FII)", type: "Amount" },
// //               { name: "stcgFiiSecuritiesFinal", label: "STCG from FII securities", type: "Auto" }
// //             ]
// //           },
// //           stcgDeemedPassThroughDtaa: {
// //             title: "STCG — Deemed, Pass-Through & DTAA Aggregates",
// //             fields: [
// //               { name: "hasUnutilisedCgasDeposit", label: "Whether any unutilised CGAS deposit?", type: "Radio", options: ["Yes", "No"] },
// //               // Sub-table logic triggered dynamically if true
// //               { name: "deemedStcgOtherThanCgas", label: "Amount deemed STCG — other than CGAS", type: "Amount" },
// //               { name: "totalDeemedStcgA6", label: "Total Deemed STCG (A6)", type: "Auto" },
// //               { name: "ptiStcg15Percent", label: "PTI STCG @ 15%", type: "Auto" },
// //               { name: "ptiStcg20Percent", label: "PTI STCG @ 20%", type: "Auto" },
// //               { name: "ptiStcg30Percent", label: "PTI STCG @ 30%", type: "Auto" },
// //               { name: "ptiStcgApplicableRates", label: "PTI STCG at applicable rates", type: "Auto" },
// //               {
// //                 name: "dtaaStcgTable",
// //                 label: "DTAA STCG Table",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "amount", label: "Amount", type: "Amount" },
// //                   { name: "itemNo", label: "Item No", type: "Text" },
// //                   { name: "country", label: "Country", type: "Dropdown" },
// //                   { name: "dtaaArticle", label: "DTAA Article", type: "Text" },
// //                   { name: "treatyRate", label: "Treaty Rate", type: "Number" },
// //                   { name: "hasTrc", label: "TRC? (Yes/No)", type: "Dropdown", options: ["Yes", "No"] },
// //                   { name: "section", label: "Section", type: "Text" },
// //                   { name: "itActRate", label: "IT Act Rate", type: "Number" },
// //                   { name: "applicableRate", label: "Applicable Rate", type: "Number" }
// //                 ]
// //               }
// //             ]
// //           }
// //         }
// //       },
// //       ltcgAndVdaLedgers: {
// //         title: "Long-Term Capital Gains (LTCG) & VDA",
// //         fieldSections: {
// //           ltcgImmovablePropertyAndRates: {
// //             title: "LTCG — B1: Immovable Property & Rates Matrix",
// //             fields: [
// //               { name: "indexedCostElements", label: "Indexed Cost Matrix Computations Block", type: "Amount", notes: "Structural mirrored fields from STCG A1 with Indexed Cost multipliers; u/s 54 exemptions align here." },
// //               { name: "ltcgSec112APre23Jul2024", label: "Total LTCG u/s 112A (transfers before 23 Jul 2024)", type: "Auto", notes: "Taxed @ 10%" },
// //               { name: "ltcgSec112APost23Jul2024", label: "Total LTCG u/s 112A (transfers on/after 23 Jul 2024)", type: "Auto", notes: "Taxed @ 12.5%" },
// //               { name: "totalLtcgSec112AAggregate", label: "Total LTCG u/s 112A Aggregate", type: "Auto" }
// //             ]
// //           },
// //           ltcgSec112AScripWise: {
// //             title: "LTCG — B3: Schedule 112A Scrip-wise Ledger",
// //             fields: [
// //               {
// //                 name: "scripLedger112A",
// //                 label: "Scrip-wise Shares/Units Records",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "shareAcquiredPeriod", label: "Share/Unit Acquired", type: "Dropdown", options: ["On or before 31 Jan 2018", "After 31 Jan 2018"] },
// //                   { name: "shareTransferPeriod", label: "Share/Unit Transferred", type: "Dropdown", options: ["Before 23 Jul 2024", "On or after 23 Jul 2024"] },
// //                   { name: "isinCode", label: "ISIN Code", type: "Text", validation: "12-char lookup" },
// //                   { name: "shareName", label: "Name of Share/Unit", type: "Text" },
// //                   { name: "noOfShares", label: "No. of Shares/Units", type: "Number" },
// //                   { name: "salePricePerShare", label: "Sale Price per Share/Unit (₹)", type: "Amount" },
// //                   { name: "fullValueConsideration", label: "Full Value of Consideration (₹)", type: "Amount" },
// //                   { name: "costOfAcquisitionNoIndex", label: "Cost of Acquisition without indexation (₹)", type: "Auto" },
// //                   { name: "actualCostOfAcquisition", label: "Actual Cost of Acquisition (₹)", type: "Amount" },
// //                   { name: "lowerOfConsiderationFmv", label: "Lower of Col 6 & Col 11", type: "Auto" },
// //                   { name: "fmvPerShareJan2018", label: "Fair Market Value per share as on 31 Jan 2018 (₹)", type: "Amount" },
// //                   { name: "totalFmvJan2018", label: "Total FMV as on 31 Jan 2018", type: "Auto" },
// //                   { name: "costOfImprovementNoIndex", label: "Cost of Improvement without indexation (₹)", type: "Amount" },
// //                   { name: "transferExpenditure", label: "Expenditure in connection with transfer (₹)", type: "Amount" },
// //                   { name: "totalDeductionsSummary", label: "Total Deductions Ledger Summary", type: "Auto" },
// //                   { name: "balanceLtcgPerScrip", label: "Balance — LTCG per scrip", type: "Auto" }
// //                 ]
// //               }
// //             ]
// //           },
// //           scheduleVda: {
// //             title: "Schedule VDA — Virtual Digital Assets",
// //             fields: [
// //               {
// //                 name: "vdaTransactions",
// //                 label: "VDA Ledger Entries",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "acquisitionDate", label: "Date of Acquisition", type: "Date" },
// //                   { name: "transferDate", label: "Date of Transfer", type: "Date" },
// //                   { name: "taxHead", label: "Head under which income to be taxed", type: "Dropdown", options: ["Capital Gain"] },
// //                   { name: "costOfAcquisition", label: "Cost of Acquisition (₹)", type: "Amount" },
// //                   { name: "considerationReceived", label: "Consideration Received (₹)", type: "Amount" },
// //                   { name: "incomeFromVda", label: "Income from VDA", type: "Auto", notes: "Loss entered as zero; taxed @ 30%" }
// //                 ]
// //               },
// //               { name: "totalVdaIncomeCapitalGains", label: "Total (Sum of all positive incomes — Capital Gain)", type: "Auto" }
// //             ]
// //           }
// //         }
// //       }
// //     }
// //   },

// //   // ==========================================
// //   // MAIN SECTION 5: SCHEDULE OS — INCOME FROM OTHER SOURCES
// //   // ==========================================
// //   scheduleOtherSources: {
// //     title: "Schedule OS: Income from Other Sources",
// //     subsections: {
// //       operationalIncomes: {
// //         title: "Structural Operational Incomes",
// //         fieldSections: {
// //           grossIncomeNormalRates: {
// //             title: "Gross Income at Normal Rates (Dividends & Interest)",
// //             fields: [
// //               { name: "dividendIncomeExcludingSecs", label: "Dividend income (other than 2(22)(e) & 2(22)(f))", type: "Amount" },
// //               { name: "dividendSec2_22_e", label: "Dividend u/s 2(22)(e)", type: "Amount" },
// //               { name: "dividendSec2_22_f", label: "Dividend u/s 2(22)(f)", type: "Amount" },
// //               { name: "dividendsGrossTotal", label: "Dividends Gross (ai+aii+aiii)", type: "Auto" },
// //               { name: "interestSavingsBank", label: "Interest from Savings Bank", type: "Amount" },
// //               { name: "interestDeposits", label: "Interest from Deposits (Bank/PO/Cooperative)", type: "Amount" },
// //               { name: "interestItRefund", label: "Interest from IT Refund", type: "Amount" },
// //               { name: "passThroughInterest", label: "Pass-through interest", type: "Auto", source: "schedulePti.interest" },
// //               { name: "interestAccruedPf_1", label: "Interest accrued on PF u/s 10(11) Proviso 1", type: "Amount" },
// //               { name: "interestAccruedPf_2", label: "Interest accrued on PF u/s 10(11) Proviso 2", type: "Amount" },
// //               { name: "interestAccruedPf_3", label: "Interest accrued on PF u/s 10(12) Proviso 1", type: "Amount" },
// //               { name: "interestAccruedPf_4", label: "Interest accrued on PF u/s 10(12) Proviso 2", type: "Amount" },
// //               { name: "interestOthers", label: "Others — interest from Cos., NBFCs, HFCs", type: "Amount" },
// //               { name: "interestGrossMatrixTotal", label: "Interest Gross Matrix", type: "Auto" }
// //             ]
// //           },
// //           rentalGiftSpecializedDisclosures: {
// //             title: "Rental, Gift & Specialized OS Disclosures",
// //             fields: [
// //               { name: "rentalPlantMachineryGross", label: "Rental income from machinery/plants/buildings (Gross)", type: "Amount" },
// //               { name: "giftMoneySec56_2_x", label: "Aggregate value of money received without consideration u/s 56(2)(x)", type: "Amount" },
// //               { name: "giftImmovablePropertyStampValue", label: "Immovable property received without consideration — stamp duty value", type: "Amount" },
// //               { name: "giftImmovablePropertyInadequateValue", label: "Immovable property for inadequate consideration — excess stamp value", type: "Amount" },
// //               { name: "giftOtherPropertyFmv", label: "Other property received without consideration — FMV", type: "Amount" },
// //               { name: "giftOtherPropertyInadequateFmv", label: "Other property for inadequate consideration — FMV excess", type: "Amount" },
// //               { name: "totalSec56_2_xSummary", label: "Total s.56(2)(x) Summary", type: "Auto" },
// //               { name: "familyPension", label: "Family Pension", type: "Amount" },
// //               { name: "retirementBenefitNotified89AOs", label: "Income from Retirement Benefit Account — Notified Country u/s 89A (OS)", type: "Amount", notes: "Sub-rows track USA/UK/Canada" },
// //               { name: "retirementBenefitNonNotified89AOs", label: "Income from Retirement Benefit Account — Non-Notified Country u/s 89A (OS)", type: "Amount" },
// //               { name: "relief89AClaimedEarlierOs", label: "Income taxable this year on which 89A relief claimed earlier", type: "Amount" },
// //               { name: "businessTrustSumSec56_2_xii", label: "Sum received from Business Trust u/s 56(2)(xii)", type: "Amount" },
// //               { name: "lifeInsuranceSumSec56_2_xiii", label: "Sum received under life insurance policy u/s 56(2)(xiii)", type: "Amount" },
// //               {
// //                 name: "anyOtherIncomeTable",
// //                 label: "Any Other Income Ledger Table",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "nature", label: "Nature (Free Text)", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               { name: "grossIncomeNormalRatesTotal", label: "Gross Income at Normal Rates Summary Total", type: "Auto" }
// //             ]
// //           }
// //         }
// //       },
// //       tariffsAndAdjustments: {
// //         title: "Special Tariffs, Deductions & Breakups",
// //         fieldSections: {
// //           specialRatesIncome: {
// //             title: "Income Chargeable at Special Rates",
// //             fields: [
// //               { name: "winningsLotteriesSec115BB", label: "Winnings from lotteries/crossword/races/games/gambling u/s 115BB", type: "Amount", notes: "Taxed @ 30%" },
// //               { name: "winningsOnlineGamesSec115BBJ", label: "Gross winnings from online games u/s 115BBJ", type: "Amount", notes: "Taxed @ 30%" },
// //               { name: "rule133Adjustment", label: "Adjustment as per Rule 133", type: "Amount" },
// //               { name: "cashCreditsSec115BBE", label: "Income chargeable u/s 115BBE", type: "Amount", notes: "Tracks 6 sub-items (s.68, s.69, etc.); taxed @ 60%" },
// //               {
// //                 name: "taxablePfSec111",
// //                 label: "Accumulated balance of recognized PF taxable u/s 111",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "assessmentYear", label: "AY", type: "Text" },
// //                   { name: "incomeBenefit", label: "Income Benefit", type: "Amount" },
// //                   { name: "taxBenefit", label: "Tax Benefit", type: "Amount" }
// //                 ]
// //               },
// //               {
// //                 name: "otherSpecialRatesIncome",
// //                 label: "Any other income at special rates",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "nature", label: "Nature", type: "Dropdown" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               {
// //                 name: "ptiSpecialRatesIncome",
// //                 label: "PTI in nature of OS at special rates",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "nature", label: "Nature", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               {
// //                 name: "dtaaSpecialRatesOs",
// //                 label: "DTAA Special Rates Claims Table (OS)",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "amount", label: "Amount", type: "Amount" },
// //                   { name: "itemNo", label: "Item No", type: "Text" },
// //                   { name: "country", label: "Country", type: "Dropdown" },
// //                   { name: "dtaaArticle", label: "DTAA Article", type: "Text" },
// //                   { name: "treatyRate", label: "Treaty Rate", type: "Number" },
// //                   { name: "hasTrc", label: "TRC?", type: "Dropdown" },
// //                   { name: "itActSection", label: "IT Act Section", type: "Text" },
// //                   { name: "itActRate", label: "IT Act Rate", type: "Number" },
// //                   { name: "applicableRate", label: "Applicable Rate", type: "Number" }
// //                 ]
// //               }
// //             ]
// //           },
// //           deductionsAndBalances: {
// //             title: "Deductions, Balances & Adjustments",
// //             fields: [
// //               { name: "otherExpensesDeductions", label: "Expenses/deductions other than family pension", type: "Amount" },
// //               { name: "familyPensionDeductionSec57_iia", label: "Deduction u/s 57(iia) — family pension only", type: "Auto", logic: "Min(1/3 of pension, 25000)" },
// //               { name: "depreciationRentalIncome", label: "Depreciation (if rental income in 1c)", type: "Amount" },
// //               { name: "interestExpenditureSec57_i", label: "Interest expenditure u/s 57(i) — on dividend income", type: "Amount" },
// //               { name: "totalOsDeductions", label: "Total deductions", type: "Auto" },
// //               { name: "nonDeductibleAmountsSec58", label: "Amounts not deductible u/s 58", type: "Amount" },
// //               { name: "chargeableProfitsSec59", label: "Profits chargeable to tax u/s 59", type: "Amount" },
// //               { name: "reliefClaimedSec89AOs", label: "Income claimed for relief u/s 89A (OS)", type: "Amount" },
// //               { name: "netIncomeOsNormalRates", label: "Net Income from OS at normal rates", type: "Auto" },
// //               { name: "raceHorsesReceipts", label: "Race Horses — Receipts", type: "Amount" },
// //               { name: "raceHorsesDeductionsSec57", label: "Race Horses — Deductions u/s 57", type: "Amount" },
// //               { name: "raceHorsesBalance", label: "Race Horses — Balance", type: "Auto" },
// //               { name: "totalIncomeOtherSourcesFinal", label: "Total Income from Other Sources", type: "Auto" },
// //               { name: "quarterlyAccrualMatrix", label: "Quarterly accrual/receipt information table", type: "Matrix", notes: "5 columns x 8 income types layout for Sec 234C evaluation" }
// //             ]
// //           }
// //         }
// //       }
// //     }
// //   },

// //   // ==========================================
// //   // MAIN SECTION 6: AGGREGATIONS, DEDUCTIONS & TAXES
// //   // ==========================================
// //   aggregationsDeductionsTaxes: {
// //     title: "Aggregations, Deductions & Taxes",
// //     subsections: {
// //       lossesSetOffLedger: {
// //         title: "Losses Set-off Ledger (Schedules CYLA, BFLA, CFL)",
// //         fieldSections: {
// //           aggregatedSetOffAdjustments: {
// //             title: "Aggregated Set-off Adjustments",
// //             fields: [
// //               { name: "isCylaEditable", label: "Do you want to edit the details auto-populated? (CYLA)", type: "Radio", options: ["Yes", "No"] },
// //               { name: "isBflaEditable", label: "Do you want to edit the details auto-populated? (BFLA)", type: "Radio", options: ["Yes", "No"] }
// //             ]
// //           },
// //           scheduleCflCarryForwardMatrix: {
// //             title: "Schedule CFL — Carry Forward Matrix",
// //             fields: [
// //               {
// //                 name: "cflMatrixRows",
// //                 label: "Carry Forward Tracking Rows",
// //                 type: "Table",
// //                 notes: "Tracks 15 rows from AY 2010-11 to 2026-27",
// //                 columns: [
// //                   { name: "assessmentYear", label: "Assessment Year", type: "Auto" },
// //                   { name: "filingDate", label: "Date of Filing", type: "Date" },
// //                   { name: "housePropertyLoss", label: "House Property Loss (₹)", type: "Amount" },
// //                   { name: "bfBusinessLoss_5a", label: "Brought Forward Business Loss (5a)", type: "Amount" },
// //                   { name: "adjustedSec115Bac_5b", label: "Adjusted for 115BAC (5b)", type: "Amount" },
// //                   { name: "availableBfBusinessLoss_5c", label: "BF Business Loss available (5c)", type: "Auto" },
// //                   { name: "speculativeBusinessLoss", label: "Loss from Speculative Business (₹)", type: "Amount" },
// //                   { name: "specifiedBusinessLoss", label: "Loss from Specified Business (₹)", type: "Amount" },
// //                   { name: "stcl", label: "Short-term Capital Loss (₹)", type: "Amount" },
// //                   { name: "ltcl", label: "Long-term Capital Loss (₹)", type: "Amount" },
// //                   { name: "raceHorsesLoss", label: "Loss from Race Horses (₹)", type: "Amount" }
// //                 ]
// //               }
// //             ]
// //           }
// //         }
// //       },
// //       chapterViaDeductions: {
// //         title: "Schedule VI-A: Chapter VI-A Deductions",
// //         fieldSections: {
// //           partBDeductionsCertainPayments: {
// //             title: "Part B Deductions — Certain Payments (Old Regime Only)",
// //             fields: [
// //               {
// //                 name: "sec80CPayments",
// //                 label: "Section 80C Payments Table",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "nature", label: "Nature", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" },
// //                   { name: "policyNo", label: "Policy No", type: "Text" }
// //                 ]
// //               },
// //               {
// //                 name: "sec80CccPayments",
// //                 label: "Section 80CCC Payment to Pension Fund Table",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "insurerName", label: "Insurer Name", type: "Text" },
// //                   { name: "policyNo", label: "Policy No.", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               {
// //                 name: "sec80Ccd1Payments",
// //                 label: "Section 80CCD(1) NPS Employee Contribution Table",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "identifierType", label: "Type of Identifier", type: "Text" },
// //                   { name: "name", label: "Name", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ]
// //               },
// //               {
// //                 name: "sec80Ccd1bPayments",
// //                 label: "Section 80CCD(1B) Additional NPS Table",
// //                 type: "Table",
// //                 columns: [
// //                   { name: "pran", label: "PRAN", type: "Text" },
// //                   { name: "amount", label: "Amount", type: "Amount" }
// //                 ],
// //                 validation: "Max ₹50,000"
// //               },
// //               { name: "sec80Ccd2EmployerContribution", label: "Section 80CCD(2) Employer NPS Contribution", type: "Amount" },
// //               { name: "sec80CcgRgess", label: "Section 80CCG Equity Savings Scheme (RGESS)", type: "Amount" },
// //               { name: "sec80CcfInfraBonds", label: "Section 80CCF Infrastructure Bonds", type: "Amount" },
// //               { name: "sec80DHealthInsuranceAuto", label: "Section 80D Health Insurance", type: "Auto", source: "schedule80DMatrix" },
// //               { name: "sec80DdDisabledDependentAuto", label: "Section 80DD Disabled Dependent Care", type: "Auto", source: "schedule80U80DdDetails" },
// //               { name: "sec80DdbMedicalTreatmentAmount", label: "Section 80DDB Medical Treatment Specified Disease", type: "Amount" },
// //               { name: "sec80DdbDiseaseName", label: "Disease Name Select Dropdown", type: "Dropdown", dependOn: { field: "sec80DdbMedicalTreatmentAmount" } }
// //             ]
// //           },
// //           linkedDeductionsInterestMasters: {
// //             title: "Linked Deductions & Interest Masters (Schedules 80D, 80E, 80G)",
// //             fields: [
// //               {
// //                 name: "schedule80DMatrix",
// //                 label: "Schedule 80D Multi-Tier Matrix",
// //                 type: "Matrix",
// //                 notes: "Structures health insurance tables, preventive checkup inputs, and medical expenses across 4 categories: Self/Family (Non-Senior/Senior) and Parents (Non-Senior/Senior)."
// //               },
// //               { name: "loansInterestTable80E_80Ee_80Eea_80Eeb", label: "Sections 80E/80EE/80EEA/80EEB Loan Interest Master Table", type: "Table", notes: "Standardized structural tracks for up to 2 loan rows per section" },
// //               { name: "structuralDeductionInputsPartC", label: "Sections 80IA to 80LA, 80QQB, 80RRB, 80TTA/80TTB Amount Inputs Block", type: "Amount", notes: "80QQB/80RRB prompt for Form and Ack No fields." },
// //               { name: "totalDeductionsPartC", label: "Total Deductions (Part C)", type: "Auto" }
// //             ]
// //           }
// //         }
// //       },
// //       taxComputationsAndVerification: {
// //         title: "Part B-TI & TTI: Total Tax Computations",
// //         fieldSections: {
// //           finalComputationCards: {
// //             title: "Final Computation & Relief Cards",
// //             fields: [
// //               { name: "totalIncomeFinal", label: "Total Income", type: "Auto" },
// //               { name: "adjustedTotalIncomeSec115Jc_1", label: "Adjusted Total Income u/s 115JC(1)", type: "Auto", notes: "Computes AMT layout fields 1 to 4" },
// //               { name: "taxAtNormalRates", label: "Tax at normal rates", type: "Auto" },
// //               { name: "taxAtSpecialRates", label: "Tax at special rates", type: "Auto", source: "scheduleSi" },
// //               { name: "rebateSec87A", label: "Rebate u/s 87A", type: "Auto" },
// //               { name: "surchargeAndCess", label: "Surcharge & Health & Education Cess @ 4%", type: "Auto" },
// //               { name: "grossTaxLiabilityTotal", label: "Gross Tax Liability Total", type: "Auto" },
// //               { name: "taxDeferredEsopPerquisite", label: "Tax deferred — ESOP perquisite", type: "Auto" },
// //               { name: "reliefSec89", label: "Relief u/s 89", type: "Amount", notes: "Requires Ack. No. of Form 10E" },
// //               { name: "reliefSec89A_90_90A_91", label: "Relief u/s 89A / 90 / 90A / 91", type: "Auto", source: "scheduleTrFsi" },
// //               { name: "netTaxLiabilityTotal", label: "Net Tax Liability Total", type: "Auto" },
// //               { name: "statutoryInterestsAndFees", label: "Interest u/s 234A / 234B / 234C / Fees 234F & 234-I", type: "Auto" },
// //               { name: "aggregateLiability", label: "Aggregate Liability", type: "Auto" },
// //               { name: "taxesPaidSummaryCombined", label: "Taxes Paid Summary (Advance Tax / TDS / TCS / Self-Assessment Tax)", type: "Auto" },
// //               { name: "finalPayableOrRefundAmount", label: "Amount Payable / Refund Amount", type: "Auto" }
// //             ]
// //           },
// //           verificationAndBanks: {
// //             title: "Verification, Bank Accounts & ITR-U Profiles",
// //             fields: [
// //               {
// //                 name: "taxPaymentsLedgerTables",
// //                 label: "Schedule Tax Payments Ledger (TDS1 / TDS2 / TDS3 / TCS / IT)",
// //                 type: "Table",
// //                 required: true,
// //                 columns: [
// //                   { name: "payerType", label: "Self/Spouse/Other Dropdown", type: "Dropdown" },
// //                   { name: "tanDeductor", label: "TAN of Deductor", type: "Text" },
// //                   { name: "financialYear", label: "FY", type: "Text" },
// //                   { name: "bfTdsAmount", label: "Brought Forward TDS", type: "Amount" },
// //                   { name: "cyTdsAmount", label: "Current Year TDS", type: "Amount" },
// //                   { name: "tdsClaimed", label: "TDS claimed", type: "Amount" },
// //                   { name: "grossReceiptsMatched", label: "Gross Receipts", type: "Amount" },
// //                   { name: "headOfIncome", label: "Head of Income", type: "Dropdown" }
// //                 ]
// //               },
// //               {
// //                 name: "bankAccountDetails",
// //                 label: "Bank Account Details Table",
// //                 type: "Table",
// //                 required: true,
// //                 columns: [
// //                   { name: "ifsc", label: "IFS Code", type: "Text" },
// //                   { name: "bankName", label: "Bank Name", type: "Text" },
// //                   { name: "accountNumber", label: "Account Number", type: "Text" },
// //                   { name: "isRefundSelected", label: "Select for Refund Checkbox", type: "Checkbox" }
// //                 ]
// //               },
// //               {
// //                 name: "verificationBlockFields",
// //                 label: "Verification Block",
// //                 type: "FormProfile",
// //                 required: true,
// //                 fields: [
// //                   { name: "verifierName", label: "Name", type: "Text" },
// //                   { name: "fatherName", label: "Father's Name", type: "Text" },
// //                   { name: "capacity", label: "Capacity", type: "Dropdown", options: ["Self", "Representative", "Other"] },
// //                   { name: "place", label: "Place", type: "Text" },
// //                   { name: "date", label: "Date", type: "Date" },
// //                   { name: "signatureRef", label: "Identification Signatures Reference", type: "Text" }
// //                 ]
// //               },
// //               {
// //                 name: "itrUpdatedReturnSection",
// //                 label: "ITR-U Updated Return Section Sub-module",
// //                 type: "FormSubModule",
// //                 required: "Conditional",
// //                 notes: "Triggered instantly if u/s 139(8A) is checked in filing details; tracks updated personal configuration parameters, adjustment criteria, and Part B-ATI tax liability rows."
// //               }
// //             ]
// //           }
// //         }
// //       }
// //     }
// //   }
// // }; 



// /**
//  * itr2FieldConfig.js
//  * * Detailed UI Field Specification for ITR-2 (Assessment Year 2026-27).
//  * Structure: Main Section -> Subsection -> Field Section -> Fields
//  * Ready for application usage in fieldConfig.js and filingConfig.js.
//  */

// const itr2FieldConfig = {
//   // ==========================================
//   // MAIN SECTION 1: PART A - GENERAL INFO & STATUS
//   // ==========================================
//   partAGeneralInfo: {
//     label: "Part A: General Information",
//     subsections: {
//       personalIdentityAndStatus: {
//         label: "Personal Identity & Residential Status",
//         fieldSections: {
//           personalIdentity: {
//             label: "Personal Identity Details",
//             fields: {
//               firstName: {
//                 label: "First Name",
//                 type: "text",
//                 required: true,
//                 validation: { alphaOnly: true, maxLength: 75 }
//               },
//               middleName: {
//                 label: "Middle Name",
//                 type: "text",
//                 required: false,
//                 validation: { alphaOnly: true }
//               },
//               lastName: {
//                 label: "Last Name",
//                 type: "text",
//                 required: true,
//                 validation: { alphaOnly: true }
//               },
//               pan: {
//                 label: "PAN",
//                 type: "text",
//                 required: true,
//                 validation: { pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$", length: 10 }
//               },
//               status: {
//                 label: "Status (I / H)",
//                 type: "dropdown",
//                 required: true,
//                 options: [
//                   { value: "I", label: "I – Individual" },
//                   { value: "H", label: "H – HUF" }
//                 ]
//               },
//               dobOrFormation: {
//                 label: "Date of Birth / Fo",
//                 type: "date",
//                 required: true,
//                 notes: "DOB for Individual, Date of formation for HUF"
//               },
//               aadhaarNumber: {
//                 label: "Aadhaar Number",
//                 type: "text",
//                 required: "conditional",
//                 condition: "status === 'I'",
//                 validation: { pattern: "^[0-9]{12}$", check: "Luhn-mod 10" }
//               },
//               aadhaarEnrolmentId: {
//                 label: "Aadhaar Enrolment ",
//                 type: "text",
//                 required: "conditional",
//                 condition: "status === 'I' && !aadhaarNumber",
//                 validation: { length: 28 }
//               },
//               passportNumber: {
//                 label: "Passport Number (I",
//                 type: "text",
//                 required: false
//               },
//               isFpi: {
//                 label: "Whether you are an",
//                 type: "dropdown",
//                 required: false,
//                 options: [
//                   { value: "Yes", label: "Yes" },
//                   { value: "No", label: "No" }
//                 ]
//               },
//               sebiRegNumber: {
//                 label: "SEBI Registration ",
//                 type: "text",
//                 required: "conditional",
//                 condition: "isFpi === 'Yes'"
//               }
//             }
//           },
//           residentialStatus: {
//             label: "Residential Status Details",
//             fields: {
//               residentialStatus: {
//                 label: "Residential Status",
//                 type: "dropdown",
//                 required: true,
//                 options: [
//                   { value: "RES", label: "RES – Resident" },
//                   { value: "NRI", label: "NRI – Non Resident" },
//                   { value: "NOR", label: "NOR – Resident but not Ordinarily Resident" }
//                 ]
//               },
//               conditionsForStatus: {
//                 label: "Conditions for Res",
//                 type: "dropdown",
//                 required: "conditional",
//                 condition: "status === 'I'",
//                 options: [
//                   { value: "182_days", label: "182 days rule (6(1)(a))" },
//                   { value: "60_days", label: "60 days rule (6(1)(c))" },
//                   { value: "120_days_citizen", label: "120-day citizen rule" },
//                   { value: "15_lakh_citizen", label: "citizen 6(6)(d) 15 lakh rule" }
//                 ]
//               },
//               jurisdictionsOfResidence: {
//                 label: "Jurisdiction(s) of",
//                 type: "table",
//                 required: "conditional",
//                 condition: "['NOR', 'NRI'].includes(residentialStatus)",
//                 columns: {
//                   country: { label: "Country", type: "dropdown" },
//                   tin: { label: "TIN", type: "text" }
//                 },
//                 maxRows: 2
//               },
//               stayPeriodCurrentYear: {
//                 label: "Total period of st",
//                 type: "number",
//                 required: "conditional",
//                 condition: "status === 'I'"
//               },
//               stayPeriodPrecedingYears: {
//                 label: "Total period of st",
//                 type: "number",
//                 required: "conditional",
//                 condition: "status === 'I'"
//               },
//               hasPermanentEstablishment: {
//                 label: "In case of non-res",
//                 type: "radio",
//                 required: "conditional",
//                 condition: "residentialStatus === 'NRI'",
//                 options: ["Yes", "No"]
//               },
//               claimBenefit115H: {
//                 label: "Do you want to cla",
//                 type: "radio",
//                 required: "conditional",
//                 condition: "residentialStatus === 'RES'",
//                 options: ["Yes", "No"]
//               }
//             }
//           }
//         }
//       },
//       addressAndContact: {
//         label: "Address & Contact Disclosures",
//         fieldSections: {
//           primaryAddress: {
//             label: "Primary Address Details",
//             fields: {
//               flatDoorBlockNo: { label: "Flat / Door / Bloc", type: "text", required: true },
//               premisesBuildingVillage: { label: "Name of Premises /", type: "text", required: false },
//               roadStreetPostOffice: { label: "Road / Street / Po", type: "text", required: false },
//               areaLocality: { label: "Area / Locality", type: "text", required: false },
//               townCityDistrict: { label: "Town / City / Dist", type: "text", required: true },
//               state: { label: "State", type: "dropdown", required: true },
//               countryRegion: { label: "Country / Region", type: "dropdown", required: true, defaultValue: "91-INDIA" },
//               pinCode: { label: "PIN Code", type: "text", required: "conditional", validation: { length: 6 } },
//               noZipCode: { label: "No ZIP Code (check", type: "checkbox", required: false },
//               zipCode: { label: "ZIP Code", type: "text", required: "conditional" }
//             }
//           },
//           secondaryAddress: {
//             label: "Secondary Address Block",
//             fields: {
//               isSecondarySameAsPrimary: {
//                 label: "Is the secondary a",
//                 type: "dropdown",
//                 required: true,
//                 options: ["Yes", "No"]
//               },
//               // Populated dynamically or embedded matching primary structure if false
//               flatDoorBlockNoSec: { label: "Flat / Door / Bloc", type: "text", required: "conditional", condition: "isSecondarySameAsPrimary === 'No'" },
//               townCityDistrictSec: { label: "Town / City / Dist", type: "text", required: "conditional", condition: "isSecondarySameAsPrimary === 'No'" },
//               stateSec: { label: "State", type: "dropdown", required: "conditional", condition: "isSecondarySameAsPrimary === 'No'" },
//               countryRegionSec: { label: "Country / Region", type: "dropdown", required: "conditional", condition: "isSecondarySameAsPrimary === 'No'" }
//             }
//           },
//           contactDetails: {
//             label: "Primary & Secondary Contact",
//             fields: {
//               primaryEmail: { label: "Primary Email ID", type: "email", required: true },
//               secondaryEmail: { label: "Secondary Email I", type: "email", required: false },
//               primaryMobileNo: { label: "Primary Mobile No.", type: "tel", required: true, validation: { length: 10 } },
//               stdIsdCode: { label: "STD/ISD Code", type: "text", required: false },
//               phoneNo: { label: "Residential/Office", type: "tel", required: false },
//               secondaryMobileNo: { label: "Secondary Mobile ", type: "tel", required: false }
//             }
//           }
//         }
//       },
//       taxRegimeAndFiling: {
//         label: "Tax Regime & Filing Category",
//         fieldSections: {
//           regimeSelection: {
//             label: "Tax Regime Selection u/s 115BAC(6)",
//             fields: {
//               optOutNewRegime: {
//                 label: "Opt out of New Tax",
//                 type: "dropdown",
//                 required: true,
//                 options: [
//                   { value: "continue", label: "Continue to opt" },
//                   { value: "opt_out", label: "Opt out" },
//                   { value: "not_opting", label: "Not opting" },
//                   { value: "opting_in", label: "Opting in now" },
//                   { value: "old", label: "Old (default = New Regime)" }
//                 ]
//               },
//               form10IeDate: { label: "Date of filing of ", type: "date", required: "conditional" },
//               form10IeAck: { label: "Acknowledgement nu", type: "text", required: "conditional" }
//             }
//           },
//           filingDetails: {
//             label: "Filing Return Head & Notice Details",
//             fields: {
//               filedUnderSection: {
//                 label: "Filed u/s (Section",
//                 type: "dropdown",
//                 required: true,
//                 options: ["139(1)", "139(4)", "139(5)", "92CD", "119(2)(b)", "139(8A)", "139(9)", "142(1)", "148", "153A", "153C"]
//               },
//               filedInResponseToNotice: { label: "Filed in response ", type: "dropdown", required: "conditional" },
//               receiptNumber: { label: "Receipt no. (if re", type: "text", required: "conditional" },
//               dateOfOriginalReturn: { label: "Date of filing of ", type: "date", required: "conditional" },
//               uniqueNumberDin: { label: "Unique Number / DI", type: "text", required: "conditional" },
//               dateOfNoticeOrder: { label: "Date of such Notic", type: "date", required: "conditional" },
//               dueDate139_1: { label: "Due Date u/s 139(1", type: "date", readOnly: true, defaultValue: "31/07/2026" }
//             }
//           },
//           seventhProviso: {
//             label: "Seventh Proviso to Section 139(1)",
//             fields: {
//               isSeventhProviso: { label: "Filing under Seven", type: "dropdown", required: true, options: ["Yes", "No"] },
//               depositAmountCurrentAcc: { label: "Deposited > ₹1 Cro", type: "radio", required: "conditional", options: ["Yes", "No"] },
//               foreignTravelExpense: { label: "Incurred > ₹2 lakh", type: "radio", required: "conditional", options: ["Yes", "No"] },
//               electricityExpense: { label: "Incurred > ₹1 lakh", type: "radio", required: "conditional", options: ["Yes", "No"] },
//               salesTurnoverLimit: { label: "Sales/turnover > ₹", type: "radio", required: "conditional", options: ["Yes", "No"] },
//               grossReceiptsProfession: { label: "Gross receipts in ", type: "radio", required: "conditional", options: ["Yes", "No"] },
//               tdsTcsLimit: { label: "TDS+TCS ≥ ₹25,000 ", type: "radio", required: "conditional", options: ["Yes", "No"] },
//               savingsDepositsLimit: { label: "Savings bank depos", type: "radio", required: "conditional", options: ["Yes", "No"] }
//             }
//           }
//         }
//       },
//       specialDisclosures: {
//         label: "Special Disclosures & Directorships",
//         fieldSections: {
//           representativeAssessee: {
//             label: "Representative Assessee Details",
//             fields: {
//               isRepresentative: { label: "Filed by represent", type: "dropdown", required: true, options: ["Yes", "No"] },
//               repName: { label: "Name of Representa", type: "text", required: "conditional" },
//               repEmail: { label: "E-mail ID of Repre", type: "email", required: "conditional" },
//               repContact: { label: "Contact Number of ", type: "tel", required: "conditional" },
//               repCapacity: { label: "Capacity of Repres", type: "dropdown", required: "conditional", options: ["Legal Heir", "Manager", "Guardian", "Other"] },
//               repAddress: { label: "Address of Represe", type: "text", required: "conditional" },
//               repPAN: { label: "PAN of Representat", type: "text", required: "conditional" },
//               repAadhaar: { label: "Aadhaar Number of ", type: "text", required: "conditional" }
//             }
//           },
//           directorship: {
//             label: "Directorship Disclosures",
//             fields: {
//               isDirector: { label: "Whether Director i", type: "dropdown", required: true, options: ["Yes", "No"] },
//               directorshipTable: {
//                 label: "Directorship Details",
//                 type: "table",
//                 required: "conditional",
//                 condition: "isDirector === 'Yes'",
//                 maxRows: 3,
//                 columns: {
//                   companyName: { label: "Name of Company", type: "text", required: true },
//                   companyType: { label: "Type of Company", type: "dropdown", required: true },
//                   companyPAN: { label: "PAN of Company", type: "text", required: true },
//                   sharesType: { label: "Whether shares li", type: "dropdown", required: true, options: ["Listed", "Unlisted"] },
//                   din: { label: "Director Identifi", type: "text", required: true }
//                 }
//               }
//             }
//           },
//           partnershipFirm: {
//             label: "Partnership in Firms",
//             fields: {
//               isPartner: { label: "Whether Partner in", type: "dropdown", required: true, options: ["Yes", "No"] },
//               firmName: { label: "Name of Firm", type: "text", required: "conditional" },
//               firmPAN: { label: "PAN of Firm", type: "text", required: "conditional" }
//             }
//           },
//           unlistedEquity: {
//             label: "Unlisted Equity Shares Disclosure",
//             fields: {
//               hasUnlistedEquity: { label: "Held unlisted equ", type: "dropdown", required: true, options: ["Yes", "No"] },
//               unlistedTable: {
//                 label: "Unlisted Share Tra",
//                 type: "table",
//                 required: "conditional",
//                 condition: "hasUnlistedEquity === 'Yes'",
//                 maxRows: 4,
//                 columns: {
//                   companyName: { label: "Name of Company", type: "text", required: true },
//                   companyType: { label: "Type of Company", type: "text", required: true },
//                   companyPAN: { label: "PAN", type: "text", required: true },
//                   openingNoOfShares: { label: "Opening Balance —", type: "number", required: true },
//                   openingCostOfAcq: { label: "Opening Balance —", type: "amount", required: true },
//                   acquiredNo: { label: "Shares Acquired —", type: "number", required: false },
//                   acquiredDate: { label: "Date of Subscripti", type: "date", required: "conditional" },
//                   faceValuePerShare: { label: "Face Value per Sh", type: "amount", required: "conditional" },
//                   issuePricePerShare: { label: "Issue Price per S", type: "amount", required: "conditional" },
//                   purchasePricePerShare: { label: "Purchase Price pe", type: "amount", required: "conditional" },
//                   transferredNo: { label: "Shares Transferred", type: "number", required: false },
//                   saleConsideration: { label: "Sale Consideratio", type: "amount", required: "conditional" },
//                   closingNoOfShares: { label: "Closing Balance —", type: "number", readOnly: true },
//                   closingCostOfAcq: { label: "Closing Balance —", type: "amount", readOnly: true }
//                 }
//               }
//             }
//           },
//           leiAndPortugueseCivil: {
//             label: "Legal Entity Identifier & Portuguese Civil Code",
//             fields: {
//               leiNumber: { label: "LEI Number", type: "text", required: "conditional", notes: "Mandatory for refund >= 50 crore" },
//               leiValidUpto: { label: "Valid Upto Date", type: "date", required: "conditional" },
//               isGovernedByPortugueseCode: { label: "Governed by Portu", type: "dropdown", required: true, options: ["Yes", "No"] }
//             }
//           }
//         }
//       }
//     }
//   },

//   // ==========================================
//   // MAIN SECTION 2: SCHEDULE S - INCOME FROM SALARY
//   // ==========================================
//   scheduleSalary: {
//     label: "Schedule S: Salary Income",
//     subsections: {
//       employerAndGrossSalaryBreakup: {
//         label: "Employer Details & Breakup",
//         fieldSections: {
//           employerDetails: {
//             label: "Employer Registry Info (Max 3 Employers)",
//             fields: {
//               employerName: { label: "Name of Employer", type: "text", required: true },
//               employerNature: {
//                 label: "Nature of Employer",
//                 type: "dropdown",
//                 required: true,
//                 options: ["Central Government", "State Government", "Public Sector Undertaking", "CG-Pensioners", "SG-Pensioners", "PSU-Pensioners", "Others-Pensioners", "Others"]
//               },
//               employerTan: { label: "TAN of Employer", type: "text", required: "conditional" },
//               employerAddress: { label: "Address of Employe", type: "text", required: true },
//               employerTownCity: { label: "Town / City", type: "text", required: true },
//               employerState: { label: "State", type: "dropdown", required: true },
//               employerPinCode: { label: "PIN Code", type: "text", required: true, validation: { length: 6 } },
//               employerZipCode: { label: "ZIP Code", type: "text", required: false }
//             }
//           },
//           grossSalaryBreakup: {
//             label: "Gross Salary Breakup Component u/s 17",
//             fields: {
//               salarySec17_1: { label: "Salary as per Sec", type: "subtable", required: true, notes: "Nature dropdown: Basic Salary, DA, HRA, LTA, etc." },
//               perquisitesSec17_2: { label: "Value of Perquisi", type: "subtable", required: false },
//               profitInLieuSec17_3: { label: "Profit in lieu of", type: "subtable", required: false },
//               retirementAccountNotified89A: { label: "Income from Retir", type: "subtable", required: false, options: ["Canada", "UK", "USA"] },
//               retirementAccountNonNotified89A: { label: "Income from Retir", type: "amount", required: false },
//               reliefClaimedEarlier89A: { label: "Income taxable th", type: "amount", required: false },
//               totalGrossSalaryEmployerWise: { label: "Gross Salary", type: "amount", readOnly: true }
//             }
//           }
//         }
//       },
//       allowancesDeductionsAndHra: {
//         label: "Exempt Allowances & Core Deductions",
//         fieldSections: {
//           allowancesAndNetSummary: {
//             label: "Combined Corporate Allowances Summary",
//             fields: {
//               totalGrossSalaryCombined: { label: "Total Gross Salar", type: "amount", readOnly: true },
//               lessReliefClaimed89A: { label: "Less: Income clai", type: "amount", readOnly: true },
//               allowancesExemptSec10: { label: "Less: Allowances ", type: "subtable", required: false, maxRows: 6 },
//               hraExemptSourced: { label: "HRA exempt u/s 1", type: "amount", readOnly: true },
//               netSalary: { label: "Net Salary", type: "amount", readOnly: true },
//               standardDeduction16ia: { label: "Standard Deductio", type: "amount", readOnly: true },
//               entertainmentAllowance16ii: { label: "Entertainment All", type: "amount", required: false },
//               professionalTax16iii: { label: "Professional Tax ", type: "amount", required: false },
//               totalDeductionsSec16: { label: "Total Deductions ", type: "amount", readOnly: true },
//               finalSalaryIncomeChargeable: { label: "Income chargeable", type: "amount", readOnly: true }
//             }
//           },
//           hraSubForm: {
//             label: "HRA Sub-Form Engine u/s 10(13A)",
//             fields: {
//               placeOfResidence: { label: "1. Place of Resid", type: "dropdown", required: true, options: ["Metro City", "Non-Metro City"] },
//               actualHraReceived: { label: "2. Actual HRA Rec", type: "amount", required: true },
//               actualRentPaid: { label: "3. Actual Rent Pa", type: "amount", required: true },
//               salaryComponentsHra: { label: "4. Details of Sal", type: "amount", required: true, notes: "Basic + DA" },
//               rentMinusTenPercentSalary: { label: "5. Actual Rent Pa", type: "amount", readOnly: true },
//               salaryPercentageCap: { label: "6. 50% / 40% of ", type: "amount", readOnly: true },
//               eligibleExemptHra: { label: "7. Eligible Exemp", type: "amount", readOnly: true }
//             }
//           }
//         }
//       }
//     }
//   },

//   // ==========================================
//   // MAIN SECTION 3: SCHEDULE HP - INCOME FROM HOUSE PROPERTY
//   // ==========================================
//   scheduleHouseProperty: {
//     label: "Schedule HP: House Property Income",
//     subsections: {
//       propertyIdentityAndOwnership: {
//         label: "Property Registration & Registry",
//         fieldSections: {
//           addressAndOwnership: {
//             label: "Property Address & Holding Profile (Max 2 Properties)",
//             fields: {
//               hpAddress: { label: "Address", type: "text", required: true },
//               hpTownCity: { label: "Town / City", type: "text", required: true },
//               hpState: { label: "State", type: "dropdown", required: true },
//               hpCountry: { label: "Country", type: "dropdown", required: true, defaultValue: "91-INDIA" },
//               hpPinCode: { label: "PIN Code", type: "text", required: "conditional" },
//               hpZipCode: { label: "ZIP Code", type: "text", required: "conditional" },
//               propertyOwner: { label: "Owner of the Pro", type: "dropdown", required: true, options: ["Self", "Co-owner"] },
//               isCoOwned: { label: "Is the property c", type: "dropdown", required: true, options: ["Yes", "No"] },
//               percentageShare: { label: "Your percentage s", type: "number", required: true, validation: { min: 0, max: 100 } }
//             }
//           },
//           coOwnerAndTenantDetails: {
//             label: "Associated Stakeholders (Co-owners & Tenants)",
//             fields: {
//               coOwnerTable: {
//                 label: "Co-Owner Registry",
//                 type: "table",
//                 required: "conditional",
//                 condition: "isCoOwned === 'Yes'",
//                 maxRows: 7,
//                 columns: {
//                   name: { label: "Name of Other Co", type: "text", required: true },
//                   pan: { label: "PAN of Other Co-", type: "text", required: true },
//                   aadhaar: { label: "Aadhaar No. of O", type: "text", required: false },
//                   share: { label: "Percentage share", type: "number", required: true }
//                 }
//               },
//               tenantTable: {
//                 label: "Tenant Registry",
//                 type: "table",
//                 required: "conditional",
//                 maxRows: 3,
//                 columns: {
//                   name: { label: "Name(s) of Tenan", type: "text", required: true },
//                   pan: { label: "PAN of Tenant", type: "text", required: false },
//                   aadhaar: { label: "Aadhaar No. of T", type: "text", required: false },
//                   panTanCredit: { label: "PAN/TAN of Tenan", type: "text", required: "conditional" }
//                 }
//               }
//             }
//           }
//         }
//       },
//       hpIncomeComputationAndLoans: {
//         label: "Income Calculations & Interest Tables",
//         fieldSections: {
//           computationBlock: {
//             label: "Financial Computation Matrix",
//             fields: {
//               propertyType: { label: "Type of House Pro", type: "dropdown", required: true, options: ["Self-Occupied", "Let Out", "Deemed Let Out"] },
//               grossRentReceived: { label: "a. Gross rent rec", type: "amount", required: "conditional" },
//               unrealizedRent: { label: "b. Amount of rent", type: "amount", required: false },
//               localTaxesPaid: { label: "c. Tax paid to l", type: "amount", required: false },
//               totalUnrealizedAndTaxes: { label: "d. Total (b + c)", type: "amount", readOnly: true },
//               annualValue: { label: "e. Annual Value ", type: "amount", readOnly: true },
//               annualValueOwnedShare: { label: "f. Annual Value ", type: "amount", readOnly: true },
//               standardDeduction30Percent: { label: "g. 30% of 1f", type: "amount", readOnly: true },
//               borrowedCapitalInterest: { label: "h. Interest on b", type: "amount", readOnly: true },
//               totalHPDeductions: { label: "i. Total (g + h)", type: "amount", readOnly: true },
//               arrearsRentReceived: { label: "j. Arrears/Unrea", type: "amount", required: false },
//               netPropertyIncome: { label: "k. Income from H", type: "amount", readOnly: true }
//             }
//           },
//           loanInterestTable: {
//             label: "Section 24(b) Borrowed Capital Registry",
//             fields: {
//               loanTable: {
//                 label: "Loan Track Matrix",
//                 type: "table",
//                 required: true,
//                 maxRows: 4,
//                 columns: {
//                   sourceType: { label: "Loan taken from", type: "dropdown", required: true, options: ["Bank", "Institution", "Person"] },
//                   lenderName: { label: "Name of Bank / I", type: "text", required: true },
//                   accountNo: { label: "Loan Account Num", type: "text", required: true },
//                   sanctionDate: { label: "Date of Sanctio", type: "date", required: true },
//                   loanAmount: { label: "Total Amount of ", type: "amount", required: true },
//                   outstandingAmount: { label: "Loan Outstandin", type: "amount", required: true },
//                   interestClaimed: { label: "Interest on Bor", type: "amount", required: true }
//                 }
//               },
//               passThroughIncomeHp: { label: "Row 2 — Pass Thr", type: "amount", required: false },
//               totalHpHeadIncome: { label: "Row 3 — Total In", type: "amount", readOnly: true }
//             }
//           }
//         }
//       }
//     }
//   },

//   // ==========================================
//   // MAIN SECTION 4: SCHEDULE CG - CAPITAL GAINS
//   // ==========================================
//   scheduleCapitalGains: {
//     label: "Schedule CG: Capital Gains",
//     subsections: {
//       shortTermCapitalGains: {
//         label: "Short-Term Capital Gains (STCG)",
//         fieldSections: {
//           stcgImmovableProperty: {
//             label: "A1: Immovable Property (Repeatable Blocks)",
//             fields: {
//               purchaseDate: { label: "Date of Purchase", type: "date", required: true },
//               saleDate: { label: "Date of Sale/Tra", type: "date", required: true },
//               considerationReceived: { label: "a(i) Full Value ", type: "amount", required: true },
//               stampValuationValue: { label: "a(ii) Value of p", type: "amount", required: true },
//               adoptedValueSec50C: { label: "a(iii) Full Valu", type: "amount", readOnly: true },
//               costOfAcquisition: { label: "b(i) Cost of Acq", type: "amount", required: true },
//               costOfImprovement: { label: "b(ii) Cost of Im", type: "amount", required: false },
//               transferExpenditure: { label: "b(iii) Expenditu", type: "amount", required: false },
//               totalPropertyCosts: { label: "b(iv) Total (bi", type: "amount", readOnly: true },
//               balanceStcg: { label: "c. Balance (aii", type: "amount", readOnly: true },
//               deductionSec54B: { label: "d. Deduction u/", type: "amount", required: false },
//               finalPropertyStcg: { label: "e. STCG on Immo", type: "amount", readOnly: true },
//               buyerDetailsTable: {
//                 label: "Buyer Profile",
//                 type: "table",
//                 required: "conditional",
//                 maxRows: 3,
//                 columns: {
//                   name: { label: "Name", type: "text" },
//                   pan: { label: "PAN", type: "text" },
//                   aadhaar: { label: "Aadhaar", type: "text" },
//                   share: { label: "% Share", type: "number" },
//                   amt: { label: "Amount", type: "amount" },
//                   address: { label: "Property Addres", type: "text" }
//                 }
//               }
//             }
//           },
//           stcgSlumpSale: {
//             label: "A2: Slump Sale Matrix",
//             fields: {
//               fmvRule11UAE2: { label: "a(i) Fair Market", type: "amount", required: false },
//               fmvRule11UAE3: { label: "a(ii) Fair Mark", type: "amount", required: false },
//               fullValueConsiderationSlump: { label: "a(iii) Full Valu", type: "amount", readOnly: true },
//               netWorthUndertaking: { label: "b. Net Worth of ", type: "amount", required: true },
//               stcgSlumpSaleFinal: { label: "c. STCG from Slu", type: "amount", readOnly: true }
//             }
//           },
//           stcgEquitySec111A: {
//             label: "A2: Equity / STT-Paid Securities u/s 111A",
//             fields: {
//               equityConsideration: { label: "i(a) Full Value ", type: "amount", required: true },
//               equityCostAcquisition: { label: "i(b)(i) Cost of ", type: "amount", required: true },
//               equityCostImprovement: { label: "i(b)(ii) Cost of", type: "amount", required: false },
//               equityTransferExpenditure: { label: "i(b)(iii) Expend", type: "amount", required: false },
//               equityTotalCosts: { label: "i(b)(iv) Total (", type: "amount", readOnly: true },
//               equityBalance: { label: "i(c) Balance (ia", type: "amount", readOnly: true },
//               lossDisallowedSec94: { label: "i(d) Loss disall", type: "amount", required: false },
//               stcgEquityPostJul24: { label: "i(e) STCG on Equ", type: "amount", readOnly: true, notes: "Taxed @ 20% after 23 Jul 2024" },
//               stcgEquityPreJul24: { label: "For transfers be", type: "amount", readOnly: true, notes: "Taxed @ 15% before 23 Jul 2024" }
//             }
//           },
//           stcgNonResidentShares: {
//             label: "A3 & A4: Non-Resident Special Provisions (FII / Demised Assets)",
//             fields: {
//               nrStcg111APreJul24: { label: "a. STCG u/s 111", type: "amount", required: "conditional" },
//               nrStcg111APostJul24: { label: "a. STCG u/s 111", type: "amount", required: "conditional" },
//               nrStcgOtherShares: { label: "b. STCG from sha", type: "amount", required: "conditional" },
//               fiiConsiderationUnquoted: { label: "a(i)(a) Full Val", type: "amount", required: "conditional" },
//               fiiFmvUnquoted: { label: "a(i)(b) Fair Mar", type: "amount", required: "conditional" },
//               fiiAdoptedValueSec50CA: { label: "a(i)(c) Higher o", type: "amount", readOnly: true },
//               fiiConsiderationOther: { label: "a(ii) Full Value", type: "amount", required: "conditional" },
//               fiiTotalConsideration: { label: "a(iii) Total (ic", type: "amount", readOnly: true },
//               fiiCostOfAcquisition: { label: "b(i) Cost of Acq", type: "amount", required: "conditional" },
//               fiiFinalStcg: { label: "e. STCG from FII", type: "amount", readOnly: true }
//             }
//           },
//           stcgDeemedAndPassThrough: {
//             label: "A5, A6, A7 & A8: Deemed Gains, PTI & DTAA",
//             fields: {
//               unutilisedCgasDepositToggle: { label: "Whether any unut", type: "radio", required: false, options: ["Yes", "No"] },
//               deemedStcgOtherThanCgas: { label: "Amount deemed ST", type: "amount", required: false },
//               totalDeemedStcgA6: { label: "Total Deemed STC", type: "amount", readOnly: true },
//               ptiStcg15: { label: "PTI STCG @ 15%", type: "amount", readOnly: true },
//               ptiStcg20: { label: "PTI STCG @ 20%", type: "amount", readOnly: true },
//               ptiStcg30: { label: "PTI STCG @ 30%", type: "amount", readOnly: true },
//               ptiStcgAppRates: { label: "PTI STCG at appl", type: "amount", readOnly: true },
//               dtaaStcgTable: {
//                 label: "STCG Covered by DTAA",
//                 type: "table",
//                 required: false,
//                 columns: {
//                   incomeAmt: { label: "Amount of incom" },
//                   itemNo: { label: "Item No. A1–A7" },
//                   country: { label: "Country name & " },
//                   article: { label: "Article of DTAA" },
//                   rateTreaty: { label: "Rate as per Tre" },
//                   trcObtained: { label: "Whether TRC obt" }
//                 }
//               }
//             }
//           }
//         }
//       },
//       longTermCapitalGainsAndVda: {
//         label: "Long-Term Capital Gains & Digital Assets",
//         fieldSections: {
//           ltcgImmovableProperty: {
//             label: "B1: Immovable Property Long Term Engine",
//             fields: {
//               ltcgPurchaseDate: { label: "Date of Purchase", type: "date", required: true },
//               ltcgSaleDate: { label: "Date of Sale/Tra", type: "date", required: true },
//               ltcgIndexedCostAcq: { label: "Indexed Cost of ", type: "amount", required: true },
//               ltcgDeductionsSec54: { label: "Deductions u/s 5", type: "amount", required: false, notes: "Sections: 54/54B/54D/54EC/54F" },
//               ltcgTaxRatePostJul24: { label: "LTCG taxed @ 12", type: "amount", readOnly: true },
//               ltcgTaxRatePreJul24: { label: "LTCG taxed @ 20", type: "amount", readOnly: true }
//             }
//           },
//           ltcgEquitySec112A: {
//             label: "B3: Schedule 112A Scrip-wise Matrix",
//             fields: {
//               scripRegistryTable: {
//                 label: "112A Detailed Tra",
//                 type: "table",
//                 required: true,
//                 columns: {
//                   shareAcquiredPeriod: { label: "Col 1 — Share/U", type: "dropdown", options: ["On or before 31 Jan 2018", "After 31 Jan 2018"] },
//                   shareTransferredPeriod: { label: "Col 1a — Share/", type: "dropdown" },
//                   isinCode: { label: "Col 2 — ISIN Co", type: "text" },
//                   shareUnitName: { label: "Col 3 — Name of", type: "text", readOnly: true },
//                   noOfShares: { label: "Col 4 — No. of ", type: "number" },
//                   salePricePerUnit: { label: "Col 5 — Sale Pr", type: "amount" },
//                   fullValueConsideration: { label: "Col 6 — Full Va", type: "amount" },
//                   costOfAcqNoIndex: { label: "Col 7 — Cost of", type: "amount", readOnly: true },
//                   actualCostOfAcq: { label: "Col 8 — Actual ", type: "amount" },
//                   fmvPerShareJan18: { label: "Col 10 — Fair M", type: "amount", required: "conditional" },
//                   totalFmvJan18: { label: "Col 11 — Total ", type: "amount", readOnly: true },
//                   costOfImprovement: { label: "Col 12 — Cost o", type: "amount" },
//                   transferExpenditure: { label: "Col 13 — Expen", type: "amount" },
//                   balanceLtcgPerScrip: { label: "Balance (Col 6 ", type: "amount", readOnly: true }
//                 }
//               },
//               totalLtcg112APreJul24: { label: "Total LTCG u/s 1", type: "amount", readOnly: true },
//               totalLtcg112APostJul24: { label: "Total LTCG u/s 1", type: "amount", readOnly: true },
//               totalLtcg112ACombined: { label: "Total LTCG u/s 1", type: "amount", readOnly: true }
//             }
//           },
//           scheduleVda: {
//             label: "Schedule VDA: Virtual Digital Assets Ledger",
//             fields: {
//               vdaLedgerTable: {
//                 label: "VDA Transaction L",
//                 type: "table",
//                 required: true,
//                 columns: {
//                   acquisitionDate: { label: "Date of Acquisi", type: "date", required: true },
//                   transferDate: { label: "Date of Transfe", type: "date", required: true },
//                   taxHead: { label: "Head under whic", type: "dropdown", defaultValue: "Capital Gain" },
//                   costOfAcquisition: { label: "Cost of Acquisi", type: "amount", required: true },
//                   considerationReceived: { label: "Consideration R", type: "amount", required: true },
//                   netVdaIncome: { label: "Income from VDA", type: "amount", readOnly: true }
//                 }
//               },
//               totalPositiveVdaCapitalGain: { label: "Total (Sum of a", type: "amount", readOnly: true }
//             }
//           }
//         }
//       }
//     }
//   },

//   // ==========================================
//   // MAIN SECTION 5: SCHEDULE OS - INCOME FROM OTHER SOURCES
//   // ==========================================
//   scheduleOtherSources: {
//     label: "Schedule OS: Other Sources",
//     subsections: {
//       otherSourcesIncomeInflows: {
//         label: "OS Inflows (Normal & Special Rates)",
//         fieldSections: {
//           grossIncomeNormalRates: {
//             label: "5.1: Inflows Taxable at Normal Slab Rates",
//             fields: {
//               dividendExcludingDeemed: { label: "a(i) Dividend in", type: "amount", required: false },
//               dividendSec2_22_e: { label: "a(ii) Dividend u", type: "amount", required: false },
//               dividendSec2_22_f: { label: "a(iii) Dividend ", type: "amount", required: false },
//               totalDividendsGross: { label: "a. Dividends Gro", type: "amount", readOnly: true },
//               interestSavingsBank: { label: "b(i) Interest fr", type: "amount", required: false },
//               interestDeposits: { label: "b(ii) Interest f", type: "amount", required: false },
//               interestItRefund: { label: "b(iii) Interest ", type: "amount", required: false },
//               passThroughInterest: { label: "b(iv) Pass-throu", type: "amount", readOnly: true },
//               interestPfAccrued: { label: "b(v–viii) Intere", type: "amount", required: false, notes: "4 structural fields combined" },
//               interestOthersNBFC: { label: "b(ix) Others — i", type: "amount", required: false },
//               totalInterestGross: { label: "b. Interest Gro", type: "amount", readOnly: true },
//               plantMachineryRentalGross: { label: "c. Rental income", type: "amount", required: false },
//               giftMoneyNoConsideration: { label: "d(i) Aggregate v", type: "amount", required: false },
//               giftImmovableNoConsideration: { label: "d(ii) Immovable p", type: "amount", required: false },
//               giftImmovableInadequateConsideration: { label: "d(iii) Immovable ", type: "amount", required: false },
//               giftOtherPropertyNoConsideration: { label: "d(iv) Other prop", type: "amount", required: false },
//               giftOtherPropertyInadequateConsideration: { label: "d(v) Other prope", type: "amount", required: false },
//               totalSec56_2_x: { label: "d. Total s.56(2", type: "amount", readOnly: true },
//               familyPensionReceipt: { label: "e(1) Family Pens", type: "amount", required: false },
//               retirementNotified89AOs: { label: "e(2) Income fro", type: "amount", required: false },
//               retirementNonNotified89AOs: { label: "e(3) Income fro", type: "amount", required: false },
//               reliefClaimedEarlier89AOs: { label: "e(4) Income tax", type: "amount", required: false },
//               businessTrustSec56_2_xii: { label: "e(5) Sum receive", type: "amount", required: false },
//               lifeInsuranceSec56_2_xiii: { label: "e(6) Sum receive", type: "amount", required: false },
//               anyOtherOsFreeTextTable: { label: "e(7–10) Any Othe", type: "table", required: false, maxRows: 4 },
//               totalGrossIncomeNormalRates: { label: "1. Gross Income ", type: "amount", readOnly: true }
//             }
//           },
//           incomeSpecialRates: {
//             label: "5.2: Inflows Taxable at Fixed Special Rates",
//             fields: {
//               winningsSec115BB: { label: "a(i) Winnings fr", type: "amount", required: false, notes: "Taxed @ 30%" },
//               winningsOnlineGames115BBJ: { label: "a(ii)(i) Gross wi", type: "amount", required: false },
//               adjustmentRule133: { label: "a(ii)(ii) Adjust", type: "amount", required: false },
//               cashCreditsSec115BBE: { label: "b(i–vi) Income c", type: "amount", required: false, notes: "6 items combined @ 60%" },
//               recognizedPfSec111: { label: "c. Accumulated b", type: "table", required: false, maxRows: 3 },
//               anyOtherSpecialRatesTable: { label: "d. Any other inc", type: "table", required: false, maxRows: 6 },
//               ptiSpecialRatesTable: { label: "e. PTI in natur", type: "table", required: false, maxRows: 6 },
//               dtaaClaimedOsTable: { label: "f. Amount inclu", type: "table", required: false, maxRows: 6 }
//             }
//           }
//         }
//       },
//       otherSourcesDeductionsAndQuarters: {
//         label: "OS Deductions & Quarterly Breakups",
//         fieldSections: {
//           deductionsAndNetSummary: {
//             label: "Allowable Expenses & Net Aggregation",
//             fields: {
//               expensesExcludingPension: { label: "a(i) Expenses/de", type: "amount", required: false },
//               deductionFamilyPension57iia: { label: "a(ii) Deduction ", type: "amount", readOnly: true },
//               depreciationRental: { label: "b. Depreciation ", type: "amount", required: false },
//               interestExpenditureDividend: { label: "c. Interest exp", type: "amount", required: false },
//               totalOsDeductions: { label: "d. Total deduct", type: "amount", readOnly: true },
//               nonDeductibleSec58: { label: "4. Amounts not d", type: "amount", required: false },
//               profitsTaxableSec59: { label: "5. Profits char", type: "amount", required: false },
//               reliefClaimed89AOsDeduction: { label: "5a. Income clai", type: "amount", required: false },
//               netIncomeOsNormalRates: { label: "6. Net Income fr", type: "amount", readOnly: true },
//               raceHorsesReceipts: { label: "8. Race Horses —", type: "amount", required: false },
//               raceHorsesDeductions: { label: "8. Race Horses —", type: "amount", required: false },
//               raceHorsesBalance: { label: "8. Race Horses —", type: "amount", readOnly: true },
//               totalIncomeOtherSources: { label: "9. Total Income ", type: "amount", readOnly: true }
//             }
//           },
//           quarterlyAccrualTable: {
//             label: "10: Quarterly Distribution Grid (For 234C)",
//             fields: {
//               distributionGrid: {
//                 label: "Quarterly Matrix ",
//                 type: "table",
//                 required: false,
//                 notes: "5 quarters x 8 income lines grid"
//               }
//             }
//           }
//         }
//       }
//     }
//   },

//   // ==========================================
//   // MAIN SECTION 6: SCHEDULE CYLA, BFLA & CFL - LOSS LOGIC
//   // ==========================================
//   scheduleLosses: {
//     label: "Schedule CYLA, BFLA & CFL: Loss Matrices",
//     subsections: {
//       lossAdjustmentsAndOverrides: {
//         label: "Current & Brought Forward Set-Offs",
//         fieldSections: {
//           cylaBlock: {
//             label: "Schedule CYLA — Current Year Inter-Head Adjustments",
//             fields: {
//               cylaOverrideToggle: { label: "Do you want to e", type: "dropdown", required: true, options: ["Yes", "No"], defaultValue: "No" },
//               cylaComputationGrid: { label: "Income Head Matr", type: "matrix", readOnly: true }
//             }
//           },
//           bflaBlock: {
//             label: "Schedule BFLA — Brought Forward Deficit Offsets",
//             fields: {
//               bflaOverrideToggle: { label: "Do you want to e", type: "dropdown", required: true, options: ["Yes", "No"], defaultValue: "No" },
//               bflaComputationGrid: { label: "Brought Forward ", type: "matrix", readOnly: true }
//             }
//           }
//         }
//       },
//       carryForwardLossRegistry: {
//         label: "Schedule CFL: Multi-Year Loss Track",
//         fieldSections: {
//           cflGridTable: {
//             label: "Deficit Tracking Rows (AY 2010-11 to 2026-27)",
//             fields: {
//               cflTable: {
//                 label: "CFL Master Grid",
//                 type: "table",
//                 maxRows: 15,
//                 columns: {
//                   assessmentYear: { label: "Assessment Year", type: "text", readOnly: true },
//                   dateOfFiling: { label: "Date of Filing", type: "date" },
//                   housePropertyLoss: { label: "House Property ", type: "amount" },
//                   bfBusinessLoss5a: { label: "Brought Forward", type: "amount" },
//                   adjusted115bac: { label: "Adjusted for 11", type: "amount" },
//                   bfBusinessLossAvailable: { label: "BF Business Los", type: "amount", readOnly: true },
//                   speculativeLoss: { label: "Loss from Specu", type: "amount" },
//                   specifiedBusinessLoss: { label: "Loss from Speci", type: "amount" },
//                   stcl: { label: "Short-term Capi", type: "amount" },
//                   ltcl: { label: "Long-term Capit", type: "amount" },
//                   raceHorsesLoss: { label: "Loss from Race ", type: "amount" }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   },

//   // ==========================================
//   // MAIN SECTION 7: SCHEDULE VI-A - CHAPTER VI-A DEDUCTIONS
//   // ==========================================
//   scheduleDeductionsVia: {
//     label: "Schedule VI-A: Deductions",
//     subsections: {
//       partBDeductionsCertainPayments: {
//         label: "Part B: Payment Based Schemes",
//         fieldSections: {
//           coreSavings80C_80CCD: {
//             label: "Sections 80C, 80CCC & Employee NPS",
//             fields: {
//               sec80C: { label: "80C", type: "subtable", maxRows: 4, notes: "Life insurance, PF, ELSS, etc. Max combined 1.5L" },
//               sec80CCC: { label: "80CCC", type: "subtable", maxRows: 4 },
//               sec80CCD1: { label: "80CCD(1)", type: "subtable", maxRows: 2 },
//               sec80CCD1B: { label: "80CCD(1B)", type: "subtable", maxRows: 3, notes: "Max 50,000" },
//               sec80CCD2: { label: "80CCD(2)", type: "amount", required: false, notes: "Employer contribution" }
//             }
//           },
//           medicalAndInvestments80D_80U: {
//             label: "Sections 80D, 80DD, 80DDB, 80GG & General Reliefs",
//             fields: {
//               sec80CCG: { label: "80CCG", type: "amount", required: false },
//               sec80CCF: { label: "80CCF", type: "amount", required: false },
//               sec80D: { label: "80D", type: "amount", readOnly: true, notes: "Auto-populated from structural Schedule 80D" },
//               sec80DD: { label: "80DD", type: "amount", readOnly: true },
//               sec80DDB: { label: "80DDB", type: "amount", required: false },
//               sec80DdbDiseaseName: { label: "Disease Name", type: "dropdown", required: "conditional" },
//               sec80G: { label: "80G", type: "amount", readOnly: true },
//               sec80GG: { label: "80GG", type: "amount", required: false },
//               sec80GgAck10BA: { label: "Ack. No. of For", type: "text", required: "conditional" },
//               sec80GGA: { label: "80GGA", type: "amount", readOnly: true },
//               sec80GGC: { label: "80GGC", type: "amount", readOnly: true },
//               sec80TTA: { label: "80TTA", type: "amount", required: false, notes: "Max 10,000" },
//               sec80TTB: { label: "80TTB", type: "amount", required: false, notes: "Max 50,000" },
//               sec80U: { label: "80U", type: "amount", readOnly: true },
//               sec80CCH: { label: "80CCH", type: "amount", required: false },
//               anyOtherDeductionsFreeText: { label: "Any other deduc", type: "text", required: false },
//               anyOtherDeductionsAmount: { label: "Amount", type: "amount", required: false },
//               totalDeductionsPartB: { label: "Total Deduction", type: "amount", readOnly: true }
//             }
//           },
//           schedule80DSubForm: {
//             label: "Schedule 80D Breakdown (Health Premium)",
//             fields: {
//               selfFamilyNonSeniorPremium: { label: "1. Self & Famil", type: "table", maxRows: 3 },
//               selfFamilyNonSeniorCheckup: { label: "Preventive Heal", type: "amount" },
//               selfFamilySeniorPremium: { label: "1. Self & Famil", type: "table", maxRows: 3 },
//               selfFamilySeniorCheckup: { label: "Preventive Heal", type: "amount" },
//               selfFamilySeniorExpenditure: { label: "Medical Expendi", type: "amount" },
//               parentsNonSeniorPremium: { label: "2. Parents (Non-", type: "table", maxRows: 3 },
//               parentsNonSeniorCheckup: { label: "Preventive Heal", type: "amount" },
//               parentsSeniorPremium: { label: "2. Parents (Seni", type: "table", maxRows: 3 },
//               parentsSeniorCheckup: { label: "Preventive Heal", type: "amount" },
//               parentsSeniorExpenditure: { label: "Medical Expendi", type: "amount" },
//               eligibleDeduction80DTotal: { label: "3. Eligible Ded", type: "amount", readOnly: true }
//             }
//           }
//         }
//       },
//       partCDeductionsCertainIncomesAndLoans: {
//         label: "Part C & Interest Loan Tracks",
//         fieldSections: {
//           partCIncomes: {
//             label: "Part C: Incomes Eligible for Special Deduction",
//             fields: {
//               sec80IA: { label: "80IA", type: "amount" },
//               sec80IAB: { label: "80IAB", type: "amount" },
//               sec80IB: { label: "80IB", type: "amount" },
//               sec80IBA: { label: "80IBA", type: "amount" },
//               sec80IC_IE: { label: "80IC / 80IE", type: "amount" },
//               sec80ID: { label: "80ID", type: "amount" },
//               sec80JJA: { label: "80JJA", type: "amount" },
//               sec80JJAA: { label: "80JJAA", type: "amount" },
//               sec80LA: { label: "80LA", type: "amount" },
//               sec80QQB: { label: "80QQB", type: "amount" },
//               sec80RRB: { label: "80RRB", type: "amount" },
//               totalDeductionsPartC: { label: "Total Deduction", type: "amount", readOnly: true }
//             }
//           },
//           loanInterest80E_EEB: {
//             label: "Sections 80E, 80EE, 80EEA, 80EEB Detailed Loan Registry",
//             fields: {
//               interestLoanTable: {
//                 label: "Loan Ledger Track",
//                 type: "table",
//                 maxRows: 8,
//                 columns: {
//                   sourceType: { label: "Loan taken fro", type: "dropdown", required: true },
//                   ifscCode: { label: "IFSC Code", type: "text", required: "conditional" },
//                   instPAN: { label: "PAN of Institu", type: "text", required: "conditional" },
//                   instName: { label: "Name of Bank/I", type: "text", required: true },
//                   accountNo: { label: "Loan Account N", type: "text", required: true },
//                   sanctionDate: { label: "Date of Sancti", type: "date", required: true },
//                   loanAmount: { label: "Total Loan Amo", type: "amount", required: true },
//                   outstandingAmount: { label: "Loan Outstandi", type: "amount", required: true },
//                   interestClaimed: { label: "Interest u/s 8", type: "amount", required: true },
//                   residentialValueHP: { label: "Value of Resid", type: "amount", required: "conditional" },
//                   stampDutyValue: { label: "Stamp Duty Val", type: "amount", required: "conditional" },
//                   vehicleRegNo: { label: "Vehicle Regist", type: "text", required: "conditional" }
//                 }
//               }
//             }
//           },
//           donations80G: {
//             label: "Schedule 80G Charitable Inflows Registry (Categories A–D)",
//             fields: {
//               donationsTable80G: {
//                 label: "80G Donation En",
//                 type: "table",
//                 maxRows: 16,
//                 columns: {
//                   doneeName: { label: "Name of Donee", type: "text", required: true },
//                   doneeAddress: { label: "Address", type: "text", required: true },
//                   doneeCity: { label: "City/Town/Dist", type: "text", required: true },
//                   doneeStateCode: { label: "State Code", type: "dropdown", required: true },
//                   doneePin: { label: "PIN Code", type: "text", required: true },
//                   doneePAN: { label: "PAN of Donee", type: "text", required: true },
//                   arnNumber: { label: "ARN — Donation", type: "text", required: "conditional" },
//                   cashAmount: { label: "Donation in Ca", type: "amount", required: false },
//                   otherModeAmount: { label: "Donation in Ot", type: "amount", required: "conditional" },
//                   transactionRef: { label: "Transaction Re", type: "text", required: "conditional" },
//                   bankIfsc: { label: "IFSC Code of B", type: "text", required: "conditional" },
//                   totalDonation: { label: "Total Donation", type: "amount", readOnly: true },
//                   eligibleAmount: { label: "Eligible Amoun", type: "amount", readOnly: true }
//                 }
//               }
//             }
//           },
//           donations80GGA: {
//             label: "Schedule 80GGA Scientific & Rural Research Donations",
//             fields: {
//               donationsTable80GGA: {
//                 label: "80GGA Donation ",
//                 type: "table",
//                 maxRows: 8,
//                 columns: {
//                   relevantClause: { label: "Relevant Claus", type: "dropdown", required: true },
//                   doneeName: { label: "Name of Donee", type: "text", required: true },
//                   doneeAddress: { label: "Address", type: "text", required: true },
//                   doneeCity: { label: "City/Town/Dist", type: "text", required: true },
//                   doneeStateCode: { label: "State Code", type: "dropdown", required: true },
//                   doneePin: { label: "PIN Code", type: "text", required: true },
//                   doneePAN: { label: "PAN of Donee", type: "text", required: true },
//                   cashDate: { label: "Date of Donat", type: "date", required: "conditional" },
//                   cashAmount: { label: "Donation in Ca", type: "amount", required: false },
//                   otherModeAmount: { label: "Donation in Ot", type: "amount", required: "conditional" },
//                   totalDonation: { label: "Total Donation", type: "amount", readOnly: true }
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }
// };


// module.exports = itr2FieldConfig;