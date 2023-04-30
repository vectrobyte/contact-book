import { ListParamsSchema } from '@/lib/schemas/common.schema';
import { Get } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { listGroups } from '@/server/services/group.service';

export default AuthMiddleware(
  Get(ListParamsSchema, async (params, { request }) => {
    return listGroups(params, request.user?.id);
  })
);
