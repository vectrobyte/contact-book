import React, { useCallback } from 'react';

import CreateContactModal from '@/features/contacts/components/modals/CreateContactModal';
import DeleteContactModal from '@/features/contacts/components/modals/DeleteContactModal';
import EditContactModal from '@/features/contacts/components/modals/EditContactModal';
import ViewContactModal from '@/features/contacts/components/modals/ViewContactModal';
import { useContacts } from '@/features/contacts/hooks/useContacts';
import CreateGroupModal from '@/features/groups/components/modals/CreateGroupModal';
import DeleteGroupModal from '@/features/groups/components/modals/DeleteGroupModal';
import EditGroupModal from '@/features/groups/components/modals/EditGroupModal';
import { useGroups } from '@/features/groups/hooks/useGroups';
import SideNav from '@/layouts/app-layout/components/side-nav/SideNav';
import { MODAL_STORE_ACTIONS } from '@/lib/context/modals';
import { useModals } from '@/lib/providers/ModalProvider';
import { type Contact, type ContactWithGroups, type Group } from '@/server/models';

type InitializerProps = React.HTMLAttributes<HTMLElement> & {
  isSidenavOpen: boolean;
  setIsSidenavOpen(isSidenavOpen: boolean): void;
};

const AfterAuth: React.FC<InitializerProps> = ({ isSidenavOpen, setIsSidenavOpen }) => {
  const { groups, createGroup, updateGroup, dropGroup } = useGroups();

  const [modalState, modalDispatch] = useModals();
  const { contacts, createContact, updateContact, dropContact } = useContacts();

  function setTargetContact(contact: Contact) {
    modalDispatch({ type: MODAL_STORE_ACTIONS.setTargetContact, payload: contact });
  }

  function setTargetGroup(group: Group) {
    modalDispatch({ type: MODAL_STORE_ACTIONS.setTargetGroup, payload: group });
  }

  const clearTargetContact = useCallback(() => {
    const timeout = setTimeout(() => {
      modalDispatch({ type: MODAL_STORE_ACTIONS.setTargetContact, payload: {} });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [modalDispatch]);

  const clearTargetGroup = useCallback(() => {
    const timeout = setTimeout(() => {
      modalDispatch({ type: MODAL_STORE_ACTIONS.setTargetGroup, payload: {} });
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [modalDispatch]);

  return (
    <>
      <SideNav
        groups={groups}
        contacts={contacts}
        isSidenavOpen={isSidenavOpen}
        className={`${isSidenavOpen ? 'left-0 ease-in' : '-left-72 ease-out'}`}
        onOpenCreateContactModal={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleAddContactModal, payload: true });
        }}
        onOpenAddGroup={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleAddGroupModal, payload: true });
        }}
        onOpenEditGroup={(shelf) => {
          setTargetGroup(shelf);
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleEditGroupModal, payload: true });
        }}
        onOpenDeleteGroup={(shelf) => {
          setTargetGroup(shelf);
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleDeleteGroupModal, payload: true });
        }}
        onCloseSidenav={() => {
          setIsSidenavOpen(false);
        }}
      />

      <CreateGroupModal
        visible={modalState.isAddGroupModalOpen}
        onSubmit={createGroup}
        onSuccess={() => {
          clearTargetGroup();
        }}
        onClose={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleAddGroupModal, payload: false });
          setTargetGroup(null);
        }}
      />

      <EditGroupModal
        visible={modalState.isEditGroupModalOpen}
        group={modalState.targetGroup as Group}
        onSubmit={updateGroup}
        onSuccess={() => {
          clearTargetGroup();
        }}
        onClose={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleEditGroupModal, payload: false });
          setTargetGroup(null);
        }}
      />

      <DeleteGroupModal
        visible={modalState.isDeleteGroupModalOpen}
        group={modalState.targetGroup as Group}
        onSubmit={dropGroup}
        onSuccess={() => {
          clearTargetGroup();
        }}
        onClose={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleDeleteGroupModal, payload: false });
          setTargetGroup(null);
        }}
      />

      <ViewContactModal
        visible={modalState.isViewContactModalOpen}
        contact={modalState.targetContact as ContactWithGroups}
        onEdit={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleEditContactModal, payload: true });
        }}
        onDelete={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleDeleteContactModal, payload: true });
        }}
        onClose={() => {
          clearTargetContact();
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleViewContactModal, payload: false });
        }}
      />

      <CreateContactModal
        visible={modalState.isAddContactModalOpen}
        onSubmit={createContact}
        onSuccess={(contact) => {
          setTargetContact(contact);
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleViewContactModal, payload: true });
        }}
        onClose={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleAddContactModal, payload: false });
        }}
      />

      <EditContactModal
        visible={modalState.isEditContactModalOpen}
        contact={modalState.targetContact as ContactWithGroups}
        onSubmit={updateContact}
        onSuccess={(contact) => {
          setTargetContact(contact);
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleViewContactModal, payload: true });
        }}
        onClose={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleEditContactModal, payload: false });
        }}
      />

      <DeleteContactModal
        visible={modalState.isDeleteContactModalOpen}
        contact={modalState.targetContact as Contact}
        onSubmit={dropContact}
        onSuccess={() => {
          clearTargetContact();
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleViewContactModal, payload: false });
        }}
        onClose={() => {
          modalDispatch({ type: MODAL_STORE_ACTIONS.toggleDeleteContactModal, payload: false });
        }}
      />
    </>
  );
};

export default AfterAuth;
