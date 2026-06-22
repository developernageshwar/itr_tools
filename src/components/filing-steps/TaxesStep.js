"use client";

import React from 'react';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function TaxesStep({ filingType, activeTab, handleNextTab }) {
  return (
    <DynamicFilingStep
      filingType={filingType}
      step="taxes"
      activeTab={activeTab}
      handleNextTab={handleNextTab}
    />
  );
}
