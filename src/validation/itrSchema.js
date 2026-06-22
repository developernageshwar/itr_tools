import * as Yup from 'yup';

// Step 1: Personal & Address Details
export const personalDetailsSchema = Yup.object().shape({
  firstName: Yup.string().required('First Name is required'),
  lastName: Yup.string().required('Last Name is required'),
  middleName: Yup.string().nullable(),
  dateOfBirth: Yup.string()
    .required('Date of Birth is required')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/, 'Format: DD/MM/YYYY'),
  fatherName: Yup.string().required("Father's Name is required"),
  
  aadhaarNumber: Yup.string()
    .required('Aadhaar Number is required')
    .matches(/^\d{12}$/, 'Aadhaar must be 12 digits'),
  
  panNumber: Yup.string()
    .required('PAN Number is required')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN Format'),
  
  mobileNumber: Yup.string()
    .required('Mobile Number is required')
    .matches(/^\d{10}$/, 'Mobile must be 10 digits'),
  
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),

  flatNo: Yup.string().required('Flat/Door No is required'),
  areaLocality: Yup.string().required('Area Locality is required'),
  pincode: Yup.string()
    .required('Pincode is required')
    .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
  
  country: Yup.string().required('Country is required'),
  state: Yup.string().required('State is required'),
  city: Yup.string().required('City is required'),
  bankAccounts: Yup.array().of(
    Yup.object().shape({
      accountNumber: Yup.string().required('Account Number is required'),
      ifscCode: Yup.string().required('IFSC Code is required'),
      bankName: Yup.string().required('Bank Name is required'),
      accountType: Yup.string().required('Account Type is required'),
    })
  ).min(1, 'At least one bank account is required'),
});

// Step 2: Income Sources
export const incomeSourcesSchema = Yup.object().shape({
  salaryIncome: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  interestIncome: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  capitalGains: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  houseProperties: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  dividendIncome: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  businessIncome: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  cryptoIncome: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  otherIncome: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
});

// Step 3: Tax Savings & Deductions
export const taxSavingSchema = Yup.object().shape({
  taxSavingsDeductions: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  taxesPaid: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  foreignAssets: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
  otherDisclosures: Yup.number().typeError('Enter valid amount').min(0, 'Amount cannot be negative').nullable(),
});

// Combined schema for final submission validation if needed
export const itrSchema = Yup.object().shape({
  // ...personalDetailsSchema.fields, 
  ...incomeSourcesSchema.fields,
  ...taxSavingSchema.fields,
});
