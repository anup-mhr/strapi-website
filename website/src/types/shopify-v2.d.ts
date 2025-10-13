export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  variants: {
    id: string;
    title: string;
    price: number;
    available: boolean;
  }[];
  options: {
    name: string;
    values: string[];
  }[];
  vendor: string;
  productType: string;
  tags: string[];
  availableForSale: boolean;
}

export interface CartItem {
  id: string;
  product: Product;
  variantId: string;
  quantity: number;
  title: string;
  price: number;
  image: string;
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalPrice: number;
  lineItems: CartItem[];
}

export interface JournalPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface ShopifyConfig {
  domain: string;
  storefrontAccessToken: string;
}
