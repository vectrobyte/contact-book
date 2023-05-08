import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import Modal, { type ModalProps } from '@/components/modals/Modal';
import ContactForm, {
  type ContactFormRef,
} from '@/features/contacts/components/modals/common/ContactForm';
import { type Contact, type ContactInput, type ContactWithGroups } from '@/server/models';

type EditContactModalProps = ModalProps & {
  contact: ContactWithGroups;
  onSubmit(id: string, data: ContactInput): Promise<Contact>;
  onSuccess(contact: Contact): void;
};

const EditContactModal: React.FC<EditContactModalProps> = ({
  visible,
  contact,
  onSubmit,
  onSuccess,
  onClose,
  ...props
}) => {
  const formRef = useRef<ContactFormRef>(null);

  function handleClose() {
    onClose();

    setTimeout(() => {
      formRef.current?.resetForm();
    }, 300);
  }

  function handleFormSubmit(data: ContactInput) {
    return onSubmit(contact.id, data).then((updatedContact) => {
      toast.success('Contact updated successfully!');
      onSuccess(updatedContact);
      handleClose();
    });
  }

  return (
    <Modal
      visible={visible}
      hasBorderInFooter={false}
      header={<h1 className="mb-6 text-xl">Edit Contact</h1>}
      modalClass="!w-[350px] sm:!w-[450px]"
      onClose={handleClose}
      {...props}
    >
      <ContactForm
        ref={formRef}
        contact={
          visible
            ? {
                ...contact,
                group_ids: (contact.groups || []).map(({ id }) => id),
              }
            : ({} as ContactInput)
        }
        onSubmit={handleFormSubmit}
        onCancel={handleClose}
      />
    </Modal>
  );
};

export default EditContactModal;
