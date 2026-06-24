"use client";

import Link from 'next/link';
import Button from '@/components/ui/Button';
import Image from 'next/image';
import { usePathname } from 'next/navigation';


const Navbar = () => {
  const pathname = usePathname();

  const noNavbarPaths = ['/login', '/register', '/confirm'];
  if (noNavbarPaths.includes(pathname) || pathname.startsWith('/dashboard')) {
    return null;
  } 

  return (
    <header className="w-full fixed top-0 left-0 z-50">
      {/* Top Bar */}
      <div className="bg-contactusbg text-white py-[2px] px-[120px] font-montserrat font-medium text-[10px] leading-[15px] tracking-[1px] uppercase ">
        <div className="max-w-[1440px] h-[32px] mx-auto flex justify-between items-center">
          <span>CALL US: +91 9717245289,  +91 9873945289</span>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className="h-20 bg-gradient-brand bg-white/10 border-b border-[#D0D0D0] flex items-center">
        <div className="max-w-[1440px] w-full mx-auto flex justify-between items-center pt-4 pr-10 pb-4 pl-8 h-20">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logoimg.png" alt="Logo" width={100} height={50} />
          </Link>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-poppins font-normal text-base  leading-6 tracking-normal text-center ">
            <Link href="/franchise" className="text-white hover:opacity-80  ">Franchise</Link>
            <Link href="/commissions" className="text-white hover:opacity-80  ">Commissions</Link>
            <Link href="/services" className="text-white hover:opacity-80 ">Services</Link>
            <Link href="/contact" className={`text-white hover:opacity-80 ${pathname === '/contact' ? 'border-b-2 border-white' : ''}`} >Contact</Link>

            {/* Action Button */}
            <Link href="/register">
              <Button
                variant="whiteGradient"
                className="font-poppins font-semibold text-base leading-6 tracking-normal  "
              >
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
