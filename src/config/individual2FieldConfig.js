import {
  statesList,
  countriesList,
  countryCodesList,
  retirementCountriesList,
} from "./constant";

export const itr2FieldConfig = [
  {
    id: 1,
    label: "Details",
    route: "details",
    subsections: [
      {
        id: "part-a-gen",
        label: "Part A: General Information",
        fieldSections: [
          {
            id: "personal-identity",
            label: "1.1 Personal Identity",
            fields: [
              {
                name: "firstName",
                label: "First Name",
                type: "text",
                required: true,
                validation: "alphaOnly",
                maxChars: 75,
              },
              {
                name: "middleName",
                label: "Middle Name",
                type: "text",
                required: false,
                validation: "alphaOnly",
              },
              {
                name: "lastName",
                label: "Last Name",
                type: "text",
                required: true,
                validation: "alphaOnly",
              },
              {
                name: "pan",
                label: "PAN",
                type: "text",
                required: true,
                validation: "regex",
                pattern: "^[A-Z]{5}[0-9]{4}[A-Z]{1}$",
                maxChars: 10,
              },
              {
                name: "status",
                label: "Status",
                type: "dropdown",
                required: true,
                options: [
                  { value: "I", label: "I – Individual" },
                  { value: "H", label: "H – HUF" },
                ],
              },
              {
                name: "dobFormation",
                label: "Date of Birth / Formation",
                type: "datePicker",
                required: true,
                notes: "DOB for Individual, Date of formation for HUF",
              },
              {
                name: "hasAadhaar",
                label: "Do you have an Aadhaar Number?",
                type: "dropdown",
                required: true,
                defaultValue: "No",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "aadhaarNumber",
                label: "Aadhaar Number",
                type: "text",
                required: "conditional",
                condition: 'hasAadhaar === "Yes"',
                validation: { digitsOnly: true, exactChars: 12 },
                maxChars: 12,
                notes: "Required if Aadhaar is allotted",
              },
              {
                name: "aadhaarEnrolmentId",
                label: "Aadhaar Enrolment ID",
                type: "text",
                required: "conditional",
                condition: 'hasAadhaar === "No"',
                validation: { digitsOnly: true, exactChars: 28 },
                maxChars: 28,
                notes: "Required ONLY if Aadhaar not yet allotted",
              },
              {
                name: "passportNumber",
                label: "Passport Number",
                type: "text",
                required: false,
                condition: 'status === "I"',
              },
              {
                name: "isFpi",
                label: "Whether you are an FPI?",
                type: "dropdown",
                required: false,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sebiRegNumber",
                label: "SEBI Registration Number",
                type: "text",
                required: "conditional",
                condition: 'isFpi === "Yes"',
              },
            ],
          },
          {
            id: "residential-status",
            label: "1.2 Residential Status",
            fields: [
              {
                name: "residentialStatus",
                label: "Residential Status in India",
                type: "dropdown",
                required: true,
                options: [
                  { value: "RES", label: "RES – Resident" },
                  { value: "NRI", label: "NRI – Non Resident" },
                  {
                    value: "NOR",
                    label: "NOR – Resident but not Ordinarily Resident",
                  },
                ],
              },
              {
                name: "residentialConditions",
                label: "Conditions for Residential Status",
                type: "dropdown",
                required: "conditional",
                condition: 'status === "I"',
                options: [
                  { value: "6_1_a", label: "182 days rule (6(1)(a))" },
                  { value: "6_1_c", label: "60 days rule (6(1)(c))" },
                  { value: "120_day", label: "120-day citizen rule" },
                  {
                    value: "6_6_d_15_lakh",
                    label: "citizen 6(6)(d) 15 lakh rule",
                  },
                ],
              },
              {
                name: "jurisdictionsOfResidence",
                label: "Jurisdiction(s) of Residence",
                type: "table",
                required: "conditional",
                condition:
                  'residentialStatus === "NRI" || residentialStatus === "NOR"',
                columns: [
                  {
                    name: "country",
                    label: "Country",
                    type: "dropdown",
                    required: true,
                    options: countriesList,
                  },
                  {
                    name: "tin",
                    label: "Taxpayer Identification Number (TIN)",
                    type: "text",
                    required: true,
                  },
                ],
              },
              {
                name: "stayPeriodPreviousYear",
                label:
                  "Total period of stay in India during previous year (days)",
                type: "number",
                required: "conditional",
              },
              {
                name: "stayPeriodPrecedingYears",
                label:
                  "Total period of stay in India during 4 preceding years (days)",
                type: "number",
                required: "conditional",
              },
              {
                name: "hasPeInIndia",
                label:
                  "In case of non-resident: permanent establishment (PE) in India?",
                type: "radio",
                required: "conditional",
                condition: 'residentialStatus === "NRI"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "claimBenefit115H",
                label: "Do you want to claim benefit u/s 115H?",
                type: "radio",
                required: "conditional",
                condition: 'residentialStatus === "RES"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
            ],
          },
          {
            id: "primary-address",
            label: "1.3 Primary Address",
            fields: [
              {
                name: "pFlatDoorBlock",
                label: "Flat / Door / Block No.",
                type: "text",
                required: true,
              },
              {
                name: "pPremisesBuildingVillage",
                label: "Name of Premises / Building / Village",
                type: "text",
                required: false,
              },
              {
                name: "pRoadStreetPo",
                label: "Road / Street / Post Office",
                type: "text",
                required: false,
              },
              {
                name: "pAreaLocality",
                label: "Area / Locality",
                type: "text",
                required: false,
              },
              {
                name: "pTownCityDistrict",
                label: "Town / City / District",
                type: "text",
                required: true,
              },
              {
                name: "pState",
                label: "State",
                type: "dropdown",
                required: true,
                options: statesList,
              },
              {
                name: "pCountry",
                label: "Country / Region",
                type: "dropdown",
                required: true,
                options: countriesList,
                defaultValue: "India",
              },
              {
                name: "pNoZipCode",
                label: "Do you have ZIP Code?",
                type: "dropdown",
                required: false,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "pPinCode",
                label: "PIN Code",
                type: "text",
                required: "conditional",
                condition: 'pNoZipCode === "No"',
                validation: "regex",
                pattern: "^[1-9]{1}[0-9]{5}$",
                maxChars: 6,
              },
              {
                name: "pZipCode",
                label: "ZIP Code",
                type: "text",
                required: "conditional",
                condition: 'pNoZipCode === "Yes"',
              },
            ],
          },
          {
            id: "secondary-address",
            label: "1.4 Secondary Address",
            fields: [
              {
                name: "isSecondarySame",
                label: "Is the secondary address same as primary address?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sFlatDoorBlock",
                label: "Flat / Door / Block No.",
                type: "text",
                required: "conditional",
                condition: 'isSecondarySame === "No"',
              },
              {
                name: "sPremisesBuildingVillage",
                label: "Name of Premises / Building / Village",
                type: "text",
                required: false,
                condition: 'isSecondarySame === "No"',
              },
              {
                name: "sRoadStreetPo",
                label: "Road / Street / Post Office",
                type: "text",
                required: false,
                condition: 'isSecondarySame === "No"',
              },
              {
                name: "sAreaLocality",
                label: "Area / Locality",
                type: "text",
                required: false,
                condition: 'isSecondarySame === "No"',
              },
              {
                name: "sTownCityDistrict",
                label: "Town / City / District",
                type: "text",
                required: "conditional",
                condition: 'isSecondarySame === "No"',
              },
              {
                name: "sState",
                label: "State",
                type: "dropdown",
                required: "conditional",
                condition: 'isSecondarySame === "No"',
                options: statesList,
              },
              {
                name: "sCountry",
                label: "Country / Region",
                type: "dropdown",
                required: "conditional",
                condition: 'isSecondarySame === "No"',
                options: countriesList,
                defaultValue: "India",
              },
              {
                name: "sNoZipCode",
                label: "Do you have ZIP Code?",
                type: "dropdown",
                required: false,
                condition: 'isSecondarySame === "No"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "sPinCode",
                label: "PIN Code",
                type: "text",
                required: "conditional",
                condition: 'isSecondarySame === "No" && sNoZipCode === "No"',
                validation: "regex",
                pattern: "^[1-9]{1}[0-9]{5}$",
                maxChars: 6,
              },
              {
                name: "sZipCode",
                label: "ZIP Code",
                type: "text",
                required: "conditional",
                condition: 'isSecondarySame === "No" && sNoZipCode === "Yes"',
              },
            ],
          },
          {
            id: "contact-details",
            label: "1.5 Contact Details",
            fields: [
              {
                name: "primaryEmail",
                label: "Primary Email ID",
                type: "email",
                required: true,
              },
              {
                name: "secondaryEmail",
                label: "Secondary Email ID",
                type: "email",
                required: false,
              },
              {
                name: "primaryMobile",
                label: "Primary Mobile No.",
                type: "tel",
                required: true,
                validation: { digitsOnly: true, exactChars: 10 },
                maxChars: 10,
                notes: "10-digit mobile number",
              },
              {
                name: "stdIsdCode",
                label: "STD/ISD Code",
                type: "text",
                required: false,
              },
              {
                name: "landlinePhone",
                label: "Residential/Office Phone Number",
                type: "tel",
                required: false,
              },
              {
                name: "secondaryMobileCountryCode",
                label: "Country Code (Secondary Mobile)",
                type: "dropdown",
                required: false,
                options: countryCodesList,
                defaultValue: "+91",
              },
              {
                name: "secondaryMobile",
                label: "Secondary Mobile No.",
                type: "tel",
                required: false,
                validation: { digitsOnly: true, exactChars: 10 },
              },
            ],
          },
          {
            id: "tax-regime",
            label: "1.6 Tax Regime Selection",
            fields: [
              {
                name: "optOutNewRegime",
                label: "Opt out of New Tax Regime u/s 115BAC(6)?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "continue", label: "Continue to opt" },
                  { value: "optOut", label: "Opt out" },
                  { value: "notOpting", label: "Not opting" },
                  { value: "optingInNow", label: "Opting in now" },
                  { value: "old", label: "Old" },
                ],
                defaultValue: "New Regime",
              },
              {
                name: "form10IeDate",
                label: "Date of filing of Form 10-IE",
                type: "datePicker",
                required: "conditional",
                condition:
                  'optOutNewRegime === "optOut" || optOutNewRegime === "old"',
              },
              {
                name: "form10IeAck",
                label: "Acknowledgement number of Form 10-IE",
                type: "text",
                required: "conditional",
                condition:
                  'optOutNewRegime === "optOut" || optOutNewRegime === "old"',
              },
            ],
          },
        ],
      },
      {
        id: "filing-status-blocks",
        label: "Filing Status & Conditional Disclosures",
        fieldSections: [
          {
            id: "filing-details",
            label: "1.7 Filing Details & Return Type",
            fields: [
              {
                name: "filedUnderSection",
                label: "Filed u/s (Section)",
                type: "dropdown",
                required: true,
                options: [
                  { value: "139_1", label: "139(1)-On or before due date" },
                  { value: "139_4", label: "139(4)-Belated" },
                  { value: "139_5", label: "139(5)-Revised" },
                  { value: "92CD", label: "92CD-Modified" },
                  { value: "119_2_b", label: "119(2)(b)" },
                  { value: "139_8A", label: "139(8A)-Updated" },
                  { value: "139_9", label: "139(9)-Defective" },
                  { value: "142_1", label: "142(1)" },
                  { value: "148", label: "148" },
                  { value: "153A", label: "153A" },
                  { value: "153C", label: "153C" },
                ],
              },
              {
                name: "noticeResponseSection",
                label: "Filed in response to notice u/s",
                type: "dropdown",
                required: "conditional",
                options: ["139(9)", "142(1)", "148", "153C", "153A"],
              },
              {
                name: "receiptNumber",
                label: "Receipt no. (if revised/defective/modified)",
                type: "text",
                required: "conditional",
              },
              {
                name: "originalReturnFilingDate",
                label: "Date of filing of Original Return",
                type: "datePicker",
                required: "conditional",
              },
              {
                name: "noticeDin",
                label: "Unique Number / DIN (for notice response)",
                type: "text",
                required: "conditional",
              },
              {
                name: "noticeOrderDate",
                label: "Date of such Notice/Order",
                type: "datePicker",
                required: "conditional",
              },
              {
                name: "dueDate139_1",
                label: "Due Date u/s 139(1)",
                type: "datePicker",
              },
            ],
          },
          {
            id: "seventh-proviso",
            label: "1.8 Seventh Proviso to Section 139(1)",
            fields: [
              {
                name: "filingUnderSeventhProviso",
                label: "Filing under Seventh Proviso?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "depositedCurrentAccount",
                label: "Deposited > ₹1 Crore in current account(s)?",
                type: "radio",
                required: "conditional",
                condition: 'filingUnderSeventhProviso === "Yes"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "foreignTravelExpense",
                label: "Incurred > ₹2 lakh on foreign travel?",
                type: "radio",
                required: "conditional",
                condition: 'filingUnderSeventhProviso === "Yes"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "electricityExpense",
                label: "Incurred > ₹1 lakh on electricity?",
                type: "radio",
                required: "conditional",
                condition: 'filingUnderSeventhProviso === "Yes"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "salesTurnoverLimit",
                label: "Sales/turnover > ₹60 lakh? (clause iv)",
                type: "radio",
                required: "conditional",
                condition: 'filingUnderSeventhProviso === "Yes"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "professionalReceiptsLimit",
                label: "Gross receipts in profession > ₹10 lakh?",
                type: "radio",
                required: "conditional",
                condition: 'filingUnderSeventhProviso === "Yes"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "tdsTcsLimit",
                label: "TDS+TCS ≥ ₹25,000 (or ₹50,000 senior citizen)?",
                type: "radio",
                required: "conditional",
                condition: 'filingUnderSeventhProviso === "Yes"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "savingsDepositLimit",
                label: "Savings bank deposits ≥ ₹50 lakh?",
                type: "radio",
                required: "conditional",
                condition: 'filingUnderSeventhProviso === "Yes"',
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
            ],
          },
          {
            id: "representative-assessee",
            label: "1.9 Representative Assessee",
            fields: [
              {
                name: "isRepresentative",
                label: "Filed by representative assessee?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "repName",
                label: "Name of Representative",
                type: "text",
                required: "conditional",
                condition: 'isRepresentative === "Yes"',
              },
              {
                name: "repEmail",
                label: "E-mail ID of Representative",
                type: "email",
                required: "conditional",
                condition: 'isRepresentative === "Yes"',
              },
              {
                name: "repContact",
                label: "Contact Number of Representative",
                type: "tel",
                required: "conditional",
                condition: 'isRepresentative === "Yes"',
              },
              {
                name: "repCapacity",
                label: "Capacity of Representative",
                type: "dropdown",
                required: "conditional",
                condition: 'isRepresentative === "Yes"',
                options: ["Legal Heir", "Manager", "Guardian", "Other"],
              },
              {
                name: "repAddress",
                label: "Address of Representative",
                type: "text",
                required: "conditional",
                condition: 'isRepresentative === "Yes"',
              },
              {
                name: "repPan",
                label: "PAN of Representative",
                type: "text",
                required: "conditional",
                condition: 'isRepresentative === "Yes"',
                maxChars: 10,
              },
              {
                name: "repAadhaar",
                label: "Aadhaar Number of Representative",
                type: "text",
                required: false,
                condition: 'isRepresentative === "Yes"',
                maxChars: 12,
              },
            ],
          },
          {
            id: "directorship-disclosure",
            label: "1.10 Directorship Disclosure",
            fields: [
              {
                name: "isDirectorInCompany",
                label: "Are you a Director in any company?",
                type: "dropdown",
                required: true,
                defaultValue: "No",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "directorTable",
                label: "Director in a company details",
                type: "table",
                required: "conditional",
                condition: 'isDirectorInCompany === "Yes"',
                columns: [
                  {
                    name: "companyName",
                    label: "Name of Company",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "companyType",
                    label: "Type of Company",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "companyPan",
                    label: "PAN of Company",
                    type: "text",
                    required: true,
                    maxChars: 10,
                  },
                  {
                    name: "shareListingStatus",
                    label: "Whether shares listed or unlisted",
                    type: "dropdown",
                    required: true,
                    options: ["Listed", "Unlisted"],
                  },
                  {
                    name: "din",
                    label: "Director Identification Number (DIN)",
                    type: "text",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            id: "partnership-firm",
            label: "1.11 Partnership in Firm",
            fields: [
              {
                name: "isPartnerInFirm",
                label: "Whether Partner in a Firm?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "firmName",
                label: "Name of Firm",
                type: "text",
                required: "conditional",
                condition: 'isPartnerInFirm === "Yes"',
              },
              {
                name: "firmPan",
                label: "PAN of Firm",
                type: "text",
                required: "conditional",
                condition: 'isPartnerInFirm === "Yes"',
                maxChars: 10,
              },
            ],
          },
          {
            id: "unlisted-equity",
            label: "1.12 Unlisted Equity Shares Disclosure",
            fields: [
              {
                name: "hasUnlistedShares",
                label: "Do you hold any Unlisted Equity Shares?", 
                type: "dropdown",
                required: true,
                defaultValue: "No",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "unlistedSharesTable",
                label: "Unlisted Equity Shares Held",
                type: "table",
                required: "conditional",
                condition: 'hasUnlistedShares === "Yes"',
                columns: [
                  {
                    name: "companyName",
                    label: "Name of Company",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "companyType",
                    label: "Type of Company",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "pan",
                    label: "PAN",
                    type: "text",
                    required: true,
                    maxChars: 10,
                  },
                  {
                    name: "openingNo",
                    label: "Opening Balance — No. of Shares",
                    type: "number",
                    required: true,
                  },
                  {
                    name: "openingCost",
                    label: "Opening Balance — Cost of Acquisition (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "acquiredNo",
                    label: "Shares Acquired — No.",
                    type: "number",
                    required: false,
                  },
                  {
                    name: "acquiredDate",
                    label: "Date of Subscription/Purchase",
                    type: "datePicker",
                    required: "conditional",
                  },
                  {
                    name: "faceValue",
                    label: "Face Value per Share (₹)",
                    type: "amount",
                    required: "conditional",
                  },
                  {
                    name: "issuePrice",
                    label: "Issue Price per Share (fresh issue) (₹)",
                    type: "amount",
                    required: "conditional",
                  },
                  {
                    name: "purchasePrice",
                    label: "Purchase Price per Share",
                    type: "amount",
                    required: "conditional",
                  },
                  {
                    name: "transferredNo",
                    label: "Shares Transferred — No.",
                    type: "number",
                    required: false,
                  },
                  {
                    name: "saleConsideration",
                    label: "Sale Consideration (₹)",
                    type: "amount",
                    required: "conditional",
                  },
                  {
                    name: "closingNo",
                    label: "Closing Balance — No. of Shares",
                    type: "readOnly",
                  },
                  {
                    name: "closingCost",
                    label: "Closing Balance — Cost of Acquisition (₹)",
                    type: "readOnly",
                  },
                ],
              },
            ],
          },
          {
            id: "lei-portuguese-civic",
            label: "1.13 & 1.14 Special Final Indicators",
            fields: [
              {
                name: "leiNumber",
                label: "LEI Number",
                type: "text",
                required: "conditional",
                note: "Mandatory only if refund ≥ ₹50 crore",
              },
              {
                name: "leiValidUpto",
                label: "Valid Upto Date",
                type: "datePicker",
                required: "conditional",
              },
              {
                name: "isPortugueseCivilCode",
                label: "Governed by Portuguese Civil Code (Section 5A)?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                note: "If Yes, Schedule 5A becomes mandatory",
              },
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
        id: "schedule-s-salary",
        label: "Schedule S: Income from Salary",
        fieldSections: [
          {
            id: "employer-details",
            label: "2.1 Employer Details (Repeats up to 3 employers)",
            fields: [
              {
                name: "employerName",
                label: "Name of Employer",
                type: "text",
                required: true,
              },
              {
                name: "employerNature",
                label: "Nature of Employer",
                type: "dropdown",
                required: true,
                options: [
                  "Central Government",
                  "State Government",
                  "Public Sector Undertaking",
                  "CG-Pensioners",
                  "SG-Pensioners",
                  "PSU-Pensioners",
                  "Others-Pensioners",
                  "Others",
                ],
              },
              {
                name: "employerTan",
                label: "TAN of Employer",
                type: "text",
                required: "conditional",
                pattern: "^[A-Z]{4}[0-9]{5}[A-Z]{1}$",
                maxChars: 10,
              },
              {
                name: "employerAddress",
                label: "Address of Employer",
                type: "text",
                required: true,
              },
              {
                name: "employerCity",
                label: "Town / City",
                type: "text",
                required: true,
              },
              {
                name: "employerState",
                label: "State",
                type: "dropdown",
                required: true,
                options: statesList,
              },
              {
                name: "employerCountry",
                label: "Country",
                type: "dropdown",
                required: true,
                options: countriesList,
                defaultValue: "India",
              },
              {
                name: "employerNoZipCode",
                label: "Do you have ZIP Code?",
                type: "dropdown",
                required: false,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "employerPin",
                label: "PIN Code",
                type: "text",
                required: "conditional",
                condition: 'employerNoZipCode === "No"',
                validation: "regex",
                pattern: "^[1-9]{1}[0-9]{5}$",
                maxChars: 6,
              },
              {
                name: "employerZip",
                label: "ZIP Code",
                type: "text",
                required: "conditional",
                condition: 'employerNoZipCode === "Yes"',
              },
            ],
          },
          {
            id: "gross-salary-breakup",
            label: "2.2 Gross Salary Breakup (Per Employer, ref: Sec 17)",
            fields: [
              {
                name: "salarySec17_1",
                ref: "1a",
                label: "Salary as per Section 17(1)",
                type: "subTable",
                required: true,
                options: [
                  "Basic Salary",
                  "DA",
                  "HRA",
                  "LTA",
                  "Other Allowance",
                  "Any Other",
                ],
              },
              {
                name: "perquisitesSec17_2",
                ref: "1b",
                label: "Value of Perquisites u/s 17(2)",
                type: "subTable",
                required: false,
                options: [
                  "Accommodation",
                  "Cars",
                  "Gas-electricity-water",
                  "Gifts",
                  "Free meals",
                  "Club expenses",
                  "ESOP",
                  "Stock options (non-qualified)",
                  "Contribution u/s 17(2)(vii)",
                  "Other benefits",
                ],
              },
              {
                name: "profitInLieuSec17_3",
                ref: "1c",
                label: "Profit in lieu of Salary u/s 17(3)",
                type: "subTable",
                required: false,
                options: [
                  "Compensation on termination",
                  "Keyman Insurance",
                  "Any amount before joining",
                  "Any other",
                ],
              },
              {
                name: "retirementBenefit89A_notified",
                label:
                  "Income from Retirement Benefit Account — Notified Country u/s 89A",
                ref: "1d",
                type: "subTable",
                options: retirementCountriesList,
              },
              {
                name: "retirementBenefit89A_nonNotified",
                label:
                  "Income from Retirement Benefit Account — Non-Notified Country u/s 89A",
                ref: "1e",
                type: "amount",
              },
              {
                name: "reliefClaimedEarlier89A",
                label:
                  "Income taxable this year on which relief u/s 89A claimed earlier",
                ref: "1f",
                type: "amount",
              },
              {
                name: "grossSalaryCalculated",
                label: "Gross Salary (1a+1b+1c+1d+1e+1f)",
                ref: "1",
                type: "readOnly",
              },
            ],
          },
          {
            id: "allowances-deductions-net",
            label: "2.3 Allowances, Deductions & Net Salary",
            fields: [
              {
                name: "totalGrossSalaryAll",
                label: "Total Gross Salary (all employers combined)",
                ref: "2",
                type: "readOnly",
              },
              {
                name: "lessRelief89A",
                label: "Less: Income claimed for relief u/s 89A",
                ref: "3a",
                type: "readOnly",
              },
              {
                name: "exemptAllowancesSec10",
                label: "Less: Allowances exempt u/s 10",
                ref: "3",
                type: "subTable",
                options: [
                  "Sec 10(5) LTA",
                  "10(6) Embassy",
                  "10(7) Overseas Allowance",
                  "10(10) Gratuity",
                  "10(10A) Commuted Pension",
                  "10(10AA) Leave Encashment",
                  "10(10B) Compensation",
                  "10(10C) VRS",
                  "10(10CC) Tax-paid by employer",
                  "10(14)(i)",
                  "10(14)(ii)",
                  "10(16) Scholarship",
                  "10(17) MP/MLA",
                  "10(17A) Award",
                  "10(18) Gallantry / Defense Disability",
                  "10(19) AF Family Pension",
                  "10(26)",
                  "10(26AAA)",
                  "10(12C) Agniveer",
                  "Any Other",
                ],
              },
              {
                name: "hraExemptSec10_13A_auto",
                label: "HRA exempt u/s 10(13A) (from HRA sub-form)",
                ref: "3 sub",
                type: "readOnly",
              },
              {
                name: "netSalary",
                label: "Net Salary (2 – 3 – 3a)",
                ref: "4",
                type: "readOnly",
              },
              {
                name: "standardDeduction16_ia",
                label: "Standard Deduction u/s 16(ia)",
                ref: "5a",
                type: "readOnly",
              },
              {
                name: "entertainmentAllowance16_ii",
                label: "Entertainment Allowance u/s 16(ii)",
                ref: "5b",
                type: "amount",
                note: "Govt employees only",
              },
              {
                name: "professionalTax16_iii",
                label: "Professional Tax u/s 16(iii)",
                ref: "5c",
                type: "amount",
              },
              {
                name: "totalDeductions16",
                label: "Total Deductions u/s 16 (5a+5b+5c)",
                ref: "5",
                type: "readOnly",
              },
              // { name: 'incomeChargeableSalaries', label: 'Income chargeable under Salaries (4–5)', ref: '6', type: 'readOnly' }

              {
                name: "incomeChargeableSalaries",
                label: "Income chargeable under Salaries (4–5)",
                ref: "6",
              },
            ],
          },
          {
            id: "hra-sub-form",
            label: "2.4 HRA Sub-Form u/s 10(13A)",
            fields: [
              {
                name: "hraPlaceOfResidence",
                label: "1. Place of Residence",
                type: "dropdown",
                required: true,
                options: ["Metro City", "Non-Metro City"],
              },
              {
                name: "hraActualReceived",
                label: "2. Actual HRA Received (A) (₹)",
                type: "amount",
                required: true,
              },
              {
                name: "hraActualRentPaid",
                label: "3. Actual Rent Paid (₹)",
                type: "amount",
                required: true,
              },
              {
                name: "hraSalaryBasicDa",
                label: "4. Details of Salary u/s 17(1) — Basic + DA",
                type: "amount",
                required: true,
              },
              {
                name: "hraRentMinusTenPercent",
                label: "5. Actual Rent Paid – 10% of Salary (B)",
                type: "readOnly",
              },
              {
                name: "hraPercentageOfSalary",
                label: "6. 50% / 40% of Salary (C)",
                type: "readOnly",
              },
              {
                name: "hraEligibleExempt",
                label: "7. Eligible Exempt HRA = Min(A, B, C)",
                type: "readOnly",
              },
            ],
          },
        ],
      },
      {
        id: "schedule-hp-house-property",
        label: "Schedule HP: Income from House Property",
        fieldSections: [
          {
            id: "hp-property-details",
            label: "3.1 Property Address & Ownership (Per Property - 1A & 1B)",
            fields: [
              {
                name: "hpAddress",
                label: "Address",
                type: "text",
                required: true,
              },
              {
                name: "hpCity",
                label: "Town / City",
                type: "text",
                required: true,
              },
              {
                name: "hpState",
                label: "State",
                type: "dropdown",
                required: true,
                options: statesList,
              },
              {
                name: "hpCountry",
                label: "Country",
                type: "dropdown",
                required: true,
                options: countriesList,
                defaultValue: "India",
              },
              {
                name: "hpNoZipCode",
                label: "Do you have ZIP Code?",
                type: "dropdown",
                required: false,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "hpPinCode",
                label: "PIN Code",
                type: "text",
                required: "conditional",
                condition: 'hpNoZipCode === "No"',
                validation: "regex",
                pattern: "^[1-9]{1}[0-9]{5}$",
                maxChars: 6,
              },
              {
                name: "hpZipCode",
                label: "ZIP Code",
                type: "text",
                required: "conditional",
                condition: 'hpNoZipCode === "Yes"',
              },
              {
                name: "hpOwner",
                label: "Owner of the Property",
                type: "dropdown",
                required: true,
                options: ["Self", "Co-owner"],
              },
              {
                name: "hpIsCoowned",
                label: "Is the property co-owned?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "hpYourSharePercentage",
                label: "Your percentage share in property (%)",
                type: "number",
                required: true,
                min: 0,
                max: 100,
              },
            ],
          },
          {
            id: "hp-coowner-details",
            label: "3.2 Co-Owner Details",
            fields: [
              {
                name: "coOwnersTable",
                label: "Other Co-owner(s) Details",
                type: "table",
                required: "conditional",
                condition: 'hpIsCoowned === "Yes"',
                columns: [
                  {
                    name: "coOwnerName",
                    label: "Name of Other Co-owner(s)",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "coOwnerPan",
                    label: "PAN of Other Co-owner(s)",
                    type: "text",
                    required: true,
                    maxChars: 10,
                  },
                  {
                    name: "coOwnerAadhaar",
                    label: "Aadhaar No. of Other Co-owner(s)",
                    type: "text",
                    required: false,
                  },
                  {
                    name: "coOwnerShare",
                    label: "Percentage share (%)",
                    type: "number",
                    required: true,
                  },
                ],
              },
            ],
          },
          {
            id: "hp-tenant-details",
            label: "3.3 Tenant Details",
            fields: [
              {
                name: "tenantsTable",
                label: "Tenant Details",
                type: "table",
                required: "conditional",
                columns: [
                  {
                    name: "tenantName",
                    label: "Name(s) of Tenant",
                    type: "text",
                    required: "conditional",
                  },
                  {
                    name: "tenantPan",
                    label: "PAN of Tenant",
                    type: "text",
                    required: false,
                    maxChars: 10,
                  },
                  {
                    name: "tenantAadhaar",
                    label: "Aadhaar No. of Tenant",
                    type: "text",
                    required: false,
                  },
                  {
                    name: "tenantPanTanCredit",
                    label: "PAN/TAN of Tenant (if TDS credit claimed)",
                    type: "text",
                    required: "conditional",
                  },
                ],
              },
            ],
          },
          {
            id: "hp-income-computation",
            label: "3.4 HP Income Computation",
            fields: [
              {
                name: "hpPropertyType",
                label: "Type of House Property",
                type: "dropdown",
                required: true,
                options: ["Self-Occupied", "Let Out", "Deemed Let Out"],
              },
              {
                name: "hpGrossRent",
                label: "a. Gross rent received / receivable / lettable value",
                ref: "a",
                type: "amount",
                required: "conditional",
                condition: 'hpPropertyType === "Let Out"',
              },
              {
                name: "hpUnrealizedRent",
                label: "b. Amount of rent which cannot be realized",
                ref: "b",
                type: "amount",
                required: false,
              },
              {
                name: "hpLocalTaxes",
                label: "c. Tax paid to local authorities",
                ref: "c",
                type: "amount",
                required: false,
              },
              {
                name: "hpTotalDeductionRealizedTaxes",
                label: "d. Total (b + c)",
                ref: "d",
                type: "readOnly",
              },
              {
                name: "hpAnnualValue",
                label: "e. Annual Value (a – d); nil if self-occupied",
                ref: "e",
                type: "readOnly",
              },
              {
                name: "hpAnnualValueOwnedShare",
                label: "f. Annual Value owned (% share × e)",
                ref: "f",
                type: "readOnly",
              },
              {
                name: "hpStandardDeduction30",
                label: "g. 30% of 1f",
                ref: "g",
                type: "readOnly",
              },
              {
                name: "hpBorrowedCapitalInterest",
                label: "h. Interest on borrowed capital u/s 24(b)",
                ref: "h",
                type: "readOnly",
              },
              {
                name: "hpTotalDeductionsSec24",
                label: "i. Total (g + h)",
                ref: "i",
                type: "readOnly",
              },
              {
                name: "hpArrearsReceived",
                label: "j. Arrears/Unrealised Rent received (less 30%)",
                ref: "j",
                type: "amount",
                required: false,
              },
              {
                name: "hpFinalPropertyIncome",
                label: "k. Income from House Property (f – i + j)",
                ref: "k",
                type: "readOnly",
              },
            ],
          },
          {
            id: "hp-loan-interest-table",
            label: "3.5 Section 24(b) Loan Interest Table",
            fields: [
              {
                name: "loanInterestTable",
                label: "Loan interest details per property",
                type: "table",
                columns: [
                  {
                    name: "loanSourceType",
                    label: "Loan taken from",
                    type: "dropdown",
                    required: true,
                    options: ["Bank", "Institution", "Person"],
                  },
                  {
                    name: "loanProviderName",
                    label: "Name of Bank / Institution / Person",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "loanAccountNumber",
                    label: "Loan Account Number",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "loanSanctionDate",
                    label: "Date of Sanction",
                    type: "datePicker",
                    required: true,
                  },
                  {
                    name: "loanTotalAmount",
                    label: "Total Amount of Loan (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "loanOutstandingFyEnd",
                    label: "Loan Outstanding at FY end (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "interestClaimedSec24b",
                    label: "Interest on Borrowed Capital u/s 24(b) (₹)",
                    type: "amount",
                    required: true,
                  },
                ],
              },
              {
                name: "hpPassThroughIncome",
                label: "Pass Through Income/Loss from HP (₹)",
                type: "amount",
                ref: "2",
                source: "Schedule PTI",
              },
              {
                name: "hpTotalFinalIncome",
                label: "Total Income under House Property (Σ1k + 2)",
                type: "readOnly",
              },
            ],
          },
        ],
      },
      {
        id: "schedule-cg-capital-gains",
        label: "Schedule CG: Capital Gains",
        fieldSections: [
          {
            id: "stcg-immovable-property",
            label:
              "4.1 Short-Term Capital Gains (STCG) — A1: Immovable Property",
            fields: [
              {
                name: "cgStImmovablePurchaseDate",
                label: "Date of Purchase/Acquisition",
                type: "datePicker",
                required: true,
              },
              {
                name: "cgStImmovableSaleDate",
                label: "Date of Sale/Transfer",
                type: "datePicker",
                required: true,
              },
              {
                name: "cgStImmovableConsiderationReceived",
                label: "a(i) Full Value of Consideration received/receivable",
                ref: "ai",
                type: "amount",
                required: true,
              },
              {
                name: "cgStImmovableStampValuation",
                label:
                  "a(ii) Value of property as per Stamp Valuation Authority",
                ref: "aii",
                type: "amount",
                required: true,
              },
              {
                name: "cgStImmovableValueSec50C",
                label: "a(iii) Full Value adopted as per Sec 50C",
                ref: "aiii",
                type: "readOnly",
              },
              {
                name: "cgStImmovableAcquisitionCost",
                label: "b(i) Cost of Acquisition without indexation",
                ref: "bi",
                type: "amount",
                required: true,
              },
              {
                name: "cgStImmovableImprovementCost",
                label: "b(ii) Cost of Improvement without indexation",
                ref: "bii",
                type: "amount",
                required: false,
              },
              {
                name: "cgStImmovableTransferExpenditure",
                label: "b(iii) Expenditure in connection with transfer",
                ref: "biii",
                type: "amount",
                required: false,
              },
              {
                name: "cgStImmovableTotalCost",
                label: "b(iv) Total (bi+bii+biii)",
                ref: "biv",
                type: "readOnly",
              },
              {
                name: "cgStImmovableBalance",
                label: "c. Balance (aiii – biv)",
                ref: "c",
                type: "readOnly",
              },
              {
                name: "cgStImmovableDeductionSec54B",
                label: "d. Deduction u/s 54B",
                ref: "d",
                type: "amount",
                required: false,
              },
              {
                name: "cgStImmovableFinalGains",
                label: "e. STCG on Immovable Property (1c – 1d)",
                ref: "A1e",
                type: "readOnly",
              },
              {
                name: "cgStImmovableBuyersTable",
                label: "f. Buyer Details",
                type: "table",
                columns: [
                  { name: "buyerName", label: "Name", type: "text" },
                  {
                    name: "buyerPan",
                    label: "PAN",
                    type: "text",
                    maxChars: 10,
                  },
                  {
                    name: "buyerAadhaar",
                    label: "Aadhaar",
                    type: "text",
                    maxChars: 12,
                  },
                  {
                    name: "buyerSharePercent",
                    label: "% Share",
                    type: "number",
                  },
                  { name: "buyerAmount", label: "Amount", type: "amount" },
                  {
                    name: "buyerAddress",
                    label: "Property Address",
                    type: "text",
                  },

                  {
                    name: "buyerState",
                    label: "State",
                    type: "dropdown",
                    required: true,
                    options: statesList,
                  },

                  {
                    name: "buyerCountry",
                    label: "Country",
                    type: "dropdown",
                    required: true,
                    options: [{ value: "India", label: "India" }],
                  },
                  {
                    name: "buyerNoZipCode",
                    label: "Do you have ZIP Code?",
                    type: "dropdown",
                    options: [
                      { value: "Yes", label: "Yes" },
                      { value: "No", label: "No" },
                    ],
                  },
                  {
                    name: "buyerPinCode",
                    label: "PIN Code",
                    type: "text",
                    condition: 'buyerNoZipCode === "No"',
                    validation: "regex",
                    pattern: "^[1-9]{1}[0-9]{5}$",
                    maxChars: 6,
                  },
                  {
                    name: "buyerZipCode",
                    label: "ZIP Code",
                    type: "text",
                    condition: 'buyerNoZipCode === "Yes"',
                  },
                ],
              },
            ],
          },
          {
            id: "stcg-slump-sale",
            label: "4.2 STCG — A2: Slump Sale",
            fields: [
              {
                name: "cgSlumpSaleFmvRule11UAE2",
                label: "a(i) Fair Market Value as per Rule 11UAE(2)",
                ref: "2ai",
                type: "amount",
                required: false,
              },
              {
                name: "cgSlumpSaleFmvRule11UAE3",
                label: "a(ii) Fair Market Value as per Rule 11UAE(3)",
                ref: "2aii",
                type: "amount",
                required: false,
              },
              {
                name: "cgSlumpSaleConsiderationHigher",
                label:
                  "a(iii) Full Value of Consideration (higher of ai or aii)",
                ref: "2aiii",
                type: "readOnly",
              },
              {
                name: "cgSlumpSaleNetWorth",
                label: "b. Net Worth of undertaking/division",
                ref: "2b",
                type: "amount",
                required: true,
              },
              {
                name: "cgSlumpSaleFinalGains",
                label: "c. STCG from Slump Sale (2aiii – 2b)",
                ref: "A2c",
                type: "readOnly",
              },
            ],
          },
          {
            id: "stcg-equity-stt-paid",
            label: "4.3 STCG — A2 (Equity / STT-paid) u/s 111A",
            fields: [
              {
                name: "cgStEquityConsideration",
                label: "i(a) Full Value of Consideration",
                ref: "ia",
                type: "amount",
                required: true,
              },
              {
                name: "cgStEquityCostAcquisition",
                label: "i(b)(i) Cost of Acquisition without indexation",
                ref: "ibi",
                type: "amount",
                required: true,
              },
              {
                name: "cgStEquityCostImprovement",
                label: "i(b)(ii) Cost of Improvement without indexation",
                ref: "ibii",
                type: "amount",
                required: false,
              },
              {
                name: "cgStEquityTransferExpense",
                label: "i(b)(iii) Expenditure in connection with transfer",
                ref: "biii",
                type: "amount",
                required: false,
              },
              {
                name: "cgStEquityTotalCost",
                label: "i(b)(iv) Total (i+ii+iii)",
                ref: "ibiv",
                type: "readOnly",
              },
              {
                name: "cgStEquityBalance",
                label: "i(c) Balance (ia – ibiv)",
                ref: "ic",
                type: "readOnly",
              },
              {
                name: "cgStEquityLossDisallowedSec94",
                label: "i(d) Loss disallowed u/s 94(7) or 94(8)",
                ref: "id",
                type: "amount",
                required: false,
              },
              {
                name: "cgStEquityFinalGainsPostJul2024",
                label:
                  "i(e) STCG on Equity/STT-paid (ic + id) [Taxed @ 20% on/after 23 Jul 2024]",
                ref: "A2ie",
                type: "readOnly",
              },
              {
                name: "cgStEquityFinalGainsPreJul2024",
                label: "STCG Equity/STT-paid [Taxed @ 15% before 23 Jul 2024]",
                ref: "A2ie_BE",
                type: "readOnly",
              },
            ],
          },
          {
            id: "stcg-non-resident-shares",
            label:
              "4.4 STCG — A3 (Non-Resident: Indian Company Shares/Debentures)",
            fields: [
              {
                name: "cgStNrSharesSec111APreJul2024",
                label: "a. STCG u/s 111A — before 23 Jul 2024",
                ref: "A3ai",
                type: "amount",
                required: "conditional",
                condition: (state) =>
                  state?.details?.["part-a-gen"]?.residentialStatus === "NRI",
              },
              {
                name: "cgStNrSharesSec111APostJul2024",
                label: "a. STCG u/s 111A — on/after 23 Jul 2024",
                ref: "A3aii",
                type: "amount",
                required: "conditional",
                condition: (state) =>
                  state?.details?.["part-a-gen"]?.residentialStatus === "NRI",
              },
              {
                name: "cgStNrSharesOther",
                label: "b. STCG from shares/debentures not in 3a",
                ref: "A3b",
                type: "amount",
                required: "conditional",
                condition: (state) =>
                  state?.details?.["part-a-gen"]?.residentialStatus === "NRI",
              },
            ],
          },
          {
            id: "stcg-fii-securities",
            label: "4.5 STCG — A4 (Non-Resident: Securities by FII u/s 115AD)",
            fields: [
              {
                name: "cgStFiiUnquotedConsideration",
                label: "a(i)(a) Full Value of Consideration — unquoted shares",
                ref: "aia",
                type: "amount",
                required: "conditional",
                condition: (state) =>
                  state?.details?.["part-a-gen"]?.isFpi === "Yes" ||
                  state?.details?.["part-a-gen"]?.residentialStatus === "NRI",
              },
              {
                name: "cgStFiiUnquotedFmv",
                label: "a(i)(b) Fair Market Value of unquoted shares",
                ref: "aib",
                type: "amount",
                required: "conditional",
              },
              {
                name: "cgStFiiUnquotedHigherSec50CA",
                label: "a(i)(c) Higher of aia or aib (Sec 50CA)",
                ref: "aic",
                type: "readOnly",
              },
              {
                name: "cgStFiiOtherConsideration",
                label:
                  "a(ii) Full Value of Consideration — other than unquoted",
                ref: "aii",
                type: "amount",
                required: "conditional",
              },
              {
                name: "cgStFiiTotalConsideration",
                label: "a(iii) Total (ic + ii)",
                ref: "aiii",
                type: "readOnly",
              },
              {
                name: "cgStFiiCostAcquisition",
                label: "b(i) Cost of Acquisition",
                ref: "bi",
                type: "amount",
                required: "conditional",
              },
              {
                name: "cgStFiiCostImprovement",
                label: "b(ii) Cost of Improvement",
                ref: "bii",
                type: "amount",
                required: false,
              },
              {
                name: "cgStFiiTransferExpense",
                label: "b(iii) Expenditure on transfer",
                ref: "biii",
                type: "amount",
                required: false,
              },
              {
                name: "cgStFiiTotalCost",
                label: "b(iv) Total",
                ref: "biv",
                type: "readOnly",
              },
              {
                name: "cgStFiiBalance",
                label: "c. Balance (aiii – biv)",
                ref: "c",
                type: "readOnly",
              },
              {
                name: "cgStFiiLossDisallowed",
                label: "d. Loss disallowed u/s 94(7)/94(8)",
                ref: "d",
                type: "amount",
                required: false,
              },
              {
                name: "cgStFiiFinalGains",
                label: "e. STCG from FII securities (c + d)",
                ref: "A4e",
                type: "readOnly",
              },
            ],
          },
          {
            id: "stcg-other-assets-deemed-pti-dtaa",
            label:
              "4.6 to 4.9 STCG — Other heads, Deemed Gains, Pass-Through & DTAA",
            fields: [
              {
                name: "cgStOtherAssetsInfo",
                label: "A5: All Other Assets not in A1–A4",
                type: "infoBlock",
                note: "Same structure as A4 consideration. Deductions u/s 54D/54G/54GA available.",
              },
              {
                name: "hasUnutilisedCgasDeposit",
                label: "Whether any unutilised CGAS deposit?",
                type: "radio",
                required: false,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "cgasUnutilisedTable",
                label: "CGAS Unutilised Details Table",
                type: "table",
                condition: 'hasUnutilisedCgasDeposit === "Yes"',
                columns: [
                  {
                    name: "prevYearTransfer",
                    label: "Previous Year of transfer",
                    type: "text",
                  },
                  { name: "section", label: "Section", type: "text" },
                  { name: "newAsset", label: "New Asset", type: "text" },
                  {
                    name: "yearAcquired",
                    label: "Year acquired",
                    type: "text",
                  },
                  {
                    name: "amountUtilised",
                    label: "Amount utilised",
                    type: "amount",
                  },
                  {
                    name: "amountUnused",
                    label: "Amount unused (X)",
                    type: "amount",
                  },
                ],
              },
              {
                name: "cgStDeemedOtherThanAbove",
                label: "Amount deemed STCG — other than above",
                type: "amount",
                required: false,
              },
              {
                name: "cgStTotalDeemedA6",
                label: "Total Deemed STCG (A6)",
                type: "readOnly",
              },
              {
                name: "cgStPti15",
                label: "PTI STCG @ 15%",
                type: "readOnly",
                source: "Schedule PTI",
              },
              {
                name: "cgStPti20",
                label: "PTI STCG @ 20%",
                type: "readOnly",
                source: "Schedule PTI",
              },
              {
                name: "cgStPti30",
                label: "PTI STCG @ 30%",
                type: "readOnly",
                source: "Schedule PTI",
              },
              {
                name: "cgStPtiApplicable",
                label: "PTI STCG at applicable rates",
                type: "readOnly",
                source: "Schedule PTI",
              },
              {
                name: "cgStDtaaTable",
                label:
                  "4.9 STCG — A8: DTAA Amounts",
                type: "table",
                condition: (state) =>
                  state?.details?.["part-a-gen"]?.residentialStatus === "NRI",
                columns: [
                  {
                    name: "dtaaIncomeAmount",
                    label: "Amount of income",
                    type: "amount",
                  },
                  { name: "dtaaItemNo", label: "Item No. A1–A7", type: "text" },
                  {
                    name: "dtaaCountry",
                    label: "Country name & code",
                    type: "dropdown",
                    required: true,
                    options: [{ value: "India", label: "India" }],
                  },
                  {
                    name: "dtaaArticle",
                    label: "Article of DTAA",
                    type: "text",
                  },
                  {
                    name: "dtaaTreatyRate",
                    label: "Rate as per Treaty",
                    type: "text",
                    note: "NIL if not chargeable",
                  },
                  {
                    name: "dtaaTrcObtained",
                    label: "Whether TRC obtained?",
                    type: "dropdown",
                    options: ["Yes", "No"],
                  },
                  {
                    name: "dtaaItActSection",
                    label: "Section of IT Act",
                    type: "text",
                  },
                  {
                    name: "dtaaItActRate",
                    label: "Rate per IT Act",
                    type: "text",
                  },
                  {
                    name: "dtaaApplicableRate",
                    label: "Applicable rate",
                    type: "text",
                  },
                ],
              },
            ],
          },
          {
            id: "ltcg-immovable-property",
            label: "4.10 LTCG — B1: Immovable Property",
            fields: [
              {
                name: "cgLtImmovableInfo",
                label: "LTCG Immovable Property Configuration",
                type: "infoBlock",
                note: "Identical structural mapping to A1. Employs Indexed Cost of Acquisition/Improvement. Activates Sections 54/54B/54D/54EC/54F. Taxes @ 12.5% post 23 Jul 2024 or 20% pre-period.",
              },
            ],
          },
          {
            id: "ltcg-schedule-112a",
            label: "4.11 Schedule 112A (Equity / STT-paid Scrip Wise Listing)",
            fields: [
              {
                name: "schedule112ATable",
                label: "Schedule 112A Scrip Transactions Table",
                type: "table",
                columns: [
                  {
                    name: "col1_acquiredPeriod",
                    label: "Col 1 — Share/Unit Acquired",
                    type: "dropdown",
                    required: true,
                    options: ["On or before 31 Jan 2018", "After 31 Jan 2018"],
                  },
                  {
                    name: "col1a_transferredPeriod",
                    label: "Col 1a — Share/Unit Transferred",
                    type: "dropdown",
                    required: true,
                    options: ["Before 23 Jul 2024", "On or after 23 Jul 2024"],
                  },
                  {
                    name: "col2_isinCode",
                    label: "Col 2 — ISIN Code",
                    type: "text",
                    required: true,
                    validation: "isinLookup",
                  },
                  {
                    name: "col3_shareName",
                    label: "Col 3 — Name of Share/Unit",
                    type: "readOnly",
                  },
                  {
                    name: "col4_shareQuantity",
                    label: "Col 4 — No. of Shares/Units",
                    type: "number",
                    required: true,
                  },
                  {
                    name: "col5_salePrice",
                    label: "Col 5 — Sale Price per Share/Unit (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "col6_fullConsideration",
                    label: "Col 6 — Full Value of Consideration (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "col7_costAcquisitionNoIndex",
                    label: "Col 7 — Cost of Acquisition without indexation (₹)",
                    type: "readOnly",
                  },
                  {
                    name: "col8_actualCost",
                    label: "Col 8 — Actual Cost of Acquisition (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "col9_lowerOfCol6Col11",
                    label: "Col 9 — Lower of Col 6 & Col 11",
                    type: "readOnly",
                  },
                  {
                    name: "col10_fmvPerShare",
                    label:
                      "Col 10 — Fair Market Value per share as on 31 Jan 2018 (₹)",
                    type: "amount",
                    required: "conditional",
                  },
                  {
                    name: "col11_totalFmv",
                    label: "Col 11 — Total FMV as on 31 Jan 2018",
                    type: "readOnly",
                  },
                  {
                    name: "col12_costImprovement",
                    label:
                      "Col 12 — Cost of Improvement without indexation (₹)",
                    type: "amount",
                    required: false,
                  },
                  {
                    name: "col13_expenditureTransfer",
                    label:
                      "Col 13 — Expenditure in connection with transfer (₹)",
                    type: "amount",
                    required: false,
                  },
                  {
                    name: "col14_totalDeductions",
                    label:
                      "Col 14 — Total Deductions (Col 7 + Col 12 + Col 13) (₹)",
                    type: "readOnly",
                  },
                  {
                    name: "col15_scripBalanceLtcg",
                    label: "Balance — LTCG per scrip",
                    type: "readOnly",
                  },
                ],
              },
              {
                name: "ltcgSec112APreJul2024",
                label:
                  "Total LTCG u/s 112A (transfers before 23 Jul 2024) [Taxed @ 10%]",
                type: "readOnly",
              },
              {
                name: "ltcgSec112APostJul2024",
                label:
                  "Total LTCG u/s 112A (transfers on/after 23 Jul 2024) [Taxed @ 12.5%]",
                type: "readOnly",
              },
              {
                name: "ltcgSec112ATotal",
                label: "Total LTCG u/s 112A Sum",
                type: "readOnly",
              },
            ],
          },
          {
            id: "schedule-vda",
            label: "4.13 Schedule VDA — Virtual Digital Assets",
            fields: [
              {
                name: "vdaTransactionsTable",
                label: "Virtual Digital Asset Transfers Transaction",
                type: "table",
                columns: [
                  {
                    name: "vdaAcquisitionDate",
                    label: "Date of Acquisition",
                    type: "datePicker",
                    required: true,
                  },
                  {
                    name: "vdaTransferDate",
                    label: "Date of Transfer",
                    type: "datePicker",
                    required: true,
                  },
                  {
                    name: "vdaTaxHead",
                    label: "Head under which income to be taxed",
                    type: "dropdown",
                    required: true,
                    options: ["Capital Gain"],
                  },
                  {
                    name: "vdaCostAcquisition",
                    label: "Cost of Acquisition (₹)",
                    type: "amount",
                    required: true,
                    note: "In case of gift: amount u/s 56(2)(x) or cost to previous owner",
                  },
                  {
                    name: "vdaConsiderationReceived",
                    label: "Consideration Received (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "vdaIncomePerAsset",
                    label:
                      "Income from VDA (Col 6 – Col 5) — enter nil if loss",
                    type: "readOnly",
                    validation: "noLossCarryForward",
                  },
                ],
              },
              {
                name: "vdaTotalCapitalGainsIncome",
                label:
                  "Total (Sum of all positive incomes — Capital Gain) [Taxed @ 30% u/s 115BBH]",
                type: "readOnly",
              },
            ],
          },
        ],
      },
      {
        id: "schedule-os-other-sources",
        label: "Schedule OS: Income from Other Sources",
        fieldSections: [
          {
            id: "os-gross-normal-rates",
            label: "5.1 Gross Income at Normal Rates",
            fields: [
              {
                name: "osDividendOther",
                label: "a(i) Dividend income (other than 2(22)(e) & 2(22)(f))",
                ref: "1ai",
                type: "amount",
                required: false,
              },
              {
                name: "osDividendSec2_22_e",
                label: "a(ii) Dividend u/s 2(22)(e)",
                ref: "1aii",
                type: "amount",
                required: false,
              },
              {
                name: "osDividendSec2_22_f",
                label: "a(iii) Dividend u/s 2(22)(f)",
                ref: "1aiii",
                type: "amount",
                required: false,
              },
              {
                name: "osDividendsGrossTotal",
                label: "a. Dividends Gross (ai+aii+aiii)",
                ref: "1a",
                type: "readOnly",
              },
              {
                name: "osInterestSavings",
                label: "b(i) Interest from Savings Bank",
                ref: "1bi",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestDeposits",
                label: "b(ii) Interest from Deposits (Bank/PO/Cooperative)",
                ref: "1bii",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestItRefund",
                label: "b(iii) Interest from IT Refund",
                ref: "1biii",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestPassThrough",
                label: "b(iv) Pass-through interest",
                ref: "1biv",
                type: "readOnly",
                source: "Schedule PTI",
              },
              {
                name: "osInterestPf1",
                label: "b(v) Interest accrued on PF 1st proviso s.10(11)",
                ref: "1bv",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestPf2",
                label: "b(vi) Interest accrued on PF 2nd proviso s.10(11)",
                ref: "1bvi",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestPf3",
                label: "b(vii) Interest accrued on PF 1st proviso s.10(12)",
                ref: "1bvii",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestPf4",
                label: "b(viii) Interest accrued on PF 2nd proviso s.10(12)",
                ref: "1bviii",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestOthers",
                label: "b(ix) Others — interest from Cos., NBFCs, HFCs",
                ref: "1bix",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestGrossTotal",
                label: "b. Interest Gross",
                ref: "1b",
                type: "readOnly",
              },
              {
                name: "osRentalMachineryPlants",
                label:
                  "c. Rental income from machinery/plants/buildings (Gross)",
                ref: "1c",
                type: "amount",
                required: false,
              },
              {
                name: "osGiftMoneySec56_2_x",
                label:
                  "d(i) Aggregate value of money received without consideration",
                ref: "1di",
                type: "amount",
                required: false,
              },
              {
                name: "osGiftImmovableNoConsideration",
                label:
                  "d(ii) Immovable property received without consideration — stamp duty value",
                ref: "1dii",
                type: "amount",
                required: false,
              },
              {
                name: "osGiftImmovableInadequateConsideration",
                label:
                  "d(iii) Immovable property for inadequate consideration — excess stamp value",
                ref: "1diii",
                type: "amount",
                required: false,
              },
              {
                name: "osGiftOtherPropertyNoConsideration",
                label:
                  "d(iv) Other property received without consideration — FMV",
                ref: "1div",
                type: "amount",
                required: false,
              },
              {
                name: "osGiftOtherPropertyInadequateConsideration",
                label:
                  "d(v) Other property for inadequate consideration — FMV excess",
                ref: "1dv",
                type: "amount",
                required: false,
              },
              {
                name: "osGiftTotalSec56_2_x",
                label: "d. Total s.56(2)(x) (di+…+dv)",
                ref: "1d",
                type: "readOnly",
              },
              {
                name: "osFamilyPension",
                label: "e(1) Family Pension",
                type: "amount",
                required: false,
              },
              {
                name: "osRetirement89ANotifiedTable",
                label:
                  "e(2) Income from Retirement Benefit Account — Notified Country u/s 89A",
                type: "table",
                columns: [
                  {
                    name: "country",
                    label: "Country",
                    type: "dropdown",
                    options: ["USA", "UK", "Canada"],
                  },
                  { name: "amount", label: "Amount", type: "amount" },
                ],
              },
              {
                name: "osRetirement89ANonNotified",
                label:
                  "e(3) Income from Retirement Benefit Account — Non-Notified Country u/s 89A",
                type: "amount",
                required: false,
              },
              {
                name: "osRetirement89AReliefClaimedEarlier",
                label:
                  "e(4) Income taxable this year on which 89A relief claimed earlier",
                type: "amount",
                required: false,
              },
              {
                name: "osSumBusinessTrustSec56_2_xii",
                label: "e(5) Sum received from Business Trust u/s 56(2)(xii)",
                type: "amount",
                required: false,
              },
              {
                name: "osSumLifeInsuranceSec56_2_xiii",
                label:
                  "e(6) Sum received under life insurance policy u/s 56(2)(xiii)",
                type: "amount",
                required: false,
              },
              {
                name: "osAnyOtherIncomeNormalRows",
                label: "e(7–10) Any Other Income",
                type: "table",
                columns: [
                  {
                    name: "natureDescription",
                    label: "Nature/Description Text",
                    type: "text",
                  },
                  { name: "amount", label: "Amount", type: "amount" },
                ],
              },
              {
                name: "osGrossNormalRatesTotal",
                label: "1. Gross Income at Normal Rates Total (1a+1b+1c+1d+1e)",
                ref: "1",
                type: "readOnly",
              },
            ],
          },
          {
            id: "os-special-rates-deductions",
            label:
              "5.2 & 5.3 Special Rates, Deductions & Multi-Quarter Breaking",
            fields: [
              {
                name: "osWinningsLotteriesSec115BB",
                label:
                  "a(i) Winnings from lotteries/crossword/races/games/gambling u/s 115BB",
                ref: "2a(i)",
                type: "amount",
                required: false,
                note: "@ 30%",
              },
              {
                name: "osWinningsOnlineGamesSec115BBJ",
                label: "a(ii)(i) Gross winnings from online games u/s 115BBJ",
                ref: "2a(ii)",
                type: "amount",
                required: false,
                note: "@ 30%",
              },
              {
                name: "osWinningsOnlineGamesRule133Adjustment",
                label: "a(ii)(ii) Adjustment as per Rule 133",
                type: "amount",
                required: false,
              },
              {
                name: "osSec115BbeCashCredits",
                label:
                  "b(i–vi) Income chargeable u/s 115BBE Cash Credits s.68 / Unexplained s.69 (6 fields total)",
                type: "table",
                columns: [
                  {
                    name: "natureCode",
                    label: "Cash Credit Section Ref",
                    type: "dropdown",
                    options: [
                      "Sec 68",
                      "Sec 69",
                      "Sec 69A",
                      "Sec 69B",
                      "Sec 69C",
                      "Sec 69D",
                    ],
                  },
                  {
                    name: "amount",
                    label: "Unexplained Value (₹)",
                    type: "amount",
                  },
                ],
                note: "@ 60% standard rate",
              },
              {
                name: "osRecognizedPfSec111Table",
                label:
                  "c. Accumulated balance of recognized PF taxable u/s 111",
                type: "table",
                columns: [
                  { name: "assessmentYear", label: "AY", type: "text" },
                  {
                    name: "incomeBenefit",
                    label: "Income Benefit",
                    type: "amount",
                  },
                  { name: "taxBenefit", label: "Tax Benefit", type: "amount" },
                ],
              },
              {
                name: "osAnyOtherSpecialRatesTable",
                label: "d. Any other income at special rates",
                type: "table",
                columns: [
                  {
                    name: "natureDropdown",
                    label: "Nature Category",
                    type: "dropdown",
                  },
                  { name: "amount", label: "Amount", type: "amount" },
                ],
              },
              {
                name: "osPtiSpecialRatesTable",
                label: "e. PTI in nature of OS at special rates",
                type: "table",
                columns: [
                  { name: "nature", label: "Nature", type: "text" },
                  { name: "amount", label: "Amount", type: "amount" },
                ],
                source: "Schedule PTI",
              },
              {
                name: "osDtaaClaimedTable",
                label: "f. Amount claimed as DTAA treaty rate",
                type: "table",
                columns: [
                  { name: "amount", label: "Amount of Income", type: "amount" },
                  { name: "itemNo", label: "Item No.", type: "text" },
                  {
                    name: "country",
                    label: "Country",
                    type: "dropdown",
                    required: true,
                    options: [{ value: "India", label: "India" }],
                  },
                  { name: "dtaaArticle", label: "DTAA Article", type: "text" },
                  {
                    name: "rateTreaty",
                    label: "Rate per Treaty",
                    type: "text",
                  },
                  {
                    name: "trcObtained",
                    label: "TRC obtained?",
                    type: "dropdown",
                    options: ["Yes", "No"],
                  },
                  {
                    name: "itActSection",
                    label: "IT Act Section",
                    type: "text",
                  },
                  { name: "itActRate", label: "Rate per IT Act", type: "text" },
                  {
                    name: "applicableRate",
                    label: "Applicable Rate",
                    type: "text",
                  },
                ],
              },
              {
                name: "osExpensesOtherThanPension",
                label: "a(i) Expenses/deductions other than family pension",
                ref: "3ai",
                type: "amount",
                required: false,
              },
              {
                name: "osDeductionSec57_iia_Pension",
                label: "a(ii) Deduction u/s 57(iia) — family pension only",
                ref: "3aii",
                type: "readOnly",
                note: "1/3rd of pension or ₹25,000 whichever lower",
              },
              {
                name: "osDepreciationRentalIncome",
                label: "b. Depreciation (if rental income entered in 1c)",
                ref: "3b",
                type: "amount",
                required: false,
              },
              {
                name: "osInterestExpenditureDividend",
                label: "c. Interest expenditure u/s 57(i) — on dividend income",
                ref: "3c",
                type: "amount",
                required: false,
              },
              {
                name: "osTotalDeductions",
                label: "d. Total deductions",
                ref: "3d",
                type: "readOnly",
              },
              {
                name: "osNotDeductibleSec58",
                label: "4. Amounts not deductible u/s 58",
                ref: "4",
                type: "amount",
                required: false,
              },
              {
                name: "osProfitsChargeableSec59",
                label: "5. Profits chargeable to tax u/s 59",
                ref: "5",
                type: "amount",
                required: false,
              },
              {
                name: "osReliefClaimedSec89A",
                label: "5a. Income claimed for relief u/s 89A",
                ref: "5a",
                type: "amount",
                required: false,
              },
              {
                name: "osNetIncomeNormalRates",
                label: "6. Net Income from OS at normal rates (1–3+4+5–5a)",
                ref: "6",
                type: "readOnly",
              },
              {
                name: "osRaceHorsesReceipts",
                label: "8a. Race Horses — Receipts",
                ref: "8a",
                type: "amount",
                required: false,
              },
              {
                name: "osRaceHorsesDeductionsSec57",
                label: "8b. Race Horses — Deductions u/s 57",
                ref: "8b",
                type: "amount",
                required: false,
              },
              {
                name: "osRaceHorsesBalance",
                label: "8e. Race Horses — Balance (8a–8b+8c+8d)",
                ref: "8e",
                type: "readOnly",
              },
              {
                name: "osTotalFinalOtherSourcesIncome",
                label: "9. Total Income from Other Sources (7 + 8e)",
                ref: "9",
                type: "readOnly",
              },
              {
                name: "osQuarterlyAccrualTable",
                label:
                  "10. Quarterly accrual/receipt info (For 234C calculation — 5 columns × 8 income types)",
                type: "table",
                columns: [
                  {
                    name: "incomeTypeHead",
                    label: "Income Type Head Name",
                    type: "readOnly",
                  },
                  {
                    name: "q1_upto15June",
                    label: "Upto 15/06 (₹)",
                    type: "amount",
                  },
                  {
                    name: "q2_16JuneTo15Sept",
                    label: "16/06 to 15/09 (₹)",
                    type: "amount",
                  },
                  {
                    name: "q3_16SeptTo15Dec",
                    label: "16/09 to 15/12 (₹)",
                    type: "amount",
                  },
                  {
                    name: "q4_16DecTo15Mar",
                    label: "16/12 to 15/03 (₹)",
                    type: "amount",
                  },
                  {
                    name: "q5_16MarTo31Mar",
                    label: "16/03 to 31/03 (₹)",
                    type: "amount",
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        id: "special-exempt-clubbed",
        label: "Exempt Income, Clubbing & Special Schedules",
        fieldSections: [
          {
            id: "schedule-ei-exempt",
            label: "Schedule EI: Exempt Income Details",
            fields: [
              {
                name: "eiInterestIncome",
                label: "1. Interest income",
                type: "amount",
                required: false,
              },
              {
                name: "eiDomesticDividend",
                label: "2. Dividend from domestic company (≤ ₹10 lakh)",
                type: "amount",
                required: false,
              },
              {
                name: "eiLtcgStt",
                label: "3. LTCG from STT transactions",
                type: "amount",
                required: false,
              },
              {
                name: "eiGrossAgriculturalReceipts",
                label: "2(i) Gross Agricultural Receipts",
                ref: "2i",
                type: "amount",
                required: false,
              },
              {
                name: "eiExpenditureAgriculture",
                label: "2(ii) Expenditure on Agriculture",
                ref: "2ii",
                type: "amount",
                required: false,
              },
              {
                name: "eiUnabsorbedAgLoss",
                label: "2(iii) Unabsorbed Agricultural Loss (8 AYs)",
                ref: "2iii",
                type: "amount",
                required: false,
              },
              {
                name: "eiNetAgriculturalIncome",
                label: "2(iv) Net Agricultural Income (i–ii–iii)",
                ref: "2iv",
                type: "readOnly",
              },
              {
                name: "eiAgriculturalLandDetailsTable",
                label:
                  "Agricultural Land Details",
                type: "table",
                columns: [
                  {
                    name: "districtName",
                    label: "District Name",
                    type: "text",
                  },
                  {
                    name: "pinCode",
                    label: "PIN Code",
                    type: "text",
                    maxChars: 6,
                  },
                  {
                    name: "measurementAcres",
                    label: "Measurement (Acres)",
                    type: "number",
                  },
                  {
                    name: "ownershipType",
                    label: "Owned or Leased",
                    type: "dropdown",
                    options: ["Owned", "Leased"],
                  },
                  {
                    name: "irrigationType",
                    label: "Irrigated or Rain-fed",
                    type: "dropdown",
                    options: ["Irrigated", "Rain-fed"],
                  },
                ],
              },
              {
                name: "eiShareProfitFirmAop",
                label: "5. Share in profit of firm/AOP/BOI",
                type: "amount",
                required: false,
              },
              {
                name: "eiOtherExemptIncomeTable",
                label: "3. Other Exempt Income Categories Table",
                type: "table",
                columns: [
                  {
                    name: "category",
                    label: "CategoryDropdown Selection",
                    type: "dropdown",
                  },
                  { name: "amount", label: "Amount (₹)", type: "amount" },
                ],
              },
              {
                name: "eiDtaaExemptTable",
                label:
                  "4. Income claimed as not chargeable under DTAA",
                type: "table",
                columns: [
                  {
                    name: "country",
                    label: "Country",
                    type: "dropdown",
                    required: true,
                    options: [{ value: "India", label: "India" }],
                  },
                  { name: "amount", label: "Amount", type: "amount" },
                  { name: "nature", label: "Nature", type: "text" },
                  { name: "dtaaArticle", label: "DTAA Article", type: "text" },
                  {
                    name: "headOfIncome",
                    label: "Head of Income",
                    type: "text",
                  },
                  {
                    name: "trcObtained",
                    label: "TRC obtained?",
                    type: "dropdown",
                    options: ["Yes", "No"],
                  },
                ],
                condition: (state) =>
                  state?.details?.["part-a-gen"]?.residentialStatus === "NRI",
              },
              {
                name: "eiPtiPassThroughExempt",
                label:
                  "5. Pass-through income claimed as exempt (from Schedule PTI)",
                type: "readOnly",
              },
              {
                name: "eiTotalExemptIncomeSum",
                label: "6. Total Exempt Income (1+2+3+4+5)",
                ref: "6",
                type: "readOnly",
              },
            ],
          },
          {
            id: "schedule-spi-clubbing",
            label:
              "Schedule SPI: Income of Specified Persons (Spouse/Minor Child etc.)",
            fields: [
              {
                name: "clubbedPersonsTable",
                label: "Specified Persons Income Clubbing Matrix",
                type: "table",
                columns: [
                  {
                    name: "personName",
                    label: "Name of Person",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "personPan",
                    label: "PAN (optional)",
                    type: "text",
                    required: false,
                    maxChars: 10,
                  },
                  {
                    name: "personAadhaar",
                    label: "Aadhaar (optional)",
                    type: "text",
                    required: false,
                    maxChars: 12,
                  },
                  {
                    name: "relationship",
                    label: "Relationship",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "amount",
                    label: "Amount (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "incomeHead",
                    label: "Head of Income in which included",
                    type: "dropdown",
                    required: true,
                    options: ["HP", "CG", "OS", "Salary", "BP"],
                  },
                ],
              },
            ],
          },
          {
            id: "schedule-5a-portuguese",
            label:
              "Schedule 5A: Apportionment between Spouses governed by Portuguese Civil Code",
            fields: [
              {
                name: "spouseName",
                label: "Name of Spouse",
                type: "text",
                required: true,
              },
              {
                name: "spousePan",
                label: "PAN of Spouse",
                type: "text",
                required: true,
                maxChars: 10,
              },
              {
                name: "spouseAadhaar",
                label: "Aadhaar of Spouse",
                type: "text",
                required: false,
                maxChars: 12,
              },
              {
                name: "isSpouseAudited44AB",
                label: "Books of accounts of spouse audited u/s 44AB?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "isSpousePartnerAudited92E",
                label: "Spouse partner of firm audited u/s 92E?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "spouseApportionmentReceipts",
                label:
                  "Receipts and Allocation Split Matrix per Income Head (HP, Business, CG, OS)",
                type: "table",
                columns: [
                  { name: "headName", label: "Income Head", type: "readOnly" },
                  {
                    name: "grossReceipts",
                    label: "Receipts per Head (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "amountApportionedHand",
                    label: "Amount apportioned in hands of spouse (₹)",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "tdsDeducted",
                    label: "TDS deducted on income (₹)",
                    type: "amount",
                    required: false,
                  },
                  {
                    name: "tdsApportionedHand",
                    label: "TDS apportioned in hands of spouse (₹)",
                    type: "amount",
                    required: false,
                  },
                ],
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
        id: "schedule-via-deductions",
        label: "Schedule VI-A: Deductions (Chapter VI-A)",
        fieldSections: [
          {
            id: "part-b-payments",
            label:
              "7.1 Part B Deductions — Certain Payments (Disabled under New Regime)",
            fields: [
              {
                name: "dedSec80C_table",
                label: "80C Sub-table (Life insurance, PF, ELSS, tuition etc.)",
                type: "table",
                maxRows: 4,
                columns: [
                  { name: "nature", label: "Nature" },
                  { name: "policyNo", label: "Policy No" },
                  { name: "amount", label: "Amount" },
                ],
              },
              {
                name: "dedSec80CCC_table",
                label: "80CCC Sub-table (Payment to Pension Fund)",
                type: "table",
                maxRows: 4,
                columns: [
                  { name: "insurerName", label: "Insurer" },
                  { name: "policyNo", label: "Policy No" },
                  { name: "amount", label: "Amount" },
                ],
              },
              {
                name: "dedSec80CCD_1_table",
                label: "80CCD(1) Sub-table (NPS Contribution Employee)",
                type: "table",
                maxRows: 2,
                columns: [
                  { name: "idType", label: "Identifier Type" },
                  { name: "name", label: "Name" },
                  { name: "amount", label: "Amount" },
                ],
              },
              {
                name: "dedSec80CCD_1B_table",
                label: "80CCD(1B) Additional NPS",
                type: "table",
                columns: [
                  { name: "pran", label: "PRAN" },
                  { name: "amount", label: "Amount" },
                ],
              },
              {
                name: "dedSec80CCD_2",
                label: "80CCD(2) Employer contribution to NPS",
                type: "amount",
                required: false,
                note: "Allowed under both Regimes",
              },
              {
                name: "dedSec80CCG",
                label: "80CCG Equity Savings Scheme (RGESS)",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80CCF",
                label: "80CCF Infrastructure Bonds",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80D_auto",
                label:
                  "80D Health Insurance Premium (Auto-populated from 80D wizard)",
                type: "readOnly",
              },
              {
                name: "dedSec80DD_auto",
                label: "80DD Maintenance of disabled dependent",
                type: "readOnly",
              },
              {
                name: "dedSec80DDB",
                label: "80DDB Medical treatment — specified disease",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80DDB_disease",
                label: "80DDB Disease Name selection dropdown",
                type: "dropdown",
                required: false,
              },
              {
                name: "dedSec80E_auto",
                label: "80E Interest on higher education loan",
                type: "readOnly",
              },
              {
                name: "dedSec80EE_auto",
                label: "80EE Interest on home loan (residential HP)",
                type: "readOnly",
              },
              {
                name: "dedSec80EEA_auto",
                label: "80EEA Interest on home loan (affordable housing)",
                type: "readOnly",
              },
              {
                name: "dedSec80EEB_auto",
                label: "80EEB Interest on EV loan",
                type: "readOnly",
              },
              {
                name: "dedSec80G_auto",
                label: "80G Donations to charitable institutions",
                type: "readOnly",
              },
              {
                name: "dedSec80GG",
                label: "80GG Rent paid (Form 10BA)",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80GG_ack",
                label: "80GG Ack. No. of Form 10BA",
                type: "text",
                required: false,
              },
              {
                name: "dedSec80GGA_auto",
                label: "80GGA Scientific research donations",
                type: "readOnly",
              },
              {
                name: "dedSec80GGC_auto",
                label: "80GGC Political party contributions",
                type: "readOnly",
              },
              {
                name: "dedSec80TTA",
                label: "80TTA Interest on savings bank — non-senior citizens",
                type: "amount",
                required: false,
                maxLimit: 10000,
              },
              {
                name: "dedSec80TTB",
                label: "80TTB Interest on deposits — resident senior citizens",
                type: "amount",
                required: false,
                maxLimit: 50000,
              },
              {
                name: "dedSec80U_auto",
                label: "80U Self disability deduction",
                type: "readOnly",
              },
              {
                name: "dedSec80CCH",
                label: "80CCH Contribution to Agnipath Scheme",
                type: "amount",
                required: false,
                note: "Allowed under both Regimes",
              },
              {
                name: "dedAnyOtherFreeText",
                label: "Any other deductions nature details",
                type: "text",
                required: false,
              },
              {
                name: "dedAnyOtherAmount",
                label: "Any other deductions amount",
                type: "amount",
                required: false,
              },
              {
                name: "totalDeductionsPartB",
                label: "Total Deductions (Part B)",
                type: "readOnly",
              },
            ],
          },
          {
            id: "schedule-80d-wizard",
            label: "7.2 Schedule 80D — Health Insurance Premium Wizard",
            fields: [
              {
                name: "hufMembersSeniorCitizenToggle",
                label: "Are any HUF members senior citizens?",
                type: "radio",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                condition: 'status === "H"',
              },
              {
                name: "sec80DSelfFamilyNonSeniorTable",
                label:
                  "1. Self & Family (Non-Senior) (i) Health Insurance",
                type: "table",
                columns: [
                  { name: "insurer", label: "Insurer" },
                  { name: "policyNo", label: "Policy No" },
                  { name: "amount", label: "Amount" },
                ],
              },
              {
                name: "sec80DSelfFamilyNonSeniorCheckup",
                label:
                  "1. Self & Family (Non-Senior) (ii) Preventive Health Checkup (₹)",
                type: "amount",
              },
              {
                name: "sec80DSelfFamilySeniorTable",
                label:
                  "1. Self & Family (incl. Senior Citizen) (i) Health Insurance",
                type: "table",
                columns: [
                  { name: "insurer", label: "Insurer" },
                  { name: "policyNo", label: "Policy No" },
                  { name: "amount", label: "Amount" },
                ],
              },
              {
                name: "sec80DSelfFamilySeniorCheckup",
                label:
                  "1. Self & Family (incl. Senior Citizen) (ii) Preventive Health Checkup (₹)",
                type: "amount",
              },
              {
                name: "sec80DSelfFamilySeniorMedicalExp",
                label:
                  "1. Self & Family (incl. Senior Citizen) (iii) Medical Expenditure (no insurance)",
                type: "amount",
              },
              {
                name: "sec80DParentsNonSeniorTable",
                label:
                  "2. Parents (Non-Senior) (i) Health Insurance",
                type: "table",
                columns: [
                  { name: "insurer", label: "Insurer" },
                  { name: "policyNo", label: "Policy No" },
                  { name: "amount", label: "Amount" },
                ],
              },
              {
                name: "sec80DParentsNonSeniorCheckup",
                label:
                  "2. Parents (Non-Senior) (ii) Preventive Health Checkup (₹)",
                type: "amount",
              },
              {
                name: "sec80DParentsSeniorTable",
                label:
                  "2. Parents (Senior Citizen) (i) Health Insurance",
                type: "table",
                columns: [
                  { name: "insurer", label: "Insurer" },
                  { name: "policyNo", label: "Policy No" },
                  { name: "amount", label: "Amount" },
                ],
              },
              {
                name: "sec80DParentsSeniorCheckup",
                label:
                  "2. Parents (Senior Citizen) (ii) Preventive Health Checkup (₹)",
                type: "amount",
              },
              {
                name: "sec80DParentsSeniorMedicalExp",
                label:
                  "2. Parents (Senior Citizen) (iii) Medical Expenditure (₹)",
                type: "amount",
              },
              {
                name: "sec80DEligibleDeductionCalculated",
                label:
                  "3. Eligible Deduction (Auto-calculated per statutory limits)",
                type: "readOnly",
              },
            ],
          },
          {
            id: "part-c-certain-incomes",
            label: "Part C: Deductions in respect of Certain Incomes",
            fields: [
              {
                name: "dedSec80IA",
                label: "80IA: Profits from infrastructure undertakings",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80IAB",
                label: "80IAB: SEZ development",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80IB",
                label: "80IB: Certain industrial undertakings",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80IBA",
                label: "80IBA: Housing projects",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80IC_IE",
                label: "80IC / 80IE: Special Category States / NE States",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80ID",
                label: "80ID: Hotels / Convention Centres",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80JJA",
                label: "80JJA: Biodegradable waste business",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80JJAA",
                label: "80JJAA: New employee hiring",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80LA",
                label: "80LA: Offshore Banking Units / IFSC",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80QQB",
                label: "80QQB: Royalty income from books (Form 10CCD Required)",
                type: "amount",
                required: false,
              },
              {
                name: "dedSec80RRB",
                label: "80RRB: Royalty on patents (Form 10CCE Required)",
                type: "amount",
                required: false,
              },
              {
                name: "totalDeductionsPartC",
                label: "Total Deductions (Part C)",
                type: "readOnly",
              },
            ],
          },
          {
            id: "loan-interest-wizards-shared",
            label:
              "Deductions Loan Interest Shared Wizard (80E / 80EE / 80EEA / 80EEB)",
            fields: [
              {
                name: "loanDeductionsVerificationTable",
                label: "Deductions Interest Tracking Parameters Sub-Form Table",
                type: "table",
                columns: [
                  {
                    name: "loanSource",
                    label: "Loan taken from (i)",
                    type: "dropdown",
                    required: true,
                    options: ["Bank", "Institution", "Person"],
                  },
                  {
                    name: "ifscCode",
                    label: "IFSC Code (iia)",
                    type: "text",
                    required: "conditional",
                  },
                  {
                    name: "panInstitution",
                    label: "PAN of Institution (iib)",
                    type: "text",
                    required: "conditional",
                    maxChars: 10,
                  },
                  {
                    name: "institutionName",
                    label: "Name of Bank/Institution (ii)",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "loanAccountNo",
                    label: "Loan Account No. (iii)",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "sanctionDate",
                    label: "Date of Sanction (iv)",
                    type: "datePicker",
                    required: true,
                  },
                  {
                    name: "totalLoanAmount",
                    label: "Total Loan Amount (v) ₹",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "loanOutstandingFyEnd",
                    label: "Loan Outstanding at FY end (vi) ₹",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "interestClaimed",
                    label: "Interest u/s 80E / 80EE / 80EEA / 80EEB (vii) ₹",
                    type: "amount",
                    required: true,
                  },
                  {
                    name: "residentialPropertyValue_80EE",
                    label: "Section 80EE only: Value of Residential HP (₹)",
                    type: "amount",
                    required: "conditional",
                  },
                  {
                    name: "stampDutyValue_80EEA",
                    label: "Section 80EEA only: Stamp Duty Value (₹)",
                    type: "amount",
                    required: "conditional",
                  },
                  {
                    name: "vehicleRegNo_80EEB",
                    label:
                      "Section 80EEB only: Vehicle Registration No. (viii)",
                    type: "text",
                    required: "conditional",
                  },
                ],
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
        id: "tax-payments-schedules",
        label: "Tax Payments & Credits Verification",
        fieldSections: [
          {
            id: "pre-paid-taxes-summary",
            label: "9.1 Pre-Paid Taxes Verification Tables",
            fields: [
              {
                name: "advanceTaxPaidInfo",
                label: "Advance Tax Credits Sourced from IT Sheet",
                type: "infoBlock",
                note: "System lists BSR Code, Date of Deposit, Challan Serial Number, and Amount Paid automatically.",
              },
              {
                name: "tdsSalaryInfo",
                label: "TDS 1: Tax Deducted at Source on Salary Income",
                type: "infoBlock",
                note: "Auto-populated from Employer TAN forms; links to Schedule S entries.",
              },
              {
                name: "tdsNonSalaryInfo",
                label:
                  "TDS 2: Tax Deducted on Non-Salary Income (e.g., 194-I, 194-A)",
                type: "infoBlock",
                note: "Bridges TDS credits directly to Let-Out HP properties or OS Bank deposits.",
              },
              {
                name: "tcsInfo",
                label:
                  "TCS: Tax Collected at Source (Seller TAN/Type matching)",
                type: "infoBlock",
                note: "Tracks foreign remittance or auto purchase collection parameters.",
              },
            ],
          },
          {
            id: "schedule-tr-foreign-relief",
            label:
              "Schedule TR: Summary of Tax Relief Claimed Outside India u/s 90/90A/91",
            fields: [
              {
                name: "foreignTaxReliefTable",
                label: "Foreign Tax Relief Claims",
                type: "table",
                columns: [
                  {
                    name: "countryCode",
                    label: "Country Code",
                    type: "dropdown",
                    required: true,
                    options: [{ value: "India", label: "India" }],
                  },
                  {
                    name: "taxpayerIdNumber",
                    label: "Taxpayer Identification Number",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "totalTaxPaidOutside",
                    label: "Total Taxes Paid Outside India (from FSI) (₹)",
                    type: "readOnly",
                  },
                  {
                    name: "totalTaxReliefAvailable",
                    label: "Total Tax Relief Available (from FSI) (₹)",
                    type: "readOnly",
                  },
                  {
                    name: "taxReliefSection",
                    label: "Tax Relief Claimed Under Section",
                    type: "dropdown",
                    required: true,
                    options: ["Section 90", "Section 90A", "Section 91"],
                  },
                ],
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
        id: "filing-verification-step",
        label: "Filing, Verification & Bank Accounts Setup",
        fieldSections: [
          {
            id: "bank-account-setup",
            label: "10.3 Bank Accounts Setup",
            fields: [
              {
                name: "hasBankAccountInIndia",
                label: "Do you have a bank account in India?",
                type: "dropdown",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "totalNumberBankAccounts",
                label:
                  "Total number of savings+current accounts (Excluding dormant)",
                type: "number",
                required: true,
              },
              {
                name: "primaryBankAccountsTable",
                label: "All primary accounts held in India",
                type: "table",
                required: true,
                columns: [
                  {
                    name: "ifscCode",
                    label: "IFSC Code",
                    type: "text",
                    required: true,
                    maxChars: 11,
                  },
                  {
                    name: "bankName",
                    label: "Bank Name Lookup",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "accountNumber",
                    label: "Account Number",
                    type: "text",
                    required: true,
                  },
                ],
              },
              {
                name: "otherBankAccountsTable",
                label: "Other Bank Accounts Details & Refund Designation",
                type: "table",
                required: true,
                columns: [
                  {
                    name: "ifscCode",
                    label: "IFSC Code",
                    type: "text",
                    required: true,
                    maxChars: 11,
                  },
                  {
                    name: "bankName",
                    label: "Bank Name",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "accountNumber",
                    label: "Account Number",
                    type: "text",
                    required: true,
                  },
                  {
                    name: "accountType",
                    label: "Account Type",
                    type: "dropdown",
                    required: true,
                    options: ["Savings", "Current", "Others"],
                  },
                  {
                    name: "selectForRefund",
                    label: "Select for Refund Designation",
                    type: "checkbox",
                    required: false,
                    note: "At least 1 must be checked",
                  },
                ],
              },
            ],
          },
          {
            id: "verification-submit",
            label: "11. Verification Confirmation Sign-off",
            fields: [
              {
                name: "verificationDeclarationName",
                label: "Declaration Signatory Name",
                type: "text",
                required: true,
                validation: "readOnlyPrefill",
              },
              {
                name: "verificationFatherName",
                label: "Son/Daughter of Name",
                type: "text",
                required: true,
              },
              {
                name: "verificationCapacity",
                label: "Filing in Capacity of dropdown",
                type: "dropdown",
                required: true,
                options: ["Self", "Representative"],
              },
              {
                name: "verificationPlace",
                label: "Place of Filing text",
                type: "text",
                required: true,
              },
              {
                name: "verificationDateToday",
                label: "Date of Submission",
                type: "datePicker",
                required: true,
                validation: "readOnlyPrefill",
              },
            ],
          },
          {
            id: "updated-return-part-a",
            label:
              "12. Updated Return (ITR-U) Part A Parameters (Section 139(8A) Only)",
            fields: [
              {
                name: "itruPan",
                label: "(A1) PAN",
                type: "text",
                required: true,
                validation: "readOnlyPrefill",
              },
              {
                name: "itruName",
                label: "(A2) Name",
                type: "text",
                required: true,
                validation: "readOnlyPrefill",
              },
              {
                name: "itruAadhaarNumber",
                label: "(A3) Aadhaar Number",
                type: "text",
                required: "conditional",
                condition: 'status === "I"',
                maxChars: 12,
              },
              {
                name: "itruAadhaarEnrolmentId",
                label: "(A3a) Aadhaar Enrolment ID (28 digits)",
                type: "text",
                required: "conditional",
              },
              {
                name: "itruAssessmentYear",
                label: "(A4) Assessment Year Dropdown",
                type: "dropdown",
                required: true,
                options: [
                  "AY 2025-26",
                  "AY 2024-25",
                  "AY 2023-24",
                  "AY 2022-23",
                ],
              },
              {
                name: "itruPreviouslyFiled",
                label: "(A5) Return previously filed for this AY?",
                type: "dropdown",
                required: true,
                options: ["Yes", "No"],
              },
              {
                name: "itruPrevSection",
                label: "(A6) If Yes, whether u/s Section Code",
                type: "dropdown",
                required: "conditional",
                options: ["139(1)", "139(4)", "139(5)"],
              },
              {
                name: "itruPrevFormType",
                label: "(A7) ITR Type of original return",
                type: "dropdown",
                required: "conditional",
                options: [
                  "ITR-1",
                  "ITR-2",
                  "ITR-3",
                  "ITR-4",
                  "ITR-5",
                  "ITR-6",
                  "ITR-7",
                ],
              },
              {
                name: "itruPrevAckNo",
                label: "(A7) Acknowledgement Number",
                type: "text",
                required: "conditional",
              },
              {
                name: "itruPrevFilingDate",
                label: "(A7) Date of Filing of Original Return",
                type: "datePicker",
                required: "conditional",
              },
              {
                name: "itruEligibilityCheck",
                label: "(A8) Eligible for updated return as per conditions?",
                type: "dropdown",
                required: true,
                options: ["Yes", "No"],
              },
              {
                name: "itruFormForUpdating",
                label: "(A9) ITR form for updating income",
                type: "dropdown",
                required: true,
                options: [
                  "ITR-1",
                  "ITR-2",
                  "ITR-3",
                  "ITR-4",
                  "ITR-5",
                  "ITR-6",
                  "ITR-7",
                ],
                defaultValue: "ITR2",
              },
              {
                name: "itruReasons",
                label:
                  "(A10) Reasons for updating income (Multi-select up to 3 selections)",
                type: "multiSelectDropdown",
                required: true,
                options: [
                  "Return not filed",
                  "Income not reported correctly",
                  "Wrong heads",
                  "Reduction of CFL",
                  "Reduction of unabsorbed depreciation",
                  "Reduction of tax credit u/s 115JB",
                  "Wrong tax rate",
                ],
              },
              {
                name: "itruFilingPeriod",
                label: "(A11) Filing period from end of relevant AY",
                type: "dropdown",
                required: true,
                options: [
                  "Up to 12 months",
                  "12–24 months",
                  "24–36 months",
                  "36–48 months",
                ],
              },
              {
                name: "itruIsReducingCfl",
                label:
                  "(A12a) Filing to reduce CFL / depreciation / tax credit?",
                type: "radio",
                required: true,
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
              },
              {
                name: "itruAyAffectedTable",
                label: "(A12b) AY rows affected Table",
                type: "table",
                condition: 'itruIsReducingCfl === "Yes"',
                columns: [
                  {
                    name: "affectedAy",
                    label: "AY Selection",
                    type: "dropdown",
                  },
                  {
                    name: "wasOriginalFiled",
                    label: "Original filed?",
                    type: "text",
                  },
                  {
                    name: "wasRevisedFiled",
                    label: "Revised filed?",
                    type: "text",
                  },
                  {
                    name: "wasUpdatedFiled",
                    label: "Updated filed?",
                    type: "text",
                  },
                ],
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
      {
        id: "computation-ti-tti",
        label: "Part B-TI & Part B-TTI: Final Tax Computation Summary",
        fieldSections: [
          {
            id: "losses-read-only-tables",
            label:
              "Loss Set-off & Carry Forward Status Blocks (Read-Only with Override)",
            fields: [
              {
                name: "lossesEditOverrideToggle",
                label:
                  "Do you want to edit the details auto-populated for Schedule CYLA/BFLA?",
                type: "radio",
                options: [
                  { value: "Yes", label: "Yes" },
                  { value: "No", label: "No" },
                ],
                defaultValue: "No",
              },
              {
                name: "scheduleCylaMatrixBlock",
                label: "Schedule CYLA matrix visual reference dashboard",
                type: "readOnly",
                note: "Maps Salaries, HP, STCG, LTCG, and OS across active heads.",
              },
              {
                name: "scheduleBflaMatrixBlock",
                label: "Schedule BFLA matrix tracking remaining income heads",
                type: "readOnly",
              },
              {
                name: "scheduleCflTable",
                label: "Schedule CFL Carry Forward of Loss Grid",
                type: "table",
                note: "Covers AY 2010-11 to 2026-27 across HP Loss, Business Loss, Speculative Loss, Capital Losses, and Race Horse Losses.",
                columns: [
                  { name: "assessmentYear", label: "AY" },
                  { name: "dateOfFiling", label: "Date of Filing" },
                  { name: "hpLoss", label: "House Property Loss (₹)" },
                  {
                    name: "shortTermCgLoss",
                    label: "Short-term Capital Loss (₹)",
                  },
                  {
                    name: "longTermCgLoss",
                    label: "Long-term Capital Loss (₹)",
                  },
                ],
              },
            ],
          },
          {
            id: "schedule-amt-amtc",
            label: "Schedule AMT & AMTC Computations",
            fields: [
              {
                name: "amtTotalIncomePartB",
                label: "1. Total Income (from Part B-TI)",
                ref: "1",
                type: "readOnly",
              },
              {
                name: "amtDeductionChapterViaPartC",
                label: "2a. Deduction u/s Chapter VI-A (Part C)",
                ref: "2a",
                type: "readOnly",
              },
              {
                name: "amtDeductionSec10AA",
                label: "2b. Deduction u/s 10AA",
                ref: "2b",
                type: "readOnly",
              },
              {
                name: "amtDeductionSec35AD",
                label: "2c. Deduction u/s 35AD minus depreciation",
                ref: "2c",
                type: "readOnly",
              },
              {
                name: "amtTotalAdjustment",
                label: "2d. Total Adjustment (2a+2b+2c)",
                ref: "2d",
                type: "readOnly",
              },
              {
                name: "amtAdjustedTotalIncome",
                label: "3. Adjusted Total Income u/s 115JC(1) (1+2d)",
                ref: "3",
                type: "readOnly",
              },
              {
                name: "amtAdjustedTotalIncomeIfsc",
                label: "3a. Adjusted Total Income from IFSC units",
                ref: "3a",
                type: "readOnly",
              },
              {
                name: "amtAdjustedTotalIncomeOther",
                label: "3b. Adjusted Total Income from other units (3–3a)",
                ref: "3b",
                type: "readOnly",
              },
              {
                name: "amtTaxCalculated",
                label: "4. Tax u/s 115JC @ 18.5% of (3) if 3 > ₹20 lakh",
                ref: "4",
                type: "readOnly",
              },
            ],
          },
          {
            id: "part-b-tti-summary-card",
            label: "Part B-TTI Tax Computation Master Matrix Card",
            fields: [
              {
                name: "ttiAmtPayable",
                label:
                  "1a–1d. Alternate Minimum Tax Payable (115JC) + Surcharge + Cess", 
                type: "readOnly",
              },
              {
                name: "ttiTaxNormalRates",
                label: "2a. Tax at normal rates on row 15 of TI",
                type: "readOnly",
              },
              {
                name: "ttiTaxSpecialRates",
                label: "2b. Tax at special rates (from Schedule SI)", 
                type: "readOnly",
              },
              {
                name: "ttiRebateAgriculturalIncome",
                label: "2c. Rebate on agricultural income", 
                type: "readOnly",
              },
              {
                name: "ttiTaxPayableTotalIncome",
                label: "2d. Tax Payable on Total Income (2a+2b–2c)",
                type: "readOnly",
              },
              {
                name: "ttiRebateSec87A",
                label: "3. Rebate u/s 87A (Auto-calculated based on regime)",
                type: "readOnly",
              },
              {
                name: "ttiTaxPayableAfterRebate",
                label: "4. Tax payable after rebate (2d – 3)",
                type: "readOnly",
              },
              {
                name: "ttiSurchargeCalculated",
                label:
                  "5A–5B. Surcharge (25% on 115BBE + others with marginal relief)",
                type: "readOnly",
              },
              {
                name: "ttiHealthEducationCess",
                label: "6. Health & Education Cess @ 4%",
                type: "readOnly",
              },
              {
                name: "ttiGrossTaxLiability",
                label: "7. Gross Tax Liability (4+5iv+6)",
                type: "readOnly",
              },
              {
                name: "ttiGrossTaxPayableHigherOf",
                label: "8. Gross Tax Payable (higher of 1d and 7)",
                type: "readOnly",
              },
              {
                name: "ttiTaxExcludingEsop",
                label:
                  "8a. Tax on income excluding ESOP perquisite (eligible start-up)",
                type: "readOnly",
              },
              {
                name: "ttiTaxDeferredEsop",
                label: "8b. Tax deferred — ESOP perquisite",
                type: "readOnly",
              },
              {
                name: "ttiTaxDeferredEarlierYears",
                label: "8c. Tax deferred from earlier years payable now",
                type: "readOnly",
              },
              {
                name: "ttiAmtCreditClaimed",
                label: "9. AMT credit u/s 115JD (from AMTC)",
                type: "readOnly",
              },
              {
                name: "ttiTaxPayableAfterCredit",
                label: "10. Tax payable after credit (8a+8c–9)",
                type: "readOnly",
              },
              {
                name: "ttiReliefSec89",
                label:
                  "11a. Relief u/s 89 (Form 10E Ack Number tracking entry)",
                type: "amount",
              },
              {
                name: "ttiReliefSec89A",
                label: "11b. Relief u/s 89A",
                type: "readOnly",
              },
              {
                name: "ttiReliefSec90_90A",
                label: "11b_2. Relief u/s 90/90A (from Schedule TR)",
                type: "readOnly",
              },
              {
                name: "ttiReliefSec91",
                label: "11c. Relief u/s 91 (from Schedule TR)",
                type: "readOnly",
              },
              {
                name: "ttiTotalRelief",
                label: "11d. Total Relief (11a+11b+11c)",
                type: "readOnly",
              },
              {
                name: "ttiNetTaxLiability",
                label: "12. Net Tax Liability (10–11d; min 0)",
                type: "readOnly",
              },
              {
                name: "ttiInterestAllSec234",
                label:
                  "13a–13da. Interest u/s 234A / 234B / 234C / Fee u/s 234F / Fee u/s 234-I",
                type: "readOnly",
              },
              {
                name: "ttiAggregateLiability",
                label: "14. Aggregate Liability (12+13e)",
                type: "readOnly",
              },
              {
                name: "ttiTaxesPaidPrepaidSum",
                label:
                  "15a–15e. Taxes Paid Summary (Advance Tax + TDS + TCS + Self-Assessment)",
                type: "readOnly",
              },
              {
                name: "ttiAmountPayableFinal",
                label: "16. Amount Payable (14 > 15e balance due)",
                type: "readOnly",
              },
              {
                name: "ttiRefundFinal",
                label: "17. Refund (15e > 14 credit surplus)",
                type: "readOnly",
              },
            ],
          },
          {
            id: "updated-return-part-b",
            label:
              "12. Updated Return (ITR-U) Part B Tax Computation (Section 139(8A) Only)",
            fields: [
              {
                name: "itruAdditionalIncomeSalary",
                label: "Additional Income — Salary",
                type: "amount",
                required: false,
              },
              {
                name: "itruAdditionalIncomeHp",
                label: "Additional Income — House Property",
                type: "amount",
                required: false,
              },
              {
                name: "itruAdditionalIncomeBp",
                label: "Additional Income — Business/Profession",
                type: "amount",
                required: false,
              },
              {
                name: "itruAdditionalIncomeCg",
                label: "Additional Income — Capital Gains",
                type: "amount",
                required: false,
              },
              {
                name: "itruAdditionalIncomeOs",
                label: "Additional Income — Other Sources",
                type: "amount",
                required: false,
              },
              {
                name: "itruTotalAdditionalIncome",
                label: "Total Additional Income (a+b+c+d+e)",
                ref: "1A-f",
                type: "readOnly",
              },
              {
                name: "itruTotalIncomeLastValid",
                label: "Total Income per last valid return",
                ref: "1B",
                type: "amount",
                required: false,
              },
              {
                name: "itruTotalIncomePartC",
                label: "Total Income as per Part C",
                ref: "2",
                type: "readOnly",
              },
              {
                name: "itruAmountPayablePartD",
                label: "Amount Payable from Part D",
                ref: "3",
                type: "readOnly",
              },
              {
                name: "itruAmountRefundablePartD",
                label: "Amount Refundable from Part D",
                ref: "4",
                type: "readOnly",
              },
              {
                name: "itruAmountPayableLastValid",
                label: "Amount payable per last valid return",
                ref: "5",
                type: "amount",
                required: false,
              },
              {
                name: "itruRefundClaimedLastValid",
                label: "Refund claimed per last valid return",
                ref: "6i",
                type: "amount",
                required: false,
              },
              {
                name: "itruTotalRefundIssuedLastValid",
                label: "Total Refund issued per last valid return incl. 244A",
                ref: "6ii",
                type: "amount",
                required: false,
              },
              {
                name: "itruFeeSec234F",
                label: "Fee u/s 234F",
                ref: "7",
                type: "readOnly",
              },
              {
                name: "itruRegularAssessmentTax",
                label: "Regular Assessment Tax",
                ref: "8",
                type: "amount",
                required: false,
              },
              {
                name: "itruAggregateLiabilityRefundIssued",
                label: "Aggregate Liability if refund issued (3+6ii–5–8–4)",
                ref: "9i",
                type: "readOnly",
              },
              {
                name: "itruAggregateLiabilityRefundNotIssued",
                label: "Aggregate Liability if refund not issued (3+6i–5–8–4)",
                ref: "9ii",
                type: "readOnly",
              },
              {
                name: "itruAdditionalTaxInterestPenalty",
                label: "Additional tax @ 25%/50%/60%/70% of (9–7)",
                ref: "10",
                type: "readOnly",
                note: "Rate per A11 filing period selection",
              },
              {
                name: "itruNetAmountPayable",
                label: "Net Amount Payable (9+10)",
                ref: "11",
                type: "readOnly",
              },
              {
                name: "itruTaxPaidSec140B",
                label: "Tax paid u/s 140B (from payment table)",
                ref: "12",
                type: "readOnly",
              },
              {
                name: "itruTaxDueFinal",
                label: "Tax Due (11–12)",
                ref: "13",
                type: "readOnly",
              },
              {
                name: "itruReliefSec89NotClaimedEarlier",
                label: "Relief u/s 89 not claimed in earlier return",
                ref: "15",
                type: "amount",
                required: false,
              },
            ],
          },
        ],
      },
    ],
  },
];

// ─────────────────────────────────────────────────────────────
// Helper utilities (mirrors ITR-1 architecture in individualFieldConfig.js)
// ─────────────────────────────────────────────────────────────

function resolveItr2Options(options) {
  if (!options) return undefined;
  if (Array.isArray(options)) return options;
  // String references (future-proofing for enum-style options)
  if (options === "statesList") return statesList;
  if (options === "countriesList") return countriesList;
  if (options === "countryCodesList") return countryCodesList;
  if (options === "retirementCountriesList") return retirementCountriesList;
  return [];
}

function normalizeItr2Type(rawType) { 
  if (!rawType) return "text";
  const t = rawType.toString().toLowerCase().trim();
  if (
    t.startsWith("dropdown") ||
    t.startsWith("select") ||
    t === "yes/no" ||
    t === "radio" ||
    t === "multiselectdropdown"
  )
    return "select";
  if (
    t === "date" ||
    t === "datepicker" ||
    t === "date picker" ||
    t === "date-picker"
  )
    return "date";
  if (t.startsWith("amount")) return "amount";
  if (t === "number" || t === "auto") return "number";
  if (t === "email") return "email";
  if (t === "tel") return "tel";
  if (t === "checkbox") return "checkbox";
  if (
    t === "readonly" ||
    t === "read-only" ||
    t === "computed" ||
    t === "readOnly"
  )
    return "readOnly";
  if (t === "infoblock") return "readOnly";
  return "text";
}

function resolveItr2Condition(raw) {
  if (!raw || typeof raw !== "string") return {};
  const matchEq = raw.match(/([a-zA-Z0-9_]+)\s*===\s*['"]([^'"]+)['"]/);
  if (matchEq)
    return { conditionalOn: { field: matchEq[1], value: matchEq[2] } };
  return {};
}

function mapItr2Field(f) {
  const rawType = f.type || "text";
  const type = normalizeItr2Type(rawType);
  const options = resolveItr2Options(f.options);
  const { conditionalOn } = resolveItr2Condition(f.condition);
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

function buildItr2SectionsFromFieldSection(fs) {
  const normalFields = [];
  const extraSections = [];
  (fs.fields || []).forEach((f) => {
    const mapped = mapItr2Field(f);
    const rawType = (f.type || "").toLowerCase();
    if (rawType === "table" || rawType === "matrix") {
      const { conditionalOn: listConditionalOn } = resolveItr2Condition(
        f.condition,
      );
      const isListCompoundCondition =
        f.condition &&
        typeof f.condition === "string" &&
        (f.condition.includes("&&") || f.condition.includes("||"));
      extraSections.push({
        title: f.label,
        description: f.note || f.notes,
        isList: true,
        listName: f.name || f.id,
        required: f.required,
        ...(listConditionalOn ? { conditionalOn: listConditionalOn } : {}),
        condition:
          listConditionalOn && !isListCompoundCondition
            ? undefined
            : f.condition,
        fields: (f.columns || []).map((col) => ({
          ...col,
          name: col.name || col.id,
          type: normalizeItr2Type(col.type),
          required: col.required !== undefined ? col.required : false,
        })),
      });
    } else {
      normalFields.push(mapped);
    }
  });
  const result = [];
  if (normalFields.length > 0) {
    result.push({
      title: fs.label || fs.title,
      description: fs.note || fs.notes,
      fields: normalFields,
      condition: fs.condition,
    });
  }
  return [...result, ...extraSections];
}

const buildIndividual2ConfigMapping = () => {
  const mapping = {};

  itr2FieldConfig.forEach((step) => {
    const targetRoute = step.route === "tax-summary" ? "filing" : step.route;

    if (!mapping[targetRoute]) {
      mapping[targetRoute] = {};
    }

    (step.subsections || []).forEach((sub) => {
      const sections = [];
      (sub.fieldSections || []).forEach((fs) => {
        sections.push(...buildItr2SectionsFromFieldSection(fs));
      });
      mapping[targetRoute][sub.id] = {
        title: sub.label || sub.title,
        sections,
      };
    });
  });

  // Alias efiling for DynamicFilingStep compatibility
  if (mapping.filing) {
    const filingKeys = Object.keys(mapping.filing);
    if (filingKeys.length > 0 && !mapping.filing.efiling) {
      mapping.filing.efiling =
        mapping.filing[filingKeys[filingKeys.length - 1]];
    }
  }

  return mapping;
};

export const individual2ConfigMapping = buildIndividual2ConfigMapping();

export default itr2FieldConfig;
