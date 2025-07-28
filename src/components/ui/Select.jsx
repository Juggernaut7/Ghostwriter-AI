import React from 'react';

const Select = ({ options, className, placeholder, ...props }) => {
  return (
    <select
      className={`w-full px-3 py-2 bg-[#1A1324] border border-[#5D3FD3] rounded-lg text-[#C7F9CC] focus:ring-2 focus:ring-[#5D3FD3] focus:border-[#5D3FD3] font-[Inter] text-sm sm:text-base ${className || ''}`}
      {...props}
    >
      <option value="" disabled>
        {placeholder}
      </option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;