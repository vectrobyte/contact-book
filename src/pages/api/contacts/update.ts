import { Patch } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { UpdateContactSchema } from '@/server/schemas/contact.schema';
import { updateContact } from '@/server/services/contact.service';

import { type Contact } from '.prisma/client';

export default AuthMiddleware(
  Patch(UpdateContactSchema, async (payload, { request }) => {
    return updateContact(payload as Contact, request.user.id);
  })
);
