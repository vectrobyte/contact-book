import { type ContactFormData } from '@/@types';
import { CreateContactSchema } from '@/server/schemas/contact.schema';
import { Post } from '@/server/server-utils';
import { createContact } from '@/server/services/contact.service';
export default Post(CreateContactSchema, async (payload) => {
  return createContact(payload as ContactFormData);
});
