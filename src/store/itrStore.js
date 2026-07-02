import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  calculateTax,
  NEW_REGIME_SLABS,
  OLD_REGIME_SLABS,
  determineITRType,
} from "../utils/taxCalculator";
import { taxReturnService } from "../services/taxReturnService";

const getProfileDetails = (currentFilingType, state, p) => {
  let profileName = p.name;
  let profilePan = p.pan;
  if (
    ["Individual", "ITR1", "ITR2", "ITR3", "ITR4"].includes(currentFilingType)
  ) {
    const perm =
      state.details?.permanent ||
      state.details?.["personal-identity"] ||
      state.details?.["part-a-gen"] ||
      state.details?.["general_info"] ||
      {};
    profileName =
      [perm.firstName, perm.middleName, perm.lastName]
        .filter(Boolean)
        .join(" ") || p.name;
    profilePan = perm.panNumber || perm.pan || p.pan;
  } else if (currentFilingType === "HUF") {
    const hufInfo = state.details?.permanent || {};
    profileName = hufInfo.hufName || p.name;
    profilePan = hufInfo.panNumber || p.pan;
  } else if (currentFilingType === "LLP") {
    const llpInfo = state.details?.general || {};
    profileName = llpInfo.llpName || p.name;
    profilePan = llpInfo.panNumber || p.pan;
  } else if (currentFilingType === "Firm") {
    const firmInfo = state.details?.general || {};
    profileName = firmInfo.firmName || p.name;
    profilePan = firmInfo.panNumber || p.pan;
  } else if (currentFilingType === "AOP/BOI") {
    const aopInfo = state.details?.general || {};
    profileName = aopInfo.aopName || p.name;
    profilePan = aopInfo.panNumber || p.pan;
  } else if (
    ["Company Private", "Company Public"].includes(currentFilingType)
  ) {
    const companyInfo = state.details?.general || {};
    profileName = companyInfo.companyName || p.name;
    profilePan = companyInfo.panNumber || p.pan;
  } else if (currentFilingType === "Trust & Exempt Entities") {
    const trustInfo = state.basic?.entity_details || {};
    profileName = trustInfo.entityName || p.name;
    profilePan = trustInfo.panNumber || p.pan;
  } else {
    profileName =
      state.firstName && state.lastName
        ? `${state.firstName} ${state.lastName}`.trim()
        : p.name;
    profilePan = state.panNumber || p.pan;
  }
  return { name: profileName, pan: profilePan };
};

const defaultFormData = {
  entityType: "",
  formData: {
    details: {},
    income: {},
    financials: {},
    deductions: {},
    taxes: {},
    filing: {},
  },
  selectedRegime: "new",
  userId: "",
  firstName: "",
  middleName: "",
  lastName: "",
  dateOfBirth: "",
  fatherName: "",
  aadhaarNumber: "",
  panNumber: "",
  mobileNumber: "",
  email: "",
  flatNo: "",
  premiseName: "",
  roadStreet: "",
  areaLocality: "",
  pincode: "",
  country: "INDIA",
  state: "",
  city: "",
  salaryFilePath: "",
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
  bankAccounts: [
    { accountNumber: "", ifscCode: "", bankName: "", accountType: "SAVING" },
  ],
  currentStep: 1,
  filingStatus: "Pending",
  acknowledgementNumber: "",

  // Normalized Form 16 data — set after upload, used as source of truth for auto-fill
  form16Data: null,
  eligibilityAnswers: {},

  // HUF and LLP Step & Sub-Tab based nested data structure
  details: {
    // HUF specific
    permanent: {},
    karta: {},
    members: {
      coparceners: [],
    },
    additional: {},
    registration: {},

    // LLP specific
    general: {},
    address: {},
    partners: {
      partners: [],
      partnerChanges: [],
    },
    business_nature: {
      businessNatures: [],
    },
    tax_regime: {},
    audit: {},
  },
  income: {
    business: {},
    house_property: {
      housePropertiesList: [],
    },
    capital: {},
    house: {
      housePropertiesList: [],
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
      foreignAssetsList: [],
    },
  },
  financials: {
    bs_sources: {},
    bs_application: {},
    profit_loss: {},
  },
  deductions: {
    chapter6a: {},
    more: {}, // HUF
    exempt_income: {}, // LLP
    losses: {}, // LLP
  },
  taxes: {
    tds: {
      tdsRows: [],
    },
    advance_tax: {
      taxPayments: [],
    },
    ais: {},
    self: {
      taxPayments: [],
    },
    loss: {},
    // LLP additions
    tcs: {
      tcsRows: [],
    },
    amt: {},
  },
  filing: {
    gst: {
      gstRows: [],
    },
    bank: {
      bankAccounts: [],
    },
    more: {},
    efiling: {},
  },
  // Trust & Exempt Entities Step & Sub-Tab based nested data structure
  basic: {
    entity_details: {},
    projects_institutions: {
      projectsList: [],
      tradeCommerceList: [],
      universityInstitutionList: [],
    },
  },
  personal: {
    registration_it: {
      sectionRegisteredRows: [],
    },
    registration_other: {
      lawPortalRows: [],
    },
    filing_status: {},
    other_details: {
      hasUnlistedSharesRows: [],
    },
  },
  audit: {
    transfer_pricing: {},
    income_tax_audit: {},
    other_act_audit: {
      otherActAuditRows: [],
    },
    aop_members: {
      membersAopRows: [],
      trusteeFounderRows: [],
      beneficialOwnerRows: [],
      substantialContributorRows: [],
      relativeRows: [],
    },
  },
  schedules: {
    schedule_i: {
      scheduleIRows: [],
    },
    schedule_vc: {},
    schedule_ai_er: {},
    schedule_j: {
      corpusJRows: [],
      loanJRows: [],
      investJRows: [],
    },
    schedule_la_et: {},
    balance_sheet: {},
  },
  tax: {
    total_income: {},
    advance_tds: {
      advanceTaxPayments: [],
      tdsRows: [],
      tcsRows: [],
    },
    verification: {},
  },
};

const initialState = {
  ...defaultFormData,

  profiles: [
    {
      id: "1",
      name: "New User",
      pan: "Not Available",
      assessmentYear: "2026-27",
      filingType: "Individual",
      currentStep: 1,
      form16Data: {},
      incomeSources: {},
      taxSaving: {},
      bankDetails: {},
      filingStatus: "Pending",
      acknowledgementNumber: "",
      createdAt: Date.now(),
    },
  ],
  activeProfileId: "1",

  profileDataMap: {},

  isDropdownOpen: false,
  isFilingTypeModalOpen: false,
  selectedFilingType: "Individual",
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

      setField: (field, value) =>
        set((state) => {
          const updatedState = { ...state, [field]: value };

          // Synchronize entityType
          if (field === "selectedFilingType" || field === "filingType") {
            updatedState.entityType = value;
          }

          const stepsList = [
            "details",
            "income",
            "financials",
            "deductions",
            "taxes",
            "filing",
            "basic",
            "personal",
            "audit",
            "schedules",
            "tax",
          ];
          if (stepsList.includes(field)) {
            updatedState.formData = {
              ...(state.formData || {}),
              [field]: value,
            };
          }

          return updatedState;
        }),

      setFields: (fields) =>
        set((state) => {
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

          const stepsList = [
            "details",
            "income",
            "financials",
            "deductions",
            "taxes",
            "filing",
            "basic",
            "personal",
            "audit",
            "schedules",
            "tax",
          ];
          const updatedFormData = { ...(state.formData || {}) };

          let hasFormDataUpdate = false;
          stepsList.forEach((step) => {
            if (fields[step] !== undefined) {
              updatedFormData[step] = fields[step];
              hasFormDataUpdate = true;
            }
          });

          if (hasFormDataUpdate) {
            updatedState.formData = updatedFormData;
          }

          if (fields.formData) {
            stepsList.forEach((step) => {
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

      setIsDropdownOpen: (value) =>
        set(() => {
          if (typeof value === "function") {
            return { isDropdownOpen: value(get().isDropdownOpen) };
          }
          return { isDropdownOpen: value };
        }),

      setIsFilingTypeModalOpen: (value) =>
        set({ isFilingTypeModalOpen: value }),

      setSelectedFilingType: (value) => set({ selectedFilingType: value }),

      setSelectedTaxpayer: async (taxpayer) => {
        set({ selectedTaxpayer: taxpayer, expandedCardId: null });
        if (taxpayer) {
          await get().fetchItrReturns(taxpayer.id);
        }
      },

      setExpandedCardId: (id) =>
        set((state) => ({
          expandedCardId: state.expandedCardId === id ? null : id,
        })),

      fetchTaxpayers: async () => {
        set({ loading: true, error: null });
        try {
          const data = await taxReturnService.fetchTaxpayers();

          const updates = { taxpayers: data, loading: false };

          let currentSelected = get().selectedTaxpayer;
          if (data.length > 0) {
            const exists =
              currentSelected &&
              data.some((t) => String(t.id) === String(currentSelected.id));
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
          set({
            loading: false,
            error: err.message || "Unable to load taxpayers.",
          });
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
          set({
            loading: false,
            error: err.message || "Unable to load tax returns.",
          });
        }
      },

      createItr: async (taxpayerId, assessmentYear) => {
        set({ loading: true, error: null });
        try {
          const data = await taxReturnService.createItr(
            taxpayerId,
            assessmentYear,
          );
          set({ loading: false });
          await get().fetchItrReturns(taxpayerId);
          return data;
        } catch (err) {
          set({
            loading: false,
            error: err.message || "Something went wrong. Please try again.",
          });
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
          set({
            loading: false,
            error: err.message || "Something went wrong. Please try again.",
          });
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
          set({
            loading: false,
            error: err.message || "Something went wrong. Please try again.",
          });
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
          set({
            loading: false,
            error: err.message || "Something went wrong. Please try again.",
          });
          throw err;
        }
      },

      addProfile: (profile) =>
        set((state) => {
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

      setActiveProfile: (id) =>
        set((state) => {
          if (id === state.activeProfileId) return {};

          const currentSnapshot = _extractFormData(state);
          const updatedMap = {
            ...state.profileDataMap,
            [state.activeProfileId]: currentSnapshot,
          };

          const targetData = updatedMap[id] || { ...defaultFormData };
          const targetFilingType =
            targetData.selectedFilingType ||
            targetData.filingType ||
            "Individual";

          const updatedProfiles = state.profiles.map((p) => {
            if (p.id === state.activeProfileId) {
              const currentFilingType =
                state.selectedFilingType || state.filingType || "Individual";
              const { name: profileName, pan: profilePan } = getProfileDetails(
                currentFilingType,
                state,
                p,
              );

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

      createNewProfile: (filingType, eligibilityAnswers) =>
        set((state) => {
          const currentSnapshot = _extractFormData(state);
          const updatedMap = {
            ...state.profileDataMap,
            [state.activeProfileId]: currentSnapshot,
          };

          const updatedProfiles = state.profiles.map((p) => {
            if (p.id === state.activeProfileId) {
              const currentFilingType =
                state.selectedFilingType || state.filingType || "Individual";
              const { name: profileName, pan: profilePan } = getProfileDetails(
                currentFilingType,
                state,
                p,
              );

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
            name: "New User",
            pan: "",
            assessmentYear: "2025-26",
            filingType: filingType || "Individual",
            currentStep: 1,
            form16Data: {},
            incomeSources: {},
            taxSaving: {},
            bankDetails: {},
            eligibilityAnswers: eligibilityAnswers || {},
            createdAt: Date.now(),
          };

          return {
            ...defaultFormData,
            eligibilityAnswers: eligibilityAnswers || {},
            selectedFilingType: filingType || "Individual",
            entityType: filingType || "Individual",
            profiles: [...updatedProfiles, newProfile],
            activeProfileId: newProfileId,
            profileDataMap: updatedMap,
            isDropdownOpen: false,
            isFilingTypeModalOpen: false,
            selectedFilingType: filingType || "Individual",
          };
        }),

      resetForNewPerson: () => {
        get().createNewProfile("Individual");
      },

      resetForm: () =>
        set((state) => ({
          ...defaultFormData,
          profiles: state.profiles,
          activeProfileId: state.activeProfileId,
          profileDataMap: state.profileDataMap,
          isDropdownOpen: state.isDropdownOpen,
          isFilingTypeModalOpen: state.isFilingTypeModalOpen,
          selectedFilingType: state.selectedFilingType,
        })),

      saveCurrentProfileData: () =>
        set((state) => {
          const snapshot = _extractFormData(state);
          const currentFilingType =
            state.selectedFilingType || state.filingType || "Individual";
          const isStructured = [
            "HUF",
            "LLP",
            "Firm",
            "AOP/BOI",
            "Company Private",
            "Company Public",
            "Trust & Exempt Entities",
            "Individual",
            "ITR1",
            "ITR2",
            "ITR3",
            "ITR4",
          ].includes(currentFilingType);

          const updatedProfiles = state.profiles.map((p) => {
            if (p.id === state.activeProfileId) {
              const currentFilingType =
                state.selectedFilingType || state.filingType || "Individual";
              const { name: profileName, pan: profilePan } = getProfileDetails(
                currentFilingType,
                state,
                p,
              );

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

      completeFiling: (acknowledgementNumber) =>
        set((state) => {
          const updatedProfiles = state.profiles.map((p) => {
            if (p.id === state.activeProfileId) {
              return {
                ...p,
                filingStatus: "Filed",
                acknowledgementNumber: acknowledgementNumber,
              };
            }
            return p;
          });

          const currentSnapshot = _extractFormData(state);
          currentSnapshot.filingStatus = "Filed";
          currentSnapshot.acknowledgementNumber = acknowledgementNumber;

          return {
            profiles: updatedProfiles,
            filingStatus: "Filed",
            acknowledgementNumber: acknowledgementNumber,
            profileDataMap: {
              ...state.profileDataMap,
              [state.activeProfileId]: currentSnapshot,
            },
          };
        }),

      getPayload: () => {
        const state = get();
        const filingType =
          state.selectedFilingType || state.filingType || "Individual";
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
          filing: {},
        };

        if (filingType === "Individual") {
          return {
            profile_id: state.activeProfileId,
            user_id: state.userId,
            entityType: "Individual",
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
            unlisted_shares_schedule_AL_other_disclosures:
              state.otherDisclosures,
            bank_accounts: state.bankAccounts,
          };
        }

        // For structured types, dynamically copy values from store
        if (
          [
            "HUF",
            "LLP",
            "Firm",
            "AOP/BOI",
            "Company Private",
            "Company Public",
            "Individual",
            "ITR1",
            "ITR2",
            "ITR3",
            "ITR4",
          ].includes(filingType)
        ) {
          payload.details = state.details || {};
          payload.income = state.income || {};
          payload.deductions = state.deductions || {};
          payload.taxes = state.taxes || {};
          payload.filing = state.filing || {};
          payload.selected_regime = state.selectedRegime || "new";
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

          if (
            [
              "LLP",
              "Firm",
              "AOP/BOI",
              "Company Private",
              "Company Public",
              "ITR3",
            ].includes(filingType)
          ) {
            payload.financials = state.financials || {};
          }
        } else if (filingType === "Trust & Exempt Entities") {
          // Map Trust steps to standard payload keys
          payload.details = {
            ...(state.basic?.entity_details
              ? { entity_details: state.basic.entity_details }
              : {}),
            ...(state.basic?.projects_institutions
              ? { projects_institutions: state.basic.projects_institutions }
              : {}),
            ...(state.personal?.registration_it
              ? { registration_it: state.personal.registration_it }
              : {}),
            ...(state.personal?.registration_other
              ? { registration_other: state.personal.registration_other }
              : {}),
            ...(state.personal?.filing_status
              ? { filing_status: state.personal.filing_status }
              : {}),
            ...(state.personal?.other_details
              ? { other_details: state.personal.other_details }
              : {}),
            ...(state.audit?.transfer_pricing
              ? { transfer_pricing: state.audit.transfer_pricing }
              : {}),
            ...(state.audit?.income_tax_audit
              ? { income_tax_audit: state.audit.income_tax_audit }
              : {}),
            ...(state.audit?.other_act_audit
              ? { other_act_audit: state.audit.other_act_audit }
              : {}),
            ...(state.audit?.aop_members
              ? { aop_members: state.audit.aop_members }
              : {}),
          };

          payload.income = state.income || {};

          payload.deductions = {
            ...(state.schedules?.schedule_i
              ? { schedule_i: state.schedules.schedule_i }
              : {}),
            ...(state.schedules?.schedule_vc
              ? { schedule_vc: state.schedules.schedule_vc }
              : {}),
            ...(state.schedules?.schedule_ai_er
              ? { schedule_ai_er: state.schedules.schedule_ai_er }
              : {}),
            ...(state.schedules?.schedule_j
              ? { schedule_j: state.schedules.schedule_j }
              : {}),
            ...(state.schedules?.schedule_la_et
              ? { schedule_la_et: state.schedules.schedule_la_et }
              : {}),
          };

          payload.taxes = state.tax?.advance_tds || {};

          payload.filing = {
            ...(state.schedules?.balance_sheet
              ? { balance_sheet: state.schedules.balance_sheet }
              : {}),
            ...(state.tax?.verification
              ? { verification: state.tax.verification }
              : {}),
          };
        }

        return payload;
      },

      calculateSummary: (explicitFilingType) => {
        const state = get();
        const filingType =
          explicitFilingType ||
          state.selectedFilingType ||
          state.filingType ||
          "Individual";
        const isIndividual = filingType === "Individual";
        const isHuf = filingType === "HUF";

        // Helper: safe number
        const n = (v) => Number(v || 0);

        const hpNet = (hp) => {
          const grossRent = n(
            hp.grossRent ||
              hp.annualRentReceivable ||
              hp.annualValue ||
              hp.grossRentReceived ||
              0,
          );
          const munTax = n(
            hp.municipalTaxes ||
              hp.taxPaidLocal ||
              hp.localTaxesPaid ||
              hp.localAuthorityTaxesPaid ||
              0,
          );
          const nav = grossRent - munTax;
          const stdDed = Math.round(nav * 0.3);
          const loanInt = n(
            hp.homeLoanInterest ||
              hp.interestBorrowedCapital ||
              hp.interestOnHomeLoan ||
              hp.loanInterestSec24b ||
              hp.interestOnBorrowedCapital24b_hp ||
              0,
          );
          // self-occupied: NAV = 0, loss capped at 2L
          if (
            hp.housePropertyType === "Self-Occupied" ||
            hp.propertyType === "Self-Occupied" ||
            hp.typeOfHouseProperty === "Self-Occupied"
          ) {
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
        if (
          isHuf ||
          ["Individual", "ITR1", "ITR2", "ITR3", "ITR4"].includes(filingType)
        ) {
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

          if (filingType === "ITR1") {
            houseProperty = income["house-property-income"] || {};
            otherSrc = income["other-sources-income"] || {};
            chapter6a = {
              ...(deductionsSec["savings-and-pension-deductions"] || {}),
              ...(deductionsSec["medical-health-deductions"] || {}),
              ...(deductionsSec["loan-interest-deductions"] || {}),
              ...(deductionsSec["charitable-donations-schedule"] || {}),
              ...(deductionsSec["scientific-political-disability-deductions"] ||
                {}),
            };
            tds = taxesSec["tds-schedules-ledger"] || {};
            tcs = taxesSec["tcs-and-challan-schedules"] || {};
            advanceTax = taxesSec["tcs-and-challan-schedules"] || {};
            selfAssess = {};
          } else if (filingType === "ITR2" || filingType === "Individual2") {
            // Individual2 subsection IDs from filingConfig.js
            houseProperty = income["schedule-hp-house-property"] || {};
            otherSrc = income["schedule-os-other-sources"] || {};
            chapter6a = deductionsSec["schedule-via-deductions"] || {};
            tds = taxesSec["tax-payments-schedules"] || {};
            tcs = taxesSec["tax-payments-schedules"] || {};
            advanceTax = taxesSec["tax-payments-schedules"] || {};
          } else if (filingType === "ITR3") {
            businessHP = {
              ...(income["business_profession_regular"] || {}),
              ...(income["business_profession_presumptive"] || {}),
            };
            houseProperty = income["salary_house_property_schedules"] || {};
            otherSrc = income["salary_house_property_schedules"] || {};
            chapter6a = deductionsSec["chapter_via_and_10a"] || {};
            tds = taxesSec["tax_payments_schedules"] || {};
            tcs = taxesSec["tax_payments_schedules"] || {};
            advanceTax = taxesSec["tax_payments_schedules"] || {};
          } else if (filingType === "ITR4" || filingType === "Individual4") {
            // Individual4 subsection IDs from filingConfig.js
            businessHP = income["business"] || {};
            houseProperty = income["house_property"] || {};
            otherSrc = income["other"] || {};
            chapter6a = deductionsSec["chapter6a"] || {};
            tds = taxesSec["tds"] || {};
            tcs = taxesSec["tds"] || {};
            advanceTax = taxesSec["advance_tax"] || {};
          }

          // Business: presumptive + normal
          business =
            n(businessHP.presumptiveIncome44AD) +
            n(businessHP.presumptiveIncome44ADA) +
            n(businessHP.presumptiveIncome44AE) +
            n(businessHP.netBusinessIncome) +
            n(businessHP.finalNetBpIncome);

          // House property — support list or single
          const hpList =
            houseProperty.housePropertiesList || houseProperty.properties || [];
          if (hpList.length > 0) {
            house = hpList.reduce(
              (s, hp) =>
                s +
                (n(
                  hp.incomeFromProperty ||
                    hp.annualValueHP ||
                    hp.hpFinalPropertyIncome,
                ) || hpNet(hp)),
              0,
            );
          } else {
            house =
              n(houseProperty.hpTotalFinalIncome) ||
              n(houseProperty.hpFinalPropertyIncome) ||
              hpNet(houseProperty);
          }

          // Capital gains — Individual2 uses schedule-cg-capital-gains subsection
          const capGains =
            income.capital_gains || income["schedule-cg-capital-gains"] || {};
          capital =
            n(more.stcg) +
            n(more.ltcg) +
            n(more.stcg111A) +
            n(more.ltcg112A) +
            n(capGains.stcg) +
            n(capGains.ltcg) +
            n(capGains.stcgTotal) +
            n(capGains.ltcgTotal) +
            n(capGains.stcg111A) +
            n(capGains.ltcg112A) +
            n(capGains.stcgImmovableNetGains) +
            n(capGains.ltcgImmovableNetGains) +
            n(capGains.stcgSec111A) +
            n(capGains.stcgOther) +
            n(capGains.cgStImmovableFinalGains) +
            n(capGains.cgSlumpSaleFinalGains) +
            n(capGains.cgStEquityFinalGainsPostJul2024) +
            n(capGains.cgStEquityFinalGainsPreJul2024) +
            n(capGains.cgStNrSharesSec111APreJul2024) +
            n(capGains.cgStNrSharesSec111APostJul2024) +
            n(capGains.cgStNrSharesOther) +
            n(capGains.cgStFiiFinalGains) +
            n(capGains.cgStTotalDeemedA6) +
            n(capGains.ltcgSec112APreJul2024) +
            n(capGains.ltcgSec112APostJul2024) +
            n(capGains.ltcgSec112ATotal);

          // Other sources
          interest =
            n(otherSrc.savingsInterest) +
            n(otherSrc.depositInterest) +
            n(otherSrc.refundInterest) +
            n(otherSrc.interestFromSavingsBankAccount) +
            n(otherSrc.interestFromDeposits) +
            n(otherSrc.interestFromIncomeTaxRefund) +
            n(otherSrc.osInterestSavings) +
            n(otherSrc.osInterestDeposits) +
            n(otherSrc.osInterestItRefund) +
            n(otherSrc.osInterestPf1) +
            n(otherSrc.osInterestPf2) +
            n(otherSrc.osInterestPf3) +
            n(otherSrc.osInterestPf4) +
            n(otherSrc.osInterestOthers);
          dividend =
            n(otherSrc.dividendIncome) +
            n(otherSrc.osDividendOther) +
            n(otherSrc.osDividendSec2_22_e) +
            n(otherSrc.osDividendSec2_22_f);
          other =
            n(more.agriculturalIncome) +
            n(otherSrc.otherIncome) +
            n(otherSrc.familyPensionAmount) +
            n(otherSrc.pfInterestTaxable1stProviso10_11) +
            n(otherSrc.pfInterestTaxable2ndProviso10_11) +
            n(otherSrc.pfInterestTaxable1stProviso10_12) +
            n(otherSrc.pfInterestTaxable2ndProviso10_12) +
            n(otherSrc.anyOtherIncomeWithDescription) +
            n(otherSrc.osFamilyPension) +
            n(otherSrc.osRetirement89ANonNotified) +
            n(otherSrc.osGiftTotalSec56_2_x) +
            n(otherSrc.osWinningsLotteriesSec115BB) +
            n(otherSrc.osWinningsOnlineGamesSec115BBJ);

          // ── ITR-1 Deductions (production-grade extraction) ────────────────────────────────
          // For ITR-1, all deduction data is stored under state.deductions[subsectionId]
          // Each deduction uses its own ITR-1 specific field names (from individualFieldConfig.js)
          // Generic names like deduction80C / deduction80D are used by other filing types only.
          if (filingType === "ITR1") {
            // 80C: capped at ₹1,50,000 — field: totalDeductionUsh80C (formula-auto computed)
            // Also accept direct sec80cEligibleAmount as fallback
            const raw80C = n(chapter6a.totalDeductionUsh80C) || 
              n(chapter6a.sec80cEligibleAmount);
            const ded80C = Math.min(raw80C, 150000);

            // 80CCC: capped individually; combined 80C+80CCC+80CCD(1) capped at ₹1.5L
            const raw80CCC = n(chapter6a.totalDeductionUsh80CCC) ||
              n(chapter6a.sec80cccDeductionAmount);
            const ded80CCC = Math.min(raw80CCC, 150000);

            // 80C + 80CCC + 80CCD(1) combined cap = ₹1,50,000
            const ded80CGroup = Math.min(ded80C + ded80CCC, 150000);

            // 80CCD(1B): NPS Tier-1 own contribution, additional ₹50,000 over 80C limit
            const ded80CCD1B = Math.min(n(chapter6a.sec80ccd1bNpsAmount) ||
              n(chapter6a.dedSec80CCD_1B_auto) ||
              n(chapter6a.sec80ccd1bAmount), 50000);

            // 80CCD(2): Employer NPS contribution — no cap for employee (allowed in both regimes)
            const ded80CCD2 = n(chapter6a.sec80ccd2EmployerNpsAmount) ||
              n(chapter6a.dedSec80CCD_2) ||
              n(chapter6a.sec80ccd2Amount);

            // 80D: Health insurance — capped at ₹75,000 (₹25K self/family + ₹50K parents senior)
            const raw80D = n(chapter6a.sec80dEligibleAmountOfDeductionTotal) ||
              n(chapter6a.dedSec80D_auto);
            const ded80D = Math.min(raw80D, 75000);

            // 80DD: Dependent with disability — fixed amounts (₹75K normal, ₹1.25L severe)
            const ded80DD = n(chapter6a.sec80ddDeductionAmount) ||
              n(chapter6a.dedSec80DD_auto);

            // 80E: Education loan interest — no cap
            const ded80E = (chapter6a.claim80E === "Yes")
              ? (n(chapter6a.loanIntInterestAmountClaimed) ||
                 n(chapter6a.dedSec80E_auto))
              : 0;

            // 80EE: Home loan interest (pre-2019) — capped at ₹50,000
            const ded80EE = (chapter6a.claim80EE === "Yes")
              ? Math.min(n(chapter6a.loanIntInterestAmountClaimed) ||
                 n(chapter6a.dedSec80EE_auto), 50000)
              : 0;

            // 80EEA: Home loan interest (affordable housing) — capped at ₹1,50,000
            const ded80EEA = (chapter6a.claim80EEA === "Yes")
              ? Math.min(n(chapter6a.loanIntInterestAmountClaimed) ||
                 n(chapter6a.dedSec80EEA_auto), 150000)
              : 0;

            // For 80E/80EE/80EEA: the form uses a single loanIntInterestAmountClaimed field;
            // only one of claim80E/claim80EE/claim80EEA should be Yes at a time.
            // Use their combined amount to avoid zero if only one is selected:
            const loanIntRaw = n(chapter6a.loanIntInterestAmountClaimed) || n(chapter6a.dedSec80E_auto);
            const ded80EGroup = (chapter6a.claim80E === "Yes" || chapter6a.claim80EE === "Yes" || chapter6a.claim80EEA === "Yes")
              ? loanIntRaw
              : 0;

            // 80G: Donations — eligible amount computed by form/formula
            const ded80G = (chapter6a.claim80G === "Yes")
              ? (n(chapter6a.donEligibleAmountRowDeduction) ||
                 n(chapter6a.dedSec80G_auto))
              : 0;

            // 80GGA: Scientific research donations
            const ded80GGA = (chapter6a.claim80GGA === "Yes")
              ? (n(chapter6a.sec80ggaEligibleAmount) ||
                 n(chapter6a.dedSec80GGA_auto))
              : 0;

            // 80GGC: Political party contributions (non-cash only)
            const ded80GGC = (chapter6a.claim80GGC === "Yes")
              ? (n(chapter6a.sec80ggcEligibleAmount) ||
                 n(chapter6a.dedSec80GGC_auto))
              : 0;

            // 80TTA: Savings interest up to ₹10,000 (for non-senior citizens)
            // 80TTB: Savings+deposit interest up to ₹50,000 (for senior citizens; mutually exclusive with 80TTA)
            const ded80TTA = Math.min(n(chapter6a.sec80ttaSavingsInterestDeduction) ||
              n(chapter6a.dedSec80TTA), 10000);
            const ded80TTB = Math.min(n(chapter6a.sec80ttbInterestDeduction) ||
              n(chapter6a.dedSec80TTB), 50000);
            const ded80TTAorB = Math.min(ded80TTA + ded80TTB, 50000);

            // 80U: Self with disability — fixed amounts (₹75K normal, ₹1.25L severe)
            const ded80U = (chapter6a.claim80U === "Yes")
              ? (n(chapter6a.sec80uDeductionAmount) ||
                 n(chapter6a.dedSec80U_auto))
              : 0;

            // 80GG: Rent paid deduction (for those without HRA)
            const ded80GG = n(chapter6a.sec80ggRentDeductionAmount) || n(chapter6a.dedSec80GG);

            // Store breakdown for return object
            state._itr1DedBreakdown = {
              ded80C: ded80CGroup,
              ded80CCD1B,
              ded80CCD2,
              ded80D,
              ded80DD,
              ded80EGroup,
              ded80G,
              ded80GGA,
              ded80GGC,
              ded80TTA,
              ded80TTB,
              ded80U,
              ded80GG,
            };

            // Total old-regime deductions (all allowed under old regime)
            deductions = ded80CGroup + ded80CCD1B + ded80CCD2 + ded80D + ded80DD +
              ded80EGroup + ded80G + ded80GGA + ded80GGC + ded80TTAorB + ded80U + ded80GG;

          } else {
          // ── Non-ITR1 Deductions Chapter VI-A (generic multi-format extraction) ─────────────
          const sumRows = (arr, field) =>
            Array.isArray(arr) ? arr.reduce((s, r) => s + n(r[field]), 0) : 0;

          deductions =
            n(chapter6a.deduction80C) +
            Math.min(n(chapter6a.deduction80D), 75000) +
            n(chapter6a.deduction80G) +
            Math.min(
              n(chapter6a.deduction80TTA) + n(chapter6a.deduction80TTB),
              50000,
            ) +
            n(chapter6a.deduction80GG) +
            n(chapter6a.deduction80GGA) +
            n(chapter6a.deduction80GGC) +
            n(chapter6a.deduction80IA) +
            n(chapter6a.deduction80IB) +
            n(chapter6a.deduction80E) +
            n(chapter6a.deduction80EE) +
            n(chapter6a.deduction80EEA) +
            n(chapter6a.deduction80U) +
            // ITR1/ITR2/ITR4 specific dynamic extraction
            n(chapter6a.totalDeductionUsh80C) +
            sumRows(
              chapter6a["section-80c-repeating-grid"],
              "sec80cEligibleAmount",
            ) +
            n(chapter6a.totalDeductionUsh80CCC) +
            sumRows(
              chapter6a["section-80ccc-repeating-grid"],
              "sec80cccDeductionAmount",
            ) +
            n(chapter6a.sec80dEligibleAmountOfDeductionTotal) +
            sumRows(
              chapter6a["loan-interest-shared-columns"],
              "loanIntInterestAmountClaimed",
            ) +
            sumRows(
              chapter6a["donation-financial-quanta"],
              "donEligibleAmountRowDeduction",
            ) +
            n(chapter6a.donEligibleAmountRowDeduction) +
            sumRows(
              chapter6a["schedule-80gga-scientific-research"],
              "sec80ggaEligibleAmount",
            ) +
            n(chapter6a.sec80ggaEligibleAmount) +
            sumRows(
              chapter6a["schedule-80ggc-political-parties"],
              "sec80ggcEligibleAmount",
            ) +
            n(chapter6a.sec80ggcEligibleAmount) +
            sumRows(chapter6a["disability-self-80u"], "sec80uDeductionAmount") +
            n(chapter6a.sec80uDeductionAmount) +
            sumRows(
              chapter6a["disability-dependent-80dd"],
              "sec80ddDeductionAmount",
            ) +
            n(chapter6a.sec80ddDeductionAmount) +
            sumRows(chapter6a.dedSec80C_table, "amount") +
            sumRows(chapter6a.dedSec80CCC_table, "amount") +
            sumRows(chapter6a.dedSec80CCD_1_table, "amount") +
            sumRows(chapter6a.dedSec80CCD_1B_table, "amount") +
            n(chapter6a.dedSec80CCD_2) +
            n(chapter6a.dedSec80CCG) +
            n(chapter6a.dedSec80CCF) +
            n(chapter6a.dedSec80D_auto) +
            n(chapter6a.dedSec80DD_auto) +
            n(chapter6a.dedSec80DDB) +
            n(chapter6a.dedSec80E_auto) +
            n(chapter6a.dedSec80EE_auto) +
            n(chapter6a.dedSec80EEA_auto) +
            n(chapter6a.dedSec80EEB_auto) +
            n(chapter6a.dedSec80G_auto) +
            n(chapter6a.dedSec80GG) +
            n(chapter6a.dedSec80GGA_auto) +
            n(chapter6a.dedSec80GGC_auto) +
            n(chapter6a.dedSec80TTA) +
            n(chapter6a.dedSec80TTB) +
            n(chapter6a.dedSec80U_auto) +
            n(chapter6a.dedSec80CCH) +
            n(chapter6a.dedAnyOtherAmount) +
            n(chapter6a.sec80DEligibleDeductionCalculated) +
            n(chapter6a.totalDeductionsPartB) +
            n(chapter6a.totalDeductionsPartC);
          }

          const extractFromSection = (sec, rowFields, directFields) => {
            if (!sec || typeof sec !== "object") return 0;
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
            Object.values(sec).forEach((val) => {
              if (Array.isArray(val)) {
                sum += val.reduce((s, r) => {
                  for (const f of rowFields) {
                    if (r[f]) return s + n(r[f]);
                  }
                  return s;
                }, 0);
              }
            });
            return sum;
          };

          const tdsSum = extractFromSection(
            tds,
            [
              "taxDeductedSalary",
              "tdsClaimedThisYear",
              "amountClaimed",
              "tdsClaimed",
              "taxDeducted",
              "taxDeductedNonSalary",
            ],
            [
              "tds1TotalTaxDeductedRow",
              "tds2CreditClaimedThisYear",
              "tds3CreditClaimedThisYear",
              "claimedTotalTDS",
              "taxDeductedSalary",
              "amountClaimed",
            ],
          );
          const tcsSum = extractFromSection(
            tcs,
            [
              "amountClaimedTCS",
              "tcsClaimed",
              "amountClaimed",
              "tcsAmount",
              "tcsCreditClaimedThisYear",
            ],
            [
              "tcs1TotalTcsRow",
              "claimedTotalTCS",
              "amountClaimedTCS",
              "tcsCreditClaimedThisYear",
            ],
          );
          const advSum = extractFromSection(
            advanceTax,
            ["taxAmountDeposited", "amount", "challanTaxPaidAmount"],
            [
              "totalAdvanceTaxPaid",
              "taxAmountDeposited",
              "challanTaxPaidAmount",
            ],
          );
          const satSum = extractFromSection(
            selfAssess,
            ["taxAmountDeposited", "amount", "challanTaxPaidAmount"],
            [
              "totalSelfAssessmentTaxPaid",
              "taxAmountDeposited",
              "challanTaxPaidAmount",
            ],
          );

          taxes = tdsSum + tcsSum + advSum + satSum;
          Object.assign(state, {
            _taxBreakdown: { tdsSum, tcsSum, advSum, satSum },
          });
          var _tdsSum = tdsSum,
            _tcsSum = tcsSum,
            _advSum = advSum,
            _satSum = satSum;
        } else if (filingType === "Trust & Exempt Entities") {
          const income = state.income || {};
          const taxSec = state.tax || {};

          const houseProperty = income.house_property || {};
          const capitalGains = income.capital_gains || {};
          const otherSources = income.other_sources || {};
          const businessProfession = income.business_profession || {};

          const advTds = taxSec.advance_tds || {};

          // Business / profession
          business =
            n(businessProfession.bpGrossProfitPL) +
            n(businessProfession.bpSpeculativeProfit) -
            n(businessProfession.bpDepreciation) +
            n(businessProfession.bpOtherAdjustments);

          // Capital gains
          capital =
            n(capitalGains.stcgSec111A) +
            n(capitalGains.stcgOther) +
            n(capitalGains.stcgDepreciableAsset) +
            n(capitalGains.ltcgSec112) +
            n(capitalGains.ltcgSec112A);

          // House property
          const hpList = houseProperty.housePropertiesList || [];
          house =
            hpList.length > 0
              ? hpList.reduce(
                  (s, hp) => s + (n(hp.incomeFromProperty) || hpNet(hp)),
                  0,
                )
              : hpNet(houseProperty);

          // Other sources
          interest = n(otherSources.osInterest);
          dividend = n(otherSources.osDividend);
          anonDonations = n(otherSources.osAnonymousDonations);
          other =
            n(otherSources.osRentalIncome) +
            n(otherSources.osOtherIncome) -
            n(otherSources.osDeductions);

          // Trust deductions = 0 (exempt status drives the reduction)
          deductions = 0;

          // Taxes paid
          const tdsSum = (advTds.tdsRows || []).reduce(
            (s, r) => s + n(r.tdsClaimed || r.amountClaimed),
            0,
          );
          const tcsSum = (advTds.tcsRows || []).reduce(
            (s, r) => s + n(r.tcsClaimed || r.amountClaimedTCS),
            0,
          );
          const advSum = (advTds.advanceTaxPayments || []).reduce(
            (s, r) => s + n(r.amount || r.taxAmountDeposited),
            0,
          );
          const satSum = (advTds.selfAssessmentRows || []).reduce(
            (s, r) => s + n(r.amount || r.taxAmountDeposited),
            0,
          );
          taxes = tdsSum + tcsSum + advSum + satSum;

          // ── LLP / Firm / AOP-BOI / Company (ITR-5 / 6) ──────────────────────────────────────────
        } else if (
          [
            "LLP",
            "Firm",
            "AOP/BOI",
            "Cooperative Society",
            "Company Private",
            "Company Public",
          ].includes(filingType)
        ) {
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
          const plProfit = n(
            state.financials?.profit_loss?.netProfitPL ||
              state.financials?.profit_loss?.netProfitBeforeTax,
          );
          const rawBusiness = n(
            businessHP.netBusinessIncome ||
              businessHP.netIncomeFromBusiness ||
              businessHP.netProfitAsPerPL ||
              plProfit,
          );

          // P&L adjustments (add disallowances, subtract IT depreciation)
          const disallowance37 = n(businessHP.disallowanceSec37);
          const disallowance40A3 = n(businessHP.disallowanceSec40A3);
          const bookDep = n(businessHP.bookDepreciation);
          const itDep = n(businessHP.itDepreciation);
          const directorRem = n(businessHP.directorRemuneration); // Company only

          business =
            rawBusiness +
            disallowance37 +
            disallowance40A3 +
            bookDep -
            itDep +
            n(presumptive.presumptiveIncome44AD) +
            n(presumptive.presumptiveIncome44ADA) +
            n(presumptive.presumptiveIncome44AE) +
            (filingType.includes("Company") ? directorRem : 0);

          // Capital gains
          capital =
            n(capitalGains.shortTermCG15Percent) +
            n(capitalGains.shortTermCGOther) +
            n(capitalGains.longTermCG10Percent) +
            n(capitalGains.longTermCG20Percent);

          // House property
          if (["LLP", "Firm", "AOP/BOI"].includes(filingType)) {
            const hpList = houseProperty.housePropertiesList || [];
            house =
              hpList.length > 0
                ? hpList.reduce(
                    (s, hp) => s + (n(hp.incomeFromProperty) || hpNet(hp)),
                    0,
                  )
                : hpNet(houseProperty);
          } else {
            house = n(houseProperty.incomeFromHP) || hpNet(houseProperty);
          }

          // Other sources
          interest =
            n(otherSrc.interestFromSavings) +
            n(otherSrc.interestFromDeposits) +
            n(otherSrc.interestFromITRefund);
          dividend = n(otherSrc.dividendIncome);
          other = n(otherSrc.incomeFromVDA) + n(otherSrc.otherIncome);

          // Deductions — entity-type filtered
          if (
            ["LLP", "Firm", "AOP/BOI", "Cooperative Society"].includes(
              filingType,
            )
          ) {
            deductions =
              n(chapter6a.deduction80G) +
              n(chapter6a.deduction80GGA) +
              n(chapter6a.deduction80GGC) +
              n(chapter6a.deduction80IA) +
              n(chapter6a.deduction80IB) +
              n(chapter6a.deduction80IC) +
              n(chapter6a.deduction80IE) +
              n(chapter6a.deduction80JJAA) +
              n(chapter6a.deduction80P);
          } else {
            // Company (ITR-6)
            deductions =
              n(chapter6a.deduction80G) +
              n(chapter6a.deduction80GGB) +
              n(chapter6a.deduction80GGA) +
              n(chapter6a.deduction80GGC) +
              n(chapter6a.deduction80IA) +
              n(chapter6a.deduction80IAB) +
              n(chapter6a.deduction80IAC) +
              n(chapter6a.deduction80IB) +
              n(chapter6a.deduction80IBA) +
              n(chapter6a.deduction80IC) +
              n(chapter6a.deduction80IE) +
              n(chapter6a.deduction80JJA) +
              n(chapter6a.deduction80JJAA) +
              n(chapter6a.deduction80LA) +
              n(chapter6a.deduction80M) +
              n(chapter6a.deduction80PA);
          }

          // Taxes paid
          const tdsSum = (tds.tdsRows || []).reduce(
            (s, r) => s + n(r.amountClaimed || r.tdsClaimed),
            0,
          );
          const tcsSum = (tcs.tcsRows || []).reduce(
            (s, r) => s + n(r.amountClaimedTCS || r.tcsClaimed),
            0,
          );
          const advSum = (advanceTax.taxPayments || []).reduce(
            (s, r) => s + n(r.taxAmountDeposited),
            0,
          );
          const satSum = (selfAssess.selfAssessmentRows || []).reduce(
            (s, r) => s + n(r.taxAmountDeposited || r.amount),
            0,
          );
          taxes = tdsSum + tcsSum + advSum + satSum;

          // ── Individual (flat-field mapping) ──────────────────────────────────────────────────
        } else if (isIndividual) {
          interest = n(state.interestIncome);
          business =
            n(state.businessIncome) +
            n(state.businessIncomeNormal) +
            n(state.businessIncome44AD) +
            n(state.businessIncome44ADA) +
            n(state.businessIncome44AE);
          dividend = n(state.dividendIncome);
          other = n(state.otherIncome);
          capital = n(state.capitalGains) + n(state.stcg) + n(state.ltcg);

          const hpList = state.houseProperties;
          if (Array.isArray(hpList)) {
            house = hpList.reduce(
              (s, hp) => s + (n(hp.incomeFromProperty) || hpNet(hp)),
              0,
            );
          } else {
            house = n(hpList);
          }

          deductions =
            Math.min(n(state.deduction80C), 150000) +
            Math.min(n(state.deduction80D), 75000) +
            n(state.deduction80G) +
            Math.min(n(state.deduction80TTA) + n(state.deduction80TTB), 50000) +
            n(state.deduction80GGC) +
            n(state.deduction80E) +
            n(state.deduction80EE) +
            n(state.deduction80EEA) +
            n(state.deduction80U) +
            n(state.taxSavingsDeductions);

          taxes =
            n(state.taxesPaid) +
            n(state.tdsNonSalary) +
            n(state.tdsProperty) +
            n(state.tcsVal) +
            n(state.advanceTax);
        }

        // ── Gross Total Income ────────────────────────────────────────────────────────────────
        const isAnyIndividual = [
          "Individual",
          "ITR1",
          "ITR2",
          "ITR3",
          "ITR4",
        ].includes(filingType);

        // Helper to extract raw gross salary u/s 17
        const extractRawGrossSalary = (salarySec) => {
          if (!salarySec) return 0;
          return n(salarySec.grossSalaryTotal || salarySec.grossSalary) ||
            n(salarySec.salaryAsPerSection17_1 || salarySec.salary17_1) +
              n(salarySec.valueIOfPerquisitesuS17_2 || salarySec.salary17_2) +
              n(salarySec.profitInLieuOfSalaryuS17_3 || salarySec.salary17_3);
        };

        // Extract HRA exemption
        const extractHra = (salarySec) => {
          if (!salarySec) return 0;
          return n(
            salarySec.sec10_13A ||
              salarySec.hraEligibleExemption ||
              salarySec.hra10_13A_subTotal,
          );
        };

        // Extract other (non-HRA) exempt allowances for Old Regime
        const extractExemptAllowancesOld = (salarySec) => {
          if (!salarySec) return 0;
          const itr1TotalExempt = n(salarySec.totalAllowancesExempt_ii);
          const hraVal = extractHra(salarySec);
          if (itr1TotalExempt > 0) {
            // ITR-1: total includes HRA, so non-HRA is total - HRA
            return Math.max(0, itr1TotalExempt - hraVal);
          }
          // Generic path
          return Array.isArray(salarySec.exemptAllowances)
            ? salarySec.exemptAllowances.reduce(
                (acc, curr) => acc + n(curr.amount),
                0,
              )
            : n(salarySec.exemptAllowances);
        };

        // Extract exempt allowances for New Regime (HRA is not exempt)
        const extractExemptAllowancesNew = (salarySec) => {
          // Under New Regime, only non-HRA exemptions (like some specific allowances) are allowed.
          // For simplicity and matching current logic, we use the same non-HRA exemptions as old regime.
          return extractExemptAllowancesOld(salarySec);
        };

        const extractProfTax = (salarySec) => {
          if (!salarySec) return 0;
          return n(
            salarySec.professionalTax16_iii ||
              salarySec.professionalTax ||
              salarySec.deductionProfessionalTax,
          );
        };


        let rawGrossSalary = 0; // Raw gross salary before ANY exemptions
        let exemptAllowancesOld = 0;
        let exemptAllowancesNew = 0;
        let profTax = 0;
        let hraExemption = 0; // HRA exemption applicable only under Old Regime
        
        if (filingType === "ITR1") {
          const salarySec = (state.income || {})["salary-pension-income"] || {};
          rawGrossSalary = extractRawGrossSalary(salarySec);
          exemptAllowancesOld = extractExemptAllowancesOld(salarySec);
          exemptAllowancesNew = extractExemptAllowancesNew(salarySec);
          profTax = extractProfTax(salarySec);
          hraExemption = extractHra(salarySec);
        } else if (filingType === "ITR2") {
          const salarySec = (state.income || {})["schedule-s-salary"] || {};
          rawGrossSalary = extractRawGrossSalary(salarySec);
          exemptAllowancesOld = extractExemptAllowancesOld(salarySec);
          exemptAllowancesNew = extractExemptAllowancesNew(salarySec);
          profTax = extractProfTax(salarySec);
          hraExemption = extractHra(salarySec);
        } else if (filingType === "ITR3") {
          const salarySec =
            (state.income || {})["salary_house_property_schedules"] || {};
          const employers =
            salarySec.employers || salarySec.employersList || [];
          if (employers.length > 0) {
            rawGrossSalary = employers.reduce((acc, emp) => {
              const gross =
                n(emp.salarySec17_1) +
                n(emp.perquisitesSec17_2) +
                n(emp.profitInLieuSalary);
              return acc + gross;
            }, 0);
            exemptAllowancesOld = employers.reduce((acc, emp) => acc + n(emp.exemptAllowancesSec10), 0);
            exemptAllowancesNew = employers.reduce((acc, emp) => acc + n(emp.exemptAllowancesSec10), 0);
            profTax = employers.reduce(
              (acc, emp) => acc + n(emp.professionalTax),
              0,
            );
            hraExemption = employers.reduce(
              (acc, emp) => acc + n(emp.hraExemption || emp.hraEligibleExemption),
              0,
            );
          } else {
            rawGrossSalary = extractRawGrossSalary(salarySec);
            exemptAllowancesOld = extractExemptAllowancesOld(salarySec);
            exemptAllowancesNew = extractExemptAllowancesNew(salarySec);
            profTax = extractProfTax(salarySec);
            hraExemption = extractHra(salarySec);
          }
        } else if (filingType === "ITR4") {
          const otherSec = (state.income || {}).other || {};
          const gross =
            n(otherSec.salarySec17_1) +
            n(otherSec.perquisitesSec17_2) +
            n(otherSec.salary17_1) +
            n(otherSec.salary17_2);
          rawGrossSalary = gross;
          profTax = n(otherSec.profTaxSec16_iii || otherSec.professionalTax);
        } else if (isIndividual) {
          rawGrossSalary = n(state.salaryIncome);
          profTax = n(state.professionalTax);
        }

        // Use rawGrossSalary for the common Gross Income display
        const grossSalary = rawGrossSalary;

        const crypto = n(state.cryptoIncome);
        // For gross income display (common between regimes — use old regime basis)
        const grossIncome =
          grossSalary +
          interest +
          capital +
          house +
          dividend +
          business +
          crypto +
          other;

        // 1. Calculate Net Salary Income for each regime
        const netSalaryOld = Math.max(0, rawGrossSalary - exemptAllowancesOld - hraExemption);
        const netSalaryNew = Math.max(0, rawGrossSalary - exemptAllowancesNew); // HRA is not exempt under New Regime

        // 2. Standard deduction is capped at Net Salary Income
        const stdDedOld =
          isAnyIndividual && netSalaryOld > 0
            ? Math.min(netSalaryOld, 50000)
            : 0;
        const stdDedNew =
          isAnyIndividual && netSalaryNew > 0
            ? Math.min(netSalaryNew, 75000)
            : 0;

        // 3. Compute Gross Total Income for each regime by combining Net Salary (after std ded & prof tax) + Other Incomes
        const otherIncomesTotal = interest + capital + house + dividend + business + crypto + other;

        // Old regime GTI: net salary − std ded − prof tax + other incomes
        const oldGTI = Math.max(0, netSalaryOld - stdDedOld - profTax) + otherIncomesTotal;
        
        // New regime GTI: net salary − std ded only (no prof tax deduction) + other incomes
        const newGTI = Math.max(0, netSalaryNew - stdDedNew) + otherIncomesTotal;

        const rawDeductions = Math.max(0, deductions);
        const allowedDeductionsOld = Math.min(rawDeductions, oldGTI);
        // Chapter VI-A deductions are mostly disallowed under New Regime.
        // Exception: 80CCD(2) employer NPS contribution IS allowed under new regime.
        const newRegime80CCD2 = filingType === "ITR1"
          ? (state._itr1DedBreakdown?.ded80CCD2 || 0)
          : (n((state.deductions?.chapter6a || {}).dedSec80CCD_2) ||
             n((state.deductions?.chapter6a || {}).sec80ccd2EmployerNpsAmount) || 0);
        const allowedDeductionsNew = Math.min(newRegime80CCD2, newGTI);

        const oldTaxableIncome = oldGTI - allowedDeductionsOld;
        const newTaxableIncome = newGTI - allowedDeductionsNew;

        const regime = state.selectedRegime || "new";
        const corporateRegime = state.corporateRegime || regime; // '115BAA' | '115BAB' | '115BA' | 'new' | 'old'

        const effectiveRegime = filingType.includes("Company")
          ? corporateRegime
          : regime;

        // Always compute old regime with 'old' rules and new regime with 'new' rules.
        // This must be independent of which regime is currently selected — the comparison
        // modal needs both sides regardless of selectedRegime.
        const oldRegimeTaxCalc = calculateTax(
          oldTaxableIncome,
          OLD_REGIME_SLABS,
          "old",
          filingType,
          anonDonations,
        );
        // NOTE: use 'new' explicitly here — NOT effectiveRegime — so that when the user
        // is currently on Old Regime, the New Regime comparison still uses new-regime
        // rebate/surcharge rules (₹60,000 rebate @ ₹12L) rather than old-regime rules.
        const newRegimeCalcRegime = filingType.includes("Company") ? corporateRegime : "new";
        const newRegimeTaxCalc = calculateTax(
          newTaxableIncome,
          NEW_REGIME_SLABS,
          newRegimeCalcRegime,
          filingType,
          anonDonations,
        );

        const oldRegimeTax = oldRegimeTaxCalc.finalTax;
        const newRegimeTax = newRegimeTaxCalc.finalTax;

        // betterRegime = whichever has lower tax liability
        const taxComparison = {
          old: oldRegimeTax,
          new: newRegimeTax,
          savings: Math.abs(oldRegimeTax - newRegimeTax),
          betterRegime: newRegimeTax <= oldRegimeTax ? "new" : "old",
        };

        const activeTaxableIncome =
          regime === "new" ? newTaxableIncome : oldTaxableIncome;
        const activeTaxCalc =
          regime === "new" ? newRegimeTaxCalc : oldRegimeTaxCalc;
        const estimatedTax = activeTaxCalc.finalTax;

        const taxesPaid = taxes;
        const rawBalance = taxesPaid - estimatedTax;

        const itrSelection = determineITRType(state);

        const activeStdDed = regime === "new" ? stdDedNew : stdDedOld;
        const activeAllowedDeductions =
          regime === "new" ? allowedDeductionsNew : allowedDeductionsOld;

        // Display taxable income: use pre-computed taxable income
        const displayTaxableIncome =
          regime === "new" ? newTaxableIncome : oldTaxableIncome;

        return {
          grossIncome: Math.round(grossIncome),
          grossIncomeNew: Math.round(grossIncome),
          oldGTI: Math.round(oldGTI),
          newGTI: Math.round(newGTI),
          totalDeductions: Math.round(activeAllowedDeductions),
          standardDeduction: Math.round(activeStdDed), 
          stdDedOld: Math.round(stdDedOld),
          stdDedNew: Math.round(stdDedNew),
          profTax: Math.round(profTax),
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
          // Per-regime breakdown for comparison modal
          slabTaxOld: oldRegimeTaxCalc.taxBeforeRebate,
          slabTaxNew: newRegimeTaxCalc.taxBeforeRebate,
          cessOld: oldRegimeTaxCalc.cess,
          cessNew: newRegimeTaxCalc.cess,
          rebateOld: oldRegimeTaxCalc.rebate,
          rebateNew: newRegimeTaxCalc.rebate,
          surchargeOld: oldRegimeTaxCalc.surcharge,
          surchargeNew: newRegimeTaxCalc.surcharge,
          refundOrDue: Math.abs(rawBalance),
          isRefund: rawBalance > 0,
          itrType: itrSelection.type,
          itrReason: itrSelection.reason,
          // Fields used by RegimeComparisonModal detailed table
          // For ITR-1: use the pre-computed breakdown (correct field names + caps applied)
          hraExemption: Math.round(hraExemption),
          deduction80C: Math.round(
            filingType === "ITR1"
              ? (state._itr1DedBreakdown?.ded80C || 0)
              : n((state.deductions?.chapter6a || state.deductions?.['savings-and-pension-deductions'] || {}).deduction80C) ||
                n((state.deductions?.chapter6a || {}).totalDeductionUsh80C) ||
                n(state.deduction80C) || 0
          ),
          deduction80D: Math.round(
            filingType === "ITR1"
              ? (state._itr1DedBreakdown?.ded80D || 0)
              : Math.min(
                  n((state.deductions?.chapter6a || state.deductions?.['medical-health-deductions'] || {}).deduction80D) ||
                  n((state.deductions?.chapter6a || {}).sec80dEligibleAmountOfDeductionTotal) ||
                  n(state.deduction80D) || 0,
                  75000
                )
          ),
          otherChapter6aDeductions: Math.round(
            filingType === "ITR1"
              ? ((state._itr1DedBreakdown?.ded80EGroup || 0) +
                 (state._itr1DedBreakdown?.ded80G || 0) +
                 (state._itr1DedBreakdown?.ded80GGA || 0) +
                 (state._itr1DedBreakdown?.ded80GGC || 0) +
                 (state._itr1DedBreakdown?.ded80TTA || 0) +
                 (state._itr1DedBreakdown?.ded80TTB || 0) +
                 (state._itr1DedBreakdown?.ded80U || 0) +
                 (state._itr1DedBreakdown?.ded80DD || 0) +
                 (state._itr1DedBreakdown?.ded80CCD1B || 0) +
                 (state._itr1DedBreakdown?.ded80CCD2 || 0) +
                 (state._itr1DedBreakdown?.ded80GG || 0))
              : (n((state.deductions?.chapter6a || {}).deduction80G) +
                 n((state.deductions?.chapter6a || {}).deduction80E) +
                 n((state.deductions?.chapter6a || {}).deduction80EE) +
                 n((state.deductions?.chapter6a || {}).deduction80EEA) +
                 n((state.deductions?.chapter6a || {}).deduction80GG) +
                 n((state.deductions?.chapter6a || {}).deduction80GGC) +
                 n((state.deductions?.chapter6a || {}).deduction80U) +
                 n((state.deductions?.chapter6a || {}).deduction80TTA) +
                 n((state.deductions?.chapter6a || {}).deduction80TTB) +
                 n(state.deduction80G) + n(state.deduction80E) + n(state.deduction80GGC))
          ),
        };
      },
    }),
    {
      name: "itr-storage",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

function _extractFormData(state) {
  const snapshot = {};
  for (const key of Object.keys(state)) {
    if (
      typeof state[key] !== "function" &&
      key !== "profiles" &&
      key !== "activeProfileId" &&
      key !== "profileDataMap" &&
      key !== "isDropdownOpen" &&
      key !== "isFilingTypeModalOpen"
    ) {
      snapshot[key] = state[key];
    }
  }
  return snapshot;
}
