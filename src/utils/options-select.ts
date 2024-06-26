import { Option } from "@/components/ui/multiple-selector";

export const UNIT_OPTIONS = [
  "Kg", // Kilogram
  "g", // Gram
  "mg", // Milligram
  "ltr", // Liter
  "ml", // Milliliter
  "pcs", // Pieces
  "box", // Box
  "pack", // Pack
  "dozen", // Dozen
  "bottle", // Bottle
  "can", // Can
  "tube", // Tube
  "roll", // Roll
  "jar", // Jar
  "bag", // Bag
  "set", // Set
  "pair", // Pair
  "sheet", // Sheet
  "carton", // Carton
  "bundle", // Bundle
];

export const STATUS_PRODUCT_OPTIONS: Option[] = [
  {
    label: "All",
    value: "",
  },
  {
    label: "Update Stock",
    value: "UPDATE_STOCK",
  },
  {
    label: "Update Stock Price",
    value: "UPDATE_STOCK_PRICE",
  },
  {
    label: "Create",
    value: "CREATE",
  },
  {
    label: "Update Price",
    value: "UPDATE_PRICE",
  },
];
