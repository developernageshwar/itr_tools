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

export const itr4FieldConfig = {
  mainSections: {
    partAGeneralInformation: {
      id: "partAGeneralInformation",
      //   label: "SECTION 1 — Part A: General Information", 
      subsections: {
        identityAndContact: {
          id: "identityAndContact",
          label: "Identity, Address & Contact Details",
          fieldSections: {
            personalIdentity: {
              id: "personalIdentity",
              label: "1.1 Personal Identity",
              fields: [
                { id: "firstName", label: "First Name *", type: "text", required: true, validation: "Alpha only; max 75 chars" },
                { id: "middleName", label: "Middle Name", type: "text", required: false, validation: "Alpha only" },
                { id: "lastName", label: "Last Name", type: "text", required: true, validation: "Alpha only" },
                { id: "pan", label: "Permanent Account Number (PAN)", type: "text", required: true, validation: "Format AAAAA0000A (10 chars)" },
                {
                  id: "status",
                  label: "Status",
                  type: "dropdown",
                  required: true,
                  options: [
                    { value: "I", label: "I – Individual" },
                    { value: "H", label: "H – HUF" },
                    { value: "F", label: "F – Firm (other than LLP)" }
                  ]
                },
                { id: "dobFormationDate", label: "Date of Birth / Formation", type: "date", required: true, validation: "DD/MM/YYYY; DOB for Individual, Formation date for HUF/Firm" },
                { id: "wardCircle", label: "Income Tax Ward / Circle", type: "text", required: false, validation: "Optional; auto-populated in some cases" }
              ]
            },
            primaryAddress: {
              id: "primaryAddress",
              label: "1.2 Primary Address",
              fields: [
                { id: "primFlatDoorBlockNo", label: "Flat / Door / Block No.", type: "text", required: true },
                { id: "primBuildingVillage", label: "Name of Premises / Building / Village", type: "text", required: false },
                { id: "primRoadStreetPO", label: "Road / Street / Post Office", type: "text", required: false },
                { id: "primAreaLocality", label: "Area / Locality", type: "text", required: false },
                { id: "primTownCityDistrict", label: "Town / City / District", type: "text", required: true },
                { id: "primState", label: "State", type: "dropdown", required: true, options: statesList },
                { id: "primCountry", label: "Country / Region", type: "dropdown", required: true, defaultValue: "India", options: [{ value: 'India', label: 'India' }], disabled: true },
                { id: "primPinCode", label: "PIN Code", type: "text", required: "conditional", validation: "6 digits; required for Indian addresses; first digit ≠ 0" },
                { id: "primNoZipCode", label: "No ZIP Code", type: "checkbox", required: false, validation: "Tick for foreign addresses without ZIP" },
                { id: "primZipCode", label: "ZIP Code", type: "text", required: "conditional", validation: "Required for foreign addresses when No ZIP Code is not ticked" }
              ]
            },
            secondaryAddress: {
              id: "secondaryAddress",
              label: "1.3 Secondary Address",
              fields: [
                {
                  id: "isSecondaryAddressSame",
                  label: "Is the secondary address same as primary address?",
                  type: "dropdown",
                  required: true,
                  options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }],
                  notes: "If Yes, secondary address block collapses. If No, same 10-field set as Primary Address appears."
                },
                { id: "secFlatDoorBlockNo", label: "Flat / Door / Block No.", type: "text", required: "conditional" },
                { id: "secBuildingVillage", label: "Name of Premises / Building / Village", type: "text", required: false },
                { id: "secRoadStreetPO", label: "Road / Street / Post Office", type: "text", required: false },
                { id: "secAreaLocality", label: "Area / Locality", type: "text", required: false },
                { id: "secTownCityDistrict", label: "Town / City / District", type: "text", required: "conditional" },
                { id: "secState", label: "State", type: "dropdown", required: "conditional", options: statesList },
                { id: "secCountry", label: "Country / Region", type: "dropdown", required: "conditional", defaultValue: "India", options: [{ value: 'India', label: 'India' }], disabled: true },
                { id: "secPinCode", label: "PIN Code", type: "text", required: "conditional" },
                { id: "secNoZipCode", label: "No ZIP Code", type: "checkbox", required: false },
                { id: "secZipCode", label: "ZIP Code", type: "text", required: "conditional" }
              ]
            },
            contactDetails: {
              id: "contactDetails",
              label: "1.4 Contact Details",
              fields: [
                { id: "primaryEmail", label: "Primary Email ID of the taxpayer", type: "email", required: true },
                { id: "secondaryEmail", label: "Secondary Email ID", type: "email", required: false },
                { id: "primaryMobile", label: "Primary Mobile No.", type: "tel", required: true, validation: "Country code 91 (default); 10-digit mobile number" },
                { id: "stdIsdCode", label: "STD / ISD Code", type: "text", required: false, validation: "For residential/office phone" },
                { id: "landlineNumber", label: "Residential / Office Phone Number", type: "tel", required: false },
                { id: "secondaryMobile", label: "Secondary Mobile No.", type: "tel", required: false }
              ]
            }
          }
        },
        taxpayerStatusAndFiling: {
          id: "taxpayerStatusAndFiling",
          label: "Status, Employment, Regime & Filing Directives",
          fieldSections: {
            aadhaarInformation: {
              id: "aadhaarInformation",
              label: "1.5 Aadhaar Information",
              fields: [
                { id: "hasAadhaar", label: "Do you have an Aadhaar Number?", type: "dropdown", required: "conditional", condition: 'status === "I"', options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "aadhaarNumber", label: "Aadhaar Number", type: "text", required: "conditional", validation: "12 digits; required if PAN-linked Aadhaar exists", condition: 'status === "I" && hasAadhaar === "Yes"' },
                { id: "aadhaarEnrolmentId", label: "Aadhaar Enrolment ID", type: "text", required: "conditional", validation: "28 digits; required only if Aadhaar not yet allotted", condition: 'status === "I" && hasAadhaar === "No"' }
              ]
            },
            portugueseCivilCode: {
              id: "portugueseCivilCode",
              label: "1.6 Portuguese Civil Code & Spouse PAN",
              fields: [
                { id: "governedBySec5A", label: "Whether person governed by Portuguese Civil Code u/s 5A?", type: "dropdown", required: false, default: "No", options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "spousePAN", label: "PAN of Spouse (if applicable)", type: "text", required: "conditional", validation: "Required if Portuguese Civil Code = Yes" }
              ]
            },
            natureOfEmployment: {
              id: "natureOfEmployment",
              label: "1.7 Nature of Employment",
              fields: [
                {
                  id: "employmentNature",
                  label: "Nature of Employment",
                  type: "dropdown",
                  required: "conditional",
                  notes: "Applicable only when taxpayer also has salary income (Part B2)",
                  options: [
                    { value: "Central Govt", label: "Central Govt" },
                    { value: "State Govt", label: "State Govt" },
                    { value: "PSU", label: "PSU" },
                    { value: "Pensioners", label: "Pensioners (CG/SG/PSU/Others)" },
                    { value: "Others", label: "Others" },
                    { value: "NA", label: "NA (Not Applicable)" }
                  ]
                }
              ]
            },
            residentialStatus: {
              id: "residentialStatus",
              label: "1.8 Residential Status",
              fields: [
                {
                  id: "resStatus",
                  label: "Residential Status",
                  type: "dropdown",
                  required: true,
                  options: [
                    { value: "RES", label: "RES – Resident" },
                    { value: "NRI", label: "NRI – Non Resident" },
                    { value: "NOR", label: "NOR – Resident but not Ordinarily Resident" }
                  ]
                },
                {
                  id: "taxStatus",
                  label: "Tax Status",
                  type: "dropdown",
                  required: true,
                  options: [
                    { value: "I", label: "I – Individual" },
                    { value: "H", label: "H – HUF" },
                    { value: "F", label: "F – Firm (Other than LLP)" }
                  ]
                }
              ]
            },
            filingStatus: {
              id: "filingStatus",
              label: "1.9 Filing Status",
              fields: [
                {
                  id: "filedUnderSection",
                  label: "Filed u/s (Section)",
                  type: "dropdown",
                  required: true,
                  options: [
                    { value: "139(1)", label: "139(1)-On or before due date" },
                    { value: "139(4)", label: "139(4)-After due date" },
                    { value: "139(5)", label: "139(5)-Revised Return" },
                    { value: "139(8A)", label: "139(8A)-Updated Return" },
                    { value: "92CD", label: "92CD-Modified" },
                    { value: "119(2)(b)", label: "119(2)(b)-After condonation" },
                    { value: "142(1)", label: "142(1)" },
                    { value: "148", label: "148" },
                    { value: "153A", label: "153A" },
                    { value: "153C", label: "153C" },
                    { value: "139(9)", label: "139(9)-Defective" }
                  ]
                },
                {
                  id: "noticeInResponseTo",
                  label: "Filed in response to notice u/s",
                  type: "dropdown",
                  required: "conditional",
                  options: ["139(9)", "142(1)", "148", "153A", "153C"]
                },
                { id: "dueDate139_1", label: "Due Date u/s 139(1)", type: "date", required: "auto", prefilled: "31/08/2026", readOnly: true },
                { id: "originalReceiptNumber", label: "Receipt Number (if revised/defective)", type: "text", required: "conditional", validation: "Show when 139(5) / 139(9) selected" },
                { id: "originalFilingDate", label: "Date of filing of original Return", type: "date", required: "conditional", validation: "DD/MM/YYYY; show with Receipt Number" },
                { id: "noticeUniqueNumber", label: "Unique Number / DIN (for notice)", type: "text", required: "conditional", validation: "Show for notice-response filings" },
                { id: "noticeOrderDate", label: "Date of such Notice or Order", type: "date", required: "conditional", validation: "DD/MM/YYYY" }
              ]
            },
            taxRegimeEarlierYears: {
              id: "taxRegimeEarlierYears",
              label: "1.10.1 Tax Regime — Form 10IE Flow (Earlier Years History)",
              fields: [
                { id: "optedNewRegimeEarlier", label: "Have you ever opted for new tax regime u/s 115BAC in earlier years?", type: "dropdown", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "optedEarlierAY", label: "AY in which option was exercised", type: "dropdown", required: "conditional", options: ["AY 2021-22", "AY 2022-23", "AY 2023-24", "AY 2024-25", "AY 2025-26"] },
                { id: "form10IEFilingDate", label: "Date of filing of Form 10IE", type: "date", required: "conditional" },
                { id: "form10IEAckNumber", label: "Acknowledgement number of Form 10IE", type: "text", required: "conditional" },
                { id: "optedOutRegimeEarlier", label: "Have you ever opted OUT of section 115BAC in earlier years?", type: "dropdown", required: "conditional", options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "optedOutEarlierAY", label: "AY in which opted out", type: "dropdown", required: "conditional" },
                { id: "form10IEOptOutFilingDate", label: "Date of filing of Form 10IE (opt-out)", type: "date", required: "conditional" },
                { id: "form10IEOptOutAckNumber", label: "Acknowledgement number (opt-out)", type: "text", required: "conditional" },
                {
                  id: "currentAYRegimeOption",
                  label: "Option for current AY",
                  type: "dropdown",
                  required: true,
                  options: ["Opting in now", "Continue to opt", "Opt out", "Not opting", "Not eligible to opt in"]
                },
                { id: "form10IECurrentFilingDate", label: "Date of filing of Form 10IE (current AY)", type: "date", required: "conditional", validation: "Required if Opting in now / Opt out" },
                { id: "form10IECurrentAckNumber", label: "Acknowledgement number (current AY)", type: "text", required: "conditional" }
              ]
            },
            taxRegimeOptOut10IEA: {
              id: "taxRegimeOptOut10IEA",
              label: "1.10.2 Tax Regime — Form 10IEA Flow (AY 2026-27 complex path)",
              fields: [
                { id: "filedForm10IEAEarlier", label: "(A23) Have you filed Form 10IEA within due date for any earlier AY for choosing old tax regime?", type: "dropdown", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "form10IEAFilingDate2425", label: "Date of filing Form 10IEA for AY 2024-25", type: "date", required: "conditional" },
                { id: "form10IEAOldRegimeAY", label: "AY for which Form 10IEA was filed for OLD regime", type: "dropdown", required: "conditional" },
                { id: "form10IEAAckNumber", label: "Acknowledgement number of Form 10IEA", type: "text", required: "conditional" },
                { id: "reEnteredNewRegime2ndForm", label: "Have you re-entered new tax regime by filing 2nd Form 10IEA for any AY?", type: "dropdown", required: "conditional", options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "form10IEANewRegimeDate2526", label: "Date of 2nd Form 10IEA for AY 2025-26", type: "date", required: "conditional" },
                { id: "form10IEA2ndNewRegimeAY", label: "AY for which 2nd Form 10IEA was filed for NEW regime", type: "dropdown", required: "conditional" },
                { id: "form10IEA2ndNewRegimeAck", label: "Acknowledgement number of 2nd Form 10IEA", type: "text", required: "conditional" },
                { id: "optOutNewRegimeCurrentAYPathA", label: "Opt out of New Regime for current AY? (Yes/No) [Path A]", type: "dropdown", required: "conditional" },
                { id: "form10IEADate2627ReEnter", label: "Date of Form 10IEA for AY 2026-27 (re-entering new regime)", type: "date", required: "conditional" },
                { id: "form10IEAAck2627ReEnter", label: "Acknowledgement of Form 10IEA for AY 2026-27", type: "text", required: "conditional" },
                { id: "filedForm10IEACurrentOldRegime", label: "Filed Form 10IEA within due date for current AY for OLD regime? [Path B]", type: "dropdown", required: "conditional" },
                { id: "form10IEADate2627ChooseOld", label: "Date of Form 10IEA for AY 2026-27 (choosing old regime)", type: "date", required: "conditional" },
                { id: "form10IEAAck2627ChooseOld", label: "Acknowledgement of Form 10IEA for AY 2026-27", type: "text", required: "conditional" },
                { id: "optOutNewRegimeCurrentAYPathB", label: "Opt out of New Regime for current AY? (Yes/No) [Path B(ii)]", type: "dropdown", required: "conditional" },
                { id: "form10IEADate2627ChooseOldLate", label: "Date of Form 10IEA for AY 2026-27 (choosing old regime) [Late]", type: "date", required: "conditional" },
                { id: "form10IEAAck2627ChooseOldLate", label: "Acknowledgement of Form 10IEA for AY 2026-27 [Late]", type: "text", required: "conditional" },
                {
                  id: "finalRegimeSelectionCurrentAY",
                  label: "(A23b) Option for current AY (final selection)",
                  type: "dropdown",
                  required: true,
                  options: ["Opting in now", "Continue to opt", "Opt out", "Not opting", "Old", "New"]
                },
                { id: "form10IEAFinalFilingDate", label: "Date of filing Form 10IEA (applicable cases)", type: "date", required: "conditional" },
                { id: "form10IEAFinalAckNumber", label: "Acknowledgement number of Form 10IEA", type: "text", required: "conditional" },
                { id: "form10IEAFinalAY", label: "AY in which option is exercised", type: "dropdown", required: "conditional" }
              ]
            },
            seventhProvisoDirectives: {
              id: "seventhProvisoDirectives",
              label: "1.11 Seventh Proviso to Section 139(1) — Conditional Block (A24)",
              fields: [
                { id: "isFilingSeventhProviso", label: "(A24) Filing under Seventh Proviso to Section 139(1)?", type: "dropdown", required: false, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }], notes: "Not applicable for Firms. Show only if individual/HUF not otherwise required to file." },
                { id: "depositedAmountCurrentAcc", label: "Deposited > ₹1 Crore in current account(s)?", type: "radio", required: "conditional" },
                { id: "incurredAmountForeignTravel", label: "Incurred > ₹2 lakh on foreign travel?", type: "radio", required: "conditional" },
                { id: "incurredAmountElectricity", label: "Incurred > ₹1 lakh on electricity consumption?", type: "radio", required: "conditional" },
                { id: "salesTurnoverExceedsLimit", label: "Sales/turnover > ₹60 lakh?", type: "radio", required: "conditional", notes: "Clause (iv) sub-conditions" },
                { id: "grossProfReceiptsExceedsLimit", label: "Gross receipts in profession > ₹10 lakh?", type: "radio", required: "conditional" },
                { id: "tdsTcsExceedsLimit", label: "TDS+TCS ≥ ₹25,000 (or ₹50,000 for senior citizen)?", type: "radio", required: "conditional" },
                { id: "savingsDepositExceedsLimit", label: "Savings bank deposits ≥ ₹50 lakh?", type: "radio", required: "conditional" }
              ]
            },
            representativeAssessee: {
              id: "representativeAssessee",
              label: "1.12 Representative Assessee — Conditional Block (A25)",
              fields: [
                { id: "isRepresentativeFiled", label: "(A25) Filed by representative assessee?", type: "dropdown", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "representativeName", label: "Name of representative assessee", type: "text", required: "conditional" },
                { id: "representativeEmail", label: "Email ID of representative assessee", type: "email", required: "conditional" },
                { id: "representativeContact", label: "Contact No. of representative assessee", type: "tel", required: "conditional" },
                {
                  id: "representativeCapacity",
                  label: "Capacity of representative",
                  type: "dropdown",
                  required: "conditional",
                  options: ["Self", "Legal Heir", "Guardian", "Manager", "Partner", "Karta", "Others"]
                },
                { id: "representativeAddress", label: "Address of representative", type: "text", required: "conditional" },
                { id: "representativePAN", label: "PAN of representative", type: "text", required: "conditional", validation: "Format: 10 alphanumeric chars" },
                { id: "representativeAadhaar", label: "Aadhaar No. of representative", type: "text", required: false, validation: "12 digits" }
              ]
            }
          }
        }
      }
    },
    partBGrossTotalIncome: {
      id: "partBGrossTotalIncome",
      //   label: "SECTION 2 & 3 — Gross Total Income & House Property Details", 
      subsections: {
        incomeHeadsBPAndSalary: {
          id: "incomeHeadsBPAndSalary",
          label: "Business/Profession Income & Salary Details",
          fieldSections: {
            businessProfessionIncomeSummary: {
              id: "businessProfessionIncomeSummary",
              label: "2.1 B1 — Income from Business & Profession (Presumptive Summary)",
              fields: [
                { id: "incomeBPAuto", ref: "B1", label: "Income from Business & Profession (from Schedule BP E8)", type: "amount", required: "auto", readOnly: true, notes: "Sourced from E8 of Schedule BP — do not enter here directly" }
              ]
            },
            salaryIncomeBreakdown: {
              id: "salaryIncomeBreakdown",
              label: "2.2 B2 — Income from Salary",
              fields: [
                { id: "salarySec17_1", ref: "i(a)", label: "Salary as per section 17(1)", type: "amount", required: false, notes: "From Form 16" },
                { id: "perquisitesSec17_2", ref: "i(b)", label: "Value of perquisites u/s 17(2)", type: "amount", required: false },
                { id: "profitsInLieuSalarySec17_3", ref: "i(c)", label: "Profit in lieu of salary u/s 17(3)", type: "amount", required: false },
                { id: "retirementBenefitNotified89A", ref: "i(d)", label: "Income from retirement benefit account — Notified Country u/s 89A (USA/UK/Canada)", type: "amount", required: false, notes: "3 sub-rows/breakdowns: USA / UK / Canada" },
                { id: "retirementBenefitNonNotified89A", ref: "i(e)", label: "Income from retirement benefit — Non-Notified Country u/s 89A", type: "amount", required: false },
                { id: "grossSalaryTotal", ref: "2(i)", label: "Gross Salary (a+b+c+d+e)", type: "amount", required: "auto", readOnly: true },
                {
                  id: "exemptAllowancesSec10",
                  ref: "2(ii)",
                  label: "Allowances exempt u/s 10",
                  type: "subTable",
                  required: false,
                  notes: "Up to 4 rows containing Nature Dropdown + Amount",
                  columns: [
                    {
                      id: "nature",
                      label: "Nature of Exemption",
                      type: "dropdown",
                      options: [
                        "Sec 10(5) LTA", "10(6) Embassy", "10(7) Overseas", "10(10) Gratuity",
                        "10(10A) Commuted Pension", "10(10AA) Leave Encashment", "10(10B) Compensation",
                        "10(10C) VRS", "10(10CC) Tax by employer", "10(14)(i)", "10(14)(ii)",
                        "10(16) Scholarship", "10(17) MP/MLA", "10(17A) Award", "10(18) Gallantry / Defense Disability",
                        "10(19) AF Pension", "10(26)", "10(26AAA)", "10(12C) Agniveer", "Any Other"
                      ]
                    },
                    { id: "amount", label: "Amount", type: "amount" }
                  ]
                },
                { id: "hraExemptSec10_13A", ref: "sub", label: "HRA exempt u/s 10(13A) — from Schedule EA 10(13A)", type: "amount", required: "auto", readOnly: true },
                { id: "reliefClaimedSec89A", ref: "2iia", label: "Less: Income claimed for relief u/s 89A", type: "amount", required: "auto", readOnly: true },
                { id: "netSalaryTotal", ref: "2(iii)", label: "Net Salary (i – ii)", type: "amount", required: "auto", readOnly: true },
                { id: "standardDeductionSec16_ia", ref: "iv(a)", label: "Standard Deduction u/s 16(ia)", type: "amount", required: "auto", readOnly: true },
                { id: "entertainmentAllowanceSec16_ii", ref: "iv(b)", label: "Entertainment Allowance u/s 16(ii)", type: "amount", required: false, notes: "Govt employees only" },
                { id: "professionalTaxSec16_iii", ref: "iv(c)", label: "Professional Tax u/s 16(iii)", type: "amount", required: false },
                { id: "totalDeductionsSec16", ref: "2(iv)", label: "Total Deductions u/s 16 (iva+ivb+ivc)", type: "amount", required: "auto", readOnly: true },
                { id: "salaryIncomeChargeable", ref: "2(v)", label: "Income chargeable under 'Salaries' (iii – iv)", type: "amount", required: "auto", readOnly: true, notes: "Fill Schedule TDS1 for credit matching" }
              ]
            },
            hraComputationScheduleEA: {
              id: "hraComputationScheduleEA",
              label: "2.3 HRA Sub-Schedule — 10(13A) — Schedule EA",
              fields: [
                { id: "hraPlaceOfResidence", label: "1. Place of Residence", type: "dropdown", required: true, options: ["Metro City", "Non-Metro City"] },
                { id: "hraActualReceived", label: "2. Actual HRA Received (A)", type: "amount", required: true },
                { id: "hraActualRentPaid", label: "3. Actual Rent Paid", type: "amount", required: true },
                { id: "hraBasicSalary", label: "4(a). Basic Salary", type: "amount", required: true },
                { id: "hraDearnessAllowance", label: "4(b). Dearness Allowance", type: "amount", required: false },
                { id: "hraTotalSalaryCalculated", label: "4. Total Salary for HRA = 4(a)+4(b)", type: "amount", required: "auto", readOnly: true },
                { id: "hraExcessRentPaid", label: "5. Actual Rent Paid – 10% of Salary (B)", type: "amount", required: "auto", readOnly: true },
                { id: "hraPercentageSalaryCap", label: "6. 50%/40% of Salary (C)", type: "amount", required: "auto", readOnly: true, notes: "50% for Metro, 40% for Non-Metro" },
                { id: "hraEligibleExemption", label: "7. Eligible Exempt Allowance u/s 10(13A) = Min(A, B, C)", type: "amount", required: "auto", readOnly: true }
              ]
            }
          }
        },
        housePropertyIncomeDetails: {
          id: "housePropertyIncomeDetails",
          label: "House Property Consolidated and Detailed Schedules",
          fieldSections: {
            simplifiedHouseProperty: {
              id: "simplifiedHouseProperty",
              label: "2.4 B3 — Income from House Property (Simplified on Income Details Sheet)",
              fields: [
                { id: "simpPropertyType", ref: "B3", label: "Type of House Property", type: "dropdown", required: true, options: ["Self-Occupied", "Let Out", "Deemed Let Out"] },
                { id: "simpRentReceived", ref: "i(a)", label: "(i)(a) Rent received / receivable during the year", type: "amount", required: "conditional", notes: "Required if Let Out" },
                { id: "simpRentArrears", ref: "i(b)", label: "(i)(b) Arrears of rent received during the year", type: "amount", required: false },
                { id: "simpGrossRentTotal", ref: "3(i)", label: "(i) Gross rent received / receivable", type: "amount", required: "auto", readOnly: true },
                { id: "simpLocalTaxesPaid", ref: "3(ii)", label: "(ii) Tax paid to local authorities", type: "amount", required: false },
                { id: "simpAnnualValue", ref: "3(iii)", label: "(iii) Annual Value (i – ii); nil if self-occupied", type: "amount", required: "auto", readOnly: true },
                { id: "simpStandardDeduction", ref: "3(iv)", label: "(iv) 30% of Annual Value", type: "amount", required: "auto", readOnly: true },
                { id: "simpBorrowedCapitalInterest", ref: "3(v)", label: "(v) Interest payable on borrowed capital u/s 24(b) — from Schedule 24(b)", type: "amount", required: "auto", readOnly: true },
                { id: "simpUnrealizedRentNet", ref: "3(vi)", label: "(vi) Arrears / Unrealised Rent received Less 30%", type: "amount", required: false },
                { id: "simpTotalHousePropertyIncome", ref: "B3", label: "Income from House Property B3 (iii – iv – v + vi)", type: "amount", required: "auto", readOnly: true, notes: "Max loss ₹2 lakh; higher losses require ITR-3/5" }
              ]
            },
            schedule24bBorrowedCapital: {
              id: "schedule24bBorrowedCapital",
              label: "2.5 Schedule 24(b) — Interest on Borrowed Capital (Up to 5 Rows)",
              fields: [
                {
                  id: "loanRows24b",
                  label: "Borrowed Capital Loans Table",
                  type: "table",
                  required: false,
                  notes: "Can register up to 5 entries",
                  columns: [
                    { id: "slNo", label: "Sl. No.", type: "auto" },
                    { id: "loanTakenFrom", label: "Loan taken from (i)", type: "dropdown", required: true, options: ["Bank", "Institution", "Person"] },
                    { id: "ifscCode", label: "IFSC Code of Bank (iia)", type: "text", required: "conditional", notes: "Required if Bank; triggers automated bank name search" },
                    { id: "panOfLender", label: "PAN of Institution / Person (iib)", type: "text", required: "conditional" },
                    { id: "lenderName", label: "Name of Bank / Institution / Person (ii)", type: "text", required: true },
                    { id: "loanAccountNumber", label: "Loan Account Number (iii)", type: "text", required: true },
                    { id: "sanctionDate", label: "Date of Sanction of Loan (iv)", type: "date", required: true },
                    { id: "totalLoanAmount", label: "Total Amount of Loan (v)", type: "amount", required: true },
                    { id: "outstandingAmount", label: "Loan Outstanding at FY-end (vi)", type: "amount", required: true },
                    { id: "interestClaimed", label: "Interest u/s 24(b) (vii)", type: "amount", required: true }
                  ]
                },
                { id: "totalInterest24bSum", label: "Total Interest u/s 24(b)", type: "amount", required: "auto", readOnly: true, notes: "Sum of column (vii); capped at ₹2 lakh for self-occupied properties" }
              ]
            },
            detailedScheduleHP: {
              id: "detailedScheduleHP",
              label: "SECTION 3 — Schedule HP: Detailed Multi-Property Forms (Up to 2 Properties)",
              fields: [
                {
                  id: "propertiesScheduleHP",
                  label: "Properties Configuration (Property 1A & 1B)",
                  type: "complexArray",
                  notes: "Contains identical parallel schemas for up to two properties",
                  itemsSchema: [
                    { id: "hpAddress", label: "Address (full street address)", type: "text", required: true },
                    { id: "hpTownCity", label: "Town / City", type: "text", required: true },
                    { id: "hpState", label: "State", type: "dropdown", required: true, options: "37 states/UTs + Foreign" },
                    { id: "hpCountry", label: "Country", type: "dropdown", required: true, default: "91-INDIA" },
                    { id: "hpPinCode", label: "PIN Code", type: "text", required: "conditional", notes: "Indian configurations" },
                    { id: "hpZipCode", label: "ZIP Code", type: "text", required: "conditional", notes: "Foreign configurations" },
                    { id: "hpOwnerType", label: "Owner of the Property", type: "dropdown", required: true, options: ["Self", "Co-owner", "Deemed Owner"] },
                    { id: "hpIsCoOwned", label: "Is the property co-owned?", type: "dropdown", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                    { id: "hpSharePercentage", label: "Your percentage of share in the Property (%)", type: "number", required: true, validation: "0-100; max 2 decimal places" },
                    {
                      id: "hpCoOwnersTable",
                      label: "3.2 Co-Owner Details (Up to 10 rows per property)",
                      type: "table",
                      required: "conditional",
                      columns: [
                        { id: "slNo", label: "Sl. No.", type: "auto" },
                        { id: "name", label: "Name of Other Co-owner(s)", type: "text", required: true },
                        { id: "pan", label: "PAN of Other Co-owner(s)", type: "text", required: true },
                        { id: "aadhaar", label: "Aadhaar No. of Other Co-owner(s)", type: "text", required: false },
                        { id: "share", label: "Percentage share of other co-owner(s) (%)", type: "number", required: true }
                      ]
                    },
                    {
                      id: "hpTenantsTable",
                      label: "3.3 Tenant Details (Up to 4 rows per property)",
                      type: "table",
                      required: "conditional",
                      columns: [
                        { id: "name", label: "Name(s) of Tenant", type: "text", required: "conditional" },
                        { id: "pan", label: "PAN of Tenant", type: "text", required: "conditional", notes: "Mandatory if TDS u/s 194-I" },
                        { id: "aadhaar", label: "Aadhaar No. of Tenant", type: "text", required: false },
                        { id: "panTanClaimed", label: "PAN / TAN of Tenant (if TDS credit claimed)", type: "text", required: "conditional", notes: "Mandatory if TDS u/s 194-IB or 194-I credited" }
                      ]
                    },
                    { id: "hpTypeSelect", label: "Type of House Property", type: "dropdown", required: true, options: ["Self-Occupied", "Let Out", "Deemed Let Out"] },
                    { id: "row_a_grossRent", ref: "a", label: "a. Gross rent received / receivable / lettable value", type: "amount", required: "conditional" },
                    { id: "row_b_unrealizedRent", ref: "b", label: "b. Amount of rent which cannot be realized", type: "amount", required: false },
                    { id: "row_c_localTaxes", ref: "c", label: "c. Tax paid to local authorities", type: "amount", required: false },
                    { id: "row_d_totalDeduction", ref: "d", label: "d. Total (b + c)", type: "amount", required: "auto", readOnly: true },
                    { id: "row_e_annualValue", ref: "e", label: "e. Annual Value (a – d); nil if self-occupied", type: "amount", required: "auto", readOnly: true },
                    { id: "row_f_sharedAnnualValue", ref: "f", label: "f. Annual Value of property owned (% share × e)", type: "amount", required: "auto", readOnly: true },
                    { id: "row_g_stdDeduction", ref: "g", label: "g. 30% of f (Standard Deduction)", type: "amount", required: "auto", readOnly: true },
                    { id: "row_h_interestBorrowed", ref: "h", label: "h. Interest on borrowed capital u/s 24(b)", type: "amount", required: "auto", readOnly: true },
                    { id: "row_i_totalDeductionsSum", ref: "i", label: "i. Total (g + h)", type: "amount", required: "auto", readOnly: true },
                    { id: "row_j_arrearsRentNet", ref: "j", label: "j. Arrears / Unrealised Rent received Less 30%", type: "amount", required: false },
                    { id: "row_k_propertyIncomeFinal", ref: "k", label: "k. Income from House Property (f – i + j)", type: "amount", required: "auto", readOnly: true },
                    {
                      id: "hpSpecificLoanTable",
                      label: "3.5 Section 24(b) Loan Table — per Property (Up to 5 rows)",
                      type: "table",
                      required: false,
                      columns: [
                        { id: "slNo", label: "Sl. No.", type: "auto" },
                        { id: "loanFrom", label: "Loan taken from (i)", type: "dropdown", required: true, options: ["Bank", "Institution", "Person"] },
                        { id: "lenderName", label: "Name of Bank / Institution / Person (ii)", type: "text", required: true },
                        { id: "loanAccNo", label: "Loan Account Number (iii)", type: "text", required: true },
                        { id: "sanctionDate", label: "Date of Sanction of Loan (iv)", type: "date", required: true },
                        { id: "loanAmt", label: "Total Amount of Loan (v)", type: "amount", required: true },
                        { id: "outstandingAmt", label: "Loan Outstanding at FY-end (vi)", type: "amount", required: true },
                        { id: "interestAmt", label: "Interest on Borrowed Capital u/s 24(b) (vii)", type: "amount", required: true }
                      ]
                    },
                    { id: "hpSpecificLoanTotal", label: "Total Interest u/s 24(b) for Property", type: "amount", required: "auto", readOnly: true }
                  ]
                },
                { id: "passThroughIncomeHP", label: "Pass Through Income/Loss (PTI) from Investment Fund", type: "amount", required: false },
                { id: "consolidatedHPScheduleIncome", ref: "B3", label: "Consolidated Total HP Income (Σ1k + PTI)", type: "amount", required: "auto", readOnly: true }
              ]
            }
          }
        },
        otherSourcesAndGtiSummary: {
          id: "otherSourcesAndGtiSummary",
          label: "Other Sources Breakdowns & Gross Total Income Verification",
          fieldSections: {
            incomeFromOtherSources: {
              id: "incomeFromOtherSources",
              label: "2.6 B4 — Income from Other Sources",
              fields: [
                {
                  id: "osRow1Nature",
                  label: "Row 1: Nature of Income",
                  type: "dropdown",
                  required: false,
                  options: [
                    "Interest from Savings Bank", "Interest from Deposits", "Interest from IT Refund",
                    "Family Pension", "Dividend", "Income from retirement benefit account (notified country)",
                    "Income from retirement benefit account (non-notified country)", "Winnings from lotteries etc.", "Any Other"
                  ]
                },
                { id: "osRow1Description", label: "Row 1: Description (if 'Any Other' selected)", type: "text", required: "conditional" },
                { id: "osRow1Amount", label: "Row 1: Amount", type: "amount", required: false },
                { id: "osRow2Nature", label: "Row 2: Nature of Income (same dropdown options)", type: "dropdown", required: false },
                { id: "osRow2Description", label: "Row 2: Description", type: "text", required: "conditional" },
                { id: "osRow2Amount", label: "Row 2: Amount", type: "amount", required: false },
                { id: "osRetirementBenefitNonNotified", label: "Income from retirement benefit — Non-Notified Country u/s 89A", type: "amount", required: false },
                { id: "osRetirementBenefitNotifiedRows", label: "Income from retirement benefit — Notified Country (USA + UK + Canada)", type: "amount", required: false, notes: "3 sub-rows configured with auto-total computations" },
                { id: "osReliefClaimed89A", label: "Less: Income claimed for relief u/s 89A", type: "amount", required: "auto", readOnly: true },
                { id: "osFamilyPensionDeduction57_iia", label: "Less: Deduction u/s 57(iia) — family pension only", type: "amount", required: false, notes: "1/3 of pension or ₹25,000 whichever lower" },
                { id: "osTotalChargeableIncome", ref: "B4", label: "Total B4 — Income from Other Sources", type: "amount", required: "auto", readOnly: true }
              ]
            },
            quarterlyDividendBreakup234C: {
              id: "quarterlyDividendBreakup234C",
              label: "2.6.1 Quarterly Breakup of Dividend / Other Sources (Interest 234C Computation)",
              fields: [
                {
                  id: "quarterlyBreakupGrid",
                  label: "Quarterly Distribution Matrix",
                  type: "grid",
                  columns: ["Quarter 1 (≤15-Jun-25)", "Quarter 2 (16-Jun–15-Sep-25)", "Quarter 3 (16-Sep–15-Dec-25)", "Quarter 4 (16-Dec–15-Mar-26)", "Quarter 5 (16-Mar–31-Mar-26)"],
                  rows: [
                    { id: "breakupRetirementBenefit", label: "Retirement Benefit Income", type: "amount" },
                    { id: "breakupDividendIncome", label: "Dividend Income", type: "amount" }
                  ]
                }
              ]
            },
            reportingCapitalGains112A: {
              id: "reportingCapitalGains112A",
              label: "2.7 D20(a) — LTCG u/s 112A (Reporting Only)",
              fields: [
                { id: "ltcg112aSaleConsideration", label: "Total Sale Consideration", type: "amount", required: false, notes: "LTCG u/s 112A ≤ ₹1.25 lakh only; higher values necessitate shifting to ITR-2/3" },
                { id: "ltcg112aCostAcquisition", label: "Total Cost of Acquisition", type: "amount", required: false },
                { id: "ltcg112aNetComputedGains", label: "Long-Term Capital Gains u/s 112A", type: "amount", required: "auto", readOnly: true, validation: "Must not exceed ₹1,25,000" }
              ]
            },
            grossTotalIncomeSummary: {
              id: "grossTotalIncomeSummary",
              label: "2.8 B5 — Gross Total Income Summary Block",
              fields: [
                { id: "grossTotalIncomeFinal", ref: "B5", label: "Gross Total Income (B1 + B2(v) + B3 + B4 + D20a(iii))", type: "amount", required: "auto", readOnly: true }
              ]
            }
          }
        }
      }
    },
    scheduleBPPresumptiveIncome: {
      id: "scheduleBPPresumptiveIncome",
      //   label: "SECTION 4 & 5 — Schedule BP: Presumptive Business & Profession", 
      subsections: {
        presumptiveSchemesCore: {
          id: "presumptiveSchemesCore",
          label: "Core Declarations & Schemes (44AD / 44ADA / 44AE)",
          fieldSections: {
            natureOfBusinessHeader: {
              id: "natureOfBusinessHeader",
              label: "4.1 Nature of Business — Activity Headers (Up to 3 Activities)",
              fields: [
                {
                  id: "businessActivitiesHeaderTable",
                  label: "Business Activity List",
                  type: "table",
                  required: false,
                  columns: [
                    { id: "slNo", label: "Sl. No.", type: "auto" },
                    { id: "activityCode", label: "Code", type: "dropdown", required: true, options: "0101-Agro-based to 1001-Other Sector" },
                    { id: "tradeName", label: "Trade Name", type: "text", required: false, notes: "Name of proprietorship/trade" },
                    { id: "activityDescription", label: "Description", type: "text", required: "auto", readOnly: true }
                  ]
                }
              ]
            },
            section44ADBusinessIncome: {
              id: "section44ADBusinessIncome",
              label: "4.2 & 4.2.1 Section 44AD — Presumptive Business Income (Up to 5 Businesses)",
              fields: [
                {
                  id: "businesses44ADList",
                  label: "44AD Registered Operations",
                  type: "complexArray",
                  notes: "Repeats for up to 5 business entries",
                  itemsSchema: [
                    { id: "name44AD", label: "Business Name", type: "text", required: true },
                    { id: "code44AD", label: "Business Code", type: "dropdown", required: true },
                    { id: "desc44AD", label: "Description", type: "text", required: false },
                    { id: "turnoverE1", ref: "E1", label: "E1. Gross Turnover or Gross Receipts", type: "amount", required: true, validation: "Normal threshold ₹2 Cr; expands to ₹3 Cr if cash ≤ 5%" },
                    { id: "receiptsBankE1a", ref: "E1a", label: "(a) Receipts via bank modes / prescribed electronic channels", type: "amount", required: true },
                    { id: "receiptsCashE1b", ref: "E1b", label: "(b) Receipts in Cash", type: "amount", required: true },
                    { id: "receiptsOtherE1c", ref: "E1c", label: "(c) Any other mode (other than a and b)", type: "amount", required: true },
                    { id: "cashThresholdCheck", label: "5% of E1 (threshold check)", type: "amount", required: "auto", readOnly: true },
                    { id: "claimedIncomeDigitalE2a", ref: "E2a", label: "E2(a). 6% of E1a — or amount claimed if higher (digital receipts)", type: "amount", required: true, validation: "Must be ≥ 6% of E1a" },
                    { id: "claimedIncomeCashE2b", ref: "E2b", label: "E2(b). 8% of (E1b+E1c) — or amount claimed if higher (cash/other)", type: "amount", required: true, validation: "Must be ≥ 8% of (E1b+E1c)" },
                    { id: "totalPresumptiveIncome44AD", ref: "E2c", label: "E2(c). Total Presumptive Income 44AD = E2a + E2b", type: "amount", required: "auto", readOnly: true }
                  ]
                }
              ]
            },
            section44ADAProfessionalIncome: {
              id: "section44ADAProfessionalIncome",
              label: "4.3 & 4.3.1 Section 44ADA — Presumptive Professional Income (Up to 6 Professions)",
              fields: [
                {
                  id: "professions44ADAList",
                  label: "44ADA Registered Operations",
                  type: "complexArray",
                  notes: "Repeats for up to 6 profession entries",
                  itemsSchema: [
                    { id: "name44ADA", label: "Profession Name", type: "text", required: true },
                    { id: "code44ADA", label: "Business Code", type: "dropdown", required: true },
                    { id: "desc44ADA", label: "Description", type: "text", required: false },
                    { id: "receiptsE3", ref: "E3", label: "E3. Gross Receipts", type: "amount", required: true, validation: "Normal threshold ₹50 lakh; expands to ₹75 lakh if cash ≤ 5%" },
                    { id: "receiptsElecE3a", ref: "E3a", label: "(a) Receipts via prescribed electronic modes", type: "amount", required: true },
                    { id: "receiptsCashE3b", ref: "E3b", label: "(b) Receipts in Cash", type: "amount", required: true },
                    { id: "receiptsOtherE3c", ref: "E3c", label: "(c) Any other mode", type: "amount", required: true },
                    { id: "cashThresholdCheckADA", label: "5% of E3 (threshold check)", type: "amount", required: "auto", readOnly: true },
                    { id: "presumptiveIncome44ADA", ref: "E4", label: "E4. Presumptive Income 44ADA = 50% of E3 — or amount claimed if higher", type: "amount", required: true, validation: "Must be ≥ 50% of E3" }
                  ]
                }
              ]
            },
            section44AEGoodsCarriageVehicles: {
              id: "section44AEGoodsCarriageVehicles",
              label: "4.4 & 4.4.1 Section 44AE — Presumptive Income from Goods Carriages (Up to 10 Vehicles)",
              fields: [
                {
                  id: "goodsCarriage44AEList",
                  label: "44AE Business Registrations",
                  type: "complexArray",
                  notes: "Supports up to 5 parallel businesses managing vehicles",
                  itemsSchema: [
                    { id: "businessName44AE", label: "Business Name", type: "text", required: true },
                    { id: "businessCode44AE", label: "Business Code", type: "dropdown", required: true },
                    {
                      id: "vehicles44AETable",
                      label: "Vehicle-wise Computation Table (Up to 10 rows total)",
                      type: "table",
                      required: true,
                      columns: [
                        { id: "slNo", label: "Sl. No.", type: "auto" },
                        { id: "registrationNo", label: "Registration No. of Goods Carriage", type: "text", required: true },
                        { id: "holdingType", label: "Whether Owned / Leased / Hired", type: "dropdown", required: true, options: ["Owned", "Leased", "Hired"] },
                        { id: "tonnageCapacity", label: "Tonnage Capacity (in MT — Metric Tonnes)", type: "number", required: true, notes: "Determines internal rate logic: ≤12 MT → ₹7,500/mo; >12 MT → ₹1,000/ton/mo" },
                        { id: "monthsHeld", label: "No. of months owned/leased/hired by assessee", type: "number", required: true, validation: "Range 1-12" },
                        { id: "computedIncomeVehicle", label: "Presumptive Income u/s 44AE (auto per vehicle)", type: "amount", required: "auto", readOnly: true }
                      ]
                    }
                  ]
                },
                { id: "totalPresumptiveIncome44AE", ref: "E5", label: "E5. Total Presumptive Income from Goods Carriages", type: "amount", required: "auto", readOnly: true }
              ]
            }
          }
        },
        financialsAndTurnoverReconciliation: {
          id: "financialsAndTurnoverReconciliation",
          label: "Financial Particulars & External Reconciliation Sheets",
          fieldSections: {
            partnerDeductionsAndBPSummary: {
              id: "partnerDeductionsAndBPSummary",
              label: "4.5 & 4.6 Partner Adjustments & Summary of Schedule BP",
              fields: [
                { id: "partnerSalaryInterestPaid", ref: "E6", label: "E6 (for 44AD firms). Salary and interest paid to partners", type: "amount", required: false, notes: "Firm only; disabled for Individuals/HUFs" },
                { id: "netIncome44AE", ref: "E7", label: "E7. Presumptive Income 44AE (E5 – E6)", type: "amount", required: "auto", readOnly: true },
                { id: "finalChargeableBPSummary", ref: "E8", label: "E8. Income chargeable under Business or Profession (E2c + E4 + E7)", type: "amount", required: "auto", readOnly: true, notes: "Feeds directly into Part B1 of Income Details" }
              ]
            },
            gstInformationSupplies: {
              id: "gstInformationSupplies",
              label: "4.7 GST Information — E9 (Up to 5 rows)",
              fields: [
                {
                  id: "gstSupplyRegistrationsTable",
                  label: "GSTIN Turnovers Mapping Table",
                  type: "table",
                  required: false,
                  columns: [
                    { id: "gstinNumber", label: "GSTIN No.", type: "text", validation: "15-char alphanumeric block" },
                    { id: "outwardSuppliesValue", label: "Annual Value of Outward Supplies as per GST Return Filed", type: "amount" }
                  ]
                }
              ]
            },
            turnoverReconciliationE10: {
              id: "turnoverReconciliationE10",
              label: "4.8 Turnover Reconciliation — E10",
              fields: [
                { id: "totalOutwardSuppliesGST", ref: "E10", label: "Total of Outward Supplies per GST returns", type: "amount", required: "auto", readOnly: true, notes: "Sum of GST turnover column" },
                {
                  id: "gstAdjustmentItemsTable",
                  ref: "b",
                  label: "Adjustment items (Up to 4 rows)",
                  type: "table",
                  required: false,
                  columns: [
                    { id: "nature", label: "Nature", type: "dropdown", options: ["Exempt supplies", "Zero-rated", "Exports", "Any Other"] },
                    { id: "description", label: "Description", type: "text" },
                    { id: "amount", label: "Amount", type: "amount" }
                  ]
                },
                { id: "grossTurnoverReconciliationCheck", ref: "c", label: "Gross Turnover as per E1 or E3", type: "amount", required: "auto", readOnly: true, notes: "Cross-checks declaration integrity" }
              ]
            },
            financialParticularsBusiness: {
              id: "financialParticularsBusiness",
              label: "4.9 Financial Particulars of Business (As on 31 March 2026)",
              fields: [
                { id: "finPartnersCapital", ref: "E11", label: "E11. Partners / Members Own Capital", type: "amount", required: false },
                { id: "finSecuredLoans", ref: "E12", label: "E12. Secured Loans", type: "amount", required: false },
                { id: "finUnsecuredLoans", ref: "E13", label: "E13. Unsecured Loans", type: "amount", required: false },
                { id: "finAdvances", ref: "E14", label: "E14. Advances", type: "amount", required: false },
                { id: "finSundryCreditors", ref: "E15", label: "E15. Sundry Creditors", type: "amount", required: true },
                { id: "finOtherLiabilities", ref: "E16", label: "E16. Other Liabilities", type: "amount", required: false },
                { id: "finTotalCapitalLiabilities", ref: "E17", label: "E17. Total Capital & Liabilities (E11+E12+E13+E14+E15+E16)", type: "amount", required: "auto", readOnly: true },
                { id: "finFixedAssets", ref: "E18", label: "E18. Fixed Assets", type: "amount", required: false },
                { id: "finInvestments", ref: "E18(a)", label: "E18(a). Investments", type: "amount", required: false },
                { id: "finInventories", ref: "E19", label: "E19. Inventories", type: "amount", required: true },
                { id: "finSundryDebtors", ref: "E20", label: "E20. Sundry Debtors", type: "amount", required: true },
                { id: "finBankBalance", ref: "E21", label: "E21. Balance with Banks", type: "amount", required: true },
                { id: "finCashInHand", ref: "E22", label: "E22. Cash-in-Hand", type: "amount", required: true },
                { id: "finLoansAdvancesGiven", ref: "E23", label: "E23. Loans and Advances Given", type: "amount", required: false },
                { id: "finOtherAssets", ref: "E24", label: "E24. Other Assets", type: "amount", required: false },
                { id: "finTotalAssets", ref: "E25", label: "E25. Total Assets (E18+E18a+E19+E20+E21+E22+E23+E24)", type: "amount", required: "auto", readOnly: true }
              ]
            },
            simpleGoodsCarriageCalculator: {
              id: "simpleGoodsCarriageCalculator",
              label: "SECTION 5 — Schedule 44AE: Simple Alternate Vehicle Income Calculator (Up to 10 Rows)",
              fields: [
                {
                  id: "simple44AECalculatorTable",
                  label: "Simplified Vehicle Breakdown Rows",
                  type: "table",
                  required: false,
                  columns: [
                    { id: "slNo", ref: "A", label: "Sl. No.", type: "auto" },
                    { id: "periodOfHolding", ref: "B", label: "Period of Holding (in months)", type: "number", required: true, validation: "Range 1-12" },
                    { id: "incomePerVehicleMonth", ref: "C", label: "Income per Vehicle ₹/month", type: "amount", required: true, validation: "System enforces and validates minimum ≥ ₹7,500" },
                    { id: "deemedVehicleIncome", label: "Deemed Income = (B) × (C)", type: "amount", required: "auto", readOnly: true }
                  ]
                },
                { id: "simple44AETotalIncome", label: "Total Presumptive Income From Goods Carriage (Simple Form Summary)", type: "amount", required: "auto", readOnly: true }
              ]
            }
          }
        }
      }
    },
    scheduleDeductionsVIAAndPayments: {
      id: "scheduleDeductionsVIAAndPayments",
      //   label: "SECTION 6 & 8 — Deductions & Tax Payments Schedules", 
      subsections: {
        chapterVIAAndPaymentsDirectives: {
          id: "chapterVIAAndPaymentsDirectives",
          label: "Chapter VI-A Deductions (Old Regime Only) & Paid Tax Credits",
          fieldSections: {
            partBDeductionsPayments: {
              id: "partBDeductionsPayments",
              label: "6.1 Part B Deductions — Payments & Savings Tables",
              fields: [
                {
                  id: "deductionRowsTable",
                  label: "Chapter VI-A Core Savings Schedules",
                  type: "table",
                  required: false,
                  notes: "Available ONLY in Old Tax Regime. Globally disabled/hidden under standard New Tax Regime rules.",
                  columns: [
                    { id: "code", label: "Code", type: "text", readOnly: true },
                    { id: "section", label: "Section", type: "text", readOnly: true },
                    { id: "description", label: "Description", type: "text", readOnly: true },
                    { id: "type", label: "Type / Execution Mode", type: "text", readOnly: true },
                    { id: "claimedAmount", label: "Claimed Amount (₹)", type: "amount" }
                  ],
                  rows: [
                    { code: "C1", section: "80C", description: "Life insurance / PF / ELSS / home loan principal / tuition fee", type: "Sub-table (Max ₹1,50,000 combined 80C+80CCC+80CCD(1))" },
                    { code: "C2", section: "80CCC", description: "Pension Fund payment", type: "Sub-table (Part of combined ₹1,50,000 limit)" },
                    { code: "C3", section: "80CCD(1)", description: "Employee contribution to NPS", type: "Amount input (Part of combined ₹1,50,000 limit)" },
                    { code: "C4", section: "80CCD(1B)", description: "Additional voluntary contribution to NPS", type: "Amount input (Max limit ₹50,000; independent of 80C pool)" },
                    { code: "C5", section: "80CCD(2)", description: "Employer contribution to NPS", type: "Amount input (Capped based on Salary rules; open under New Regime rules)" },
                    { code: "C6", section: "80CCH", description: "Contribution to Agniveer Corpus Fund", type: "Amount input" }
                  ]
                },
                {
                  id: "schedule80CAnd80CCCDetailedTable",
                  label: "Schedule 80C / 80CCC Detailed Entry Component (Expanded Sub-Form)",
                  type: "table",
                  required: false,
                  columns: [
                    { id: "slNo", label: "Sl. No.", type: "auto" },
                    { id: "nature80C_insurer80CCC", label: "Nature of Payment (80C) / Name of Insurer (80CCC)", type: "text", required: true },
                    { id: "eligibleAmt80C_policyDoc80CCC", label: "Amount eligible for deduction u/s 80C / Policy document no. (80CCC)", type: "mixed", required: true },
                    { id: "policyNo80C_deduction80CCC", label: "Policy Number or Document Identification Number (80C) / Deduction u/s 80CCC", type: "mixed", required: true }
                  ]
                }
              ]
            },
            section80DHealthInsurance: {
              id: "section80DHealthInsurance",
              label: "Schedule 80D — Medical Insurance Premia Breakdowns",
              fields: [
                { id: "isFamilySeniorCitizen", label: "1. Are any family members (excl. parents) or HUF members senior citizens?", type: "dropdown", required: true, options: ["Not Claiming for Self/Family", "Yes", "No"] },
                {
                  id: "table80dSelfFamilyStandard",
                  label: "a. Self & Family — Health Insurance (Up to 4 rows)",
                  type: "table",
                  required: false,
                  columns: [{ id: "insurer", label: "Insurer Name" }, { id: "policyNo", label: "Policy No." }, { id: "receiptNo", label: "Receipt No." }, { id: "amount", label: "Amount" }],
                  notes: "Includes standalone field: Preventive Health Checkup Amount"
                },
                {
                  id: "table80dSelfFamilySenior",
                  label: "b. Self & Family Including Senior Citizen — Health Insurance (4 rows)",
                  type: "table",
                  required: false,
                  columns: [{ id: "insurer", label: "Insurer Name" }, { id: "policyNo", label: "Policy No." }, { id: "receiptNo", label: "Receipt No." }, { id: "amount", label: "Amount" }, { id: "medicalExp", label: "Medical Expenditure (if no insurance)" }]
                },
                { id: "isParentsSeniorCitizen", label: "2. Are any parents senior citizens?", type: "dropdown", required: true, options: ["Not claiming for Parents", "Yes", "No"] },
                {
                  id: "table80dParentsStandard",
                  label: "a. Parents — Health Insurance (4 rows)",
                  type: "table",
                  required: false,
                  columns: [{ id: "insurer", label: "Insurer Name" }, { id: "policyNo", label: "Policy No." }, { id: "receiptNo", label: "Receipt No." }, { id: "amount", label: "Amount" }],
                  notes: "Includes standalone field: Preventive Health Checkup Amount"
                },
                {
                  id: "table80dParentsSenior",
                  label: "b. Parents Including Senior Citizen (4 rows)",
                  type: "table",
                  required: false,
                  columns: [{ id: "insurer", label: "Insurer Name" }, { id: "policyNo", label: "Policy No." }, { id: "receiptNo", label: "Receipt No." }, { id: "amount", label: "Amount" }, { id: "medicalExp", label: "Medical Expenditure (if no insurance)" }]
                },
                { id: "eligibleAmount80DTotal", label: "3. Eligible Amount of Deduction", type: "amount", required: "auto", readOnly: true, notes: "Automated calculation adhering to elder age brackets and caps" }
              ]
            },
            schedule80EDeductionsLoans: {
              id: "schedule80EDeductionsLoans",
              label: "Schedule 80E / 80EE / 80EEA / 80EEB — Interest Claims on Educational, Housing & Vehicle Loans",
              fields: [
                { id: "valueResidentialHP_80EE", label: "80EE only: Value of residential HP (₹)", type: "amount", required: "conditional", notes: "Header-level input element sitting above table" },
                { id: "stampValueResidentialHP_80EEA", label: "80EEA only: Stamp Value of residential HP (₹)", type: "amount", required: "conditional", notes: "Header-level input element sitting above table" },
                {
                  id: "interestLoansTable",
                  label: "Loan Interest Tracking Matrix",
                  type: "table",
                  required: false,
                  columns: [
                    { id: "slNo", label: "Sl. No.", type: "auto" },
                    { id: "loanTakenFrom", label: "Loan taken from (i)", type: "dropdown", required: true, options: ["Bank", "Institution", "Person"] },
                    { id: "ifscOfBank", label: "IFSC of Bank (iia)", type: "text", required: "conditional" },
                    { id: "panOfInstitution", label: "PAN of Institution (iib)", type: "text", required: "conditional" },
                    { id: "nameOfBankInstitution", label: "Name of Bank / Institution (ii)", type: "text", required: true },
                    { id: "loanAccNum", label: "Loan Account Number (iii)", type: "text", required: true },
                    { id: "sanctionDate", label: "Date of Sanction (iv)", type: "date", required: true },
                    { id: "totalAmountLoan", label: "Total Amount of Loan (v)", type: "amount", required: true },
                    { id: "outstandingLoanEnd", label: "Loan Outstanding at FY-end (vi)", type: "amount", required: true },
                    { id: "interestPaidAmount", label: "Interest u/s 80E / 80EE / 80EEA / 80EEB (vii)", type: "amount", required: true },
                    { id: "vehicleRegNo_80EEB", label: "80EEB only: Vehicle Registration Number (viii)", type: "text", required: "conditional", notes: "Positioned conditionally between outstanding and interest headers" }
                  ]
                }
              ]
            }
          }
        },
        exemptIncomesAndOtherDeductions: {
          id: "exemptIncomesAndOtherDeductions",
          label: "Other Deductions & Exempt Incomes",
          fieldSections: {
            exemptIncomeReporting: {
              id: "exemptIncomeReporting",
              label: "SECTION 9 — Schedule EI: Exempt Income Sourced Reporting Only",
              fields: [
                { id: "exAgriculturalIncome", label: "Agricultural Income (Net; limit ≤ ₹5,000)", type: "amount", required: false },
                { id: "exOtherExemptIncome", label: "Other Exempt Income (Dropdown Selection + Amount)", type: "mixed", required: false, notes: "Populates into separate row blocks" }
              ]
            },
            section80DDependentDisability: {
              id: "section80DDependentDisability",
              label: "Schedule 80DD — Maintenance & Medical Treatment of Dependent with Disability",
              fields: [
                {
                  id: "schedule80DDEntriesTable",
                  label: "80DD Dependent Registry",
                  type: "table",
                  required: false,
                  columns: [
                    { id: "slNo", label: "Sl. No.", type: "auto" },
                    { id: "natureOfDisability", label: "Nature of Disability (ia)", type: "dropdown", required: true, options: ["Blindness", "Low Vision", "Hearing Impairment", "Loco Motor", "Mental Retardation", "Mental Illness", "Autism", "Cerebral Palsy", "Multiple Disability (incl. blindness/CP/autism)"] },
                    { id: "typeOfDisability", label: "Type of Disability (ib)", type: "dropdown", required: true, options: ["Dementia", "Dystonia", "Motor Neuron Disease", "Ataxia", "Chorea", "Hemiballismus", "Aphasia", "Parkinson's", "Malignant Cancer", "AIDS", "Chronic Renal Failure", "Haematological", "Haemophilia", "Thalassaemia"] },
                    { id: "amtDeduction", label: "Amount of Deduction (ii)", type: "amount", required: "auto", readOnly: true, notes: "Flat ₹75,000 for standard or ₹1,25,000 for severe disability" },
                    { id: "typeOfDependent", label: "Type of Dependent (iii)", type: "dropdown", required: true, options: ["1-Dependent person with disability", "2-Dependent person with severe disability"] },
                    { id: "panDependent", label: "PAN of the Dependent (iv)", type: "text", required: false },
                    { id: "aadhaarDependent", label: "Aadhaar of the Dependent (v)", type: "text", required: false },
                    { id: "ackForm10IA", label: "Acknowledgement Number of Form 10IA (vi)", type: "text", required: true },
                    { id: "udidNumber", label: "UDID Number (vii)", type: "text", required: false, notes: "Unique Disability ID" }
                  ]
                }
              ]
            },
            section80UIndividualDisability: {
              id: "section80UIndividualDisability",
              label: "Schedule 80U — Deduction in Case of a Person with Disability (Self)",
              fields: [
                {
                  id: "schedule80UEntriesTable",
                  label: "80U Self Declaration Parameters",
                  type: "table",
                  required: false,
                  columns: [
                    { id: "natureOfDisabilitySelf", label: "Nature of Disability (ia)", type: "dropdown", required: true },
                    { id: "typeOfDisabilitySelf", label: "Type of Disability (ib)", type: "dropdown", required: true },
                    { id: "amtDeductionSelf", label: "Amount of Deduction (ii)", type: "amount", required: "auto", readOnly: true },
                    { id: "ackForm10IASelf", label: "Acknowledgement Number of Form 10IA (iii)", type: "text", required: true },
                    { id: "udidNumberSelf", label: "UDID Number (iv)", type: "text", required: false }
                  ]
                }
              ]
            }
          }
        },
        taxPaymentsTdsTcs: {
          id: "taxPaymentsTdsTcs",
          label: "Tax Deducted / Collected at Source",
          fieldSections: {
            tdsTcsCreditRecords: {
              id: "tdsTcsCreditRecords",
              label: "Schedule TDS & TCS: Paid Credits Records",
              fields: [
                {
                  id: "scheduleTDS1Salary",
                  label: "Schedule TDS1: Tax Deducted at Source on Salary Income",
                  type: "table",
                  required: false,
                  columns: [{ id: "tanOfEmployer", label: "TAN of Employer" }, { id: "nameOfEmployer", label: "Name of Employer" }, { id: "incomeChargeableSalary", label: "Income Chargeable under Salaries" }, { id: "totalTdsDeducted", label: "Total TDS Deducted" }]
                },
                {
                  id: "scheduleTDS2iOtherThanSalary",
                  label: "Schedule TDS2(i): TDS on Income Other Than Salary (Form 16A Sourced)",
                  type: "table",
                  required: false,
                  columns: [{ id: "tanOfDeductor", label: "TAN of Deductor" }, { id: "nameOfDeductor", label: "Name of Deductor" }, { id: "uniquetdsCertificate", label: "Unique TDS Certificate Number" }, { id: "financialYearDeduction", label: "Financial Year of Deduction" }, { id: "totalTdsDeducted", label: "Total TDS Deducted" }, { id: "tdsCreditClaimedCurrentYear", label: "TDS Credit Claimed Current Year" }]
                },
                {
                  id: "scheduleTDS2iiRealEstateSale",
                  label: "Schedule TDS2(ii): TDS on Sale of Real Estate / Rent (Form 16B/16C Sourced)",
                  type: "table",
                  required: false,
                  columns: [{ id: "panOfDeductor", label: "PAN of Deductor/Buyer/Tenant" }, { id: "nameOfDeductor", label: "Name of Deductor" }, { id: "uniquetdsCertificate", label: "Unique TDS Certificate Number" }, { id: "financialYearDeduction", label: "Financial Year of Deduction" }, { id: "totalTdsDeducted", label: "Total TDS Deducted" }, { id: "tdsCreditClaimedCurrentYear", label: "TDS Credit Claimed Current Year" }]
                },
                {
                  id: "scheduleTCSCollected",
                  label: "Schedule TCS: Tax Collected at Source (Form 27D Sourced)",
                  type: "table",
                  required: false,
                  columns: [{ id: "tanOfCollector", label: "TAN of Collector" }, { id: "nameOfCollector", label: "Name of Collector" }, { id: "totalTcsCollected", label: "Total TCS Collected" }, { id: "tcsCreditClaimedCurrentYear", label: "TCS Credit Claimed Current Year" }]
                }
              ]
            }
          }
        },
        taxPaymentsAdvanceTax: {
          id: "taxPaymentsAdvanceTax",
          label: "Advance Tax & Self Assessment Tax",
          fieldSections: {
            advanceTaxDeposits: {
              id: "advanceTaxDeposits",
              label: "Schedule IT: Advance Tax & Self-Assessment Tax Payments",
              fields: [
                {
                  id: "scheduleITAdvanceSelfAssessment",
                  label: "Challan Deposits Matrix",
                  type: "table",
                  required: false,
                  columns: [{ id: "bsrCode", label: "BSR Code" }, { id: "dateOfDeposit", label: "Date of Deposit" }, { id: "challanNo", label: "Challan Serial Number" }, { id: "taxPaidAmount", label: "Tax Paid Amount (₹)" }]
                }
              ]
            }
          }
        }
      }
    },
    taxComputationAndVerification: {
      id: "taxComputationAndVerification",
      //   label: "SECTION 7, 9, 10, 11, 12 & 13 — Computations, Verifications & Disclosures",
      subsections: {
        taxCalculationsAndBanking: {
          id: "taxCalculationsAndBanking",
          label: "Consolidated Computation Dashboard & Account Verification",
          fieldSections: {
            partD_TaxComputationDashboard: {
              id: "partD_TaxComputationDashboard",
              label: "SECTION 7 — Part D: Tax Computation Summary Card View",
              fields: [
                { id: "calcGrossTotalIncome", ref: "D1", label: "Gross Total Income", type: "amount", required: "auto", readOnly: true },
                { id: "calcChapterVIADeductions", ref: "D2", label: "Total Deductions under Chapter VI-A", type: "amount", required: "auto", readOnly: true },
                { id: "calcTotalTaxableIncome", ref: "D3", label: "Total Taxable Income (D1 - D2)", type: "amount", required: "auto", readOnly: true },
                { id: "calcTaxNormalRates", ref: "D4", label: "Tax Computed at Normal Rates", type: "amount", required: "auto", readOnly: true },
                { id: "calcTaxSpecialRates", ref: "D5", label: "Tax Computed at Special Rates", type: "amount", required: "auto", readOnly: true },
                { id: "calcRebateSec87A", ref: "D6", label: "Rebate u/s 87A", type: "amount", required: "auto", readOnly: true },
                { id: "calcTaxAfterRebate", ref: "D7", label: "Tax Payable after Rebate (D4 + D5 - D6)", type: "amount", required: "auto", readOnly: true },
                { id: "calcSurcharge", ref: "D8", label: "Surcharge", type: "amount", required: "auto", readOnly: true },
                { id: "calcEducationCess", ref: "D9", label: "Health and Education Cess @ 4%", type: "amount", required: "auto", readOnly: true },
                { id: "calcGrossTaxLiability", ref: "D10", label: "Gross Tax Liability (D7 + D8 + D9)", type: "amount", required: "auto", readOnly: true },
                { id: "calcReliefSec89", ref: "D11", label: "Relief u/s 89", type: "amount", required: false },
                { id: "calcNetTaxLiability", ref: "D12", label: "Net Tax Liability (D10 - D11)", type: "amount", required: "auto", readOnly: true },
                { id: "calcInterest234A", label: "Interest u/s 234A", type: "amount", required: "auto", readOnly: true },
                { id: "calcInterest234B", label: "Interest u/s 234B", type: "amount", required: "auto", readOnly: true },
                { id: "calcInterest234C", label: "Interest u/s 234C", type: "amount", required: "auto", readOnly: true },
                { id: "calcFee234F", label: "Late Filing Fee u/s 234F", type: "amount", required: "auto", readOnly: true },
                { id: "calcTotalTaxInterestLiability", ref: "D12_Total", label: "Total Tax, Interest and Fee Liability", type: "amount", required: "auto", readOnly: true },
                { id: "paidAdvanceTax", ref: "D13", label: "Total Advance Tax Paid", type: "amount", required: "auto", readOnly: true },
                { id: "paidSelfAssessmentTax", ref: "D14", label: "Total Self-Assessment Tax Paid", type: "amount", required: "auto", readOnly: true },
                { id: "claimedTotalTDS", ref: "D15", label: "Total TDS Claimed Sourced", type: "amount", required: "auto", readOnly: true },
                { id: "claimedTotalTCS", ref: "D16", label: "Total TCS Collected Sourced", type: "amount", required: "auto", readOnly: true },
                { id: "paidTaxesAggregate", ref: "D17", label: "Total Taxes Paid (D13+D14+D15+D16)", type: "amount", required: "auto", readOnly: true },
                { id: "finalAmountPayable", ref: "D18", label: "Amount Payable (D12_Total – D17; if D12_Total > D17)", type: "amount", required: "auto", readOnly: true },
                { id: "finalRefundDue", ref: "D19", label: "Refund (D17 – D12_Total; if D17 > D12_Total)", type: "amount", required: "auto", readOnly: true }
              ]
            },
            bankAccountsDetails: {
              id: "bankAccountsDetails",
              label: "SECTION 10 — Bank Accounts Held in India",
              fields: [
                { id: "hasIndianBankAccount", label: "Do you have a bank account in India?", type: "dropdown", required: true, options: [{ value: "YES", label: "YES" }, { value: "NO", label: "NO" }], notes: "NR without Indian account may select NO" },
                { id: "totalBankAccountsCount", label: "Total number of savings + current accounts (excl. dormant)", type: "number", required: true },
                {
                  id: "bankAccountsGrid",
                  label: "Bank Accounts Matrix Details",
                  type: "table",
                  required: true,
                  notes: "At least 1 row mandatory for operational verification",
                  columns: [
                    { id: "ifscCode", label: "IFSC Code of Bank", type: "text", required: true, notes: "Triggers lookup to auto-fill Bank Name" },
                    { id: "bankName", label: "Name of Bank", type: "text", required: true, readOnly: true },
                    { id: "accountNumber", label: "Account Number", type: "text", required: true, validation: "9+ digits matching CBS rules" },
                    { id: "accountType", label: "Type of Account", type: "dropdown", required: true, options: ["Savings", "Current", "Others"] },
                    { id: "isRefundAccount", label: "Select Account for Refund Credit", type: "checkbox", required: true, notes: "At least one active account must be ticked" }
                  ]
                }
              ]
            },
            verificationDeclaration: {
              id: "verificationDeclaration",
              label: "SECTION 11 — Verification & Signatures",
              fields: [
                { id: "verifierName", label: "Name of Verifier", type: "text", required: true },
                { id: "verifierFatherName", label: "Father's Name of Verifier", type: "text", required: true },
                { id: "verifierCapacity", label: "In the capacity of", type: "dropdown", required: true, options: ["Self", "Karta", "Partner", "Representative Assessee"] },
                { id: "verifierPlace", label: "Place", type: "text", required: true },
                { id: "verifierDate", label: "Date", type: "date", required: "auto", readOnly: true },
                { id: "verifierPAN", label: "PAN of Verifier", type: "text", required: "auto", readOnly: true }
              ]
            }
          }
        },
        highNetWorthAndUpdatedReturns: {
          id: "highNetWorthAndUpdatedReturns",
          label: "Asset Schedules & Special Updated Return Audits",
          fieldSections: {
            scheduleALAssetsLiabilities: {
              id: "scheduleALAssetsLiabilities",
              label: "SECTION 12 — Schedule AL: Assets & Liabilities (Conditional Block)",
              fields: [
                {
                  id: "alImmovableAssetsTable",
                  label: "A. Immovable Assets (Up to 4 rows)",
                  type: "table",
                  required: "conditional",
                  notes: "Triggers mandatory rules when Total Taxable Income u/s C20 > ₹50 lakh",
                  columns: [{ id: "description", label: "Description" }, { id: "fullAddress", label: "Full Address (Flat/Bldg/Road/Locality/City/State/Country/PIN/ZIP)" }, { id: "costAmount", label: "Amount at Cost (₹)" }]
                },
                { id: "alMovableJewellery", label: "B. Movable Assets — Jewellery/Bullion (Cost Amount)", type: "amount", required: "conditional" },
                { id: "alMovableArt", label: "B. Movable Assets — Archaeological / Art (Cost Amount)", type: "amount", required: "conditional" },
                { id: "alMovableVehicles", label: "B. Movable Assets — Vehicles / Yachts / Boats / Aircraft (Cost Amount)", type: "amount", required: "conditional" },
                { id: "alFinancialBankDeposits", label: "B. Financial Assets — (a) Bank deposits (Cost Amount)", type: "amount", required: "conditional" },
                { id: "alFinancialSharesSecurities", label: "B. Financial Assets — (b) Shares & Securities (Cost Amount)", type: "amount", required: "conditional" },
                { id: "alFinancialInsurancePolicies", label: "B. Financial Assets — (c) Insurance Policies (Cost Amount)", type: "amount", required: "conditional" },
                { id: "alFinancialLoansGiven", label: "B. Financial Assets — (d) Loans & Advances Given (Cost Amount)", type: "amount", required: "conditional" },
                { id: "alFinancialCashInHand", label: "B. Financial Assets — (e) Cash in Hand (Cost Amount)", type: "amount", required: "conditional" },
                {
                  id: "alInterestInFirmAOPTable",
                  label: "C. Interest in the assets of Firm/AOP as a partner/member (Up to 4 rows)",
                  type: "table",
                  required: "conditional",
                  columns: [{ id: "firmName", label: "Firm/AOP Name" }, { id: "firmAddress", label: "Address" }, { id: "firmPAN", label: "PAN" }, { id: "investmentCost", label: "Assessee's Investment at Cost (₹)" }]
                },
                { id: "alLiabilitiesRelation", label: "D. Liabilities in relation to Assets (A+B+C)", type: "amount", required: "conditional", notes: "Mandatory if assets are reported" }
              ]
            },
            scheduleUpdatedReturnPartA: {
              id: "scheduleUpdatedReturnPartA",
              label: "SECTION 13 — Part A: General Information u/s 139(8A) (ITR-U)",
              fields: [
                { id: "itruPANAuto", ref: "A1", label: "PAN", type: "text", required: "auto", readOnly: true },
                { id: "itruNameAuto", ref: "A2", label: "Name", type: "text", required: "auto", readOnly: true },
                { id: "itruAadhaar", ref: "A3", label: "Aadhaar Number", type: "text", required: "conditional", validation: "12 digits" },
                { id: "itruAssessmentYear", ref: "A4", label: "Assessment Year", type: "dropdown", required: true, options: ["AY 2025-26", "AY 2024-25", "AY 2023-24", "AY 2022-23"], notes: "Covers up to 48 months from end of relevant AY" },
                { id: "itruPrevReturnFiled", ref: "A5", label: "Return previously filed for this AY?", type: "dropdown", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "itruPrevFiledSection", ref: "A6", label: "If Yes, filed u/s", type: "dropdown", required: "conditional", options: ["139(1)", "139(4)", "139(5)", "Others"] },
                { id: "itruPrevFiledDetailsTable", ref: "A7", label: "ITR Type / Acknowledgement No. / Date Block", type: "table", required: "conditional", columns: [{ id: "formType", label: "ITR Form" }, { id: "ackNo", label: "Ack Number" }, { id: "filingDate", label: "Filing Date" }] },
                { id: "itruEligibilityCheck", ref: "A8", label: "Eligible for updated return per conditions?", type: "dropdown", required: true, options: [{ value: "Yes", label: "Yes" }, { value: "No", label: "No" }] },
                { id: "itruFormAutoSet", ref: "A9", label: "ITR form for updating income", type: "text", required: "auto", defaultValue: "ITR-4", readOnly: true },
                { id: "itruReasonsUpdating", ref: "A10", label: "Reasons for updating (Up to 2 selections)", type: "dropdown", required: true, multiple: true, options: ["Return previously not filed", "Income not reported correctly", "Wrong heads", "Reduction of carried forward loss", "Reduction of unabsorbed depreciation", "Reduction of tax credit u/s 115JB", "Wrong rate of tax"] },
                { id: "itruFilingPeriod", ref: "A11", label: "Filing period", type: "dropdown", required: true, options: ["Up to 12 months from end of AY", "12–24 months from end of AY", "24–36 months from end of AY", "36–48 months from end of AY"] },
                { id: "itruReducingLossDeprec", ref: "A12(a)", label: "Reducing CFL/depreciation/tax credit?", type: "radio", required: true },
                {
                  id: "itruAffectedAYsTable",
                  ref: "A12(b)",
                  label: "AYs affected configuration tracking",
                  type: "table",
                  required: "conditional",
                  columns: [{ id: "affectedAY", label: "AY" }, { id: "isOriginalFiled", label: "Original filed?" }, { id: "isUpdatedFiled", label: "Updated filed?" }]
                }
              ]
            },
            scheduleUpdatedReturnPartB: {
              id: "scheduleUpdatedReturnPartB",
              label: "SECTION 13 — Part B: Computation of Updated Income & Additional Tax Payable (ITR-U)",
              fields: [
                { id: "itruAdditionalIncomeHeads", ref: "1A(a–e)", label: "Additional income per head (Salary/HP/BP/CG/OS)", type: "table", columns: [{ id: "head", label: "Income Head" }, { id: "amt", label: "Amount" }], notes: "User input values" },
                { id: "itruTotalAdditionalIncome", ref: "1A(f)", label: "Total additional income (a+b+c+d+e)", type: "amount", required: "auto", readOnly: true },
                { id: "itruTotalIncomeLastReturn", ref: "1B", label: "Total Income per last valid return", type: "amount", required: "conditional", notes: "Provide only if return was previously filed" },
                { id: "itruTotalIncomePartC", ref: "2", label: "Total income as per Part C (Taxable Total Income)", type: "amount", required: "auto", readOnly: true },
                { id: "itruAmountPayablePartD", ref: "3", label: "Amount payable from Part D", type: "amount", required: "auto", readOnly: true },
                { id: "itruAmountRefundablePartD", ref: "4", label: "Amount refundable from Part D", type: "amount", required: "auto", readOnly: true },
                { id: "itruAmountPayableLastReturn", ref: "5", label: "Amount payable per last valid return", type: "amount", required: false },
                { id: "itruRefundClaimedLastReturn", ref: "6i", label: "Refund claimed per last valid return", type: "amount", required: false },
                { id: "itruTotalRefundIssued", ref: "6ii", label: "Total Refund issued (incl. interest u/s 244A)", type: "amount", required: false },
                { id: "itruFee234F", ref: "7", label: "Fee u/s 234F", type: "amount", required: "auto", readOnly: true },
                { id: "itruRegularAssessmentTax", ref: "8", label: "Regular Assessment Tax Paid", type: "amount", required: false, notes: "Amounts deposited over and above Sl.5" },
                { id: "itruAggregateLiabilityRefundIssued", ref: "9i", label: "Aggregate liability if refund issued (3+6ii–5–8–4)", type: "amount", required: "auto", readOnly: true },
                { id: "itruAggregateLiabilityRefundNotIssued", ref: "9ii", label: "Aggregate liability if refund NOT issued (3+6i–5–8–4)", type: "amount", required: "auto", readOnly: true },
                { id: "itruAdditionalIncomeTaxRate", ref: "10", label: "Additional income-tax @ 25%/50%/60%/70% of (9–7)", type: "amount", required: "auto", readOnly: true, notes: "Penalty rate relies on A11 filing duration selection" },
                { id: "itruNetAmountPayableFinal", ref: "11", label: "Net Amount Payable (9+10)", type: "amount", required: "auto", readOnly: true },
                { id: "itruTaxPaid140B", ref: "12", label: "Tax Paid u/s 140B", type: "amount", required: "auto", readOnly: true, notes: "Aggregated from 14A challan table below" },
                { id: "itruTaxDueFinal", ref: "13", label: "Tax Due (11–12)", type: "amount", required: "auto", readOnly: true },
                {
                  id: "itruChallan14ATable",
                  ref: "14A",
                  label: "14A: Tax u/s 140B Challans Paid (Up to 2 rows)",
                  type: "table",
                  required: "conditional",
                  columns: [{ id: "bsrCode", label: "BSR Code" }, { id: "depositDate", label: "Date" }, { id: "challanNo", label: "Challan No." }, { id: "amount", label: "Amount" }]
                },
                {
                  id: "itruChallan14BTable",
                  ref: "14B",
                  label: "14B: Prior AT/SAT/Regular Assessment not claimed previously (Up to 2 rows)",
                  type: "table",
                  required: false,
                  columns: [{ id: "bsrCode", label: "BSR Code" }, { id: "depositDate", label: "Date" }, { id: "challanNo", label: "Challan No." }, { id: "amount", label: "Amount" }]
                },
                { id: "itruRelief89NotClaimedEarlier", ref: "15", label: "Relief u/s 89 not claimed in earlier return", type: "amount", required: false }
              ]
            }
          }
        }
      }
    }
  }
};
export default itr4FieldConfig;

function mapFieldSection(fieldSection) {
  const normalFields = [];
  const extraSections = [];

  fieldSection.fields.forEach(field => {
    if (field.type === 'table' || field.type === 'subTable' || field.type === 'grid' || field.type === 'complexArray') {
      extraSections.push({
        title: field.label,
        description: field.notes,
        isList: true,
        listName: field.id || field.name,
        fields: (field.columns || field.itemsSchema || []).map(col => ({
          name: typeof col === 'string' ? col.replace(/[^a-zA-Z0-9]/g, '') : (col.id || col.name || 'col'),
          label: typeof col === 'string' ? col : col.label,
          type: col.type === 'amount' || col.type === 'number' ? 'number' : (col.type === 'dropdown' ? 'select' : 'Text'),
          options: Array.isArray(col.options) ? col.options : undefined,
          required: false
        }))
      });
    } else {
      normalFields.push({
        name: field.id || field.name,
        label: field.label,
        type: field.type === 'amount' || field.type === 'number' ? 'number' : (field.type === 'dropdown' ? 'select' : field.type === 'date' ? 'text' : 'Text'),
        options: Array.isArray(field.options) ? field.options : undefined,
        placeholder: field.placeholder || '',
        required: field.required,
        condition: field.condition,
        notes: field.notes
      });
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

export const itr4ConfigMapping = {
  details: {
    permanent: {
      title: itr4FieldConfig.mainSections.partAGeneralInformation.label,
      sections: mapSubsectionsToSections({
        identityAndContact: itr4FieldConfig.mainSections.partAGeneralInformation.subsections.identityAndContact
      })
    },
    karta: {
      title: itr4FieldConfig.mainSections.partAGeneralInformation.label,
      sections: mapSubsectionsToSections({
        taxpayerStatusAndFiling: itr4FieldConfig.mainSections.partAGeneralInformation.subsections.taxpayerStatusAndFiling
      })
    }
  },
  income: {
    business: {
      title: itr4FieldConfig.mainSections.scheduleBPPresumptiveIncome.label,
      sections: mapSubsectionsToSections({
        presumptiveSchemesCore: itr4FieldConfig.mainSections.scheduleBPPresumptiveIncome.subsections.presumptiveSchemesCore,
        financialsAndTurnoverReconciliation: itr4FieldConfig.mainSections.scheduleBPPresumptiveIncome.subsections.financialsAndTurnoverReconciliation
      })
    },
    house_property: {
      title: itr4FieldConfig.mainSections.partBGrossTotalIncome.label,
      sections: mapSubsectionsToSections({
        housePropertyIncomeDetails: itr4FieldConfig.mainSections.partBGrossTotalIncome.subsections.housePropertyIncomeDetails
      })
    },
    other: {
      title: itr4FieldConfig.mainSections.partBGrossTotalIncome.label,
      sections: mapSubsectionsToSections({
        incomeHeadsBPAndSalary: itr4FieldConfig.mainSections.partBGrossTotalIncome.subsections.incomeHeadsBPAndSalary,
        otherSourcesAndGtiSummary: itr4FieldConfig.mainSections.partBGrossTotalIncome.subsections.otherSourcesAndGtiSummary
      })
    }
  },
  deductions: {
    chapter6a: {
      title: itr4FieldConfig.mainSections.scheduleDeductionsVIAAndPayments.label,
      sections: mapSubsectionsToSections({
        chapterVIAAndPaymentsDirectives: itr4FieldConfig.mainSections.scheduleDeductionsVIAAndPayments.subsections.chapterVIAAndPaymentsDirectives
      })
    },
    more: {
      title: "Other Deductions & Exempt Incomes",
      sections: mapSubsectionsToSections({
        exemptIncomesAndOtherDeductions: itr4FieldConfig.mainSections.scheduleDeductionsVIAAndPayments.subsections.exemptIncomesAndOtherDeductions
      })
    }
  },
  taxes: {
    tds: {
      title: "Tax Deducted / Collected at Source",
      sections: mapSubsectionsToSections({
        taxPaymentsTdsTcs: itr4FieldConfig.mainSections.scheduleDeductionsVIAAndPayments.subsections.taxPaymentsTdsTcs
      })
    },
    tcs: {
      title: "Tax Collected at Source",
      sections: []
    },
    advance_tax: {
      title: "Advance Tax & Self Assessment Tax",
      sections: mapSubsectionsToSections({
        taxPaymentsAdvanceTax: itr4FieldConfig.mainSections.scheduleDeductionsVIAAndPayments.subsections.taxPaymentsAdvanceTax
      })
    }
  },
  filing: {
    bank: {
      title: itr4FieldConfig.mainSections.taxComputationAndVerification.label,
      sections: mapSubsectionsToSections({
        taxCalculationsAndBanking: itr4FieldConfig.mainSections.taxComputationAndVerification.subsections.taxCalculationsAndBanking
      })
    },
    efiling: {
      title: "E-Filing & Verification",
      sections: mapSubsectionsToSections({
        highNetWorthAndUpdatedReturns: itr4FieldConfig.mainSections.taxComputationAndVerification.subsections.highNetWorthAndUpdatedReturns
      })
    }
  }
};