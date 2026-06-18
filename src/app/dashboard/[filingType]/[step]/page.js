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
import TaxSummaryStep from '@/components/filing-steps/TaxSummaryStep';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';
import SupportCard from '@/components/cards/supportCard';
import { useChatStore } from '@/store/chatStore';
import Button from '@/components/ui/Button';


export default function FilingFlowPage() {
  const router = useRouter();
  const params = useParams();
  const [activeTab, setActiveTab] = useState('');
  const state = useItrStore();
  const errorSteps = state.errorSteps || [];
  const openChat = useChatStore((state) => state.openChat);

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

  const handleSidebarSaveAndNext = () => {
    if (typeof window !== 'undefined' && window.currentSaveHandler) {
      window.currentSaveHandler();
    } else {
      handleNextTab();
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
      case 'tax-summary':
        return <TaxSummaryStep {...commonProps} />;
      default:
        return <div>Step implementation pending...</div>;
    }
  };

  const isIndividualType = filingType.startsWith('Individual');

  const renderSubTabs = () => {
    if (currentSubTabs.length === 0) return null;
    return (
      <div className="flex gap-8 mb-4 overflow-x-auto select-none border-b border-gray-100 scrollbar-hide">
        {currentSubTabs.map((tab) => (
          <div
            key={tab.id}
            onClick={() => setActiveTab(tab.id)} 
            className={`
              pb-3 cursor-pointer font-poppins font-semibold transition-all whitespace-nowrap border-b-2 text-base outline-none
              ${effectiveActiveTab === tab.id
                ? "text-[#3867D6] border-[#3867D6]"
                : "text-[#8E8E93] border-transparent hover:text-gray-600"
              }
            `}
          >
            {tab.label}
          </div>
        ))}
      </div>
    );
  };

  const handleStepClick = (route) => {
    if (typeof window !== 'undefined' && window.currentSaveHandler) {
      window.currentSaveHandler();
    }
    router.push(`${configEntry.baseRoute}/${route}`);
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FC]">
      {/* Top Main Navigation (Reusable Stepper) */}
      <div className="w-full flex justify-center pt-8 pb-4 px-4">
        <div className="max-w-[1440px] w-full px-6">
          {isIndividualType ? (
            <div className="flex flex-col lg:flex-row gap-10 items-start">
              {/* Spacer matching the LEFT Sidebar Area */}
              <div className="w-full lg:w-[320px] hidden lg:block flex-shrink-0" />
              {/* Stepper aligned with RIGHT Content Area */}
              <div className="flex-1 w-full flex justify-start min-w-0 overflow-x-auto scrollbar-hide">
                <Stepper1
                  currentStep={currentStepId}
                  customSteps={steps}
                  errorSteps={errorSteps}
                  onStepClick={handleStepClick}
                />
              </div>
            </div>
          ) : (
            <div className="max-w-[1000px] mx-auto w-full flex justify-center">
              <Stepper1
                currentStep={currentStepId}
                customSteps={steps}
                errorSteps={errorSteps}
                onStepClick={handleStepClick}
              />
            </div>
          )}
        </div>
      </div>

      {/* Sub Tabs Navigation (For non-Individual types) */}
      {!isIndividualType && currentSubTabs.length > 0 && (
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
        <div className="max-w-[1440px] w-full px-6">
          {isIndividualType ? (
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
                  onClick={handleSidebarSaveAndNext}
                >
                  {currentStepRoute === 'tax-summary' ? 'Final Submission' : 'Go to next'}
                </Button>
              </div>

              {/* RIGHT Content Area */}
              <div className="flex-1 w-full flex flex-col gap-6 min-w-0">
                {renderSubTabs()}
                {renderStepComponent()}
              </div>
            </div>
          ) : (
            <div className="max-w-[1000px] mx-auto w-full">
              {renderStepComponent()}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-8 flex justify-center w-full">
        <div className="w-full max-w-[1440px] px-6">
          <Footer2 />
        </div>
      </div>
    </div>
  );
}
