import React from 'react';
import { cn } from '@/utils/helpers';

const FloatingInput = ({ 
  label, 
  placeholder, 
  helperText, 
  className, 
  inputClassName,
  labelClassName,
  wrapperClassName,
  variant = 'default',
  value,
  onChange,
  type = 'text',
  error,
  touched,
  ...props
}) => {
  if (variant === 'gradient') {
    return (
      <div className={cn("flex flex-col gap-2 w-full max-w-[200px]", className)}>
        <div className={cn("relative", wrapperClassName)}>
          {/* Small Floating Label Box (Light Purple background with Blue text) */}
          <div className={cn("relative", wrapperClassName)}>
        <label className={cn("absolute left-3 -top-3 z-10 bg-white px-1 font-poppins font-normal text-[14px] leading-6 tracking-normal text-[#3867D6]", labelClassName)}>
          {label}
        </label>
          </div>

          {/* Input with Gradient Border */}
          <div className="relative rounded-[4px] p-[1px] bg-gradient-brand ">
            <div className="bg-white rounded-[4px] overflow-hidden">
              <input 
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                {...props}
                className={cn(
                  "w-full h-[52px] px-4 outline-none bg-transparent font-poppins border  text-[15px] font-medium text-black transition-all ",
                  touched && error ? "border-red-500 focus:border-red-500" : "focus:border-black",
                  inputClassName
                )}
              />
            </div>
          </div>
        </div>
        {touched && error && (
          <p className="font-poppins font-normal text-[12px] text-red-500 ml-2">
            {error}
          </p>
        )}
        {!error && helperText && (
          <p className="font-poppins font-normal text-[12px] text-[#8E8E93] ml-2">
            {helperText}
          </p>
        )}
      </div>
    );
  }

  // Default Material-style Floating Input
  return (
    <div className={cn("flex flex-col gap-2 w-full max-w-[400px]", className)}>
      <div className={cn("relative", wrapperClassName)}>
        <label className={cn("absolute left-3 -top-3 z-10 bg-white px-1 font-poppins font-normal text-[14px] leading-6 tracking-normal text-[#49454F]", labelClassName)}>
          {label}
        </label>
        <input 
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          {...props}
          className={cn(
            "w-full h-14 border border-[#79747E] rounded-[8px] px-4 outline-none transition-colors bg-transparent font-poppins text-[16px] text-black",
            touched && error ? "border-red-500 focus:border-red-600" : "focus:border-[#3867D6]",
            inputClassName
          )}
        /> 
      </div>
      {touched && error && (
        <p className="font-poppins font-normal text-sm leading-5 tracking-normal text-red-500 ml-2">
          {error}
        </p>
      )}
      {!error && helperText && (
        <p className="font-poppins font-normal text-sm leading-5 tracking-normal text-[#49454F] ml-2">
          {helperText}
        </p>
      )}
    </div>
  );
};

export default FloatingInput; 