import { type Action } from '@/@types';

import { MODAL_STORE_ACTIONS } from './modals.actions';
import { type ModalStore } from './modals.state';

export const ModalStoreReducer = (
  state: ModalStore,
  { type, payload }: Action<MODAL_STORE_ACTIONS>
): ModalStore => {
  switch (type) {
    case MODAL_STORE_ACTIONS.setTargetContact: {
      return {
        ...state,
        targetContact: payload,
      };
    }
    case MODAL_STORE_ACTIONS.toggleAddContactModal: {
      return {
        ...state,
        isAddContactModalOpen: payload,
      };
    }
    case MODAL_STORE_ACTIONS.toggleEditContactModal: {
      return {
        ...state,
        isEditContactModalOpen: payload,
      };
    }
    case MODAL_STORE_ACTIONS.toggleDeleteContactModal: {
      return {
        ...state,
        isDeleteContactModalOpen: payload,
      };
    }
    case MODAL_STORE_ACTIONS.toggleViewContactModal: {
      return {
        ...state,
        isViewContactModalOpen: payload,
      };
    }
    case MODAL_STORE_ACTIONS.setTargetGroup: {
      return {
        ...state,
        targetGroup: payload,
      };
    }
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
