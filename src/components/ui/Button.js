
import React from 'react';
import { cn } from '@/utils/helpers';

const Button = React.forwardRef(({
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,  
  prefixIcon, // Added for flexibility
  suffixIcon, // Added for flexibility 
  children,
  disabled,
  ...props
}, ref) => {

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm active:scale-95',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 active:scale-95',
    outline: 'border-2 border-gray-200 bg-transparent hover:bg-gray-50 active:scale-95',
    ghost: 'bg-transparent hover:bg-100 text-gray-600',
    danger: 'bg-red-500 text-white hover:bg-red-600 active:scale-95',
    // Implemented based on image_125bbf.png and image_125898.png
    whiteGradient: 'bg-white shadow-md transition-all active:scale-95 [background-clip:padding-box,border-box] [background-origin:padding-box,border-box] [background-image:linear-gradient(#fff,#fff),linear-gradient(to_right,#1498EB,#962DE3)] border border-transparent',
    brand: 'bg-gradient-brand text-white border-none shadow-md hover:opacity-90 transition-opacity active:scale-95',
    gradientOutline: `
    relative bg-white text-[#1E1E1E] 
    [background-clip:padding-box,border-box] 
    [background-origin:padding-box,border-box] 
    [background-image:linear-gradient(#fff,#fff),linear-gradient(90deg,#1498EB_0%,#962DE3_100%)] 
    border-transparent border-[1px]
    hover:opacity-90 transition-opacity
  `,
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-3 text-lg font-semibold',
    icon: 'p-2',
  };

  // Determine if we should use gradient text logic
  const isWhiteGradient = variant === 'whiteGradient';

  return (
    <button
      ref={ref}
      disabled={disabled || isLoading}
      className={cn(
        'inline-flex items-center justify-center font-bold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
        'rounded-[8px] cursor-pointer',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}

      {!isLoading && prefixIcon && (
        <span className="inline-flex shrink-0">
          {prefixIcon}
        </span>
      )}   

      {/* Gradient Text Logic from image_1249f0.png */}
      <span className={cn(
        isWhiteGradient && "bg-gradient-to-r from-[#1498EB] to-[#962DE3] bg-clip-text text-transparent"
      )}>
        {children}
      </span>

      {!isLoading && suffixIcon && (
        <span className="inline-flex shrink-0">
          {suffixIcon}
        </span>
      )} 
    </button>
  );
});

Button.displayName = 'Button';

export default Button; 
