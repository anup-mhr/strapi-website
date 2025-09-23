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
  name: string;
  thumbnail: File;
  slug: string;
}

interface ProjectDetails extends ProjectList {
  description: string;
  products: ProductDetails[];
}

interface ProjectListResponse {
  data: ProjectList[];
  meta: Meta;
}

export type {
  ProductDetails,
  ProjectList,
  ProjectListResponse,
  ProjectTitleList,
  ProjectDetails,
};
