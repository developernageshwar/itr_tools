"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useItrStore } from '@/store/itrStore';
import { useAuth } from '@/context/AuthContext';
import { fieldsConfig } from '@/config/fieldsConfig';
import { individualConfigMapping, itr1ConfigMapping } from '@/config/individualFieldConfig';
import { individual2ConfigMapping } from '@/config/individual2FieldConfig';
import { individual3ConfigMapping } from '@/config/individual3FieldConfig';
import { itr4ConfigMapping } from '@/config/individual4FieldConfig';
import { filingTypeConfig } from '@/config/filingConfig';
import FloatingInput from '@/components/ui/FloatingInput';
import FormSection from '@/components/ui/FormSection';
import Button from '@/components/ui/Button';
import {
  MdInfoOutline, MdPerson, MdSummarize, MdFileDownload,
  MdBusinessCenter, MdAgriculture, MdAccountBalance, MdMoney,
  MdSecurity, MdPayments, MdHomeWork, MdReceipt, MdKeyboardArrowDown
} from 'react-icons/md';
import { FiTrash2 } from 'react-icons/fi';
import { toast } from 'react-toastify';
import itrService from '@/services/itrService';
import RegimeComparisonModal from '@/components/modals/RegimeComparisonModal';
import ConfirmRegimeChangeModal from '@/components/modals/ConfirmRegimeChangeModal';

const getUniqueId = () => Date.now();

const isStructuredType = (type) => ['HUF', 'LLP', 'Firm', 'AOP/BOI', 'Company Private', 'Company Public', 'Trust & Exempt Entities', 'Individual', 'ITR1', 'ITR2', 'ITR3', 'ITR4'].includes(type);

const renderLabelWithAsterisk = (labelStr) => {
  if (typeof labelStr === 'string' && labelStr.includes('*')) { 
    const parts = labelStr.split('*');
    return (
      <>
        {parts[0]}
        <span className="text-red-500 font-bold">*</span>
        {parts.slice(1).join('*')}
      </>
    );
  }
  return labelStr;
};

const getFieldLabel = (field) => {
  let labelStr = field.label || '';
  if (field.required === true && !labelStr.includes('*')) {
    labelStr = `${labelStr} *`;
  }
  return labelStr;
};

// Individual module high-fidelity custom styling components
const ManualInput = ({ label = "Amount ₹", fullWidth = false, className = "", error, touched, ...props }) => {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-full sm:w-[320px]'}`}>
      <div className={`relative border border-[#C4C4C4] rounded-[4px] h-[48px] px-3 flex items-center transition-colors focus-within:border-[#3867D6] w-full ${props.readOnly || props.disabled ? 'bg-[#F2F2F7] border-[#E5E5EA]' : 'bg-white'} ${error && touched ? 'border-red-500' : ''} ${className}`}>
        {label && (
          <label className="absolute left-3 -top-2 bg-white px-1 font-poppins font-normal text-[13px] text-[#8E8E93] leading-none select-none">
            {renderLabelWithAsterisk(label)}
          </label>
        )}
        <input
          type="text"
          className="w-full bg-transparent outline-none font-poppins text-[13px] text-[#1E1E1E]"
          {...props}
        />
      </div>
      {error && touched && (
        <span className="text-red-500 font-poppins text-xs px-1">{error}</span>
      )}
    </div>
  );
};

const ManualSelect = ({ label, fullWidth = false, className = "", children, error, touched, ...props }) => {
  return (
    <div className={`flex flex-col gap-1 ${fullWidth ? 'w-full' : 'w-full sm:w-[320px]'}`}>
      <div className={`relative border border-[#C4C4C4] rounded-[4px] h-[48px] px-3 flex items-center bg-white transition-colors focus-within:border-[#3867D6] w-full ${error && touched ? 'border-red-500' : ''} ${className}`}>
        {label && (
          <label className="absolute left-3 -top-2 bg-white px-1 font-poppins font-normal text-[10px] text-[#8E8E93] leading-none select-none">
            {renderLabelWithAsterisk(label)}
          </label>
        )}
        <select
          className="w-full bg-transparent outline-none font-poppins text-[13px] text-[#1E1E1E] cursor-pointer appearance-none pr-6"
          {...props}
        >
          {children}
        </select>
        <div className="pointer-events-none absolute right-3 text-[#8E8E93]">
          <MdKeyboardArrowDown size={20} />
        </div>
      </div>
      {error && touched && (
        <span className="text-red-500 font-poppins text-xs px-1">{error}</span>
      )}
    </div>
  );
};

const MainSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="w-full border border-blue-300 rounded-[16px] bg-white overflow-hidden mb-6">
      <div
        className="flex items-center justify-between p-5 cursor-pointer hover:bg-gray-50 transition-colors select-none w-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="w-full sm:max-w-[600px] leading-relaxed text-black font-poppins font-semibold text-base break-words whitespace-normal pr-4">
          {title}
        </span>
        <MdKeyboardArrowDown
          size={24}
          className={`flex-shrink-0 text-[#3867D6] transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>
      {isOpen && (
        <div className="p-6 border-t border-[#E5E5EA] flex flex-col gap-6 bg-white animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

const FormRow = ({ label, children, indent = false }) => {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between py-3 border-b border-[#F5F5F7] last:border-0 gap-4 w-full ${indent ? "pl-6" : ""}`}>
      <span className="w-full sm:max-w-[600px] leading-relaxed text-black font-poppins font-medium text-base break-words whitespace-normal">
        {renderLabelWithAsterisk(label)}
      </span>
      <div className="flex-shrink-0 w-full sm:w-auto flex justify-end">
        {children}
      </div>
    </div>
  );
};

export default function DynamicFilingStep({ filingType, step, activeTab, handleNextTab }) {
  const state = useItrStore();
  const { setFields, calculateSummary } = state;

  const { user } = useAuth();
  const router = useRouter();
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRegimeModalOpen, setIsRegimeModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  useEffect(() => {
    if (user?.id || user?.user_id) {
      setFields({ userId: user.id || user.user_id });
    }
  }, [user, setFields]);
  // Regime switch helpers
  const handleRegimeRowClick = () => {
    setIsRegimeModalOpen(true);
  };
  const handleRegimeSwitchClick = () => {
    setIsRegimeModalOpen(false);
    setIsConfirmModalOpen(true); 
  };
  const handleRegimeConfirm = () => {
    const newRegime = state.selectedRegime === 'new' ? 'old' : 'new';
    setFields({ selectedRegime: newRegime });
    setIsConfirmModalOpen(false);
    toast.success(`Switched to ${newRegime === 'new' ? 'New' : 'Old'} Regime`);
  };

  const isSubtabEmpty = (data) => {
    if (!data || Object.keys(data).length === 0) return true;
    return Object.values(data).every(val => {
      if (val === undefined || val === null) return true;
      if (Array.isArray(val)) return val.length === 0;
      if (typeof val === 'object') return isSubtabEmpty(val);
      return String(val).trim() === '';
    });
  };

  const validate = (entityType, currentStep, currentSubTab, data) => {
    const newErrors = {};
    if (entityType === 'Individual') {
      return newErrors;
    }
    const tabFieldsConfig = entityType === 'Individual'
      ? individualConfigMapping[currentStep]?.[currentSubTab]
      : entityType === 'ITR1'
        ? itr1ConfigMapping[currentStep]?.[currentSubTab]
          : entityType === 'ITR2'
            ? individual2ConfigMapping[currentStep]?.[currentSubTab]
            : entityType === 'ITR3' 
              ? individual3ConfigMapping[currentStep]?.[currentSubTab]
              : entityType === 'ITR4'
                ? itr4ConfigMapping[currentStep]?.[currentSubTab]
                : fieldsConfig[entityType]?.[currentStep]?.[currentSubTab];
    if (!tabFieldsConfig || !tabFieldsConfig.sections) return newErrors;

    // Skip validation for optional steps/subtabs if they are completely empty
    const isMandatoryStep = ['details', 'filing', 'basic', 'personal', 'audit', 'tax'].includes(currentStep);
    if (!isMandatoryStep && isSubtabEmpty(data)) {
      return newErrors;
    }

    tabFieldsConfig.sections.forEach(section => {
      if (!section.isList) {
        section.fields.forEach(field => {
          const processField = (f) => {
            if (f.condition && !f.condition(state)) return;
            if (f.conditionalOn) {
              const triggerVal = data[f.conditionalOn.field];
              if (triggerVal !== f.conditionalOn.value) return;
            }

            if (['nameGroup', 'phoneGroup', 'addressGroup'].includes(f.type)) {
              if (f.fields) {
                f.fields.forEach(subF => {
                  processField({
                    ...subF,
                    required: subF.required !== undefined ? subF.required : f.required
                  });
                });
              }
              return;
            }

            const val = data[f.name];
            if (f.required && (val === undefined || val === null || String(val).trim() === '')) {
              newErrors[f.name] = `${f.label?.replace(' *', '')} is required`;
            } else if (val !== undefined && val !== null && String(val).trim() !== '') {
              const err = validateFieldValue(f.name, val, f.label);
              if (err) {
                newErrors[f.name] = err;
              }
            }
          };

          processField(field);
        });
      }
    });

    return newErrors;
  };


  const validateAllSteps = () => {
    const allErrors = {};
    const configForType = filingTypeConfig[filingType];
    const stepsList = configForType?.steps || [];
    const errorStepIds = [];
    let hasAnyError = false;

    stepsList.forEach(stepObj => {
      const stepRoute = stepObj.route;
      const subTabsList = configForType.subTabs?.[stepRoute] || [];
      let stepHasError = false;

      subTabsList.forEach(subTab => {
        const tabKey = subTab.id;
        const currentData = isStructuredType(filingType)
          ? (state[stepRoute]?.[tabKey] || {})
          : state;

        const validationErrors = validate(filingType, stepRoute, tabKey, currentData);
        if (Object.keys(validationErrors).length > 0) {
          allErrors[`${stepRoute}_${tabKey}`] = validationErrors;
          hasAnyError = true;
          stepHasError = true;
        }

        // Special check: bank details under filing -> bank must have at least one account
        if (stepRoute === 'filing' && tabKey === 'bank' && !['Individual', 'ITR1'].includes(filingType)) {
          const bankAccountsList = currentData.bankAccounts || [];
          if (bankAccountsList.length === 0) {
            if (!allErrors[`${stepRoute}_${tabKey}`]) {
              allErrors[`${stepRoute}_${tabKey}`] = {};
            }
            allErrors[`${stepRoute}_${tabKey}`].bankAccounts = "At least one bank account is required.";
            hasAnyError = true;
            stepHasError = true;
          }
        }
      });

      if (stepHasError) {
        errorStepIds.push(stepObj.id);
      }
    });

    return { allErrors, errorStepIds, hasAnyError };
  };

  const shouldRenderField = (field) => {
    if (field.condition && !field.condition(state)) return false;
    if (field.conditionalOn) {
      const triggerVal = isStructuredType(filingType)
        ? state[step]?.[activeTab]?.[field.conditionalOn.field]
        : state[field.conditionalOn.field];
      if (triggerVal !== field.conditionalOn.value) return false;
    }
    return true;
  };

  const validateFieldValue = (name, value, label) => {
    if (!value) return null;
    const trimmedVal = String(value).trim();
    const nameLower = name?.toLowerCase() || '';

    // 1. PAN Validation — any field with 'pan' in name (not 'company', 'panel', etc.)
    if ((nameLower.includes('pan') && !nameLower.includes('company') && !nameLower.includes('panel') && !nameLower.includes('panchayat'))) {
      const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/i;
      if (!panRegex.test(trimmedVal)) {
        return "Please enter a valid PAN.";
      }
    }

    // 2. Aadhaar Validation
    if (nameLower.includes('aadhaar') || nameLower === 'aadhaarnumber') {
      const aadhaarRegex = /^[0-9]{12}$/;
      if (!aadhaarRegex.test(trimmedVal)) {
        return "Please enter a valid Aadhaar number.";
      }
    }

    // 3. TAN Validation (for TDS/TCS Deductor TAN)
    if (nameLower.includes('tan') && (nameLower.includes('deductor') || nameLower.includes('collector') || nameLower.includes('deductee'))) {
      const tanRegex = /^[A-Z]{4}[0-9]{5}[A-Z]{1}$/i;
      if (!tanRegex.test(trimmedVal)) {
        return "Please enter a valid 10-character TAN.";
      }
    }

    // 4. Email Validation
    if (nameLower.includes('email') || nameLower === 'emailaddress') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedVal)) {
        return "Please enter a valid email address.";
      }
    }

    // 5. Mobile Number Validation — any field named 'mobile' or 'phone'
    if (nameLower.includes('mobile') || nameLower === 'phonenumber' || nameLower.includes('mobileno')) {
      const mobileRegex = /^[0-9]{10}$/;
      if (!mobileRegex.test(trimmedVal)) {
        return "Please enter a valid mobile number.";
      }
    }

    // 6. Pincode Validation
    if (nameLower === 'pincode' || nameLower.includes('pincode') || nameLower === 'zipcode') {
      const pinRegex = /^[0-9]{6}$/;
      if (!pinRegex.test(trimmedVal)) {
        return "Please enter a valid PIN code.";
      }
    }

    // 7. IFSC Code Validation
    if (nameLower.includes('ifsc')) {
      const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/i;
      if (!ifscRegex.test(trimmedVal)) {
        return "Please enter a valid IFSC code.";
      }
    }

    // 8. Bank Account Number Validation (8-18 digits)
    if (nameLower.includes('accountnumber') || nameLower === 'bankaccountnumber') {
      const acRegex = /^[0-9]{8,18}$/;
      if (!acRegex.test(trimmedVal)) {
        return "Please enter a valid bank account number.";
      }
    }

    // 9. Date format (DD/MM/YYYY)
    if (
      nameLower.includes('date') ||
      nameLower === 'formationdate' ||
      nameLower === 'dateofdeposit' ||
      nameLower === 'dateofbirth'
    ) {
      // Only validate if it looks like it should be a date (not a year or timestamp)
      if (trimmedVal.includes('/') || trimmedVal.match(/^\d{2}-\d{2}-\d{4}$/)) {
        const normalized = trimmedVal.replace(/-/g, '/');
        const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
        if (!dateRegex.test(normalized)) {
          return "Please specify date in format DD/MM/YYYY.";
        }
      }
    }

    // 10. Deduction Limits
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

    // 11. Non-negative checks for amount/income/deduction fields
    if (
      nameLower.includes('income') ||
      nameLower.includes('turnover') ||
      nameLower.includes('deduction') ||
      nameLower.includes('amount') ||
      nameLower.includes('tax') ||
      nameLower.includes('profit') ||
      nameLower.includes('rent') ||
      nameLower.includes('receipt')
    ) {
      if (trimmedVal !== '' && !isNaN(Number(trimmedVal)) && Number(trimmedVal) < 0) {
        return `${label?.replace(' *', '') || 'Amount'} cannot be negative.`;
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

  // Returns extra HTML input props (inputMode, maxLength, pattern) based on field semantics
  const getFieldInputProps = (fieldName, fieldType) => {
    const name = fieldName?.toLowerCase() || '';
    // PAN fields — exactly 10 alphanumeric chars
    if (name.includes('pan')) {
      return { maxLength: 10, inputMode: 'text', style: { textTransform: 'uppercase' } };
    }
    // Aadhaar — 12 digits
    if (name.includes('aadhaar') || name === 'aadhaar') {
      return { maxLength: 12, inputMode: 'numeric' };
    }
    // Mobile — 10 digits
    if (name.includes('mobile') || name === 'mobilenumber' || name.includes('phone')) {
      return { maxLength: 10, inputMode: 'tel' };
    }
    // Pincode — 6 digits
    if (name.includes('pincode') || name === 'pincode') {
      return { maxLength: 6, inputMode: 'numeric' };
    }
    // BSR Code — 6 chars
    if (name === 'bsrcode') {
      return { maxLength: 6, inputMode: 'numeric' };
    }
    // Challan serial — 5 chars
    if (name.includes('challanserial')) {
      return { maxLength: 5, inputMode: 'numeric' };
    }
    // TAN — 10 chars
    if (name.includes('tan') && (name.includes('deductor') || name.includes('collector'))) {
      return { maxLength: 10, inputMode: 'text', style: { textTransform: 'uppercase' } };
    }
    // IFSC — 11 chars
    if (name.includes('ifsc')) {
      return { maxLength: 11, inputMode: 'text', style: { textTransform: 'uppercase' } };
    }
    // Number fields — numeric keyboard
    if (fieldType === 'number') {
      return { inputMode: 'numeric' };
    }
    // Email
    if (name.includes('email')) {
      return { inputMode: 'email' };
    }
    return {};
  };


  const tabConfig = filingType === 'Individual'
    ? individualConfigMapping[step]?.[activeTab]
    : filingType === 'ITR1' 
      ? itr1ConfigMapping[step]?.[activeTab]
      : filingType === 'ITR2' 
        ? individual2ConfigMapping[step]?.[activeTab]
        : filingType === 'ITR3'
          ? individual3ConfigMapping[step]?.[activeTab]
          : filingType === 'ITR4'
            ? itr4ConfigMapping[step]?.[activeTab]
            : fieldsConfig[filingType]?.[step]?.[activeTab];


  const getInputPlaceholderLabel = (field) => {
    if (!field) return 'Type';

    if (field.type === 'amount') {
      return 'Amount ₹';
    }

    // 2. Explicit date fields
    if (field.type === 'date' || (field.name && field.name.toLowerCase().includes('date')) || (field.name && field.name.toLowerCase().includes('dob'))) {
      return 'Date';
    }

    // 3. Dropdown/select
    if (field.type === 'select') {
      return 'Select';
    }

    return 'Type';
  };

  const getAddBtnText = (listName) => {
    if (listName === 'coparceners') return 'Add Member';
    if (listName === 'tdsRows') return 'Add TDS Claim';
    if (listName === 'taxPayments') return 'Add Tax Challan';
    if (listName === 'bankAccounts') return 'Add Bank Account';
    if (listName === 'directorshipsList') return 'Add Directorship';
    return 'Add Entry';
  };

  // Handle standard field change
  const handleFieldChange = (name, value, isNumber = false) => {
    const nameLower = name?.toLowerCase() || '';
    let finalVal = value;

    if (Array.isArray(value) || (value !== null && typeof value === 'object')) {
      // Skip text replacements for complex structures like arrays
    } else if (isNumber || nameLower.includes('income') || nameLower.includes('turnover') || nameLower.includes('amount') || nameLower.includes('profit') || nameLower.includes('deduction') || nameLower.includes('rent') || nameLower.includes('receipt') || nameLower.includes('tax')) {
      // Allow only digits for pure number fields
      finalVal = String(value).replace(/[^0-9]/g, "");
    } else if (nameLower.includes('pan') || (nameLower.includes('tan') && (nameLower.includes('deductor') || nameLower.includes('collector')))) {
      // PAN/TAN: uppercase alphanumeric only
      finalVal = String(value).toUpperCase().replace(/[^A-Z0-9]/g, "");
    } else if (nameLower.includes('ifsc')) {
      finalVal = String(value).toUpperCase().replace(/[^A-Z0-9]/g, "");
    } else if (nameLower.includes('mobile') || nameLower.includes('aadhaar') || nameLower.includes('pincode')) {
      // Digits only
      finalVal = String(value).replace(/[^0-9]/g, "");
    }

    if (isStructuredType(filingType)) {
      const stepData = state[step] || {};
      const subTabData = stepData[activeTab] || {};
      const updatedSubTabData = { ...subTabData, [name]: finalVal };

      // Auto-calculate Salary values for ITR2 / Individual2 (detailed Schedule S)
      if ((filingType === 'ITR2' || filingType === 'Individual2') && (activeTab === 'salary' || activeTab === 'schedule-s-salary')) {
        // --- Perquisites sub-components → salary17_2 ---
        const perqFields = ['accomodationPerquisite', 'carPerquisite', 'sweatEquityShares', 'otherPerquisites'];
        const s17_2_auto = perqFields.reduce((sum, f) => {
          return sum + Number(name === f ? finalVal : (subTabData[f] || 0));
        }, 0);
        if (name !== 'salary17_2') {
          updatedSubTabData.salary17_2 = s17_2_auto.toString();
        }

        // --- Exempt allowances sub-components → exemptAllowances ---
        const exemptFields = ['sec10_5', 'sec10_13A', 'sec10_14_transport', 'sec10_14_special', 'sec10_17', 'sec10_10', 'sec10_10A', 'sec10_10AA', 'otherExemptAllowances'];
        const totalExempt = exemptFields.reduce((sum, f) => {
          return sum + Number(name === f ? finalVal : (subTabData[f] || 0));
        }, 0);
        updatedSubTabData.exemptAllowances = totalExempt.toString();

        // --- Gross Salary: 17(1) + 17(2) + 17(3) ---
        const s17_1 = Number(name === 'salary17_1' ? finalVal : (subTabData.salary17_1 || 0));
        const s17_2 = name === 'salary17_2' ? Number(finalVal) : (name !== 'salary17_2' && !perqFields.includes(name) ? Number(subTabData.salary17_2 || 0) : s17_2_auto);
        const s17_3 = Number(name === 'salary17_3' ? finalVal : (subTabData.salary17_3 || 0));
        const gross = s17_1 + s17_2 + s17_3;
        updatedSubTabData.grossSalary = gross.toString();

        // --- Standard Deduction ---
        const regime = (state.details?.filing_details?.optingOutNewRegime === 'Yes') ? 'old' : 'new';
        const stdDedLimit = regime === 'new' ? 75000 : 50000;
        const stdDed = Math.min(gross, stdDedLimit);
        updatedSubTabData.deductionStandard = stdDed.toString();

        // --- Total Deductions u/s 16 ---
        const entAllow = Number(name === 'entertainmentAllowance' ? finalVal : (subTabData.entertainmentAllowance || 0));
        const profTax = Number(name === 'professionalTax' ? finalVal : (subTabData.professionalTax || 0));
        updatedSubTabData.totalDeductionU16 = (stdDed + entAllow + profTax).toString();

        // --- Net Chargeable Salary ---
        const netSal = Math.max(0, gross - totalExempt);  

       

      }
      if ((filingType === 'Individual' || filingType === 'ITR1') && (activeTab === 'salary' || activeTab === 'salary-pension-income')) {
        const s17_1 = Number(name === 'salary17_1' ? finalVal : (subTabData.salary17_1 || 0));
        const s17_2 = Number(name === 'salary17_2' ? finalVal : (subTabData.salary17_2 || 0));
        const s17_3 = Number(name === 'salary17_3' ? finalVal : (subTabData.salary17_3 || 0));
        const gross = s17_1 + s17_2 + s17_3;
        updatedSubTabData.grossSalary = gross.toString();

        const regime = (state.details?.general?.optingOutNewRegime === 'Yes') ? 'old' : 'new';
        const stdDedLimit = regime === 'new' ? 75000 : 50000;
        const stdDed = Math.min(gross, stdDedLimit);
        updatedSubTabData.deductionStandard = stdDed.toString();

        const exempt = Number(name === 'exemptAllowances' ? finalVal : (subTabData.exemptAllowances || 0));
        const profTax = Number(name === 'professionalTax' ? finalVal : (subTabData.professionalTax || 0));

        const chargeableSal = Math.max(0, gross - exempt - stdDed - profTax);
        updatedSubTabData.incomeChargeableSalaries = chargeableSal.toString();
      }

      if ((filingType === 'ITR1') && (activeTab === 'salary' || activeTab === 'salary-pension-income')) {
        const getV = (fieldName) => Number(name === fieldName ? finalVal : (subTabData[fieldName] || 0));

        // 1. Gross Salary (ia + ib + ic)
        const s17_1 = getV('salary17_1');
        const s17_2 = getV('salary17_2');
        const s17_3 = getV('salary17_3');
        const gross = s17_1 + s17_2 + s17_3;
        updatedSubTabData.grossSalary = gross.toString();

        // 2. HRA computation
        const hraPlace = name === 'hraPlaceOfResidence' ? finalVal : (subTabData.hraPlaceOfResidence || '');
        const factor = hraPlace.includes('Metro Cities') ? 0.50 : 0.40;

        const hraActual = getV('hraActualReceived');
        const rentPaid = getV('hraActualRentPaid');
        const basicSal = getV('hraBasicSalary');
        const dearness = getV('hraDearnessAllowance');

        const salaryForHra = basicSal + dearness;

        const rentMinusTen = Math.max(0, rentPaid - (0.10 * salaryForHra));
        updatedSubTabData.hraRentMinusTenPercent = rentMinusTen.toString();

        const pctSalary = salaryForHra * factor;
        updatedSubTabData.hraFiftyOrFortyPercent = pctSalary.toString();

        let hraExempt = 0;
        if (hraPlace && hraActual > 0 && rentPaid > 0 && basicSal > 0) {
          hraExempt = Math.min(hraActual, rentMinusTen, pctSalary);
        }
        updatedSubTabData.hraEligibleExemption = hraExempt.toString();
        updatedSubTabData.sec10_13A = hraExempt.toString();

        // 3. Exempt Allowances u/s 10 (List + Standalone HRA)
        const exemptList = name === 'exemptAllowancesList' ? finalVal : (subTabData.exemptAllowancesList || []);
        let listExemptSum = 0;
        if (Array.isArray(exemptList)) {
          listExemptSum = exemptList.reduce((sum, item) => sum + Number(item.amount || 0), 0);
        }
        const totalExempt = listExemptSum + hraExempt;  

        //  const netSal = Math.max(0, gross - totalExempt);
        // updatedSubTabData.netSalary = netSal.toString(); 

        const netSal = getV('netSalary');

        // 5. Standard Deduction 
        const regime = (state.details?.general?.optingOutNewRegime === 'Yes') ? 'old' : 'new';
        const stdDedLimit = regime === 'new' ? 75000 : 50000;
        const stdDed = Math.min(netSal, stdDedLimit);
        updatedSubTabData.deductionStandard = stdDed.toString();

        // 6. Deductions u/s 16
        const dedEnt = getV('deductionEntertainment');
        const dedProf = getV('deductionProfessionalTax');
        const totalDeductions16 = stdDed + dedEnt + dedProf;
        updatedSubTabData.deductionsTotal16 = totalDeductions16.toString();

        // 7. Income chargeable under salaries
        const chargeableSal = Math.max(0, netSal - totalDeductions16);
        updatedSubTabData.incomeChargeableSalaries = chargeableSal.toString();
      }

      if ((filingType === 'ITR1') && (activeTab === 'house_property' || activeTab === 'house-property-income')) {
        const getV = (fieldName) => Number(name === fieldName ? finalVal : (subTabData[fieldName] || 0));

        // 1. Total (1b + 1c)
        const unrealized = getV('unrealizedRent');
        const munTax = getV('municipalTaxes');
        const totalTaxRent = unrealized + munTax;
        updatedSubTabData.totalTaxesRent = totalTaxRent.toString();

        // 2. Annual Value (1a - 1d)
        const grossRent = getV('grossRent');
        const propType = name === 'propertyType' ? finalVal : (subTabData.propertyType || 'Let Out');
        let annualVal = 0;
        if (propType !== 'Self Occupied') {
          annualVal = Math.max(0, grossRent - totalTaxRent);
        }
        updatedSubTabData.annualValue = annualVal.toString();

        // 3. Annual Value of property owned
        const isCoowned = (name === 'isCoOwned' ? finalVal : (subTabData.isCoOwned || 'No')) === 'Yes';
        const pctShare = name === 'percentageShare' ? Number(finalVal) : Number(subTabData.percentageShare || 100);
        const annualOwned = isCoowned ? Math.round(annualVal * (pctShare / 100)) : annualVal;
        updatedSubTabData.annualValueOwned = annualOwned.toString();

        // 4. 30% of annual value
        const ded30 = Math.round(annualOwned * 0.30);
        updatedSubTabData.deduction30 = ded30.toString();

        // 5. Interest on borrowed capital (h)
        const loans = name === 'loansList' ? finalVal : (subTabData.loansList || []);
        let loansInterestSum = 0;
        if (Array.isArray(loans)) {
          loansInterestSum = loans.reduce((sum, loan) => sum + Number(loan.interest || 0), 0);
        }
        const cappedInterest = propType === 'Self Occupied' ? Math.min(200000, loansInterestSum) : loansInterestSum;
        updatedSubTabData.interestBorrowedCapital = cappedInterest.toString();

        // 6. Total (1g + 1h)
        const totInterest = ded30 + cappedInterest;
        updatedSubTabData.totalInterest = totInterest.toString();

        // 7. Income from HP
        const arrears = getV('arrearsRent');
        const incomeHP = annualOwned - totInterest + arrears;
        updatedSubTabData.incomeFromHP = incomeHP.toString();
      }

      // Auto-calculate House Property values for ITR2 / Individual2
      if ((filingType === 'ITR2' || filingType === 'Individual2') && (activeTab === 'house_property' || activeTab === 'schedule-hp-house-property')) {
        const getV = (fieldName) => Number(name === fieldName ? finalVal : (subTabData[fieldName] || 0));
        const unrealized = getV('unrealizedRent');
        const munTax = getV('municipalTaxes');
        const totalTaxUnrealized = unrealized + munTax;
        updatedSubTabData.totalLocalTaxesUnrealized = totalTaxUnrealized.toString();

        const rent = getV('rentReceived');
        const annualValue = Math.max(0, rent - totalTaxUnrealized);
        updatedSubTabData.annualValue = annualValue.toString();

        const isCoowned = (name === 'isCoowned' ? finalVal : (subTabData.isCoowned || 'No')) === 'Yes';
        const sharePercent = name === 'ownerSharePercent' ? Number(finalVal) : Number(subTabData.ownerSharePercent || 100);
        const annualValueOwned = isCoowned ? Math.round(annualValue * (sharePercent / 100)) : annualValue;
        updatedSubTabData.annualValueOwned = annualValueOwned.toString();

        const ded30 = Math.round(annualValueOwned * 0.3);
        updatedSubTabData.deduction30Percent = ded30.toString();

        const loanInt = getV('homeLoanInterest');
        const propType = name === 'propertyType' ? finalVal : (subTabData.propertyType || 'Let Out');
        const cappedLoanInt = propType === 'Self Occupied' ? Math.min(200000, loanInt) : loanInt;

        const totalDeds = ded30 + cappedLoanInt;
        updatedSubTabData.totalHpDeductions = totalDeds.toString();

        const propertyIncome = annualValueOwned - totalDeds;
        updatedSubTabData.incomeFromProperty = propertyIncome.toString();

        const arrears = getV('arrearsRentReceived');
        const passThrough = getV('passThroughHpIncome');
        const totalHpIncome = propertyIncome + arrears + passThrough;
        updatedSubTabData.incomeFromHP = totalHpIncome.toString();
      }

      // Auto-calculate Capital Gains values for ITR2 / Individual2
      if ((filingType === 'ITR2' || filingType === 'Individual2') && (activeTab === 'capital_gains' || activeTab === 'schedule-cg-capital-gains')) {
        const getV = (fieldName) => Number(name === fieldName ? finalVal : (subTabData[fieldName] || 0));

        const stcgConsideration = getV('stcgImmovableConsideration');
        const stcgStampVal = getV('stcgImmovableStampValue');
        const adoptedConsideration = Math.max(stcgConsideration, stcgStampVal);
        updatedSubTabData.stcgImmovableAdoptedConsideration = adoptedConsideration.toString();

        const stcgCostAcq = getV('stcgImmovableCostAcquisition');
        const stcgCostImp = getV('stcgImmovableCostImprovement');
        const stcgExp = getV('stcgImmovableTransferExpenditure');
        const stcgDed54B = getV('stcgImmovableDeduction54B');
        const stcgImmovableNetGains = Math.max(0, adoptedConsideration - stcgCostAcq - stcgCostImp - stcgExp - stcgDed54B);
        updatedSubTabData.stcgImmovableNetGains = stcgImmovableNetGains.toString();

        const slumpConsideration = getV('stcgSlumpSaleConsideration');
        const slumpNetWorth = getV('stcgSlumpSaleNetWorth');
        const slumpNetGains = Math.max(0, slumpConsideration - slumpNetWorth);
        updatedSubTabData.stcgSlumpSaleNetGains = slumpNetGains.toString();

        const beforeJuly111A = getV('stcg111ABeforeJuly');
        const afterJuly111A = getV('stcg111AAfterJuly');
        const stcgSec111A = beforeJuly111A + afterJuly111A;
        updatedSubTabData.stcgSec111A = stcgSec111A.toString();

        const otherConsideration = getV('stcgOtherConsideration');
        const otherCostAcq = getV('stcgOtherCostAcquisition');
        const otherDed54D = getV('stcgOtherDeduction54D');
        const stcgOther = Math.max(0, otherConsideration - otherCostAcq - otherDed54D);
        updatedSubTabData.stcgOther = stcgOther.toString();

        const totalStcg = stcgImmovableNetGains + slumpNetGains + stcgSec111A + stcgOther;
        updatedSubTabData.stcg = totalStcg.toString();

        const ltcgConsideration = getV('ltcgImmovableConsideration');
        const ltcgIdxCostAcq = getV('ltcgImmovableIndexedCostAcquisition');
        const ltcgIdxCostImp = getV('ltcgImmovableIndexedCostImprovement');
        const ltcgDed54F = getV('ltcgImmovableDeduction54F');
        const ltcgImmovableNetGains = Math.max(0, ltcgConsideration - ltcgIdxCostAcq - ltcgIdxCostImp - ltcgDed54F);
        updatedSubTabData.ltcgImmovableNetGains = ltcgImmovableNetGains.toString();

        const beforeJuly12A = getV('ltcg112ABeforeJuly');
        const afterJuly12A = getV('ltcg112AAfterJuly');
        const ltcgSec112A = beforeJuly12A + afterJuly12A;
        updatedSubTabData.ltcgSec112A = ltcgSec112A.toString();

        const totalLtcg = ltcgImmovableNetGains + ltcgSec112A;
        updatedSubTabData.ltcg = totalLtcg.toString();

        const vdaConsideration = getV('vdaConsideration');
        const vdaCostAcq = getV('vdaCostAcquisition');
        const incomeFromVDA = Math.max(0, vdaConsideration - vdaCostAcq);
        updatedSubTabData.incomeFromVDA = incomeFromVDA.toString();
      }

      // Auto-calculate Other Sources values for ITR2 / Individual2
      if ((filingType === 'ITR2' || filingType === 'Individual2') && (activeTab === 'other' || activeTab === 'schedule-os-other-sources')) {
        const getV = (fieldName) => Number(name === fieldName ? finalVal : (subTabData[fieldName] || 0));

        const familyPension = getV('familyPension');
        const dedFP = Math.min(15000, Math.round(familyPension / 3));
        updatedSubTabData.deductionFamilyPension57 = dedFP.toString();

        const normalGross = getV('savingsInterest') + getV('depositInterest') + getV('refundInterest') + getV('dividendIncome') + familyPension + getV('rentalMachineryPlant') + getV('giftValueWithoutConsideration') + getV('otherIncome');
        const specialGross = getV('winnings115BB') + getV('winnings115BBJ');
        const expenses = dedFP + getV('expensesMachineryPlant57') + getV('interestExpense57');
        const netOS = Math.max(0, normalGross + specialGross - expenses);
        updatedSubTabData.netOtherSourcesIncome = netOS.toString();
      }

      // Auto-calculate Deductions values for ITR2 / Individual2
      if ((filingType === 'ITR2' || filingType === 'Individual2') && (activeTab === 'chapter6a' || activeTab === 'schedule-via-deductions')) {
        const deds = ['deduction80C', 'deduction80CCC', 'deduction80CCD1', 'deduction80CCD2', 'deduction80D', 'deduction80DD', 'deduction80DDB', 'deduction80E', 'deduction80EEA', 'deduction80EEB', 'deduction80G', 'deduction80GG', 'deduction80GGC', 'deduction80TTA', 'deduction80TTB', 'deduction80U'];
        const totalDed = deds.reduce((sum, f) => {
          let val = Number(name === f ? finalVal : (subTabData[f] || 0));
          if (f === 'deduction80C') val = Math.min(150000, val);
          if (f === 'deduction80TTA') val = Math.min(10000, val);
          if (f === 'deduction80TTB') val = Math.min(50000, val);
          return sum + val;
        }, 0);
        updatedSubTabData.taxSavingsDeductions = totalDed.toString();
      }

      // Auto-calculate values for ITR3 under Balance Sheet, Profit & Loss, and Business Computation
      if (filingType === 'ITR3' && activeTab === 'balance_sheet') {
        const getV = (fieldName) => Number(name === fieldName ? finalVal : (subTabData[fieldName] || 0));

        // Reserves
        const reval = getV('revaluationReserve');
        const capRes = getV('capitalReserve');
        const statRes = getV('statutoryReserve');
        const othRes = getV('otherReserve');
        const totalRes = reval + capRes + statRes + othRes;
        updatedSubTabData.totalReserves = totalRes.toString();

        const cap = getV('proprietorCapital');
        const totalPropFund = cap + totalRes;
        updatedSubTabData.totalProprietorFund = totalPropFund.toString();

        // Loans
        const foreign = getV('securedForeignLoan');
        const bankRupee = getV('securedRupeeLoanBank');
        const othRupee = getV('securedRupeeLoanOthers');
        const totalRupee = bankRupee + othRupee;
        updatedSubTabData.totalRupeeLoans = totalRupee.toString();

        const totalSecured = foreign + totalRupee;
        updatedSubTabData.totalSecuredLoans = totalSecured.toString();

        const bankUnsecured = getV('unsecuredLoanBank');
        const othUnsecured = getV('unsecuredLoanOthers');
        const totalUnsecured = bankUnsecured + othUnsecured;
        updatedSubTabData.totalUnsecuredLoans = totalUnsecured.toString();

        const totalLoan = totalSecured + totalUnsecured;
        updatedSubTabData.totalLoanFunds = totalLoan.toString();

        // Advances
        const advRel = getV('advancesRelatedPersons');
        const advOth = getV('advancesOthers');
        const totalAdv = advRel + advOth;
        updatedSubTabData.totalWithdrawnAdvances = totalAdv.toString();

        const deferred = getV('deferredTaxLiability');
        const totalSources = totalPropFund + totalLoan + deferred + totalAdv;
        updatedSubTabData.totalSources = totalSources.toString();

        // Assets Application
        const grossBlk = getV('grossBlock');
        const accumDep = getV('depreciationAccumulated');
        const netBlk = Math.max(0, grossBlk - accumDep);
        updatedSubTabData.netBlock = netBlk.toString();

        const cwip = getV('cwip');
        const totalFixed = netBlk + cwip;
        updatedSubTabData.totalFixedAssets = totalFixed.toString();

        const quotedLong = getV('quotedSecuritiesLongTerm');
        const unquotedLong = getV('unquotedSecuritiesLongTerm');
        const totalLongInvest = quotedLong + unquotedLong;
        updatedSubTabData.totalLongTermInvestments = totalLongInvest.toString();

        const shortInvest = getV('shortTermInvestments');
        updatedSubTabData.totalShortTermInvestments = shortInvest.toString();

        const totalInvest = totalLongInvest + shortInvest;
        updatedSubTabData.totalInvestments = totalInvest.toString();

        const invRaw = getV('inventoriesRawMaterial');
        updatedSubTabData.totalInventories = invRaw.toString();

        const cashHand = getV('cashInHand');
        const bankBal = getV('bankBalances');
        const totalCash = cashHand + bankBal;
        updatedSubTabData.totalCashBank = totalCash.toString();

        const sundryDebtors = getV('sundryDebtors');
        const otherCurrentAssets = getV('otherCurrentAssets');
        const totalCurrent = invRaw + sundryDebtors + totalCash + otherCurrentAssets;
        updatedSubTabData.totalCurrentAssets = totalCurrent.toString();

        const loansAdvancesRec = getV('loansAdvancesRecoverable');
        updatedSubTabData.totalLoansAdvances = loansAdvancesRec.toString();

        const totalCurrentAndLoans = totalCurrent + loansAdvancesRec;
        updatedSubTabData.totalCurrentAssetsAndLoans = totalCurrentAndLoans.toString();

        // Liabilities
        const sundryCred = getV('sundryCreditors');
        const otherLiab = getV('otherCurrentLiabilities');
        const totalLiab = sundryCred + otherLiab;
        updatedSubTabData.totalCurrentLiabilities = totalLiab.toString();

        const provTax = getV('provisionsTaxEmployee');
        updatedSubTabData.totalProvisions = provTax.toString();

        const totalLiabProv = totalLiab + provTax;
        updatedSubTabData.totalLiabilitiesAndProvisions = totalLiabProv.toString();

        const netCurrent = totalCurrentAndLoans - totalLiabProv;
        updatedSubTabData.netCurrentAssets = netCurrent.toString();

        const miscExp = getV('miscExpenditure');
        updatedSubTabData.totalMiscDtaPl = miscExp.toString();

        const totalApplication = totalFixed + totalInvest + netCurrent + miscExp;
        updatedSubTabData.totalApplication = totalApplication.toString();
      }

      if (filingType === 'ITR3' && activeTab === 'profit_loss') {
        const getV = (fieldName) => Number(name === fieldName ? finalVal : (subTabData[fieldName] || 0));

        // Manufacturing
        const openStockRaw = getV('openingStockWipRaw');
        updatedSubTabData.totalOpeningInventory = openStockRaw.toString();

        const netPurch = getV('purchasesNet');
        const wages = getV('directWagesCarriage');
        const power = getV('powerFuelDirect');
        const totalDirect = netPurch + wages + power;
        updatedSubTabData.totalDirectExpenses = totalDirect.toString();

        const factory = getV('factoryOverheadsGeneral');
        updatedSubTabData.totalFactoryOverheads = factory.toString();

        const totalManufacturingDebits = openStockRaw + totalDirect + factory;
        updatedSubTabData.totalDebitsManufacturing = totalManufacturingDebits.toString();

        const closeStockRaw = getV('closingStockWipRaw');
        updatedSubTabData.totalClosingStock = closeStockRaw.toString();

        const costGoodsProd = Math.max(0, totalManufacturingDebits - closeStockRaw);
        updatedSubTabData.costOfGoodsProduced = costGoodsProd.toString();

        // Trading
        const sales = getV('saleGoodsServices');
        const otherOpRev = getV('otherOperatingRevenues');
        const totalRevBus = sales + otherOpRev;
        updatedSubTabData.totalRevenueBusiness = totalRevBus.toString();

        const dutiesRec = getV('dutiesTaxesReceived');
        updatedSubTabData.totalDutiesTaxesReceived = dutiesRec.toString();

        const grossReceiptsProf = getV('grossReceiptsProfession');
        const totalRevOps = totalRevBus + grossReceiptsProf + dutiesRec;
        updatedSubTabData.totalRevenueOperations = totalRevOps.toString();

        const closeStockFin = getV('closingStockFinishedGoods');
        const totalCreditsTrading = totalRevOps + closeStockFin;
        updatedSubTabData.totalCreditsTrading = totalCreditsTrading.toString();

        const openStockFin = getV('openingStockFinishedGoods');
        const purchDirect = getV('purchasesDirectExpenses');
        const totalTradingDirect = openStockFin + purchDirect;
        updatedSubTabData.totalTradingDirectExpenses = totalTradingDirect.toString();

        const dutiesPaid = getV('dutiesTaxesPaid');
        updatedSubTabData.totalDutiesTaxesPaid = dutiesPaid.toString();

        updatedSubTabData.costOfGoodsProducedTransfer = costGoodsProd.toString();

        const grossProfit = totalCreditsTrading - (totalTradingDirect + dutiesPaid + costGoodsProd);
        updatedSubTabData.grossProfit = grossProfit.toString();

        // P&L
        updatedSubTabData.grossProfitFwd = grossProfit.toString();

        const otherInc = getV('otherIncomeFields');
        const liabilitiesWritten = getV('liabilitiesWrittenBack');
        const otherIncomesNotTurn = getV('otherIncomesNotTurnover');
        const totalOtherInc = otherInc + liabilitiesWritten + otherIncomesNotTurn;
        updatedSubTabData.totalOtherIncome = totalOtherInc.toString();

        const totalCreditsPl = grossProfit + totalOtherInc;
        updatedSubTabData.totalCreditsPl = totalCreditsPl.toString();

        // Debits/Expenses
        const stdBusExp = getV('standardBusinessExpenses');
        const compEmp = getV('compensationToEmployees');
        updatedSubTabData.totalCompensationEmployees = compEmp.toString();

        const insWelf = getV('insuranceWelfareMarketing');
        const commissionRoyalty = getV('commissionRoyaltyFees');
        const travelAdmin = getV('travelAdminExpenses');
        const ratesTaxes = getV('ratesAndTaxes');
        updatedSubTabData.totalRatesTaxes = ratesTaxes.toString();

        const auditFee = getV('auditFee');
        const otherExpenses = getV('otherExpensesRows');

        const badPan = getV('badDebtsWithPan');
        const badNoPan = getV('badDebtsWithoutPan');
        const badOth = getV('badDebtsOthers');
        const totalBad = badPan + badNoPan + badOth;
        updatedSubTabData.totalBadDebts = totalBad.toString();

        const provInt = getV('provisionsInterestNet');

        const totalExpenses = stdBusExp + compEmp + insWelf + commissionRoyalty + travelAdmin + ratesTaxes + auditFee + otherExpenses + totalBad + provInt;
      }

      if (filingType === 'ITR3' && activeTab === 'business') {
        const getV = (fieldName) => Number(name === fieldName ? finalVal : (subTabData[fieldName] || 0));

        // Try to fetch netProfitBeforeTax from PL financials step if PL exists
        const financialsPL = (state.financials || {}).profit_loss || {};
        const plCredits = Number(financialsPL.totalCreditsPl || 0);
        const plDebits = Number(financialsPL.standardBusinessExpenses || 0) +
          Number(financialsPL.totalCompensationEmployees || 0) +
          Number(financialsPL.insuranceWelfareMarketing || 0) +
          Number(financialsPL.commissionRoyaltyFees || 0) +
          Number(financialsPL.travelAdminExpenses || 0) +
          Number(financialsPL.totalRatesTaxes || 0) +
          Number(financialsPL.auditFee || 0) +
          Number(financialsPL.otherExpensesRows || 0) +
          Number(financialsPL.totalBadDebts || 0) +
          Number(financialsPL.provisionsInterestNet || 0);
        const plNetProfit = plCredits - plDebits;

        const netProfit = name === 'netProfitBeforeTax' ? Number(finalVal) : (plNetProfit || getV('netProfitBeforeTax'));
        updatedSubTabData.netProfitBeforeTax = netProfit.toString();

        const specAdj = getV('speculativeAdjustments');
        const otherHeads = getV('otherHeadsCreditPl');
        const presProfit = getV('presumptiveCoveredProfit');
        const exemptShare = getV('exemptIncomeShare');
        const depAdj = getV('depreciationAdjustments');
        const addOi = getV('additionsOiDisallowances');
        const weightedDed = getV('weightedDeductions');

        const finalNetBp = netProfit + specAdj - otherHeads - presProfit - exemptShare - depAdj + addOi - weightedDed;
        updatedSubTabData.finalNetBpIncome = finalNetBp.toString();
      }

      // Auto-calculate Salary values for ITR4 under "other" tab
      if (filingType === 'ITR4' && activeTab === 'other') {
        const s17_1 = Number(name === 'salarySec17_1' ? finalVal : (subTabData.salarySec17_1 || 0));
        const s17_2 = Number(name === 'perquisitesSec17_2' ? finalVal : (subTabData.perquisitesSec17_2 || 0));
        const gross = s17_1 + s17_2;
        updatedSubTabData.grossSalary = gross.toString();

        const regime = state.selectedRegime || 'new';
        const stdDedLimit = regime === 'new' ? 75000 : 50000;
        const stdDed = Math.min(gross, stdDedLimit);
        updatedSubTabData.deductionStandard = stdDed.toString();

        const profTax = Number(name === 'profTaxSec16_iii' ? finalVal : (subTabData.profTaxSec16_iii || 0));
        const chargeableSal = Math.max(0, gross - (stdDed + profTax));
        updatedSubTabData.salaryIncome = chargeableSal.toString();
      }

      // Auto-calculate for ITR4 Presumptive Business (44AD) & Profession (44ADA)
      if (filingType === 'ITR4' && activeTab === 'business') {
        if (name === 'turnoverBank' || name === 'turnoverCash') {
          const bank = Number(name === 'turnoverBank' ? finalVal : (subTabData.turnoverBank || 0));
          const cash = Number(name === 'turnoverCash' ? finalVal : (subTabData.turnoverCash || 0));

          const minDigital = Math.round(bank * 0.06);
          const minCash = Math.round(cash * 0.08);

          if (minDigital > Number(subTabData.incomeDigitalClaimed || 0)) {
            updatedSubTabData.incomeDigitalClaimed = minDigital.toString();
          }
          if (minCash > Number(subTabData.incomeCashClaimed || 0)) {
            updatedSubTabData.incomeCashClaimed = minCash.toString();
          }

          const finalDigital = Number(name === 'turnoverBank' ? minDigital : (subTabData.incomeDigitalClaimed || minDigital));
          const finalCash = Number(name === 'turnoverCash' ? minCash : (subTabData.incomeCashClaimed || minCash));
          updatedSubTabData.totalPresumptiveIncome44AD = (finalDigital + finalCash).toString();
        }
        else if (name === 'incomeDigitalClaimed' || name === 'incomeCashClaimed') {
          const dig = Number(name === 'incomeDigitalClaimed' ? finalVal : (subTabData.incomeDigitalClaimed || 0));
          const csh = Number(name === 'incomeCashClaimed' ? finalVal : (subTabData.incomeCashClaimed || 0));
          updatedSubTabData.totalPresumptiveIncome44AD = (dig + csh).toString();
        }
        else if (name === 'grossReceipts') {
          const receipts = Number(finalVal);
          const minProf = Math.round(receipts * 0.50);
          if (minProf > Number(subTabData.presumptiveIncome44ADA || 0)) {
            updatedSubTabData.presumptiveIncome44ADA = minProf.toString();
          }
        }
      }


      // Auto-calculate presumptiveIncome44AD (min 6% digital + 8% cash)
      if (name === 'turnoverDigital' || name === 'turnoverCash') {
        const digital = Number(name === 'turnoverDigital' ? finalVal : (subTabData.turnoverDigital || 0));
        const cash = Number(name === 'turnoverCash' ? finalVal : (subTabData.turnoverCash || 0));
        const minPresumptive = Math.round(digital * 0.06 + cash * 0.08);
        const currentVal = Number(subTabData.presumptiveIncome44AD || 0);

        if (minPresumptive > currentVal) {
          updatedSubTabData.presumptiveIncome44AD = minPresumptive.toString();
        }
      }
      // Auto-calculate annualValue (grossRent - municipalTaxes)
      else if (name === 'grossRent' || name === 'municipalTaxes') {
        const rent = Number(name === 'grossRent' ? finalVal : (subTabData.grossRent || 0));
        const taxes = Number(name === 'municipalTaxes' ? finalVal : (subTabData.municipalTaxes || 0));
        const calculatedAnnual = Math.max(0, rent - taxes);

        updatedSubTabData.annualValue = calculatedAnnual.toString();
      }
      // Auto-calculate presumptiveIncome44ADA
      else if (name === 'turnover44ADA') {
        const turnover = Number(finalVal || 0);
        const minPresumptive = Math.round(turnover * 0.50);
        updatedSubTabData.presumptiveIncome44ADA = minPresumptive.toString();
      }
      // Auto-calculate netBusinessIncome
      else if (['LLP', 'Firm', 'AOP/BOI'].includes(filingType) && activeTab === 'business') {
        const netProfit = Number(name === 'netProfitAsPerPL' ? finalVal : (subTabData.netProfitAsPerPL || 0));
        const add = Number(name === 'adjustmentsAdd' ? finalVal : (subTabData.adjustmentsAdd || 0));
        const less = Number(name === 'adjustmentsLess' ? finalVal : (subTabData.adjustmentsLess || 0));
        updatedSubTabData.netBusinessIncome = (netProfit + add - less).toString();
      }
      // Auto-calculate Company netIncomeFromBusiness
      else if (['Company Private', 'Company Public'].includes(filingType) && activeTab === 'business') {
        const netProfit = Number(name === 'netProfitAsPerPL' ? finalVal : (subTabData.netProfitAsPerPL || 0));
        const remDir = Number(name === 'remunerationToDirectors' ? finalVal : (subTabData.remunerationToDirectors || 0));
        const incPL = Number(name === 'incomeNotCreditedToPL' ? finalVal : (subTabData.incomeNotCreditedToPL || 0));
        const exp37 = Number(name === 'expensesDisallowed37' ? finalVal : (subTabData.expensesDisallowed37 || 0));
        const exp40 = Number(name === 'expensesDisallowed40A3' ? finalVal : (subTabData.expensesDisallowed40A3 || 0));
        const dep = Number(name === 'depreciation' ? finalVal : (subTabData.depreciation || 0));
        const depAllow = Number(name === 'depreciationAllowable' ? finalVal : (subTabData.depreciationAllowable || 0));
        updatedSubTabData.netIncomeFromBusiness = (netProfit + remDir + incPL + exp37 + exp40 + dep - depAllow).toString();
      }
      // Auto-calculate Company house_property
      else if (['Company Private', 'Company Public'].includes(filingType) && activeTab === 'house_property') {
        const rent = Number(name === 'grossAnnualRent' ? finalVal : (subTabData.grossAnnualRent || 0));
        const taxes = Number(name === 'municipalTaxesPaid' ? finalVal : (subTabData.municipalTaxesPaid || 0));
        const nav = Math.max(0, rent - taxes);
        updatedSubTabData.netAnnualValue = nav.toString();

        const stdDed = Math.round(nav * 0.30);
        updatedSubTabData.standardDeduction30 = stdDed.toString();

        const interest = Number(name === 'homeLoanInterest24b' ? finalVal : (subTabData.homeLoanInterest24b || 0));
        updatedSubTabData.incomeFromHP = (nav - stdDed - interest).toString();
      }
      // Auto-calculate Company capital_gains
      else if (['Company Private', 'Company Public'].includes(filingType) && activeTab === 'capital_gains') {
        const stcg15 = Number(name === 'shortTermCG15Percent' ? finalVal : (subTabData.shortTermCG15Percent || 0));
        const stcgNormal = Number(name === 'shortTermCGOther' ? finalVal : (subTabData.shortTermCGOther || 0));
        const ltcg10 = Number(name === 'longTermCG10Percent' ? finalVal : (subTabData.longTermCG10Percent || 0));
        const ltcg20 = Number(name === 'longTermCG20Percent' ? finalVal : (subTabData.longTermCG20Percent || 0));
        updatedSubTabData.totalCapitalGains = (stcg15 + stcgNormal + ltcg10 + ltcg20).toString();
      }
      // Auto-calculate totalLiabilities
      else if (['LLP', 'Firm', 'AOP/BOI'].includes(filingType) && activeTab === 'bs_sources') {
        const capital = Number(name === 'partnerCapital' ? finalVal : (subTabData.partnerCapital || 0));
        const secured = Number(name === 'securedLoans' ? finalVal : (subTabData.securedLoans || 0));
        const unsecured = Number(name === 'unsecuredLoans' ? finalVal : (subTabData.unsecuredLoans || 0));
        const creditors = Number(name === 'sundryCreditors' ? finalVal : (subTabData.sundryCreditors || 0));
        const otherLiab = Number(name === 'otherLiabilities' ? finalVal : (subTabData.otherLiabilities || 0));
        updatedSubTabData.totalLiabilities = (capital + secured + unsecured + creditors + otherLiab).toString();
      }
      // Auto-calculate netBlockFixedAssets & totalAssets
      else if (['LLP', 'Firm', 'AOP/BOI'].includes(filingType) && activeTab === 'bs_application') {
        const gross = Number(name === 'grossBlockFixedAssets' ? finalVal : (subTabData.grossBlockFixedAssets || 0));
        const accumDep = Number(name === 'depreciationAccumulated' ? finalVal : (subTabData.depreciationAccumulated || 0));
        const netBlock = Math.max(0, gross - accumDep);
        updatedSubTabData.netBlockFixedAssets = netBlock.toString();

        const netBlockVal = name === 'grossBlockFixedAssets' || name === 'depreciationAccumulated' ? netBlock : Number(subTabData.netBlockFixedAssets || 0);
        const inv = Number(name === 'investments' ? finalVal : (subTabData.investments || 0));
        const debtors = Number(name === 'sundryDebtors' ? finalVal : (subTabData.sundryDebtors || 0));
        const cashBal = Number(name === 'cashAndBankBalances' ? finalVal : (subTabData.cashAndBankBalances || 0));
        const stock = Number(name === 'inventories' ? finalVal : (subTabData.inventories || 0));
        const loansAdv = Number(name === 'loansAndAdvances' ? finalVal : (subTabData.loansAndAdvances || 0));

        updatedSubTabData.totalAssets = (netBlockVal + inv + debtors + cashBal + stock + loansAdv).toString();
      }
      // Auto-calculate netProfitPL
      else if (['LLP', 'Firm', 'AOP/BOI'].includes(filingType) && activeTab === 'profit_loss') {
        const gp = Number(name === 'grossProfit' ? finalVal : (subTabData.grossProfit || 0));
        const otherInc = Number(name === 'otherOperatingIncome' ? finalVal : (subTabData.otherOperatingIncome || 0));

        const salaries = Number(name === 'salariesWages' ? finalVal : (subTabData.salariesWages || 0));
        const rent = Number(name === 'rentRatesAndTaxes' ? finalVal : (subTabData.rentRatesAndTaxes || 0));
        const repairs = Number(name === 'repairsAndMaintenance' ? finalVal : (subTabData.repairsAndMaintenance || 0));
        const ins = Number(name === 'insurancePremium' ? finalVal : (subTabData.insurancePremium || 0));
        const printing = Number(name === 'printingAndStationery' ? finalVal : (subTabData.printingAndStationery || 0));
        const dep = Number(name === 'depreciationPL' ? finalVal : (subTabData.depreciationPL || 0));
        const interestExp = Number(name === 'interestExpense' ? finalVal : (subTabData.interestExpense || 0));
        const partnerRem = Number(name === 'partnerRemuneration' ? finalVal : (subTabData.partnerRemuneration || 0));
        const partnerInt = Number(name === 'partnerInterest' ? finalVal : (subTabData.partnerInterest || 0));

        const totalExpenses = salaries + rent + repairs + ins + printing + dep + interestExp + partnerRem + partnerInt;
        updatedSubTabData.netProfitPL = (gp + otherInc - totalExpenses).toString();
      }
      // Auto-calculate Company netProfitBeforeTax
      else if (['Company Private', 'Company Public'].includes(filingType) && activeTab === 'profit_loss') {
        const gp = Number(name === 'grossProfitFromTrading' ? finalVal : (subTabData.grossProfitFromTrading || 0));
        const otherInc = Number(name === 'otherOperatingIncome' ? finalVal : (subTabData.otherOperatingIncome || 0));

        const salaries = Number(name === 'salariesWagesBonuses' ? finalVal : (subTabData.salariesWagesBonuses || 0));
        const rent = Number(name === 'rentRatesTaxes' ? finalVal : (subTabData.rentRatesTaxes || 0));
        const repairs = Number(name === 'repairsAndMaintenance' ? finalVal : (subTabData.repairsAndMaintenance || 0));
        const ins = Number(name === 'insurancePremium' ? finalVal : (subTabData.insurancePremium || 0));
        const dep = Number(name === 'depreciationPL' ? finalVal : (subTabData.depreciationPL || 0));
        const interest = Number(name === 'interestFinanceCharges' ? finalVal : (subTabData.interestFinanceCharges || 0));
        const dirRem = Number(name === 'directorRemuneration' ? finalVal : (subTabData.directorRemuneration || 0));
        const adv = Number(name === 'advertisingExpenses' ? finalVal : (subTabData.advertisingExpenses || 0));

        const totalExp = salaries + rent + repairs + ins + dep + interest + dirRem + adv;
        updatedSubTabData.netProfitBeforeTax = (gp + otherInc - totalExp).toString();
      }
      // Auto-calculate Company chapter6a totalDeductionsVIA
      else if (['Company Private', 'Company Public'].includes(filingType) && activeTab === 'chapter6a') {
        const fields80 = [
          'deduction80G', 'deduction80GGB', 'deduction80GGA', 'deduction80GGC',
          'deduction80IA', 'deduction80IAB', 'deduction80IAC', 'deduction80IB',
          'deduction80IBA', 'deduction80IE', 'deduction80JJA', 'deduction80JJAA',
          'deduction80LA', 'deduction80M', 'deduction80PA'
        ];
        let sum = 0;
        fields80.forEach(f => {
          sum += Number(name === f ? finalVal : (subTabData[f] || 0));
        });
        updatedSubTabData.totalDeductionsVIA = sum.toString();
      }
      // Auto-calculate Company matCreditCarriedForward
      else if (['Company Private', 'Company Public'].includes(filingType) && activeTab === 'mat') {
        const bf = Number(name === 'matCreditBroughtForward' ? finalVal : (subTabData.matCreditBroughtForward || 0));
        const ut = Number(name === 'matCreditUtilizedCurrentYear' ? finalVal : (subTabData.matCreditUtilizedCurrentYear || 0));
        updatedSubTabData.matCreditCarriedForward = Math.max(0, bf - ut).toString();
      }

      const updates = {
        [step]: {
          ...stepData,
          [activeTab]: updatedSubTabData
        }
      };

      if (name === 'optingOutNewRegime') {
        updates.selectedRegime = finalVal === 'Yes' ? 'old' : 'new';
      }

      setFields(updates);
    } else {
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
    }

    setErrors(prev => ({ ...prev, [name]: null }));

    // Recalculate summary automatically
    setTimeout(() => {
      calculateSummary();
      const { errorStepIds } = validateAllSteps();
      setFields({ errorSteps: errorStepIds });
    }, 50);
  };

  // Handle input change for adding new list items (e.g. Coparceners)
  const handleNewMemberChange = (name, value) => {
    setErrors(prev => ({ ...prev, [name]: null }));
    setNewMemberData(prev => {
      const updated = { ...prev, [name]: value };
      if (['Individual', 'ITR1', 'LLP', 'Firm', 'AOP/BOI'].includes(filingType) && activeTab === 'house_property') {
        const propType = name === 'propertyType' ? value : (prev.propertyType || 'Let Out');
        const rent = propType === 'Self Occupied' ? 0 : Number(name === 'rentReceived' ? value : (prev.rentReceived || 0));
        const taxes = propType === 'Self Occupied' ? 0 : Number(name === 'municipalTaxes' ? value : (prev.municipalTaxes || 0));
        const loan = Number(name === 'homeLoanInterest' ? value : (prev.homeLoanInterest || 0));
        const netValue = rent - taxes;
        const stdDeduction = propType === 'Self Occupied' ? 0 : Math.round(netValue * 0.3);
        const income = propType === 'Self Occupied' ? -Math.min(200000, loan) : netValue - stdDeduction - loan;
        updated.incomeFromProperty = income.toString();
      }
      if (filingType === 'ITR3' && activeTab === 'house_property') {
        const rent = Number(name === 'grossRentReceived' ? value : (prev.grossRentReceived || 0));
        const taxes = Number(name === 'localTaxesPaid' ? value : (prev.localTaxesPaid || 0));
        const annual = Math.max(0, rent - taxes);
        const stdDed = Math.round(annual * 0.3);
        updated.annualValueHP = annual.toString();
        updated.standardDeduction30 = stdDed.toString();
      }
      if (filingType === 'ITR3' && activeTab === 'other') {
        const s17_1 = Number(name === 'salarySec17_1' ? value : (prev.salarySec17_1 || 0));
        const s17_2 = Number(name === 'perquisitesSec17_2' ? value : (prev.perquisitesSec17_2 || 0));
        const s17_3 = Number(name === 'profitInLieuSalary' ? value : (prev.profitInLieuSalary || 0));
        const gross = s17_1 + s17_2 + s17_3;
        const regime = state.selectedRegime || 'new';
        const stdDedLimit = regime === 'new' ? 75000 : 50000;
        const stdDed = Math.min(gross, stdDedLimit);
        updated.standardDeduction16 = stdDed.toString();
      }
      return updated;
    });
  };

  // Add list item manually
  const handleAddListItem = (listName, fields) => {
    // Validate list item required fields and formats
    const newErrors = {};
    fields.forEach(f => {
      const val = newMemberData[f.name];
      if (f.required && (!val || String(val).trim() === '')) {
        newErrors[f.name] = `${f.label?.replace(' *', '')} is required`;
      } else if (val && String(val).trim() !== '') {
        const err = validateFieldValue(f.name, val, f.label);
        if (err) {
          newErrors[f.name] = err;
        }
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      const firstErrorMsg = Object.values(newErrors)[0];
      toast.error(firstErrorMsg.includes('required') ? 'Please fill in all required fields marked with *' : firstErrorMsg);
      return;
    }

    setErrors({});

    const currentList = (isStructuredType(filingType))
      ? (state[step]?.[activeTab]?.[listName] || [])
      : (state[listName] || []);
    let itemData = { ...newMemberData, id: getUniqueId() };
    if (listName === 'businessActivities') {
      itemData.slNo = (currentList.length + 1).toString();
    }

    // Bank accounts logic: enforce single active bank account for refund
    if (listName === 'bankAccounts' && itemData.selectedForRefund === 'Yes') {
      const updatedList = currentList.map(item => ({ ...item, selectedForRefund: 'No' }));
      const newList = [...updatedList, itemData];
      if (isStructuredType(filingType)) {
        const stepData = state[step] || {};
        const subTabData = stepData[activeTab] || {};
        setFields({
          [step]: {
            ...stepData,
            [activeTab]: {
              ...subTabData,
              [listName]: newList
            }
          }
        });
      } else {
        setFields({ [listName]: newList });
      }
    } else {
      if (listName === 'bankAccounts' && currentList.length === 0) {
        itemData.selectedForRefund = 'Yes';
      }
      const newList = [...currentList, itemData];
      if (isStructuredType(filingType)) {
        const stepData = state[step] || {};
        const subTabData = stepData[activeTab] || {};
        setFields({
          [step]: {
            ...stepData,
            [activeTab]: {
              ...subTabData,
              [listName]: newList
            }
          }
        });
      } else {
        setFields({ [listName]: newList });
      }
    }

    setNewMemberData({});

    setTimeout(() => {
      calculateSummary();
      toast.success('Entry added successfully.');
    }, 50);
  };

  // Delete list item
  const handleDeleteListItem = (listName, itemId) => {
    const currentList = (isStructuredType(filingType))
      ? (state[step]?.[activeTab]?.[listName] || [])
      : (state[listName] || []);
    const updatedList = currentList.filter(item => item.id !== itemId);

    if (isStructuredType(filingType)) {
      const stepData = state[step] || {};
      const subTabData = stepData[activeTab] || {};
      setFields({
        [step]: {
          ...stepData,
          [activeTab]: {
            ...subTabData,
            [listName]: updatedList
          }
        }
      });
    } else {
      setFields({ [listName]: updatedList });
    }

    setTimeout(() => {
      calculateSummary();
      toast.success('Entry removed.');
    }, 50);
  };

  // Validation before going to next tab
  const handleSaveAndNext = async () => {
    if (!tabConfig) {
      handleNextTab();
      return;
    }

    const currentData = isStructuredType(filingType)
      ? (state[step]?.[activeTab] || {})
      : state;

    const validationErrors = validate(filingType, step, activeTab, currentData);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      const firstErrorMsg = Object.values(validationErrors)[0];
      toast.error(firstErrorMsg.includes('required') ? 'Please fill in all required fields marked with *' : firstErrorMsg);

      const { errorStepIds } = validateAllSteps();
      setFields({ errorSteps: errorStepIds });
      return;
    }

    setErrors({});

    if (isStructuredType(filingType)) {
      try {
        const savePayload = {
          entityType: filingType,
          step: step,
          subTab: activeTab,
          data: state[step]?.[activeTab] || {}
        };
        await itrService.saveDraft(savePayload);
      } catch (error) {
        console.error(`Error saving ${filingType} section draft:`, error);
      }
    }

    const { errorStepIds } = validateAllSteps();
    setFields({ errorSteps: errorStepIds });

    handleNextTab();
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.currentSaveHandler = handleSaveAndNext;
    }
    return () => {
      if (typeof window !== 'undefined') {
        window.currentSaveHandler = null;
      }
    };
  }, [handleSaveAndNext]);

  // If there's no config and it's not the efiling step, render loading
  if (!tabConfig && !(step === 'filing' && activeTab === 'efiling')) {
    return <div className="p-6 bg-white border rounded-lg">Filing step config not found for {filingType} - {step} - {activeTab}</div>;
  }

  const handleEFileSubmit = async () => {
    setIsSubmitting(true);
    try {
      // 1. Pre-filing Validation:
      const { allErrors, errorStepIds, hasAnyError } = validateAllSteps();

      console.log("hasAnyError", hasAnyError);
      console.log("errorStepIds", errorStepIds);
      console.log("allErrors", allErrors);

      if (hasAnyError) {
        setFields({ errorSteps: errorStepIds });
        toast.error("Please complete all required fields before proceeding.");

        // Show local errors if the current tab has them
        const currentStepTabKey = `${step}_${activeTab}`;
        if (allErrors[currentStepTabKey]) {
          setErrors(allErrors[currentStepTabKey]);
        } else {
          setErrors({});
        }

        setIsSubmitting(false);
        return;
      }

      setFields({ errorSteps: [] });
      setErrors({});

      // 2. Prepare Payload:
      const summary = calculateSummary();
      const basePayload = state.getPayload();
      if (user?.id || user?.user_id) {
        basePayload.user_id = user.id || user.user_id;
      } 

      const isStructured = isStructuredType(filingType);
      const permanentInfo = isStructured ? (state.basic?.entity_details || state.details?.permanent || state.details?.general || state.details?.['part-a-gen'] || {}) : {};
      const entityName = isStructured ? (permanentInfo.firstName ? `${permanentInfo.firstName} ${permanentInfo.lastName || ''}`.trim() : permanentInfo.entityName || permanentInfo.hufName || permanentInfo.llpName || permanentInfo.companyName || permanentInfo.firmName || permanentInfo.aopName) : (state.firstName ? `${state.firstName} ${state.lastName || ''}`.trim() : state.hufName || state.entityName || state.companyName || state.firmName || state.societyName || state.llpName);
      const formationDate = isStructured ? (permanentInfo.dobFormation || permanentInfo.formationDate || permanentInfo.dateOfCommencement || permanentInfo.dateOfIncorporation || permanentInfo.dateOfFormation) : (state.dobFormation || state.formationDate);
      const panNumber = isStructured ? (permanentInfo.pan || permanentInfo.panNumber) : (state.pan || state.panNumber);

      const residentialStatusInfo = isStructured ? (state.details?.['residential-status'] || state.details?.general || {}) : {};
      const resStatus = isStructured ? (residentialStatusInfo.residentialStatus || state.residentialStatus) : state.residentialStatus;
      
      const bankInfo = isStructured ? (state.filing?.['filing-verification-step'] || state.filing?.general || {}) : {};
      const bankAccts = isStructured 
        ? [...(bankInfo.primaryBankAccountsTable || []), ...(bankInfo.otherBankAccountsTable || []), ...(state.bankAccounts || [])]
        : (state.bankAccounts || []);

      const addressInfo = isStructured ? (state.details?.['primary-address'] || state.details?.permanent || state.details?.general || {}) : {};

      const payload = {
        ...basePayload,
        taxCalculation: summary,
        reviewData: {
          name: entityName || 'Not Provided',
          pan: panNumber || 'Not Provided',
          formationDate: formationDate || 'Not Provided',
          residentialStatus: resStatus || 'Not Provided',
          filingSection: state.filingSection || 'Not Provided',
          kartaDetails: null,
          membersList: state.coparceners || state.aopMembers || state.directors || [],
          address: {
            flatNo: addressInfo.pFlatDoorBlock || addressInfo.flatNo || state.flatNo || '',
            premiseName: addressInfo.pPremisesBuildingVillage || addressInfo.premiseName || state.premiseName || '',
            roadStreet: addressInfo.pRoadStreetPo || addressInfo.roadStreet || state.roadStreet || '',
            areaLocality: addressInfo.pAreaLocality || addressInfo.areaLocality || state.areaLocality || '',
            city: addressInfo.pTownCityDistrict || addressInfo.city || state.city || '',
            state: addressInfo.pState || addressInfo.state || state.state || '',
            pincode: addressInfo.pPinCode || addressInfo.pincode || state.pincode || '',
            country: addressInfo.pCountry || addressInfo.country || state.country || 'INDIA',
          },
          bankAccounts: bankAccts,
        }
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
        // router.push(`/dashboard/success?ack=${ackNum}`);   

        router.push(`/dashboard`);

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

  // Helper: resolve entity info for any filing type from nested store state
  const resolveEntityInfo = () => {
    const isStructured = isStructuredType(filingType);
    if (!isStructured) return { entityName: null, formationDate: null, panNumber: null };

    if (filingType === 'ITR4') {
      const perm = state.details?.permanent || {};
      const fullName = [perm.firstName, perm.middleName, perm.lastName].filter(Boolean).join(' ');
      return {
        entityName: fullName || '',
        formationDate: perm.dobFormation || '',
        panNumber: perm.panNumber || '',  
      };
    }

    if (filingType === 'ITR2') {
      const perm = state.details?.permanent || {};
      const fullName = [perm.firstName, perm.middleName, perm.lastName].filter(Boolean).join(' ');
      return {
        entityName: fullName || '',
        formationDate: perm.dateOfBirth || '',
        panNumber: perm.panNumber || '',
      };
    }

    if (filingType === 'ITR3') {
      const perm = state.details?.permanent || {};
      const fullName = [perm.firstName, perm.middleName, perm.lastName].filter(Boolean).join(' ');
      return {
        entityName: fullName || '',
        formationDate: perm.dateOfBirth || '',
        panNumber: perm.panNumber || '',
      };
    }

    if (filingType === 'HUF') {
      const perm = state.details?.permanent || {};
      const gen = state.details?.general || {};
      return {
        entityName: perm.hufName || gen.hufName || '',
        formationDate: perm.formationDate || gen.formationDate || '',
        panNumber: perm.panNumber || gen.panNumber || '',
      };
    }
    if (filingType === 'LLP') {
      const info = state.details?.general || {};
      return {
        entityName: info.llpName || '',
        formationDate: info.dateOfFormation || info.formationDate || info.dateOfCommencement || '',
        panNumber: info.panNumber || '',
      };
    }
    if (filingType === 'Firm') {
      const perm = state.details?.permanent || {};
      const gen = state.details?.general || {};
      return {
        entityName: perm.firmName || gen.firmName || gen.llpName || '',
        formationDate: perm.formationDate || gen.formationDate || gen.dateOfFormation || '',
        panNumber: perm.panNumber || gen.panNumber || '',
      };
    }
    if (filingType === 'AOP/BOI') {
      const perm = state.details?.permanent || {};
      const gen = state.details?.general || {};
      return {
        entityName: perm.entityName || gen.entityName || gen.aopName || gen.llpName || '',
        formationDate: perm.formationDate || gen.formationDate || gen.dateOfFormation || '',
        panNumber: perm.panNumber || gen.panNumber || '',
      };
    }
    if (filingType === 'Company Private' || filingType === 'Company Public') {
      const gen = state.details?.general || {};
      const perm = state.details?.permanent || {};
      return {
        entityName: gen.companyName || perm.companyName || '',
        formationDate: gen.dateOfIncorporation || gen.dateOfFormation || gen.dateOfCommencementOfBusiness || perm.formationDate || '',
        panNumber: gen.panNumber || perm.panNumber || '',
      };
    }
    if (filingType === 'Cooperative Society') {
      const perm = state.details?.permanent || {};
      const gen = state.details?.general || {};
      return {
        entityName: perm.societyName || gen.societyName || gen.llpName || '',
        formationDate: perm.formationDate || gen.formationDate || gen.dateOfFormation || '',
        panNumber: perm.panNumber || gen.panNumber || '',
      };
    }
    if (filingType === 'Trust & Exempt Entities') {
      const info = state.basic?.entity_details || {};
      return {
        entityName: info.entityName || info.trustName || '',
        formationDate: info.formationDate || info.dateOfRegistration || '',
        panNumber: info.panNumber || '',
      };
    }
    // Fallback: try permanent then general
    const perm = state.details?.permanent || {};
    const gen = state.details?.general || {};
    return {
      entityName: perm.entityName || gen.entityName || perm.hufName || gen.llpName || gen.firmName || '',
      formationDate: perm.formationDate || gen.formationDate || gen.dateOfFormation || '',
      panNumber: perm.panNumber || gen.panNumber || '',
    };
  };

  // Custom Rendering for E-FILING Summary Tab
  if ((step === 'filing' && (activeTab === 'efiling' || activeTab === 'verification')) || (filingType === 'Trust & Exempt Entities' && step === 'tax' && activeTab === 'verification')) {
    const summary = calculateSummary();
    const entityInfo = resolveEntityInfo();
    const entityName = entityInfo.entityName;
    const formationDate = entityInfo.formationDate;
    const panNumber = entityInfo.panNumber;
    const currentData = isStructuredType(filingType) ? (state[step]?.[activeTab] || {}) : state;
    let efileConfig;
    if (filingType === 'ITR1') {
      efileConfig = itr1ConfigMapping[step]?.[activeTab] || itr1ConfigMapping.filing?.efiling;
    } else if (filingType === 'ITR2') {
      efileConfig = individual2ConfigMapping[step]?.[activeTab] || individual2ConfigMapping.filing?.efiling;
    } else if (filingType === 'ITR3') {
      efileConfig = individual3ConfigMapping[step]?.[activeTab] || individual3ConfigMapping.filing?.efiling;
    } else if (filingType === 'ITR4') {
      efileConfig = itr4ConfigMapping[step]?.[activeTab] || itr4ConfigMapping.filing?.efiling;
    } else {
      efileConfig = fieldsConfig[filingType]?.[step]?.[activeTab] || fieldsConfig[filingType]?.filing?.efiling || fieldsConfig[filingType]?.tax?.verification;
    }
    const isIndividualType = (filingType.startsWith('Individual') || ['ITR1', 'ITR2', 'ITR4'].includes(filingType)) && filingType !== 'ITR3';

    return (
      <div className="flex flex-col gap-6">
        {/* Regime Modals */}
        <RegimeComparisonModal
          isOpen={isRegimeModalOpen}
          onClose={() => setIsRegimeModalOpen(false)}
          onSwitchClick={handleRegimeSwitchClick}
        />
        <ConfirmRegimeChangeModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={handleRegimeConfirm}
          currentRegime={state.selectedRegime}
        />

        {/* General Information Card */}
        {isIndividualType ? (
          <MainSection title="General Information Summary">
            <div className="pt-2">
              <table className="w-full text-sm font-poppins text-left">
                <tbody>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">Full Name</td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold">
                      {entityName || 'Not Provided'}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">Date of Birth</td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold">{formationDate || 'Not Provided'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">PAN</td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold">{panNumber || 'Not Provided'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">Assessment Year</td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold">2026-2027</td>
                  </tr>
                  <tr
                    className="border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors rounded"
                    onClick={handleRegimeRowClick}
                    title="Click to compare or switch regime"
                  >
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">
                      Selected Regime
                      <span className="ml-2 text-xs text-[#3867D6] font-normal">(click to change)</span>
                    </td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold uppercase">
                      {state.selectedRegime === 'new' ? 'New Regime' : 'Old Regime'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </MainSection>
        ) : (
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
                      {entityName || 'Not Provided'}
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">Date of Formation / Incorporation</td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold">{formationDate || 'Not Provided'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">PAN</td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold">{panNumber || 'Not Provided'}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">Assessment Year</td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold">2026-2027</td>
                  </tr>
                  <tr
                    className="border-b border-gray-200 cursor-pointer hover:bg-blue-50 transition-colors rounded"
                    onClick={handleRegimeRowClick}
                    title="Click to compare or switch regime"
                  >
                    <td className="py-3 text-light-gray text-md font-poppins font-medium">
                      Selected Regime
                      <span className="ml-2 text-xs text-[#3867D6] font-normal">(click to change)</span>
                    </td>
                    <td className="py-3 text-right text-black text-md font-poppins font-semibold uppercase">
                      {state.selectedRegime === 'new' ? 'New Regime' : 'Old Regime'}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </FormSection>
        )}

        {/* Tax Computation Summary */}
        {isIndividualType ? (
          <MainSection title={`Summary of Income, Deductions and Taxes (${summary.itrType})`}>
            <div className="pt-2">
              <table className="w-full text-sm font-poppins text-left">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-3 text-black font-semibold w-1/2 uppercase tracking-wide">Particulars</th>
                    <th className="py-3 text-right text-[#3867D6] font-medium w-1/2 bg-[#3867D6]/10 pr-4 rounded-tr-md">
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
                    <td className="py-4 text-right font-semibold text-black bg-[#3867D6]/10 pr-4">₹ {summary.grossIncome.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 text-light-gray text-md font-poppins">Total Deductions (Chapter VI-A)</td>
                    <td className="py-4 text-right font-semibold text-black bg-[#3867D6]/10 pr-4">₹ {summary.totalDeductions.toLocaleString('en-IN')}</td>
                  </tr>
                  {(summary.standardDeduction > 0) && (
                    <tr className="border-b border-gray-200">
                      <td className="py-4 text-light-gray text-md font-poppins">Standard Deduction (Salary)</td>
                      <td className="py-4 text-right font-semibold text-black bg-[#3867D6]/10 pr-4">₹ {summary.standardDeduction.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  <tr className="border-b border-gray-200">
                    <td className="py-4 text-light-gray text-md font-poppins">Net Taxable Income</td>
                    <td className="py-4 text-right font-semibold text-black bg-[#3867D6]/10 pr-4">₹ {summary.taxableIncome.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 text-light-gray text-md font-poppins">Basic Slab Tax</td>
                    <td className="py-4 text-right font-semibold text-black bg-[#3867D6]/10 pr-4">₹ {summary.slabTax.toLocaleString('en-IN')}</td>
                  </tr>
                  {summary.surcharge > 0 && (
                    <tr className="border-b border-gray-200">
                      <td className="py-4 text-light-gray text-md font-poppins">Surcharge</td>
                      <td className="py-4 text-right font-semibold text-black bg-[#3867D6]/10 pr-4">₹ {summary.surcharge.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
                  <tr className="border-b border-gray-200">
                    <td className="py-4 text-light-gray text-md font-poppins">Education Cess (4%)</td>
                    <td className="py-4 text-right font-semibold text-black bg-[#3867D6]/10 pr-4">₹ {summary.cess.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 text-light-gray text-md font-poppins font-semibold">Total Tax Liability</td>
                    <td className="py-4 text-right font-bold text-black bg-[#3867D6]/10 pr-4">₹ {summary.estimatedTax.toLocaleString('en-IN')}</td>
                  </tr>
                  <tr className="border-b border-gray-200">
                    <td className="py-4 text-light-gray text-md font-poppins">Taxes Already Paid (TDS/TCS/Advance/Self)</td>
                    <td className="py-4 text-right font-semibold text-black bg-[#3867D6]/10 pr-4">₹ {(summary.taxesPaid ?? 0).toLocaleString('en-IN')}</td>
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
          </MainSection>
        ) : (
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
                  {(summary.standardDeduction > 0) && (
                    <tr className="border-b border-gray-200">
                      <td className="py-4 text-light-gray text-md font-poppins">Standard Deduction (Salary)</td>
                      <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {summary.standardDeduction.toLocaleString('en-IN')}</td>
                    </tr>
                  )}
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
                    <td className="py-4 text-light-gray text-md font-poppins">Taxes Already Paid (TDS/TCS/Advance/Self)</td>
                    <td className="py-4 text-right font-semibold text-black bg-brand-blue/10 pr-4">₹ {(summary.taxesPaid ?? 0).toLocaleString('en-IN')}</td>
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
        )}

        {/* Verification & Declaration */}
        {efileConfig && efileConfig.sections && (
          isIndividualType ? (
            <MainSection title={efileConfig.title || "Filing Declaration & Verification"}>
              <div className="pt-2 flex flex-col gap-6">
                <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="font-poppins font-normal text-sm text-[#1E1E1E] leading-6">
                    I, <span className="font-semibold text-black">{entityName || '[Full Name]'}</span>, solemnly declare that to the best of my knowledge and belief, the information given in the return and the schedules thereto is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961.
                  </p>
                </div>

                <div className="flex flex-col gap-1 w-full mt-4">
                  {efileConfig.sections.map((sec) =>
                    sec.fields.map((field, fieldIdx) => {
                      const val = currentData[field.name] || '';
                      const isNumber = field.type === 'number';

                      if (field.type === 'select') {
                        return (
                          <FormRow key={fieldIdx} label={getFieldLabel(field)}>
                            <ManualSelect
                              label="Select"
                              name={field.name}
                              value={val}
                              onChange={(e) => handleFieldChange(field.name, e.target.value, isNumber)}
                              error={errors[field.name]}
                              touched={!!errors[field.name]}
                            >
                              <option value="" disabled>Select Option</option>
                              {field.options?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </ManualSelect>
                          </FormRow>
                        );
                      }

                      return (
                        <FormRow key={fieldIdx} label={getFieldLabel(field)}>
                          <ManualInput
                            type={field.type || 'text'}
                            label="Type"
                            name={field.name}
                            placeholder={field.placeholder || ''}
                            value={val}
                            onChange={(e) => handleFieldChange(field.name, e.target.value, isNumber)}
                            error={errors[field.name]}
                            touched={!!errors[field.name]}
                          />
                        </FormRow>
                      );
                    })
                  )}
                </div>
              </div>
            </MainSection>
          ) : (
            <FormSection
              title={efileConfig.title || "Filing Declaration & Verification"}
              description={efileConfig.subtitle || "Please verify and sign the declaration below to complete filing."}
              icon={MdSecurity}
              defaultExpanded={true}
              alwaysOpen={true}
              hideArrow={true}
            >
              <div className="pt-2 flex flex-col gap-6">
                {/* Optional: Render declaration text if desired */}
                {filingType === 'HUF' && (
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-poppins font-normal text-sm text-[#1E1E1E] leading-6">
                      I, <span className="font-semibold text-black">{state.details?.general?.kartaName || state.details?.permanent?.kartaName || '[Karta Name]'}</span>, in my capacity as Karta of this HUF solemnly declare that to the best of my knowledge and belief, the information given in the return and the schedules thereto is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961.
                    </p>
                  </div>
                )}
                {['Company Private', 'Company Public'].includes(filingType) && (
                  <div className="flex items-start gap-3 bg-gray-50 p-4 rounded-lg border border-gray-200">
                    <p className="font-poppins font-normal text-sm text-[#1E1E1E] leading-6">
                      I solemnly declare that to the best of my knowledge and belief, the information given in the return and the schedules thereto is correct and complete and is in accordance with the provisions of the Income-tax Act, 1961. I further declare that I am holding the designation selected below and am authorized to sign this return.
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                  {efileConfig.sections.map((sec) =>
                    sec.fields.map((field, fieldIdx) => {
                      const val = currentData[field.name] || '';
                      const isNumber = field.type === 'number';

                      if (field.type === 'select') {
                        return (
                          <FloatingInput
                            key={fieldIdx}
                            as="select"
                            label={getFieldLabel(field)}
                            name={field.name}
                            value={val}
                            onChange={(e) => handleFieldChange(field.name, e.target.value, isNumber)}
                            error={errors[field.name]}
                            touched={!!errors[field.name]}
                          >
                            <option value="" disabled>Select {field.label?.replace(' *', '')}</option>
                            {field.options?.map(opt => (
                              <option key={opt} value={opt}>{opt}</option>
                            ))}
                          </FloatingInput>
                        );
                      }

                      return (
                        <FloatingInput
                          key={fieldIdx}
                          type={field.type || 'text'}
                          label={getFieldLabel(field)}
                          name={field.name}
                          placeholder={field.placeholder || ''}
                          value={val}
                          onChange={(e) => handleFieldChange(field.name, e.target.value, isNumber)}
                          error={errors[field.name]}
                          touched={!!errors[field.name]}
                        />
                      );
                    })
                  )}
                </div>
              </div>
            </FormSection>
          )
        )}

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
  const isIndividualType = filingType.startsWith('Individual') || ['ITR1', 'ITR2', 'ITR3', 'ITR4'].includes(filingType);

  if (isIndividualType) {
    return (
      <div className="flex flex-col gap-6 w-full pb-12 animate-fade-in">
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
            if (section.condition && typeof section.condition === 'function') {
              if (!section.condition(state)) return null;
            }

            return (
              <MainSection key={sectionIdx} title={section.title}>
                {section.infoBox && (
                  <div className="flex items-start gap-2.5 p-4 bg-[#F2F8FD] border border-[#D0E8F9] rounded-lg mb-6 select-none">
                    <span className="text-[#3867D6] font-semibold text-lg leading-none">ℹ</span>
                    <p className="font-poppins text-[#1E1E1E] font-normal text-[13px] leading-5">
                      {section.infoBox}
                    </p>
                  </div>
                )}

                {section.description && (
                  <p className="font-poppins text-[#8E8E93] font-normal text-[15px] leading-5 mb-4">
                    {section.description}
                  </p>
                )}

                {section.isList ? (
                  // List rendering (e.g. house property list / bank accounts / tds rows)
                  <div className="flex flex-col gap-6 w-full">
                    {/* List Table */}
                    <div className="border border-gray-200 rounded-lg w-full overflow-hidden">
                      <div className="w-full overflow-x-auto table-scrollbar">
                        <table className="w-full min-w-max text-sm font-poppins text-left">
                          <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                              {section.fields.filter(shouldRenderField).map(f => (
                                <th key={f.name} className="p-3 text-gray-700 font-semibold whitespace-nowrap">{renderLabelWithAsterisk(getFieldLabel(f))}</th>
                              ))}
                              <th className="p-3 text-gray-700 font-semibold text-center w-20 whitespace-nowrap">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {(!(state[step]?.[activeTab]?.[section.listName]) || state[step]?.[activeTab]?.[section.listName].length === 0) ? (
                              <tr>
                                <td colSpan={section.fields.filter(shouldRenderField).length + 1} className="p-6 text-center text-[#8E8E93] break-words whitespace-normal">
                                  No entries added yet. Add manually below.
                                </td>
                              </tr>
                            ) : (
                              state[step]?.[activeTab]?.[section.listName].map((item, idx) => (
                                <tr key={item.id || idx} className="border-b border-gray-100 hover:bg-gray-50">
                                  {section.fields.filter(shouldRenderField).map(f => (
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
                    </div>

                    {errors[section.listName] && (
                      <div className="text-red-500 font-poppins text-sm -mt-2 px-1 font-medium">
                        {errors[section.listName]}
                      </div>
                    )}

                    {/* Add Row Form (using FormRow pattern for list inputs) */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 flex flex-col gap-4">
                      <p className="font-poppins font-semibold text-sm text-black">Add Entry Details</p>
                      {section.fields.filter(shouldRenderField).map(field => {
                        const isNum = field.type === 'number';
                        const fieldVal = newMemberData[field.name] || '';

                        if (field.type === 'select') {
                          return (
                            <FormRow key={field.name} label={getFieldLabel(field)}>
                              <ManualSelect
                                label="Select"
                                name={field.name}
                                value={fieldVal}
                                onChange={(e) => handleNewMemberChange(field.name, e.target.value)}
                                error={errors[field.name]}
                                touched={!!errors[field.name]}
                              >
                                <option value="">Select Option</option>
                                {field.options?.map(opt => {
                                  const val = typeof opt === 'object' ? opt.value : opt;
                                  const lbl = typeof opt === 'object' ? opt.label : opt;
                                  return (
                                    <option key={val} value={val}>{lbl}</option>
                                  );
                                })}
                              </ManualSelect>
                            </FormRow>
                          );
                        }

                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <ManualInput
                              label={getInputPlaceholderLabel(field)}
                              type="text"
                              placeholder={field.placeholder || ''}
                              name={field.name}
                              value={fieldVal}
                              onChange={(e) => {
                                const val = isNum ? e.target.value.replace(/[^0-9]/g, "") : e.target.value;
                                handleNewMemberChange(field.name, val);
                              }}
                              error={errors[field.name]}
                              touched={!!errors[field.name]}
                            />
                          </FormRow>
                        );
                      })}

                      <div className="mt-2 flex justify-start">
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
                  // Standard fields: Side-by-side using FormRow
                  <div className="flex flex-col gap-1 w-full">
                    {section.fields.filter(shouldRenderField).map(field => {
                      const isNumber = field.type === 'number';
                      const val = state[step]?.[activeTab]?.[field.name] || '';

                      const renderHelperText = (text) => {
                        if (!text) return null;
                        if (text.includes("Search it Here")) {
                          const parts = text.split("Search it Here");
                          return (
                            <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] mt-1.5 font-poppins w-full select-none">
                              <span>ⓘ</span>
                              <span>
                                {parts[0]}
                                <a href="https://uidai.gov.in/" target="_blank" rel="noopener noreferrer" className="text-[#3867D6] hover:underline font-medium">Search it Here.</a>
                                {parts[1]}
                              </span>
                            </div>
                          );
                        }
                        return (
                          <div className="flex items-center gap-1.5 text-xs text-[#8E8E93] mt-1.5 font-poppins w-full select-none">
                            <span>ⓘ</span>
                            <span>{text}</span>
                          </div>
                        );
                      };

                      if (field.type === 'nameGroup') {
                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <div className="flex flex-col w-full sm:max-w-[680px] sm:w-full gap-1">
                              <div className="flex flex-col sm:flex-row gap-3 w-full h-11">
                                {field.fields.map(subField => {
                                  const subVal = state[step]?.[activeTab]?.[subField.name] || '';
                                  return (
                                    <ManualInput
                                      key={subField.name}
                                      label={getInputPlaceholderLabel(subField)}
                                      name={subField.name}
                                      value={subVal}
                                      onChange={(e) => handleFieldChange(subField.name, e.target.value)}
                                      error={errors[subField.name]}
                                      touched={!!errors[subField.name]}
                                      className="flex-1 min-w-[120px]"
                                      fullWidth
                                    />
                                  );
                                })}
                              </div>
                              {renderHelperText(field.helperText)}
                            </div>
                          </FormRow>
                        );
                      }

                      if (field.type === 'phoneGroup') {
                        const codeField = field.fields[0];
                        const numField = field.fields[1];
                        const codeVal = state[step]?.[activeTab]?.[codeField.name] || '+91';
                        const numVal = state[step]?.[activeTab]?.[numField.name] || '';
                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <div className="flex flex-col w-full sm:w-[320px] gap-1">
                              <div className="flex gap-2 w-full h-11">
                                <ManualSelect
                                  label={getInputPlaceholderLabel(codeField)}
                                  name={codeField.name}
                                  value={codeVal}
                                  onChange={(e) => handleFieldChange(codeField.name, e.target.value)}
                                  className="w-[85px]"
                                >
                                  {codeField.options?.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                  ))}
                                </ManualSelect>
                                <ManualInput
                                  label={getInputPlaceholderLabel(numField)}
                                  name={numField.name}
                                  value={numVal}
                                  onChange={(e) => handleFieldChange(numField.name, e.target.value.replace(/[^0-9]/g, ""))}
                                  error={errors[numField.name]}
                                  touched={!!errors[numField.name]}
                                  className="flex-1"
                                  fullWidth
                                />
                              </div>
                              {renderHelperText(field.helperText)}
                            </div>
                          </FormRow>
                        );
                      }

                      if (field.type === 'addressGroup') {
                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <div className="flex flex-col w-full sm:max-w-[680px] sm:w-full gap-1">
                              <div className="flex flex-col sm:flex-row gap-3 w-full h-11">
                                {field.fields.map(subField => {
                                  const subVal = state[step]?.[activeTab]?.[subField.name] || '';
                                  return (
                                    <ManualSelect
                                      key={subField.name}
                                      label={getInputPlaceholderLabel(subField)}
                                      name={subField.name}
                                      value={subVal}
                                      onChange={(e) => handleFieldChange(subField.name, e.target.value)}
                                      error={errors[subField.name]}
                                      touched={!!errors[subField.name]}
                                      className="flex-1 min-w-[120px]"
                                    >
                                      <option value="">Select Option</option>
                                      {subField.options?.map(opt => (
                                        <option key={opt} value={opt}>{opt}</option>
                                      ))}
                                    </ManualSelect>
                                  );
                                })}
                              </div>
                              {renderHelperText(field.helperText)}
                            </div>
                          </FormRow>
                        );
                      }

                      if (field.type === 'list') {
                        const listData = state[step]?.[activeTab]?.[field.listName] || [];
                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <div className="flex flex-col gap-4 w-full sm:max-w-[680px]">
                              {listData.map((item, idx) => (
                                <div key={item.id || idx} className="flex gap-2 items-center w-full">
                                  <ManualSelect
                                    label="Nature"
                                    value={item.nature || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], nature: e.target.value };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    className="flex-1"
                                  >
                                    <option value="">Select Nature u/s 10</option>
                                    {field.options?.map(opt => (
                                      <option key={opt} value={opt}>{opt}</option>
                                    ))}
                                  </ManualSelect>
                                  <ManualInput
                                    label="Amount ₹"
                                    value={item.amount || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], amount: e.target.value.replace(/[^0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    className="flex-1"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedList = listData.filter((_, i) => i !== idx);
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    className="text-red-500 hover:text-red-700 p-2"
                                  >
                                    <FiTrash2 size={18} />
                                  </button>
                                </div>
                              ))}
                              <div className="flex justify-end mt-1">
                                <Button
                                  variant="brand"
                                  type="button"
                                  onClick={() => {
                                    const updatedList = [...listData, { id: Date.now(), nature: '', amount: '' }];
                                    handleFieldChange(field.listName, updatedList);
                                  }}
                                  className="px-4 py-1.5 text-white font-poppins font-medium rounded text-xs"
                                >
                                  Add
                                </Button>
                              </div>
                            </div>
                          </FormRow>
                        );
                      }

                      if (field.type === 'coOwnersList') {
                        const listData = state[step]?.[activeTab]?.[field.listName] || [];
                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <div className="flex flex-col gap-4 w-full sm:max-w-[750px]">
                              {listData.map((item, idx) => (
                                <div key={item.id || idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-md relative">
                                  <ManualInput
                                    label="Name of Other Co-owner(s)"
                                    value={item.name || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], name: e.target.value };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="PAN of the Co-owner(s)"
                                    value={item.pan || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], pan: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="Aadhaar No. of other Co-owner(s)"
                                    value={item.aadhaar || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], aadhaar: e.target.value.replace(/[^0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="Percentage share of other Co-owner(s)"
                                    value={item.share || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], share: e.target.value.replace(/[^0-9.]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedList = listData.filter((_, i) => i !== idx);
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                </div>
                              ))}
                              <div className="flex justify-end mt-1">
                                <Button
                                  variant="brand"
                                  type="button"
                                  onClick={() => {
                                    const updatedList = [...listData, { id: Date.now(), name: '', pan: '', aadhaar: '', share: '' }];
                                    handleFieldChange(field.listName, updatedList);
                                  }}
                                  className="px-4 py-1.5 text-white font-poppins font-medium rounded text-xs"
                                >
                                  Add Co-owner
                                </Button>
                              </div>
                            </div>
                          </FormRow>
                        );
                      }

                      if (field.type === 'tenantsList') {
                        const listData = state[step]?.[activeTab]?.[field.listName] || [];
                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <div className="flex flex-col gap-4 w-full sm:max-w-[750px]">
                              {listData.map((item, idx) => (
                                <div key={item.id || idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-md relative">
                                  <ManualInput
                                    label="Name(s) of Tenant"
                                    value={item.name || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], name: e.target.value };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="PAN of the Tenant(s) (if available)"
                                    value={item.pan || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], pan: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="Aadhaar No. of Tenant(s) (if available)"
                                    value={item.aadhaar || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], aadhaar: e.target.value.replace(/[^0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="TAN/TIN of Tenant(s) (if TDS credit is claimed)"
                                    value={item.tan || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], tan: e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedList = listData.filter((_, i) => i !== idx);
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                </div>
                              ))}
                              <div className="flex justify-end mt-1">
                                <Button
                                  variant="brand"
                                  type="button"
                                  onClick={() => {
                                    const updatedList = [...listData, { id: Date.now(), name: '', pan: '', aadhaar: '', tan: '' }];
                                    handleFieldChange(field.listName, updatedList);
                                  }}
                                  className="px-4 py-1.5 text-white font-poppins font-medium rounded text-xs"
                                >
                                  Add Tenant
                                </Button>
                              </div>
                            </div>
                          </FormRow>
                        );
                      }

                      if (field.type === 'loansList') {
                        const listData = state[step]?.[activeTab]?.[field.listName] || [];
                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <div className="flex flex-col gap-4 w-full sm:max-w-[750px]">
                              {listData.map((item, idx) => (
                                <div key={item.id || idx} className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-gray-50 border border-gray-200 rounded-md relative">
                                  <ManualSelect
                                    label="Loan taken from"
                                    value={item.loanSource || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], loanSource: e.target.value };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                  >
                                    <option value="">Select Option</option>
                                    <option value="Bank">Bank</option>
                                    <option value="Institution">Institution</option>
                                    <option value="Person">Person</option>
                                  </ManualSelect>
                                  <ManualInput
                                    label="Name of the Bank / Institution / Person from which loan is taken"
                                    value={item.lenderName || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], lenderName: e.target.value };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="Loan account number of the Bank/Institution"
                                    value={item.loanAccountNo || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], loanAccountNo: e.target.value };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="Date of sanction of loan"
                                    placeholder="DD/MM/YYYY"
                                    value={item.sanctionDate || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], sanctionDate: e.target.value };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="Total amount of loan"
                                    value={item.totalLoan || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], totalLoan: e.target.value.replace(/[^0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="Loan outstanding on last date of financial year"
                                    value={item.outstanding || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], outstanding: e.target.value.replace(/[^0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <ManualInput
                                    label="Interest on borrowed capital u/s 24(b)"
                                    value={item.interest || ''}
                                    onChange={(e) => {
                                      const updatedList = [...listData];
                                      updatedList[idx] = { ...updatedList[idx], interest: e.target.value.replace(/[^0-9]/g, "") };
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    fullWidth
                                  />
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const updatedList = listData.filter((_, i) => i !== idx);
                                      handleFieldChange(field.listName, updatedList);
                                    }}
                                    className="absolute top-2 right-2 text-red-500 hover:text-red-700 p-2"
                                  >
                                    <FiTrash2 size={16} />
                                  </button>
                                </div>
                              ))}
                              <div className="flex justify-end mt-1">
                                <Button
                                  variant="brand"
                                  type="button"
                                  onClick={() => {
                                    const updatedList = [...listData, { id: Date.now(), loanSource: '', lenderName: '', loanAccountNo: '', sanctionDate: '', totalLoan: '', outstanding: '', interest: '' }];
                                    handleFieldChange(field.listName, updatedList);
                                  }}
                                  className="px-4 py-1.5 text-white font-poppins font-medium rounded text-xs"
                                >
                                  Add Loan
                                </Button>
                              </div>
                            </div>
                          </FormRow>
                        );
                      }

                      if (field.type === 'select') {
                        return (
                          <FormRow key={field.name} label={getFieldLabel(field)}>
                            <div className="flex flex-col w-full sm:w-[320px] gap-1">
                              <ManualSelect
                                label="Select"
                                name={field.name}
                                value={val}
                                onChange={(e) => handleFieldChange(field.name, e.target.value)}
                                error={errors[field.name]}
                                touched={!!errors[field.name]}
                              >
                                <option value="">Select Option</option>
                                {field.options?.map(opt => {
                                  const val = typeof opt === 'object' ? opt.value : opt;
                                  const lbl = typeof opt === 'object' ? opt.label : opt;
                                  return (
                                    <option key={val} value={val}>{lbl}</option>
                                  );
                                })}
                              </ManualSelect>
                              {renderHelperText(field.helperText)}
                            </div>
                          </FormRow>
                        );
                      }

                      return (
                        <FormRow key={field.name} label={getFieldLabel(field)}>
                          <div className="flex flex-col w-full sm:w-[320px] gap-1">
                            <ManualInput
                              label={field.inputLabel || getInputPlaceholderLabel(field)}
                              placeholder={field.placeholder || ''}
                              name={field.name}
                              value={val}
                              disabled={field.disabled || false}
                              onChange={(e) => handleFieldChange(field.name, e.target.value, isNumber)}
                              error={errors[field.name]}
                              touched={!!errors[field.name]}
                            />
                            {renderHelperText(field.helperText)}
                          </div>
                        </FormRow>
                      );
                    })}
                  </div>
                )}
              </MainSection>
            );
          })}
        </div>
      </div>
    );
  }

  // Normal Form Rendering (HUF / LLP / Company etc.)
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
          if (section.condition && typeof section.condition === 'function') {
            if (!section.condition(state)) return null;
          }
          const isSingleInput = !section.isList && section.fields?.length === 1;

          if (isSingleInput) {
            const field = section.fields[0];
            const isNumber = field.type === 'number';
            const val = isStructuredType(filingType)
              ? (state[step]?.[activeTab]?.[field.name] || '')
              : (state[field.name] || '');
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
                  <div className="border border-gray-200 rounded-lg overflow-x-auto table-scrollbar">
                    <table className="w-full min-w-max text-sm font-poppins text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          {section.fields.filter(shouldRenderField).map(f => (
                            <th key={f.name} className="p-3 text-gray-700 font-semibold whitespace-nowrap">{renderLabelWithAsterisk(getFieldLabel(f))}</th>
                          ))}
                          <th className="p-3 text-gray-700 font-semibold text-center w-20 whitespace-nowrap">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(!(isStructuredType(filingType) ? state[step]?.[activeTab]?.[section.listName] : state[section.listName]) || (isStructuredType(filingType) ? state[step]?.[activeTab]?.[section.listName] : state[section.listName]).length === 0) ? (
                          <tr>
                            <td colSpan={section.fields.filter(shouldRenderField).length + 1} className="p-6 text-center text-[#8E8E93]">
                              No members added yet. Add manually below.
                            </td>
                          </tr>
                        ) : (
                          (isStructuredType(filingType) ? state[step]?.[activeTab]?.[section.listName] : state[section.listName]).map((item, idx) => (
                            <tr key={item.id || idx} className="border-b border-gray-100 hover:bg-gray-50">
                              {section.fields.filter(shouldRenderField).map(f => (
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

                  {errors[section.listName] && (
                    <div className="text-red-500 font-poppins text-sm -mt-2 px-1 font-medium">
                      {errors[section.listName]}
                    </div>
                  )}

                  {/* Direct Manual Input Add Row */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <p className="font-poppins font-semibold text-sm mb-4 text-black">Add {section.title} Manually</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {section.fields.filter(shouldRenderField).map(field => {
                        if (field.type === 'select') {
                          return (
                            <FloatingInput
                              key={field.name}
                              as="select"
                              label={getFieldLabel(field)}
                              name={field.name}
                              value={newMemberData[field.name] || ''}
                              onChange={(e) => handleNewMemberChange(field.name, e.target.value)}
                              error={errors[field.name]}
                              touched={!!errors[field.name]}
                            >
                              <option value="">Select Option</option>
                              {field.options?.map(opt => {
                                const val = typeof opt === 'object' ? opt.value : opt;
                                const lbl = typeof opt === 'object' ? opt.label : opt;
                                return (
                                  <option key={val} value={val}>{lbl}</option>
                                );
                              })}
                            </FloatingInput>
                          );
                        }
                        const isNum = field.type === 'number';
                        return (
                          <FloatingInput
                            key={field.name}
                            type={isNum ? 'text' : field.type}
                            placeholder={field.placeholder || ''}
                            label={getFieldLabel(field)}
                            name={field.name}
                            value={newMemberData[field.name] || ''}
                            onChange={(e) => {
                              const val = isNum ? e.target.value.replace(/[^0-9]/g, "") : e.target.value;
                              handleNewMemberChange(field.name, val);
                            }}
                            error={errors[field.name]}
                            touched={!!errors[field.name]}
                            {...getFieldInputProps(field.name, field.type)}
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
                  {section.fields.filter(shouldRenderField).map(field => {
                    const isNumber = field.type === 'number';
                    const val = isStructuredType(filingType)
                      ? (state[step]?.[activeTab]?.[field.name] || '')
                      : (state[field.name] || '');

                    if (field.type === 'select') {
                      return (
                        <FloatingInput
                          key={field.name}
                          as="select"
                          label={getFieldLabel(field)}
                          name={field.name}
                          value={val}
                          onChange={(e) => handleFieldChange(field.name, e.target.value)}
                          error={errors[field.name]}
                          touched={!!errors[field.name]}
                        >
                          <option value="">Select Option</option>
                          {field.options?.map(opt => {
                            const val = typeof opt === 'object' ? opt.value : opt;
                            const lbl = typeof opt === 'object' ? opt.label : opt;
                            return (
                              <option key={val} value={val}>{lbl}</option>
                            );
                          })}
                        </FloatingInput>
                      );
                    }

                    return (
                      <FloatingInput
                        key={field.name}
                        type={field.type === 'number' ? 'text' : field.type}
                        placeholder={field.placeholder || ''}
                        label={getFieldLabel(field)}
                        name={field.name}
                        value={val}
                        disabled={field.disabled || false}
                        onChange={(e) => handleFieldChange(field.name, e.target.value, isNumber)}
                        error={errors[field.name]}
                        touched={!!errors[field.name]}
                        {...getFieldInputProps(field.name, field.type)}
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

