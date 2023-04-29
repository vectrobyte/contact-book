import React, { forwardRef } from 'react';
import Select, { type Props } from 'react-select';
import makeAnimated from 'react-select/animated';

import InputBase from '@/components/inputs/InputBase';
import { getSlug, uuid } from '@/lib/helpers';

const animatedComponents = makeAnimated();

type MultiSelectProps<T> = Props<T> & {
  label?: string;
  error?: string;
  wrapperClass?: string;
  labelClass?: string;
  options: T[];
};

function MultiSelect<T>(props: MultiSelectProps<T>, ref: React.Ref<any>) {
  const {
    id,
    name,
    label,
    error,
    className = '',
    labelClass = '',
    wrapperClass = '',
    options,
    ...rest
  } = props;

  const inputId = id || getSlug(name || '') || `input-${uuid()}`;

  return (
    <InputBase
      id={inputId}
      label={label}
      labelClass={labelClass}
      error={error}
      className={wrapperClass}
    >
      <Select
        ref={ref}
        closeMenuOnSelect={false}
        components={animatedComponents}
        isMulti
        options={options}
        className={`${className}`}
        {...rest}
      />
    </InputBase>
  );
}

MultiSelect.displayName = 'MultiSelect';

export default forwardRef(MultiSelect);
