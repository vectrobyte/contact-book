import { Get } from '@/server/server-utils';
import { IdSchema } from '@/server/schemas/contact.schema';
import { findContactById } from '@/server/services/contact/contact.service';

export default Get(IdSchema, async ({ id }) => {
  return findContactById(id);
});
