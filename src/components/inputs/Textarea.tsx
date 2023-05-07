import React, { forwardRef } from 'react';

import InputBase from '@/components/inputs/InputBase';
import { getSlug, uuid } from '@/lib/helpers';

export type TextInputProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
  error?: string;
  wrapperClass?: string;
  labelClass?: string;
};

const TextInput = forwardRef<HTMLTextAreaElement, TextInputProps>(
  (
    {
      id,
      name,
      label,
      error,
      rows = 3,
      className = '',
      labelClass = '',
      wrapperClass = '',
      ...props
    },
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
        <textarea
          ref={ref}
          id={inputId}
          name={name}
          placeholder=""
          rows={rows}
          className={`min-h-[130px] w-full resize-none border border-gray-400 bg-white p-3 placeholder-gray-400 transition-colors focus:border-gray-800 focus:outline-none
            ${error ? `!border-red-500` : ''}
            ${className}
          `}
          {...props}
        />
      </InputBase>
    );
  }
);

TextInput.displayName = 'TextInput';

export default TextInput;
