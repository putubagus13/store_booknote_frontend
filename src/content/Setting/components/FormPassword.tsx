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
import { FC } from "react";

const FormPassword: FC = () => {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Ubah kata sandi Anda di sini. Setelah menyimpan, Anda akan logout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2  w-full md:max-w-md">
          <div className="space-y-1">
            <Label>Password Saat Ini</Label>
            <Input id="current" type="password" />
          </div>
          <div className="space-y-1">
            <Label>Password Baru</Label>
            <Input id="new" type="password" />
          </div>
        </CardContent>
        <CardFooter>
          <Button>Perbarui</Button>
        </CardFooter>
      </Card>
    </form>
  );
};

export default FormPassword;
