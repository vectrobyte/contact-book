import { type PaginationMeta } from '@/@types';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import SecondaryButton from '@/components/buttons/SecondaryButton';

type PaginationProps = Omit<React.HTMLAttributes<HTMLElement>, 'onChange'> & {
  pagination: PaginationMeta;
  onChange: (page: number) => void;
};

const Pagination: React.FC<PaginationProps> = ({ pagination, onChange }) => {
  const { total_page = 0, current_page = 1, total } = pagination;

  function onPageClicked(page: number) {
    onChange(page);
  }

  if (total_page === 0) {
    return <></>;
  }

  return (
    <div className="flex items-center gap-3">
      <SecondaryButton disabled={current_page === 1} onClick={() => onPageClicked(current_page)}>
        Prev
      </SecondaryButton>
      <PrimaryButton className="!px-4" disabled>
        {current_page}
      </PrimaryButton>
      <SecondaryButton
        disabled={current_page === total_page}
        onClick={() => onPageClicked(current_page)}
      >
        Next
      </SecondaryButton>
    </div>
  );
};

export default Pagination;
