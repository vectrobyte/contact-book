import { ListParamsSchema } from '@/lib/schemas/common.schema';
import { Get } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { listContacts } from '@/server/services/contact.service';

export default AuthMiddleware(
  Get(ListParamsSchema, async (params) => {
    return listContacts(params);
  })
);
