import { type Action } from '@/@types';

import { MODAL_STORE_ACTIONS } from './modals.actions';
import { type ModalStore } from './modals.state';

export const ModalStoreReducer = (
  state: ModalStore,
  { type, payload }: Action<MODAL_STORE_ACTIONS>
): ModalStore => {
  switch (type) {
    case MODAL_STORE_ACTIONS.toggleAddGroupModal: {
      return {
        ...state,
        isAddGroupModalOpen: payload,
      };
    }
    case MODAL_STORE_ACTIONS.toggleEditGroupModal: {
      return {
        ...state,
        isEditGroupModalOpen: payload,
      };
    }
    case MODAL_STORE_ACTIONS.toggleDeleteGroupModal: {
      return {
        ...state,
        isDeleteGroupModalOpen: payload,
      };
    }
    default:
      throw new Error('Invalid store action ');
  }
};
