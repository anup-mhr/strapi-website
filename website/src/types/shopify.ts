export interface ShopifyImage {
  src: string;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifyVariantPreview {
  price: ShopifyPrice;
}

export interface ShopifyVariant {

  title: string;
  availableForSale: boolean;
  selectedOptions: { name: string; value: string }[];
  note: string | null;
  price: ShopifyPrice;
  inventoryQuantity: number;
}

export interface ShopifyProductPreview {
  id: string;
  handle: string;
  title: string;
  description: string;
  images: ShopifyImage[];
  variants: ShopifyVariantPreview[];
}

export interface ShopifyProduct extends Omit<ShopifyProductPreview, "variants"> {
  variants: ShopifyVariant[];
}
