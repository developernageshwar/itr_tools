"use client";

import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';

// Custom high-fidelity styled manual input field
export const ManualInput = ({ label = "Amount ₹", fullWidth = false, className = "", ...props }) => {
  return (
    <div className={`relative border border-[#C4C4C4] rounded-[4px] h-[48px] px-3 flex items-center transition-colors focus-within:border-[#3867D6] ${fullWidth ? 'w-full' : 'w-full sm:w-[320px]'} ${props.readOnly ? 'bg-[#F2F2F7] border-[#E5E5EA]' : 'bg-white'} ${className}`}>
      <label className="absolute left-3 -top-2 bg-white px-1 font-poppins font-normal text-[13px] text-[#8E8E93] leading-none select-none">
        {label}
      </label>
      <input
        type="text"
        className="w-full bg-transparent outline-none font-poppins text-[13px] text-[#1E1E1E]"
        {...props}
      />
    </div>
  );
};

// Custom high-fidelity styled manual select dropdown
export const ManualSelect = ({ label, fullWidth = false, className = "", children, ...props }) => {
  const hasBg = className.includes('bg-');
  return (
    <div className={`relative border border-[#C4C4C4] rounded-[4px] h-[48px] px-3 flex items-center transition-colors focus-within:border-[#3867D6] ${fullWidth ? 'w-full' : 'w-full sm:w-[320px]'} ${hasBg ? '' : 'bg-white'} ${className}`}>
      <label className="absolute left-3 -top-2 bg-white px-1 font-poppins font-normal text-[10px] text-[#8E8E93] leading-none select-none">
        {label}
      </label>
      <select
        className="w-full bg-transparent outline-none font-poppins text-[13px] text-[#1E1E1E] cursor-pointer appearance-none pr-6"
        {...props}
      >
        {children}
      </select>
      <div className="pointer-events-none absolute right-3 text-[#8E8E93]">
        <MdKeyboardArrowDown size={20} />
      </div>
    </div>
  );
};

// Main collapsible section styled with premium elements
export const MainSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="w-full border border-blue-300 rounded-[16px] bg-white overflow-hidden mb-6">
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="max-w-[600px] leading-relaxed text-black font-poppins font-semibold text-base leading-6 tracking-normal">
          {title}
        </span>
        <MdKeyboardArrowDown
          size={24}
          className={`text-[#3867D6] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen && (
        <div className="p-6 border-t border-[#E5E5EA] flex flex-col gap-6 bg-white">
          {children}
        </div>
      )}
    </div>
  );
};

// Collapsible subsection
export const Subsection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-4 mb-2">
      <div
        className="flex items-center justify-between py-2 border-b border-[#E5E5EA] cursor-pointer hover:bg-gray-50/50 transition-colors select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="max-w-[600px] leading-relaxed text-black font-poppins font-medium text-base leading-6 tracking-normal">
          {title}
        </span>
        <MdKeyboardArrowDown
          size={20}
          className={`text-[#3867D6] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen && <div className="flex flex-col gap-4 pl-4">{children}</div>}
    </div>
  );
};

// Form row supporting side-by-side flex layout
export const FormRow = ({ label, children, indent = false }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#F5F5F7] last:border-0 gap-4 ${indent ? "pl-6" : ""}`}>
      <span className="max-w-[600px] leading-relaxed text-black font-poppins font-medium text-base leading-6 tracking-normal">
        {label}
      </span>
      <div className="flex-shrink-0 w-full sm:w-auto flex justify-end">
        {children}
      </div>
    </div>
  );
};
