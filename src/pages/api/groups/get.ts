import { IdSchema } from '@/lib/schemas/common.schema';
import { Get } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { findGroupById } from '@/server/services/group.service';

export default AuthMiddleware(
  Get(IdSchema, async ({ id }, { request }) => {
    return findGroupById(id, request.user?.id, true);
  })
);
