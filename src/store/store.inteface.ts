import { Theme } from "@/components/theme-provider";

export interface iThameSelection {
  defaultTheme: Theme;
  selectedTheme: (theme: Theme) => void;
}

export interface ITokenVerivication {
  token: string;
  setToken: (e: string) => void;
}

export interface IUserProfile {
  userId: string;
  fullname: string;
  imageUrl: string | null;
  phoneNumber: string | null;
  email: string;
  storeId: string;
  name: string;
  storeImageUrl: string | null;
  storeType: number | null;
  storeTypeName: string;
}

export interface ISession {
  userProfile: IUserProfile;
  setUserProfile: (payload: IUserProfile) => void;
}
