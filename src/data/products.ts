export interface Product {
  id: number
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  rating: number
  reviews: number
  description: string
  features: string[]
  badge?: string
  stock: number
  sizes?: string[]
  colors?: { name: string; hex: string }[]
}

export const products: Product[] = [
  {
    id: 1,
    name: "Minimal Wireless Earbuds",
    price: 89,
    originalPrice: 119,
    image: "/product-1.jpg",
    category: "Electronics",
    rating: 4.8,
    reviews: 234,
    description: "Premium wireless earbuds with active noise cancellation, 30-hour battery life, and crystal-clear sound. Designed for all-day comfort with a sleek, minimal aesthetic.",
    features: ["Active Noise Cancellation", "30-hour battery life", "IPX4 water resistance", "Bluetooth 5.3"],
    badge: "Best Seller",
    stock: 45
  },
  {
    id: 2,
    name: "Ceramic Pour-Over Set",
    price: 45,
    image: "/product-2.jpg",
    category: "Home & Living",
    rating: 4.9,
    reviews: 156,
    description: "Handcrafted ceramic pour-over coffee dripper with a matte black finish. Includes 50 paper filters. Perfect for the coffee enthusiast who values ritual and design.",
    features: ["Handcrafted ceramic", "Matte black finish", "Includes 50 filters", "Dishwasher safe"],
    badge: "New",
    stock: 18
  },
  {
    id: 3,
    name: "Linen Everyday Tote",
    price: 65,
    image: "/product-3.jpg",
    category: "Fashion",
    rating: 4.7,
    reviews: 189,
    description: "A versatile everyday tote made from 100% European linen. Spacious interior with a secure inner pocket. Naturally breathable and gets softer with each wash.",
    features: ["100% European linen", "Inner secure pocket", "Reinforced handles", "Machine washable"],
    stock: 32,
    colors: [
      { name: "Natural", hex: "#E8DCC4" },
      { name: "Charcoal", hex: "#4A4A4A" },
      { name: "Olive", hex: "#6B7B3A" }
    ]
  },
  {
    id: 4,
    name: "Smart Water Bottle",
    price: 55,
    originalPrice: 75,
    image: "/product-4.jpg",
    category: "Electronics",
    rating: 4.6,
    reviews: 312,
    description: "Insulated stainless steel bottle with LED temperature display and hydration reminders. Keeps drinks cold for 24 hours or hot for 12 hours.",
    features: ["LED temperature display", "Hydration reminders", "24h cold / 12h hot", "BPA-free stainless steel"],
    stock: 67
  },
  {
    id: 5,
    name: "Noise-Canceling Headphones",
    price: 199,
    originalPrice: 249,
    image: "/product-5.jpg",
    category: "Electronics",
    rating: 4.9,
    reviews: 567,
    description: "Over-ear headphones with industry-leading noise cancellation, 40-hour battery life, and plush memory foam ear cushions for extended listening sessions.",
    features: ["Industry-leading ANC", "40-hour battery", "Memory foam cushions", "Multi-device pairing"],
    badge: "Sale",
    stock: 12
  },
  {
    id: 6,
    name: "Bamboo Desk Organizer",
    price: 35,
    image: "/product-6.jpg",
    category: "Home & Living",
    rating: 4.5,
    reviews: 98,
    description: "Sustainable bamboo desk caddy with multiple compartments for pens, phones, and accessories. A clutter-free workspace starts here.",
    features: ["Sustainable bamboo", "Multiple compartments", "Phone stand included", "Non-slip base"],
    stock: 28
  },
  {
    id: 7,
    name: "Ceramic Desk Lamp",
    price: 120,
    image: "/product-7.jpg",
    category: "Home & Living",
    rating: 4.7,
    reviews: 143,
    description: "Minimalist ceramic desk lamp with adjustable brightness and warm LED light. The matte white finish complements any modern workspace.",
    features: ["Adjustable brightness", "Warm LED 2700K", "Touch control", "Energy efficient"],
    stock: 15
  },
  {
    id: 8,
    name: "Premium Leather Wallet",
    price: 78,
    image: "/product-8.jpg",
    category: "Fashion",
    rating: 4.8,
    reviews: 201,
    description: "Handcrafted from full-grain leather with RFID-blocking technology. Slim profile design with 8 card slots and a bill compartment.",
    features: ["Full-grain leather", "RFID blocking", "8 card slots", "Slim profile"],
    stock: 41,
    sizes: ["One Size"]
  },
  {
    id: 9,
    name: "Wireless Charging Pad",
    price: 42,
    originalPrice: 59,
    image: "/product-9.jpg",
    category: "Electronics",
    rating: 4.4,
    reviews: 267,
    description: "Fast wireless charging pad with LED status ring. Compatible with all Qi-enabled devices. Charges up to 15W for supported phones.",
    features: ["15W fast charging", "LED status indicator", "Qi-compatible", "Non-slip surface"],
    stock: 53
  }
]

export const categories = [
  { name: "Electronics", image: "/cat-electronics.jpg", count: 12 },
  { name: "Home & Living", image: "/cat-home.jpg", count: 8 },
  { name: "Fashion", image: "/cat-fashion.jpg", count: 6 }
]

export const testimonials = [
  {
    id: 1,
    quote: "Cartzeno completely changed how I shop online. The quality is consistent, delivery is fast, and the checkout is effortless.",
    name: "Aisha Khan",
    role: "Verified Buyer",
    avatar: "/avatar-1.jpg"
  },
  {
    id: 2,
    quote: "I love the minimal design and curated selection. Every product I've ordered has exceeded my expectations.",
    name: "Marcus Chen",
    role: "Verified Buyer",
    avatar: "/avatar-2.jpg"
  },
  {
    id: 3,
    quote: "The free shipping and easy returns make this my go-to store. Customer service is genuinely helpful.",
    name: "Priya Patel",
    role: "Verified Buyer",
    avatar: "/avatar-3.jpg"
  }
]

export const faqs = [
  {
    question: "What are your delivery times?",
    answer: "We offer free standard delivery within 3-5 business days for orders over $50. Express delivery (1-2 business days) is available for $9.99. Orders placed before 2 PM are shipped the same day."
  },
  {
    question: "What is your return policy?",
    answer: "We offer a 30-day hassle-free return policy. Items must be unused and in original packaging. Simply initiate a return from your order history, and we'll provide a prepaid label. Refunds are processed within 5-7 business days."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit and debit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, Google Pay, and Cash on Delivery (COD) for select regions. All online payments are processed securely with SSL encryption."
  },
  {
    question: "Do you offer international shipping?",
    answer: "Yes, we ship to over 50 countries worldwide. International shipping rates and delivery times vary by location. You can see the exact cost at checkout before completing your order."
  },
  {
    question: "How can I track my order?",
    answer: "Once your order ships, you'll receive an email with a tracking number. You can also track your order in real-time from your account dashboard or by clicking the tracking link in your shipping confirmation email."
  },
  {
    question: "Are my payment details secure?",
    answer: "Absolutely. We use industry-standard SSL encryption for all transactions. We never store your full card details on our servers. All payments are processed through PCI-compliant payment gateways."
  }
]
