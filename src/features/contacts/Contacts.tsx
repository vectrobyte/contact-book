import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import { type Contact } from '@/@types';
import IconButton from '@/components/buttons/IconButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import Pagination from '@/components/Pagination';
import ContactAvatar from '@/features/contacts/components/ContactAvatar';
import CreateContactModal from '@/features/contacts/components/modals/CreateContactModal';
import DeleteContactModal from '@/features/contacts/components/modals/DeleteContactModal';
import EditContactModal from '@/features/contacts/components/modals/EditContactModal';
import ViewContactModal from '@/features/contacts/components/modals/ViewContactModal';
import Search from '@/features/contacts/components/Search';
import { useContacts } from '@/features/contacts/hooks/useContacts';

type HomeProps = React.HTMLAttributes<HTMLElement>;

const Home: React.FC<HomeProps> = () => {
  const { contacts, pagination, query, setQuery, createContact, updateContact, dropContact } =
    useContacts();

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
    <div className="">
      <div className="my-4 flex items-center lg:justify-end">
        <Search
          keyword={query.keyword}
          onSubmit={(keyword) => setQuery({ keyword: keyword || null })}
          className="w-full lg:w-[500px]"
        />
      </div>

      <table className="mb-[100px] w-full table-fixed">
        <thead>
          <tr>
            <th className="w-1/2 border-b p-3 text-left font-medium text-gray-600 lg:w-1/3">
              Name
            </th>
            <th className="hidden border-b p-3 text-left font-medium text-gray-600 lg:table-cell lg:w-[250px]">
              Email
            </th>
            <th className="border-b p-3 text-left font-medium text-gray-600 lg:w-[250px]">
              Mobile
            </th>
            <th className="border-b p-3 text-gray-600" />
          </tr>
        </thead>

        <tbody>
          {contacts.length ? (
            contacts.map((contact) => (
              <tr className="group transition-colors hover:bg-gray-50" key={contact.id}>
                <td className="p-3 text-sm">
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
                <td className="hidden p-3 text-sm font-light lg:table-cell">{contact.email}</td>
                <td className="p-3 text-sm font-light">{contact.phone}</td>
                <td className="w-[100px] p-3">
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
          ) : (
            <tr>
              <td colSpan={4}>
                <div className="flex-center flex-col gap-10 p-40">
                  <Image
                    src="/icons/main.png"
                    alt=""
                    height={100}
                    width={100}
                    className="grayscale"
                  />

                  <p className="text-xl font-light text-gray-600">Contacts not found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <Pagination pagination={pagination} onChange={(page) => setQuery({ page })} />

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
        onSubmit={createContact}
        onClose={() => {
          clearTargetContact();
          setIsCreateContactModalOpen(false);
        }}
      />

      <EditContactModal
        visible={isEditContactModalOpen}
        contact={targetContact as Contact}
        onSubmit={updateContact}
        onClose={() => {
          clearTargetContact();
          setIsEditContactModalOpen(false);
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
    </div>
  );
};

export default Home;
