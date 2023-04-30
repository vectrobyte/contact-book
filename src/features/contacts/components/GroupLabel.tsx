import Link from 'next/link';
import React from 'react';

import { type ButtonProps } from '@/components/buttons/Button';
import SecondaryButton from '@/components/buttons/SecondaryButton';
import { type Group } from '@/server/models';

type GroupLabelProps = ButtonProps & {
  group: Group;
};

const GroupLabel: React.FC<GroupLabelProps> = ({ group, onClick }) => {
  function handleClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    if (onClick) {
      onClick(e);
    }
  }

  return (
    <Link href={`/group/${group.id}`}>
      <SecondaryButton className="!px-2 !py-0.5 text-sm font-normal" onClick={handleClick}>
        {group.label}
      </SecondaryButton>
    </Link>
  );
};

export default GroupLabel;
