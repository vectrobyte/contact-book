import React from 'react';
import ContentLoader, { type IContentLoaderProps } from 'react-content-loader';

type RectangleSkeletonProps = IContentLoaderProps;

export const RectangleSkeleton: React.FC<RectangleSkeletonProps> = ({
  className = '',
  ...props
}) => {
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

export default RectangleSkeleton;
