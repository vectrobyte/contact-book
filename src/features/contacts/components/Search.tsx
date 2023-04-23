import { debounce } from 'lodash';
import React, { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { MdSearch } from 'react-icons/md';

import PrimaryButton from '@/components/buttons/PrimaryButton';
import TextInput from '@/components/inputs/TextInput';

type SearchProps = Omit<React.HTMLAttributes<HTMLElement>, 'onSubmit'> & {
  keyword: string;
  onSubmit(keyword: string);
};

type SearchFormData = {
  keyword: string;
};

const Search: React.FC<SearchProps> = ({ keyword: defaultKeyword, className = '', onSubmit }) => {
  const { register, handleSubmit, reset } = useForm<SearchFormData>();

  const debouncedSearch = React.useRef(
    debounce(async (keyword: string) => {
      onSubmit(keyword);
    }, 500)
  ).current;

  const handleSubmitSearch = useCallback(
    (data: SearchFormData) => {
      debouncedSearch(data.keyword);
    },
    [debouncedSearch]
  );

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
    if (defaultKeyword?.length) {
      reset({ keyword: defaultKeyword });
    }
  }, [defaultKeyword, reset]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSearch)}
      className={`flex items-stretch gap-4 ${className}`}
    >
      <TextInput
        id="search"
        placeholder="Type keyword to search"
        autoComplete="off"
        className="!m-0"
        wrapperClass="!m-0 w-full flex-auto lg:flex-grow-0"
        labelClass="!m-0"
        {...register('keyword')}
        onChange={onSearchInput}
      />
      <PrimaryButton type="submit" icon={<MdSearch size={24} />}>
        <span className="hidden sm:block">Search</span>
      </PrimaryButton>
    </form>
  );
};

export default Search;
