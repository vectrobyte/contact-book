import { getSession } from 'next-auth/react';

import { type ServerRequest, type ServerResponse } from '@/server/types';

export const AuthMiddleware = (handler) => async (req: ServerRequest, res: ServerResponse) => {
  const session = await getSession({ req });

  if (!session || !session.user) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  req.session = session;
  req.user = session.user;

  return handler(req, res);
};
