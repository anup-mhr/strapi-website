export interface ShopifyImage {
  src: string;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariantPreview {
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  note: string | null;
  price: ShopifyPrice;
  compareAtPrice?: ShopifyPrice;
  quantityAvailable: number;
}

export interface ShopifyProductPreview {
  id: string;
  handle: string;
  title: string;
  images: ShopifyImage[];
  variants: ShopifyVariantPreview[];
  descriptionHtml: any;
}

export interface ShopifyProduct
  extends Omit<ShopifyProductPreview, "variants"> {
  tags: string[];
  descriptionHtml: string;
  variants: ShopifyVariant[];
}
