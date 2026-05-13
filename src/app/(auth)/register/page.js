"use client";

import Link from 'next/link';
import Image from 'next/image';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';
import { MdChevronRight } from 'react-icons/md';
import { FiEye, FiGlobe, FiShield } from 'react-icons/fi';
import { FaWindows } from "react-icons/fa6";
import Button from '@/components/ui/Button';  
import Input from '@/components/ui/Input';
import Checkbox from '@/components/ui/Checkbox';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register, setTempAuthData, loginWithGoogle, loginWithApple } = useAuth();
  const router = useRouter();

  const handleInitialSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) { 
      return; 
    }
    setTempAuthData({ email, password });
    router.push(`/confirm?email=${encodeURIComponent(email)}&type=register`);
  };  

  return (
    <div className="w-full min-h-screen h-[1024px] flex justify-center bg-white font-poppins">
      <div className="w-full max-w-[1440px] flex gap-10">
        {/* Left Section - Form */}
        <div className="w-[720px] h-full flex flex-col pt-[120px] pb-[40px] px-[40px] gap-[40px] bg-white">
          {/* Top Links */}
          <div className="flex justify-between items-center text-[15px] font-poppins font-normal text-base leading-6 tracking-normal">
            <span >Welcome!</span>
            <span >
              Already Registered? <Link href="/login" className="font-poppins font-normal text-base leading-6 tracking-normal text-[#3867D6]">Login</Link>
            </span>
          </div>

          <form onSubmit={handleInitialSubmit} className="flex flex-col gap-[40px]">
            {/* Title */}
            <h1 className="font-Poppins font-semibold text-[28px] leading-[38.4px] tracking-normal bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
              Create your account
            </h1>

            {/* Social Buttons */}
            <div className="flex flex-col gap-[28px]">
              <Button
                type="button"
                variant="gradientOutline"
                onClick={loginWithGoogle}
                prefixIcon={
                  <span className="bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
                    <FcGoogle size={24} className="fill-current" />
                  </span>
                }
                className="w-[640px] h-[52px] py-2 gap-[10px]   font-Poppins font-normal text-base leading-6 tracking-normal  "
              >
                Sign up with Google
              </Button>
              <Button
                type="button"
                variant="gradientOutline"
                onClick={loginWithApple}
                prefixIcon={
                  <FaApple size={24} className="fill-current" />
                }
                className="w-[640px] h-[52px] py-2 gap-[10px]   font-Poppins font-normal text-base leading-6 tracking-normal  "
              >
                Sign up with Apple ID
              </Button>

              <Button
                type="button"
                variant="gradientOutline"
                prefixIcon={
                  <FaWindows size={24} className="fill-current" />
                }
                className="w-[640px] h-[52px] py-2 gap-[10px]   font-Poppins font-normal text-base leading-6 tracking-normal  "
              >
                Sign up with Microsoft
              </Button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-[#D9D9D9]"></div>
              <span className="font-poppins font-normal text-base leading-6 tracking-normal text-center text-[#8E8E93]">or</span>
              <div className="flex-1 h-[1px] bg-[#D9D9D9]"></div>
            </div>

            {/* Form Fields */}
            <div className="flex flex-col gap-[28px]">
              <Input
                type="email"
                placeholder="Enter email"
                className="w-full h-[52px]"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />   

              <Input
                type="password"
                placeholder="Password" 
                variant="password"
                className="w-full h-[52px]"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              /> 
            </div>

            {/* Checkbox */}
            <div className=" w-[502px]  pl-[64px]">
              <Checkbox
                id="terms"
                label={
                  <span className="font-poppins text-base leading-6 tracking-normal">
                    I have read and agrees to the following <span className="font-poppins font-bold text-base leading-6 tracking-normal">Candid Tax Privacy Policy & Terms & Conditions before proceeding.</span>
                  </span>
                }
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-[31px]">
              <Button 
                type="submit"
                variant="brand" 
                className="flex-1 h-[52px] rounded-[8px] font-semibold  font-Poppins font-semibold text-base leading-6 tracking-normal"
              >
                Agree and Continue
              </Button>
              <Button 
                type="button"
                variant="whiteGradient" 
                className="flex-1 h-[52px] rounded-[8px] font-semibold text-[16px]"
              >
                I decline
              </Button>
            </div>
          </form>
        </div>

        {/* Right Section */}
        <div className="w-[720px] px-[40px] pt-[3px] flex flex-col items-center justify-center bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] ">

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
                <Image src="/globleImg.png" alt="ISO" width={32} height={32} className='opacity-50'/>
                <div className="font-poppins font-normal text-[12px] leading-[17px] tracking-normal">
                  <div>ISO 27001</div>
                  <div>Data Center</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                    <Image src="/securityImg.png" alt="ISO" width={32} height={32} className='opacity-50'/>
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
              <Link href="/terms" className="hover:text-gray-600 transition-colors">Terms of Use</Link>
              <Link href="/privacy" className="hover:text-gray-600 transition-colors">Privacy</Link>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
