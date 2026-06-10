"use client";

import React from 'react';
import Button from '@/components/ui/Button';
import { FiUpload } from 'react-icons/fi';

const MembersInfo = ({ filingType, handleSave }) => {
  let title = "Information about Directors/Members";
  if (filingType === 'HUF') {
    title = "Information about Co-parceners";
  }

  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-poppins text-black text-[18px] font-semibold">{title}</h2>
      <div className="bg-[#FFA500] text-black font-poppins text-sm p-3 rounded-[8px] text-center font-medium">
        Note: Total Percentage Share amongst Partners/Directors should be 100%. Current total is 0% - your return submission could fail.
      </div>

      <div className="bg-white border border-gray-200 rounded-[8px] p-6 flex flex-col items-center gap-6">
        <p className="font-poppins text-black text-[18px] font-semibold">Would you like to add a Partner/Member?</p>
        <div className="flex justify-between items-start w-full">
          <div className="flex gap-4"> 
            <Button className="bg-[#5BC0BE] hover:bg-[#4aa19f] text-white border-none px-6 py-2 h-auto text-md font-medium">Add Manually</Button>
            <Button variant="primary" className=" text-white border-none px-6 py-2 h-auto text-md font-medium">Upload File</Button>
            <Button variant="brand" onClick={handleSave} className="text-white border-none px-6 py-2 h-auto text-md font-medium">Go To Next</Button>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <button className="flex items-center gap-2 text-[#3867D6] font-poppins text-sm font-semibold hover:underline">
              <FiUpload size={18} /> Export All Data
            </button>
            <Button variant="danger" className="text-white border-none px-6 py-2 h-auto text-md font-medium">Delete All</Button>
          </div>
        </div>

        <div className="w-full border-t border-gray-200 mt-4 pt-6 text-start font-poppins text-black text-[18px] font-semibold">
          You haven't added any Members.
        </div>
      </div>
    </div>
  );
};

export default MembersInfo;
