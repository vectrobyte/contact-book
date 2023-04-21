import React from 'react';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button className={`px-6 py-2 transition-all ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
