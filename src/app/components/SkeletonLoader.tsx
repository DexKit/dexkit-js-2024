import React from 'react';

interface SkeletonLoaderProps {
  type?: 'text' | 'image' | 'title';
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ type = 'text' }) => {
  switch (type) {
    case 'image':
      return <div className="h-48 bg-gray-200 rounded w-full mb-4"></div>;
    case 'title':
      return <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>;
    default:
      return (
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      );
  }
};

export default SkeletonLoader;