import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { useAuthenticatedStore } from "@/store";
import { PencilLine } from "lucide-react";
import { FC } from "react";

const FormAccount: FC = () => {
  const { userProfile } = useAuthenticatedStore();

  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Akun</CardTitle>
          <CardDescription>
            Buat perubahan pada akun Anda di sini. Klik simpan setelah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 w-full md:max-w-md">
          <Avatar className="relative h-16 w-16 group cursor-pointer">
            <AvatarImage
              className="group-hover:blur-sm"
              src={userProfile.imageUrl || ""}
              alt="@shadcn"
            />
            <AvatarFallback className="group-hover:blur-sm">
              {userProfile.fullname[0].toUpperCase() || "N/A"}
            </AvatarFallback>
            <label
              htmlFor="changeProfile"
              className="absolute -top-10 group-hover:top-5 left-5 duration-150 cursor-pointer"
            >
              <PencilLine />
              <input
                id="changeProfile"
                type="file"
                accept="image/*"
                className="hidden absolute"
              />
            </label>
          </Avatar>

          <div className="space-y-1">
            <Label>Name</Label>
            <Input
              id="name"
              defaultValue={userProfile.fullname || "Nama tidak ditemukan"}
            />
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              id="email"
              disabled
              defaultValue={userProfile.email || "email tidak ditemukan"}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Simpan Perubahan</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default FormAccount;
