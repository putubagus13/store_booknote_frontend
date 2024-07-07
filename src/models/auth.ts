export interface IPayloadRegister {
  email: string;
  password: string;
  fullname: string;
  storeName: string;
  name?: string;
  storeType: number | null;
  confirmPassword: string;
}

export interface IResToken {
  token: string;
}

export interface IPayloadOtpRegister {
  codeOtp: string;
  token: string;
}

export interface IPayloadLogin {
  email: string;
  password: string;
}

export interface IPayloadResetPassword {
  password: string;
  confirmPassword: string;
  token: string;
}

export interface IPayloadResendOtpRegister {
  token: string;
}
