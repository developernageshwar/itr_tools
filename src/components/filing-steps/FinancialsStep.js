"use client";

import React from 'react';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function FinancialsStep({ filingType, activeTab, handleNextTab }) {
  return (
    <DynamicFilingStep
      filingType={filingType}
      step="financials"
      activeTab={activeTab}
      handleNextTab={handleNextTab}
    />
  );
}
