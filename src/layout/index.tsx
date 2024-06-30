// import Dropdown from "@/components/Dropdownl";
import { useProfile } from "@/api/useAuth";
import ListCustom from "@/components/ListCustom";
import { Theme } from "@/components/theme-provider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
// import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  LOGIN,
  CASHIER,
  PRODUCT,
  // ORDER,
  ANALYTIC,
  SETTING,
  HISTORY,
  JOURNAL,
} from "@/route";
import { useAuthenticatedStore, useThemeStore } from "@/store";
import { capitalizeFirstLetter } from "@/utils/general";
import {
  Calculator,
  CircleUser,
  History,
  Home,
  LineChart,
  Moon,
  Notebook,
  Package,
  Package2,
  PanelLeft,
  // Search,
  Settings,
  Squirrel,
  Store,
  Sun,
  Users2,
} from "lucide-react";
import { FC, ReactNode, useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = ({ children }) => {
  let themeStorage = localStorage.getItem("vite-ui-theme") as Theme;
  const path = window.location.pathname;
  const splitPath = path.split("/");

  const { data } = useProfile();
  const { setUserProfile } = useAuthenticatedStore();
  const [theme, setTheme] = useState<Theme>(themeStorage);

  const selectedTheme = useThemeStore((state) => state.selectedTheme);

  const handleSwitchSelect = () => {
    const newTheme: Theme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("vite-ui-theme", newTheme);
    selectedTheme(newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    themeStorage = localStorage.getItem("vite-ui-theme") as Theme;
  }, [handleSwitchSelect]);

  useEffect(() => {
    data;
    if (data?.data) {
      setUserProfile({
        userId: data?.data?.userId || "",
        fullname: data?.data?.fullname || "",
        imageUrl: data?.data?.imageUrl || "",
        phoneNumber: data?.data?.phoneNumber || "",
        email: data?.data?.email || "",
        storeId: data?.data?.storeId || "",
        name: data?.data?.name || "",
        storeImageUrl: data?.data?.storeImageUrl || "",
        storeType: data?.data?.storeType || null,
        storeTypeName: data?.data?.storeTypeName || "",
      });
    }
  }, [data]);

  return (
    <div className="w-full md:h-screen flex justify-center items-center bg-background">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-14 flex-col border-r bg-background sm:flex items-start">
        <TooltipProvider>
          <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
            <div
              // to={DASHBOARD}
              className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
            >
              <Squirrel className="h-4 w-4 transition-all group-hover:scale-110" />
              <span className="sr-only">Acme Inc</span>
            </div>
            {/* <ListCustom
              to={DASHBOARD}
              label="Dashboard"
              children={<Home className="h-5 w-5" />}
            /> */}
            <ListCustom
              to={CASHIER}
              label="Cashier"
              children={<Calculator className="h-5 w-5" />}
            />
            <ListCustom
              to={PRODUCT}
              label="Products"
              children={<Package className="h-5 w-5" />}
            />
            {/* <ListCustom
              to={ORDER}
              label="Orders"
              children={<ShoppingBag className="h-5 w-5" />}
            /> */}
            <ListCustom
              to={ANALYTIC}
              label="Analytics"
              children={<LineChart className="h-5 w-5" />}
            />
            <ListCustom
              to={HISTORY}
              label="Histories"
              children={<History className="h-5 w-5" />}
            />
            <ListCustom
              to={JOURNAL}
              label="Journal"
              children={<Notebook className="h-5 w-5" />}
            />
          </nav>
          <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button onClick={handleSwitchSelect} variant="ghost" size="sm">
                  {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                  <span className="sr-only">Theme</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">Theme</TooltipContent>
            </Tooltip>
            <ListCustom
              to={SETTING}
              label="Settings"
              children={<Settings className="h-5 w-5" />}
            />
          </nav>
        </TooltipProvider>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14 w-full h-full">
        <header className="sticky md:fixed justify-between w-full top-0 right-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:border-0 sm:px-6 sm:pl-20 shadow-sm">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  to="#"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                  <span className="sr-only">Acme Inc</span>
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                {/* <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                </Link> */}
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Users2 className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  to="#"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Settings
                </Link>
                <button
                  onClick={handleSwitchSelect}
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  {theme === "dark" ? <Moon size={20} /> : <Sun size={20} />}
                  Theme
                </button>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex gap-4 items-center">
            <Badge className="h-10 flex gap-2" variant="secondary">
              <Store size={20} />
              {data?.data?.name}
            </Badge>
            <Breadcrumb className="hidden md:flex">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="#">Dashboard</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>
                    <Link to={path}>
                      {capitalizeFirstLetter(
                        splitPath[1] == "" ? "cashier" : splitPath[1]
                      )}
                    </Link>
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2" asChild>
              <Button
                variant="outline"
                // size="icon"
                className="overflow-hidden rounded-full pl-0"
              >
                {data?.data?.imageUrl ? (
                  <Avatar className="relative h-16 w-16 group cursor-pointer rounded-none">
                    <AvatarImage
                      className="object-cover"
                      src={data?.data?.imageUrl || ""}
                      alt="@shadcn"
                    />
                    <AvatarFallback className="group-hover:blur-sm">
                      {data?.data?.fullname[0].toUpperCase() || "N/A"}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <CircleUser className="overflow-hidden rounded-full h-36 w-36"></CircleUser>
                )}
                <span>
                  {data?.data?.fullname ||
                    data?.data?.email ||
                    "User not found"}
                </span>
              </Button>
              {/* <div>{data?.data?.fullname || data?.data?.email}</div> */}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link to={SETTING}>Setting</Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Button
                  onClick={() => {
                    localStorage.removeItem("token");
                    window.location.href = LOGIN;
                  }}
                  className="w-full bg-destructive hover:bg-destructive"
                >
                  Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        <main className="h-full w-full">{children || <Outlet />}</main>
      </div>
    </div>
  );
};

export default Layout;
