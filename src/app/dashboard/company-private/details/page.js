"use client";

import React, { useState } from 'react';
import Stepper1 from '@/components/ui/steper1';
import ConfigurableForm from '@/components/forms/ConfigurableForm';
import { MdBusiness, MdLocationOn, MdInfoOutline } from 'react-icons/md';
import Footer2 from '@/components/layout/Footer2'; 
import Button from '@/components/ui/Button';
import FloatingInput from '@/components/ui/FloatingInput';
import { FiUpload } from 'react-icons/fi';



// 1. Define Main Steps (Header Navigation)
const mainSteps = [
  { id: 1, label: "PERSONAL INFO", route: "/dashboard/company-private/details" },
  { id: 2, label: "INCOME SOURCES", route: "/dashboard/company-private/income" },
  { id: 3, label: "DEDUCTIONS", route: "/dashboard/company-private/deductions" },
  { id: 4, label: "TAXES PAID", route: "/dashboard/company-private/taxes" },
  { id: 5, label: "TAX FILING", route: "/dashboard/company-private/filing" },
];

// 2. Define Sub Tabs
const subTabs = [
  { id: 'permanent', label: 'Permanent Info' },
  { id: 'address', label: 'Address' },
  { id: 'members', label: 'Company Members' },
  { id: 'additional', label: 'Additional info' },
  { id: 'registration', label: 'Registration' },
];

// 3. Define Form Configurations for Reusability
const formConfigs = {
  permanent: {
    title: "Permanent Information for Company Private",
    subtitle: "Please enter your information here.",
    sections: [
      {
        title: "Personal Information",
        description: "Please provide all information as per Company details.",
        icon: MdBusiness,
        fields: [
          { name: 'companyName', label: 'Name of Company *', type: 'text' },
          { name: 'formationDate', label: 'Date of Formation *', type: 'text', placeholder: 'dd/mm/yyyy', helperText: 'Specify date in format like 25/3/1987' },
          { name: 'panNumber', label: 'PAN number *', type: 'text' },
        ]
      }
    ]
  },
  address: {
    title: "Your Address",

    subtitle: "You can enter either your current or permanent address here.",
    sections: [
      {
        title: "Address Details",
        description: "Please provide all information as per Company details.",
        icon: MdLocationOn,
        fields: [
          { name: 'flatNo', label: 'Flat/Door/Block Number *', type: 'text' },
          { name: 'premiseName', label: 'Premise Name', type: 'text', helperText: 'This field is optional' },
          { name: 'roadStreet', label: 'Road / Street', type: 'text', helperText: 'This field is optional' },
          { name: 'pincode', label: 'Pincode *', type: 'text' },
          { name: 'areaLocality', label: 'Area / Locality *', type: 'text' },
          { name: 'city', label: 'Town / City *', type: 'text' },
          { name: 'state', label: 'State *', type: 'select', options: ['DELHI', 'MAHARASHTRA', 'KARNATAKA'] },
          { name: 'country', label: 'Country *', type: 'select', options: ['INDIA'] },
          { name: 'mobile', label: 'Mobile Phone number *', type: 'text', helperText: 'Country Code Mobile Number' },
          { name: 'email', label: 'Email Address *', type: 'text' },
          { name: 'secondaryEmail', label: 'Email Address (secondary)', type: 'text', helperText: 'Tip: if you are using an official email ID, enter your personal ID here' },
        ]
      }
    ]
  },
};

// Partner table columns
const partnerColumns = [
  'ID', 'Partner Name', 'Admitted/Retired', 'PAN', 'Date Of Admissio...', 'Remuneration pai...', 'Percent Of Share'
];

const CompanyPrivateDetails = () => {
  const [activeTab, setActiveTab] = useState('permanent');
  const [formData, setFormData] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving data:", formData);
    // Move to next tab automatically if not on the last one
    const currentIndex = subTabs.findIndex(t => t.id === activeTab);
    if (currentIndex < subTabs.length - 1) {
      setActiveTab(subTabs[currentIndex + 1].id);
    }
  };

  return (
    <div className="w-full min-h-screen">
      <div className="w-full flex justify-center pt-8 pb-4">
        <Stepper1 currentStep={1} customSteps={mainSteps} />
      </div>

      {/* Sub Tabs Navigation */}
      <div className="w-full flex justify-center">
        <div className="flex gap-10 max-w-[1000px] w-full px-4 overflow-x-auto">
          {subTabs.map((tab) => (
            <div
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                py-4 cursor-pointer font-poppins font-medium transition-all whitespace-nowrap  
                text-base
                ${activeTab === tab.id
                  ? "text-brand-blue border-b-[3px] border-brand-blue"
                  : "text-light-gray  hover:text-gray-600 border-b-[3px] border-transparent"
                }
              `}
            >
              {tab.label}
            </div>
          ))}
        </div>
      </div>

      {/* Form Content Area */}
      <div className="w-full flex justify-center py-10 pb-1 px-4">
        <div className="max-w-[1000px] w-full">

          {/* Render Configurable Forms */}
          {formConfigs[activeTab] && (
            <ConfigurableForm
              config={formConfigs[activeTab]}
              values={formData}
              onChange={handleInputChange}
              onSave={handleSave}
            />
          )}

          {/* Custom Rendering for Additional Info Tab */}
          {activeTab === 'additional' && (
            <div className="flex flex-col gap-6">
              <h2 className="font-poppins text-black text-[18px] font-semibold">Additional Information</h2>
              <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">Provide any additional registrations and MSME details.</p>

              <div className="bg-white border border-gray-200 rounded-lg p-6 flex justify-center flex-col gap-8">
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
                    onChange={(e) => setFormData(prev => ({ ...prev, isMSME: e.target.checked }))}
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
                <div className="max-w-[100px]">
                  <label className="block font-poppins font-semibold text-sm text-black mb-2">Was there a change during the previous year in the Partners / Members of the Firm/AOP/BOI/LLP etc *</label>
                  <select
                    name="partnerChange"
                    value={formData.partnerChange || 'Yes'}
                    onChange={handleInputChange}
                    className="w-full border border-gray-300 rounded p-2 text-sm font-poppins bg-white"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* Partner Table */}
                <div className="border border-gray-300 rounded overflow-auto max-h-[350px]">
                  <table className="w-full text-sm font-poppins border-collapse">
                    <thead className="bg-gray-50 sticky top-0">
                      <tr>
                        {partnerColumns.map((col) => (
                          <th key={col} className="border border-gray-300 px-3 py-2 text-left font-medium text-gray-700 whitespace-nowrap">{col}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="border border-gray-300 px-3 py-2 text-center text-gray-500">1</td>
                        {partnerColumns.slice(1).map((col) => (
                          <td key={col} className="border border-gray-300 px-3 py-2">
                            <input type="text" className="w-full outline-none bg-transparent text-sm" />
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Custom Rendering for Members Tab */}
          {activeTab === 'members' && (
            <div className="flex flex-col gap-6">
              <h2 className="font-poppins text-black text-[18px] font-semibold">Information about Directors/Members</h2>
              <div className="bg-[#FFA500] text-black font-poppins text-sm p-3 rounded text-center font-medium">
                Note: Total Percentage Share amongst Partners/Directors should be 100%. Current total is 0% - your return submission could fail.
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6 flex flex-col items-center gap-6">
                <p className="font-poppins text-black text-[18px] font-semibold">Would you like to add a Partner/Member?</p>
                <div className="flex justify-between items-start w-full">
                  <div className="flex gap-4"> 
                    <Button
                    
                     className="bg-[#5BC0BE] hover:bg-[#4aa19f] text-white border-none px-6 py-2 h-auto text-md font-medium">Add Manually</Button>
                    <Button  
                    variant="primary"
                     className=" text-white border-none px-6 py-2 h-auto text-md font-medium">Upload File</Button>
                    <Button  
                    variant="brand"
                     onClick={handleSave} className="text-white border-none px-6 py-2 h-auto text-md font-medium">Go To Next</Button>
                  </div>
                  <div className="flex flex-col gap-4 items-end">
                    <button className="flex items-center gap-2 text-[#3867D6] font-poppins text-sm font-semibold hover:underline">
                      <FiUpload size={18} /> Export All Data
                    </button>
                    <Button  
                    variant="danger"
                     className="text-white border-none px-6 py-2 h-auto text-md font-medium">Delete All</Button>
                  </div>
                </div>

                <div className="w-full border-t border-gray-200 mt-4 pt-6 text-start  font-poppins text-black text-[18px] font-semibold">
                  You haven't added any Members.
                </div>
              </div>
            </div>
          )}

          {/* Custom Rendering for Registration Tab */}
          {activeTab === 'registration' && (
            <div className="flex flex-col gap-6">
              <h2 className="font-poppins text-black text-[18px] font-semibold">Tell the govt. you're filing with ClearTax</h2>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
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

                {(!formData.panNumber || !formData.formationDate) && (
                  <div className="bg-yellow-50 border border-yellow-300 text-yellow-800 p-3 rounded text-sm mb-4">
                    PAN and Date of Birth must be added in Personal Info section
                  </div>
                )}

                <Button  
                variant="brand"
                  className="text-white border-none px-6 py-2 h-auto text-md font-medium"
                  onClick={() => setActiveTab('permanent')}
                >
                  Add missing details
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="px-4  max-w-[1000px]  pb-8 flex justify-center mx-auto w-full">
        <div className="w-full max-w-[1440px]">
          <Footer2 />
        </div>
      </div>
    </div>
  );
};

export default CompanyPrivateDetails;
