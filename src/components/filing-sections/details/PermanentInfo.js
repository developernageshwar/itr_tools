"use client";

import React from 'react';
import ConfigurableForm from '@/components/forms/ConfigurableForm';
import { MdBusiness, MdPerson } from 'react-icons/md';

const PermanentInfo = ({ filingType, formData, handleInputChange, handleSave }) => {
  // We can dynamically adjust fields based on filingType
  let fields = [
    { name: 'panNumber', label: 'PAN number *', type: 'text' },
  ];
  
  let title = "Personal Information";
  let description = "Please provide all information as per details.";
  let icon = MdPerson;

  if (filingType === 'Company Private' || filingType === 'Company Public' || filingType === 'LLP' || filingType === 'Firm') {
    title = "Company Information";
    description = "Please provide all information as per Company details.";
    icon = MdBusiness;
    fields = [
      { name: 'companyName', label: 'Name of Company/Firm *', type: 'text' },
      { name: 'formationDate', label: 'Date of Formation *', type: 'text', placeholder: 'dd/mm/yyyy', helperText: 'Specify date in format like 25/3/1987' },
      { name: 'panNumber', label: 'PAN number *', type: 'text' },
    ];
  } else if (filingType === 'HUF') {
    title = "HUF Information";
    description = "Please provide all information as per HUF details.";
    icon = MdPerson;
    fields = [
      { name: 'hufName', label: 'Name of HUF *', type: 'text' },
      { name: 'formationDate', label: 'Date of Formation *', type: 'text', placeholder: 'dd/mm/yyyy' },
      { name: 'panNumber', label: 'PAN number *', type: 'text' },
    ];
  } else {
    // AOP/BOI, Cooperative Society, etc.
    title = `${filingType} Information`;
    fields = [
      { name: 'entityName', label: `Name of ${filingType} *`, type: 'text' },
      { name: 'formationDate', label: 'Date of Formation *', type: 'text', placeholder: 'dd/mm/yyyy' },
      { name: 'panNumber', label: 'PAN number *', type: 'text' },
    ];
  }

  const config = {
    title: `Permanent Information for ${filingType}`,
    subtitle: "Please enter your information here.",
    sections: [
      {
        title,
        description,
        icon,
        fields
      }
    ]
  };

  return (
    <ConfigurableForm
      config={config}
      values={formData}
      onChange={handleInputChange}
      onSave={handleSave}
    />
  );
};

export default PermanentInfo;
