"use client";

import React from 'react';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function DeductionsStep({ filingType, activeTab, handleNextTab }) {
  return (
    <DynamicFilingStep
      filingType={filingType}
      step="deductions"
      activeTab={activeTab}
      handleNextTab={handleNextTab}
    />
  );
}
