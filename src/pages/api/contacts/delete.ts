import { IdSchema } from '@/lib/schemas/common.schema';
import { Delete } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { deleteContact } from '@/server/services/contact.service';

export default AuthMiddleware(
  Delete(IdSchema, async ({ id }, { request }) => {
    return deleteContact(id, request.user?.id);
  })
);
