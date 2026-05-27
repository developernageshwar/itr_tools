"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MdKeyboardArrowDown } from 'react-icons/md';
import Button from '@/components/ui/Button';
import { FaRegComment } from "react-icons/fa6"; 
import { MdAccountCircle } from "react-icons/md";
import ProfileModal from './ProfileModal';
import ShareModal from '@/components/ui/ShareModal';
import AddUserModal from '@/components/ui/AddUserModal'; 
import StartFillingModal from '@/components/ui/StartFillingModal';
import { useChatStore } from '@/store/chatStore';
import { useItrStore } from '@/store/itrStore';


const DashboardNavbar = () => {  
  const {openChat} = useChatStore();
  const { 
    profiles, activeProfileId, 
    setIsFilingTypeModalOpen, 
    saveCurrentProfileData 
  } = useItrStore();
  const activeProfile = profiles.find(p => p.id === activeProfileId) || profiles[0];

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [isStartFillingModalOpen, setIsStartFillingModalOpen] = useState(false);

  return (
    <div className="fixed top-0 left-0 right-0 z-50">

      {/* Top Main Navbar */}
      <nav className="h-[72px] bg-white border-b border-[#E0E0E0] flex items-center">
        <div className="w-full h-20 border-b-[4px] px-10 bg-white flex items-center justify-between ">

          {/* Logo */}
          <Link href="/dashboard" className="flex items-center flex-shrink-0">
            <Image src="/logoImgdash.png" alt="CandidTax Logo" width={72} height={40} className="object-contain" />
          </Link>

          <div 
            className="flex items-center gap-3 cursor-pointer select-none font-poppins font-medium text-xl leading-none tracking-normal text-black"
            onClick={() => setIsAddUserModalOpen(prev => !prev)}
          >
            <span>Filling for :</span>
            <span>{activeProfile?.name || 'New User'}</span>
            <MdKeyboardArrowDown size={32} className={`text-[22px] text-[#1E1E1E] transition-transform duration-200 ${isAddUserModalOpen ? 'rotate-180' : ''}`} />
          </div>

          {/* Share Button — gradient border, white bg, gradient text */}
          <Button
            variant="whiteGradient"
            className=" py-2 px-4 gap-[10px] rounded-lg border font-poppins font-semibold text-base leading-6 tracking-normal"
            onClick={() => setIsShareModalOpen(true)}
          >
            Share
          </Button>

          {/* Chat / Message Icon */}
          <div  
          onClick={openChat}
          className="w-[44px] h-[44px] rounded-[22px] bg-[#3867D633] flex items-center justify-center cursor-pointer flex-shrink-0">
            <FaRegComment className=" size-[20px]" color='#3867D6' />
          </div>

          {/* Profile Avatar + Arrow */}
          <div className="relative">
            <div 
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => setIsProfileOpen(!isProfileOpen)}
            >
              <div className="w-[44px] h-[44px] rounded-[22px] bg-[#9030DD33] flex items-center justify-center cursor-pointer flex-shrink-0">
                <MdAccountCircle className="size-[28px]" color="#9030DD" />
              </div>
              <MdKeyboardArrowDown className={`size-[30px] transition-transform duration-200 ${isProfileOpen ? 'rotate-180' : ''}`} color='#1E1E1E' />
            </div>

            <ProfileModal 
              isOpen={isProfileOpen} 
              onClose={() => setIsProfileOpen(false)} 
              onShareClick={() => setIsShareModalOpen(true)}
            />
          </div>

          <ShareModal 
            isOpen={isShareModalOpen} 
            onClose={() => setIsShareModalOpen(false)} 
          />

          <AddUserModal
            isOpen={isAddUserModalOpen}
            onClose={() => setIsAddUserModalOpen(false)}
            onFileForNew={() => {
             
              saveCurrentProfileData();
              setIsAddUserModalOpen(false);
              setIsStartFillingModalOpen(true);
            }}
          />

          <StartFillingModal
            isOpen={isStartFillingModalOpen}
            onClose={() => setIsStartFillingModalOpen(false)}
          />
        </div>
      </nav>

      {/* Announcement Bar */}
      <div className="w-full h-15 flex justify-center items-center py-0.5 px-10 bg-[#2B2B2B]">
        <p className="font-poppins font-normal text-[14px] leading-[17px] tracking-normal text-center text-[#FF8D28]">
        E-filing submission for AY 2026-27 is not yet live by IT Department. We'll notify you once it is enabled, meanwhile prepare your return and keep it ready. 
        </p>
      </div>

    </div>
  );
};

export default DashboardNavbar;
