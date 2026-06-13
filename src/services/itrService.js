import axios from 'axios';

const API_BASE_URL = 'https://adlivetech.com/itr';

const itrService = {
 
  submitItrDetails: async (payload) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/itr_details`, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        timeout: 10000, 
      });
      return response.data;
    } catch (error) {
      console.error('Error submitting ITR details:', error);
      throw error;
    }
  }, 
  
  uploadForm16: async (file, onUploadProgress) => {
    const formData = new FormData();
    formData.append('form16', file);

    try {
      const response = await axios.post(`${API_BASE_URL}/upload_form16.php`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          if (onUploadProgress) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            onUploadProgress(percentCompleted);
          }
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error uploading Form 16:', error);
      throw error;
    }
  }, 
  
  saveDraft: async (payload) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/save_draft.php`, payload);
      return response.data;
    } catch (error) {
      console.error('Error saving draft:', error);
      throw error;
    }
  },

  getItrDetails: async (userId) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/get_itr_detail`, {
        user_id: userId
      });
      return response.data;  
      
    } catch (error) {
      console.error('Error fetching ITR details:', error);
      throw error;
    }
  }
};

export default itrService;
