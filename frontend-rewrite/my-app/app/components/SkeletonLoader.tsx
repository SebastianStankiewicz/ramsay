"use client";

export function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl animate-pulse">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-4" />
      <div className="h-10 bg-gray-200 rounded w-1/2 mb-6" />
      <div className="h-48 bg-gray-200 rounded-xl mb-4" />
      <div className="h-4 bg-gray-200 rounded w-1/4 mx-auto" />
    </div>
  );
}

export function SkeletonText({ width = "w-full", height = "h-4" }: { width?: string; height?: string }) {
  return <div className={`${width} ${height} bg-gray-200 rounded animate-pulse`} />;
}
