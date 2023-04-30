import { type PageParams, type PaginatedResult } from '@/@types';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';
import ServerError from '@/lib/errors/ServerError';
import { prisma } from '@/server/db';
import { type Contact, type ContactInput } from '@/server/models';

export async function listContacts(
  params: PageParams,
  user_id: string
): Promise<PaginatedResult<Contact>> {
  const { page = 1, size = DEFAULT_PAGE_SIZE, keyword } = params;

  const skip = (page - 1) * size;

  const where = keyword
    ? { user_id, OR: [{ full_name: { contains: keyword } }, { email: { contains: keyword } }] }
    : { user_id };

  const count = await prisma.contact.count({ where });

  const contacts = await prisma.contact.findMany({
    where,
    skip,
    take: size,
    include: {
      groups: true,
    },
    orderBy: [{ created_at: 'desc' }],
  });

  const totalPages = Math.ceil(count / size);
  const currentPageSize = contacts.length;

  return {
    data: contacts,
    meta: {
      total: count,
      total_page: totalPages,
      current_page: Number(page),
      per_page: size,
      current_page_size: currentPageSize,
    },
  };
}

export async function findContactById(id: string, user_id: string): Promise<Contact> {
  const contact = await prisma.contact.findFirst({
    where: { id, user_id },
  });

  if (!contact || !contact.id) {
    throw new ServerError('Contact not found!', 404);
  }

  return contact;
}

export function findContactByPhone(phone: string, user_id: string) {
  return prisma.contact.findUnique({ where: { user_id_phone: { phone, user_id } } });
}

export async function createContact(data: ContactInput, user_id: string) {
  return prisma.contact.create({
    data: {
      ...data,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

export async function updateContact({ id, ...data }: Contact, user_id: string) {
  const { phone } = await findContactById(id, user_id);

  return prisma.contact.update({
    where: { user_id_phone: { user_id, phone } },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
}

export async function deleteContact(id: string, user_id: string) {
  const { phone } = await findContactById(id, user_id);

  return prisma.contact.delete({
    where: { user_id_phone: { user_id, phone } },
  });
}
