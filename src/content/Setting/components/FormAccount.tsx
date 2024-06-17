import { useProfile } from "@/api/useAuth";
import { useUpdateProfile, useUploadImage } from "@/api/useUser";
import { ErrorPopupAlert, SuccessPopupAlert } from "@/components/AlertPopup";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { LoaderIcon, PencilLine } from "lucide-react";
import { ChangeEvent, FC, useEffect, useState } from "react";

const FormAccount: FC = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>("");

  const { data: userProfile, refetch } = useProfile();

  const { mutate: handleUpdate, isPending } = useUpdateProfile({
    onSuccess: () => {
      refetch();
      setImageUrl("");
      setOpenModalSuccess(true);
      setInterval(() => {
        setOpenModalSuccess(false);
      }, 2000);
    },
    onError: (error: any) => {
      setErrorMessage(error.response.data.message);
      setOpenModalError(true);
    },
  });

  const { values, handleChange, handleSubmit, setValues, setFieldValue } =
    useFormik<IPayloadUpdateProfile>({
      initialValues: {
        fullname: userProfile?.data?.fullname || "",
        imageUrl: userProfile?.data?.imageUrl || "",
      },
      onSubmit: (values) => {
        console.log(values);
        handleUpdate(values);
      },
    });

  const { mutate: handleUploadImage } = useUploadImage({
    onSuccess: (data) => {
      setImageUrl(data.data[0]);
      setErrorMessage("");
      setFieldValue("imageUrl", data.data[0]);
    },
  });

  const changePicture = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const typeFile = file.type.split("/");

      if (file.size > 2 * 1024 * 1024) {
        setErrorMessage("Maximum file size 2MB");
      } else if (
        typeFile[1] !== "png" &&
        typeFile[1] !== "jpg" &&
        typeFile[1] !== "jpeg"
      ) {
        setErrorMessage("File must JPG, JPEG, or PNG");
      } else {
        handleUploadImage(Array.from(e.target.files));
      }
    }
  };

  useEffect(() => {
    setValues({
      fullname: userProfile?.data?.fullname || "",
      imageUrl: userProfile?.data?.imageUrl || "",
    });
  }, [userProfile]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Card>
          <CardHeader>
            <CardTitle>Akun</CardTitle>
            <CardDescription>
              Buat perubahan pada akun Anda di sini. Klik simpan setelah
              selesai.
            </CardDescription>
            {errorMessage && (
              <CardDescription className="font-semibold text-destructive">
                {errorMessage}
              </CardDescription>
            )}
          </CardHeader>
          <CardContent className="space-y-2 w-full md:max-w-md">
            <Avatar className="relative h-16 w-16 group cursor-pointer">
              <AvatarImage
                className="group-hover:blur-sm object-cover"
                src={imageUrl || userProfile?.data?.imageUrl || ""}
                alt="@shadcn"
              />
              <AvatarFallback className="group-hover:blur-sm">
                {userProfile?.data?.fullname[0].toUpperCase() || "N/A"}
              </AvatarFallback>
              <label
                htmlFor="changeProfile"
                className="absolute -top-10 group-hover:top-5 left-5 duration-150 cursor-pointer"
              >
                <PencilLine color="white" />
                <input
                  id="changeProfile"
                  onChange={changePicture}
                  type="file"
                  accept="image/*"
                  className="hidden absolute"
                />
              </label>
            </Avatar>

            <div className="space-y-1">
              <Label>Name</Label>
              <Input
                id="name"
                name="fullname"
                onChange={handleChange}
                value={values.fullname}
                defaultValue={
                  userProfile?.data?.fullname || "Nama tidak ditemukan"
                }
              />
            </div>
            <div className="space-y-1">
              <Label>Email</Label>
              <Input
                id="email"
                disabled
                defaultValue={
                  userProfile?.data?.email || "email tidak ditemukan"
                }
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
                "Simpan Perubahan"
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
      <SuccessPopupAlert
        open={openModalSuccess}
        message="Profile berhasil diperbaharui"
      />
      <ErrorPopupAlert
        open={openModalError}
        onClose={setOpenModalError}
        message={errorMessage}
      />
    </>
  );
};

export default FormAccount;
