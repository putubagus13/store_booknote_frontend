import httpClient from "@/helpers/httpClient";
import {
  IPayloadOtpRegister,
  IPayloadRegister,
  IResRegister,
} from "@/models/auth";
import {
  IBaseResponse,
  IStatusResponse,
  ITampalteResponse,
} from "@/models/general";
import { useTokenStore } from "@/store";
import { useMutation } from "@tanstack/react-query";

export const useRegister = ({ onSuccess, onError }: IStatusResponse) => {
  const { setToken } = useTokenStore();
  return useMutation({
    mutationFn: async (payload: IPayloadRegister) => {
      const response = await httpClient.post<IBaseResponse<IResRegister>>(
        "/auth/user/register",
        payload
      );
      setToken(response.data.data?.token || "");
      return response.data;
    },
    onSuccess,
    onError,
  });
};

export const useOtpRegisterVerification = ({
  onSuccess,
  onError,
}: IStatusResponse) => {
  const { setToken } = useTokenStore();
  return useMutation({
    mutationFn: async (payload: IPayloadOtpRegister) => {
      const response = await httpClient.post<ITampalteResponse>(
        "/otp/register/verify",
        payload
      );
      setToken("");
      return response.data;
    },
    onSuccess,
    onError,
  });
};
