import React from 'react';

const Input = ({ className, ...props }) => {
  return (
    <input
      className={`w-full px-3 py-2 bg-secondary border border-primary rounded-lg text-accent focus:ring-2 focus:ring-primary focus:border-primary font-[Inter] text-sm sm:text-base ${className || ''}`}
      {...props}
    />
  );
};

export default Input;