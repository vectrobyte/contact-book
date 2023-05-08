import { prisma } from '@/server/db';
import { type GroupContactInput } from '@/server/models';

export async function createManyGroupContacts(dataArr: GroupContactInput[], user_id: string) {
  return prisma.groupContact.createMany({
    data: dataArr.map((data) => ({
      user_id,
      group_id: data.group_id,
      contact_id: data.contact_id,
    })),
  });
}

export async function dropManyGroupContacts(contact_id: string, user_id: string) {
  return prisma.groupContact.deleteMany({
    where: {
      user_id,
      contact_id,
    },
  });
}
