import * as Yup from 'yup';

import { GroupFormSchema } from '@/lib/schemas/group.schema';
import { type Group } from '@/server/models';
import { findGroupByLabel } from '@/server/services/group.service';

export const CreateGroupSchema = GroupFormSchema.shape({
  user_id: Yup.string(),
  label: Yup.string()
    .required('Phone number is required')
    .test('unique-phone', 'Phone number already exists', async function (value) {
      const { user_id } = this.parent as Group;

      const group = await findGroupByLabel(value, user_id);
      return !group;
    }),
});

export const UpdateGroupSchema = GroupFormSchema.shape({
  label: Yup.string()
    .required('Phone number is required')
    .test('unique-phone', 'This phone number is already in use', async function (value) {
      const { id, user_id } = this.parent as Group;
      if (!value) return true;
      const group = await findGroupByLabel(value, user_id);
      return !group || group.id === id;
    }),
});
