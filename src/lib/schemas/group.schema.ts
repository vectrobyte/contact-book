import * as Yup from 'yup';

export const GroupFormSchema = Yup.object().shape({
  label: Yup.string().required('Label is required'),
});
