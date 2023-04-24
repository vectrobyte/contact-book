import { ListParamsSchema } from '@/lib/schemas/common.schema';
import { listContacts } from '@/server/services/contact.service';
import { Get } from '@/server/handlers/route.handler';

export default Get(ListParamsSchema, async (params) => {
  return listContacts(params);
});
