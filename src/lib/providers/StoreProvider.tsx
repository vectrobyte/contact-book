import { configureStore } from '@reduxjs/toolkit';
import React from 'react';
import {
  Provider,
  type TypedUseSelectorHook,
  useDispatch,
  useSelector,
  useStore as useReduxStore,
} from 'react-redux';

import GroupsSlice from '@/features/groups/store/groups.slice';

const store = configureStore({
  reducer: {
    groups: GroupsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const useAppStore = () => useReduxStore<RootState, RootDispatch>();
export const useAppDispatch = (): RootDispatch => useDispatch<RootDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type StoreProviderProps = React.HTMLAttributes<HTMLElement>;

const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};

export default StoreProvider;
