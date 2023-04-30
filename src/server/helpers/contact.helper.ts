import { type ContactWithGroups } from '@/server/models';

export function mapContact({ group_contacts, ...contact }: ContactWithGroups) {
  return {
    ...contact,
    groups: group_contacts.map(({ group }) => group),
  };
}
