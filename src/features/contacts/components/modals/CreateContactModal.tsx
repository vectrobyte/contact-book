import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import { type ContactFormData } from '@/@types';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import TextInput from '@/components/inputs/TextInput';
import Modal, { type ModalProps } from '@/components/modals/Modal';
import { ContactFormSchema } from '@/features/contacts/schemas/ContactFormSchema';
import { EMAIL_REGEX } from '@/lib/configs';
import AppError from '@/lib/errors/AppError';
import type RequestError from '@/lib/errors/RequestError';

type CreateContactModalProps = ModalProps & {
  onSubmit(data: ContactFormData): Promise<void>;
};

const CreateContactModal: React.FC<CreateContactModalProps> = ({ onSubmit, onClose, ...props }) => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
    clearErrors,
  } = useForm<ContactFormData>({ resolver: yupResolver(ContactFormSchema) });

  const resetForm = useCallback(() => {
    reset();
    clearErrors();
  }, [clearErrors, reset]);

  const handleFormSubmit = (data: ContactFormData) => {
    setSubmitting(true);
    onSubmit(data)
      .then(() => {
        toast.success('Contact created successfully!');
        handleClose();
      })
      .catch((err: RequestError<ContactFormData>) => {
        if (!err.response) {
          throw err;
        }

        const errors = err.response.data?.errors;

        if (!errors || Object.keys(errors).length) {
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

  return (
    <Modal
      hasBorderInFooter={false}
      modalClass="!w-[400px]"
      header={<h1 className="mb-6 text-xl">Create Contact</h1>}
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
          {...register('full_name', {
            required: `Name is required.`,
          })}
          error={errors.full_name && errors.full_name?.message}
        />

        <TextInput
          id="contact"
          type="text"
          label="Phone"
          autoComplete="off"
          {...register('phone', {
            required: `Phone is required.`,
          })}
          error={errors.phone && errors.phone?.message}
        />

        <TextInput
          id="email"
          type="text"
          label="Email"
          autoComplete="off"
          {...register('email', {
            pattern: {
              value: EMAIL_REGEX,
              message: 'Email is not formatted properly',
            },
          })}
          error={errors.email && errors.email?.message}
        />

        <div className="mt-8 flex w-full items-center justify-end gap-3">
          <PrimaryButton type="submit" loading={submitting}>
            Create
          </PrimaryButton>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default CreateContactModal;