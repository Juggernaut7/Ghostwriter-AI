import React from 'react';

const Textarea = ({ className, ...props }) => {
  return (
    <textarea
      className={`w-full px-3 py-2 bg-[#1A1324] border border-[#5D3FD3] rounded-lg text-[#C7F9CC] focus:ring-2 focus:ring-[#5D3FD3] focus:border-[#5D3FD3] font-[Inter] text-sm sm:text-base resize-none ${className || ''}`}
      {...props}
    />
  );
};

export default Textarea;