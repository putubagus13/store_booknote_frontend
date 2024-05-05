import { CardDescription } from "@/components/ui/card";
import { FC, ReactNode } from "react";
import { Outlet } from "react-router-dom";

import Headerbasic from "../Header/Headerbasic";

interface Props {
  children: ReactNode;
}

const AuthLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="w-full h-auto md:h-screen pt-24 flex justify-center items-center flex-col bg-background-pattern bg-cover bg-no-repeat">
        <Headerbasic />
        <div className="flex justify-start items-center w-full h-full px-[10%] md:px-0">
          <div className="flex justify-center items-center md:ml-24 w-full md:w-96 h-auto bg-white rounded-md shadow-md bg-opacity-5">
            {children || <Outlet />}
          </div>
        </div>

        <CardDescription className="absolute bottom-0 pb-4 right-0 pr-4">
          Squirrel©️2024
        </CardDescription>
      </div>
    </>
  );
};

export default AuthLayout;
