import { EmailSchema } from '@/lib/schemas/common.schema';
import { findContactByEmail } from '@/server/services/contact.service';
import { Get } from '@/server/handlers';

export default Get(EmailSchema, async ({ email }) => {
  return findContactByEmail(email);
});
