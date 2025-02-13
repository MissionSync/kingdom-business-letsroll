
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container px-4 py-4">
          <Link to="/" className="flex justify-center md:justify-start">
            <img 
              src="/lovable-uploads/85cff93d-8fbb-4fab-b459-c1c9c6ca1e70.png" 
              alt="KBLR Logo" 
              className="h-16 w-auto"
            />
          </Link>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Layout;
