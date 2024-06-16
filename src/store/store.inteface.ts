import { Theme } from "@/components/theme-provider";

export interface iThameSelection {
  defaultTheme: Theme;
  selectedTheme: (theme: Theme) => void;
}

export interface ITokenVerivication {
  token: string;
  setToken: (e: string) => void;
}
