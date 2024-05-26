import { Card, CardContent } from "@/components/ui/card";
import { TypographyH2, TypographyP } from "@/components/ui/typograpgy";
import { conversion } from "@/utils/general";
import { FC } from "react";

interface Props {
  label: string;
  values: number;
  percentage: number;
  description: string;
}

const CardValue: FC<Props> = ({ label, values, percentage, description }) => {
  const validatePercentage = (percentage: number) => {
    if (percentage < 0) {
      return false;
    } else {
      return true;
    }
  };
  return (
    <Card className="w-full md:w-96 p-1 md:p-4 shadow-md">
      <CardContent>
        <TypographyP>{label || "Not Found"}</TypographyP>
        <TypographyH2 className="text-[20px] md:text-[24px]">
          {conversion(values)}
        </TypographyH2>
        <TypographyP className="text-[11px] md:text-[14px] flex gap-2 items-center">
          <span
            className={`text-[12px] md:text-[16px] font-semibold ${
              validatePercentage(percentage) ? "text-green-500" : "text-red-500"
            }`}
          >{`${validatePercentage(percentage) ? "+" : ""}${percentage}%`}</span>
          {description}
        </TypographyP>
      </CardContent>
    </Card>
  );
};

export default CardValue;
