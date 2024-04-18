import { FC } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { Trash2Icon } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteProjectById } from "@/data/project";
import { redirect } from "next/navigation";

interface DeleteProjectProps {
  id: string;
}

const DeleteProject: FC<DeleteProjectProps> = ({ id }) => {

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="gap-x-2 w-full">
          <Trash2Icon size={16} /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            project and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
          <form action={async () => {
              "use server"
              await deleteProjectById(id);
              redirect("/admin/projects")
            }}>
        <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            type="submit"
            className={buttonVariants({ variant: "destructive" })}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
          </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};
export default DeleteProject;
