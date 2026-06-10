"use client";

import React, { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Stepper1 from '@/components/ui/steper1';
import Footer2 from '@/components/layout/Footer2';
import { filingTypeConfig } from '@/config/filingConfig';
import { useItrStore } from '@/store/itrStore';

// Import our step components that will house the logic
import DetailsStep from '@/components/filing-steps/DetailsStep';
import IncomeStep from '@/components/filing-steps/IncomeStep';
import FinancialsStep from '@/components/filing-steps/FinancialsStep';
import DeductionsStep from '@/components/filing-steps/DeductionsStep';
import TaxesStep from '@/components/filing-steps/TaxesStep';
import FilingStep from '@/components/filing-steps/FilingStep';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';


export default function FilingFlowPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState('');
  const state = useItrStore();
  const errorSteps = state.errorSteps || [];
  
  // E.g., 'company-private', 'huf', etc.
  const rawFilingType = params?.filingType;
  const currentStepRoute = params?.step;

  // Find the filing config
  const configEntry = Object.values(filingTypeConfig).find(
    c => c.id === rawFilingType || c.baseRoute.includes(rawFilingType)
  );

  const steps = configEntry?.steps || [];
  const subTabs = configEntry?.subTabs || {};
  const filingType = configEntry?.name || '';

  const currentStepObj = steps.find(s => s.route === currentStepRoute);
  const currentStepId = currentStepObj?.id;
  const currentSubTabs = subTabs[currentStepRoute] || [];

  // Determine active tab dynamically: if activeTab is not in currentSubTabs, default to the first one
  const isTabValid = currentSubTabs.some(t => t.id === activeTab);
  const effectiveActiveTab = isTabValid ? activeTab : (currentSubTabs[0]?.id || '');

  // Fallback if not found
  if (!configEntry) {
    return <div className="p-10 text-center">Invalid Filing Type Configuration.</div>;
  }

  if (!currentStepObj) {
    return <div className="p-10 text-center">Invalid Step.</div>;
  }

  const handleNextTab = () => {
    const currentIndex = currentSubTabs.findIndex(t => t.id === effectiveActiveTab);
    if (currentIndex < currentSubTabs.length - 1) {
      setActiveTab(currentSubTabs[currentIndex + 1].id);
    } else {
      // Go to next step
      const nextStepIndex = steps.findIndex(s => s.id === currentStepId);
      if (nextStepIndex < steps.length - 1) {
        router.push(`${configEntry.baseRoute}/${steps[nextStepIndex + 1].route}`);
      }
    }
  };

  // Render the proper step component
  const renderStepComponent = () => {
    const commonProps = {
      filingType,
      activeTab: effectiveActiveTab,
      handleNextTab,
      subTabs: currentSubTabs
    };

    if (filingType === 'Trust & Exempt Entities') {
      return (
        <DynamicFilingStep
          filingType={filingType}
          step={currentStepRoute}
          activeTab={effectiveActiveTab}
          handleNextTab={handleNextTab}
        />
      );
    }

    switch (currentStepRoute) {
      case 'details':
        return <DetailsStep {...commonProps} />;
      case 'income':
        return <IncomeStep {...commonProps} />;
      case 'financials':
        return <FinancialsStep {...commonProps} />;
      case 'deductions':
        return <DeductionsStep {...commonProps} />;
      case 'taxes':
        return <TaxesStep {...commonProps} />;
      case 'filing':
        return <FilingStep {...commonProps} />;
      default:
        return <div>Step implementation pending...</div>;
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FC]">
      {/* Top Main Navigation (Reusable Stepper) */}
      <div className="w-full flex justify-center pt-8 pb-4">
        <Stepper1 currentStep={currentStepId} customSteps={steps} errorSteps={errorSteps} />
      </div>

      {/* Sub Tabs Navigation */}
      {currentSubTabs.length > 0 && (
        <div className="w-full flex justify-center">
          <div className="flex gap-10 max-w-[1000px] w-full px-4 overflow-x-auto">
            {currentSubTabs.map((tab) => (
              <div
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  py-4 cursor-pointer font-poppins font-medium transition-all whitespace-nowrap  
                  text-base
                  ${effectiveActiveTab === tab.id
                    ? "text-brand-blue border-b-[3px] border-brand-blue"
                    : "text-light-gray hover:text-gray-600 border-b-[3px] border-transparent"
                  }
                `}
              >
                {tab.label}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Form Content Area */}
      <div className="w-full flex justify-center py-10 pb-1 px-4">
        <div className="max-w-[1000px] w-full">
          {renderStepComponent()}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-8 flex justify-center w-full">
        <div className="w-full max-w-[1000px]">
          <Footer2 />
        </div>
      </div>
    </div>
  );
}
