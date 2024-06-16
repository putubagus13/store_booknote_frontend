import { create } from "zustand";
import { ITokenVerivication, iThameSelection } from "./store.inteface";
import { Theme } from "@/components/theme-provider";

export const useThemeStore = create<iThameSelection>()((set) => ({
  defaultTheme: (localStorage.getItem("vite-ui-theme") as Theme) || "system",
  selectedTheme: (theme: Theme) => {
    set((state) => {
      return {
        defaultTheme: theme ? theme : state.defaultTheme,
      };
    });
  },
}));

export const useTokenStore = create<ITokenVerivication>((set) => ({
  token: "",
  setToken: (e: string) => {
    set({ token: e });
  },
}));
