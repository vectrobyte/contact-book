import React, { forwardRef } from 'react';
import { type Control, Controller } from 'react-hook-form';
import Select, { type Props } from 'react-select';
import makeAnimated from 'react-select/animated';

import InputBase from '@/components/inputs/InputBase';
import { getSlug, uuid } from '@/lib/helpers';

export type Option = {
  label: string;
  value: string;
};

export type MultiSelectProps = Props & {
  label?: string;
  error?: string;
  wrapperClass?: string;
  labelClass?: string;
  control: Control<any>;
  options: Option[];
};

function MultiSelect(
  {
    id,
    name,
    label,
    error,
    control,
    labelClass = '',
    wrapperClass = '',
    className = '',
    options,
    ...props
  }: MultiSelectProps,
  ref: React.Ref<any>
) {
  const inputId = id || getSlug(name || '') || `input-${uuid()}`;

  return (
    <InputBase
      id={inputId}
      label={label}
      labelClass={labelClass}
      error={error}
      className={wrapperClass}
    >
      <Controller
        name="group_ids"
        defaultValue={options.map((c: Option) => c.value)}
        control={control}
        render={({ field: { onChange, value, ...field } }) => (
          <Select
            ref={ref}
            {...field}
            isMulti
            isClearable
            value={options.filter((c: Option) => (value as string[]).includes(c.value))}
            onChange={(val: Option[]) => onChange(val.map((c: Option) => c.value))}
            closeMenuOnSelect={false}
            components={makeAnimated()}
            options={options}
            classNames={{
              control: (state) =>
                `!min-h-[50px] !rounded-none !p-1 !outline-black !shadow-none
                 ${state.isFocused ? '!border-gray-800' : '!border-gray-400'}
                 ${error ? `!border-red-500` : ''}`,
              multiValue: () => `!rounded-none !bg-gray-200 !mx-2 !w-[95%]`,
              multiValueLabel: () => 'text-sm font-normal !text-gray-800',
              multiValueRemove: () => '!bg-transparent transition-colors hover:text-red-500',
              valueContainer: () => '!p-0',
              placeholder: () => 'px-2',
            }}
          />
        )}
      />
    </InputBase>
  );
}

export default forwardRef(MultiSelect);
