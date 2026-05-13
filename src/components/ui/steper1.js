"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

const Stepper1 = ({ currentStep = 1 }) => {
  const router = useRouter();

  const steps = [
    { id: 1, label: "Personal Info", route: "/dashboard/filing-form" },
    { id: 2, label: "Income Sources", route: "/dashboard/income-sources" },
    { id: 3, label: "Tax Saving", route: "/dashboard/tax-saving" },
    { id: 4, label: "Tax Summary", route: "/dashboard/tax-summary" },
  ];

  const handleStepClick = (route) => {
    if (route) {
      router.push(route);
    }
  };

  return (
    <div className="flex items-center w-full max-w-[1000px] select-none">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;
        
        return (
          <React.Fragment key={step.id}> 
            <div
              onClick={() => handleStepClick(step.route)}
              className={`     
                rotate-0 opacity-100 gap-[10px] rounded-[16px] py-2   
                font-normal text-base leading-6 tracking-normal align-middle
                flex items-center justify-center 
                px-[30px] 
                font-poppins 
                transition-all duration-300
                cursor-pointer hover:opacity-80
                ${isActive
                  ? "bg-gradient-brand text-white"
                  : isCompleted
                    ? "bg-gradient-to-r from-[#1498EB]/50 to-[#962DE3]/50  text-white font-medium"
                    : "bg-white border border-[#8E8E93] text-[#8E8E93]" 
                }
              `}
            >
              {step.label}
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div className={`flex-1 h-[1px] ${
                currentStep > step.id ? "bg-gradient-brand" : "bg-[#8E8E93]"
              }`} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Stepper1;
