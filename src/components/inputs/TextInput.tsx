import React, { forwardRef } from 'react';

import InputBase from '@/components/inputs/InputBase';
import { getSlug, uuid } from '@/lib/helpers';

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  wrapperClass?: string;
  labelClass?: string;
  pre?: React.ReactNode;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    { id, name, label, error, className = '', labelClass = '', wrapperClass = '', pre, ...props },
    ref
  ) => {
    const inputId = id || getSlug(name || '') || `input-${uuid()}`;

    return (
      <InputBase
        id={inputId}
        label={label}
        labelClass={labelClass}
        error={error}
        className={wrapperClass}
      >
        {pre && <div className="flex-center absolute inset-y-0 p-3">{pre}</div>}
        <input
          ref={ref}
          id={inputId}
          name={name}
          className={`mt-2 w-full border border-gray-400 bg-white p-3 placeholder-gray-400 transition-colors focus:border-gray-800 focus:outline-none
            ${error ? `!border-red-500` : ''}
            ${pre ? 'pl-12' : ''}
            ${className}
          `}
          type="text"
          placeholder=""
          {...props}
        />
      </InputBase>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
