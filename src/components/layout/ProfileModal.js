"use client";

import React from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

const ProfileModal = ({ isOpen, onClose, onShareClick }) => {
  const { logout } = useAuth();
  
  if (!isOpen) return null;

  const menuItems = [
    { label: 'My Tax Returns', href: '/dashboard/my-tax-returns' },
    { label: 'Share', onClick: onShareClick },
    { label: 'Profile', href: '/dashboard/profile' },
    { label: 'Check ITR status', href: '/dashboard/check-itr-status' },
    { label: 'Tax filing from experts', href: '/dashboard/tax-filing-experts' },
    { label: 'Need Help?', href: '/dashboard/need-help' },
    { label: 'Logout', onClick: logout },
  ];

  return (
    <> 
      <div 
        className="fixed inset-0 z-[90]" 
        onClick={onClose}
      />
      
      <div className="absolute right-0 top-[calc(100%+12px)] overflow-hidden z-[100] animate-in fade-in zoom-in duration-200 origin-top-right  w-[225px]  opacity-100 rounded-2xl bg-white border-[1px] border-[#C7C7CC] shadow-lg ">
        <div className="flex flex-col">
          {menuItems.map((item, index) => (
            <React.Fragment key={index}>
              {item.href ? (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className={`opacity-100 cursor-pointer gap-[10px] pt-4 pr-5 pb-4 pl-5 font-poppins font-semibold text-base leading-6 tracking-normal text-black hover:bg-gray-50 transition-colors ${index < menuItems.length - 1 ? 'border-b border-[#C7C7CC]' : ''}`}
                >
                  {item.label} 
                </Link>
              ) : (
                <button
                  onClick={() => {
                    item.onClick();
                    onClose();
                  }}
                  className={`w-full text-left opacity-100 cursor-pointer gap-[10px] pt-4 pr-5 pb-4 pl-5 font-poppins font-semibold text-base leading-6 tracking-normal text-black hover:bg-gray-50 transition-colors ${index < menuItems.length - 1 ? 'border-b border-[#C7C7CC]' : ''}`}
                >
                  {item.label} 
                </button>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
};

export default ProfileModal;
