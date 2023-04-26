import axios, { type AxiosInstance } from 'axios';

import RequestError from '@/lib/errors/RequestError';

export * from 'axios';

const request: AxiosInstance = axios.create({
  baseURL: '/api',
});

request.interceptors.response.use(
  (res) => res,
  (e) => {
    const message = e.response?.data?.message || e.message;

    throw new RequestError({
      message,
      statusCode: e.response?.status,
      response: e.response,
    });
  }
);

export default request;
