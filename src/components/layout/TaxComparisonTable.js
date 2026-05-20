import React from 'react';

const TaxComparisonTable = () => {
  const rows = [
    { label: 'Experience', self: 'INDEPENDENT', expert: 'FULLY MANAGED' },
    { label: 'Speed', self: 'IMMEDIATE', expert: 'STRUCTURED & THOROUGH' },
    { label: 'Support', self: 'GUIDED SYSTEM', expert: 'DEDICATED PROFESSIONAL' },
    { label: 'Ideal For', self: 'SIMPLER RETURNS', expert: 'COMPLEX SCENARIOS' },
    { label: 'Confidence', self: 'SYSTEM-VALIDATED', expert: 'EXPERT-ASSURED' },
  ];

  return (
    <section className="w-full bg-white pt-[80px] pb-[40px] font-poppins">
      <div className="w-full flex gap-10 flex-col  text-center">
        {/* Header Section */}
         <div className="flex flex-col gap-4 ">
        <p className="text-[16px] font-medium tracking-wider font-poppins   text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
          Select the experience that fits your needs . 
        </p>
        
        <h2 className="font-poppins font-bold text-[52px] leading-[62.4px] tracking-normal [leading-trim:none]">
           A clear choice 
        </h2>  
        </div> 

        {/* Table Section */}
        <div className="flex flex-col w-full max-w-[1120px] mx-auto px-[40px] text-left">
          
          {/* Table Header Wrapper */}
          <div className="w-full mb-[24px] mt-5">
            {/* Table Header */}
            <div className="grid grid-cols-3 pb-[16px]   border-bg-gradient-to-r from-[#1498EB] to-[#962DE3] border-b-4 border-transparent [border-image:linear-gradient(90deg,#1498EB_0%,#962DE3_100%)_1]">
              <div></div>
              <div className="font-poppins font-medium text-[19px] leading-[100%] tracking-normal capitalize [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
                Self Filing
              </div>
              <div className="font-poppins font-medium text-[19px] leading-[100%] tracking-normal capitalize [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent ">
                Expert Filing
              </div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="flex flex-col gap-10 w-full">
            {rows.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 py-[24px]   last:border-0  w-[1040px] rotate-0 opacity-100 border-b  border-b-[#E5E5EA] "
              >
                <div className="font-poppins font-medium text-[19px] leading-[100%] tracking-normal capitalize [leading-trim:none] bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent">
                  {row.label}
                </div>
                <div className="font-Poppins font-medium text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none]">
                  {row.self}
                </div>
                <div className="font-Poppins font-medium text-base leading-[26.4px] tracking-normal uppercase [leading-trim:none]">
                  {row.expert}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaxComparisonTable;
