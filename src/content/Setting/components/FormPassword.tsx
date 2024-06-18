import { useUpdateProfile } from "@/api/useUser";
import { ErrorPopupAlert, SuccessPopupAlert } from "@/components/AlertPopup";
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
import { IPayloadUpdateProfile } from "@/models/user";
import { useFormik } from "formik";
import { LoaderIcon } from "lucide-react";
import { FC, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Password lama wajib diisi"),
  newPassword: Yup.string().required("Password baru wajib diisi"),
});

const FormPassword: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);

  const { mutate: handleUpdate, isPending } = useUpdateProfile({
    onSuccess: () => {
      setOpenModalSuccess(true);
      resetForm();
      setInterval(() => {
        setOpenModalSuccess(false);
      }, 2000);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
      setOpenModalError(true);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik<IPayloadUpdateProfile>({
      initialValues: {
        oldPassword: "",
        newPassword: "",
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        handleUpdate(values);
      },
    });

  return (
    <>
      <form onSubmit={handleSubmit}>
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
              <Input
                id="current"
                type="password"
                name="oldPassword"
                onChange={handleChange}
                value={values.oldPassword}
                errors={errors.oldPassword}
                touched={touched.oldPassword}
              />
            </div>
            <div className="space-y-1">
              <Label>Password Baru</Label>
              <Input
                id="new"
                type="password"
                name="newPassword"
                onChange={handleChange}
                value={values.newPassword}
                errors={errors.newPassword}
                touched={touched.newPassword}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">
              {isPending ? (
                <span className="flex gap-1 items-center">
                  <LoaderIcon className="animate-spin" /> Proses..
                </span>
              ) : (
                "Perbarui Password"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <SuccessPopupAlert
        open={openModalSuccess}
        message="Password berhasil diperbaharui"
      />
      <ErrorPopupAlert
        open={openModalError}
        onClose={setOpenModalError}
        message={errorMessage}
      />
    </>
  );
};

export default FormPassword;
