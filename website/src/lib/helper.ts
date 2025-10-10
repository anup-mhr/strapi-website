export const formatPrice = (amount: string, currencyCode: string) => {
    return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
    }).format(Number(amount));
};