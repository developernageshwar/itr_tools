"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useItrStore } from '@/store/itrStore';
import { filingTypeConfig } from '@/config/filingConfig';
import Button from '@/components/ui/Button';

const questions = [
  { id: 'q1', category: 'Basic Income Sources', text: 'Do you have Salary or Pension Income?' },
  { id: 'q2', category: 'Basic Income Sources', text: 'Do you have Income from One House Property?' },
  { id: 'q3', category: 'Basic Income Sources', text: 'Do you have Income from Multiple House Properties?' },
  { id: 'q4', category: 'Basic Income Sources', text: 'Do you have Income from Other Sources (Interest, FD, Savings Account, etc.)?' },
  
  { id: 'q5', category: 'Capital Gains', text: 'Do you have Short-Term Capital Gains?' },
  { id: 'q6', category: 'Capital Gains', text: 'Do you have Long-Term Capital Gains?' },
  { id: 'q7', category: 'Capital Gains', text: 'Have you sold Shares, Mutual Funds, Property, Gold, or Other Assets during the year?' },
  
  { id: 'q8', category: 'Business & Profession', text: 'Do you have Business Income?' },
  { id: 'q9', category: 'Business & Profession', text: 'Do you have Professional Income?' },
  { id: 'q10', category: 'Business & Profession', text: 'Do you maintain Books of Accounts?' },
  { id: 'q11', category: 'Business & Profession', text: 'Are you liable for Tax Audit?' },
  
  { id: 'q12', category: 'Presumptive Taxation', text: 'Are you opting for Presumptive Taxation under Section 44AD?' },
  { id: 'q13', category: 'Presumptive Taxation', text: 'Are you opting for Presumptive Taxation under Section 44ADA?' },
  { id: 'q14', category: 'Presumptive Taxation', text: 'Are you opting for Presumptive Taxation under Section 44AE?' },
  
  { id: 'q15', category: 'Foreign Income & Assets', text: 'Do you own Foreign Assets?' },
  { id: 'q16', category: 'Foreign Income & Assets', text: 'Do you have Foreign Bank Accounts?' },
  { id: 'q17', category: 'Foreign Income & Assets', text: 'Do you have Foreign Income?' },
  { id: 'q18', category: 'Foreign Income & Assets', text: 'Are you claiming Foreign Tax Credit?' },
  
  { id: 'q19', category: 'Residential Status', text: 'Are you a Non-Resident (NRI)?' },
  { id: 'q20', category: 'Residential Status', text: 'Are you a Resident but Not Ordinarily Resident (RNOR)?' },
  
  { id: 'q21', category: 'Directorship & Investments', text: 'Were you a Director in any Company during the financial year?' },
  { id: 'q22', category: 'Directorship & Investments', text: 'Do you hold Unlisted Equity Shares?' },
  
  { id: 'q23', category: 'Agricultural Income', text: 'Do you have Agricultural Income exceeding the prescribed limit?' },
  
  { id: 'q24', category: 'Special Cases', text: 'Are you a Partner in a Firm or LLP?' },
  { id: 'q25', category: 'Special Cases', text: 'Do you receive Income from Partnership Firm?' },
  { id: 'q26', category: 'Special Cases', text: 'Do you have Income from Speculative Business?' },
  { id: 'q27', category: 'Special Cases', text: 'Do you have Income from Intraday Trading?' },
  { id: 'q28', category: 'Special Cases', text: 'Do you have Income from Futures & Options (F&O)?' },
  { id: 'q29', category: 'Special Cases', text: 'Do you have Cryptocurrency or Virtual Digital Asset Transactions?' },
  
  { id: 'q30', category: 'Exemptions & Deductions', text: 'Are you claiming deductions under Chapter VI-A?' },
  { id: 'q31', category: 'Exemptions & Deductions', text: 'Are you claiming exemption under any special provision?' },
  
  { id: 'q32', category: 'Other Conditions', text: 'Do you have Carry Forward Losses from Previous Years?' },
  { id: 'q33', category: 'Other Conditions', text: 'Do you want to carry forward current year losses?' },
  { id: 'q34', category: 'Other Conditions', text: 'Do you have Clubbing Income?' },
  { id: 'q35', category: 'Other Conditions', text: 'Do you have Any Income that requires special tax treatment?' },
];

export default function EligibilityPage() {
  const router = useRouter();
  const { createNewProfile, setSelectedFilingType } = useItrStore();
  const [answers, setAnswers] = useState({});
  const [showValidation, setShowValidation] = useState(false);

  const handleSelect = (id, value) => {
    setAnswers(prev => ({ ...prev, [id]: value }));
  };

  const isComplete = questions.every(q => answers[q.id] !== undefined);

  const handleSubmit = () => {
    if (!isComplete) {
      setShowValidation(true);
      // Scroll to first unanswered question
      const firstUnanswered = questions.find(q => answers[q.id] === undefined);
      if (firstUnanswered) {
        document.getElementById(`row-${firstUnanswered.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const ans = (id) => answers[id] === 'yes';

    const isItr3 = ans('q8') || ans('q9') || ans('q10') || ans('q11') || ans('q24') || ans('q25') || ans('q26') || ans('q27') || ans('q28') || ans('q29');
    const isItr4 = ans('q12') || ans('q13') || ans('q14');
    const isItr2 = ans('q3') || ans('q5') || ans('q6') || ans('q7') || ans('q15') || ans('q16') || ans('q17') || ans('q18') || ans('q19') || ans('q20') || ans('q21') || ans('q22') || ans('q23') || ans('q32') || ans('q33') || ans('q34') || ans('q35');

    let itrType = 'ITR1';

    if (isItr3) {
      itrType = 'ITR3';
    } else if (isItr4) {
      if (isItr2) {
        itrType = 'ITR3';
      } else {
        itrType = 'ITR4';
      }
    } else if (isItr2) {
      itrType = 'ITR2';
    } else {
      itrType = 'ITR1';
    }

    // Update store with correct filing type and navigate
    setSelectedFilingType(itrType);
    createNewProfile(itrType);
    const route = filingTypeConfig[itrType]?.detailsRoute || '/dashboard/pan-details';
    router.push(route);
  };

  // Group questions by category
  const categories = questions.reduce((acc, q) => {
    if (!acc[q.category]) acc[q.category] = [];
    acc[q.category].push(q);
    return acc;
  }, {});

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ITR Eligibility Questionnaire</h1>
        <p className="text-gray-600">Please answer all questions below to help us determine the correct ITR form for you.</p>
      </div>

      <div className="space-y-8">
        {Object.entries(categories).map(([category, catsQs]) => (
          <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">{category}</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {catsQs.map((q) => {
                const isUnanswered = showValidation && answers[q.id] === undefined;
                return (
                  <div 
                    id={`row-${q.id}`} 
                    key={q.id} 
                    className={`p-6 transition-colors ${isUnanswered ? 'bg-red-50' : 'hover:bg-gray-50'}`}
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className={`text-base font-medium ${isUnanswered ? 'text-red-800' : 'text-gray-900'}`}>
                          {q.text}
                        </p>
                        {isUnanswered && (
                          <p className="text-sm text-red-600 mt-1">This question is mandatory.</p>
                        )}
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={q.id}
                            value="yes"
                            checked={answers[q.id] === 'yes'}
                            onChange={() => handleSelect(q.id, 'yes')}
                            className="w-5 h-5 text-[#1498EB] border-gray-300 focus:ring-[#1498EB]"
                          />
                          <span className="ml-2 text-gray-700 font-medium">Yes</span>
                        </label>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="radio"
                            name={q.id}
                            value="no"
                            checked={answers[q.id] === 'no'}
                            onChange={() => handleSelect(q.id, 'no')}
                            className="w-5 h-5 text-[#1498EB] border-gray-300 focus:ring-[#1498EB]"
                          />
                          <span className="ml-2 text-gray-700 font-medium">No</span>
                        </label>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end">
        <Button
          variant="brand"
          onClick={handleSubmit}
          disabled={!isComplete && showValidation}
          className={`px-8 py-3 text-lg font-medium ${(!isComplete && showValidation) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
