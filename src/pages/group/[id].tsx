import React from 'react';

import { useGroup } from '@/features/groups/hooks/useGroup';
import WithAuth from '@/lib/hoc/WithAuth';
import { useQuery } from '@/lib/hooks/useQuery';

type GroupProps = React.HTMLAttributes<HTMLElement>;

const GroupPage: React.FC<GroupProps> = () => {
  const { query } = useQuery<{ id: string }>();
  const { group } = useGroup(query.id);

  return (
    <div>
      <h1 className="mb-4">This is group page where group specific contacts are listed</h1>
      <pre>{JSON.stringify(group, null, 2)}</pre>
    </div>
  );
};

export default WithAuth(GroupPage);
