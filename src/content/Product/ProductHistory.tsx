import HeaderPage from "@/components/HeaderPage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  TypographyH3,
  TypographyH4,
  TypographyP,
} from "@/components/ui/typograpgy";
import {
  //   ArrowDownToDot,
  ChevronsLeftRight,
  CircleDollarSign,
  Package,
  RotateCcw,
  Search,
  ShoppingCart,
} from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";
import CardProductDetail from "./components/ProductDetailCard";
import { Separator } from "@/components/ui/separator";
// import { conversion } from "@/utils/general";
import { Input } from "@/components/ui/input";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import { getProductById, getProductHistory } from "@/api/useProduct";
import { useParams } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { format } from "date-fns";
import FilterDropdown from "@/components/FilterDropdown";
import { STATUS_PRODUCT_OPTIONS } from "@/utils/options-select";
import { Button } from "@/components/ui/button";
import { IHeadPayload, TSortTable } from "@/models/general";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { conversion, useHandleSort } from "@/utils/general";
import { Badge } from "@/components/ui/badge";
import { StatusProductHistory } from "@/utils/enums";
import { IResProductHistory } from "@/models/product";
import PaginationCustom from "@/components/PaginationCustom";
// import { IResProdductHistory } from "@/models/product";

const BugetView = (status: string) => {
  switch (status) {
    case StatusProductHistory.CREATE:
      return <Badge className="bg-blue-500">Ditambahkan</Badge>;
    case StatusProductHistory.UPDATE_STOCK:
      return <Badge className=" bg-green-500">Update Stok</Badge>;
    case StatusProductHistory.UPDATE_STOCK_PRICE:
      return <Badge className=" bg-orange-500">Update Stok dan Harga</Badge>;
    case StatusProductHistory.UPDATE_PRICE:
      return <Badge className=" bg-slate-500">Update Harga</Badge>;
    default:
      return <Badge>Badge</Badge>;
  }
};

const HEAD_TABLE: IHeadPayload[] = [
  { key: null, label: "No" },
  { key: "status", label: "Status" },
  { key: "priceGap", label: "Price Gap" },
  { key: "stockGap", label: "Stock Gap" },
  { key: "fullname", label: "Updated By" },
  { key: "createdDt", label: "Updated Date" },
];

const ProductHistory: FC = () => {
  const [timeFrame, setTimeFrame] = useState<DateRange | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("");
  //   const [offset, setOffset] = useState<number>(0);
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<TSortTable>("desc");
  const [search, setSearch] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(10);
  const [listProductHistory, setListProductHistory] = useState<
    IResProductHistory[]
  >([]);

  const { id: productId } = useParams();
  const { data: product } = getProductById(productId || "");
  const { data, isLoading: listProductLoading } = getProductHistory({
    productId: productId || "",
    page,
    limit,
    sort,
    order,
    startDate:
      timeFrame && timeFrame.from ? format(timeFrame.from, "yyyy/MM/dd") : "",
    endDate:
      timeFrame && timeFrame.to ? format(timeFrame.to, "yyyy/MM/dd") : "",
    search,
    status: filterStatus,
  });

  const handleSort = useHandleSort({
    setSort,
    setSortBy: setOrder,
    sortBy: order,
  });

  useEffect(() => {
    if (data?.data?.items) {
      setListProductHistory(data?.data.items);
      setOffset((data?.data.currentPage - 1) * 10);
    }
  }, [data?.data?.items]);

  return (
    <HeaderPage
      label="Product History"
      backButton
      description="Product History is a feature that allows you to see the history of product changes."
    >
      <div className="flex gap-4 w-full h-dvh">
        <Card className="w-[400px] h-[600px]">
          <CardHeader>
            <TypographyH4>Product Detail</TypographyH4>
          </CardHeader>
          <CardContent>
            <Card>
              <CardContent className="p-4 w-full h-full overflow-hidden">
                <img
                  src={product?.data?.imageUrl}
                  className=" object-contain"
                  alt=""
                />
              </CardContent>
            </Card>

            <div className="pt-4 flex flex-col gap-2">
              <CardProductDetail
                lable="Total Seling"
                value={Number(product?.data?.productHistory.profit) || 0}
                icon={<CircleDollarSign size={24} className=" text-primary" />}
              />
              <CardProductDetail
                lable="Sold Out"
                value={product?.data?.productHistory.totalSold || 0}
                unit={product?.data?.unit || ""}
                icon={<ShoppingCart size={24} className=" text-primary" />}
              />
              <CardProductDetail
                lable="Stok"
                value={product?.data?.stock || 0}
                unit="pcs"
                icon={<Package size={24} className=" text-primary" />}
              />
            </div>
          </CardContent>
        </Card>
        <Card className="w-full flex-1 h-full flex flex-col gap-2 justify-between">
          <Card className="border-none shadow-none">
            <CardHeader className="flex flex-row items-center justify-between">
              <TypographyH3 className="text-[20px]">
                {product?.data?.name || "Product not found"}
              </TypographyH3>
              <div className="flex gap-2 items-center">
                <div className="flex gap-2 pt-7 items-center">
                  <Button
                    onClick={() => {
                      setPage(1);
                      setFilterStatus("");
                      setSort("");
                      setOrder("desc");
                    }}
                    size="icon"
                    variant="outline"
                    className="h-8 "
                  >
                    <RotateCcw size={18} />
                  </Button>
                  <FilterDropdown
                    data={STATUS_PRODUCT_OPTIONS}
                    selected={filterStatus}
                    onClick={(value) => {
                      setFilterStatus(value);
                    }}
                    parentLabel="Filter Berdasarkan"
                  />
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Input
                      type="search"
                      placeholder="Cari..."
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
                    Timeframe :
                  </TypographyP>
                  <DatePickerWithRange selectedDate={setTimeFrame} />
                </div>
              </div>
            </CardHeader>
          </Card>
          <Card className="h-[90%] border-none shadow-none">
            <Separator />
            <CardContent className="h-[90%] overflow-auto scrollbar-hide">
              <Table className="w-full mt-4">
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
                  {!listProductLoading &&
                    listProductHistory.map(
                      (item: IResProductHistory, index) => {
                        return (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">
                              {offset + (index + 1)}
                            </TableCell>
                            <TableCell className="font-medium">
                              {BugetView(item.status || "")}
                            </TableCell>
                            <TableCell
                              className={`${
                                item.priceGap && item.priceGap > 0
                                  ? "text-green-500"
                                  : item.priceGap && item.priceGap < 0
                                  ? "text-red-500"
                                  : ""
                              } font-semibold`}
                            >
                              {(item.priceGap && conversion(item.priceGap)) ||
                                "-"}
                            </TableCell>
                            <TableCell
                              className={`${
                                item.stockGap > 0
                                  ? "text-green-500"
                                  : item.stockGap < 0
                                  ? "text-red-500"
                                  : ""
                              } font-semibold`}
                            >
                              {item.stockGap || "-"}
                            </TableCell>
                            <TableCell>{item.fullname}</TableCell>
                            <TableCell>{String(item.createdDt)}</TableCell>
                          </TableRow>
                        );
                      }
                    )}
                </TableBody>
              </Table>
              {listProductHistory.length <= 0 && (
                <div className="flex flex-col gap-1 justify-center items-center pt-10">
                  <div className="w-32 h-32 overflow-hidden">
                    <img
                      src="/src/assets/empty-data.svg"
                      alt="empty"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <TypographyH4 className="font-light text-[14px]">
                    data not found
                  </TypographyH4>
                </div>
              )}
            </CardContent>
            {listProductHistory.length > 0 && (
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
            )}
          </Card>

          {/* <Card className="x-4 pt-2">
            <CardContent>
              <TypographyH4 className="flex w-full justify-between">
                <span>Total</span>
                <span>{}</span>
              </TypographyH4>
            </CardContent>
          </Card> */}
        </Card>
      </div>
    </HeaderPage>
  );
};

export default ProductHistory;
