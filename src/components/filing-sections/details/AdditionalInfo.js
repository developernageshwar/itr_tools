"use client";

import React from 'react';
import FloatingInput from '@/components/ui/FloatingInput';

const AdditionalInfo = ({ filingType, formData, handleInputChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-poppins text-black text-[18px] font-semibold">Additional Information</h2>
      <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">Provide any additional registrations and MSME details.</p>

      <div className="bg-white border border-gray-200 rounded-[8px] p-6 flex justify-center flex-col gap-8">
        {/* Recognition number */}
        <div className="">
          <FloatingInput
            name="startupRecognition"
            label="Recognition number allotted by the DPIIT for a startup"
            type="text"
            value={formData.startupRecognition || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* LLP PIN */}
        <div className="">
          <FloatingInput
            name="llpPin"
            label="LLP PIN issued By MCA"
            type="text"
            value={formData.llpPin || ''}
            onChange={handleInputChange}
          />
        </div>

        {/* MSME Checkbox */}
        <div className="flex items-center gap-3">
          <label className="font-poppins font-semibold text-sm text-black">Whether you are recognized as MSME</label>
          <input
            type="checkbox"
            name="isMSME"
            checked={formData.isMSME === true || formData.isMSME === 'Yes'}
            onChange={(e) => handleInputChange({ target: { name: 'isMSME', value: e.target.checked }})}
            className="w-5 h-5 accent-[#3867D6] cursor-pointer"
          />
        </div>

        {/* Conditional MSMED Registration */}
        {(formData.isMSME === true || formData.isMSME === 'Yes') && (
          <div className="max-w-md">
            <label className="block font-poppins font-semibold text-sm text-black mb-2">If yes, please provide registration number allotted as per MSMED Act, 2006</label>
            <FloatingInput
              name="msmedRegistration"
              label=""
              type="text"
              value={formData.msmedRegistration || ''}
              onChange={handleInputChange}
            />
          </div>
        )}

        {/* Partner Change Dropdown */}
        <div className="max-w-md">
          <FloatingInput
            as="select"
            name="partnerChange"
            label="Was there a change during the previous year in the Partners / Members of the Firm/AOP/BOI/LLP etc *"
            value={formData.partnerChange || 'Yes'}
            onChange={handleInputChange}
          >
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </FloatingInput>
        </div>

        {/* Partner Table - Just a simple view for now */}
        <div className="border border-gray-300 rounded overflow-auto max-h-[350px]">
          <table className="w-full text-sm font-poppins border-collapse">
            <thead className="bg-gray-50 sticky top-0">
              <tr>
                {['ID', 'Partner Name', 'Admitted/Retired', 'PAN', 'Date Of Admissio...', 'Remuneration pai...', 'Percent Of Share'].map((col) => (
                  <th key={col} className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-3 py-2 text-center text-gray-500">1</td>
                {[1,2,3,4,5,6].map((i) => (
                  <td key={i} className="border border-gray-300 px-3 py-2">
                    <input type="text" className="w-full outline-none bg-transparent text-sm" />
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
