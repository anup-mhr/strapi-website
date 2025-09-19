import { CTA, File } from "./heroslide.dt";
import { ProjectTitleList } from "./project.dt";

interface ProductDetails extends ProjectTitleList {
  description: string;
  dimension: string;
  materials: string;
  thumbnail: File;
  images: File[];
  name: string;
  CTA?: CTA;
}

export type { ProductDetails };
