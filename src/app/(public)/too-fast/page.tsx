import React from "react";

export default function TooFastPage() {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="container py-6 flex flex-col items-center justify-center flex-1">
        <div className="flex flex-col items-center justify-center w-full max-w-xs rounded-lg">
          <h1 className="text-4xl font-bold text-center">Too Fast</h1>
          <p className="text-gray-500 text-lg text-center mt-2">
            You're moving too fast. Slow down.
          </p>
        </div>
      </div>
    </div>
  );
}
