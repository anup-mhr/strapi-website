import LinkButton from "@/components/common/LinkButton";
import ImageSlider from "@/components/sections/product/ImageSlider";
import { getCategoryViaSlug } from "@/lib/helper";
import { generateProductMetadata } from "@/lib/metadataHelper";
import { fetchProductBySlug } from "@/lib/strapiApiCall";
import TanstackProviders from "@/provider/TanstackProvider";
import { MemoizedShopifyBuyButton as ShopifyBuyButton } from "@/components/common/ShopifyBuyButton";

export const revalidate = 3600;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ image: string }>;
}) {
  const slug = (await params).image;
  return generateProductMetadata(slug);
}

async function page({
  params,
}: {
  params: Promise<{ category: string; image: string }>;
}) {
  const { category, image: slug } = await params;
  const product = await fetchProductBySlug(slug);

  const { displayName } = getCategoryViaSlug(category);
  if (!product)
    return (
      <div>
        <h1 className="text-black text-center text-sm font-semibold">
          Coming soon.
        </h1>
      </div>
    );

  return (
    <div className="text-black tracking-[3px]">
      <TanstackProviders>
        <ImageSlider images={product.images} />
      </TanstackProviders>

      <div className="text-2xs text-gray-800 mb-10 leading-5 px-5 md:px-0">
        <h1 className="text-black text-xs sm:text-sm font-semibold uppercase">
          {product.name}
        </h1>
        <h1 className="text-2xs text-gray-700 py-0 uppercase">{displayName}</h1>

        {product.description && (
          <div
            className="pt-5 tracking-[2px] whitespace-pre-line"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        )}

        {(product.materials || product.dimension) && (
          <div className="pt-5">
            {product.materials && (
              <p>
                Materials:{" "}
                <span className="capitalize">{product.materials}</span>
              </p>
            )}
            {product.dimension && <p>Dimensions: {product.dimension}</p>}
          </div>
        )}
      </div>

      <div className="px-5 md:px-0">
        {product.shopifyProductId && (
          <ShopifyBuyButton productId={product.shopifyProductId} />
        )}
        {!product.shopifyProductId && (
          <LinkButton
            href={product?.CTA?.href}
            newTab={product?.CTA?.newTab}
            className="py-3"
          >
            {product?.CTA?.label ?? "Contact us"}
          </LinkButton>
        )}
      </div>
    </div>
  );
}

export default page;
