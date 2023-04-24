import { IdSchema } from '@/lib/schemas/common.schema';
import { deleteContact } from '@/server/services/contact.service';
import { Delete } from '@/server/handlers/route.handler';

export default Delete(IdSchema, async ({ id }) => {
  return deleteContact(id);
});
