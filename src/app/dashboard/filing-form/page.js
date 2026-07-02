"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  MdPersonOutline,
  MdOutlineLocationOn,
  MdOutlineAccountBalance,
  MdInfoOutline,
  MdDelete,
  MdAddCircleOutline
} from 'react-icons/md';
import { HiOutlineIdentification, HiOutlineHome, HiOutlineLink } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Footer2 from '@/components/layout/Footer2';
import Stepper from '@/components/ui/Stepper';
import FormSection from '@/components/ui/FormSection';
import FloatingInput from '@/components/ui/FloatingInput';
import SupportCard from '@/components/cards/supportCard';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdOutlineInbox } from "react-icons/md";
import Stepper1 from '@/components/ui/steper1';
import { cn } from '@/utils/helpers';
import { useChatStore } from '@/store/chatStore';

import { useItrStore } from '@/store/itrStore';
import { useFormik, FieldArray, FormikProvider } from 'formik';
import { itrSchema } from '@/validation/itrSchema';
import { toast } from 'react-hot-toast';
import { RiDeleteBinLine } from "react-icons/ri";



const renderLabelWithAsterisk = (labelStr) => {
  if (typeof labelStr === 'string' && labelStr.includes('*')) {
    const parts = labelStr.split('*');
    return (
      <>
        {parts[0]}
        <span className="text-red-500 font-bold">*</span>
        {parts.slice(1).join('*')}
      </>
    );
  }
  return labelStr;
};

const MainSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="w-full border border-blue-300 rounded-[16px] bg-white overflow-hidden mb-6">
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors select-none w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-full sm:max-w-[600px] leading-relaxed text-black font-poppins font-semibold text-base break-words whitespace-normal pr-4">
          {title}
        </span>
        <MdKeyboardArrowDown
          size={24}
          className={`flex-shrink-0 text-[#3867D6] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen && (
        <div className="p-6 border-t border-[#E5E5EA] flex flex-col gap-6 bg-white animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

const FormRow = ({ label, children, indent = false }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#F5F5F7] last:border-0 gap-4 w-full ${indent ? "pl-6" : ""}`}>
      <span className="w-full sm:max-w-[600px] leading-relaxed text-black font-poppins font-medium text-base break-words whitespace-normal">
        {renderLabelWithAsterisk(label)}
      </span>
      <div className="flex-shrink-0 w-full sm:w-auto flex justify-end">
        {children}
      </div>
    </div>
  );
};

const ManualInput = ({ label = "Amount ₹", fullWidth = false, className = "", error, touched, ...props }) => {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-full sm:w-[320px]'}`}>
      <div className={`relative border border-[#C4C4C4] rounded-[4px] h-[48px] px-3 flex items-center transition-colors focus-within:border-[#3867D6] w-full ${props.readOnly || props.disabled ? 'bg-[#F2F2F7] border-[#E5E5EA]' : 'bg-white'} ${error && touched ? 'border-red-500' : ''} ${className}`}>
        {label && (
          <label className="absolute left-3 -top-2 bg-white px-1 font-poppins font-normal text-[13px] text-[#8E8E93] leading-none select-none">
            {renderLabelWithAsterisk(label)}
          </label>
        )}
        <input
          type="text"
          className="w-full bg-transparent outline-none font-poppins text-[13px] text-[#1E1E1E]"
          {...props}
        />
      </div>
      {error && touched && (
        <span className="text-red-500 font-poppins text-xs px-1">{error}</span>
      )}
    </div>
  );
};

const ManualSelect = ({ label, fullWidth = false, className = "", children, error, touched, ...props }) => {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-full sm:w-[320px]'}`}>
      <div className={`relative border border-[#C4C4C4] rounded-[4px] h-[48px] px-3 flex items-center bg-white transition-colors focus-within:border-[#3867D6] w-full ${error && touched ? 'border-red-500' : ''} ${className}`}>
        {label && (
          <label className="absolute left-3 -top-2 bg-white px-1 font-poppins font-normal text-[10px] text-[#8E8E93] leading-none select-none">
            {renderLabelWithAsterisk(label)}
          </label>
        )}
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
      {error && touched && (
        <span className="text-red-500 font-poppins text-xs px-1">{error}</span>
      )}
    </div>
  );
};

export default function FilingFormPage() {
  const { openChat } = useChatStore();
  const [activeTab, setActiveTab] = useState('general');

  const subTabs = [
    { id: 'general', label: 'General Information' },
    { id: 'aadhaar_rules', label: 'Aadhaar & Employment Rules' }
  ];

  const router = useRouter();
  const {
    firstName, middleName, lastName, dateOfBirth, fatherName,
    aadhaarNumber, panNumber, mobileNumber, email,
    flatNo, premiseName, roadStreet, areaLocality, pincode, country, state, city,
    bankAccounts,
    setFields, updateStep,
    selectedFilingType, entityType
  } = useItrStore();

  React.useEffect(() => {
    const filingType = selectedFilingType || entityType || 'Individual';
    const lowerFilingType = filingType.toLowerCase();
    router.replace(`/dashboard/${lowerFilingType}/details`);
  }, [router, selectedFilingType, entityType]);

  const targetRouteRef = React.useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName,
      middleName,
      lastName,
      dateOfBirth,
      fatherName,
      aadhaarNumber,
      panNumber,
      mobileNumber,
      email,
      flatNo,
      premiseName,
      roadStreet,
      areaLocality,
      pincode,
      country: country || 'INDIA',
      state,
      city,
      bankAccounts: bankAccounts && bankAccounts.length > 0 ? bankAccounts : [{ accountNumber: '', ifscCode: '', bankName: '', accountType: 'SAVING' }],
    },
    validationSchema: itrSchema,
    onSubmit: (values) => {
      setFields(values);
      const targetRoute = targetRouteRef.current || '/dashboard/income-sources';
      const routesToStep = {
        '/dashboard/filing-form': 1,
        '/dashboard/income-sources': 2,
        '/dashboard/tax-saving': 3,
        '/dashboard/tax-summary': 4,
      };
      updateStep(routesToStep[targetRoute] || 2);
      router.push(targetRoute);
      targetRouteRef.current = null;
    },
  });

  const handleNext = () => {
    targetRouteRef.current = '/dashboard/income-sources';
    formik.handleSubmit();
    if (!formik.isValid) {
      toast.error('Please fix the errors in the form');
      setTimeout(() => {
        const firstError = Object.keys(formik.errors)[0];
        const generalFields = ['firstName', 'middleName', 'lastName', 'dateOfBirth', 'fatherName', 'flatNo', 'premiseName', 'roadStreet', 'areaLocality', 'pincode', 'country', 'state', 'city'];
        if (generalFields.includes(firstError)) {
          setActiveTab('general');
        } else {
          setActiveTab('aadhaar_rules');
        }

        setTimeout(() => {
          const element = document.getElementsByName(firstError)[0];
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }, 0);
    }
  };

  const handleStepClick = (route) => {
    targetRouteRef.current = route;
    formik.handleSubmit();
    if (!formik.isValid) {
      toast.error('Please fix the errors in the form before proceeding.');
      setTimeout(() => {
        const firstError = Object.keys(formik.errors)[0];
        const generalFields = ['firstName', 'middleName', 'lastName', 'dateOfBirth', 'fatherName', 'flatNo', 'premiseName', 'roadStreet', 'areaLocality', 'pincode', 'country', 'state', 'city'];
        if (generalFields.includes(firstError)) {
          setActiveTab('general');
        } else {
          setActiveTab('aadhaar_rules');
        }

        setTimeout(() => {
          const element = document.getElementsByName(firstError)[0];
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }, 100);
      }, 0);
    }
  };

  return (
    <ProtectedRoute>
      <FormikProvider value={formik}>
        <div className="w-full max-w-[1440px] mx-auto p-10 flex flex-col gap-10 font-poppins">

          {/* Stepper Header */}
          <div className="flex flex-col lg:flex-row gap-10 items-start">
            {/* Spacer matching the LEFT Sidebar Area */}
            <div className="w-full lg:w-[320px] hidden lg:block flex-shrink-0" />
            {/* Stepper aligned with RIGHT Content Area */}
            <div className="flex-1 w-full flex justify-start min-w-0 overflow-x-auto scrollbar-hide">
              <Stepper1 currentStep={1} onStepClick={handleStepClick} />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* LEFT Sidebar Area */}
            <div className="w-full lg:w-[320px] flex flex-col gap-6 lg:sticky lg:top-10 flex-shrink-0">
              <SupportCard
                title="Contact Support"
                description="AI and expert assistance."
                buttonText="Chat Now"
                onClick={openChat}
              />
              <Button
                className="w-full h-[52px] bg-gradient-brand text-white rounded-xl font-semibold text-base shadow-md"
                onClick={handleNext}
              >
                Go to next
              </Button>
            </div>

            {/* RIGHT Content Area */}
            <div className="flex-1 w-full flex flex-col gap-6 min-w-0">

              {/* Tab Navigation */}
              <div className="flex gap-8 mb-4 overflow-x-auto select-none border-b border-gray-100 scrollbar-hide">
                {subTabs.map((tab) => (
                  <div
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      pb-3 cursor-pointer font-poppins font-semibold transition-all whitespace-nowrap border-b-2 text-base outline-none
                      ${activeTab === tab.id
                        ? "text-[#3867D6] border-[#3867D6]"
                        : "text-[#8E8E93] border-transparent hover:text-gray-600"
                      }
                    `}
                  >
                    {tab.label}
                  </div>
                ))}
              </div>

              {/* Form Content per Tab */}
              {activeTab === 'general' && (
                <div className="flex flex-col gap-6">
                  {/* Section 1: Permanent Information */}
                  <MainSection title="1.1 Personal Identity">
                    <FormRow label="First Name *">
                      <ManualInput
                        label="Type"
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.firstName}
                        touched={formik.touched.firstName}
                      />
                    </FormRow>
                    <FormRow label="Middle Name">
                      <ManualInput
                        label="Type"
                        name="middleName"
                        value={formik.values.middleName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.middleName}
                        touched={formik.touched.middleName}
                      />
                    </FormRow>
                    <FormRow label="Last Name *">
                      <ManualInput
                        label="Type"
                        name="lastName"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.lastName}
                        touched={formik.touched.lastName}
                      />
                    </FormRow>
                    <FormRow label="Date of Birth *">
                      <ManualInput
                        label="Type"
                        placeholder="DD/MM/YYYY"
                        name="dateOfBirth"
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.dateOfBirth}
                        touched={formik.touched.dateOfBirth}
                      />
                    </FormRow>
                    <FormRow label="Father's Name *">
                      <ManualInput
                        label="Type"
                        name="fatherName"
                        value={formik.values.fatherName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.fatherName}
                        touched={formik.touched.fatherName}
                      />
                    </FormRow>
                    <div className="flex items-center gap-2 text-[#8E8E93] ml-2">
                      <MdInfoOutline size={16} className="flex-shrink-0" />
                      <p className="text-[12px]">Name should be as per PAN; 5th character of PAN no. is the first letter of last name.</p>
                    </div>
                  </MainSection>

                  {/* Section 2: Your Address */}
                  <MainSection title="1.2 Address Details">
                    <FormRow label="Flat/ Door No *">
                      <ManualInput
                        label="Type"
                        placeholder="For ex: 245, 3rd floor"
                        name="flatNo"
                        value={formik.values.flatNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.flatNo}
                        touched={formik.touched.flatNo}
                      />
                    </FormRow>
                    <FormRow label="Premise Name">
                      <ManualInput
                        label="Type"
                        placeholder="For ex: Vivekanand Colony"
                        name="premiseName"
                        value={formik.values.premiseName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.premiseName}
                        touched={formik.touched.premiseName}
                      />
                    </FormRow>
                    <FormRow label="Road/Street">
                      <ManualInput
                        label="Type"
                        placeholder="For ex: Shivaji Road"
                        name="roadStreet"
                        value={formik.values.roadStreet}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.roadStreet}
                        touched={formik.touched.roadStreet}
                      />
                    </FormRow>
                    <FormRow label="Area Locality *">
                      <ManualInput
                        label="Type"
                        placeholder="For ex: Jayanagar 5th Block"
                        name="areaLocality"
                        value={formik.values.areaLocality}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.areaLocality}
                        touched={formik.touched.areaLocality}
                      />
                    </FormRow>
                    <FormRow label="Pincode/ ZipCode *">
                      <ManualInput
                        label="Type"
                        placeholder="560041"
                        name="pincode"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.pincode}
                        touched={formik.touched.pincode}
                      />
                    </FormRow>
                    <FormRow label="Country *">
                      <ManualInput
                        label="Type"
                        name="country"
                        value={formik.values.country}
                        disabled={true}
                        readOnly={true}
                      />
                    </FormRow>
                    <FormRow label="State *">
                      <ManualInput
                        label="Type"
                        placeholder="STATE"
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.state}
                        touched={formik.touched.state}
                      />
                    </FormRow>
                    <FormRow label="City *">
                      <ManualInput
                        label="Type"
                        placeholder="CITY"
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.city}
                        touched={formik.touched.city}
                      />
                    </FormRow>
                  </MainSection>
                </div>
              )}

              {activeTab === 'aadhaar_rules' && (
                <div className="flex flex-col gap-6">
                  {/* Section 1: Identification & Contact Details */}
                  <MainSection title="2.1 Aadhaar & Contact details">
                    <FormRow label="Aadhaar Number *">
                      <ManualInput
                        label="Type"
                        placeholder="Enter 12 digit number"
                        name="aadhaarNumber"
                        value={formik.values.aadhaarNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.aadhaarNumber}
                        touched={formik.touched.aadhaarNumber}
                      />
                    </FormRow>
                    <FormRow label="PAN Number *">
                      <ManualInput
                        label="Type"
                        name="panNumber"
                        value={formik.values.panNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.panNumber}
                        touched={formik.touched.panNumber}
                      />
                    </FormRow>
                    <FormRow label="Mobile Number *">
                      <div className="flex gap-2 w-full sm:w-[320px] justify-end items-start">
                        <div className="w-[60px] h-[48px] border border-[#C7C7CC] rounded-[4px] flex items-center justify-center font-poppins text-sm bg-[#F2F2F7] text-[#1E1E1E] flex-shrink-0">+91</div>
                        <ManualInput
                          label="Type"
                          placeholder="XXXXXXXXXX"
                          fullWidth={true}
                          name="mobileNumber"
                          value={formik.values.mobileNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.errors.mobileNumber}
                          touched={formik.touched.mobileNumber}
                        />
                      </div>
                    </FormRow>
                    <FormRow label="Email Address *">
                      <ManualInput
                        label="Type"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                      />
                    </FormRow>
                    <div className="flex items-center gap-2 text-[#8E8E93] ml-2">
                      <MdInfoOutline size={16} className="flex-shrink-0" />
                      <p className="text-[12px]">{"Don't"} remember your Aadhaar number? <span className="text-[#3867D6] cursor-pointer">Search it Here.</span></p>
                    </div>
                  </MainSection>
                </div>
              )}

            </div>

          </div>

          <Footer2 />

        </div >
      </FormikProvider>
    </ProtectedRoute>
  );
}
