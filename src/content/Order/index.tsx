import CardProduct from "@/components/CardProduct";
import HeaderPage from "@/components/HeaderPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyH3, TypographyH4 } from "@/components/ui/typograpgy";
import { Search, ShoppingCart } from "lucide-react";
import { FC, useState } from "react";
import CardOrder from "./components/CardOrder";
import { Separator } from "@/components/ui/separator";
import { conversion } from "@/utils/general";
import { IDataProduct } from "@/models/product";
import { dataProduct as data } from "@/utils/damiData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const emptyDataStype = (data: IDataProduct[]) => {
  if (data.length > 0) {
    return `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
      xl:grid-cols-6 2xl:grid-cols-8 gap-6 w-full h-full bg-inherit shadow-inner 
      p-4 rounded-md overflow-y-scroll scrollbar-hide`;
  } else {
    return "flex items-center justify-center w-full h-full";
  }
};

const Order: FC = () => {
  const [order, setOrder] = useState<IDataProduct[]>([]);

  const handleClickProduct = (id: string) => {
    const product = data.find((item) => item.id === id);
    if (product) {
      const isExist = order.find((item) => item.id === id);
      if (!isExist) {
        setOrder([...order, product]);
      }
    }
  };

  const totalOrder = order.reduce(
    (acc, item) => acc + (item.totalOrder ? item.totalOrder : 0),
    0
  );

  return (
    <HeaderPage label="Order">
      <div className="flex gap-2 w-full h-full">
        <div className="flex w-full h-full flex-col gap-4">
          <div className="flex w-full items-center gap-10 pt-2">
            <div className="flex gap-2">
              <Button size="sm" className="h-8">
                Terlaris
              </Button>
              <Button size="sm" className="h-8">
                Termurah
              </Button>
              <Button size="sm" className="h-8">
                Termahal
              </Button>
            </div>
            <div className="relative ml-auto flex-1 md:grow-0">
              <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Cari produk..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
              />
            </div>
          </div>

          <div className={emptyDataStype(data)}>
            {data.length > 0 ? (
              data.map((item: IDataProduct) => {
                return (
                  <CardProduct
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.image}
                    totalSold={item.totalSold}
                    onClick={() => handleClickProduct(item.id)}
                  />
                );
              })
            ) : (
              <div className="flex flex-col gap-1 justify-center items-center">
                <div className="w-32 h-32 overflow-hidden">
                  <img
                    src="/src/assets/empty-data.svg"
                    alt="empty"
                    className="w-full h-full object-contain"
                  />
                </div>
                <TypographyH4 className="font-light text-[14px]">
                  Produk tidak ditemukan
                </TypographyH4>
              </div>
            )}
          </div>
        </div>
        <Card className="w-[600px] h-max bg-secondary">
          <CardHeader>
            <TypographyH3 className="flex gap-2">
              Customer Order <ShoppingCart className="h-7 w-7" />
            </TypographyH3>
          </CardHeader>
          <Separator color="white" />
          <CardContent>
            <div className="flex flex-col gap-2 pt-2">
              {order.length > 0 ? (
                order.map((item: IDataProduct, index: number) => {
                  return (
                    <CardOrder
                      key={index}
                      onDelete={() => {
                        const newOrder = order.filter((_, i) => i !== index);
                        setOrder(newOrder);
                      }}
                      product={item}
                      callBack={(id, quantity, totalOrder) => {
                        const selectProduct = order.find(
                          (item) => item.id === id
                        );
                        if (selectProduct) {
                          const newOrder = order.map((item) => {
                            if (item.id === id) {
                              return { ...item, quantity, totalOrder };
                            }
                            return item;
                          });
                          setOrder(newOrder);
                          return;
                        }
                        setOrder([...order, { ...item, quantity, totalOrder }]);
                      }}
                    />
                  );
                })
              ) : (
                <p>Belum ada order</p>
              )}
            </div>
            <Separator color="white" className="my-4" />
            <div className="w-full flex justify-between">
              <TypographyH3>Total</TypographyH3>
              <TypographyH3>{conversion(totalOrder)}</TypographyH3>
            </div>
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>Metode Pembayaran</AccordionTrigger>
                <AccordionContent>
                  <RadioGroup
                    defaultValue="cash"
                    className="flex flex-col gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="cash" id="r1" />
                      <Label htmlFor="r1">CASH</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="qris" id="r2" />
                      <Label htmlFor="r2">QRIS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="debit" id="r3" />
                      <Label htmlFor="r3">DEBIT</Label>
                    </div>
                  </RadioGroup>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Button className="ml-auto w-full mt-4">Submit</Button>
          </CardContent>
        </Card>
      </div>
    </HeaderPage>
  );
};

export default Order;
