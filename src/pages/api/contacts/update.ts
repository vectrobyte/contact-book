import { type Contact } from '@/@types';
import { UpdateContactApiSchema } from '@/server/schemas/contact.schema';
import { updateContact } from '@/server/services/contact.service';
import { Patch } from '@/server/utils';

export default Patch(UpdateContactApiSchema, async (payload) => {
  return updateContact(payload as Contact);
});
