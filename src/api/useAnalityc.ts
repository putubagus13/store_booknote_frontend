import httpClient from "@/helpers/httpClient";
import {
  IPayloadGetCardAnalityc,
  IResCardAnalityc,
  IResChartAnalityc,
} from "@/models/analityc";
import { IBaseResponse } from "@/models/general";
import { useAuthenticatedStore } from "@/store";
import { useQuery } from "@tanstack/react-query";

export const getCardAnalityc = ({
  monthTimeFrame,
  weekTimeFrame,
}: IPayloadGetCardAnalityc) => {
  const { userProfile } = useAuthenticatedStore();
  return useQuery({
    queryKey: ["getCardAnalityc", [weekTimeFrame, monthTimeFrame]],
    queryFn: async () => {
      const response = await httpClient.get<IBaseResponse<IResCardAnalityc>>(
        `/analityc/card/${userProfile.storeId}`,
        {
          params: {
            weekTimeFrame,
            monthTimeFrame,
          },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};

export const getChartAnalityc = ({
  monthTimeFrame,
  weekTimeFrame,
}: IPayloadGetCardAnalityc) => {
  const { userProfile } = useAuthenticatedStore();
  return useQuery({
    queryKey: ["getChartAnalityc", [weekTimeFrame, monthTimeFrame]],
    queryFn: async () => {
      const response = await httpClient.get<IBaseResponse<IResChartAnalityc>>(
        `/analityc/chart/${userProfile.storeId}`,
        {
          params: {
            weekTimeFrame,
            monthTimeFrame,
          },
        }
      );
      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
