import HeaderPage from "@/components/HeaderPage";
import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";
import { TypographyH4 } from "@/components/ui/typograpgy";
// import { Separator } from "@radix-ui/react-dropdown-menu";
import { RotateCcw, Search } from "lucide-react";
// import ListCategory from "./components/ListCategory";
import { Separator } from "@/components/ui/separator";
import CardProduct from "@/components/CardProduct";
import { Input } from "@/components/ui/input";
import { IResDataProduct } from "@/models/product";
import { ChangeEvent, useEffect, useState } from "react";
import FormAdddProduct from "./components/FormAddProfuct";
import FormEditProduct from "./components/FormEditProduct";
import { getProduct } from "@/api/useProduct";
import FilterDropdown from "@/components/FilterDropdown";
import { useCategory } from "@/api/useCategory";

const emptyDataStype = (data: IResDataProduct[]) => {
  if (data.length > 0) {
    return `flex flex-wrap 
    gap-6 w-full h-full bg-inherit shadow-inner 
    p-4 rounded-md overflow-y-scroll scrollbar-hide`;
  } else {
    return "flex items-center justify-center w-full h-full";
  }
};

export default function Product() {
  const [editProduct, setEditProduct] = useState<boolean>(false);
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<string>("desc");
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [productId, setProductId] = useState<string>("");

  const { data, isLoading, refetch } = getProduct({
    page: 1,
    limit: 10,
    search: search,
    sort: sort,
    order: order,
    status: "active",
    categoryIds: category,
  });

  const onEditproduct = (productId: string) => {
    setProductId(productId);
    setEditProduct(true);
  };

  const { data: listCategory } = useCategory();

  useEffect(() => {
    if (data?.data?.items?.length === 0) {
      setEditProduct(false);
    }
  }, [data?.data?.items?.length]);

  return (
    <HeaderPage
      label="Product"
      description="The Product menu allows you to efficiently manage your product inventory."
      modalComponent={<FormAdddProduct actionSuccess={() => refetch()} />}
    >
      <div className="flex gap-2 w-full h-auto flex-col lg:flex-row">
        <div className="flex flex-1 w-full h-full flex-col gap-4">
          {/* ############################  FILTER  ################################# */}
          <div className="flex w-full items-center justify-between gap-10">
            <div className="flex gap-2">
              <Button
                onClick={() => {
                  setSort("totalSold");
                  setOrder("desc");
                }}
                size="sm"
                className="h-8"
              >
                Bestseller
              </Button>
              <Button
                onClick={() => {
                  setSort("price");
                  setOrder("asc");
                }}
                size="sm"
                className="h-8"
              >
                Cheapest
              </Button>
              <Button
                onClick={() => {
                  setSort("price");
                  setOrder("desc");
                }}
                size="sm"
                className="h-8"
              >
                Expensive
              </Button>
              <Button
                onClick={() => {
                  setSort("");
                  setOrder("");
                  setCategory("");
                }}
                size="icon"
                variant="outline"
                className="h-8"
              >
                <RotateCcw size={18} />
              </Button>
            </div>
            <div className="flex gap-2">
              <FilterDropdown
                data={
                  listCategory?.data?.map((item) => ({
                    label: item.name,
                    value: item.id,
                  })) || []
                }
                selected={category}
                onClick={setCategory}
                parentLabel="Category"
              />
              <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="absolute z-10 left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search product..."
                  className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
              </div>
            </div>
          </div>

          {/* #########################  LIST PRODUCT  ############################ */}
          <div className={emptyDataStype(data?.data?.items || [])}>
            {!isLoading && data?.data?.items?.length ? (
              data?.data?.items?.map((item: IResDataProduct) => {
                return (
                  <CardProduct
                    key={item.id}
                    onClick={() => onEditproduct(item.id)}
                    name={item.name}
                    price={item.price}
                    image={item.imageUrl}
                    totalSold={item.totalSold}
                    edit
                  />
                );
              })
            ) : (
              <div className="flex flex-col h-96 gap-1 justify-center items-center">
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

        {editProduct && (
          <>
            <Separator
              orientation="vertical"
              className="mx-4 hidden md:block h-[80%]"
            />
            <FormEditProduct
              productId={productId}
              onClose={() => {
                setProductId("");
                setEditProduct(false);
              }}
              actionSuccess={() => refetch()}
            />
          </>
        )}
      </div>
    </HeaderPage>
  );
}
