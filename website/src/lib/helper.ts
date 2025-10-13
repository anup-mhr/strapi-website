import { SortOption } from "@/context/SortContext";
import { ShopifyProductPreview } from "@/types/shopify";

export const formatPrice = (amount: string, currencyCode: string = "INR") => {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(Number(amount));
};

export function sortProjects(
    products: ShopifyProductPreview[],
    sortOption: SortOption
) {
    const sorted = [...products];
    console.log("sorted", sorted);

    switch (sortOption) {
        case "name-asc":
            return sorted.sort((a, b) => a.title.localeCompare(b.title));

        case "name-desc":
            return sorted.sort((a, b) => b.title.localeCompare(a.title));

        case "high-low":
            return sorted.sort((a, b) => Number(a.variants[0]?.compareAtPrice?.amount || a.variants[0].price.amount) - Number(b.variants[0]?.compareAtPrice?.amount || a.variants[0].price.amount));

        case "low-high":
            return sorted.sort((a, b) => Number(b.variants[0]?.compareAtPrice?.amount || a.variants[0].price.amount) - Number(a.variants[0]?.compareAtPrice?.amount || a.variants[0].price.amount));

        default:
            return sorted;
    }
}
