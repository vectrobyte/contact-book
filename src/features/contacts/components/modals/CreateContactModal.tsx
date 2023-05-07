import React, { useRef } from 'react';
import { toast } from 'react-toastify';

import Modal, { type ModalProps } from '@/components/modals/Modal';
import ContactForm, {
  type ContactFormRef,
} from '@/features/contacts/components/modals/common/ContactForm';
import { type Contact, type ContactInput } from '@/server/models';

type CreateContactModalProps = ModalProps & {
  onSubmit(data: ContactInput): Promise<Contact>;
  onSuccess(contact: Contact): void;
};

const CreateContactModal: React.FC<CreateContactModalProps> = ({
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

  const handleFormSubmit = (data: ContactInput) => {
    return onSubmit(data).then((newContact) => {
      toast.success('Contact created successfully!');
      onSuccess(newContact);
      handleClose();
    });
  };

  return (
    <Modal
      hasBorderInFooter={false}
      header={<h1 className="mb-6 text-xl">Create New Contact</h1>}
      modalClass="!w-[350px] sm:!w-[450px]"
      onClose={handleClose}
      {...props}
    >
      <ContactForm ref={formRef} onSubmit={handleFormSubmit} onCancel={handleClose} />
    </Modal>
  );
};

export default CreateContactModal;
