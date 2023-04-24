import { IdSchema } from '@/lib/schemas/common.schema';
import { findContactById } from '@/server/services/contact.service';
import { Get } from '@/server/handlers/route.handler';

export default Get(IdSchema, async ({ id }) => {
  return findContactById(id);
});
