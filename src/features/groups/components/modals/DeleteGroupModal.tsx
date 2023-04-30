import React, { useState } from 'react';
import { toast } from 'react-toastify';

import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import Modal, { type ModalProps } from '@/components/modals/Modal';
import { type Group } from '@/server/models';

type DeleteGroupModalProps = ModalProps & {
  group: Group;
  onSubmit(group: Group): Promise<void>;
  onSuccess(): void;
  onClose(): void;
};

const DeleteGroupModal: React.FC<DeleteGroupModalProps> = ({
  group,
  visible,
  onSubmit,
  onSuccess,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);

    onSubmit(group)
      .then(() => {
        toast.success('Group deleted successfully!');
        onSuccess();
        onClose();
      })
      .catch((error: Error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <Modal
      visible={visible}
      hideCloseBtn
      header={<h1 className="mb-4 text-xl">Delete from groups?</h1>}
      hasBorderInFooter={false}
      footer={
        <div className="flex w-full items-center justify-end gap-3">
          <PrimaryButton loading={loading} onClick={handleSubmit}>
            Confirm
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        </div>
      }
      modalClass="!w-[350px] sm:!w-[450px]"
      onClose={onClose}
    >
      <h1 className="mb-2">This group will be permanently deleted.</h1>
    </Modal>
  );
};

export default DeleteGroupModal;
