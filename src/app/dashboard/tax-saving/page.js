"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdAdd,
  MdDelete
} from 'react-icons/md';
import Stepper1 from '@/components/ui/steper1';
import SupportCard from '@/components/cards/supportCard';
import { useChatStore } from '@/store/chatStore';
import Button from '@/components/ui/Button';
import Footer2 from '@/components/layout/Footer2';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { useItrStore } from '@/store/itrStore';
import { useFormik } from 'formik';
import { toast } from 'react-toastify';

// Custom high-fidelity styled manual input field
const ManualInput = ({ label = "Amount ₹", fullWidth = false, className = "", ...props }) => {
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
const ManualSelect = ({ label, fullWidth = false, className = "", children, ...props }) => {
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
const MainSection = ({ title, children, defaultOpen = true }) => {
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

// Form row supporting side-by-side flex layout
const FormRow = ({ label, children, indent = false }) => {
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

export default function TaxSavingPage() {
  const { openChat } = useChatStore();
  const router = useRouter();

  const {
    taxesPaid, bankAccounts,
    tdsManualData, tcsManualData, advanceTaxManualData, bankManualData,
    setFields, updateStep
  } = useItrStore();

  const [activeTab, setActiveTab] = useState('tds');
  const targetRouteRef = React.useRef(null);

  const tabs = [
    { id: 'tds', label: 'TDS Schedules' },
    { id: 'tcs', label: 'TCS — Tax Collected at Source' },
    { id: 'advance', label: 'Advance Tax' },
    { id: 'bank', label: 'Bank Account Details (Refund)' },
  ];

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // TDS Schedules
      tds1_employerTan: tdsManualData?.tds1_employerTan || '',
      tds1_deductorName: tdsManualData?.tds1_deductorName || '',
      tds1_incomeSalary: tdsManualData?.tds1_incomeSalary || '',
      tds1_taxDeducted: tdsManualData?.tds1_taxDeducted || '',

      tds2_deductorTan: tdsManualData?.tds2_deductorTan || '',
      tds2_deductorName: tdsManualData?.tds2_deductorName || '',
      tds2_section: tdsManualData?.tds2_section || '',
      tds2_grossReceipt: tdsManualData?.tds2_grossReceipt || '',
      tds2_taxYear: tdsManualData?.tds2_taxYear || '',
      tds2_taxDeducted: tdsManualData?.tds2_taxDeducted || '',
      tds2_creditClaimed: tdsManualData?.tds2_creditClaimed || '',

      tds3_deductorName: tdsManualData?.tds3_deductorName || '',
      tds3_section: tdsManualData?.tds3_section || '',
      tds3_grossReceipt: tdsManualData?.tds3_grossReceipt || '',
      tds3_taxYear: tdsManualData?.tds3_taxYear || '',
      tds3_taxDeducted: tdsManualData?.tds3_taxDeducted || '',
      tds3_creditClaimed: tdsManualData?.tds3_creditClaimed || '',

      // TCS
      tcs_collectorTan: tcsManualData?.tcs_collectorTan || '',
      tcs_collectorName: tcsManualData?.tcs_collectorName || '',
      tcs_grossReceipt: tcsManualData?.tcs_grossReceipt || '',
      tcs_taxYear: tcsManualData?.tcs_taxYear || '',
      tcs_totalTCS: tcsManualData?.tcs_totalTCS || '',
      tcs_creditClaimed: tcsManualData?.tcs_creditClaimed || '',

      // Advance Tax / Self Assessment Tax Payments
      taxPayment_bsrCode: advanceTaxManualData?.taxPayment_bsrCode || '',
      taxPayment_dateDeposit: advanceTaxManualData?.taxPayment_dateDeposit || '',
      taxPayment_challanSerial: advanceTaxManualData?.taxPayment_challanSerial || '',
      taxPayment_amount: advanceTaxManualData?.taxPayment_amount || '',
      taxPayment_type: advanceTaxManualData?.taxPayment_type || '',

      // Bank Account Details (Refund)
      bank_ifscCode: bankManualData?.bank_ifscCode || '',
      bank_name: bankManualData?.bank_name || '',
      bank_accountNo: bankManualData?.bank_accountNo || '',
      bank_accountType: bankManualData?.bank_accountType || '',
      bank_selectRefund: bankManualData?.bank_selectRefund || '',
    },
    onSubmit: (values) => {
      // Calculate computed sum of all taxes paid to set "taxesPaid" field
      const tds1 = parseFloat(values.tds1_taxDeducted || 0);
      const tds2 = parseFloat(values.tds2_taxDeducted || 0);
      const tds3 = parseFloat(values.tds3_taxDeducted || 0);
      const tcs = parseFloat(values.tcs_totalTCS || 0);
      const adv = parseFloat(values.taxPayment_amount || 0);
      const computedTaxesPaid = tds1 + tds2 + tds3 + tcs + adv;

      setFields({
        taxesPaid: computedTaxesPaid,
        tdsManualData: {
          tds1_employerTan: values.tds1_employerTan,
          tds1_deductorName: values.tds1_deductorName,
          tds1_incomeSalary: values.tds1_incomeSalary,
          tds1_taxDeducted: values.tds1_taxDeducted,
          tds2_deductorTan: values.tds2_deductorTan,
          tds2_deductorName: values.tds2_deductorName,
          tds2_section: values.tds2_section,
          tds2_grossReceipt: values.tds2_grossReceipt,
          tds2_taxYear: values.tds2_taxYear,
          tds2_taxDeducted: values.tds2_taxDeducted,
          tds2_creditClaimed: values.tds2_creditClaimed,
          tds3_deductorName: values.tds3_deductorName,
          tds3_section: values.tds3_section,
          tds3_grossReceipt: values.tds3_grossReceipt,
          tds3_taxYear: values.tds3_taxYear,
          tds3_taxDeducted: values.tds3_taxDeducted,
          tds3_creditClaimed: values.tds3_creditClaimed,
        },
        tcsManualData: {
          tcs_collectorTan: values.tcs_collectorTan,
          tcs_collectorName: values.tcs_collectorName,
          tcs_grossReceipt: values.tcs_grossReceipt,
          tcs_taxYear: values.tcs_taxYear,
          tcs_totalTCS: values.tcs_totalTCS,
          tcs_creditClaimed: values.tcs_creditClaimed,
        },
        advanceTaxManualData: {
          taxPayment_bsrCode: values.taxPayment_bsrCode,
          taxPayment_dateDeposit: values.taxPayment_dateDeposit,
          taxPayment_challanSerial: values.taxPayment_challanSerial,
          taxPayment_amount: values.taxPayment_amount,
          taxPayment_type: values.taxPayment_type,
        },
        bankManualData: {
          bank_ifscCode: values.bank_ifscCode,
          bank_name: values.bank_name,
          bank_accountNo: values.bank_accountNo,
          bank_accountType: values.bank_accountType,
          bank_selectRefund: values.bank_selectRefund,
        }
      });

      const targetRoute = targetRouteRef.current || '/dashboard/tax-summary';
      const routesToStep = {
        '/dashboard/filing-form': 1,
        '/dashboard/income-sources': 2,
        '/dashboard/tax-saving': 3,
        '/dashboard/tax-summary': 4,
      };
      updateStep(routesToStep[targetRoute] || 4);
      router.push(targetRoute);
      targetRouteRef.current = null;
    }
  });

  const handleNext = () => {
    const tabOrder = ['tds', 'tcs', 'advance', 'bank'];
    const currentIdx = tabOrder.indexOf(activeTab);
    if (currentIdx < tabOrder.length - 1) {
      setActiveTab(tabOrder[currentIdx + 1]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      targetRouteRef.current = '/dashboard/tax-summary';
      formik.handleSubmit();
    }
  };

  const handleStepClick = (route) => {
    targetRouteRef.current = route;
    formik.handleSubmit();
  };

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[1440px] mx-auto p-10 flex flex-col gap-10 font-poppins">
        {/* Top Stepper */}
        <div className="flex items-center justify-between">
          <div className="w-[320px] hidden lg:block" />
          <Stepper1 currentStep={3} onStepClick={handleStepClick} />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">
          {/* LEFT Sidebar Area */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6 lg:sticky lg:top-10">
            <SupportCard
              title="Contact Support"
              description="AI and expert assistance."
              buttonText="Chat Now"
              onClick={openChat}
            />

            <Button
              variant="brand"
              type="button"
              className="w-full h-[52px] rounded-xl font-semibold text-base shadow-md animate-fade-in"
              onClick={handleNext}
            >
              Go to next
            </Button>
          </div>

          {/* RIGHT Content Area */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Tabs Row */}
            <div className="flex flex-wrap gap-8 mb-2 select-none border-b border-[#F2F2F7]">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    pb-3 font-poppins transition-all whitespace-nowrap border-b-2 outline-none font-semibold text-base leading-6 tracking-normal text-center
                    ${activeTab === tab.id
                      ? "text-[#3867D6] border-[#3867D6]"
                      : "text-[#8E8E93] border-transparent hover:text-gray-600"
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB CONTENT: 1. TDS Schedules */}
            {activeTab === 'tds' && (
              <div className="flex flex-col gap-6 w-full">
                <MainSection title="TDS Schedules">
                  {/* TDS1: From Salary */}
                  <div className="text-center text-[#0A84FF] font-medium font-poppins text-[15px] mb-4">
                    --- TDS1: From Salary (Form 16) ---
                  </div>

                  <FormRow label="TAN of Employer/Deductor *">
                    <ManualInput
                      label="Type"
                      name="tds1_employerTan"
                      value={formik.values.tds1_employerTan}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Name of Deductor *">
                    <ManualInput
                      label="Type"
                      name="tds1_deductorName"
                      value={formik.values.tds1_deductorName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Income Chargeable under Salaries *">
                    <ManualInput
                      label="Amount ₹"
                      name="tds1_incomeSalary"
                      value={formik.values.tds1_incomeSalary}
                      onChange={(e) => formik.setFieldValue('tds1_incomeSalary', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Total Tax Deducted *">
                    <ManualInput
                      label="Amount ₹"
                      name="tds1_taxDeducted"
                      value={formik.values.tds1_taxDeducted}
                      onChange={(e) => formik.setFieldValue('tds1_taxDeducted', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  {/* TDS2: From Other Income */}
                  <div className="border-t border-[#E5E5EA] my-6 pt-6 text-center text-[#0A84FF] font-medium font-poppins text-[15px]">
                    --- TDS2: From Other Income (Form 16A) ---
                  </div>

                  <FormRow label="TAN of Deductor *">
                    <ManualInput
                      label="Type"
                      name="tds2_deductorTan"
                      value={formik.values.tds2_deductorTan}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Name of Deductor *">
                    <ManualInput
                      label="Type"
                      name="tds2_deductorName"
                      value={formik.values.tds2_deductorName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Section under which TDS deducted *">
                    <ManualSelect
                      label="Type"
                      name="tds2_section"
                      value={formik.values.tds2_section}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="194A">194A - Interest other than interest on securities</option>
                      <option value="194C">194C - Payment to contractors</option>
                      <option value="194H">194H - Commission or brokerage</option>
                      <option value="194I">194I - Rent</option>
                      <option value="194J">194J - Fees for professional or technical services</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Gross Receipt subject to TDS *">
                    <ManualInput
                      label="Amount ₹"
                      name="tds2_grossReceipt"
                      value={formik.values.tds2_grossReceipt}
                      onChange={(e) => formik.setFieldValue('tds2_grossReceipt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Year of Tax Deduction *">
                    <ManualSelect
                      label="Select"
                      name="tds2_taxYear"
                      value={formik.values.tds2_taxYear}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Tax Deducted *">
                    <ManualSelect
                      label="Amount ₹"
                      name="tds2_taxDeducted"
                      value={formik.values.tds2_taxDeducted}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="5000">₹ 5,000</option>
                      <option value="10000">₹ 10,000</option>
                      <option value="15000">₹ 15,000</option>
                      <option value="20000">₹ 20,000</option>
                      <option value="25000">₹ 25,000</option>
                      <option value="50000">₹ 50,000</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="TDS Credit Claimed This Year *">
                    <ManualSelect
                      label="Amount ₹"
                      name="tds2_creditClaimed"
                      value={formik.values.tds2_creditClaimed}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="5000">₹ 5,000</option>
                      <option value="10000">₹ 10,000</option>
                      <option value="15000">₹ 15,000</option>
                      <option value="20000">₹ 20,000</option>
                      <option value="25000">₹ 25,000</option>
                      <option value="50000">₹ 50,000</option>
                    </ManualSelect>
                  </FormRow>

                  {/* TDS3: From Rent */}
                  <div className="border-t border-[#E5E5EA] my-6 pt-6 text-center text-[#0A84FF] font-medium font-poppins text-[15px]">
                    --- TDS3: From Rent (Form 16C) ---
                  </div>

                  <FormRow label="Name of Deductor *">
                    <ManualInput
                      label="Type"
                      name="tds3_deductorName"
                      value={formik.values.tds3_deductorName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Section under which TDS deducted *">
                    <ManualSelect
                      label="Type"
                      name="tds3_section"
                      value={formik.values.tds3_section}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="194IB">194-IB - Payment of rent by individual/HUF</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Gross Receipt subject to TDS *">
                    <ManualInput
                      label="Amount ₹"
                      name="tds3_grossReceipt"
                      value={formik.values.tds3_grossReceipt}
                      onChange={(e) => formik.setFieldValue('tds3_grossReceipt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Year of Tax Deduction *">
                    <ManualSelect
                      label="Select"
                      name="tds3_taxYear"
                      value={formik.values.tds3_taxYear}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Tax Deducted *">
                    <ManualSelect
                      label="Amount ₹"
                      name="tds3_taxDeducted"
                      value={formik.values.tds3_taxDeducted}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="5000">₹ 5,000</option>
                      <option value="10000">₹ 10,000</option>
                      <option value="15000">₹ 15,000</option>
                      <option value="20000">₹ 20,000</option>
                      <option value="25000">₹ 25,000</option>
                      <option value="50000">₹ 50,000</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="TDS Credit Claimed *">
                    <ManualSelect
                      label="Amount ₹"
                      name="tds3_creditClaimed"
                      value={formik.values.tds3_creditClaimed}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="5000">₹ 5,000</option>
                      <option value="10000">₹ 10,000</option>
                      <option value="15000">₹ 15,000</option>
                      <option value="20000">₹ 20,000</option>
                      <option value="25000">₹ 25,000</option>
                      <option value="50000">₹ 50,000</option>
                    </ManualSelect>
                  </FormRow>
                </MainSection>
              </div>
            )}

            {/* TAB CONTENT: 2. TCS */}
            {activeTab === 'tcs' && (
              <div className="flex flex-col gap-6 w-full">
                <MainSection title="TDS Schedules">
                  <FormRow label="Tax Collection A/C Number of Collector *">
                    <ManualInput
                      label="Type"
                      name="tcs_collectorTan"
                      value={formik.values.tcs_collectorTan}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Name of Collector *">
                    <ManualInput
                      label="Type"
                      name="tcs_collectorName"
                      value={formik.values.tcs_collectorName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Gross Payment subject to Tax Collection *">
                    <ManualInput
                      label="Amount ₹"
                      name="tcs_grossReceipt"
                      value={formik.values.tcs_grossReceipt}
                      onChange={(e) => formik.setFieldValue('tcs_grossReceipt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Year of Tax Collection *">
                    <ManualSelect
                      label="Select"
                      name="tcs_taxYear"
                      value={formik.values.tcs_taxYear}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="2025">2025</option>
                      <option value="2024">2024</option>
                      <option value="2023">2023</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Tax Collected *">
                    <ManualInput
                      label="Amount ₹"
                      name="tcs_totalTCS"
                      value={formik.values.tcs_totalTCS}
                      onChange={(e) => formik.setFieldValue('tcs_totalTCS', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="TCS Credit Claimed This Year *">
                    <ManualInput
                      label="Amount ₹"
                      name="tcs_creditClaimed"
                      value={formik.values.tcs_creditClaimed}
                      onChange={(e) => formik.setFieldValue('tcs_creditClaimed', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>
                </MainSection>
              </div>
            )}

            {/* TAB CONTENT: 3. Advance / Self Assessment Tax */}
            {activeTab === 'advance' && (
              <div className="flex flex-col gap-6 w-full">
                <MainSection title="Advance Tax / Self Assessment Tax Payments">
                  <FormRow label="BSR Code *">
                    <ManualInput
                      label="7-digit numeric"
                      name="taxPayment_bsrCode"
                      value={formik.values.taxPayment_bsrCode}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Date of Deposit *">
                    <ManualInput
                      label="Pick a Date"
                      name="taxPayment_dateDeposit"
                      value={formik.values.taxPayment_dateDeposit}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Serial No. of Challan *">
                    <ManualInput
                      label="Type"
                      name="taxPayment_challanSerial"
                      value={formik.values.taxPayment_challanSerial}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Tax Paid *">
                    <ManualInput
                      label="Amount ₹"
                      name="taxPayment_amount"
                      value={formik.values.taxPayment_amount}
                      onChange={(e) => formik.setFieldValue('taxPayment_amount', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>
                </MainSection>
              </div>
            )}

            {/* TAB CONTENT: 4. Bank Account Details */}
            {activeTab === 'bank' && (
              <div className="flex flex-col gap-6 w-full">
                <MainSection title="Bank Account Details (Refund)">
                  <FormRow label="Bank Account Number *">
                    <ManualInput
                      label="7-digit numeric"
                      name="bank_accountNo"
                      value={formik.values.bank_accountNo}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="IFSC Code *">
                    <ManualInput
                      label="Pick a Date"
                      name="bank_ifscCode"
                      value={formik.values.bank_ifscCode}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Name of Bank">
                    <ManualInput
                      label="Type"
                      name="bank_name"
                      value={formik.values.bank_name}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Type of Account *">
                    <ManualSelect
                      label="Amount ₹"
                      name="bank_accountType"
                      value={formik.values.bank_accountType}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="SAVINGS">Savings Account</option>
                      <option value="CURRENT">Current Account</option>
                      <option value="NRO">Non-Resident Ordinary (NRO) Account</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Select for Refund Credit *">
                    <ManualSelect
                      label="Amount ₹"
                      className="bg-[#cae334]"
                      name="bank_selectRefund"
                      value={formik.values.bank_selectRefund}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </ManualSelect>
                  </FormRow>
                </MainSection>
              </div>
            )}
          </div>
        </div>
        <Footer2 />
      </div>
    </ProtectedRoute>
  );
}
