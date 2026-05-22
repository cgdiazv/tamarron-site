export interface Service {
  title: string;
  slug: string;
  excerpt: string;
  image: string;
}

export interface BlogPost {
  title: string;
  slug: string;
  date: string;
  excerpt: string;
  content: string;
  image: string;
}

export const LOCAL_SERVICES: Service[] = [
  {
    title: "Roof Extension",
    slug: "roof-extension",
    excerpt: "Expand your outdoor living space with seamless roof extensions that blend perfectly with your home's architecture.",
    image: "/roof-extension.webp"
  },
  {
    title: "Pergolas & Gazebos",
    slug: "pergolas-gazebos",
    excerpt: "Custom-designed wooden and synthetic structures providing the perfect balance of shade and style for your backyard.",
    image: "/pergolas.webp"
  },
  {
    title: "Concrete Job",
    slug: "concrete-job",
    excerpt: "Professional concrete pouring and finishing for driveways, patios, and walkways built to last.",
    image: "/concrete-job.webp"
  },
  {
    title: "Stamped Concrete",
    slug: "stamped-concrete",
    excerpt: "Decorative concrete solutions that mimic the look of stone, brick, or wood with superior durability.",
    image: "/stamped-concrete.webp"
  },
  {
    title: "Spray Decks",
    slug: "spray-decks",
    excerpt: "Cool-decking solutions perfect for pool areas, offering slip-resistant surfaces and beautiful textures.",
    image: "/spray-decks.webp"
  },
  {
    title: "Pavers",
    slug: "pavers",
    excerpt: "Elegant interlocking pavers for sophisticated patios and paths, available in various colors and patterns.",
    image: "/pavers.webp"
  },
  {
    title: "Outdoor Kitchen",
    slug: "outdoor-kitchen",
    excerpt: "Fully functional outdoor cooking spaces equipped with high-end appliances and custom masonry.",
    image: "/outdoor-kitchen.webp"
  },
  {
    title: "Motorized Screens",
    slug: "motorized-screens",
    excerpt: "Retractable power screens that protect your patio from insects and sun at the touch of a button.",
    image: "/motorized-screens.webp"
  },
  {
    title: "Gutters",
    slug: "gutters",
    excerpt: "High-quality gutter systems designed to protect your home and outdoor living areas from water damage.",
    image: "/gutters.webp"
  },
  {
    title: "Fences",
    slug: "fences",
    excerpt: "Secure and stylish fencing options to provide privacy and define your outdoor boundaries.",
    image: "/fences.webp"
  },
  {
    title: "Retaining Walls",
    slug: "retaining-walls",
    excerpt: "Structural and decorative retaining walls built to manage slopes and add dimension to your landscape.",
    image: "/retaining-walls.webp"
  },
  {
    title: "Landscape Lights",
    slug: "landscape-lights",
    excerpt: "Custom lighting solutions to enhance the beauty and safety of your outdoor spaces after dark.",
    image: "/landscape-lights.webp"
  },
  {
    title: "French Drains",
    slug: "french-drains",
    excerpt: "Effective drainage solutions to prevent standing water and protect your property's foundation.",
    image: "/french-drains.webp"
  },
  {
    title: "Pools",
    slug: "pools",
    excerpt: "Complete pool design and construction to turn your backyard into a luxury private resort.",
    image: "/pools.webp"
  },
  {
    title: "Grass",
    slug: "grass",
    excerpt: "Premium sod installation and lawn solutions for a lush, green, and healthy backyard.",
    image: "/grass.webp"
  },
  {
    title: "General Construction",
    slug: "general-construction",
    excerpt: "Comprehensive construction services for all your outdoor living and structural home improvement needs.",
    image: "/general-construction.webp"
  }
];

// Al final de tu archivo lib/data.ts, asegúrate de mantener esto:
export const LOCAL_POSTS = [];