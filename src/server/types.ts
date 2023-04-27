import { type NextApiRequest, type NextApiResponse } from 'next';
import { type Session } from 'next-auth';
import { type DefaultJWT } from 'next-auth/src/jwt/types';

export type ServerRequest = NextApiRequest & {
  user?: DefaultJWT;
  session?: Session;
};

export type ServerResponse = NextApiResponse;
