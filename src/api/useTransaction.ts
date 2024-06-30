import httpClient from "@/helpers/httpClient";
import {
  IBaseResponse,
  IPaginationAtribute,
  IStatusResponse,
  ITampalteResponse,
} from "@/models/general";
import {
  IGetTransactionHostory,
  IPayloadProductOrder,
  IResTransactionHistory,
} from "@/models/transaction";
import { useAuthenticatedStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";

export const productOrder = ({ onError }: IStatusResponse) => {
  return useMutation({
    mutationFn: async (payload: IPayloadProductOrder) => {
      const response = await httpClient.post<ITampalteResponse>(
        `/transaction/order`,
        payload
      );
      return response.data;
    },
    onError,
  });
};

export const getTransactionHistory = ({
  page,
  limit,
  order,
  search,
  sort,
  startDate,
  endDate,
}: IGetTransactionHostory) => {
  const { userProfile } = useAuthenticatedStore();
  return useQuery({
    queryKey: [
      "getTransactionHistory",
      [
        page,
        limit,
        search,
        sort,
        status,
        startDate,
        endDate,
        order,
        userProfile.storeId,
      ],
    ],
    queryFn: async () => {
      const response = await httpClient.get<
        IBaseResponse<IPaginationAtribute<IResTransactionHistory>>
      >(`/transaction/history/${userProfile.storeId}`, {
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
