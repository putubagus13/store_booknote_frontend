import httpClient from "@/helpers/httpClient";
import {
  IBaseResponse,
  IPaginationAtribute,
  IStatusResponse,
  ITampalteResponse,
} from "@/models/general";
import {
  IGetAllProduct,
  IGetProductHostory,
  IPayloadAddProduct,
  IPayloadUpdateProduct,
  IResDataProduct,
  IResDetailProduct,
  IResProductHistory,
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

export const updateProduct = (
  { onSuccess, onError }: IStatusResponse,
  productId
) => {
  return useMutation({
    mutationFn: async (payload: IPayloadUpdateProduct) => {
      const response = await httpClient.put<ITampalteResponse>(
        "/product/" + productId,
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
  categoryIds,
}: IGetAllProduct) => {
  const { userProfile } = useAuthenticatedStore();
  return useQuery({
    queryKey: [
      "getProduct",
      [page, limit, search, sort, order, status, categoryIds],
    ],
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
          categoryIds,
        },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
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

export const deleteProduct = ({ onSuccess, onError }: IStatusResponse) => {
  return useMutation({
    mutationFn: async (productId: string) => {
      const response = await httpClient.delete<ITampalteResponse>(
        `/product/${productId}`
      );
      return response.data;
    },
    onError,
    onSuccess,
  });
};

export const getProductById = (productId: string) => {
  return useQuery({
    queryKey: ["getProductById", [productId]],
    queryFn: async () => {
      const response = await httpClient.get<IBaseResponse<IResDetailProduct>>(
        `/product/detail/${productId}`
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const getProductHistory = ({
  page,
  limit,
  order,
  search,
  sort,
  status,
  startDate,
  endDate,
  productId,
}: IGetProductHostory) => {
  return useQuery({
    queryKey: [
      "getProductHistory",
      [productId, page, limit, search, sort, status, startDate, endDate, order],
    ],
    queryFn: async () => {
      const response = await httpClient.get<
        IBaseResponse<IPaginationAtribute<IResProductHistory>>
      >(`/product/history/${productId}`, {
        params: {
          page,
          limit,
          search,
          sort,
          status,
          startDate,
          endDate,
          order,
        },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
