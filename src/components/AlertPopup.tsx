import { FC } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";
import SuccessIcon from "@assets/successIcon.svg";
import ErrorIcon from "@assets/errorIcon.svg";
import { Button } from "./ui/button";

interface PropsAlertSuccess {
  message?: string;
  open?: boolean;
  onClick?: () => void;
}

interface PropsAlertError {
  message?: string;
  open?: boolean;
  onClose: (e: boolean) => void;
}

export const SuccessPopupAlert: FC<PropsAlertSuccess> = ({
  message,
  open,
  onClick,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-[350px]">
        <AlertDialogHeader>
          <div className="flex justify-center">
            <img src={SuccessIcon} alt="" />
          </div>
          <AlertDialogTitle className="w-full text-center">
            Success!
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full text-center">
            {message ||
              "Internal server error. Please try again later or contact our support team."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        {onClick && (
          <AlertDialogFooter>
            <div className="w-full flex justify-center">
              <Button
                size="sm"
                onClick={onClick}
                className="w-full flex justify-center"
              >
                Oke
              </Button>
            </div>
          </AlertDialogFooter>
        )}
      </AlertDialogContent>
    </AlertDialog>
  );
};

export const ErrorPopupAlert: FC<PropsAlertError> = ({
  message,
  open,
  onClose,
}) => {
  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="max-w-[350px]">
        <AlertDialogHeader>
          <div className="flex justify-center">
            <img src={ErrorIcon} alt="" />
          </div>
          <AlertDialogTitle className="w-full text-center">
            Failed!
          </AlertDialogTitle>
          <AlertDialogDescription className="w-full text-center">
            {message ||
              "Internal server error. Please try again later or contact our support team."}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() => onClose(false)}
            className="w-full flex justify-center"
          >
            Cancel
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
