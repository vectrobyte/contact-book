import React from 'react';
import ContentLoader, { type IContentLoaderProps } from 'react-content-loader';

type CircleSkeletonProps = IContentLoaderProps;

export const CircleSkeleton: React.FC<CircleSkeletonProps> = (props) => {
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

export default CircleSkeleton;
