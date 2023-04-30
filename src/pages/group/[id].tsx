import React from 'react';

import WithAuth from '@/lib/hoc/WithAuth';

type GroupProps = React.HTMLAttributes<HTMLElement>;

const GroupPage: React.FC<GroupProps> = () => {
  return (
    <div>
      <h1>This is group page where group specific contacts are listed</h1>
    </div>
  );
};

export default WithAuth(GroupPage);
