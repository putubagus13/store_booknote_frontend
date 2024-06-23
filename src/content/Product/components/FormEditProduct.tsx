import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, FC, useEffect, useState } from "react";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Button } from "@/components/ui/button";
import { TypographyH3 } from "@/components/ui/typograpgy";
import { ArrowLeft, Info, LoaderIcon } from "lucide-react";
import { ICategory, useCategory } from "@/api/useCategory";
import { UNIT_OPTIONS } from "@/utils/options-select";
import {
  deleteProduct,
  getProductById,
  updateProduct,
  uploadImage,
} from "@/api/useProduct";
import { useFormik } from "formik";
import { IPayloadUpdateProduct } from "@/models/product";
import * as Yup from "yup";
import { ErrorPopupAlert, SuccessPopupAlert } from "@/components/AlertPopup";
// import { conversion } from "@/utils/general";

interface Props {
  onClose?: () => void;
  productId: string;
  actionSuccess: () => void;
}

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Nama produk wajib diisi"),
  imageUrl: Yup.string().required("Image wajib diisi"),
  stock: Yup.number().min(1, "Jumlah minimum 1").required("Image wajib diisi"),
  price: Yup.number()
    .min(100, "nilai harga minimum 100")
    .required("Image wajib diisi"),
  categoryIds: Yup.string().required("Produk kategory wajib diisi"),
  unit: Yup.string().required("satuan wajib diisi"),
});

const FormEditProduct: FC<Props> = ({ onClose, productId, actionSuccess }) => {
  const [selectedCategory, setSelectedCategory] = useState<Option[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);

  // get category
  const { data, isLoading } = useCategory();

  // get product by id
  const {
    data: product,
    isLoading: productLoading,
    refetch,
  } = getProductById(productId || "");

  // action update product
  const { mutate: handleUpdateProduct, isPending: submitPending } =
    updateProduct(
      {
        onError: (error: any) => {
          setErrorMessage(error.data.response.message);
        },
        onSuccess: () => {
          refetch();
          actionSuccess();
          setErrorMessage("");
          setOpenModalSuccess(true);
          setInterval(() => {
            setOpenModalSuccess(false);
          }, 2500);
        },
      },
      productId || "0"
    );

  // form formik
  const {
    errors,
    values,
    handleChange,
    handleSubmit,
    setValues,
    setFieldValue,
    touched,
  } = useFormik<IPayloadUpdateProduct>({
    initialValues: {
      productName: "",
      imageUrl: "",
      price: 0,
      stock: 0,
      categoryIds: "",
      unit: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      handleUpdateProduct(values);
    },
  });
  const { mutate: uploadFile, isPending: imagePending } = uploadImage({
    onSuccess(data) {
      setFieldValue("imageUrl", data[0]);
    },
    onError(error: any) {
      setErrorMessage(error.data.response.message);
    },
  });

  //action delete product
  const {} = deleteProduct({
    onError: (error: any) => {
      setErrorMessage(error.data.response.message);
    },
    onSuccess: () => {
      refetch();
      actionSuccess();
      setErrorMessage("");
      setOpenModalSuccess(true);
      setInterval(() => {
        setOpenModalSuccess(false);
      }, 2500);
    },
  });

  // handle change image
  const handleChageImage = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const typeFile = file.type.split("/");

      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("Maximum file size 1 MB");
      } else if (
        typeFile[1] !== "png" &&
        typeFile[1] !== "jpg" &&
        typeFile[1] !== "jpeg"
      ) {
        setErrorMessage("File must JPG, JPEG, or PNG");
      } else {
        uploadFile(Array.from(e.target.files));
        setErrorMessage("");
      }
    }
  };

  //for initial value
  useEffect(() => {
    setSelectedCategory(product?.data?.productCategories || []);
    setSelectedCategoryIds(
      product?.data?.productCategories.map((item) => item.value).join(",") || ""
    );
  }, [product]);

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      categoryIds: selectedCategoryIds || "",
      productName: product?.data?.name || "",
      price: product?.data?.price || 0,
      stock: product?.data?.stock || 0,
      imageUrl: product?.data?.imageUrl || "",
      unit: product?.data?.unit || "",
    }));
  }, [selectedCategoryIds, product]);

  return (
    <>
      <Card className="w-full lg:w-[400px] h-full">
        <CardHeader className="flex">
          <TypographyH3 className="flex gap-4 items-center">
            <Button onClick={onClose} size="icon" className="rounded-full">
              <ArrowLeft size={18} />
            </Button>
            Edit Produk
          </TypographyH3>
        </CardHeader>
        <CardContent className="pt-5 overflow-auto scrollbar-hide">
          {!productLoading ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {!imagePending && (
                <Card className="mb-4">
                  <CardContent className="w-full h-[250px] overflow-hidden p-1">
                    <img
                      src={values.imageUrl || product?.data?.imageUrl}
                      className="h-full w-full rounded-sm object-contain"
                    />
                  </CardContent>
                </Card>
              )}
              {imagePending && (
                <div className="w-full flex justify-center items-center">
                  <LoaderIcon className="animate-spin" />{" "}
                </div>
              )}
              <div className="flex flex-col gap-2">
                <Label>Nama Produk</Label>
                <Input
                  name="productName"
                  value={values.productName}
                  placeholder="Masukan nama produk"
                  onChange={handleChange}
                  errors={errors.productName}
                  touched={touched.productName}
                />
              </div>
              <div className="flex gap-2">
                <div className="flex flex-col gap-2">
                  <Label>Jumlah Produk</Label>
                  <Input
                    name="stock"
                    type="number"
                    value={values.stock}
                    placeholder="Masukan jumlah produk"
                    onChange={handleChange}
                    errors={errors.stock}
                    touched={touched.stock}
                  />
                </div>
                <div className="flex flex-col gap-2 w-34">
                  <Label>Satuan</Label>
                  <Select
                    value={values.unit}
                    name="unit"
                    onValueChange={(value) => setFieldValue("unit", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih satuan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {UNIT_OPTIONS.map((unit, index) => (
                          <SelectItem key={unit + index} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.unit && touched.unit && (
                    <label className="text-[10px] text-destructive">
                      <Info size={12} className="inline-block mr-1" />
                      {errors.unit}
                    </label>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label>Produk Kategory</Label>
                <MultipleSelector
                  value={selectedCategory}
                  defaultOptions={
                    !isLoading
                      ? data?.data?.map((item: ICategory, _) => {
                          return { label: item.name, value: item.id };
                        }) || []
                      : []
                  }
                  placeholder="Pilih kategory produk"
                  emptyIndicator={
                    <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                      Kategory tidak ditemukan
                    </p>
                  }
                  inputProps={{ maxLength: 5 }}
                  onChange={(value: Option[]) => {
                    setSelectedCategory(value);
                    setSelectedCategoryIds(
                      value.map((item) => item.value).join(",")
                    );
                  }}
                />
                {errors.categoryIds && touched.categoryIds && (
                  <label className="text-[10px] text-destructive">
                    <Info size={12} className="inline-block mr-1" />
                    {errors.categoryIds}
                  </label>
                )}
              </div>
              <div className="relative flex flex-col gap-2">
                <Label>Harga</Label>
                <Input
                  name="price"
                  className="pl-8"
                  type="number"
                  value={values.price}
                  onChange={handleChange}
                  placeholder="Masukan harga produk"
                  errors={errors.price}
                  touched={touched.price}
                />
                <Label className="absolute bottom-[14px] left-2">Rp</Label>
              </div>
              <div className="relative flex flex-col gap-2">
                <Label>Gambar Product</Label>
                {errorMessage && (
                  <Label className="text-destructive">{errorMessage}</Label>
                )}
                <Input
                  name="productImage"
                  type="file"
                  placeholder="Pilih gambar produk"
                  onChange={handleChageImage}
                />
              </div>

              <Button type="submit">
                {submitPending ? (
                  <span className="flex gap-1 items-center">
                    <LoaderIcon className="animate-spin" /> Proses..
                  </span>
                ) : (
                  "Ubah Product"
                )}
              </Button>
              <Button onClick={onClose} variant="outline">
                Close
              </Button>
            </form>
          ) : (
            <div className="w-full h-60 flex justify-center items-center">
              <LoaderIcon className="animate-spin" />{" "}
            </div>
          )}
        </CardContent>
      </Card>
      <ErrorPopupAlert
        message={errorMessage}
        onClose={() => setOpenModalError(!openModalError)}
        open={openModalError}
      />
      <SuccessPopupAlert
        message="Product berhasil diperbaharui!"
        open={openModalSuccess}
      />
    </>
  );
};

export default FormEditProduct;
