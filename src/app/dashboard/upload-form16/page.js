"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import {
  MdOutlineLightbulb,
  MdOutlineFileUpload,
  MdKeyboardArrowDown
} from 'react-icons/md';
import Button from '@/components/ui/Button';
import Footer2 from '@/components/layout/Footer2';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Image from 'next/image';
import Link from 'next/link';

export default function UploadForm16Page() {
  const router = useRouter();
  const [openFaq, setOpenFaq] = React.useState(null);

  const faqs = [
    { question: "What is Form 16?" },
    { question: "From where do I get my Form 16?" },
    { question: "I have got annexure as a different file." },
    { question: "Can I upload multiple Form 16s at once?" }
  ];

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[1440px] mx-auto p-10 flex flex-col  font-poppins  h-[768px] rotate-0 opacity-100 gap-[42px] relative">

        <div className="flex flex-col lg:flex-row gap-10 items-start"> 

          {/* Sidebar */}
          <div className="w-full lg:w-[320px] flex flex-col gap-6">
            {/* FAQ Header */}
            <div className="w-full h-[52px] bg-gradient-brand rounded-xl flex items-center justify-center shadow-sm">
              <span className="text-white font-semibold text-[18px] font-poppins">FAQs</span>
            </div>

            {/* FAQ Card with Gradient Border */}
            <div className="w-full bg-gradient-to-b from-[#1498EB] to-[#962DE3] p-[0.9px] rounded-xl shadow-sm">
              <div className="w-full bg-white rounded-xl flex flex-col py-2">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;
                  return (
                    <div key={index} className="flex flex-col border-b border-[#F0F0F0] last:border-none">
                      <div
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex items-center justify-between p-4 cursor-pointer hover:bg-[#F8FAFF] transition-all group"
                      >
                        <span className={`font-poppins  font-normal text-[14px] leading-[17px] tracking-normal ${isOpen ? 'text-[#3867D6]' : 'text-black'}`}>
                          {faq.question}
                        </span>
                        <MdKeyboardArrowDown
                          className={` text-2xl flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#3867D6] ' : 'rotate-0 text-black  '}`}
                        />
                      </div>

                      {/* Collapsible Answer */}
                      <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                        <div className="px-4 pb-4 text-[13px] text-[#8E8E93] font-poppins leading-relaxed">
                          Placeholder answer for {faq.question.toLowerCase()} goes here. This section expands smoothly when clicked.
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Save Button */}
            <Button
              className="w-full h-[58px] bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] text-[#3867D6] rounded-xl font-semibold text-[18px] shadow-sm hover:opacity-90 transition-all font-poppins mt-2"
              onClick={() => router.push('/dashboard/income-sources')}
            >
              Save & Continue
            </Button>
          </div>

          <div className="flex-1 flex flex-col gap-5">
            <h1 className="font-Poppins font-semibold text-[black] text-[28px] leading-[38.4px] tracking-normal">
              Upload Form-16 to auto-fill your data
            </h1>

            {/* Info Box */}
            <div className='flex flex-col gap-[22px]'>

              <div className=" max-w-[973px] bg-[#F0F4FF] rounded-xl p-6 flex items-start gap-4  rounded-lg bg-gradient-to-r from-[#C8D7FF] to-[#E9D1FE] p-[1px]">
                <div className="w-full flex h-full rotate-0 opacity-100 gap-[30px] rounded-lg pt-[14px] pr-[110px] pb-[15px] pl-[42px] bg-[#F0F4FF]">
                  <div className="w-12 h-12 flex items-center justify-center">
                    <Image src="/bulbIcon.png" alt="lightbulb" width={30} height={30} />
                  </div>
                  <ul className="font-poppins font-normal text-base flex flex-col gap-1 leading-6 tracking-normal">
                    <li className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                      You can upload multiple Form 16&apos;s if you have switched jobs in this Financial Year.
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-black flex-shrink-0" />
                      You should also upload the annexure if you have received it separately from your employer.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Upload Area */} 
              <div className="relative max-w-[973px]  h-[423px] rounded-[8px] bg-[#F0F4FF] overflow-hidden group cursor-pointer">
                {/* Dashed Gradient Border via SVG */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg width="100%" height="100%" className="rounded-[8px]">
                    <rect
                      width="100%"
                      height="100%"
                      fill="none"
                      rx="8"
                      ry="8"
                      stroke="url(#gradient-dashed)"
                      strokeWidth="2"
                      strokeDasharray="4,4"
                    />
                    <defs>
                      <linearGradient id="gradient-dashed" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#1498EB" />
                        <stop offset="100%" stopColor="#962DE3" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                <div className="flex flex-col items-center justify-center h-full py-[90px] px-[308px] gap-8 ">
                  <div className="w-[50px] h-[50px] flex items-center justify-center">
                    <Image src="/uploadIcon.png" alt="upload" width={50} height={50} />
                  </div>

                  <h3 className="font-poppins  font-medium text-[20px] leading-[100%] tracking-normal">
                    Drop Form 16 here or click to select
                  </h3>

                  <span className="text-[#8E8E93] font-poppins font-medium text-[20px] leading-[100%] tracking-normal text-center">OR</span>

                  <Button
                    variant="brand"
                    className="w-[340px] rounded-lg font-medium  text-[18px] shadow-sm"
                  >
                    Browse File
                  </Button>
                </div>
              </div>
            </div>

            {/* Skip Link */}
            <div className="flex max-w-[973px] justify-center cursor-pointer  ">
              <Link href="/dashboard/income-sources">
                <span
                  className="w-[238px] h-10 rotate-0 opacity-100 gap-2.5 rounded-lg py-2 px-4  bg-gradient-to-r from-[#1498EB] to-[#962DE3] text-transparent bg-clip-text font-semibold size-[16px]"
                >
                  Continue without Form 16
                </span>
              </Link>
            </div>
          </div>
        </div>

        <Footer2 />
      </div>
    </ProtectedRoute>
  );
}
