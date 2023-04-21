import React from 'react';
import { MdAdd, MdDelete, MdEdit } from 'react-icons/md';

import Button from '@/components/buttons/Button';
import IconButton from '@/components/buttons/IconButton';
import AppLayout from '@/layouts/app-layout/AppLayout';
import { useContacts } from '@/lib/context/data/useContacts';

type ContactsProps = React.HTMLAttributes<HTMLElement>;

const Contacts: React.FC<ContactsProps> = () => {
  const { contacts } = useContacts();

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
                <tr className="transition-colors hover:bg-gray-50" key={contact.id}>
                  <td className="w-1/3 p-2 text-sm">{contact.full_name}</td>
                  <td className="p-2 text-sm font-light">{contact.email}</td>
                  <td className="p-2 text-sm font-light">{contact.phone}</td>
                  <td className="w-[100px] py-2">
                    <div className="flex items-center justify-end gap-1">
                      <IconButton title="Edit">
                        <MdEdit />
                      </IconButton>
                      <IconButton title="Delete">
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
        <Button className="rounded-full bg-gray-50">
          <div className="flex items-center justify-center gap-2">
            <MdAdd size={24} />
            <span>Create Contact</span>
          </div>
        </Button>
      </div>
    </AppLayout>
  );
};

export default Contacts;
