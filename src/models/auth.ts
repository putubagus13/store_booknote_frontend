export interface IPayloadRegister {
  email: string;
  password: string;
  fullname: string;
  storeName: string;
  storeType: number | null;
  confirmPassword: string;
}

export interface IResRegister {
  token: string;
}

export interface IPayloadOtpRegister {
  codeOtp: string;
  token: string;
}
