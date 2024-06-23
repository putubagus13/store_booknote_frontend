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
import { ICategory, useCategory } from "@/api/useCategory";
import { useFormik } from "formik";
import { IPayloadAddProduct } from "@/models/product";
import { useAuthenticatedStore } from "@/store";
import { addProduct, uploadImage } from "@/api/useProduct";
import { ErrorPopupAlert, SuccessPopupAlert } from "@/components/AlertPopup";
import { Info, LoaderIcon, Plus } from "lucide-react";
import * as Yup from "yup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { UNIT_OPTIONS } from "@/utils/options-select";

interface Props {
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
const FormAddProduct: FC<Props> = ({ actionSuccess }) => {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Option[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);
  const { userProfile } = useAuthenticatedStore();
  const { data, isLoading } = useCategory();
  const { mutate, isPending: submitPending } = addProduct({
    onError: (error: any) => {
      setErrorMessage(error.data.response.message);
      setOpenModalError(true);
    },
    onSuccess: () => {
      resetForm();
      setSelectedCategory([]);
      setSelectedCategoryIds([]);
      setOpenModalSuccess(true);
      setInterval(() => {
        setOpenModalSuccess(false);
      }, 2500);
      actionSuccess();
    },
  });

  const {
    values,
    errors,
    touched,
    handleSubmit,
    handleChange,
    resetForm,
    setFieldValue,
    setValues,
  } = useFormik<IPayloadAddProduct>({
    initialValues: {
      productName: "",
      imageUrl: "",
      price: 0,
      stock: 0,
      categoryIds: "",
      storeId: userProfile.storeId || "",
      unit: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values);
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

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      categoryIds: selectedCategoryIds.join(","),
    }));
  }, [selectedCategoryIds]);

  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button onClick={() => resetForm()} size="sm" className="gap-2">
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
          <Card>
            <CardContent className="pt-5 overflow-auto scrollbar-hide">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 h-[500px]"
              >
                <div className="flex flex-col gap-2">
                  <Label>Nama Produk</Label>
                  <Input
                    name="productName"
                    placeholder="Masukan nama produk"
                    errors={errors.productName}
                    touched={touched.productName}
                    value={values.productName}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex gap-2">
                  <div className="flex flex-col gap-2">
                    <Label>Jumlah Produk</Label>
                    <Input
                      name="stock"
                      type="number"
                      placeholder="Masukan jumlah produk"
                      errors={errors.stock}
                      touched={touched.stock || touched.unit}
                      value={values.stock}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex flex-col gap-2 w-34">
                    <Label>Satuan</Label>
                    <Select
                      name="unit"
                      value={values.unit}
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
                      setSelectedCategoryIds(value.map((item) => item.value));
                      setSelectedCategory(value);
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
                    placeholder="Masukan harga produk"
                    errors={errors.price}
                    touched={touched.price}
                    value={values.price}
                    onChange={handleChange}
                  />
                  <Label className="absolute top-[33px] left-2 text-black">
                    Rp
                  </Label>
                </div>
                <div className="relative flex flex-col gap-2">
                  <Label>Gambar Product</Label>
                  {errorMessage && (
                    <Label className="text-destructive">{errorMessage}</Label>
                  )}
                  <Input
                    name="imageUrl"
                    type="file"
                    placeholder="Pilih gambar produk"
                    onChange={handleChageImage}
                  />
                </div>
                {!imagePending && values.imageUrl && (
                  <Card>
                    <CardHeader>Preview</CardHeader>
                    <CardContent className="w-full h-[250px] overflow-hidden">
                      <img
                        src={values.imageUrl}
                        className="object-cover h-full w-full"
                      />
                    </CardContent>
                  </Card>
                )}
                {imagePending && (
                  <div className="w-full flex justify-center items-center">
                    <LoaderIcon className="animate-spin" />{" "}
                  </div>
                )}
                <Button>
                  {submitPending ? (
                    <span className="flex gap-1 items-center">
                      <LoaderIcon className="animate-spin" /> Proses..
                    </span>
                  ) : (
                    "Tambah Product"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>

      <ErrorPopupAlert
        message={errorMessage}
        onClose={() => setOpenModalError(!openModalError)}
        open={openModalError}
      />
      <SuccessPopupAlert
        message="Product berhasil ditambahkan!"
        open={openModalSuccess}
      />
    </>
  );
};

export default FormAddProduct;
