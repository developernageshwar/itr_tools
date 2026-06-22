"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import FormSection from '@/components/ui/FormSection';
import FloatingInput from '@/components/ui/FloatingInput';
import { MdAccountBalance, MdMoney, MdCurrencyBitcoin, MdBusinessCenter, MdSecurity, MdAgriculture } from 'react-icons/md';
import { FiX, FiList } from 'react-icons/fi';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function IncomeStep({ filingType, activeTab, handleNextTab }) {
  return (
    <DynamicFilingStep
      filingType={filingType}
      step="income"
      activeTab={activeTab}
      handleNextTab={handleNextTab}
    />
  );
}
