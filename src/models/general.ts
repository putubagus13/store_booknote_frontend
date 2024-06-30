import { AxiosError } from "axios";

export interface IPaginationAtribute<T> {
  totalPage: number;
  totalData: number;
  currentPage: number;
  items: T[];
}

export interface IBaseResponse<T> {
  message: string;
  status: boolean;
  statusCode: number;
  data?: T;
}

export interface IStatusResponse {
  onSuccess?: (e) => void;
  onError?: (e: AxiosError) => void;
}

export interface ITampalteResponse {
  message: string;
  status: boolean;
  statusCode: number;
}

export interface IHeadPayload {
  label: string;
  key: string | null;
}

export interface IOption {
  label: string;
  value: string;
}

export type TSortTable = "asc" | "desc";

export interface ISorting {
  sort: string;
  order: TSortTable;
}
