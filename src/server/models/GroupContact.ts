import { type GroupContact as GroupContactType } from '@prisma/client';

import { type Contact, type Group } from '@/server/models';

export type GroupContact = GroupContactType;

export type GroupContactInput = Omit<GroupContact, 'id' | 'user_id'>;

export type GroupContactHydrated<G = Group, C = Contact> = GroupContactType & {
  group: G;
  contact: C;
};
