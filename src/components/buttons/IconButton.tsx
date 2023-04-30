import React from 'react';

type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButtonUnstyled: React.FC<IconButtonProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <button className={`transition-all ${className}`} {...props}>
      {children}
    </button>
  );
};

const IconButton: React.FC<IconButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <IconButtonUnstyled
      className={`rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-800 ${className}`}
      {...props}
    >
      {children}
    </IconButtonUnstyled>
  );
};

export default IconButton;
