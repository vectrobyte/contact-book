import { Get } from '@/server/server-utils';
import { EmailSchema } from '@/server/schemas/contact.schema';
import { findContactByEmail } from '@/server/services/contact/contact.service';

export default Get(EmailSchema, async ({ email }) => {
  return findContactByEmail(email);
});
