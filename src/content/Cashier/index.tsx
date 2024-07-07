import CardProduct from "@/components/CardProduct";
import HeaderPage from "@/components/HeaderPage";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { TypographyH3, TypographyH4 } from "@/components/ui/typograpgy";
import { LoaderIcon, RotateCcw, Search, ShoppingCart } from "lucide-react";
import { ChangeEvent, FC, useState } from "react";
import CarCount from "./components/CardCount";
import { Separator } from "@/components/ui/separator";
import { conversion } from "@/utils/general";
import { IResDataProduct } from "@/models/product";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
import { getProduct } from "@/api/useProduct";
import FilterDropdown from "@/components/FilterDropdown";
import { useCategory } from "@/api/useCategory";
import { productOrder } from "@/api/useTransaction";
import { IPayloadProductOrder } from "@/models/transaction";
import { useAuthenticatedStore } from "@/store";
import { ErrorPopupAlert, SuccessPopupAlert } from "@/components/AlertPopup";

const emptyDataStype = (data: IResDataProduct[]) => {
  if (data.length > 0) {
    return `flex flex-wrap 
    gap-6 w-full h-auto bg-inherit shadow-inner 
    p-4 rounded-md overflow-y-scroll scrollbar-hide`;
  } else {
    return "flex items-center justify-center w-full h-full";
  }
};

const Cashier: FC = () => {
  const [orderProduct, setOrderProduct] = useState<IResDataProduct[]>([]);
  const [sort, setSort] = useState<string>("");
  const [order, setOrder] = useState<string>("desc");
  const [search, setSearch] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);

  const { userProfile } = useAuthenticatedStore();

  const { data: listCategory } = useCategory();
  const {
    data: product,
    isLoading,
    refetch,
  } = getProduct({
    page: 1,
    limit: 10,
    search: search,
    sort: sort,
    order: order,
    status: "active",
    categoryIds: category,
  });

  const handleClickProduct = (id: string) => {
    const itemProduct = product?.data?.items.find((item) => item.id === id);
    if (itemProduct) {
      const isExist = orderProduct.find((item) => item.id === id);
      if (!isExist) {
        setOrderProduct([...orderProduct, itemProduct]);
      }
    }
  };

  const totalOrder = orderProduct.reduce(
    (acc, item) => acc + (item.totalOrder ? item.totalOrder : 0),
    0
  );

  const { mutate, isPending } = productOrder({
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
      setOpenModalError(true);
    },
  });

  const handleSubmitOrder = (payload: IResDataProduct[]) => {
    try {
      payload.forEach((item: IResDataProduct) => {
        const dataProduct: IPayloadProductOrder = {
          productId: item.id,
          productQuantity: item.quantity,
          amount: item.totalOrder,
          storeId: userProfile.storeId,
          paymentMethod: "cash",
        };

        mutate(dataProduct);
      });

      setOpenModalSuccess(true);
      setTimeout(() => {
        setOpenModalSuccess(false);
        refetch();
      }, 2500);
      setOrderProduct([]);
    } catch (error) {
      setErrorMessage("transaksi gagal");
      setOpenModalError(true);
    }
  };

  return (
    <HeaderPage
      label="Cashier"
      description="This menu allows you to make transactions with customers."
    >
      <div className="flex flex-col lg:flex-row gap-2 w-full h-full">
        <div className="flex w-full h-full flex-col gap-4">
          <div className="flex w-full items-center justify-between gap-10 pt-2">
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

          <div className={emptyDataStype(product?.data?.items || [])}>
            {!isLoading && product?.data?.items?.length ? (
              product?.data?.items?.map((item: IResDataProduct) => {
                return (
                  <CardProduct
                    key={item.id}
                    name={item.name}
                    price={item.price}
                    image={item.imageUrl}
                    totalSold={item.totalSold}
                    disabled={item.stock == 0}
                    stock={item.stock}
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
                  Product not found
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
              {orderProduct.length > 0 ? (
                orderProduct.map((item: IResDataProduct, index: number) => {
                  return (
                    <CarCount
                      key={index}
                      onDelete={() => {
                        const newOrder = orderProduct.filter(
                          (_, i) => i !== index
                        );
                        setOrderProduct(newOrder);
                      }}
                      product={item}
                      callBack={(id, quantity, totalOrder) => {
                        const selectProduct = orderProduct.find(
                          (item) => item.id === id
                        );
                        if (selectProduct) {
                          const newOrder = orderProduct.map((item) => {
                            if (item.id === id) {
                              return { ...item, quantity, totalOrder };
                            }
                            return item;
                          });
                          setOrderProduct(newOrder);
                          return;
                        }
                        setOrderProduct([
                          ...orderProduct,
                          { ...item, quantity, totalOrder },
                        ]);
                      }}
                    />
                  );
                })
              ) : (
                <p>No orders yet</p>
              )}
            </div>
            <Separator color="white" className="my-4" />
            <div className="w-full flex justify-between">
              <TypographyH3>Total</TypographyH3>
              <TypographyH3>{conversion(totalOrder)}</TypographyH3>
            </div>
            {/* <Accordion type="single" collapsible>
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
            </Accordion> */}
            <Button
              onClick={() => handleSubmitOrder(orderProduct)}
              className="ml-auto w-full mt-4"
            >
              {isPending ? (
                <span className="flex gap-1 items-center">
                  <LoaderIcon className="animate-spin" /> Proses..
                </span>
              ) : (
                "Submit"
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
      <ErrorPopupAlert
        message={errorMessage}
        onClose={() => setOpenModalError(!openModalError)}
        open={openModalError}
      />
      <SuccessPopupAlert
        message="Transaction Success!"
        open={openModalSuccess}
      />
    </HeaderPage>
  );
};

export default Cashier;
