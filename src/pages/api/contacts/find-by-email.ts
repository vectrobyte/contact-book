import * as z from 'zod';

import { createHandler } from '@/server/server-utils';
import { findContactByEmail } from '@/server/services/contact.service';

const schema = z.object({
  email: z.string().email(),
});

export default createHandler(
  { method: 'GET', target: 'query', validator: schema },
  async ({ email }) => {
    return findContactByEmail(email);
  }
);
