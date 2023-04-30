import { type GroupContact as GroupContactType } from '@prisma/client';

import { type Contact, type Group } from '@/server/models';

export type GroupContact<G = Group, C = Contact> = GroupContactType & {
  group: G;
  contact: C;
};
