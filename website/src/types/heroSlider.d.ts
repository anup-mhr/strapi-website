interface MetaPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface Meta {
  pagination: MetaPagination;
}

interface File {
  id: number;
  documentId: string;
  name: string;
  alternativeText: string;
  caption: string;
  width: number;
  height: number;
  formats: string;
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
  previewUrl: string;
  provider: string;
  provider_metadata: string;
  folderPath: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface CTA {
  label: string;
  href: string;
  newTab: boolean;
}

interface HeroSlide {
  id: number;
  documentId: string;
  title: string;
  CTA: CTA;
  subTitle: string;
  backgroundImage: File;
  mobileViewImage: File;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface ApiResponse {
  data: HeroSlide[];
  meta: Meta;
}

export type { ApiResponse, CTA, HeroSlide, File, Meta, MetaPagination };
