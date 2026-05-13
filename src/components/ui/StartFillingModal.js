"use client";

import React, { useState } from 'react';
import Modal from './Modal';
import { IoClose } from 'react-icons/io5';
import Button from './Button';

const StartFillingModal = ({ isOpen, onClose }) => {
  const [selected, setSelected] = useState('Individual');

  const options = [
    'Individual', 'HUF',
    'AOP/BOI', 'Company Public', 
    'Individual', 'HUF',
    'AOP/BOI', 'Company Public',
    'Company Private', 'Firm',
    'Cooperative Society', 'LLP'
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-[800px]    rounded-[16px] border border-[#C7C7CC] opacity-100">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex rounded-[1px] items-center justify-between p-6 border-b border-[black]">
          <h2 className="font-poppins font-medium text-[20px] leading-[100%] tracking-[0%]">
            Share filling details for:
          </h2>
          <span onClick={onClose} className="text-black hover:bg-gray-100 p-1 rounded-full transition-colors">
            <IoClose size={28} />
          </span>
        </div>

        {/* Content - Grid of Options */}
        <div className="grid grid-cols-2  rotate-0 opacity-100  gap-8   py-10 px-4">
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => setSelected(option)}
              className=" flex  opacity-100 border gap-3 p-2 rounded-[8px] border-[#C7C7CC]"
            >
              <div className={`w-5 h-5 rounded-full flex items-center justify-center p-[1.5px] transition-all ${selected === option ? 'bg-gradient-to-r from-[#1498EB] to-[#962DE3]' : 'bg-gradient-to-r from-[#1498EB] to-[#962DE3]'}`}>
                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                  {selected === option && (
                    <div className="w-[10px] h-[10px] rounded-full bg-gradient-to-r from-[#1498EB] to-[#962DE3]" />
                  )}
                </div>
              </div>
              <span className="font-poppins font-normal text-base leading-6 tracking-normal">{option}</span>
            </div>
          ))}
        </div>

        {/* Action Button */}
        <div className="px-8 pb-8">
          <Button
            variant='brand'
            className="font-poppins font-medium text-base leading-6 tracking-normal  w-full  "
            onClick={onClose}
          >
            Proceed to e-file
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default StartFillingModal;
