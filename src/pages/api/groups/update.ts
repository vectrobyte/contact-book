import { Patch } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { type Group } from '@/server/models';
import { UpdateGroupSchema } from '@/server/schemas/group.schema';
import { findGroupById, updateGroup } from '@/server/services/group.service';

export default AuthMiddleware(
  Patch(UpdateGroupSchema, async (payload, { request }) => {
    const group = await updateGroup(payload as Group, request.user?.id);
    return findGroupById(group.id, request.user.id, true);
  })
);
