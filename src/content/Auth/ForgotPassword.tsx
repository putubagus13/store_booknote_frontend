import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
// import { Link } from "react-router-dom";

const ForgotPassword: FC = () => {
  const [email, setEmail] = useState<string>("");
  return (
    <>
      <Card className="h-full w-full">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-4xl font-semibold">
            Lupa Password
          </CardTitle>
          <hr className="w-full" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardDescription>
            Masukkan email anda yang sudah terdaftar untuk mendapatkan link
            reset password.
          </CardDescription>
          <form action="" className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Input
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                type="email"
                id="email"
                placeholder="name@mail.com"
                errors={email}
                touched
              />
            </div>
            {/* <div className="text-right w-full">
              <CardDescription>
                <Link to="/auth/forgot-password">Forgot password?</Link>
              </CardDescription>
            </div> */}
            <div className="w-full flex justify-center">
              <Button
                size="lg"
                type="submit"
                className="rounded-lg bg-accent-foreground"
              >
                Kirim Permintaan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default ForgotPassword;
