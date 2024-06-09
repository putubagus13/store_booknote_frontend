import HeaderPage from "@/components/HeaderPage";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import CardValue from "./components/CardValue";
import ChartData from "./components/Chart";
import DatePickerWithRange from "@/components/DatePickerWithRange";
import { TypographyP } from "@/components/ui/typograpgy";

const Analytic: FC = () => {
  return (
    <>
      <Helmet title="Squirrel - Analytic" />
      <HeaderPage label="Analytic">
        <div className="flex flex-col xl:flex-row gap-4 h-full]">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col w-full h-auto">
              <TypographyP className="font-semibold">Timeframe :</TypographyP>
              <DatePickerWithRange />
            </div>
            <div className="flex gap-4">
              <CardValue
                label="Penjualan"
                timeLabel="Minggu Ini"
                values={200000}
                percentage={25}
                description="dari minggu sebelumnya"
              />
              <CardValue
                label="Penjualan"
                timeLabel="Bulain Ini"
                values={200000}
                percentage={-25}
                description="dari bulain sebelumnya"
              />
              <CardValue
                label="Top Produk"
                timeLabel="Bulain Ini"
                values={200000}
                percentage={-25}
                description="dari bulain sebelumnya"
              />
              <CardValue
                label="Top Produk"
                timeLabel="Bulain Ini"
                values={200000}
                percentage={-25}
                description="dari bulain sebelumnya"
              />
            </div>
            <div className="w-full flex gap-4">
              <ChartData label="Grafik Penjualan" />
              <ChartData label="Top Produk" />
            </div>
          </div>
        </div>
      </HeaderPage>
    </>
  );
};

export default Analytic;
