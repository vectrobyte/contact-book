import React from 'react';
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md';

import { type PaginationMeta } from '@/@types';
import SecondaryButton from '@/components/buttons/SecondaryButton';

type PaginationProps = Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> & {
  pagination: PaginationMeta;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pagination, className = '', onChange }) => {
  const { total_page = 0, current_page = 1 } = pagination;

  function onPageClicked(page: number) {
    onChange(page);
  }

  if (total_page === 0) {
    return <></>;
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <SecondaryButton
        type="submit"
        icon={<MdNavigateBefore size={24} />}
        disabled={current_page === 1}
        onClick={() => onPageClicked(current_page - 1)}
      >
        <span className="mr-4 hidden sm:block">Prev</span>
      </SecondaryButton>

      <SecondaryButton className="!px-5" disabled>
        {current_page}
      </SecondaryButton>

      <SecondaryButton
        type="submit"
        icon={<MdNavigateNext size={24} />}
        iconPosition="right"
        disabled={current_page === total_page}
        onClick={() => onPageClicked(current_page + 1)}
      >
        <span className="ml-4 hidden sm:block">Next</span>
      </SecondaryButton>
    </div>
  );
};

export default Pagination;
