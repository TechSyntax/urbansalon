import { Link } from "react-router-dom";
import { ArrowRight, Clock, Scissors, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-image1.jpg";
import serviceImg1 from "@/assets/menhaircutting2.jpg";
import serviceImg2 from "@/assets/skinfacial.jpg";
import serviceImg3 from "@/assets/manicure.jpg";

const featuredServices = [
  { title: "Hair Styling", desc: "Expert cuts, color, and styling for every occasion.", image: serviceImg1 },
  { title: "Skin Care", desc: "Facials and treatments for radiant, healthy skin.", image: serviceImg2 },
  { title: "Nail Care", desc: "Manicures, pedicures, and nail art by professionals.", image: serviceImg3 },
];

export default function Index() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Luxe Salon interior" className="w-full h-full object-cover" width={1920} height={900} />
          <div className="absolute inset-0 bg-gradient-to-r from-salon-dark/70 via-salon-dark/40 to-transparent" />
        </div>
        <div className="relative container mx-auto px-4">
          <div className="max-w-xl fade-in-up">
            <p className="text-accent font-body text-sm font-semibold uppercase tracking-[0.25em] mb-4">MODERN GROOMING EXPERIENCE</p>
            <h1 className="font-heading text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6">
             Refined Style.  Effortless Confidence.
            </h1>
            <p className="text-white/70 text-lg mb-10 font-body leading-relaxed max-w-md">
             Premium hair, skin, and grooming services designed for a sharp, modern look.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/booking"
                className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-8 py-4 text-sm font-semibold tracking-wide rounded-xl btn-scale"
              >
                Book Appointment <ArrowRight size={16} />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-4 text-sm font-semibold tracking-wide hover:bg-white/10 transition-all duration-300 rounded-xl"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Us */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 fade-in-up">
            <p className="text-accent font-body text-xs font-semibold uppercase tracking-[0.25em] mb-3">Why Choose Us</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold">The Urban Difference</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: Scissors, title: "Expert Stylists", desc: "Our team brings years of experience and ongoing training." },
              { icon: Sparkles, title: "Premium Products", desc: "We use only professional-grade, cruelty-free products." },
              { icon: Clock, title: "Easy Booking", desc: "Book online in seconds — no calls, no waiting." },
            ].map((item, i) => (
              <div key={item.title} className={`text-center p-8 rounded-2xl bg-background border border-border hover-lift fade-in-up delay-${(i + 1) * 100}`}>
                <div className="w-14 h-14 mx-auto mb-5 flex items-center justify-center rounded-2xl bg-accent/15">
                  <item.icon size={24} className="text-accent" />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-3">{item.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-accent font-body text-xs font-semibold uppercase tracking-[0.25em] mb-3">What We Offer</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold mb-4">Our Services</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              From a quick trim to a full spa day — we've got you covered.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {featuredServices.map((s) => (
              <div key={s.title} className="group overflow-hidden rounded-2xl bg-card border border-border hover-lift">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={s.title}
                    loading="lazy"
                    width={800}
                    height={800}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-heading text-xl font-semibold mb-2">{s.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4 leading-relaxed">{s.desc}</p>
                  <Link to="/services" className="text-accent text-sm font-semibold inline-flex items-center gap-1.5 hover:gap-3 transition-all duration-300">
                    Learn more <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground">
        <div className="container mx-auto px-4 text-center">
          <p className="text-accent font-body text-xs font-semibold uppercase tracking-[0.25em] mb-4">Ready?</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-background mb-5">
            Ready for a Fresh Look?
          </h2>
          <p className="text-background/60 mb-10 max-w-md mx-auto leading-relaxed">
            Book your appointment today and let our professionals take care of the rest.
          </p>
          <Link
            to="/booking"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-10 py-4 text-sm font-semibold tracking-wide rounded-xl btn-scale"
          >
            Book Now <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  );
}
