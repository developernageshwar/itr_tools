import axiosInstance from '@/lib/axiosInstance';
export const taxReturnService = {
  fetchTaxpayers: async () => {
    const response = await axiosInstance.get('/api/taxpayers');
    return response.data;
  },

  fetchItrReturns: async (taxpayerId) => {
    const response = await axiosInstance.get('/api/itr/list', {
      params: { taxpayerId }
    });
    return response.data;
  },

  createItr: async (taxpayerId, assessmentYear) => {
    const response = await axiosInstance.post('/api/itr/create', {
      taxpayerId,
      assessmentYear
    });
    return response.data;
  },

  resumeItr: async (itrId) => {
    const response = await axiosInstance.get(`/api/itr/${itrId}/resume`);
    return response.data;
  },

  duplicateItr: async (itrId) => {
    const response = await axiosInstance.post('/api/itr/duplicate', {
      itrId
    });
    return response.data;
  },

  deleteItr: async (itrId) => {
    const response = await axiosInstance.delete(`/api/itr/${itrId}`);
    return response.data;
  },

  getItrDetails: async (itrId) => {
    const response = await axiosInstance.get(`/api/itr/${itrId}`);
    return response.data;
  },

  getDownloadUrl: (itrId) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
    return `${baseUrl}/api/itr/${itrId}/download`;
  }
};
