import { Patch } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { type Contact, type ContactInput, type GroupContactInput } from '@/server/models';
import { UpdateContactSchema } from '@/server/schemas/contact.schema';
import { findContactById, updateContact } from '@/server/services/contact.service';
import {
  createManyGroupContacts,
  dropManyGroupContacts,
} from '@/server/services/groupContact.service';

export default AuthMiddleware(
  Patch(
    UpdateContactSchema,
    async ({ group_ids, ...payload }: Contact & ContactInput, { request }) => {
      const userId = request.user?.id;

      const contact = await updateContact(payload, userId);

      if (group_ids && group_ids.length) {
        const groupContacts: GroupContactInput[] = group_ids.map((group_id) => ({
          group_id,
          contact_id: contact.id,
        }));

        await dropManyGroupContacts(contact.id, userId);
        await createManyGroupContacts(groupContacts, userId);
      }

      return findContactById(contact.id, userId, true);
    }
  )
);
