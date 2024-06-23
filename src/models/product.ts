import { Option } from "@/components/ui/multiple-selector";

export interface IResDataProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  totalSold: number;
  createdDt: Date;
}

export interface IResDetailProduct {
  id: string;
  name: string;
  unit: string;
  price: number;
  imageUrl: string;
  stock: number;
  productCategories: Option[];
}
export interface IPayloadAddProduct {
  productName: string;
  price: number;
  stock: number;
  categoryIds: string;
  storeId: string;
  imageUrl: string;
  unit: string;
}

export interface IPayloadUpdateProduct {
  productName: string;
  price: number;
  stock: number;
  categoryIds: string;
  imageUrl: string;
  unit: string;
}

export interface IGetAllProduct {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
  status?: string;
  categoryIds?: string;
}
