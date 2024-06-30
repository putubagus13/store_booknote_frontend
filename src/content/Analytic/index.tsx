import HeaderPage from "@/components/HeaderPage";
import { FC, useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CardValue from "./components/CardValue";
import ChartData, { ChartDataTopProduct } from "./components/Chart";
// import DatePickerWithRange from "@/components/DatePickerWithRange";
import { TypographyP } from "@/components/ui/typograpgy";
import { getCardAnalityc, getChartAnalityc } from "@/api/useAnalityc";
import { MONTH_LIST } from "@/utils/options-select";
import moment from "moment";
import { Option } from "@/components/ui/multiple-selector";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Analytic: FC = () => {
  const [monthOptions, setMonthOptions] = useState<Option[]>([]);
  const [weekOptions, setWeekOptions] = useState<Option[]>([]);
  const [selectedMonthTimeframe, setSelectedMonthTimeframe] = useState<string>(
    moment().startOf("month").format("YYYY-MM-DD")
  );
  const [selectedWeekTimeframe, setSelectedWeekTimeframe] = useState<string>(
    moment().endOf("week").format("YYYY-MM-DD")
  );
  const [selectedMonthLable, setSelectedMonthLable] =
    useState<string>("This Month");
  const [selectedWeekLable, setSelectedWeekLable] =
    useState<string>("This Week");

  const { data, isLoading } = getCardAnalityc({
    weekTimeFrame: selectedWeekTimeframe,
    monthTimeFrame: selectedMonthTimeframe,
  });

  const { data: chart } = getChartAnalityc({
    weekTimeFrame: selectedWeekTimeframe,
    monthTimeFrame: selectedMonthTimeframe,
  });

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

  useEffect(() => {
    const weekOptionFunction = () => {
      const listWeek: Option[] = [];
      const startOfMonth = moment(selectedMonthTimeframe).startOf("month");
      const endOfMonth = moment(selectedMonthTimeframe).endOf("month");

      const weeks = [
        startOfMonth.clone().date(7), // Week 1 ends on the 7th
        startOfMonth.clone().date(14), // Week 2 ends on the 14th
        startOfMonth.clone().date(21), // Week 3 ends on the 21st
        startOfMonth.clone().date(28), // Week 4 ends on the 28th
        endOfMonth.clone(), // Week 5 ends on the last day of the month
      ];

      weeks.forEach((weekEnd, index) => {
        const weekStart =
          index === 0 ? startOfMonth : weeks[index - 1].clone().add(1, "day");
        const weekLabel = `Week ${index + 1}`;
        listWeek.push({
          label: weekLabel,
          value: `${weekStart.format("YYYY-MM-DD")},${weekEnd.format(
            "YYYY-MM-DD"
          )}`,
        });
      });

      return listWeek;
    };

    setSelectedWeekTimeframe(weekOptionFunction()[4].value);
    setWeekOptions(weekOptionFunction());
  }, [selectedMonthTimeframe]);

  useEffect(() => {
    setMonthOptions(monthOptionFuncton());
  }, []);

  useEffect(() => {
    setSelectedMonthLable(
      monthOptions.find((option) => option.value === selectedMonthTimeframe)
        ?.label || ""
    );
    setSelectedWeekLable(
      weekOptions.find((option) => option.value === selectedWeekTimeframe)
        ?.label || ""
    );
  }, [selectedMonthTimeframe, selectedWeekTimeframe]);

  return (
    <>
      <Helmet title="Squirrel - Analytic" />
      <HeaderPage label="Analytic">
        <div className="flex flex-col xl:flex-row gap-4 h-full]">
          <div className="flex flex-col gap-4 w-full">
            <div className="flex gap-4 w-full h-auto">
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
              <div>
                <TypographyP className="font-semibold">
                  Week Timeframe :
                </TypographyP>
                {/* <DatePickerWithRange /> */}
                <Select
                  value={selectedWeekTimeframe}
                  onValueChange={(value) => setSelectedWeekTimeframe(value)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a week" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Week</SelectLabel>
                      {weekOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex gap-4">
              <CardValue
                label="Seling"
                timeLabel={selectedMonthLable}
                values={data?.data?.totalAmountThisMonth || 0}
                percentage={data?.data?.growPercentThisMonth || "0%"}
                totalTransaction={data?.data?.totalTransactionThisMonth || 0}
                description="from the previous month"
                isLoading={isLoading}
              />
              <CardValue
                label="Seling"
                timeLabel={selectedWeekLable}
                values={data?.data?.totalAmountThisWeek || 0}
                percentage={data?.data?.growPercentThisWeek || "0%"}
                totalTransaction={data?.data?.totalTransactionThisWeek || 0}
                description="from the previous week"
                isLoading={isLoading}
              />
            </div>
            <div className="w-full flex flex-col lg:flex-row gap-4">
              <ChartData
                label="Sales Graph"
                dataDateArray={
                  chart?.data?.chartAnalitycTransaction.map(
                    (data) => data.createdDt
                  ) || []
                }
                dataValueArray={
                  chart?.data?.chartAnalitycTransaction.map((data) =>
                    Number(data.amount)
                  ) || []
                }
              />
              <ChartDataTopProduct
                label="Top Product"
                dataProductNameArray={
                  chart?.data?.chartAnalitycTopProduct.map(
                    (data) => data.name
                  ) || []
                }
                dataProductValueArray={
                  chart?.data?.chartAnalitycTopProduct.map(
                    (data) => data.totalQuantity
                  ) || []
                }
              />
            </div>
          </div>
        </div>
      </HeaderPage>
    </>
  );
};

export default Analytic;
