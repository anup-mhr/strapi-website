import LinkButton from "@/components/common/LinkButton";
import ImageSlider from "../../../../components/common/ImageSlider";
import { fetchStrapi } from "@/lib/strapi";

async function getProduct(slug: string) {
  const response = await fetchStrapi(`/api/products`, {
    filters: { slug: { $eq: slug } },
    populate: "*"
  });

  return response.data[0];
}

async function page({ params }: { params: Promise<{ image: string }> }) {
  const slug = (await params).image;
  const data = await getProduct(slug);
  console.log(data);
  if (!data) return <div>Loading</div>;

  return (
    <div className="text-black tracking-[3px]">

      <ImageSlider images={Array(4).fill(data.images[0])} />


      <div className="text-sm text-gray-800 mb-16">
        <h1 className="text-black text-base sm:text-lg lg:text-xl uppercase">{data.name}</h1>
        <h1 className="text-xs sm:text-sm lg:text-base py-2 lg:py-0">URRA DESIGN STUDIO</h1>

        <p className="py-8 tracking-[2px]">{data.description}</p>

        <p>Materials: {data.materials}</p>
        <p>Dimensions: {data.dimension}</p>
      </div>

      <LinkButton href={data.CTA.href}>{data.CTA.label}</LinkButton>
    </div>
  );
}

export default page;
