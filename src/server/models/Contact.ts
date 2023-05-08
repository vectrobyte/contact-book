import { type Group, type GroupContactHydrated } from '@/server/models';

import { type Contact as ContactType } from '.prisma/client';

export type Contact = ContactType;

export type ContactWithGroups<C = Contact, G = Group> = C & {
  groups: G[];
  group_contacts: Partial<GroupContactHydrated<C, G>>[];
};

export type ContactInput = Omit<
  Contact,
  'id' | 'user_id' | 'created_at' | 'updated_at' | 'group_contacts' | 'groups'
> & {
  group_ids: string[];
};
