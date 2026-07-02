import { statesList } from "./constant";

export const itr1FieldConfig = [
  {
    id: 1,
    label: "Details",
    route: "details",
    subsections: [
      {
        id: "personal-identity",
        title: "1.1 Personal Identity",
        fieldSections: [
          {
            id: "taxpayer-profile",
            title: "Taxpayer Profile Elements",
            fields: [
              {
                name: "firstName",
                label: "First Name",
                type: "Text",
                required: true,
                validation: { alphaOnly: true, maxChars: 75 },
              },
              {
                name: "middleName",
                label: "Middle Name",
                type: "Text",
                required: false,
                validation: { alphaOnly: true, maxChars: 75 },
              },
              {
                name: "lastName",
                label: "Last Name",
                type: "Text",
                required: true,
                validation: { alphaOnly: true, maxChars: 75 },
              },
              {
                name: "pan",
                label: "PAN  Number",
                type: "Text",
                required: true,
                validation: {
                  regex: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
                  exactChars: 10,
                },
              },
              {
                name: "dob",
                label: "Date of Birth",
                type: "Date picker",
                required: true,
                validation: { format: "DD/MM/YYYY", pastDate: true },
                notes: "Used to determine senior-citizen status",
              },
            ],
          },
          {
            id: "citizen-uid",
            title: "Citizen Unique Identification & Employment",
            fields: [
              {
                name: "hasAadhaar",
                label: "Do you have an Aadhaar Number?",
                type: "Dropdown ▼",
                required: true,
                options: ["Yes", "No"],
              },
              {
                name: "aadhaarNumber",
                label: "Aadhaar Number",
                type: "Text",
                required: true,
                condition: "hasAadhaar === 'Yes'",
                validation: { digitsOnly: true, exactChars: 12 },
                notes: "Required if Aadhaar is allotted",
              },
              {
                name: "aadhaarEnrolmentId",
                label: "Aadhaar Enrolment ID",
                type: "Text",
                required: true,
                condition: "hasAadhaar === 'No'",
                validation: { digitsOnly: true, exactChars: 28 },
                notes:
                  "Required ONLY if Aadhaar not yet allotted (all digits + date/time)",
              },
              {
                name: "natureOfEmployment",
                label: "Nature of Employment",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { code: "CG", label: "Central Government" },
                  { code: "SG", label: "State Government" },
                  { code: "PSE", label: "Public Sector Undertaking" },
                  { code: "PE", label: "Pensioners – Central Government" },
                  { code: "PSP", label: "Pensioners – State Government" },
                  {
                    code: "PPS",
                    label: "Pensioners – Public Sector Undertaking",
                  },
                  { code: "PO", label: "Pensioners – Others" },
                  { code: "OTH", label: "Others" },
                  {
                    code: "NA",
                    label: "Not Applicable (e.g., Family Pension)",
                  },
                ],
                notes:
                  "Determines deduction eligibility (e.g., entertainment allowance)",
              },
            ],
          },
        ],
      },
      {
        id: "contact-communications",
        title: "1.2 Contact Details",
        fieldSections: [
          {
            id: "digital-touchpoints",
            title: "Digital Contact Nodes",
            fields: [
              {
                name: "primaryEmailId",
                label: "Primary Email ID",
                type: "Email",
                required: true,
                validation: { emailFormat: true },
                notes: "Used for all communications",
              },
              {
                name: "primaryMobileNumber",
                label: "Primary Mobile Number",
                type: "Tel",
                required: true,
                validation: {
                  countryCode: "+91",
                  digitsOnly: true,
                  exactChars: 10,
                },
                notes: "10-digit mobile starting with 6-9 for India",
              },

              {
                name: "secondaryEmailId",
                label: "Secondary Email ID",
                type: "Email",
                required: false,
                validation: { emailFormat: true },
                notes: "Optional; backup contact",
              },

              {
                name: "secondaryMobileNumber",
                label: "Secondary Mobile Number",
                type: "Tel",
                required: false,
                validation: { countryCodeSelectable: true, exactChars: 10 },
                notes: "Optional secondary mobile",
              },
            ],
          },
        ],
      },
      {
        id: "address-specifications",
        title: "1.3 & 1.4 Address Configurations",
        fieldSections: [
          {
            id: "primary-address-block",
            title: "1.3 Primary Address Matrix",
            fields: [
              {
                name: "primaryFlatDoorBlockNo",
                label: "Flat / Door / Block No.",
                type: "Text",
                required: true,
              },
              {
                name: "primaryBuildingPremisesVillage",
                label: "Name of Premises / Building / Village",
                type: "Text",
                required: false,
              },
              {
                name: "primaryRoadStreetPostOffice",
                label: "Road / Street / Post Office",
                type: "Text",
                required: false,
              },
              {
                name: "primaryAreaLocality",
                label: "Area / Locality",
                type: "Text",
                required: false,
              },
              {
                name: "primaryTownCityDistrict",
                label: "Town / City / District",
                type: "Text",
                required: true,
              },
              {
                name: "primaryState",
                label: "State",
                type: "Dropdown ▼",
                required: true,
                options: statesList,
              },
              {
                name: "primaryCountryRegion",
                label: "Country / Region",
                type: "Dropdown ▼",
                required: true,
                options: [{ value: "India", label: "India" }],
                defaultValue: "India",
              },
              {
                name: "primaryPinCode",
                label: "PIN Code",
                type: "Text (6 digits)",
                required: true,
                condition: "domestic_address",
                validation: { regex: "^[1-9][0-9]{5}$" },
                notes: "Required for Indian addresses; first digit cannot be 0",
              },
              // {
              //   name: "primaryZipCode",
              //   label: "ZIP Code",
              //   type: "Text",
              //   required: false,
              //   condition: "foreign_address_without_pin",
              //   notes: "Required for foreign addresses when no PIN",
              // },
            ],
          },
          {
            id: "secondary-address-block",
            title: "1.4 Secondary Address Replication",
            fields: [
              {
                name: "isSecondaryAddressSameAsPrimary",
                label: "Is the secondary address same as primary address?",
                type: "Dropdown ▼ (Yes/No Dropdown ▼)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                notes:
                  "Collapses/hides the secondary address block when 'Yes' is selected",
              },
              {
                name: "secondaryFlatDoorBlockNo",
                label: "Secondary Flat / Door / Block No.",
                type: "Text",
                required: "Conditional",
                condition: "secondary_address_not_same",
              },
              {
                name: "secondaryBuildingPremisesVillage",
                label: "Secondary Name of Premises / Building / Village",
                type: "Text",
                required: false,
              },
              {
                name: "secondaryRoadStreetPostOffice",
                label: "Secondary Road / Street / Post Office",
                type: "Text",
                required: false,
              },
              {
                name: "secondaryAreaLocality",
                label: "Secondary Area / Locality",
                type: "Text",
                required: false,
              },
              {
                name: "secondaryTownCityDistrict",
                label: "Secondary Town / City / District",
                type: "Text",
                required: "Conditional",
                condition: "secondary_address_not_same",
              },
              {
                name: "secondaryState",
                label: "Secondary State",
                type: "Dropdown ▼",
                required: "Conditional",
                condition: "secondary_address_not_same",
                options: statesList,
              },
              {
                name: "secondaryCountryRegion",
                label: "Secondary Country / Region",
                type: "Dropdown ▼",
                required: "Conditional",
                condition: "secondary_address_not_same",
                options: [{ value: "India", label: "India" }],
                defaultValue: "India",
              },
              {
                name: "secondaryPinCode",
                label: "Secondary PIN Code",
                type: "Text (6 digits)",
                //  required: "Conditional",
                required: true,
                condition: "secondary_address_not_same_domestic",
              },
              // {
              //   name: "secondaryZipCode",
              //   label: "Secondary ZIP Code",
              //   type: "Text",
              //   required: false,
              //   condition: "secondary_address_not_same_foreign",
              // },
            ],
          },
        ],
      },
    ],
  },

  {
    id: 2,
    label: "Income Sources",
    route: "income",
    subsections: [
      {
        id: "salary-pension-income",
        title: "2.1 Salary / Pension (Schedule B1)",
        fieldSections: [
          {
            id: "gross-salary-breakup",
            title: "2.1.1 Gross Salary Breakup (Form 16 Sourced - Max 2 rows)",
            fields: [
              {
                name: "salaryAsPerSection17_1",
                refCode: "B1-ia",
                label: "Salary as per Section 17(1)",
                type: "Amount (₹)",
                required: true,
                notes: "Base salary from employer",
              },
              {
                name: "valueIOfPerquisitesuS17_2",
                refCode: "B1-ib",
                label: "Value of Perquisites u/s 17(2)",
                type: "Amount (₹)",
                required: false,
                notes: "Non-monetary benefits",
              },
              {
                name: "profitInLieuOfSalaryuS17_3",
                refCode: "B1-ic",
                label: "Profit in lieu of Salary u/s 17(3)",
                type: "Amount (₹)",
                required: false,
              },
              {
                name: "grossSalaryTotal",
                refCode: "B1-i",
                label: "Gross Salary Total",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "B1-ia + B1-ib + B1-ic",
              },
              {
                name: "retirementBenefitIncomeNotified89A",
                refCode: "B1-id",
                label:
                  "Income from Retirement Benefit Account (Notified Country) u/s 89A",
                type: "Amount (₹) + Country Dropdown ▼",
                required: false,
                options: [
                  { value: "USA", label: "USA" },
                  { value: "UK", label: "UK" },
                  { value: "Canada", label: "Canada" },
                ],
              },
              {
                name: "retirementBenefitIncomeNonNotified89A",
                refCode: "B1-ie",
                label:
                  "Income from Retirement Benefit Account (Non-Notified Country) u/s 89A",
                type: "Amount (₹)",
                required: false,
              },
            ],
          },
          {
            id: "exempt-allowances-sec10",
            title:
              "2.1.2 Allowances Exempt u/s 10 (Repeating Table up to 2 rows)",
            fields: [
              {
                name: "natureOfExemptAllowance",
                label: "Nature of Exempt Allowance",
                type: "Dropdown ▼",
                required: "Conditional",
                condition: "row_used",
                options: [
                  { value: "Sec 10(5)-LTA", label: "Sec 10(5)-LTA" },
                  { value: "Sec 10(6)", label: "Sec 10(6)" },
                  { value: "Sec 10(7)", label: "Sec 10(7)" },
                  { value: "Sec 10(10)", label: "Sec 10(10)" },
                  { value: "Sec 10(10A)", label: "Sec 10(10A)" },
                  { value: "Sec 10(10AA)", label: "Sec 10(10AA)" },
                  {
                    value: "Sec 10(10B) First Proviso",
                    label: "Sec 10(10B) First Proviso",
                  },
                  {
                    value: "Sec 10(10B) Second Proviso",
                    label: "Sec 10(10B) Second Proviso",
                  },
                  { value: "Sec 10(10C)", label: "Sec 10(10C)" },
                  { value: "Sec 10(10CC)", label: "Sec 10(10CC)" },
                  { value: "Sec 10(14)(i)", label: "Sec 10(14)(i)" },
                  { value: "Sec 10(14)(ii)", label: "Sec 10(14)(ii)" },
                  {
                    value: "Sec 10(16) Scholarship",
                    label: "Sec 10(16) Scholarship",
                  },
                  { value: "Sec 10(17) MP/MLA", label: "Sec 10(17) MP/MLA" },
                  { value: "Sec 10(17A) Award", label: "Sec 10(17A) Award" },
                  {
                    value: "Sec 10(18) Gallantry Award",
                    label: "Sec 10(18) Gallantry Award",
                  },
                  {
                    value: "Defense Medical Disability",
                    label: "Defense Medical Disability",
                  },
                  {
                    value: "Sec 10(19) AF Family Pension",
                    label: "Sec 10(19) AF Family Pension",
                  },
                  { value: "Sec 10(26)", label: "Sec 10(26)" },
                  { value: "Sec 10(26AAA)", label: "Sec 10(26AAA)" },
                  {
                    value: "Sec 10(12C) Agniveer",
                    label: "Sec 10(12C) Agniveer",
                  },
                  { value: "Any Other", label: "Any Other" },
                ],
              },
              {
                name: "allowanceAmount",
                label: " exempt Allowance Amount",
                type: "Amount (₹)",
                // required: "Conditional", 
                condition: "row_used",
              },
              {
                name: "hra10_13A_subTotal",
                label: "HRA 10(13A) sub-total",
                type: "Amount (🔒 Auto)",
                required: false,
                notes: "Pulled dynamically from Dedicated Schedule 10(13A)",
              },
              {
                name: "totalAllowancesExempt_ii",
                label: "Total Allowances Exempt (ii)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "allowanceAmount + hra10_13A_subTotal",
              },
            ],
          },
          {
            id: "net-salary-deductions-sec16",
            title: "2.1.3 Net Salary & Deductions u/s 16",
            fields: [
              {
                name: "incomeClaimedForRelief89A",
                ref: "B1-iia",
                label: "Less: Income claimed for relief u/s 89A (iia)",
                type: "Amount (🔒 Auto)",
                required: false,
                notes: "Auto calculated from 89A schedule mappings",
              },

              // {
              //   name: "netSalary", ref: "B1-iii", label: "Net Salary (iii = i – ii)", type: "Amount (🔒 Auto)", required: false,
              //   formula: "B1-i - B1-iia"
              // },

              {
                name: "netSalary",
                ref: "B1-iii",
                label: "Net Salary (iii = i – ii)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "grossSalaryTotal - totalAllowancesExempt_ii",
              },

              {
                name: "standardDeduction16_ia",
                ref: "B1-iva",
                label: "Standard Deduction u/s 16(ia)",
                type: "Amount (₹)",
                required: false,
                notes: "Statutory cap logic applied automatically by system",
              },
              {
                name: "entertainmentAllowance16_ii",
                ref: "B1-ivb",
                label: "Entertainment Allowance u/s 16(ii)",
                type: "Amount (₹)",
                required: false,
                notes: "Restricted to Government employees only",
              },
              {
                name: "professionalTax16_iii",
                ref: "B1-ivc",
                label: "Professional Tax u/s 16(iii)",
                type: "Amount (₹)",
                required: false,
              },
              {
                name: "totalDeductions16",
                ref: "B1-iv",
                label: "Total Deductions u/s 16 (iva+ivb+ivc)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "B1-iva + B1-ivb + B1-ivc",
              },
              {
                name: "incomeChargeableUnderSalaries",
                ref: "B1-v",
                label: "Income Chargeable under Salaries (iii – iv)",
                type: "Amount (🔒 Auto)",
                required: false,
                notes: "Final salary income figure",
                formula: "B1-iii - B1-iv",
              },
            ],
          },
        ],
      },
      {
        id: "house-property-income",
        title: "2.2 House Property Income (Schedule B2 / SCH HP)",
        fieldSections: [
          {
            id: "hp-trigger-section",
            title: "House Property Income Option",
            fields: [
              {
                name: "isAnyHouseProperty",
                label: "Do you want to add House Property Income?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                defaultValue: "No",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
            ],
          },
          {
            id: "hp-address-ownership",
            title:
              "2.2.1 Property Address & Ownership (Configured Per Property - Max 2)",
            condition: "isAnyHouseProperty === 'Yes'",
            fields: [
              {
                name: "hpAddressFull",
                label: "Address",
                type: "Text",
                required: true,
                condition: "isAnyHouseProperty === 'Yes'",
              },
              {
                name: "hpTownCity",
                label: "Town / City",
                type: "Text",
                required: true,
                condition: "isAnyHouseProperty === 'Yes'",
              },

              {
                name: "hpState",
                label: "State",
                type: "Dropdown ▼",
                required: true,
                options: statesList,
                condition: "isAnyHouseProperty === 'Yes'",
              },

              {
                name: "hpCountry",
                label: "Country",
                type: "Dropdown ▼",
                required: true,
                defaultValue: "91-INDIA",
                options: [{ value: "91-INDIA", label: "91-INDIA" }],
                condition: "isAnyHouseProperty === 'Yes'",
              },
              {
                name: "hpPinCode",
                label: "PIN Code",
                type: "Text (6 digits)",
                required: true,
                condition: "isAnyHouseProperty === 'Yes' && domestic_hp",
              },
              {
                name: "ownerOfTheProperty",
                label: "Owner of the Property",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Self", label: "Self" },
                  { value: "Co-owner", label: "Co-owner" },
                  { value: "Deemed Owner", label: "Deemed Owner" },
                ],
                condition: "isAnyHouseProperty === 'Yes'",
              },
              {
                name: "isPropertyCoOwned",
                label: "Is the property co-owned?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                notes: "Toggles visibility of the co-owner table block",
                condition: "isAnyHouseProperty === 'Yes'",
              },
              {
                name: "yourPercentageShare",
                label: "Your percentage of share (%)",
                type: "Number (0–100)",
                required: true,
                validation: { min: 0.0, max: 100.0, decimals: 2 },
                condition: "isAnyHouseProperty === 'Yes'",
              },
              {
                name: "typeOfHouseProperty",
                label: "Type of House Property",
                type: "Dropdown ▼",
                required: true,
                condition: "isAnyHouseProperty === 'Yes'",
                options: [
                  { value: "Self-Occupied", label: "Self-Occupied" },
                  { value: "Let Out", label: "Let Out" },
                  { value: "Deemed Let Out", label: "Deemed Let Out" },
                ],
              },
            ],
          },
          {
            id: "hp-coowner-details",
            title:
              "2.2.2 Co-owner Details Grid (Repeating Table up to 7 rows, Conditional)",
            condition: "isAnyHouseProperty === 'Yes' && isPropertyCoOwned === 'Yes'",
            fields: [
              {
                name: "nameOfOtherCoOwner",
                label: "Name of Other Co-owner(s)",
                type: "Text",
                required: "Conditional",
                condition: "isAnyHouseProperty === 'Yes' && isPropertyCoOwned === 'Yes'",
              },
              {
                name: "panOfOtherCoOwner",
                label: "PAN of Other Co-owner(s)",
                type: "Text (PAN format)",
                required: "Conditional",
                validation: { pattern: "PAN" },
                condition: "isAnyHouseProperty === 'Yes' && isPropertyCoOwned === 'Yes'",
              },
              {
                name: "aadhaarOfOtherCoOwner",
                label: "Aadhaar No. of Other Co-owner(s)",
                type: "Text (12 digits)",
                required: false,
                condition: "isAnyHouseProperty === 'Yes' && isPropertyCoOwned === 'Yes'",
              },
              {
                name: "percentageShareOfOtherCoOwner",
                label: "Percentage share of other co-owner(s) (%)",
                type: "Number",
                required: "Conditional",
                condition: "isAnyHouseProperty === 'Yes' && isPropertyCoOwned === 'Yes'",
              },
            ],
          },
          {
            id: "hp-tenant-details",
            title: "2.2.3 Tenant Details",
            condition: "isAnyHouseProperty === 'Yes' && (typeOfHouseProperty === 'Let Out' || typeOfHouseProperty === 'Deemed Let Out')",
            fields: [
              {
                name: "namesOfTenant",
                label: "Name(s) of Tenant (up to 3 rows)",
                type: "Text",
                required: "Conditional",
                condition: "isAnyHouseProperty === 'Yes' && (typeOfHouseProperty === 'Let Out' || typeOfHouseProperty === 'Deemed Let Out')",
              },
              {
                name: "panOfTenant",
                label: "PAN of Tenant(s)",
                type: "Text",
                required: "Conditional",
                condition: "isAnyHouseProperty === 'Yes' && (typeOfHouseProperty === 'Let Out' || typeOfHouseProperty === 'Deemed Let Out')",
              },
              {
                name: "aadhaarOfTenant",
                label: "Aadhaar No. of Tenant(s)",
                type: "Text",
                required: false,
                condition: "isAnyHouseProperty === 'Yes' && (typeOfHouseProperty === 'Let Out' || typeOfHouseProperty === 'Deemed Let Out')",
              },
              {
                name: "panTanOfTenantTdsCredit",
                label: "PAN/TAN of Tenant (if TDS credit claimed)",
                type: "Text",
                required: "Conditional",
                condition: "isAnyHouseProperty === 'Yes' && (typeOfHouseProperty === 'Let Out' || typeOfHouseProperty === 'Deemed Let Out')",
              },
            ],
          },
          {
            id: "hp-income-computation",
            title: "2.2.4 Income Computation per Property Matrix",
            condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
            fields: [
              {
                name: "grossRentReceived",
                ref: "a",
                label: "a. Gross rent received / receivable / lettable value",
                type: "Amount (₹)",
                required: "Conditional",
                condition: "isAnyHouseProperty === 'Yes' && (typeOfHouseProperty === 'Let Out' || typeOfHouseProperty === 'Deemed Let Out')",
              },
              {
                name: "unrealizedRentAmount",
                ref: "b",
                label: "b. Amount of rent which cannot be realized",
                type: "Amount (₹)",
                required: false,
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "localAuthorityTaxesPaid",
                ref: "c",
                label: "c. Tax paid to local authorities",
                type: "Amount (₹)",
                required: false,
                notes: "Municipal tax",
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "totalUnrealizedAndLocalTaxes",
                ref: "d",
                label: "d. Total (b + c)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "b + c",
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "annualValue",
                ref: "e",
                label: "e. Annual Value (a – d)",
                type: "Amount (🔒 Auto)",
                required: false,
                notes:
                  "Auto calculated to Nil if property type is self-occupied",
                formula: "a - d",
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "annualValueShare",
                ref: "f",
                label: "f. Annual value (share) = (% share × e)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "(yourPercentageShare / 100) * e",
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "standardDeduction30Percent",
                ref: "g",
                label: "g. 30% of Annual Value (30% × f)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "0.30 * f",
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "interestOnBorrowedCapital24b_hp",
                ref: "h",
                label: "h. Interest on borrowed capital u/s 24(b)",
                type: "Amount (🔒 Auto)",
                required: false,
                notes:
                  "Linked directly to the Section 24(b) internal schedule row items mapping",
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "totalHpDeductions",
                ref: "i",
                label: "i. Total deductions (g + h)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "g + h",
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "arrearsUnrealisedRentReceived",
                ref: "j",
                label: "j. Arrears / Unrealised Rent received (less 30%)",
                type: "Amount (₹)",
                required: false,
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "incomeFromHouseProperty",
                ref: "k",
                label: "k. Income from house property (f – i + j)",
                type: "Amount (🔒 Auto)",
                required: false,
                notes:
                  "Can result in negative numeric value. Total multi-property aggregate net set-off loss capped at ₹2,00,000 within ITR-1",
                formula: "f - i + j",
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
              {
                name: "claimSection24bInterest",
                label: "Do you want to add Section 24(b) Loan Details?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                defaultValue: "No",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                condition: "isAnyHouseProperty === 'Yes' && typeOfHouseProperty",
              },
            ],
          },
          {
            id: "hp-loan-interest-table",
            title:
              "2.2.5 Section 24(b) Loan Interest Internal Grid (Per Property - Up to 4 Rows)",
            condition: "isAnyHouseProperty === 'Yes' && claimSection24bInterest === 'Yes'",
            fields: [
              {
                name: "hpLoanSourceType",
                label: "Loan taken from",
                type: "Dropdown ▼",
                required: "Conditional",
                condition: "row_used",
                options: [
                  { value: "Bank", label: "Bank" },
                  { value: "Institution", label: "Institution" },
                  { value: "Person", label: "Person" },
                ],
              },
              {
                name: "hpLoanLenderName",
                label: "Name of Bank / Institution / Person",
                type: "Text",
                required: "Conditional",
                // condition: "row_used", 
                            condition: "isAnyHouseProperty === 'Yes' && claimSection24bInterest === 'Yes'",

              },
              {
                name: "hpLoanAccountNumber",
                label: "Loan Account Number",
                type: "Text",
                required: "Conditional",
                // condition: "row_used", 
                 condition: "isAnyHouseProperty === 'Yes' && claimSection24bInterest === 'Yes'",
              },
              {
                name: "hpLoanSanctionDate",
                label: "Date of Sanction of Loan",
                type: "Date",
                required: "Conditional",
                // condition: "row_used",
                 condition: "isAnyHouseProperty === 'Yes' && claimSection24bInterest === 'Yes'",
              },
              {
                name: "hpLoanTotalAmount",
                label: "Total Amount of Loan (₹)",
                type: "Amount",
                required: "Conditional",
                // condition: "row_used", 
                 condition: "isAnyHouseProperty === 'Yes' && claimSection24bInterest === 'Yes'",
              },
              {
                name: "hpLoanOutstandingAmount",
                label: "Loan Outstanding as on last date of FY (₹)",
                type: "Amount",
                required: "Conditional",
                // condition: "row_used",
                 condition: "isAnyHouseProperty === 'Yes' && claimSection24bInterest === 'Yes'",
              },
              {
                name: "hpLoanInterestClaimed",
                label: "Interest on Borrowed Capital u/s 24(b) (₹)",
                type: "Amount",
                required: "Conditional",
                //  condition: "row_used", 
                 condition: "isAnyHouseProperty === 'Yes' && claimSection24bInterest === 'Yes'", 
              },
            ],
          },
        ],
      },
      {
        id: "hra-calculation-schedule",
        title: "2.3 Schedule 10(13A) — House Rent Allowance (HRA)",
        fieldSections: [
          {
            id: "hra-variables-ledger",
            title: "HRA Variables & Processing Ledger",
            fields: [    

                      { 
                name: "housePropertyIncomeExists", 
                label: "Do you want to claim House Rent Allowance (HRA)?", 
                type: "Dropdown ▼ (Yes/No)", 
                required: true, 
                defaultValue: "No",  
                options: [ 
                  { value: "Yes", label: "Yes" }, 
                  { value: "No", label: "No" }, 
                ], 
                notes: "Toggles visibility of the HRA calculation fields." 
              }, 

              {
                name: "hraPlaceOfResidence",
                label: "1. Place of Residence",
                type: "Dropdown ▼",
                required: true, 
                 condition: "housePropertyIncomeExists === 'Yes'",
                options: [
                  { value: "Metro City", label: "Metro City" },
                  { value: "Non-Metro City", label: "Non-Metro City" },
                ],
                notes:
                  "Metro flags a 50% statutory threshold whereas non-metro determines a 40% threshold execution",
              },
              {
                name: "actualHraReceived_A",
                label: "2. Actual HRA Received (A)",
                type: "Amount (₹)", 
                condition: "housePropertyIncomeExists === 'Yes'",
                required: true,
                notes: "Sourced from Form 16 components",
              },
              {
                name: "actualRentPaid",
                label: "3. Actual Rent Paid",
                type: "Amount (₹)",
                required: true,
                condition: "housePropertyIncomeExists === 'Yes'",
              },
              {
                name: "hraBasicSalary",
                label: "4a. Basic Salary",
                type: "Amount (₹)",
                required: true,
                condition: "housePropertyIncomeExists === 'Yes'",
              },
              {
                name: "hraDearnessAllowance",
                label: "4b. Dearness Allowance",
                type: "Amount (₹)",
                required: false,
                condition: "housePropertyIncomeExists === 'Yes'",
              },
              {
                name: "rentPaidLessTenPercentSalary_B",
                label: "5. Actual Rent Paid – 10% of Salary (B) = 3 – 10% of 4",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "housePropertyIncomeExists === 'Yes'",
                formula:
                  "actualRentPaid - (0.10 * (hraBasicSalary + hraDearnessAllowance))",
              },
              {
                name: "salaryPercentageThreshold_C",
                label: "6. 50%/40% of Salary (C)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "housePropertyIncomeExists === 'Yes'",
                notes:
                  "50% evaluation for metro locations, 40% alternative for non-metros",
              },
              {
                name: "eligibleExemptAllowance10_13A",
                label:
                  "7. Eligible Exempt Allowance u/s 10(13A) = Min(A, B, C)",
                type: "Amount (🔒 Auto)",
                condition: "housePropertyIncomeExists === 'Yes'",
                required: false,
                notes:
                  "Feeds directly back into exempt allowances breakdown under gross salary calculations",
              },
            ],
          },
        ],
      },
      // {
      //   id: "standalone-loan-interest-schedule",
      //   title: "2.4 Schedule Section 24(b) — Standalone Dedicated Matrix",
      //   fieldSections: [
      //     {
      //       id: "standalone-24b-grid",
      //       title:
      //         "Standalone Borrowed Capital Input Fields (Up to 4 Rows - Row 1 defaults to Bank)",
      //       fields: [ 
      //           {
      //           name: "interestOnHomeLoan",
      //           label: "Do you want to Capitalize Interest on Home Loan?",
      //           type: "Dropdown ▼ (Yes/No)",
      //           required: true, 
      //           defaultValue: "No",  
      //           options: [
      //             { value: "Yes", label: "Yes" },
      //             { value: "No", label: "No" },
      //           ],
      //         }, 

      //         {
      //           name: "standalone24bSourceType",
      //           label: "Loan taken from (i)",
      //           type: "Dropdown ▼",
      //           required: true, 
      //           condition: "interestOnHomeLoan === 'Yes'",
      //           options: [
      //             { value: "Bank", label: "Bank" },
      //             { value: "Institution", label: "Institution" },
      //             {
      //               value: "Person (individual)",
      //               label: "Person (individual)",
      //             },
      //           ],
      //         },
      //         {
      //           name: "standalone24bBankIfsc",
      //           label: "IFSC Code of Bank (iia)",
      //            condition: "interestOnHomeLoan === 'Yes'",
      //           type: "Text / Lookup ▼",
      //           required: "Conditional",
      //           condition: "Loan_from_Bank",
      //           validation: { exactChars: 11 },
      //         },
      //         {
      //           name: "standalone24bLenderPan",
      //           label: "PAN of Institution/Person (iib)",
      //           type: "Text (PAN format)",
      //            condition: "interestOnHomeLoan === 'Yes'",
      //           required: "Conditional",
      //           condition: "Institution_or_Person",
      //         },
      //         {
      //           name: "standalone24bLenderName",
      //           label: "Name of Bank / Institution / Person (ii)",
      //           type: "Text",
      //            condition: "interestOnHomeLoan === 'Yes'",
      //           required: true,
      //         },
      //         {
      //           name: "standalone24bAccountNo",
      //           label: "Loan Account Number of Bank/Institution (iii)",
      //           type: "Text",
      //            condition: "interestOnHomeLoan === 'Yes'",
      //           required: true,
      //         },
      //         {
      //           name: "standalone24bSanctionDate",
      //           label: "Date of Sanction of Loan (iv)",
      //           type: "Date",
      //            condition: "interestOnHomeLoan === 'Yes'",
      //           required: true,
      //         },
      //         {
      //           name: "standalone24bTotalLoanAmount",
      //           label: "Total Amount of Loan (v) ₹",
      //           type: "Amount",
      //            condition: "interestOnHomeLoan === 'Yes'",
      //           required: true,
      //         },
      //         {
      //           name: "standalone24bOutstandingAmount",
      //           label: "Loan Outstanding as on last date of FY (vi) ₹",
      //           type: "Amount",
      //           required: true,
      //            condition: "interestOnHomeLoan === 'Yes'",
      //         },
      //         {
      //           name: "standalone24bInterestAmount",
      //           label: "Interest on Borrowed Capital u/s 24(b) (vii) ₹",
      //           type: "Amount",
      //           required: true,
      //            condition: "interestOnHomeLoan === 'Yes'",
      //         },
      //         {
      //           name: "standalone24bTotalInterestSummary",
      //           label: "Total Interest u/s 24(b)",
      //           type: "Amount (🔒 Auto)",
      //           required: false,
      //            condition: "interestOnHomeLoan === 'Yes'",
      //           notes:
      //             "Mathematical accumulation of across the board (vii) row items",
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        id: "other-sources-income",
        title: "2.5 Income from Other Sources",
        fieldSections: [  
          {
            id: "other-sources-individual-items",
            title: "Other Sources Sub-items Grid Mapping",
            fields: [    
               {
                name: "IncomeSourceOther",
                label: "Do you want to add Income from Other Sources?",
                type: "Dropdown ▼ (Yes/No)",
                required: true, 
                defaultValue: "No",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },

              {
                name: "interestFromSavingsBankAccount",
                label: "Interest from Savings Bank Account",
                type: "Amount (₹)",
                required: false,
                condition: "IncomeSourceOther === 'Yes'",  
              }, 
              {
                name: "interestFromDeposits",
                label:
                  "Interest from Deposits (Bank/Post Office/Cooperative Society)",
                type: "Amount (₹)",
                required: false,
                 condition: "IncomeSourceOther === 'Yes'",   

              },
              {
                name: "interestFromIncomeTaxRefund",
                label: "Interest from Income Tax Refund",
                type: "Amount (₹)",
                required: false,
                condition: "IncomeSourceOther === 'Yes'",    
              },
              {
                name: "familyPensionAmount",
                label: "Family Pension",
                type: "Amount (₹)",
                required: false,
                condition: "IncomeSourceOther === 'Yes'",  
              },
              {
                name: "pfInterestTaxable1stProviso10_11",
                label:
                  "Interest accrued on PF contributions (taxable – 1st proviso s.10(11))",
                type: "Amount (₹)",
                required: false,
          condition: "IncomeSourceOther === 'Yes'",  
              },
              {
                name: "pfInterestTaxable2ndProviso10_11",
                label:
                  "Interest accrued on PF contributions (taxable – 2nd proviso s.10(11))",
                type: "Amount (₹)",
                required: false,
                condition: "IncomeSourceOther === 'Yes'",  
              },
              {
                name: "pfInterestTaxable1stProviso10_12",
                label:
                  "Interest accrued on PF contributions (taxable – 1st proviso s.10(12))",
                type: "Amount (₹)",
                required: false,
                condition: "IncomeSourceOther === 'Yes'",  
              },
              {
                name: "pfInterestTaxable2ndProviso10_12",
                label:
                  "Interest accrued on PF contributions (taxable – 2nd proviso s.10(12))",
                type: "Amount (₹)",
                required: false,
                condition: "IncomeSourceOther === 'Yes'",  
              },
              {
                name: "anyOtherIncomeWithDescription",
                label: "Any Other (with description)",
                type: "Amount (₹) + Text",
                required: false,
                condition: "IncomeSourceOther === 'Yes'",  
                notes:
                  "Free-text description is strictly required dynamically if the respective amount cell contains a value",
              },
              {
                name: "totalIncomeFromOtherSources",
                label: "Total Income from Other Sources",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "Sum of all sub-items in this section",
               condition: "IncomeSourceOther === 'Yes'",   
              },
            ],
          },  

            {
            id: "standalone-24b-grid",
            title:
              "Standalone Borrowed Capital Input Fields (Up to 4 Rows - Row 1 defaults to Bank)",
            fields: [ 
                {
                name: "interestOnHomeLoan",
                label: "Do you want to add Section 24(b) Loan Details?",
                type: "Dropdown ▼ (Yes/No)",
                required: true, 
                defaultValue: "No",  
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              }, 

              {
                name: "standalone24bSourceType",
                label: "Loan taken from (i)",
                type: "Dropdown ▼",
                required: true, 
                condition: "interestOnHomeLoan === 'Yes'",
                options: [
                  { value: "Bank", label: "Bank" },
                  { value: "Institution", label: "Institution" },
                  {
                    value: "Person (individual)",
                    label: "Person (individual)",
                  },
                ],
              },
              {
                name: "standalone24bBankIfsc",
                label: "IFSC Code of Bank (iia)",
                type: "Text / Lookup ▼",
                required: "Conditional",
                condition: "interestOnHomeLoan === 'Yes' && standalone24bSourceType === 'Bank'",
                validation: { exactChars: 11 },
              },
              {
                name: "standalone24bLenderPan",
                label: "PAN of Institution/Person (iib)",
                type: "Text (PAN format)",
                required: "Conditional",
                condition: "interestOnHomeLoan === 'Yes' && (standalone24bSourceType === 'Institution' || standalone24bSourceType === 'Person (individual)')",
              },
              {
                name: "standalone24bLenderName",
                label: "Name of Bank / Institution / Person (ii)",
                type: "Text",
                required: true,
                condition: "interestOnHomeLoan === 'Yes'",
              },
              {
                name: "standalone24bAccountNo",
                label: "Loan Account Number of Bank/Institution (iii)",
                type: "Text",
                required: true,
                condition: "interestOnHomeLoan === 'Yes'",
              },
              {
                name: "standalone24bSanctionDate",
                label: "Date of Sanction of Loan (iv)",
                type: "Date",
                required: true,
                condition: "interestOnHomeLoan === 'Yes'",
              },
              {
                name: "standalone24bTotalLoanAmount",
                label: "Total Amount of Loan (v) ₹",
                type: "Amount",
                required: true,
                condition: "interestOnHomeLoan === 'Yes'",
              },
              {
                name: "standalone24bOutstandingAmount",
                label: "Loan Outstanding as on last date of FY (vi) ₹",
                type: "Amount",
                required: true,
                condition: "interestOnHomeLoan === 'Yes'",
              },
              {
                name: "standalone24bInterestAmount",
                label: "Interest on Borrowed Capital u/s 24(b) (vii) ₹",
                type: "Amount",
                required: true,
                condition: "interestOnHomeLoan === 'Yes'",
              },
              {
                name: "standalone24bTotalInterestSummary",
                label: "Total Interest u/s 24(b)",
                type: "Amount (🔒 Auto)",
                required: false, 
                condition: "interestOnHomeLoan === 'Yes'",
                notes:
                  "Mathematical accumulation of across the board (vii) row items",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 3,
    label: "Deductions",
    route: "deductions",
    subsections: [
      {
        id: "savings-and-pension-deductions",
        title:
          "3.1 & 3.2 Core Savings & Pension Deductions (Old Regime Exclusive)",
        fieldSections: [
          {
            id: "section-80c-repeating-grid",
            title: "3.1 Section 80C Matrix (Up to 4 Entries)",
            fields: [
              {
                name: "claim80C",
                label: "Do you want to claim deduction under Section 80C?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sec80cNatureOfPayment",
                label: "Nature of Payment",
                type: "Text / Dropdown ▼",
                required: true,
                condition: "claim80C === 'Yes'",
                options: [
                  { value: "LIC premium", label: "LIC premium" },
                  { value: "PPF", label: "PPF" },
                  { value: "ELSS", label: "ELSS" },
                  { value: "NSC", label: "NSC" },
                  {
                    value: "Home loan principal",
                    label: "Home loan principal",
                  },
                  { value: "Tuition fee", label: "Tuition fee" },
                ],
              },
              {
                name: "sec80cEligibleAmount",
                label: "Amount Eligible for Deduction u/s 80C (₹)",
                type: "Amount",
                required: true,
                condition: "claim80C === 'Yes'",
              },
              {
                name: "sec80cPolicyDocNo",
                label: "Policy Number / Document Identification Number",
                type: "Text",
                required: false,
                condition: "claim80C === 'Yes'",
              },
              {
                name: "totalDeductionUsh80C",
                label: "Total Deduction u/s 80C",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "sec80cEligibleAmount",
                condition: "claim80C === 'Yes'",
                notes:
                  "Statutory capping mechanism caps at a maximum threshold of ₹1,50,000 combined with 80CCC and 80CCD(1)",
              },
            ],
          },
          {
            id: "section-80ccc-repeating-grid",
            title: "3.2 Section 80CCC Matrix (Up to 4 Entries)",
            fields: [
              {
                name: "claim80CCC",
                label: "Do you want to claim deduction under Section 80CCC?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sec80cccInsurerName",
                label: "Name of the Insurer",
                type: "Text",
                required: true,
                condition: "claim80CCC === 'Yes'",
              },
              {
                name: "sec80cccPolicyNumber",
                label: "Policy Document Number",
                type: "Text",
                required: true,
                condition: "claim80CCC === 'Yes'",
              },
              {
                name: "sec80cccDeductionAmount",
                label: "Deduction u/s 80CCC (₹)",
                type: "Amount",
                required: true,
                condition: "claim80CCC === 'Yes'",
              },
              {
                name: "totalDeductionUsh80CCC",
                label: "Total Deduction u/s 80CCC",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "sec80cccDeductionAmount",
                condition: "claim80CCC === 'Yes'",
              },
            ],
          },
        ],
      },
      {
        id: "medical-health-deductions",
        title: "3.3 Section 80D — Health Insurance Ledger",
        fieldSections: [
          {
            id: "sec80d-family-criteria",
            title: "1. Self & Family Processing Block",
            fields: [
              {
                name: "claim80D",
                label: "Do you want to claim deduction under Section 80D?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sec80dIsFamilySeniorCitizen",
                label:
                  "1. Is any family member (excl. parents) a senior citizen?",
                type: "Radio ▼ (Yes/No)",
                required: true,
                condition: "claim80D === 'Yes'",
                notes:
                  "Adjusts statutory verification threshold limit between ₹25,000 and ₹50,000",
              },
              {
                name: "sec80dSelfFamilyHealthInsurancePremium",
                label: "1a(i) Self & Family — Health Insurance Amount (₹)",
                type: "Amount",
                required: false,
                condition: "claim80D === 'Yes'",
                notes:
                  "Aggregates structural nested row items (Insurer Name, Policy No, Receipt No, Amount) up to 3 instances max",
              },
              {
                name: "sec80dSelfFamilyPreventiveCheckup",
                label: "1a(i) Self & Family — Preventive Health Checkup (₹)",
                type: "Amount",
                required: false,
                condition: "claim80D === 'Yes'",
                notes:
                  "System limits execution value to a hard boundary of ₹5,000 max context within overarching 80D ceilings",
              },
              {
                name: "sec80dSelfFamilyInclSeniorHealthInsurance",
                label:
                  "1b(i) Self & Family incl. Senior Citizen — Health Insurance (₹)",
                type: "Amount",
                required: false,
                condition: "claim80D === 'Yes'",
              },
              {
                name: "sec80dSelfFamilyInclSeniorPreventiveCheckup",
                label: "1b(ii) Preventive Health Checkup",
                type: "Amount",
                required: false,
                condition: "claim80D === 'Yes'",
              },
              {
                name: "sec80dSelfFamilyInclSeniorMedicalExpenditure",
                label:
                  "1b(iii) Medical Expenditure (where no health insurance claimed) (₹)",
                type: "Amount",
                required: false,
                condition: "claim80D === 'Yes'",
              },
            ],
          },
          {
            id: "sec80d-parents-criteria",
            title: "2. Parents Processing Block",
            fields: [
              {
                name: "claim80DParents",
                label: "Do you want to claim deduction under Section 80D (Parents)?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sec80dIsParentsSeniorCitizen",
                label: "2. Is any parent a senior citizen?",
                type: "Radio ▼ (Yes/No)",
                required: true,
                condition: "claim80DParents === 'Yes'",
              },
              {
                name: "sec80dParentsHealthInsurancePremium",
                label: "2a(i) Parents — Health Insurance Amount (₹)",
                type: "Amount",
                required: false,
                condition: "claim80DParents === 'Yes'",
                notes:
                  "Supported by a distinct 3-row sub-table iteration grid matrix",
              },
              {
                name: "sec80dParentsPreventiveCheckup",
                label: "2a(ii) Parents — Preventive Health Checkup (₹)",
                type: "Amount",
                required: false,
                condition: "claim80DParents === 'Yes'",
              },
              {
                name: "sec80dParentsInclSeniorHealthInsurance",
                label:
                  "2b(i) Parents incl. Senior Citizen — Health Insurance (₹)",
                type: "Amount",
                required: false,
                condition: "claim80DParents === 'Yes'",
              },
              {
                name: "sec80dParentsInclSeniorPreventiveCheckup",
                label: "2b(ii) Preventive Health Checkup — Parents",
                type: "Amount",
                required: false,
                condition: "claim80DParents === 'Yes'",
              },
              {
                name: "sec80dParentsInclSeniorMedicalExpenditure",
                label: "2b(iii) Medical Expenditure — Parents",
                type: "Amount",
                required: false,
                condition: "claim80DParents === 'Yes'",
              },
              {
                name: "sec80dEligibleAmountOfDeductionTotal",
                label: "3. Eligible Amount of Deduction",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "claim80DParents === 'Yes'",
                notes:
                  "Automated final deduction computation responding explicitly to the binary Senior Citizen status values captured above",
              },
            ],
          },
        ],
      },
      {
        id: "loan-interest-deductions",
        title: "3.4 Sections 80E / 80EE / 80EEA / 80EEB — Interest Schedules",
        fieldSections: [
          {
            id: "loan-interest-shared-columns",
            title:
              "Shared Financial Institution Loan Column Array (Each section supports up to 2 rows)",
            fields: [
              {
                name: "claim80E",
                label: "Do you want to claim deduction under Section u/s 80E / 80EE / 80EEA / 80EEB?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },  
              
              {
                name: "loanIntSourceType",
                label: "Loan taken from (i)",
                type: "Dropdown ▼",
                required: true,
                condition: "Deductions_Loan_Interest_Fields_Visible",
                options: [
                  { value: "Bank", label: "Bank" },
                  { value: "Institution", label: "Institution" },
                ],
              },
              {
                name: "loanIntBankIfsc",
                label: "IFSC Code of Bank (iia)",
                type: "Text",
                required: "Conditional",
                condition: "Deductions_Loan_from_Bank",
              },
              {
                name: "loanIntInstitutionPan",
                label: "PAN of Institution (iib)",
                type: "Text (PAN)",
                required: "Conditional",
                condition: "Deductions_Loan_Interest_Fields_Visible",
              },
              {
                name: "loanIntLenderName",
                label: "Name of Bank / Institution (ii)",
                type: "Text",
                required: true,
                condition: "Deductions_Loan_Interest_Fields_Visible",
              },
              {
                name: "loanIntAccountNumber",
                label: "Loan Account Number (iii)",
                type: "Text",
                required: true,
                condition: "Deductions_Loan_Interest_Fields_Visible",
              },
              {
                name: "loanIntSanctionDate",
                label: "Date of Sanction (iv)",
                type: "Date",
                required: true,
                condition: "Deductions_Loan_Interest_Fields_Visible",
              },
              {
                name: "loanIntTotalAmount",
                label: "Total Amount of Loan (v) ₹",
                type: "Amount",
                required: true,
                condition: "Deductions_Loan_Interest_Fields_Visible",
              },
              {
                name: "loanIntOutstandingYearEnd",
                label: "Loan Outstanding at year-end (vi) ₹",
                type: "Amount",
                required: true,
                condition: "Deductions_Loan_Interest_Fields_Visible",
              },
              {
                name: "loanIntInterestAmountClaimed",
                label: "Interest u/s 80E / 80EE / 80EEA / 80EEB (vii) ₹",
                type: "Amount",
                required: true,
                condition: "Deductions_Loan_Interest_Fields_Visible",
              },
            ],
          },
          // {
          //   id: "loan-interest-conditional-extensions",
          //   title: "Schedule-Specific Validation Structural Overrides",
          //   fields: [
          //     {
          //       name: "sec80eebVehicleRegistrationNumber",
          //       label: "Vehicle Registration Number (viii)",
          //       type: "Text",
          //       required: "Conditional",
          //       condition: "Section_80EEB_Exclusive",
          //     },
          //     {
          //       name: "sec80eeValueOfResidentialHouseProperty",
          //       label: "Value of Residential House Property (₹)",
          //       type: "Amount",
          //       required: "Conditional",
          //       condition: "Section_80EE_Exclusive",
          //     },
          //     {
          //       name: "sec80eeaStampDutyValueOfHouseProperty",
          //       label: "Stamp Duty Value of Residential House Property (₹)",
          //       type: "Amount",
          //       required: "Conditional",
          //       condition: "Section_80EEA_Exclusive",
          //     },
          //   ],
          // },
        ],
      },
      {
        id: "charitable-donations-schedule",
        title: "3.5 Schedule 80G — Donations",
        fieldSections: [
          {
            id: "donation-donee-identities",
            title:
              "Donee Personal Identity Metadata (Applies across Categories A, B, C, D; max 4 rows per block)",
            fields: [
              {
                name: "claim80G",
                label: "Do you want to claim deduction under Section 80G?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "donNameOfDonee",
                label: "(ii) Name of Donee",
                type: "Text",
                required: "Conditional", 
                required : true, 
                condition: "claim80G === 'Yes'",
                notes:
                  "If any single field in a row layout is touched, ALL sibling fields within that corresponding index immediately convert to mandatory status",
              },
              {
                name: "donAddress",
                label: "(iii) Address",
                type: "Text",
                // required: "Conditional", 
                 required : true,  
                condition: "claim80G === 'Yes'",
              },
              {
                name: "donCityTownDistrict",
                label: "(iv) City or Town or District",
                type: "Text",
                // required: "Conditional",  
                 required : true,  
                condition: "claim80G === 'Yes'",
              },
              {
                name: "donStateCode",
                label: "(v) State Code",
                type: "Dropdown ▼",
                // required: "Conditional",  
                 required : true, 
                condition: "claim80G === 'Yes'",
                options: statesList,
              },
              {
                name: "donPinCode",
                label: "(vi) Pin Code",
                type: "Text (6 digits)",
                required: true,
                condition: "claim80G === 'Yes'",
              },
              {
                name: "donPanOfDonee",
                label: "(vii) PAN of Donee",
                type: "Text (PAN)",
                // required: "Conditional",  
                 required : true, 
                condition: "claim80G === 'Yes'",
                notes:
                  "Fallback entry logic string code 'GGGGG0000G' is permitted exclusively for Government establishments lacking native PAN issuance records",
              },
              {
                name: "donArnReferenceNumber",
                label: "ARN Donation Reference Number",
                type: "Text",
                required: "Conditional",
                condition: "Deductions_Category_D_Only",
              },
            ],
          },
          {
            id: "donation-financial-quanta",
            title: "Donation Financial Framework Parameters",
            fields: [
              {
                name: "claim80G",
                label: "Do you want to claim deduction under Section 80G?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "donAmountCash",
                label: "Amount of Donation in Cash (₹)",
                type: "Amount",
                required: false,
                condition: "claim80G === 'Yes'",
              },
              {
                name: "donAmountOtherMode",
                label: "Amount of Donation in Other Mode (₹)",
                type: "Amount",
                required: "Conditional",
                condition: "claim80G === 'Yes'",
                notes:
                  "At least one singular positive input transaction matching Cash or alternative must validate successfully",
              },
              {
                name: "donTransactionReferenceNo",
                label: "Transaction Reference / Cheque / UPI / NEFT (No.)",
                type: "Text",
                required: "Conditional",
                condition: "Deductions_Other_Mode_Used",
              },
              {
                name: "donBankIfsc",
                label: "IFSC Code of Bank",
                type: "Text",
                required: false,
                condition: "claim80G === 'Yes'",
              },
              {
                name: "donTotalDonationRowAmount",
                label: "(viii) Total Donation (₹)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "claim80G === 'Yes'",
              },
              {
                name: "donEligibleAmountRowDeduction",
                label: "Eligible Amount of Donation (₹)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "claim80G === 'Yes'",
                notes:
                  "Calculated systematically subject to limits: Cat A=100% no limit, Cat B=50% no limit, Cat C=100% limited to 10% Adjusted GTI, Cat D=50% limited to 10% Adjusted GTI",
              },
            ],
          },
        ],
      },
      {
        id: "scientific-political-disability-deductions",
        title: "3.6, 3.7 & 3.8 Miscellaneous & Disability Schedules",
        fieldSections: [
          {
            id: "schedule-80gga-scientific-research",
            title:
              "3.6 Schedule 80GGA — Scientific Research / Rural Development Donations (Up to 4 rows)",
            fields: [
              {
                name: "claim80GGA",
                label: "Do you want to claim deduction under Section 80GGA?",
                type: "Dropdown ▼ (Yes/No)",
                required: true, 
                defaultValue : "No",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sec80ggaRelevantClause",
                label: "(ii) Relevant Clause under which deduction is claimed",
                type: "Dropdown ▼",
                required: true,
                condition: "claim80GGA === 'Yes'",
                options: [
                  {
                    value: "80GGA(2)(a) Research Assn",
                    label: "80GGA(2)(a) Research Assn",
                  },
                  {
                    value: "(aa) Social Science",
                    label: "(aa) Social Science",
                  },
                  { value: "(b) Rural Dev", label: "(b) Rural Dev" },
                  {
                    value: "(bb) National Committee",
                    label: "(bb) National Committee",
                  },
                  { value: "(c) Conservation", label: "(c) Conservation" },
                  { value: "(cc) Afforestation", label: "(cc) Afforestation" },
                  { value: "(d) Rural Dev Fund", label: "(d) Rural Dev Fund" },
                  { value: "(e) Urban Poverty", label: "(e) Urban Poverty" },
                ],
              },
              {
                name: "sec80ggaDoneeName",
                label: "(iii) Name of Donee",
                type: "Text",
                required: true,
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaAddress",
                label: "(iv) Address",
                type: "Text",
                required: true,
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaCityTownDistrict",
                label: "(v) City or Town or District",
                type: "Text",
                required: true,
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaStateCode",
                label: "(vi) State Code",
                type: "Dropdown ▼",
                required: true,
                condition: "claim80GGA === 'Yes'",
                options: statesList,
              },
              {
                name: "sec80ggaPinCode",
                label: "(vii) Pin Code",
                type: "Text",
                required: true,
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaDoneePan",
                label: "(viii) PAN of Donee",
                type: "Text (PAN)",
                required: true,
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaCashDonationDate",
                label: "(ix) Date of Donation in cash",
                type: "Date",
                required: "Conditional",
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaDonationCashAmount",
                label: "Donation in Cash (₹)",
                type: "Amount",
                required: "Conditional",
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaDonationOtherModeAmount",
                label: "Donation in Other Mode (₹)",
                type: "Amount",
                required: "Conditional",
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaTotalDonationSum",
                label: "Total Donation (₹)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "claim80GGA === 'Yes'",
              },
              {
                name: "sec80ggaEligibleAmount",
                label: "(x) Eligible Amount of Donation (₹)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "claim80GGA === 'Yes'",
              },
            ],
          },
          {
            id: "schedule-80ggc-political-parties",
            title:
              "3.7 Schedule 80GGC — Contributions to Political Parties (Up to 9 rows)",
            fields: [
              {
                name: "claim80GGC",
                label: "Do you want to claim deduction under Section 80GGC?",
                type: "Dropdown ▼ (Yes/No)",
                  defaultValue : "No", 
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sec80ggcDate",
                label: "(ii) Date",
                type: "Date",
                required: true,
                condition: "claim80GGC === 'Yes'",
              },
              {
                name: "sec80ggcContributionCash",
                label: "(iii) Contribution in Cash (₹)",
                type: "Amount",
                required: false,
                condition: "claim80GGC === 'Yes'",
                notes:
                  "Note: Cash contributions are strictly not eligible for deduction",
              },
              {
                name: "sec80ggcContributionOtherMode",
                label: "(iv) Contribution in Other Mode (₹)",
                type: "Amount",
                required: true,
                condition: "claim80GGC === 'Yes'",
              },
              {
                name: "sec80ggcTotalContribution",
                label: "(v) Total Contribution (₹)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "claim80GGC === 'Yes'",
              },
              {
                name: "sec80ggcEligibleAmount",
                label: "(vi) Eligible Amount of Contribution (₹)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "claim80GGC === 'Yes'",
              },
              {
                name: "sec80ggcPoliticalPartyName",
                label: "(vii) Name of the Political Party",
                type: "Text",
                required: true,
                condition: "claim80GGC === 'Yes'",
              },
              {
                name: "sec80ggcPoliticalPartyPan",
                label: "(viii) PAN of the Political Party",
                type: "Text (PAN)",
                required: true,
                condition: "claim80GGC === 'Yes'",
              },
              {
                name: "sec80ggcTransactionReference",
                label: "(ix) Transaction Reference / Cheque / UPI / NEFT",
                type: "Text",
                required: "Conditional",
                condition: "claim80GGC === 'Yes'",
              },
              {
                name: "sec80ggcBankIfsc",
                label: "(x) IFSC Code of Bank",
                type: "Text",
                required: false,
                condition: "claim80GGC === 'Yes'",
              },
            ],
          },
          {
            id: "disability-claims-selection",
            title: "3.8 Disability Deductions Selection",
            fields: [
              {
                name: "claim80U",
                label:
                  "Do you want to claim deduction u/s 80U (Self with Disability)?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                  defaultValue : "No", 
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },

              {
                name: "sec80uNatureOfDisability",
                label: "Nature of Disability (i)",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Blindness", label: "Blindness" },
                  { value: "Low Vision", label: "Low Vision" },
                  { value: "Hearing Impairment", label: "Hearing Impairment" },
                  { value: "Loco Motor", label: "Loco Motor Disability" },
                  { value: "Mental Retardation", label: "Mental Retardation" },
                  { value: "Mental Illness", label: "Mental Illness" },
                  { value: "Autism", label: "Autism" },
                  { value: "Cerebral Palsy", label: "Cerebral Palsy" },
                  {
                    value: "Multiple Disability incl. blindness/CP/autism",
                    label:
                      "Multiple Disability (including blindness / CP / autism)",
                  },
                ],
                condition: "claim80U === 'Yes'",
              },
              {
                name: "sec80uTypeOfDisability",
                label: "Type of Disability (ib)",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "a_Dementia", label: "(a) Dementia" },
                  {
                    value: "b_Dystonia",
                    label: "(b) Dystonia Musculorum Deformans",
                  },
                  {
                    value: "c_MotorNeuronDisease",
                    label: "(c) Motor Neuron Disease",
                  },
                  { value: "d_Ataxia", label: "(d) Ataxia" },
                  { value: "e_Chorea", label: "(e) Chorea" },
                  { value: "f_Hemiballismus", label: "(f) Hemiballismus" },
                  { value: "g_Aphasia", label: "(g) Aphasia" },
                  { value: "h_Parkinsons", label: "(h) Parkinson's Disease" },
                  {
                    value: "i_MalignantCancers",
                    label: "(i) Malignant Cancers",
                  },
                  { value: "j_AIDS", label: "(j) Full Blown AIDS" },
                  {
                    value: "k_ChronicRenalFailure",
                    label: "(k) Chronic Renal Failure",
                  },
                  {
                    value: "l_HaematologicalDisorders",
                    label: "(l) Haematological Disorders",
                  },
                  { value: "m_Haemophilia", label: "(m) Haemophilia" },
                  { value: "n_Thalassaemia", label: "(n) Thalassaemia" },
                ],
                condition: "claim80U === 'Yes'",
              },
              {
                name: "sec80uDeductionAmount",
                label: "Amount of Deduction (ii) ₹",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "claim80U === 'Yes'",
                notes:
                  "Evaluates statically to ₹75,000 or ₹1,25,000 mapping against severe category metrics",
              },
              {
                name: "sec80uForm10IAAckNo",
                label: "Ack. No. of Form 10IA filed (iii)",
                type: "Text",
                required: true,
                condition: "claim80U === 'Yes'",
              },
              {
                name: "sec80uUdidNumber",
                label: "UDID Number (iv)",
                type: "Text",
                required: false,
                condition: "claim80U === 'Yes'",
              },

              // {
              //   name: "claim80DD",
              //   label: "Do you want to claim deduction u/s 80DD (Maintenance of Dependent with Disability)?",
              //   type: "Dropdown ▼ (Yes/No)",
              //   required: true,
              //   options: [
              //     { value: "Yes", label: "Yes" },
              //     { value: "No", label: "No" },
              //   ],
              // },
            ],
          },
          {
            id: "disability-dependent-80dd",
            title:
              "3.8 Schedule 80DD — Maintenance of Dependent with Disability Matrix",
            fields: [
              {
                name: "claim80DD",
                label:
                  "Do you want to claim deduction u/s 80DD (Maintenance of Dependent with Disability)?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                  defaultValue : "No", 
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sec80ddNatureOfDisability",
                label: "Nature of Disability (i)",
                type: "Dropdown ▼",
                required: true,
                condition: "claim80DD === 'Yes'",
                notes: "Shared options match structural 80U list",
                options: [
                  { value: "Blindness", label: "Blindness" },
                  { value: "Low Vision", label: "Low Vision" },
                  { value: "Hearing Impairment", label: "Hearing Impairment" },
                  { value: "Loco Motor", label: "Loco Motor Disability" },
                  { value: "Mental Retardation", label: "Mental Retardation" },
                  { value: "Mental Illness", label: "Mental Illness" },
                  { value: "Autism", label: "Autism" },
                  { value: "Cerebral Palsy", label: "Cerebral Palsy" },
                  {
                    value: "Multiple Disability incl. blindness/CP/autism",
                    label:
                      "Multiple Disability (including blindness / CP / autism)",
                  },
                ],
              },
              {
                name: "sec80ddTypeOfDisability",
                label: "Type of Disability (ib)",
                type: "Dropdown ▼",
                condition: "claim80DD === 'Yes'",
                required: true,
                notes: "Shared options match structural 80U list",
                options: [
                  { value: "a_Dementia", label: "(a) Dementia" },
                  {
                    value: "b_Dystonia",
                    label: "(b) Dystonia Musculorum Deformans",
                  },
                  {
                    value: "c_MotorNeuronDisease",
                    label: "(c) Motor Neuron Disease",
                  },
                  { value: "d_Ataxia", label: "(d) Ataxia" },
                  { value: "e_Chorea", label: "(e) Chorea" },
                  { value: "f_Hemiballismus", label: "(f) Hemiballismus" },
                  { value: "g_Aphasia", label: "(g) Aphasia" },
                  { value: "h_Parkinsons", label: "(h) Parkinson's Disease" },
                  {
                    value: "i_MalignantCancers",
                    label: "(i) Malignant Cancers",
                  },
                  { value: "j_AIDS", label: "(j) Full Blown AIDS" },
                  {
                    value: "k_ChronicRenalFailure",
                    label: "(k) Chronic Renal Failure",
                  },
                  {
                    value: "l_HaematologicalDisorders",
                    label: "(l) Haematological Disorders",
                  },
                  { value: "m_Haemophilia", label: "(m) Haemophilia" },
                  { value: "n_Thalassaemia", label: "(n) Thalassaemia" },
                ],
              },
              {
                name: "sec80ddDeductionAmount",
                label: "Amount of Deduction (ii) ₹",
                type: "Amount (🔒 Auto)",
                condition: "claim80DD === 'Yes'",
                required: false,
              },
              {
                name: "sec80ddTypeOfDependent",
                label: "Type of Dependent (iii)",
                type: "Dropdown ▼",
                condition: "claim80DD === 'Yes'",
                required: true,
                options: [
                  {
                    value: "Dependent Person with Disability",
                    label: "Dependent Person with Disability",
                  },
                  {
                    value: "Dependent person with Severe Disability",
                    label: "Dependent person with Severe Disability",
                  },
                  {
                    value: "Self and Dependent Person",
                    label: "Self and Dependent Person",
                  },
                  {
                    value: "Self and Dependent with Severe Disability",
                    label: "Self and Dependent with Severe Disability",
                  },
                  { value: "Parents", label: "Parents" },
                ],
              },
              {
                name: "sec80ddDependentPan",
                label: "PAN of the Dependent (iv)",
                type: "Text (PAN)",
                required: "Conditional",
                condition: "claim80DD === 'Yes'",
              },
              {
                name: "sec80ddDependentAadhaar",
                label: "Aadhaar of the Dependent (v)",
                type: "Text (12 digits)",
                required: "Conditional",
                condition: "claim80DD === 'Yes'",
              },
              {
                name: "sec80ddForm10IAAckNo",
                label: "Ack. No. of Form 10IA filed (vi)",
                type: "Text",
                required: true,
                condition: "claim80DD === 'Yes'",
              },
              {
                name: "sec80ddUdidNumber",
                label: "UDID Number (vii)",
                type: "Text",
                required: false,
                condition: "claim80DD === 'Yes'",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 4,
    label: "Taxes Paid",
    route: "taxes",
    subsections: [
      {
        id: "tds-schedules-ledger",
        title: "4.1, 4.2 & 4.3 Tax Deducted at Source (TDS Schedules)",
        fieldSections: [
          {
            id: "tds1-salary-grid",
            title: "4.1 TDS1 — Sourced from SALARY (Form 16 - Up to 5 Rows)",
            fields: [  

              {
                name: "isForm16Available",
                label: "Does the taxpayer have Form 16 from employer?",
                type: "Dropdown ▼",
                required: true, 
                defaultValue: "No", 
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                notes: "TDS from salary is reported in Schedule TDS-1 only if Form 16 is available. If 'No', this schedule will be skipped.",
              },
              {
                name: "tds1EmployerTan",
                label: "(2) TAN of Deductor", 
                condition: "isForm16Available === 'Yes'",
                type: "Text (TAN format)",
                required: true,
                validation: {
                  regex: "^[A-Z]{4}[0-9]{5}[A-Z]{1}$",
                  exactChars: 10,
                },
                notes: "Format: AAAA00000A",
              },
              {
                name: "tds1EmployerName",
                label: "(3) Name of Deductor (Employer)",
                type: "Text",
                required: true,
                condition: "isForm16Available === 'Yes'",
              },
              {
                name: "tds1IncomeChargeableSalaries",
                label: "(4) Income Chargeable under Salaries (₹)",
                type: "Amount",
                required: true,
                condition: "isForm16Available === 'Yes'",
              },
              {
                name: "tds1TotalTaxDeductedRow",
                label: "Total Tax Deducted (₹)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "isForm16Available === 'Yes'",
              },
            ],
          },
          {
            id: "tds2-non-salary-grid",
            title:
              "4.2 TDS2 — Sourced from Income OTHER THAN Salary (Form 16A - Up to 5 Rows)",
            fields: [ 
               {
                name: "isForm16ANonSalary",
                label: "Does the taxpayer have Form 16A from employer?",
                type: "Dropdown ▼",
                required: true, 
                defaultValue: "No", 
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                notes: "TDS from salary is reported in Schedule TDS-1 only if Form 16 is available. If 'No', this schedule will be skipped.",
              },
              {
                name: "tds2DeductorTan",
                label: "(2a) TAN of Deductor",
                type: "Text (TAN)",
                required: true,
                condition: "isForm16ANonSalary === 'Yes'",
              },
              {
                name: "tds2DeductorName",
                label: "(2b) Name of Deductor",
                type: "Text",
                required: true,
                condition: "isForm16ANonSalary === 'Yes'",
              },
              {
                name: "tds2SectionCode",
                label: "(3) Section under which TDS deducted",
                type: "Dropdown ▼",
                required: true,
                condition: "isForm16ANonSalary === 'Yes'",
                notes:
                  "Predefined income segment statutory codes (e.g., 194A, 194B, 194C, 194I, 194J, 193 etc.)",
                options: [{ value: "194-IB", label: "194-IB" }],
              },
              {
                name: "tds2GrossReceiptSubjectToTax",
                label: "(4) Gross Receipt subject to Tax Deduction (₹)",
                type: "Amount",
                condition: "isForm16ANonSalary === 'Yes'",
                required: true,
              },
              {
                name: "tds2FinancialYearOfDeduction",
                label: "(5) Year of Tax Deduction",
                type: "Year / Dropdown ▼",
                required: true,
                notes: "Financial fiscal tracking index mapping",
                condition: "isForm16ANonSalary === 'Yes'",
              },
              {
                name: "tds2TaxDeductedAmount",
                label: "(6) Tax Deducted (₹)",
                type: "Amount",
                condition: "isForm16ANonSalary === 'Yes'",
                required: true,
              },
              {
                name: "tds2CreditClaimedThisYear",
                label: "TDS Credit Claimed this Year (₹)",
                type: "Amount",
                required: true,
                condition: "isForm16ANonSalary === 'Yes'",
              },
            ],
          },
          {
            id: "tds3-rental-income-grid",
            title:
              "4.3 TDS3 — Sourced from Rental Transactions (Form 16C - Up to 4 Rows)",
            fields: [ 
                {
                name: "isForm16CRental",
                label: "Does the taxpayer have Form 16A from employer?",
                type: "Dropdown ▼",
                required: true, 
                defaultValue: "No", 
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                notes: "TDS from salary is reported in Schedule TDS-1 only if Form 16 is available. If 'No', this schedule will be skipped.",
              },
              {
                name: "tds3TenantPan",
                label: "(2) PAN of Tenant",
                type: "Text (PAN)",
                required: true,
                condition: "isForm16CRental === 'Yes'",
                notes:
                  "Mandatory when executing tax withholding records matching Section 194-IB parameter types",
              },
              {
                name: "tds3TenantAadhaar",
                label: "(3a) Aadhaar No. of Tenant",
                type: "Text (12 digits)",
                required: false,
                condition: "isForm16CRental === 'Yes'",
              },
              {
                name: "tds3TenantName",
                label: "(3b) Name of Tenant",
                type: "Text",
                required: true,
                condition: "isForm16CRental === 'Yes'",
              },
              {
                name: "tds3SectionCode",
                label: "(4) Section under which TDS deducted",
                type: "Dropdown ▼",
                required: true,
                condition: "isForm16CRental === 'Yes'",
                options: [{ value: "194-IB", label: "194-IB" }],
              },
              {
                name: "tds3GrossReceiptSubjectToTax",
                label: "(5) Gross Receipt subject to Tax Deduction (₹)",
                type: "Amount",
                required: true,
                condition: "isForm16CRental === 'Yes'",
              },
              {
                name: "tds3YearOfTaxDeduction",
                label: "(6) Year of Tax Deduction",
                type: "date",
                required: true, 
                condition: "isForm16CRental === 'Yes'", 
              },
              {
                name: "tds3TaxDeductedAmount",
                label: "(7) Tax Deducted (₹)",
                type: "Amount",
                required: true,
                condition: "isForm16CRental === 'Yes'",
              },
              {
                name: "tds3CreditClaimedThisYear",
                label: "TDS Credit Claimed this Year (₹)",
                type: "Amount",
                required: true,
                condition: "isForm16CRental === 'Yes'",
              },
            ],
          },
        ],
      },
      {
        id: "tcs-and-challan-schedules",
        title: "4.4 & 4.5 Tax Collected at Source & Challan Receipts",
        fieldSections: [  
             {
            id: "advance-self-assessment-challans",
            title:
              "4.5 Advance Tax & Self-Assessment Tax Payments (Up to 8 Rows)",
            fields: [ 
              {
                name: "isAdvanceTaxPaid",
                label: "Does the taxpayer have TDS from employer?",
                type: "Dropdown ▼",
                required: true, 
                defaultValue: "Yes", 
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                notes: "TDS from salary is reported in Schedule TDS-1 only if Form 16 is available. If 'No', this schedule will be skipped.",
              },
              {
                name: "challanBsrCode",
                label: "(2) BSR Code of Bank",
                type: "Text (7 digits)",
                required: true, 
                condition: "isAdvanceTaxPaid === 'Yes'",
                validation: { digitsOnly: true, exactChars: 7 },
              },
              {
                name: "challanDepositDate",
                label: "(3) Date of Deposit (DD/MM/YYYY)",
                type: "Date",
                required: true,
                validation: { format: "DD/MM/YYYY" },
                condition: "isAdvanceTaxPaid === 'Yes'",
              },
              {
                name: "challanSerialNumber",
                label: "(4) Serial Number of Challan",
                type: "Text",
                condition: "isAdvanceTaxPaid === 'Yes'",
                required: true,
              },
              {
                name: "challanTaxPaidAmount",
                label: "Tax Paid (₹)",
                type: "Amount",
                condition: "isAdvanceTaxPaid === 'Yes'",
                required: true,
              },
              // { name: "challanTypeClassification", label: "Type of Tax (auto-classified)", type: "Dropdown ▼ (read-only)", required: false, notes: "Advance Tax / Self-Assessment Tax parameter token systematically tagged based on relative deposit execution timeline dates" }
            ],
          }, 
          {
            id: "tcs-source-grid",
            title:
              "4.4 TCS — Tax Collected at Source (Form 27D - Up to 4 Rows)",
            fields: [  
              {
                name: "isTcs",
                label: "Does the taxpayer have TCS from employer?",
                type: "Dropdown ▼",
                required: true, 
                defaultValue: "No", 
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                notes: "TDS from salary is reported in Schedule TDS-1 only if Form 16 is available. If 'No', this schedule will be skipped.",
              },
              {
                name: "tcsCollectorTan",
                label: "(2) Tax Collection Account No. of Collector",
                type: "Text (TAN)",
                required: true, 
                condition: "isTcs === 'Yes'",
              },
              {
                name: "tcsCollectorName",
                label: "(3) Name of Collector",
                type: "Text",
                required: true, 
                condition: "isTcs === 'Yes'",
              },
              {
                name: "tcsGrossPaymentSubjectToCollection",
                label: "(4) Gross Payment subject to Tax Collection (₹)",
                type: "Amount",
                required: true,
                condition: "isTcs === 'Yes'",
              },
              {
                name: "tcsYearOfCollection",
                label: "(5) Year of Tax Collection",
                type: "Date",
                required: true,
                condition: "isTcs === 'Yes'", 
              },
              {
                name: "tcsTaxCollectedAmount",
                label: "(6) Tax Collected (₹)",
                type: "Amount",
                required: true,
                condition: "isTcs === 'Yes'",
              },
              {
                name: "tcsCreditClaimedThisYear",
                label: "TCS Credit Claimed this Year (₹)",
                type: "Amount",
                required: true, 
                condition: "isTcs === 'Yes'",
              },
            ],
          },
       
        ],
      },
    ],
  },
  {
    id: 5,
    label: "Filing",
    route: "filing",
    subsections: [
      {
        id: "voluntary-filing-criteria",
        title: "1.6 Seventh Proviso to Section 139(1) Constraints",
        fieldSections: [
          {
            id: "seventh-proviso-selection-block",
            title: "1.6 Seventh Proviso Selection",
            fields: [
              {
                name: "isFilingUnderSeventhProviso",
                label: "Filing under Seventh Proviso?",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                notes:
                  "Unlocks conditional tracking parameters if user files voluntarily while operating under normal basic exemption layout ceilings",
              },

              {
                name: "isCurrentAccountDepositOver1Crore",
                label: "Deposited > ₹1 Crore in current account(s)?",
                type: "Radio (Yes/No)",
                required: "Conditional",
                condition: "isFilingUnderSeventhProviso === 'Yes'",
              },
              {
                name: "isForeignTravelExpenseOver2Lakh",
                label: "Incurred > ₹2 lakh on foreign travel?",
                type: "Radio (Yes/No)",
                required: "Conditional",
                condition: "isFilingUnderSeventhProviso === 'Yes'",
              },
              {
                name: "isElectricityExpenseOver1Lakh",
                label: "Incurred > ₹1 lakh on electricity consumption?",
                type: "Radio (Yes/No)",
                required: "Conditional",
                condition: "isFilingUnderSeventhProviso === 'Yes'",
              },
              {
                name: "isFilingDueToOtherClauseIvConditions",
                label: "Filing due to other clause (iv) conditions?",
                type: "Radio (Yes/No)",
                required: "Conditional",
                condition: "isFilingUnderSeventhProviso === 'Yes'",
                notes:
                  "Triggers execution visibility rules for structural sub-block conditions itemized below",
              },
              {
                name: "clauseIvSalesTurnoverOver60Lakh",
                label: "Sales/turnover > ₹60 lakh?",
                type: "Radio (Yes/No)",
                required: "Conditional",
                condition: "isFilingUnderSeventhProviso === 'Yes'",
              },
              {
                name: "clauseIvGrossReceiptsProfessionOver10Lakh",
                label: "Gross receipts in profession > ₹10 lakh?",
                type: "Radio (Yes/No)",
                required: "Conditional",
                condition: "isFilingUnderSeventhProviso === 'Yes'",
              },
              {
                name: "clauseIvTdsTcsThresholdMet",
                label: "TDS+TCS ≥ ₹25,000 (or ₹50,000 for sr. citizen)?",
                type: "Radio (Yes/No)",
                required: "Conditional",
                condition: "isFilingUnderSeventhProviso === 'Yes'",
              },
              {
                name: "clauseIvSavingsDepositOver50Lakh",
                label: "Savings bank deposits ≥ ₹50 lakh?",
                type: "Radio (Yes/No)",
                required: "Conditional",
                condition: "isFilingUnderSeventhProviso === 'Yes'",
              },
            ],
          },  

            {
            id: "filing-sections-mapping",
            title: "Return Section Type Selection Nodes",
            fields: [
              {
                name: "isReturnTypeDetailsApplicable",
                label: "Filing & Return Type Details applicable?",
                type: "Dropdown ▼",
                required: true, 
                defaultValue: "Noc",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "filedUnderSectionCode",
                label: "Filed u/s (Section)",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "139(1)", label: "139(1)-On or before due date" },
                  { value: "139(4)", label: "139(4)-Belated" },
                  { value: "139(5)", label: "139(5)-Revised" },
                  { value: "119(2)(b)", label: "119(2)(b)" },
                  { value: "139(8A)", label: "139(8A)" },
                  { value: "153A", label: "153A" },
                  { value: "153C", label: "153C" },
                ],
                condition: "isReturnTypeDetailsApplicable === 'Yes'",
              },
              {
                name: "filedInResponseToNoticeSection",
                label: "Filed in response to notice u/s",
                type: "Dropdown ▼",
                required: "Conditional",
                options: [
                  { value: "139(9)", label: "139(9)" },
                  { value: "142(1)", label: "142(1)" },
                  { value: "148", label: "148" },
                  { value: "153C", label: "153C" },
                ],
                condition: "isReturnTypeDetailsApplicable === 'Yes'",
              },
              {
                name: "receiptNumberOfOriginalReturn",
                label: "Receipt Number (if revised/defective)",
                type: "Text",
                required: "Conditional",
                condition:
                  "isReturnTypeDetailsApplicable === 'Yes' && section_139_5_or_139_9",
              },
              {
                name: "dateOfFilingOfOriginalReturn",
                label: "Date of filing of original return",
                type: "Date",
                required: "Conditional",
                condition:
                  "isReturnTypeDetailsApplicable === 'Yes' && section_139_5_or_139_9",
                validation: { format: "DD/MM/YYYY" },
              },
              {
                name: "uniqueNumberDinNoticeResponse",
                label: "Unique Number / DIN (for notice response)",
                type: "Text",
                required: "Conditional",
                condition: "isReturnTypeDetailsApplicable === 'Yes'",
              },
              {
                name: "dateOfSuchNoticeOrOrder",
                label: "Date of such Notice or Order",
                type: "Date",
                required: "Conditional",
                validation: { format: "DD/MM/YYYY" },
                condition: "isReturnTypeDetailsApplicable === 'Yes'",
              },
              {
                name: "dueDateOfFilingItr",
                label: "Due Date of Filing of ITR",
                type: "Date (read-only)",
                required: false,
                defaultValue: "31/07/2026",
                condition: "isReturnTypeDetailsApplicable === 'Yes'",
              },
            ],
          },

        ],
      },
      {
        id: "representative-metadata",
        title: "1.7 Representative Assessee (A22) Parameters",
        fieldSections: [
          {
            id: "representative-selection-block",
            title: "1.7 Representative Assessee Selection",
            fields: [
              {
                name: "isRepresentativeAssesseeApplicable",
                label: "Representative Assessee details applicable?",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              // {
              //   name: "isFiledByRepresentativeAssessee",
              //   label: "Filed by representative assessee?",
              //   type: "Dropdown ▼ (Yes/No)",
              //   required: true,
              //   options: [
              //     { value: "Yes", label: "Yes" },
              //     { value: "No", label: "No" },
              //   ],
              //   condition: "isRepresentativeAssesseeApplicable === 'Yes'",
              // },

              {
                name: "nameOfRepresentativeAssessee",
                label: "Name of Representative Assessee",
                type: "Text",
                required: "Conditional",
                condition: "isRepresentativeAssesseeApplicable === 'Yes'",
              },

              {
                name: "emailIdOfRepresentativeAssessee",
                label: "Email-ID of Representative Assessee",
                type: "Email",
                required: "Conditional",
                   condition: "isRepresentativeAssesseeApplicable === 'Yes'",
              },
              {
                name: "contactNoOfRepresentativeAssessee",
                label: "Contact No. of Representative Assessee",
                type: "Tel",
                required: "Conditional",
                  condition: "isRepresentativeAssesseeApplicable === 'Yes'", 
              },
            ],
          },  

          {
            id: "auto-calculated-tax-summary-aggregates",
            title: "Dynamic Tax Reconciliation Mappings",
            fields: [  

               {
                name: "TaxReturnPreparer",
                label: "Taxes Paid Real-Time Consolidated Ledger",
                type: "Dropdown ▼",
                required: true,
                options: ["Yes", "No"],
                defaultValue: "No",
              }, 

              {
                name: "totalAdvanceTaxPaid",
                ref: "D12(a)",
                label: "Total Advance Tax Paid",
                type: "Amount (🔒 Auto)",
                notes: "Aggregated link from item 21", 
                condition: "TaxReturnPreparer === 'Yes'", 
 
              },
              {
                name: "totalTdsClaimed",
                ref: "D12(c)",
                label: "Total TDS Claimed (Salary + Other + Rent)",
                type: "Amount (🔒 Auto)",
                notes:
                  "System calculated evaluation from schedules: items 18 + 19 + 20",
                condition: "TaxReturnPreparer === 'Yes'", 

              },
              {
                name: "totalTcsClaimed",
                ref: "D12(d)",
                label: "Total TCS Claimed",
                type: "Amount (🔒 Auto)",
                notes: "Linked execution matching source item 22",
                condition: "TaxReturnPreparer === 'Yes'", 

              },
              {
                name: "totalSelfAssessmentTaxPaid",
                ref: "D12(b)",
                label: "Total Self-Assessment Tax Paid",
                type: "Amount (🔒 Auto)",
                notes: "Aggregated link from item 21",
                condition: "TaxReturnPreparer === 'Yes'"

              },
              {
                name: "totalTaxesPaidSummary",
                ref: "D12",
                label: "Total Taxes Paid D12(a+b+c+d)",
                type: "Amount (🔒 Auto)",
                formula: "D12a + D12b + D12c + D12d", 
                condition: "TaxReturnPreparer === 'Yes'", 

              },
              {
                name: "netAmountPayable",
                ref: "D13",
                label: "Amount Payable (D11 – D12) if D11 > D12",
                type: "Amount (🔒 Auto)",
                formula: "D11 > D12 ? D11 - D12 : 0",
                condition: "TaxReturnPreparer === 'Yes'", 

              },
              {
                name: "netRefundAmount",
                ref: "D14",
                label: "Refund (D12 – D11) if D12 > D11",
                type: "Amount (🔒 Auto)",
                formula: "D12 > D11 ? D12 - D11 : 0", 
                condition: "TaxReturnPreparer === 'Yes'", 

              },
            ],
          },

        ],
      },
      // {
      //   id: "statutory-filing-details",
      //   title: "1.8 Filing & Return Type Details",
      //   fieldSections: [
      //     {
      //       id: "filing-sections-mapping",
      //       title: "Return Section Type Selection Nodes",
      //       fields: [
      //         {
      //           name: "isReturnTypeDetailsApplicable",
      //           label: "Filing & Return Type Details applicable?",
      //           type: "Dropdown ▼",
      //           required: true,
      //           options: [
      //             { value: "Yes", label: "Yes" },
      //             { value: "No", label: "No" },
      //           ],
      //         },
      //         {
      //           name: "filedUnderSectionCode",
      //           label: "Filed u/s (Section)",
      //           type: "Dropdown ▼",
      //           required: true,
      //           options: [
      //             { value: "139(1)", label: "139(1)-On or before due date" },
      //             { value: "139(4)", label: "139(4)-Belated" },
      //             { value: "139(5)", label: "139(5)-Revised" },
      //             { value: "119(2)(b)", label: "119(2)(b)" },
      //             { value: "139(8A)", label: "139(8A)" },
      //             { value: "153A", label: "153A" },
      //             { value: "153C", label: "153C" },
      //           ],
      //           condition: "isReturnTypeDetailsApplicable === 'Yes'",
      //         },
      //         {
      //           name: "filedInResponseToNoticeSection",
      //           label: "Filed in response to notice u/s",
      //           type: "Dropdown ▼",
      //           required: "Conditional",
      //           options: [
      //             { value: "139(9)", label: "139(9)" },
      //             { value: "142(1)", label: "142(1)" },
      //             { value: "148", label: "148" },
      //             { value: "153C", label: "153C" },
      //           ],
      //           condition: "isReturnTypeDetailsApplicable === 'Yes'",
      //         },
      //         {
      //           name: "receiptNumberOfOriginalReturn",
      //           label: "Receipt Number (if revised/defective)",
      //           type: "Text",
      //           required: "Conditional",
      //           condition:
      //             "isReturnTypeDetailsApplicable === 'Yes' && section_139_5_or_139_9",
      //         },
      //         {
      //           name: "dateOfFilingOfOriginalReturn",
      //           label: "Date of filing of original return",
      //           type: "Date",
      //           required: "Conditional",
      //           condition:
      //             "isReturnTypeDetailsApplicable === 'Yes' && section_139_5_or_139_9",
      //           validation: { format: "DD/MM/YYYY" },
      //         },
      //         {
      //           name: "uniqueNumberDinNoticeResponse",
      //           label: "Unique Number / DIN (for notice response)",
      //           type: "Text",
      //           required: "Conditional",
      //           condition: "isReturnTypeDetailsApplicable === 'Yes'",
      //         },
      //         {
      //           name: "dateOfSuchNoticeOrOrder",
      //           label: "Date of such Notice or Order",
      //           type: "Date",
      //           required: "Conditional",
      //           validation: { format: "DD/MM/YYYY" },
      //           condition: "isReturnTypeDetailsApplicable === 'Yes'",
      //         },
      //         {
      //           name: "dueDateOfFilingItr",
      //           label: "Due Date of Filing of ITR",
      //           type: "Date (read-only)",
      //           required: false,
      //           defaultValue: "31/07/2026",
      //           condition: "isReturnTypeDetailsApplicable === 'Yes'",
      //         },
      //       ],
      //     },
      //   ],
      // },
      {
        id: "updated-return-schedule-itru",
        title: "SECTION 6 — Section 139(8A) Updated Return Metadata",
        fieldSections: [
          {
            id: "itru-parta-identity",
            title: "Part A (139(8A)) Core Administrative Elements",
            fields: [
              {
                name: "isItruPartAIdentityApplicable",
                label:
                  "Part A (139(8A)) Core Administrative Elements applicable?",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "itruPan",
                label: "(A1) PAN",
                type: "Text (auto)",
                required: true,
                condition: "isItruPartAIdentityApplicable === 'Yes'",
              },
              {
                name: "itruName",
                label: "(A2) Name",
                type: "Text (auto)",
                required: true,
                condition: "isItruPartAIdentityApplicable === 'Yes'",
              },
              {
                name: "itruAadhaarNumber",
                label: "(A3) Aadhaar Number",
                type: "Text (12 digits)",
                   required: true, 
                condition: "isItruPartAIdentityApplicable === 'Yes'",
              },
              // {
              //   name: "itruAadhaarEnrolmentId",
              //   label: "(A3a) Aadhaar Enrolment ID",
              //   type: "Text",
              //   required: "Conditional",
              // },
              // {
              //   name: "itruAssessmentYear",
              //   label: "(A4) Assessment Year",
              //   type: "Dropdown ▼",
              //   required: true,
              //   options: [
              //     { value: "AY 2025-26", label: "AY 2025-26" },
              //     { value: "AY 2024-25", label: "AY 2024-25" },
              //   ],
              // },
            ],
          },
          {
            id: "itru-previous-filing-history",
            title: "Historical Return Tracking Controls",
            fields: [
              {
                name: "isItruPreviousFilingHistoryApplicable",
                label: "Historical Return Tracking Controls applicable?",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "itruReturnPreviouslyFiled",
                label: "(A5) Return previously filed for this AY?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                condition: "isItruPreviousFilingHistoryApplicable === 'Yes'",
              },
              {
                name: "itruPreviousFiledSection",
                label: "(A6) If Yes, whether u/s",
                type: "Dropdown ▼",
                required: "Conditional",
                options: [
                  { value: "139(1)", label: "139(1)" },
                  { value: "139(4)", label: "139(4)" },
                  { value: "139(5)", label: "139(5)" },
                ],
                condition:
                  "isItruPreviousFilingHistoryApplicable === 'Yes' && itruReturnPreviouslyFiled === 'Yes'",
              },
              // {
              //   name: "itruItrTypeOfOriginalReturn",
              //   label: "(A7) ITR Type of original return",
              //   type: "Dropdown ▼",
              //   required: "Conditional",
              //   options: [
              //     { value: "ITR-1", label: "ITR-1" },
              //     { value: "ITR-2", label: "ITR-2" },
              //     { value: "ITR-3", label: "ITR-3" },
              //     { value: "ITR-4", label: "ITR-4" },
              //     { value: "ITR-5", label: "ITR-5" },
              //     { value: "ITR-6", label: "ITR-6" },
              //     { value: "ITR-7", label: "ITR-7" },
              //   ],
              // },
              {
                name: "itruAckNoOfOriginalReturn",
                label: "(A7) Acknowledgement Number of original return",
                type: "Text",
                required: "Conditional",
                condition:
                  "isItruPreviousFilingHistoryApplicable === 'Yes' && itruReturnPreviouslyFiled === 'Yes'",
              },
              {
                name: "itruDateOfFilingOriginalReturn",
                label: "(A7) Date of Filing of Original Return",
                type: "Date",
                required: "Conditional",
                condition:
                  "isItruPreviousFilingHistoryApplicable === 'Yes' && itruReturnPreviouslyFiled === 'Yes'",
              },
            ],
          },
          {
            id: "itru-eligibility-reasoning",
            title: "Eligibility Framework Reason Codes",
            fields: [
              {
                name: "isItruEligibilityReasoningApplicable",
                label: "Eligibility Framework Reason Codes applicable?",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "itruIsEligibleToFile",
                label: "(A8) Are you eligible to file updated return?",
                type: "Dropdown ▼ (Yes/No)",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                condition: "isItruEligibilityReasoningApplicable === 'Yes'",
              },
              // {
              //   name: "itruFormSelectedForUpdating",
              //   label: "(A9) ITR form for updating income",
              //   type: "Dropdown ▼",
              //   required: true,
              //   options: [
              //     { value: "ITR1", label: "ITR1" },
              //     { value: "ITR2", label: "ITR2" },
              //     { value: "ITR3", label: "ITR3" },
              //     { value: "ITR4", label: "ITR4" },
              //     { value: "ITR5", label: "ITR5" },
              //     { value: "ITR6", label: "ITR6" },
              //     { value: "ITR7", label: "ITR7" },
              //   ],
              // },
              {
                name: "itruReasonsForUpdatingIncome",
                label: "(A10) Reasons for updating income",
                type: "Dropdown ▼ (multi)",
                required: true,
                options: [
                  { value: "Return not filed", label: "Return not filed" },
                  {
                    value: "Income not reported correctly",
                    label: "Income not reported correctly",
                  },
                  { value: "Wrong heads", label: "Wrong heads" },
                  {
                    value: "Reduction of carried forward loss",
                    label: "Reduction of carried forward loss",
                  },
                  {
                    value: "Reduction of unabsorbed depreciation",
                    label: "Reduction of unabsorbed depreciation",
                  },
                  {
                    value: "Reduction of tax credit u/s 115JB",
                    label: "Reduction of tax credit u/s 115JB",
                  },
                  { value: "wrong rate of tax", label: "wrong rate of tax" },
                ],
                condition: "isItruEligibilityReasoningApplicable === 'Yes'",
              },
              {
                name: "itruFilingPeriodWindow",
                label: "(A11) Filing period",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Up to 12 months", label: "Up to 12 months" },
                  { value: "12–24 months", label: "12–24 months" },
                  { value: "24–36 months", label: "24–36 months" },
                  {
                    value: "36–48 months from end of relevant AY",
                    label: "36–48 months from end of relevant AY",
                  },
                ],
                condition: "isItruEligibilityReasoningApplicable === 'Yes'",
              },
              {
                name: "itruFilingToReduceLossDepreciationCredit",
                label:
                  "(A12a) Filing to reduce carried forward loss / depreciation / tax credit?",
                type: "Radio (Yes/No)",
                required: true,
                condition: "isItruEligibilityReasoningApplicable === 'Yes'",
              },
              {
                name: "itruAssessmentYearsAffectedList",
                label:
                  "(A12b) If Yes, list Assessment Years affected (Sl. 1–2)",
                type: "AY Dropdown + Filed? fields",
                required: "Conditional",
                condition: "isItruEligibilityReasoningApplicable === 'Yes'",
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 6,
    label: "Tax Summary",
    route: "tax-summary",
    subsections: [
      // {
      //   id: "taxation-reconciliation-ledger",
      //   title: "5.1 Taxes Paid Real-Time Consolidated Ledger",
      //   fieldSections: [  
      //     // {
      //     //   id: "auto-calculated-tax-summary-aggregates",
      //     //   title: "Dynamic Tax Reconciliation Mappings",
      //     //   fields: [  

      //     //      {
      //     //       name: "TaxReturnPreparer",
      //     //       label: "Taxes Paid Real-Time Consolidated Ledger",
      //     //       type: "Dropdown ▼",
      //     //       required: true,
      //     //       options: ["Yes", "No"],
      //     //       defaultValue: "No",
      //     //     }, 

      //     //     {
      //     //       name: "totalAdvanceTaxPaid",
      //     //       ref: "D12(a)",
      //     //       label: "Total Advance Tax Paid",
      //     //       type: "Amount (🔒 Auto)",
      //     //       notes: "Aggregated link from item 21", 
      //     //       condition: "TaxReturnPreparer === 'Yes'", 
 
      //     //     },
      //     //     {
      //     //       name: "totalTdsClaimed",
      //     //       ref: "D12(c)",
      //     //       label: "Total TDS Claimed (Salary + Other + Rent)",
      //     //       type: "Amount (🔒 Auto)",
      //     //       notes:
      //     //         "System calculated evaluation from schedules: items 18 + 19 + 20",
      //     //       condition: "TaxReturnPreparer === 'Yes'", 

      //     //     },
      //     //     {
      //     //       name: "totalTcsClaimed",
      //     //       ref: "D12(d)",
      //     //       label: "Total TCS Claimed",
      //     //       type: "Amount (🔒 Auto)",
      //     //       notes: "Linked execution matching source item 22",
      //     //       condition: "TaxReturnPreparer === 'Yes'", 

      //     //     },
      //     //     {
      //     //       name: "totalSelfAssessmentTaxPaid",
      //     //       ref: "D12(b)",
      //     //       label: "Total Self-Assessment Tax Paid",
      //     //       type: "Amount (🔒 Auto)",
      //     //       notes: "Aggregated link from item 21",
      //     //       condition: "TaxReturnPreparer === 'Yes'"

      //     //     },
      //     //     {
      //     //       name: "totalTaxesPaidSummary",
      //     //       ref: "D12",
      //     //       label: "Total Taxes Paid D12(a+b+c+d)",
      //     //       type: "Amount (🔒 Auto)",
      //     //       formula: "D12a + D12b + D12c + D12d", 
      //     //       condition: "TaxReturnPreparer === 'Yes'", 

      //     //     },
      //     //     {
      //     //       name: "netAmountPayable",
      //     //       ref: "D13",
      //     //       label: "Amount Payable (D11 – D12) if D11 > D12",
      //     //       type: "Amount (🔒 Auto)",
      //     //       formula: "D11 > D12 ? D11 - D12 : 0",
      //     //       condition: "TaxReturnPreparer === 'Yes'", 

      //     //     },
      //     //     {
      //     //       name: "netRefundAmount",
      //     //       ref: "D14",
      //     //       label: "Refund (D12 – D11) if D12 > D11",
      //     //       type: "Amount (🔒 Auto)",
      //     //       formula: "D12 > D11 ? D12 - D11 : 0", 
      //     //       condition: "TaxReturnPreparer === 'Yes'", 

      //     //     },
      //     //   ],
      //     // },
      //   ],
      // },
      {
        id: "exempt-income-reporting",
        title:
          "5.2 Exempt Income Reporting Block (Reporting Only — Non-Taxable)",
        fieldSections: [
          {
            id: "exempt-income-reporting-grid", 
            title:
              "Exempt Income Structural Streams (Supports up to 4 Repeating Rows for Others)",
            fields: [
              {
                name: "exemptAgricultureIncomeCapped",
                label: "Agriculture Income (≤ ₹5,000)",
                type: "Amount (₹)",
                required: false,
                notes:
                  "Pre-labelled row; static visible initialization element",
              },
              {
                name: "exemptDividendIncomeSec10_34",
                label: "Sec. 10(34) Exempted Dividend Income",
                type: "Amount (₹)",
                required: false,
                notes: "Pre-labelled static row representation",
              },
              {
                name: "exemptOthersNatureDropdown",
                label: "Others Nature Select Dropdown",
                type: "Dropdown ▼ Nature + Amount",
                required: false,
                options: [
                  { value: "Sec 10(34)", label: "Sec 10(34)" },
                  { value: "Sec 10(10D)", label: "Sec 10(10D)" },
                  { value: "Sec 10(11)", label: "Sec 10(11)" },
                  { value: "Sec 10(12)", label: "Sec 10(12)" },
                  { value: "Sec 10(13)", label: "Sec 10(13)" },
                  { value: "Sec 10(16)", label: "Sec 10(16)" },
                  { value: "Sec 10(17A)", label: "Sec 10(17A)" },
                  {
                    value: "LTCG 112A ≤ ₹1 lakh",
                    label: "LTCG 112A ≤ ₹1 lakh",
                  },

                  { value: "Any Other", label: "Any Other" },
                ],

              },
              {
                name: "exemptOthersAmountCell",
                label: "Others Exempt Amount",
                type: "Amount (₹)",
                required: false,
              },
              {
                name: "totalExemptAmountSummary",
                label: "Total Exempt Amount",
                type: "Amount (🔒 Auto)",
                required: false,
                notes:
                  "Mathematical absolute summation across all specified exempt rows",
              },
            ],
          },
        ],
      },
{
        id: "banking-payment-channels",
        title: "5.3 Bank Account Details",
        fieldSections: [
          {
            id: "bank-accounts-repeating-array",
            title:
              "Financial Bank Account Processing Columns (At least 1 active savings entry required)",
            fields: [
              {
                name: "bankIfscCode",
                label: "IFS Code of Bank",
                type: "Text / Lookup ▼",
                required: true,
                notes:
                  "Triggers lookups to automatically validate and populate string literal matching Bank Name",
              },
              {
                name: "bankNameAutoFilled",
                label: "Name of Bank",
                type: "Text (auto-filled)",
                required: true,
              },
              {
                name: "bankAccountNumberString",
                label: "Account Number",
                type: "Text",
                required: true,
              },
              {
                name: "bankAccountTypeDropdown",
                label: "Type of Account",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Savings", label: "Savings" },
                  { value: "Current", label: "Current" },
                  { value: "Others", label: "Others" },
                ],
              },
              {
                name: "isAccountSelectedForRefundCredit",
                label: "Select Account for Refund Credit",
                type: "Radio / Checkbox",
                required: true,
                notes:
                  "At least one distinct bank node must match True validation settings to serve as tax refund terminal destination",
              },
              {
                name: "totalSavingsCurrentAccountsHeldInput",
                label: "Total Savings & Current Accounts Count",
                type: "Integer Input",
                required: true,
                notes:
                  "Total active/non-dormant tracking counter metric. Hard fallback logic settings apply for non-resident bank account access profiles: IFSC = NNNN0NNNNNN, Bank = NOT APPLICABLE, Account = NA999",
              },
            ],
          },
        ],
      },
      {
        id: "legal-signatures-verification",
        title: "5.4 Verification Declaration & 5.5 TRP Details",
        fieldSections: [
          {
            id: "legal-signoff-declaration",
            title: "5.4 Statutory Signature Authentication Matrix",
            fields: [
              {
                name: "verificationFullName",
                label: "Full Name (in block letters)",
                type: "Text (auto-filled from PAN)",
                required: true,
              },
              {
                name: "verificationParentageName",
                label: "Son / Daughter of",
                type: "Text",
                required: true,
                notes: "Taxpayer parent identity tracking context mapping",
              },
              {
                name: "verificationCapacityDesignation",
                label: "Capacity / Designation",
                type: "Dropdown ▼",
                required: true,
                options: [
                  { value: "Self", label: "Self" },
                  { value: "Karta", label: "Karta" },
                  { value: "Managing Director", label: "Managing Director" },
                  { value: "Trustee", label: "Trustee" },
                  {
                    value: "Representative Assessee",
                    label: "Representative Assessee",
                  },
                ],
              },
              {
                name: "verificationPlaceOfSigning",
                label: "Place of Signing",
                type: "Text",
                required: true,
                notes: "City location string context",
              },
              {
                name: "verificationSystemFilingDate",
                label: "Date",
                type: "Date",
                required: false,
              },
              {
                name: "verificationSignatoryPan",
                label: "PAN",
                type: "Text (auto-filled)",
                required: false,
              },
            ],
          },
          {
            id: "tax-return-preparer-subblock",
            title: "5.5 Tax Return Preparer (TRP) Optional Layout Node",
            fields: [
              {
                name: "isTrpFiled",
                label: "Tax Return Preparer (TRP) Optional Layout Node",
                type: "Dropdown ▼",
                required: true,
                options: ["Yes", "No"],
                defaultValue: "No",
              },
              {
                name: "trpIdentificationNumber",
                label: "Identification Number of TRP",
                type: "Text",
                required: "Conditional",
                condition: "isTrpFiled === 'Yes'",
              },
              {
                name: "trpNameLiteral",
                label: "Name of TRP",
                type: "Text",
                required: "Conditional",
                condition: "isTrpFiled === 'Yes'",
              },
              {
                name: "trpReimbursementAmountGovt",
                label:
                  "Reimbursement Amount from Govt (₹) — to be filled by TRP",
                type: "Amount",
                required: false,
                condition: "isTrpFiled === 'Yes'",
              },
            ],
          },
        ],
      },
      {
        id: "itru-computation-matrix",
        title:
          "6.1 Part B-ATI — Computation of Updated Income & Additional Tax (ITR-U)",
        fieldSections: [
          {
            id: "itru-additional-income-sources",
            title: "Additional Heads of Income Realized Block",
            fields: [
              {
                name: "isItruAdditionalIncomeSourcesApplicable",
                label: "Additional Heads of Income Realized Block details applicable?",
                type: "Dropdown ▼",
                required: true,
                options: ["Yes", "No"],
                defaultValue: "No",
              },
              {
                name: "itruAddIncomeSalary",
                ref: "1A-a",
                label: "Additional Income — Salary",
                type: "Amount (₹)",
                required: false,
                condition: "isItruAdditionalIncomeSourcesApplicable === 'Yes'",
              },
              {
                name: "itruAddIncomeHouseProperty",
                ref: "1A-b",
                label: "Additional Income — House Property",
                type: "Amount (₹)",
                required: false,
                condition: "isItruAdditionalIncomeSourcesApplicable === 'Yes'",
              },
              {
                name: "itruAddIncomeBusinessProfession",
                ref: "1A-c",
                label: "Additional Income — Business/Profession",
                type: "Amount (₹)",
                required: false,
                notes:
                  "Statically flags default value 0 as typically not applicable inside native ITR-1 rulesets",
                condition: "isItruAdditionalIncomeSourcesApplicable === 'Yes'",
              },
              {
                name: "itruAddIncomeCapitalGains",
                ref: "1A-d",
                label: "Additional Income — Capital Gains",
                type: "Amount (₹)",
                required: false,
                condition: "isItruAdditionalIncomeSourcesApplicable === 'Yes'",
              },
              {
                name: "itruAddIncomeOtherSources",
                ref: "1A-e",
                label: "Additional Income — Other Sources",
                type: "Amount (₹)",
                required: false,
                condition: "isItruAdditionalIncomeSourcesApplicable === 'Yes'",
              },
              {
                name: "itruTotalAdditionalIncomeSummary",
                ref: "1A-f",
                label: "Total Additional Income (a+b+c+d+e)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "1A-a + 1A-b + 1A-c + 1A-d + 1A-e",
                condition: "isItruAdditionalIncomeSourcesApplicable === 'Yes'",
              },
            ],
          },
          {
            id: "itru-tax-liability-reconciliation",
            title: "Historic Tax Ledger Adjustment Elements",
            fields: [
              {
                name: "isItruTaxLiabilityReconciliationApplicable",
                label: "Historic Tax Ledger Adjustment Elements applicable?",
                type: "Dropdown ▼",
                required: true,
                options: ["Yes", "No"],
                defaultValue: "No",
              },
              {
                name: "itruTotalIncomeLastValidReturn",
                ref: "1B",
                label: "Total Income as per last valid return (B)",
                type: "Amount (₹)",
                required: false,
                condition: "isItruTaxLiabilityReconciliationApplicable === 'Yes'",
              },
              {
                name: "itruTotalIncomeFromPartC",
                ref: "2",
                label: "Total Income (from Part C)",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "isItruTaxLiabilityReconciliationApplicable === 'Yes'",
              },
              {
                name: "itruAmountPayablePartD",
                ref: "3",
                label: "Amount Payable from Part D",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "isItruTaxLiabilityReconciliationApplicable === 'Yes'",
              },
              {
                name: "itruAmountRefundablePartD",
                ref: "4",
                label: "Amount Refundable from Part D",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "isItruTaxLiabilityReconciliationApplicable === 'Yes'",
              },
              {
                name: "itruAmountPayableLastValidReturn",
                ref: "5",
                label: "Amount Payable as per last valid return",
                type: "Amount (₹)",
                required: false,
                condition: "isItruTaxLiabilityReconciliationApplicable === 'Yes'",
              },
              {
                name: "itruRefundClaimedLastValidReturn",
                ref: "6i",
                label: "Refund Claimed as per last valid return (6i)",
                type: "Amount (₹)",
                required: false,
                condition: "isItruTaxLiabilityReconciliationApplicable === 'Yes'",
              },
              {
                name: "itruTotalRefundIssuedLastValidReturn",
                ref: "6ii",
                label: "Total Refund Issued as per last valid return (6ii)",
                type: "Amount (₹)",
                required: false,
                notes:
                  "Must capture absolute gross tracking values including any interest parameters generated u/s 244A",
                condition: "isItruTaxLiabilityReconciliationApplicable === 'Yes'",
              },
            ],
          },
          {
            id: "itru-penalties-aggregate-balances",
            title: "ITR-U Penalties & Aggregated Deficit Final Calculations",
            fields: [
              {
                name: "isItruPenaltiesAggregateBalancesApplicable",
                label: "ITR-U Penalties & Aggregated Deficit Final Calculations applicable?",
                type: "Dropdown ▼",
                required: true,
                options: ["Yes", "No"],
                defaultValue: "No",
              },
              {
                name: "itruFeeSec234FDefaultReturn",
                ref: "7",
                label: "Fee u/s 234F for default in furnishing return",
                type: "Amount (🔒 Auto)",
                required: false,
                condition: "isItruPenaltiesAggregateBalancesApplicable === 'Yes'",
              },
              {
                name: "itruRegularAssessmentTaxPaid",
                ref: "8",
                label: "Regular Assessment Tax paid (if any)",
                type: "Amount (₹)",
                required: false,
                notes:
                  "Captures explicit tax payments executing over and above the boundaries tracked by index row sl. 5",
                condition: "isItruPenaltiesAggregateBalancesApplicable === 'Yes'",
              },
              {
                name: "itruAggregateLiabilityRefundIssuedCase",
                ref: "9i",
                label: "Aggregate Liability — if refund issued (9i)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "3 + 6ii - (5 + 8 + 4)",
                condition: "isItruPenaltiesAggregateBalancesApplicable === 'Yes'",
              },
              {
                name: "itruAggregateLiabilityRefundNotIssuedCase",
                ref: "9ii",
                label: "Aggregate Liability — if refund not issued (9ii)",
                type: "Amount (🔒 Auto)",
                required: false,
                formula: "3 + 6i - (5 + 8 + 4)",
                condition: "isItruPenaltiesAggregateBalancesApplicable === 'Yes'",
              },
              {
                name: "itruAdditionalIncomeTaxSurchargeInterest",
                ref: "10",
                label: "Additional Income-Tax (25%/50%/60%/70% of 9–7)",
                type: "Amount (🔒 Auto)",
                required: false,
                notes:
                  "Automated surcharge application percentage tier determined natively by chronological timeframe variables mapped in item index (A11)",
                condition: "isItruPenaltiesAggregateBalancesApplicable === 'Yes'",
              },
              {
                name: "itruTaxPaidUnderSection140B",
                ref: "12",
                label: "Tax Paid u/s 140B",
                type: "Amount (🔒 Auto)",
                required: false,
                notes:
                  "Consolidated link matching summation rows on payment grid data mapped underneath",
                condition: "isItruPenaltiesAggregateBalancesApplicable === 'Yes'",
              },
              {
                name: "itruReliefUnderSection89NotClaimedEarlier",
                ref: "15",
                label: "Relief u/s 89 not claimed in earlier return",
                type: "Amount (₹)",
                required: false,
                condition: "isItruPenaltiesAggregateBalancesApplicable === 'Yes'",
              },
            ],
          },
          {
            id: "itru-challan-payments-140b",
            title:
              "6.1.1 Tax Payment Details u/s 140B Verification Grid (Up to 2 rows per sub-table)",
            fields: [
              {
                name: "isItruChallanPayments140bApplicable",
                label: "Tax Payment Details u/s 140B Verification Grid details applicable?",
                type: "Dropdown ▼",
                required: true,
                options: ["Yes", "No"],
                defaultValue: "No",
              },
              {
                name: "itruChallanBsrCode",
                label: "BSR Code of Bank",
                type: "Text (7 digits)",
                required: true,
                condition: "isItruChallanPayments140bApplicable === 'Yes'",
              },
              {
                name: "itruChallanDepositDate",
                label: "Date of Deposit (DD/MM/YYYY)",
                type: "Date",
                required: true,
                condition: "isItruChallanPayments140bApplicable === 'Yes'",
              },
              {
                name: "itruChallanSerialNumber",
                label: "Serial Number of Challan",
                type: "Text",
                required: true,
                condition: "isItruChallanPayments140bApplicable === 'Yes'",
              },
              {
                name: "itruChallanAmountPaid",
                label: "Amount (₹)",
                type: "Amount",
                required: true,
                condition: "isItruChallanPayments140bApplicable === 'Yes'",
              },
            ],
          },
        ],
      },
    ],
  },
];

export default itr1FieldConfig;

const REF_STATES_UTS = [
  "Andaman and Nicobar Islands",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Foreign",
];
const REF_COUNTRIES = ["91-INDIA", "99-Foreign Country"];
const REF_FINANCIAL_YEARS = ["2025-26", "2024-25", "2023-24"];
const REF_ASSESSMENT_YEARS = [
  "2024-25",
  "2023-24",
  "2022-23",
  "2021-22",
  "2020-21",
];
const REF_DISABILITY_NATURE = [
  "Autism",
  "Cerebral Palsy",
  "Multiple Disability",
  "Mental Retardation",
  "Other",
];
const REF_DISABILITY_TYPE = ["Normal (40% to 80%)", "Severe (Above 80%)"];

function resolveOptions(options) {
  if (!options) return undefined;
  if (Array.isArray(options)) return options;
  if (options === "REF_STATES_UTS") return REF_STATES_UTS;
  if (options === "REF_COUNTRIES") return REF_COUNTRIES;
  if (options === "REF_FINANCIAL_YEARS") return REF_FINANCIAL_YEARS;
  if (options === "REF_ASSESSMENT_YEARS") return REF_ASSESSMENT_YEARS;
  if (options === "REF_DISABILITY_NATURE") return REF_DISABILITY_NATURE;
  if (options === "REF_DISABILITY_TYPE") return REF_DISABILITY_TYPE;
  return [];
}

function normalizeType(rawType) {
  if (!rawType) return "text";
  const t = rawType.toString().toLowerCase().trim();
  if (t.startsWith("dropdown") || t.startsWith("select") || t === "yes/no")
    return "select";
  if (t === "radio") return "select";
  if (
    t === "date" ||
    t === "datepicker" ||
    t === "date picker" ||
    t === "date-picker"
  )
    return "date";
  if (t === "amount" || t.startsWith("amount")) return "amount";
  if (t === "number" || t === "auto") return "number";
  if (t === "email") return "email";
  if (t === "tel") return "tel";
  if (t === "checkbox") return "checkbox";
  if (t === "readonly" || t === "read-only" || t === "computed")
    return "readOnly";
  return "text";
}

function resolveCondition(raw) {
  if (!raw || typeof raw !== "string") return {};
  const matchEq = raw.match(/([a-zA-Z0-9_]+)\s*===\s*['"]([^'"]+)['"]/);
  if (matchEq)
    return { conditionalOn: { field: matchEq[1], value: matchEq[2] } };
  return {};
}

function mapItr1Field(f) {
  const rawType = f.type || f.inputType || "text";
  const type = normalizeType(rawType);
  const options = resolveOptions(f.options);
  const { conditionalOn } = resolveCondition(f.condition);
  const isCompoundCondition =
    f.condition &&
    typeof f.condition === "string" &&
    (f.condition.includes("&&") || f.condition.includes("||"));
  return {
    ...f,
    name: f.name || f.id,
    type,
    options,
    ...(conditionalOn ? { conditionalOn } : {}),
    condition: conditionalOn && !isCompoundCondition ? undefined : f.condition,
  };
}

function buildSectionsFromFieldSection(fs) {
  const normalFields = [];
  const extraSections = [];
  (fs.fields || []).forEach((f) => {
    const mapped = mapItr1Field(f);
    const rawType = (f.type || "").toLowerCase();
    if (rawType === "table" || rawType === "matrix") {
      extraSections.push({
        title: f.label,
        description: f.note || f.notes,
        isList: true,
        listName: f.name || f.id,
        fields: (f.columns || []).map((col) => ({
          ...col,
          name: col.name || col.id,
          type: normalizeType(col.type),
          required: false,
        })),
        condition: fs.condition,
      });
    } else {
      normalFields.push(mapped);
    }
  });
  const result = [];
  if (normalFields.length > 0) {
    result.push({
      title: fs.title || fs.label,
      description: fs.note || fs.notes,
      fields: normalFields,
      condition: fs.condition,
    });
  }
  return [...result, ...extraSections];
}

// Build the mapping dynamically from the array config
export const individualConfigMapping = {};

itr1FieldConfig.forEach((step) => {
  const targetRoute = step.route === "tax-summary" ? "filing" : step.route;

  if (!individualConfigMapping[targetRoute]) {
    individualConfigMapping[targetRoute] = {};
  }

  (step.subsections || []).forEach((sub) => {
    const sections = [];
    (sub.fieldSections || []).forEach((fs) => {
      sections.push(...buildSectionsFromFieldSection(fs));
    });
    individualConfigMapping[targetRoute][sub.id] = {
      title: sub.label || sub.title,
      sections,
    };
  });
});

// Alias efiling for DynamicFilingStep compatibility
if (individualConfigMapping.filing) {
  const filingKeys = Object.keys(individualConfigMapping.filing);
  if (filingKeys.length > 0 && !individualConfigMapping.filing.efiling) {
    individualConfigMapping.filing.efiling =
      individualConfigMapping.filing[filingKeys[filingKeys.length - 1]];
  }
}

export const itr1ConfigMapping = individualConfigMapping;
