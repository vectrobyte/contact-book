import Link from 'next/link';
import React from 'react';

import SecondaryButton from '@/components/buttons/SecondaryButton';
import { type Group } from '@/server/models';

type GroupLabelProps = React.HTMLAttributes<HTMLElement> & {
  group: Group;
};

const GroupLabel: React.FC<GroupLabelProps> = ({ group }) => {
  return (
    <Link href={`/group/${group.id}`}>
      <SecondaryButton className="!px-2 !py-0.5">{group.label}</SecondaryButton>
    </Link>
  );
};

export default GroupLabel;
