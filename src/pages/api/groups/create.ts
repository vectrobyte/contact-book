import { Post } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { type GroupInput } from '@/server/models';
import { CreateGroupSchema } from '@/server/schemas/group.schema';
import { createGroup, findGroupById } from '@/server/services/group.service';
export default AuthMiddleware(
  Post(CreateGroupSchema, async (payload, { request }) => {
    const group = await createGroup(payload as GroupInput, request.user?.id);
    return findGroupById(group.id, request.user.id, true);
  })
);
