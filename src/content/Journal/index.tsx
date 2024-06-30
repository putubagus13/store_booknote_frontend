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
import PaginationCustom from "@/components/PaginationCustom";
import CardIncomeExpenses from "./components/CardIncomeExpenses";
import { getIncomeExpenses, getJournalHistory } from "@/api/useJournal";
import moment from "moment";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/components/ui/multiple-selector";
import { MONTH_LIST } from "@/utils/options-select";
import { IResJournalHistory } from "@/models/journal";
import { Badge } from "@/components/ui/badge";

const HEAD_TABLE: IHeadPayload[] = [
  { key: null, label: "No" },
  { key: "code", label: "Code" },
  { key: "status", label: "Status" },
  { key: "amount", label: "Amount" },
  { key: "description", label: "Description" },
  { key: "createdBy", label: "Created By" },
  { key: "createdDt", label: "Date Transaction" },
];

const History: FC = () => {
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<TSortTable>("desc");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [dataJournal, setDataJournal] = useState<IResJournalHistory[]>([]);

  const [monthOptions, setMonthOptions] = useState<Option[]>([]);
  const [selectedMonthTimeframe, setSelectedMonthTimeframe] = useState<string>(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [selectedMonthLable, setSelectedMonthLable] =
    useState<string>("This Month");

  const monthOptionFuncton = () => {
    const listMonth: Option[] = [];
    for (let i = 0; i < 6; i++) {
      const date = moment().subtract(i, "months").startOf("month").toDate();
      listMonth.push({
        label:
          MONTH_LIST.find((month) => month.value === moment(date).format("MM"))
            ?.label || "",
        value: moment(date).format("YYYY-MM-DD"),
      });
    }

    return listMonth;
  };

  const { data: dataIncomeExpenses, isLoading: isLoadingIncomeExpenses } =
    getIncomeExpenses({
      monthTimeFrame: selectedMonthTimeframe || moment().format("YYYY-MM-DD"),
    });

  const { data, isLoading } = getJournalHistory({
    page,
    limit,
    sort,
    order,
    monthTimeFrame: selectedMonthTimeframe,
    status: "",
    search,
  });

  const handleSort = useHandleSort({
    setSort,
    setSortBy: setOrder,
    sortBy: order,
  });

  useEffect(() => {
    if (data?.data?.items) {
      setDataJournal(data?.data?.items || []);
      setOffset((data?.data.currentPage - 1) * 10);
    }
  }, [data?.data?.items]);

  useEffect(() => {
    setMonthOptions(monthOptionFuncton());
  }, []);

  useEffect(() => {
    setSelectedMonthLable(
      monthOptions.find((option) => option.value === selectedMonthTimeframe)
        ?.label || ""
    );
  }, [selectedMonthTimeframe]);

  return (
    <>
      <Helmet title="Squirrel - Journal" />
      <HeaderPage label="Store Journal">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
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
                <TypographyP className="font-semibold">
                  Month Timeframe :
                </TypographyP>
                {/* <DatePickerWithRange /> */}
                <Select
                  onValueChange={(value) => setSelectedMonthTimeframe(value)}
                  value={selectedMonthTimeframe}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Month</SelectLabel>
                      {monthOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[90%] overflow-auto scrollbar-hide">
            <div className="w-full flex gap-10">
              <CardIncomeExpenses
                label="Income"
                percentage={
                  dataIncomeExpenses?.data?.income.incomeCalculateThisMonth ||
                  "0%"
                }
                values={
                  dataIncomeExpenses?.data?.income.totalIncomeThisMonth || 0
                }
                description="from 100%"
                isLoading={isLoadingIncomeExpenses}
                timeLabel={selectedMonthLable}
                count={
                  dataIncomeExpenses?.data?.income.countIncomeThisMonth || 0
                }
              />
              <CardIncomeExpenses
                label="Expenses"
                percentage={
                  dataIncomeExpenses?.data?.expenses
                    .expensesCalculateThisMonth || "0%"
                }
                values={
                  dataIncomeExpenses?.data?.expenses.totalExpensesThisMonth || 0
                }
                description="from 100%"
                isLoading={isLoadingIncomeExpenses}
                timeLabel={selectedMonthLable}
                count={
                  dataIncomeExpenses?.data?.expenses.countExpensesThisMonth || 0
                }
              />
              <CardIncomeExpenses
                label="Provit"
                percentage={
                  dataIncomeExpenses?.data?.provit.provitGrowth || "0%"
                }
                values={dataIncomeExpenses?.data?.provit.provitThisMonth || 0}
                description="from 100%"
                isLoading={isLoadingIncomeExpenses}
                timeLabel={selectedMonthLable}
                count={dataIncomeExpenses?.data?.provit.marginProv || 0}
              />
            </div>
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
                  dataJournal.map((item: IResJournalHistory, index: number) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {index + 1 + offset}
                      </TableCell>
                      <TableCell>{item.code}</TableCell>
                      <TableCell className="group">
                        {item.status == "DEBIT" ? (
                          <Badge className=" bg-green-500">{item.status}</Badge>
                        ) : (
                          <Badge className="bg-orange-500">{item.status}</Badge>
                        )}
                      </TableCell>
                      <TableCell>{conversion(item.amount)}</TableCell>
                      <TableCell>{item.description}</TableCell>
                      <TableCell>{item.createdBy}</TableCell>
                      <TableCell>{String(item.createdDt)}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="w-full flex justify-between px-10">
            <TypographyH3>Total</TypographyH3>
            <TypographyH3>
              {conversion(
                (dataJournal.length &&
                  dataJournal
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
