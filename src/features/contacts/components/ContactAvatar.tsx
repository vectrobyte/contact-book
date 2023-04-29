import React from 'react';

import { type Contact } from '@/server/models';

type ContactAvatarProps = React.HTMLAttributes<HTMLElement> & {
  contact: Contact;
};

const ContactAvatar: React.FC<ContactAvatarProps> = ({ contact }) => {
  return (
    <div className="flex-center h-[36px] w-[36px] flex-shrink-0 rounded-full bg-gray-600 text-white">
      <span>{(contact.full_name || '')[0]}</span>
    </div>
  );
};

export default ContactAvatar;
