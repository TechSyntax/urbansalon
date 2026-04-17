import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-accent font-body text-xs font-semibold uppercase tracking-[0.25em] mb-3">Reach Out</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            Have questions? We'd love to hear from you. Visit us or get in touch below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Info */}
          <div className="space-y-6 fade-in-up delay-100">
            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-heading text-xl font-semibold mb-6">Get In Touch</h2>
              <div className="space-y-5">
                {[
                  { icon: MapPin, label: "Address", value: "A - 96, G/F, Pandav Nagar, Delhi-110092" },
                  { icon: Phone, label: "Phone", value: "938-123-4567" },
                  { icon: Mail, label: "Email", value: "hello@urbanshave.com" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-accent/15 flex-shrink-0 mt-0.5">
                      <item.icon size={18} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold mb-0.5">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-2xl p-8">
              <h2 className="font-heading text-xl font-semibold mb-6 flex items-center gap-2">
                <Clock size={18} className="text-accent" /> Business Hours
              </h2>
              <div className="space-y-3 text-sm">
                {[
                  { day: "Monday – Friday", hours: "9:00 AM – 10:00 PM" },
                  { day: "Saturday", hours: "9:00 AM – 7:00 PM" },
                  { day: "Sunday", hours: "10:00 AM – 7:00 PM" },
                ].map((item) => (
                  <div key={item.day} className="flex justify-between py-2 border-b border-border/50 last:border-0">
                    <span className="text-muted-foreground">{item.day}</span>
                    <span className="font-semibold">{item.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="bg-card border border-border rounded-2xl overflow-hidden fade-in-up delay-200">
            <iframe
              title="Salon Location"
              src="https://www.google.com/maps?q=Hair+Studio+Unisex+Salon+Pandav+Nagar+Delhi&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: 400 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
