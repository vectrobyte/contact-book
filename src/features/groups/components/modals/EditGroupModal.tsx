import { yupResolver } from '@hookform/resolvers/yup';
import React, { useCallback, useEffect, useState } from 'react';
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

type EditGroupModalProps = ModalProps & {
  group: Group;
  onSubmit(id: string, data: GroupInput): Promise<Group>;
  onSuccess(group: Group): void;
};

const EditGroupModal: React.FC<EditGroupModalProps> = ({
  visible,
  group,
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
    onSubmit(group.id, data)
      .then((updatedGroup) => {
        toast.success('Group updated successfully!');
        onSuccess(updatedGroup);
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
          const key = errorKey as keyof GroupInput;
          setError(key, {
            type: 'server',
            message: errors[key],
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
    reset(group);
  }, [group, reset]);

  return (
    <Modal
      visible={visible}
      hasBorderInFooter={false}
      header={<h1 className="mb-6 text-xl">Edit Group</h1>}
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
            Update
          </PrimaryButton>
          <SecondaryButton onClick={handleClose}>Cancel</SecondaryButton>
        </div>
      </form>
    </Modal>
  );
};

export default EditGroupModal;
