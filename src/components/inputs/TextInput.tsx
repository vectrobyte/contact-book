import React, { forwardRef } from 'react';

import { getSlug, uuid } from '@/lib/helpers';

import InputBase from './InputBase';

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
  labelClass?: string;
};

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ id, name, label, error, className = '', labelClass = '', ...props }, ref) => {
    const inputId = id || getSlug(name || '') || `input-${uuid()}`;

    return (
      <InputBase id={inputId} label={label} labelClass={labelClass} error={error}>
        <input
          ref={ref}
          id={inputId}
          name={name}
          className={`mt-2 w-full border border-gray-400 bg-white p-3 placeholder-gray-400 transition-colors focus:border-gray-800 focus:outline-none
            ${error ? `!border-red-500` : ''}
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
