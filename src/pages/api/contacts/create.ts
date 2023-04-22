import { type ContactFormData } from '@/@types';
import { CreateContactApiSchema } from '@/server/schemas/contact.schema';
import { createContact } from '@/server/services/contact.service';
import { Post } from '@/server/utils';
export default Post(CreateContactApiSchema, async (payload) => {
  return createContact(payload as ContactFormData);
});
