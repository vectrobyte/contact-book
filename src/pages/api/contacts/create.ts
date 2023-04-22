import { type ContactFormData } from '@/@types';
import { Post } from '@/server/server-utils';
import { CreateContactSchema } from '@/server/schemas/contact.schema';
import { createContact } from '@/server/services/contact/contact.service';
export default Post(CreateContactSchema, async (payload) => {
  return createContact(payload as ContactFormData);
});
