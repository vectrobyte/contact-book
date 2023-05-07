import React from 'react';
import { AiFillWarning } from 'react-icons/ai';

type InputBase = React.HTMLAttributes<HTMLElement> & {
  label?: string;
  error?: string;
  labelClass?: string;
};

const InputBase: React.FC<InputBase> = ({
  id,
  label,
  error,
  children,
  className = '',
  labelClass = '',
}) => {
  return (
    <div className={`relative mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className={`mb-2 block capitalize text-gray-800 ${labelClass}`}>
          {label}
        </label>
      )}
      {children}
      {error && (
        <span className="my-1 flex items-start text-sm text-red-500">
          <AiFillWarning className="mr-1 mt-0.5" size="16" />
          <span>{error}</span>
        </span>
      )}
    </div>
  );
};

export default InputBase;
