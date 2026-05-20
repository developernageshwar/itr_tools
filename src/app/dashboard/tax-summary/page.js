"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
    MdCheckCircle,
    MdOutlineDescription,
    MdOutlineFormatListBulleted,
    MdOutlineAccountBalanceWallet,
    MdOutlinePayment,
    MdOutlineRotateLeft,
    MdOutlineErrorOutline,
    MdKeyboardArrowRight,
    MdKeyboardArrowDown
} from 'react-icons/md';
import { IoBookmarkOutline } from "react-icons/io5";

import { IoListSharp } from "react-icons/io5";
import FormSection from '@/components/ui/FormSection';
import { HiOutlineLink } from "react-icons/hi";
import { MdOutlineComment, MdPieChartOutlined } from "react-icons/md";

import { LuColumns2 } from "react-icons/lu";
import { MdOutlineError } from "react-icons/md";
import { FiTag } from "react-icons/fi";


import Stepper1 from '@/components/ui/steper1';
import SupportCard from '@/components/cards/supportCard';
import { useChatStore } from '@/store/chatStore';
import Button from '@/components/ui/Button';
import Footer2 from '@/components/layout/Footer2';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaTag } from "react-icons/fa6";
import { FiRefreshCw } from "react-icons/fi";
import SlabRateModal from '@/components/modals/SlabRateModal';


import { useItrStore } from '@/store/itrStore';
import itrService from '@/services/itrService';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import { useEffect } from 'react';

export default function TaxSummaryPage() {
  const { openChat } = useChatStore();
    const router = useRouter();
    const { user } = useAuth();
    const { calculateSummary, getPayload, resetForm, setField } = useItrStore();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [isSlabModalOpen, setIsSlabModalOpen] = React.useState(false);

    // Sync userId from AuthContext to Store
    useEffect(() => {
        if (user?.id || user?.user_id) {
            setField('userId', user.id || user.user_id);
        }
    }, [user, setField]);

    const summary = calculateSummary();

    const summaryData = [
        { label: "Gross Income", value: summary.grossIncome.toLocaleString() },
        { label: "Your Tax Saving", value: summary.totalDeductions.toLocaleString() },
        { label: "Taxable Income", value: summary.taxableIncome.toLocaleString() },
        { label: "Total Tax", value: summary.estimatedTax.toLocaleString() },
        { label: "Tax Already Paid", value: "0" },
        { label: summary.isRefund ? "Tax Refund" : "Tax Due", value: summary.refundOrDue.toLocaleString(), isGreen: summary.isRefund },
    ];

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const payload = getPayload();
            const response = await itrService.submitItrDetails(payload);

            console.log('API Response:', response);

            // Robust check for success patterns
            const isSuccess = 
                response?.status === 'success' || 
                response?.status === 200 || 
                response?.success === true ||
                response?.message === "ITR Details Saved Successfully" ||
                response?.data?.message === "ITR Details Saved Successfully";

            if (isSuccess) {
                toast.success(response?.message || "ITR details submitted successfully!");
                // Reset the entire form state in the store
               //   resetForm(); 
                router.push('/dashboard');
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

    return (
        <ProtectedRoute>
            <div className=" max-w-[1440px] mx-auto p-10 flex flex-col font-poppins bg-[#FBFBFF] rotate-0 opacity-100 gap-6 ">

                {/* Stepper Header */}
                <div className="flex items-center justify-between mb-4">
                    <Stepper1 currentStep={4} />
                    <div className="w-[320px] hidden lg:block" />
                </div>

                <div className="w-[1000px] h-[61px] rounded-lg bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] p-[1px]">
                    <div className="w-full h-full rotate-0  rounded-lg bg-[#F0F4FF] flex justify-start pl-[39px] items-center gap-[23px]">
                        <Image
                            width={20}
                            height={20}
                            src="/Vector.png"
                            alt="accuracy"
                        />
                        <p className="font-Poppins font-normal text-base leading-6 tracking-normal">
                            File your taxes confidently with 100% accuracy — We&apos;ve got you covered.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col lg:flex-row gap-10 items-start">
                    <div className="flex-1 flex flex-col gap-8">
                        {/* Main Summary Card */}
                        <div className="w-[1000px] rounded-[28px] bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] p-[1px] ">
                            <div className="w-full bg-white rounded-[28px] p-[30px] flex flex-col gap-10">
                                <h2 className="font-Poppins  font-medium text-[20px] leading-[100%] tracking-normal text-center bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent pb-1">
                                    Awesome, Let&apos;s finish your tax filing today!
                                </h2>

                                {/* Selection Bar */}
                                <div className="flex items-center justify-center gap-[60px] text-[14px]">
                                    <div className="font-Poppins font-normal flex items-center gap-4 text-base leading-6 tracking-normal">
                                        <span >Your ITR Type : </span>
                                        <span >ITR 1</span>
                                        <MdKeyboardArrowRight size={25} color='#1E1E1E' />
                                    </div>
                                    <div className="w-[2px] h-4 bg-[#000000]" />
                                    <div className="font-Poppins font-normal flex items-center gap-4 text-base leading-6 tracking-normal">
                                        <span >Your TAX Regime:  </span>
                                        <span >New Regime </span>
                                        <MdKeyboardArrowRight size={25} color='#1E1E1E' />
                                    </div>
                                </div>

                                {/* Summary Rows (Right-aligned text with left-extending line) */}
                                <div className="flex flex-col gap-8 mt-6 w-full max-w-[800px] mx-auto px-4">
                                    {summaryData.map((item, index) => (
                                        <div key={index} className="flex items-center w-full group">
                                            {/* Label and Value (Right Aligned) */}
                                            <div className="flex justify-end items-center gap-3 min-w-[280px]">
                                                <div className="bg-transparent outline-none font-poppins font-semibold text-black text-right w-full text-base leading-6 tracking-normal">
                                                    {item.label}:
                                                </div>
                                                <div className={`bg-transparent outline-none font-poppins text-base w-[100px] ${item.isGreen ? 'text-[#34C759] text-[20px] font-medium ' : 'text-black font-semibold'}`}>
                                                    ₹ {item.value}
                                                </div>
                                            </div>

                                            {/* Decorative Connector Line */}
                                            <div className="w-full rotate-0 opacity-100 border-1 border-[#C7C7CC]" />
                                        </div>
                                    ))}
                                </div>

                                {/* Card Footer Link */}
                                <div className="flex justify-between items-center mt-3 mr-8 ml-4 ">
                                    <div className="flex items-center gap-2 text-[#3867D6] cursor-pointer">
                                        <div className="w-5 h-5 rounded-full bg-[#3867D6] flex items-center justify-center text-white text-xs">?</div>
                                        <span className="font-Poppins font-normal text-base leading-6 tracking-normal">Have any doubts regarding tax calculation?</span>
                                    </div>
                                    <div className="font-Poppins font-normal text-base leading-6 tracking-normal flex gap-3 text-[#3867D6] ">
                                        Ask here <MdKeyboardArrowRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>


                        {/* ITR & Regime Selection Display Cards */}
                        <div className=" flex flex-2 justify-center w-[1000px] h-[220px] rotate-0 opacity-100 gap-10 ">
                            <div className=" flex flex-col    
                             w-[400px] h-[220px] rotate-0 opacity-100 gap-4 rounded-2xl border border-[#3867D6] p-4 bg-[#F0F4FF] ">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#3867D633] flex items-center justify-center text-[#3867D6]">
                                        <LuColumns2 size={24} />
                                    </div>
                                    <div className='flex  flex-col  justify-center gap-10 pt-2'>
                                        <div className="flex items-center  gap-4">
                                            <span className="font-Poppins font-normal text-base leading-6 tracking-normal">Your ITR Type: </span>
                                            <span className="w-[66px] text-white font-medium font-Poppins text-[16px] rotate-0 opacity-100 gap-2.5 rounded py-1 px-4 bg-[#3867D6]">ITR 1</span>
                                        </div>
                                        <p className="font-Poppins  text-[#8E8E93] font-normal text-base leading-6 tracking-normal">Income from salary or interest</p>
                                    </div>
                                </div>
                            </div>

                            <div className=" flex flex-col    
                               h-[220px] w-[400px]  rotate-0 opacity-100 gap-4 rounded-2xl border border-[#3867D6] p-4 bg-[#F8F0FF] ">
                                <div className="flex gap-4">
                                    <div className="w-12 h-12 rounded-full bg-[#9030DD33] flex items-center justify-center text-[#3867D6]">
                                        <IoListSharp size={24} />
                                    </div>
                                    <div className='flex  flex-col  justify-center gap-10 pt-2'>
                                        <div className="flex items-center  gap-4">
                                            <span className="font-Poppins font-normal text-base leading-6 tracking-normal">Your TAX Regime:  </span>
                                            <span className=" text-white font-medium font-Poppins text-[16px] rotate-0 opacity-100 gap-2.5 rounded py-1 px-4 bg-[#9030DD]">New Regime</span>
                                        </div>
                                        <p className="font-Poppins max-w-[300px]  text-[#8E8E93] font-normal text-base leading-6 tracking-normal">New Regime selected; both regimes are equally beneficial</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Tax Calculation Section */}
                        <div className="w-[1000px] rounded-[28px] bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] p-[1px]">
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

                                {/* Detailed Rows */}
                                <div className="flex flex-col gap-12 px-10">
                                    {/* Total Tax Row */}
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex gap-4 items-start max-w-[450px]">
                                            <div className="w-[44px] h-[44px] rounded-full bg-[#000000]/20 flex items-center justify-center text-[#000000] flex-shrink-0">
                                                <IoBookmarkOutline size={24} />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className='flex flex-col gap-3'>
                                                    <span className="font-Poppins  font-regular text-base leading-6 tracking-normal">Total Tax</span>
                                                    <p className="text-[15px] text-[#8E8E93] mt-2 font-poppins leading-relaxed">
                                                        Sum of all applicable Taxes and Charges-
                                                        Total Tax = (Slab Rate Tax + Fixed Rate Tax - Tax Reliefs) + Other Charges and Fees
                                                    </p>
                                                </div>
                                                <span 
                                                    className="text-[#3867D6] text-[13px] font-regular font-Poppins cursor-pointer underline font-poppins"
                                                    onClick={() => setIsSlabModalOpen(true)}
                                                >
                                                    Slab Rate Tax
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 flex-1 justify-end ml-10">
                                            <div className="w-[310px] rotate-0 opacity-100 border-1 border-[#C7C7CC]" />
                                            <div className="flex items-center gap-3">
                                                <span className="font-Poppins font-semibold text-base leading-6 tracking-normal">₹ {summary.estimatedTax.toLocaleString()}</span>
                                                <MdKeyboardArrowDown size={24} className="text-black text-2xl cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Tax Paid Row */}
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex gap-4 items-start max-w-[450px]">
                                            <div className="w-[44px] h-[44px] rounded-full bg-[#000000]/20 flex items-center justify-center text-[#000000] flex-shrink-0">
                                                <FiTag size={24} />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className='flex flex-col gap-3'>
                                                    <span className="font-Poppins  font-regular text-base leading-6 tracking-normal">Tax Already Paid</span>
                                                    <p className="text-[15px] text-[#8E8E93] mt-2 font-poppins leading-relaxed">
                                                        TDS, TCS, Advance Tax Payments etc.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 flex-1 justify-end ml-10">
                                            <div className="w-[310px] rotate-0 opacity-100 border-1 border-[#C7C7CC]" />
                                            <div className="flex items-center gap-3">
                                                <span className="font-Poppins font-semibold text-base leading-6 tracking-normal">₹ 0</span>
                                                <MdKeyboardArrowDown size={24} className="text-black text-2xl cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Refund Row */}
                                    <div className="flex items-center justify-between w-full">
                                        <div className="flex gap-4 items-start max-w-[450px]">
                                            <div className="w-[44px] h-[44px] rounded-full bg-[#000000]/20 flex items-center justify-center text-[#000000] flex-shrink-0">
                                                <FiRefreshCw size={24} />
                                            </div>
                                            <div className="flex flex-col">
                                                <div className='flex flex-col gap-3'>
                                                    <span className="font-Poppins  font-regular text-base leading-6 tracking-normal">{summary.isRefund ? 'Refund Available' : 'Tax Due'} </span>
                                                    <p className="text-[15px] text-[#8E8E93] mt-2 font-poppins leading-relaxed">
                                                        (Taxes Paid - Tax Liability).
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 flex-1 justify-end ml-10">
                                            <div className="w-[310px] rotate-0 opacity-100 border-1 border-[#C7C7CC]" />
                                            <div className="flex items-center gap-3">
                                                <span className="font-Poppins font-semibold text-base leading-6 tracking-normal">₹ {summary.refundOrDue.toLocaleString()}</span>
                                                <MdKeyboardArrowDown size={24} className="text-black text-2xl cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Computation Report Link */}
                                <div className="flex items-center justify-center gap-6 px-4   mt-4">
                                    <div className="text-black">
                                        <Image src="/Vector1.png" alt="" width={22} height={22} />
                                    </div>
                                    <p className="font-Poppins font-normal text-base leading-6 tracking-normal">Detailed computation report available here in Tax Summary post checkout</p>
                                </div>

                                {/* Bottom doubt link */}
                                <div className="flex justify-between items-center mt-3 mr-8 ml-4 ">
                                    <div className="flex items-center gap-2 text-[#3867D6] cursor-pointer">
                                        <div className="w-5 h-5 rounded-full bg-[#3867D6] flex items-center justify-center text-white text-xs">?</div>
                                        <span className="font-Poppins font-normal text-base leading-6 tracking-normal">Have any doubts regarding tax calculation?</span>
                                    </div>
                                    <div className="font-Poppins font-normal text-base leading-6 tracking-normal flex gap-3 text-[#3867D6] ">
                                        Ask here <MdKeyboardArrowRight size={24} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Double Check Banner */}

                        <FormSection
                            className="gap-0 p-2 border border-[#E5E5EA] "
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
                    </div>


                    {/* Sidebar Area */}
                    <div className="w-full lg:w-[320px] flex flex-col gap-6 fixed right-18 top-45">
                        <SupportCard
                          title="Contact Support"
                          description="AI and expert assistance."
                          buttonText="Chat Now"
                          onClick={openChat}
                        />
                        <Button
                            variant="brand"
                            className="w-full h-[52px] rounded-xl font-semibold text-base disabled:opacity-50"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            isLoading={isSubmitting}
                        >
                            {isSubmitting ? 'Submitting...' : 'Final Submission'}
                        </Button>
                    </div>
                </div>
                <Footer2 />
            </div>

            <SlabRateModal 
                isOpen={isSlabModalOpen} 
                onClose={() => setIsSlabModalOpen(false)} 
            />
        </ProtectedRoute>
    );
}
