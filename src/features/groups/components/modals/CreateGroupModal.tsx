import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import TextInput from '@/components/inputs/TextInput';
import Modal, { type ModalProps } from '@/components/modals/Modal';
import AppError from '@/lib/errors/AppError';
import type RequestError from '@/lib/errors/RequestError';
import { GroupFormSchema } from '@/lib/schemas/group.schema';
import { type Group, type GroupInput } from '@/server/models';

type CreateGroupModalProps = ModalProps & {
  onSubmit(data: GroupInput): Promise<Group>;
  onSuccess(group: Group): void;
};

const CreateGroupModal: React.FC<CreateGroupModalProps> = ({
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
  } = useForm<GroupInput>({ resolver: yupResolver(GroupFormSchema) });

  const resetForm = useCallback(() => {
    reset();
    clearErrors();
  }, [clearErrors, reset]);

  const handleFormSubmit = (data: GroupInput) => {
    setSubmitting(true);
    onSubmit(data)
      .then((newGroup) => {
        toast.success('Group created successfully!');
        onSuccess(newGroup);
        handleClose();
      })
      .catch((err: RequestError<GroupInput>) => {
        if (!err.response) {
          throw err;
        }

        const errors = err.response.data?.errors;

        if (!errors || !Object.keys(errors).length) {
          throw new AppError(err.message);
        }
        Object.keys(errors).forEach((errorKey) => {
          const err = errorKey as keyof GroupInput;
          setError(err, {
            type: 'server',
            message: errors[err],
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
      header={<h1 className="mb-6 text-xl">Create New Group</h1>}
      modalClass="!w-[350px] sm:!w-[450px]"
      onClose={handleClose}
      {...props}
    >
      <form name="group" method="POST" autoComplete="off" onSubmit={handleSubmit(handleFormSubmit)}>
        <TextInput
          id="full_name"
          label="Label"
          autoComplete="off"
          {...register('label')}
          error={errors.label && errors.label?.message}
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

export default CreateGroupModal;
