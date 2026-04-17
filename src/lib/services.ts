import serviceImg1 from "@/assets/womenhaircutting2.jpg";
import serviceImg2 from "@/assets/menhaircutting.jpg";
import serviceImg3 from "@/assets/haircoloring.jpg";
import serviceImg5 from "@/assets/manicure.jpg";
import serviceImg6 from "@/assets/pedicure.jpg";
import serviceImg7 from "@/assets/skinfacial.jpg";
import serviceImg8 from "@/assets/antiaging-facial.jpg";
import serviceImg9 from "@/assets/spa.jpg";

export interface SalonService {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  image: string;
  category: string;
}

export const services: SalonService[] = [
  {
    id: "1",
    name: "Women's Haircut & Style",
    description: "Professional cut and blowout tailored to your face shape and lifestyle.",
    price: 200,
    duration: "60 min",
    image: serviceImg1,
    category: "Hair",
  },
  {
    id: "2",
    name: "Men's Haircut",
    description: "Clean, classic or modern cut with hot towel finish.",
    price: 150,
    duration: "30 min",
    image: serviceImg2,
    category: "Hair",
  },
  {
    id: "3",
    name: "Hair Coloring",
    description: "Full color, highlights, or balayage by our expert colorists.",
    price: 350,
    duration: "120 min",
    image: serviceImg3,
    category: "Hair",
  },
  {
    id: "4",
    name: "Classic Facial",
    description: "Deep cleanse, exfoliation, and hydration for glowing skin.",
    price: 300,
    duration: "60 min",
    image: serviceImg7,
    category: "Skin",
  },
  {
    id: "5",
    name: "Anti-Aging Facial",
    description: "Advanced treatment with collagen boost and firming massage.",
    price: 400,
    duration: "75 min",
    image: serviceImg8,
    category: "Skin",
  },
  {
    id: "6",
    name: "Manicure",
    description: "Nail shaping, cuticle care, and polish of your choice.",
    price: 250,
    duration: "30 min",
    image: serviceImg5,
    category: "Nails",
  },
  {
    id: "7",
    name: "Pedicure",
    description: "Relaxing foot soak, exfoliation, and nail care.",
    price: 290,
    duration: "45 min",
    image: serviceImg6,
    category: "Nails",
  },
  {
    id: "8",
    name: "Spa Package",
    description: "Full body massage, facial, and manicure — the ultimate relaxation.",
    price: 500,
    duration: "180 min",
    image: serviceImg9,
    category: "Spa",
  },
];
