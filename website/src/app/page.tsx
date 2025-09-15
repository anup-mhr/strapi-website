import HeroSlider from "@/components/sections/HeroSlider";
import HomeFooter from "@/components/theme/HomeFooter";
import Navigation from "@/components/theme/Navigation";
import { links } from "@/constants/constants";

export default async function Home() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/hero-slides?populate=*`);
  const  slides = await response.json();
  
  return (
    <main className="font-dosis">
      <Navigation links={links} theme="dark" />
      <HeroSlider slides={slides.data} />

      <HomeFooter theme="dark" />
    </main>
  );
}
