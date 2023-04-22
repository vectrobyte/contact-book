import * as Yup from 'yup';

export const ListParamsSchema = Yup.object().shape({
  page: Yup.number().optional(),
  size: Yup.number().optional(),
  keyword: Yup.string().optional(),
});
