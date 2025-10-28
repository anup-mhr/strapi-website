import ShopPage from "@/components/ShopPage";
import { getCategories } from "@/lib/shopify";
import { Suspense } from "react";

export default async function ShopPageWrapper() {
  const categories = await getCategories();
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading shop...</div>}>
      <ShopPage categories={categories} />
    </Suspense>
  );
}
