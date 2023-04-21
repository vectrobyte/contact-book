import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { type Contact } from '@/@types';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import Modal, { type ModalProps } from '@/components/modals/Modal';

type DeleteContactModalProps = ModalProps & {
  contact: Contact;
  onSubmit(): Promise<void>;
  onClose(): void;
};

const DeleteContactModal: React.FC<DeleteContactModalProps> = ({
  contact,
  visible,
  onSubmit,
  onClose,
}) => {
  const [loading, setLoading] = useState(false);

  function handleSubmit() {
    setLoading(true);

    onSubmit()
      .then(() => {
        toast.success('Contact deleted successfully!');
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
      hasBorderInFooter={false}
      modalClass="!w-[400px]"
      footer={
        <div className="flex w-full items-center justify-end gap-2">
          <PrimaryButton loading={loading} onClick={handleSubmit}>
            Confirm
          </PrimaryButton>
          <SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
        </div>
      }
      onClose={onClose}
    >
      <h1 className="mb-2 text-lg">Are you sure that you want to delete {contact.full_name}?</h1>
    </Modal>
  );
};

export default DeleteContactModal;
