import * as z from 'zod';

import { type ContactFormData } from '@/@types';
import { updateContact } from '@/server/services/contact.service';
import { createHandler } from '@/server/utils';

const schema = z.object({
  id: z.string(),
  full_name: z.string().min(1),
  phone: z.string().min(10).max(14),
  email: z.string().email().optional(),
});

export default createHandler(
  { method: 'PATCH', target: 'body', validator: schema },
  async ({ id, ...contact }) => {
    return updateContact(id, contact as ContactFormData);
  }
);
