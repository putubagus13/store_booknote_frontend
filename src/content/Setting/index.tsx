import HeaderPage from "@/components/HeaderPage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FC } from "react";
import { Helmet } from "react-helmet-async";
import FormAccount from "./components/FormAccount";
import FormPassword from "./components/FormPassword";
import FormEditStore from "./components/FormEditStore";

const Setting: FC = () => {
  return (
    <>
      <Helmet title="Squirrel - Setting" />
      <HeaderPage label={"Setting"}>
        <div className="h-full flex flex-col items-center w-full gap-2 pt-20">
          <Tabs defaultValue="3" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="1">Akun</TabsTrigger>
              <TabsTrigger value="2">Password</TabsTrigger>
              <TabsTrigger value="3">Toko</TabsTrigger>
            </TabsList>
            <TabsContent value="1">
              <FormAccount />
            </TabsContent>
            <TabsContent value="2">
              <FormPassword />
            </TabsContent>
            <TabsContent value="3">
              <FormEditStore />
            </TabsContent>
          </Tabs>
        </div>
      </HeaderPage>
    </>
  );
};

export default Setting;
