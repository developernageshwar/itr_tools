"use client";

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import Button from '@/components/ui/Button';
import Checkbox from '@/components/ui/Checkbox';

function ConfirmPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || 'loremipsum@gmail.com';
  const type = searchParams.get('type') || 'login'; // 'login' or 'register'

  const { login, register, tempAuthData } = useAuth();
  const [agreed, setAgreed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    if (!tempAuthData) {
      router.push('/login');
    }
  }, [tempAuthData, router]);

  const handleConfirm = async () => {
    if (!agreed || !tempAuthData) {
      return;
    }

    setIsLoading(true);
    try {
      if (type === 'login') {
        const result = await login(tempAuthData.email, tempAuthData.password);
        if (result.success) {
          router.push('/dashboard');
        }
      } else {
        const result = await register({
          email: tempAuthData.email,
          password: tempAuthData.password,
          // Add other required fields if any
        });
        if (result.success) {
          router.push('/login');
        }
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen h-[1024px] flex justify-center bg-white font-poppins">
      <div className="w-full flex gap-10">
        {/* Left Section - Form */}
        <div className="w-[50%] px-[40px] pt-[3px] flex flex-col items-center justify-center bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] ">
          <div className="flex flex-col gap-[40px] items-center max-w-[640px]">
            <Image
              src="/loginlogoimg.png"
              alt="Illustration"
              width={500}
              height={211}
              className="object-contain"
            />

            <Image
              src="/loginLogo.png"
              alt="CandidTax Logo"
              width={160}
              height={89}
              className="object-contain opacity-70"
            />

            {/* Certifications */}
            <div className="flex gap-[80px] text-[#555555]">
              <div className="flex items-center gap-3">
                <Image src="/globleImg.png" alt="ISO" width={32} height={32} className='opacity-50' />
                <div className="font-poppins font-normal text-[12px] leading-[17px] tracking-normal">
                  <div>ISO 27001</div>
                  <div>Data Center</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Image src="/securityImg.png" alt="ISO" width={32} height={32} className='opacity-50' />
                <div className="font-poppins font-normal text-[12px] leading-[17px] tracking-normal">
                  <div>SSL Certified Site</div>
                  <div>128-bit encryption</div>
                </div>
              </div>
            </div>

            {/* Dummy text */}
            <p className="font-['Poppins'] font-normal text-[12px] leading-[17px] tracking-normal text-[#8E8E93]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>

            {/* Footer links */}
            <div className="flex gap-[30px] text-[#888888] text-[13px] font-medium underline   font-Poppins font-normal text-xs leading-[17px] underline decoration-solid text-[#8E8E93]">
              <Link href="#" className="hover:text-gray-600 transition-colors">Terms of Use</Link>
              <Link href="#" className="hover:text-gray-600 transition-colors">Privacy</Link>
            </div>
          </div>
        </div>
        {/* Right Section */}

        <div className="w-[50%] h-full flex flex-col items-center  justify-start pt-[120px] gap-[40px] bg-white">

          <h1 className="font-Poppins font-semibold text-[28px] leading-[38.4px] text-center bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
            {type === 'register' ? 'Create your Candid Tax Account' : 'Confirm your Candid Tax Account'}
          </h1>

          {/* Email Badge */}
          <div className="px-[30px] py-[10px] rounded-full border border-[#962DE3] mx-auto">
            <span className="font-Poppins font-normal text-base leading-6 tracking-normal bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">{email}</span>
          </div>

          {/* Checkbox block */}
          <div className=" w-[600px]  pl-[99px]">
            <Checkbox
              id="terms"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              label={
                <span className="font-poppins text-base leading-6 tracking-normal">
                  I have read and agrees to the following <span className="font-poppins font-bold text-base leading-6 tracking-normal">Candid Tax Privacy Policy & Terms & Conditions before proceeding.</span>
                </span>
              }
              required
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-[31px] w-full max-w-[700px]">
            <Button
              variant="brand"
              isLoading={isLoading}
              className="flex-1 h-[52px] rounded-[8px] font-Poppins font-semibold text-base"
              onClick={handleConfirm}
              disabled={!agreed}
            >
              Agree and Continue
            </Button>
            <Button
              variant="whiteGradient"
              className="flex-1 h-[52px] rounded-[8px] font-Poppins font-semibold text-base"
              onClick={() => router.back()}
            >
              I decline
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center font-poppins text-lg text-brand-blue">Loading...</div>}>
      <ConfirmPageContent />
    </Suspense>
  );
}
