import * as Yup from 'yup';

import { type Contact, type ContactFormData } from '@/@types';
import { ContactFormSchema } from '@/lib/schemas/contact.schema';
import { findContactByPhone } from '@/server/services/contact.service';

export const CreateContactSchema = ContactFormSchema.shape({
  user_id: Yup.string(),
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number format')
    .required('Phone number is required')
    .test('unique-phone', 'Phone number already exists', async function (value) {
      const { user_id } = this.parent as ContactFormData;

      const contact = await findContactByPhone(value, user_id);
      return !contact;
    }),
});

export const UpdateContactSchema = ContactFormSchema.shape({
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number format')
    .required('Phone number is required')
    .test('unique-phone', 'This phone number is already in use', async function (value) {
      const { id, user_id } = this.parent as Contact;
      if (!value) return true;
      const contact = await findContactByPhone(value, user_id);
      return !contact || contact.id === id;
    }),
});
