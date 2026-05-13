"use client";

import React from 'react';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

const AuthModal = ({ isOpen, onClose, onConfirm, email, title }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-[560px] rounded-[24px] overflow-hidden shadow-2xl flex flex-col items-center p-[40px] gap-[32px] animate-in fade-in zoom-in duration-300">
        
        <h2 className="font-Poppins font-semibold text-[28px] leading-[38.4px] text-center bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
          {title || "Create your Candid Tax Account"}
        </h2>

        {/* Email Badge */}
        <div className="px-6 py-2 rounded-full border border-[#962DE3] flex items-center justify-center">
          <span className="font-poppins text-base text-[#962DE3]">{email}</span>
        </div>

        {/* Checkbox block */}
        <div className="w-full">
          <Checkbox
            id="modal-terms"
            label={
              <span className="font-poppins text-base leading-6 text-[#1E1E1E]">
                I have read and agrees to the following <span className="font-bold">Candid Tax Privacy Policy & Terms & Conditions</span> before proceeding.
              </span>
            }
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-[20px] w-full">
          <Button 
            variant="brand" 
            className="flex-1 h-[52px] rounded-[8px] font-Poppins font-semibold text-base"
            onClick={onConfirm}
          >
            Agree and Continue
          </Button>
          <Button 
            variant="whiteGradient" 
            className="flex-1 h-[52px] rounded-[8px] font-Poppins font-semibold text-base"
            onClick={onClose}
          >
            I decline
          </Button>
        </div>

      </div>
    </div>
  );
};

export default AuthModal;
