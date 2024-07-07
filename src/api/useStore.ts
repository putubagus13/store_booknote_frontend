import httpClient from "@/helpers/httpClient";
import {
  IBaseResponse,
  IStatusResponse,
  ITampalteResponse,
} from "@/models/general";
import { IPayloadUpdateStore, IResListStoreType } from "@/models/storeType";
import { useAuthenticatedStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useStoreType = () => {
  return useQuery({
    queryKey: ["get-storeType"],
    queryFn: async () => {
      const response = await httpClient.get<IBaseResponse<IResListStoreType[]>>(
        "/store/type"
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const updateStore = ({ onError, onSuccess }: IStatusResponse) => {
  const { userProfile } = useAuthenticatedStore();
  return useMutation({
    mutationFn: async (payload: IPayloadUpdateStore) => {
      const response = await httpClient.put<ITampalteResponse>(
        "/store/" + userProfile.storeId,
        payload
      );
      return response.data;
    },
    onError,
    onSuccess,
  });
};
