import { yupResolver } from '@hookform/resolvers/yup';
import React, {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import MultiSelect from '@/components/inputs/MultiSelect';
import Textarea from '@/components/inputs/Textarea';
import TextInput from '@/components/inputs/TextInput';
import { useGroups } from '@/features/groups/hooks/useGroups';
import AppError from '@/lib/errors/AppError';
import type RequestError from '@/lib/errors/RequestError';
import { ContactFormSchema } from '@/lib/schemas/contact.schema';
import { type ContactInput } from '@/server/models';

type ContactFormProps = Omit<React.FormHTMLAttributes<HTMLFormElement>, 'onSubmit'> & {
  contact?: ContactInput;
  onSubmit(data: ContactInput): Promise<void>;
  onCancel(): void;
};

export type ContactFormRef = {
  resetForm(): void;
};

const ContactForm: React.ForwardRefRenderFunction<ContactFormRef, ContactFormProps> = (
  { contact, onSubmit, onCancel, ...props },
  ref
) => {
  const [submitting, setSubmitting] = useState(false);
  const { groups, listGroups } = useGroups();

  const groupOptions = useMemo(
    () =>
      groups.map((group) => ({
        label: group.label,
        value: group.id,
      })),
    [groups]
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setError,
    clearErrors,
  } = useForm<ContactInput>({
    resolver: yupResolver(ContactFormSchema),
  });

  const resetForm = useCallback(() => {
    reset();
    clearErrors();
  }, [clearErrors, reset]);

  const handleFormSubmit = (data: ContactInput) => {
    setSubmitting(true);
    onSubmit(data)
      .then(() => {
        // check if the groups were changed or not
        if (JSON.stringify(contact?.group_ids || []) !== JSON.stringify(data.group_ids)) {
          void listGroups();
        }
      })
      .catch((err: RequestError<ContactInput>) => {
        if (!err.response) {
          throw err;
        }

        const errors = err.response.data?.errors;

        if (!errors || !Object.keys(errors).length) {
          throw new AppError(err.message);
        }
        Object.keys(errors).forEach((errorKey) => {
          const err = errorKey as keyof ContactInput;
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

  useImperativeHandle(
    ref,
    () => ({
      resetForm,
    }),
    [resetForm]
  );

  useEffect(() => {
    if (contact) {
      reset(contact);
    }
  }, [contact, reset]);

  return (
    <form
      name="contact"
      method="POST"
      autoComplete="off"
      onSubmit={handleSubmit(handleFormSubmit)}
      {...props}
    >
      <TextInput
        id="full_name"
        type="text"
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

      <MultiSelect
        id="group_ids"
        label="Groups"
        control={control}
        options={groupOptions}
        {...register('group_ids')}
        error={errors.group_ids && errors.group_ids?.message}
      />

      <Textarea
        id="notes"
        label="Notes"
        {...register('notes')}
        error={errors.notes && errors.notes?.message}
      />

      <div className="mt-8 flex w-full items-center justify-end gap-3">
        <PrimaryButton type="submit" loading={submitting}>
          Create
        </PrimaryButton>
        <SecondaryButton onClick={onCancel}>Cancel</SecondaryButton>
      </div>
    </form>
  );
};

export default forwardRef(ContactForm);
