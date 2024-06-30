import httpClient from "@/helpers/httpClient";
import { IBaseResponse, IPaginationAtribute } from "@/models/general";
import {
  IGetJournalHostory,
  IPayloadTimeFrame,
  IResIncomeExpenses,
  IResJournalHistory,
} from "@/models/journal";
import { useAuthenticatedStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

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
