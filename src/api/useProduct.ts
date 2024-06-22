import httpClient from "@/helpers/httpClient";
import {
  IBaseResponse,
  IPaginationAtribute,
  IStatusResponse,
  ITampalteResponse,
} from "@/models/general";
import {
  IGetAllProduct,
  IPayloadAddProduct,
  IPayloadUpdateProduct,
  IResDataProduct,
} from "@/models/product";
import { useAuthenticatedStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";

export const addProduct = ({ onSuccess, onError }: IStatusResponse) => {
  return useMutation({
    mutationFn: async (payload: IPayloadAddProduct) => {
      const response = await httpClient.post<ITampalteResponse>(
        "/product",
        payload
      );
      return response.data;
    },
    onError,
    onSuccess,
  });
};

export const updateProduct = ({ onSuccess, onError }: IStatusResponse) => {
  return useMutation({
    mutationFn: async (payload: IPayloadUpdateProduct) => {
      const response = await httpClient.put<ITampalteResponse>(
        "/product/" + payload.productId,
        payload
      );
      return response.data;
    },
    onError,
    onSuccess,
  });
};

export const getProduct = ({
  page,
  limit,
  search,
  sort,
  order,
  status,
}: IGetAllProduct) => {
  const { userProfile } = useAuthenticatedStore();
  return useQuery({
    queryKey: ["getProduct", [page, limit, search, sort, order, status]],
    queryFn: async () => {
      const response = await httpClient.get<
        IBaseResponse<IPaginationAtribute<IResDataProduct>>
      >(`/product/${userProfile.storeId}`, {
        params: {
          page,
          limit,
          search,
          sort,
          order,
          status,
        },
      });
      return response.data;
    },
  });
};

export const uploadImage = ({ onSuccess, onError }: IStatusResponse) => {
  return useMutation({
    mutationFn: async (payload: File[]) => {
      let form = new FormData();
      if (payload.length) {
        form.append("files", payload[0]);
      }

      const response = await httpClient.post<IBaseResponse<string[]>>(
        `upload/product`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data.data;
    },
    onError,
    onSuccess,
  });
};
