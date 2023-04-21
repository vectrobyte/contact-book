import {
  type Contact,
  type ContactFormData,
  type PageParams,
  type PaginatedResult,
} from '@/@types';
import { prisma } from '@/server/db';

async function listContacts(params: PageParams): Promise<PaginatedResult<Contact>> {
  const { page = 1, size = 10 } = params;

  const totalCount = await prisma.contact.count();

  const contacts = await prisma.contact.findMany({
    skip: (page - 1) * size,
    take: size,
  });

  const totalPages = Math.ceil(totalCount / size);
  const currentPageSize = contacts.length;

  return {
    data: contacts,
    meta: {
      total: totalCount,
      total_page: totalPages,
      current_page: page,
      per_page: size,
      current_page_size: currentPageSize,
    },
  };
}

async function createContact(data: ContactFormData) {
  const contact = await prisma.contact.create({
    data,
  });

  return contact;
}

async function getContact(id: string) {
  const contact = await prisma.contact.findUnique({
    where: { id },
  });

  return contact;
}

async function updateContact(
  id: string,
  data: {
    full_name?: string;
    email?: string;
    phone?: string;
  }
) {
  const contact = await prisma.contact.update({
    where: { id },
    data,
  });

  return contact;
}

async function deleteContact(id: string) {
  const contact = await prisma.contact.delete({
    where: { id },
  });

  return contact;
}
