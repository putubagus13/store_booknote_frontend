import { AxiosError } from "axios";

export interface IBaseResponse<T> {
  message: string;
  status: boolean;
  statusCode: number;
  data?: T;
}

export interface IStatusResponse {
  onSuccess: (e) => void;
  onError: (e: AxiosError) => void;
}

export interface ITampalteResponse {
  message: string;
  status: boolean;
  statusCode: number;
}
