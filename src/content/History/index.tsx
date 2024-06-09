import HeaderPage from "@/components/HeaderPage";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import TableTrransaction from "./components/TableTransaction";
import { TypographyH3, TypographyP } from "@/components/ui/typograpgy";
import FilterSearch from "../Analytic/components/FilterSearch";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import DatePickerWithRange from "@/components/DatePickerWithRange";

const History: FC = () => {
  return (
    <>
      <Helmet title="Squirrel - History" />
      <HeaderPage label="History">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <TypographyH3 className="text-[20px]">
              Riwayat Transaksi
            </TypographyH3>
            <div className="flex gap-2 items-center">
              <div className="flex gap-2 pt-7">
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
              <div>
                <TypographyP className="font-semibold">Timeframe :</TypographyP>
                <DatePickerWithRange />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <TableTrransaction />
          </CardContent>
        </Card>
      </HeaderPage>
    </>
  );
};

export default History;
