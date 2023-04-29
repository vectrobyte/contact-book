import { type NextApiRequest as CoreNextApiRequest } from 'next';
import { type Session } from 'next-auth';
/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module 'next' {
  interface NextApiRequest extends CoreNextApiRequest {
    session?: Session;
    user?: Session['user'];
  }
}
