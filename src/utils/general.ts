export const conversion = (price: number) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
  }).format(price);
};

export const capitalizeFirstLetter = (string: string) => {
  if (!string) return ""; // Handle empty strings
  return string.charAt(0).toUpperCase() + string.slice(1);
};
