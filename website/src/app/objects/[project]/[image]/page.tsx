import LinkButton from "@/components/common/LinkButton";
import ImageSlider from "../../../../components/common/ImageSlider";
import { fetchStrapi } from "@/lib/strapi";
import { mapShopifyImages, shopifyClient } from "@/lib/shopify";
import ShopifyBuyButton from "@/components/common/ShopifyBuyButton";

export const getProduct = async (handle: string) => {
  const query = `
    {
      productByHandle(handle: "${handle}") {
        id
        title
        description
        handle
        images(first: 10) {
          edges {
            node {
              src
              altText
            }
          }
        }
        variants(first: 5) {
          edges {
            node {
              id
              sku
              availableForSale
              priceV2 {
                amount
                currencyCode
              }
            }
          }
        }
        materials: metafield(namespace: "custom", key: "materials") {
      value
      type
    }

       dimensions: metafield(namespace: "custom", key: "dimensions") {
      value
      type
    }
      }
    }
  `;

  const data: any = await shopifyClient.request(query);
  return data.productByHandle;
};

async function page({ params }: { params: Promise<{ image: string }> }) {
  const slug = (await params).image;
  const data = await getProduct(slug);
  console.log("product", data);
  if (!data) return <div>Loading</div>;

  const images = mapShopifyImages(data);
  console.log(images)

  return (
    <div className="text-black tracking-[3px]">

      <ImageSlider images={images} />


      <div className="text-sm text-gray-800 mb-16">
        <h1 className="text-black text-base sm:text-lg lg:text-xl uppercase">{data.title}</h1>
        <h1 className="text-xs sm:text-sm lg:text-base py-2 lg:py-0">OBJECTS</h1>

        <p className="py-8 tracking-[2px]">{data.description}</p>

        <p>Materials: {data.materials.value}</p>
        <p>Dimensions: {data.dimensions.value}</p>
      </div>

      {/* <LinkButton href={data.CTA.href}>{data.CTA.label}</LinkButton> */}
      <ShopifyBuyButton productId={parseInt(data.id.split("/").pop()!)} />

    </div>
  );
}

export default page;
