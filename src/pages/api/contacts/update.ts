import { type Contact } from '@/@types';
import { UpdateContactSchema } from '@/server/schemas/contact.schema';
import { updateContact } from '@/server/services/contact.service';
import { Patch } from '@/server/handlers';

export default Patch(UpdateContactSchema, async (payload) => {
  return updateContact(payload as Contact);
});
