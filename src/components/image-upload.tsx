"use client";

import config from "@/lib/config";
import React, { useRef, useState } from "react";
import { ImageKitProvider, IKImage, IKUpload } from "imagekitio-next";
import { cn } from "@/lib/utils";
import { buttonVariants } from "./ui/button";
import { UploadCloudIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const {
  env: {
    imagekit: { publicKey, urlEndpoint },
  },
} = config;

const authenticator = async () => {
  try {
    const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Request failed with status ${response.status}: ${errorText}`
      );
    }

    const data = await response.json();
    const { token, signature, expire } = data;

    return { token, signature, expire };
  } catch (error: any) {
    throw new Error(`Authentication failed: ${error.message}`);
  }
};

export default function ImageUpload({
  onFileChange,
}: {
  onFileChange: (filepath: string) => void;
}) {
  const ikUploadRef = useRef(null);
  const [file, setFile] = useState<{ filepath: string } | null>(null);

  const onError = (error: any) => {
    console.error("Error uploading file: ", error);

    toast({
      title: "Error uploading file",
      description: "Your file could not be uploaded",
      variant: "destructive",
    });
  };
  const onSuccess = (res: any) => {
    setFile(res);
    onFileChange(res.filepath);

    toast({
      title: "Image uploaded successfully",
      description: `${res.filepath} uploaded successfully`,
    });
  };

  return (
    <ImageKitProvider
      publicKey={publicKey}
      urlEndpoint={urlEndpoint}
      authenticator={authenticator}
    >
      <IKUpload
        ref={ikUploadRef}
        className="hidden"
        onError={onError}
        onSuccess={onSuccess}
        fileName="test-uplaod.png"
      />

      <button
        className={cn(buttonVariants())}
        type="button"
        onClick={(e) => {
          e.preventDefault();

          if (ikUploadRef.current) {
            // @ts-ignore
            ikUploadRef.current?.click();
          }
        }}
      >
        <UploadCloudIcon className="w-6 h-6" />
        <span>Upload Image</span>
      </button>

      {file && (
        <IKImage
          alt={file.filepath}
          src={file.filepath}
          width={500}
          height={300}
        />
      )}
    </ImageKitProvider>
  );
}
