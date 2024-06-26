import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { conversion } from "@/utils/general";
import React, { FC } from "react";

interface Props {
  lable: string;
  value: number;
  unit?: string;
  className?: string;
  icon: React.ReactNode;
}

const CardProductDetail: FC<Props> = ({
  lable,
  value,
  unit,
  icon,
  className,
}) => {
  return (
    <Card className={cn("flex gap-2 items-center px-4", className)}>
      <div className="w-10 h-10 flex justify-center items-center">{icon}</div>
      <div className="flex flex-col gap-1 w-full">
        <p className="w-full flex justify-between text-[12px] items-center">
          {lable}:{" "}
          <span className=" font-semibold text-[16px]">
            {lable == "Total Penjualan" ? conversion(value) : value}{" "}
            {unit && lable !== "Total Penjualan" ? unit : ""}
          </span>
        </p>
      </div>
    </Card>
  );
};

export default CardProductDetail;
