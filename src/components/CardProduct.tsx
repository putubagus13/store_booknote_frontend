import { FC } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
import { TypographyH4 } from "./ui/typograpgy";
import { Edit, PackageOpen, ShoppingCart } from "lucide-react";
import { conversion } from "@/utils/general";
import { Badge } from "./ui/badge";

interface Props {
  price: number;
  name: string;
  image: string;
  totalSold: number;
  stock: number;
  id?: string;
  edit?: boolean;
  onClick?: () => void;
  disabled?: boolean;
}

const CardProduct: FC<Props> = ({
  price,
  name,
  image,
  totalSold,
  edit,
  disabled,
  stock,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`relative ${
        !disabled && "hover:scale-105"
      } transition-all duration-200`}
    >
      <Card className="relative w-40 min-h-[180px] overflow-hidden bg-accent-foreground shadow-md group mb-4">
        <div className={`overflow-hidden ${disabled && "blur-sm"}`}>
          <img className="w-full h-24 object-cover" src={image} alt="food" />
        </div>
        <CardContent className="pt-4 bg-secondary px-2 text-left h-28 flex flex-col justify-between">
          <div>
            <TypographyH4 className="text-[14px]">{name}</TypographyH4>
            <p className="text-[12px]">{conversion(price)}</p>
          </div>
          <div className="w-full flex justify-between mt-2 items-end gap-1">
            <div className="flex gap-1 items-center">
              <PackageOpen size={14} />
              <p className="text-[12px]">{stock ?? 0}</p>
            </div>
            <div className="flex gap-1 items-center">
              <ShoppingCart size={14} />
              <p className="text-[12px]">{totalSold ?? 0}</p>
            </div>
          </div>
          {edit && (
            <button className="absolute inset-x-0 -bottom-52 left-0 w-full h-full group-hover:-translate-y-52 transition-all duration-500 bg-primary/80">
              <CardDescription className="p-4 text-secondary flex flex-col justify-center items-center">
                <Edit size={30} />
                Edit
              </CardDescription>
            </button>
          )}
        </CardContent>
      </Card>
      {disabled && (
        <div className="absolute top-0 inset-x-0 bg-gray-600/50 h-24 flex justify-center items-center rounded-lg rounded-b-none">
          <Badge variant="destructive">SOLD OUT</Badge>
        </div>
      )}
    </button>
  );
};

export default CardProduct;
