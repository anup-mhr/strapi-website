import HeroSlider from "@/components/sections/HeroSlider";

export default function Home() {
  const slides: any = [1, 2, 3];

  return (
    <main className="font-dosis">
      <HeroSlider slides={slides} />
    </main>
  );
}
