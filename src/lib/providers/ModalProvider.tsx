import { createContext, type Dispatch, type Reducer, useContext, useReducer } from 'react';

import { type Action } from '@/@types';

import {
  DEFAULT_MODAL_STORE,
  type MODAL_STORE_ACTIONS,
  type ModalStore,
  ModalStoreReducer,
} from '../context/modals';

export type ModalStoreContextType = [ModalStore, Dispatch<Action<MODAL_STORE_ACTIONS>>];
export const ModalStoreContext = createContext<ModalStoreContextType | null>(null);
ModalStoreContext.displayName = 'ModalStoreContext';

type ModalStoreReducer = Reducer<ModalStore, Action<MODAL_STORE_ACTIONS>>;

export const ModalStoreProvider: React.FC<React.HTMLAttributes<HTMLElement>> = (props) => {
  const [state, dispatch] = useReducer<ModalStoreReducer>(ModalStoreReducer, DEFAULT_MODAL_STORE);
  return <ModalStoreContext.Provider value={[state, dispatch]} {...props} />;
};

export const useModals = () => useContext(ModalStoreContext);
