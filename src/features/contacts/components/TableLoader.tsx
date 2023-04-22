import React from 'react';
import ContentLoader, { type IContentLoaderProps } from 'react-content-loader';

export const CircleLoader: React.FC<IContentLoaderProps> = (props) => {
  return (
    <ContentLoader
      width={36}
      height={36}
      viewBox="0 0 36"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      {...props}
    >
      <circle cx="18" cy="18" r="18" />
    </ContentLoader>
  );
};

export const RectangleLoader: React.FC<IContentLoaderProps> = (props) => {
  return (
    <ContentLoader
      height={36}
      viewBox="0 0 36"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      className="w-full"
      {...props}
    >
      <rect x="0" y="10" rx="10" ry="10" height="20" className="w-full" />
    </ContentLoader>
  );
};

const TableLoaderRow: React.FC<IContentLoaderProps> = (props) => {
  return (
    <tr>
      <td>
        <div className="group flex items-center gap-4 transition-opacity hover:opacity-80">
          <CircleLoader className="flex-shrink-0" />
          <RectangleLoader className="w-min" />
        </div>
      </td>
      <td className="hidden p-3 text-sm font-light lg:table-cell">
        <RectangleLoader />
      </td>
      <td className="p-3 text-sm font-light">
        <RectangleLoader />
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
