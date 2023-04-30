export type ModalStore = {
  isAddGroupModalOpen: boolean;
  isEditGroupModalOpen: boolean;
  isDeleteGroupModalOpen: boolean;
};

export const DEFAULT_MODAL_STORE: ModalStore = {
  isAddGroupModalOpen: false,
  isEditGroupModalOpen: false,
  isDeleteGroupModalOpen: false,
};
