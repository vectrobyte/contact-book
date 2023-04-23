import React from 'react';
import { BiLoaderAlt } from 'react-icons/bi';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
};

const Button: React.FC<ButtonProps> = ({
  loading,
  icon,
  children,
  iconPosition = 'left',
  type = 'button',
  className = '',
  ...props
}) => {
  return (
    <button
      type={type}
      className={`relative flex-shrink-0 p-3 transition-all hover:shadow-lg disabled:pointer-events-none disabled:opacity-70 sm:px-4 ${className}`}
      {...props}
    >
      {loading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <BiLoaderAlt size={24} color="inherit" className="animate-spin" />
        </div>
      )}
      <div className={`flex-center gap-2 ${loading ? 'opacity-0' : ''}`}>
        {icon && iconPosition === 'left' && icon}
        {children}
        {icon && iconPosition === 'right' && icon}
      </div>
    </button>
  );
};

export default Button;
