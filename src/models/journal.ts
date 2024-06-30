export interface IPayloadTimeFrame {
  monthTimeFrame: string;
}

interface Income {
  totalIncomeThisMonth: number;
  incomeCalculateThisMonth: string;
  countIncomeThisMonth: number;
}

interface Expenses {
  totalExpensesThisMonth: number;
  expensesCalculateThisMonth: string;
  countExpensesThisMonth: number;
}

interface Provit {
  provitThisMonth: number;
  provitGrowth: string;
  marginProv: number;
}

export interface IResIncomeExpenses {
  income: Income;
  expenses: Expenses;
  provit: Provit;
}

export interface IGetJournalHostory {
  page?: number;
  limit?: number;
  search?: string;
  sort?: string;
  order?: string;
  status?: string;
  monthTimeFrame?: string;
}

export interface IResJournalHistory {
  id: string;
  amount: number;
  status: string;
  description: string | null;
  code: string;
  createdDt: Date;
  createdBy: string | null;
}
