import * as Yup from 'yup';

export const IdSchema = Yup.object().shape({
  id: Yup.string().required('ID is required'),
});

export const EmailSchema = Yup.object().shape({
  email: Yup.string().required().email('Invalid email address'),
});

export const ListParamsSchema = Yup.object().shape({
  page: Yup.number().optional(),
  size: Yup.number().optional(),
  keyword: Yup.string().optional(),
  group_id: Yup.string().optional(),
});
