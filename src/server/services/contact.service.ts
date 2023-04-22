import {
  type Contact,
  type ContactFormData,
  type PageParams,
  type PaginatedResult,
} from '@/@types';
import { prisma } from '@/server/db';

export async function listContacts(params: PageParams): Promise<PaginatedResult<Contact>> {
  const { page = 1, size = 10, keyword } = params;

  const skip = (page - 1) * size;

  const where = keyword
    ? { OR: [{ full_name: { contains: keyword } }, { email: { contains: keyword } }] }
    : {};

  const count = await prisma.contact.count({ where });

  const contacts = await prisma.contact.findMany({
    where,
    skip,
    take: size,
    orderBy: [{ full_name: 'asc' }],
  });

  const totalPages = Math.ceil(count / size);
  const currentPageSize = contacts.length;

  return {
    data: contacts,
    meta: {
      total: count,
      total_page: totalPages,
      current_page: page,
      per_page: size,
      current_page_size: currentPageSize,
    },
  };
}

export function createContact(data: ContactFormData) {
  return prisma.contact.create({
    data,
  });
}

export function findContactById(id: string) {
  return prisma.contact.findUnique({
    where: { id },
  });
}
export function findContactByEmail(email: string) {
  return prisma.contact.findFirst({ where: { email } });
}

export function updateContact(id: string, data: ContactFormData) {
  return prisma.contact.update({
    where: { id },
    data,
  });
}

export function deleteContact(id: string) {
  return prisma.contact.delete({
    where: { id },
  });
}
