"use client";

import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';

const SlabRateModal = ({ isOpen, onClose }) => {
  const slabRateSources = [
    "Salary",
    "Interest",
    "Dividend",
    "Rental Income",
    "Freelancing Income",
    "Income from Futures and Options",
    "Intraday Income",
    "Other Business Income",
    "Short-Term Capital Gains on assets other than listed equity shares and equity mutual funds",
    "Any other income"
  ];

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      className="max-w-[800px] h-full" 
      showClose={false}
      closeOnOverlayClick={false}
    >
      <div className="p-8 md:p-12 flex flex-col gap-4 font-poppins">
        <h2 className="text-[24px] font-semibold text-black leading-tight">
          Slab Rate Tax
        </h2>
        
        <div>
          <p className="text-[16px] text-black font-normal leading-relaxed">
            Slab Rate Tax refers to the system where income tax is charged at different rates on different portions (or &quot;slabs&quot;) of your income.
          </p>
          
          <div className="space-y-4">
            <p className="text-[16px] text-black font-normal leading-relaxed">
              The following income sources are generally considered under slab rates:
            </p>
            
            <ol className="list-decimal pl-5 space-y-2 text-[16px] text-black font-normal leading-relaxed">
              {slabRateSources.map((source, index) => (
                <li key={index} className="pl-2">
                  {source}
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <Button
            variant="brand"
            className="w-[300px] py-3 rounded-lg font-medium text-[18px] text-white"
            onClick={onClose}
          >
            OK, I Understand
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default SlabRateModal;
