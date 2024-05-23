export interface IDataProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  totalSold: number;
  quantity?: number;
  totalOrder?: number;
}
