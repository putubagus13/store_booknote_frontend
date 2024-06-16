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
import { FC, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ErrorPopupAlert } from "@/components/AlertPopup";
import { useStoreType } from "@/api/useStoreType";
import { IResListStoreType } from "@/models/storeType";
import { IPayloadRegister } from "@/models/auth";
import { useFormik } from "formik";
import { Info, LoaderIcon } from "lucide-react";
import * as Yup from "yup";
import { useRegister } from "@/api/useAuth";
import ModalFormOtp from "@/components/ModalFormOtp";

const validationSchema = Yup.object().shape({
  fullname: Yup.string().required("nama lengkap wajib diisi"),
  email: Yup.string().email("email tidak valid").required("email wajib diisi"),
  password: Yup.string()
    .required("password wajib diisi")
    .min(4, "password minimal 8 karakter"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "konfirmasi password tidak sesuai")
    .required("konfirmasi password wajib diisi"),
  storeName: Yup.string().required("nama toko wajib diisi"),
  storeType: Yup.number().required("tipe toko wajib diisi"),
});

const Signup: FC = () => {
  const navigate = useNavigate();
  const [storeTypeOption, setStoreTypeOption] = useState<IResListStoreType[]>(
    []
  );
  const [openErrorAlert, setOpenErrorAlert] = useState<boolean>(false);
  const [openModalOtp, setOpenModalOtp] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  // const [successMessage, setSuccessMessage] = useState<string>("");

  const { data, isLoading } = useStoreType();
  const { mutate, isPending } = useRegister({
    onSuccess: () => {
      setOpenModalOtp(true);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
      setOpenErrorAlert(true);
    },
  });

  const { values, errors, handleSubmit, handleChange, touched, setFieldValue } =
    useFormik<IPayloadRegister>({
      initialValues: {
        email: "",
        fullname: "",
        password: "",
        confirmPassword: "",
        storeName: "",
        storeType: null,
      },
      validationSchema,
      onSubmit: (values) => {
        console.log(values);
        mutate(values);
      },
    });

  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      setStoreTypeOption(data?.data);
    }
  }, [data]);
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-3">
              <Input
                onChange={handleChange}
                value={values.fullname}
                label="Fullname"
                id="fullname"
                name="fullname"
                placeholder="nama lengkap"
                errors={errors.fullname}
                touched={touched.fullname}
              />
              <Input
                onChange={handleChange}
                value={values.email}
                label="Email"
                type="email"
                id="email"
                name="email"
                placeholder="name@mail.com"
                errors={errors.email}
                touched={touched.email}
              />
              <Input
                label="Password"
                onChange={handleChange}
                value={values.password}
                type="password"
                name="password"
                id="password"
                placeholder="password"
                errors={errors.password}
                touched={touched.password}
              />
              <Input
                label="Confirm Password"
                onChange={handleChange}
                value={values.confirmPassword}
                name="confirmPassword"
                type="password"
                id="confirm-password"
                placeholder="konfirmasi password"
                errors={errors.confirmPassword}
                touched={touched.confirmPassword}
              />
              <Input
                label="Data Toko"
                onChange={handleChange}
                value={values.storeName}
                name="storeName"
                type="text"
                id="store-name"
                placeholder="nama toko"
                errors={errors.storeName}
                touched={touched.storeName}
              />
              <div className="w-full">
                <Select
                  onValueChange={(value) =>
                    setFieldValue("storeType", Number(value))
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="pilih tipe toko" />
                  </SelectTrigger>
                  <SelectContent>
                    {!isLoading &&
                      storeTypeOption.map(
                        (item: IResListStoreType, index: number) => (
                          <SelectItem key={index} value={String(item.type)}>
                            {item.name}
                          </SelectItem>
                        )
                      )}
                  </SelectContent>
                </Select>
                {errors.storeType && touched.storeType && (
                  <label className="text-[10px] text-destructive">
                    <Info size={12} className="inline-block mr-1" />
                    {errors.storeType}
                  </label>
                )}
              </div>
            </div>
            <div className="w-full flex justify-center">
              <Button size="lg" type="submit">
                {isPending ? (
                  <span className="flex gap-1 items-center">
                    <LoaderIcon className="animate-spin" /> Proses..
                  </span>
                ) : (
                  "Daftar"
                )}
              </Button>
            </div>
          </form>
          <div className="flex flex-col gap-4 pt-2">
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
      <ErrorPopupAlert
        open={openErrorAlert}
        message={errorMessage}
        onClose={setOpenErrorAlert}
      />
      <ModalFormOtp open={openModalOtp} />
    </>
  );
};

export default Signup;
