export type Contact = {
  id: string;
  full_name: string;
  email?: string;
  phone: string;
};

export type ContactFormData = Omit<Contact, 'id'>;
