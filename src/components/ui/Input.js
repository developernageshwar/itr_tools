
import React, { useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { cn } from '@/utils/helpers';

const Input = ({
  label,
  labelClassName = '',
  error,
  variant = 'text',
  className = '',
  id,
  placeholder,
  value,
  onChange,
  onBlur,
  disabled = false,
  required = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = id || (label ? label.toLowerCase().replace(/\s/g, '-') : 'input');

  const baseStyles = `w-full h-[52px] bg-light-blue border rounded-[8px] px-4 text-[#7A7A7A] placeholder:text-[#999999] focus:outline-none focus:border-[#1498EB] text-[15px] transition-colors duration-200 ${
    error ? 'border-red-500' : 'border-[#D9D9D9]'
  } ${variant === 'password' ? 'pr-12' : ''} ${className}`;

  const getType = () => {
    if (variant === 'email') return 'email';
    if (variant === 'password') return showPassword ? 'text' : 'password';
    if (variant === 'number') return 'number';
    return 'text';
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full relative">
      {label && (
        <label 
          htmlFor={inputId} 
          className={cn("block mb-2 text-sm font-medium text-[#333]", labelClassName)}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          {...props}
          id={inputId}
          type={getType()}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          required={required}
          className={baseStyles}
        />
        
        {/* Password toggle button */}
        {variant === 'password' && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-[#1498EB] transition-colors focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default Input; 
