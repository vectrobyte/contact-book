import { EmailSchema } from '@/server/schemas/contact.schema';
import { findContactByEmail } from '@/server/services/contact.service';
import { Get } from '@/server/utils';

export default Get(EmailSchema, async ({ email }) => {
  return findContactByEmail(email);
});
