import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { type Contact } from '@/@types';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import Modal, { type ModalProps } from '@/components/modals/Modal';

type DeleteContactModalProps = ModalProps & {
  contact: Contact;
  onSubmit(contact: Contact): Promise<void>;
  onSuccess(): void;
  onClose(): void;
};

const DeleteContactModal: React.FC<DeleteContactModalProps> = ({
  contact,
  visible,
  onSubmit,
  onSuccess,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);

    onSubmit(contact)
      .then(() => {
        toast.success('Contact deleted successfully!');
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
      header={<h1 className="mb-4 text-xl">Delete from contacts?</h1>}
      hasBorderInFooter={false}
      modalClass="!w-[500px]"
      footer={
        <div className="flex w-full items-center justify-end gap-3">
          <PrimaryButton loading={loading} onClick={handleSubmit}>
            Confirm
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        </div>
      }
      onClose={onClose}
    >
      <h1 className="mb-2">This contact will be permanently deleted.</h1>
    </Modal>
  );
};

export default DeleteContactModal;
