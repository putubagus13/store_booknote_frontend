import { updateStore } from "@/api/useStore";
import {
  ConfirmPopupAlert,
  ErrorPopupAlert,
  SuccessPopupAlert,
} from "@/components/AlertPopup";
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
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { IPayloadUpdateStore } from "@/models/storeType";
import { LOGIN } from "@/route";
import { useAuthenticatedStore } from "@/store";
import { useFormik } from "formik";
import { LoaderIcon } from "lucide-react";
import { FC, useEffect, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Store name is required"),
});

const FormEditStore: FC = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = LOGIN;
  };
  const [open, setOpen] = useState<boolean>(false);
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const { userProfile, setUserProfile } = useAuthenticatedStore();

  const { mutate, isPending } = updateStore({
    onError: (error: any) => {
      setErrorMessage(error.data.response.message);
      setOpenModalError(true);
    },
    onSuccess: () => {
      setUserProfile({
        userId: userProfile.userId || "",
        fullname: userProfile.fullname || "",
        imageUrl: userProfile.imageUrl || "",
        phoneNumber: userProfile.phoneNumber || "",
        email: userProfile.email || "",
        storeId: userProfile.storeId || "",
        name: values.name || userProfile.name,
        storeImageUrl: userProfile.storeImageUrl || "",
        storeType: userProfile.storeType || null,
        storeTypeName: userProfile.storeTypeName || "",
      });
      setOpenModalSuccess(true);
      setInterval(() => {
        setOpenModalSuccess(false);
      }, 2500);
    },
  });

  const { values, errors, touched, handleChange, handleSubmit, setValues } =
    useFormik<IPayloadUpdateStore>({
      initialValues: {
        name: "",
        imageUrl: "",
      },
      validationSchema,
      onSubmit: (value) => {
        mutate(value);
      },
    });

  useEffect(() => {
    setValues((prev) => ({
      ...prev,
      name: userProfile.name,
    }));
  }, [userProfile.name]);

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Store Profile</CardTitle>
          <CardDescription>
            Set up your shop according to your needs. Click save when finished.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2 w-full md:max-w-md">
          <form onSubmit={handleSubmit}>
            {userProfile.name ? (
              <div className="space-y-1">
                <Label>Store Name</Label>
                <Input
                  id="storename"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  errors={errors.name}
                  touched={touched.name}
                  defaultValue={userProfile.name || "Nama toko tidak ditemukan"}
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-1 w-full">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            {userProfile.storeTypeName ? (
              <div className="space-y-1">
                <Label>Store Type</Label>
                <Input
                  id="category"
                  defaultValue={
                    userProfile.storeTypeName || "Type store not found"
                  }
                  disabled
                />
              </div>
            ) : (
              <div className="flex flex-col justify-center gap-1 w-full">
                <Skeleton className="h-4 w-[100px]" />
                <Skeleton className="h-10 w-full" />
              </div>
            )}
            <div className="pt-8">
              <Button disabled={isPending} size="lg" type="submit">
                {isPending ? (
                  <span className="flex gap-1 items-center">
                    <LoaderIcon className="animate-spin" /> Proses..
                  </span>
                ) : (
                  "Save Change"
                )}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col gap-10">
          {/* <Button className="w-60">Simpan Perubahan</Button> */}
          <Separator />
          <div className="flex flex-col gap-2">
            <Button
              onClick={() => setOpen(!open)}
              variant="destructive"
              className="w-60"
            >
              Delete Account
            </Button>
            <Button onClick={handleLogout} variant="outline" className="w-60">
              Log Out
            </Button>
          </div>
        </CardFooter>
      </Card>
      <ConfirmPopupAlert
        open={open}
        headerMessage="Delete Account"
        description="Are you sure want to delete this account? You will lost all data in this store!"
        onClose={() => setOpen(!open)}
        onClick={() => console.log("click")}
      />
      <ErrorPopupAlert
        message={errorMessage}
        onClose={() => setOpenModalError(!openModalError)}
        open={openModalError}
      />
      <SuccessPopupAlert
        message="Update store success"
        open={openModalSuccess}
      />
    </>
  );
};

export default FormEditStore;
