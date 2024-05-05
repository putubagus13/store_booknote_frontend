import { Theme } from "@/components/theme-provider";

export interface iThameSelection {
  defaultTheme: Theme;
  selectedTheme: (theme: Theme) => void;
}
