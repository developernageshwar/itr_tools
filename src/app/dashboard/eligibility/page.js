"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useItrStore } from '@/store/itrStore';
import { filingTypeConfig } from '@/config/filingConfig';
import Button from '@/components/ui/Button';


const questions = [
  { id: 'q1', text: 'Do you have Salary or Pension income?' },
  { id: 'q2', text: 'Do you have income from House Property?' },
  { id: 'q3', text: 'Did you sell any Assets, Shares, or Mutual Funds (Capital Gains)?' },
  { id: 'q4', text: 'Do you have any Foreign Assets or Income?' },
  { id: 'q5', text: 'Do you have Business or Professional Income?' },
  { id: 'q6', text: 'Do you have special income like F&O, Crypto, or hold Directorship?' },
  { id: 'q7', text: 'Are you opting for Presumptive Taxation (Section 44AD/44ADA)?' }
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
      const firstUnanswered = questions.find(q => answers[q.id] === undefined);
      if (firstUnanswered) {
        document.getElementById(`row-${firstUnanswered.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const ans = (id) => answers[id] === 'yes';
    let itrType = 'ITR1';

    if (ans('q6')) {
      itrType = 'ITR3';
    } else if (ans('q5')) {
      itrType = ans('q7') ? 'ITR4' : 'ITR3';
    } else if (ans('q3') || ans('q4')) {
      itrType = 'ITR2';
    } else {
      itrType = 'ITR1';
    }
    setSelectedFilingType(itrType);
    createNewProfile(itrType, answers);
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

      <div className="space-y-8">
        {Object.entries(categories).map(([category, catsQs]) => (
          <div key={category} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">

            <div className="divide-y divide-gray-100">
              {catsQs.map((q) => {
                const isUnanswered = showValidation && answers[q.id] === undefined;
                return (
                  <div
                    id={`row-${q.id}`}
                    key={q.id}
                    className={`px-6 py-4 transition-colors ${isUnanswered ? 'bg-red-50' : 'hover:bg-gray-50'}`}
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

      <div className="mt-8 pt-4 flex justify-end">
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
