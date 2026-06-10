"use client";

import React from 'react';
import ConfigurableForm from '@/components/forms/ConfigurableForm';
import { MdLocationOn } from 'react-icons/md';

const AddressInfo = ({ filingType, formData, handleInputChange, handleSave }) => {
  const config = {
    title: "Your Address",
    subtitle: "You can enter either your current or permanent address here.",
    sections: [
      {
        title: "Address Details",
        description: `Please provide all information as per ${filingType} details.`,
        icon: MdLocationOn,
        fields: [
          { name: 'flatNo', label: 'Flat/Door/Block Number *', type: 'text' },
          { name: 'premiseName', label: 'Premise Name', type: 'text', helperText: 'This field is optional' },
          { name: 'roadStreet', label: 'Road / Street', type: 'text', helperText: 'This field is optional' },
          { name: 'pincode', label: 'Pincode *', type: 'text' },
          { name: 'areaLocality', label: 'Area / Locality *', type: 'text' },
          { name: 'city', label: 'Town / City *', type: 'text' },
          { name: 'state', label: 'State *', type: 'select', options: ['DELHI', 'MAHARASHTRA', 'KARNATAKA', 'GUJARAT', 'TAMIL NADU'] },
          { name: 'country', label: 'Country *', type: 'select', options: ['INDIA'] },
          { name: 'mobile', label: 'Mobile Phone number *', type: 'text', helperText: 'Country Code Mobile Number' },
          { name: 'email', label: 'Email Address *', type: 'text' },
          { name: 'secondaryEmail', label: 'Email Address (secondary)', type: 'text', helperText: 'Tip: if you are using an official email ID, enter your personal ID here' },
        ]
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

export default AddressInfo;
