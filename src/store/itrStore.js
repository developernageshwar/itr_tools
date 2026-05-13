import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

const initialState = {
  userId: '',
  firstName: '',
  middleName: '',
  lastName: '',
  dateOfBirth: '',
  fatherName: '',
  aadhaarNumber: '',
  panNumber: '',
  mobileNumber: '',
  email: '',
  flatNo: '',
  premiseName: '',
  roadStreet: '',
  areaLocality: '',
  pincode: '',
  country: 'INDIA',
  state: '',
  city: '',
  salaryFilePath: '',
  taxSavingDetails: [],
  salaryIncome: 0,
  interestIncome: 0,
  capitalGains: 0,
  houseProperties: 0,
  dividendIncome: 0,
  businessIncome: 0,
  cryptoIncome: 0,
  otherIncome: 0,
  taxSavingsDeductions: 0,
  taxesPaid: 0,
  foreignAssets: 0,
  otherDisclosures: 0,
  currentStep: 1,
};

export const useItrStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setField: (field, value) => set((state) => ({ [field]: value })),
      
      setFields: (fields) => set((state) => ({ ...state, ...fields })),

      resetForm: () => set(initialState),

      updateStep: (step) => set({ currentStep: step }),

      getPayload: () => {
        const state = get();
        return {
          user_id: state.userId,
          first_name: state.firstName,
          middle_name: state.middleName,
          last_name: state.lastName,
          date_of_birth: state.dateOfBirth,
          father_name: state.fatherName,
          aadhaar_number: state.aadhaarNumber,
          pan_number: state.panNumber,
          mobile_number: state.mobileNumber,
          email: state.email,
          flat_no: state.flatNo,
          premise_name: state.premiseName,
          road_street: state.roadStreet,
          area_locality: state.areaLocality,
          pincode: state.pincode,
          country: state.country,
          state: state.state,
          city: state.city,
          salary_file_path: state.salaryFilePath,
          tax_saving_details: state.taxSavingDetails,
          salary_income: state.salaryIncome,
          intrest_income: state.interestIncome,
          gains_from_stocks_mutual_funds_FnO_others: state.capitalGains,
          house_properties_owned_by_you: state.houseProperties,
          divided_income: state.dividendIncome,
          professional_freelancing_and_business_income: state.businessIncome,
          crypto_income: state.cryptoIncome,
          exempt_online_gaming_other_income: state.otherIncome,
          tax_savings_deductions: state.taxSavingsDeductions,
          taxes_paid_TDS_TCS: state.taxesPaid,
          carry_forward_losses_AIS_foreign_assets: state.foreignAssets,
          unlisted_shares_schedule_AL_other_disclosures: state.otherDisclosures,
        };
      },

      calculateSummary: () => {
        const state = get();
        const grossIncome = 
          Number(state.salaryIncome) + 
          Number(state.interestIncome) + 
          Number(state.capitalGains) + 
          Number(state.dividendIncome) + 
          Number(state.businessIncome) + 
          Number(state.cryptoIncome) + 
          Number(state.otherIncome);

        const totalDeductions = Number(state.taxSavingsDeductions);
        const taxableIncome = Math.max(0, grossIncome - totalDeductions);
        
        // Simple Tax Estimation logic (can be refined)
        let estimatedTax = 0;
        if (taxableIncome > 700000) {
            // Very basic slab calculation for demonstration
            estimatedTax = (taxableIncome - 700000) * 0.1 + 0; 
        }

        const taxesPaid = Number(state.taxesPaid);
        const refundOrDue = taxesPaid - estimatedTax;

        return {
          grossIncome,
          totalDeductions,
          taxableIncome,
          estimatedTax,
          refundOrDue: Math.abs(refundOrDue),
          isRefund: refundOrDue > 0
        };
      }
    }),
    {
      name: 'itr-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
