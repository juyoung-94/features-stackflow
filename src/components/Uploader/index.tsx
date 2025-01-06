"use client";
import React, { useEffect, useRef } from "react";
import Button from "../Button";
import useModal from "../Modal/useModal";
import { useAppSelector } from "@/libs";

interface Props {
  children: React.ReactNode;
  onFileChange: (files: File[]) => void;
  isMultiple?: boolean;
  disable?: boolean;
  fileType?: "image/*" | "audio/*" | "video/*";
}

export default function Uploader({
  children,
  isMultiple = false,
  disable = false,
  fileType = "image/*",
  onFileChange,
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { files } = useAppSelector((state) => state.app.response);
  const { onUploadModal } = useModal();

  useEffect(() => {
    const filesHandler = async () => {
      const appFiles: File[] = [];
      for await (const file of files) {
        const blob = await (await fetch(file)).blob();
        const blobToFile = new File([blob], "fileName", {
          lastModified: new Date().getTime(),
          type: blob.type,
        });
        appFiles.push(blobToFile);
      }
      onFileChange(appFiles);
    };
    if (files.length > 0) {
      filesHandler();
    }
  }, [files]);

  return (
    <Button
      onClick={async () => {
        if (!disable) {
          onUploadModal({ isMultiple, ref: fileInputRef });
        }
      }}
      activeStyle={{ opacity: 0.3 }}
    >
      {children}
      <input
        type="file"
        ref={fileInputRef}
        multiple={true}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            const webFiles = Array.from(e.target.files);
            onFileChange(webFiles);
          }
        }}
        accept={fileType}
        style={{ display: "none" }}
      />
    </Button>
  );
}
