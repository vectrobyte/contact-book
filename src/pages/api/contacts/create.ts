import { type ContactFormData } from '@/@types';
import { CreateContactSchema } from '@/server/schemas/contact.schema';
import { createContact } from '@/server/services/contact.service';
import { Post } from '@/server/utils';
export default Post(CreateContactSchema, async (payload) => {
  return createContact(payload as ContactFormData);
});
