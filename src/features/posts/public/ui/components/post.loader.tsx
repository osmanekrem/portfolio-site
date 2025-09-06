import React from "react";

export default function PostLoader() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className="w-full h-full bg-gray-200 animate-pulse" />
      ))}
    </div>
  );
}
