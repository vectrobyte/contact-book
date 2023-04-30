import { type Contact, type Group } from '@/server/models';

export type ModalStore = {
  targetContact: Partial<Contact>;
  isAddContactModalOpen: boolean;
  isEditContactModalOpen: boolean;
  isDeleteContactModalOpen: boolean;
  isViewContactModalOpen: boolean;
  targetGroup: Partial<Group>;
  isAddGroupModalOpen: boolean;
  isEditGroupModalOpen: boolean;
  isDeleteGroupModalOpen: boolean;
};

export const DEFAULT_MODAL_STORE: ModalStore = {
  targetGroup: null,
  isAddContactModalOpen: false,
  isEditContactModalOpen: false,
  isDeleteContactModalOpen: false,
  isViewContactModalOpen: false,
  targetContact: {},
  isAddGroupModalOpen: false,
  isEditGroupModalOpen: false,
  isDeleteGroupModalOpen: false,
};
