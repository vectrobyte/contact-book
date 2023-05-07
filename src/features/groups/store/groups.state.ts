import { type GroupWithCount } from '@/server/models';

export type GroupsState = {
  groups: GroupWithCount[];
};

export const initialState: GroupsState = {
  groups: [],
};
