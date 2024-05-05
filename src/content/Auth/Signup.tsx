import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LOGIN } from "@/route";
import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Signup: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  return (
    <>
      <Card className="h-full w-full">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-4xl font-semibold">Daftar</CardTitle>
          <hr className="w-full" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardDescription>
            Selamat datang! Ayo daftar untuk menikmati semua fitur yang
            tersedia.
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
              <Input
                label="Password"
                type="password"
                id="password"
                placeholder="password"
              />
              <Input
                label="Confirm Password"
                type="password"
                id="confirm-password"
                placeholder="confirm password"
              />
            </div>
            <div className="w-full flex justify-center">
              <Button
                size="lg"
                type="submit"
                className="rounded-lg bg-accent-foreground"
              >
                Daftar
              </Button>
            </div>
            <div className="text-center w-full">
              <CardDescription>
                sudah punya akun? Ayo
                <Button
                  onClick={() => navigate(LOGIN)}
                  size="sm"
                  className="-ml-2"
                  variant={"link"}
                >
                  Masuk
                </Button>
              </CardDescription>
            </div>
          </form>
          <div className="flex flex-col gap-4 pt-2">
            <CardDescription className="text-center">
              Atau daftar dengan
            </CardDescription>
            <Card className="border-none shadow-none flex justify-center gap-2">
              <Button variant="outline">
                <FcGoogle size={24} />
              </Button>
              <Button variant="outline">
                <FaApple size={24} />
              </Button>
            </Card>
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default Signup;
