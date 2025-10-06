import { File, Meta } from "./heroslide";

interface ProjectTitleList {
  id: number;
  documentId: string;
  slug: string;
  title: string;
}

interface ProjectList extends ProjectTitleList {
  category: string;
  thumbnail: File;
}
interface ProductDetails {
  id: number;
  documentId: string;
  images: File[];
  name: string;
  slug: string;
}

interface ProjectDetails extends ProjectList {
  description?: string;
  products: ProductDetails[];
}

interface ProjectListResponse {
  data: ProjectList[];
  meta: Meta;
}

interface AllProjectsAndProducts {
  slug: string;
  category: string;
  products: {
    slug: string;
  }[];
}

export type {
  ProductDetails,
  ProjectList,
  ProjectListResponse,
  ProjectTitleList,
  ProjectDetails,
  AllProjectsAndProducts,
};
