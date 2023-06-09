import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';

import TextInput, { type TextInputProps } from '@/components/inputs/TextInput';

type SearchProps = Omit<TextInputProps, 'onSubmit'> & {
  keyword: string;
  onSubmit(keyword: string): void;
};

type SearchFormData = {
  keyword: string;
};

const Search: React.FC<SearchProps> = ({ keyword, className = '', onSubmit }) => {
  const { register, reset } = useForm<SearchFormData>();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const debouncedSearch = React.useRef(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    debounce((keyword: string) => {
      onSubmit(keyword);
    }, 500)
  ).current;

  function onSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    debouncedSearch(value);
  }

  React.useEffect(() => {
    return () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      debouncedSearch.cancel();
    };
  }, [debouncedSearch]);

  useEffect(() => {
    if (keyword?.length) {
      reset({ keyword: keyword });
    }
  }, [keyword, reset]);

  return (
    <TextInput
      {...register('keyword', { required: true, maxLength: 80 })}
      id="search"
      type="search"
      placeholder="Search"
      autoComplete="off"
      className="!m-0"
      wrapperClass={`!m-0 w-full flex-auto lg:flex-grow-0 ${className}`}
      labelClass="!m-0"
      pre={<MdSearch size={24} className="text-gray-600" />}
      onChange={onSearchInput}
    />
  );
};

export default Search;
