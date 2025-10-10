export interface ShopifyImage {
  src: string;
}

export interface ShopifyVariant {
  price: string;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  description: string;
  images: ShopifyImage[];
  variants: ShopifyVariant[];
}