"use client";

import React, { useState } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { cn } from '@/utils/helpers';

const FormSection = ({ 
  icon: Icon, 
  title, 
  description, 
  children, 
  defaultExpanded = true, 
  className,
  hideArrow = false,
  rightAction,
  alwaysOpen = false
}) => {
  const [isExpanded, setIsExpanded] = useState(alwaysOpen || defaultExpanded);

  return (
    <div className={cn(
      "w-full flex flex-col rounded-[28px] border border-[#3867D6] bg-white transition-all duration-300",
      isExpanded ? "gap-7 p-5" : "gap-0 p-2",
      className
    )}>
      {/* Section Header */}
      <div
        className={cn(
          "flex items-start justify-between cursor-pointer hover:bg-gray-50 transition-colors rounded-t-[28px]",
          isExpanded ? "p-6" : "p-4"
        )}
        onClick={() => !alwaysOpen && !rightAction && setIsExpanded(!isExpanded)}
      >
        <div className="flex items-start gap-4 flex-1">
          {/* Icon Circle - Centered with Title */}
          <div className="w-11 h-11 rounded-full bg-[#3867D633] flex items-center justify-center flex-shrink-0">
            <Icon size={24} color="#3867D6" />
          </div>

          <div className="flex flex-col flex-1 ">
            <div className="h-8 flex ">
              <h3 className="font-poppins font-semibold text-[16px] leading-none text-black">
                {title}
              </h3>
            </div>
            {/* Description - Flows below Title */}
            {description && (
              <p className="font-poppins font-normal text-[16px] leading-5 text-[#8E8E93] max-w-[90%] -mt-1">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Area (Action or Arrow) */}
        <div className="flex items-center justify-center h-11">
          {rightAction ? (
            <div onClick={(e) => e.stopPropagation()}>
              {rightAction}
            </div>
          ) : !hideArrow && (
            <MdKeyboardArrowDown
              size={28}
              className={cn(
                "text-[#3867D6] transition-transform duration-300",
                isExpanded && "rotate-180"
              )}
            />
          )}
        </div>
      </div>

      {/* Section Content */}
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          isExpanded ? "max-h-[3000px] opacity-100 p-8 pt-0" : "max-h-0 opacity-0 overflow-hidden"
        )}
      >
        {children}
      </div>
    </div>
  );
};

export default FormSection;
