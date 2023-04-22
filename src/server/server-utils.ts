import { type IncomingHttpHeaders } from 'http';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type ParsedUrlQuery } from 'querystring';
import { type Schema, type ValidationError } from 'yup';

import AppError from '@/lib/errors/AppError';

export type ServerRequestContext = {
  headers: IncomingHttpHeaders;
  query: ParsedUrlQuery;
  params: Record<string, string | undefined>;
};

export type Validator<T> = {
  validate(data: unknown): { success: true; data: T } | { success: false; error: ValidationError };
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
        throw new AppError(`Invalid API URL "${req.url}"`);
      }

      if (req.method.toUpperCase() !== method) {
        res.status(405).json({ message: `Method not allowed "${req.method}"` });
        return;
      }

      const data = req[target];

      if (schema) {
        await schema.validate(data);
      }

      const context: ServerRequestContext = {
        headers: req.headers,
        params: {},
        query: req.query,
      };

      const response = await impl(data, context);
      res.send(response);
    } catch (error) {
      if (error.name === 'ValidationError') {
        res.status(400).json({ message: error.message });
      } else {
        res
          .status(error.isExpected ? 400 : 500)
          .send({ ...error, message: error.message || 'Unhandled Server Error' });
      }
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
