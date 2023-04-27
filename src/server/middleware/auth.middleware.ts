import { type NextApiHandler } from 'next';
import { getToken } from 'next-auth/jwt';

import { type ServerRequest, type ServerResponse } from '@/server/types';

export const AuthMiddleware =
  (handler: NextApiHandler) => async (req: ServerRequest, res: ServerResponse) => {
    const token = await getToken({ req });

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.user = token;

    return handler(req, res);
  };
