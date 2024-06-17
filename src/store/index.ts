import { create } from "zustand";
import {
  ISession,
  ITokenVerivication,
  IUserProfile,
  iThameSelection,
} from "./store.inteface";
import { Theme } from "@/components/theme-provider";

export const useThemeStore = create<iThameSelection>()((set) => ({
  defaultTheme: (localStorage.getItem("vite-ui-theme") as Theme) || "light",
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

export const useAuthenticatedStore = create<ISession>((set) => ({
  userProfile: {
    userId: "",
    fullname: "",
    imageUrl: "",
    phoneNumber: "",
    email: "",
  },
  setUserProfile: (payload: IUserProfile) => {
    set((state) => {
      return {
        userProfile: {
          userId: payload.userId || state.userProfile.userId,
          fullname: payload.fullname || state.userProfile.fullname,
          imageUrl: payload.imageUrl || state.userProfile.imageUrl,
          phoneNumber: payload.phoneNumber || state.userProfile.phoneNumber,
          email: payload.email || state.userProfile.email,
        },
      };
    });
  },
}));
