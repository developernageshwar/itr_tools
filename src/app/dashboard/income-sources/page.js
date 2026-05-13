"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  MdOutlineWorkOutline,
  MdOutlineInsertDriveFile,
  MdOutlineTrendingUp,
  MdOutlineLabel,
  MdOutlineAccessTime,
  MdOutlineChatBubbleOutline
} from 'react-icons/md';
import Stepper1 from '@/components/ui/steper1';
import SupportCard from '@/components/cards/supportCard';
import Button from '@/components/ui/Button';
import Footer2 from '@/components/layout/Footer2';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import IncomeCard, { AddManually } from '@/components/cards/IncomeCard';
import FloatingInput from '@/components/ui/FloatingInput'; 
import { LuTable2 } from "react-icons/lu"; 
import { IoMdTrendingUp } from "react-icons/io"; 
import { CiBookmark } from "react-icons/ci"; 
import { MdPieChartOutlined } from "react-icons/md"; 
import { MdOutlineComment } from "react-icons/md";




import { useItrStore } from '@/store/itrStore';
import { useFormik } from 'formik';
import { itrSchema } from '@/validation/itrSchema'; 
import { incomeSourcesSchema } from '@/validation/itrSchema';
import { toast } from 'react-toastify';

export default function IncomeSourcesPage() {
  const router = useRouter();
  const { 
    salaryIncome, interestIncome, capitalGains, houseProperties,
    dividendIncome, businessIncome, cryptoIncome, otherIncome,
    setFields, updateStep 
  } = useItrStore();

  const formik = useFormik({
    initialValues: {
      salaryIncome: salaryIncome || 0,
      interestIncome: interestIncome || 0,
      capitalGains: capitalGains || 0,
      houseProperties: houseProperties || 0,
      dividendIncome: dividendIncome || 0,
      businessIncome: businessIncome || 0,
      cryptoIncome: cryptoIncome || 0,
      otherIncome: otherIncome || 0,
    },
    validationSchema: incomeSourcesSchema,
    onSubmit: (values) => {
      setFields(values);
      updateStep(3);
      router.push('/dashboard/tax-saving');
    },
  });

  const handleNext = async () => {
    const errors = await formik.validateForm();
    if (Object.keys(errors).length === 0) {
      formik.handleSubmit();
    } else {
      formik.setTouched({
        salaryIncome: true,
        interestIncome: true,
        capitalGains: true,
        houseProperties: true,
        dividendIncome: true,
        businessIncome: true,
        cryptoIncome: true,
        otherIncome: true,
      });
      toast.error('Please fix the errors in the form');
    }
  };

  const incomeSources = [
    {
      id: 'salary',
      fieldName: 'salaryIncome',
      icon: MdOutlineWorkOutline,
      title: "Salary Income",
      description: "Add details manually or Upload Form 16 to auto-fill your salary details. You can add salary income from multiple jobs as well.",
      hasUpload: true
    },
    {
      id: 'interest',
      fieldName: 'interestIncome',
      icon: LuTable2,
      title: "Interest Income",
      description: "Interest earned from Savings Bank, FDs, Post Office Deposits, P2P, Bonds etc.",
    },
    {
      id: 'gains',
      fieldName: 'capitalGains',
      icon: IoMdTrendingUp,
      title: "Gains from Stocks, Mutual Funds, FnO & Others.",
      description: "Easy auto-processing of your Gains from selling of Stocks, Mutual Funds, US Stocks, Land, Bonds, RSUs, Jewellery and more.",
    },
    {
      id: 'house',
      fieldName: 'houseProperties',
      icon: CiBookmark,
      title: "House Properties owned by you",
      description: "Add details if you earned rent from your property or paid interest on home loan",
    },
    {
      id: 'dividend',
      fieldName: 'dividendIncome',
      icon:MdPieChartOutlined , 
      title: "Dividend Income",
      description: "Dividend earned from Equities, Stocks, Mutual Funds, ULIPs, UTI etc.",
    },
    {
      id: 'professional',
      fieldName: 'businessIncome',
      icon: MdOutlineWorkOutline,
      title: "Professional, Freelancing and Business Income",
      description: "Doctors, Lawyers, Freelancers, FnO investors, Businesses, Tutors, Influencers etc.",
    },
    {
      id: 'crypto',
      fieldName: 'cryptoIncome',
      icon: MdOutlineComment,
      title: "Crypto Income (Virtual Digital Assets - VDA)",
      description: "Crypto income from Trading, Staking, Mining, Minting, Gifts, NFT or other VDA assets",
    },
    {
      id: 'exempt',
      fieldName: 'otherIncome',
      icon: MdOutlineComment,
      title: "Exempt, Online Gaming & Other Income",
      description: "Exempt Income, Invoice Discounting, Online Gaming, Puzzles, Lottery Winnings etc.",
    }
  ];

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[1440px] mx-auto p-10 flex flex-col gap-10 font-poppins">

        <div className="flex items-center justify-between">
          <Stepper1 currentStep={2} />
          <div className="w-[320px] hidden lg:block" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          <div className="flex-1 flex flex-col gap-7">
            {incomeSources.map((source) => (
              <IncomeCard
                key={source.id}
                icon={source.icon}
                title={source.title}
                description={source.description}
              >
                {source.hasUpload && (
                  <Button
                    variant="whiteGradient"
                    className="rotate-0 opacity-100 gap-2.5 rounded-lg py-2 px-4 border font-poppins font-semibold text-base leading-6 tracking-normal "
                    onClick={() => router.push('/dashboard/upload-form16')}
                  >
                    Upload form 16A
                  </Button>
                )}

                <FloatingInput
                  variant="gradient"
                  label="₹"
                  placeholder="Add Manually"
                  wrapperClassName="my-custom-wrapper"
                  inputClassName="bg-gradient-to-r from-[#1498EB] to-[#962DE3] border-[#1498EB] bg-clip-text text-transparent font-medium"
                  name={source.fieldName}
                  value={formik.values[source.fieldName]}
                  onChange={(e) => {
                    const val = e.target.value.replace(/[^0-9]/g, "");
                    formik.setFieldValue(source.fieldName, val);
                  }}
                  onBlur={formik.handleBlur}
                  error={formik.errors[source.fieldName]}
                  touched={formik.touched[source.fieldName]}
                />

              </IncomeCard>
            ))}
          </div>

          {/* Sidebar Area: Support and Navigation */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6 sticky top-10">
            <SupportCard
              title="Contact Support"
              description="AI and expert assistance."
              buttonText="Chat Now"
              buttonLink="#"
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
        </div>
        <Footer2 />
      </div>
    </ProtectedRoute>
  );
}
