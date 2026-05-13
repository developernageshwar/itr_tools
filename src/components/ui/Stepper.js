"use client";

import React from 'react';
import { MdRadioButtonUnchecked } from 'react-icons/md';

const StepCircle = ({ active }) => (
  <div
    className="flex items-center justify-center flex-shrink-0"
    style={{
      color: '#1498EB',
      opacity: active ? 1 : 0.35,
    }}
  >
    <MdRadioButtonUnchecked size={22} />
  </div>
);

const DashedLine = ({ active }) => ( 
  <div
    className="h-[2px] w-[180px] self-center" // Fixed width instead of flex-1 to prevent full-screen stretching
    style={{
      background: 'linear-gradient(90deg, #1498EB 0%, #962DE3 100%)',
      opacity: active ? 1 : 0.3,
      WebkitMaskImage: 'repeating-linear-gradient(to right, black 0px, black 5px, transparent 5px, transparent 11px)',
      maskImage: 'repeating-linear-gradient(to right, black 0px, black 5px, transparent 5px, transparent 11px)',
    }}
  />
);

const Stepper = ({ steps = [] }) => {
  return (
    <div className="flex items-start bg-white"> 
      {steps.map((step, i) => (
        <div key={i} className="flex flex-col items-start gap-4">
          
          {/* Top Row: Circle + Line */}
          <div className="flex items-center gap-[8px]">
            <StepCircle active={step.active} />
            
            {/* Render line only if it's not the last step, or keep it if you want 3 lines */}
            {i < steps.length && (
              <DashedLine active={step.active} />
            )}
          </div>

          {/* Bottom Row: Text Label */}
          <span  className='font-poppins font-semibold text-base leading-6 tracking-normal'
            
          >
            {step.title}
          </span>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
