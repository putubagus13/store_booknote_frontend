import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { TypographyH3 } from "@/components/ui/typograpgy";
import { DataChartMonth } from "@/models/analityc";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import Chart from "react-apexcharts";

interface Props {
  label: string;
  dataDateArray: string[];
  dataValueArray: number[];
}

interface IPropsTopProductChart {
  label: string;
  dataProductNameArray: string[];
  dataProductValueArray: number[];
}

const ChartData: FC<Props> = ({ label, dataDateArray, dataValueArray }) => {
  const initialData: DataChartMonth[] = [];
  for (let day = 1; day <= moment().endOf("month").date(); day++) {
    initialData.push({
      createdDt: moment().date(day).format("YYYY-MM-DD"),
      amount: 0,
    });
  }

  const [stateChart, setStateChart] = useState<any>({
    options: {
      chart: {
        // id: "basic-bar",
        type: "area",
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        tickAmount:
          initialData.map((data) => data.createdDt).length <= 16
            ? "dataPoints"
            : 16,
        categories: initialData.map((data) => data.createdDt),
      },
    },
    series: [
      {
        name: "series-1",
        data: initialData.map((data) => data.amount),
      },
    ],
  });

  useEffect(() => {
    if (dataDateArray.length && dataValueArray.length) {
      setStateChart({
        options: {
          chart: {
            // id: "basic-bar",
            type: "area",
          },
          stroke: {
            curve: "smooth",
          },
          dataLabels: {
            enabled: false,
          },
          xaxis: {
            tickAmount: dataDateArray.length <= 16 ? "dataPoints" : 16,
            categories: dataDateArray,
          },
        },
        series: [
          {
            name: "Amount (Rp)",
            data: dataValueArray,
          },
        ],
      });
    }
  }, [dataDateArray, dataValueArray]);

  return (
    <Card className="w-full">
      <CardHeader>
        <TypographyH3 className="text-[20px]">{label}</TypographyH3>
      </CardHeader>
      <CardContent>
        <Chart
          options={stateChart.options}
          series={stateChart.series}
          type="area"
          width={"100%"}
          height={320}
        />
      </CardContent>
    </Card>
  );
};

export default ChartData;

export const ChartDataTopProduct: FC<IPropsTopProductChart> = ({
  label,
  dataProductNameArray,
  dataProductValueArray,
}) => {
  const chartState: any = {
    series: [
      {
        name: "Total Quantity",
        data: dataProductValueArray,
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          borderRadiusApplication: "end",
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: dataProductNameArray,
      },
    },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <TypographyH3 className="text-[20px]">{label}</TypographyH3>
      </CardHeader>
      <CardContent>
        <Chart
          options={chartState.options}
          series={chartState.series}
          type="bar"
          width={"100%"}
          height={320}
        />
      </CardContent>
    </Card>
  );
};
