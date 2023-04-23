import { debounce } from 'lodash';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import TextInput, { type TextInputProps } from '@/components/inputs/TextInput';

type SearchProps = TextInputProps & {
  keyword: string;
  onSubmit(keyword: string);
};

type SearchFormData = {
  keyword: string;
};

const Search: React.FC<SearchProps> = ({ keyword, className = '', onSubmit }) => {
  const { register, reset } = useForm<SearchFormData>();

  const debouncedSearch = React.useRef(
    debounce(async (keyword: string) => {
      onSubmit(keyword);
    }, 500)
  ).current;

  async function onSearchInput(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    debouncedSearch(value);
  }

  React.useEffect(() => {
    return () => {
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
      id="search"
      type="search"
      placeholder="Type keyword to search"
      autoComplete="off"
      className="!m-0"
      wrapperClass={`!m-0 w-full flex-auto lg:flex-grow-0 ${className}`}
      labelClass="!m-0"
      {...register('keyword')}
      onChange={onSearchInput}
    />
  );
};

export default Search;
