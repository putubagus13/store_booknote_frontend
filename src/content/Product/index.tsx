import HeaderPage from "@/components/HeaderPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import { TypographyH4 } from "@/components/ui/typograpgy";
// import { Separator } from "@radix-ui/react-dropdown-menu";
import { Plus, Search } from "lucide-react";
import ListCategory from "./components/ListCategory";
import { Separator } from "@/components/ui/separator";
import CardProduct from "@/components/CardProduct";
import { Input } from "@/components/ui/input";
import { IDataProduct } from "@/models/product";
import { dataProduct as data } from "@/utils/damiData";
import { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import FormAdddProduct from "./components/FormAddProfuct";

const emptyDataStype = (data: IDataProduct[]) => {
  if (data.length > 0) {
    return `grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 
    xl:grid-cols-6 2xl:grid-cols-8 gap-6 w-full h-full bg-inherit shadow-inner 
    p-4 rounded-md overflow-y-scroll scrollbar-hide`;
  } else {
    return "flex items-center justify-center w-full h-full";
  }
};

const ModalAddProduct: FC = () => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm" className="gap-2">
          <Plus size={18} />
          Tambah Produk
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Produk Baru</DialogTitle>
          <DialogDescription>
            Isi data produk yang ingin ditambahkan
          </DialogDescription>
        </DialogHeader>
        <FormAdddProduct />
      </DialogContent>
    </Dialog>
  );
};

export default function Product() {
  // const handleAddProduct = () => {
  //   console.log("add product");
  // };
  return (
    <HeaderPage
      // onClick={handleAddProduct}
      label="Product"
      description="Kelola produkmu disini"
      // buttonLable="Tambah Produk"
      modalComponent={<ModalAddProduct />}
      // overflow
    >
      <div className="flex flex-col md:flex-row w-full h-full gap-2 md:gap-0">
        <Card id="nav-category" className="w-full md:w-[250px] h-max">
          <CardHeader className="flex flex-row items-center justify-between rounded-md bg-accent">
            {/* #######################  LIST CATEGORY  ############################## */}
            <TypographyH4>Kategory</TypographyH4>
            {/* <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={"outline"}
                    size={"icon"}
                    className="rounded-full"
                  >
                    <Plus size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Tambah kategory</TooltipContent>
              </Tooltip>
            </TooltipProvider> */}
          </CardHeader>
          <CardContent className="p-1">
            <ListCategory />
          </CardContent>
        </Card>
        <Separator
          orientation="vertical"
          className="mx-4 hidden md:block h-[80%]"
        />
        <div className="flex w-full h-full flex-col gap-4">
          {/* ############################  FILTER  ################################# */}
          <div className="flex w-full items-center gap-10">
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

          {/* #########################  LIST PRODUCT  ############################ */}
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
                    edit
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
      </div>
    </HeaderPage>
  );
}
