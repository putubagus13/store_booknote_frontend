import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  TypographyBlockquote,
  TypographyH3,
  TypographyP,
} from "@/components/ui/typograpgy";
import { IDataProduct } from "@/models/product";
import { conversion } from "@/utils/general";
import { CrossIcon, Minus, Plus } from "lucide-react";
import { FC, useEffect, useState } from "react";

interface Props {
  onDelete: () => void;
  product: IDataProduct;
  callBack?: (id: string, quantity: number, totalOrder: number) => void;
}

const CardOrder: FC<Props> = ({ product, callBack, onDelete }) => {
  const [quantity, setQuantity] = useState<number>(1);

  const nickname = product?.name.split(" ")[0];

  const handleIncrement = () => {
    setQuantity(quantity + 1);
  };

  const handleDecrement = () => {
    setQuantity(quantity - 1);
  };

  useEffect(() => {
    if (product?.id) {
      callBack && callBack(product?.id, quantity, product?.price * quantity);
    }
  }, [quantity]);

  return (
    <Card className="relative">
      <CardContent className="flex h-full justify-between items-center">
        <div className="flex gap-2 h-full w-full items-center pt-4">
          <Avatar className="h-16 w-16">
            <AvatarImage
              src={product?.image}
              alt={product?.name || "product"}
            />
            <AvatarFallback>{nickname}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col justify-center">
            <TypographyP className="font-medium">Cake</TypographyP>
            <TypographyBlockquote className="font-bold">
              {conversion(product?.price * quantity) || "price not found"}
            </TypographyBlockquote>
          </div>
        </div>

        {/* Counter quantity */}
        <div className="flex h-full justify-center items-center gap-4 pt-4">
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md"
            onClick={handleDecrement}
            disabled={quantity === 1}
          >
            <Minus size={16} />
          </Button>
          <TypographyH3>{quantity}</TypographyH3>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full shadow-md"
            onClick={handleIncrement}
          >
            <Plus size={16} />
          </Button>
        </div>
      </CardContent>
      <Button
        size="icon"
        className="absolute -left-1 -top-1 h-6 w-6 rounded-full"
        onClick={onDelete}
      >
        <CrossIcon className="rotate-45" size={10} />
      </Button>
    </Card>
  );
};

export default CardOrder;
