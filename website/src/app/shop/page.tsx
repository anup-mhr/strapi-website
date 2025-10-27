import ShopPage from "@/components/ShopPage";
import { Suspense } from "react";

export default function ShopPageWrapper() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading shop...</div>}>
      <ShopPage />
    </Suspense>
  );
}
