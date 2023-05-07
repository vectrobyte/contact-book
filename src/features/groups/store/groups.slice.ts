import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { state } from '@/features/groups/store';
import { type RootState } from '@/lib/providers/StoreProvider';
import { type Group } from '@/server/models';

const GroupsSlice = createSlice({
  name: 'groups',
  initialState: state,
  reducers: {
    setList(state, action: PayloadAction<Group[]>) {
      state.groups = action.payload;
    },
    add(state, action: PayloadAction<Group>) {
      state.groups.push(action.payload);
    },
    update(state, action: PayloadAction<Group>) {
      const index = state.groups.findIndex((contact) => contact.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = {
          ...state.groups[index],
          ...action.payload,
        };
      }
    },
    delete(state, action: PayloadAction<Group>) {
      state.groups = state.groups.filter((contact) => contact.id !== action.payload.id);
    },
  },
});

export const GroupActions = GroupsSlice.actions;
export const GroupsSelector = (state: RootState) => state.groups.groups;

export default GroupsSlice.reducer;
