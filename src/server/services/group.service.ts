import { type PageParams, type PaginatedResult } from '@/@types';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';
import ServerError from '@/lib/errors/ServerError';
import { prisma } from '@/server/db';
import { type Group, type GroupInput } from '@/server/models';

export async function listGroups(
  params: PageParams,
  user_id: string
): Promise<PaginatedResult<Group>> {
  const { page = 1, size = DEFAULT_PAGE_SIZE, keyword } = params;

  const skip = (page - 1) * size;

  const where: Record<string, any> = {
    user_id,
  };

  if (keyword) {
    where.OR = [{ label: { contains: keyword } }];
  }

  const count = await prisma.group.count({ where });

  const groups = await prisma.group.findMany({
    where,
    skip,
    take: size,
    orderBy: [{ created_at: 'desc' }],
    include: {
      _count: {
        select: {
          contacts: true,
        },
      },
    },
  });

  const totalPages = Math.ceil(count / size);
  const currentPageSize = groups.length;

  return {
    data: groups,
    meta: {
      total: count,
      total_page: totalPages,
      current_page: Number(page),
      per_page: size,
      current_page_size: currentPageSize,
    },
  };
}

export async function findGroupById(id: string, user_id: string): Promise<Group> {
  const group = await prisma.group.findFirst({
    where: { id, user_id },
    include: {
      contacts: true,
    },
  });

  if (!group || !group.id) {
    throw new ServerError('Group not found!', 404);
  }

  return group;
}

export function findGroupByLabel(label: string, user_id: string): Promise<Group> {
  return prisma.group.findUnique({
    where: { user_id_label: { label, user_id } },
  });
}

export async function createGroup(data: GroupInput, user_id: string) {
  return prisma.group.create({
    data: {
      ...data,
      user_id,
      created_at: new Date(),
      updated_at: new Date(),
    },
  });
}

export async function updateGroup({ id, ...data }: Group, user_id: string) {
  const { label } = await findGroupById(id, user_id);

  return prisma.group.update({
    where: { user_id_label: { user_id, label } },
    data: {
      ...data,
      updated_at: new Date(),
    },
  });
}

export async function deleteGroup(id: string, user_id: string) {
  const { label } = await findGroupById(id, user_id);

  return prisma.group.delete({
    where: { user_id_label: { user_id, label } },
  });
}
