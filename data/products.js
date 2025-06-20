class Product {
  constructor(productDetails) {
    this.productState = productDetails.productState;
    this.discount = productDetails.discount;
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.galleryImages = productDetails.galleryImages || [productDetails.image];
    this.name = productDetails.name;
    this.priceCents = productDetails.priceCents;
    this.oldpriceCents = productDetails.oldpriceCents;
    this.rating = productDetails.rating;
    this.category = productDetails.category;
    this.description = productDetails.description;
    this.inStock = productDetails.inStock ?? true;
  }
}

export const products = [
  {
    productState: `product`,
    discount: `-40%`,
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: "images/products/G92 500x500.webp",
    galleryImages: [
      "images/products/mainImage 63 from Figma.png",
      "images/products/G92 500x500.webp",
      "images/products/Image 58 (1).png",
      "images/products/Image 59 from Figma.png",
    ],
    name: "HAVIT HV-G92 Gamepad",
    priceCents: 12000,
    oldpriceCents: 16000,
    rating: {
      stars: 5,
      count: 88,
    },
    category: "Gaming",
    description:
      "High-quality gaming controller with ergonomic design, responsive buttons, and precise analog sticks. Perfect for PC and console gaming with customizable RGB lighting and programmable buttons.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: `-35%`,
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: "images/products/E Commerce Website UI Design.webp",
    galleryImages: [
      "images/products/E Commerce Website UI Design.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "AK-900 Wired Keyboard",
    priceCents: 96000,
    oldpriceCents: 116000,
    rating: {
      stars: 4,
      count: 75,
    },
    category: "Computers",
    description:
      "Mechanical gaming keyboard with RGB backlighting, anti-ghosting keys, and ergonomic wrist rest. Features customizable macro keys and durable construction for long-lasting performance.",
    inStock: false,
  },
  {
    productState: `newproduct`,
    discount: `NEW`,
    id: "bc2847e9-5323-403f-b7cf-57fde044a955",
    image: "images/products/Mercedes Benz GTR Electric Toy Car.webp",
    galleryImages: [
      "images/products/Mercedes Benz GTR Electric Toy Car.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "Kids Electric Car",
    priceCents: 96000,
    oldpriceCents: null,
    rating: {
      stars: 5,
      count: 65,
    },
    category: "Gaming",
    description:
      "Realistic electric toy car inspired by Mercedes-Benz GTR. Features working headlights, horn, MP3 player, and remote control. Safe and durable design for children ages 3-8.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: `-30%`,
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: "images/products/E Commerce Website Design.webp",
    galleryImages: [
      "images/products/E Commerce Website Design.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "IPS LCD Gaming Monitor",
    priceCents: 37000,
    oldpriceCents: 40000,
    rating: {
      stars: 5,
      count: 99,
    },
    category: "Computers",
    description:
      "27-inch IPS gaming monitor with 144Hz refresh rate and 1ms response time. Features HDR support, AMD FreeSync, and adjustable stand for optimal viewing angles.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: `-25%`,
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: "images/products/E Commerce Website Design2.webp",
    galleryImages: [
      "images/products/E Commerce Website Design2.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "S-Series Comfort Chair",
    priceCents: 37500,
    oldpriceCents: 40000,
    rating: {
      stars: 2.5,
      count: 30,
    },
    category: "Computers",
    description:
      "Ergonomic office chair with adjustable lumbar support, breathable mesh back, and 4D armrests. Perfect for long gaming or work sessions with maximum comfort.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "10ed8504-57db-433c-b0a3-fc71a35c88a1",
    image: "images/products/Smart Watch Category.webp",
    galleryImages: [
      "images/products/Smart Watch Category.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "Small BookSelf",
    priceCents: 36000,
    oldpriceCents: null,
    rating: {
      stars: 2,
      count: 30,
    },
    category: "SmartHome",
    description:
      "Compact bookshelf with 3 adjustable shelves and modern design. Made from high-quality MDF with a durable finish. Perfect for small spaces and organizing books or decorative items.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "aaa65ef3-8d6f-4eb3-bc9b-a6ea49047d8f",
    image: "images/products/North Face Gucci Coat 1.webp",
    galleryImages: [
      "images/products/North Face Gucci Coat 1.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "The north coat",
    priceCents: 26000,
    oldpriceCents: 36000,
    rating: {
      stars: 3.5,
      count: 65,
    },
    category: "Clothing",
    description:
      "Premium winter coat with water-resistant outer shell and thermal insulation. Features multiple pockets, adjustable hood, and stylish design. Perfect for extreme weather conditions.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "36c64692-677f-4f58-b5ec-0dc2cf109e27",
    image: "images/products/Gucci Savoy Medium Duffle Bag.webp",
    galleryImages: [
      "images/products/Gucci Savoy Medium Duffle Bag.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "Gucci duffle bag",
    priceCents: 96000,
    oldpriceCents: 116000,
    rating: {
      stars: 4,
      count: 75,
    },
    category: "Accessories",
    description:
      "Luxury duffle bag made from premium materials with signature Gucci design. Features spacious interior, multiple compartments, and comfortable shoulder strap. Perfect for travel and everyday use.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "77a845b1-16ed-4eac-bdf9-5b591882113d",
    image: "images/products/Gammaxx L240 ARGB.webp",
    galleryImages: [
      "images/products/Gammaxx L240 ARGB.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "RGB liquid CPU Cooler",
    priceCents: 16000,
    oldpriceCents: 17000,
    rating: {
      stars: 5,
      count: 99,
    },
    category: "Computers",
    description:
      "High-performance liquid CPU cooler with ARGB lighting and dual 120mm fans. Features efficient heat dissipation, quiet operation, and easy installation. Compatible with most CPU sockets.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "8a53b080-6d40-4a65-ab26-b24ecf700bce",
    image: "images/products/E Commerce Website Design3.webp",
    galleryImages: [
      "images/products/E Commerce Website Design3.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "Breed Dry Dog Food",
    priceCents: 10000,
    oldpriceCents: null,
    rating: {
      stars: 2,
      count: 35,
    },
    category: "Pets",
    description:
      "Premium dry dog food made with high-quality ingredients. Contains essential nutrients, vitamins, and minerals for your dog's health. Suitable for adult dogs of all breeds.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "02e3a47e-dd68-467e-9f71-8bf6f723fdae",
    image: "images/products//EOS 250D UI Design.webp",
    galleryImages: [
      "images/products//EOS 250D UI Design.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "CANON EOS DSLR Camera",
    priceCents: 36000,
    oldpriceCents: null,
    rating: {
      stars: 4,
      count: 95,
    },
    category: "Camera",
    description:
      "Professional DSLR camera with 24.1MP sensor and 4K video recording. Features advanced autofocus, built-in WiFi, and vari-angle touchscreen. Perfect for photography enthusiasts.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "0d7f9afa-2efe-4fd9-b0fd-ba5663e0a524",
    image: "images/products/IdeaPad Gaming 3i Design.webp",
    galleryImages: [
      "images/products/IdeaPad Gaming 3i Design.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "ASUS FHD Gaming Laptop",
    priceCents: 70000,
    oldpriceCents: null,
    rating: {
      stars: 5,
      count: 325,
    },
    category: "Computers",
    description:
      "Powerful gaming laptop with high-performance processor and dedicated graphics card. Features 15.6-inch FHD display, RGB keyboard, and advanced cooling system. Perfect for gaming and content creation.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "d37a651a-d501-483b-aae6-a9659b0757a0",
    image: "images/products/curology-j7pKVQrTUsM-unsplash 1.webp",
    galleryImages: [
      "images/products/curology-j7pKVQrTUsM-unsplash 1.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "Curology Product Set",
    priceCents: 50000,
    oldpriceCents: null,
    rating: {
      stars: 4.5,
      count: 145,
    },
    category: "Beauty",
    description:
      "Complete skincare set with custom-formulated products for your skin type. Includes cleanser, treatment, and moisturizer. Clinically proven to improve skin health and appearance.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "d339adf3-e004-4c20-a120-40e8874c66cb",
    image: "images/products/Copa Sense UI Design.webp",
    galleryImages: [
      "images/products/Copa Sense UI Design.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "Jr. Zoom Soccer Cleats",
    priceCents: 116000,
    oldpriceCents: null,
    rating: {
      stars: 5,
      count: 35,
    },
    category: "Sports",
    description:
      "Professional soccer cleats with advanced traction and comfort features. Made from lightweight, durable materials with responsive cushioning. Perfect for young athletes and soccer enthusiasts.",
    inStock: true,
  },
  {
    productState: `newproduct`,
    discount: `NEW`,
    id: "a45cfa0a-66d6-4dc7-9475-e2b01595f7d7",
    image: "images/products/E Commerce Website Design (1).webp",
    galleryImages: [
      "images/products/E Commerce Website Design (1).webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "GP11 Shooter USB Gamepad",
    priceCents: 66000,
    oldpriceCents: null,
    rating: {
      stars: 5,
      count: 55,
    },
    category: "Gaming",
    description:
      "Professional gaming controller with customizable buttons and RGB lighting. Features precise analog sticks, responsive triggers, and ergonomic design. Compatible with PC and major gaming consoles.",
    inStock: true,
  },
  {
    productState: `product`,
    discount: null,
    id: "a434b69f-1bc1-482d-9ce7-cd7f4a66ce8d",
    image: "images/products/Light Reversible Quilted Satin Jacket.webp",
    galleryImages: [
      "images/products/Light Reversible Quilted Satin Jacket.webp",
      "images/products/mainImage 63 from Figma.png",
      "images/products/Image 58 (1).png",
      "images/products/Image 61 from Figma.png",
    ],
    name: "Quilted Satin Jacket",
    priceCents: 66000,
    oldpriceCents: null,
    rating: {
      stars: 3.5,
      count: 55,
    },
    category: "Clothing",
    description:
      "Elegant reversible jacket made from premium satin material. Features quilted design, comfortable fit, and versatile style. Perfect for both casual and formal occasions.",
    inStock: true,
  },
].map((productDetails) => {
  return new Product(productDetails);
});

export function getProduct(productId) {
  let matchingItems;
  products.forEach((product) => {
    if (productId === product.id) {
      matchingItems = product;
    }
  });
  return matchingItems;
}
