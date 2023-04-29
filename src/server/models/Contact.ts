import { type Contact as ContactType } from '.prisma/client';

export type Contact = ContactType;

export type ContactInput = Omit<Contact, 'id' | 'user_id' | 'created_at' | 'updated_at'>;
