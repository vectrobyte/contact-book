import React from 'react';
import { MdDelete, MdEdit, MdLabel, MdMailOutline, MdOutlineNote, MdPhone } from 'react-icons/md';

import IconButton from '@/components/buttons/IconButton';
import Modal, { type ModalProps } from '@/components/modals/Modal';
import ContactAvatar from '@/features/contacts/components/ContactAvatar';
import GroupLabel from '@/features/contacts/components/GroupLabel';
import { type Contact, type ContactWithGroups } from '@/server/models';

type ViewContactModalProps = ModalProps & {
  contact: ContactWithGroups;
  onEdit(contact: Contact);
  onDelete(contact: Contact);
};

const ViewContactModal: React.FC<ViewContactModalProps> = ({
  contact,
  onEdit,
  onDelete,
  onClose,
  ...props
}) => {
  return (
    <Modal
      {...props}
      header={<h1 className="mb-4 text-xl leading-tight tracking-tight">Contact Details</h1>}
      controlArea={
        <div className="flex items-center gap-1">
          <IconButton
            className=""
            onClick={() => {
              onEdit(contact);
            }}
          >
            <MdEdit />
          </IconButton>
          <IconButton
            className=""
            onClick={() => {
              onDelete(contact);
            }}
          >
            <MdDelete />
          </IconButton>
        </div>
      }
      modalClass="!w-[350px] sm:!w-[450px]"
      onClose={onClose}
    >
      <table>
        <tbody>
          <tr>
            <td className="p-2 align-top">
              <ContactAvatar contact={contact} />
            </td>
            <td className="p-2">{contact.full_name}</td>
          </tr>

          {Boolean(contact.groups && contact.groups.length) && (
            <tr>
              <td className="p-2 align-top">
                <MdLabel size={24} className="mx-auto text-gray-600" />
              </td>
              <td className="p-2">
                <div className="flex flex-wrap gap-2">
                  {(contact.groups || []).map((group) => (
                    <GroupLabel
                      key={group.id}
                      group={group}
                      onClick={() => {
                        onClose();
                      }}
                    />
                  ))}
                </div>
              </td>
            </tr>
          )}

          <tr>
            <td className="p-2 align-top">
              <MdPhone size={24} className="mx-auto text-gray-600" />
            </td>
            <td className="p-2">{contact.phone}</td>
          </tr>

          {contact.email && (
            <tr>
              <td className="p-2 align-top">
                <MdMailOutline size={24} className="mx-auto text-gray-600" />
              </td>
              <td className="p-2">{contact.email}</td>
            </tr>
          )}

          {contact.notes && (
            <tr>
              <td className="p-2 align-top">
                <MdOutlineNote size={24} className="mx-auto text-gray-600" />
              </td>
              <td className="p-2">{contact.notes}</td>
            </tr>
          )}
        </tbody>
      </table>
    </Modal>
  );
};

export default ViewContactModal;
