import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({
  loading,
  children,
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button type={type} className={`relative px-6 py-2 transition-all ${className}`} {...props}>
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <BiLoaderAlt size={24} color="inherit" className="animate-spin" />
        </div>
      )}
      <div className={`${loading ? 'opacity-0' : ''}`}>{children}</div>
    </button>
  );
};

export default Button;
