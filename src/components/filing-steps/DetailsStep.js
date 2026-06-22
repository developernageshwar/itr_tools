"use client";

import React, { useState } from 'react';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function DetailsStep({ filingType, activeTab, handleNextTab }) {
  return (
    <DynamicFilingStep
      filingType={filingType}
      step="details"
      activeTab={activeTab}
      handleNextTab={handleNextTab}
    />
  );
}
