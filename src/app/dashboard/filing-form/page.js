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



const LabelWithStar = ({ label }) => (
  <span className="font-poppins font-semibold flex  text-base leading-6 tracking-normal text-black">
    {label} <span className="text-red-500">*</span>
  </span>
);

export default function FilingFormPage() {
  const { openChat } = useChatStore();


  const accountTypeOptions = [
    { label: 'Savings Account', value: 'savings' },
    { label: 'Current Account', value: 'current' },
    { label: 'Fixed Deposit', value: 'fixed' },
    { label: 'Recurring Deposit', value: 'recurring' },
  ];

  const router = useRouter();
  const {
    firstName, middleName, lastName, dateOfBirth, fatherName,
    aadhaarNumber, panNumber, mobileNumber, email,
    flatNo, premiseName, roadStreet, areaLocality, pincode, country, state, city,
    bankAccounts,
    setFields, updateStep
  } = useItrStore();

  const formik = useFormik({
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
      updateStep(2);
      router.push('/dashboard/income-sources');
    },
  });

  const handleNext = () => {
    formik.handleSubmit();
    if (!formik.isValid) {
      toast.error('Please fix the errors in the form');
      // Scroll to first error
      const firstError = Object.keys(formik.errors)[0];
      const element = document.getElementsByName(firstError)[0];
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <ProtectedRoute>
      <FormikProvider value={formik}>
        <div className="w-full max-w-[1440px] mx-auto p-10 flex flex-col gap-10 font-poppins">

          {/* Stepper Header */}
          <div className="flex items-center justify-between">
            <Stepper1 currentStep={1} />
            <div className="w-[320px]" /> {/* Spacer for sidebar alignment */}
          </div>

          <div className="flex gap-10 items-start">

            {/* Main Form Content */}
            <div className="flex-1 flex flex-col gap-8">  

              {/* Section 1: Permanent Information */}
              <FormSection
                icon={MdOutlineInbox}
                title="Permanent Information"
                description="Please provide all information as per Government ID card (Adhaar, PAN etc)"
              >
                <div className="flex flex-col gap-8">
                  {/* Name Group */}
                  <div className="flex gap-10 items-start">
                    <div className="w-[200px] pt-4">
                      <LabelWithStar label="Permanent Information" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="grid grid-cols-3 gap-3">
                        <FloatingInput
                          label="First Name"
                          name="firstName"
                          value={formik.values.firstName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.errors.firstName}
                          touched={formik.touched.firstName}
                        />
                        <FloatingInput
                          label="Middle Name"
                          name="middleName"
                          value={formik.values.middleName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.errors.middleName}
                          touched={formik.touched.middleName}
                        />
                        <FloatingInput
                          label="Last Name"
                          name="lastName"
                          value={formik.values.lastName}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.errors.lastName}
                          touched={formik.touched.lastName}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-[#8E8E93] ml-2">
                        <MdInfoOutline size={16} />
                        <p className="text-[12px]">Name should be as per PAN; 5th character of PAN no. is the first letter of last name .</p>
                      </div>
                    </div>
                  </div>

                  {/* DOB Group */}
                  <div className="flex gap-10 items-start">
                    <div className="w-[200px] pt-4">
                      <LabelWithStar label="Date of Birth" />
                    </div>
                    <div className="flex-1 flex flex-col gap-2  ">
                      <FloatingInput
                        label="Date of Birth"
                        placeholder="DD/MM/YYYY"
                        className="max-w-full"
                        name="dateOfBirth"
                        value={formik.values.dateOfBirth}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.dateOfBirth}
                        touched={formik.touched.dateOfBirth}
                      />
                      <div className="flex items-center gap-2 text-[#8E8E93] ml-2">
                        <MdInfoOutline size={16} />
                        <p className="text-[12px]">Specify date in format like DD/MM/YYYY</p>
                      </div>
                    </div>
                  </div>

                  {/* Father's Name Group */}
                  <div className="flex gap-10 items-start">
                    <div className="w-[200px] pt-4">
                      <LabelWithStar label="Father's Name" />
                    </div>
                    <div className="flex-1">
                      <FloatingInput
                        label="Father's Name"
                        className="max-w-full"
                        name="fatherName"
                        value={formik.values.fatherName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.fatherName}
                        touched={formik.touched.fatherName}
                      />
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* Section 2: Identification & Contact Details */}
              <FormSection
                icon={MdPersonOutline}
                title="Identification & Contact Details"
                description="Please provide all information as per Government ID card (Adhaar, PAN etc)"
              >
                <div className="flex flex-col gap-8">
                  <div className="flex gap-10 items-start">
                    <div className="w-[200px] pt-4">
                      <LabelWithStar label="Adhar No." />
                    </div>
                    <div className="flex-1 flex flex-col gap-2">
                      <FloatingInput
                        label="Adhar Number"
                        placeholder="Enter 12 digit number"
                        className="max-w-full"
                        name="aadhaarNumber"
                        value={formik.values.aadhaarNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.aadhaarNumber}
                        touched={formik.touched.aadhaarNumber}
                      />
                      <div className="flex items-center gap-2 text-[#8E8E93] ml-2">
                        <MdInfoOutline size={16} />
                        <p className="text-[12px]">Don't remeber your Adhaar number? <span className="text-[#3867D6] cursor-pointer">Search it Here.</span></p>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-10 items-start">
                    <div className="w-[200px] pt-4">
                      <LabelWithStar label="PAN" />
                    </div>
                    <div className="flex-1">
                      <FloatingInput
                        label="PAN Number"
                        className="max-w-full"
                        name="panNumber"
                        value={formik.values.panNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.panNumber}
                        touched={formik.touched.panNumber}
                      />
                    </div>
                  </div>

                  <div className="flex gap-10 items-start">
                    <div className="w-[200px] pt-4">
                      <LabelWithStar label="Mobile Number" />
                    </div>
                    <div className="flex-1 flex gap-4">
                      <div className="w-[100px] h-[56px] border border-[#C7C7CC] rounded-[8px] flex items-center justify-center font-poppins text-base">+91</div>
                      <div className="flex-1">
                        <FloatingInput
                          label="Mobile Number"
                          placeholder="XXXXXXXXXX"
                          className="max-w-full"
                          name="mobileNumber"
                          value={formik.values.mobileNumber}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={formik.errors.mobileNumber}
                          touched={formik.touched.mobileNumber}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-10 items-start">
                    <div className="w-[200px] pt-4">
                      <LabelWithStar label="Email" />
                    </div>
                    <div className="flex-1">
                      <FloatingInput
                        label="Email"
                        className="max-w-full"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.email}
                        touched={formik.touched.email}
                      />
                    </div>
                  </div>
                </div>
              </FormSection>

              {/* Section 3: Your Address */}
              <FormSection
                icon={MdOutlineLocationOn}
                title="Your Address"
                description="You can provide either your current address od permanent address of residence"
              >
                <div className="grid grid-cols-1 gap-6">
                  <div className="flex gap-10 items-center">
                    <div className="w-[200px]"><LabelWithStar label="Flat/ Door No" /></div>
                    <div className="flex-1">
                      <FloatingInput
                        label="Flat/ Door No"
                        placeholder="For ex: 245, 3rd floor"
                        className="max-w-full"
                        name="flatNo"
                        value={formik.values.flatNo}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.flatNo}
                        touched={formik.touched.flatNo}
                      />
                    </div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <div className="w-[200px] font-medium text-[16px]">Premise Name</div>
                    <div className="flex-1">
                      <FloatingInput
                        label="Premise Name"
                        placeholder="For ex: Vivekanand Colony"
                        className="max-w-full"
                        name="premiseName"
                        value={formik.values.premiseName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.premiseName}
                        touched={formik.touched.premiseName}
                      />
                    </div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <div className="w-[200px] font-medium text-[16px]">Road/Street</div>
                    <div className="flex-1">
                      <FloatingInput
                        label="Road/Street"
                        placeholder="For ex: Shivaji Road"
                        className="max-w-full"
                        name="roadStreet"
                        value={formik.values.roadStreet}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.roadStreet}
                        touched={formik.touched.roadStreet}
                      />
                    </div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <div className="w-[200px]"><LabelWithStar label="Area Locality" /></div>
                    <div className="flex-1">
                      <FloatingInput
                        label="Area Locality"
                        placeholder="For ex: Jayanagar 5th Block"
                        className="max-w-full"
                        name="areaLocality"
                        value={formik.values.areaLocality}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.areaLocality}
                        touched={formik.touched.areaLocality}
                      />
                    </div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <div className="w-[200px]"><LabelWithStar label="Pincode/ ZipCode" /></div>
                    <div className="flex-1">
                      <FloatingInput
                        label="Pincode/ ZipCode"
                        placeholder="560041"
                        className="max-w-full"
                        name="pincode"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.errors.pincode}
                        touched={formik.touched.pincode}
                      />
                    </div>
                  </div>
                  <div className="flex gap-10 items-center">
                    <div className="w-[200px]"><LabelWithStar label="Country | State | City" /></div>
                    <div className="flex-1 grid grid-cols-3 gap-4">
                      <div className="h-[56px] border border-[#C7C7CC] rounded-[8px] flex items-center px-4 justify-between cursor-pointer">INDIA <MdKeyboardArrowDown size={24} /></div>
                      <div className="h-[56px] border border-[#C7C7CC] rounded-[8px] flex items-center px-4 justify-between cursor-pointer overflow-hidden">
                        <input
                          name="state"
                          placeholder="STATE"
                          className="outline-none w-full h-full uppercase"
                          value={formik.values.state}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <MdKeyboardArrowDown size={24} />
                      </div>
                      <div className="h-[56px] border border-[#C7C7CC] rounded-[8px] flex items-center px-4 justify-between cursor-pointer overflow-hidden">
                        <input
                          name="city"
                          placeholder="CITY"
                          className="outline-none w-full h-full uppercase"
                          value={formik.values.city}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        />
                        <MdKeyboardArrowDown size={24} />
                      </div>
                    </div>
                  </div>
                  {(formik.errors.state || formik.errors.city) && (formik.touched.state || formik.touched.city) && (
                    <p className="text-red-500 text-sm ml-[240px]">State and City are required</p>
                  )}
                </div>
              </FormSection>

              {/* Other Sections (Collapsed) */}
              <FormSection
                className="gap-0 p-2"
                icon={HiOutlineHome}
                title="Residential Status"
                defaultExpanded={false}
                description="The residential status depends on the number of days you stayed in India. Please follow the process to choose the correct residential status."
              />

              <FormSection
                className="gap-0 p-2"
                icon={MdOutlineAccountBalance}
                title="Bank Details"
                defaultExpanded={true}
                description="Provide bank details. In case of multiple accounts, First account will be selected as eligible for refund. Note: To receive your refund into an account it must be added and verified in the an income Tax portal."
              >
                <div className="flex flex-col gap-6 w-full">
                  <Link href="#" className="text-[#3867D6] font-medium text-sm underline ml-4 hover:opacity-80 transition-all">
                    How to find Bank account details
                  </Link>

                  <FieldArray name="bankAccounts">
                    {({ push, remove }) => (
                      <div className="flex flex-col gap-8">
                        {formik.values.bankAccounts.map((account, index) => (
                          <div key={index} className="flex items-end gap-4 w-full">
                            <div className="flex-1 grid grid-cols-4 gap-4">
                              {/* Account Number */}
                              <div className="flex flex-col gap-2">
                                <FloatingInput
                                  label="Account Number"

                                  name={`bankAccounts.${index}.accountNumber`}
                                  value={account.accountNumber}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.errors.bankAccounts?.[index]?.accountNumber}
                                  touched={formik.touched.bankAccounts?.[index]?.accountNumber}
                                />
                              </div>

                              <div className="flex flex-col gap-2">
                                <FloatingInput
                                  label="IFSC Code"

                                  name={`bankAccounts.${index}.ifscCode`}
                                  value={account.ifscCode}
                                  onChange={(e) => {
                                    formik.setFieldValue(`bankAccounts.${index}.ifscCode`, e.target.value.toUpperCase());
                                  }}
                                  onBlur={formik.handleBlur}
                                  error={formik.errors.bankAccounts?.[index]?.ifscCode}
                                  touched={formik.touched.bankAccounts?.[index]?.ifscCode}
                                />
                              </div>

                              {/* Bank Name */}
                              <div className="flex flex-col gap-2">
                                <FloatingInput
                                  label="Bank Name"

                                  name={`bankAccounts.${index}.bankName`}
                                  value={account.bankName}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.errors.bankAccounts?.[index]?.bankName}
                                  touched={formik.touched.bankAccounts?.[index]?.bankName}
                                />
                              </div>

                              {/* Account Type */}
                              <div className="flex flex-col gap-2">
                                <FloatingInput
                                  as="select"
                                  label="Account Type"

                                  name={`bankAccounts.${index}.accountType`}
                                  value={account.accountType}
                                  onChange={formik.handleChange}
                                  onBlur={formik.handleBlur}
                                  error={formik.errors.bankAccounts?.[index]?.accountType}
                                  touched={formik.touched.bankAccounts?.[index]?.accountType}
                                >
                                  <option value="SAVING">SAVING</option>
                                  <option value="CURRENT">CURRENT</option>
                                  <option value="NRE">NRE</option>
                                </FloatingInput>
                              </div>
                            </div>

                            {/* Delete Action */}
                            {formik.values.bankAccounts.length > 1 && (
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="mb-2 p-2 text-red-500 hover:bg-red-50 transition-all rounded-full"
                              >
                                <RiDeleteBinLine size={24} />
                              </button>
                            )}
                          </div>
                        ))}

                        {/* Add More Button */}
                        <div
                          type="button"
                          onClick={() => push({ accountNumber: '', ifscCode: '', bankName: '', accountType: 'SAVING' })}
                          className="flex items-center gap-2 text-[#3867D6] font-medium  ml-1 hover:opacity-80 transition-all w-fit cursor-pointer  "
                        >
                          <MdAddCircleOutline size={20} />
                          Add More Bank Accounts
                        </div>
                      </div>
                    )}
                  </FieldArray>
                </div>
              </FormSection>

              <FormSection
                className="gap-0 p-2"
                icon={HiOutlineLink}
                title="Link your PAN"
                defaultExpanded={false}
                description="PAN linking is mandatory requirement to e-file your returns."
                hideArrow={true}
                rightAction={
                  <Button variant="whiteGradient"
                    className="px-6 py-2 border rounded-lg text-[#3867D6] font-semibold"
                    onClick={() => router.push('/dashboard/pan-details')}
                  >
                    Link your PAN
                  </Button>
                }
              />

            </div>

            {/* Sidebar */}
            <div className="w-[320px] flex flex-col gap-6 fixed right-10 top-45">
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
                Go to Next
              </Button>
            </div>

          </div>

          <Footer2 />

        </div >
      </FormikProvider>
    </ProtectedRoute>
  );
}
