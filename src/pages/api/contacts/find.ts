import { IdSchema } from '@/server/schemas/contact.schema';
import { Get } from '@/server/server-utils';
import { findContactById } from '@/server/services/contact.service';

export default Get(IdSchema, async ({ id }) => {
  return findContactById(id);
});
