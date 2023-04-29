import { IdSchema } from '@/lib/schemas/common.schema';
import { Get } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { findContactById } from '@/server/services/contact.service';

export default AuthMiddleware(
  Get(IdSchema, async ({ id }, { request }) => {
    return findContactById(id, request.user?.id);
  })
);
