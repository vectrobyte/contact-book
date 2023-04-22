import * as Yup from 'yup';

import { EmailSchema, IdSchema } from '@/server/schemas/common.schema';

export const ContactFormSchema = Yup.object()
  .shape({
    full_name: Yup.string().required('Full name is required'),
    phone: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number format')
      .required('Phone number is required'),
  })
  .concat(EmailSchema);

export const CreateContactSchema = ContactFormSchema;

export const UpdateContactSchema = ContactFormSchema.concat(IdSchema);
