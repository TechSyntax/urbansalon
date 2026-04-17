import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <h3 className="font-heading text-2xl font-bold mb-4">
              Urban <span className="text-accent">.</span>Shave
            </h3>
            <p className="text-sm opacity-70 leading-relaxed max-w-xs">
              Your neighborhood salon for premium hair, skin, and nail care.
              We believe everyone deserves to feel beautiful.
            </p>
          </div>

          <div>
            <h4 className="font-body font-semibold text-xs uppercase tracking-[0.2em] mb-5 text-accent">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link to="/services" className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all duration-300">Services</Link>
              <Link to="/booking" className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all duration-300">Book Appointment</Link>
              <Link to="/gallery" className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all duration-300">Gallery</Link>
              <Link to="/contact" className="text-sm opacity-70 hover:opacity-100 hover:text-accent transition-all duration-300">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="font-body font-semibold text-xs uppercase tracking-[0.2em] mb-5 text-accent">Get In Touch</h4>
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 text-sm opacity-70">
                <MapPin size={16} className="text-accent flex-shrink-0" /> A - 96, G/F, Pandav Nagar, Delhi-110092
              </div>
              <div className="flex items-center gap-3 text-sm opacity-70">
                <Phone size={16} className="text-accent flex-shrink-0" />  938-123-4567
              </div>
              <div className="flex items-center gap-3 text-sm opacity-70">
                <Mail size={16} className="text-accent flex-shrink-0" /> hello@urbanshave.com
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/10 mt-10 pt-6 text-center">
          <p className="text-xs opacity-40">© 2026 Urban Shave Salon. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
