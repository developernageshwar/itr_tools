"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import Button from '@/components/ui/Button';
import Stepper from '@/components/ui/Stepper';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { FaRegClipboard } from "react-icons/fa6";
import { MdAccountCircle } from "react-icons/md";
import { GoArrowUpRight } from "react-icons/go";
import { MdOutlineSkipNext } from "react-icons/md";
import { MdOutlineInsertComment } from "react-icons/md";
import { RiAwardLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import SupportCard from '@/components/cards/supportCard';
import { useChatStore } from '@/store/chatStore';
import Footer2 from '@/components/layout/Footer2';

export default function DashboardPage() {
  const { openChat } = useChatStore();
  const router = useRouter();
  return (
    <ProtectedRoute>
      <div className="w-full flex flex-col gap-10 p-10">
        <div className="flex flex-col  lg:flex-row gap-10">



          {/* Sidebar Area (Right) */}
          <div className="flex flex-col w-[360px] h-auto gap-5">
            <div className="w-[320px] h-36 gap-4 rounded-2xl border border-[#3867D6] bg-[#F0F4FF] p-4 flex">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#D6E4FF] flex items-center justify-center">
                  <MdOutlineSkipNext className="text-[24px] text-[#3867D6]" />
                </div>

                {/* Heading */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-poppins font-semibold text-base leading-6 tracking-normal">
                    Step by step guide for ITR filling
                  </h3>


                  {/* Divider - Clean solid line as per image */}
                  <div className="w-full h-[1px] bg-[#3867D6]" />

                  {/* Footer Link */}
                  <Link
                    href="#"
                    className="font-poppins flex justify-between items-center  font-semibold text-base leading-6 tracking-normal text-[#3867D6]"
                  >
                    <span>View Guide</span>
                    <MdKeyboardArrowRight size={28} color="#3867D6" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Live Support Card */}
            <SupportCard
              title="Live support"
              description="Ask our expert for ITR doubts and queries."
              buttonText="Link Pan & Prefill"
              buttonLink="#"
              icon={<MdOutlineInsertComment className="text-[24px]" color="#3867D6" />}
              bgColor="bg-[#3867D6] "
            />

            {/* We've got you covered Card */}
            <div className="w-[320px] gap-4 rounded-2xl border border-[#9030DD] bg-[#F8F0FF] p-4 flex">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-[#9030DD33]  flex items-center justify-center">
                  <RiAwardLine className="text-[24px]" color="#9030DD" />
                </div>

                {/* Heading */}
                <div className="flex flex-col gap-4">
                  <h3 className="font-poppins font-semibold text-base leading-6 tracking-normal">
                    We’ve got you covered
                  </h3>

                  <p className="font-poppins font-normal text-base leading-6 tracking-normal text-[#8E8E93]">Fix your taxes confidently with 100% accuracy.</p>


                  {/* Divider - Clean solid line as per image */}
                  <div className="w-full h-[1px] bg-[#9030DD]" />

                  {/* Footer Link */}
                  <Link
                    href="#"
                    className="font-poppins flex justify-between items-center  font-semibold text-base leading-6 tracking-normal text-[#9030DD] "
                  >
                    <span>Learn More</span>
                    <MdKeyboardArrowRight size={28} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
          {/* Main Content Area (Left) */}
          <div className="flex-1 flex flex-col gap-8">
            {/* Page Title & Status */}
            <div className='flex flex-col gap-8'>
              <h1 className="font-poppins font-semibold text-[28px] leading-[38.4px] tracking-normal bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">My Dashboard</h1>
              <div className="font-poppins font-normal text-base leading-6 tracking-normal text-black flex gap-8 ">
                <span>Filling Status:</span>
                <span>AY 2026-2027 (Current))</span>
              </div>
            </div>

            {/* Greeting & Subheading */}
            <div className='flex flex-col gap-4 font-poppins font-normal text-base leading-6 tracking-normal text-black '>
              <p>Hello there,</p>
              <h2 className='font-poppins font-semibold text-[28px] leading-[38.4px] tracking-normal text-black'>Let&apos;s finish the last few steps quickly</h2>
              <p>Don&apos;t wait until tomorrow!</p>
            </div>

            {/* Stepper / Progress — Figma Frame 2609479 */}
            <div>
              <Stepper
                steps={[
                  { title: 'Link Pan & Prefill', active: true },
                  { title: 'Add you details', active: false },
                  { title: 'File ITR', active: false },
                ]}
              />
            </div>

            {/* Know your steps & Action Button */}
            <div className="flex flex-col items-start gap-6">
              <Link href="#" className="flex items-center gap-3 text-[#962DE3] font-poppins font-semibold text-base hover:underline">
                <p className='font-poppins font-semibold text-base leading-6 tracking-normal bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent'>Know your steps </p>
                <MdKeyboardArrowRight size={24} />
              </Link>
              <Button
                onClick={() => router.push('/dashboard/my-tax-returns')}
                variant="brand" className="h-[52px] px-8 w-[179px] h-12 py-3 px-4  gap-[10px] rounded-lg   font-poppins font-semibold text-base leading-6 tracking-normal ">
                Complete E-filing
              </Button>
            </div>

            {/* Small Cards Grid */}
            <div className='flex flex-col gap-5'>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* My Tax Returns */}
                <Link
                  href="#"
                  className="group flex items-center justify-between gap-4 p-4 h-[130px] rounded-[16px] transition-all hover:shadow-md"
                  style={{
                    background: 'linear-gradient(#F0F4FF, #F0F4FF) padding-box, linear-gradient(90deg, #1498EB 0%, #962DE3 100%) border-box',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-[48px] h-[48px] rounded-full  flex items-center justify-center  bg-[#3867D633]">
                      <FaRegClipboard color='#3867D6' className="text-2xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-poppins font-semibold text-base leading-6 tracking-normal">My Tax Returns</h3>
                      <p className="font-poppins font-normal text-base leading-6 tracking-normal text-[#8E8E93]">A comprehensive record of your past<br />ITR filings</p>
                    </div>
                  </div>
                  <MdKeyboardArrowRight color='#3867D6' size={25} className="text-[22px] text-[#1E1E1E] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>

                {/* My Profile */}
                <Link
                  href="#"
                  className="group flex items-center justify-between h-[130px] gap-4 p-4 rounded-[16px] transition-all hover:shadow-md"
                  style={{
                    background: 'linear-gradient(#F0F4FF, #F0F4FF) padding-box, linear-gradient(90deg, #1498EB 0%, #962DE3 100%)',
                  }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-[48px] h-[48px] rounded-full  flex items-center justify-center  bg-[#3867D633]">
                      <MdAccountCircle color='#3867D6' className="text-2xl" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <h3 className="font-poppins font-semibold text-base leading-6 tracking-normal">My Profile</h3>
                      <p className="font-poppins font-normal text-base leading-6 tracking-normal text-[#8E8E93] max-w-[300px]  ">Contact details, Change password, Lined PANs etc.</p>
                    </div>
                  </div>
                  <MdKeyboardArrowRight color='#3867D6' size={25} className="text-[22px] text-[#1E1E1E] flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Start for free Banner */}
              <Link
                href="#"
                className="group flex items-center justify-between h-[130px] gap-4 p-4 rounded-[16px] transition-all hover:shadow-md bg-[#F8F0FF]"
              >
                <div className="flex items-start gap-4">
                  <div className="w-[48px] h-[48px] rounded-full  flex items-center justify-center  bg-[#9030DD33]">
                    <GoArrowUpRight color='#9030DD' className="text-2xl" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="font-poppins font-semibold text-base leading-6 tracking-normal">Start for free, Pay when you file</h3>
                    <p className="font-poppins font-normal text-base leading-6 tracking-normal text-[#8E8E93] max-w-[400px]  ">Auto plan selection, auto regime selection,
                      post filling assurance much more!</p>
                  </div>
                </div>
                <div className='flex gap-4 font-poppins font-normal text-base leading-6 tracking-normal text-[#9030DD]'>
                  <span>View</span>
                  <MdKeyboardArrowRight color='#9030DD' size={25} className="text-[22px] text-[#1E1E1E] flex-shrink-0 group-hover:translate-x-1 transition-transform" />

                </div>
              </Link>
            </div>
          </div>
        </div>
        <Footer2 />
      </div>
    </ProtectedRoute>
  );
}
