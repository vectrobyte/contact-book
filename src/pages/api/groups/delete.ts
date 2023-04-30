import { IdSchema } from '@/lib/schemas/common.schema';
import { Delete } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { deleteGroup } from '@/server/services/group.service';

export default AuthMiddleware(
  Delete(IdSchema, async ({ id }, { request }) => {
    return deleteGroup(id, request.user?.id);
  })
);
