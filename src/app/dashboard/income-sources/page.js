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
  return (
    <div className={`relative border border-[#C4C4C4] rounded-[4px] h-[48px] px-3 flex items-center bg-white transition-colors focus-within:border-[#3867D6] ${fullWidth ? 'w-full' : 'w-full sm:w-[320px]'} ${className}`}>
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
        <span className="    max-w-[600px] leading-relaxed text-black   font-poppins font-semibold text-base leading-6 tracking-normal">
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
const Subsection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="flex flex-col gap-4 mb-2">
      <div
        className="flex items-center justify-between py-2 border-b border-[#E5E5EA] cursor-pointer hover:bg-gray-50/50 transition-colors select-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className=" max-w-[600px] leading-relaxed text-black font-poppins font-medium text-base leading-6 tracking-normal">
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
const FormRow = ({ label, children, indent = false }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#F5F5F7] last:border-0 gap-4 ${indent ? "pl-6" : ""}`}>
      <span className="max-w-[600px] leading-relaxed text-black   font-poppins font-medium text-base leading-6 tracking-normal">
        {label}
      </span>
      <div className="flex-shrink-0 w-full sm:w-auto flex justify-end">
        {children}
      </div>
    </div>
  );
};

export default function IncomeSourcesPage() {
  const { openChat } = useChatStore();
  const router = useRouter();
  const {
    salaryIncome, interestIncome, houseProperties, dividendIncome, otherIncome, taxSavingsDeductions,
    salaryManualData, housePropertyManualData, otherSourcesManualData, deductionsManualData,
    setFields, updateStep
  } = useItrStore();

  const [activeTab, setActiveTab] = useState('salary');
  const targetRouteRef = React.useRef(null);
  const [showProperty2, setShowProperty2] = useState(housePropertyManualData?.showProperty2 || false);

  const tabs = [
    { id: 'salary', label: 'Salary/ Pension' },
    { id: 'house', label: 'House Property' },
    { id: 'other', label: 'Income from other Sources' },
    { id: 'deductions', label: 'Deductions' },
  ];

  // Set up unified Formik instance
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      // Salary Details
      salary17_1: salaryManualData?.salary17_1 || '',
      salary17_2: salaryManualData?.salary17_2 || '',
      salary17_3: salaryManualData?.salary17_3 || '',

      // Retirement details
      retirementUSA: salaryManualData?.retirementUSA || '',
      retirementUK: salaryManualData?.retirementUK || '',
      retirementCanada: salaryManualData?.retirementCanada || '',
      retirementOther: salaryManualData?.retirementOther || '',

      exemptAllowances: salaryManualData?.exemptAllowances || [{ id: '1', nature: '', amount: '' }],
      sec10_13A: salaryManualData?.sec10_13A || '',

      deductionStandard: salaryManualData?.deductionStandard !== undefined ? salaryManualData.deductionStandard : '50000',
      deductionEntertainment: salaryManualData?.deductionEntertainment || '',
      deductionProfessional: salaryManualData?.deductionProfessional || '',

      // HRA Details
      hraPlaceResidence: salaryManualData?.hraPlaceResidence || 'Metro',
      hraReceived: salaryManualData?.hraReceived || '',
      hraRentPaid: salaryManualData?.hraRentPaid || '',
      hraBasic: salaryManualData?.hraBasic || '',
      hraDA: salaryManualData?.hraDA || '',

      // House Property Details (Property 1)
      hpAddress: housePropertyManualData?.hpAddress || '',
      hpCity: housePropertyManualData?.hpCity || '',
      hpState: housePropertyManualData?.hpState || '',
      hpCountry: housePropertyManualData?.hpCountry || '',
      hpPinCode: housePropertyManualData?.hpPinCode || '',
      hpZipCode: housePropertyManualData?.hpZipCode || '',
      hpOwnerType: housePropertyManualData?.hpOwnerType || '',
      hpCoOwned: housePropertyManualData?.hpCoOwned || 'No',
      hpOwnerShare: housePropertyManualData?.hpOwnerShare || '100',
      hpCoOwnerName: housePropertyManualData?.hpCoOwnerName || '',
      hpCoOwnerPan: housePropertyManualData?.hpCoOwnerPan || '',
      hpCoOwnerAadhar: housePropertyManualData?.hpCoOwnerAadhar || '',
      hpCoOwnerShare: housePropertyManualData?.hpCoOwnerShare || '',
      hpTenantName: housePropertyManualData?.hpTenantName || '',
      hpTenantPan: housePropertyManualData?.hpTenantPan || '',
      hpTenantAadhar: housePropertyManualData?.hpTenantAadhar || '',
      hpTenantTan: housePropertyManualData?.hpTenantTan || '',
      hp1GrossRent: housePropertyManualData?.hp1GrossRent || '',
      hp1UnrealizedRent: housePropertyManualData?.hp1UnrealizedRent || '',
      hp1TaxPaid: housePropertyManualData?.hp1TaxPaid || '',
      hp1InterestPaid: housePropertyManualData?.hp1InterestPaid || '',
      hpLoanFrom: housePropertyManualData?.hpLoanFrom || '',
      hpLoanBankName: housePropertyManualData?.hpLoanBankName || '',
      hpLoanAccountNo: housePropertyManualData?.hpLoanAccountNo || '',
      hpLoanSanctionDate: housePropertyManualData?.hpLoanSanctionDate || '',
      hpLoanTotalAmount: housePropertyManualData?.hpLoanTotalAmount || '',
      hpLoanOutstanding: housePropertyManualData?.hpLoanOutstanding || '',
      hpInterestBorrowedCapital: housePropertyManualData?.hpInterestBorrowedCapital || '',
      hpArrearsReceived: housePropertyManualData?.hpArrearsReceived || '',

      // House Property Details (Property 2)
      hp2Address: housePropertyManualData?.hp2Address || '',
      hp2City: housePropertyManualData?.hp2City || '',
      hp2State: housePropertyManualData?.hp2State || '',
      hp2Country: housePropertyManualData?.hp2Country || '',
      hp2PinCode: housePropertyManualData?.hp2PinCode || '',
      hp2ZipCode: housePropertyManualData?.hp2ZipCode || '',
      hp2OwnerType: housePropertyManualData?.hp2OwnerType || '',
      hp2CoOwned: housePropertyManualData?.hp2CoOwned || 'No',
      hp2OwnerShare: housePropertyManualData?.hp2OwnerShare || '100',
      hp2CoOwnerName: housePropertyManualData?.hp2CoOwnerName || '',
      hp2CoOwnerPan: housePropertyManualData?.hp2CoOwnerPan || '',
      hp2CoOwnerAadhar: housePropertyManualData?.hp2CoOwnerAadhar || '',
      hp2CoOwnerShare: housePropertyManualData?.hp2CoOwnerShare || '',
      hp2TenantName: housePropertyManualData?.hp2TenantName || '',
      hp2TenantPan: housePropertyManualData?.hp2TenantPan || '',
      hp2TenantAadhar: housePropertyManualData?.hp2TenantAadhar || '',
      hp2TenantTan: housePropertyManualData?.hp2TenantTan || '',
      hp2GrossRent: housePropertyManualData?.hp2GrossRent || '',
      hp2UnrealizedRent: housePropertyManualData?.hp2UnrealizedRent || '',
      hp2TaxPaid: housePropertyManualData?.hp2TaxPaid || '',
      hp2InterestPaid: housePropertyManualData?.hp2InterestPaid || '',
      hp2LoanFrom: housePropertyManualData?.hp2LoanFrom || '',
      hp2LoanBankName: housePropertyManualData?.hp2LoanBankName || '',
      hp2LoanAccountNo: housePropertyManualData?.hp2LoanAccountNo || '',
      hp2LoanSanctionDate: housePropertyManualData?.hp2LoanSanctionDate || '',
      hp2LoanTotalAmount: housePropertyManualData?.hp2LoanTotalAmount || '',
      hp2LoanOutstanding: housePropertyManualData?.hp2LoanOutstanding || '',
      hp2InterestBorrowedCapital: housePropertyManualData?.hp2InterestBorrowedCapital || '',
      hp2ArrearsReceived: housePropertyManualData?.hp2ArrearsReceived || '',

      // Other Sources Details
      osSavingInterest: otherSourcesManualData?.savingInterest || '',
      osDepositInterest: otherSourcesManualData?.depositInterest || '',
      osDividendIncome: otherSourcesManualData?.dividendIncome || '',
      osOtherIncome: otherSourcesManualData?.otherIncome || '',

      // Mockup-specific fields
      osNatureOfIncome: otherSourcesManualData?.osNatureOfIncome || '',
      osDescription: otherSourcesManualData?.osDescription || '',
      osAmount: otherSourcesManualData?.osAmount || '',
      osDividendPeriod1: otherSourcesManualData?.osDividendPeriod1 || '',
      osDividendPeriod2: otherSourcesManualData?.osDividendPeriod2 || '',
      osDividendPeriod3: otherSourcesManualData?.osDividendPeriod3 || '',
      osDividendPeriod4: otherSourcesManualData?.osDividendPeriod4 || '',
      osDividendPeriod5: otherSourcesManualData?.osDividendPeriod5 || '',
      osIncome89A: otherSourcesManualData?.osIncome89A || '',
      osRelief89A: otherSourcesManualData?.osRelief89A || '',
      osDeduction57iia: otherSourcesManualData?.osDeduction57iia || '',
      osTotalIncome: otherSourcesManualData?.osTotalIncome || '',

      // LTCG 112A
      ltcgSaleConsideration: otherSourcesManualData?.ltcgSaleConsideration || '',
      ltcgCostAcquisition: otherSourcesManualData?.ltcgCostAcquisition || '',
      ltcgGains: otherSourcesManualData?.ltcgGains || '',

      // Deductions Details
      ded80C: deductionsManualData?.section80c || '',
      ded80D: deductionsManualData?.section80d || '',
      ded80TTA: deductionsManualData?.section80tta || '',
      ded80G: deductionsManualData?.section80g || '',

      // Mockup-specific deductions
      ded80C_Claim: deductionsManualData?.ded80C_Claim || '',
      ded80CCC: deductionsManualData?.ded80CCC || '',
      ded80CCD1: deductionsManualData?.ded80CCD1 || '',
      ded80CCD1B: deductionsManualData?.ded80CCD1B || '',
      ded80CCD2: deductionsManualData?.ded80CCD2 || '',
      ded80DD: deductionsManualData?.ded80DD || '',
      ded80DDB: deductionsManualData?.ded80DDB || '',
      ded80DDB_Disease: deductionsManualData?.ded80DDB_Disease || '',
      ded80E: deductionsManualData?.ded80E || '',
      ded80EE: deductionsManualData?.ded80EE || '',
      ded80EEA: deductionsManualData?.ded80EEA || '',
      ded80EEB: deductionsManualData?.ded80EEB || '',
      ded80GG: deductionsManualData?.ded80GG || '',
      ded80GGA: deductionsManualData?.ded80GGA || '',
      ded80GGC: deductionsManualData?.ded80GGC || '',
      ded80QQB: deductionsManualData?.ded80QQB || '',
      ded80RRB: deductionsManualData?.ded80RRB || '',
      ded80TTB: deductionsManualData?.ded80TTB || '',
      ded80U: deductionsManualData?.ded80U || '',
      dedAnyOther: deductionsManualData?.dedAnyOther || '',

      // Schedule 80D
      s80d_selfFamilyClaim: deductionsManualData?.s80d_selfFamilyClaim || '',
      s80d_selfFamilyAmt: deductionsManualData?.s80d_selfFamilyAmt || '',
      s80d_insurerName: deductionsManualData?.s80d_insurerName || '',
      s80d_policyNumber: deductionsManualData?.s80d_policyNumber || '',
      s80d_receiptNumber: deductionsManualData?.s80d_receiptNumber || '',
      s80d_amountPerPolicy: deductionsManualData?.s80d_amountPerPolicy || '',
      s80d_prevCheckupSelfFamily: deductionsManualData?.s80d_prevCheckupSelfFamily || '',
      s80d_medExpSelfFamily: deductionsManualData?.s80d_medExpSelfFamily || '',
      s80d_parentSenior: deductionsManualData?.s80d_parentSenior || '',
      s80d_parentsAmt: deductionsManualData?.s80d_parentsAmt || '',
      s80d_prevCheckupParents: deductionsManualData?.s80d_prevCheckupParents || '',
      s80d_medExpParents: deductionsManualData?.s80d_medExpParents || '',
      s80d_eligibleAmt: deductionsManualData?.s80d_eligibleAmt || '',

      // Schedule 80G
      s80g_category: deductionsManualData?.s80g_category || '',
      s80g_doneeName: deductionsManualData?.s80g_doneeName || '',
      s80g_doneeAddress: deductionsManualData?.s80g_doneeAddress || '',
      s80g_doneeCity: deductionsManualData?.s80g_doneeCity || '',
      s80g_doneeState: deductionsManualData?.s80g_doneeState || '',
      s80g_doneePin: deductionsManualData?.s80g_doneePin || '',
      s80g_doneePan: deductionsManualData?.s80g_doneePan || '',
      s80g_arnCatD: deductionsManualData?.s80g_arnCatD || '',
      s80g_cashAmt: deductionsManualData?.s80g_cashAmt || '',
      s80g_otherAmt: deductionsManualData?.s80g_otherAmt || '',
      s80g_chequeNo: deductionsManualData?.s80g_chequeNo || '',
      s80g_ifsc: deductionsManualData?.s80g_ifsc || '',
      s80g_totalDonation: deductionsManualData?.s80g_totalDonation || '',
      s80g_eligibleAmt: deductionsManualData?.s80g_eligibleAmt || '',

      // Schedule 80GGA
      s80gga_clause: deductionsManualData?.s80gga_clause || '',
      s80gga_doneeName: deductionsManualData?.s80gga_doneeName || '',
      s80gga_doneeAddress: deductionsManualData?.s80gga_doneeAddress || '',
      s80gga_doneeCity: deductionsManualData?.s80gga_doneeCity || '',
      s80gga_doneeState: deductionsManualData?.s80gga_doneeState || '',
      s80gga_doneePin: deductionsManualData?.s80gga_doneePin || '',
      s80gga_doneePan: deductionsManualData?.s80gga_doneePan || '',
      s80gga_cashDate: deductionsManualData?.s80gga_cashDate || '',
      s80gga_cashAmt: deductionsManualData?.s80gga_cashAmt || '',
      s80gga_otherAmt: deductionsManualData?.s80gga_otherAmt || '',
      s80gga_totalDonation: deductionsManualData?.s80gga_totalDonation || '',
      s80gga_eligibleAmt: deductionsManualData?.s80gga_eligibleAmt || '',

      // Schedule 80GGC
      s80ggc_dateSelect: deductionsManualData?.s80ggc_dateSelect || '',
      s80ggc_cashAmt: deductionsManualData?.s80ggc_cashAmt || '',
      s80ggc_otherAmt: deductionsManualData?.s80ggc_otherAmt || '',
      s80ggc_totalContribution: deductionsManualData?.s80ggc_totalContribution || '',
      s80ggc_eligibleAmt: deductionsManualData?.s80ggc_eligibleAmt || '',
      s80ggc_partyName: deductionsManualData?.s80ggc_partyName || '',
      s80ggc_partyPan: deductionsManualData?.s80ggc_partyPan || '',
      s80ggc_chequeNo: deductionsManualData?.s80ggc_chequeNo || '',
      s80ggc_ifsc: deductionsManualData?.s80ggc_ifsc || '',

      // Schedule 80C
      s80c_naturePayment: deductionsManualData?.s80c_naturePayment || '',
      s80c_eligibleAmt: deductionsManualData?.s80c_eligibleAmt || '',
      s80c_policyId: deductionsManualData?.s80c_policyId || '',
      s80c_total80C: deductionsManualData?.s80c_total80C || '',
      s80ccc_insurerName: deductionsManualData?.s80ccc_insurerName || '',
      s80ccc_policyNo: deductionsManualData?.s80ccc_policyNo || '',
      s80ccc_deductionAmt: deductionsManualData?.s80ccc_deductionAmt || '',

      // Sections 80E/80EE/80EEA/80EEB
      s80e_loanTakenFrom: deductionsManualData?.s80e_loanTakenFrom || '',
      s80e_ifscCode: deductionsManualData?.s80e_ifscCode || '',
      s80e_panInstitution: deductionsManualData?.s80e_panInstitution || '',
      s80e_nameInstitution: deductionsManualData?.s80e_nameInstitution || '',
      s80e_loanAccNo: deductionsManualData?.s80e_loanAccNo || '',
      s80e_dateSanction: deductionsManualData?.s80e_dateSanction || '',
      s80e_totalLoanAmt: deductionsManualData?.s80e_totalLoanAmt || '',
      s80e_outstandingLoan: deductionsManualData?.s80e_outstandingLoan || '',
      s80e_interestAmt: deductionsManualData?.s80e_interestAmt || '',
      s80ee_houseValue: deductionsManualData?.s80ee_houseValue || '',
      s80ee_interestAmt: deductionsManualData?.s80ee_interestAmt || '',
      s80eea_stampValue: deductionsManualData?.s80eea_stampValue || '',
      s80eea_interestAmt: deductionsManualData?.s80eea_interestAmt || '',
      s80eea_totalLoanAmt: deductionsManualData?.s80eea_totalLoanAmt || '',
      s80eeb_vehicleRegNo: deductionsManualData?.s80eeb_vehicleRegNo || '',
      s80eeb_interestAmt: deductionsManualData?.s80eeb_interestAmt || '',

      // Schedule 80U/80DD
      s80u_natureDisability: deductionsManualData?.s80u_natureDisability || '',
      s80u_typeDisability: deductionsManualData?.s80u_typeDisability || '',
      s80u_deductionAmt: deductionsManualData?.s80u_deductionAmt || '',
      s80u_ackNo10IA: deductionsManualData?.s80u_ackNo10IA || '',
      s80u_udidNo: deductionsManualData?.s80u_udidNo || '',
      s80dd_typeDependent: deductionsManualData?.s80dd_typeDependent || '',
      s80dd_panDependent: deductionsManualData?.s80dd_panDependent || '',
      s80dd_aadhaarDependent: deductionsManualData?.s80dd_aadhaarDependent || '',

      // Schedule 80GG
      s80gg_landlordName: deductionsManualData?.s80gg_landlordName || '',
      s80gg_landlordPan: deductionsManualData?.s80gg_landlordPan || '',
      s80gg_rentedAddress: deductionsManualData?.s80gg_rentedAddress || '',
      s80gg_rentPaid: deductionsManualData?.s80gg_rentPaid || '',
      s80gg_eligibleAmt: deductionsManualData?.s80gg_eligibleAmt || '',
    },
    onSubmit: (values) => {
      setFields({
        salaryIncome: chargeableSalary,
        interestIncome: computedInterestTotal,
        houseProperties: computedHousePropertyTotal,
        dividendIncome: computedDividendTotal,
        otherIncome: computedOtherTotal,
        taxSavingsDeductions: computedDeductionsTotal,

        salaryManualData: {
          salary17_1: values.salary17_1,
          salary17_2: values.salary17_2,
          salary17_3: values.salary17_3,
          retirementUSA: values.retirementUSA,
          retirementUK: values.retirementUK,
          retirementCanada: values.retirementCanada,
          retirementOther: values.retirementOther,
          exemptAllowances: values.exemptAllowances,
          sec10_13A: values.sec10_13A,
          deductionStandard: values.deductionStandard,
          deductionEntertainment: values.deductionEntertainment,
          deductionProfessional: values.deductionProfessional,

          hraPlaceResidence: values.hraPlaceResidence,
          hraReceived: values.hraReceived,
          hraRentPaid: values.hraRentPaid,
          hraBasic: values.hraBasic,
          hraDA: values.hraDA,
        },
        housePropertyManualData: {
          hpAddress: values.hpAddress,
          hpCity: values.hpCity,
          hpState: values.hpState,
          hpCountry: values.hpCountry,
          hpPinCode: values.hpPinCode,
          hpZipCode: values.hpZipCode,
          hpOwnerType: values.hpOwnerType,
          hpCoOwned: values.hpCoOwned,
          hpOwnerShare: values.hpOwnerShare,
          hpCoOwnerName: values.hpCoOwnerName,
          hpCoOwnerPan: values.hpCoOwnerPan,
          hpCoOwnerAadhar: values.hpCoOwnerAadhar,
          hpCoOwnerShare: values.hpCoOwnerShare,
          hpTenantName: values.hpTenantName,
          hpTenantPan: values.hpTenantPan,
          hpTenantAadhar: values.hpTenantAadhar,
          hpTenantTan: values.hpTenantTan,
          hp1GrossRent: values.hp1GrossRent,
          hp1UnrealizedRent: values.hp1UnrealizedRent,
          hp1TaxPaid: values.hp1TaxPaid,
          hp1InterestPaid: values.hp1InterestPaid,
          hpLoanFrom: values.hpLoanFrom,
          hpLoanBankName: values.hpLoanBankName,
          hpLoanAccountNo: values.hpLoanAccountNo,
          hpLoanSanctionDate: values.hpLoanSanctionDate,
          hpLoanTotalAmount: values.hpLoanTotalAmount,
          hpLoanOutstanding: values.hpLoanOutstanding,
          hpInterestBorrowedCapital: values.hpInterestBorrowedCapital,
          hpArrearsReceived: values.hpArrearsReceived,

          // Property 2
          hp2Address: values.hp2Address,
          hp2City: values.hp2City,
          hp2State: values.hp2State,
          hp2Country: values.hp2Country,
          hp2PinCode: values.hp2PinCode,
          hp2ZipCode: values.hp2ZipCode,
          hp2OwnerType: values.hp2OwnerType,
          hp2CoOwned: values.hp2CoOwned,
          hp2OwnerShare: values.hp2OwnerShare,
          hp2CoOwnerName: values.hp2CoOwnerName,
          hp2CoOwnerPan: values.hp2CoOwnerPan,
          hp2CoOwnerAadhar: values.hp2CoOwnerAadhar,
          hp2CoOwnerShare: values.hp2CoOwnerShare,
          hp2TenantName: values.hp2TenantName,
          hp2TenantPan: values.hp2TenantPan,
          hp2TenantAadhar: values.hp2TenantAadhar,
          hp2TenantTan: values.hp2TenantTan,
          hp2GrossRent: values.hp2GrossRent,
          hp2UnrealizedRent: values.hp2UnrealizedRent,
          hp2TaxPaid: values.hp2TaxPaid,
          hp2InterestPaid: values.hp2InterestPaid,
          hp2LoanFrom: values.hp2LoanFrom,
          hp2LoanBankName: values.hp2LoanBankName,
          hp2LoanAccountNo: values.hp2LoanAccountNo,
          hp2LoanSanctionDate: values.hp2LoanSanctionDate,
          hp2LoanTotalAmount: values.hp2LoanTotalAmount,
          hp2LoanOutstanding: values.hp2LoanOutstanding,
          hp2InterestBorrowedCapital: values.hp2InterestBorrowedCapital,
          hp2ArrearsReceived: values.hp2ArrearsReceived,
          showProperty2: showProperty2,
        },
        otherSourcesManualData: {
          savingInterest: values.osSavingInterest,
          depositInterest: values.osDepositInterest,
          dividendIncome: values.osDividendIncome,
          otherIncome: values.osOtherIncome,
          // New fields
          osNatureOfIncome: values.osNatureOfIncome,
          osDescription: values.osDescription,
          osAmount: values.osAmount,
          osDividendPeriod1: values.osDividendPeriod1,
          osDividendPeriod2: values.osDividendPeriod2,
          osDividendPeriod3: values.osDividendPeriod3,
          osDividendPeriod4: values.osDividendPeriod4,
          osDividendPeriod5: values.osDividendPeriod5,
          osIncome89A: values.osIncome89A,
          osRelief89A: values.osRelief89A,
          osDeduction57iia: values.osDeduction57iia,
          osTotalIncome: values.osTotalIncome,
          // LTCG
          ltcgSaleConsideration: values.ltcgSaleConsideration,
          ltcgCostAcquisition: values.ltcgCostAcquisition,
          ltcgGains: values.ltcgGains,
        },
        deductionsManualData: {
          section80c: values.ded80C,
          section80d: values.ded80D,
          section80tta: values.ded80TTA,
          section80g: values.ded80G,
          ded80C_Claim: values.ded80C_Claim,
          ded80CCC: values.ded80CCC,
          ded80CCD1: values.ded80CCD1,
          ded80CCD1B: values.ded80CCD1B,
          ded80CCD2: values.ded80CCD2,
          ded80DD: values.ded80DD,
          ded80DDB: values.ded80DDB,
          ded80DDB_Disease: values.ded80DDB_Disease,
          ded80E: values.ded80E,
          ded80EE: values.ded80EE,
          ded80EEA: values.ded80EEA,
          ded80EEB: values.ded80EEB,
          ded80GG: values.ded80GG,
          ded80GGA: values.ded80GGA,
          ded80GGC: values.ded80GGC,
          ded80QQB: values.ded80QQB,
          ded80RRB: values.ded80RRB,
          ded80TTB: values.ded80TTB,
          ded80U: values.ded80U,
          dedAnyOther: values.dedAnyOther,

          // Schedule 80D
          s80d_selfFamilyClaim: values.s80d_selfFamilyClaim,
          s80d_selfFamilyAmt: values.s80d_selfFamilyAmt,
          s80d_insurerName: values.s80d_insurerName,
          s80d_policyNumber: values.s80d_policyNumber,
          s80d_receiptNumber: values.s80d_receiptNumber,
          s80d_amountPerPolicy: values.s80d_amountPerPolicy,
          s80d_prevCheckupSelfFamily: values.s80d_prevCheckupSelfFamily,
          s80d_medExpSelfFamily: values.s80d_medExpSelfFamily,
          s80d_parentSenior: values.s80d_parentSenior,
          s80d_parentsAmt: values.s80d_parentsAmt,
          s80d_prevCheckupParents: values.s80d_prevCheckupParents,
          s80d_medExpParents: values.s80d_medExpParents,
          s80d_eligibleAmt: values.s80d_eligibleAmt,

          // Schedule 80G
          s80g_category: values.s80g_category,
          s80g_doneeName: values.s80g_doneeName,
          s80g_doneeAddress: values.s80g_doneeAddress,
          s80g_doneeCity: values.s80g_doneeCity,
          s80g_doneeState: values.s80g_doneeState,
          s80g_doneePin: values.s80g_doneePin,
          s80g_doneePan: values.s80g_doneePan,
          s80g_arnCatD: values.s80g_arnCatD,
          s80g_cashAmt: values.s80g_cashAmt,
          s80g_otherAmt: values.s80g_otherAmt,
          s80g_chequeNo: values.s80g_chequeNo,
          s80g_ifsc: values.s80g_ifsc,
          s80g_totalDonation: values.s80g_totalDonation,
          s80g_eligibleAmt: values.s80g_eligibleAmt,

          // Schedule 80GGA
          s80gga_clause: values.s80gga_clause,
          s80gga_doneeName: values.s80gga_doneeName,
          s80gga_doneeAddress: values.s80gga_doneeAddress,
          s80gga_doneeCity: values.s80gga_doneeCity,
          s80gga_doneeState: values.s80gga_doneeState,
          s80gga_doneePin: values.s80gga_doneePin,
          s80gga_doneePan: values.s80gga_doneePan,
          s80gga_cashDate: values.s80gga_cashDate,
          s80gga_cashAmt: values.s80gga_cashAmt,
          s80gga_otherAmt: values.s80gga_otherAmt,
          s80gga_totalDonation: values.s80gga_totalDonation,
          s80gga_eligibleAmt: values.s80gga_eligibleAmt,

          // Schedule 80GGC
          s80ggc_dateSelect: values.s80ggc_dateSelect,
          s80ggc_cashAmt: values.s80ggc_cashAmt,
          s80ggc_otherAmt: values.s80ggc_otherAmt,
          s80ggc_totalContribution: values.s80ggc_totalContribution,
          s80ggc_eligibleAmt: values.s80ggc_eligibleAmt,
          s80ggc_partyName: values.s80ggc_partyName,
          s80ggc_partyPan: values.s80ggc_partyPan,
          s80ggc_chequeNo: values.s80ggc_chequeNo,
          s80ggc_ifsc: values.s80ggc_ifsc,

          // Schedule 80C
          s80c_naturePayment: values.s80c_naturePayment,
          s80c_eligibleAmt: values.s80c_eligibleAmt,
          s80c_policyId: values.s80c_policyId,
          s80c_total80C: values.s80c_total80C,
          s80ccc_insurerName: values.s80ccc_insurerName,
          s80ccc_policyNo: values.s80ccc_policyNo,
          s80ccc_deductionAmt: values.s80ccc_deductionAmt,

          // Sections 80E/80EE/80EEA/80EEB
          s80e_loanTakenFrom: values.s80e_loanTakenFrom,
          s80e_ifscCode: values.s80e_ifscCode,
          s80e_panInstitution: values.s80e_panInstitution,
          s80e_nameInstitution: values.s80e_nameInstitution,
          s80e_loanAccNo: values.s80e_loanAccNo,
          s80e_dateSanction: values.s80e_dateSanction,
          s80e_totalLoanAmt: values.s80e_totalLoanAmt,
          s80e_outstandingLoan: values.s80e_outstandingLoan,
          s80e_interestAmt: values.s80e_interestAmt,
          s80ee_houseValue: values.s80ee_houseValue,
          s80ee_interestAmt: values.s80ee_interestAmt,
          s80eea_stampValue: values.s80eea_stampValue,
          s80eea_interestAmt: values.s80eea_interestAmt,
          s80eea_totalLoanAmt: values.s80eea_totalLoanAmt,
          s80eeb_vehicleRegNo: values.s80eeb_vehicleRegNo,
          s80eeb_interestAmt: values.s80eeb_interestAmt,

          // Schedule 80U/80DD
          s80u_natureDisability: values.s80u_natureDisability,
          s80u_typeDisability: values.s80u_typeDisability,
          s80u_deductionAmt: values.s80u_deductionAmt,
          s80u_ackNo10IA: values.s80u_ackNo10IA,
          s80u_udidNo: values.s80u_udidNo,
          s80dd_typeDependent: values.s80dd_typeDependent,
          s80dd_panDependent: values.s80dd_panDependent,
          s80dd_aadhaarDependent: values.s80dd_aadhaarDependent,

          // Schedule 80GG
          s80gg_landlordName: values.s80gg_landlordName,
          s80gg_landlordPan: values.s80gg_landlordPan,
          s80gg_rentedAddress: values.s80gg_rentedAddress,
          s80gg_rentPaid: values.s80gg_rentPaid,
          s80gg_eligibleAmt: values.s80gg_eligibleAmt,
        }
      });

      const tabOrder = ['salary', 'house', 'other', 'deductions'];
      const currentIdx = tabOrder.indexOf(activeTab);
      if (currentIdx < tabOrder.length - 1) {
        setActiveTab(tabOrder[currentIdx + 1]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const targetRoute = targetRouteRef.current || '/dashboard/tax-saving';
        const routesToStep = {
          '/dashboard/filing-form': 1,
          '/dashboard/income-sources': 2,
          '/dashboard/tax-saving': 3,
          '/dashboard/tax-summary': 4,
        };
        updateStep(routesToStep[targetRoute] || 3);
        router.push(targetRoute);
        targetRouteRef.current = null;
      }
    },
  });

  // Calculations (Salary)
  const grossSalary = parseFloat(formik.values.salary17_1 || 0) +
    parseFloat(formik.values.salary17_2 || 0) +
    parseFloat(formik.values.salary17_3 || 0);

  const totalExemptAllowances = formik.values.exemptAllowances.reduce(
    (sum, item) => sum + parseFloat(item.amount || 0), 0
  );

  const retUSA = parseFloat(formik.values.retirementUSA || 0);
  const retUK = parseFloat(formik.values.retirementUK || 0);
  const retCanada = parseFloat(formik.values.retirementCanada || 0);
  const retOther = parseFloat(formik.values.retirementOther || 0);

  const hraBasic = parseFloat(formik.values.hraBasic || 0);
  const hraDA = parseFloat(formik.values.hraDA || 0);
  const hraSalary = hraBasic + hraDA;
  const hraReceived = parseFloat(formik.values.hraReceived || 0);
  const hraRentPaid = parseFloat(formik.values.hraRentPaid || 0);

  const hraRentMinus10Pct = Math.max(0, hraRentPaid - (hraSalary * 0.1));
  const hraPercentSalary = hraSalary * (formik.values.hraPlaceResidence === 'Metro' ? 0.5 : 0.4);
  const hraEligibleExempt = hraSalary > 0 ? Math.min(hraReceived, hraRentMinus10Pct, hraPercentSalary) : 0;

  const finalSec10_13A = formik.values.sec10_13A !== '' ? parseFloat(formik.values.sec10_13A || 0) : hraEligibleExempt;
  const totalExemptions10 = totalExemptAllowances + finalSec10_13A;

  const netSalary = Math.max(0, grossSalary + retUSA + retUK + retCanada + retOther - totalExemptions10);

  const dedStd = parseFloat(formik.values.deductionStandard || 0);
  const dedEnt = parseFloat(formik.values.deductionEntertainment || 0);
  const dedProf = parseFloat(formik.values.deductionProfessional || 0);
  const deductions16 = dedStd + dedEnt + dedProf;

  const chargeableSalary = Math.max(0, netSalary - deductions16);

  // House Property Calculations (Property 1)
  const hp1GrossRent = parseFloat(formik.values.hp1GrossRent || 0);
  const hp1UnrealizedRent = parseFloat(formik.values.hp1UnrealizedRent || 0);
  const hp1TaxPaid = parseFloat(formik.values.hp1TaxPaid || 0);
  const hp1TotalBPlusC = hp1UnrealizedRent + hp1TaxPaid;

  const hp1AnnualValue = formik.values.hpPropertyType === 'Self Occupied' ? 0 : Math.max(0, hp1GrossRent - hp1TotalBPlusC);
  const hp1AnnualValueShare = hp1AnnualValue * (parseFloat(formik.values.hpOwnerShare || 100) / 100);
  const hp1StandardDeduction = hp1AnnualValueShare * 0.3;
  const hp1InterestPaid = parseFloat(formik.values.hpInterestBorrowedCapital || formik.values.hp1InterestPaid || 0);
  const hp1TotalGPlusH = hp1StandardDeduction + hp1InterestPaid;
  const hp1Arrears = parseFloat(formik.values.hpArrearsReceived || 0);
  const hp1NetIncome = hp1AnnualValueShare - hp1TotalGPlusH + hp1Arrears;

  // House Property Calculations (Property 2)
  const hp2GrossRent = parseFloat(formik.values.hp2GrossRent || 0);
  const hp2UnrealizedRent = parseFloat(formik.values.hp2UnrealizedRent || 0);
  const hp2TaxPaid = parseFloat(formik.values.hp2TaxPaid || 0);
  const hp2TotalBPlusC = hp2UnrealizedRent + hp2TaxPaid;

  const hp2AnnualValue = formik.values.hp2PropertyType === 'Self Occupied' ? 0 : Math.max(0, hp2GrossRent - hp2TotalBPlusC);
  const hp2AnnualValueShare = hp2AnnualValue * (parseFloat(formik.values.hp2OwnerShare || 100) / 100);
  const hp2StandardDeduction = hp2AnnualValueShare * 0.3;
  const hp2InterestPaid = parseFloat(formik.values.hp2InterestBorrowedCapital || formik.values.hp2InterestPaid || 0);
  const hp2TotalGPlusH = hp2StandardDeduction + hp2InterestPaid;
  const hp2Arrears = parseFloat(formik.values.hp2ArrearsReceived || 0);
  const hp2NetIncome = hp2AnnualValueShare - hp2TotalGPlusH + hp2Arrears;

  // Final totals
  const computedHousePropertyTotal = hp1NetIncome + (showProperty2 ? hp2NetIncome : 0);
  const computedI_Total = hp1TotalGPlusH + (showProperty2 ? hp2TotalGPlusH : 0);

  // Other Sources
  const div1 = parseFloat(formik.values.osDividendPeriod1 || 0);
  const div2 = parseFloat(formik.values.osDividendPeriod2 || 0);
  const div3 = parseFloat(formik.values.osDividendPeriod3 || 0);
  const div4 = parseFloat(formik.values.osDividendPeriod4 || 0);
  const div5 = parseFloat(formik.values.osDividendPeriod5 || 0);
  const totalDividends = div1 + div2 + div3 + div4 + div5;

  const osAmountVal = parseFloat(formik.values.osAmount || 0);
  const osIncome89AVal = parseFloat(formik.values.osIncome89A || 0);

  // LTCG gains calculation
  const ltcgSaleVal = parseFloat(formik.values.ltcgSaleConsideration || 0);
  const ltcgCostVal = parseFloat(formik.values.ltcgCostAcquisition || 0);
  const computedLtcgGains = Math.max(0, ltcgSaleVal - ltcgCostVal);

  const computedInterestTotal = parseFloat(formik.values.osSavingInterest || 0) +
    parseFloat(formik.values.osDepositInterest || 0) +
    (formik.values.osNatureOfIncome === 'Interest from Savings Bank' || formik.values.osNatureOfIncome === 'Interest from Deposits (FDs, Recurring etc.)' ? osAmountVal : 0);

  const computedDividendTotal = parseFloat(formik.values.osDividendIncome || 0) + totalDividends;

  const computedOtherTotal = parseFloat(formik.values.osOtherIncome || 0) +
    (formik.values.osNatureOfIncome !== 'Interest from Savings Bank' && formik.values.osNatureOfIncome !== 'Interest from Deposits (FDs, Recurring etc.)' ? osAmountVal : 0) +
    osIncome89AVal + computedLtcgGains;

  const computedOtherSourcesTotal = Math.max(0, osAmountVal + totalDividends + osIncome89AVal);

  // Deductions
  // Schedule 80C calculations
  const computedS80cTotal = parseFloat(formik.values.s80c_eligibleAmt || formik.values.s80c_total80C || 0);
  const finalDeduction80C = formik.values.ded80C_Claim === 'Yes' ? 150000 : (computedS80cTotal > 0 ? computedS80cTotal : parseFloat(formik.values.ded80C || 0));
  const computedS80cccDeduction = parseFloat(formik.values.s80ccc_deductionAmt || 0);
  const finalDeduction80CCC = computedS80cccDeduction > 0 ? computedS80cccDeduction : parseFloat(formik.values.ded80CCC || 0);

  // Schedule 80D calculations
  const selfFamilyMax = formik.values.s80d_selfFamilyClaim === 'Yes' ? 50000 : 25000;
  const parentMax = formik.values.s80d_parentSenior === 'Yes' ? 50000 : 25000;
  const selfFamilyHealth = parseFloat(formik.values.s80d_selfFamilyAmt || 0);
  const parentHealth = parseFloat(formik.values.s80d_parentsAmt || 0);
  const selfFamilyCheckup = parseFloat(formik.values.s80d_prevCheckupSelfFamily || 0);
  const parentCheckup = parseFloat(formik.values.s80d_prevCheckupParents || 0);
  const selfFamilyMed = parseFloat(formik.values.s80d_medExpSelfFamily || 0);
  const parentMed = parseFloat(formik.values.s80d_medExpParents || 0);
  const eligibleSelfFamily = Math.min(selfFamilyMax, selfFamilyHealth + selfFamilyCheckup + selfFamilyMed);
  const eligibleParent = Math.min(parentMax, parentHealth + parentCheckup + parentMed);
  const computedS80dEligible = eligibleSelfFamily + eligibleParent;
  const finalDeduction80D = computedS80dEligible > 0 ? computedS80dEligible : parseFloat(formik.values.ded80D || 0);

  // Sections 80E/80EE/80EEA/80EEB calculations
  const finalDeduction80E = parseFloat(formik.values.s80e_interestAmt || 0) > 0 ? parseFloat(formik.values.s80e_interestAmt || 0) : parseFloat(formik.values.ded80E || 0);
  const finalDeduction80EE = parseFloat(formik.values.s80ee_interestAmt || 0) > 0 ? parseFloat(formik.values.s80ee_interestAmt || 0) : parseFloat(formik.values.ded80EE || 0);
  const finalDeduction80EEA = parseFloat(formik.values.s80eea_interestAmt || 0) > 0 ? parseFloat(formik.values.s80eea_interestAmt || 0) : parseFloat(formik.values.ded80EEA || 0);
  const finalDeduction80EEB = parseFloat(formik.values.s80eeb_interestAmt || 0) > 0 ? parseFloat(formik.values.s80eeb_interestAmt || 0) : parseFloat(formik.values.ded80EEB || 0);

  // Schedule 80U/80DD calculations
  const hasDependent = formik.values.s80dd_typeDependent !== '';
  const finalDeduction80DD = hasDependent ? parseFloat(formik.values.s80u_deductionAmt || formik.values.ded80DD || 0) : parseFloat(formik.values.ded80DD || 0);
  const finalDeduction80U = !hasDependent ? parseFloat(formik.values.s80u_deductionAmt || formik.values.ded80U || 0) : parseFloat(formik.values.ded80U || 0);

  // Schedule 80GG calculations
  const computedS80ggEligible = parseFloat(formik.values.s80gg_eligibleAmt || formik.values.s80gg_rentPaid || 0);
  const finalDeduction80GG = computedS80ggEligible > 0 ? computedS80ggEligible : parseFloat(formik.values.ded80GG || 0);

  // Schedule 80G calculations
  const s80gCash = parseFloat(formik.values.s80g_cashAmt || 0);
  const s80gOther = parseFloat(formik.values.s80g_otherAmt || 0);
  const computedS80gTotal = s80gCash + s80gOther;
  const computedS80gEligible = computedS80gTotal;
  const finalDeduction80G = computedS80gEligible > 0 ? computedS80gEligible : parseFloat(formik.values.ded80G || 0);

  // Schedule 80GGA calculations
  const s80ggaCash = parseFloat(formik.values.s80gga_cashAmt || 0);
  const s80ggaOther = parseFloat(formik.values.s80gga_otherAmt || 0);
  const computedS80ggaTotal = s80ggaCash + s80ggaOther;
  const computedS80ggaEligible = computedS80ggaTotal;
  const finalDeduction80GGA = computedS80ggaEligible > 0 ? computedS80ggaEligible : parseFloat(formik.values.ded80GGA || 0);

  // Schedule 80GGC calculations
  const s80ggcCash = parseFloat(formik.values.s80ggc_cashAmt || 0);
  const s80ggcOther = parseFloat(formik.values.s80ggc_otherAmt || 0);
  const computedS80ggcTotal = s80ggcCash + s80ggcOther;
  const computedS80ggcEligible = computedS80ggcTotal;
  const finalDeduction80GGC = computedS80ggcEligible > 0 ? computedS80ggcEligible : parseFloat(formik.values.ded80GGC || 0);

  const computedDeductionsTotal = finalDeduction80C +
    finalDeduction80CCC +
    parseFloat(formik.values.ded80CCD1 || 0) +
    parseFloat(formik.values.ded80CCD1B || 0) +
    parseFloat(formik.values.ded80CCD2 || 0) +
    finalDeduction80D +
    finalDeduction80DD +
    parseFloat(formik.values.ded80DDB || 0) +
    finalDeduction80E +
    finalDeduction80EE +
    finalDeduction80EEA +
    finalDeduction80EEB +
    finalDeduction80G +
    finalDeduction80GG +
    finalDeduction80GGA +
    finalDeduction80GGC +
    parseFloat(formik.values.ded80QQB || 0) +
    parseFloat(formik.values.ded80RRB || 0) +
    parseFloat(formik.values.ded80TTA || 0) +
    parseFloat(formik.values.ded80TTB || 0) +
    finalDeduction80U +
    parseFloat(formik.values.dedAnyOther || 0);

  const handleNext = () => {
    targetRouteRef.current = '/dashboard/tax-saving';
    formik.handleSubmit();
  };

  const handleStepClick = (route) => {
    targetRouteRef.current = route;
    formik.handleSubmit();
  };

  const handleAddAllowanceRow = () => {
    const newAllowances = [...formik.values.exemptAllowances, { id: Date.now().toString(), nature: '', amount: '' }];
    formik.setFieldValue('exemptAllowances', newAllowances);
  };

  const handleDeleteAllowanceRow = (id) => {
    const filtered = formik.values.exemptAllowances.filter(item => item.id !== id);
    formik.setFieldValue('exemptAllowances', filtered.length > 0 ? filtered : [{ id: Date.now().toString(), nature: '', amount: '' }]);
  };

  const commonNatureOptions = [
    { value: '', label: 'Select' },
    { value: '10(5)', label: '10(5) - Travel Concession' },
    { value: '10(10)', label: '10(10) - Gratuity' },
    { value: '10(10A)', label: '10(10A) - Pension Commuted' },
    { value: '10(10AA)', label: '10(10AA) - Leave Encashment' },
    { value: '10(14)', label: '10(14) - Special Allowances' },
    { value: 'Other', label: 'Other Exempt Allowance' },
  ];

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[1440px] mx-auto p-10 flex flex-col gap-10 font-poppins">
        {/* Top Stepper */}
        <div className="flex items-center justify-between">
          <div className="w-[320px] hidden lg:block" />
          <Stepper1 currentStep={2} onStepClick={handleStepClick} />
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
              className="w-full h-[52px] rounded-xl font-semibold text-base shadow-md"
              onClick={handleNext}
            >
              Go to next
            </Button>
          </div>

          {/* RIGHT Content Area */}
          <div className="flex-1 w-full flex flex-col gap-6">
            {/* Tabs Row */}
            <div className="flex gap-8 mb-2 select-none">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    pb-3 font-poppins transition-all whitespace-nowrap border-b-2 outline-none  font-semibold text-base leading-6 tracking-normal text-center
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

            {/* TAB 1: Salary/ Pension */}
            {activeTab === 'salary' && (
              <div className="flex flex-col gap-6">
                {/* Section B1 */}
                <MainSection title="(B1) Schedule S- Salary / Pension">

                  {/* Subsection 1: Salary */}
                  <Subsection title="Salary">
                    <FormRow label="a) Salary as per section 17(1) *">
                      <ManualInput
                        name="salary17_1"
                        value={formik.values.salary17_1}
                        onChange={(e) => formik.setFieldValue('salary17_1', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder=""
                      />
                    </FormRow>
                    <FormRow label="b) Value of perquisites as per section 17(2) *">
                      <ManualInput
                        name="salary17_2"
                        value={formik.values.salary17_2}
                        onChange={(e) => formik.setFieldValue('salary17_2', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder=""
                      />
                    </FormRow>
                    <FormRow label="c) Profits in lieu of salary u/s per Section 17(3) *">
                      <ManualInput
                        name="salary17_3"
                        value={formik.values.salary17_3}
                        onChange={(e) => formik.setFieldValue('salary17_3', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder=""
                      />
                    </FormRow>
                    <FormRow label="i) Gross Salary ((a) + (b) + (c)) *">
                      <ManualInput
                        value={grossSalary > 0 ? `₹ ${grossSalary.toLocaleString('en-IN')}` : ''}
                        placeholder=""
                      />
                    </FormRow>
                  </Subsection>

                  {/* Subsection 2: Retirement benefit */}
                  <Subsection title="Income from retirement benefit u/s (notified country u/s 89A)">
                    <FormRow label="United States of America">
                      <ManualInput
                        name="retirementUSA"
                        value={formik.values.retirementUSA}
                        onChange={(e) => formik.setFieldValue('retirementUSA', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder=""
                      />
                    </FormRow>
                    <FormRow label="United Kingdom of Great Britain and Northern Ireland">
                      <ManualInput
                        name="retirementUK"
                        value={formik.values.retirementUK}
                        onChange={(e) => formik.setFieldValue('retirementUK', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder=""
                      />
                    </FormRow>
                    <FormRow label="Canada">
                      <ManualInput
                        name="retirementCanada"
                        value={formik.values.retirementCanada}
                        onChange={(e) => formik.setFieldValue('retirementCanada', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder=""
                      />
                    </FormRow>
                    <FormRow label="Income from retirement benefit account maintained in country other than notified country u/s 89A">
                      <ManualInput
                        name="retirementOther"
                        value={formik.values.retirementOther}
                        onChange={(e) => formik.setFieldValue('retirementOther', e.target.value.replace(/[^0-9]/g, ''))}
                        placeholder=""
                      />
                    </FormRow>
                  </Subsection>

                  {/* Subsection 3: Exempt Allowances */}
                  <div className=" leading-relaxed text-black font-poppins font-medium text-base leading-6 tracking-normal">
                    ii) Less : Allowances to the extent exempt u/s 10 (Ensure that it is included in salary income u/s 17(1)/17(2)/17(3) )
                  </div>

                  <div className="flex flex-col gap-4">
                    {formik.values.exemptAllowances.map((item, index) => (
                      <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-2 border-b border-[#F5F5F7] last:border-0 gap-4">
                        <span className="max-w-[600px] leading-relaxed text-black font-poppins font-medium text-base leading-6 tracking-normal">
                          Exempt Allowances u/s 10
                        </span>
                        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                          <div className="relative border border-[#C4C4C4] rounded-[8px] h-[48px] px-3 flex items-center bg-white w-[180px] transition-colors focus-within:border-[#3867D6]">
                            <label className="absolute left-3 -top-2 bg-white px-1 font-poppins font-normal text-[10px] text-[#8E8E93] leading-none select-none">
                              Nature
                            </label>
                            <select
                              name={`exemptAllowances[${index}].nature`}
                              value={item.nature}
                              onChange={formik.handleChange}
                              className="w-full bg-transparent outline-none font-poppins text-[13px] text-[#1E1E1E] cursor-pointer appearance-none pr-6"
                            >
                              {commonNatureOptions.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                              ))}
                            </select>
                            <div className="pointer-events-none absolute right-3 text-[#8E8E93]">
                              <MdKeyboardArrowDown size={20} />
                            </div>
                          </div>

                          <div className="relative border border-[#C4C4C4] rounded-[8px] h-[48px] px-3 flex items-center bg-white w-[130px] transition-colors focus-within:border-[#3867D6]">
                            <label className="absolute left-3 -top-2 bg-white px-1 font-poppins font-normal text-[10px] text-[#8E8E93] leading-none select-none">
                              Amount ₹
                            </label>
                            <input
                              type="text"
                              name={`exemptAllowances[${index}].amount`}
                              value={item.amount}
                              onChange={(e) => formik.setFieldValue(`exemptAllowances[${index}].amount`, e.target.value.replace(/[^0-9]/g, ''))}
                              className="w-full bg-transparent outline-none font-poppins text-[13px] text-[#1E1E1E]"
                              placeholder=""
                            />
                          </div>

                          <button
                            type="button"
                            onClick={() => handleDeleteAllowanceRow(item.id)}
                            className="text-red-500 hover:text-red-700 p-2"
                            title="Delete Row"
                          >
                            <MdDelete size={20} />
                          </button>
                        </div>
                      </div>
                    ))}

                    <div className="flex justify-end pr-8">
                      <Button
                        variant="brand"
                        type="button"
                        onClick={handleAddAllowanceRow}
                        className="rounded-[4px] border border-[#3867D6]  px-4 py-1.5 font-poppins font-normal text-[13px] transition-colors outline-none"
                      >
                        Add
                      </Button>
                    </div>
                  </div>

                  {/* House Rent Exemption row */}
                  <FormRow label="Sec 10(13A)- Allowance to meet expenditure incurred on house rent">
                    <ManualInput
                      name="sec10_13A"
                      value={formik.values.sec10_13A !== '' ? formik.values.sec10_13A : (hraEligibleExempt > 0 ? hraEligibleExempt.toString() : '')}
                      onChange={(e) => formik.setFieldValue('sec10_13A', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder=""
                    />
                  </FormRow>

                  {/* Net Salary row */}
                  <FormRow label="iii) Net Salary ( i - ii )">
                    <ManualInput
                      value={netSalary > 0 ? `₹ ${netSalary.toLocaleString('en-IN')}` : ''}
                      placeholder=""
                    />
                  </FormRow>

                  {/* Section 16 Deductions header */}
                  <div className="leading-relaxed text-black font-poppins font-medium text-base leading-6 tracking-normal">
                    iv) Deductions u/s 16 (iva + ivb + ivc)
                  </div>

                  {/* Section 16 fields */}
                  <FormRow label="a) Standard Deduction u/s 16(ia) *" indent>
                    <ManualInput
                      name="deductionStandard"
                      value={formik.values.deductionStandard}
                      onChange={(e) => formik.setFieldValue('deductionStandard', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder=""
                    />
                  </FormRow>
                  <FormRow label="b) Entertainment Allowance u/s 10(ii) *" indent>
                    <ManualInput
                      name="deductionEntertainment"
                      value={formik.values.deductionEntertainment}
                      onChange={(e) => formik.setFieldValue('deductionEntertainment', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder=""
                    />
                  </FormRow>
                  <FormRow label="c) Professional Tax u/s 16(iii) *" indent>
                    <ManualInput
                      name="deductionProfessional"
                      value={formik.values.deductionProfessional}
                      onChange={(e) => formik.setFieldValue('deductionProfessional', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder=""
                    />
                  </FormRow>

                  {/* Income chargeable head Salaries row */}
                  <FormRow label="v) Income chargeable under the Head &quot;Salaries&quot; (iii-iv)">
                    <ManualInput
                      value={chargeableSalary > 0 ? `₹ ${chargeableSalary.toLocaleString('en-IN')}` : ''}
                      placeholder=""
                    />
                  </FormRow>
                </MainSection>

                {/* Section HRA Computation */}
                <MainSection title="Schedule 10(13A) — HRA Computation">
                  <FormRow label="Place of Residence *">
                    <ManualSelect
                      name="hraPlaceResidence"
                      value={formik.values.hraPlaceResidence}
                      onChange={formik.handleChange}
                      label="Select"
                    >
                      <option value="Metro">Metro (Delhi, Mumbai, Kolkata, Chennai)</option>
                      <option value="Non-Metro">Non-Metro (Other cities)</option>
                    </ManualSelect>
                  </FormRow>
                  <FormRow label="Actual HRA received (A) *">
                    <ManualInput
                      name="hraReceived"
                      value={formik.values.hraReceived}
                      onChange={(e) => formik.setFieldValue('hraReceived', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder=""
                    />
                  </FormRow>
                  <FormRow label="Actual rent paid *">
                    <ManualInput
                      name="hraRentPaid"
                      value={formik.values.hraRentPaid}
                      onChange={(e) => formik.setFieldValue('hraRentPaid', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder=""
                    />
                  </FormRow>
                  <FormRow label="Basic Salary (for 17(1) details) *">
                    <ManualInput
                      name="hraBasic"
                      value={formik.values.hraBasic}
                      onChange={(e) => formik.setFieldValue('hraBasic', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder=""
                    />
                  </FormRow>
                  <FormRow label="Dearness Allowance">
                    <ManualInput
                      name="hraDA"
                      value={formik.values.hraDA}
                      onChange={(e) => formik.setFieldValue('hraDA', e.target.value.replace(/[^0-9]/g, ''))}
                      placeholder=""
                    />
                  </FormRow>

                  <FormRow label="Actual rent paid - 10% of salary (B)">
                    <ManualInput
                      value={hraRentMinus10Pct > 0 ? `₹ ${hraRentMinus10Pct.toLocaleString('en-IN')}` : ''}
                      placeholder=""
                    />
                  </FormRow>
                  <FormRow label="50%/40% of salary (C)">
                    <ManualInput
                      value={hraPercentSalary > 0 ? `₹ ${hraPercentSalary.toLocaleString('en-IN')}` : ''}
                      placeholder=""
                    />
                  </FormRow>
                  <FormRow label="Eligible Exempt Allowance u/s 10(13A)">
                    <ManualInput
                      value={hraEligibleExempt > 0 ? `₹ ${hraEligibleExempt.toLocaleString('en-IN')}` : ''}
                      placeholder=""
                    />
                  </FormRow>
                </MainSection>
              </div>
            )}

            {/* TAB 2: House Property */}
            {activeTab === 'house' && (
              <div className="flex flex-col gap-6">
                <MainSection title="Schedule B2 — House Property (Property 1 & 2)">

                  {/* Info note */}
                  <div className="text-[#8E8E93] font-poppins font-normal text-[16px] leading-relaxed mb-4 flex items-start gap-2">
                    <span className="text-red-500">📌</span>
                    <span>
                      Note: ITR-1 allows up to 2 house properties. Maximum loss setoff from HP is ₹2,00,000. For more properties or carry-forward, use ITR-2.
                    </span>
                  </div>

                  {/* House Property 1 subsection */}
                  <Subsection title="House Property 1">

                    {/* Address Grid */}
                    <div className="flex flex-col gap-4 mb-4">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="md:col-span-3">
                          <ManualInput
                            label="Address"
                            name="hpAddress"
                            value={formik.values.hpAddress}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                        </div>
                        <div className="md:col-span-1">
                          <ManualInput
                            label="Town/City"
                            name="hpCity"
                            value={formik.values.hpCity}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                        <ManualInput
                          label="State"
                          name="hpState"
                          value={formik.values.hpState}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                        <ManualInput
                          label="Country"
                          name="hpCountry"
                          value={formik.values.hpCountry}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                        <ManualInput
                          label="Pin Code"
                          name="hpPinCode"
                          value={formik.values.hpPinCode}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                        <ManualInput
                          label="Zip Code"
                          name="hpZipCode"
                          value={formik.values.hpZipCode}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </div>
                    </div>

                    <FormRow label="Owner of the House Property">
                      <ManualSelect
                        label="Select type"
                        name="hpOwnerType"
                        value={formik.values.hpOwnerType}
                        onChange={formik.handleChange}
                      >
                        <option value="">Select</option>
                        <option value="Self">Self</option>
                        <option value="Spouse">Spouse</option>
                        <option value="Others">Others</option>
                      </ManualSelect>
                    </FormRow>

                    <FormRow label="Is the property co-owned? (if &quot;Yes&quot;) please enter following details)">
                      <ManualSelect
                        label="Select"
                        name="hpCoOwned"
                        value={formik.values.hpCoOwned}
                        onChange={formik.handleChange}
                      >
                        <option value="No">No</option>
                        <option value="Yes">Yes</option>
                      </ManualSelect>
                    </FormRow>

                    <FormRow label="Your % of share in the Property (%)">
                      <ManualInput
                        label="Amount ₹"
                        name="hpOwnerShare"
                        value={formik.values.hpOwnerShare}
                        onChange={(e) => formik.setFieldValue('hpOwnerShare', e.target.value.replace(/[^0-9.]/g, ''))}
                      />
                    </FormRow>

                    {/* Co-owner details shown if Co-owned is Yes */}
                    {formik.values.hpCoOwned === 'Yes' && (
                      <div className="flex flex-col gap-4 pl-4 border-b border-[#F5F5F7] py-3">
                        <div className="font-poppins font-medium text-[16px] text-black">Co-owner 1</div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ManualInput
                            label="Name of the other Co-Owner(s)"
                            name="hpCoOwnerName"
                            value={formik.values.hpCoOwnerName}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="PAN of the Co-owner(s)"
                            name="hpCoOwnerPan"
                            value={formik.values.hpCoOwnerPan}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ManualInput
                            label="Adhaar No. of other Co-owner(s)"
                            name="hpCoOwnerAadhar"
                            value={formik.values.hpCoOwnerAadhar}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="Percentage share of other Co-owner(s)"
                            name="hpCoOwnerShare"
                            value={formik.values.hpCoOwnerShare}
                            onChange={(e) => formik.setFieldValue('hpCoOwnerShare', e.target.value.replace(/[^0-9.]/g, ''))}
                            fullWidth
                          />
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button
                            type="button"
                            variant='brand'

                            className="text-[13px]"
                          >
                            Add Co-owner
                          </Button>
                        </div>
                      </div>
                    )}

                    <FormRow label="Type of House Property">
                      <ManualSelect
                        label="Select type"
                        name="hpPropertyType"
                        value={formik.values.hpPropertyType}
                        onChange={formik.handleChange}
                      >
                        <option value="Self Occupied">Self Occupied</option>
                        <option value="Let Out">Let Out</option>
                        <option value="Deemed Let Out">Deemed Let Out</option>
                      </ManualSelect>
                    </FormRow>

                    {/* Tenant details if Let Out or Deemed Let Out */}
                    {(formik.values.hpPropertyType === 'Let Out' || formik.values.hpPropertyType === 'Deemed Let Out') && (
                      <div className="flex flex-col gap-4 pl-4 border-b border-[#F5F5F7] py-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ManualInput
                            label="Name(s) of the Tenant (if let out)"
                            name="hpTenantName"
                            value={formik.values.hpTenantName}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="PAN of the Tenant(s) (if available)"
                            name="hpTenantPan"
                            value={formik.values.hpTenantPan}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ManualInput
                            label="Aadhar No. of Tenant (if available)"
                            name="hpTenantAadhar"
                            value={formik.values.hpTenantAadhar}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="TAN/TIN of Tenant(s) (if TDS credit is claimed)"
                            name="hpTenantTan"
                            value={formik.values.hpTenantTan}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                        </div>
                        <div className="flex justify-end mt-2">
                          <Button
                            type="button"
                            variant="brand"
                            className="text-[13px]"
                          >
                            Add Tenant
                          </Button>
                        </div>
                      </div>
                    )}

                    {/* Income details rows */}
                    <FormRow label="a) Gross rent received/lettable value during the year*">
                      <ManualInput
                        name="hp1GrossRent"
                        value={formik.values.hp1GrossRent}
                        onChange={(e) => formik.setFieldValue('hp1GrossRent', e.target.value.replace(/[^0-9]/g, ''))}
                      />
                    </FormRow>
                    <FormRow label="b) The Amount of rent which can not be realized">
                      <ManualInput
                        name="hp1UnrealizedRent"
                        value={formik.values.hp1UnrealizedRent}
                        onChange={(e) => formik.setFieldValue('hp1UnrealizedRent', e.target.value.replace(/[^0-9]/g, ''))}
                      />
                    </FormRow>
                    <FormRow label="c) Tax Paid to local authorities">
                      <ManualInput
                        name="hp1TaxPaid"
                        value={formik.values.hp1TaxPaid}
                        onChange={(e) => formik.setFieldValue('hp1TaxPaid', e.target.value.replace(/[^0-9]/g, ''))}
                      />
                    </FormRow>
                    <FormRow label="d) Total (1b + 1c)">
                      <ManualInput
                        value={hp1TotalBPlusC > 0 ? `₹ ${hp1TotalBPlusC.toLocaleString('en-IN')}` : ''}
                      />
                    </FormRow>
                    <FormRow label="e) Annual value (1a-1d) (nil, if self-occupied etc. as per section 23(2) of the act)">
                      <ManualInput
                        value={hp1AnnualValue > 0 ? `₹ ${hp1AnnualValue.toLocaleString('en-IN')}` : ''}
                      />
                    </FormRow>
                    <FormRow label="f) Annual value of the property owned (own percentage share * 1e)">
                      <ManualInput
                        value={hp1AnnualValueShare > 0 ? `₹ ${hp1AnnualValueShare.toLocaleString('en-IN')}` : ''}
                      />
                    </FormRow>
                    <FormRow label="g) 30% of annual value (30% * 1f)">
                      <ManualInput
                        value={hp1StandardDeduction > 0 ? `₹ ${hp1StandardDeduction.toLocaleString('en-IN')}` : ''}
                      />
                    </FormRow>
                    <FormRow label="h) Interest payable on borrowed capital">
                      <ManualInput
                        name="hp1InterestPaid"
                        value={formik.values.hp1InterestPaid}
                        onChange={(e) => formik.setFieldValue('hp1InterestPaid', e.target.value.replace(/[^0-9]/g, ''))}
                      />
                    </FormRow>

                    {/* Section 24(B) Details */}
                    <div className="flex flex-col gap-4 pl-4 border-b border-[#F5F5F7] py-3 mt-4">
                      <div className="font-poppins font-semibold text-base leading-6 text-black">
                        Section 24 (B) Interest payable on borrowed capital
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ManualInput
                          label="Loan taken from"
                          name="hpLoanFrom"
                          value={formik.values.hpLoanFrom}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                        <ManualInput
                          label="Name of the Bank/Institution / person form whom loan is taken"
                          name="hpLoanBankName"
                          value={formik.values.hpLoanBankName}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ManualInput
                          label="Loan account number of the Bank/Institution"
                          name="hpLoanAccountNo"
                          value={formik.values.hpLoanAccountNo}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                        <ManualInput
                          label="Date of sanction of loan"
                          name="hpLoanSanctionDate"
                          value={formik.values.hpLoanSanctionDate}
                          onChange={formik.handleChange}
                          fullWidth
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ManualInput
                          label="Total amount of loan"
                          name="hpLoanTotalAmount"
                          value={formik.values.hpLoanTotalAmount}
                          onChange={(e) => formik.setFieldValue('hpLoanTotalAmount', e.target.value.replace(/[^0-9]/g, ''))}
                          fullWidth
                        />
                        <ManualInput
                          label="Loan outstanding on last date of financial year"
                          name="hpLoanOutstanding"
                          value={formik.values.hpLoanOutstanding}
                          onChange={(e) => formik.setFieldValue('hpLoanOutstanding', e.target.value.replace(/[^0-9]/g, ''))}
                          fullWidth
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <ManualInput
                          label="Interest on borrowed capital u/s 24(b)"
                          name="hpInterestBorrowedCapital"
                          value={formik.values.hpInterestBorrowedCapital}
                          onChange={(e) => {
                            const val = e.target.value.replace(/[^0-9]/g, '');
                            formik.setFieldValue('hpInterestBorrowedCapital', val);
                            formik.setFieldValue('hp1InterestPaid', val); // sync
                          }}
                          fullWidth
                        />
                      </div>
                    </div>

                    {!showProperty2 && (
                      <div className="flex justify-end mt-4">
                        <Button
                          variant="brand"
                          type="button"
                          className="text-[13px]"
                          onClick={() => setShowProperty2(true)}
                        >
                          Add House Property 2
                        </Button>
                      </div>
                    )}
                  </Subsection>

                  {/* House Property 2 subsection (Conditional) */}
                  {showProperty2 && (
                    <Subsection title="House Property 2">
                      <div className="flex flex-col gap-4 mb-4">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                          <div className="md:col-span-3">
                            <ManualInput
                              label="Address"
                              name="hp2Address"
                              value={formik.values.hp2Address}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                          </div>
                          <div className="md:col-span-1">
                            <ManualInput
                              label="Town/City"
                              name="hp2City"
                              value={formik.values.hp2City}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                          <ManualInput
                            label="State"
                            name="hp2State"
                            value={formik.values.hp2State}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="Country"
                            name="hp2Country"
                            value={formik.values.hp2Country}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="Pin Code"
                            name="hp2PinCode"
                            value={formik.values.hp2PinCode}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="Zip Code"
                            name="hp2ZipCode"
                            value={formik.values.hp2ZipCode}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                        </div>
                      </div>

                      <FormRow label="Owner of the House Property">
                        <ManualSelect
                          label="Select type"
                          name="hp2OwnerType"
                          value={formik.values.hp2OwnerType}
                          onChange={formik.handleChange}
                        >
                          <option value="">Select</option>
                          <option value="Self">Self</option>
                          <option value="Spouse">Spouse</option>
                          <option value="Others">Others</option>
                        </ManualSelect>
                      </FormRow>

                      <FormRow label="Is the property co-owned? (if &quot;Yes&quot;) please enter following details)">
                        <ManualSelect
                          label="Select"
                          name="hp2CoOwned"
                          value={formik.values.hp2CoOwned}
                          onChange={formik.handleChange}
                        >
                          <option value="No">No</option>
                          <option value="Yes">Yes</option>
                        </ManualSelect>
                      </FormRow>

                      <FormRow label="Your % of share in the Property (%)">
                        <ManualInput
                          label="Amount ₹"
                          name="hp2OwnerShare"
                          value={formik.values.hp2OwnerShare}
                          onChange={(e) => formik.setFieldValue('hp2OwnerShare', e.target.value.replace(/[^0-9.]/g, ''))}
                        />
                      </FormRow>

                      {formik.values.hp2CoOwned === 'Yes' && (
                        <div className="flex flex-col gap-4 pl-4 border-b border-[#F5F5F7] py-3">
                          <div className="font-poppins font-medium text-[13px] text-black">Co-owner 1</div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ManualInput
                              label="Name of the other Co-Owner(s)"
                              name="hp2CoOwnerName"
                              value={formik.values.hp2CoOwnerName}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                            <ManualInput
                              label="PAN of the Co-owner(s)"
                              name="hp2CoOwnerPan"
                              value={formik.values.hp2CoOwnerPan}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ManualInput
                              label="Adhaar No. of other Co-owner(s)"
                              name="hp2CoOwnerAadhar"
                              value={formik.values.hp2CoOwnerAadhar}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                            <ManualInput
                              label="Percentage share of other Co-owner(s)"
                              name="hp2CoOwnerShare"
                              value={formik.values.hp2CoOwnerShare}
                              onChange={(e) => formik.setFieldValue('hp2CoOwnerShare', e.target.value.replace(/[^0-9.]/g, ''))}
                              fullWidth
                            />
                          </div>
                          <div className="flex justify-end mt-2">
                            <button
                              type="button"
                              className="border border-[#3867D6] text-[#3867D6] bg-white hover:bg-blue-50 transition-colors font-poppins font-semibold text-[13px] px-4 py-2 rounded-[4px]"
                            >
                              Add Co-owner
                            </button>
                          </div>
                        </div>
                      )}

                      <FormRow label="Type of House Property">
                        <ManualSelect
                          label="Select type"
                          name="hp2PropertyType"
                          value={formik.values.hp2PropertyType}
                          onChange={formik.handleChange}
                        >
                          <option value="Self Occupied">Self Occupied</option>
                          <option value="Let Out">Let Out</option>
                          <option value="Deemed Let Out">Deemed Let Out</option>
                        </ManualSelect>
                      </FormRow>

                      {(formik.values.hp2PropertyType === 'Let Out' || formik.values.hp2PropertyType === 'Deemed Let Out') && (
                        <div className="flex flex-col gap-4 pl-4 border-b border-[#F5F5F7] py-3">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ManualInput
                              label="Name(s) of the Tenant (if let out)"
                              name="hp2TenantName"
                              value={formik.values.hp2TenantName}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                            <ManualInput
                              label="PAN of the Tenant(s) (if available)"
                              name="hp2TenantPan"
                              value={formik.values.hp2TenantPan}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <ManualInput
                              label="Aadhar No. of Tenant (if available)"
                              name="hp2TenantAadhar"
                              value={formik.values.hp2TenantAadhar}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                            <ManualInput
                              label="TAN/TIN of Tenant(s) (if TDS credit is claimed)"
                              name="hp2TenantTan"
                              value={formik.values.hp2TenantTan}
                              onChange={formik.handleChange}
                              fullWidth
                            />
                          </div>
                          <div className="flex justify-end mt-2">
                            <button
                              type="button"
                              className="border border-[#3867D6] text-[#3867D6] bg-white hover:bg-blue-50 transition-colors font-poppins font-semibold text-[13px] px-4 py-2 rounded-[4px]"
                            >
                              Add Tenant
                            </button>
                          </div>
                        </div>
                      )}

                      <FormRow label="a) Gross rent received/lettable value during the year*">
                        <ManualInput
                          name="hp2GrossRent"
                          value={formik.values.hp2GrossRent}
                          onChange={(e) => formik.setFieldValue('hp2GrossRent', e.target.value.replace(/[^0-9]/g, ''))}
                        />
                      </FormRow>
                      <FormRow label="b) The Amount of rent which can not be realized">
                        <ManualInput
                          name="hp2UnrealizedRent"
                          value={formik.values.hp2UnrealizedRent}
                          onChange={(e) => formik.setFieldValue('hp2UnrealizedRent', e.target.value.replace(/[^0-9]/g, ''))}
                        />
                      </FormRow>
                      <FormRow label="c) Tax Paid to local authorities">
                        <ManualInput
                          name="hp2TaxPaid"
                          value={formik.values.hp2TaxPaid}
                          onChange={(e) => formik.setFieldValue('hp2TaxPaid', e.target.value.replace(/[^0-9]/g, ''))}
                        />
                      </FormRow>
                      <FormRow label="d) Total (1b + 1c)">
                        <ManualInput
                          value={hp2TotalBPlusC > 0 ? `₹ ${hp2TotalBPlusC.toLocaleString('en-IN')}` : ''}
                        />
                      </FormRow>
                      <FormRow label="e) Annual value (1a-1d) (nil, if self-occupied etc. as per section 23(2) of the act)">
                        <ManualInput
                          value={hp2AnnualValue > 0 ? `₹ ${hp2AnnualValue.toLocaleString('en-IN')}` : ''}
                        />
                      </FormRow>
                      <FormRow label="f) Annual value of the property owned (own percentage share * 1e)">
                        <ManualInput
                          value={hp2AnnualValueShare > 0 ? `₹ ${hp2AnnualValueShare.toLocaleString('en-IN')}` : ''}
                        />
                      </FormRow>
                      <FormRow label="g) 30% of annual value (30% * 1f)">
                        <ManualInput
                          value={hp2StandardDeduction > 0 ? `₹ ${hp2StandardDeduction.toLocaleString('en-IN')}` : ''}
                        />
                      </FormRow>
                      <FormRow label="h) Interest payable on borrowed capital">
                        <ManualInput
                          name="hp2InterestPaid"
                          value={formik.values.hp2InterestPaid}
                          onChange={(e) => formik.setFieldValue('hp2InterestPaid', e.target.value.replace(/[^0-9]/g, ''))}
                        />
                      </FormRow>

                      <div className="flex flex-col gap-4 pl-4 border-b border-[#F5F5F7] py-3 mt-4">
                        <div className="font-poppins font-semibold text-base leading-6 text-black">
                          Section 24 (B) Interest payable on borrowed capital
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ManualInput
                            label="Loan taken from"
                            name="hp2LoanFrom"
                            value={formik.values.hp2LoanFrom}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="Name of the Bank/Institution / person form whom loan is taken"
                            name="hp2LoanBankName"
                            value={formik.values.hp2LoanBankName}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ManualInput
                            label="Loan account number of the Bank/Institution"
                            name="hp2LoanAccountNo"
                            value={formik.values.hp2LoanAccountNo}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                          <ManualInput
                            label="Date of sanction of loan"
                            name="hp2LoanSanctionDate"
                            value={formik.values.hp2LoanSanctionDate}
                            onChange={formik.handleChange}
                            fullWidth
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ManualInput
                            label="Total amount of loan"
                            name="hp2LoanTotalAmount"
                            value={formik.values.hp2LoanTotalAmount}
                            onChange={(e) => formik.setFieldValue('hp2LoanTotalAmount', e.target.value.replace(/[^0-9]/g, ''))}
                            fullWidth
                          />
                          <ManualInput
                            label="Loan outstanding on last date of financial year"
                            name="hp2LoanOutstanding"
                            value={formik.values.hp2LoanOutstanding}
                            onChange={(e) => formik.setFieldValue('hp2LoanOutstanding', e.target.value.replace(/[^0-9]/g, ''))}
                            fullWidth
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <ManualInput
                            label="Interest on borrowed capital u/s 24(b)"
                            name="hp2InterestBorrowedCapital"
                            value={formik.values.hp2InterestBorrowedCapital}
                            onChange={(e) => {
                              const val = e.target.value.replace(/[^0-9]/g, '');
                              formik.setFieldValue('hp2InterestBorrowedCapital', val);
                              formik.setFieldValue('hp2InterestPaid', val); // sync
                            }}
                            fullWidth
                          />
                        </div>
                      </div>

                      <div className="flex justify-end mt-4">
                        <Button
                          variant="brand"
                          type="button"
                          className="text-[13px]"
                          onClick={() => setShowProperty2(false)}
                        >
                          Remove House Property 2
                        </Button>
                      </div>
                    </Subsection>
                  )}

                  {/* Total interest on borrowed capital u/s 24(b) */}
                  <div className="font-poppins font-semibold text-base leading-6 text-black mt-6 mb-2 border-b border-[#E5E5EA] py-2">
                    Total interest on borrowed capital u/s 24 (b)
                  </div>
                  <FormRow label="(i) Total (1g + 1h)">
                    <ManualInput
                      label="Select type"
                      value={computedI_Total > 0 ? `₹ ${computedI_Total.toLocaleString('en-IN')}` : ''}
                    />
                  </FormRow>
                  <FormRow label="(j) Arrears / Unrealized Rent Received during the year less30%">
                    <ManualInput
                      label="Select"
                      name="hpArrearsReceived"
                      value={formik.values.hpArrearsReceived}
                      onChange={(e) => formik.setFieldValue('hpArrearsReceived', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>
                  <FormRow label="(k) Income from house property 1(1f-1i+1j)">
                    <ManualInput
                      label="Select"
                      value={hp1NetIncome !== 0 ? `₹ ${hp1NetIncome.toLocaleString('en-IN')}` : ''}
                    />
                  </FormRow>
                  <FormRow label="(k) Income from house property 2(1f-1i+1j)">
                    <ManualInput
                      label="Select"
                      value={showProperty2 && hp2NetIncome !== 0 ? `₹ ${hp2NetIncome.toLocaleString('en-IN')}` : ''}
                    />
                  </FormRow>
                </MainSection>
              </div>
            )}

            {/* TAB 3: Income from other Sources */}
            {activeTab === 'other' && (
              <div className="flex flex-col gap-6">
                <MainSection title="1.4 Schedule B3 — Income from Other Sources">
                  <div className="font-poppins font-medium text-[16px] text-[#3867D6] mb-2">
                    House Property 1
                  </div>

                  <FormRow label="Nature of Income *">
                    <ManualSelect
                      label="Select type"
                      name="osNatureOfIncome"
                      value={formik.values.osNatureOfIncome}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select type</option>
                      <option value="Interest from Savings Bank">Interest from Savings Bank</option>
                      <option value="Interest from Deposits (FDs, Recurring etc.)">Interest from Deposits (FDs, Recurring etc.)</option>
                      <option value="Interest from Income Tax Refund">Interest from Income Tax Refund</option>
                      <option value="Family Pension Income">Family Pension Income</option>
                      <option value="Dividend Income">Dividend Income</option>
                      <option value="Any Other Income">Any Other Income</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Description (If Any Other)">
                    <ManualInput
                      label="Description"
                      name="osDescription"
                      value={formik.values.osDescription}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Amount *">
                    <ManualInput
                      label="Amount ₹"
                      name="osAmount"
                      value={formik.values.osAmount}
                      onChange={(e) => formik.setFieldValue('osAmount', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  {/* Dividend grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
                    <ManualInput
                      label="Dividend - Upto 15-Jun-2025"
                      name="osDividendPeriod1"
                      value={formik.values.osDividendPeriod1}
                      onChange={(e) => formik.setFieldValue('osDividendPeriod1', e.target.value.replace(/[^0-9]/g, ''))}
                      fullWidth
                    />
                    <ManualInput
                      label="Dividend - 16-Jun to 15-Sep-2025"
                      name="osDividendPeriod2"
                      value={formik.values.osDividendPeriod2}
                      onChange={(e) => formik.setFieldValue('osDividendPeriod2', e.target.value.replace(/[^0-9]/g, ''))}
                      fullWidth
                    />
                    <ManualInput
                      label="Dividend - 16-Sep to 15-Dec-2025"
                      name="osDividendPeriod3"
                      value={formik.values.osDividendPeriod3}
                      onChange={(e) => formik.setFieldValue('osDividendPeriod3', e.target.value.replace(/[^0-9]/g, ''))}
                      fullWidth
                    />
                    <ManualInput
                      label="Dividend - 16-Dec-2025 to 15-Mar-2026"
                      name="osDividendPeriod4"
                      value={formik.values.osDividendPeriod4}
                      onChange={(e) => formik.setFieldValue('osDividendPeriod4', e.target.value.replace(/[^0-9]/g, ''))}
                      fullWidth
                    />
                    <div className="md:col-span-1">
                      <ManualInput
                        label="Dividend - 16-Mar to 31-Mar-2026"
                        name="osDividendPeriod5"
                        value={formik.values.osDividendPeriod5}
                        onChange={(e) => formik.setFieldValue('osDividendPeriod5', e.target.value.replace(/[^0-9]/g, ''))}
                        fullWidth
                      />
                    </div>
                  </div>

                  <FormRow label="Income u/s 89A (notified country) – quarterly">
                    <ManualInput
                      label="Amount ₹"
                      name="osIncome89A"
                      value={formik.values.osIncome89A}
                      onChange={(e) => formik.setFieldValue('osIncome89A', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Less: Income claimed for relief u/s 89A">
                    <ManualSelect
                      label="Select type"
                      name="osRelief89A"
                      value={formik.values.osRelief89A}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select type</option>
                      <option value="No Relief Claimed">No Relief Claimed</option>
                      <option value="Relief Claimed u/s 89A">Relief Claimed u/s 89A</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Less: Income claimed for relLess: Deduction u/s 57(iia) – family pensioniet u/s 89A">
                    <ManualSelect
                      label="Select type"
                      name="osDeduction57iia"
                      value={formik.values.osDeduction57iia}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select type</option>
                      <option value="No Deduction">No Deduction</option>
                      <option value="Deduction Claimed">Deduction Claimed</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Total Income from Other Sources">
                    <ManualInput
                      label="Amount ₹"
                      value={computedOtherSourcesTotal > 0 ? `₹ ${computedOtherSourcesTotal.toLocaleString('en-IN')}` : ''}

                    />
                  </FormRow>
                </MainSection>

                <MainSection title="Schedule C3(a) — Long Term Capital Gains u/s 112A">
                  <div className="text-[#8E8E93] font-poppins font-normal text-[16px] leading-relaxed mb-4 flex items-start gap-2">
                    <span>Note: In ITR-1, only LTCG u/s 112A up to ₹1.25 lakh is reportable (exempt). No tax payable on this income.</span>
                  </div>

                  <FormRow label="Total sale consideration *">
                    <ManualInput
                      label="Amount ₹"
                      name="ltcgSaleConsideration"
                      value={formik.values.ltcgSaleConsideration}
                      onChange={(e) => formik.setFieldValue('ltcgSaleConsideration', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Total cost of acquisition *">
                    <ManualInput
                      label="Amount ₹"
                      name="ltcgCostAcquisition"
                      value={formik.values.ltcgCostAcquisition}
                      onChange={(e) => formik.setFieldValue('ltcgCostAcquisition', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Long term capital gains u/s 112A">
                    <ManualInput
                      label="Amount ₹"
                      value={computedLtcgGains > 0 ? `₹ ${computedLtcgGains.toLocaleString('en-IN')}` : ''}

                    />
                  </FormRow>
                </MainSection>
              </div>
            )}

            {/* TAB 4: Deductions */}
            {activeTab === 'deductions' && (
              <div className="flex flex-col gap-6">
                {/* 1. Main Deductions Card */}
                <MainSection title="Deductions (Chapter VI-A)">
                  <FormRow label="80C – LIC / PF / ELSS / NSC etc.">
                    <ManualSelect
                      label="Select"
                      name="ded80C_Claim"
                      value={formik.values.ded80C_Claim}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="80CCC – Pension Fund premium">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80CCC"
                      value={formik.values.ded80CCC}
                      onChange={(e) => formik.setFieldValue('ded80CCC', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80CCD(1) – NPS contribution (employee)">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80CCD1"
                      value={formik.values.ded80CCD1}
                      onChange={(e) => formik.setFieldValue('ded80CCD1', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80CCD(1B) – Additional NPS">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80CCD1B"
                      value={formik.values.ded80CCD1B}
                      onChange={(e) => formik.setFieldValue('ded80CCD1B', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80CCD(2) – Employer NPS contribution">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80CCD2"
                      value={formik.values.ded80CCD2}
                      onChange={(e) => formik.setFieldValue('ded80CCD2', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80D – Health Insurance">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80D"
                      value={formik.values.ded80D}
                      onChange={(e) => formik.setFieldValue('ded80D', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80DD – Disabled dependent">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80DD"
                      value={formik.values.ded80DD}
                      onChange={(e) => formik.setFieldValue('ded80DD', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80DDB – Medical treatment of specified disease">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80DDB"
                      value={formik.values.ded80DDB}
                      onChange={(e) => formik.setFieldValue('ded80DDB', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Name of disease for 80DDB">
                    <ManualSelect
                      label="Select"
                      name="ded80DDB_Disease"
                      value={formik.values.ded80DDB_Disease}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Neurological Diseases">Neurological Diseases</option>
                      <option value="Cancer">Cancer</option>
                      <option value="AIDS">AIDS</option>
                      <option value="Chronic Renal Failure">Chronic Renal Failure</option>
                      <option value="Hemophilia">Hemophilia</option>
                      <option value="Thalassemia">Thalassemia</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="80E – Education loan interest">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80E"
                      value={formik.values.ded80E}
                      onChange={(e) => formik.setFieldValue('ded80E', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80EE – Housing loan interest (first time)">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80EE"
                      value={formik.values.ded80EE}
                      onChange={(e) => formik.setFieldValue('ded80EE', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80EEA – Housing loan interest (affordable)">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80EEA"
                      value={formik.values.ded80EEA}
                      onChange={(e) => formik.setFieldValue('ded80EEA', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80EEB – Electric vehicle loan interest">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80EEB"
                      value={formik.values.ded80EEB}
                      onChange={(e) => formik.setFieldValue('ded80EEB', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80G – Donations">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80G"
                      value={formik.values.ded80G}
                      onChange={(e) => formik.setFieldValue('ded80G', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80GG – Rent paid (Form 10BA)">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80GG"
                      value={formik.values.ded80GG}
                      onChange={(e) => formik.setFieldValue('ded80GG', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80GGA – Scientific research donations">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80GGA"
                      value={formik.values.ded80GGA}
                      onChange={(e) => formik.setFieldValue('ded80GGA', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80GGC – Political party contribution">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80GGC"
                      value={formik.values.ded80GGC}
                      onChange={(e) => formik.setFieldValue('ded80GGC', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80QQB – Royalty income (authors)">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80QQB"
                      value={formik.values.ded80QQB}
                      onChange={(e) => formik.setFieldValue('ded80QQB', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80RRB – Royalty on patents">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80RRB"
                      value={formik.values.ded80RRB}
                      onChange={(e) => formik.setFieldValue('ded80RRB', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80TTA – Interest on savings bank a/c">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80TTA"
                      value={formik.values.ded80TTA}
                      onChange={(e) => formik.setFieldValue('ded80TTA', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80TTB – Interest on deposits (senior citizen)">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80TTB"
                      value={formik.values.ded80TTB}
                      onChange={(e) => formik.setFieldValue('ded80TTB', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80U – Person with disability">
                    <ManualInput
                      label="Amount ₹"
                      name="ded80U"
                      value={formik.values.ded80U}
                      onChange={(e) => formik.setFieldValue('ded80U', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Any Other Deductions">
                    <ManualInput
                      label="Amount ₹"
                      name="dedAnyOther"
                      value={formik.values.dedAnyOther}
                      onChange={(e) => formik.setFieldValue('dedAnyOther', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Total Deductions">
                    <ManualInput
                      label="Amount ₹"
                      value={computedDeductionsTotal > 0 ? `₹ ${computedDeductionsTotal.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
                  </FormRow>
                </MainSection>

                {/* 2. Schedule 80D Card */}
                <MainSection title="Schedule 80D — Health Insurance Premiums">
                  <FormRow label="Health Insurance – Self & Family">
                    <ManualSelect
                      label="Select"
                      name="s80d_selfFamilyClaim"
                      value={formik.values.s80d_selfFamilyClaim}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes (Claiming)</option>
                      <option value="No">No</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Health Insurance – Self & Family">
                    <ManualInput
                      label="Amount ₹"
                      name="s80d_selfFamilyAmt"
                      value={formik.values.s80d_selfFamilyAmt}
                      onChange={(e) => formik.setFieldValue('s80d_selfFamilyAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Insurer Name">
                    <ManualInput
                      label="Type"
                      name="s80d_insurerName"
                      value={formik.values.s80d_insurerName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Policy Number">
                    <ManualInput
                      label="Type"
                      name="s80d_policyNumber"
                      value={formik.values.s80d_policyNumber}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Receipt/Document Number">
                    <ManualInput
                      label="Type"
                      name="s80d_receiptNumber"
                      value={formik.values.s80d_receiptNumber}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Health Insurance Amount per policy *">
                    <ManualInput
                      label="Amount ₹"
                      name="s80d_amountPerPolicy"
                      value={formik.values.s80d_amountPerPolicy}
                      onChange={(e) => formik.setFieldValue('s80d_amountPerPolicy', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Preventive Health Checkup – Self & Family">
                    <ManualInput
                      label="Amount ₹"
                      name="s80d_prevCheckupSelfFamily"
                      value={formik.values.s80d_prevCheckupSelfFamily}
                      onChange={(e) => formik.setFieldValue('s80d_prevCheckupSelfFamily', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Medical Expenditure – Self/Family (senior)">
                    <ManualInput
                      label="Amount ₹"
                      name="s80d_medExpSelfFamily"
                      value={formik.values.s80d_medExpSelfFamily}
                      onChange={(e) => formik.setFieldValue('s80d_medExpSelfFamily', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Is parent a senior citizen?">
                    <ManualSelect
                      label="Select"
                      name="s80d_parentSenior"
                      value={formik.values.s80d_parentSenior}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Health Insurance – Parents">
                    <ManualInput
                      label="Amount ₹"
                      name="s80d_parentsAmt"
                      value={formik.values.s80d_parentsAmt}
                      onChange={(e) => formik.setFieldValue('s80d_parentsAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Preventive Health Checkup – Parents">
                    <ManualInput
                      label="Amount ₹"
                      name="s80d_prevCheckupParents"
                      value={formik.values.s80d_prevCheckupParents}
                      onChange={(e) => formik.setFieldValue('s80d_prevCheckupParents', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Medical Expenditure – Parents (senior)">
                    <ManualInput
                      label="Amount ₹"
                      name="s80d_medExpParents"
                      value={formik.values.s80d_medExpParents}
                      onChange={(e) => formik.setFieldValue('s80d_medExpParents', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Eligible Deduction Amount">
                    <ManualInput
                      label="Amount ₹"
                      value={computedS80dEligible > 0 ? `₹ ${computedS80dEligible.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
                  </FormRow>
                </MainSection>

                {/* 3. Schedule 80G Card */}
                <MainSection title="Schedule 80G — Donations (4 Categories)">
                  <FormRow label="Donation Category">
                    <ManualSelect
                      label="Select"
                      name="s80g_category"
                      value={formik.values.s80g_category}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="100% deduction without qualifying limit">100% deduction without qualifying limit</option>
                      <option value="50% deduction without qualifying limit">50% deduction without qualifying limit</option>
                      <option value="100% deduction subject to qualifying limit">100% deduction subject to qualifying limit</option>
                      <option value="50% deduction subject to qualifying limit">50% deduction subject to qualifying limit</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Name of Donee *">
                    <ManualInput
                      label="Type"
                      name="s80g_doneeName"
                      value={formik.values.s80g_doneeName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Address of Donee *">
                    <ManualInput
                      label="Type"
                      name="s80g_doneeAddress"
                      value={formik.values.s80g_doneeAddress}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="City/Town/District *">
                    <ManualInput
                      label="Type"
                      name="s80g_doneeCity"
                      value={formik.values.s80g_doneeCity}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="State Code *">
                    <ManualInput
                      label="Type"
                      name="s80g_doneeState"
                      value={formik.values.s80g_doneeState}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="PIN Code *">
                    <ManualInput
                      label="Type"
                      name="s80g_doneePin"
                      value={formik.values.s80g_doneePin}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="PAN of Donee *">
                    <ManualInput
                      label="Type"
                      name="s80g_doneePan"
                      value={formik.values.s80g_doneePan}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Donation Reference Number (ARN) – Cat D">
                    <ManualInput
                      label="Amount ₹"
                      name="s80g_arnCatD"
                      value={formik.values.s80g_arnCatD}
                      onChange={(e) => formik.setFieldValue('s80g_arnCatD', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Donation in Cash">
                    <ManualInput
                      label="Amount"
                      name="s80g_cashAmt"
                      value={formik.values.s80g_cashAmt}
                      onChange={(e) => formik.setFieldValue('s80g_cashAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Donation in Other Mode">
                    <ManualInput
                      label="Type"
                      name="s80g_otherAmt"
                      value={formik.values.s80g_otherAmt}
                      onChange={(e) => formik.setFieldValue('s80g_otherAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Transaction Reference / Cheque No.">
                    <ManualInput
                      label="Type"
                      name="s80g_chequeNo"
                      value={formik.values.s80g_chequeNo}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="IFSC Code of Bank">
                    <ManualInput
                      label="Type"
                      name="s80g_ifsc"
                      value={formik.values.s80g_ifsc}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Total Donation">
                    <ManualInput
                      label="Amount ₹"
                      value={computedS80gTotal > 0 ? `₹ ${computedS80gTotal.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
                  </FormRow>

                  <FormRow label="Eligible Amount of Donation">
                    <ManualInput
                      label="Amount ₹"
                      value={computedS80gEligible > 0 ? `₹ ${computedS80gEligible.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
                  </FormRow>
                </MainSection>

                {/* 4. Schedule 80GGA Card */}
                <MainSection title="Schedule 80GGA — Scientific Research / Rural Development Donations">
                  <FormRow label="Relevant Clause">
                    <ManualSelect
                      label="Select"
                      name="s80gga_clause"
                      value={formik.values.s80gga_clause}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="35(1)(ii)">35(1)(ii) - Scientific research association/university</option>
                      <option value="35(1)(iii)">35(1)(iii) - Research in social science/statistical research</option>
                      <option value="35CCA">35CCA - Rural development program</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Name of Donee *">
                    <ManualInput
                      label="Type"
                      name="s80gga_doneeName"
                      value={formik.values.s80gga_doneeName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Address of Donee *">
                    <ManualInput
                      label="Type"
                      name="s80gga_doneeAddress"
                      value={formik.values.s80gga_doneeAddress}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="City/Town/District *">
                    <ManualInput
                      label="Type"
                      name="s80gga_doneeCity"
                      value={formik.values.s80gga_doneeCity}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="State Code *">
                    <ManualInput
                      label="Type"
                      name="s80gga_doneeState"
                      value={formik.values.s80gga_doneeState}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="PIN Code *">
                    <ManualInput
                      label="Type"
                      name="s80gga_doneePin"
                      value={formik.values.s80gga_doneePin}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="PAN of Donee *">
                    <ManualInput
                      label="Type"
                      name="s80gga_doneePan"
                      value={formik.values.s80gga_doneePan}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Date of Cash Donation">
                    <ManualInput
                      label="Type"
                      name="s80gga_cashDate"
                      value={formik.values.s80gga_cashDate}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Donation in Cash">
                    <ManualInput
                      label="Amount ₹"
                      name="s80gga_cashAmt"
                      value={formik.values.s80gga_cashAmt}
                      onChange={(e) => formik.setFieldValue('s80gga_cashAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Donation in Other Mode">
                    <ManualInput
                      label="Amount ₹"
                      name="s80gga_otherAmt"
                      value={formik.values.s80gga_otherAmt}
                      onChange={(e) => formik.setFieldValue('s80gga_otherAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Total Donation">
                    <ManualInput
                      label="Amount ₹"
                      value={computedS80ggaTotal > 0 ? `₹ ${computedS80ggaTotal.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
                  </FormRow>

                  <FormRow label="Eligible Amount">
                    <ManualInput
                      label="Amount ₹"
                      value={computedS80ggaEligible > 0 ? `₹ ${computedS80ggaEligible.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
                  </FormRow>
                </MainSection>

                {/* 5. Schedule 80GGC Card */}
                <MainSection title="Schedule 80GGC — Political Party Contributions">
                  <FormRow label="Date of Contribution *">
                    <ManualSelect
                      label="Select"
                      name="s80ggc_dateSelect"
                      value={formik.values.s80ggc_dateSelect}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="FY 2025-26">FY 2025-26</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Contribution in Cash">
                    <ManualInput
                      label="Amount ₹"
                      name="s80ggc_cashAmt"
                      value={formik.values.s80ggc_cashAmt}
                      onChange={(e) => formik.setFieldValue('s80ggc_cashAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Contribution in Other Mode *">
                    <ManualInput
                      label="Type"
                      name="s80ggc_otherAmt"
                      value={formik.values.s80ggc_otherAmt}
                      onChange={(e) => formik.setFieldValue('s80ggc_otherAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Total Contribution">
                    <ManualInput
                      label="Amount ₹"
                      value={computedS80ggcTotal > 0 ? `₹ ${computedS80ggcTotal.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
                  </FormRow>

                  <FormRow label="Eligible Amount">
                    <ManualInput
                      label="Amount ₹"
                      value={computedS80ggcEligible > 0 ? `₹ ${computedS80ggcEligible.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
                  </FormRow>

                  <FormRow label="Name of Political Party *">
                    <ManualInput
                      label="Type"
                      name="s80ggc_partyName"
                      value={formik.values.s80ggc_partyName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="PAN of Political Party">
                    <ManualInput
                      label="Type"
                      name="s80ggc_partyPan"
                      value={formik.values.s80ggc_partyPan}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Transaction Ref / Cheque No.">
                    <ManualInput
                      label="Type"
                      name="s80ggc_chequeNo"
                      value={formik.values.s80ggc_chequeNo}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="IFSC Code">
                    <ManualInput
                      label="Type"
                      name="s80ggc_ifsc"
                      value={formik.values.s80ggc_ifsc}
                      onChange={formik.handleChange}
                    />
                  </FormRow>
                </MainSection>

                {/* 6. Schedule 80C Card */}
                <MainSection title="Schedule 80C — Life Insurance, PF, ELSS etc.">
                  <FormRow label="Nature of Payment *">
                    <ManualSelect
                      label="Select"
                      name="s80c_naturePayment"
                      value={formik.values.s80c_naturePayment}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Life Insurance Premium">Life Insurance Premium</option>
                      <option value="Public Provident Fund (PPF)">Public Provident Fund (PPF)</option>
                      <option value="Employee Provident Fund (EPF)">Employee Provident Fund (EPF)</option>
                      <option value="Equity Linked Savings Scheme (ELSS)">Equity Linked Savings Scheme (ELSS)</option>
                      <option value="National Savings Certificate (NSC)">National Savings Certificate (NSC)</option>
                      <option value="Tax Saving Fixed Deposit">Tax Saving Fixed Deposit</option>
                      <option value="Housing Loan Principal Repayment">Housing Loan Principal Repayment</option>
                      <option value="Tuition Fees (up to 2 children)">Tuition Fees (up to 2 children)</option>
                      <option value="Sukanya Samriddhi Account">Sukanya Samriddhi Account</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Amount Eligible for 80C *">
                    <ManualSelect
                      label="Amount ₹"
                      name="s80c_eligibleAmt"
                      value={formik.values.s80c_eligibleAmt}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="150000">₹ 1,50,000</option>
                      <option value="125000">₹ 1,25,000</option>
                      <option value="100000">₹ 1,00,000</option>
                      <option value="75000">₹ 75,000</option>
                      <option value="50000">₹ 50,000</option>
                      <option value="25000">₹ 25,000</option>
                      <option value="10000">₹ 10,000</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Policy/Document ID Number">
                    <ManualInput
                      label="Type"
                      name="s80c_policyId"
                      value={formik.values.s80c_policyId}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Total 80C">
                    <ManualInput
                      label="Type"
                      name="s80c_total80C"
                      value={formik.values.s80c_total80C}
                      onChange={(e) => formik.setFieldValue('s80c_total80C', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <div className="border-t border-[#E5E5EA] my-4 pt-4 text-center text-[#3867D6] font-medium font-poppins text-[15px]">
                    --- 80CCC: Pension Fund ---
                  </div>

                  <FormRow label="Name of Insurer">
                    <ManualInput
                      label="Type"
                      name="s80ccc_insurerName"
                      value={formik.values.s80ccc_insurerName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Policy Document Number">
                    <ManualInput
                      label="Type"
                      name="s80ccc_policyNo"
                      value={formik.values.s80ccc_policyNo}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Deduction u/s 80CCC *">
                    <ManualInput
                      label="Amount ₹"
                      name="s80ccc_deductionAmt"
                      value={formik.values.s80ccc_deductionAmt}
                      onChange={(e) => formik.setFieldValue('s80ccc_deductionAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>
                </MainSection>

                {/* 7. Sections 80E / 80EE / 80EEA / 80EEB Card */}
                <MainSection title="Sections 80E / 80EE / 80EEA / 80EEB — Loan Interest Deductions">
                  <div className="text-center text-[#3867D6] font-medium font-poppins text-[15px] mb-4">
                    --- 80E: Higher Education Loan ---
                  </div>

                  <FormRow label="Loan taken from *">
                    <ManualSelect
                      label="Select"
                      name="s80e_loanTakenFrom"
                      value={formik.values.s80e_loanTakenFrom}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Financial Institution">Financial Institution</option>
                      <option value="Approved Charitable Institution">Approved Charitable Institution</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="IFSC Code">
                    <ManualSelect
                      label="Amount ₹"
                      name="s80e_ifscCode"
                      value={formik.values.s80e_ifscCode}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="SBIN0001234">SBIN0001234 (SBI)</option>
                      <option value="ICIC0005678">ICIC0005678 (ICICI)</option>
                      <option value="HDFC0009012">HDFC0009012 (HDFC)</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="PAN of Institution">
                    <ManualInput
                      label="Type"
                      name="s80e_panInstitution"
                      value={formik.values.s80e_panInstitution}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Name of Institution *">
                    <ManualInput
                      label="Type"
                      name="s80e_nameInstitution"
                      value={formik.values.s80e_nameInstitution}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Loan Account Number *">
                    <ManualInput
                      label="Type"
                      name="s80e_loanAccNo"
                      value={formik.values.s80e_loanAccNo}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Date of Sanction *">
                    <ManualInput
                      label="Type"
                      name="s80e_dateSanction"
                      value={formik.values.s80e_dateSanction}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Total Loan Amount">
                    <ManualInput
                      label="Amount ₹"
                      name="s80e_totalLoanAmt"
                      value={formik.values.s80e_totalLoanAmt}
                      onChange={(e) => formik.setFieldValue('s80e_totalLoanAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Outstanding Loan">
                    <ManualInput
                      label="Amount ₹"
                      name="s80e_outstandingLoan"
                      value={formik.values.s80e_outstandingLoan}
                      onChange={(e) => formik.setFieldValue('s80e_outstandingLoan', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Interest u/s 80E *">
                    <ManualInput
                      label="Amount ₹"
                      name="s80e_interestAmt"
                      value={formik.values.s80e_interestAmt}
                      onChange={(e) => formik.setFieldValue('s80e_interestAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <div className="border-t border-[#E5E5EA] my-4 pt-4 text-center text-[#3867D6] font-medium font-poppins text-[15px]">
                    --- 80EE: Residential House Loan ---
                  </div>

                  <FormRow label="Value of Residential House Property">
                    <ManualInput
                      label="Amount ₹"
                      name="s80ee_houseValue"
                      value={formik.values.s80ee_houseValue}
                      onChange={(e) => formik.setFieldValue('s80ee_houseValue', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80EE Interest Amount *">
                    <ManualInput
                      label="Amount ₹"
                      name="s80ee_interestAmt"
                      value={formik.values.s80ee_interestAmt}
                      onChange={(e) => formik.setFieldValue('s80ee_interestAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <div className="border-t border-[#E5E5EA] my-4 pt-4 text-center text-[#3867D6] font-medium font-poppins text-[15px]">
                    --- 80EEA: Affordable Housing Loan ---
                  </div>

                  <FormRow label="Stamp Value of Property">
                    <ManualInput
                      label="Amount ₹"
                      name="s80eea_stampValue"
                      value={formik.values.s80eea_stampValue}
                      onChange={(e) => formik.setFieldValue('s80eea_stampValue', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="80EEA Interest Amount *">
                    <ManualInput
                      label="Amount ₹"
                      name="s80eea_interestAmt"
                      value={formik.values.s80eea_interestAmt}
                      onChange={(e) => formik.setFieldValue('s80eea_interestAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Total Loan Amount">
                    <ManualInput
                      label="Amount ₹"
                      name="s80eea_totalLoanAmt"
                      value={formik.values.s80eea_totalLoanAmt}
                      onChange={(e) => formik.setFieldValue('s80eea_totalLoanAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <div className="border-t border-[#E5E5EA] my-4 pt-4 text-center text-[#3867D6] font-medium font-poppins text-[15px]">
                    --- 80EEA: Affordable Housing Loan ---
                  </div>

                  <FormRow label="Vehicle Registration Number *">
                    <ManualInput
                      label="Amount ₹"
                      name="s80eeb_vehicleRegNo"
                      value={formik.values.s80eeb_vehicleRegNo}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="80EEB Interest Amount *">
                    <ManualInput
                      label="Amount ₹"
                      name="s80eeb_interestAmt"
                      value={formik.values.s80eeb_interestAmt}
                      onChange={(e) => formik.setFieldValue('s80eeb_interestAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>
                </MainSection>

                {/* 8. Schedule 80U / 80DD Card */}
                <MainSection title="Schedule 80U / 80DD — Disability Deductions">
                  <FormRow label="Nature of Disability *">
                    <ManualSelect
                      label="Select"
                      name="s80u_natureDisability"
                      value={formik.values.s80u_natureDisability}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Self with Disability (80U)">Self with Disability (80U)</option>
                      <option value="Dependent with Disability (80DD)">Dependent with Disability (80DD)</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Type of Disability *">
                    <ManualSelect
                      label="Select"
                      name="s80u_typeDisability"
                      value={formik.values.s80u_typeDisability}
                      onChange={formik.handleChange}
                    >
                      <option value="">Select</option>
                      <option value="Disability (at least 40%)">Disability (at least 40%) - Deduction ₹75,000</option>
                      <option value="Severe Disability (80% or more)">Severe Disability (80% or more) - Deduction ₹1,25,000</option>
                    </ManualSelect>
                  </FormRow>

                  <FormRow label="Amount of Deduction">
                    <ManualInput
                      label="Amount ₹"
                      name="s80u_deductionAmt"
                      value={formik.values.s80u_deductionAmt}
                      onChange={(e) => formik.setFieldValue('s80u_deductionAmt', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Acknowledgement No. of Form 10IA *">
                    <ManualInput
                      label="Type"
                      name="s80u_ackNo10IA"
                      value={formik.values.s80u_ackNo10IA}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="UDID Number">
                    <ManualInput
                      label="Amount ₹"
                      name="s80u_udidNo"
                      value={formik.values.s80u_udidNo}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <div className="border-t border-[#E5E5EA] my-4 pt-4 text-center text-[#3867D6] font-medium font-poppins text-[15px]">
                    --- For 80DD (dependent) ---
                  </div>

                  <FormRow label="Type of Dependent *">
                    <ManualInput
                      label="Type"
                      name="s80dd_typeDependent"
                      value={formik.values.s80dd_typeDependent}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="PAN of Dependent">
                    <ManualInput
                      label="Type"
                      name="s80dd_panDependent"
                      value={formik.values.s80dd_panDependent}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Aadhaar of Dependent">
                    <ManualInput
                      label="Type"
                      name="s80dd_aadhaarDependent"
                      value={formik.values.s80dd_aadhaarDependent}
                      onChange={formik.handleChange}
                    />
                  </FormRow>
                </MainSection>

                {/* 9. Schedule 80GG Card */}
                <MainSection title="Schedule 80GG — Rent Paid (Form 10BA)">
                  <FormRow label="Name of Landlord *">
                    <ManualInput
                      label="Type"
                      name="s80gg_landlordName"
                      value={formik.values.s80gg_landlordName}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="PAN of Landlord *">
                    <ManualInput
                      label="Type"
                      name="s80gg_landlordPan"
                      value={formik.values.s80gg_landlordPan}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Address of rented property *">
                    <ManualInput
                      label="Type"
                      name="s80gg_rentedAddress"
                      value={formik.values.s80gg_rentedAddress}
                      onChange={formik.handleChange}
                    />
                  </FormRow>

                  <FormRow label="Rent paid during the year *">
                    <ManualInput
                      label="Amount ₹"
                      name="s80gg_rentPaid"
                      value={formik.values.s80gg_rentPaid}
                      onChange={(e) => formik.setFieldValue('s80gg_rentPaid', e.target.value.replace(/[^0-9]/g, ''))}
                    />
                  </FormRow>

                  <FormRow label="Eligible Deduction Amount">
                    <ManualInput
                      label="Amount ₹"
                      value={computedS80ggEligible > 0 ? `₹ ${computedS80ggEligible.toLocaleString('en-IN')}` : ''}
                      readOnly
                    />
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
