import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';

import IconButton from '@/components/buttons/IconButton';
import ContactAvatar from '@/features/contacts/components/ContactAvatar';
import GroupLabel from '@/features/contacts/components/GroupLabel';
import TableLoader from '@/features/contacts/components/TableLoader';
import { DEFAULT_PAGE_SIZE } from '@/lib/configs';
import { MODAL_STORE_ACTIONS } from '@/lib/context/modals';
import { useIsDesktop } from '@/lib/hooks/useIsDesktop';
import { useModals } from '@/lib/providers/ModalProvider';
import { type Contact, type ContactWithGroups } from '@/server/models';

type ContactTableProps = React.HTMLAttributes<HTMLElement> & {
  loading: boolean;
  contacts: ContactWithGroups[];
};

const ContactTable: React.FC<ContactTableProps> = ({ loading, contacts }) => {
  const isDesktop = useIsDesktop(true);
  const [, modalDispatch] = useModals();

  function setTargetContact(contact: Contact) {
    modalDispatch({ type: MODAL_STORE_ACTIONS.setTargetContact, payload: contact });
  }

  return (
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
          <th className="hidden border-b p-3 text-left font-medium text-gray-600 sm:table-cell lg:w-[250px]">
            Groups
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
                      modalDispatch({
                        type: MODAL_STORE_ACTIONS.toggleViewContactModal,
                        payload: true,
                      });
                    }}
                  >
                    <ContactAvatar contact={contact} />
                    <span className="">{contact.full_name}</span>
                  </button>
                </td>
                <td className="hidden p-3 text-sm font-light lg:table-cell">
                  {contact.email && (
                    <Link
                      href={`mailto:${contact.email}`}
                      className="transition-opacity hover:opacity-80"
                    >
                      {contact.email}
                    </Link>
                  )}
                </td>
                <td className="hidden p-3 text-sm font-light sm:table-cell">
                  <Link
                    href={`tel:${contact.phone}`}
                    className="transition-opacity hover:opacity-80"
                  >
                    {contact.phone}
                  </Link>
                </td>
                <td className="hidden overflow-hidden p-3 text-sm font-light sm:table-cell">
                  <div className="flex gap-2">
                    {contact.groups.map((group) => (
                      <GroupLabel key={group.id} group={group} />
                    ))}
                  </div>
                </td>
                <td className="w-[100px] p-3">
                  <div className="flex items-center justify-end gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <IconButton
                      title="Edit"
                      onClick={() => {
                        setTargetContact(contact);
                        modalDispatch({
                          type: MODAL_STORE_ACTIONS.toggleEditContactModal,
                          payload: true,
                        });
                      }}
                    >
                      <MdEdit />
                    </IconButton>
                    <IconButton
                      title="Delete"
                      onClick={() => {
                        setTargetContact(contact);
                        modalDispatch({
                          type: MODAL_STORE_ACTIONS.toggleDeleteContactModal,
                          payload: true,
                        });
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
                <div className="flex-center flex-col gap-5 px-16 py-32 sm:gap-10 md:px-32 lg:p-64">
                  <Image
                    src="/logo.svg"
                    alt=""
                    height={isDesktop ? 150 : 100}
                    width={isDesktop ? 150 : 100}
                    className="flex-shrink-0 opacity-30 grayscale transition-all"
                  />

                  <p className="text-xl font-light text-gray-500">Contacts not found</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      )}
    </table>
  );
};

export default ContactTable;
