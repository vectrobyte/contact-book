import { type NextApiHandler, type NextApiRequest, type NextApiResponse } from 'next';

import { getServerAuthSession, type ServerAuthSessionContext } from '@/server/auth';

export const AuthMiddleware =
  (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getServerAuthSession({ req, res } as ServerAuthSessionContext);

    if (!session || !session.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    req.session = session;
    req.user = session.user;

    return handler(req, res);
  };
