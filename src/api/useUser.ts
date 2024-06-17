import httpClient from "@/helpers/httpClient";
import {
  IBaseResponse,
  IStatusResponse,
  ITampalteResponse,
} from "@/models/general";
import { IPayloadUpdateProfile } from "@/models/user";
import { useMutation } from "@tanstack/react-query";

export const useUpdateProfile = ({ onError, onSuccess }: IStatusResponse) => {
  return useMutation({
    mutationFn: async (payload: IPayloadUpdateProfile) => {
      const response = await httpClient.put<ITampalteResponse>(
        "user/profile",
        payload
      );
      return response.data;
    },
    onError,
    onSuccess,
  });
};

export const useUploadImage = ({ onSuccess }: IStatusResponse) => {
  return useMutation({
    mutationFn: async (payload: File[]) => {
      const form = new FormData();
      if (payload.length) {
        form.append("files", payload[0]);
      }
      const response = await httpClient.post<IBaseResponse<string[]>>(
        "/upload/user",
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess,
  });
};
