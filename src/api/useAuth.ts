import httpClient from "@/helpers/httpClient";
import {
  IPayloadLogin,
  IPayloadOtpRegister,
  IPayloadRegister,
  IResToken,
} from "@/models/auth";
import {
  IBaseResponse,
  IStatusResponse,
  ITampalteResponse,
} from "@/models/general";
import { CASHIER } from "@/route";
import { useTokenStore } from "@/store";
import { IUserProfile } from "@/store/store.inteface";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRegister = ({ onSuccess, onError }: IStatusResponse) => {
  const { setToken } = useTokenStore();
  return useMutation({
    mutationFn: async (payload: IPayloadRegister) => {
      const response = await httpClient.post<IBaseResponse<IResToken>>(
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

export const useLogin = ({ onError }: IStatusResponse) => {
  return useMutation({
    mutationFn: async (payload: IPayloadLogin) => {
      const response = await httpClient.post<IBaseResponse<IResToken>>(
        "/auth/user/login",
        payload
      );
      return response.data;
    },
    onSuccess(data) {
      localStorage.setItem("token", data.data?.token || "");
      window.location.href = CASHIER;
    },
    onError,
  });
};

export const useProfile = () => {
  return useQuery({
    queryKey: ["get-profile"],
    queryFn: async () => {
      const response = await httpClient.get<IBaseResponse<IUserProfile>>(
        "/auth/user/profile"
      );

      return response.data;
    },
    refetchOnWindowFocus: false,
  });
};
