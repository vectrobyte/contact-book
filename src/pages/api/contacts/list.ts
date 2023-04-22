import { ListParamsSchema } from '@/server/schemas/common.schema';
import { Get } from '@/server/server-utils';
import { listContacts } from '@/server/services/contact.service';

export default Get(ListParamsSchema, async (params) => {
  return listContacts(params);
});
