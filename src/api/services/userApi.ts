import apiClient from "../apiClient";

import type { UserInfo, UserToken } from "#/entity";

export interface SignInReq {
  email: string;
  password: string;
}

export type SignInRes = UserToken & { user: UserInfo };

export interface ForgotPasswordReq {
  email: string;
}

export interface VerifyOtpReq {
  email: string;
  otp: string;
}

export interface ResetPasswordReq {
  token: string;
  newPassword: string;
}

export interface ForgotPasswordRes {
  data?: {
    success: boolean;
    message?: string;
  };
}

export type VerifyOtpRes = {
  data?: {
    success: boolean;
    message?: string;
    token?: string;
  };
};

export interface ResetPasswordRes {
  data?: {
    success: boolean;
    message?: string;
  };
}
//  forgot Password

export enum UserApi {
  Login = "/auth/login",
  ForgotPassword = "/auth/forgot-password",
  VerifyOtp = "/auth/verify-otp",
  ResetPassword = "/auth/reset-password",
  Logout = "/auth/logout",
}

const login = (data: SignInReq) =>
  apiClient.post<SignInRes>({ url: UserApi.Login, data });

const forgotPassword = (data: ForgotPasswordReq) =>
  apiClient.post<ForgotPasswordRes>({ url: UserApi.ForgotPassword, data });

const verifyOtp = (data: VerifyOtpReq) =>
  apiClient.post<VerifyOtpRes>({ url: UserApi.VerifyOtp, data });

const resetPassword = (data: ResetPasswordReq) =>
  apiClient.post<ResetPasswordRes>({ url: UserApi.ResetPassword, data });

const logout = () =>
  apiClient.post<{ data: { success: boolean; message: string } }>({
    url: UserApi.Logout,
  });

export default {
  login,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logout,
};
