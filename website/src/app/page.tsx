import HeroSlider from "@/components/sections/HeroSlider";
import HomeFooter from "@/components/theme/HomeFooter";
import Navigation from "@/components/theme/Navigation";
import { fetchHeroSlides } from "@/lib/strapiApiCall";

export const revalidate = 0;

export default async function Home() {
  const slides = await fetchHeroSlides();

  return (
    <main className="font-dosis">
      <Navigation theme="dark" />
      <HeroSlider slides={slides} />

      <HomeFooter theme="dark" className="hidden md:block z-20" />
    </main>
  );
}
