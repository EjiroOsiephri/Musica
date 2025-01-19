import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Optional: Include the styles

export const GeminiSkeletonLoader = () => {
  return (
    <div className="flex space-x-4 overflow-x-scroll scrollbar-hide">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="shrink-0 w-[150px]">
          <Skeleton height={150} width={150} borderRadius={8} />
          <Skeleton width={100} height={20} className="mt-2" />
          <Skeleton width={80} height={16} />
        </div>
      ))}
    </div>
  );
};
