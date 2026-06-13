"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useItrStore } from '@/store/itrStore';
import { useAuth } from '@/context/AuthContext';
import { fieldsConfig } from '@/config/fieldsConfig';
import { filingTypeConfig } from '@/config/filingConfig';
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
import RegimeComparisonModal from '@/components/modals/RegimeComparisonModal';
import ConfirmRegimeChangeModal from '@/components/modals/ConfirmRegimeChangeModal';

const getUniqueId = () => Date.now();

const isStructuredType = (type) => ['HUF', 'LLP', 'Firm', 'AOP/BOI', 'Company Private', 'Company Public', 'Trust & Exempt Entities'].includes(type);

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
    const tabFieldsConfig = fieldsConfig[entityType]?.[currentStep]?.[currentSubTab];
    if (!tabFieldsConfig || !tabFieldsConfig.sections) return newErrors;

    // Skip validation for optional steps/subtabs if they are completely empty
    const isMandatoryStep = ['details', 'filing', 'basic', 'personal', 'audit', 'tax'].includes(currentStep);
    if (!isMandatoryStep && isSubtabEmpty(data)) {
      return newErrors;
    }

    tabFieldsConfig.sections.forEach(section => {
      if (!section.isList) {
        section.fields.forEach(field => {
          if (field.condition && !field.condition(state)) return;
          if (field.conditionalOn) {
            const triggerVal = data[field.conditionalOn.field];
            if (triggerVal !== field.conditionalOn.value) return;
          }

          const val = data[field.name];
          if (field.required && (val === undefined || val === null || String(val).trim() === '')) {
            newErrors[field.name] = `${field.label?.replace(' *', '')} is required`;
          } else if (val !== undefined && val !== null && String(val).trim() !== '') {
            const err = validateFieldValue(field.name, val, field.label);
            if (err) {
              newErrors[field.name] = err;
            }
          }
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
        if (stepRoute === 'filing' && tabKey === 'bank') {
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
    const nameLower = name?.toLowerCase() || '';
    let finalVal = value;

    if (isNumber || nameLower.includes('income') || nameLower.includes('turnover') || nameLower.includes('amount') || nameLower.includes('profit') || nameLower.includes('deduction') || nameLower.includes('rent') || nameLower.includes('receipt') || nameLower.includes('tax')) {
      // Allow only digits for pure number fields
      finalVal = value.replace(/[^0-9]/g, "");
    } else if (nameLower.includes('pan') || (nameLower.includes('tan') && (nameLower.includes('deductor') || nameLower.includes('collector')))) {
      // PAN/TAN: uppercase alphanumeric only
      finalVal = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    } else if (nameLower.includes('ifsc')) {
      finalVal = value.toUpperCase().replace(/[^A-Z0-9]/g, "");
    } else if (nameLower.includes('mobile') || nameLower.includes('aadhaar') || nameLower.includes('pincode')) {
      // Digits only
      finalVal = value.replace(/[^0-9]/g, "");
    }

    if (isStructuredType(filingType)) {
      const stepData = state[step] || {};
      const subTabData = stepData[activeTab] || {};
      const updatedSubTabData = { ...subTabData, [name]: finalVal };

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
      if (['LLP', 'Firm', 'AOP/BOI'].includes(filingType) && activeTab === 'house_property') {
        const rent = Number(name === 'rentReceived' ? value : (prev.rentReceived || 0));
        const taxes = Number(name === 'municipalTaxes' ? value : (prev.municipalTaxes || 0));
        const loan = Number(name === 'homeLoanInterest' ? value : (prev.homeLoanInterest || 0));
        const netValue = rent - taxes;
        const stdDeduction = Math.round(netValue * 0.3);
        const income = netValue - stdDeduction - loan;
        updated.incomeFromProperty = income.toString();
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

  const handleEFileSubmit = async () => {
    setIsSubmitting(true); 
    try {
      // 1. Pre-filing Validation:
      const { allErrors, errorStepIds, hasAnyError } = validateAllSteps();  
        
      console.log("hasAnyError",hasAnyError); 
      console.log("errorStepIds",errorStepIds);  
      console.log("allErrors",allErrors); 

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
      const permanentInfo = isStructured ? (state.basic?.entity_details || state.details?.permanent || state.details?.general || {}) : {};
      const entityName = isStructured ? (permanentInfo.entityName || permanentInfo.hufName || permanentInfo.llpName || permanentInfo.companyName || permanentInfo.firmName || permanentInfo.aopName) : (state.hufName || state.entityName || state.companyName || state.firmName || state.societyName || state.llpName);
      const formationDate = isStructured ? (permanentInfo.formationDate || permanentInfo.dateOfCommencement || permanentInfo.dateOfIncorporation || permanentInfo.dateOfFormation) : state.formationDate;
      const panNumber = isStructured ? (permanentInfo.panNumber || permanentInfo.pan) : state.panNumber;

      const payload = {
        ...basePayload,
        taxCalculation: summary,
        reviewData: {
          name: entityName || 'Not Provided',
          pan: panNumber || 'Not Provided',
          formationDate: formationDate || 'Not Provided',
          residentialStatus: state.residentialStatus || 'Not Provided',
          filingSection: state.filingSection || 'Not Provided',
          kartaDetails: null,
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
  if ((step === 'filing' && activeTab === 'efiling') || (filingType === 'Trust & Exempt Entities' && step === 'tax' && activeTab === 'verification')) {
    const summary = calculateSummary();
    const entityInfo = resolveEntityInfo();
    const entityName = entityInfo.entityName;
    const formationDate = entityInfo.formationDate;
    const panNumber = entityInfo.panNumber;
    const currentData = isStructuredType(filingType) ? (state[step]?.[activeTab] || {}) : state;
    const efileConfig = fieldsConfig[filingType]?.[step]?.[activeTab] || fieldsConfig[filingType]?.filing?.efiling || fieldsConfig[filingType]?.tax?.verification;

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

        {/* Verification & Declaration */}
        {efileConfig && efileConfig.sections && (
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
                          label={field.label}
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
                        label={field.label}
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
        )}

        {/* Word Report */}  

        {/* <FormSection
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
        </FormSection> */}

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
                  <div className="border border-gray-200 rounded-lg overflow-x-auto">
                    <table className="w-full text-sm font-poppins text-left">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          {section.fields.filter(shouldRenderField).map(f => (
                            <th key={f.name} className="p-3 text-gray-700 font-semibold">{f.label}</th>
                          ))}
                          <th className="p-3 text-gray-700 font-semibold text-center w-20">Action</th>
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
                              label={field.label}
                              name={field.name}
                              value={newMemberData[field.name] || ''}
                              onChange={(e) => handleNewMemberChange(field.name, e.target.value)}
                              error={errors[field.name]}
                              touched={!!errors[field.name]}
                            >
                              <option value="">Select Option</option>
                              {field.options.map(opt => {
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
                            label={field.label}
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
                          label={field.label}
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
                        label={field.label}
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

