import { type Contact } from '@/server/models/Contact';
import { type GroupContactHydrated } from '@/server/models/GroupContact';

import { type Group as GroupType } from '.prisma/client';

export type Group = GroupType;

export type GroupWithCount = Group & {
  _count: {
    group_contacts: number;
  };
};

export type GroupWithContacts<G = Group, C = Contact> = G & {
  contacts: C[];
  group_contacts: Partial<GroupContactHydrated<C, G>>[];
};

export type GroupInput = Omit<Group, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
