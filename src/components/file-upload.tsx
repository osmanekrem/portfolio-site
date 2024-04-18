import { UploadDropzone } from "@/lib/uploadthing";
import { FC } from "react";

import "@uploadthing/react/styles.css";
import { toast } from "sonner";
import { UploadThingError } from "uploadthing/server";
import { Json } from "@uploadthing/shared";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";

interface FileUploadProps {
  onChange: (url?: string) => void;
  value: string;
  endpoint: "projectImage";
  className?: string
  imageClass?: string
}

const FileUpload: FC<FileUploadProps> = ({ onChange, value, endpoint, className,imageClass }) => {
  if (value) {
    return (
      <div className={cn(className,"relative w-full overflow-hidden h-full")}>
        <Image
          fill
          className={cn(imageClass,"object-cover transition-transform hover:scale-105")}
          alt={value}
          src={value}
        />
        <button type="button" className="bg-destructive text-white rounded-full flex items-center justify-center h-6 w-6 absolute top-0 right-0" onClick={() => onChange("")}>
            <XIcon size={16}/>
        </button>
      </div>
    );
  }

  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error: UploadThingError<Json>) => {
        toast.error(error.message);
      }}
    />
  );
};
export default FileUpload;
