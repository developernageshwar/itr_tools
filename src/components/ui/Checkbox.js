import React from 'react';
import { FiCheck } from 'react-icons/fi';

const Checkbox = ({ id, checked: controlledChecked, onChange, label, className = '', ...props }) => {
  const [internalChecked, setInternalChecked] = React.useState(false);
  const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

  const handleChange = (e) => {
    if (controlledChecked === undefined) {
      setInternalChecked(e.target.checked);
    }
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="relative flex items-center mt-[4px] w-[18px] h-[18px]">
        <input
          type="checkbox"
          id={id}
          checked={isChecked}
          onChange={handleChange}
          className="peer absolute inset-0 opacity-0 cursor-pointer z-10"
          {...props}
        />
        {/* Custom Checkbox Design */}
        <div className={`w-full h-full border-2 rounded-[2px] flex items-center justify-center transition-all duration-200 ${
          isChecked ? 'bg-[#962DE3] border-[#962DE3]' : 'bg-white border-[2px] border-[#962DE3]'
        }`}>
          <FiCheck 
            className={`text-white transition-opacity duration-200 ${isChecked ? 'opacity-100' : 'opacity-0'}`} 
            size={14} 
            strokeWidth={4}
          />
        </div>
      </div>
      {label && (
        <label 
          htmlFor={id} 
          className="cursor-pointer select-none font-poppins text-base leading-6 text-[#1E1E1E]"
        >
          {label}
        </label>
      )}
    </div>
  );
};

export default Checkbox;
