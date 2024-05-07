import { FC } from "react";
import { Card, CardContent, CardDescription } from "./ui/card";
import { TypographyH4 } from "./ui/typograpgy";
import { Edit, ShoppingCart } from "lucide-react";

interface Props {
  price: number;
  name: string;
  image: string;
  totalSold?: number;
  id?: string;
}

const CardProduct: FC<Props> = ({ price, name, image, totalSold }) => {
  return (
    <>
      <Card className="relative scale-100 md:scale-110 h-[180px] overflow-hidden bg-accent-foreground shadow-md group mb-4">
        <div className="overflow-hidden">
          <img className="w-full h-24 object-cover" src={image} alt="food" />
        </div>
        <CardContent className="pt-4 bg-secondary px-2">
          <TypographyH4 className="text-[16px]">{name}</TypographyH4>
          <p className="text-[12px]">Rp{price}</p>
          <div className="w-full flex justify-end items-center gap-1">
            <ShoppingCart size={14} />
            <p className="text-[12px]">{totalSold ?? 0}</p>
          </div>
          <button className="absolute inset-x-0 -bottom-52 left-0 w-full h-full group-hover:-translate-y-52 transition-all duration-500 bg-primary/80">
            <CardDescription className="p-4 text-secondary flex flex-col justify-center items-center">
              <Edit size={30} />
              Edit
            </CardDescription>
          </button>
        </CardContent>
      </Card>
    </>
  );
};

export default CardProduct;
