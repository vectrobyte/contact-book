import {
  type Contact,
  type ContactFormData,
  type PageParams,
  type PaginatedResult,
} from '@/@types';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';
import { prisma } from '@/server/db';

export async function listContacts(params: PageParams): Promise<PaginatedResult<Contact>> {
  const { page = 1, size = DEFAULT_PAGE_SIZE, keyword } = params;

  const skip = (page - 1) * size;

  const where = keyword
    ? { OR: [{ full_name: { contains: keyword } }, { email: { contains: keyword } }] }
    : {};

  const count = await prisma.contact.count({ where });

  const contacts = await prisma.contact.findMany({
    where,
    skip,
    take: size,
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

export function findContactById(id: string) {
  return prisma.contact.findUnique({
    where: { id },
  });
}

export function findContactByEmail(email: string) {
  return prisma.contact.findFirst({ where: { email } });
}

export function findContactByPhone(phone: string) {
  return prisma.contact.findUnique({ where: { phone } });
}

export function createContact(data: ContactFormData) {
  return prisma.contact.create({
    data: {
      ...data,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

export function updateContact({ id, ...data }: Contact) {
  return prisma.contact.update({
    where: { id },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
}

export function deleteContact(id: string) {
  return prisma.contact.delete({
    where: { id },
  });
}
