import * as Yup from 'yup';

import { IdSchema } from '@/lib/schemas/common.schema';

export const ContactFormSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address').optional(),
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number format')
    .required('Phone number is required'),
});


