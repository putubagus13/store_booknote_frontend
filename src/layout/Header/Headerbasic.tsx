import { Theme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
// import { Label } from "@/components/ui/label";
import { LOGIN, SIGNUP } from "@/route";
import { useThemeStore } from "@/store";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
// import { Switch } from "@/components/ui/switch";
import { Menu, Squirrel } from "lucide-react";
import { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menubar } from "@/components/ui/menubar";

const Headerbasic: FC = () => {
  const navigate = useNavigate();
  // let themeStorage = localStorage.getItem("vite-ui-theme") as Theme;
  // const [theme, setTheme] = useState<Theme>(themeStorage);

  const selectedTheme = useThemeStore((state) => state.selectedTheme);

  const handleSwitchSelect = (isChecked) => {
    const newTheme: Theme = isChecked ? "light" : "dark";
    localStorage.setItem("vite-ui-theme", newTheme);
    selectedTheme(newTheme);
    // setTheme(newTheme);
  };

  useEffect(() => {
    // themeStorage = localStorage.getItem("vite-ui-theme") as Theme;
  }, [handleSwitchSelect]);
  return (
    <>
      <Card className="w-full h-16 fixed inset-y-0 flex items-center justify-between px-10 shadow-md">
        <button
          onClick={() => navigate("/home")}
          className="flex justify-center items-center"
        >
          <Squirrel size={30} />
          <h1 className="text-2xl font-semibold">Squirrel</h1>
        </button>
        <NavigationMenu className="hidden md:block">
          <NavigationMenuList>
            <NavigationMenuItem className="pr-10">
              <Button
                onClick={() => navigate("/home")}
                size="sm"
                variant={"ghost"}
                className="rounded-lg"
              >
                Beranda
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                onClick={() => navigate(LOGIN)}
                size="sm"
                // variant={"ghost"}
                className="rounded-lg"
              >
                Masuk
              </Button>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Button
                onClick={() => navigate(SIGNUP)}
                size="sm"
                variant={"ghost"}
                className="rounded-lg"
              >
                Daftar
              </Button>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {/* <div className="flex items-center gap-1.5">
          <Switch
            onCheckedChange={handleSwitchSelect}
            defaultChecked={theme !== "dark"}
            id="theme-selected"
          />
          <Label
            htmlFor="theme-selected"
            className="transition-all duration-300"
          >
            {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
          </Label>
        </div> */}
        <Sheet>
          <SheetTrigger className="md:hidden">
            <Menu size={24} />
          </SheetTrigger>
          <SheetContent className="w-[300px] sm:w-[440px]">
            <SheetHeader>
              <SheetTitle>Hai Sobat!</SheetTitle>
              {/* <Menubar className="gap-2 border-none">
                <Home size={24} />
                Home
              </Menubar> */}
              <SheetDescription className="text-left">
                Selamat datang! Ayo masuk atau daftar untuk menikmati semua
                fitur yang tersedia.
              </SheetDescription>
              <div className="pt-10">
                <Menubar className="gap-2 border-none">
                  <Button size="sm" variant="default" className="w-full">
                    Masuk
                  </Button>
                </Menubar>
                <Menubar className="gap-2 border-none">
                  <Button size="sm" variant="outline" className="w-full">
                    Daftar
                  </Button>
                </Menubar>
              </div>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </Card>
    </>
  );
};

export default Headerbasic;
