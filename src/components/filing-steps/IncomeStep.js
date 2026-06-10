"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/ui/Button';
import FormSection from '@/components/ui/FormSection';
import FloatingInput from '@/components/ui/FloatingInput';
import { MdAccountBalance, MdMoney, MdCurrencyBitcoin, MdBusinessCenter, MdSecurity, MdAgriculture } from 'react-icons/md';
import { FiX, FiList } from 'react-icons/fi';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function IncomeStep({ filingType, activeTab, handleNextTab }) {
  if (filingType !== 'Individual') {
    return (
      <DynamicFilingStep
        filingType={filingType}
        step="income"
        activeTab={activeTab}
        handleNextTab={handleNextTab}
      />
    );
  }

  const router = useRouter();

  return (
    <>
      {/* Custom Rendering for A. OTHER INCOME */}
      {activeTab === 'other' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="font-poppins text-black text-[20px] font-semibold leading-5">Income from other sources</h2>
            <Button 
              variant="brand"
              onClick={handleNextTab} className="px-6 py-2  text-white rounded font-poppins font-medium text-md"> 
                Go To Next
              </Button> 
          </div>
          <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">
            This section consists of interest income, dividend income, agricultural income and all other incomes excluding salary, income from house property or capital gains or business profession.
          </p>

          {/* 1. Interest Income */}
          <FormSection
            title="Interest Income" 
            description="This section consists of interest income, dividend income, agricultural income and all other incomes excluding salary, income from house property or capital gains or business profession."
            icon={MdAccountBalance}
          >
            <div className="flex flex-col gap-6 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="flex gap-2 items-center">
                  <div className="flex-1"> 
                    <p className="text-sm text-gray-500 mb-4">You can also enter income from post-office saving deposits here.</p>
                    <FloatingInput
                      label="Interest Income from Saving Bank" 
                      name="savingBankInterest"
                      type="text" 
                    />
                  </div>
                  <div className="pt-8">
                    <FiList size={24} className="text-black cursor-pointer" />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                <div className="flex gap-2 items-center">
                  <div className="flex-1">
                    <FloatingInput
                      label="Interest Income from Deposits"
                      name="depositInterest"
                      type="text"
                    />
                  </div>
                  <div className="pt-2">
                    <FiList size={24} className="text-black cursor-pointer" />
                  </div>
                </div>
              </div>
              
              <div className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">
                <span className="text-brand-blue cursor-pointer hover:underline">Click here</span> to add any other interest income (eg: interest from bonds, interest from tax refund, etc).
              </div>
            </div>
          </FormSection>

          {/* 2. Other Income */}
          <FormSection
            title="Other Income" 
            description="This section consists of interest income, dividend income, agricultural income and all other incomes excluding salary, income from house property or capital gains or business profession."
            icon={MdMoney}
          >
            <div className="flex flex-col gap-6 mt-4">
              <div className="flex gap-4 mb-2 items-center flex-wrap">
                <Button variant='danger' className="px-6 py-2  text-white rounded font-poppins font-medium text-md">Delete All</Button>
                <Button variant='brand' className="px-6 py-2  text-white rounded font-poppins font-medium text-md">Export Dividend</Button>
                <Button variant='brand' className="px-6 py-2  text-white rounded font-poppins font-medium text-md">Upload Dividend</Button>
                <span className="text-brand-blue font-medium font-poppins text-[14px] cursor-pointer hover:underline ml-2"> candiditx Template</span>
              </div>
              
              {/* Domestic Company Dividend */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <span className="font-poppins font-semibold text-[16px] leading-5 text-black">Dividend Income from Domestic Company</span>
                  <span className="bg-gray-200 text-gray-700 text-[13px] px-2 py-1 rounded cursor-pointer hover:bg-gray-300 font-medium font-poppins">Read More</span>
                </div>
                <div className="flex gap-4 items-start flex-wrap md:flex-nowrap">
                  <div className="flex-1 w-full md:w-auto">
                    <FloatingInput label="Narration (Other Income)" name="domesticNarration" type="text" />
                  </div>
                  <div className="flex-1 w-full md:w-auto">
                    <FloatingInput label="Amount" name="domesticAmount" type="text" />
                  </div>
                  <div className="flex-1 w-full md:w-auto">
                    <FloatingInput label="dd/mm/yyyy" name="domesticDate" type="text" />
                  </div>
                  <div className="pt-4">
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800">
                      <FiX size={14} />
                    </div>
                  </div>
                </div>
                <div>
                  <Button variant="brand" className=" text-white border-none px-4 py-2 h-auto text-md font-medium rounded"> Add more items</Button>
                </div>
              </div>

              {/* Mutual Funds Dividend */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <span className="font-poppins font-semibold text-[16px] leading-5 text-black">Dividend Income from Mutual Funds</span>
                  <span className="font-poppins font-normal text-[15px] leading-5 text-[#8E8E93]">Dividend from investments in Mutual Funds, ULIPs, UTI</span> 
                </div>
                <div className="flex gap-4 items-start flex-wrap md:flex-nowrap">
                  <div className="flex-1 w-full md:w-auto">
                    <FloatingInput label="Narration (Other Income)" name="mfNarration" type="text" />
                  </div>
                  <div className="flex-1 w-full md:w-auto">
                    <FloatingInput label="Amount" name="mfAmount" type="text" />
                  </div>
                  <div className="flex-1 w-full md:w-auto"> 
                    <FloatingInput label="dd/mm/yyyy" name="mfDate" type="text" />
                  </div>
                  <div className="pt-4">
                    <div className="w-6 h-6 rounded-full bg-black text-white flex items-center justify-center cursor-pointer hover:bg-gray-800">
                      <FiX size={14} />
                    </div>
                  </div>
                </div>
                <div>
                  <Button variant="brand" className=" text-white border-none px-4 py-2 h-auto text-md font-medium rounded">Add more items</Button>
                </div>
              </div>

              {/* Any Other Income */}
              <div className="flex flex-col gap-4 mt-4">
                <div className="flex flex-col gap-2">
                  <span className="font-poppins font-semibold text-[16px] leading-5 text-black">Any Other Income</span>
                  <span className="font-poppins font-normal text-[15px] leading-5 text-[#8E8E93]">Report any other income which is not part of Income from Salary, House Property, Capital Gain or Business and Profession. Gifts can be declared as Income here.</span>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
                  <div className="flex gap-2 items-center">
                    <div className="flex-1">
                      <FloatingInput label="Other Income" name="anyOtherIncome" type="text" />
                    </div>
                    <div className="pt-2">
                      <FiList size={24} className="text-black cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93] mt-2">
                  <span className="text-brand-blue cursor-pointer hover:underline">Click here</span> if you want to declare expenses/depreciation under Section 57 on your Income From Other Sources.
                </div>
              </div>
            </div>
          </FormSection>

          {/* 3. VDA Income */}
          <FormSection
            title="VDA Income" 
            description="If you have any income from transfer of Virtual Digital Assets, then report the same here."
            icon={MdCurrencyBitcoin}
          >
            <div className="flex items-center justify-between gap-2 mt-4">
              <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">If you have any income from transfer of Virtual Digital Assets, then report the same here.</p>
              <Button variant="brand" className=" text-white w-80 border-none px-6 py-2 h-auto text-md font-medium rounded">Add Income From Crypto/VDA</Button>
            </div>
          </FormSection>

          {/* 4. Pass Through Income */}
          <FormSection
            title="Pass Through Income From Business Fund/Trust" 
            description="If you have any income from a Investment Fund or Business Trust, then report the same here."
            icon={MdBusinessCenter}
          >
            <div className="flex items-center justify-between gap-2 mt-4">
              <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">If you have any income from a Investment Fund or Business Trust, then report the same here.</p> 
                 <Button variant="brand" className=" text-white w-100 border-none px-6 py-2 h-auto text-md font-medium rounded">Add Income From Business Trust/Fund</Button> 
            </div>
          </FormSection>

          {/* 5. Exempt Income */}
          <FormSection
            title="Exempt Income" 
            description="If you have any income from a Investment Fund or Business Trust, then report the same here."
            icon={MdSecurity}
          >
            <div className="flex items-center justify-between mt-4">
              <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">Do you have any income from Interests from PPF or Other Income which are exempt?</p> 
                   <Button variant="brand" className=" text-white border-none px-6 py-2 h-auto text-md font-medium rounded">Add Exempt Income</Button>
            </div>
          </FormSection>

          {/* 6. Agriculture Income */}
          <FormSection
            title="Agriculture Income" 
             description="If you have any income from a Investment Fund or Business Trust, then report the same here."
            icon={MdAgriculture}
          >
            <div className="flex items-center justify-between mt-4">
              <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">Do you have any Income from Agriculture?</p> 
                     <Button variant="brand" className=" text-white border-none px-6 py-2 h-auto text-md font-medium rounded">Add Agriculture Income</Button>
            </div>
          </FormSection>

          {/* Save Button */}
          <div className="flex justify-start mt-2">
            <Button variant="brand" className="text-white border-none px-8 py-2 h-auto text-[16px] font-medium rounded">Save</Button>
          </div>
        </div>
      )}

      {/* Custom Rendering for B. HOUSE PROPERTY */}
      {activeTab === 'house' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="font-poppins text-black text-[20px] font-semibold leading-5">Income From House Property</h2>
            <div className="flex items-center gap-4">
              <span className="text-md font-poppins text-gray-600">Do not have any house property?</span>
              <Button variant="brand" onClick={handleNextTab} className="px-6 py-2  text-white rounded font-poppins font-medium text-md"> 
                Go To Next
              </Button>
            </div>
          </div>

          <div className="bg-[#EAF5EA] text-[#4CAF50] font-poppins text-sm p-4 rounded-[8px] flex items-center gap-2 border border-[#C8E6C9]">
            <span className="text-lg">✓</span> Everything looks cool
          </div>

          <p className="font-poppins text-md text-gray-600 leading-relaxed">
            In case you paid <span className="font-medium text-black">interest on Housing Loan for house property you live in (self-occupied property)</span> or if you <span className="font-medium text-black">own a house and are earning rent on it</span> then specify the details here.<br/><br/>
            <span className="font-medium text-black">Please Note:</span> If you are paying rent to someone else, you <span className="font-medium">should not</span> enter the amount in this section, instead refer to the HRA exemption in the Salary Page in INCOME SOURCES if you are a salaried employee or refer to the section 80GG in the deductions if you are non-salaried or self-employed (Deductions More Deductions Add Special Deductions 80GG).
          </p>

          <div className="flex justify-center mt-4">
            <Button variant="brand" className="px-8 py-3 rounded font-poppins font-medium shadow-sm hover:opacity-90">
              Click Here To Add House Property Details
            </Button>
          </div>
        </div>
      )}

      {/* Custom Rendering for C. CAPITAL GAIN */}
      {activeTab === 'capital' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="font-poppins text-black text-[20px] font-semibold leading-5">Income From Capital Gains</h2>
            <div className="flex items-center gap-4">
              <span className="text-md font-poppins text-gray-600">Did not sell any assets?</span>
              <Button variant="brand" onClick={handleNextTab} className="px-6 py-2  text-white rounded font-poppins font-medium text-md"> 
                Go To Next
              </Button> 
            </div>
          </div>

          <p className="font-poppins text-md text-gray-600 leading-relaxed">
            Did you sell any asset (Mutual Funds, shares, property, house, land, building etc) between the period of April 1, 2024 to March 31, 2025?<br/><br/>
            <span className="font-poppins text-md text-gray-600 leading-relaxed"> <span className='text-black font-medium'> Note:</span>Along with capital gains, we also auto-process intraday trading and F&O trading transactions from your capital gains statements. Post processing, you can go to the Business & Profession page to check the data and edit.</span>
          </p>

          <div className="flex justify-center mt-2">
            <Button variant="brand" className="px-8 py-3 rounded font-poppins font-medium shadow-sm hover:opacity-90">
              Click here if you sold any assets
            </Button>
          </div> 
        </div>
      )}

      {/* Custom Rendering for D. BUSINESS & PROFESSION */}
      {activeTab === 'business' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h2 className="font-poppins text-black text-[20px] font-semibold leading-5">Income from Business and Profession</h2>
            <div className="flex items-center gap-4">
              <span className="text-md font-poppins text-gray-600">Not running a business?</span>
              <Button variant="brand" onClick={handleNextTab} className="px-6 py-2  text-white rounded font-poppins font-medium text-sm">
                Go To Next 
              </Button>
            </div>
          </div>

          <p className="font-poppins text-md text-gray-600 leading-relaxed">
            Do you have income from a business or a professional service? Freelancers, Professionals or Platform income is also considered under this section.<br/>
            <span className='text-black font-medium'> Note:</span>Intraday trading and F&O trading is also considered as business income.
          </p>

          <div className="flex justify-center mt-6">
            <Button variant="brand" className="px-8 py-3 rounded font-poppins font-medium shadow-sm hover:opacity-90">
              Add Income from Business
            </Button>
          </div> 
        </div>
      )}
    </>
  );
}
