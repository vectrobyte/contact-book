import { type IncomingHttpHeaders } from 'http';
import { type NextApiRequest, type NextApiResponse } from 'next';
import { type ParsedUrlQuery } from 'querystring';
import { type ZodError } from 'zod';

import AppError from '@/lib/errors/AppError';

export type ServerRequestContext = {
  headers: IncomingHttpHeaders;
  query: ParsedUrlQuery;
  params: Record<string, string | undefined>;
};

export type Validator<T> = {
  safeParse(data: unknown): { success: true; data: T } | { success: false; error: ZodError };
};

export const createHandler = <P, R>(
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE',
  target: 'query' | 'body',
  validator: Validator<P> = null,
  impl: (params: P, context: ServerRequestContext) => Promise<R>
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

      let data = req[target || 'query'];

      if (validator) {
        const parsed = validator.safeParse(data);

        if (parsed.success === false) {
          res.status(422).send(formatValidationError(parsed.error, req, data));
          return;
        }
        data = parsed.data;
      }

      const context: ServerRequestContext = {
        headers: req.headers,
        params: {},
        query: req.query,
      };

      const response = await impl(data, context);
      res.send(response);
    } catch (e) {
      res
        .status(e.isExpected ? 400 : 500)
        .send({ ...e, message: e.message || 'Unhandled Server Error' });
    }
  };
};

function formatValidationError(error: ZodError, payload) {
  return {
    error,
    payload,
  };
}
