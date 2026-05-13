'use client'
import Image from 'next/image';
import Button from '@/components/ui/Button'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Hero = () => {
  const router = useRouter();
  return (
    <section className="relative w-full min-h-[700px] flex items-center pt-24 pb-20 overflow-hidden bg-[#EEF0FF]">

      {/* 3-step Rupee Background Layout - Right aligned staircase */}
      <div className="absolute top-22 right-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-10 right-0 flex flex-col items-end">
          {/* Row 1: 3 Images */}
          <div className="flex">
            {[1, 2, 3].map((i) => (
              <div key={`r1-${i}`} className="relative w-[245px] h-[150px] opacity-40">
                <Image src="/heroRupessimg.png" alt="Rupee" fill className="object-cover" />
              </div>
            ))}
          </div>
          {/* Row 2: 2 Images */}
          <div className="flex">
            {[1, 2].map((i) => (
              <div key={`r2-${i}`} className="relative w-[245px] h-[150px] opacity-40">
                <Image src="/heroRupessimg.png" alt="Rupee" fill className="object-cover" />
              </div>
            ))}
          </div>
          {/* Row 3: 1 Image */}
          <div className="flex">
            <div className="relative w-[245px] h-[150px] opacity-40">
              <Image src="/heroRupessimg.png" alt="Rupee" fill className="object-cover" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">

          {/* Left Content Area */}
          <div className="w-full lg:w-[65%] text-left pt-30 z-20">
            <div className='flex flex-col gap-4'>
              <h1 className="font-poppins font-bold text-[52px] leading-[62.4px] tracking-normal [leading-trim:none]">
                <span className="bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
                  File ITR with AI in 10 minutes
                </span>
              </h1>

              <p className="font-bold mb-14 max-w-2xl leading-tight font-poppins font-semibold text-[28px] leading-[38.4px] tracking-normal [leading-trim:none] ">
                Quick filing, Maximum Refunds, All-year support.
              </p>
            </div>


            {/* Cards */}
            <div className="flex flex-col sm:flex-row gap-6">
              {/* Self Filing Card */}
              <div className="flex flex-col justify-between w-full sm:w-[400px] h-[167px] border-b-4 border-l-4 border-transparent rounded-[24px] p-5 shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)] [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] [background-image:linear-gradient(#fff,#fff),linear-gradient(90deg,#1498EB,#962DE3)] transition-transform hover:scale-[1.02]">
                <h3 className="font-poppins font-semibold text-[28px] leading-[38.4px] tracking-normal [leading-trim:none]">Self Filing</h3>
                <Button onClick ={() => router.push('/register')} variant="brand" className="font-poppins font-semibold text-base leading-6 tracking-normal [leading-trim:none]">
                  File Now
                </Button>
              </div>

              {/* Hire Expert Card */}
              <div className="flex flex-col justify-between w-full sm:w-[400px] h-[167px] border-b-4 border-l-4 border-transparent rounded-[24px] p-5 shadow-[0px_0px_20px_2px_rgba(0,0,0,0.1)] [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] [background-image:linear-gradient(#fff,#fff),linear-gradient(90deg,#1498EB,#962DE3)] transition-transform hover:scale-[1.02]">
                <h3 className="font-poppins font-semibold text-[28px] leading-[38.4px] tracking-normal [leading-trim:none]">Hire an Expert</h3>
                <Button variant="brand" className="font-poppins font-semibold text-base leading-6 tracking-normal [leading-trim:none]">
                  Connect Now
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Right Image Container - Absolute positioned to anchor at bottom right */}
      <div className="hidden lg:block absolute bottom-0 right-0 lg:right-0 xl:right-[4%] w-[500px] xl:w-[600px] h-[70%] z-10 pointer-events-none">
        <Image
          src="/herowomenimg.png"
          alt="Tax Professional"
          fill
          className="object-contain object-bottom lg:object-right-bottom"
          priority
        />
      </div>
    </section>
  );
};

export default Hero;