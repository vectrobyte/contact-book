import React from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const IconButton: React.FC<IconButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button className={`rounded-full p-2 transition-all hover:bg-gray-100 ${className}`} {...props}>
      {children}
    </button>
  );
};

export default IconButton;
