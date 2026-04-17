import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center fade-in-up">
        <h1 className="mb-3 text-7xl font-heading font-bold text-accent">404</h1>
        <p className="mb-6 text-xl text-muted-foreground">Oops! Page not found</p>
        <Link to="/" className="inline-flex items-center bg-accent text-accent-foreground px-6 py-3 text-sm font-semibold rounded-xl btn-scale">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
