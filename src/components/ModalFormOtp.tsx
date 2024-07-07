import { FC, useCallback, useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "./ui/input-otp";
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp";
import { Button } from "./ui/button";
import { SuccessPopupAlert } from "./AlertPopup";
import { resendOTPRegister, useOtpRegisterVerification } from "@/api/useAuth";
import { IPayloadOtpRegister } from "@/models/auth";
import { useTokenStore } from "@/store";
import { LoaderIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "@/route";

interface Props {
  open: boolean;
}

const ModalFormOtp: FC<Props> = ({ open }) => {
  const navigate = useNavigate();
  const [openModalOtp, setOpenModalOtp] = useState<boolean>(false);
  const [openModalSuccess, setOpenModalSuccess] = useState<boolean>(false);
  const [errorMessages, setErrorMessages] = useState<string>("");
  const [time, setTime] = useState(0);
  const [isCounting, setIsCounting] = useState(false);
  const [otp, setOtp] = useState<string>("");

  const { token } = useTokenStore();

  const { mutate, isPending } = useOtpRegisterVerification({
    onSuccess: () => {
      setOpenModalOtp(false);
      setOpenModalSuccess(true);
    },
    onError: (error: any) => {
      setErrorMessages(error.response.data.message);
    },
  });

  const { mutate: resendOtp } = resendOTPRegister({
    onError: (error: any) => {
      setErrorMessages(error.response.data.message);
    },
    onSuccess: () => {
      setErrorMessages("");
    },
  });

  const handleVariation = () => {
    const payload: IPayloadOtpRegister = {
      codeOtp: otp,
      token,
    };
    mutate(payload);
  };

  const countDownTimer = useCallback(() => {
    setErrorMessages("");
    resendOtp({ token });
    setTime(60);
    setIsCounting(true);
  }, [token]);

  useEffect(() => {
    if (time > 0) {
      const interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setIsCounting(false);
    }
  }, [time]);

  useEffect(() => {
    if (open) {
      setOpenModalOtp(true);
    }
  }, [open]);

  return (
    <>
      <AlertDialog open={openModalOtp}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-center w-full">
              Verifikasi OTP
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center w-full">
              we have sent a verification code to your email
            </AlertDialogDescription>
            <AlertDialogDescription className="text-center w-full font-semibold flex flex-col gap-2">
              Submit the OTP code to verify your account
              {errorMessages && (
                <span className="text-destructive">{errorMessages}</span>
              )}
            </AlertDialogDescription>
            <div className="w-full flex justify-center">
              <InputOTP
                onChange={(value) => setOtp(value)}
                maxLength={4}
                pattern={REGEXP_ONLY_DIGITS_AND_CHARS}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                </InputOTPGroup>
              </InputOTP>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <div className="flex flex-col w-full justify-center items-center gap-2">
              <AlertDialogAction onClick={handleVariation} className="w-36">
                {isPending ? (
                  <span className="flex gap-1 items-center">
                    <LoaderIcon className="animate-spin" /> Proses..
                  </span>
                ) : (
                  "Verify OTP"
                )}
              </AlertDialogAction>
              {token && (
                <Button
                  disabled={isCounting}
                  onClick={countDownTimer}
                  variant="secondary"
                  className="text-accent-foreground min-w-36"
                >
                  {isCounting ? `Resend in ${time}s` : "Resend OTP"}
                </Button>
              )}
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <SuccessPopupAlert
        open={openModalSuccess}
        message="Account has been verified successfully! Please login."
        onClick={() => {
          setOpenModalSuccess(false);
          navigate(LOGIN);
        }}
      />
    </>
  );
};

export default ModalFormOtp;
