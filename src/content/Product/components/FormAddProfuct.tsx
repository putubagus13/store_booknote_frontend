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
import { FC, useState } from "react";
import MultipleSelector, { Option } from "@/components/ui/multiple-selector";
import { Button } from "@/components/ui/button";
// import { conversion } from "@/utils/general";

const OPTIONS: Option[] = [
  { label: "Elektronik", value: "elektronik" },
  { label: "Pakaian", value: "pakaian" },
  { label: "Rumah & Dapur", value: "rumah-dapur" },
  { label: "Buku", value: "buku" },
  { label: "Mainan & Permainan", value: "mainan-permainan" },
  {
    label: "Kecantikan & Perawatan Pribadi",
    value: "kecantikan-perawatan-pribadi",
  },
];

const FormAddProduct: FC = () => {
  const [selected, setSelected] = useState<Option[]>([]);

  console.log(selected);

  return (
    <Card>
      <CardContent className="pt-5 overflow-auto scrollbar-hide">
        <form className="flex flex-col gap-5 h-[500px]">
          <div className="flex flex-col gap-2">
            <Label>Nama Produk</Label>
            <Input
              name="productName"
              placeholder="Masukan nama produk"
              errors={""}
              touched
            />
          </div>
          <div className="flex gap-2">
            <div className="flex flex-col gap-2">
              <Label>Jumlah Produk</Label>
              <Input
                name="productQty"
                type="number"
                placeholder="Masukan jumlah produk"
                errors={""}
                touched
              />
            </div>
            <div className="flex flex-col gap-2 w-24">
              <Label>Satuan</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih satuan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="kg">Kg</SelectItem>
                    <SelectItem value="gram">g</SelectItem>
                    <SelectItem value="liter">liter</SelectItem>
                    <SelectItem value="pics">Pics</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <Label>Produk Kategory</Label>
            <MultipleSelector
              defaultOptions={OPTIONS}
              placeholder="Pilih kategory produk"
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  Kategory tidak ditemukan
                </p>
              }
              inputProps={{ maxLength: 5 }}
              onChange={(value: Option[]) => setSelected(value)}
            />
          </div>
          <div className="relative flex flex-col gap-2">
            <Label>Harga</Label>
            <Label className="absolute bottom-[14px] left-2">Rp</Label>
            <Input
              name="productPrice"
              className="pl-8"
              type="number"
              placeholder="Masukan harga produk"
              errors={""}
              touched
            />
          </div>
          <div className="relative flex flex-col gap-2">
            <Label>Gambar Product</Label>
            {/* <Label className="absolute bottom-[14px] left-2">Rp</Label> */}
            <Input
              name="productImage"
              type="file"
              placeholder="Pilih gambar produk"
              errors={""}
              touched
            />
          </div>
          <Card>
            <CardHeader>Preview</CardHeader>
            <CardContent className="w-full h-[250px] overflow-hidden">
              <img
                src="https://brunchcafe.com/wp-content/uploads/2020/12/IMG_2127.jpeg"
                className="object-cover h-full w-full"
              />
            </CardContent>
          </Card>
          <Button>Tambah Produk</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FormAddProduct;
