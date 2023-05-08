import { Post } from '@/server/handlers/route.handler';
import { AuthMiddleware } from '@/server/middleware/auth.middleware';
import { type ContactInput, type GroupContactInput } from '@/server/models';
import { CreateContactSchema } from '@/server/schemas/contact.schema';
import { createContact, findContactById } from '@/server/services/contact.service';
import { createManyGroupContacts } from '@/server/services/groupContact.service';
export default AuthMiddleware(
  Post(CreateContactSchema, async ({ group_ids, ...payload }: ContactInput, { request }) => {
    const userId = request.user?.id;

    const contact = await createContact(payload as ContactInput, userId);

    if (group_ids && group_ids.length) {
      const groupContacts: GroupContactInput[] = group_ids.map((group_id) => ({
        group_id,
        contact_id: contact.id,
      }));

      await createManyGroupContacts(groupContacts, userId);
    }

    return findContactById(contact.id, userId, true);
  })
);
