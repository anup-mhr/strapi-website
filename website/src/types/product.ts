import { CTA, File } from "./heroslide";
import { ProjectTitleList } from "./project";

interface ProductDetails extends ProjectTitleList {
  description?: string;
  dimension: string;
  materials: string;
  shopifyProductId?: string;
  shopifyBuyButton?: boolean;
  images: File;
  name: string;
  CTA?: CTA;
}

export type { ProductDetails };
