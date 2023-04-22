import { IdSchema } from '@/server/schemas/contact.schema';
import { findContactById } from '@/server/services/contact.service';
import { Get } from '@/server/utils';

export default Get(IdSchema, async ({ id }) => {
  return findContactById(id);
});
