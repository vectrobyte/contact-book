import { Patch } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { type Group } from '@/server/models';
import { UpdateGroupSchema } from '@/server/schemas/group.schema';
import { updateGroup } from '@/server/services/group.service';

export default AuthMiddleware(
  Patch(UpdateGroupSchema, async (payload, { request }) => {
    return updateGroup(payload as Group, request.user?.id);
  })
);
