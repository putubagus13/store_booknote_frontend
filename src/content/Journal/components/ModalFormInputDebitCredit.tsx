import { setSaldo } from "@/api/useJournal";
import {
  ConfirmPopupAlert,
  ErrorPopupAlert,
  SuccessPopupAlert,
} from "@/components/AlertPopup";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { IPayloadSetSaldo } from "@/models/journal";
import { conversion } from "@/utils/general";
import { useFormik } from "formik";
import { Info, LoaderIcon } from "lucide-react";
import { FC, useState } from "react";
import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  saldo: Yup.number().required("Amount is required"),
  description: Yup.string().required("description is required"),
  type: Yup.string().required("choose one of type"),
});

interface IProps {
  actionSuccess?: () => void;
}

const ModalFormInputDebitCredit: FC<IProps> = ({ actionSuccess }) => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [openModalError, setOpenModalError] = useState<boolean>(false);
  const [openModalConfirm, setOpenModalConfirm] = useState<boolean>(false);

  // const { userProfile } = useAuthenticatedStore();
  const { mutate, isPending } = setSaldo({
    onError: (error: any) => {
      setErrorMessage(error.data.response.message);
      setOpenModalError(true);
    },
    onSuccess: () => {
      resetForm();
      if (actionSuccess) actionSuccess;
      setOpenModalSuccess(true);
      setInterval(() => {
        setOpenModalSuccess(false);
      }, 2500);
    },
  });

  const {
    handleSubmit,
    handleChange,
    errors,
    touched,
    values,
    setFieldValue,
    resetForm,
  } = useFormik<IPayloadSetSaldo>({
    initialValues: {
      description: "",
      saldo: null,
      type: "",
    },
    validationSchema,
    onSubmit: (value) => {
      console.log(value);
      // mutate(value);
    },
  });

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button onClick={() => resetForm()}>Update Saldo</Button>
        </DialogTrigger>
        <DialogContent className="w-full">
          <DialogHeader>
            <DialogTitle>Update Saldo</DialogTitle>
            <DialogDescription>
              Enter the amount of income or expenditure along with a description
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="amount" className="text-right">
                Amount (Rp)
              </Label>
              <div className="col-span-2">
                <Input
                  id="amount"
                  type="number"
                  defaultValue="Pedro Duarte"
                  className="w-full"
                  name="saldo"
                  onChange={handleChange}
                  errors={errors.saldo}
                  touched={touched.saldo}
                  value={String(values.saldo)}
                  placeholder="enter amount"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <div className="col-span-3">
                <Input
                  id="description"
                  name="description"
                  placeholder="enter description"
                  onChange={handleChange}
                  errors={errors.description}
                  touched={touched.description}
                  value={values.description}
                  // className="col-span-3"
                />
              </div>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right"></Label>
              <div className="col-span-3">
                <RadioGroup
                  className="flex gap-4"
                  name="type"
                  onValueChange={(e) => setFieldValue("type", e)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="DEBIT" id="r1" />
                    <Label htmlFor="r1">Debit</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="CREDIT" id="r2" />
                    <Label htmlFor="r2">Credit</Label>
                  </div>
                </RadioGroup>
                {errors.type && touched.type && (
                  <label className="text-[10px] text-destructive">
                    <Info size={12} className="inline-block mr-1" />
                    {errors.type}
                  </label>
                )}
              </div>
            </div>
            <Button
              onClick={() => setOpenModalConfirm(true)}
              disabled={
                isPending ||
                !values.description ||
                !values.saldo ||
                !values.type
              }
              size="lg"
              className="mt-4"
            >
              {isPending ? (
                <span className="flex gap-1 items-center">
                  <LoaderIcon className="animate-spin" /> Proses..
                </span>
              ) : (
                "Save"
              )}
            </Button>
            <ConfirmPopupAlert
              open={openModalConfirm}
              headerMessage="Are u sure?"
              description={`You will add ${
                values.type
              } with amount ${conversion(values.saldo || 0)}`}
              onClose={() => setOpenModalConfirm(!openModalConfirm)}
              onClick={() => {
                setOpenModalConfirm(false);
                mutate(values);
              }}
            />
          </form>
        </DialogContent>
      </Dialog>
      <ErrorPopupAlert
        message={errorMessage}
        onClose={() => setOpenModalError(!openModalError)}
        open={openModalError}
      />
      <SuccessPopupAlert
        message="Saldo success submited!"
        open={openModalSuccess}
      />
    </>
  );
};

export default ModalFormInputDebitCredit;
