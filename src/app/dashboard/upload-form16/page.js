"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import {
  MdKeyboardArrowDown,
  MdVisibility,
  MdVisibilityOff
} from 'react-icons/md';
import Button from '@/components/ui/Button';
import Footer2 from '@/components/layout/Footer2';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';
import { useItrStore } from '@/store/itrStore';
import { toast } from 'react-toastify';
import axiosInstance from '@/lib/axiosInstance';

export default function UploadForm16Page() {
  const router = useRouter();
  const setItrFields = useItrStore((state) => state.setFields);
  const [openFaq, setOpenFaq] = useState(null);

  const [stage, setStage] = useState('UPLOAD');

  const [processingStatus, setProcessingStatus] = useState('');

  const [pdfPassword, setPdfPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [pendingFile, setPendingFile] = useState(null);

  const fileInputRef = useRef(null);

  const faqs = [
    { question: "What is Form 16?" },
    { question: "From where do I get my Form 16?" },
    { question: "I have got annexure as a different file." },
    { question: "Can I upload multiple Form 16s at once?" }
  ];

  const handleExtractedData = (apiResult) => {
    // Dynamically map API response structure to frontend form state
    const mappedData = {
      employerName: apiResult.profile_info?.employer_name,
      employerTan: apiResult.profile_info?.employer_tan,
      panNumber: apiResult.profile_info?.employee_pan,
      employeePan: apiResult.profile_info?.employee_pan,

      salary_income: apiResult.salary_breakdown?.gross_salary_17_1,
      salaryIncome: apiResult.salary_breakdown?.gross_salary_17_1,

      exempt_allowances: apiResult.salary_breakdown?.exempt_allowances_sec_10,
      exemptAllowances: apiResult.salary_breakdown?.exempt_allowances_sec_10,

      standard_deduction: apiResult.salary_breakdown?.standard_deduction,
      standardDeduction: apiResult.salary_breakdown?.standard_deduction,

      tax_savings_deductions: apiResult.deductions_chapter_6a?.section_80c,
      taxSavingsDeductions: apiResult.deductions_chapter_6a?.section_80c,

      section_80d: apiResult.deductions_chapter_6a?.section_80d,
      section80d: apiResult.deductions_chapter_6a?.section_80d,
    };

    // Filter out fields that do not contain data to keep existing values unchanged
    const filteredPayload = Object.fromEntries(
      Object.entries(mappedData).filter(
        ([_, value]) => value !== '' && value !== null && value !== undefined
      )
    );
    
    setItrFields(filteredPayload);
    toast.success("Form 16 data extracted successfully!");
    router.push('/dashboard/income-sources');
  };

  const handleFileUpload = async (file) => {
    if (!file) return;

    setStage('PROCESSING');
    setProcessingStatus('Uploading document...');
    setPendingFile(file);

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("assessment_year", "2026-27");

      const { data } = await axiosInstance.post('/api/tax/v1/upload-form16', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!data.success) {
        if (data.status === 'PASSWORD_REQUIRED') {
          setStage('LOCKED');
          return;
        }
        throw new Error(data.message || 'Failed to process Form 16');
      }

      setProcessingStatus('Parsing lines...');
      handleExtractedData(data);

    } catch (error) {
      console.error("Upload error:", error);
      const errData = error.response?.data;
      if (errData?.status === 'PASSWORD_REQUIRED') {
        setStage('LOCKED');
        return;
      }
      toast.error(errData?.message || error.message || "Failed to process document.");
      setStage('UPLOAD');
      setPendingFile(null);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      handleFileUpload(file);
    }
  };

  const handlePasswordSubmit = async () => {
    if (!pendingFile || !pdfPassword) return;

    setStage('PROCESSING');
    setProcessingStatus('Decrypting document...');
    
    try {
      const formData = new FormData();
      formData.append("file", pendingFile);
      formData.append("password", pdfPassword);
      formData.append("assessment_year", "2026-27");

      const { data } = await axiosInstance.post('/api/tax/v1/decrypt-form16', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (!data.success) {
        if (data.status === 'INVALID_PASSWORD') {
          toast.error(data.message || "Incorrect password.");
          setStage('LOCKED');
          return;
        }
        throw new Error(data.message || 'Failed to decrypt/parse Form 16');
      }

      setProcessingStatus('Parsing lines...');
      handleExtractedData(data);

    } catch (error) {
      console.error("Decrypt error:", error);
      const errData = error.response?.data;
      if (errData?.status === 'INVALID_PASSWORD') {
        toast.error(errData.message || "Incorrect password.");
        setStage('LOCKED');
        return;
      }
      toast.error(errData?.message || error.message || "Failed to decrypt document.");
      setStage('LOCKED');
    }
  }; 

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[1440px] mx-auto p-10 flex flex-col font-poppins min-h-[768px] gap-[42px] relative">
        <div className="flex flex-col lg:flex-row gap-10 items-start">

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6">
            <div className="w-full h-[52px] bg-gradient-brand rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-[18px] font-poppins">FAQs</span>
            </div>
            <div className="w-full bg-gradient-to-b from-[#1498EB] to-[#962DE3] p-[0.9px] rounded-xl shadow-sm">
              <div className="w-full bg-white rounded-xl flex flex-col py-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="flex flex-col border-b border-[#F0F0F0] last:border-none">
                      <div
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#F8FAFF] transition-all group"
                      >
                        <span className={`font-poppins font-normal text-[14px] leading-[17px] tracking-normal ${isOpen ? 'text-[#3867D6]' : 'text-black'}`}>
                          {faq.question}
                        </span>
                        <MdKeyboardArrowDown
                          className={`text-2xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#3867D6]' : 'rotate-0 text-black'}`}
                        />
                      </div>
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 text-[13px] text-[#8E8E93] font-poppins leading-relaxed">
                          Placeholder answer for {faq.question.toLowerCase()} goes here. This section expands smoothly when clicked.
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            {stage === 'UPLOAD' && (
              <Button
                className="w-full h-[58px] bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] text-[#3867D6] rounded-xl font-semibold text-[18px] shadow-sm hover:opacity-90 transition-all font-poppins mt-2"
                onClick={() => router.push('/dashboard/income-sources')}
              >
                Save & Continue
              </Button>
            )}

          </div>

          {/* Main Content */}
          <div className="flex-1 flex flex-col gap-5 w-full">
            {stage === 'UPLOAD' && (
              <>
                <h1 className="font-Poppins font-semibold text-[black] text-[28px] leading-[38.4px] tracking-normal">
                  Upload Form-16 to auto-fill your data
                </h1>

                <div className='flex flex-col gap-[22px]'>
                  <div className="max-w-[973px] bg-[#F0F4FF] rounded-xl p-6 flex items-start gap-4 rounded-lg bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] p-[1px]">
                    <div className="w-full flex h-full rotate-0 opacity-100 gap-[30px] rounded-lg pt-[14px] pr-[110px] pb-[15px] pl-[42px] bg-[#F0F4FF]">
                      <div className="w-12 h-12 flex items-center justify-center">
                        <Image src="/bulbIcon.png" alt="lightbulb" width={30} height={30} />
                      </div>
                      <ul className="font-poppins font-normal text-base flex flex-col gap-1 leading-6 tracking-normal">
                        <li className="flex items-start gap-2">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                          You can upload multiple Form 16&apos;s if you have switched jobs in this Financial Year.
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                          You should also upload the annexure if you have received it separately from your employer.
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div
                    className="relative max-w-[973px] h-[423px] rounded-[8px] bg-[#F0F4FF] overflow-hidden group cursor-pointer"
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className="absolute inset-0 pointer-events-none">
                      <svg width="100%" height="100%" className="rounded-[8px]">
                        <rect width="100%" height="100%" fill="none" rx="8" ry="8" stroke="url(#gradient-dashed)" strokeWidth="2" strokeDasharray="4,4" />
                        <defs>
                          <linearGradient id="gradient-dashed" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#1498EB" />
                            <stop offset="100%" stopColor="#962DE3" />
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full py-[90px] px-[308px] gap-8">
                      <div className="w-[50px] h-[50px] flex items-center justify-center">
                        <Image src="/uploadIcon.png" alt="upload" width={50} height={50} />
                      </div>
                      <h3 className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal whitespace-nowrap">
                        Drop Form 16 here or click to select
                      </h3>
                      <span className="text-[#8E8E93] font-poppins font-medium text-[20px] leading-[100%] tracking-normal text-center">OR</span>
                      <Button variant="brand" className="w-[340px] rounded-lg font-medium text-[18px] shadow-sm pointer-events-none">
                        Browse File
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        accept="application/pdf"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex max-w-[973px] justify-center cursor-pointer">
                  <button onClick={() => router.push('/dashboard/income-sources')} className="w-auto h-10 rotate-0 opacity-100 gap-2.5 rounded-lg py-2 px-4 bg-gradient-to-r from-[#1498EB] to-[#962DE3] text-transparent bg-clip-text font-semibold text-[16px]">
                    Continue without Form 16
                  </button>
                </div>
              </>
            )}

            {stage === 'PROCESSING' && (
              <div className="max-w-[973px] flex-1 flex flex-col items-center justify-center min-h-[500px] gap-6 bg-[#F0F4FF] rounded-xl border border-dashed border-[#1498EB]">
                <svg className="animate-spin h-14 w-14 text-[#3867D6]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <h2 className="text-2xl font-semibold text-gray-800 font-poppins">{processingStatus}</h2>
                <p className="text-[#8E8E93] font-poppins text-sm">Please wait while we extract your data safely.</p>
              </div>
            )}
          </div>
        </div>
        <Footer2 />

        {/* LOCKED VIEW MODAL */}
        {stage === 'LOCKED' && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-md p-8 flex flex-col gap-6 shadow-2xl relative">
              <button onClick={() => setStage('UPLOAD')} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                ✕
              </button>
              <div className="text-center flex flex-col gap-2">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-2 text-[#3867D6] text-2xl">
                  🔒
                </div>
                <h2 className="text-2xl font-semibold text-gray-800">Protected Document</h2>
                <p className="text-sm text-gray-500">
                  This Form 16 PDF is password protected. The password is usually your PAN in uppercase or your Date of Birth (DDMMYYYY).
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Document Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={pdfPassword}
                    onChange={(e) => setPdfPassword(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#3867D6] outline-none pr-10"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <MdVisibilityOff size={20} /> : <MdVisibility size={20} />}
                  </button>
                </div>
              </div>
              <Button
                variant="brand"
                className="w-full rounded-lg font-medium text-white shadow-sm h-[48px]"
                onClick={handlePasswordSubmit}
                disabled={!pdfPassword}
              >
                Unlock Document
              </Button>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
