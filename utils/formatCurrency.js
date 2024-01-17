export function formatCurrency(number, currencyCode) {
  return new Intl.NumberFormat('en-IN', {
    currency: currencyCode,
  }).format(number);
}
