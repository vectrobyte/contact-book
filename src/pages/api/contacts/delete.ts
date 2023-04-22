import { Delete } from '@/server/server-utils';
import { IdSchema } from '@/server/schemas/contact.schema';
import { deleteContact } from '@/server/services/contact/contact.service';

export default Delete(IdSchema, async ({ id }) => {
  return deleteContact(id);
});
