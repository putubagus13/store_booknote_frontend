import httpClient from "@/helpers/httpClient";
import {
  IBaseResponse,
  IPaginationAtribute,
  IStatusResponse,
  ITampalteResponse,
} from "@/models/general";
import {
  IGetJournalHostory,
  IPayloadSetSaldo,
  IPayloadTimeFrame,
  IResIncomeExpenses,
  IResJournalHistory,
} from "@/models/journal";
import { useAuthenticatedStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";

export const getIncomeExpenses = ({ monthTimeFrame }: IPayloadTimeFrame) => {
  const { userProfile } = useAuthenticatedStore();
  return useQuery({
    queryKey: ["getIncomeExpenses", [monthTimeFrame]],
    queryFn: async () => {
      const response = await httpClient.get<IBaseResponse<IResIncomeExpenses>>(
        `/journal/income-expenses/${userProfile.storeId}`,
        {
          params: {
            monthTimeFrame,
          },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const getJournalHistory = ({
  monthTimeFrame,
  page,
  sort,
  order,
  limit,
  search,
  status,
}: IGetJournalHostory) => {
  const { userProfile } = useAuthenticatedStore();
  return useQuery({
    queryKey: [
      "getJournalHistory",
      [monthTimeFrame, page, sort, order, limit, search, status],
    ],
    queryFn: async () => {
      const response = await httpClient.get<
        IBaseResponse<IPaginationAtribute<IResJournalHistory>>
      >(`/journal/history/${userProfile.storeId}`, {
        params: {
          monthTimeFrame,
          page,
          sort,
          order,
          limit,
          search,
          status,
        },
      });
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const setSaldo = ({ onSuccess, onError }: IStatusResponse) => {
  const { userProfile } = useAuthenticatedStore();
  return useMutation({
    mutationFn: async (payload: IPayloadSetSaldo) => {
      const response = await httpClient.post<ITampalteResponse>(
        "/journal/saldo",
        { ...payload, storeId: userProfile.storeId }
      );
      return response.data;
    },
    onSuccess,
    onError,
  });
};
