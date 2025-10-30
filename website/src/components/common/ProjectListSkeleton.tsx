import { cn } from "@/lib/utils";

const ProductListSkeleton = ({
  count = 8,
  className = "grid-cols-2 md:grid-cols-3 xl:grid-cols-4",
}: {
  count?: number;
  className?: string;
}) => {
  return (
    <div className={cn("grid gap-x-3 gap-y-8 w-full min-h-screen", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="w-full">
          <div className="relative w-full aspect-[3/3.7] md:min-h-[400px] overflow-hidden shadow-lg bg-gray-200 animate-pulse">
            <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
          </div>

          <div className="py-3 px-4 md:px-6 flex flex-col items-center gap-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
            </div>

            <div className="flex items-center gap-2 w-full justify-center">
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse relative overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-r from-gray-200 via-gray-100 to-gray-200 animate-shimmer" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;