import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FC, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";

const Login: FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  return (
    <>
      <Helmet title="Squirrel - Login" />
      <Card className="h-full w-full">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-4xl font-semibold">Masuk</CardTitle>
          <hr className="w-full" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardDescription>
            Selamat datang! Ayo masuk atau daftar untuk menikmati semua fitur
            yang tersedia.
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
            </div>
            <div className="text-right w-full">
              <CardDescription>
                <Link to="/auth/forgot-password">Lupa Password?</Link>
              </CardDescription>
            </div>
            <div className="w-full flex justify-center">
              <Button
                size="lg"
                type="submit"
                className="rounded-lg bg-accent-foreground"
                onClick={() => navigate("/")}
              >
                Masuk
              </Button>
            </div>
          </form>
          <div className="flex flex-col gap-4 pt-4">
            <CardDescription className="text-center">
              Atau masuk dengan
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

export default Login;
