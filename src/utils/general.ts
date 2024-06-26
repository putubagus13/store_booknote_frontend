import { TSortTable } from "@/models/general";
import { Dispatch, SetStateAction, useCallback } from "react";

interface IPayloadSorting {
  sortBy: string;
  setSortBy: Dispatch<SetStateAction<TSortTable>>;
  setSort: Dispatch<SetStateAction<string>>;
}

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

export function useHandleSort(payload: IPayloadSorting) {
  return useCallback(
    (column: string | null) => {
      if (column !== null) {
        if (payload.sortBy === "asc") {
          payload.setSortBy("desc");
        } else {
          payload.setSortBy("asc");
        }
        payload.setSort(column);
      }
    },
    [payload.sortBy, payload.setSortBy, payload.setSort]
  );
}
