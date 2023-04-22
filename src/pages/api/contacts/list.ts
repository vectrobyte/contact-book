import * as z from 'zod';

import { createHandler } from '@/server/server-utils';
import { listContacts } from '@/server/services/contact.service';

const schema = z.object({
  page: z.number().optional(),
  size: z.number().optional(),
  keyword: z.string().optional(),
});

export default createHandler('GET', 'query', schema, async (params) => {
  return listContacts(params);
});
