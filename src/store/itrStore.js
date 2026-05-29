import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { calculateTax, NEW_REGIME_SLABS, OLD_REGIME_SLABS } from '../utils/taxCalculator';

const defaultFormData = {
  selectedRegime: 'new',
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
  bankAccounts: [{ accountNumber: '', ifscCode: '', bankName: '', accountType: 'SAVING' }],
  currentStep: 1,
};

const initialState = {
  ...defaultFormData,

  profiles: [{
    id: '1',
    name: 'New User',
    pan: 'Not Available',
    assessmentYear: '2026-27',
    filingType: 'Individual',
    currentStep: 1,
    form16Data: {},
    incomeSources: {},
    taxSaving: {},
    bankDetails: {},
    createdAt: Date.now(),
  }],
  activeProfileId: '1',

  profileDataMap: {},

  isDropdownOpen: false,
  isFilingTypeModalOpen: false,
  selectedFilingType: 'Individual',
};

export const useItrStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setField: (field, value) => set((state) => ({ [field]: value })),

      setFields: (fields) => set((state) => ({ ...state, ...fields })),
      setIsDropdownOpen: (value) => set(() => {
        if (typeof value === 'function') {
          return { isDropdownOpen: value(get().isDropdownOpen) };
        }
        return { isDropdownOpen: value };
      }),

      setIsFilingTypeModalOpen: (value) => set({ isFilingTypeModalOpen: value }),

      setSelectedFilingType: (value) => set({ selectedFilingType: value }), 

      addProfile: (profile) => set((state) => { 
        const currentSnapshot = _extractFormData(state);
        const updatedMap = {
          ...state.profileDataMap,
          [state.activeProfileId]: currentSnapshot,
        };

        return {
          profiles: [...state.profiles, profile],
          activeProfileId: profile.id,
          profileDataMap: updatedMap,
        };
      }),

      setActiveProfile: (id) => set((state) => {
        if (id === state.activeProfileId) return {}; 

        const currentSnapshot = _extractFormData(state);
        const updatedMap = {
          ...state.profileDataMap,
          [state.activeProfileId]: currentSnapshot,
        }; 

        const targetData = updatedMap[id] || { ...defaultFormData };
 
        const updatedProfiles = state.profiles.map(p => {
          if (p.id === state.activeProfileId) {
            return {
              ...p,
              name: state.firstName && state.lastName
                ? `${state.firstName} ${state.lastName}`.trim()
                : p.name,
              pan: state.panNumber || p.pan,
              currentStep: state.currentStep,
            };
          }
          return p;
        });

        return {
          ...targetData,
          profiles: updatedProfiles,
          activeProfileId: id,
          profileDataMap: updatedMap,
          isDropdownOpen: false,
        };
      }), 

      createNewProfile: (filingType) => set((state) => {
        const currentSnapshot = _extractFormData(state);
        const updatedMap = {
          ...state.profileDataMap,
          [state.activeProfileId]: currentSnapshot,
        };

        const updatedProfiles = state.profiles.map(p => {
          if (p.id === state.activeProfileId) {
            return {
              ...p,
              name: state.firstName && state.lastName
                ? `${state.firstName} ${state.lastName}`.trim()
                : p.name,
              pan: state.panNumber || p.pan,
              currentStep: state.currentStep,
            };
          }
          return p;
        });

        const newProfileId = crypto.randomUUID();
        const newProfile = {
          id: newProfileId,
          name: 'New User',
          pan: '',
          assessmentYear: '2025-26',
          filingType: filingType || 'Individual',
          currentStep: 1,
          form16Data: {},
          incomeSources: {},
          taxSaving: {},
          bankDetails: {},
          createdAt: Date.now(),
        };

        return {
          ...defaultFormData,
          profiles: [...updatedProfiles, newProfile],
          activeProfileId: newProfileId,
          profileDataMap: updatedMap,
          isDropdownOpen: false,
          isFilingTypeModalOpen: false,
          selectedFilingType: 'Individual',
        };
      }),

      resetForNewPerson: () => {
        get().createNewProfile('Individual');
      }, 

      resetForm: () => set((state) => ({
        ...defaultFormData,
        profiles: state.profiles,
        activeProfileId: state.activeProfileId,
        profileDataMap: state.profileDataMap,
        isDropdownOpen: state.isDropdownOpen,
        isFilingTypeModalOpen: state.isFilingTypeModalOpen,
        selectedFilingType: state.selectedFilingType,
      })), 

      saveCurrentProfileData: () => set((state) => {
        const snapshot = _extractFormData(state);
        const updatedProfiles = state.profiles.map(p => {
          if (p.id === state.activeProfileId) {
            return {
              ...p,
              name: state.firstName && state.lastName
                ? `${state.firstName} ${state.lastName}`.trim()
                : p.name,
              pan: state.panNumber || p.pan,
              currentStep: state.currentStep,
            };
          }
          return p;
        });

        return {
          profiles: updatedProfiles,
          profileDataMap: {
            ...state.profileDataMap,
            [state.activeProfileId]: snapshot,
          },
        };
      }),

      updateStep: (step) => set({ currentStep: step }),

      getPayload: () => {
        const state = get();
        return {
          profile_id: state.activeProfileId,
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
          bank_accounts: state.bankAccounts,
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
      
        const standardDeduction = state.salaryIncome > 0 ? 50000 : 0;
        
        const oldTaxableIncome = Math.max(0, grossIncome - standardDeduction - totalDeductions);
        const newTaxableIncome = Math.max(0, grossIncome - standardDeduction);

        const oldRegimeTaxCalc = calculateTax(oldTaxableIncome, OLD_REGIME_SLABS);
        const newRegimeTaxCalc = calculateTax(newTaxableIncome, NEW_REGIME_SLABS);

        const oldRegimeTax = oldRegimeTaxCalc.finalTax;
        const newRegimeTax = newRegimeTaxCalc.finalTax;

        const taxComparison = {
            old: oldRegimeTax,
            new: newRegimeTax,
            savings: Math.abs(oldRegimeTax - newRegimeTax),
            betterRegime: oldRegimeTax <= newRegimeTax ? 'old' : 'new'
        };

        const activeTaxableIncome = state.selectedRegime === 'new' ? newTaxableIncome : oldTaxableIncome;
        const activeTaxCalc = state.selectedRegime === 'new' ? newRegimeTaxCalc : oldRegimeTaxCalc;
        const estimatedTax = activeTaxCalc.finalTax;

        const taxesPaid = Number(state.taxesPaid);
        const refundOrDue = taxesPaid - estimatedTax;

        return {
          grossIncome,
          totalDeductions,
          taxableIncome: activeTaxableIncome,
          oldTaxableIncome,
          newTaxableIncome,
          estimatedTax,
          oldRegimeTax,
          newRegimeTax,
          taxComparison,
          slabBreakdown: activeTaxCalc.slabWiseBreakdown,
          cess: activeTaxCalc.cess,
          slabTax: activeTaxCalc.totalTax,
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

function _extractFormData(state) {
  const snapshot = {};
  for (const key of Object.keys(defaultFormData)) {
    snapshot[key] = state[key];
  }
  return snapshot;
}
