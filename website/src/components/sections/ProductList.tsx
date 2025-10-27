import { formatPrice } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { ShopifyProductPreview } from "@/types/shopify";
import Image from "next/image";
import Link from "next/link";

const ProductList = ({
  products,
  className = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
}: {
  products: ShopifyProductPreview[];
  className?: string;
}) => {
  return (
    <div className={cn("grid gap-x-3 gap-y-8 w-full", className)}>
      {products.map((product, index) => {
        const variant = product?.variants?.[0];
        const price = Number(variant?.price?.amount);
        const compareAtPrice = Number(variant?.compareAtPrice?.amount);
        const currency = variant?.price?.currencyCode;

        const isOnSale = compareAtPrice > 0 && compareAtPrice !== price;

        return (
          <Link href={`/shop/${product?.handle}`} key={index}>
            <div className="group relative w-full aspect-square md:min-h-[400px] overflow-hidden shadow-lg flex items-center justify-center">
              <Image
                src={product?.images?.[0]?.src}
                alt={product?.title}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />

              {/* Hover overlay */}
              <div className="absolute top-1/2 left-1/2 z-10 w-full h-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-white/50 opacity-0 md:group-hover:opacity-100 md:group-hover:w-[82%] md:group-hover:h-[82%] transition-all duration-500 ease-in-out">
                <button
                  className={cn(
                    "mt-2 w-max uppercase text-2xs group cursor-pointer bg-black text-white px-8 py-2 font-bold tracking-normal text-sm rounded-md",
                    "scale-100 opacity-100 md:scale-90 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100 transition-all duration-500 delay-300 uppercase "
                  )}
                >
                  view
                </button>
              </div>

              {/* Sale badge */}
              {isOnSale && (
                <div className="absolute bottom-5 right-5 z-30 bg-primary-pink w-14 h-14 flex justify-center items-center text-white text-base font-semibold rounded-full">
                  Sale
                </div>
              )}
            </div>

            {/* Product info */}
            <div className="py-3 px-4 md:px-6 flex flex-col items-center text-sm tracking-normal">
              <p className="font-bold">{product?.title}</p>
              <div className="flex items-center gap-2">
                {isOnSale && (
                  <span className="text-gray-600 line-through text-sm">
                    {formatPrice(compareAtPrice, currency)}
                  </span>
                )}
                <span className={cn(isOnSale && "text-primary font-semibold")}>
                  {formatPrice(price, currency)}
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProductList;
