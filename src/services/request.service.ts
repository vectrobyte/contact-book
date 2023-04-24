import axios, { type AxiosInstance } from 'axios';
import { getSession } from 'next-auth/react';

import RequestError from '@/lib/errors/RequestError';
import { type Session } from '@/server/auth';

export * from 'axios';

const request: AxiosInstance = axios.create({
  baseURL: '/api',
  withCredentials: true,
});

request.interceptors.request.use(async (request) => {
  const session: Session = await getSession();

  console.log(session);

  if (session) {
    request.headers.common = {
      Authorization: `Bearer ${session.accessToken}`,
    };
  }
  return request;
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
