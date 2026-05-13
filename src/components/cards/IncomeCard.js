import React from 'react';
const IncomeCard = ({ icon: Icon, title, description, children, iconBg = "bg-[#E8F1FF]", iconColor = "text-[#3867D6]" }) => {
  return (
    <div className=" flex items-center justify-between  transition-all hover:border-[#3867D6]/40 group w-[1000px] h-[160px] rotate-0 opacity-100 gap-7 rounded-[28px] border border-[#3867D6] p-5">  
      <div className="flex gap-6 flex-1"> 
        {/* Icon Circle */}
        <div className={`w-[44px] h-[44px] rounded-full ${iconBg} flex items-center justify-center flex-shrink-0 ${iconColor}`}>
          <Icon size={24} />
        </div>

        {/* Text Content */}
        <div className="flex flex-col gap-2">
          <h3 className="font-poppins font-semibold text-base leading-6 tracking-normal text-[#1E1E1E]">
            {title}
          </h3>
          <p className="font-poppins  text-[#8E8E93] leading-snug max-w-[550px] font-normal text-base leading-6 tracking-normal ">
            {description}
          </p>
        </div>
      </div>

      {/* Action Area */}
      <div className="flex items-center gap-4">
        {children}
      </div>
    </div>
  );
}; 

export default IncomeCard;
