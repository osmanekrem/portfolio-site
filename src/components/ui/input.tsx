import * as React from "react";

import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [show, setShow] = React.useState(false);
    return (
      <div className=" flex h-10 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-sm transition-colors focus-within:ring-1 focus-within:ring-ring">
        <input
          type={type === "password" ? (show ? "text" : "password") : type}
          className={cn(
            "flex flex-1 transition-colors file:border-0 py-2 bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {type === "password" && (
          <button
            type="button"
            className="flex items-center justify-center w-10 h-10 rounded-md bg-transparent text-foreground outline-none focus:outline-none"
            onClick={() => setShow((prev) => !prev)}
          >
            {show ? <EyeOff /> : <Eye />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
