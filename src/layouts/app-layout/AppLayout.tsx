import React, { useCallback, useState } from 'react';

import CreateGroupModal from '@/features/groups/components/modals/CreateGroupModal';
import DeleteGroupModal from '@/features/groups/components/modals/DeleteGroupModal';
import EditGroupModal from '@/features/groups/components/modals/EditGroupModal';
import { useGroups } from '@/features/groups/hooks/useGroups';
import SideNav from '@/layouts/app-layout/components/side-nav/SideNav';
import TopNav from '@/layouts/app-layout/components/TopNav';
import { MODAL_STORE_ACTIONS } from '@/lib/context/modals';
import { useModals } from '@/lib/providers/ModalProvider';
import { type Group } from '@/server/models';

type AppLayoutProps = React.HTMLAttributes<HTMLElement> & {
  showSideNav: boolean;
};

const AppLayout: React.FC<AppLayoutProps> = ({ className = '', showSideNav = true, children }) => {
  const { groups, createGroup, updateGroup, dropGroup } = useGroups();

  const [modalState, modalDispatch] = useModals();

  const [targetGroup, setTargetGroup] = useState<Partial<Group>>({});

  const clearTargetGroup = useCallback(() => {
    const timeout = setTimeout(() => {
      setTargetGroup({});
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <nav className={`${className} relative min-h-screen`}>
      <TopNav />

      {showSideNav && (
        <div>
          <SideNav
            groups={groups}
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
          />
          <main className="ml-64 w-[calc(100%-16rem)] px-4 py-4 sm:px-6 lg:px-8">{children}</main>

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
            group={targetGroup as Group}
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
            group={targetGroup as Group}
            onSubmit={dropGroup}
            onSuccess={() => {
              clearTargetGroup();
            }}
            onClose={() => {
              modalDispatch({ type: MODAL_STORE_ACTIONS.toggleDeleteGroupModal, payload: false });
              setTargetGroup(null);
            }}
          />
        </div>
      )}
    </nav>
  );
};

export default AppLayout;
