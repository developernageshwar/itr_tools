"use client";

import React from 'react';
import Button from '@/components/ui/Button';
import FormSection from '@/components/ui/FormSection';
import { FiUpload } from 'react-icons/fi';
import { MdPayments, MdHomeWork, MdReceipt, MdOutlineDescription, MdDateRange } from 'react-icons/md';
import DynamicFilingStep from '@/components/forms/DynamicFilingStep';

export default function TaxesStep({ filingType, activeTab, handleNextTab }) {
  if (filingType !== 'Individual') {
    return (
      <DynamicFilingStep
        filingType={filingType}
        step="taxes"
        activeTab={activeTab}
        handleNextTab={handleNextTab}
      />
    );
  }

  return (
    <>
      {/* Custom Rendering for A. AIS */}
      {activeTab === 'ais' && (
        <div className="flex flex-col gap-6  p-8">
          <h2 className="font-poppins text-black text-[20px] font-semibold leading-5">Import AIS Document</h2>

          <div className="flex flex-col gap-8">
            <p className="font-poppins text-md text-gray-600 leading-relaxed">
              For importing your AIS data, you need to specify <br />
              both Date of Birth and PAN Number.
            </p>

            <div>
              <Button variant='brand' className="px-6 py-2.5 text-white rounded font-poppins font-medium">
                Click here to go specify your PAN number and Date of Birth
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Custom Rendering for B. TDS */}
      {activeTab === 'tds' && (
        <div className="flex flex-col gap-6 bg-white border border-gray-200 p-8 rounded-[8px]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-poppins text-black text-[20px] font-semibold leading-5">Taxes Deducted/Collected at Source</h2>
            <div className="flex items-center gap-4">
              <span className="text-md font-poppins text-gray-600">Do not have any TDS/TCS entries?</span>
              <Button variant='brand' onClick={handleNextTab} className="px-6 py-2 text-white rounded font-poppins font-medium text-md">
                Go To Next
              </Button>
            </div>
          </div>

          <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">
            Specify TDS/TCS which was deducted between the period of April 1, 2025 to March 31, 2026.
          </p>

          <div className="bg-[#FFF9E6] border border-[#FFE082] text-black font-poppins font-medium  text-md p-4 rounded mt-2">
            Do you have a Form 26AS? <span className="text-brand-blue cursor-pointer hover:underline">Click here to upload your Form 26AS and avoid manual entry.</span>
          </div>

          <div className="flex justify-between items-center mt-2 mb-4">
            <Button variant='brand'
              className="px-6 py-2 text-white rounded font-poppins font-medium text-md">
              Upload File
            </Button>
            <span className="flex items-center gap-2 text-brand-blue font-poppins text-md cursor-pointer font-medium hover:underline">
              <FiUpload size={20} /> Export All Data
            </span>
          </div>

          {/* TDS Sections */}
          <div className="flex flex-col gap-6 max-w-[1000px]">
            <FormSection
              title="Non Salary TDS"
              description="In this section, add TDS entries on interest income, professional or consulting income, etc. (Other than TDS on Salary and Sale of Immovable Property)."
              icon={MdPayments}
              hideArrow={true}
              rightAction={
                <Button variant="brand" className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none">
                  Add Entry
                </Button>
              }
            >
            </FormSection>

            <FormSection
              title="TDS on Sale/Rent of Immovable Property"
              description="If you sell/rent land, house property or building etc (immovable property) etc, the buyer/tenant may have deducted TDS at the rate of 1% on the sale price of the property/rental and issued you a TDS certificate. You need to specify those TDS deduction details here."
              icon={MdHomeWork}
              hideArrow={true}
              rightAction={
                <Button variant="brand" className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none">
                  Add Entry
                </Button>
              }
            >
            </FormSection>

            <FormSection
              title="Taxes Collected at Source (TCS)"
              description="In this section, you can add TCS entries (For example - on purchase of cars)."
              icon={MdReceipt}
              hideArrow={true}
              rightAction={
                <Button variant="brand" className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none">
                  Add Entry
                </Button>
              }
            >
            </FormSection>
          </div>
        </div>
      )}

      {/* Custom Rendering for C. SELF TAX PAYMENTS */}
      {activeTab === 'self' && (
        <div className="flex flex-col gap-6 bg-white border border-gray-200 p-8 rounded-[8px]">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-poppins text-black text-[18px] font-semibold">Summary of Taxes Paid: Advance Tax and Self Assessment Tax</h2>
          </div>

          <div className="flex flex-col items-center gap-4 mt-2 mb-6">
            <div className="flex justify-center items-center gap-4">
              <p className="font-poppins text-black text-[18px] font-semibold">Would you like to add entry on Taxes Paid?</p>
              <Button variant='brand' onClick={handleNextTab} className="px-6 py-2  rounded font-poppins font-medium text-md">
                Go To Next
              </Button>
            </div>
          </div>

          <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">
            Add entries here if you voluntarily deposited taxes to the government.
            <span className="text-black font-medium"> Note:</span>This is separate from TDS. This is tax you deposited to the government via Challan 280.
          </p>

          <div className="flex justify-between items-center mb-6">
            <div className="flex gap-4">
              <Button variant="brand" className="px-6 py-2 text-white rounded font-poppins font-medium text-md">
                Add Entry
              </Button>
              <Button variant="brand" className="px-6 py-2 text-white rounded font-poppins font-medium text-md">
                Upload File
              </Button>
            </div>
            <div className="flex items-center gap-6">
              <button className="flex items-center gap-2 text-brand-blue font-poppins text-md font-semibold hover:underline">
                <FiUpload size={18} /> Export All Data
              </button>
              <Button variant="danger" className="px-6 py-2 text-white rounded font-poppins font-medium text-md">
                Delete All
              </Button>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <p className="font-poppins text-black text-[18px] font-semibold">You haven't added any Taxes paid entries.</p>
          </div>
        </div>
      )}

      {/* Custom Rendering for D. LOSS SUMMARY */}
      {activeTab === 'loss' && (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-poppins text-black text-[18px] font-semibold">Details of Brought Forward Losses</h2>
            <Button variant="brand" onClick={handleNextTab} className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none text-md">
              Go To Next
            </Button>
          </div>

          <div className="bg-[#EAF5EA] text-[#4CAF50] font-poppins text-md font-medium p-4 rounded-lg flex items-center gap-2 border border-[#C8E6C9] mb-4">
            <span className="text-lg">✓</span> Everything looks cool
          </div>

          {/* Section 1 */} 
          <FormSection
            title="Details of Previous Years' Losses"
            description="Add any losses from the previous years to set off against the income for AY 2026-2027."
            icon={MdOutlineDescription}
            hideArrow={true}
            defaultExpanded={false}
            rightAction={
              <Button variant="brand" className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none">
                Add Previous Year Loss
              </Button> 
            }
          >
          </FormSection>

          {/* Section 2 */}
          <FormSection
            title="Depreciation Loss from Previous Years"
            description="Add any Depreciation losses from the previous years to set off against the income for AY 2026-2027."
            icon={MdOutlineDescription}
            hideArrow={true}
            defaultExpanded={false}
            rightAction={
              <Button variant="brand" className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none">
                Add Previous Year Depreciation Loss
              </Button>
            }
          >
          </FormSection>

          {/* Section 3 */}
          <FormSection
            title="Filing and Due Dates for Loss Set-off in Previous Years" 
            description="Add any losses from the previous years to set off against the income for AY 2026-2027."
            icon={MdDateRange}
            defaultExpanded={true} 
            rightAction={
              <Button variant="brand" className="px-6 py-2 h-auto text-md font-medium rounded text-white border-none">
                Edit Dates
              </Button>
            }
          >
            <div className="pt-2">
              <table className="w-full text-left font-poppins text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="pb-3 font-medium text-base text-light-gray pl-2">Assessment Year</th>
                    <th className="pb-3 font-medium text-base text-light-gray">Due Date</th>
                    <th className="pb-3 font-medium text-base text-light-gray">Filing Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-gray-100"><td className="py-2 px-2">2025-2026</td><td className="py-2">31/07/2025</td><td></td></tr>
                  <tr><td className="py-2 px-2">2024-2025</td><td className="py-2">31/07/2024</td><td></td></tr>
                  <tr className="bg-gray-100"><td className="py-2 px-2">2023-2024</td><td className="py-2">31/07/2023</td><td></td></tr>
                  <tr><td className="py-2 px-2">2022-2023</td><td className="py-2">31/07/2022</td><td></td></tr>
                  <tr className="bg-gray-100"><td className="py-2 px-2">2021-2022</td><td className="py-2">31/12/2021</td><td></td></tr>
                  <tr><td className="py-2 px-2">2020-2021</td><td className="py-2">10/01/2021</td><td></td></tr>
                  <tr className="bg-[#F8F9FA]"><td className="py-2 px-2">2019-2020</td><td className="py-2">31/08/2019</td><td></td></tr>
                  <tr><td className="py-2 px-2">2018-2019</td><td className="py-2">31/08/2018</td><td></td></tr>
                </tbody>
              </table>
            </div>
          </FormSection>

          <div className="mt-4 mb-2">
            <Button variant="brand" className="px-8 py-2.5 h-auto text-md font-medium rounded text-white border-none">
              Save
            </Button> 
          </div>
        </div>
      )}
    </>
  );
}
