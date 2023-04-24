import { type IncomingHttpHeaders } from 'http';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import { type ParsedUrlQuery } from 'querystring';
import { type Schema } from 'yup';

import { type Session, type SessionUser } from '@/server/auth';
import HandleErrors from '@/server/handlers/HandleErrors';

export type ServerRequestContext = {
  headers: IncomingHttpHeaders;
  params: Record<string, string | undefined>;
  query: ParsedUrlQuery;
  session: Session;
  user?: SessionUser;
};

type HandlerConfig<P> = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  target?: 'query' | 'body';
  schema?: Schema<P>;
};

type Impl<P, R> = (params: P, context: ServerRequestContext) => Promise<R>;

const createHandler = <P, R>(
  { method = 'GET', target = 'query', schema }: HandlerConfig<P>,
  impl: Impl<P, R>
) => {
  return async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      if (!req.url || !req.url.startsWith('/api/')) {
        res.status(404).json({ message: `Invalid API URL "${req.url}"` });
        return;
      }

      if (req.method.toUpperCase() !== method) {
        res.status(405).json({ message: `Method not allowed "${req.method}"` });
        return;
      }

      const data = req[target];
      const session: Session = await getSession({ req });

      if (schema) {
        await schema.validate(data, { abortEarly: false });
      }

      const context: ServerRequestContext = {
        headers: req.headers,
        params: {},
        query: req.query,
        session,
        user: session?.user || null,
      };

      const response = await impl(data, context);
      res.send(response);
    } catch (error) {
      HandleErrors(error, res);
    }
  };
};

export const Get = <P, R>(schema: Schema<P>, impl: Impl<P, R>) => {
  return createHandler({ method: 'GET', target: 'query', schema }, impl);
};

export const Post = <P, R>(schema: Schema<P>, impl: Impl<P, R>) => {
  return createHandler({ method: 'POST', target: 'body', schema }, impl);
};

export const Patch = <P, R>(schema: Schema<P>, impl: Impl<P, R>) => {
  return createHandler({ method: 'PATCH', target: 'body', schema }, impl);
};

export const Delete = <P, R>(schema: Schema<P>, impl: Impl<P, R>) => {
  return createHandler({ method: 'DELETE', target: 'query', schema }, impl);
};
