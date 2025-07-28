import React from 'react';

const Button = ({ children, className, variant = 'primary', ...props }) => {
  const baseStyles = 'font-[Inter] font-semibold rounded-lg transition-colors';
  const variants = {
    primary: 'bg-[#5D3FD3] hover:bg-[#4B32A8] text-[#C7F9CC]',
    outline: 'border border-[#5D3FD3] text-[#C7F9CC] hover:bg-[#5D3FD3]/20',
    ghost: 'text-[#C7F9CC] hover:bg-[#5D3FD3]/20',
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className || ''} px-4 py-2 text-sm sm:text-base`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;