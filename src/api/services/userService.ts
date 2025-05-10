import apiClient from "../apiClient";

import type { UserInfo, UserToken } from "#/entity";

export interface SignInReq {
  email: string;
  password: string;
}

export interface SignUpReq extends SignInReq {
  email: string;
}
export type SignInRes = UserToken & { user: UserInfo };

export enum UserApi {
  Login = "/auth/login",
  Register = "/auth/register",
}

const login = (data: SignInReq) =>
  apiClient.post<SignInRes>({ url: UserApi.Login, data });

const register = (data: SignInReq) =>
  apiClient.post<SignInRes>({ url: UserApi.Register, data });

export default {
  login,
  register,
};
