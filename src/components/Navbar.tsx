import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const publicLinks = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/booking", label: "Book Now" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const { user, isAdmin, signOut, loading } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    setOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/90 backdrop-blur-md border-b border-border/60 shadow-sm">
      <div className="container mx-auto flex items-center justify-between h-18 px-4 py-3 fade-in-down">
        <Link to="/" className="font-heading text-2xl font-bold tracking-wide text-foreground">
          Urban <span className="text-accent">.</span>Shave
        </Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-7">
          {publicLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-accent ${
                location.pathname === link.to ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {!loading && user && (
            <>
              <Link
                to="/my-bookings"
                className={`text-sm font-medium tracking-wide transition-all duration-300 hover:text-accent ${
                  location.pathname === "/my-bookings" ? "text-accent" : "text-muted-foreground"
                }`}
              >
                My Bookings
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full border transition-all duration-300 ${
                    location.pathname === "/admin"
                      ? "border-accent text-accent bg-accent/10"
                      : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                  }`}
                >
                  Admin
                </Link>
              )}
              <button onClick={handleSignOut} className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-all duration-300">
                <LogOut size={14} /> Logout
              </button>
            </>
          )}

          {!loading && !user && (
            <Link
              to="/login"
              className="flex items-center gap-1.5 text-sm font-semibold bg-accent text-accent-foreground px-5 py-2.5 rounded-xl btn-scale"
            >
              <User size={14} /> Login
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-foreground" onClick={() => setOpen(!open)}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-card/95 backdrop-blur-md border-b border-border px-4 pb-4 fade-in-up">
          {publicLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className={`block py-2.5 text-sm font-medium tracking-wide transition-colors ${
                location.pathname === link.to ? "text-accent" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          {user && (
            <>
              <Link to="/my-bookings" onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-muted-foreground">
                My Bookings
              </Link>
              {isAdmin && (
                <Link to="/admin" onClick={() => setOpen(false)} className="block py-2.5 text-xs font-semibold uppercase text-muted-foreground">
                  Admin
                </Link>
              )}
              <button onClick={handleSignOut} className="block py-2.5 text-sm font-medium text-muted-foreground">
                Logout
              </button>
            </>
          )}
          {!user && !loading && (
            <Link to="/login" onClick={() => setOpen(false)} className="block py-2.5 text-sm font-semibold text-accent">
              Login / Sign Up
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
