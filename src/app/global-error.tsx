"use client";

import { Button } from "@/components/ui/button";
import { RotateCcwIcon } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col max-w-screen-sm items-center">
            <h2 className="font-black text-6xl text-center mb-6">
              Something went wrong!
            </h2>
            <Button size="lg" onClick={() => reset()}>
              <RotateCcwIcon className="mr-2 size-6" /> Try Again
            </Button>
          </div>
        </div>
      </body>
    </html>
  );
}
