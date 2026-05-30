"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Stepper1 from '@/components/ui/steper1';
import Footer2 from '@/components/layout/Footer2';
import { FiTrash2 } from 'react-icons/fi'; 
import Button from '@/components/ui/Button';
import FormSection from '@/components/ui/FormSection';
import FloatingInput from '@/components/ui/FloatingInput';
import { MdOutlineDescription } from 'react-icons/md';

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
  { id: '80g', label: 'Section 80G Donations' },
  { id: '80gga', label: 'Section 80GGA' },
  { id: 'more', label: 'More Deductions' },
];

const CompanyPrivateDeductions = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('80g');

  const handleNextTab = () => {
    const currentIndex = subTabs.findIndex(t => t.id === activeTab);
    if (currentIndex < subTabs.length - 1) {
      setActiveTab(subTabs[currentIndex + 1].id);
    } else {
      router.push('/dashboard/company-private/taxes');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FC]">
      {/* Top Main Navigation (Reusable Stepper) */}
      <div className="w-full flex justify-center pt-8 pb-4">
        <Stepper1 currentStep={3} customSteps={mainSteps} />
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
      <div className="w-full flex justify-center py-10 px-4">
        <div className="max-w-[1000px] w-full flex flex-col gap-6">
          
          {/* Custom Rendering for A. SECTION 80G */}
          {activeTab === '80g' && (
            <div className="flex flex-col gap-6 bg-white border border-gray-200 p-8">
              <h2 className="font-poppins text-black text-[18px] font-semibold">Summary of Deductions Under Section 80G</h2>
              
              <div className="flex flex-col items-center gap-6 mt-4 mb-10">
                <p className="font-poppins text-black text-[18px] font-semibold">Would you like to add any Donations made under Section 80G?</p>
                <div className="flex gap-6">
                  <Button variant="brand" className="px-6 py-2  text-white rounded font-poppins font-medium text-md" onClick={handleNextTab}> 
                    Add Donation under Section 80G
                  </Button>
                  <Button variant="brand" className="px-6 py-2  text-white rounded font-poppins font-medium text-md" onClick={handleNextTab}>
                    Go To Next
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="w-full  text-start  font-poppins text-black text-[18px] font-semibold">You haven't added any Deduction under Section 80G entries.</p>
              </div>
            </div>
          )}

          {/* Custom Rendering for B. SECTION 80GGA */}
          {activeTab === '80gga' && (
            <div className="flex flex-col gap-6 bg-white border border-gray-200 p-8">
              <h2 className="font-poppins text-black text-[18px] font-semibold">Summary of Deductions Under Section 80GGA</h2>
              
              <div className="flex flex-col items-center gap-6 mt-4 mb-10">
                <p className="font-poppins text-black text-[18px] font-semibold">Would you like to add any Donations made under Section 80GGA?</p>
                <div className="flex gap-6">
                  <Button variant="brand" className="px-6 py-2  text-white rounded font-poppins font-medium text-md" onClick={handleNextTab}> 
                    Add Donation under Section 80G
                  </Button>
                  <Button variant="brand" className="px-6 py-2  text-white rounded font-poppins font-medium text-md" onClick={handleNextTab}>
                    Go To Next
                  </Button>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <p className="w-full  text-start  font-poppins text-black text-[18px] font-semibold">You haven't added any Deduction under Section 80GGA entries.</p>
              </div>
            </div>
          )}

          {/* Custom Rendering for C. MORE DEDUCTIONS */}
          {activeTab === 'more' && (
            <div className="flex flex-col gap-6">
              <h2 className="font-poppins text-black text-[18px] font-semibold">More deductions Under Section 80</h2>
              
              <div className="bg-[#EAF5EA] text-[#4CAF50] font-poppins text-[15px] font-medium p-4 rounded-lg flex items-center gap-2 border border-[#C8E6C9]">
                <span className="text-lg">✓</span> Everything looks cool
              </div>

              {/* Section 80GGC */}
              <FormSection
                title="Section 80GGC - Contribution To Political Party" 
                description="Please provide all information as per Company details."
                icon={MdOutlineDescription}
              >
                <div className="flex flex-col gap-6 mt-2">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">Contribution 1</span>
                    <button className="flex items-center gap-1 text-[#E57373] hover:text-red-600 font-poppins text-[14px]">
                      <FiTrash2 /> Delete
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
                    <FloatingInput label="Amount paid via cash" name="cash80ggc" type="text" />
                    <FloatingInput label="Amount paid via non cash" name="nonCash80ggc" type="text" />
                    <FloatingInput label="Contribution Date(DD/MM/YYYY)" name="date80ggc" type="text" placeholder="dd/mm/yyyy" />
                    <FloatingInput label="Transaction Ref no" name="ref80ggc" type="text" />
                    <FloatingInput label="IFSC Code of Bank" name="ifsc80ggc" type="text" />
                     <FloatingInput label="Name of political party" name="partyName80ggc" type="text" />
                    
                    <FloatingInput label="Name of political party" name="partyName80ggc" type="text" />
                    <FloatingInput label="PAN of political party" name="pan80ggc" type="text" />
                  </div> 

                  <div className="mt-2">
                    <Button variant="brand" className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none">
                       Add more items
                    </Button>
                  </div>
                </div>
              </FormSection>

              {/* Section 80JJA */}
              <FormSection
                title="Section 80JJA" 
                 description="Deduction exempting profits from bio-degradable waste business"
                icon={MdOutlineDescription}
              >
                <div className="flex flex-col gap-6 mt-4">
                  <div className="w-full max-w-[500px]">
                    <FloatingInput label="Deduction exempting profits" name="deduction80jja" type="text" />
                  </div>
                </div>
              </FormSection>

              <div className="flex justify-start mt-4 mb-2">
                <Button variant="brand" className="px-8 py-2 h-auto text-[16px] font-medium rounded text-white border-none">
                  Save
                </Button>
              </div>

            </div>
          )}

        </div>
      </div>
      
      <div className="px-4 pb-8 flex justify-center w-full">
        <div className="w-full max-w-[1000px]">
          <Footer2 />
        </div>
      </div>
    </div>
  );
};

export default CompanyPrivateDeductions;
