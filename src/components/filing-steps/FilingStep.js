"use client";

import React from 'react';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function FilingStep({ filingType, activeTab, handleNextTab }) {
  return (
    <DynamicFilingStep
      filingType={filingType}
      step="filing"
      activeTab={activeTab}
      handleNextTab={handleNextTab}
    />
  );
}
