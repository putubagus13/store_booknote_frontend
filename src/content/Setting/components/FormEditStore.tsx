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
          <CardTitle>Store Profile</CardTitle>
          <CardDescription>
            Set up your shop according to your needs. Click save when finished.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 w-full md:max-w-md">
          <form>
            {userProfile.name ? (
              <div className="space-y-1">
                <Label>Store Name</Label>
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
                <Label>Store Type</Label>
                <Input
                  id="category"
                  defaultValue={
                    userProfile.storeTypeName || "Type store not found"
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
              <Button className="">Save Change</Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-10">
          {/* <Button className="w-60">Simpan Perubahan</Button> */}
          <Separator />
          <div className="flex flex-col gap-2">
            <Button variant="destructive" className="w-60">
              Delete Account
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-60">
              Log Out
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default FormEditStore;
