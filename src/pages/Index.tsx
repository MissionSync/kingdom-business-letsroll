import FileUpload from "@/components/FileUpload";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold tracking-tight">File Upload</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Drag and drop your files to upload
          </p>
        </div>
        <FileUpload />
      </div>
    </div>
  );
};

export default Index;