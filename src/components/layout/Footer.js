import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../ui/Button';

const Footer = () => {
  return (
    <footer className="w-full">
      {/* Upper CTA Section */}
      <div className="w-full bg-[#F0F4FF] w-full  h-[382px] rotate-0 opacity-100 pt-20 pr-[140px] pb-20 pl-[140px] gap-20 flex items-center flex-col">
        <div className="flex flex-col gap-4 text-center ">
          <p className="text-[16px] font-medium tracking-wider font-poppins   text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
            A filing experience that delivers confidence, clarity, and complete peace of mind
          </p>

          <h2 className="font-poppins font-bold text-[42px] leading-[62.4px] tracking-normal [leading-trim:none]">
            Trusted by those who expect more
          </h2>
        </div>

        <Button
          variant="brand"
          className="w-[350px] h-[48px] font-poppins font-semibold text-base leading-6 tracking-normal [leading-trim:none]  rotate-0 opacity-100 pt-3 pr-4 pb-3 pl-4 gap-2.5 rounded-lg "
        >
          get started
        </Button>

      </div>

      {/* Main Footer Section */}
      <div className="w-full bg-gradient-to-r from-[#1498EB] to-[#962DE3] pt-[40px] pb-[40px] text-white px-4 lg:px-[140px] font-poppins">
        <div className="max-w-[1440px] mx-auto flex flex-col lg:flex-row justify-between items-center gap-14 lg:gap-0">

          {/* Logo Column */}
          <div className="flex-shrink-0"> 
            <Image src="/logoimg.png" alt="CANDIDTAX Logo" width={200} height={100} className="object-contain" />
          </div>

          {/* Links Columns */}
          <div className="flex gap-[60px] lg:gap-[140px]">
            <div className="flex flex-col gap-6">
              <Link href="#" className="font-Poppins font-normal text-base leading-6 tracking-normal text-center [leading-trim:none]">Begin self filling</Link>
              <Link href="#" className="font-Poppins font-normal text-base leading-6 tracking-normal text-center [leading-trim:none]">Franchise</Link>
              <Link href="#" className="font-Poppins font-normal text-base leading-6 tracking-normal text-center [leading-trim:none]">Services</Link>
            </div>
            <div className="flex flex-col gap-6">
              <Link href="#" className="font-Poppins font-normal text-base leading-6 tracking-normal text-center [leading-trim:none]">Hire an expert</Link>
              <Link href="#" className="font-Poppins font-normal text-base leading-6 tracking-normal text-center [leading-trim:none]">Testimonials</Link>
              <Link href="#" className="font-Poppins font-normal text-base leading-6 tracking-normal text-center [leading-trim:none]">FAQ</Link>
            </div>
          </div>

          {/* Social Media Column */}
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-5">
              <p className="text-[16px] font-bold border-b-[2px] border-white pb-2 px-6">Follow us</p>
              <div className="flex items-center gap-[32px]">
                <Link href="#" className="hover:opacity-80 transition-all">
                  <Image src="/instaIcon.png" alt="CANDIDTAX Logo" width={27} height={27} className="object-contain" />
                </Link>
                <Link href="#" className="hover:opacity-80 transition-all">
                  <Image src="/fbIcon.png" alt="CANDIDTAX Logo" width={18} height={18} className="object-contain" />
                </Link>
                <Link href="#" className="hover:opacity-80 transition-all">
                  <Image src="/twitterIcon.png" alt="CANDIDTAX Logo" width={27} height={27} className="object-contain" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="max-w-[1440px] mx-auto mt-[80px] text-center  font-normal tracking-wide   font-poppins font-normal text-base leading-6 tracking-normal [leading-trim:none] ">
          Copyrights © 2026 CANDID TAX . Privacy Policy . Terms & conditions . Designed and developed by Adlivetech
        </div>
      </div>
    </footer>
  );
};

export default Footer;
