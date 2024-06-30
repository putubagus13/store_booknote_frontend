import { Option } from "@/components/ui/multiple-selector";
import moment from "moment";

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

export const MONTH_LIST: Option[] = [
  {
    label: "January",
    value: "01",
  },
  {
    label: "February",
    value: "02",
  },
  {
    label: "March",
    value: "03",
  },
  {
    label: "April",
    value: "04",
  },
  {
    label: "May",
    value: "05",
  },
  {
    label: "June",
    value: "06",
  },
  {
    label: "July",
    value: "07",
  },
  {
    label: "August",
    value: "08",
  },
  {
    label: "September",
    value: "09",
  },
  {
    label: "October",
    value: "10",
  },
  {
    label: "November",
    value: "11",
  },
  {
    label: "December",
    value: "12",
  },
];

export const monthOption = () => {
  const listMonth: Option[] = [];
  for (let i = 1; i <= 6; i++) {
    if ((i = 1)) {
      const date = moment().startOf("month").toDate();
      listMonth.push({
        label:
          MONTH_LIST.find((month) => month.value === moment(date).format("MM"))
            ?.label || "",
        value: moment(date).format("YYYY-MM-DD"),
      });
    } else {
      const date = moment().subtract(i, "months").startOf("month").toDate();
      listMonth.push({
        label:
          MONTH_LIST.find((month) => month.value === moment(date).format("MM"))
            ?.label || "",
        value: moment(date).format("YYYY-MM-DD"),
      });
    }
  }

  console.log(listMonth);

  return listMonth;
};
