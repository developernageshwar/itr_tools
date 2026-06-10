import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { calculateTax, NEW_REGIME_SLABS, OLD_REGIME_SLABS, determineITRType } from '../utils/taxCalculator';
import { taxReturnService } from '../services/taxReturnService';

const defaultFormData = {
  entityType: '',
  formData: {
    details: {},
    income: {},
    financials: {},
    deductions: {},
    taxes: {},
    filing: {}
  },
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
  filingStatus: 'Pending',
  acknowledgementNumber: '',

  // HUF and LLP Step & Sub-Tab based nested data structure
  details: {
    // HUF specific
    permanent: {},
    karta: {},
    members: {
      coparceners: []
    },
    additional: {},
    registration: {},

    // LLP specific
    general: {},
    address: {},
    partners: {
      partners: [],
      partnerChanges: []
    },
    business_nature: {
      businessNatures: []
    },
    tax_regime: {},
    audit: {}
  },
  income: {
    business: {},
    house_property: {
      housePropertiesList: []
    },
    capital: {},
    house: {
      housePropertiesList: []
    },
    other: {},
    // LLP additions
    presumptive: {},
    capital_gains: {},
    other_sources: {},
    // Trust & Exempt Entities additions
    business_profession: {},
    loss_setoff: {},
    foreign_income: {
      foreignIncomeList: [],
      foreignAssetsList: []
    }
  },
  financials: {
    bs_sources: {},
    bs_application: {},
    profit_loss: {}
  },
  deductions: {
    chapter6a: {},
    more: {}, // HUF
    exempt_income: {}, // LLP
    losses: {} // LLP
  },
  taxes: {
    tds: {
      tdsRows: []
    },
    advance_tax: {
      taxPayments: []
    },
    ais: {},
    self: {
      taxPayments: []
    },
    loss: {},
    // LLP additions
    tcs: {
      tcsRows: []
    },
    amt: {}
  },
  filing: {
    gst: {
      gstRows: []
    },
    bank: {
      bankAccounts: []
    },
    more: {},
    efiling: {}
  },
  // Trust & Exempt Entities Step & Sub-Tab based nested data structure
  basic: {
    entity_details: {},
    projects_institutions: {
      projectsList: [],
      tradeCommerceList: [],
      universityInstitutionList: []
    }
  },
  personal: {
    registration_it: {
      sectionRegisteredRows: []
    },
    registration_other: {
      lawPortalRows: []
    },
    filing_status: {},
    other_details: {
      hasUnlistedSharesRows: []
    }
  },
  audit: {
    transfer_pricing: {},
    income_tax_audit: {},
    other_act_audit: {
      otherActAuditRows: []
    },
    aop_members: {
      membersAopRows: [],
      trusteeFounderRows: [],
      beneficialOwnerRows: [],
      substantialContributorRows: [],
      relativeRows: []
    }
  },
  schedules: {
    schedule_i: {
      scheduleIRows: []
    },
    schedule_vc: {},
    schedule_ai_er: {},
    schedule_j: {
      corpusJRows: [],
      loanJRows: [],
      investJRows: []
    },
    schedule_la_et: {},
    balance_sheet: {}
  },
  tax: {
    total_income: {},
    advance_tds: {
      advanceTaxPayments: [],
      tdsRows: [],
      tcsRows: []
    },
    verification: {}
  },
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
    filingStatus: 'Pending',
    acknowledgementNumber: '',
    createdAt: Date.now(),
  }],
  activeProfileId: '1',

  profileDataMap: {},

  isDropdownOpen: false,
  isFilingTypeModalOpen: false,
  selectedFilingType: 'Individual',
  selectedTaxpayer: null,
  taxpayers: [],
  itrReturns: [],
  expandedCardId: null,
  loading: false,
  error: null,
  errorSteps: [],
};

export const useItrStore = create(
  persist(
    (set, get) => ({
      ...initialState,

      setField: (field, value) => set((state) => {
        const updatedState = { ...state, [field]: value };

        // Synchronize entityType
        if (field === 'selectedFilingType' || field === 'filingType') {
          updatedState.entityType = value;
        }

        const stepsList = ['details', 'income', 'financials', 'deductions', 'taxes', 'filing', 'basic', 'personal', 'audit', 'schedules', 'tax'];
        if (stepsList.includes(field)) {
          updatedState.formData = {
            ...(state.formData || {}),
            [field]: value
          };
        }

        return updatedState;
      }),

      setFields: (fields) => set((state) => {
        const updatedState = { ...state, ...fields };

        // Synchronize entityType
        if (fields.selectedFilingType) {
          updatedState.entityType = fields.selectedFilingType;
        } else if (fields.filingType) {
          updatedState.entityType = fields.filingType;
        } else if (state.selectedFilingType) {
          updatedState.entityType = state.selectedFilingType;
        } else if (state.filingType) {
          updatedState.entityType = state.filingType;
        }

        const stepsList = ['details', 'income', 'financials', 'deductions', 'taxes', 'filing', 'basic', 'personal', 'audit', 'schedules', 'tax'];
        const updatedFormData = { ...(state.formData || {}) };

        let hasFormDataUpdate = false;
        stepsList.forEach(step => {
          if (fields[step] !== undefined) {
            updatedFormData[step] = fields[step];
            hasFormDataUpdate = true;
          }
        });

        if (hasFormDataUpdate) {
          updatedState.formData = updatedFormData;
        }

        if (fields.formData) {
          stepsList.forEach(step => {
            if (fields.formData[step] !== undefined) {
              updatedState[step] = fields.formData[step];
            }
          });
        }

        return updatedState;
      }),
      setIsDropdownOpen: (value) => set(() => {
        if (typeof value === 'function') {
          return { isDropdownOpen: value(get().isDropdownOpen) };
        }
        return { isDropdownOpen: value };
      }),

      setIsFilingTypeModalOpen: (value) => set({ isFilingTypeModalOpen: value }),

      setSelectedFilingType: (value) => set({ selectedFilingType: value }),

      setSelectedTaxpayer: async (taxpayer) => {
        set({ selectedTaxpayer: taxpayer, expandedCardId: null });
        if (taxpayer) {
          await get().fetchItrReturns(taxpayer.id);
        }
      },

      setExpandedCardId: (id) => set((state) => ({
        expandedCardId: state.expandedCardId === id ? null : id
      })),

      fetchTaxpayers: async () => {
        set({ loading: true, error: null });
        try {
          const data = await taxReturnService.fetchTaxpayers();

          const updates = { taxpayers: data, loading: false };

          let currentSelected = get().selectedTaxpayer;
          if (data.length > 0) {
            const exists = currentSelected && data.some(t => String(t.id) === String(currentSelected.id));
            if (!exists) {
              currentSelected = data[0];
              updates.selectedTaxpayer = currentSelected;
            }
          } else {
            currentSelected = null;
            updates.selectedTaxpayer = null;
          }

          set(updates);

          if (currentSelected) {
            await get().fetchItrReturns(currentSelected.id);
          }
        } catch (err) {
          set({ loading: false, error: err.message || 'Unable to load taxpayers.' });
        }
      },

      fetchItrReturns: async (taxpayerId) => {
        const targetId = taxpayerId || get().selectedTaxpayer?.id;
        if (!targetId) {
          set({ itrReturns: [] });
          return;
        }
        set({ loading: true, error: null });
        try {
          const data = await taxReturnService.fetchItrReturns(targetId);
          set({ itrReturns: data, loading: false });
        } catch (err) {
          set({ loading: false, error: err.message || 'Unable to load tax returns.' });
        }
      },

      createItr: async (taxpayerId, assessmentYear) => {
        set({ loading: true, error: null });
        try {
          const data = await taxReturnService.createItr(taxpayerId, assessmentYear);
          set({ loading: false });
          await get().fetchItrReturns(taxpayerId);
          return data;
        } catch (err) {
          set({ loading: false, error: err.message || 'Something went wrong. Please try again.' });
          throw err;
        }
      },

      resumeItr: async (itrId) => {
        set({ loading: true, error: null });
        try {
          const data = await taxReturnService.resumeItr(itrId);
          set({ loading: false });
          return data;
        } catch (err) {
          set({ loading: false, error: err.message || 'Something went wrong. Please try again.' });
          throw err;
        }
      },

      deleteItr: async (itrId) => {
        set({ loading: true, error: null });
        try {
          await taxReturnService.deleteItr(itrId);
          set({ loading: false });
          await get().fetchItrReturns();
        } catch (err) {
          set({ loading: false, error: err.message || 'Something went wrong. Please try again.' });
          throw err;
        }
      },

      duplicateItr: async (itrId) => {
        set({ loading: true, error: null });
        try {
          await taxReturnService.duplicateItr(itrId);
          set({ loading: false });
          await get().fetchItrReturns();
        } catch (err) {
          set({ loading: false, error: err.message || 'Something went wrong. Please try again.' });
          throw err;
        }
      },

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
        const targetFilingType = targetData.selectedFilingType || targetData.filingType || 'Individual';

        const updatedProfiles = state.profiles.map(p => {
          if (p.id === state.activeProfileId) {
            const currentFilingType = state.selectedFilingType || state.filingType || 'Individual';
            let profileName = p.name;
            let profilePan = p.pan;
            if (currentFilingType === 'HUF') {
              const hufInfo = state.details?.permanent || {};
              profileName = hufInfo.hufName || p.name;
              profilePan = hufInfo.panNumber || p.pan;
            } else if (currentFilingType === 'LLP') {
              const llpInfo = state.details?.general || {};
              profileName = llpInfo.llpName || p.name;
              profilePan = llpInfo.panNumber || p.pan;
            } else if (currentFilingType === 'Firm') {
              const firmInfo = state.details?.general || {};
              profileName = firmInfo.firmName || p.name;
              profilePan = firmInfo.panNumber || p.pan;
            } else if (currentFilingType === 'AOP/BOI') {
              const aopInfo = state.details?.general || {};
              profileName = aopInfo.aopName || p.name;
              profilePan = aopInfo.panNumber || p.pan;
            } else {
              profileName = state.firstName && state.lastName ? `${state.firstName} ${state.lastName}`.trim() : p.name;
              profilePan = state.panNumber || p.pan;
            }

            return {
              ...p,
              name: profileName,
              pan: profilePan,
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
            const currentFilingType = state.selectedFilingType || state.filingType || 'Individual';
            let profileName = p.name;
            let profilePan = p.pan;
            if (currentFilingType === 'HUF') {
              const hufInfo = state.details?.permanent || {};
              profileName = hufInfo.hufName || p.name;
              profilePan = hufInfo.panNumber || p.pan;
            } else if (currentFilingType === 'LLP') {
              const llpInfo = state.details?.general || {};
              profileName = llpInfo.llpName || p.name;
              profilePan = llpInfo.panNumber || p.pan;
            } else if (currentFilingType === 'Firm') {
              const firmInfo = state.details?.general || {};
              profileName = firmInfo.firmName || p.name;
              profilePan = firmInfo.panNumber || p.pan;
            } else if (currentFilingType === 'AOP/BOI') {
              const aopInfo = state.details?.general || {};
              profileName = aopInfo.aopName || p.name;
              profilePan = aopInfo.panNumber || p.pan;
            } else {
              profileName = state.firstName && state.lastName ? `${state.firstName} ${state.lastName}`.trim() : p.name;
              profilePan = state.panNumber || p.pan;
            }

            return {
              ...p,
              name: profileName,
              pan: profilePan,
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
          selectedFilingType: filingType || 'Individual',
          entityType: filingType || 'Individual',
          profiles: [...updatedProfiles, newProfile],
          activeProfileId: newProfileId,
          profileDataMap: updatedMap,
          isDropdownOpen: false,
          isFilingTypeModalOpen: false,
          selectedFilingType: filingType || 'Individual',
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
        const currentFilingType = state.selectedFilingType || state.filingType || 'Individual';
        const isStructured = ['HUF', 'LLP', 'Firm', 'AOP/BOI', 'Company Private', 'Company Public', 'Trust & Exempt Entities'].includes(currentFilingType);

        const updatedProfiles = state.profiles.map(p => {
          if (p.id === state.activeProfileId) {
            const currentFilingType = state.selectedFilingType || state.filingType || 'Individual';
            let profileName = p.name;
            let profilePan = p.pan;
            if (currentFilingType === 'HUF') {
              const hufInfo = state.details?.permanent || {};
              profileName = hufInfo.hufName || p.name;
              profilePan = hufInfo.panNumber || p.pan;
            } else if (currentFilingType === 'LLP') {
              const llpInfo = state.details?.general || {};
              profileName = llpInfo.llpName || p.name;
              profilePan = llpInfo.panNumber || p.pan;
            } else if (currentFilingType === 'Firm') {
              const firmInfo = state.details?.general || {};
              profileName = firmInfo.firmName || p.name;
              profilePan = firmInfo.panNumber || p.pan;
            } else if (currentFilingType === 'AOP/BOI') {
              const aopInfo = state.details?.general || {};
              profileName = aopInfo.aopName || p.name;
              profilePan = aopInfo.panNumber || p.pan;
            } else if (['Company Private', 'Company Public'].includes(currentFilingType)) {
              const companyInfo = state.details?.general || {};
              profileName = companyInfo.companyName || p.name;
              profilePan = companyInfo.panNumber || p.pan;
            } else if (currentFilingType === 'Trust & Exempt Entities') {
              const trustInfo = state.basic?.entity_details || {};
              profileName = trustInfo.entityName || p.name;
              profilePan = trustInfo.panNumber || p.pan;
            } else {
              profileName = state.firstName && state.lastName ? `${state.firstName} ${state.lastName}`.trim() : p.name;
              profilePan = state.panNumber || p.pan;
            }

            return {
              ...p,
              name: profileName,
              pan: profilePan,
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

      completeFiling: (acknowledgementNumber) => set((state) => {
        const updatedProfiles = state.profiles.map(p => {
          if (p.id === state.activeProfileId) {
            return {
              ...p,
              filingStatus: 'Filed',
              acknowledgementNumber: acknowledgementNumber,
            };
          }
          return p;
        });

        const currentSnapshot = _extractFormData(state);
        currentSnapshot.filingStatus = 'Filed';
        currentSnapshot.acknowledgementNumber = acknowledgementNumber;

        return {
          profiles: updatedProfiles,
          filingStatus: 'Filed',
          acknowledgementNumber: acknowledgementNumber,
          profileDataMap: {
            ...state.profileDataMap,
            [state.activeProfileId]: currentSnapshot,
          }
        };
      }),

      getPayload: () => {
        const state = get();
        const filingType = state.selectedFilingType || state.filingType || 'Individual';
        const summary = state.calculateSummary();

        // Standard Payload Structure
        const payload = {
          profile_id: state.activeProfileId,
          user_id: state.userId,
          entityType: filingType,
          itrType: summary.itrType,
          details: {},
          income: {},
          deductions: {},
          taxes: {},
          filing: {}
        };

        if (filingType === 'Individual') {
          return {
            profile_id: state.activeProfileId,
            user_id: state.userId,
            entityType: 'Individual',
            itrType: summary.itrType,
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
        }

        // For structured types, dynamically copy values from store
        if (['HUF', 'LLP', 'Firm', 'AOP/BOI', 'Company Private', 'Company Public'].includes(filingType)) {
          payload.details = state.details || {};
          payload.income = state.income || {};
          payload.deductions = state.deductions || {};
          payload.taxes = state.taxes || {};
          payload.filing = state.filing || {};

          // LLP & Companies also have financials
          if (['LLP', 'Firm', 'AOP/BOI', 'Company Private', 'Company Public'].includes(filingType)) {
            payload.financials = state.financials || {};
          }
        }
        else if (filingType === 'Trust & Exempt Entities') {
          // Map Trust steps to standard payload keys
          payload.details = {
            ...(state.basic?.entity_details ? { entity_details: state.basic.entity_details } : {}),
            ...(state.basic?.projects_institutions ? { projects_institutions: state.basic.projects_institutions } : {}),
            ...(state.personal?.registration_it ? { registration_it: state.personal.registration_it } : {}),
            ...(state.personal?.registration_other ? { registration_other: state.personal.registration_other } : {}),
            ...(state.personal?.filing_status ? { filing_status: state.personal.filing_status } : {}),
            ...(state.personal?.other_details ? { other_details: state.personal.other_details } : {}),
            ...(state.audit?.transfer_pricing ? { transfer_pricing: state.audit.transfer_pricing } : {}),
            ...(state.audit?.income_tax_audit ? { income_tax_audit: state.audit.income_tax_audit } : {}),
            ...(state.audit?.other_act_audit ? { other_act_audit: state.audit.other_act_audit } : {}),
            ...(state.audit?.aop_members ? { aop_members: state.audit.aop_members } : {}),
          };

          payload.income = state.income || {};

          payload.deductions = {
            ...(state.schedules?.schedule_i ? { schedule_i: state.schedules.schedule_i } : {}),
            ...(state.schedules?.schedule_vc ? { schedule_vc: state.schedules.schedule_vc } : {}),
            ...(state.schedules?.schedule_ai_er ? { schedule_ai_er: state.schedules.schedule_ai_er } : {}),
            ...(state.schedules?.schedule_j ? { schedule_j: state.schedules.schedule_j } : {}),
            ...(state.schedules?.schedule_la_et ? { schedule_la_et: state.schedules.schedule_la_et } : {}),
          };

          payload.taxes = state.tax?.advance_tds || {};

          payload.filing = {
            ...(state.schedules?.balance_sheet ? { balance_sheet: state.schedules.balance_sheet } : {}),
            ...(state.tax?.verification ? { verification: state.tax.verification } : {}),
          };
        }

        return payload;
      },

      calculateSummary: () => {
        const state = get();
        const filingType = state.selectedFilingType || state.filingType || 'Individual';
        const isIndividual = filingType === 'Individual';
        const isHuf = filingType === 'HUF';

        // Helper: safe number
        const n = (v) => Number(v || 0);

        // Helper: house property net income for a single property object
        const hpNet = (hp) => {
          const grossRent = n(hp.grossRent || hp.annualRentReceivable || hp.annualValue || 0);
          const munTax = n(hp.municipalTaxes || hp.taxPaidLocal || 0);
          const nav = grossRent - munTax;
          const stdDed = Math.round(nav * 0.3);
          const loanInt = n(hp.homeLoanInterest || hp.interestBorrowedCapital || hp.interestOnHomeLoan || 0);
          // self-occupied: NAV = 0, loss capped at 2L
          if (hp.housePropertyType === 'Self-Occupied' || hp.propertyType === 'Self-Occupied') {
            return Math.max(-200000, -loanInt);
          }
          return nav - stdDed - loanInt;
        };

        let interest = 0;
        let business = 0;
        let dividend = 0;
        let other = 0;
        let capital = 0;
        let deductions = 0;
        let taxes = 0;
        let house = 0;
        let anonDonations = 0;

        // â”€â”€ HUF â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        if (isHuf) {
          const income = state.income || {};
          const deductionsSec = state.deductions || {};
          const taxesSec = state.taxes || {};

          const businessHP = income.business || {};
          const houseProperty = income.house_property || {};
          const otherSrc = income.other || {};
          const chapter6a = deductionsSec.chapter6a || {};
          const more = deductionsSec.more || {};
          const tds = taxesSec.tds || {};
          const tcs = taxesSec.tcs || {};
          const advanceTax = taxesSec.advance_tax || {};
          const selfAssess = taxesSec.self_assessment || {};

          // Business: presumptive + normal
          business = n(businessHP.presumptiveIncome44AD)
            + n(businessHP.presumptiveIncome44ADA)
            + n(businessHP.presumptiveIncome44AE)
            + n(businessHP.netBusinessIncome);

          // House property â€” support list or single
          const hpList = houseProperty.housePropertiesList || [];
          if (hpList.length > 0) {
            house = hpList.reduce((s, hp) => s + (n(hp.incomeFromProperty) || hpNet(hp)), 0);
          } else {
            house = hpNet(houseProperty);
          }

          // Capital gains
          capital = n(more.stcg) + n(more.ltcg)
            + n(more.stcg111A) + n(more.ltcg112A);

          // Other sources
          interest = n(otherSrc.savingsInterest) + n(otherSrc.depositInterest) + n(otherSrc.refundInterest);
          dividend = n(otherSrc.dividendIncome);
          other = n(more.agriculturalIncome) + n(otherSrc.otherIncome);

          // Deductions Chapter VI-A
          deductions = n(chapter6a.deduction80C)
            + Math.min(n(chapter6a.deduction80D), 75000)
            + n(chapter6a.deduction80G)
            + Math.min(n(chapter6a.deduction80TTA) + n(chapter6a.deduction80TTB), 50000)
            + n(chapter6a.deduction80GG)
            + n(chapter6a.deduction80GGA)
            + n(chapter6a.deduction80GGC)
            + n(chapter6a.deduction80IA)
            + n(chapter6a.deduction80IB)
            + n(chapter6a.deduction80E)
            + n(chapter6a.deduction80EE)
            + n(chapter6a.deduction80EEA)
            + n(chapter6a.deduction80U);

          // Taxes paid
          const tdsSum = (tds.tdsRows || []).reduce((s, r) => s + n(r.amountClaimed || r.tdsClaimed), 0);
          const tcsSum = (tcs.tcsRows || []).reduce((s, r) => s + n(r.amountClaimedTCS || r.tcsClaimed), 0);
          const advSum = (advanceTax.taxPayments || []).reduce((s, r) => s + n(r.taxAmountDeposited), 0);
          const satSum = (selfAssess.selfAssessmentRows || []).reduce((s, r) => s + n(r.taxAmountDeposited || r.amount), 0);
          taxes = tdsSum + tcsSum + advSum + satSum;

          // â”€â”€ Trust & Exempt Entities (ITR-7) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        } else if (filingType === 'Trust & Exempt Entities') {
          const income = state.income || {};
          const taxSec = state.tax || {};

          const houseProperty = income.house_property || {};
          const capitalGains = income.capital_gains || {};
          const otherSources = income.other_sources || {};
          const businessProfession = income.business_profession || {};

          const advTds = taxSec.advance_tds || {};

          // Business / profession
          business = n(businessProfession.bpGrossProfitPL)
            + n(businessProfession.bpSpeculativeProfit)
            - n(businessProfession.bpDepreciation)
            + n(businessProfession.bpOtherAdjustments);

          // Capital gains
          capital = n(capitalGains.stcgSec111A)
            + n(capitalGains.stcgOther)
            + n(capitalGains.stcgDepreciableAsset)
            + n(capitalGains.ltcgSec112)
            + n(capitalGains.ltcgSec112A);

          // House property
          const hpList = houseProperty.housePropertiesList || [];
          house = hpList.length > 0
            ? hpList.reduce((s, hp) => s + (n(hp.incomeFromProperty) || hpNet(hp)), 0)
            : hpNet(houseProperty);

          // Other sources
          interest = n(otherSources.osInterest);
          dividend = n(otherSources.osDividend);
          anonDonations = n(otherSources.osAnonymousDonations);
          other = n(otherSources.osRentalIncome)
            + n(otherSources.osOtherIncome)
            - n(otherSources.osDeductions);

          // Trust deductions = 0 (exempt status drives the reduction)
          deductions = 0;

          // Taxes paid
          const tdsSum = (advTds.tdsRows || []).reduce((s, r) => s + n(r.tdsClaimed || r.amountClaimed), 0);
          const tcsSum = (advTds.tcsRows || []).reduce((s, r) => s + n(r.tcsClaimed || r.amountClaimedTCS), 0);
          const advSum = (advTds.advanceTaxPayments || []).reduce((s, r) => s + n(r.amount || r.taxAmountDeposited), 0);
          const satSum = (advTds.selfAssessmentRows || []).reduce((s, r) => s + n(r.amount || r.taxAmountDeposited), 0);
          taxes = tdsSum + tcsSum + advSum + satSum;

          // â”€â”€ LLP / Firm / AOP-BOI / Company (ITR-5 / 6) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        } else if (['LLP', 'Firm', 'AOP/BOI', 'Cooperative Society', 'Company Private', 'Company Public'].includes(filingType)) {
          const income = state.income || {};
          const deductionsSec = state.deductions || {};
          const taxesSec = state.taxes || {};

          const businessHP = income.business || {};
          const presumptive = income.presumptive || {};
          const capitalGains = income.capital_gains || {};
          const houseProperty = income.house_property || {};
          const otherSrc = income.other_sources || {};
          const chapter6a = deductionsSec.chapter6a || {};

          const tds = taxesSec.tds || {};
          const tcs = taxesSec.tcs || {};
          const advanceTax = taxesSec.advance_tax || {};
          const selfAssess = taxesSec.self_assessment || {};

          // Business income: use P&L net profit + presumptive + adjustments
          const plProfit = n(state.financials?.profit_loss?.netProfitPL
            || state.financials?.profit_loss?.netProfitBeforeTax);
          const rawBusiness = n(businessHP.netBusinessIncome
            || businessHP.netIncomeFromBusiness
            || businessHP.netProfitAsPerPL
            || plProfit);

          // P&L adjustments (add disallowances, subtract IT depreciation)
          const disallowance37 = n(businessHP.disallowanceSec37);
          const disallowance40A3 = n(businessHP.disallowanceSec40A3);
          const bookDep = n(businessHP.bookDepreciation);
          const itDep = n(businessHP.itDepreciation);
          const directorRem = n(businessHP.directorRemuneration); // Company only

          business = rawBusiness
            + disallowance37 + disallowance40A3 + bookDep
            - itDep
            + n(presumptive.presumptiveIncome44AD)
            + n(presumptive.presumptiveIncome44ADA)
            + n(presumptive.presumptiveIncome44AE)
            + (filingType.includes('Company') ? directorRem : 0);

          // Capital gains
          capital = n(capitalGains.shortTermCG15Percent)
            + n(capitalGains.shortTermCGOther)
            + n(capitalGains.longTermCG10Percent)
            + n(capitalGains.longTermCG20Percent);

          // House property
          if (['LLP', 'Firm', 'AOP/BOI'].includes(filingType)) {
            const hpList = houseProperty.housePropertiesList || [];
            house = hpList.length > 0
              ? hpList.reduce((s, hp) => s + (n(hp.incomeFromProperty) || hpNet(hp)), 0)
              : hpNet(houseProperty);
          } else {
            house = n(houseProperty.incomeFromHP) || hpNet(houseProperty);
          }

          // Other sources
          interest = n(otherSrc.interestFromSavings)
            + n(otherSrc.interestFromDeposits)
            + n(otherSrc.interestFromITRefund);
          dividend = n(otherSrc.dividendIncome);
          other = n(otherSrc.incomeFromVDA) + n(otherSrc.otherIncome);

          // Deductions â€” entity-type filtered
          if (['LLP', 'Firm', 'AOP/BOI', 'Cooperative Society'].includes(filingType)) {
            deductions = n(chapter6a.deduction80G)
              + n(chapter6a.deduction80GGA)
              + n(chapter6a.deduction80GGC)
              + n(chapter6a.deduction80IA)
              + n(chapter6a.deduction80IB)
              + n(chapter6a.deduction80IC)
              + n(chapter6a.deduction80IE)
              + n(chapter6a.deduction80JJAA)
              + n(chapter6a.deduction80P);
          } else {
            // Company (ITR-6)
            deductions = n(chapter6a.deduction80G)
              + n(chapter6a.deduction80GGB)
              + n(chapter6a.deduction80GGA)
              + n(chapter6a.deduction80GGC)
              + n(chapter6a.deduction80IA)
              + n(chapter6a.deduction80IAB)
              + n(chapter6a.deduction80IAC)
              + n(chapter6a.deduction80IB)
              + n(chapter6a.deduction80IBA)
              + n(chapter6a.deduction80IC)
              + n(chapter6a.deduction80IE)
              + n(chapter6a.deduction80JJA)
              + n(chapter6a.deduction80JJAA)
              + n(chapter6a.deduction80LA)
              + n(chapter6a.deduction80M)
              + n(chapter6a.deduction80PA);
          }

          // Taxes paid
          const tdsSum = (tds.tdsRows || []).reduce((s, r) => s + n(r.amountClaimed || r.tdsClaimed), 0);
          const tcsSum = (tcs.tcsRows || []).reduce((s, r) => s + n(r.amountClaimedTCS || r.tcsClaimed), 0);
          const advSum = (advanceTax.taxPayments || []).reduce((s, r) => s + n(r.taxAmountDeposited), 0);
          const satSum = (selfAssess.selfAssessmentRows || []).reduce((s, r) => s + n(r.taxAmountDeposited || r.amount), 0);
          taxes = tdsSum + tcsSum + advSum + satSum;

          // â”€â”€ Individual (flat-field mapping) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        } else if (isIndividual) {
          interest = n(state.interestIncome);
          business = n(state.businessIncome) + n(state.businessIncomeNormal)
            + n(state.businessIncome44AD) + n(state.businessIncome44ADA) + n(state.businessIncome44AE);
          dividend = n(state.dividendIncome);
          other = n(state.otherIncome);
          capital = n(state.capitalGains) + n(state.stcg) + n(state.ltcg);

          const hpList = state.houseProperties;
          if (Array.isArray(hpList)) {
            house = hpList.reduce((s, hp) => s + (n(hp.incomeFromProperty) || hpNet(hp)), 0);
          } else {
            house = n(hpList);
          }

          deductions = Math.min(n(state.deduction80C), 150000)
            + Math.min(n(state.deduction80D), 75000)
            + n(state.deduction80G)
            + Math.min(n(state.deduction80TTA) + n(state.deduction80TTB), 50000)
            + n(state.deduction80GGC)
            + n(state.deduction80E)
            + n(state.deduction80EE)
            + n(state.deduction80EEA)
            + n(state.deduction80U)
            + n(state.taxSavingsDeductions);

          taxes = n(state.taxesPaid)
            + n(state.tdsNonSalary) + n(state.tdsProperty)
            + n(state.tcsVal) + n(state.advanceTax);
        }

        // â”€â”€ Gross Total Income â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const salary = isIndividual ? n(state.salaryIncome) : 0;
        const crypto = n(state.cryptoIncome);
        const grossIncome = salary + interest + capital + house + dividend + business + crypto + other;
        const totalDeductions = Math.max(0, deductions);

        // â”€â”€ Standard Deduction (salary earners only) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const stdDedOld = (isIndividual && salary > 0) ? 50000 : 0;
        const stdDedNew = (isIndividual && salary > 0) ? 75000 : 0;

        // â”€â”€ Net Taxable Income â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const oldTaxableIncome = Math.max(0, grossIncome - stdDedOld - totalDeductions);
        const newTaxableIncome = Math.max(0, grossIncome - stdDedNew - totalDeductions);

        // â”€â”€ Corporate regime selection â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const regime = state.selectedRegime || 'new';
        const corporateRegime = state.corporateRegime || regime; // '115BAA' | '115BAB' | '115BA' | 'new' | 'old'

        const effectiveRegime = filingType.includes('Company') ? corporateRegime : regime;

        // â”€â”€ Tax calculation â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
        const oldRegimeTaxCalc = calculateTax(oldTaxableIncome, OLD_REGIME_SLABS, 'old', filingType, anonDonations);
        const newRegimeTaxCalc = calculateTax(newTaxableIncome, NEW_REGIME_SLABS, effectiveRegime, filingType, anonDonations);

        const oldRegimeTax = oldRegimeTaxCalc.finalTax;
        const newRegimeTax = newRegimeTaxCalc.finalTax;

        const taxComparison = {
          old: oldRegimeTax,
          new: newRegimeTax,
          savings: Math.abs(oldRegimeTax - newRegimeTax),
          betterRegime: oldRegimeTax <= newRegimeTax ? 'old' : 'new',
        };

        const activeTaxableIncome = regime === 'new' ? newTaxableIncome : oldTaxableIncome;
        const activeTaxCalc = regime === 'new' ? newRegimeTaxCalc : oldRegimeTaxCalc;
        const estimatedTax = activeTaxCalc.finalTax;

        // â”€â”€ Taxes paid (always direct value, never back-calculate) â”€â”€â”€â”€â”€â”€
        const taxesPaid = taxes;
        const rawBalance = taxesPaid - estimatedTax;

        const itrSelection = determineITRType(state);

        const activeStdDed = regime === 'new' ? stdDedNew : stdDedOld;
        // taxableIncome shown in summary = grossIncome − Chapter VI-A deductions only
        // (standard deduction is displayed separately as part of salary head)
        const displayTaxableIncome = Math.max(0, grossIncome - totalDeductions);

        return {
          grossIncome: Math.round(grossIncome),
          totalDeductions: Math.round(totalDeductions),
          standardDeduction: Math.round(activeStdDed),
          taxableIncome: Math.round(displayTaxableIncome),
          activeTaxableIncome: Math.round(activeTaxableIncome),
          oldTaxableIncome: Math.round(oldTaxableIncome),
          newTaxableIncome: Math.round(newTaxableIncome),
          estimatedTax: Math.round(estimatedTax),
          taxesPaid: Math.round(taxesPaid),
          oldRegimeTax,
          newRegimeTax,
          taxComparison,
          slabBreakdown: activeTaxCalc.slabWiseBreakdown,
          cess: activeTaxCalc.cess,
          slabTax: activeTaxCalc.taxBeforeRebate,
          rebate: activeTaxCalc.rebate,
          surcharge: activeTaxCalc.surcharge,
          refundOrDue: Math.abs(rawBalance),
          isRefund: rawBalance > 0,
          itrType: itrSelection.type,
          itrReason: itrSelection.reason,
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
  for (const key of Object.keys(state)) {
    if (
      typeof state[key] !== 'function' &&
      key !== 'profiles' &&
      key !== 'activeProfileId' &&
      key !== 'profileDataMap' &&
      key !== 'isDropdownOpen' &&
      key !== 'isFilingTypeModalOpen'
    ) {
      snapshot[key] = state[key];
    }
  }
  return snapshot;
}
