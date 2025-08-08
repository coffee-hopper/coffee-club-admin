export default function getImagePath(category: string, name: string): string {
  const formatted = `${category}_${name}.png`
    .toLowerCase()
    .replace(/\s+/g, "_");

  return `/images/products/${formatted}`;
}
