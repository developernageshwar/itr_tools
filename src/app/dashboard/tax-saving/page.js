"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  MdOutlineWorkOutline
} from 'react-icons/md';
import Stepper1 from '@/components/ui/steper1';
import SupportCard from '@/components/cards/supportCard';
import { useChatStore } from '@/store/chatStore';
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
import { taxSavingSchema } from '@/validation/itrSchema';
import { toast } from 'react-toastify';

export default function TaxSavingPage() {
  const { openChat } = useChatStore();
  const router = useRouter();
  const { 
    taxSavingsDeductions, taxesPaid, foreignAssets, otherDisclosures,
    setFields, updateStep 
  } = useItrStore();

  const targetRouteRef = React.useRef(null);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taxSavingsDeductions: taxSavingsDeductions || 0,
      taxesPaid: taxesPaid || 0,
      foreignAssets: foreignAssets || 0,
      otherDisclosures: otherDisclosures || 0,
    },
    validationSchema: taxSavingSchema,
    onSubmit: (values) => {
      setFields(values);
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
    },
  });

  const handleNext = () => {
    targetRouteRef.current = '/dashboard/tax-summary';
    formik.handleSubmit();
    if (!formik.isValid) {
      toast.error('Please fix the errors in the form');
    }
  };

  const handleStepClick = (route) => {
    targetRouteRef.current = route;
    formik.handleSubmit();
    if (!formik.isValid) {
      toast.error('Please fix the errors in the form before proceeding.');
    }
  };

  const taxSaving = [
    {
      id: 'tax-saving',
      fieldName: 'taxSavingsDeductions',
      icon: MdOutlineComment,
      title: "Tax Savings Deductions",
      description: "80C (PPF, Insurance, ELSS etc.), 80CCC, 80CCD(1) and (1B), 80CCD(2), Interest earned on Savings Bank Account",
    },
    {
      id: 'taxes-paid',
      fieldName: 'taxesPaid',
      icon: MdOutlineComment,
      title: "Taxes Paid, TDS and TCS",
      description: "TDS or TCS Payments, Payments for Advance Taxes or Tax due and others. You can Upload Form 26AS to fetch these details.",
    },
    {
      id: 'carry-forward',
      fieldName: 'foreignAssets',
      icon: MdOutlineComment,
      title: "Carry Forward Losses, AIS & Foreign Assets",
      description: "Carry Forward past losses, Upload AIS to auto-fetch income details, Disclose Foreign Assets & Income, Tax Deferred on ESOPs.",
    },
    {
      id: 'unlisted-shares',
      fieldName: 'otherDisclosures',
      icon: MdOutlineComment,
      title: "Unlisted Shares, Schedule AL & Other disclosures",
      description: "Report details of Unlisted company share holdings, Schedule AL: Assets and Liabilities, Directorship details and Other disclosures.",
    }
  ];

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[1440px] mx-auto p-10 flex flex-col gap-10 font-poppins">

        <div className="flex items-center justify-between">
          <Stepper1 currentStep={3} onStepClick={handleStepClick} />
          <div className="w-[320px] hidden lg:block" />
        </div>

        <div className="flex flex-col lg:flex-row gap-10 items-start">

          <div className="flex-1 flex flex-col gap-7">
            {taxSaving.map((source) => (
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
                  >
                    Upload form 16A
                  </Button>
                )}

                <FloatingInput
                  variant="gradient"
                  label="₹"
                  placeholder="Add Manually"
                  wrapperClassName="my-custom-wrapper"
                  inputClassName="bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent font-medium"
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
          <div className="w-full lg:w-[320px] flex flex-col gap-6 fixed right-18 top-45">
            <SupportCard
              title="Contact Support"
              description="AI and expert assistance."
              buttonText="Chat Now"
              onClick={openChat}
            />

            <Button
              variant="brand"
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
