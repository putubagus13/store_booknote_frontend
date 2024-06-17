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
import { Skeleton } from "@/components/ui/skeleton";
import { useAuthenticatedStore } from "@/store";
import { FC } from "react";

const FormEditStore: FC = () => {
  const handleLogout = () => {
    window.localStorage.removeItem("token");
  };
  const { userProfile } = useAuthenticatedStore();
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Profile Toko</CardTitle>
          <CardDescription>
            Setting tokomu sesuai kebutuhanmu. Klik simpan setelah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 w-full md:max-w-md">
          <form>
            {userProfile.name ? (
              <div className="space-y-1">
                <Label>Nama Toko</Label>
                <Input
                  id="storename"
                  defaultValue={userProfile.name || "Nama toko tidak ditemukan"}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-1 w-full">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            {userProfile.storeTypeName ? (
              <div className="space-y-1">
                <Label>Tipe Toko</Label>
                <Input
                  id="category"
                  defaultValue={
                    userProfile.storeTypeName ||
                    "Nama tipe toko tidak ditemukan"
                  }
                  disabled
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-1 w-full">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            <div className="pt-8">
              <Button className="">Perbarui</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-10">
          {/* <Button className="w-60">Simpan Perubahan</Button> */}
          <Separator />
          <div className="flex flex-col gap-2">
            <Button variant="destructive" className="w-60">
              Hapus Akun
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-60">
              Keluar
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default FormEditStore;
