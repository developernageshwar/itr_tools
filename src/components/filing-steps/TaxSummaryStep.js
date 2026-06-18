"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { MdKeyboardArrowRight, MdKeyboardArrowDown, MdOutlineComment, MdOutlineError } from 'react-icons/md';
import { IoBookmarkOutline, IoListSharp } from "react-icons/io5";
import { LuColumns2 } from "react-icons/lu";
import { FiTag, FiRefreshCw } from "react-icons/fi";
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

import { useItrStore } from '@/store/itrStore';
import itrService from '@/services/itrService';
import FormSection from '@/components/ui/FormSection';
import Button from '@/components/ui/Button';
import SlabRateModal from '@/components/modals/SlabRateModal';
import RegimeComparisonModal from '@/components/modals/RegimeComparisonModal';
import ConfirmRegimeChangeModal from '@/components/modals/ConfirmRegimeChangeModal';
import { personalDetailsSchema, incomeSourcesSchema, taxSavingSchema } from '@/validation/itrSchema';

const CountUp = ({ value }) => {
    const [displayValue, setDisplayValue] = useState(value);
    
    useEffect(() => {
        setDisplayValue(value);
    }, [value]);
    
    return (
        <motion.span
            key={value}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            {displayValue.toLocaleString()}
        </motion.span>
    );
};

export default function TaxSummaryStep({ filingType }) {
    const router = useRouter();
    const state = useItrStore();
    const { calculateSummary, getPayload, setField, selectedRegime } = state;
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSlabModalOpen, setIsSlabModalOpen] = useState(false);
    const [isComparisonModalOpen, setIsComparisonModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const handleSwitchClick = () => {
        setIsComparisonModalOpen(false);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmSwitch = () => {
        const newRegime = selectedRegime === 'new' ? 'old' : 'new';
        setField('selectedRegime', newRegime);
        setIsConfirmModalOpen(false);
    };

    const summary = calculateSummary();  

    const summaryData = [
        { label: "Gross Income", value: summary.grossIncome },
        { label: "Your Tax Saving", value: summary.totalDeductions },
        { label: "Taxable Income", value: summary.taxableIncome },
        { label: "Total Tax", value: summary.estimatedTax },
        { label: "Tax Already Paid", value: Number(state.taxesPaid) || 0 },
        { label: summary.isRefund ? "Tax Refund" : "Tax Due", value: summary.refundOrDue, isGreen: !summary.isRefund },
    ];

    useEffect(() => {
        const handleSubmit = async () => {
            if (isSubmitting) return;
            setIsSubmitting(true);
            try {
                // We're adapting the validation to avoid strict checking on dynamic structures, 
                // but you can enable dynamic schemas if required.
                const payload = getPayload();
                const response = await itrService.submitItrDetails(payload);

                const isSuccess =
                    response?.status === 'success' ||
                    response?.status === 200 ||
                    response?.success === true ||
                    response?.message === "ITR Details Saved Successfully" ||
                    response?.data?.message === "ITR Details Saved Successfully";

                if (isSuccess) {
                    toast.success(response?.message || "ITR details submitted successfully!");
                } else {
                    toast.error(response?.message || "Submission failed. Please check your details.");
                }
            } catch (error) {
                console.error('Submission Error:', error);
                const errorMsg = error.response?.data?.message || error.message || "Failed to submit";
                toast.error(errorMsg);
            } finally {
                setIsSubmitting(false);
            }
        };

        window.currentSaveHandler = handleSubmit;
        return () => {
            window.currentSaveHandler = null;
        };
    }, [getPayload, isSubmitting]);

    return (
        <div className="flex flex-col gap-6 w-full animate-fade-in font-poppins">
            <div className="w-full h-[61px] rounded-lg bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] p-[1px]">
                <div className="w-full h-full rounded-lg bg-[#F0F4FF] flex justify-start pl-[39px] items-center gap-[23px]">
                    <Image width={20} height={20} src="/Vector.png" alt="accuracy" />
                    <p className="font-Poppins font-normal text-base leading-6 tracking-normal">
                        File your taxes confidently with 100% accuracy — We&apos;ve got you covered.
                    </p>
                </div>
            </div>

            <div className="w-full rounded-[28px] bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] p-[1px]">
                <div className="w-full bg-white rounded-[28px] p-[30px] flex flex-col gap-10">
                    <h2 className="font-Poppins font-medium text-[20px] leading-[100%] tracking-normal text-center bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent pb-1">
                        Awesome, Let&apos;s finish your tax filing today!
                    </h2>

                    <div className="flex items-center justify-center gap-[60px] text-[14px]">
                        <div className="font-Poppins font-normal flex items-center gap-4 text-base leading-6 tracking-normal">
                            <span>Your ITR Type : </span>
                            <span>{filingType || summary.itrType || 'ITR'}</span>
                            <MdKeyboardArrowRight size={25} color='#1E1E1E' />
                        </div>
                        <div className="w-[2px] h-4 bg-[#000000]" />
                        <div className="font-Poppins font-normal flex items-center gap-4 text-base leading-6 tracking-normal">
                            <span>Your TAX Regime:  </span>
                            <span>{selectedRegime === 'new' ? 'New Regime' : 'Old Regime'} </span>
                            <MdKeyboardArrowRight size={25} color='#1E1E1E' />
                        </div>
                    </div>

                    <div className="flex flex-col gap-6 mt-6 w-full max-w-[800px] mx-auto px-4">
                        {summaryData.map((item, index) => {
                            const maxAmount = summary.grossIncome > 0 ? summary.grossIncome : 1;
                            let percentage = (item.value / maxAmount) * 100;
                            const hasValue = item.value > 0;
                            
                            if (hasValue && percentage < 2) percentage = 2;
                            percentage = Math.min(100, Math.max(0, percentage));
                            
                            return (
                                <div key={index} className="flex items-center w-full gap-5">
                                    <div className="flex justify-end items-baseline gap-1 min-w-[280px]">
                                        <span className="font-poppins text-[#4B5563] text-[16px]">
                                            {item.label}:
                                        </span>
                                        <span className={`font-poppins text-[18px] ml-1 ${item.isGreen ? 'text-[#34C759] font-medium' : 'text-[#1E1E1E]'}`}>
                                            ₹<CountUp value={item.value} />
                                        </span>
                                    </div>

                                    <div className="flex-1 h-3 bg-[#F3F4F6] rounded-full overflow-hidden">
                                        {hasValue && (
                                            <motion.div 
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className={`h-full rounded-full ${item.isGreen ? 'bg-[#34C759]' : 'bg-[#818CF8]'}`}
                                            />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <div className="flex justify-between items-center mt-3 mr-8 ml-4">
                        <div className="flex items-center gap-2 text-[#3867D6] cursor-pointer">
                            <div className="w-5 h-5 rounded-full bg-[#3867D6] flex items-center justify-center text-white text-xs">?</div>
                            <span className="font-Poppins font-normal text-base leading-6 tracking-normal">Have any doubts regarding tax calculation?</span>
                        </div>
                        <div className="font-Poppins font-normal text-base leading-6 tracking-normal flex gap-3 text-[#3867D6]">
                            Ask here <MdKeyboardArrowRight size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row justify-center w-full gap-10">
                <div className="flex flex-col w-full md:w-1/2 h-[220px] gap-4 rounded-2xl border border-[#3867D6] p-4 bg-[#F0F4FF]">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#3867D633] flex items-center justify-center text-[#3867D6]">
                            <LuColumns2 size={24} />
                        </div>
                        <div className='flex flex-col justify-center gap-10 pt-2'>
                            <div className="flex items-center gap-4">
                                <span className="font-Poppins font-normal text-base leading-6 tracking-normal">Your ITR Type: </span>
                                <span className="text-white font-medium font-Poppins text-[16px] rounded py-1 px-4 bg-[#3867D6] whitespace-nowrap">{filingType || summary.itrType || 'ITR'}</span> 
                            </div>
                            <p className="font-Poppins text-[#8E8E93] font-normal text-[14px] leading-5 tracking-normal max-w-[280px]">{summary.itrReason || 'Income from salary or interest'}</p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col w-full md:w-1/2 h-[220px] gap-4 rounded-2xl border border-[#3867D6] p-4 bg-[#F8F0FF]">
                    <div className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#9030DD33] flex items-center justify-center text-[#3867D6]">
                            <IoListSharp size={24} />
                        </div>
                        <div className='flex flex-col justify-center gap-10 pt-2'>
                            <div className="flex items-center gap-4">
                                <span className="font-Poppins font-normal text-base leading-6 tracking-normal">Your TAX Regime:  </span>
                                <span className="text-white font-medium font-Poppins text-[16px] rounded py-1 px-4 bg-[#9030DD]">{selectedRegime === 'new' ? 'New Regime' : 'Old Regime'}</span>
                            </div>
                            <p className="font-Poppins max-w-[300px] text-[#8E8E93] font-normal text-base leading-6 tracking-normal">{selectedRegime === 'new' ? 'New Regime selected; both regimes are equally beneficial' : 'Old Regime selected; customized for your deductions'}</p>
                            <div onClick={() => setIsComparisonModalOpen(true)} className="font-Poppins font-semibold text-base leading-6 tracking-normal flex gap-3 text-[#3867D6] cursor-pointer">
                                Compare/Switch Regime <MdKeyboardArrowRight size={24} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full rounded-[28px] bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] p-[1px]">
                <div className="w-full bg-white rounded-[28px] p-[20px] flex flex-col gap-10">
                    <div className="flex gap-4">
                        <div className="w-[44px] h-[44px] rounded-full bg-[#F0F4FF] flex items-center justify-center text-[#3867D6] flex-shrink-0">
                            <MdOutlineComment size={24} />
                        </div>
                        <div className="flex flex-col gap-4">
                            <h3 className="text-[#1E1E1E] font-bold text-[18px] font-poppins">Review your detailed tax calculation</h3>
                            <p className="text-[#8E8E93] text-[15px] font-poppins">See how your tax is calculated based on your income, deductions, and chosen regime..</p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-12 px-10">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex gap-4 items-start w-[450px] flex-shrink-0">
                                <div className="w-[44px] h-[44px] rounded-full bg-[#000000]/20 flex items-center justify-center text-[#000000] flex-shrink-0">
                                    <IoBookmarkOutline size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex flex-col gap-3'>
                                        <span className="font-Poppins font-regular text-base leading-6 tracking-normal">Total Tax</span>
                                        <p className="text-[15px] text-[#8E8E93] mt-2 font-poppins leading-relaxed">
                                            Sum of all applicable Taxes and Charges-
                                            Total Tax = (Slab Rate Tax + Fixed Rate Tax - Tax Reliefs) + Other Charges and Fees
                                        </p>
                                    </div>
                                    <span
                                        className="text-[#3867D6] text-[13px] font-regular font-Poppins cursor-pointer underline font-poppins mt-2"
                                        onClick={() => setIsSlabModalOpen(true)}
                                    >
                                        Slab Rate Tax
                                    </span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-1 justify-end ml-10">
                                <div className="flex-1 h-3 bg-[#F3F4F6] rounded-full overflow-hidden">
                                    {summary.estimatedTax > 0 && (
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, Math.max(2, (summary.estimatedTax / (summary.grossIncome || 1)) * 100))}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className="h-full rounded-full bg-[#818CF8]"
                                        />
                                    )}
                                </div>
                                <div className="flex justify-end items-center gap-3 min-w-[150px]">
                                    <span className="font-Poppins font-semibold text-base leading-6 tracking-normal">₹ <CountUp value={summary.estimatedTax} /></span>
                                    <MdKeyboardArrowDown size={24} className="text-black text-2xl cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex gap-4 items-start w-[450px] flex-shrink-0">
                                <div className="w-[44px] h-[44px] rounded-full bg-[#000000]/20 flex items-center justify-center text-[#000000] flex-shrink-0">
                                    <FiTag size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex flex-col gap-3'>
                                        <span className="font-Poppins font-regular text-base leading-6 tracking-normal">Tax Already Paid</span>
                                        <p className="text-[15px] text-[#8E8E93] mt-2 font-poppins leading-relaxed">
                                            TDS, TCS, Advance Tax Payments etc.
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-1 justify-end ml-10">
                                <div className="flex-1 h-3 bg-[#F3F4F6] rounded-full overflow-hidden">
                                    {(Number(state.taxesPaid) || 0) > 0 && (
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, Math.max(2, ((Number(state.taxesPaid) || 0) / (summary.grossIncome || 1)) * 100))}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className="h-full rounded-full bg-[#818CF8]"
                                        />
                                    )}
                                </div>
                                <div className="flex justify-end items-center gap-3 min-w-[150px]">
                                    <span className="font-Poppins font-semibold text-base leading-6 tracking-normal">₹ <CountUp value={Number(state.taxesPaid) || 0} /></span>
                                    <MdKeyboardArrowDown size={24} className="text-black text-2xl cursor-pointer" />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between w-full">
                            <div className="flex gap-4 items-start w-[450px] flex-shrink-0">
                                <div className="w-[44px] h-[44px] rounded-full bg-[#000000]/20 flex items-center justify-center text-[#000000] flex-shrink-0">
                                    <FiRefreshCw size={24} />
                                </div>
                                <div className="flex flex-col">
                                    <div className='flex flex-col gap-3'>
                                        <span className="font-Poppins font-regular text-base leading-6 tracking-normal">{summary.isRefund ? 'Refund Available' : 'Tax Due'} </span>
                                        <p className="text-[15px] text-[#8E8E93] mt-2 font-poppins leading-relaxed">
                                            (Taxes Paid - Tax Liability).
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-1 justify-end ml-10">
                                <div className="flex-1 h-3 bg-[#F3F4F6] rounded-full overflow-hidden">
                                    {summary.refundOrDue > 0 && (
                                        <motion.div 
                                            initial={{ width: 0 }}
                                            animate={{ width: `${Math.min(100, Math.max(2, (summary.refundOrDue / (summary.grossIncome || 1)) * 100))}%` }}
                                            transition={{ duration: 0.5, ease: "easeOut" }}
                                            className={`h-full rounded-full ${!summary.isRefund ? 'bg-[#34C759]' : 'bg-[#818CF8]'}`}
                                        />
                                    )}
                                </div>
                                <div className="flex justify-end items-center gap-3 min-w-[150px]">
                                    <span className={`font-Poppins font-semibold text-base leading-6 tracking-normal ${!summary.isRefund ? 'text-[#34C759]' : 'text-black'}`}>₹ <CountUp value={summary.refundOrDue} /></span>
                                    <MdKeyboardArrowDown size={24} className="text-black text-2xl cursor-pointer" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-center gap-6 px-4 mt-4">
                        <div className="text-black">
                            <Image src="/Vector1.png" alt="" width={22} height={22} />
                        </div>
                        <p className="font-Poppins font-normal text-base leading-6 tracking-normal">Detailed computation report available here in Tax Summary post checkout</p>
                    </div>

                    <div className="flex justify-between items-center mt-3 mr-8 ml-4">
                        <div className="flex items-center gap-2 text-[#3867D6] cursor-pointer">
                            <div className="w-5 h-5 rounded-full bg-[#3867D6] flex items-center justify-center text-white text-xs">?</div>
                            <span className="font-Poppins font-normal text-base leading-6 tracking-normal">Have any doubts regarding tax calculation?</span>
                        </div>
                        <div className="font-Poppins font-normal text-base leading-6 tracking-normal flex gap-3 text-[#3867D6]">
                            Ask here <MdKeyboardArrowRight size={24} />
                        </div>
                    </div>
                </div>
            </div>

            <FormSection
                className="gap-0 p-2 border border-[#E5E5EA]"
                icon={MdOutlineError}
                title="Want to double check your important data points?"
                defaultExpanded={false}
                description="Review and verify key details to ensure accurate and hassle-free filing."
                hideArrow={true}
                rightAction={
                    <Button variant="whiteGradient" className="px-6 py-2 border rounded-lg text-[#3867D6] font-semibold">
                        Double Check Data
                    </Button>
                }
            />

            <SlabRateModal
                isOpen={isSlabModalOpen}
                onClose={() => setIsSlabModalOpen(false)}
            />
            <RegimeComparisonModal
                isOpen={isComparisonModalOpen}
                onClose={() => setIsComparisonModalOpen(false)}
                onSwitchClick={handleSwitchClick}
            />
            <ConfirmRegimeChangeModal
                isOpen={isConfirmModalOpen}
                onClose={() => setIsConfirmModalOpen(false)}
                onConfirm={handleConfirmSwitch}
                currentRegime={selectedRegime}
            />
        </div>
    );
}
