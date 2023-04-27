import axios, { type AxiosError, type AxiosInstance } from 'axios';

import RequestError from '@/lib/errors/RequestError';

export * from 'axios';

const request: AxiosInstance = axios.create({
  baseURL: '/api',
});

request.interceptors.response.use(
  (res) => res,
  (err: AxiosError<any>) => {
    throw new RequestError({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
      message: err.response.data.message || err.message,
      response: err.response,
      statusCode: err?.response?.status || 500,
    });
  }
);

export default request;
