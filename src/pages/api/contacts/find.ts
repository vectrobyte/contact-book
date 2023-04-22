import * as z from 'zod';

import { createHandler } from '@/server/server-utils';
import { findContactById } from '@/server/services/contact.service';

const schema = z.object({
  id: z.string(),
});

export default createHandler(
  { method: 'GET', target: 'query', validator: schema },
  async ({ id }) => {
    return findContactById(id);
  }
);
