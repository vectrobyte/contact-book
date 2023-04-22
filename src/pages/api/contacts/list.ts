import { createHandler } from '@/server/server-utils';
import { listContacts } from '@/server/services/contact.service';

export default createHandler({ method: 'GET', target: 'query' }, async (params) => {
  return listContacts(params);
});
