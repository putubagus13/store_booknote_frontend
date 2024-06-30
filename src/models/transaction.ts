export interface IPayloadProductOrder {
  productId: string;
  storeId: string;
  amount: number;
  productQuantity: number;
  paymentMethod: string;
}

export interface IGetTransactionHostory {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
  startDate?: string;
  endDate?: string;
}

export interface IResTransactionHistory {
  id: string;
  name: string;
  amount: number;
  productQuantity: number;
  paymentMethod: string;
  code: string;
  createdDt: Date;
}
