import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button className={`px-6 py-2 transition-all hover:bg-gray-100 ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
