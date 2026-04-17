import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { services } from "@/lib/services";

export default function Services() {
  const categories = [...new Set(services.map((s) => s.category))];

  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-accent font-body text-xs font-semibold uppercase tracking-[0.25em] mb-3">Our Menu</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Services</h1>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
          Modern grooming, tailored for you.  
Clean, precise, and professionally delivered.
          </p>
        </div>

        {categories.map((cat) => (
          <div key={cat} className="mb-16">
            <h2 className="font-heading text-2xl font-semibold mb-8 pb-3 border-b border-border">{cat}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services
                .filter((s) => s.category === cat)
                .map((service) => (
                  <div key={service.id} className="bg-card border border-border rounded-2xl overflow-hidden hover-lift">
                    <div className="aspect-[3/2] overflow-hidden">
                      <img
                        src={service.image}
                        alt={service.name}
                        loading="lazy"
                        width={800}
                        height={800}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-lg font-semibold">{service.name}</h3>
                        <span className="text-accent font-bold text-lg">₹{service.price}</span>
                      </div>
                      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{service.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-muted-foreground font-medium bg-muted px-3 py-1 rounded-full">{service.duration}</span>
                        <Link
                          to="/booking"
                          className="text-accent text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-3 transition-all duration-300"
                        >
                          Book <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
