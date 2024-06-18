import { useResetPassword } from "@/api/useAuth";
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
import { IPayloadResetPassword } from "@/models/auth";
import { LOGIN } from "@/route";
import { useFormik } from "formik";
import { LoaderIcon } from "lucide-react";
import { FC, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .required("password wajib diisi")
    .min(4, "password minimal 8 karakter"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "konfirmasi password tidak sesuai")
    .required("konfirmasi password wajib diisi"),
});

const ResetPassword: FC = () => {
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const token = new URLSearchParams(window.location.search).get("token");

  const { mutate, isPending } = useResetPassword({
    onSuccess: () => {
      setOpenModalSuccess(true);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
      setOpenModalError(true);
    },
  });

  const { values, errors, touched, handleSubmit, handleChange } =
    useFormik<IPayloadResetPassword>({
      initialValues: {
        password: "",
        confirmPassword: "",
        token: token || "",
      },
      validationSchema,
      onSubmit: (values) => {
        mutate(values);
      },
    });
  return (
    <>
      <Card className="h-full w-full">
        <CardHeader className="flex flex-col gap-2">
          <CardTitle className="text-4xl font-semibold">
            Reset Password
          </CardTitle>
          <hr className="w-full" />
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <CardDescription>Masukkan password baru anda.</CardDescription>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Input
                onChange={handleChange}
                label="Password Baru"
                type="password"
                id="password"
                name="password"
                placeholder="masukkan password baru"
                errors={errors.password}
                touched={touched.password}
                value={values.password}
              />
              <Input
                onChange={handleChange}
                label="Korfirmasi Password"
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="konfirmasi password baru"
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
                value={values.confirmPassword}
              />
            </div>
            <div className="w-full flex justify-center">
              <Button size="lg" type="submit">
                {isPending ? (
                  <span className="flex gap-1 items-center">
                    <LoaderIcon className="animate-spin" /> Proses..
                  </span>
                ) : (
                  "Reset Password"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <SuccessPopupAlert
        open={openModalSuccess}
        message="Password berhasil direset. Silahkan login."
        onClick={() => {
          setOpenModalSuccess(false);
          window.location.href = LOGIN;
        }}
      />
      <ErrorPopupAlert
        open={openModalError}
        message={errorMessage}
        onClose={setOpenModalError}
      />
    </>
  );
};

export default ResetPassword;
