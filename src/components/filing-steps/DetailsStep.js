"use client";

import React, { useState } from 'react';
import PermanentInfo from '@/components/filing-sections/details/PermanentInfo';
import AddressInfo from '@/components/filing-sections/details/AddressInfo';
import MembersInfo from '@/components/filing-sections/details/MembersInfo';
import AdditionalInfo from '@/components/filing-sections/details/AdditionalInfo';
import RegistrationInfo from '@/components/filing-sections/details/RegistrationInfo';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function DetailsStep({ filingType, activeTab, handleNextTab }) {
  if (filingType !== 'Individual') {
    return (
      <DynamicFilingStep
        filingType={filingType}
        step="details"
        activeTab={activeTab}
        handleNextTab={handleNextTab}
      />
    );
  }

  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving details data:", formData);
    handleNextTab();
  };

  return (
    <>
      {activeTab === 'permanent' && (
        <PermanentInfo 
          filingType={filingType} 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSave={handleSave} 
        />
      )}
      {activeTab === 'address' && (
        <AddressInfo 
          filingType={filingType} 
          formData={formData} 
          handleInputChange={handleInputChange} 
          handleSave={handleSave} 
        />
      )}
      {(activeTab === 'members' || activeTab === 'directors' || activeTab === 'karta') && (
        <MembersInfo 
          filingType={filingType} 
          handleSave={handleSave} 
        />
      )}
      {activeTab === 'additional' && (
        <AdditionalInfo 
          filingType={filingType} 
          formData={formData} 
          handleInputChange={handleInputChange} 
        />
      )}
      {activeTab === 'registration' && (
        <RegistrationInfo 
          formData={formData} 
          handleSave={handleSave} 
        />
      )}
    </>
  );
}
