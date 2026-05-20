import React from 'react';
import Image from 'next/image';
import Button from '../ui/Button';

const TaxOptionsHeading = () => {
  const cards = [
    {
      title: "Seamless document upload with intelligent auto-fill",
      icon: (
        <Image
          src="/tailwared1Icon.png"
          width={60}
          height={60}
        />
      )
    },
    {
      title: "Guided flow crafted for clarity and ease",
      icon: (
        <Image
          src="/tailwared2Icon.png"
          width={60}
          height={60}
        />
      )
    },
    {
      title: "Real-time tax insights and refund visibility",
      icon: (
        <Image
          src="/tailwared3Icon.png"
          width={60}
          height={60}
        />
      )
    },
    {
      title: "Advanced validation to ensure accuracy",
      icon: (
        <Image
          src="/tailwared4Icon.png"
          width={60}
          height={60}
        />
      )
    }
  ];


  const cards2 = [
    {
      title: "Personalised support from experienced tax specialists",
      icon: (
        <Image
          src="/tailwared5.png"
          width={60}
          height={60}
        />
      )
    },
    {
      title: "End-to-end management with meticulous attention to detail",
      icon: (
        <Image
          src="/tailwared6.png"
          width={60}
          height={60}
        />
      )
    },
    {
      title: "Optimized tax outcomes through expert insights",
      icon: (
        <Image
          src="/tailwared7.png"
          width={60}
          height={60}
        />
      )
    },
    {
      title: "Compliance assured, without compromise",
      icon: (
        <Image
          src="/tailwared8.png"
          width={60}
          height={60}
        />
      )
    }
  ];

  return (
    <div className="w-full  font-poppins pt-12">
      {/* Heading */}
      <div className="w-full h-[211px] pt-10 pb-20 gap-[10px]">
        <h2 className="font-poppins font-bold text-[42px] leading-[50.4px] tracking-normal text-center capitalize bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent ">
          Two Tailored Ways To File Your Taxes
        </h2>
      </div>

      {/* Main Content Section */}
      <section className="bg-light-purple w-full  h-[536px] rotate-0 opacity-100 pt-10 pr-[140px] pb-10 pl-[140px] gap-10 ">

        <div className="w-full mx-auto grid lg:grid-cols-2 gap-[40px] items-center relative z-10 w-full">
          <div className="w-[600px] h-[456px] grid grid-cols-2 flex-wrap flex-col rotate-0 opacity-100 gap-10 ">
            {cards.map((card, index) => (
              <div key={index} className="w-[280px] h-[208px] rotate-0 opacity-100 border-b-4 pt-[32px] pr-4 pb-[32px] pl-4 gap-10 rounded-t-[24px] bg-white flex flex-col [border-image:linear-gradient(90deg,#1498EB_0%,#962DE3_100%)_1] border-transparent">
                <div>
                  {card.icon}
                </div>
                <p className="font-poppins font-normal text-base leading-6 tracking-normal [leading-trim:none]">
                  {card.title}
                </p>
              </div>
            ))}
          </div>

          {/* Right Column: Text and CTA */}
          <div className="lg:pl-12 flex flex-col gap-6 items-center w-full">
            <span className="self-end font-['Montserrat'] flex items-end font-bold text-[120px] leading-[120px] tracking-normal text-right [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent opacity-20">
              1
            </span>
            <p className="font-poppins font-medium text-base leading-[26.4px] tracking-normal text-center uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
              A thoughtfully designed experience that simplifies every step of your tax journey
            </p>

            <h3 className="font-poppins font-bold text-[42px] leading-[50.4px] tracking-normal text-center capitalize [leading-trim:none] text-black">
              Smart. Intuitive. <br /> Exceptionally Fast.
            </h3>

            <Button
              label="Begin Self Filing"
              variant="brand"
              className="font-poppins font-semibold text-base leading-6 tracking-normal [leading-trim:none]">
              Begin Self Filing
            </Button>
          </div>
        </div>
      </section>

      {/* section 2  */}
      <section className="bg-[#F0F4FF] w-full h-[536px] rotate-0 opacity-100 pt-10 pr-[140px] pb-10 pl-[140px] gap-10 ">

        <div className="w-full mx-auto grid lg:grid-cols-2 gap-[40px] items-center relative z-10 w-full">


          {/* Right Column: Text and CTA */}
          <div className="lg:pl-12 flex flex-col gap-6 items-center w-full">
            <span className="self-start font-['Montserrat'] flex items-end font-bold text-[120px] leading-[120px] tracking-normal text-right [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent opacity-20">
              2
            </span>
            <p className="font-poppins font-medium text-base leading-[26.4px] tracking-normal text-center uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
              For those who prefer precision handled by professionals — discreet, reliable, and comprehensive
            </p>

            <h3 className="font-poppins font-bold text-[42px] leading-[50.4px] tracking-normal text-center max-w-[450px] capitalize [leading-trim:none] text-black">
              A dedicated expert,
              at your service
            </h3>

            <Button
              label="Consult an Expert"
              variant="brand"
              className="font-poppins font-semibold text-base leading-6 tracking-normal [leading-trim:none]">
              Consult an Expert
            </Button>
          </div>

          <div className="w-[600px] h-[456px] grid grid-cols-2 flex-wrap flex-col rotate-0 opacity-100 gap-10 ">
            {cards2.map((card, index) => (
              <div key={index} className="w-[280px] h-[208px] rotate-0 opacity-100 border-b-4 pt-[32px] pr-4 pb-[32px] pl-4 gap-10 rounded-t-[24px] bg-white flex flex-col [border-image:linear-gradient(90deg,#1498EB_0%,#962DE3_100%)_1] border-transparent">
                <div>
                  {card.icon}
                </div>
                <p className="font-poppins font-normal text-base leading-6 tracking-normal [leading-trim:none]">
                  {card.title}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default TaxOptionsHeading;
