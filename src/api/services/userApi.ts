import apiClient from "../apiClient";

import type { UserInfo, UserToken } from "#/entity";

export interface SignInReq {
  email: string;
  password: string;
}

export interface SignUpReq {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
  role?: string;
  provider?: string;
  providerId?: string;
}
export type SignInRes = UserToken & { user: UserInfo };

//  forgot Password
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
  Register = "/auth/register",
  ForgotPassword = "/auth/forgot-password",
  VerifyOtp = "/auth/verify-otp",
  ResetPassword = "/auth/reset-password",
  Logout = "/auth/logout",
}

const login = (data: SignInReq) =>
  apiClient.post<SignInRes>({ url: UserApi.Login, data });

const register = (data: SignInReq) =>
  apiClient.post<{ data: { success: boolean; message: string } }>({
    url: UserApi.Register,
    data,
  });

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
  register,
  forgotPassword,
  verifyOtp,
  resetPassword,
  logout,
};
