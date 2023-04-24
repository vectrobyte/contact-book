import { type NextApiRequest, type NextApiResponse } from 'next';
import { type User } from 'next-auth';
import { type Session } from 'next-auth/src';

export type ServerRequest = NextApiRequest & {
  user?: User;
  session?: Session;
};

export type ServerResponse = NextApiResponse;
