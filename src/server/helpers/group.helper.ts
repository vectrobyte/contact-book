import { mapContact } from '@/server/helpers/contact.helper';
import { type ContactWithGroups } from '@/server/models';

export function mapGroup({ group_contacts, ...group }) {
  return {
    ...group,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
    contacts: group_contacts.map(({ contact }) => mapContact(contact as ContactWithGroups)),
  };
}
