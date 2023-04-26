import { type AxiosPromise, type AxiosRequestConfig } from 'axios';
import { getCsrfToken, getSession } from 'next-auth/react';
import { useCallback } from 'react';

import request from '@/services/request.service';

import { useAbortController } from './useAbortController';

export const useRequest = () => {
  const { abort } = useAbortController();

  return useCallback(
    async <T>(configs?: AxiosRequestConfig) => {
      const token = await getCsrfToken();
      const session = await getSession();

      const headers: AxiosRequestConfig['headers'] = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'CSRF-Token': token,
        ...configs?.headers,
      };

      if (session?.accessToken) {
        headers.Authorization = `Bearer ${session.accessToken}`;
      }

      const fetchPromise = request({
        ...configs,
        headers,
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
};
