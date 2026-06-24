import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { calculateTax, NEW_REGIME_SLABS, OLD_REGIME_SLABS, determineITRType } from '../utils/taxCalculator';
import { taxReturnService } from '../services/taxReturnService';

const getProfileDetails = (currentFilingType, state, p) => {
  let profileName = p.name;
  let profilePan = p.pan;
  if (['Individual', 'ITR1', 'ITR2', 'ITR3', 'ITR4',].includes(currentFilingType)) {
    const perm = state.details?.permanent || {};
    profileName = [perm.firstName, perm.middleName, perm.lastName].filter(Boolean).join(' ') || p.name;
    profilePan = perm.panNumber || p.pan;
  } else if (currentFilingType === 'HUF') {
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
  return { name: profileName, pan: profilePan };
};

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

  // Normalized Form 16 data — set after upload, used as source of truth for auto-fill
  form16Data: null,

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

      /** Store the normalized Form 16 JSON (output of parseForm16Response) */
      setForm16Data: (form16Data) => set({ form16Data }),

      /** Clear Form 16 data (e.g. when starting a fresh filing) */
      clearForm16Data: () => set({ form16Data: null }),

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
            const { name: profileName, pan: profilePan } = getProfileDetails(currentFilingType, state, p);

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
            const { name: profileName, pan: profilePan } = getProfileDetails(currentFilingType, state, p);

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
        const isStructured = ['HUF', 'LLP', 'Firm', 'AOP/BOI', 'Company Private', 'Company Public', 'Trust & Exempt Entities',
          'Individual', 'ITR1', 'ITR2', 'ITR3', 'ITR4'].includes(currentFilingType);

        const updatedProfiles = state.profiles.map(p => {
          if (p.id === state.activeProfileId) {
            const currentFilingType = state.selectedFilingType || state.filingType || 'Individual';
            const { name: profileName, pan: profilePan } = getProfileDetails(currentFilingType, state, p);

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
        if (['HUF', 'LLP', 'Firm', 'AOP/BOI', 'Company Private', 'Company Public',
          'Individual', 'ITR1', 'ITR2', 'ITR3', 'ITR4'].includes(filingType)) {
          payload.details = state.details || {};
          payload.income = state.income || {};
          payload.deductions = state.deductions || {};
          payload.taxes = state.taxes || {};
          payload.filing = state.filing || {};
          payload.selected_regime = state.selectedRegime || 'new';
          payload.tax_summary = {
            ...summary,
            grossIncome: summary.grossIncome,
            totalDeductions: summary.totalDeductions,
            taxableIncome: summary.activeTaxableIncome,
            estimatedTax: summary.estimatedTax,
            taxesPaid: summary.taxesPaid,
            refundOrDue: summary.refundOrDue,
            isRefund: summary.isRefund,
          };


          if (['LLP', 'Firm', 'AOP/BOI', 'Company Private', 'Company Public', 'ITR3'].includes(filingType)) {
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

      calculateSummary: (explicitFilingType) => {
        const state = get();
        const filingType = explicitFilingType || state.selectedFilingType || state.filingType || 'Individual';
        const isIndividual = filingType === 'Individual';
        const isHuf = filingType === 'HUF';

        // Helper: safe number
        const n = (v) => Number(v || 0);

        const hpNet = (hp) => {
          const grossRent = n(hp.grossRent || hp.annualRentReceivable || hp.annualValue || hp.grossRentReceived || 0);
          const munTax = n(hp.municipalTaxes || hp.taxPaidLocal || hp.localTaxesPaid || hp.localAuthorityTaxesPaid || 0);
          const nav = grossRent - munTax;
          const stdDed = Math.round(nav * 0.3);
          const loanInt = n(hp.homeLoanInterest || hp.interestBorrowedCapital || hp.interestOnHomeLoan || hp.loanInterestSec24b || hp.interestOnBorrowedCapital24b_hp || 0);
          // self-occupied: NAV = 0, loss capped at 2L
          if (hp.housePropertyType === 'Self-Occupied' || hp.propertyType === 'Self-Occupied' || hp.typeOfHouseProperty === 'Self-Occupied') {
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

        // ── HUF ────────────────────────────────────────────────────────
        if (isHuf || ['Individual', 'ITR1', 'ITR2', 'ITR3', 'ITR4',].includes(filingType)) {
          const income = state.income || {};
          const deductionsSec = state.deductions || {};
          const taxesSec = state.taxes || {};

          let businessHP = income.business || {};
          let houseProperty = income.house_property || {};
          let otherSrc = income.other || {};
          // let capGains = income.capital_gains || {};
          let chapter6a = deductionsSec.chapter6a || {};
          let more = deductionsSec.more || {};
          let tds = taxesSec.tds || {};
          let tcs = taxesSec.tcs || {};
          let advanceTax = taxesSec.advance_tax || {};
          let selfAssess = taxesSec.self_assessment || {};

          if (filingType === 'ITR1') {
            houseProperty = income['house-property-income'] || {};
            otherSrc = income['other-sources-income'] || {};
            chapter6a = {
              ...(deductionsSec['savings-and-pension-deductions'] || {}),
              ...(deductionsSec['medical-health-deductions'] || {}),
              ...(deductionsSec['loan-interest-deductions'] || {}),
              ...(deductionsSec['charitable-donations-schedule'] || {}),
              ...(deductionsSec['scientific-political-disability-deductions'] || {})
            };
            tds = taxesSec['tds-schedules-ledger'] || {};
            tcs = taxesSec['tcs-and-challan-schedules'] || {};
            advanceTax = taxesSec['tcs-and-challan-schedules'] || {};
            selfAssess = {};
          } else if (filingType === 'ITR2' || filingType === 'Individual2') {
            // Individual2 subsection IDs from filingConfig.js
            houseProperty = income['schedule-hp-house-property'] || {};
            otherSrc = income['schedule-os-other-sources'] || {};
            chapter6a = deductionsSec['schedule-via-deductions'] || {};
            tds = taxesSec['tax-payments-schedules'] || {};
            tcs = taxesSec['tax-payments-schedules'] || {};
            advanceTax = taxesSec['tax-payments-schedules'] || {};
          } else if (filingType === 'ITR3') {
            businessHP = {
              ...(income['business_profession_regular'] || {}),
              ...(income['business_profession_presumptive'] || {})
            };
            houseProperty = income['salary_house_property_schedules'] || {};
            otherSrc = income['salary_house_property_schedules'] || {};
            chapter6a = deductionsSec['chapter_via_and_10a'] || {};
            tds = taxesSec['tax_payments_schedules'] || {};
            tcs = taxesSec['tax_payments_schedules'] || {};
            advanceTax = taxesSec['tax_payments_schedules'] || {};
          } else if (filingType === 'ITR4' || filingType === 'Individual4') {
            // Individual4 subsection IDs from filingConfig.js
            businessHP = income['business'] || {};
            houseProperty = income['house_property'] || {};
            otherSrc = income['other'] || {};
            chapter6a = deductionsSec['chapter6a'] || {};
            tds = taxesSec['tds'] || {};
            tcs = taxesSec['tds'] || {};
            advanceTax = taxesSec['advance_tax'] || {};
          }

          // Business: presumptive + normal
          business = n(businessHP.presumptiveIncome44AD)
            + n(businessHP.presumptiveIncome44ADA)
            + n(businessHP.presumptiveIncome44AE)
            + n(businessHP.netBusinessIncome)
            + n(businessHP.finalNetBpIncome);

          // House property — support list or single
          const hpList = houseProperty.housePropertiesList || houseProperty.properties || [];
          if (hpList.length > 0) {
            house = hpList.reduce((s, hp) => s + (n(hp.incomeFromProperty || hp.annualValueHP || hp.hpFinalPropertyIncome) || hpNet(hp)), 0);
          } else {
            house = n(houseProperty.hpTotalFinalIncome) || n(houseProperty.hpFinalPropertyIncome) || hpNet(houseProperty);
          }

          // Capital gains — Individual2 uses schedule-cg-capital-gains subsection
          const capGains = income.capital_gains
            || income['schedule-cg-capital-gains']
            || {};
          capital = n(more.stcg) + n(more.ltcg)
            + n(more.stcg111A) + n(more.ltcg112A)
            + n(capGains.stcg) + n(capGains.ltcg)
            + n(capGains.stcgTotal) + n(capGains.ltcgTotal)
            + n(capGains.stcg111A) + n(capGains.ltcg112A)
            + n(capGains.stcgImmovableNetGains) + n(capGains.ltcgImmovableNetGains)
            + n(capGains.stcgSec111A) + n(capGains.stcgOther)
            + n(capGains.cgStImmovableFinalGains) + n(capGains.cgSlumpSaleFinalGains)
            + n(capGains.cgStEquityFinalGainsPostJul2024) + n(capGains.cgStEquityFinalGainsPreJul2024)
            + n(capGains.cgStNrSharesSec111APreJul2024) + n(capGains.cgStNrSharesSec111APostJul2024)
            + n(capGains.cgStNrSharesOther) + n(capGains.cgStFiiFinalGains) + n(capGains.cgStTotalDeemedA6)
            + n(capGains.ltcgSec112APreJul2024) + n(capGains.ltcgSec112APostJul2024) + n(capGains.ltcgSec112ATotal);

          // Other sources
          interest = n(otherSrc.savingsInterest) + n(otherSrc.depositInterest) + n(otherSrc.refundInterest)
            + n(otherSrc.interestFromSavingsBankAccount) + n(otherSrc.interestFromDeposits) + n(otherSrc.interestFromIncomeTaxRefund)
            + n(otherSrc.osInterestSavings) + n(otherSrc.osInterestDeposits) + n(otherSrc.osInterestItRefund) + n(otherSrc.osInterestPf1) + n(otherSrc.osInterestPf2) + n(otherSrc.osInterestPf3) + n(otherSrc.osInterestPf4) + n(otherSrc.osInterestOthers);
          dividend = n(otherSrc.dividendIncome) + n(otherSrc.osDividendOther) + n(otherSrc.osDividendSec2_22_e) + n(otherSrc.osDividendSec2_22_f);
          other = n(more.agriculturalIncome) + n(otherSrc.otherIncome)
            + n(otherSrc.familyPensionAmount) + n(otherSrc.pfInterestTaxable1stProviso10_11)
            + n(otherSrc.pfInterestTaxable2ndProviso10_11) + n(otherSrc.pfInterestTaxable1stProviso10_12)
            + n(otherSrc.pfInterestTaxable2ndProviso10_12) + n(otherSrc.anyOtherIncomeWithDescription)
            + n(otherSrc.osFamilyPension) + n(otherSrc.osRetirement89ANonNotified) + n(otherSrc.osGiftTotalSec56_2_x)
            + n(otherSrc.osWinningsLotteriesSec115BB) + n(otherSrc.osWinningsOnlineGamesSec115BBJ);

          // Deductions Chapter VI-A
          const sumRows = (arr, field) => (Array.isArray(arr) ? arr.reduce((s, r) => s + n(r[field]), 0) : 0);

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
            + n(chapter6a.deduction80U)
            // ITR1/ITR2/ITR4 specific dynamic extraction
            + n(chapter6a.totalDeductionUsh80C) + sumRows(chapter6a['section-80c-repeating-grid'], 'sec80cEligibleAmount')
            + n(chapter6a.totalDeductionUsh80CCC) + sumRows(chapter6a['section-80ccc-repeating-grid'], 'sec80cccDeductionAmount')
            + n(chapter6a.sec80dEligibleAmountOfDeductionTotal)
            + sumRows(chapter6a['loan-interest-shared-columns'], 'loanIntInterestAmountClaimed')
            + sumRows(chapter6a['donation-financial-quanta'], 'donEligibleAmountRowDeduction') + n(chapter6a.donEligibleAmountRowDeduction)
            + sumRows(chapter6a['schedule-80gga-scientific-research'], 'sec80ggaEligibleAmount') + n(chapter6a.sec80ggaEligibleAmount)
            + sumRows(chapter6a['schedule-80ggc-political-parties'], 'sec80ggcEligibleAmount') + n(chapter6a.sec80ggcEligibleAmount)
            + sumRows(chapter6a['disability-self-80u'], 'sec80uDeductionAmount') + n(chapter6a.sec80uDeductionAmount)
            + sumRows(chapter6a['disability-dependent-80dd'], 'sec80ddDeductionAmount') + n(chapter6a.sec80ddDeductionAmount)
            + sumRows(chapter6a.dedSec80C_table, 'amount') + sumRows(chapter6a.dedSec80CCC_table, 'amount')
            + sumRows(chapter6a.dedSec80CCD_1_table, 'amount') + sumRows(chapter6a.dedSec80CCD_1B_table, 'amount')
            + n(chapter6a.dedSec80CCD_2) + n(chapter6a.dedSec80CCG) + n(chapter6a.dedSec80CCF)
            + n(chapter6a.dedSec80D_auto) + n(chapter6a.dedSec80DD_auto) + n(chapter6a.dedSec80DDB)
            + n(chapter6a.dedSec80E_auto) + n(chapter6a.dedSec80EE_auto) + n(chapter6a.dedSec80EEA_auto)
            + n(chapter6a.dedSec80EEB_auto) + n(chapter6a.dedSec80G_auto) + n(chapter6a.dedSec80GG)
            + n(chapter6a.dedSec80GGA_auto) + n(chapter6a.dedSec80GGC_auto) + n(chapter6a.dedSec80TTA)
            + n(chapter6a.dedSec80TTB) + n(chapter6a.dedSec80U_auto) + n(chapter6a.dedSec80CCH)
            + n(chapter6a.dedAnyOtherAmount) + n(chapter6a.sec80DEligibleDeductionCalculated)
            + n(chapter6a.totalDeductionsPartB) + n(chapter6a.totalDeductionsPartC);



          const extractFromSection = (sec, rowFields, directFields) => {
            if (!sec || typeof sec !== 'object') return 0;
            let sum = 0;
            let hasDirectField = false;

            // 1. Direct fields take absolute precedence over arrays to avoid ghost double-counting.
            for (const f of directFields) {
              if (f in sec) {
                sum += n(sec[f]);
                hasDirectField = true;
              }
            }

            if (hasDirectField) {
              return sum;
            }

            // 2. Fallback to arrays if no direct fields exist (e.g., HUF/LLP using repeating grids)
            Object.values(sec).forEach(val => {
              if (Array.isArray(val)) {
                sum += val.reduce((s, r) => {
                  for (const f of rowFields) { if (r[f]) return s + n(r[f]); }
                  return s;
                }, 0);
              }
            });
            return sum;
          };

          const tdsSum = extractFromSection(
            tds,
            ['taxDeductedSalary', 'tdsClaimedThisYear', 'amountClaimed', 'tdsClaimed', 'taxDeducted', 'taxDeductedNonSalary'],
            ['tds1TotalTaxDeductedRow', 'tds2CreditClaimedThisYear', 'tds3CreditClaimedThisYear', 'claimedTotalTDS', 'taxDeductedSalary', 'amountClaimed']
          );
          const tcsSum = extractFromSection(
            tcs,
            ['amountClaimedTCS', 'tcsClaimed', 'amountClaimed', 'tcsAmount', 'tcsCreditClaimedThisYear'],
            ['tcs1TotalTcsRow', 'claimedTotalTCS', 'amountClaimedTCS']
          );
          const advSum = extractFromSection(
            advanceTax,
            ['taxAmountDeposited', 'amount', 'challanTaxPaidAmount'],
            ['totalAdvanceTaxPaid', 'taxAmountDeposited']
          );
          const satSum = extractFromSection(
            selfAssess,
            ['taxAmountDeposited', 'amount', 'challanTaxPaidAmount'],
            ['totalSelfAssessmentTaxPaid', 'taxAmountDeposited']
          );

          taxes = tdsSum + tcsSum + advSum + satSum;
          Object.assign(state, {
            _taxBreakdown: { tdsSum, tcsSum, advSum, satSum }
          });
          var _tdsSum = tdsSum, _tcsSum = tcsSum, _advSum = advSum, _satSum = satSum;

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

          // ── LLP / Firm / AOP-BOI / Company (ITR-5 / 6) ──────────────────────────────────────────
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

          // Deductions — entity-type filtered
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

          // ── Individual (flat-field mapping) ──────────────────────────────────────────────────
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

        // ── Gross Total Income ────────────────────────────────────────────────────────────────
        const isAnyIndividual = ['Individual', 'ITR1', 'ITR2', 'ITR3', 'ITR4',].includes(filingType);

        // Helper to extract chargeable salary from a salary section object
        const extractSalary = (salarySec) => {
          if (!salarySec) return 0;
          // Prefer pre-computed chargeable salary fields if the user has explicitly set or cleared them
          if ('incomeChargeableSalaries' in salarySec) return n(salarySec.incomeChargeableSalaries);
          if ('incomeChargeableUnderSalaries' in salarySec) return n(salarySec.incomeChargeableUnderSalaries);
          if ('incomeChargeableSalary' in salarySec) return n(salarySec.incomeChargeableSalary);
          // Fall back to computing from components
          const exemptVal = Array.isArray(salarySec.exemptAllowances)
            ? salarySec.exemptAllowances.reduce((acc, curr) => acc + n(curr.amount), 0)
            : n(salarySec.exemptAllowances);
          const hraVal = n(salarySec.sec10_13A || salarySec.hraEligibleExemption);
          const gross = n(salarySec.grossSalary || salarySec.grossSalaryTotal)
            || (n(salarySec.salary17_1 || salarySec.salaryAsPerSection17_1)
              + n(salarySec.salary17_2 || salarySec.valueIOfPerquisitesuS17_2)
              + n(salarySec.salary17_3 || salarySec.profitInLieuOfSalaryuS17_3));
          const stdDed = n(salarySec.standardDeduction16_ia || salarySec.deductionStandard);
          const profTax = n(salarySec.professionalTax || salarySec.professionalTax16_iii || salarySec.deductionProfessionalTax);
          const entAllow = n(salarySec.entertainmentAllowance || salarySec.entertainmentAllowance16_ii);
          return Math.max(0, gross - exemptVal - hraVal - stdDed - profTax - entAllow);
        };

        let salary = 0;
        if (filingType === 'ITR1') {
          salary = extractSalary((state.income || {})['salary-pension-income'] || {});
        } else if (filingType === 'ITR2') {
          // Individual2: schedule-s-salary subsection
          salary = extractSalary((state.income || {})['schedule-s-salary'] || {});
        } else if (filingType === 'ITR3') {
          const salarySec = (state.income || {})['salary_house_property_schedules'] || {};
          const employers = salarySec.employers || salarySec.employersList || [];
          if (employers.length > 0) {
            salary = employers.reduce((acc, emp) => {
              const gross = n(emp.salarySec17_1) + n(emp.perquisitesSec17_2) + n(emp.profitInLieuSalary);
              const net = gross - n(emp.exemptAllowancesSec10) - n(emp.standardDeduction16) - n(emp.professionalTax);
              return acc + Math.max(0, net);
            }, 0);
          } else {
            salary = extractSalary(salarySec);
          }
        } else if (filingType === 'ITR4') {
          const otherSec = (state.income || {}).other || {};
          const gross = n(otherSec.salarySec17_1) + n(otherSec.perquisitesSec17_2)
            + n(otherSec.salary17_1) + n(otherSec.salary17_2);
          const regime = state.selectedRegime || 'new';
          const stdDedLimit = regime === 'new' ? 75000 : 50000;
          const stdDed = Math.min(gross, stdDedLimit);
          const profTax = n(otherSec.profTaxSec16_iii || otherSec.professionalTax);
          salary = Math.max(0, gross - stdDed - profTax);
        } else if (isIndividual) {
          salary = n(state.salaryIncome);
        }
        const crypto = n(state.cryptoIncome);
        const grossIncome = salary + interest + capital + house + dividend + business + crypto + other;
        const totalDeductions = Math.max(0, deductions);


        const stdDedOld = (isAnyIndividual && salary > 0) ? 50000 : 0;
        const stdDedNew = (isAnyIndividual && salary > 0) ? 75000 : 0;


        const oldTaxableIncome = Math.max(0, grossIncome - stdDedOld - totalDeductions);
        const newTaxableIncome = Math.max(0, grossIncome - stdDedNew - totalDeductions);

        const regime = state.selectedRegime || 'new';
        const corporateRegime = state.corporateRegime || regime; // '115BAA' | '115BAB' | '115BA' | 'new' | 'old'

        const effectiveRegime = filingType.includes('Company') ? corporateRegime : regime;


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

        const taxesPaid = taxes;
        const rawBalance = taxesPaid - estimatedTax;

        const itrSelection = determineITRType(state);

        const activeStdDed = regime === 'new' ? stdDedNew : stdDedOld;

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
