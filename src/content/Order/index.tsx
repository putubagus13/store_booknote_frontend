import CardProduct from "@/components/CardProduct";
import HeaderPage from "@/components/HeaderPage";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyH3, TypographyH4 } from "@/components/ui/typograpgy";
import { Search } from "lucide-react";
import { FC } from "react";

interface IDataProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  totalSold: number;
}

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
  const data: IDataProduct[] = [
    {
      id: "1",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "2",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "3",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "4",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "5",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "6",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "7",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "8",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "9",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "10",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "11",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "12",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "13",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "14",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "15",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "16",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "17",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "18",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "19",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
    {
      id: "20",
      name: "Cake",
      price: 10000,
      image: "https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg",
      totalSold: 10,
    },
  ];
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
            <TypographyH3>Customer Order</TypographyH3>
          </CardHeader>
        </Card>
      </div>
    </HeaderPage>
  );
};

export default Order;
