import HeroSlider from "@/components/sections/HeroSlider";
import HomeFooter from "@/components/theme/HomeFooter";
import Navigation from "@/components/theme/Navigation";
import { links } from "@/constants/constants";
import { fetchHeroSlides } from "@/lib/strapiApiCall";

export const revalidate = 2400;

export default async function Home() {
  const slides = await fetchHeroSlides();

  return (
    <main className="font-dosis">
      <Navigation links={links} theme="dark" />
      <HeroSlider slides={slides} />

      <HomeFooter theme="dark" />
    </main>
  );
}
