import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import HeroSlider from "@/components/sections/HeroSlider";
import JournalImageSlider from "@/components/sections/JournalImageSlider";
import ProductList from "@/components/sections/ProductList";
import { journal } from "@/constants/constants";
import { getProducts } from "@/lib/shopify";
import { fetchHeroSlides } from "@/lib/strapiApiCall";
import Image from "next/image";

export default async function Home() {
  const { products } = await getProducts({ first: 8 });

  const slides = await fetchHeroSlides();

  const { products: salesProducts } = await getProducts({
    first: 4,
    collection: "sale",
  });

  return (
    <div>
      <Header className="text-primary" />
      <HeroSlider slides={slides} />

      {/* Trending Section */}
      <div className="padding">
        <div className="text-center pt-8 sm:pt-10 md:pt-12">
          <h1 className="tagline text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl px-4">
            Blending heritage with design <br />
            Empowering artisans, preserving craft, honouring hands.
          </h1>

          <Heading
            title="JUST IN"
            subtitle="New & Trending"
            CTA="SHOP NOW"
            href="/shop"
          />
        </div>

        <ProductList products={products} />
      </div>

      {/* Sale Section */}
      <div className="padding">
        <Heading
          title="SALE"
          subtitle="Limited time only"
          CTA="VIEW ALL"
          href="/shop"
        />

        <ProductList products={salesProducts} />
      </div>

      <div className="padding">
        <Heading
          title="JOURNAL"
          subtitle="Stories of Craft, Culture and Change"
          CTA="VIEW ALL"
          href="/journal"
        />

        <JournalImageSlider journals={journal} />
      </div>

      <div className="padding">
        <Heading
          title="ABOUT"
          subtitle="Our Journey"
          CTA="READ MORE"
          href="/about"
        />

        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-y-3 sm:gap-y-4 gap-x-1 mx-auto max-w-sm sm:max-w-2xl 2xl:max-w-full">
          <div className="flex flex-col sm:flex-row bg-black">
            <div className="relative aspect-square h-64 sm:h-56 md:h-64 lg:h-72 xl:h-80">
              <Image
                src="/images/about/heirloom-center.jpeg"
                alt="about-us"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex text-center sm:text-start justify-center sm:justify-start items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
              HEIRLOOM <br /> NAGA <br /> CENTER
            </div>
          </div>

          <div className="flex flex-col sm:flex-row bg-black">
            <div className="relative aspect-square h-64 sm:h-56 md:h-64 lg:h-72 xl:h-80">
              <Image
                src="/images/about/jesmina.jpeg"
                alt="about-us"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex text-center sm:text-start justify-center sm:justify-start items-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 tracking-[0.1em] sm:tracking-[0.12em] md:tracking-[0.15em]">
              MEET <br /> JESMINA <br /> ZELIANG
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
