import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

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
  const [searching, setSearching] = useState(false);

  const { register, handleSubmit } = useForm();
  const [debouncedKeyword, setDebouncedKeyword] = useState('');

  const handleSearch = useCallback(
    async (keyword: string) => {
      setSearching(true);
      try {
        await onSubmit(keyword);
      } finally {
        setSearching(false);
      }
    },
    [onSubmit]
  );

  const handleSubmitSearch = useCallback((data: SearchFormData) => {
    setDebouncedKeyword(data.keyword);
  }, []);

  useEffect(() => {
    if (debouncedKeyword !== defaultKeyword) {
      const timerId = setTimeout(() => {
        handleSearch(debouncedKeyword);
      }, 300);
      return () => clearTimeout(timerId);
    }
  }, [debouncedKeyword, defaultKeyword, handleSearch]);

  return (
    <form
      onSubmit={handleSubmit(handleSubmitSearch)}
      className={`flex items-stretch gap-4 ${className}`}
    >
      <TextInput
        id="search"
        placeholder="Type keyword to search"
        autoComplete="off"
        defaultValue={defaultKeyword}
        className="!m-0"
        wrapperClass="!m-0 w-full flex-auto lg:flex-grow-0"
        labelClass="!m-0"
        {...register('keyword')}
        onChange={(e) => setDebouncedKeyword(e.target.value)}
      />
      <PrimaryButton type="submit" loading={searching}>
        Search
      </PrimaryButton>
    </form>
  );
};

export default Search;
