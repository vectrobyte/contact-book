import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { type RootState } from '@/lib/providers/StoreProvider';
import { type Group, type GroupWithCount } from '@/server/models';

export type GroupsState = {
  groups: GroupWithCount[];
};

const initialState: GroupsState = {
  groups: [],
};

const GroupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setList(state, action: PayloadAction<GroupWithCount[]>) {
      state.groups = action.payload;
    },
    add(state, action: PayloadAction<GroupWithCount>) {
      state.groups.push(action.payload);
    },
    update(state, action: PayloadAction<Group>) {
      const index = state.groups.findIndex((group) => group.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = {
          ...state.groups[index],
          ...action.payload,
        };
      }
    },
    delete(state, action: PayloadAction<Group>) {
      state.groups = state.groups.filter((group) => group.id !== action.payload.id);
    },
  },
});

export default GroupsSlice.reducer;

export const GroupActions = GroupsSlice.actions;
export const GroupsSelector = (state: RootState) => state.groups;
