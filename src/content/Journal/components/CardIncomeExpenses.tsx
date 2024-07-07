import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { TypographyH2, TypographyP } from "@/components/ui/typograpgy";
import { conversion } from "@/utils/general";
import { LoaderIcon } from "lucide-react";
import { FC } from "react";

interface Props {
  label: string;
  timeLabel: string;
  values: number;
  percentage: string;
  description: string;
  isLoading?: boolean;
  count: number;
}

const bgTheme = (label: string) => {
  switch (label) {
    case "Income":
      return "to-indigo-500/80";
    case "Expenses":
      return "to-orange-500/80";
    case "Provit":
      return "to-primary/80";
    default:
      return "";
  }
};

const CardIncomeExpenses: FC<Props> = ({
  label,
  timeLabel,
  values,
  percentage,
  description,
  isLoading,
  count,
}) => {
  return (
    <Card
      className={`w-full md:w-96 p-1 md:p-4 shadow-md bg-gradient-to-tl from-white/10 via-transparent via-70% ${bgTheme(
        label
      )}`}
    >
      <CardContent>
        <div className="flex justify-between items-center">
          <TypographyP>{timeLabel || "Not Found"}</TypographyP>
          <CardTitle>{label}</CardTitle>
        </div>
        <TypographyH2 className="text-[20px] md:text-[24px]">
          {isLoading ? (
            <span className="flex gap-1 items-center">
              <LoaderIcon className="animate-spin" /> Proses..
            </span>
          ) : (
            conversion(values)
          )}
        </TypographyH2>
        <TypographyP className="text-[11px] md:text-[14px] flex gap-2 items-center">
          <span
            className={`text-[12px] md:text-[16px] font-semibold ${
              isLoading ? "text-black" : "text-green-500"
            }`}
          >
            {isLoading ? (
              <span className="flex gap-1 items-center">
                <LoaderIcon className="animate-spin" />
              </span>
            ) : (
              `${percentage}`
            )}
          </span>
          {description}
        </TypographyP>
        {label !== "Provit" ? (
          <TypographyP>
            Count {label} : <span className="font-semibold">{count || 0}</span>{" "}
          </TypographyP>
        ) : (
          <TypographyP>
            Margin : <span className="font-semibold">{count || 0}</span>{" "}
          </TypographyP>
        )}
      </CardContent>
    </Card>
  );
};

export default CardIncomeExpenses;
