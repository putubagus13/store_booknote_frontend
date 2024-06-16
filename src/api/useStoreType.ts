import httpClient from "@/helpers/httpClient";
import { IBaseResponse } from "@/models/general";
import { IResListStoreType } from "@/models/storeType";
import { useQuery } from "@tanstack/react-query";

export const useStoreType = () => {
  return useQuery({
    queryKey: ["get-storeType"],
    queryFn: async () => {
      const response = await httpClient.get<IBaseResponse<IResListStoreType[]>>(
        "/store-type"
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
