import LinkButton from "@/components/common/LinkButton";
import Lucide from "@/components/ui/Lucide";
import { projects } from "@/constants/constants";
import Image from "next/image";
import Link from "next/link";

async function page({ params }: { params: Promise<{ image: string }> }) {
  const slug = (await params).image;
  console.log(slug);

  const data = projects[0].images?.find((img) => img.id === slug);
  if (!data) return <div>Loading</div>;

  return (
    <div className="text-black tracking-[3px]">
      <div className="relative aspect-video">
        <Image
          src={data?.image}
          alt={data?.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="flex items-center py-4  justify-end text-xs gap-10">
        <Link href={"/urra"} className="">
          BACK TO PROJECT
        </Link>

        <div className="inline-flex gap-6">
          <button className="inline-flex items-center">
            <Lucide icon={"ChevronLeft"} size={6} />
            PREVIOUS
          </button>

          <button className="inline-flex items-center">
            NEXT
            <Lucide icon={"ChevronRight"} size={6} />
          </button>
        </div>
      </div>

      <div className="text-sm text-gray-800 mb-16">
        <h1 className="text-black text-xl uppercase">{data.title}</h1>
        <h1 className="text-[16px]">URRA DESIGN STUDIO</h1>

        <p className="py-8 tracking-[2px]">{data.description}</p>

        <p>Materials: {data.material}</p>
        <p>Dimensions: {data.dimensions}</p>
      </div>

      <LinkButton href={"/contact"}>CONTACT US</LinkButton>
    </div>
  );
}

export default page;
