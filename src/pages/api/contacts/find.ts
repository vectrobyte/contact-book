import { IdSchema } from '@/lib/schemas/common.schema';
import { findContactById } from '@/server/services/contact.service';
import { Get } from '@/server/handlers';

export default Get(IdSchema, async ({ id }) => {
  return findContactById(id);
});
