import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const GeminiSkeletonLoader = () => {
  return (
    <div className="flex flex-col items-center space-y-2 opacity-90">
      <Skeleton
        height={150}
        width={150}
        borderRadius={8}
        baseColor="#1e293b"
        highlightColor="#475569"
      />

      <Skeleton
        width={100}
        height={20}
        baseColor="#1e293b"
        highlightColor="#475569"
      />

      <Skeleton
        width={80}
        height={16}
        baseColor="#1e293b"
        highlightColor="#475569"
      />
    </div>
  );
};
