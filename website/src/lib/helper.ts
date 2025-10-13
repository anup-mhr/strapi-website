export const formatPrice = (amount: string | null, currencyCode: string) => {
  if (!amount) return "";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(amount));
};
