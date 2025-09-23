import Image from "next/image";
import HeroSlider from "@/components/sections/HeroSlider";
import { heroImages, journal, trending } from "@/constants/constants";
import Header from "@/components/sections/Header";
import LinkButton from "@/components/LinkButton";
import Footer from "@/components/sections/Footer";
import JournalImageSlider from "@/components/sections/JournalImageSlider";

export default function Home() {
  return (
    <div>
      <Header className="text-primary-brown" />
      <HeroSlider images={heroImages} />

      {/* Trending Section */}
      <div className="padding">
        <div className="text-3xl text-center py-12 font-semibold">

          <h1>Blending heritage with design <br />Empowering artisans, preserving craft, honouring hands.</h1>

          <div className="flex flex-col gap-2 items-center mt-24 text-primary-brown">
            <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="mb-2" />
            <p className="text-4xl">JUST IN</p>
            <p className="text-lg">New & Trending</p>
            <LinkButton href="/" className="bg-black">SHOP NOW</LinkButton>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-x-1 gap-y-8 w-full" >
          {Array(8).fill(trending[0]).map((product, index) => (
            <div key={index}>
              <div className="relative w-full aspect-[3/3.7]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="py-4 px-6 flex justify-between">
                <p className="font-semibold">{product.title}</p>
                <p>₹ {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sale Section */}
      <div className="padding">
        <div className="flex flex-col gap-2 items-center mt-24 mb-12 text-primary-brown">
          <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="mb-2" />
          <p className="text-4xl">SALE</p>
          <p className="text-lg">Limited time only</p>
          <LinkButton href="/" className="bg-black">VIEW ALL</LinkButton>
        </div>

        <div className="grid grid-cols-4 gap-x-1 gap-y-8 w-full">
          {Array(4).fill(trending[0]).map((product, index) => (
            <div key={index}>
              <div className="relative w-full aspect-[3/3.7]">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover"
                />

              </div>

              <div className="py-4 px-6 flex justify-between">
                <p className="font-semibold">{product.title}</p>
                <p>₹ {product.price}</p>
              </div>
            </div>
          ))}
        </div>

      </div>


      <div className="padding">
        <div className="flex flex-col gap-2 items-center mt-24 mb-12 text-primary-brown">
          <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="mb-2" />
          <p className="text-4xl">JOURNAL</p>
          <p className="text-lg">Stories of Craft, Culture and Change</p>
          <LinkButton href="/" className="bg-black">VIEW ALL</LinkButton>
        </div>

        <JournalImageSlider images={journal} />
      </div>




      <div className="padding">
        <div className="flex flex-col gap-2 items-center mt-24 mb-12 text-primary-brown">
          <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="mb-2" />
          <p className="text-4xl">ABOUT</p>
          <p className="text-lg">Our Journey</p>
          <LinkButton href="/" className="bg-black">READ MORE</LinkButton>
        </div>


        <div className="grid grid-cols-1 2xl:grid-cols-2 gap-y-4 gap-x-1 mx-auto max-w-2xl 2xl:max-w-full">
          <div className="flex bg-black">
            <div className="relative aspect-square h-72">
              <Image
                src="/images/journal.jpeg"
                alt="about-us"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center text-4xl text-white font-semibold px-12 tracking-widest">
              HEIRLOOM <br /> NAGA <br /> CENTER
            </div>
          </div>

          <div className="flex bg-black">
            <div className="relative aspect-square h-72">
              <Image
                src="/images/journal.jpeg"
                alt="about-us"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-center text-4xl text-white font-semibold px-12 tracking-widest">
              MEET <br /> JESMINA <br /> ZELIANG
            </div>
          </div>
        </div>
      </div>


      <div>
        <div className="flex flex-col gap-2 items-center mt-24 mb-12">
          <Image src={"/images/design.png"} alt={"design"} width={210} height={100} className="mb-2" />
        </div>

        <Footer />
      </div>


    </div>
  );
}
