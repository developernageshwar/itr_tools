import * as Yup from 'yup';

export const panSchema = Yup.object({
  pan: Yup.string()
    .required('PAN Card Number is required')
    .matches(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, 'Invalid PAN format (e.g. ABCDE1234F)'),
  fullName: Yup.string()
    .min(3, 'Full name must be at least 3 characters'),
  dob: Yup.string()
    .required('Date of Birth is required')
    .matches(/^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[012])\/(19|20)\d\d$/, 'Invalid date format (DD/MM/YYYY)')
    .test('valid-date', 'Invalid date', (value) => {
      if (!value) return false;
      const [day, month, year] = value.split('/').map(Number);
      const date = new Date(year, month - 1, day);
      return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
    })
});
