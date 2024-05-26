import HeaderPage from "@/components/HeaderPage";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import CardValue from "./components/CardValue";
import ChartData from "./components/Chart";
import TableTrransaction from "./components/TableTransaction";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH3, TypographyP } from "@/components/ui/typograpgy";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FilterSearch from "./components/FilterSearch";
import DatePickerWithRange from "@/components/DatePickerWithRange";

const Analytic: FC = () => {
  return (
    <>
      <Helmet title="Squirrel - Analytic" />
      <HeaderPage label="Analytic">
        <div className="flex flex-col w-full mb-4">
          <TypographyP className="font-semibold">Timeframe :</TypographyP>
          <DatePickerWithRange />
        </div>
        <div className="flex flex-col xl:flex-row gap-4">
          <div className="flex flex-col gap-4 w-full xl:w-1/2">
            <div className="flex gap-4">
              <CardValue
                label="Minggu Ini"
                values={200000}
                percentage={25}
                description="dari minggu sebelumnya"
              />
              <CardValue
                label="Bulain Ini"
                values={200000}
                percentage={-25}
                description="dari bulain sebelumnya"
              />
            </div>
            <ChartData />
          </div>
          <div className="w-full">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <TypographyH3 className="text-[20px]">
                  Riwayat Transaksi
                </TypographyH3>
                <div className="flex gap-2">
                  <FilterSearch />
                  <div className="relative ml-auto flex-1 md:grow-0">
                    <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Cari..."
                      className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <TableTrransaction />
              </CardContent>
            </Card>
          </div>
        </div>
      </HeaderPage>
    </>
  );
};

export default Analytic;
