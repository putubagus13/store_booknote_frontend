import HeaderPage from "@/components/HeaderPage";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
// import TableTrransaction from "./components/TableTransaction";
import { TypographyH3, TypographyP } from "@/components/ui/typograpgy";
// import FilterSearch from "../Analytic/components/FilterSearch";
import { ChevronsLeftRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { conversion, useHandleSort } from "@/utils/general";
import { IHeadPayload, TSortTable } from "@/models/general";
import { IResTransactionHistory } from "@/models/transaction";
import { DateRange } from "react-day-picker";
import { getTransactionHistory } from "@/api/useTransaction";
import { format } from "date-fns";
import PaginationCustom from "@/components/PaginationCustom";

const HEAD_TABLE: IHeadPayload[] = [
  { key: null, label: "No" },
  { key: "code", label: "Code" },
  { key: "name", label: "Product Name" },
  { key: "productQuantity", label: "Quantity" },
  { key: "paymentMethod", label: "Payment Method" },
  { key: "amount", label: "Amount" },
  { key: "createdDt", label: "Date Transaction" },
];

const History: FC = () => {
  const [timeFrame, setTimeFrame] = useState<DateRange | null>(null);
  // const [filterStatus, setFilterStatus] = useState<string>("");
  //   const [offset, setOffset] = useState<number>(0);
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<TSortTable>("desc");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [dataTransaction, setDataTransaction] = useState<
    IResTransactionHistory[]
  >([]);

  const { data, isLoading } = getTransactionHistory({
    page,
    limit,
    sort,
    order,
    startDate:
      timeFrame && timeFrame.from ? format(timeFrame.from, "yyyy/MM/dd") : "",
    endDate:
      timeFrame && timeFrame.to ? format(timeFrame.to, "yyyy/MM/dd") : "",
    search,
  });

  const handleSort = useHandleSort({
    setSort,
    setSortBy: setOrder,
    sortBy: order,
  });

  useEffect(() => {
    if (data?.data?.items) {
      setDataTransaction(data?.data.items);
      setOffset((data?.data.currentPage - 1) * 10);
    }
  }, [data?.data?.items]);

  return (
    <>
      <Helmet title="Squirrel - History" />
      <HeaderPage label="History">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <TypographyH3 className="text-[20px]">
              Transaction History
            </TypographyH3>
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 pt-7">
                {/* <FilterSearch /> */}
                <div className="relative ml-auto flex-1 md:grow-0">
                  <Input
                    type="search"
                    placeholder="search..."
                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                      setSearch(e.target.value)
                    }
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                  />
                  <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <TypographyP className="font-semibold">Timeframe :</TypographyP>
                <DatePickerWithRange selectedDate={setTimeFrame} />
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[90%] overflow-auto scrollbar-hide">
            <Table className="w-full mt-4">
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}

              <TableHeader>
                <TableRow>
                  {HEAD_TABLE.map((item, index) => {
                    switch (item.key) {
                      case null:
                        return (
                          <TableHead
                            key={index}
                            className="w-[100px] flex items-center gap-1"
                          >
                            {item.label}
                          </TableHead>
                        );
                      default:
                        return (
                          <TableHead key={index}>
                            <Button
                              onClick={() => handleSort(item.key)}
                              variant="ghost"
                            >
                              {item.label}
                              <ChevronsLeftRight
                                size={13}
                                className="rotate-90"
                              />
                            </Button>
                          </TableHead>
                        );
                    }
                  })}
                </TableRow>
              </TableHeader>

              <TableBody>
                {!isLoading &&
                  dataTransaction.map(
                    (item: IResTransactionHistory, index: number) => (
                      <TableRow key={item.id}>
                        <TableCell className="font-medium">
                          {index + 1 + offset}
                        </TableCell>
                        <TableCell>{item.code}</TableCell>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.productQuantity}</TableCell>
                        <TableCell>
                          {item.paymentMethod.toUpperCase()}
                        </TableCell>
                        <TableCell>{conversion(item.amount)}</TableCell>
                        <TableCell>{String(item.createdDt)}</TableCell>
                      </TableRow>
                    )
                  )}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="w-full flex justify-between px-10">
            <TypographyH3>Total</TypographyH3>
            <TypographyH3>
              {conversion(
                (dataTransaction.length &&
                  dataTransaction
                    .map((item) => item.amount)
                    .reduce(
                      (calculateValue, currentValue) =>
                        calculateValue + currentValue
                    )) ||
                  0
              )}
            </TypographyH3>
          </CardFooter>
          <PaginationCustom
            dataPagination={
              (data?.data && data.data) || {
                totalPage: 0,
                currentPage: 0,
                totalData: 0,
                items: [],
              }
            }
            limit={(value) => setLimit(Number(value))}
            page={setPage}
          />
        </Card>
      </HeaderPage>
    </>
  );
};

export default History;
