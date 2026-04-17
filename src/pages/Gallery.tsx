import galleryImg1 from "@/assets/Barbería interior.jpg";
import galleryImg2 from "@/assets/hero-image1.jpg";
import heroImg from "@/assets/hero-image1.jpg";
import serviceImg1 from "@/assets/gallery1.jpg";
import serviceImg2 from "@/assets/gallery2.jpg";
import serviceImg3 from "@/assets/gallery3.jpg";

const images = [
  { src: heroImg, alt: "Salon interior" },
  { src: serviceImg1, alt: "Hair styling" },
  { src: serviceImg2, alt: "Skincare products" },
  { src: galleryImg1, alt: "Salon lounge" },
  { src: serviceImg3, alt: "Nail care" },
  { src: galleryImg2, alt: "Hair products" },
];

export default function Gallery() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 fade-in-up">
          <p className="text-accent font-body text-xs font-semibold uppercase tracking-[0.25em] mb-3">Our Work</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Gallery</h1>
          <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
            A glimpse into the Urban Shave Salon experience.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {images.map((img, i) => (
            <div key={i} className="aspect-[4/3] overflow-hidden rounded-2xl bg-muted hover-lift group">
              <img
                src={img.src}
                alt={img.alt}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
