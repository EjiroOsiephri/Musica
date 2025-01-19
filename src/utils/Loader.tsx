import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export const GeminiSkeletonLoader = () => {
  const [shouldShow, setShouldShow] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldShow(true), 300); // Show after 300ms
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (!shouldShow) return null;

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
