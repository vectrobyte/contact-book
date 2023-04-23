import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
} from '@prisma/client/runtime';
import { type IncomingHttpHeaders } from 'http';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type ParsedUrlQuery } from 'querystring';
import { type Schema, type ValidationError } from 'yup';

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
      // Handle Validation errors
      if (error.name === 'ValidationError') {
        return res.status(422).json(mapValidationError(error));
      }

      // Handle Known Prisma errors
      if (error instanceof PrismaClientKnownRequestError) {
        return res.status(400).json({
          message: 'Sorry, there was an error processing your request. Please try again later.',
        });
      }

      // Handle initialization errors (e.g. database connection errors)
      if (error instanceof PrismaClientInitializationError) {
        return res.status(400).json({
          message: 'Sorry, there was an error connecting to the database. Please try again later.',
        });
      }

      // Handle any other errors
      res.status(error.isExpected ? 400 : 500).send({
        ...error,
        message: error.message || 'Sorry, there was an unexpected error. Please try again later.',
      });
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
