import { type ContactFormData } from '@/@types';
import { Post } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { CreateContactSchema } from '@/server/schemas/contact.schema';
import { createContact } from '@/server/services/contact.service';
export default AuthMiddleware(
  Post(CreateContactSchema, async (payload, { request }) => {
    return createContact(payload as ContactFormData, request.user.id);
  })
);
