import HeaderPage from "@/components/HeaderPage";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { FC } from "react";
import CardOrder from "./components/CardOrder";
import PaginationCustom from "@/components/PaginationCustom";
import { TypographyH4 } from "@/components/ui/typograpgy";

const Order: FC = () => {
  return (
    <HeaderPage label="List Order">
      <div className="flex gap-2 w-full h-full">
        <div className="flex w-full h-full flex-col gap-4">
          <div className="flex w-full items-center gap-10 pt-2">
            <TypographyH4 className="font-light">
              Hi Chef, ayo buat pesanan pelanggan
            </TypographyH4>
            {/* <TypographyP>Hi Chef, ayo buat pesanan pelanggan</TypographyP> */}
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari pesanan..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          </div>
          <Card className="h-full w-full border-none shadow-inner pt-10">
            <CardContent className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:md:grid-cols-6 gap-4 justify-center items-center">
              <CardOrder />
              <CardOrder />
              <CardOrder />
              <CardOrder />
              <CardOrder />
              <CardOrder />
            </CardContent>
            <CardFooter>
              <PaginationCustom />
            </CardFooter>
          </Card>
        </div>
      </div>
    </HeaderPage>
  );
};

export default Order;
