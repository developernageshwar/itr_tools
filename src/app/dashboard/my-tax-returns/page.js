"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdArrowBack, MdKeyboardArrowUp, MdInfoOutline } from 'react-icons/md';
import { BsThreeDotsVertical } from 'react-icons/bs';
import Button from '@/components/ui/Button';
import ProtectedRoute from '@/components/auth/ProtectedRoute';  
import Footer2 from '@/components/layout/Footer2';
import StartFillingModal from '@/components/ui/StartFillingModal';

export default function MyTaxReturnsPage() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isStartFillingOpen, setIsStartFillingOpen] = useState(false);

  return (
    <ProtectedRoute>
      <div className="top-20 flex  flex-col gap-10   justify-between opacity-100 pt-10 pr-30 pb-10 pl-30">

        {/* Header Section */}
        <div className="flex gap-10   items-center justify-between border-b border-[#C7C7CC] pb-10">
          <div className="flex items-center gap-6">
            <Link href="/dashboard" className="text-[#3867D6] hover:bg-gray-100 p-2 rounded-full transition-colors">
              <MdArrowBack size={28} />
            </Link>
            <h1 className="bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent font-['Poppins'] font-semibold text-[28px] leading-[38.4px] tracking-normal">
              My Tax Returns
            </h1>
          </div>
          <Button
            className="h-[48px] px-8 bg-gradient-to-r from-[#1498EB] to-[#962DE3] text-white rounded-[8px] font-semibold text-base leading-[17px] tracking-normal"
            onClick={() => setIsStartFillingOpen(true)}
          >
            Start a new filling
          </Button>
        </div>

        <StartFillingModal 
          isOpen={isStartFillingOpen} 
          onClose={() => setIsStartFillingOpen(false)} 
        />

        {/* Record Card */}
        <div className="w-full border-b border-b-[#E0E0E0]  flex flex-col gap-10  opacity-100  pb-10">

          {/* Top Row: User Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Avatar */}
              <div className="w-[44px] h-[44px] rounded-full bg-[#3867D633] flex items-center justify-center">
                <span className="text-[#3867D6] font-semibold text-[16px] font-outfit">N</span>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <h2 className="font-poppins font-medium text-[20px] text-black tracking-normal">New User</h2>
                  <span className="w-[84px] h-[25px] rotate-0 opacity-100 bg-[#3867D633] justify-center items-center rounded-sm flex gap-[10px] pt-1 pr-2 pb-1 pl-2">
                    <span className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#3867D6]">Individual</span>
                  </span>
                </div>
                <p className="font-poppins font-normal text-[16px] leading-[24px] tracking-normal text-[#8E8E93]">
                  PAN: Not Available
                </p>
              </div>
            </div>

            {/* Collapse Icon */}
            <div 
              className="w-[44px] h-[44px] rounded-full bg-[#3867D633] flex items-center justify-center cursor-pointer transition-colors hover:bg-[#3867D644]"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <MdKeyboardArrowUp 
                size={28} 
                className={`text-[#3867D6] transition-transform duration-300 ${!isExpanded ? 'rotate-180' : ''}`} 
              />
            </div>
          </div>

          {/* Filing Details Section */}
          {isExpanded && (
            <div className="flex  ml-14 justify-between animate-in fade-in slide-in-from-top-2 duration-300">
              {/* Year Info */}
              <div className="flex flex-col gap-2">
                <h3 className="font-poppins font-medium text-[20px] leading-[100%] tracking-normal text-black">AY 2026-27</h3>
                <p className="font-poppins font-normal text-[16px] leading-[24px] tracking-normal text-[#8E8E93]">(Current Year)</p>
              </div>

              {/* Status Rows */}
              <div className="flex flex-col gap-2  ">
                <div className="flex items-center gap-3">
                  <MdInfoOutline  className="text-[#FF383C]" size={27} />
                  <p className="font-poppins  font-medium text-[20px] leading-[100%] tracking-normal">
                    E-Filed | <span className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#FF383C]">Pending</span>
                  </p>
                </div>
              <div className="flex items-center gap-3">
                  <MdInfoOutline  className="text-[#FF383C]" size={27} />
                  <p className="font-poppins  font-medium text-[20px] leading-[100%] tracking-normal">
                    E- Verification | <span className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-[#FF383C]">Pending</span>
                  </p>
                </div> 
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-4">
                <Button  
                  variant="whiteGradient"
                  className=" py-2 px-4 gap-[10px] rounded-lg border font-poppins font-semibold text-base leading-6 tracking-normal"
                  onClick={() => router.push('/dashboard/pan-details')}
                >
                  Continue Filling
                </Button>
                <div className="text-[#8E8E93] hover:bg-gray-100 p-2 rounded-full transition-colors cursor-pointer">
                  <BsThreeDotsVertical size={24} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Area */}
        <Footer2 />

      </div>
    </ProtectedRoute>
  );
}
