import Link from 'next/link';
import Image from 'next/image';

const Footer2 = () => {
  return (
    <div className="mt-auto pt-10 pb-2">
      <div className="flex flex-col  gap-4">
        <div className="flex justify-between items-start gap-10">
          {/* Disclaimer Text */}


          {/* Security Logos */}
          <div className="flex gap-12 items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px] relative">
                <Image src="/globleImg.png" alt="ISO" fill className="object-contain opacity-60" />
              </div>
              <div className="font-poppins font-normal text-[12px] leading-[17px] tracking-normal text-[#8E8E93]">
                <p>ISO 27001</p>
                <p>Data Center</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-[32px] h-[32px] relative">
                <Image src="/securityImg.png" alt="SSL" fill className="object-contain opacity-60" />
              </div>
              <div className="font-poppins font-normal text-[12px] leading-[17px] tracking-normal text-[#8E8E93]">
                <p>SSL Certified Site</p>
                <p>128-bit encryption</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex-1">
              <p className="font-poppins font-normal text-[12px] leading-[17px] tracking-normal text-[#8E8E93]">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            {/* Links Section */}
            <div className="flex gap-6 mt-2">
              <Link href="#" className="font-poppins font-normal text-[12px] leading-[18px] text-[#8E8E93] hover:underline">Terms of Use</Link>
              <Link href="#" className="font-poppins font-normal text-[12px] leading-[18px] text-[#8E8E93] hover:underline">Privacy</Link>
            </div>
          </div>

        </div>


      </div>
    </div>
  )
}
export default Footer2;