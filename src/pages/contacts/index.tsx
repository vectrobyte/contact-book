import React, { useCallback, useState } from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import { type Contact } from '@/@types';
import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import AppLayout from '@/layouts/app-layout/AppLayout';
import { useContacts } from '@/lib/context/data/useContacts';
import ContactAvatar from '@/pages/contacts/components/ContactAvatar';
import CreateContactModal from '@/pages/contacts/components/modals/CreateContactModal';
import DeleteContactModal from '@/pages/contacts/components/modals/DeleteContactModal';
import ViewContactModal from '@/pages/contacts/components/modals/ViewContactModal';

type HomeProps = React.HTMLAttributes<HTMLElement>;

const Home: React.FC<HomeProps> = () => {
  const { contacts, createContact, dropContact } = useContacts();

  const [isViewContactVisible, setIsViewContactVisible] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isCreateContactModalOpen, setIsCreateContactModalOpen] = useState(false);
  const [isDeleteContactModalOpen, setIsDeleteContactModalOpen] = useState(false);

  const [targetContact, setTargetContact] = useState<Partial<Contact>>({});

  const clearTargetContact = useCallback(() => {
    const timeout = setTimeout(() => {
      setTargetContact({});
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AppLayout>
      <table className="w-full">
        <thead>
          <tr>
            <td className="border-b p-3 text-gray-600">Name</td>
            <td className="border-b p-3 text-gray-600">Email</td>
            <td className="border-b p-3 text-gray-600">Mobile</td>
            <td className="border-b p-3 text-gray-600" />
          </tr>
        </thead>

        <tbody>
          {contacts.length
            ? contacts.map((contact) => (
                <tr className="group transition-colors hover:bg-gray-50" key={contact.id}>
                  <td className="w-1/3 p-2 text-sm">
                    <button
                      className="group flex items-center gap-4 transition-opacity hover:opacity-80"
                      onClick={() => {
                        setTargetContact(contact);
                        setIsViewContactVisible(true);
                      }}
                    >
                      <ContactAvatar contact={contact} />
                      <span className="group-hover:underline">{contact.full_name}</span>
                    </button>
                  </td>
                  <td className="p-2 text-sm font-light">{contact.email}</td>
                  <td className="p-2 text-sm font-light">{contact.phone}</td>
                  <td className="w-[100px] p-2">
                    <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                      <IconButton
                        title="Edit"
                        onClick={() => {
                          setTargetContact(contact);
                          setIsEditContactModalOpen(true);
                        }}
                      >
                        <MdEdit />
                      </IconButton>
                      <IconButton
                        title="Delete"
                        onClick={() => {
                          setTargetContact(contact);
                          setIsDeleteContactModalOpen(true);
                        }}
                      >
                        <MdDelete />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              ))
            : ''}
        </tbody>
      </table>

      <div className="fixed bottom-10 right-10">
        <SecondaryButton
          onClick={() => {
            setIsCreateContactModalOpen(true);
          }}
        >
          <div className="flex-center gap-2">
            <MdAdd size={24} />
            <span>Create Contact</span>
          </div>
        </SecondaryButton>
      </div>

      <ViewContactModal
        visible={isViewContactVisible}
        contact={targetContact as Contact}
        onClose={() => {
          clearTargetContact();
          setIsViewContactVisible(false);
        }}
      />

      <CreateContactModal
        visible={isCreateContactModalOpen}
        contact={targetContact as Contact}
        onSubmit={createContact}
        onClose={() => {
          clearTargetContact();
          setIsCreateContactModalOpen(false);
        }}
      />

      <DeleteContactModal
        visible={isDeleteContactModalOpen}
        contact={targetContact as Contact}
        onSubmit={dropContact}
        onClose={() => {
          clearTargetContact();
          setIsDeleteContactModalOpen(false);
        }}
      />
    </AppLayout>
  );
};

export default Home;
