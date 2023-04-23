import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type Contact, type ContactFormData } from '@/@types';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import TextInput from '@/components/inputs/TextInput';
import Modal, { type ModalProps } from '@/components/modals/Modal';
import AppError from '@/lib/errors/AppError';
import type RequestError from '@/lib/errors/RequestError';
import { UpdateContactSchema } from '@/lib/schemas/contact.schema';

type EditContactModalProps = ModalProps & {
  contact: Contact;
  onSubmit(data: Contact): Promise<Contact>;
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
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<ContactFormData>({ resolver: yupResolver(UpdateContactSchema) });

  const resetForm = useCallback(() => {
    reset();
    clearErrors();
  }, [clearErrors, reset]);

  const handleFormSubmit = (data: ContactFormData) => {
    setSubmitting(true);
    onSubmit({
      id: contact.id,
      ...data,
    })
      .then((updatedContact) => {
        toast.success('Contact updated successfully!');
        onSuccess(updatedContact);
        handleClose();
      })
      .catch((err: RequestError<ContactFormData>) => {
        if (!err.response) {
          throw err;
        }

        const errors = err.response.data?.errors;

        if (!errors || !Object.keys(errors).length) {
          throw new AppError(err.message);
        }
        Object.keys(errors).forEach((errorKey: keyof ContactFormData) => {
          setError(errorKey, {
            type: 'server',
            message: errors[errorKey],
          });
        });
      })
      .catch((error: Error) => {
        toast.error(error.message);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  function handleClose() {
    onClose();

    setTimeout(() => {
      resetForm();
    }, 300);
  }

  useEffect(() => {
    reset(contact);
  }, [contact, reset]);

  return (
    <Modal
      visible={visible}
      hasBorderInFooter={false}
      header={<h1 className="mb-6 text-xl">Edit Contact</h1>}
      modalClass="!w-[350px] sm:!w-[450px]"
      onClose={handleClose}
      {...props}
    >
      <form
        name="contact"
        method="POST"
        autoComplete="off"
        onSubmit={handleSubmit(handleFormSubmit)}
      >
        <TextInput
          id="full_name"
          label="Full Name"
          autoComplete="off"
          {...register('full_name')}
          error={errors.full_name && errors.full_name?.message}
        />

        <TextInput
          id="contact"
          type="text"
          label="Phone"
          autoComplete="off"
          {...register('phone')}
          error={errors.phone && errors.phone?.message}
        />

        <TextInput
          id="email"
          type="text"
          label="Email"
          autoComplete="off"
          {...register('email')}
          error={errors.email && errors.email?.message}
        />

        <div className="mt-8 flex w-full items-center justify-end gap-3">
          <PrimaryButton type="submit" loading={submitting}>
            Update
          </PrimaryButton>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default EditContactModal;
