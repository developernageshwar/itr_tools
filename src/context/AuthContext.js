"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from "react";

import { useRouter } from "next/navigation";
import axios from "axios";
import {
  auth,
  googleProvider,
  appleProvider,
  microsoftProvider
} from "@/lib/firebase";
import { signInWithPopup, signOut } from "firebase/auth";
import {
  getAuthToken,
  getUserData,
  setAuthToken,
  setUserData,
  removeAuthToken,
  removeUserData
} from "@/utils/cookies";
import { toast } from "react-toastify";
import { loginAPI, registerAPI } from '@/services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tempAuthData, setTempAuthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = getAuthToken();
    const userData = getUserData();
    if (token && userData) {
      setUser(userData);
    }
    setLoading(false);
  }, []);

  // Standard Login/Register
  const login = async (email, password) => {
    try {
      const response = await loginAPI(email, password);
      if (response.status === false) {
        toast.error(response.message || 'Login failed');
        return { success: false };
      }
      setAuthToken(response.token);
      setUserData(response.user);
      setUser(response.user);
      toast.success('Login successful');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Login failed');
      return { success: false };
    }
  };

  const register = async (userData) => {
    try {
      const response = await registerAPI(userData);
      if (response.status === false) {
        toast.error(response.message || 'Registration failed');
        return { success: false };
      }
      toast.success('Registration successful');
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || 'Registration failed');
      return { success: false };
    }
  };

  // SOCIAL LOGIN FUNCTION
  const socialLogin = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;
      const firebaseToken = await firebaseUser.getIdToken();

      // SEND TOKEN TO BACKEND
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/social-login`,
        {
          firebase_token: firebaseToken
        }
      );

      const data = response.data;
      if (!data.status) {
        toast.error(data.message || "Social login failed on server");
        return { success: false };
      }

      // SAVE BACKEND TOKEN
      setAuthToken(data.token);
      setUserData(data.user);
      setUser(data.user);

      toast.success("Login successful");
      router.push("/dashboard");
      return { success: true };
    } catch (error) {
      console.error("Social login error:", error);
      toast.error(error.response?.data?.message || "Social login failed");
      return { success: false };
    }
  };

  const loginWithGoogle = () => socialLogin(googleProvider);
  const loginWithApple = () => socialLogin(appleProvider);
  const loginWithMicrosoft = () => socialLogin(microsoftProvider);

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Firebase sign out error:", error);
    }
    removeAuthToken();
    removeUserData();
    setUser(null);
    router.push("/");
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        loginWithGoogle,
        loginWithApple,
        loginWithMicrosoft,
        logout,
        tempAuthData,
        setTempAuthData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
