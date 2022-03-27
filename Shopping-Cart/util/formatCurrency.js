export default function formatCurrency(priceCents) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "TWD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(priceCents)
}
