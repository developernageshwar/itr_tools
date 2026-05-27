
const delay = (ms = 100) => new Promise(resolve => setTimeout(resolve, ms));

const profileService = { 

  createProfileSession: async ({ filingType, assessmentYear = '2025-26' } = {}) => {
    await delay(50);
    const newProfile = {
      id: crypto.randomUUID(),
      name: 'New User',
      pan: '',
      assessmentYear,
      filingType: filingType || 'Individual',
      currentStep: 1,
      form16Data: {},
      incomeSources: {},
      taxSaving: {},
      bankDetails: {},
      createdAt: Date.now(),
    };
    console.log('[ProfileService] Created profile session:', newProfile.id);
    return newProfile;
  }, 

  updateProfileSession: async ({ profileId, filingType, currentStep, formData } = {}) => {
    await delay(50);
    console.log('[ProfileService] Updated session:', profileId, { filingType, currentStep, formData });
    return { success: true, profileId };
  },

  saveForm16Data: async ({ profileId, formData } = {}) => {
    await delay(50);
    console.log('[ProfileService] Saved Form16 data for:', profileId);
    return { success: true, profileId };
  },  

  saveIncomeSources: async ({ profileId, formData } = {}) => {
    await delay(50);
    console.log('[ProfileService] Saved income sources for:', profileId);
    return { success: true, profileId };
  }, 

  saveTaxSavingData: async ({ profileId, formData } = {}) => {
    await delay(50);
    console.log('[ProfileService] Saved tax saving data for:', profileId);
    return { success: true, profileId };
  }, 

  saveBankDetails: async ({ profileId, formData } = {}) => {
    await delay(50);
    console.log('[ProfileService] Saved bank details for:', profileId);
    return { success: true, profileId };
  }, 

  switchProfileSession: async ({ profileId } = {}) => {
    await delay(50);
    console.log('[ProfileService] Switched to profile:', profileId);
    return { success: true, profileId };
  },
};

export default profileService;
