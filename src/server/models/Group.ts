import { type Group as GroupType } from '.prisma/client';

export type Group = GroupType;

export type GroupInput = Omit<Group, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
