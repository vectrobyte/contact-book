export type Contact = {
  id: string | number;
  full_name: string;
  email?: string;
  phone: string;
};

export type CreateContactPayload = Omit<Contact, 'id'>;
