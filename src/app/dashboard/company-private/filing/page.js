"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Stepper1 from '@/components/ui/steper1';
import Footer2 from '@/components/layout/Footer2';
import { FaSearch } from 'react-icons/fa';
import { FiTrash2 } from 'react-icons/fi';
import Image from 'next/image';
import Button from '@/components/ui/Button';
import FormSection from '@/components/ui/FormSection';
import FloatingInput from '@/components/ui/FloatingInput';
import { MdAccountBalance, MdInfoOutline, MdPerson, MdSummarize, MdFileDownload } from 'react-icons/md';

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
  { id: 'bank', label: 'Bank Info' },
  { id: 'more', label: 'More Info' },
  { id: 'efiling', label: 'E-Filing' },
];

const CompanyPrivateFiling = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('bank');

  const handleNextTab = () => {
    const currentIndex = subTabs.findIndex(t => t.id === activeTab);
    if (currentIndex < subTabs.length - 1) {
      setActiveTab(subTabs[currentIndex + 1].id);
    } else {
      // Done with the flow, redirect to dashboard home or success
      router.push('/dashboard');
    }
  };

  return (
    <div className="w-full min-h-screen bg-[#F8F9FC]">
      <div className="w-full flex justify-center pt-8 pb-4">
        <Stepper1 currentStep={5} customSteps={mainSteps} />
      </div>

      {/* Sub Tabs Navigation */}
      <div className="w-full flex justify-center">
        <div className="flex gap-14 max-w-[1000px] w-full px-4 overflow-x-auto">
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

          {/* Custom Rendering for A. BANK INFO */}
          {activeTab === 'bank' && (
            <div className="flex flex-col gap-6">
              <h2 className="font-poppins text-black text-[18px] font-semibold">Additional Information needed for Income Tax Return</h2>

              {/* Section 1 */}
              <FormSection
                title="Add all your Bank Accounts"
                description="Please provide the details of all bank account held during the year, except dormant account.   In case of multiple accounts. First account will be selected as eligible for refund."
                icon={MdAccountBalance}
                defaultExpanded={true}
              >
                <div className="flex flex-col gap-6 mt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
                    <FloatingInput label="Bank A/C Number" name="bankAcNumber" />
                    <div className="relative w-full max-w-[400px]">
                      <FloatingInput label="IFSC Code" name="ifscCode" />
                      <div className="absolute right-4 top-[18px] cursor-pointer text-gray-400">
                        <FaSearch size={18} />
                      </div>
                    </div>

                    <FloatingInput label="Bank Name" name="bankName" />
                    <FloatingInput label="Branch Name" name="branchName" />

                    <FloatingInput label="Account Type" name="accountType" as="select">
                      <option>Current Account</option>
                      <option>Savings Account</option>
                    </FloatingInput>

                    <div className="flex items-center justify-center h-[56px]">
                      <button className="flex items-center justify-center text-[#E57373] hover:text-red-600">
                        <FiTrash2 size={24} /> 
                      </button>
                    </div>
                  </div>

                  <div className="mt-2"> 
                    <Button variant="brand" className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none">
                      Add a Bank Account
                    </Button>
                  </div>
                </div>
              </FormSection>

              {/* Section 2 */}
              <FormSection
                title="Additional Information needed for Income Tax Return"
                description="Add details in following sections if applicable. Else click Go to Next "
                icon={MdInfoOutline}
                defaultExpanded={true} 
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start mt-4">
                  <FloatingInput
                    label="Mobile Phone number (secondary)"
                    name="secondaryMobile"
                    defaultValue="91"
                    helperText="Country Code Mobile Number"
                  />
                  <FloatingInput
                    label="STD code"
                    name="stdCode"
                    helperText="Type in only STD code (like 011)"
                  />
                  <FloatingInput
                    label="Landline Telephone number"
                    name="landlineNumber"
                    helperText="Leave empty if you don't have a Landline"
                  />
                </div>
              </FormSection> 

              <div className="mt-4 mb-2">
                <Button variant="brand" className="px-8 py-2.5 h-auto text-md font-medium rounded text-white border-none">
                  Save
                </Button>
              </div>
            </div>
          )}

          {/* Custom Rendering for B. MORE INFO */}
          {activeTab === 'more' && (
            <div className="flex flex-col gap-6 bg-white p-8 border border-gray-200">
              <div className="flex justify-between items-start mb-2">
                <h2 className="font-poppins text-black text-[20px] font-semibold leading-5">[Optional] Advanced Info, required only in a few cases</h2>
                <Button variant='brand' onClick={handleNextTab} className="px-6 py-2 text-white rounded font-poppins font-medium text-md">
                  Go To Next
                </Button>
              </div>

              <div className="font-poppins text-md text-gray-600 leading-relaxed">
                <p className="mb-4">
                  These sections are not required in most cases.<br />
                  If any of these details are applicable for you, enter the details below. Else click "Go to Next &gt;&gt;".
                </p>
                <p className="mb-4">Are any of these following applicable to you? If not, you can just skip this section.</p>

                <ul className="list-disc pl-6 space-y-2 mb-8">
                  <li>You are a NRI or have spent time outside India.</li>
                  <li>You own shares of an Unlisted company (shares that are not listed on any stock exchange).</li>
                  <li>You are a resident and have Foreign Assets or Income or you have paid taxes outside India.</li>
                  <li>You have deposited more than ₹1 crore in one or more current accounts, during the previous year.</li>
                  <li>You have incurred expenditure of more than ₹1 Lakh on electricity consumption or more than ₹2 lakhs on foreign country travel, during the previous year.</li>
                </ul>

                <div className="flex gap-4">
                  <Button variant='brand' className="px-6 py-2 text-white rounded font-poppins font-medium text-md">
                    Yes, one of these conditions applies to me
                  </Button>
                  <Button variant='brand' onClick={handleNextTab} className="px-6 py-2 text-white rounded font-poppins font-medium text-md">
                    Go To Next
                  </Button>
                </div>
              </div>
            </div>
          )}
          {/* Custom Rendering for C. E-FILING */}
          {activeTab === 'efiling' && (
            <div className="flex flex-col gap-6">

              {/* Personal Information */}
              <FormSection
                title="Personal Information"
                description="Add details in following sections if applicable. Else click Go to Next"
                icon={MdPerson}
                defaultExpanded={true}
                hideArrow={true}
                alwaysOpen={true}
              >
                <div className="pt-2">
                  <table className="w-full text-sm font-poppins text-left">
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-light-gray text-md font-poppins font-medium">Name</td>
                        <td className="py-3 text-right text-black text-md font-poppins font-medium"></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-light-gray text-md font-poppins font-medium">Date of Birth</td>
                        <td className="py-3 text-right text-black text-md font-poppins font-medium"></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-light-gray text-md font-poppins font-medium">PAN</td>
                        <td className="py-3 text-right text-black text-md font-poppins font-medium"></td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-light-gray text-md font-poppins font-medium">Assessment Year</td>
                        <td className="py-3 text-right text-black text-md font-poppins font-medium">2026-2027</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-light-gray text-md font-poppins font-medium">Status of Return</td>
                        <td className="py-3 text-right text-black text-md font-poppins font-medium">Original</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-3 text-light-gray text-md font-poppins font-medium">Residential Status</td>
                        <td className="py-3 text-right text-black text-md font-poppins font-medium">Resident</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </FormSection>

              {/* Summary of Income */}
              <FormSection
                title="Summary of Income, Deductions and Taxes (ITR5)"
                description="Add details in following sections if applicable. Else click Go to Next"
                icon={MdSummarize}
                hideArrow={true}
                defaultExpanded={true} 
                alwaysOpen={true}
              >
                <div className="pt-2">
                  <table className="w-full text-sm font-poppins text-left">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="py-3 text-black   font-semibold w-1/2 uppercase tracking-wide">Particulars</th>
                        <th className="py-3 text-right text-brand-blue font-medium w-1/2 bg-brand-blue/10 pr-4 rounded-tr-md">
                          <div className="flex flex-col items-end">
                            <span>CURRENT AY 2026-27</span>
                            <span className="text-xs cursor-pointer hover:underline font-normal">View Report (ITR5)</span>
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 text-light-gray text-md font-poppins font-semibold">Gross Total Income <span className="ml-16 font-medium">(A)</span></td>
                        <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">Rs. 0</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 text-light-gray text-md font-poppins font-semibold">Total Income <span className="ml-24 font-medium">(B)</span></td>
                        <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">Rs. 0</td>
                      </tr>
                      <tr className="border-b border-gray-200">
                        <td className="py-4 text-light-gray text-md font-poppins font-semibold">Tax Due <span className="ml-28 font-medium">(C)</span></td>
                        <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4 rounded-br-md">Rs. 0</td>
                      </tr>
                    </tbody>
                  </table>
                  <p className="font-poppins font-normal text-md leading-5 text-light-gray mt-4">
                    (Some values have been rounded to the nearest multiple of 10 as per Sections 288A & 288B of the Income Tax Act)
                  </p>
                </div>
              </FormSection>

              {/* Word Report */}
              <FormSection
                title="Download Detailed Report"
                description="Please review your income, Deductions and Income Tax carefully. Check the Word Report below."
                icon={MdFileDownload}
                defaultExpanded={true}
                alwaysOpen={true} 
                hideArrow={true} 
              >
                <div className="pt-4 flex flex-col items-start">
                  <div className="flex flex-col items-center gap-2 cursor-pointer border border-[#3867D6] p-6 rounded-lg hover:bg-[#F8F9FC] transition-colors w-fit">
                    {/* Fake word icon using div and text */}
                    <div className="w-14 h-16 bg-blue-50 rounded border-2 border-[#3867D6] flex items-center justify-center shadow-sm">
                      <span className="text-[#3867D6] font-bold text-2xl">W</span>
                    </div>
                    <span className="text-sm text-[#3867D6] font-poppins font-medium mt-2">Download Word Report</span>
                  </div>
                </div>
              </FormSection>

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

export default CompanyPrivateFiling;
