import { useForgotPassword } from "@/api/useAuth";
import { ErrorPopupAlert, SuccessPopupAlert } from "@/components/AlertPopup";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useFormik } from "formik";
import { LoaderIcon } from "lucide-react";
import { FC, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Email tidak valid").required("Email wajib diisi"),
});

const ForgotPassword: FC = () => {
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { mutate, isPending } = useForgotPassword({
    onSuccess: () => {
      setOpenModalSuccess(true);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
      setOpenModalError(true);
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } = useFormik<{
    email: string;
  }>({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      mutate(values.email);
    },
  });
  return (
    <>
      <Card className="h-full w-full">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-4xl font-semibold">
            Forgot Password
          </CardTitle>
          <hr className="w-full" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardDescription>
            Enter your registered email to get the link reset password.
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
            </div>
            <div className="w-full flex justify-center">
              <Button size="lg" type="submit">
                {isPending ? (
                  <span className="flex gap-1 items-center">
                    <LoaderIcon className="animate-spin" /> Proses..
                  </span>
                ) : (
                  "Send Email"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <SuccessPopupAlert
        open={openModalSuccess}
        message="Email has been sent successfully, please check your email."
        onClick={() => setOpenModalSuccess(false)}
      />
      <ErrorPopupAlert
        open={openModalError}
        message={errorMessage}
        onClose={setOpenModalError}
      />
    </>
  );
};

export default ForgotPassword;
