import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import { type Contact } from '@/@types';
import IconButton from '@/components/buttons/IconButton';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import Pagination from '@/components/Pagination';
import ContactAvatar from '@/features/contacts/components/ContactAvatar';
import CreateContactModal from '@/features/contacts/components/modals/CreateContactModal';
import DeleteContactModal from '@/features/contacts/components/modals/DeleteContactModal';
import EditContactModal from '@/features/contacts/components/modals/EditContactModal';
import ViewContactModal from '@/features/contacts/components/modals/ViewContactModal';
import Search from '@/features/contacts/components/Search';
import TableLoader from '@/features/contacts/components/TableLoader';
import { useContacts } from '@/features/contacts/hooks/useContacts';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';

type HomeProps = React.HTMLAttributes<HTMLElement>;

const Home: React.FC<HomeProps> = () => {
  const [isViewContactVisible, setIsViewContactVisible] = useState(false);
  const [isEditContactModalOpen, setIsEditContactModalOpen] = useState(false);
  const [isCreateContactModalOpen, setIsCreateContactModalOpen] = useState(false);
  const [isDeleteContactModalOpen, setIsDeleteContactModalOpen] = useState(false);

  const {
    contacts,
    loading,
    pagination,
    query,
    setQuery,
    createContact,
    updateContact,
    dropContact,
  } = useContacts();

  const isDesktop = useIsDesktop(true);

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
          keyword={query.keyword || ''}
          onSubmit={(keyword) => setQuery({ keyword: keyword || null })}
          className="w-full lg:w-[500px]"
        />
      </div>

      <table className="mb-10 w-full table-fixed">
        <thead>
          <tr>
            <th className="w-full border-b p-3 text-left font-medium text-gray-600 sm:w-1/2 lg:w-1/3">
              Name
            </th>
            <th className="hidden border-b p-3 text-left font-medium text-gray-600 lg:table-cell lg:w-[250px]">
              Email
            </th>
            <th className="hidden border-b p-3 text-left font-medium text-gray-600 sm:table-cell lg:w-[250px]">
              Mobile
            </th>
            <th className="border-b p-3 text-gray-600" />
          </tr>
        </thead>

        {loading ? (
          <TableLoader count={contacts.length || DEFAULT_PAGE_SIZE} />
        ) : (
          <tbody>
            {contacts.length ? (
              contacts.map((contact) => (
                <tr className="group transition-colors hover:bg-gray-50" key={contact.id}>
                  <td className="p-3 text-sm">
                    <button
                      className="group flex items-center gap-8 transition-opacity hover:opacity-80 sm:gap-4"
                      onClick={() => {
                        setTargetContact(contact);
                        setIsViewContactVisible(true);
                      }}
                    >
                      <ContactAvatar contact={contact} />
                      <span className="">{contact.full_name}</span>
                    </button>
                  </td>
                  <td className="hidden p-3 text-sm font-light lg:table-cell">
                    <Link
                      href={`mailto:${contact.email}`}
                      className="transition-opacity hover:opacity-80"
                    >
                      {contact.email}
                    </Link>
                  </td>
                  <td className="hidden p-3 text-sm font-light sm:table-cell">
                    <Link
                      href={`tel:${contact.phone}`}
                      className="transition-opacity hover:opacity-80"
                    >
                      {contact.phone}
                    </Link>
                  </td>
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
                <td colSpan={isDesktop ? 4 : 3}>
                  <div className="flex-center flex-col gap-10 p-32 lg:p-64">
                    <Image
                      src="/logo.svg"
                      alt=""
                      height={150}
                      width={150}
                      className="flex-shrink-0 opacity-30 grayscale"
                    />

                    <p className="text-xl font-light text-gray-500">Contacts not found</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        )}
      </table>

      <Pagination
        pagination={pagination}
        className="mb-4"
        onChange={(page) => setQuery({ page })}
      />

      <div className="fixed bottom-8 right-4 sm:right-6 lg:right-8">
        <PrimaryButton
          icon={<MdAdd size={24} />}
          onClick={() => {
            setIsCreateContactModalOpen(true);
          }}
        >
          <span className="hidden sm:block">Create Contact</span>
        </PrimaryButton>
      </div>

      <ViewContactModal
        visible={isViewContactVisible}
        contact={targetContact as Contact}
        onEdit={() => {
          setIsEditContactModalOpen(true);
        }}
        onDelete={() => {
          setIsDeleteContactModalOpen(true);
        }}
        onClose={() => {
          clearTargetContact();
          setIsViewContactVisible(false);
        }}
      />

      <CreateContactModal
        visible={isCreateContactModalOpen}
        onSubmit={createContact}
        onSuccess={(contact) => {
          setTargetContact(contact);
          setIsViewContactVisible(true);
        }}
        onClose={() => {
          setIsCreateContactModalOpen(false);
        }}
      />

      <EditContactModal
        visible={isEditContactModalOpen}
        contact={targetContact as Contact}
        onSubmit={updateContact}
        onSuccess={(contact) => {
          setTargetContact(contact);
          setIsViewContactVisible(true);
        }}
        onClose={() => {
          setIsEditContactModalOpen(false);
        }}
      />

      <DeleteContactModal
        visible={isDeleteContactModalOpen}
        contact={targetContact as Contact}
        onSubmit={dropContact}
        onSuccess={() => {
          clearTargetContact();
          setIsViewContactVisible(false);
        }}
        onClose={() => {
          setIsDeleteContactModalOpen(false);
        }}
      />
    </div>
  );
};

export default Home;
