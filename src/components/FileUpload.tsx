import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, File as FileIcon, CheckCircle2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface FileWithPreview extends File {
  preview?: string;
}

const FileUpload = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles((prev) => [
      ...prev,
      ...acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      ),
    ]);

    // Simulate upload progress for each file
    acceptedFiles.forEach((file) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += 5;
        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: progress,
        }));
        if (progress >= 100) clearInterval(interval);
      }, 100);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
      "application/pdf": [],
      "application/msword": [],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [],
    },
  });

  const removeFile = (name: string) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[name];
      return newProgress;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 transition-all duration-200 ease-in-out",
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-gray-300 hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          <Upload
            className={cn(
              "w-12 h-12 transition-colors duration-200",
              isDragActive ? "text-primary" : "text-gray-400"
            )}
          />
          <div className="text-center">
            <p className="text-lg font-medium">
              {isDragActive
                ? "Drop files here"
                : "Drag & drop files here, or click to select"}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              Supports images, PDFs, and Word documents
            </p>
          </div>
        </div>
      </div>

      {files.length > 0 && (
        <div className="mt-8 space-y-4">
          {files.map((file) => (
            <div
              key={file.name}
              className="flex items-center gap-4 p-4 bg-accent/50 rounded-lg"
            >
              <div className="shrink-0">
                {file.type.startsWith("image/") ? (
                  <img
                    src={file.preview}
                    alt={file.name}
                    className="w-10 h-10 object-cover rounded"
                  />
                ) : (
                  <FileIcon className="w-10 h-10 text-primary" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(file.size)}
                </p>
                <div className="mt-2">
                  <Progress
                    value={uploadProgress[file.name] || 0}
                    className="h-1"
                  />
                </div>
              </div>
              <div className="shrink-0">
                {uploadProgress[file.name] === 100 ? (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(file.name);
                    }}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FileUpload;