import { type AxiosPromise, type AxiosRequestConfig } from 'axios';
import { useCallback } from 'react';

import request from '@/services/request.service';

import { useAbortController } from './useAbortController';

export const useRequest = () => {
  const { abort } = useAbortController();

  const requestCall = useCallback(
    <T>(configs?: AxiosRequestConfig) => {
      const fetchPromise = request({
        ...configs,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
          ...configs?.headers,
        },
      }) as AxiosPromise<T>;

      abort();

      return fetchPromise.then(
        (response) => {
          return response;
        },
        (error) => {
          throw error;
        }
      );
    },
    [abort]
  );

  return request;
};
