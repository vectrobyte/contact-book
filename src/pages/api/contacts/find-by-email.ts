import { EmailSchema } from '@/lib/schemas/common.schema';
import { Get } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { findContactByEmail } from '@/server/services/contact.service';

export default AuthMiddleware(
  Get(EmailSchema, async ({ email }) => {
    return findContactByEmail(email);
  })
);
