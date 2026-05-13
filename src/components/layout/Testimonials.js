import React from 'react';
import Image from 'next/image';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Lorem ipsum",
      position: "Position, Company",
      avatar: "/avatar1.png" // We'll need to ensure this exists or use a placeholder
    },
    {
      id: 2,
      quote: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt",
      body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
      author: "Lorem ipsum",
      position: "Position, Company",
      avatar: "/avatar1.png"
    }
  ];

  return (
    <section className="w-full bg-white  py-20 px-4">
      <div className="w-[1160px] mx-auto h-auto rotate-0 opacity-100 pt-20 pr-[120px] pb-20 pl-[120px]  flex flex-col gap-10 rounded-[60px] bg-[#F8F0FF]">
        {/* Header */}
       <div className="flex flex-col gap-4 text-center ">
        <p className="text-[16px] font-medium tracking-wider font-poppins   text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
         A filing experience that delivers confidence, clarity, and complete peace of mind 
        </p>
        
        <h2 className="font-poppins font-bold text-[42px] leading-[62.4px] tracking-normal [leading-trim:none]">
          Trusted by those who expect more 
        </h2>  
        </div> 

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-[80px] w-full">
          {testimonials.map((item) => (
            <div key={item.id} className="w-[440px] h-auto rotate-0 opacity-100 gap-6 rounded-[16px] p-5 bg-white ">
              {/* Quote Icon */}
              <div className="text-brand-blue">
                <Image src="/quotepng.png" alt="Quote Icon" width={60} height={60} className="-scale-y-100 rotate-180" />
              </div>

              {/* Content */}
              <div className="flex flex-col gap-4">
                <h4 className="font-poppins font-semibold text-base leading-6 tracking-normal [leading-trim:none]">
                  "{item.quote}"
                </h4>
                <p className="font-Poppins font-normal text-base leading-6 tracking-normal [leading-trim:none] text-[#8E8E93]">
                  "{item.body}"
                </p>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-6 mt-auto">
                <div className="w-[60px] h-[60px] rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                  <Image src="/testimonialimg.jpg" alt={item.author} width={60} height={60} className="object-cover w-full h-full" /> 
                </div>
                <div>
                  <p className="font-Poppins text-[16px] font-semibold text-base leading-6 tracking-normal [leading-trim:none]">{item.author}</p>
                  <p className="font-Poppins font-normal text-base leading-6 tracking-normal [leading-trim:none] text-[#8E8E93]">{item.position}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
