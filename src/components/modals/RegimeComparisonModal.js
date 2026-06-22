import React, { useEffect, useState } from 'react';
import { MdClose } from 'react-icons/md';
import { useItrStore } from '@/store/itrStore';
import { IoDocumentTextOutline } from 'react-icons/io5';
import Button from '@/components/ui/Button';
import { FaArrowRightLong } from "react-icons/fa6";
import { BarChart, Bar, Cell, XAxis, Tooltip, ResponsiveContainer, LabelList } from 'recharts';
import { motion, AnimatePresence } from 'framer-motion';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-lg pointer-events-none">
                <p className="font-semibold text-[#1E1E1E] text-sm font-sans mb-1">
                    {label}
                </p>
                <p className="text-sm font-medium text-[#545456] font-sans">
                    Amount: <span className="font-semibold text-[#1E1E1E]">₹{payload[0].value.toLocaleString()}</span>
                </p>
            </div>
        );
    }
    return null;
};

const RegimeComparisonModal = ({ isOpen, onClose, onSwitchClick }) => {
    const state = useItrStore();
    const { selectedRegime, calculateSummary } = state;
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isDifferencesOpen, setIsDifferencesOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    if (!isOpen) return null;

    const summary = calculateSummary();
    const { taxComparison, slabBreakdown } = summary;
    const isNew = selectedRegime === 'new';

    const chartData = [
        { name: 'New Regime', value: taxComparison.new, fill: '#3867D6' },
        { name: 'Old Regime', value: taxComparison.old, fill: '#34C759' }
    ];

    const recommendedRegime = taxComparison.betterRegime === 'new' ? 'New Regime' : 'Old Regime';
    const isRecommendedNew = taxComparison.betterRegime === 'new';
    const savings = taxComparison.savings;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
                    <motion.div
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        className="bg-white rounded-2xl w-[90%] max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="p-4 pb-4 flex justify-between items-start">
                            <div>
                                <h2 className="text-[22px] font-semibold text-[#1E1E1E] font-poppins">Regime Comparison</h2>
                                <p className="text-[#8E8E93] text-md mt-1 font-poppins"> ITR Tool automatically chooses a regime for you</p>
                            </div>
                            <span onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors cursor-pointer">
                                <MdClose size={24} className="text-gray-500" />
                            </span>
                        </div>

                        {/* Body */}
                        <div className="p-6 overflow-y-auto custom-scrollbar flex-1">
                            {/* Current Regime Banner */}
                            <div className="border border-blue-200 rounded-xl p-5 flex justify-between items-center bg-[#F0F4FF] mb-8">
                                <div className="flex items-center gap-5">
                                    <div className="w-12 h-12 bg-[#3867D6]/10 rounded-full flex items-center justify-center text-[#3867D6]">
                                        <IoDocumentTextOutline size={24} />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-[#1E1E1E] font-poppins text-md">
                                            Your Current Regime: <span className={isNew ? 'text-[#3867D6]' : 'text-[#34C759]'}>{isNew ? 'New Regime' : 'Old Regime'}</span>
                                        </h3>
                                        <p className="text-sm text-[#3867D6] font-poppins mt-1"> ITR Tool auto-selects a regime ensuring max tax savings.</p>
                                    </div>
                                </div>
                                <span
                                    onClick={onSwitchClick}
                                    className="text-[#3867D6] font-semibold text-md flex items-center gap-2 hover:text-blue-800 transition-colors font-poppins cursor-pointer"
                                >
                                    Switch Regime <span className="text-xl"><FaArrowRightLong /></span>
                                </span>
                            </div>

                            {/* Comparison Area */}
                            <div className="border border-blue-200 bg-[#F0F4FF] rounded-xl p-8 pt-10">
                                <h3 className="text-center font-bold text-[20px] text-[#1E1E1E] mb-2 font-poppins">
                                    We Recommend <motion.span key={recommendedRegime} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={isRecommendedNew ? 'text-[#3867D6]' : 'text-[#34C759]'}>{recommendedRegime}</motion.span>
                                </h3>
                                <p className="text-center text-[15px] text-[#545456] mb-12 font-poppins">
                                    You'll be saving an additional <motion.span key={savings} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-semibold">₹ {savings.toLocaleString()}</motion.span> in taxes
                                </p>

                                <div className="h-[240px] w-full mt-2 flex justify-center">
                                    <ResponsiveContainer width="40%" height="100%">
                                        <BarChart data={chartData} margin={{ top: 30, right: 0, left: 0, bottom: 5 }}>
                                            <XAxis
                                                dataKey="name"
                                                axisLine={{ stroke: '#E5E7EB' }}
                                                tickLine={false}
                                                tick={{ fill: '#1E1E1E', fontSize: 15, fontFamily: 'Poppins', fontWeight: 500 }}
                                                dy={15}
                                            />
                                            <Tooltip
                                                content={<CustomTooltip />}
                                                cursor={{ fill: 'transparent' }}
                                            />
                                            <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40} isAnimationActive={true} animationDuration={1000}>
                                                {chartData.map((entry, index) => (
                                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                                ))}
                                                <LabelList
                                                    dataKey="value"
                                                    position="top"
                                                    formatter={(value) => `₹${value.toLocaleString()}`}
                                                    style={{ fill: '#545456', fontSize: 14, fontFamily: 'Poppins', fontWeight: 600 }}
                                                    offset={10}
                                                />
                                            </Bar>
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>

                                <div className="flex justify-center gap-10 mt-8">
                                    <div className="flex items-center gap-3">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#3867D6]"></div>
                                        <span className="text-[15px] font-poppins text-[#1E1E1E]">New Regime</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-3.5 h-3.5 rounded-full bg-[#34C759]"></div>
                                        <span className="text-[15px] font-poppins text-[#1E1E1E]">Old Regime</span>
                                    </div>
                                </div>

                                {/* Accordions */}
                                <div className="mt-10 flex flex-col gap-4">
                                    <div onClick={() => setIsDetailsOpen(!isDetailsOpen)} className="flex items-center justify-between font-poppins font-semibold text-[#1E1E1E] cursor-pointer">
                                        <span>Detailed comparison of New and Old regime</span>
                                        <MdClose size={20} className={`transform transition-transform ${isDetailsOpen ? 'rotate-0' : 'rotate-45'}`} />
                                    </div>

                                    <AnimatePresence>
                                        {isDetailsOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden font-poppins text-[14px]"
                                            >
                                                <div className="border border-[#E5E7EB] rounded-xl overflow-hidden text-sm font-poppins mt-2 mb-4 bg-white">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <th className="py-4 px-4 bg-white font-medium text-[#545456] w-2/5">Category</th>
                                                                <th className={`py-4 px-4 font-semibold text-center w-[30%] transition-colors ${isNew ? 'bg-[#F0F8FF] text-[#1E1E1E]' : 'bg-white text-[#545456]'}`}>New Regime</th>
                                                                <th className={`py-4 px-4 font-semibold text-center w-[30%] transition-colors ${!isNew ? 'bg-[#F0F8FF] text-[#1E1E1E]' : 'bg-white text-[#545456]'}`}>Old Regime</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Gross Income</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {summary.grossIncome.toLocaleString()}</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {summary.grossIncome.toLocaleString()}</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Standard Deduction</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {state.salaryIncome > 0 ? '50,000' : '0'}</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {state.salaryIncome > 0 ? '50,000' : '0'}</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">HRA Deduction</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ 0</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ 0</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Section 80C</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ 0</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ 0</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Section 80D</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ 0</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ 0</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Other Deductions</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ 0</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {summary.totalDeductions.toLocaleString()}</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Taxable Income</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 font-semibold text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {summary.newTaxableIncome.toLocaleString()}</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 font-semibold text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {summary.oldTaxableIncome.toLocaleString()}</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Slab Tax</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {Math.round(summary.newRegimeTax / 1.04).toLocaleString()}</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {Math.round(summary.oldRegimeTax / 1.04).toLocaleString()}</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Cess (4%)</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {Math.round(summary.newRegimeTax - summary.newRegimeTax / 1.04).toLocaleString()}</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {Math.round(summary.oldRegimeTax - summary.oldRegimeTax / 1.04).toLocaleString()}</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Final Tax Payable</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 font-semibold text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {summary.newRegimeTax.toLocaleString()}</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 font-semibold text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {summary.oldRegimeTax.toLocaleString()}</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Refund/Payable</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {Math.abs(Number(state.taxesPaid) - summary.newRegimeTax).toLocaleString()}</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>₹ {Math.abs(Number(state.taxesPaid) - summary.oldRegimeTax).toLocaleString()}</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-4 px-4 text-[#545456] font-semibold">Total Savings</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 font-semibold text-[#34C759]' : 'text-[#545456]'}`}>
                                                                    {summary.newRegimeTax < summary.oldRegimeTax ? `₹ ${Math.abs(summary.oldRegimeTax - summary.newRegimeTax).toLocaleString()}` : '-'}
                                                                </td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 font-semibold text-[#34C759]' : 'text-[#545456]'}`}>
                                                                    {summary.oldRegimeTax < summary.newRegimeTax ? `₹ ${Math.abs(summary.newRegimeTax - summary.oldRegimeTax).toLocaleString()}` : '-'}
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    <div className="w-full border-t border-gray-100 my-1"></div>
                                    <div onClick={() => setIsDifferencesOpen(!isDifferencesOpen)} className="flex items-center justify-between font-poppins font-semibold text-[#1E1E1E] cursor-pointer">
                                        <span>Key Differences between Old regime and New regime</span>
                                        <MdClose size={20} className={`transform transition-transform ${isDifferencesOpen ? 'rotate-0' : 'rotate-45'}`} />
                                    </div>

                                    <AnimatePresence>
                                        {isDifferencesOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                className="overflow-hidden font-poppins text-[14px]"
                                            >
                                                <div className="border border-[#E5E7EB] rounded-xl overflow-hidden text-sm font-poppins mt-2 mb-4 bg-white">
                                                    <table className="w-full text-left border-collapse">
                                                        <thead>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <th className="py-4 px-4 bg-white font-medium text-[#545456] w-2/5">Feature</th>
                                                                <th className={`py-4 px-4 font-semibold text-center w-[30%] transition-colors ${isNew ? 'bg-[#F0F8FF] text-[#1E1E1E]' : 'bg-white text-[#545456]'}`}>New Regime</th>
                                                                <th className={`py-4 px-4 font-semibold text-center w-[30%] transition-colors ${!isNew ? 'bg-[#F0F8FF] text-[#1E1E1E]' : 'bg-white text-[#545456]'}`}>Old Regime</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Tax Slabs</td>
                                                                <td className={`py-4 px-4 transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>
                                                                    <div className="flex flex-col gap-1 text-xs">
                                                                        <span>0 to 3L: Exempt</span>
                                                                        <span>3L to 6L: 5%</span>
                                                                        <span>6L to 9L: 10%</span>
                                                                        <span>9L to 12L: 15%</span>
                                                                        <span>12L to 15L: 20%</span>
                                                                        <span>above 15L: 30%</span>
                                                                    </div>
                                                                </td>
                                                                <td className={`py-4 px-4 transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>
                                                                    <div className="flex flex-col gap-1 text-xs">
                                                                        <span>0 to 2.5L: Exempt</span>
                                                                        <span>2.5L to 5L: 5%</span>
                                                                        <span>5L to 10L: 20%</span>
                                                                        <span>above 10L: 30%</span>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Standard Deduction</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Applicable</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Applicable</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">HRA Benefit</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Not Applicable</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Applicable</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">80C Deduction</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Not Applicable</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Applicable</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">80D Deduction</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Not Applicable</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Applicable</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Other Exemptions</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Limited</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Extensive</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Tax Saving Flexibility</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Low</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>High</td>
                                                            </tr>
                                                            <tr className="border-b border-[#E5E7EB]">
                                                                <td className="py-4 px-4 text-[#545456]">Compliance Simplicity</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>High</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>Low</td>
                                                            </tr>
                                                            <tr>
                                                                <td className="py-4 px-4 text-[#545456]">Best Suitable For</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>No/Low Deductions</td>
                                                                <td className={`py-4 px-4 text-center transition-colors ${!isNew ? 'bg-[#F0F8FF]/50 text-[#1E1E1E]' : 'text-[#545456]'}`}>High Deductions</td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>

                        {/* Footer Buttons */}
                        <div className="p-5 border-t border-gray-100 bg-white flex justify-end gap-4 rounded-b-2xl">
                            <Button
                                type="button"
                                variant="brand"
                                onClick={onClose}
                                className="flex-1 py-3.5 rounded-xl font-semibold text-[#ffffff] transition-colors font-poppins text-[15px] max-w-[200px]"
                            >
                                Ok , I Understood
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default RegimeComparisonModal;
