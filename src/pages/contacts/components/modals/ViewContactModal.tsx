import React from 'react';
import { MdMailOutline, MdPhone } from 'react-icons/md';

import { type Contact } from '@/@types';
import Modal, { type ModalProps } from '@/components/modals/Modal';
import ContactAvatar from '@/pages/contacts/components/ContactAvatar';

type ViewContactModalProps = ModalProps & {
  contact: Contact;
};

const ViewContactModal: React.FC<ViewContactModalProps> = ({ contact, ...props }) => {
  return (
    <Modal
      header={<h1 className="mb-1 text-xl leading-tight tracking-tight">View Contact</h1>}
      {...props}
      modalClass="!w-[400px]"
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
