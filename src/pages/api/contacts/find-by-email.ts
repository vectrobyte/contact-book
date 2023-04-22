import { EmailSchema } from '@/server/schemas/contact.schema';
import { Get } from '@/server/server-utils';
import { findContactByEmail } from '@/server/services/contact.service';

export default Get(EmailSchema, async ({ email }) => {
  return findContactByEmail(email);
});
