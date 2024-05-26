import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { TypographyBlockquote } from "@/components/ui/typograpgy";
import { FC } from "react";
import CardList from "./CardList";
import { Button } from "@/components/ui/button";

const CardOrder: FC = () => {
  return (
    <Card className="w-60 bg-primary-foreground border-primary shadow-lg">
      <CardHeader className="h-10 px-5 py-0 flex justify-center">
        <TypographyBlockquote className="text-[20px] font-medium flex justify-between dark:text-black">
          <span>Lify</span>
          <span>Meja 4</span>
        </TypographyBlockquote>
      </CardHeader>
      <Separator className="my-1" />
      <CardContent>
        <CardList />
        <CardList />
        <CardList />
        <CardList />
        <CardList />
      </CardContent>
      <CardFooter className="w-full flex justify-center">
        <Button>Selesai</Button>
      </CardFooter>
    </Card>
  );
};

export default CardOrder;
