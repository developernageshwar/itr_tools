"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import { useItrStore } from '@/store/itrStore';

const Stepper1 = ({ currentStep = 1, onStepClick, errorSteps = [], customSteps }) => {
  const router = useRouter();
  const filingType = useItrStore((state) => state.selectedFilingType || state.entityType || 'Individual');
  const lowerFilingType = filingType.toLowerCase();

  const steps = customSteps || [
    { id: 1, label: "Details", route: `/dashboard/${lowerFilingType}/details` },
    { id: 2, label: "Income Sources", route: `/dashboard/${lowerFilingType}/income` },
    { id: 3, label: "Deductions", route: `/dashboard/${lowerFilingType}/deductions` },
    { id: 4, label: "Taxes Paid", route: `/dashboard/${lowerFilingType}/taxes` },
    { id: 5, label: "Filing", route: `/dashboard/${lowerFilingType}/filing` },
  ];

  const handleStepClick = (route) => {
    if (onStepClick) {
      onStepClick(route);
    } else if (route) {
      router.push(route);
    }
  };

  const isTaxSummaryActive = currentStep === steps[steps.length - 1].id;

  return (
    <div className="flex items-center w-full max-w-[1000px] select-none">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <React.Fragment key={step.id}>
            <div
              onClick={() => handleStepClick(step.route)}
              // className={`     
              //   rotate-0 opacity-100 gap-[10px] rounded-[16px] py-2   
              //   font-normal text-base leading-6 tracking-normal align-middle
              //   flex items-center justify-center 
              //   px-[30px] 
              //   font-poppins 
              //   transition-all duration-300
              //   cursor-pointer hover:opacity-80 uppercase
              //   ${isActive
              //     ? "bg-gradient-brand text-white"
              //     : isCompleted
              //       ? (isTaxSummaryActive && errorSteps.includes(step.id) ? "bg-gradient-to-r from-[#1498EB]/50 to-[#962DE3]/50 text-white border border-red-500" : "bg-gradient-to-r from-[#1498EB]/50 to-[#962DE3]/50 text-white font-medium")
              //       : (isTaxSummaryActive && errorSteps.includes(step.id) ? "bg-white border border-red-500 text-[#8E8E93]" : "bg-white border border-[#8E8E93] text-[#8E8E93]")
              //   }
              // `}  


                className={`     
                rotate-0 opacity-100 gap-[10px] rounded-[16px] py-2   
                font-normal text-base leading-6 tracking-normal align-middle
                flex items-center justify-center 
                px-[30px] 
                font-poppins 
                transition-all duration-300
                cursor-pointer hover:opacity-80 uppercase
                ${isActive
                  ? "bg-gradient-brand text-white"
                  : isCompleted
                    ? (isTaxSummaryActive && errorSteps.includes(step.id) ? "bg-gradient-to-r from-[#1498EB]/50 to-[#962DE3]/50 text-white border border-red-500" : "bg-gradient-to-r from-[#1498EB]/50 to-[#962DE3]/50 text-white font-medium")
                    : (isTaxSummaryActive && errorSteps.includes(step.id) ? "bg-white border border-red-500 text-[#8E8E93]" : "bg-white border border-[#8E8E93] text-[#8E8E93]")
                }
              `} 
            >
              {step.label} 
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[1px] ${currentStep > step.id ? "bg-gradient-brand" : "bg-[#8E8E93]"
                }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper1;
