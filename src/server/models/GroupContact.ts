import { type GroupContact as GroupContactType } from '@prisma/client';

import { type Contact, type Group } from '@/server/models';

export type GroupContact = GroupContactType & {
  group: Group;
  contact: Contact;
};
