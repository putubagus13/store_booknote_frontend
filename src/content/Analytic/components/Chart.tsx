import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typograpgy";
import { FC } from "react";
import Chart from "react-apexcharts";

interface Props {
  label: string;
}

const ChartData: FC<Props> = ({ label }) => {
  const state = {
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
      },
    },
    series: [
      {
        name: "series-1",
        data: [30, 40, 45, 50, 49, 60, 70, 91],
      },
      {
        name: "series-2",
        data: [30, 50, 65, 20, 39, 70, 80, 91],
      },
    ],
  };
  return (
    <Card className="w-full">
      <CardHeader>
        <TypographyH3 className="text-[20px]">{label}</TypographyH3>
      </CardHeader>
      <CardContent>
        <Chart
          options={state.options}
          series={state.series}
          type="line"
          width={"100%"}
        />
      </CardContent>
    </Card>
  );
};

export default ChartData;
