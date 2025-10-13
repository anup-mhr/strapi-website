import Heading from "@/components/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import Pagination from "@/components/Pagination";
import { getProducts, getTotalProductCount } from "@/lib/shopify";
import { GET_PRODUCTS, GET_SALES } from "@/lib/shopifyQueries";
import ShopPageGrid from "@/components/sections/ShopPageGrid";

export const revalidate = 0; // ISR

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { page?: string; cursor?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const cursor = searchParams.cursor || null;

  const totalCount = await getTotalProductCount();

  const { products } = await getProducts({ first: 9, after: cursor, query: GET_PRODUCTS });

  return (
    <div>
      <Header />
      <main className="padding py-12">
        <Heading title="SHOP" subtitle="Our latest products" />

        <ShopPageGrid products={products} />

        <Pagination
          currentPage={page}
          totalItems={totalCount}
          itemsPerPage={9}
        />
      </main>
      <Footer />
    </div>
  );
}
