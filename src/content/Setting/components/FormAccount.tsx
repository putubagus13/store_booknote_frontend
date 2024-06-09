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

const FormAccount: FC = () => {
  return (
    <form>
      <Card>
        <CardHeader>
          <CardTitle>Akun</CardTitle>
          <CardDescription>
            Buat perubahan pada akun Anda di sini. Klik simpan setelah selesai.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label>Name</Label>
            <Input id="name" defaultValue="Pedro Duarte" />
          </div>
          <div className="space-y-1">
            <Label>Email</Label>
            <Input id="email" defaultValue="mail@peduarte.com" />
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
