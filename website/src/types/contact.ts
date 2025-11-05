import { File } from "./heroslide";

export interface ContactPageDetails {
  content: string;
  heroSection: {
    image: File;
    title?: string;
    subTitle?: string;
  };
}
