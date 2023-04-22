import { IdSchema } from '@/lib/schemas/common.schema';
import { deleteContact } from '@/server/services/contact.service';
import { Delete } from '@/server/utils';

export default Delete(IdSchema, async ({ id }) => {
  return deleteContact(id);
});
