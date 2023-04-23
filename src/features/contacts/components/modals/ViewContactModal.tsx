import React from 'react';
import { MdDelete, MdEdit, MdMailOutline, MdPhone } from 'react-icons/md';

import { type Contact } from '@/@types';
import IconButton from '@/components/buttons/IconButton';
import Modal, { type ModalProps } from '@/components/modals/Modal';
import ContactAvatar from '@/features/contacts/components/ContactAvatar';

type ViewContactModalProps = ModalProps & {
  contact: Contact;
  onEdit(contact: Contact);
  onDelete(contact: Contact);
};

const ViewContactModal: React.FC<ViewContactModalProps> = ({
  contact,
  onEdit,
  onDelete,
  ...props
}) => {
  return (
    <Modal
      header={<h1 className="mb-4 text-xl leading-tight tracking-tight">Contact Details</h1>}
      {...props}
      controlArea={
        <div className="flex items-center gap-1">
          <IconButton className="" onClick={() => onEdit(contact)}>
            <MdEdit />
          </IconButton>
          <IconButton className="" onClick={() => onDelete(contact)}>
            <MdDelete />
          </IconButton>
        </div>
      }
      modalClass="!w-[350px] sm:!w-[450px]"
    >
      <table>
        <tbody>
          <tr>
            <td className="p-2">
              <ContactAvatar contact={contact} />
            </td>
            <td className="p-2">{contact.full_name}</td>
          </tr>

          <tr>
            <td className="p-2">
              <MdPhone size={24} className="mx-auto text-gray-600" />
            </td>
            <td className="p-2">{contact.phone}</td>
          </tr>

          {contact.email && (
            <tr>
              <td className="p-2">
                <MdMailOutline size={24} className="mx-auto text-gray-600" />
              </td>
              <td className="p-2">{contact.email}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Modal>
  );
};

export default ViewContactModal;
