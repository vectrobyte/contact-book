export type Contact = {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
  user_id: string;
};

export type ContactFormData = Omit<Contact, 'id'>;
