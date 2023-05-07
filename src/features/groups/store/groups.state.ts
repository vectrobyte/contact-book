import { type Group } from '@/server/models';

export type GroupsState = {
  groups: Group[];
};

export const state: GroupsState = {
  groups: [],
};
