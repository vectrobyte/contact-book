import React from 'react';
import ContentLoader, { type IContentLoaderProps } from 'react-content-loader';

export const CircleLoader: React.FC<IContentLoaderProps> = (props) => {
  return (
    <ContentLoader
      width={36}
      height={36}
      viewBox="0 0 36 36"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      uniqueKey="circle-loader"
      {...props}
    >
      <circle cx="18" cy="18" r="18" />
    </ContentLoader>
  );
};

export const RectangleLoader: React.FC<IContentLoaderProps> = ({ className = '', ...props }) => {
  return (
    <ContentLoader
      height={36}
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
      uniqueKey="rectangle-loader"
      className={`w-[70%] ${className}`}
      {...props}
    >
      <rect x="0" y="10" height="20" className="w-full" />
    </ContentLoader>
  );
};

const TableLoaderRow: React.FC = (props) => {
  return (
    <tr {...props}>
      <td className="p-3">
        <div className="group flex items-center gap-8 transition-opacity hover:opacity-80 sm:gap-4">
          <CircleLoader className="flex-shrink-0" />
          <RectangleLoader className="sm:w-[50%]" />
        </div>
      </td>
      <td className="hidden p-3 lg:table-cell">
        <RectangleLoader />
      </td>
      <td className="hidden p-3 sm:table-cell">
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
