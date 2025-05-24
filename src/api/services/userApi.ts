import apiClient from "../apiClient";

// import type { User } from "#/entity";
export type CreateUserReq = {
  email: string;
  name: string;
  password: string;
};

export interface User {
  id: number;
  email: string;
  name: string;
  password: string;
  role: string;
  otp: string | null;
  otpExpiry: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface GetUsersRes {
  success: boolean;
  message: string;
  data: User[];
}

export type UpdateUserReq = {
  email: string;
  name: string;
  password?: string;
  role: string;
};
export type DeleteUserRes = { success: boolean; message?: string };

export enum UserApi {
  GetAll = "/user",
  Create = "/user",
  Update = "/user/:id",
  Delete = "/user/:id",
}
const getUsers = () => apiClient.get<GetUsersRes>({ url: UserApi.GetAll });
const createUser = (data: CreateUserReq) =>
  apiClient.post<CreateUserReq>({ url: UserApi.Create, data });

const updateUser = (id: string, data: UpdateUserReq) =>
  apiClient.put<UpdateUserReq>({
    url: UserApi.Update.replace(":id", id),
    data,
  });

const deleteUser = (id: string) =>
  apiClient.delete<DeleteUserRes>({
    url: UserApi.Delete.replace(":id", id),
  });

export default {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
