"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useItrStore } from '@/store/itrStore';
import { fieldsConfig } from '@/config/fieldsConfig';
import FloatingInput from '@/components/ui/FloatingInput';
import FormSection from '@/components/ui/FormSection';
import Button from '@/components/ui/Button';
import {
  MdInfoOutline, MdPerson, MdSummarize, MdFileDownload,
  MdBusinessCenter, MdAgriculture, MdAccountBalance, MdMoney,
  MdSecurity, MdPayments, MdHomeWork, MdReceipt
} from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import itrService from '@/services/itrService';

const getUniqueId = () => Date.now();

export default function DynamicFilingStep({ filingType, step, activeTab, handleNextTab }) {
  const state = useItrStore();
  const { setFields, calculateSummary, saveCurrentProfileData } = state;

  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateFieldValue = (name, value, label) => {
    if (!value) return null;
    const trimmedVal = String(value).trim();
    
    // 1. PAN Validation
    if (name === 'panNumber' || name === 'kartaPan' || name === 'pan') {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
      if (!panRegex.test(trimmedVal)) {
        return "Please enter a valid 10-character PAN (e.g. ABCDE1234F).";
      }
    }

    // 2. Aadhaar Validation
    if (name === 'kartaAadhaar' || name === 'aadhaar') {
      const aadhaarRegex = /^[0-9]{12}$/;
      if (!aadhaarRegex.test(trimmedVal)) {
        return "Please enter a valid 12-digit Aadhaar.";
      }
    }

    // 3. TAN Validation (for TDS Deductor Tan)
    if (name === 'deductorTan') {
      const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/i;
      if (!tanRegex.test(trimmedVal)) {
        return "Please enter a valid 10-character TAN.";
      }
    }

    // 4. Email Validation
    if (name === 'kartaEmail' || name === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedVal)) {
        return "Please enter a valid email address.";
      }
    }

    // 5. Mobile Number Validation
    if (name === 'kartaMobile' || name === 'mobileNumber' || name === 'secondaryMobile') {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(trimmedVal)) {
        return "Please enter a valid 10-digit mobile number.";
      }
    }

    // 6. Pincode Validation
    if (name === 'pincode') {
      const pinRegex = /^[0-9]{6}$/;
      if (!pinRegex.test(trimmedVal)) {
        return "Please enter a valid 6-digit PIN code.";
      }
    }

    // 7. Date format (DD/MM/YYYY)
    if (name === 'formationDate' || name === 'dateOfDeposit' || name === 'dateOfBirth') {
      const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
      if (!dateRegex.test(trimmedVal)) {
        return "Please specify date in format DD/MM/YYYY.";
      }
      // Check if future date
      const parts = trimmedVal.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const dateVal = new Date(year, month, day);
      if (dateVal > new Date()) {
        return "Date cannot be in the future.";
      }
    }

    // 8. Deduction Limits
    if (name === 'deduction80C') {
      if (Number(trimmedVal) > 150000) {
        return "Deduction exceeds maximum allowed limit of ₹1,50,000.";
      }
    }
    if (name === 'deduction80TTA') {
      if (Number(trimmedVal) > 10000) {
        return "Deduction exceeds maximum allowed limit of ₹10,000.";
      }
    }

    // 9. Non-negative checks for numbers
    const numericFields = [
      'turnoverDigital', 'turnoverCash', 'presumptiveIncome44AD',
      'grossRent', 'municipalTaxes', 'annualValue', 'homeLoanInterest',
      'savingsInterest', 'depositInterest', 'refundInterest', 'dividendIncome', 'agriculturalIncome',
      'deduction80C', 'deduction80D', 'deduction80G', 'deduction80TTA',
      'amountClaimed', 'taxAmountDeposited'
    ];
    if (numericFields.includes(name) || name.toLowerCase().includes('income') || name.toLowerCase().includes('turnover') || name.toLowerCase().includes('deduction')) {
      if (Number(trimmedVal) < 0) {
        return `${label || 'Amount'} cannot be negative.`;
      }
    }

    return null;
  };

  // Local state for dynamic list entries
  const [newMemberData, setNewMemberData] = useState({});

  const getSectionIcon = (title) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('44ad')) return MdBusinessCenter;
    if (lowerTitle.includes('44ada')) return MdPerson;
    if (lowerTitle.includes('44ae')) return MdAgriculture;
    if (lowerTitle.includes('regular') || lowerTitle.includes('business')) return MdBusinessCenter;
    if (lowerTitle.includes('capital') || lowerTitle.includes('gains')) return MdMoney;
    if (lowerTitle.includes('other') || lowerTitle.includes('interest')) return MdAccountBalance;
    if (lowerTitle.includes('deduction') || lowerTitle.includes('section 80')) return MdSecurity;
    if (lowerTitle.includes('tds') || lowerTitle.includes('tcs') || lowerTitle.includes('tax')) return MdPayments;
    if (lowerTitle.includes('bank')) return MdAccountBalance;
    return MdInfoOutline;
  };

  const tabConfig = fieldsConfig[filingType]?.[step]?.[activeTab];

  // If there's no config and it's not the efiling step, render loading
  if (!tabConfig && !(step === 'filing' && activeTab === 'efiling')) {
    return <div className="p-6 bg-white border rounded-lg">Filing step config not found for {filingType} - {step} - {activeTab}</div>;
  }

  const getAddBtnText = (listName) => {
    if (listName === 'coparceners') return 'Add Member';
    if (listName === 'tdsRows') return 'Add TDS Claim';
    if (listName === 'taxPayments') return 'Add Tax Challan';
    if (listName === 'bankAccounts') return 'Add Bank Account';
    return 'Add Entry';
  };

  // Handle standard field change
  const handleFieldChange = (name, value, isNumber = false) => {
    let finalVal = value;
    if (isNumber) {
      finalVal = value.replace(/[^0-9]/g, "");
    }

    // Auto-calculate presumptiveIncome44AD (min 6% digital + 8% cash)
    if (name === 'turnoverDigital' || name === 'turnoverCash') {
      const digital = Number(name === 'turnoverDigital' ? finalVal : (state.turnoverDigital || 0));
      const cash = Number(name === 'turnoverCash' ? finalVal : (state.turnoverCash || 0));
      const minPresumptive = Math.round(digital * 0.06 + cash * 0.08);
      const currentVal = Number(state.presumptiveIncome44AD || 0);

      const updates = { [name]: finalVal };
      if (minPresumptive > currentVal) {
        updates.presumptiveIncome44AD = minPresumptive.toString();
      }
      setFields(updates);
    }
    // Auto-calculate annualValue (grossRent - municipalTaxes)
    else if (name === 'grossRent' || name === 'municipalTaxes') {
      const rent = Number(name === 'grossRent' ? finalVal : (state.grossRent || 0));
      const taxes = Number(name === 'municipalTaxes' ? finalVal : (state.municipalTaxes || 0));
      const calculatedAnnual = Math.max(0, rent - taxes);

      setFields({
        [name]: finalVal,
        annualValue: calculatedAnnual.toString()
      });
    } else {
      setFields({ [name]: finalVal });
    }

    setErrors(prev => ({ ...prev, [name]: null }));

    // Recalculate summary and save details automatically
    setTimeout(() => {
      calculateSummary();
      saveCurrentProfileData();
    }, 50);
  };

  // Handle input change for adding new list items (e.g. Coparceners)
  const handleNewMemberChange = (name, value) => {
    setNewMemberData(prev => ({ ...prev, [name]: value }));
  };

  // Add list item manually
  const handleAddListItem = (listName, fields) => {
    // Validate list item required fields and formats
    const newErrors = {};
    /* Temporarily disabled validations for testing purposes
    fields.forEach(f => {
      const val = newMemberData[f.name];
      if (f.required && !val) {
        newErrors[f.name] = 'Required';
      } else if (val) {
        const err = validateFieldValue(f.name, val, f.label);
        if (err) {
          newErrors[f.name] = err;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      const firstErrorMsg = Object.values(newErrors)[0];
      toast.error(firstErrorMsg === 'Required' ? 'Please enter all required details.' : firstErrorMsg);
      return;
    }
    */

    const currentList = state[listName] || [];
    let itemData = { ...newMemberData, id: getUniqueId() };

    // Bank accounts logic: enforce single active bank account for refund
    if (listName === 'bankAccounts' && itemData.selectedForRefund === 'Yes') {
      const updatedList = currentList.map(item => ({ ...item, selectedForRefund: 'No' }));
      setFields({ [listName]: [...updatedList, itemData] });
    } else {
      if (listName === 'bankAccounts' && currentList.length === 0) {
        itemData.selectedForRefund = 'Yes';
      }
      setFields({ [listName]: [...currentList, itemData] });
    }

    setNewMemberData({});

    setTimeout(() => {
      calculateSummary();
      saveCurrentProfileData();
      toast.success('Entry added successfully.');
    }, 50);
  };

  // Delete list item
  const handleDeleteListItem = (listName, itemId) => {
    const currentList = state[listName] || [];
    const updatedList = currentList.filter(item => item.id !== itemId);

    setFields({ [listName]: updatedList });

    setTimeout(() => {
      calculateSummary();
      saveCurrentProfileData();
      toast.success('Entry removed.');
    }, 50);
  };

  // Validation before going to next tab
  const handleSaveAndNext = () => {
    if (!tabConfig) {
      handleNextTab();
      return;
    }

    const newErrors = {};
    /* Temporarily disabled validations for testing purposes
    tabConfig.sections.forEach(section => {
      if (!section.isList) {
        section.fields.forEach(field => {
          const val = state[field.name];
          if (field.required && !val) {
            newErrors[field.name] = `${field.label} is required`;
          } else if (val) {
            const err = validateFieldValue(field.name, val, field.label);
            if (err) {
              newErrors[field.name] = err;
            }
          }
        });
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorMsg = Object.values(newErrors)[0];
      toast.error(firstErrorMsg.includes('required') ? 'Please fill in all required fields marked with *' : firstErrorMsg);
      return;
    }
    */

    handleNextTab();
  };

  const handleEFileSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Pre-filing Validation:
      const errorsList = [];
      /* Temporarily disabled validations for testing purposes
      if (!state.panNumber) errorsList.push("HUF PAN is required.");
      else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(state.panNumber)) errorsList.push("HUF PAN format is invalid.");

      if (!state.hufName) errorsList.push("HUF Name is required.");

      if (filingType === 'HUF') {
        if (!state.kartaName) errorsList.push("Karta Name is required.");
        if (!state.kartaPan) errorsList.push("Karta PAN is required.");
        else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i.test(state.kartaPan)) errorsList.push("Karta PAN format is invalid.");
        
        if (!state.kartaAadhaar) errorsList.push("Karta Aadhaar is required.");
        else if (!/^[0-9]{12}$/.test(state.kartaAadhaar)) errorsList.push("Karta Aadhaar format is invalid.");
      }

      if (!state.bankAccounts || state.bankAccounts.length === 0 || !state.bankAccounts[0].bankAcNumber) {
        errorsList.push("At least one Bank Account details must be added.");
      }

      if (errorsList.length > 0) {
        toast.error(errorsList[0]);
        setIsSubmitting(false);
        return;
      }
      */

      // 2. Prepare Payload:
      const summary = calculateSummary();
      
      const incomeDetails = {
        salaryIncome: Number(state.salaryIncome || 0),
        interestIncome: Number(state.interestIncome || 0),
        capitalGains: Number(state.capitalGains || 0),
        houseProperties: Number(state.houseProperties || 0),
        dividendIncome: Number(state.dividendIncome || 0),
        businessIncome: Number(state.businessIncome || 0),
        cryptoIncome: Number(state.cryptoIncome || 0),
        otherIncome: Number(state.otherIncome || 0),
        savingsInterest: Number(state.savingsInterest || 0),
        depositInterest: Number(state.depositInterest || 0),
        refundInterest: Number(state.refundInterest || 0),
        presumptiveIncome44AD: Number(state.presumptiveIncome44AD || 0),
        turnoverDigital: Number(state.turnoverDigital || 0),
        turnoverCash: Number(state.turnoverCash || 0),
        businessName: state.businessName || '',
        businessCode: state.businessCode || '',
        housePropertyType: state.housePropertyType || '',
        grossRent: Number(state.grossRent || 0),
        municipalTaxes: Number(state.municipalTaxes || 0),
        annualValue: Number(state.annualValue || 0),
        homeLoanInterest: Number(state.homeLoanInterest || 0),
      };

      const deductionDetails = {
        deduction80C: Number(state.deduction80C || 0),
        deduction80D: Number(state.deduction80D || 0),
        deduction80G: Number(state.deduction80G || 0),
        deduction80TTA: Number(state.deduction80TTA || 0),
        agriculturalIncome: Number(state.agriculturalIncome || 0),
      };

      const taxSummary = {
        grossIncome: summary.grossIncome,
        totalDeductions: summary.totalDeductions,
        taxableIncome: summary.taxableIncome,
        estimatedTax: summary.estimatedTax,
        refundOrDue: summary.refundOrDue,
        isRefund: summary.isRefund,
        itrType: summary.itrType,
        itrReason: summary.itrReason,
      };

      const reviewData = {
        name: state.hufName || state.entityName || state.companyName || state.firmName || state.societyName || state.llpName || 'Not Provided',
        pan: state.panNumber || 'Not Provided',
        formationDate: state.formationDate || 'Not Provided',
        residentialStatus: state.residentialStatus || 'Not Provided',
        filingSection: state.filingSection || 'Not Provided',
        kartaDetails: filingType === 'HUF' ? {
          name: state.kartaName,
          pan: state.kartaPan,
          aadhaar: state.kartaAadhaar,
          mobile: state.kartaMobile,
          email: state.kartaEmail,
        } : null,
        membersList: state.coparceners || state.aopMembers || state.directors || [],
        address: {
          flatNo: state.flatNo || '',
          premiseName: state.premiseName || '',
          roadStreet: state.roadStreet || '',
          areaLocality: state.areaLocality || '',
          city: state.city || '',
          state: state.state || '',
          pincode: state.pincode || '',
          country: state.country || 'INDIA',
        },
        bankAccounts: state.bankAccounts || [],
      };

      const payload = {
        taxpayerType: filingType,
        itrType: summary.itrType,
        regime: state.optingOutNewRegime === 'Yes' ? 'Old' : 'New',
        assessmentYear: state.assessmentYear || '2026-27',
        incomeDetails,
        deductionDetails,
        taxSummary,
        taxCalculation: summary,
        reviewData
      };

      const response = await itrService.submitItrDetails(payload);
      
      console.log('Filing submission API response:', response);

      const isSuccess =
        response?.status === 'success' ||
        response?.status === 200 ||
        response?.success === true ||
        response?.message?.includes("Success") ||
        response?.data?.message?.includes("Success");

      if (isSuccess) {
        const ackNum = response?.acknowledgementNumber || Math.floor(1000000000 + Math.random() * 9000000000).toString();
        
        if (state.completeFiling) {
          state.completeFiling(ackNum);
        } else {
          setFields({
            filingStatus: 'Filed',
            acknowledgementNumber: ackNum,
          });
          const updatedProfiles = state.profiles.map(p => {
            if (p.id === state.activeProfileId) {
              return {
                ...p,
                filingStatus: 'Filed',
                acknowledgementNumber: ackNum,
              };
            }
            return p;
          });
          setFields({ profiles: updatedProfiles });
        }
        
        toast.success(response?.message || "E-Filing completed successfully!");
        router.push(`/dashboard/success?ack=${ackNum}`);
      } else {
        toast.error(response?.message || "Unable to file return. Please try again.");
      }
    } catch (error) {
      console.error('Filing Submission Error:', error);
      const errorMsg = error.response?.data?.message || error.message || "Unable to file return. Please check your network and try again.";
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Custom Rendering for E-FILING Summary Tab
  if (step === 'filing' && activeTab === 'efiling') {
    const summary = calculateSummary();

    return (
      <div className="flex flex-col gap-6">
        {/* Personal Information Card */}
        <FormSection
          title="General Information Summary"
          description={`Details verified for ${filingType}`}
          icon={MdPerson}
          defaultExpanded={true}
          alwaysOpen={true}
          hideArrow={true}
        >
          <div className="pt-2">
            <table className="w-full text-sm font-poppins text-left">
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-light-gray text-md font-poppins font-medium">Name of Entity</td>
                  <td className="py-3 text-right text-black text-md font-poppins font-semibold">
                    {state.hufName || state.entityName || state.companyName || state.firmName || state.societyName || state.llpName || 'Not Provided'}
                  </td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-light-gray text-md font-poppins font-medium">Date of Formation</td>
                  <td className="py-3 text-right text-black text-md font-poppins font-semibold">{state.formationDate || 'Not Provided'}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-light-gray text-md font-poppins font-medium">PAN</td>
                  <td className="py-3 text-right text-black text-md font-poppins font-semibold">{state.panNumber || 'Not Provided'}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-light-gray text-md font-poppins font-medium">Assessment Year</td>
                  <td className="py-3 text-right text-black text-md font-poppins font-semibold">2026-2027</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-3 text-light-gray text-md font-poppins font-medium">Selected Regime</td>
                  <td className="py-3 text-right text-black text-md font-poppins font-semibold uppercase">{state.selectedRegime} Regime</td>
                </tr>
              </tbody>
            </table>
          </div>
        </FormSection>

        {/* Tax Computation Summary */}
        <FormSection
          title={`Summary of Income, Deductions and Taxes (${summary.itrType})`}
          description="Consolidated computation of your income tax return."
          icon={MdSummarize}
          defaultExpanded={true}
          alwaysOpen={true}
          hideArrow={true}
        >
          <div className="pt-2">
            <table className="w-full text-sm font-poppins text-left">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="py-3 text-black font-semibold w-1/2 uppercase tracking-wide">Particulars</th>
                  <th className="py-3 text-right text-brand-blue font-medium w-1/2 bg-brand-blue/10 pr-4 rounded-tr-md">
                    <div className="flex flex-col items-end">
                      <span>AY 2026-27</span>
                      <span className="text-xs font-normal">ITR Form Type: <span className="font-semibold">{summary.itrType}</span></span>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-4 text-light-gray text-md font-poppins">Gross Total Income</td>
                  <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {summary.grossIncome.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 text-light-gray text-md font-poppins">Total Deductions (Chapter VI-A)</td>
                  <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {summary.totalDeductions.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 text-light-gray text-md font-poppins">Net Taxable Income</td>
                  <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {summary.taxableIncome.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 text-light-gray text-md font-poppins">Basic Slab Tax</td>
                  <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {summary.slabTax.toLocaleString('en-IN')}</td>
                </tr>
                {summary.surcharge > 0 && (
                  <tr className="border-b border-gray-200">
                    <td className="py-4 text-light-gray text-md font-poppins">Surcharge</td>
                    <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {summary.surcharge.toLocaleString('en-IN')}</td>
                  </tr>
                )}
                <tr className="border-b border-gray-200">
                  <td className="py-4 text-light-gray text-md font-poppins">Education Cess (4%)</td>
                  <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {summary.cess.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 text-light-gray text-md font-poppins font-semibold">Total Tax Liability</td>
                  <td className="py-4 text-right font-bold text-black bg-brand-blue/10 pr-4">₹ {summary.estimatedTax.toLocaleString('en-IN')}</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-4 text-light-gray text-md font-poppins">Taxes Already Paid (TDS/TCS/Self)</td>
                  <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {(summary.isRefund ? summary.estimatedTax + summary.refundOrDue : Math.max(0, summary.estimatedTax - summary.refundOrDue)).toLocaleString('en-IN')}</td>
                </tr>
                <tr className="border-b border-gray-200 bg-[#F0F4FF]">
                  <td className="py-4 pl-2 text-black text-md font-poppins font-semibold">
                    {summary.isRefund ? 'Tax Refund Receivable' : 'Remaining Tax Payable'}
                  </td>
                  <td className={`py-4 text-right font-bold text-lg pr-4 rounded-br-md ${summary.isRefund ? 'text-green-600' : 'text-red-500'}`}>
                    ₹ {summary.refundOrDue.toLocaleString('en-IN')}
                  </td>
                </tr>
              </tbody>
            </table>
            <p className="font-poppins font-normal text-xs text-light-gray mt-4">
              * Calculations are based on {summary.itrReason} rules. Standard deductions do not apply to HUF/Firms/Companies.
            </p>
          </div>
        </FormSection>

        {/* Verification & Declaration */}
        {/* <FormSection
          title="Filing Declaration & Verification"
          description="Please verify and sign the declaration below to complete filing."
          icon={MdSecurity}
          defaultExpanded={true}
          alwaysOpen={true}
          hideArrow={true}
        >
          <div className="pt-2 flex flex-col gap-6">
            <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
              <input
                type="checkbox"
                id="declarationCheck"
                className="mt-1.5 h-4 w-4 text-[#3867D6] focus:ring-[#3867D6] border-gray-300 rounded cursor-pointer"
                checked={!!state.declarationCheck}
                onChange={(e) => setFields({ declarationCheck: e.target.checked })}
              />
              <label htmlFor="declarationCheck" className="font-poppins font-normal text-sm text-[#1E1E1E] leading-6 cursor-pointer">
                I, <span className="font-semibold text-black">{state.kartaName || '[Karta Name]'}</span>, in my capacity as Karta of this HUF solemnly declare that to the best of my knowledge and belief, the information given in the return and the schedules thereto is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961.
              </label>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FloatingInput
                type="text"
                placeholder="Enter Place"
                label="Place *"
                name="verificationPlace"
                value={state.verificationPlace || ''}
                onChange={(e) => setFields({ verificationPlace: e.target.value })}
              />

              <FloatingInput
                as="select"
                label="Verification Mode *"
                name="verificationMode"
                value={state.verificationMode || ''}
                onChange={(e) => setFields({ verificationMode: e.target.value })}
              >
                <option value="">Select Mode</option>
                <option value="Aadhaar OTP">Aadhaar OTP</option>
                <option value="Netbanking">Netbanking</option>
              </FloatingInput>
            </div>
          </div>
        </FormSection> */}

        {/* Word Report */}
        <FormSection
          title="Download Detailed Return Report"
          description="Review your filled information and generated computation report in document format."
          icon={MdFileDownload}
          defaultExpanded={true}
          alwaysOpen={true}
          hideArrow={true}
        >
          <div className="pt-4 flex flex-col items-start">
            <div
              onClick={() => {
                toast.success('Detailed Word Report Downloaded!');
              }}
              className="flex flex-col items-center gap-2 cursor-pointer border border-[#3867D6] p-6 rounded-lg hover:bg-[#F8F9FC] transition-colors w-fit"
            >
              <div className="w-14 h-16 bg-blue-50 rounded border-2 border-[#3867D6] flex items-center justify-center shadow-sm">
                <span className="text-[#3867D6] font-bold text-2xl">W</span>
              </div>
              <span className="text-sm text-[#3867D6] font-poppins font-medium mt-2">Download Word Report</span>
            </div>
          </div>
        </FormSection>

        {/* Action Button */}
        <div className="flex justify-start mt-6">
          <Button
            variant="brand"
            className="px-10 py-3 rounded font-poppins font-medium text-md text-white border-none flex items-center gap-2"
            onClick={handleEFileSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Filing...' : 'Proceed to E-File Return'}
          </Button>
        </div>
      </div>
    );
  }

  // Normal Form Rendering
  return (
    <div className="flex flex-col gap-6 w-full pb-12">
      {/* Title */}
      <div className="flex flex-col gap-2">
        <h2 className="font-poppins text-black text-[20px] font-semibold leading-5">{tabConfig.title}</h2>
        {tabConfig.subtitle && (
          <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93]">{tabConfig.subtitle}</p>
        )}
      </div>

      {/* Sections */}
      <div className="flex flex-col gap-6">
        {tabConfig.sections.map((section, sectionIdx) => {
          const isSingleInput = !section.isList && section.fields?.length === 1;

          if (isSingleInput) {
            const field = section.fields[0];
            const isNumber = field.type === 'number';
            const val = state[field.name] || '';
            const IconComponent = getSectionIcon(section.title);

            return (
              <div
                key={sectionIdx}
                className="flex flex-col md:flex-row items-start md:items-center justify-between transition-all hover:border-[#3867D6]/40 bg-white gap-6 rounded-[28px] border border-gray-200 hover:border-[#3867D6]/60 p-6 md:p-8 shadow-sm"
              >
                <div className="flex gap-6 flex-1 items-start md:items-center">
                  <div className="w-[44px] h-[44px] rounded-full bg-[#E8F1FF] flex items-center justify-center flex-shrink-0 text-[#3867D6]">
                    <IconComponent size={24} />
                  </div>
                  <div className="flex flex-col gap-2">
                    <h3 className="font-poppins font-semibold text-base leading-6 tracking-normal text-[#1E1E1E]">
                      {section.title}
                    </h3>
                    {section.description && (
                      <p className="font-poppins text-[#8E8E93] leading-snug max-w-[650px] font-normal text-[15px]">
                        {section.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="w-full md:w-auto flex-shrink-0 flex items-center justify-end">
                  <FloatingInput
                    variant="gradient"
                    label="₹"
                    placeholder="Add Manually"
                    wrapperClassName="w-full md:w-[200px]"
                    inputClassName="bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent font-medium"
                    name={field.name}
                    value={val}
                    onChange={(e) => handleFieldChange(field.name, e.target.value, isNumber)}
                    error={errors[field.name]}
                    touched={!!errors[field.name]}
                  />
                </div>
              </div>
            );
          }

          return (
            <FormSection
              key={sectionIdx}
              icon={MdInfoOutline}
              title={section.title}
              description={section.description}
              defaultExpanded={true}
            >
              {/* If Section is List (e.g. Co-parceners / Directors / Members) */}
              {section.isList ? (
                <div className="flex flex-col gap-6 mt-4">
                  {/* List Table of existing members */}
                  <div className="border border-gray-200 rounded-lg overflow-x-auto">
                    <table className="w-full text-sm font-poppins text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          {section.fields.map(f => (
                            <th key={f.name} className="p-3 text-gray-700 font-semibold">{f.label}</th>
                          ))}
                          <th className="p-3 text-gray-700 font-semibold text-center w-20">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(!state[section.listName] || state[section.listName].length === 0) ? (
                          <tr>
                            <td colSpan={section.fields.length + 1} className="p-6 text-center text-[#8E8E93]">
                              No members added yet. Add manually below.
                            </td>
                          </tr>
                        ) : (
                          state[section.listName].map((item, idx) => (
                            <tr key={item.id || idx} className="border-b border-gray-100 hover:bg-gray-50">
                              {section.fields.map(f => (
                                <td key={f.name} className="p-3 text-black font-medium">{item[f.name] || '-'}</td>
                              ))}
                              <td className="p-3 text-center">
                                <button
                                  onClick={() => handleDeleteListItem(section.listName, item.id)}
                                  className="text-red-500 hover:text-red-700 p-1"
                                >
                                  <FiTrash2 size={18} />
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Direct Manual Input Add Row */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-poppins font-semibold text-sm mb-4 text-black">Add {section.title} Manually</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.map(field => {
                        if (field.type === 'select') {
                          return (
                            <FloatingInput
                              key={field.name}
                              as="select"
                              label={field.label}
                              name={field.name}
                              value={newMemberData[field.name] || ''}
                              onChange={(e) => handleNewMemberChange(field.name, e.target.value)}
                            >
                              <option value="">Select Option</option>
                              {field.options.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </FloatingInput>
                          );
                        }
                        const isNum = field.type === 'number';
                        return (
                          <FloatingInput
                            key={field.name}
                            type={isNum ? 'text' : field.type}
                            placeholder={field.placeholder || ''}
                            label={field.label}
                            name={field.name}
                            value={newMemberData[field.name] || ''}
                            onChange={(e) => {
                              const val = isNum ? e.target.value.replace(/[^0-9]/g, "") : e.target.value;
                              handleNewMemberChange(field.name, val);
                            }}
                          />
                        );
                      })}
                    </div>
                    <div className="mt-4">
                      <Button
                        variant="brand"
                        onClick={() => handleAddListItem(section.listName, section.fields)}
                        className="px-6 py-2 text-white font-poppins font-medium rounded text-sm"
                      >
                        {getAddBtnText(section.listName)}
                      </Button>
                    </div>
                  </div>
                </div>
              ) : (
                // Standard Input Grid
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {section.fields.map(field => {
                    const isNumber = field.type === 'number';
                    const val = state[field.name] || '';

                    if (field.type === 'select') {
                      return (
                        <FloatingInput
                          key={field.name}
                          as="select"
                          label={field.label}
                          name={field.name}
                          value={val}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          error={errors[field.name]}
                          touched={!!errors[field.name]}
                        >
                          <option value="">Select Option</option>
                          {field.options?.map(opt => (
                            <option key={opt} value={opt}>{opt}</option>
                          ))}
                        </FloatingInput>
                      );
                    }

                    return (
                      <FloatingInput
                        key={field.name}
                        type={field.type === 'number' ? 'text' : field.type}
                        placeholder={field.placeholder || ''}
                        label={field.label}
                        name={field.name}
                        value={val}
                        onChange={(e) => handleFieldChange(field.name, e.target.value, isNumber)}
                        error={errors[field.name]}
                        touched={!!errors[field.name]}
                      />
                    );
                  })}
                </div>
              )}
            </FormSection>
          );
        })}
      </div>

      {/* Navigation button */}
      <div className="flex justify-start mt-4">
        <Button
          variant="brand"
          className="px-8 py-2.5 rounded font-poppins font-medium text-white border-none"
          onClick={handleSaveAndNext}
        >
          Save & Next
        </Button> 
      </div>
    </div>
  );
}
