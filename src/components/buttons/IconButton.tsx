import React from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: React.FC<IconButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`rounded-full p-2 text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;
