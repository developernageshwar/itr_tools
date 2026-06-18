const itr2FieldConfig = {
  partAGeneral: {
    // title: "",  
    subsections: {
      personalAndContact: {
        title: "Personal Identity & Contact Profiles",
        fieldSections: {
          personalIdentity: {
            title: "Personal Identity",
            fields: [
              { name: "firstName", label: "First Name", type: "Text", required: true, validation: "Alpha only, max 75 chars" },
              { name: "middleName", label: "Middle Name", type: "Text", required: false, validation: "Alpha only" },
              { name: "lastName", label: "Last Name", type: "Text", required: true, validation: "Alpha only" },
              { name: "pan", label: "PAN", type: "Text", required: true, validation: "Format: AAAAA0000A" },
              { name: "status", label: "Status (I / H)", type: "Dropdown", required: true, options: ["I – Individual", "H – HUF"] },
              { name: "dobFormationDate", label: "Date of Birth / Formation", type: "Date", required: true },
              { name: "aadhaarNumber", label: "Aadhaar Number", type: "Text", required: "Conditional", validation: "12 digits, required for Individual if allotted" },
              { name: "aadhaarEnrolmentId", label: "Aadhaar Enrolment ID", type: "Text", required: "Conditional", validation: "28 digits, required if Aadhaar not allotted" },
              { name: "passportNumber", label: "Passport Number (Individual)", type: "Text", required: false },
              { name: "isFpi", label: "Whether you are an FPI?", type: "Dropdown", required: false, options: ["Yes", "No"] },
              { name: "sebiRegNumber", label: "SEBI Registration Number", type: "Text", required: "Conditional", dependOn: { field: "isFpi", value: "Yes" } }
            ]
          },
          residentialStatus: {
            title: "Residential Status & Jurisdictions",
            fields: [
              { name: "residentialStatus", label: "Residential Status in India", type: "Dropdown", required: true, options: ["RES – Resident", "NRI – Non Resident", "NOR – Resident but not Ordinarily Resident"] },
              { name: "residentialConditions", label: "Conditions for Residential Status", type: "Dropdown", required: "Conditional", notes: "Sub-options for 182 days rule, 60 days rule, 120-day citizen rule, etc." },
              { 
                name: "foreignJurisdictions", 
                label: "Jurisdiction(s) of Residence & TIN", 
                type: "Table", 
                required: "Conditional", 
                columns: [
                  { name: "country", label: "Country", type: "Dropdown" },
                  { name: "tin", label: "Taxpayer Identification Number (TIN)", type: "Text" }
                ]
              },
              { name: "stayPeriodPreviousYear", label: "Total period of stay in India during previous year (days)", type: "Number", required: "Conditional" },
              { name: "stayPeriodPrecedingYears", label: "Total period of stay in India during 4 preceding years (days)", type: "Number", required: "Conditional" },
              { name: "hasPeInIndia", label: "In case of non-resident: permanent establishment (PE) in India?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
              { name: "claim115HBenefit", label: "Do you want to claim benefit u/s 115H (Resident)?", type: "Radio", required: "Conditional", options: ["Yes", "No"] }
            ]
          },
          addressDetails: {
            title: "Primary & Secondary Addresses",
            fields: [
              { name: "primaryFlatDoorBlock", label: "Flat / Door / Block No. (Primary)", type: "Text", required: true },
              { name: "primaryPremisesBuilding", label: "Name of Premises / Building / Village (Primary)", type: "Text", required: false },
              { name: "primaryRoadStreet", label: "Road / Street / Post Office (Primary)", type: "Text", required: false },
              { name: "primaryAreaLocality", label: "Area / Locality (Primary)", type: "Text", required: false },
              { name: "primaryTownCityDistrict", label: "Town / City / District (Primary)", type: "Text", required: true },
              { name: "primaryState", label: "State (Primary)", type: "Dropdown", required: true, validation: "37 states/UTs + Foreign 99" },
              { name: "primaryCountry", label: "Country / Region (Primary)", type: "Dropdown", required: true, default: "91-INDIA" },
              { name: "primaryPinCode", label: "PIN Code (Primary)", type: "Text", required: "Conditional", validation: "6 digits for Indian address" },
              { name: "primaryZipCode", label: "ZIP Code (Primary)", type: "Text", required: "Conditional" },
              { name: "isSecondarySame", label: "Is the secondary address same as primary address?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              // Secondary Address Block conditional fields mapped dynamically in rendering engine
              { name: "secondaryFlatDoorBlock", label: "Flat / Door / Block No. (Secondary)", type: "Text", required: "Conditional" },
              { name: "secondaryPremisesBuilding", label: "Name of Premises / Building / Village (Secondary)", type: "Text", required: false },
              { name: "secondaryRoadStreet", label: "Road / Street / Post Office (Secondary)", type: "Text", required: false },
              { name: "secondaryAreaLocality", label: "Area / Locality (Secondary)", type: "Text", required: false },
              { name: "secondaryTownCityDistrict", label: "Town / City / District (Secondary)", type: "Text", required: "Conditional" },
              { name: "secondaryState", label: "State (Secondary)", type: "Dropdown", required: "Conditional" },
              { name: "secondaryCountry", label: "Country / Region (Secondary)", type: "Dropdown", required: "Conditional" },
              { name: "secondaryPinCode", label: "PIN Code (Secondary)", type: "Text", required: "Conditional" },
              { name: "secondaryZipCode", label: "ZIP Code (Secondary)", type: "Text", required: "Conditional" }
            ]
          },
          contactDetails: {
            title: "Contact Details",
            fields: [
              { name: "primaryEmail", label: "Primary Email ID", type: "Email", required: true },
              { name: "secondaryEmail", label: "Secondary Email ID", type: "Email", required: false },
              { name: "primaryMobile", label: "Primary Mobile No.", type: "Tel", required: true, validation: "10-digit with auto +91 country code" },
              { name: "stdIsdCode", label: "STD/ISD Code", type: "Text", required: false },
              { name: "landlinePhone", label: "Residential/Office Phone Number", type: "Tel", required: false },
              { name: "secondaryMobile", label: "Secondary Mobile No.", type: "Tel", required: false }
            ]
          }
        }
      },
      filingRegimeDisclosures: {
        title: "Filing Status, Regime & Disclosures",
        fieldSections: {
          taxRegimeSelection: {
            title: "Tax Regime Selection",
            fields: [
              { name: "optOutNewRegime", label: "Opt out of New Tax Regime u/s 115BAC(6)?", type: "Dropdown", required: true, options: ["Continue to opt", "Opt out", "Not opting", "Opting in now", "Old"], default: "New Regime" },
              { name: "form10IeFilingDate", label: "Date of filing of Form 10-IE", type: "Date", required: "Conditional", dependOn: { field: "optOutNewRegime", value: "Opt out" } },
              { name: "form10IeAckNo", label: "Acknowledgement number of Form 10-IE", type: "Text", required: "Conditional", dependOn: { field: "optOutNewRegime", value: "Opt out" } }
            ] 
          },
          filingDetails: {
            title: "Filing Details & Return Type",
            fields: [
              { name: "filedUnderSection", label: "Filed u/s (Section)", type: "Dropdown", required: true, options: ["139(1)-On or before due date", "139(4)-Belated", "139(5)-Revised", "92CD-Modified", "119(2)(b)", "139(8A)", "139(9)", "142(1)", "148", "153A", "153C"] },
              { name: "noticeResponseSection", label: "Filed in response to notice u/s", type: "Dropdown", required: "Conditional", options: ["139(9)", "142(1)", "148", "153C", "153A"] },
              { name: "receiptNo", label: "Receipt no.", type: "Text", required: "Conditional", notes: "Show when 139(5)/139(9)/defective return" },
              { name: "originalReturnFilingDate", label: "Date of filing of Original Return", type: "Date", required: "Conditional" },
              { name: "uniqueNumberDin", label: "Unique Number / DIN", type: "Text", required: "Conditional", notes: "For notice-response filings" },
              { name: "noticeOrderDate", label: "Date of such Notice/Order", type: "Date", required: "Conditional" },
              { name: "dueDate139_1", label: "Due Date u/s 139(1)", type: "Date", required: "Auto", prefilled: "31/07/2026" }
            ]
          },
          seventhProviso: {
            title: "Seventh Proviso to Section 139(1)",
            fields: [
              { name: "isFilingSeventhProviso", label: "Filing under Seventh Proviso?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "depositedAmountCurrentAcc", label: "Deposited > ₹1 Crore in current account(s)?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
              { name: "foreignTravelExpense", label: "Incurred > ₹2 lakh on foreign travel?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
              { name: "electricityExpense", label: "Incurred > ₹1 lakh on electricity?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
              { name: "salesTurnoverExceedLimit", label: "Sales/turnover > ₹60 lakh?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
              { name: "profReceiptsExceedLimit", label: "Gross receipts in profession > ₹10 lakh?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
              { name: "tdsTcsExceedLimit", label: "TDS+TCS ≥ ₹25,000 (or ₹50,000 senior citizen)?", type: "Radio", required: "Conditional", options: ["Yes", "No"] },
              { name: "savingsDepositExceedLimit", label: "Savings bank deposits ≥ ₹50 lakh?", type: "Radio", required: "Conditional", options: ["Yes", "No"] }
            ]
          },
          representativeAssessee: {
            title: "Representative Assessee",
            fields: [
              { name: "isRepresentativeAssessee", label: "Filed by representative assessee?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "representativeName", label: "Name of Representative", type: "Text", required: "Conditional" },
              { name: "representativeEmail", label: "E-mail ID of Representative", type: "Email", required: "Conditional" },
              { name: "representativeContact", label: "Contact Number of Representative", type: "Tel", required: "Conditional" },
              { name: "representativeCapacity", label: "Capacity of Representative", type: "Dropdown", required: "Conditional", options: ["Legal Heir", "Manager", "Guardian", "Other"] },
              { name: "representativeAddress", label: "Address of Representative", type: "Text", required: "Conditional" },
              { name: "representativePan", label: "PAN of Representative", type: "Text", required: "Conditional" },
              { name: "representativeAadhaar", label: "Aadhaar Number of Representative", type: "Text", required: false, validation: "12 digits" }
            ]
          },
          specialDisclosures: {
            title: "Special Entity Disclosures",
            fields: [
              { name: "isPartnerInFirm", label: "Whether Partner in a Firm?", type: "Dropdown", required: true, options: ["Yes", "No"] },
              { name: "firmName", label: "Name of Firm", type: "Text", required: "Conditional" },
              { name: "firmPan", label: "PAN of Firm", type: "Text", required: "Conditional" },
              { name: "isPortugueseCivilCode", label: "Governed by Portuguese Civil Code (Section 5A)?", type: "Dropdown", required: true, options: ["Yes", "No"], notes: "Enables Schedule 5A" },
              { name: "leiNumber", label: "LEI Number", type: "Text", required: "Conditional", notes: "Mandatory if refund ≥ ₹50 crore" },
              { name: "leiValidUpto", label: "Valid Upto Date", type: "Date", required: "Conditional" }
            ]
          }
        }
      },
      corporateDisclosures: {
        title: "Corporate Disclosures (Tables)",
        fieldSections: {
          directorshipTable: {
            title: "Directorship Table",
            fields: [
              {
                name: "directorships",
                label: "Directorship Details",
                type: "Table",
                required: false,
                columns: [
                  { name: "companyName", label: "Name of Company", type: "Text" },
                  { name: "companyType", label: "Type of Company", type: "Dropdown" },
                  { name: "companyPan", label: "PAN of Company", type: "Text" },
                  { name: "shareListingStatus", label: "Whether shares listed or unlisted", type: "Dropdown", options: ["Listed", "Unlisted"] },
                  { name: "din", label: "Director Identification Number (DIN)", type: "Text" }
                ]
              }
            ]
          },
          unlistedSharesTable: {
            title: "Unlisted Equity Shares Table",
            fields: [
              {
                name: "unlistedShares",
                label: "Unlisted Equity Shares Details",
                type: "Table",
                required: false,
                columns: [
                  { name: "companyName", label: "Name of Company", type: "Text" },
                  { name: "companyType", label: "Type of Company", type: "Text" },
                  { name: "companyPan", label: "PAN", type: "Text" },
                  { name: "openingNoOfShares", label: "Opening Balance — No. of Shares", type: "Number" },
                  { name: "openingCostOfAcquisition", label: "Opening Balance — Cost of Acquisition (₹)", type: "Amount" },
                  { name: "sharesAcquiredNo", label: "Shares Acquired — No.", type: "Number" },
                  { name: "acquisitionDate", label: "Date of Subscription/Purchase", type: "Date" },
                  { name: "faceValuePerShare", label: "Face Value per Share (₹)", type: "Amount" },
                  { name: "issuePricePerShare", label: "Issue Price per Share (fresh issue) (₹)", type: "Amount" },
                  { name: "purchasePricePerShare", label: "Purchase Price per Share (₹)", type: "Amount" },
                  { name: "sharesTransferredNo", label: "Shares Transferred — No.", type: "Number" },
                  { name: "saleConsideration", label: "Sale Consideration (₹)", type: "Amount" },
                  { name: "closingNoOfShares", label: "Closing Balance — No. of Shares", type: "Auto", logic: "openingNoOfShares + sharesAcquiredNo - sharesTransferredNo" },
                  { name: "closingCostOfAcquisition", label: "Closing Balance — Cost of Acquisition (₹)", type: "Auto" }
                ]
              }
            ]
          }
        }
      }
    }
  },

  // ==========================================
  // MAIN SECTION 2: SCHEDULE S — INCOME FROM SALARY
  // ==========================================
  scheduleSalary: {
    title: "Schedule S: Income from Salary",
    subsections: {
      employerIdentification: {
        title: "Employer Identification & Base Form",
        fieldSections: {
          employerDetails: {
            title: "Employer Details (Repeatable Matrix)",
            fields: [
              {
                name: "employers",
                label: "Employer Ledger Records",
                type: "Table",
                required: true,
                maxRows: 3,
                columns: [
                  { name: "employerName", label: "Name of Employer", type: "Text" },
                  { name: "employerNature", label: "Nature of Employer", type: "Dropdown", options: ["Central Government", "State Government", "Public Sector Undertaking", "CG-Pensioners", "SG-Pensioners", "PSU-Pensioners", "Others-Pensioners", "Others"] },
                  { name: "employerTan", label: "TAN of Employer", type: "Text", validation: "Required if tax is deducted" },
                  { name: "employerAddress", label: "Address of Employer", type: "Text" },
                  { name: "employerTownCity", label: "Town / City", type: "Text" },
                  { name: "employerState", label: "State", type: "Dropdown" },
                  { name: "employerPin", label: "PIN Code", type: "Text" },
                  { name: "employerZip", label: "ZIP Code", type: "Text" }
                ]
              }
            ]
          }
        }
      },
      structuralIncomeBreakdown: {
        title: "Structural Income Breakdowns & Deductions",
        fieldSections: {
          grossSalaryElements: {
            title: "Gross Salary Elements (Section 17)",
            fields: [
              {
                name: "salarySec17_1",
                label: "Salary as per Section 17(1)",
                type: "Table",
                columns: [
                  { name: "nature", label: "Nature", type: "Dropdown", options: ["Basic Salary", "DA", "HRA", "LTA", "Other Allowance", "Any Other"] },
                  { name: "description", label: "Description", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              {
                name: "perquisitesSec17_2",
                label: "Value of Perquisites u/s 17(2)",
                type: "Table",
                columns: [
                  { name: "nature", label: "Nature", type: "Dropdown", options: ["Accommodation", "Cars", "Gas-electricity-water", "Gifts", "Free meals", "Club expenses", "ESOP", "Stock options", "Contribution u/s 17(2)(vii)", "Other benefits"] },
                  { name: "description", label: "Description", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              {
                name: "profitsInLieuSec17_3",
                label: "Profit in lieu of Salary u/s 17(3)",
                type: "Table",
                columns: [
                  { name: "nature", label: "Nature", type: "Dropdown", options: ["Compensation on termination", "Keyman Insurance", "Any amount before joining", "Any other"] },
                  { name: "description", label: "Description", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              {
                name: "retirementAccountNotified89A",
                label: "Income from Retirement Benefit Account — Notified Country u/s 89A",
                type: "Table",
                columns: [
                  { name: "country", label: "Country", type: "Dropdown", options: ["Canada", "UK", "USA"] },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              { name: "retirementAccountNonNotified89A", label: "Income from Retirement Benefit Account — Non-Notified Country u/s 89A", type: "Amount", required: false },
              { name: "relief89AClaimedEarlier", label: "Income taxable this year on which relief u/s 89A claimed earlier", type: "Amount", required: false },
              { name: "totalGrossSalaryCalculated", label: "Gross Salary (1a+1b+1c+1d+1e+1f)", type: "Auto" }
            ]
          },
          aggregationsAndDeductions: {
            title: "Aggregations & Deductions",
            fields: [
              { name: "combinedGrossSalaryAllEmployers", label: "Total Gross Salary (all employers combined)", type: "Auto" },
              { name: "lessRelief89A", label: "Less: Income claimed for relief u/s 89A", type: "Auto" },
              {
                name: "exemptAllowancesSec10",
                label: "Less: Allowances exempt u/s 10",
                type: "Table",
                columns: [
                  { name: "nature", label: "Nature", type: "Dropdown", options: ["Sec 10(5)", "Sec 10(6)", "Sec 10(7)", "Sec 10(10)", "Sec 10(10A)", "Sec 10(10AA)", "Sec 10(10B)", "Sec 10(10C)", "Sec 10(10CC)", "Sec 10(14)(i)", "Sec 10(14)(ii)", "Sec 10(16)", "Sec 10(17)", "Sec 10(17A)", "Sec 10(18)", "Sec 10(19)", "Sec 10(26)", "Sec 10(26AAA)", "Sec 10(12C) Agniveer", "Any Other"] },
                  { name: "description", label: "Description", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              { name: "exemptHraSec10_13A", label: "HRA exempt u/s 10(13A)", type: "Auto", source: "hraSubForm.eligibleExemptHra" },
              { name: "netSalary", label: "Net Salary", type: "Auto" },
              { name: "standardDeduction16_ia", label: "Standard Deduction u/s 16(ia)", type: "Auto" },
              { name: "entertainmentAllowance16_ii", label: "Entertainment Allowance u/s 16(ii)", type: "Amount", notes: "Government employees only" },
              { name: "professionalTax16_iii", label: "Professional Tax u/s 16(iii)", type: "Amount" },
              { name: "totalDeductionsSec16", label: "Total Deductions u/s 16", type: "Auto" },
              { name: "incomeChargeableSalaries", label: "Income chargeable under 'Salaries'", type: "Auto" }
            ]
          },
          hraSubForm: {
            title: "House Rent Allowance (HRA) Sub-Form",
            fields: [
              { name: "placeOfResidence", label: "Place of Residence", type: "Dropdown", options: ["Metro City", "Non-Metro City"] },
              { name: "actualHraReceived", label: "Actual HRA Received (A) (₹)", type: "Amount", required: true },
              { name: "actualRentPaid", label: "Actual Rent Paid (₹)", type: "Amount", required: true },
              { name: "salaryBasicPlusDa", label: "Details of Salary u/s 17(1) — Basic + DA", type: "Amount", required: true },
              { name: "rentPaidLessTenPercentSalary", label: "Actual Rent Paid – 10% of Salary (B)", type: "Auto" },
              { name: "salaryPercentageCap", label: "50% / 40% of Salary (C)", type: "Auto" },
              { name: "eligibleExemptHra", label: "Eligible Exempt HRA = Min(A, B, C)", type: "Auto" }
            ]
          }
        }
      }
    }
  },

  // ==========================================
  // MAIN SECTION 3: SCHEDULE HP — INCOME FROM HOUSE PROPERTY
  // ==========================================
  scheduleHouseProperty: {
    title: "Schedule HP: Income from House Property",
    subsections: {
      profileAndComputations: {
        title: "Profile & Structural Computations",
        fieldSections: {
          propertyProfile: {
            title: "Property Address & Profile (Max 2 Properties)",
            fields: [
              {
                name: "properties",
                label: "Property Profiles Block",
                type: "Table",
                maxRows: 2,
                columns: [
                  { name: "address", label: "Address", type: "Text" },
                  { name: "townCity", label: "Town / City", type: "Text" },
                  { name: "state", label: "State", type: "Dropdown" },
                  { name: "country", label: "Country", type: "Dropdown", default: "91-INDIA" },
                  { name: "pinCode", label: "PIN Code", type: "Text" },
                  { name: "zipCode", label: "ZIP Code", type: "Text" },
                  { name: "propertyOwner", label: "Owner of the Property", type: "Dropdown", options: ["Self", "Co-owner"] },
                  { name: "isCoOwned", label: "Is the property co-owned?", type: "Dropdown", options: ["Yes", "No"] },
                  { name: "percentageShare", label: "Your percentage share in property (%)", type: "Number", validation: "0–100, 2 decimals" }
                ]
              }
            ]
          },
          computationEngine: {
            title: "Income Computation Engine",
            fields: [
              { name: "typeOfProperty", label: "Type of House Property", type: "Dropdown", options: ["Self-Occupied", "Let Out", "Deemed Let Out"] },
              { name: "grossRentReceivable", label: "Gross rent received / receivable / lettable value", type: "Amount", required: "Conditional" },
              { name: "unrealizedRent", label: "Amount of rent which cannot be realized", type: "Amount" },
              { name: "localAuthorityTaxes", label: "Tax paid to local authorities", type: "Amount" },
              { name: "totalTaxesUnrealizedRent", label: "Total (b + c)", type: "Auto" },
              { name: "annualValue", label: "Annual Value (a – d)", type: "Auto" },
              { name: "annualValueOwnedShare", label: "Annual Value owned (% share × e)", type: "Auto" },
              { name: "standardDeduction30Percent", label: "30% of Annual Value", type: "Auto" },
              { name: "interestBorrowedCapital", label: "Interest on borrowed capital u/s 24(b)", type: "Auto", notes: "Max ₹2 lakh if Self-Occupied" },
              { name: "totalHpDeductions", label: "Total deductions (g + h)", type: "Auto" },
              { name: "arrearsRentReceived", label: "Arrears/Unrealised Rent received (less 30%)", type: "Amount" },
              { name: "incomeFromHouseProperty", label: "Income from House Property (f – i + j)", type: "Auto" },
              { name: "passThroughIncomeHp", label: "Pass Through Income/Loss from HP", type: "Amount", source: "schedulePti.hpIncome" },
              { name: "totalIncomeHouseProperty", label: "Total Income under 'House Property'", type: "Auto" }
            ]
          }
        }
      },
      linkedStakeholders: {
        title: "Linked Stakeholder Tables",
        fieldSections: {
          coOwnerDetails: {
            title: "Co-Owner Details Table",
            fields: [
              {
                name: "coOwners",
                label: "Co-Owner Records",
                type: "Table",
                columns: [
                  { name: "name", label: "Name of Other Co-owner(s)", type: "Text" },
                  { name: "pan", label: "PAN of Other Co-owner(s)", type: "Text" },
                  { name: "aadhaar", label: "Aadhaar No. of Other Co-owner(s)", type: "Text" },
                  { name: "sharePercentage", label: "Percentage share (%)", type: "Number" }
                ]
              }
            ]
          },
          tenantDetails: {
            title: "Tenant Details Table",
            fields: [
              {
                name: "tenants",
                label: "Tenant Records",
                type: "Table",
                columns: [
                  { name: "name", label: "Name(s) of Tenant", type: "Text" },
                  { name: "pan", label: "PAN of Tenant", type: "Text" },
                  { name: "aadhaar", label: "Aadhaar No. of Tenant", type: "Text" },
                  { name: "tanPanTenant", label: "PAN/TAN of Tenant", type: "Text", notes: "Required if TDS credit claimed u/s 194-IB/194-I" }
                ]
              }
            ]
          },
          loanInterestTable: {
            title: "Section 24(b) Loan Interest Table",
            fields: [
              {
                name: "loans",
                label: "Property Loan Records",
                type: "Table",
                columns: [
                  { name: "loanSource", label: "Loan taken from", type: "Dropdown", options: ["Bank", "Institution", "Person"] },
                  { name: "lenderName", label: "Name of Bank / Institution / Person", type: "Text" },
                  { name: "loanAccountNo", label: "Loan Account Number", type: "Text" },
                  { name: "sanctionDate", label: "Date of Sanction", type: "Date" },
                  { name: "totalLoanAmount", label: "Total Amount of Loan (₹)", type: "Amount" },
                  { name: "outstandingAmount", label: "Loan Outstanding at FY end (₹)", type: "Amount" },
                  { name: "interestAmount", label: "Interest on Borrowed Capital u/s 24(b) (₹)", type: "Amount" }
                ]
              }
            ]
          }
        }
      }
    }
  },

  // ==========================================
  // MAIN SECTION 4: SCHEDULE CG & VDA — CAPITAL GAINS LEDGER
  // ==========================================
  scheduleCapitalGains: {
    title: "Schedule CG & VDA: Capital Gains Ledger",
    subsections: {
      shortTermCapitalGains: {
        title: "Short-Term Capital Gains (STCG)",
        fieldSections: {
          stcgImmovableProperty: {
            title: "STCG — A1: Immovable Property",
            fields: [
              { name: "immovAcquisitionDate", label: "Date of Purchase/Acquisition", type: "Date" },
              { name: "immovSaleDate", label: "Date of Sale/Transfer", type: "Date" },
              { name: "considerationReceived", label: "Full Value of Consideration received/receivable", type: "Amount" },
              { name: "stampValuationAuthorityValue", label: "Value of property as per Stamp Valuation Authority", type: "Amount" },
              { name: "fullValueAdoptedSec50C", label: "Full Value adopted as per Sec 50C", type: "Auto" },
              { name: "costOfAcquisitionNoIndex", label: "Cost of Acquisition without indexation", type: "Amount" },
              { name: "costOfImprovementNoIndex", label: "Cost of Improvement without indexation", type: "Amount" },
              { name: "transferExpenditure", label: "Expenditure in connection with transfer", type: "Amount" },
              { name: "totalCostMatrix", label: "Total Cost Matrix (bi+bii+biii)", type: "Auto" },
              { name: "balanceConsiderationLessCost", label: "Balance (aiii – biv)", type: "Auto" },
              { name: "deductionSec54B", label: "Deduction u/s 54B", type: "Amount" },
              { name: "stcgImmovablePropertyFinal", label: "STCG on Immovable Property", type: "Auto" },
              {
                name: "buyerDetails",
                label: "Buyer Details Block Table",
                type: "Table",
                columns: [
                  { name: "name", label: "Name", type: "Text" },
                  { name: "pan", label: "PAN", type: "Text" },
                  { name: "aadhaar", label: "Aadhaar", type: "Text" },
                  { name: "sharePercentage", label: "% Share", type: "Number" },
                  { name: "amount", label: "Amount", type: "Amount" },
                  { name: "address", label: "Property Address", type: "Text" },
                  { name: "state", label: "State", type: "Dropdown" },
                  { name: "country", label: "Country", type: "Dropdown" },
                  { name: "pinCode", label: "Pin Code", type: "Text" },
                  { name: "zipCode", label: "ZIP Code", type: "Text" }
                ]
              }
            ]
          },
          stcgSlumpSaleAndEquity: {
            title: "STCG — A2: Slump Sale & Equity Shares (u/s 111A)",
            fields: [
              { name: "fmvRule11Uae_2", label: "Fair Market Value u/s Rule 11UAE(2)", type: "Amount" },
              { name: "fmvRule11Uae_3", label: "Fair Market Value u/s Rule 11UAE(3)", type: "Amount" },
              { name: "considerationSlumpSale", label: "Full Value of Consideration (Slump Sale)", type: "Auto" },
              { name: "netWorthUndertaking", label: "Net Worth of undertaking/division", type: "Amount" },
              { name: "stcgSlumpSaleFinal", label: "STCG from Slump Sale", type: "Auto" },
              { name: "considerationSec111A", label: "Full Value of Consideration (Sec 111A)", type: "Amount" },
              { name: "costOfAcquisitionSec111A", label: "Cost of Acquisition without indexation (Sec 111A)", type: "Amount" },
              { name: "costOfImprovementSec111A", label: "Cost of Improvement without indexation (Sec 111A)", type: "Amount" },
              { name: "transferExpenditureSec111A", label: "Expenditure in connection with transfer (Sec 111A)", type: "Amount" },
              { name: "totalDeductionsSec111A", label: "Total Deductions (Sec 111A)", type: "Auto" },
              { name: "balanceSec111A", label: "Balance (ia – ibiv)", type: "Auto" },
              { name: "lossDisallowedSec94_7_8", label: "Loss disallowed u/s 94(7) or 94(8)", type: "Amount" },
              { name: "stcgEquityPost23Jul2024", label: "STCG on Equity/STT-paid (Transfers on/after 23 Jul 2024)", type: "Auto", notes: "Taxed @ 20%" },
              { name: "stcgEquityPre23Jul2024", label: "STCG on Equity/STT-paid (Transfers before 23 Jul 2024)", type: "Auto", notes: "Taxed @ 15%" }
            ]
          },
          stcgNonResidentFii: {
            title: "STCG — A3 & A4: Non-Resident & FII Asset Provisioning",
            fields: [
              { name: "stcgSec111APre23Jul2024Nr", label: "STCG u/s 111A — before 23 Jul 2024 (Non-Resident)", type: "Amount" },
              { name: "stcgSec111APost23Jul2024Nr", label: "STCG u/s 111A — on/after 23 Jul 2024 (Non-Resident)", type: "Amount" },
              { name: "stcgOtherSharesNr", label: "STCG from shares/debentures not in 3a", type: "Amount" },
              { name: "considerationUnquotedFii", label: "Full Value of Consideration — unquoted shares (FII u/s 115AD)", type: "Amount" },
              { name: "fmvUnquotedFii", label: "Fair Market Value of unquoted shares (FII)", type: "Amount" },
              { name: "higherConsiderationFmvSec50CA", label: "Higher of consideration or FMV (Sec 50CA)", type: "Auto" },
              { name: "considerationOtherThanUnquotedFii", label: "Full Value of Consideration — other than unquoted (FII)", type: "Amount" },
              { name: "totalValuationConsiderationFii", label: "Total Valuation Consideration", type: "Auto" },
              { name: "costOfAcquisitionFii", label: "Cost of Acquisition (FII)", type: "Amount" },
              { name: "costOfImprovementFii", label: "Cost of Improvement (FII)", type: "Amount" },
              { name: "transferExpenditureFii", label: "Expenditure on transfer (FII)", type: "Amount" },
              { name: "totalDeductionsFii", label: "Total Deductions Matrix", type: "Auto" },
              { name: "lossDisallowedFii", label: "Loss disallowed u/s 94(7)/94(8) (FII)", type: "Amount" },
              { name: "stcgFiiSecuritiesFinal", label: "STCG from FII securities", type: "Auto" }
            ]
          },
          stcgDeemedPassThroughDtaa: {
            title: "STCG — Deemed, Pass-Through & DTAA Aggregates",
            fields: [
              { name: "hasUnutilisedCgasDeposit", label: "Whether any unutilised CGAS deposit?", type: "Radio", options: ["Yes", "No"] },
              // Sub-table logic triggered dynamically if true
              { name: "deemedStcgOtherThanCgas", label: "Amount deemed STCG — other than CGAS", type: "Amount" },
              { name: "totalDeemedStcgA6", label: "Total Deemed STCG (A6)", type: "Auto" },
              { name: "ptiStcg15Percent", label: "PTI STCG @ 15%", type: "Auto" },
              { name: "ptiStcg20Percent", label: "PTI STCG @ 20%", type: "Auto" },
              { name: "ptiStcg30Percent", label: "PTI STCG @ 30%", type: "Auto" },
              { name: "ptiStcgApplicableRates", label: "PTI STCG at applicable rates", type: "Auto" },
              {
                name: "dtaaStcgTable",
                label: "DTAA STCG Table",
                type: "Table",
                columns: [
                  { name: "amount", label: "Amount", type: "Amount" },
                  { name: "itemNo", label: "Item No", type: "Text" },
                  { name: "country", label: "Country", type: "Dropdown" },
                  { name: "dtaaArticle", label: "DTAA Article", type: "Text" },
                  { name: "treatyRate", label: "Treaty Rate", type: "Number" },
                  { name: "hasTrc", label: "TRC? (Yes/No)", type: "Dropdown", options: ["Yes", "No"] },
                  { name: "section", label: "Section", type: "Text" },
                  { name: "itActRate", label: "IT Act Rate", type: "Number" },
                  { name: "applicableRate", label: "Applicable Rate", type: "Number" }
                ]
              }
            ]
          }
        }
      },
      ltcgAndVdaLedgers: {
        title: "Long-Term Capital Gains (LTCG) & VDA",
        fieldSections: {
          ltcgImmovablePropertyAndRates: {
            title: "LTCG — B1: Immovable Property & Rates Matrix",
            fields: [
              { name: "indexedCostElements", label: "Indexed Cost Matrix Computations Block", type: "Amount", notes: "Structural mirrored fields from STCG A1 with Indexed Cost multipliers; u/s 54 exemptions align here." },
              { name: "ltcgSec112APre23Jul2024", label: "Total LTCG u/s 112A (transfers before 23 Jul 2024)", type: "Auto", notes: "Taxed @ 10%" },
              { name: "ltcgSec112APost23Jul2024", label: "Total LTCG u/s 112A (transfers on/after 23 Jul 2024)", type: "Auto", notes: "Taxed @ 12.5%" },
              { name: "totalLtcgSec112AAggregate", label: "Total LTCG u/s 112A Aggregate", type: "Auto" }
            ]
          },
          ltcgSec112AScripWise: {
            title: "LTCG — B3: Schedule 112A Scrip-wise Ledger",
            fields: [
              {
                name: "scripLedger112A",
                label: "Scrip-wise Shares/Units Records",
                type: "Table",
                columns: [
                  { name: "shareAcquiredPeriod", label: "Share/Unit Acquired", type: "Dropdown", options: ["On or before 31 Jan 2018", "After 31 Jan 2018"] },
                  { name: "shareTransferPeriod", label: "Share/Unit Transferred", type: "Dropdown", options: ["Before 23 Jul 2024", "On or after 23 Jul 2024"] },
                  { name: "isinCode", label: "ISIN Code", type: "Text", validation: "12-char lookup" },
                  { name: "shareName", label: "Name of Share/Unit", type: "Text" },
                  { name: "noOfShares", label: "No. of Shares/Units", type: "Number" },
                  { name: "salePricePerShare", label: "Sale Price per Share/Unit (₹)", type: "Amount" },
                  { name: "fullValueConsideration", label: "Full Value of Consideration (₹)", type: "Amount" },
                  { name: "costOfAcquisitionNoIndex", label: "Cost of Acquisition without indexation (₹)", type: "Auto" },
                  { name: "actualCostOfAcquisition", label: "Actual Cost of Acquisition (₹)", type: "Amount" },
                  { name: "lowerOfConsiderationFmv", label: "Lower of Col 6 & Col 11", type: "Auto" },
                  { name: "fmvPerShareJan2018", label: "Fair Market Value per share as on 31 Jan 2018 (₹)", type: "Amount" },
                  { name: "totalFmvJan2018", label: "Total FMV as on 31 Jan 2018", type: "Auto" },
                  { name: "costOfImprovementNoIndex", label: "Cost of Improvement without indexation (₹)", type: "Amount" },
                  { name: "transferExpenditure", label: "Expenditure in connection with transfer (₹)", type: "Amount" },
                  { name: "totalDeductionsSummary", label: "Total Deductions Ledger Summary", type: "Auto" },
                  { name: "balanceLtcgPerScrip", label: "Balance — LTCG per scrip", type: "Auto" }
                ]
              }
            ]
          },
          scheduleVda: {
            title: "Schedule VDA — Virtual Digital Assets",
            fields: [
              {
                name: "vdaTransactions",
                label: "VDA Ledger Entries",
                type: "Table",
                columns: [
                  { name: "acquisitionDate", label: "Date of Acquisition", type: "Date" },
                  { name: "transferDate", label: "Date of Transfer", type: "Date" },
                  { name: "taxHead", label: "Head under which income to be taxed", type: "Dropdown", options: ["Capital Gain"] },
                  { name: "costOfAcquisition", label: "Cost of Acquisition (₹)", type: "Amount" },
                  { name: "considerationReceived", label: "Consideration Received (₹)", type: "Amount" },
                  { name: "incomeFromVda", label: "Income from VDA", type: "Auto", notes: "Loss entered as zero; taxed @ 30%" }
                ]
              },
              { name: "totalVdaIncomeCapitalGains", label: "Total (Sum of all positive incomes — Capital Gain)", type: "Auto" }
            ]
          }
        }
      }
    }
  },

  // ==========================================
  // MAIN SECTION 5: SCHEDULE OS — INCOME FROM OTHER SOURCES
  // ==========================================
  scheduleOtherSources: {
    title: "Schedule OS: Income from Other Sources",
    subsections: {
      operationalIncomes: {
        title: "Structural Operational Incomes",
        fieldSections: {
          grossIncomeNormalRates: {
            title: "Gross Income at Normal Rates (Dividends & Interest)",
            fields: [
              { name: "dividendIncomeExcludingSecs", label: "Dividend income (other than 2(22)(e) & 2(22)(f))", type: "Amount" },
              { name: "dividendSec2_22_e", label: "Dividend u/s 2(22)(e)", type: "Amount" },
              { name: "dividendSec2_22_f", label: "Dividend u/s 2(22)(f)", type: "Amount" },
              { name: "dividendsGrossTotal", label: "Dividends Gross (ai+aii+aiii)", type: "Auto" },
              { name: "interestSavingsBank", label: "Interest from Savings Bank", type: "Amount" },
              { name: "interestDeposits", label: "Interest from Deposits (Bank/PO/Cooperative)", type: "Amount" },
              { name: "interestItRefund", label: "Interest from IT Refund", type: "Amount" },
              { name: "passThroughInterest", label: "Pass-through interest", type: "Auto", source: "schedulePti.interest" },
              { name: "interestAccruedPf_1", label: "Interest accrued on PF u/s 10(11) Proviso 1", type: "Amount" },
              { name: "interestAccruedPf_2", label: "Interest accrued on PF u/s 10(11) Proviso 2", type: "Amount" },
              { name: "interestAccruedPf_3", label: "Interest accrued on PF u/s 10(12) Proviso 1", type: "Amount" },
              { name: "interestAccruedPf_4", label: "Interest accrued on PF u/s 10(12) Proviso 2", type: "Amount" },
              { name: "interestOthers", label: "Others — interest from Cos., NBFCs, HFCs", type: "Amount" },
              { name: "interestGrossMatrixTotal", label: "Interest Gross Matrix", type: "Auto" }
            ]
          },
          rentalGiftSpecializedDisclosures: {
            title: "Rental, Gift & Specialized OS Disclosures",
            fields: [
              { name: "rentalPlantMachineryGross", label: "Rental income from machinery/plants/buildings (Gross)", type: "Amount" },
              { name: "giftMoneySec56_2_x", label: "Aggregate value of money received without consideration u/s 56(2)(x)", type: "Amount" },
              { name: "giftImmovablePropertyStampValue", label: "Immovable property received without consideration — stamp duty value", type: "Amount" },
              { name: "giftImmovablePropertyInadequateValue", label: "Immovable property for inadequate consideration — excess stamp value", type: "Amount" },
              { name: "giftOtherPropertyFmv", label: "Other property received without consideration — FMV", type: "Amount" },
              { name: "giftOtherPropertyInadequateFmv", label: "Other property for inadequate consideration — FMV excess", type: "Amount" },
              { name: "totalSec56_2_xSummary", label: "Total s.56(2)(x) Summary", type: "Auto" },
              { name: "familyPension", label: "Family Pension", type: "Amount" },
              { name: "retirementBenefitNotified89AOs", label: "Income from Retirement Benefit Account — Notified Country u/s 89A (OS)", type: "Amount", notes: "Sub-rows track USA/UK/Canada" },
              { name: "retirementBenefitNonNotified89AOs", label: "Income from Retirement Benefit Account — Non-Notified Country u/s 89A (OS)", type: "Amount" },
              { name: "relief89AClaimedEarlierOs", label: "Income taxable this year on which 89A relief claimed earlier", type: "Amount" },
              { name: "businessTrustSumSec56_2_xii", label: "Sum received from Business Trust u/s 56(2)(xii)", type: "Amount" },
              { name: "lifeInsuranceSumSec56_2_xiii", label: "Sum received under life insurance policy u/s 56(2)(xiii)", type: "Amount" },
              {
                name: "anyOtherIncomeTable",
                label: "Any Other Income Ledger Table",
                type: "Table",
                columns: [
                  { name: "nature", label: "Nature (Free Text)", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              { name: "grossIncomeNormalRatesTotal", label: "Gross Income at Normal Rates Summary Total", type: "Auto" }
            ]
          }
        }
      },
      tariffsAndAdjustments: {
        title: "Special Tariffs, Deductions & Breakups",
        fieldSections: {
          specialRatesIncome: {
            title: "Income Chargeable at Special Rates",
            fields: [
              { name: "winningsLotteriesSec115BB", label: "Winnings from lotteries/crossword/races/games/gambling u/s 115BB", type: "Amount", notes: "Taxed @ 30%" },
              { name: "winningsOnlineGamesSec115BBJ", label: "Gross winnings from online games u/s 115BBJ", type: "Amount", notes: "Taxed @ 30%" },
              { name: "rule133Adjustment", label: "Adjustment as per Rule 133", type: "Amount" },
              { name: "cashCreditsSec115BBE", label: "Income chargeable u/s 115BBE", type: "Amount", notes: "Tracks 6 sub-items (s.68, s.69, etc.); taxed @ 60%" },
              {
                name: "taxablePfSec111",
                label: "Accumulated balance of recognized PF taxable u/s 111",
                type: "Table",
                columns: [
                  { name: "assessmentYear", label: "AY", type: "Text" },
                  { name: "incomeBenefit", label: "Income Benefit", type: "Amount" },
                  { name: "taxBenefit", label: "Tax Benefit", type: "Amount" }
                ]
              },
              {
                name: "otherSpecialRatesIncome",
                label: "Any other income at special rates",
                type: "Table",
                columns: [
                  { name: "nature", label: "Nature", type: "Dropdown" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              {
                name: "ptiSpecialRatesIncome",
                label: "PTI in nature of OS at special rates",
                type: "Table",
                columns: [
                  { name: "nature", label: "Nature", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              {
                name: "dtaaSpecialRatesOs",
                label: "DTAA Special Rates Claims Table (OS)",
                type: "Table",
                columns: [
                  { name: "amount", label: "Amount", type: "Amount" },
                  { name: "itemNo", label: "Item No", type: "Text" },
                  { name: "country", label: "Country", type: "Dropdown" },
                  { name: "dtaaArticle", label: "DTAA Article", type: "Text" },
                  { name: "treatyRate", label: "Treaty Rate", type: "Number" },
                  { name: "hasTrc", label: "TRC?", type: "Dropdown" },
                  { name: "itActSection", label: "IT Act Section", type: "Text" },
                  { name: "itActRate", label: "IT Act Rate", type: "Number" },
                  { name: "applicableRate", label: "Applicable Rate", type: "Number" }
                ]
              }
            ]
          },
          deductionsAndBalances: {
            title: "Deductions, Balances & Adjustments",
            fields: [
              { name: "otherExpensesDeductions", label: "Expenses/deductions other than family pension", type: "Amount" },
              { name: "familyPensionDeductionSec57_iia", label: "Deduction u/s 57(iia) — family pension only", type: "Auto", logic: "Min(1/3 of pension, 25000)" },
              { name: "depreciationRentalIncome", label: "Depreciation (if rental income in 1c)", type: "Amount" },
              { name: "interestExpenditureSec57_i", label: "Interest expenditure u/s 57(i) — on dividend income", type: "Amount" },
              { name: "totalOsDeductions", label: "Total deductions", type: "Auto" },
              { name: "nonDeductibleAmountsSec58", label: "Amounts not deductible u/s 58", type: "Amount" },
              { name: "chargeableProfitsSec59", label: "Profits chargeable to tax u/s 59", type: "Amount" },
              { name: "reliefClaimedSec89AOs", label: "Income claimed for relief u/s 89A (OS)", type: "Amount" },
              { name: "netIncomeOsNormalRates", label: "Net Income from OS at normal rates", type: "Auto" },
              { name: "raceHorsesReceipts", label: "Race Horses — Receipts", type: "Amount" },
              { name: "raceHorsesDeductionsSec57", label: "Race Horses — Deductions u/s 57", type: "Amount" },
              { name: "raceHorsesBalance", label: "Race Horses — Balance", type: "Auto" },
              { name: "totalIncomeOtherSourcesFinal", label: "Total Income from Other Sources", type: "Auto" },
              { name: "quarterlyAccrualMatrix", label: "Quarterly accrual/receipt information table", type: "Matrix", notes: "5 columns x 8 income types layout for Sec 234C evaluation" }
            ]
          }
        }
      }
    }
  },

  // ==========================================
  // MAIN SECTION 6: AGGREGATIONS, DEDUCTIONS & TAXES
  // ==========================================
  aggregationsDeductionsTaxes: {
    title: "Aggregations, Deductions & Taxes",
    subsections: {
      lossesSetOffLedger: {
        title: "Losses Set-off Ledger (Schedules CYLA, BFLA, CFL)",
        fieldSections: {
          aggregatedSetOffAdjustments: {
            title: "Aggregated Set-off Adjustments",
            fields: [
              { name: "isCylaEditable", label: "Do you want to edit the details auto-populated? (CYLA)", type: "Radio", options: ["Yes", "No"] },
              { name: "isBflaEditable", label: "Do you want to edit the details auto-populated? (BFLA)", type: "Radio", options: ["Yes", "No"] }
            ]
          },
          scheduleCflCarryForwardMatrix: {
            title: "Schedule CFL — Carry Forward Matrix",
            fields: [
              {
                name: "cflMatrixRows",
                label: "Carry Forward Tracking Rows",
                type: "Table",
                notes: "Tracks 15 rows from AY 2010-11 to 2026-27",
                columns: [
                  { name: "assessmentYear", label: "Assessment Year", type: "Auto" },
                  { name: "filingDate", label: "Date of Filing", type: "Date" },
                  { name: "housePropertyLoss", label: "House Property Loss (₹)", type: "Amount" },
                  { name: "bfBusinessLoss_5a", label: "Brought Forward Business Loss (5a)", type: "Amount" },
                  { name: "adjustedSec115Bac_5b", label: "Adjusted for 115BAC (5b)", type: "Amount" },
                  { name: "availableBfBusinessLoss_5c", label: "BF Business Loss available (5c)", type: "Auto" },
                  { name: "speculativeBusinessLoss", label: "Loss from Speculative Business (₹)", type: "Amount" },
                  { name: "specifiedBusinessLoss", label: "Loss from Specified Business (₹)", type: "Amount" },
                  { name: "stcl", label: "Short-term Capital Loss (₹)", type: "Amount" },
                  { name: "ltcl", label: "Long-term Capital Loss (₹)", type: "Amount" },
                  { name: "raceHorsesLoss", label: "Loss from Race Horses (₹)", type: "Amount" }
                ]
              }
            ]
          }
        }
      },
      chapterViaDeductions: {
        title: "Schedule VI-A: Chapter VI-A Deductions",
        fieldSections: {
          partBDeductionsCertainPayments: {
            title: "Part B Deductions — Certain Payments (Old Regime Only)",
            fields: [
              {
                name: "sec80CPayments",
                label: "Section 80C Payments Table",
                type: "Table",
                columns: [
                  { name: "nature", label: "Nature", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" },
                  { name: "policyNo", label: "Policy No", type: "Text" }
                ]
              },
              {
                name: "sec80CccPayments",
                label: "Section 80CCC Payment to Pension Fund Table",
                type: "Table",
                columns: [
                  { name: "insurerName", label: "Insurer Name", type: "Text" },
                  { name: "policyNo", label: "Policy No.", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              {
                name: "sec80Ccd1Payments",
                label: "Section 80CCD(1) NPS Employee Contribution Table",
                type: "Table",
                columns: [
                  { name: "identifierType", label: "Type of Identifier", type: "Text" },
                  { name: "name", label: "Name", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ]
              },
              {
                name: "sec80Ccd1bPayments",
                label: "Section 80CCD(1B) Additional NPS Table",
                type: "Table",
                columns: [
                  { name: "pran", label: "PRAN", type: "Text" },
                  { name: "amount", label: "Amount", type: "Amount" }
                ],
                validation: "Max ₹50,000"
              },
              { name: "sec80Ccd2EmployerContribution", label: "Section 80CCD(2) Employer NPS Contribution", type: "Amount" },
              { name: "sec80CcgRgess", label: "Section 80CCG Equity Savings Scheme (RGESS)", type: "Amount" },
              { name: "sec80CcfInfraBonds", label: "Section 80CCF Infrastructure Bonds", type: "Amount" },
              { name: "sec80DHealthInsuranceAuto", label: "Section 80D Health Insurance", type: "Auto", source: "schedule80DMatrix" },
              { name: "sec80DdDisabledDependentAuto", label: "Section 80DD Disabled Dependent Care", type: "Auto", source: "schedule80U80DdDetails" },
              { name: "sec80DdbMedicalTreatmentAmount", label: "Section 80DDB Medical Treatment Specified Disease", type: "Amount" },
              { name: "sec80DdbDiseaseName", label: "Disease Name Select Dropdown", type: "Dropdown", dependOn: { field: "sec80DdbMedicalTreatmentAmount" } }
            ]
          },
          linkedDeductionsInterestMasters: {
            title: "Linked Deductions & Interest Masters (Schedules 80D, 80E, 80G)",
            fields: [
              {
                name: "schedule80DMatrix",
                label: "Schedule 80D Multi-Tier Matrix",
                type: "Matrix",
                notes: "Structures health insurance tables, preventive checkup inputs, and medical expenses across 4 categories: Self/Family (Non-Senior/Senior) and Parents (Non-Senior/Senior)."
              },
              { name: "loansInterestTable80E_80Ee_80Eea_80Eeb", label: "Sections 80E/80EE/80EEA/80EEB Loan Interest Master Table", type: "Table", notes: "Standardized structural tracks for up to 2 loan rows per section" },
              { name: "structuralDeductionInputsPartC", label: "Sections 80IA to 80LA, 80QQB, 80RRB, 80TTA/80TTB Amount Inputs Block", type: "Amount", notes: "80QQB/80RRB prompt for Form and Ack No fields." },
              { name: "totalDeductionsPartC", label: "Total Deductions (Part C)", type: "Auto" }
            ]
          }
        }
      },
      taxComputationsAndVerification: {
        title: "Part B-TI & TTI: Total Tax Computations",
        fieldSections: {
          finalComputationCards: {
            title: "Final Computation & Relief Cards",
            fields: [
              { name: "totalIncomeFinal", label: "Total Income", type: "Auto" },
              { name: "adjustedTotalIncomeSec115Jc_1", label: "Adjusted Total Income u/s 115JC(1)", type: "Auto", notes: "Computes AMT layout fields 1 to 4" },
              { name: "taxAtNormalRates", label: "Tax at normal rates", type: "Auto" },
              { name: "taxAtSpecialRates", label: "Tax at special rates", type: "Auto", source: "scheduleSi" },
              { name: "rebateSec87A", label: "Rebate u/s 87A", type: "Auto" },
              { name: "surchargeAndCess", label: "Surcharge & Health & Education Cess @ 4%", type: "Auto" },
              { name: "grossTaxLiabilityTotal", label: "Gross Tax Liability Total", type: "Auto" },
              { name: "taxDeferredEsopPerquisite", label: "Tax deferred — ESOP perquisite", type: "Auto" },
              { name: "reliefSec89", label: "Relief u/s 89", type: "Amount", notes: "Requires Ack. No. of Form 10E" },
              { name: "reliefSec89A_90_90A_91", label: "Relief u/s 89A / 90 / 90A / 91", type: "Auto", source: "scheduleTrFsi" },
              { name: "netTaxLiabilityTotal", label: "Net Tax Liability Total", type: "Auto" },
              { name: "statutoryInterestsAndFees", label: "Interest u/s 234A / 234B / 234C / Fees 234F & 234-I", type: "Auto" },
              { name: "aggregateLiability", label: "Aggregate Liability", type: "Auto" },
              { name: "taxesPaidSummaryCombined", label: "Taxes Paid Summary (Advance Tax / TDS / TCS / Self-Assessment Tax)", type: "Auto" },
              { name: "finalPayableOrRefundAmount", label: "Amount Payable / Refund Amount", type: "Auto" }
            ]
          },
          verificationAndBanks: {
            title: "Verification, Bank Accounts & ITR-U Profiles",
            fields: [
              {
                name: "taxPaymentsLedgerTables",
                label: "Schedule Tax Payments Ledger (TDS1 / TDS2 / TDS3 / TCS / IT)",
                type: "Table",
                required: true,
                columns: [
                  { name: "payerType", label: "Self/Spouse/Other Dropdown", type: "Dropdown" },
                  { name: "tanDeductor", label: "TAN of Deductor", type: "Text" },
                  { name: "financialYear", label: "FY", type: "Text" },
                  { name: "bfTdsAmount", label: "Brought Forward TDS", type: "Amount" },
                  { name: "cyTdsAmount", label: "Current Year TDS", type: "Amount" },
                  { name: "tdsClaimed", label: "TDS claimed", type: "Amount" },
                  { name: "grossReceiptsMatched", label: "Gross Receipts", type: "Amount" },
                  { name: "headOfIncome", label: "Head of Income", type: "Dropdown" }
                ]
              },
              {
                name: "bankAccountDetails",
                label: "Bank Account Details Table",
                type: "Table",
                required: true,
                columns: [
                  { name: "ifsc", label: "IFS Code", type: "Text" },
                  { name: "bankName", label: "Bank Name", type: "Text" },
                  { name: "accountNumber", label: "Account Number", type: "Text" },
                  { name: "isRefundSelected", label: "Select for Refund Checkbox", type: "Checkbox" }
                ]
              },
              {
                name: "verificationBlockFields",
                label: "Verification Block",
                type: "FormProfile",
                required: true,
                fields: [
                  { name: "verifierName", label: "Name", type: "Text" },
                  { name: "fatherName", label: "Father's Name", type: "Text" },
                  { name: "capacity", label: "Capacity", type: "Dropdown", options: ["Self", "Representative", "Other"] },
                  { name: "place", label: "Place", type: "Text" },
                  { name: "date", label: "Date", type: "Date" },
                  { name: "signatureRef", label: "Identification Signatures Reference", type: "Text" }
                ]
              },
              {
                name: "itrUpdatedReturnSection",
                label: "ITR-U Updated Return Section Sub-module",
                type: "FormSubModule",
                required: "Conditional",
                notes: "Triggered instantly if u/s 139(8A) is checked in filing details; tracks updated personal configuration parameters, adjustment criteria, and Part B-ATI tax liability rows."
              }
            ]
          }
        }
      }
    }
  }
}; 



export default itr2FieldConfig;

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
          ...col,
          required: false
        }))
      });
    } else if (field.type === 'FormProfile' || field.type === 'FormSubModule') {
      extraSections.push({
        title: field.label,
        description: field.notes,
        fields: field.fields || []
      });
    } else {
      normalFields.push(field);
    }
  });

  const sections = [];
  if (normalFields.length > 0) {
    sections.push({
      title: fieldSection.title,
      fields: normalFields
    });
  }
  return [...sections, ...extraSections];
}

function mapSubsectionsToSections(subsections) {
  let allSections = [];
  Object.values(subsections).forEach(sub => {
    if (sub.fieldSections) {
      Object.values(sub.fieldSections).forEach(fs => {
        allSections = allSections.concat(mapFieldSection(fs));
      });
    }
  });
  return allSections;
}

export const individual2ConfigMapping = {
  details: {
    permanent: {
      title: itr2FieldConfig.partAGeneral.title,
      sections: mapSubsectionsToSections({
        personalAndContact: itr2FieldConfig.partAGeneral.subsections.personalAndContact,
      })
    },
    karta: {
      title: itr2FieldConfig.partAGeneral.title,
      sections: []
    },
    members: {
      title: itr2FieldConfig.partAGeneral.title,
      sections: []
    },
    additional: {
      title: itr2FieldConfig.partAGeneral.title,
      sections: mapSubsectionsToSections({
        filingRegimeDisclosures: itr2FieldConfig.partAGeneral.subsections.filingRegimeDisclosures,
        corporateDisclosures: itr2FieldConfig.partAGeneral.subsections.corporateDisclosures,
      })
    }
  },
  income: {
    salary: {
      title: itr2FieldConfig.scheduleSalary.title,
      sections: mapSubsectionsToSections(itr2FieldConfig.scheduleSalary.subsections)
    },
    house_property: {
      title: itr2FieldConfig.scheduleHouseProperty.title,
      sections: mapSubsectionsToSections(itr2FieldConfig.scheduleHouseProperty.subsections)
    },
    capital_gains: {
      title: itr2FieldConfig.scheduleCapitalGains.title,
      sections: mapSubsectionsToSections(itr2FieldConfig.scheduleCapitalGains.subsections)
    },
    other: {
      title: itr2FieldConfig.scheduleOtherSources.title,
      sections: mapSubsectionsToSections(itr2FieldConfig.scheduleOtherSources.subsections)
    }
  },
  deductions: {
    chapter6a: {
      title: itr2FieldConfig.aggregationsDeductionsTaxes.subsections.chapterViaDeductions.title,
      sections: mapSubsectionsToSections({
        chapterViaDeductions: itr2FieldConfig.aggregationsDeductionsTaxes.subsections.chapterViaDeductions
      })
    },
    more: {
      title: itr2FieldConfig.aggregationsDeductionsTaxes.subsections.lossesSetOffLedger.title,
      sections: mapSubsectionsToSections({
        lossesSetOffLedger: itr2FieldConfig.aggregationsDeductionsTaxes.subsections.lossesSetOffLedger
      })
    }
  },
  taxes: {
    tds: {
      title: itr2FieldConfig.aggregationsDeductionsTaxes.title,
      sections: mapSubsectionsToSections({
        taxComputationsAndVerification: itr2FieldConfig.aggregationsDeductionsTaxes.subsections.taxComputationsAndVerification
      }).filter(s => s.listName === 'taxPaymentsLedgerTables')
    },
    advance_tax: {
      title: itr2FieldConfig.aggregationsDeductionsTaxes.title,
      sections: mapSubsectionsToSections({
        taxComputationsAndVerification: itr2FieldConfig.aggregationsDeductionsTaxes.subsections.taxComputationsAndVerification
      }).filter(s => s.listName !== 'taxPaymentsLedgerTables' && s.listName !== 'bankAccountDetails')
    }
  },
  filing: {
    bank: {
      title: "Bank Accounts",
      sections: mapSubsectionsToSections({
        taxComputationsAndVerification: itr2FieldConfig.aggregationsDeductionsTaxes.subsections.taxComputationsAndVerification
      }).filter(s => s.listName === 'bankAccountDetails')
    },
    efiling: {
      title: "E-Filing & Verification",
      sections: mapSubsectionsToSections({
        taxComputationsAndVerification: itr2FieldConfig.aggregationsDeductionsTaxes.subsections.taxComputationsAndVerification
      }).filter(s => s.title === 'Verification Block' || s.title === 'ITR-U Updated Return Section Sub-module')
    }
  }
};
