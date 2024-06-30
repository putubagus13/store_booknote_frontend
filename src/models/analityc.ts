export interface IPayloadGetCardAnalityc {
  monthTimeFrame: string;
  weekTimeFrame: string;
}

export interface IResCardAnalityc {
  growPercentThisMonth: string;
  growPercentThisWeek: string;
  totalTransactionThisMonth: number;
  totalTransactionThisWeek: number;
  totalAmountThisMonth: number;
  totalAmountThisWeek: number;
}

export interface DataChartMonth {
  createdDt: string;
  amount: number;
}

export interface DataChartTopProduct {
  totalQuantity: number;
  amount: number;
  id: string;
  name: string;
}

export interface IResChartAnalityc {
  chartAnalitycTransaction: DataChartMonth[];
  chartAnalitycTopProduct: DataChartTopProduct[];
}
