import { Option } from "@/components/ui/multiple-selector";

export interface IResDataProduct {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  stock: number;
  totalSold: number;
  createdDt: Date;
  totalOrder: number;
  quantity: number;
}
export interface IResDetailProduct {
  id: string;
  name: string;
  unit: string;
  price: number;
  imageUrl: string;
  stock: number;
  productCategories: Option[];
  productHistory: {
    id: string;
    profit: number;
    totalSold: number;
    stock: number;
    unit: string;
  };
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

export interface IResProductHistory {
  id: string;
  status: string;
  priceGap: number | null;
  stockGap: number;
  fullname: string;
  createdDt: Date;
}

export interface IGetProductHostory {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  productId: string;
}
