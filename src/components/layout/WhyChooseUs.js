import React from 'react';
import Image from 'next/image';
const WhyChooseUs = () => {
  const features = [
    {
      title: "Maximum Tax Savings",
      description: "Individuals can save upto ₹86,500 by filing their tax returns through us.",
      icon: (
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl rotate-6"></div>
          <div className="relative z-10">
            <Image src="/whychooseIcon (3).png" alt="Savings Icon" width={60} height={60} className="object-contain" />
          </div>
        </div>
      )
    },
    {
      title: "Unparalleled speed",
      description: "Individuals can file their tax returns in under 3 minutes.",
      icon: (
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl -rotate-6"></div>
          <div className="relative z-10">
            <Image src="/whychooseIcon (1).png" alt="Speed Icon"  width={60} height={60}className="object-contain" />
          </div>
        </div>
      )
    },
    {
      title: "Accurate Compliance",
      description: "Our product is designed and tested by in-house tax experts, ensuring every new clause, form or feature is updated",
      icon: (
        <div className="relative w-20 h-20 flex items-center justify-center">
          <div className="absolute inset-0 rounded-2xl rotate-3"></div>
          <div className="relative z-10">
            <Image src="/whychooseIcon (2).png" alt="Compliance Icon"  width={60} height={60}className="object-contain" />
          </div>
        </div>
      )
    }
  ];

  return (
    <section className="bg-light-blue py-[60px] px-10 font-outfit">
      <div className="max-w-[1440px] flex gap-10 flex-col mx-auto text-center"> 
        <div className="flex flex-col gap-4 ">
        <p className="text-[16px] font-medium tracking-wider font-poppins   text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
          India's best tax experts at your service for a tailored, accurate and premium tax filing experience.
        </p>
        
        <h2 className="font-poppins font-bold text-[52px] leading-[62.4px] tracking-normal [leading-trim:none]">
          Why Choose Us?
        </h2>  
        </div> 


        <div className="flex md:flex-row gap-10 justify-center">
          {features.map((feature, index) => (
            <div key={index} className="w-[320px] rotate-0 opacity-100 flex flex-col gap-4 rounded-[24px] p-4 bg-white">
              <div>
                {feature.icon}
              </div>
              <h3 className="font-poppins font-semibold text-[28px] leading-[38.4px] tracking-normal [leading-trim:none] text-left">
                {feature.title}
              </h3>
              <p className="font-poppins text-left   font-normal text-base leading-6 tracking-normal [leading-trim:none]">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
