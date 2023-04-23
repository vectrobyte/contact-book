import * as Yup from 'yup';

import { ContactFormSchema } from '@/lib/schemas/contact.schema';
import { findContactByPhone } from '@/server/services/contact.service';

export const CreateContactSchema = ContactFormSchema.shape({
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number format')
    .required('Phone number is required')
    .test('unique-phone', 'Phone number already exists', async (value) => {
      const contact = await findContactByPhone(value);
      return !contact;
    }),
});

export const UpdateContactSchema = ContactFormSchema.shape({
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number format')
    .required('Phone number is required')
    .test('unique-phone', 'This phone number is already in use', async function (value) {
      const { id } = this.parent;
      if (!value) return true;
      const contact = await findContactByPhone(value);
      return !contact || contact.id === id;
    }),
});
