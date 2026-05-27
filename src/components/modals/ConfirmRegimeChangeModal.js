import React from 'react';
import { MdClose } from 'react-icons/md';
import Image from 'next/image';
import { useEffect } from 'react';
import Button from '../ui/Button';
import { useItrStore } from '@/store/itrStore';

const ConfirmRegimeChangeModal = ({ isOpen, onClose, onConfirm, currentRegime }) => {
    const state = useItrStore();
    const { calculateSummary } = state;
    const summary = calculateSummary();
    const { taxComparison } = summary;

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

    const targetRegime = currentRegime === 'new' ? 'Old Regime' : 'New Regime';
    const currentName = currentRegime === 'new' ? 'New Regime' : 'Old Regime';
    const targetTax = currentRegime === 'new' ? taxComparison.old : taxComparison.new;

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-300">
            <div className="bg-white rounded-2xl w-[90%] max-w-md overflow-hidden shadow-2xl animate-fade-in-up flex flex-col relative pt-4">
                <span onClick={onClose} className="absolute cursor-pointer top-4 right-4 p-1  rounded-full  z-10">
                    <MdClose size={24} className="text-gray-500" />
                </span>
                <div className="p-8 pt-6 flex flex-col items-center text-center">
                    <div className="w-60 h-60 relative flex justify-center items-center mb-6">
                        <div className="w-60 h-60 rounded-full flex items-center justify-center relative">
                            <Image
                                src="/confirmmodalimgage.png"
                                alt="Tax Saving"
                                width={200}
                                height={100}
                            />
                        </div>
                    </div>

                    <h2 className="text-[22px] font-semibold text-[#1E1E1E] mb-3 font-poppins">
                        Confirm Regime Change
                    </h2>
                    <p className="text-[15px] text-[#545456] mb-8 font-poppins">
                        You are switching from {currentName} to {targetRegime}.<br/>
                        Estimated tax liability will become <span className="font-semibold text-black">₹{targetTax.toLocaleString()}</span>.
                    </p>

                    <div className="flex justify-between gap-4 w-full">
                        <Button
                            type="button"
                            variant="gradientOutline"
                            onClick={onClose}
                            className="flex-1 py-3.5 rounded-xl font-semibold text-[#3867D6]  transition-colors font-poppins text-[15px]"
                        >
                            Cancel
                        </Button>


                        <Button
                            type="button"
                            variant="brand"
                            label="Confirm Switch"
                            onClick={onConfirm}
                            className="flex-1 py-3.5 rounded-xl font-semibold  transition-colors font-poppins text-[15px]"
                        >
                            Confirm Switch
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmRegimeChangeModal;
