import Navigation from "@/components/sections/Navigation";
import HeroSlider from "@/components/sections/HeroSlider";
import Link from "next/link";
import { links } from "@/constants/constants";

export default function Home() {
  const slides: any = [1, 2, 3];

  return (
    <main className="font-dosis">
      <Navigation textColor="text-white" background="bg-transparent" />
      <HeroSlider slides={slides} />
      <footer className="absolute px-[12rem] text-sm tracking-widest py-4 bottom-0 w-full border border-t-1 border-white flex gap-10 items-center justify-between">
        <div className="flex gap-8">
          <p>Heirloom Naga</p>
          <p>Cane Concept</p>
        </div>

        <Link href={'/'}>
          Follow us on Instagram
        </Link>

        <p>
          contact@akuzeliang.com
        </p>
      </footer>
    </main>
  );
}
