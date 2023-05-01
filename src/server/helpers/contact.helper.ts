import { type ContactWithGroups, type Group } from '@/server/models';

export function mapContact<G = Group>({ group_contacts, ...contact }: ContactWithGroups<G>) {
  return {
    ...contact,
    groups: group_contacts.map(({ group }) => group),
  };
}
