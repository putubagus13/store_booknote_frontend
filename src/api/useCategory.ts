import httpClient from "@/helpers/httpClient";
import { IBaseResponse } from "@/models/general";
import { useAuthenticatedStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export interface ICategory {
  id: string;
  name: string;
}

export const useCategory = () => {
  const { userProfile } = useAuthenticatedStore();
  return useQuery({
    queryKey: ["getCategory"],
    queryFn: async () => {
      const response = await httpClient.get<IBaseResponse<ICategory[]>>(
        "/categories-options",
        {
          params: { storeId: userProfile.storeId || "" },
        }
      );

      return response.data;
    },
  });
};
