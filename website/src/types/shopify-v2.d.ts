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

//for materials ,sizes
export interface SelectedOption {
  name: string;
  value: string;
}

export interface CartItem {
  id: string;
  merchandiseId:string;
  title: string;
  quantity: number;
  price: number;
  currencyCode: string;
  image?: string;
  altText?: string;
  selectedOptions?: SelectedOption[];
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  totalPrice: number;
  currencyCode: string;
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
