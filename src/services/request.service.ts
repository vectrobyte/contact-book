import axios, { type AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';

import RequestError from '@/lib/errors/RequestError';

export * from 'axios';

const request: AxiosInstance = axios.create({
  baseURL: '/api',
});

request.interceptors.response.use(
  (res) => res,
  (err: Error) => {
    if ((err as AxiosError).response) {
      const response = (err as AxiosError).response as AxiosResponse;
      throw new RequestError({
        message: ((response.data as Record<string, any>) || err)?.message as string,
        response: response,
        statusCode: response?.status || 500,
      });
    }

    throw new RequestError({
      message: err.message || 'Unknown error occurred',
      statusCode: 500,
    });
  }
);

export default request;
