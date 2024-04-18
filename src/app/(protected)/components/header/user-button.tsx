import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import React from "react";

export default function UserButton() {
  return (
    <form
      action={async () => {
        "use server";

        await signOut();
      }}
    >
      <Button variant="outline" className="gap-x-2 flex items-center" type="submit"><LogOutIcon size={16} /> Sign Out</Button>
    </form>
  );
}
