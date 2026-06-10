"use client";

import React, { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MdCheckCircle, MdReceipt, MdArrowBack, MdContentCopy } from 'react-icons/md';
import { toast } from 'react-toastify';
import Button from '@/components/ui/Button';
import Footer2 from '@/components/layout/Footer2';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useItrStore } from '@/store/itrStore';

function SuccessPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const ack = searchParams?.get('ack') || 'Not Available';
  
  const state = useItrStore();
  const filingType = state.selectedFilingType || state.filingType || 'HUF';

  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(ack);
    setCopied(true);
    toast.success("Acknowledgement Number copied!");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-grow flex flex-col items-center justify-center py-16 px-4">
      <div className="max-w-xl w-full bg-white rounded-[32px] border border-gray-100 shadow-xl p-8 md:p-12 text-center flex flex-col items-center gap-8">
        
        {/* Animated Success Badge */}
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center text-green-500 animate-bounce">
          <MdCheckCircle size={56} />
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col gap-3">
          <h1 className="font-poppins font-bold text-3xl text-gray-900 leading-tight">
            Filing Submitted Successfully!
          </h1>
          <p className="font-poppins font-normal text-md text-gray-500 leading-relaxed max-w-sm mx-auto">
            Your Income Tax Return ({filingType}) has been successfully filed with the Income Tax Department.
          </p>
        </div>

        {/* Acknowledgement Number Card */}
        <div className="w-full bg-[#F0F4FF] rounded-2xl p-6 border border-[#C8D7FF]/60 flex flex-col gap-4">
          <div className="flex justify-between items-center text-sm font-semibold text-gray-500">
            <span>Acknowledgement Number</span>
            <button 
              onClick={copyToClipboard}
              className="flex items-center gap-1.5 text-[#3867D6] hover:text-[#2E54B2] transition-colors"
            >
              <MdContentCopy size={16} />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>
          </div>
          <div className="font-poppins font-bold text-2xl md:text-3xl text-gray-900 tracking-wider select-all break-all">
            {ack}
          </div>
        </div>

        {/* Status Information */}
        <div className="w-full flex flex-col gap-4 text-left border-t border-gray-100 pt-6 text-sm text-gray-600">
          <div className="flex justify-between py-1.5">
            <span className="font-medium text-gray-500">Filing Status</span>
            <span className="font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full text-xs">Filed</span>
          </div>
          <div className="flex justify-between py-1.5 border-t border-gray-50">
            <span className="font-medium text-gray-500">Taxpayer Type</span>
            <span className="font-semibold text-gray-900">{filingType}</span>
          </div>
          <div className="flex justify-between py-1.5 border-t border-gray-50">
            <span className="font-medium text-gray-500">Assessment Year</span>
            <span className="font-semibold text-gray-900">2026-2027</span>
          </div>
        </div>

        {/* Navigation Actions */}
        <div className="w-full flex flex-col sm:flex-row gap-4 mt-2">
          <Link href="/dashboard" className="flex-1">
            <Button 
              variant="brand" 
              className="w-full py-3.5 rounded-xl font-semibold text-white border-none flex items-center justify-center gap-2"
            >
              <MdArrowBack size={20} />
              <span>Go to Dashboard</span>
            </Button>
          </Link>
          <button 
            onClick={() => toast.info('Detailed return receipt will be sent to your email.')}
            className="flex-1 border border-gray-200 hover:bg-gray-50 transition-colors rounded-xl font-semibold text-gray-700 flex items-center justify-center gap-2 py-3.5"
          >
            <MdReceipt size={20} />
            <span>View Receipt</span>
          </button>
        </div>

      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-[#F8F9FC] flex flex-col font-poppins">
        <Suspense fallback={<div className="flex-grow flex items-center justify-center">Loading Success Details...</div>}>
          <SuccessPageContent />
        </Suspense>
        <Footer2 />
      </div>
    </ProtectedRoute>
  );
}
