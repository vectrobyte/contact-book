import { type PageParams, type PaginatedResult } from '@/@types';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';
import ServerError from '@/lib/errors/ServerError';
import { prisma } from '@/server/db';
import { mapContact } from '@/server/helpers/contact.helper';
import { type Contact, type ContactInput, type ContactWithGroups } from '@/server/models';

export async function listContacts(
  params: PageParams,
  user_id: string,
  group_id: string
): Promise<PaginatedResult<Contact>> {
  const { page = 1, size = DEFAULT_PAGE_SIZE, keyword } = params;

  const skip = (page - 1) * size;

  let where: Record<string, any> = { user_id };

  if (keyword) {
    where = {
      ...where,
      user_id,
      OR: [{ full_name: { contains: keyword } }, { email: { contains: keyword } }],
    };
  }

  if (group_id?.length) {
    where = {
      ...where,
      group_contacts: {
        some: {
          user_id,
          group_id,
        },
      },
    };
  }

  const count = await prisma.contact.count({ where });

  const contacts = await prisma.contact.findMany({
    where,
    skip,
    take: size,
    include: {
      group_contacts: {
        include: {
          group: true,
        },
      },
    },
    orderBy: [{ created_at: 'desc' }],
  });

  const totalPages = Math.ceil(count / size);
  const currentPageSize = contacts.length;

  return {
    data: contacts.map(mapContact),
    meta: {
      total: count,
      total_page: totalPages,
      current_page: Number(page),
      per_page: size,
      current_page_size: currentPageSize,
    },
  };
}

export async function findContactById(
  id: string,
  user_id: string,
  withGroups = false
): Promise<Contact> {
  const contact = await prisma.contact.findFirst({
    where: { id, user_id },
    ...(withGroups
      ? {
          include: {
            group_contacts: {
              include: {
                group: true,
              },
            },
          },
        }
      : {}),
  });

  if (!contact || !contact.id) {
    throw new ServerError('Contact not found!', 404);
  }

  return mapContact(contact as ContactWithGroups);
}

export function findContactByPhone(phone: string, user_id: string) {
  return prisma.contact.findUnique({ where: { user_id_phone: { phone, user_id } } });
}

export async function createContact(payload: ContactInput, user_id: string) {
  return prisma.contact.create({
    data: {
      user_id,
      full_name: payload.full_name,
      phone: payload.phone,
      email: payload.email,
      notes: payload.notes,
    },
  });
}

export async function updateContact(payload: Contact, user_id: string) {
  const { phone } = await findContactById(payload.id, user_id);

  return prisma.contact.update({
    where: { user_id_phone: { user_id, phone } },
    data: {
      full_name: payload.full_name,
      phone: payload.phone,
      email: payload.email,
      notes: payload.notes,
    },
  });
}

export async function deleteContact(id: string, user_id: string) {
  const { phone } = await findContactById(id, user_id);

  return prisma.contact.delete({
    where: { user_id_phone: { user_id, phone } },
  });
}
