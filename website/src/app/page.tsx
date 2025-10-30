import HeroSlider from "@/components/sections/HeroSlider";
import HomeFooter from "@/components/theme/HomeFooter";
import Navigation from "@/components/theme/Navigation";
import { loadLinks } from "@/lib/helper";
import { fetchHeroSlides } from "@/lib/strapiApiCall";

export default async function Home() {
  const slides = await fetchHeroSlides();
  const links = await loadLinks();

  return (
    <main className="font-dosis">
      <Navigation links={links} theme="dark" />
      <HeroSlider slides={slides} />

      <HomeFooter theme="dark" className="hidden md:block z-20" />
    </main>
  );
}
