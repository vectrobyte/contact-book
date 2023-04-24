import { IdSchema } from '@/lib/schemas/common.schema';
import { Delete } from '@/server/handlers/route.handler';
import { deleteContact } from '@/server/services/contact.service';

export default Delete(IdSchema, async ({ id }) => {
  return deleteContact(id);
});
