import { type PageParams } from '@/@types';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';
import ServerError from '@/lib/errors/ServerError';
import { prisma } from '@/server/db';
import { mapGroup } from '@/server/helpers/group.helper';
import { type Group, type GroupInput, type GroupWithCount } from '@/server/models';

export async function listGroups(params: PageParams, user_id: string): Promise<GroupWithCount[]> {
  const { page = 1, size = DEFAULT_PAGE_SIZE, keyword } = params;

  const skip = (page - 1) * size;

  return prisma.group.findMany({
    where: {
      user_id,
      ...(params.keyword ? { OR: [{ label: { contains: keyword } }] } : {}),
    },
    skip,
    take: size,
    orderBy: [{ created_at: 'desc' }],
    include: {
      _count: {
        select: {
          group_contacts: true,
        },
      },
    },
  });
}

export async function findGroupById(
  id: string,
  user_id: string,
  withCount = false
): Promise<Group> {
  const group = await prisma.group.findFirst({
    where: { id, user_id },
    include: {
      group_contacts: {
        include: {
          contact: {
            include: {
              group_contacts: {
                include: {
                  group: true,
                },
              },
            },
          },
        },
      },
      ...(withCount
        ? {
            _count: {
              select: {
                group_contacts: true,
              },
            },
          }
        : {}),
    },
  });

  if (!group || !group.id) {
    throw new ServerError('Group not found!', 404);
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return mapGroup(group);
}

export function findGroupByLabel(label: string, user_id: string): Promise<Group> {
  return prisma.group.findUnique({
    where: { user_id_label: { label, user_id } },
  });
}

export async function createGroup(data: GroupInput, user_id: string) {
  return prisma.group.create({
    data: {
      user_id,
      label: data.label,
    },
  });
}

export async function updateGroup({ id, ...data }: Group, user_id: string) {
  const { label } = await findGroupById(id, user_id);

  return prisma.group.update({
    where: { user_id_label: { user_id, label } },
    data: {
      label: data.label,
    },
  });
}

export async function deleteGroup(id: string, user_id: string) {
  const { label } = await findGroupById(id, user_id);

  return prisma.group.delete({
    where: { user_id_label: { user_id, label } },
  });
}
