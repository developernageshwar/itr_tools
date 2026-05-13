"use client";

import React from 'react';
import Modal from './Modal';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { HiPlus } from 'react-icons/hi';

const AddUserModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className="w-full  opacity-100  ">
      <div className="flex flex-col bg-white rounded-[16px] border border-[#C7C7CC] ">
        {/* User Info Section */}
        <div className="font-poppins font-semibold text-[16px] leading-[24px] tracking-normal flex flex-col  opacity-100 gap-3 p-4 border-b border-black  ">
          <h2>
            New User
          </h2>
          <p>
            PAN: Not Available | AY: 2026-27
          </p>
        </div>

        {/* Footer Actions */}
        <div className=" h-[92px] opacity-100 flex justify-between   gap-10 p-4">
          <div 
            className="flex items-center gap-10 font-poppins font-semibold text-[18px] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent  hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            <span>View more</span>
            <MdKeyboardArrowRight size={28} color='#962DE3' />
          </div>

           <div 
            className="flex items-center gap-10 font-poppins font-semibold text-[18px] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent  hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            <span>File for new person</span>
            <HiPlus size={20} color='#962DE3' />
          </div> 
        </div>
      </div>
    </Modal>
  );
};

export default AddUserModal;
