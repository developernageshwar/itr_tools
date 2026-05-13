"use client";

import React from 'react';
import Modal from './Modal';
import { IoClose } from 'react-icons/io5';
import { FiShare2, FiGlobe } from 'react-icons/fi';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Input from './Input';
import Button from './Button';

const ShareModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className=" w-full  opacity-100 rounded-2xl pb-10 bg-white border border-[#C7C7CC]">
      <div className="flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between  opacity-100 gap-4 p-4 border-b border-black">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-full bg-[#3867D633] flex items-center justify-center">
              <FiShare2 className="text-[#3867D6] text-xl" />
            </div>
            <h2 className="font-['Poppins'] font-medium text-xl leading-none tracking-normal text-black">
              Share filling details for: &nbsp;   loremipsum@mail.com
            </h2>
          </div>
          <span
            onClick={onClose}
            className="text-black hover:bg-gray-100 p-2 cursor-pointer rounded-full transition-colors"
          >
            <IoClose size={24} />
          </span>
        </div>


        {/* Content */}
        <div className="p-4  gap-6 flex flex-col ">
          <div className="flex gap-4 items-center">
            {/* Input Field */}
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Enter email"
                className="w-[492px] bg-white  opacity-100 gap-3 p-4 rounded-lg border border-[#8E8E93]"
              />
            </div>

            {/* View Dropdown */}
            <div className="relative">
              < Button variant="white" 
                suffixIcon={<MdKeyboardArrowDown size={26} />}
                className="flex items-center justify-between w-[110px] h-12 px-4 rounded-lg border border-[#C7C7CC] cursor-pointer hover:bg-gray-50 transition-colors font-semibold text-[16px]">  
                View 
              </Button>
            </div>

            {/* Send Invite Button */}
            <Button variant="primary" className=" px-6 bg-[#9CB9F2] text-white font-medium rounded-lg hover:bg-[#8AAAE6] transition-colors  text-base "> 
              Send Invite
            </Button>
          </div>

          {/* Footer Info */}
          <div className="font-poppins flex gap-[9px] font-normal text-base leading-6 tracking-normal text-[#8E8E93]">
            <FiGlobe size={24} className='opacity-100' />
            <p>
              Only people invited to this file can view/edit
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
