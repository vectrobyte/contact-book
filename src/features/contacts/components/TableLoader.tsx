import React from 'react';

import CircleSkeleton from '@/components/skeletons/CircleSkeleton';
import RectangleSkeleton from '@/components/skeletons/RectangleSkeleton';

const TableLoaderRow: React.FC = (props) => {
  return (
    <tr {...props}>
      <td className="p-3">
        <div className="group flex items-center gap-8 transition-opacity hover:opacity-80 sm:gap-4">
          <CircleSkeleton className="flex-shrink-0" />
          <RectangleSkeleton className="sm:w-[50%]" />
        </div>
      </td>
      <td className="hidden p-3 lg:table-cell">
        {/* eslint-disable-next-line react/jsx-no-undef */}
        <RectangleSkeleton />
      </td>
      <td className="hidden p-3 sm:table-cell">
        <RectangleSkeleton />
      </td>
      <td className="w-[100px] p-3" />
    </tr>
  );
};

const TableLoader: React.FC<{ count: number }> = ({ count }) => {
  const rows = new Array(count).fill(null);

  return (
    <tbody>
      {rows.map((_, index) => (
        <TableLoaderRow key={index} />
      ))}
    </tbody>
  );
};

export default TableLoader;
