import HeroSlider from "@/components/sections/HeroSlider";
import HomeFooter from "@/components/theme/HomeFooter";
import Navigation from "@/components/theme/Navigation";
import { links } from "@/constants/constants";

export default function Home() {
  const slides: any = [1, 2, 3];

  return (
    <main className="font-dosis">
      <Navigation links={links} theme="dark" />
      <HeroSlider slides={slides} />

      <HomeFooter theme="dark" />
    </main>
  );
}
