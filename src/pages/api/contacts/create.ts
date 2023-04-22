import * as z from 'zod';

import { type ContactFormData } from '@/@types';
import { createHandler } from '@/server/server-utils';
import { createContact } from '@/server/services/contact.service';

const schema = z.object({
  full_name: z.string().min(1),
  phone: z.string().min(10).max(14),
  email: z.string().email().optional(),
});

export default createHandler('POST', 'body', schema, async (payload) => {
  return createContact(payload as ContactFormData);
});
