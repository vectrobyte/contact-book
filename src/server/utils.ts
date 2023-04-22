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

type HandlerConfig<P> = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  target?: 'query' | 'body';
  schema?: Schema<P>;
};

type Impl<P, R> = (params: P, context: ServerRequestContext) => Promise<R>;

function mapValidationError(errorObj: ValidationError) {
  const errors = {};

  errorObj.inner.forEach((err) => {
    const { path, message } = err;
    errors[path] = message;
  });

  return {
    name: errorObj.name,
    message: `${errorObj.errors.length} errors found`,
    errors,
  };
}

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

      if (schema) {
        await schema.validate(data, { abortEarly: false });
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
        res.status(422).json(mapValidationError(error));
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
