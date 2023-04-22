import * as Yup from 'yup';



export const CreateContactSchema = Yup.object().shape({
  full_name: Yup.string().required('Full name is required'),
  email: Yup.string().email('Invalid email address'),
  phone: Yup.string()
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, 'Invalid phone number format')
    .required('Phone number is required'),
});

export const IdSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

export const EmailSchema = Yup.object().shape({
  email: Yup.string().required().email('Invalid email address'),
});
