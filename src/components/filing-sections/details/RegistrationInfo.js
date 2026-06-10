"use client";

import React from 'react';
import FloatingInput from '@/components/ui/FloatingInput';
import Button from '@/components/ui/Button';

const RegistrationInfo = ({ formData, handleSave }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-poppins text-black text-[18px] font-semibold">Tell the govt. you're filing with ClearTax</h2>

      <div className="bg-white border border-gray-200 rounded-[8px] p-6">
        <ul className="list-none space-y-2 mb-6 font-poppins text-sm text-gray-700">
          <li className="flex items-start gap-2">✓ To e-file and e-verify your ITR, we need to tell the govt you're a client.</li>
          <li className="flex items-start gap-2">✓ By giving consent, the system can access your data available with the Income Tax Department.</li>
        </ul>

        <div className="grid grid-cols-2 gap-6 mb-6">
          <FloatingInput
            label="PAN"
            name="panNumber"
            type="text"
            value={formData.panNumber || ''}
            onChange={() => {}}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />
          <FloatingInput
            label="Date Of Birth / Formation Date"
            name="formationDate"
            type="text"
            value={formData.formationDate || ''}
            onChange={() => {}}
            disabled
            className="bg-gray-100 cursor-not-allowed"
          />
        </div>

        <Button variant="brand" onClick={handleSave} className="px-8 py-2.5 h-auto text-[16px] font-medium rounded text-white border-none">
          Save
        </Button>
      </div>
    </div>
  );
};

export default RegistrationInfo;
