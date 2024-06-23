import httpClient from "@/helpers/httpClient";
import { IStatusResponse, ITampalteResponse } from "@/models/general";
import { IPayloadProductOrder } from "@/models/transaction";
import { useMutation } from "@tanstack/react-query";

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
