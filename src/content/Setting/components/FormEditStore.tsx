import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { FC } from "react";

const FormEditStore: FC = () => {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Profile Toko</CardTitle>
          <CardDescription>
            Setting tokomu sesuai kebutuhanmu. Klik simpan setelah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Nama Toko</Label>
            <Input id="storename" defaultValue="Surya" />
          </div>
          <div className="space-y-1">
            <Label>Tipe Toko</Label>
            <Input id="category" defaultValue="Resto" disabled />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-10">
          {/* <Button className="w-60">Simpan Perubahan</Button> */}
          <Separator />
          <div className="flex flex-col gap-2">
            <Button variant="destructive" className="w-60">
              Hapus Akun
            </Button>
            <Button variant="outline" className="w-60">
              Keluar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </form>
  );
};

export default FormEditStore;
