import { Meta } from "./heroslide";

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

interface ProjectListResponse {
  data: ProjectList[];
  meta: Meta;
}

export type { ProjectList, ProjectListResponse, ProjectTitleList };
