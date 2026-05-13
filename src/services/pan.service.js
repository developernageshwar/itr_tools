import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

const panService = {
  verifyPan: async (data) => {
    try {
      // Use the local API route which proxies to Sandbox
      const response = await axios.post(`${API_URL}/api/pan-verify`, data);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Something went wrong during PAN verification' };
    }
  },

  verifyOtp: async (otp, transactionId) => {
    try {
      // Mocking successful OTP for now as per previous implementation
      // In a real scenario, this would call a backend route
      return { status: 'success', message: 'OTP Verified' };
    } catch (error) {
      throw error.response?.data || { error: 'Invalid OTP. Please try again.' };
    }
  },

  storePanDetails: async (details) => {
    try {
      const response = await axios.post(`${API_URL}/api/pan-store`, details);
      return response.data;
    } catch (error) {
      throw error.response?.data || { error: 'Failed to store PAN details on our server' };
    }
  }
};

export default panService;
