import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@/utils/helpers';
import { formatIndianNumber } from './ManualFormComponents';

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
  as: Component = 'input',
  children,
  ...props
}) => {
  const inputRef = useRef(null);
  const [selection, setSelection] = useState(null);

  const isAmtOrNum = label?.toLowerCase().includes("amount") || label?.includes("₹") || type === "number";

  useEffect(() => {
    if (selection && inputRef.current) {
      inputRef.current.setSelectionRange(selection.start, selection.end);
      setSelection(null);
    }
  }, [selection, value]);

  const handleChange = (e) => {
    if (isAmtOrNum) {
      const input = e.target;
      const originalStart = input.selectionStart;
      const originalValue = input.value;
      
      const rawValue = originalValue.replace(/[^0-9]/g, "");
      const formattedValue = formatIndianNumber(rawValue);
      
      const commasBefore = (originalValue.substring(0, originalStart).match(/,/g) || []).length;
      const digitsBefore = originalStart - commasBefore;
      
      let newStart = 0;
      let digitsSeen = 0;
      for (let i = 0; i < formattedValue.length; i++) {
        if (digitsSeen === digitsBefore) {
          break;
        }
        if (formattedValue[i] !== ",") {
          digitsSeen++;
        }
        newStart++;
      }
      
      e.target.value = rawValue;
      setSelection({ start: newStart, end: newStart });
    }
    if (onChange) onChange(e);
  };

  const displayValue = isAmtOrNum ? formatIndianNumber(value) : value;

  const renderLabel = (labelStr) => {
    if (typeof labelStr === 'string' && labelStr.includes('*')) {
      const parts = labelStr.split('*');
      return (
        <>
          {parts[0]}
          <span className="text-red-500 font-bold">*</span>
          {parts.slice(1).join('*')}
        </>
      );
    }
    return labelStr;
  };

  if (variant === 'gradient') {
    return (
      <div className={cn("flex flex-col gap-2 w-full max-w-[200px]", className)}>
        <div className={cn("relative pt-2", wrapperClassName)}>
          {/* Small Floating Label Box */}
          <label className={cn("absolute left-3 -top-0.5 z-10 bg-white px-1 font-poppins font-normal text-[14px] leading-none text-[#3867D6] transition-all", labelClassName)}>
            {renderLabel(label)}
          </label>

          {/* Input with Gradient Border */}
          <div className={cn(
            "relative rounded-[4px] p-[1px]",
            touched && error ? "bg-red-500" : "bg-gradient-brand"
          )}>
            <div className="bg-white rounded-[3px] overflow-hidden">
              <Component
                ref={inputRef}
                type={type === 'text' ? undefined : type}
                value={displayValue}
                onChange={handleChange}
                placeholder={placeholder}
                {...props}
                className={cn(
                  "w-full h-[52px] px-4 outline-none bg-transparent font-poppins text-[15px] font-medium text-black transition-all",
                  Component === 'select' && "cursor-pointer",
                  inputClassName
                )}
              >
                {children}
              </Component>
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
          {renderLabel(label)}
        </label>
        <Component
          ref={inputRef}
          type={type === 'text' ? undefined : type}
          value={displayValue}
          onChange={handleChange}
          placeholder={placeholder}
          {...props}
          className={cn(
            "w-full h-14 border border-[#79747E] rounded-[8px] px-4 outline-none transition-colors bg-transparent font-poppins text-[16px] text-black",
            touched && error ? "border-red-500 focus:border-red-600" : "focus:border-[#3867D6]",
            inputClassName
          )}
        >
          {children}
        </Component>
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