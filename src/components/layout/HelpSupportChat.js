"use client";

import React from 'react';
import { cn } from '@/utils/helpers';
import { MdOutlineArrowForward, MdOutlineThumbUp, MdOutlineThumbDown, MdSend } from 'react-icons/md';
import { HiOutlineStar } from 'react-icons/hi';
import Image from 'next/image';
import Button from '../ui/Button';

import { useChatStore } from '@/store/chatStore';

const HelpSupportChat = () => {
  const { isChatOpen, closeChat } = useChatStore();

  return (
    <>
      {/* Backdrop */}
      <div
        className={cn(
          "fixed inset-0 bg-black/20 z-[998] transition-opacity duration-300",
          isChatOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={closeChat}
      />

      {/* Chat Window */}
      <div
        className={cn(
          "fixed top-[140px] right-0 h-[calc(100vh-140px)] w-[500px] md:max-w-[600px] bg-white z-[999] transition-transform duration-500 ease-in-out flex flex-col   w-[600px] rounded-[16px_0_0_16px] border border-[#C7C7CC] bg-white  opacity-100 ",
          isChatOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="w-[600px] opacity-100 gap-4 p-4 border-b border-b-black flex items-center justify-between">
          <h2 className="font-poppins font-medium text-xl leading-none tracking-normal text-black">Help & Support</h2>
          <span
            onClick={closeChat}
            className="w-10 h-10 flex items-center justify-center hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <MdOutlineArrowForward size={32} className="text-black" />
          </span>
        </div>

        {/* Messages Content */}
        <div className="flex-1 overflow-y-auto flex flex-col max-w-[600px] h-full p-4 gap-4 ">
          <div className="flex gap-4 items-start">
            {/* Avatar */}
            <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1498EB] to-[#962DE3] flex items-center justify-center flex-shrink-0 text-white">
              <HiOutlineStar size={24} color="#F5F5F5" />
            </div>

            {/* Message Bubble */}
            <div className="flex flex-col gap-3 max-w-[80%]   ">
              <div className=" rounded-[16px] rounded-tl-none p-4 font-poppins leading-6 text-blac   opacity-100 gap-[10px] p-4 rounded-br-[20px] rounded-bl-[20px] rounded-tr-[20px] bg-[#F2F2F7] font-normal text-base tracking-normal">
                Welcome to Candidtax! Iam Neha. I am here to answer all you tax related queries and provide support whenever you need it. How can I assist you today?
              </div>

              <div className="flex items-center justify-between px-1  font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#8E8E93]">
                <span >25 Apr 2026, 1:03 pm</span>
                <div className="flex items-center gap-4">
                  <span >Was this helpful?</span>
                  <div className="flex items-center gap-2">
                    <button className="hover:text-[#3867D6] transition-colors">
                      <MdOutlineThumbDown size={18} /> 
                    </button>
                    <button className=" hover:text-[#3867D6] transition-colors">
                      <MdOutlineThumbUp size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6  mb-[20px]">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-[56px] bg-[#F2F2F7] rounded-[12px] px-4 flex items-center rounded-lg">
              <input
                type="text"
                placeholder="Ask me anything..."
                className="w-full font-poppins bg-transparent outline-none  text-black placeholder:text-[#8E8E93]  font-normal text-base leading-6 tracking-normal text-[#8E8E93]"
              />
            </div>
            <Button variant="brand"  
            
             className="w-11 h-11 rounded-full bg-gradient-to-br from-[#1498EB] to-[#962DE3] flex items-center justify-center text-white shadow-md hover:opacity-90 transition-opacity">
              <MdSend size={24} color="#F5F5F5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HelpSupportChat;
