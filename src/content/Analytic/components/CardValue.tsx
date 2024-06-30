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
  totalTransaction: number;
}

const CardValue: FC<Props> = ({
  label,
  timeLabel,
  values,
  percentage,
  description,
  isLoading,
  totalTransaction,
}) => {
  const validatePercentage = (percentage: string) => {
    if (percentage.includes("-")) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Card className="w-full md:w-96 p-1 md:p-4 shadow-md">
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
              isLoading
                ? "text-black"
                : validatePercentage(percentage)
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {isLoading ? (
              <span className="flex gap-1 items-center">
                <LoaderIcon className="animate-spin" />
              </span>
            ) : (
              `${validatePercentage(percentage) ? "+" : ""}${percentage}`
            )}
          </span>
          {description}
        </TypographyP>
        <TypographyP>
          Total Transaction:{" "}
          <span className="font-semibold">{totalTransaction || 0}</span>{" "}
        </TypographyP>
      </CardContent>
    </Card>
  );
};

export default CardValue;
