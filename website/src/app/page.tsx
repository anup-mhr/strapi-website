import Image from "next/image";
import HeroSlider from "@/components/sections/HeroSlider";
import { heroImages, journal, products } from "@/constants/constants";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import JournalImageSlider from "@/components/sections/JournalImageSlider";
import ProductList from "@/components/sections/ProductList";
import Heading from "@/components/Heading";

export default function Home() {
  return (
    <div>
      <Header className="text-primary" />
      <HeroSlider images={heroImages} />

      {/* Trending Section */}
      <div className="padding">
        <div className="text-3xl text-center py-12">

          <h1 className="tagline text-3xl md:text-4xl lg:text-5xl">Blending heritage with design <br />Empowering artisans, preserving craft, honouring hands.</h1>

          <Heading title="JUST IN" subtitle="New & Trending" CTA="SHOP NOW" href="/shop" />
        </div>

        <ProductList products={Array(8).fill(products[0])} />
      </div>

      {/* Sale Section */}
      <div className="padding">
        <Heading title="SALE" subtitle="Limited time only" CTA="VIEW ALL" href="/shop" />

        <ProductList products={Array(8).fill(products[0])} />
      </div>


      <div className="padding">
        <Heading title="JOURNAL" subtitle="Stories of Craft, Culture and Change" CTA="VIEW ALL" href="/journal" />

        <JournalImageSlider images={journal} />
      </div>

      <div className="padding">
        <Heading title="ABOUT" subtitle="Our Journey" CTA="READ MORE" href="/about" />

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-1 mx-auto max-w-sm sm:max-w-2xl 2xl:max-w-full">
          <div className="flex flex-col sm:flex-row bg-black">
            <div className="relative aspect-square h-80 sm:h-64 md:h-72">
              <Image
                src="/images/about/heirloom-center.jpeg"
                alt="about-us"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex text-center sm:text-start justify-center sm:justify-start items-center text-2xl sm:text-3xl md:text-4xl text-white font-bold p-6 sm:p-8 md:p-12 tracking-[0.15em]">
              HEIRLOOM <br /> NAGA <br /> CENTER
            </div>
          </div>

          <div className="flex flex-col sm:flex-row bg-black">
            <div className="relative aspect-square h-80 sm:h-64 md:h-72">
              <Image
                src="/images/about/jesmina.jpeg"
                alt="about-us"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex text-center sm:text-start justify-center sm:justify-start items-center text-2xl sm:text-3xl md:text-4xl text-white font-bold p-6 sm:p-8 md:p-12 tracking-[0.15em]">
              MEET <br /> JESMINA <br /> ZELIANG
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
