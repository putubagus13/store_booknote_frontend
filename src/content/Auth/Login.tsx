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
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { useFormik } from "formik";
import { IPayloadLogin } from "@/models/auth";
import * as Yup from "yup";
import { useLogin } from "@/api/useAuth";
import { LoaderIcon } from "lucide-react";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("email tidak valid").required("email wajib diisi"),
  password: Yup.string().required("password wajib diisi"),
});

const Login: FC = () => {
  const [errorMessages, setErrorMessages] = useState<string>("");

  const { mutate, isPending } = useLogin({
    onError: (error: any) => {
      setErrorMessages(error.response.data.message);
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } =
    useFormik<IPayloadLogin>({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: (values) => {
        mutate(values);
      },
    });
  return (
    <>
      <Helmet title="Squirrel - Login" />
      <Card className="h-full w-full">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-4xl font-semibold">Sign In</CardTitle>
          <hr className="w-full" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardDescription>
            WELCOME! Come on in or register to enjoy all the features which are
            available.
          </CardDescription>
          <CardDescription className="text-destructive font-semibold">
            {errorMessages ? errorMessages : ""}
          </CardDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Input
                onChange={handleChange}
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="name@mail.com"
                errors={errors.email}
                touched={touched.email}
                value={values.email}
              />
              <Input
                label="Password"
                onChange={handleChange}
                type="password"
                id="password"
                name="password"
                placeholder="password"
                value={values.password}
                errors={errors.password}
                touched={touched.password}
              />
            </div>
            <div className="text-right w-full">
              <CardDescription>
                <Link to="/auth/forgot-password">Forgot Password?</Link>
              </CardDescription>
            </div>
            <div className="w-full flex justify-center">
              <Button size="lg" type="submit">
                {isPending ? (
                  <span className="flex gap-1 items-center">
                    <LoaderIcon className="animate-spin" /> Proses..
                  </span>
                ) : (
                  "Sign In"
                )}
              </Button>
            </div>
          </form>
          <div className="flex flex-col gap-4 pt-4">
            <CardDescription className="text-center">
              Or Sign In with
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
