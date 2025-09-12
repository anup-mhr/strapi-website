import LinkButton from "@/components/common/LinkButton";
import Lucide from "@/components/ui/Lucide";
import { projects } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";
import ImageSlider from "./component/ImageSlider";

async function page({ params }: { params: Promise<{ image: string }> }) {
  const slug = (await params).image;
  console.log(slug);

  const data = projects[0].images?.find((img) => img.id === slug);
  if (!data) return <div>Loading</div>;

  return (
    <div className="text-black tracking-[3px]">

      <ImageSlider images={Array(4).fill(data)} />


      <div className="text-sm text-gray-800 mb-16">
        <h1 className="text-black text-base sm:text-lg lg:text-xl uppercase">{data.title}</h1>
        <h1 className="text-xs sm:text-sm lg:text-base py-2 lg:py-0">URRA DESIGN STUDIO</h1>

        <p className="py-8 tracking-[2px]">{data.description}</p>

        <p>Materials: {data.material}</p>
        <p>Dimensions: {data.dimensions}</p>
      </div>

      <LinkButton href={"/contact"}>CONTACT US</LinkButton>
    </div>
  );
}

export default page;
