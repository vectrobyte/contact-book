import * as z from 'zod';

import { createHandler } from '@/server/server-utils';
import { deleteContact } from '@/server/services/contact.service';

const schema = z.object({
  id: z.string(),
});

export default createHandler('DELETE', 'query', schema, async ({ id }) => {
  return deleteContact(id);
});
