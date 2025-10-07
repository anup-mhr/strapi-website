import Image from "next/image";
import HeroSlider from "@/components/sections/HeroSlider";
import { heroImages, journal, products } from "@/constants/constants";
import Header from "@/components/sections/Header";
import LinkButton from "@/components/LinkButton";
import Footer from "@/components/sections/Footer";
import JournalImageSlider from "@/components/sections/JournalImageSlider";
import ProductList from "@/components/sections/ProductList";

export default function Home() {
  return (
    <div>
      <Header className="text-primary" />
      <HeroSlider images={heroImages} />

      {/* Trending Section */}
      <div className="padding">
        <div className="text-3xl text-center py-12 font-semibold">

          <h1 className="tagline text-3xl md:text-4xl lg:text-5xl">Blending heritage with design <br />Empowering artisans, preserving craft, honouring hands.</h1>

          <div className="flex flex-col gap-2 items-center mt-14 sm:mt-20 lg:mt-24 text-primary">
            <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="w-[150px] sm:w-[180px] lg:w-[210px] mb-2" />
            <h1 className="heading">JUST IN</h1>
            <h2 className="subheading">New & Trending</h2>
            <LinkButton href="/" className="bg-black">SHOP NOW</LinkButton>
          </div>
        </div>

        <ProductList products={Array(8).fill(products[0])} />
      </div>

      {/* Sale Section */}
      <div className="padding">
        <div className="flex flex-col gap-2 items-center mt-14 sm:mt-20 lg:mt-24 mb-12 text-primary">
          <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="w-[150px] sm:w-[180px] lg:w-[210px] mb-2" />
          <h1 className="text-5xl heading">SALE</h1>
          <h2 className="text-2xl subheading">Limited time only</h2>
          <LinkButton href="/" className="bg-black">VIEW ALL</LinkButton>
        </div>

        <ProductList products={Array(8).fill(products[0])} />

      </div>


      <div className="padding">
        <div className="flex flex-col gap-2 items-center mt-14 sm:mt-20 lg:mt-24 mb-6 text-primary">
          <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="mb-4" />
          <h1 className="text-5xl heading">JOURNAL</h1>
          <h2 className="text-2xl subheading">Stories of Craft, Culture and Change</h2>
          <LinkButton href="/" className="bg-black">VIEW ALL</LinkButton>
        </div>

        <JournalImageSlider images={journal} />
      </div>

      <div className="padding">
        <div className="flex flex-col gap-2 items-center mt-14 sm:mt-20 lg:mt-24 mb-12 text-primary">
          <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="w-[150px] sm:w-[180px] lg:w-[210px] mb-2" />
          <h1 className="text-5xl heading">ABOUT</h1>
          <h2 className="text-2xl subheading">Our Journey</h2>
          <LinkButton href="/" className="bg-black">READ MORE</LinkButton>
        </div>


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


      <div className="flex flex-col gap-2 items-center mt-24 mb-12">
        <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="w-[150px] sm:w-[180px] lg:w-[210px] mb-2" />
      </div>

      <Footer />
    </div>
  );
}
