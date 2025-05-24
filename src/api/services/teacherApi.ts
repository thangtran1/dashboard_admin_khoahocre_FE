import apiClient from "../apiClient";
import type { Teacher } from "#/entity";

export type CreateAndUpdateTeacherPayload = {
  name: string;
  bio: string;
  avatar: string;
};

export type CreateAndUpdateTeacherRes = {
  message: string;
  teacher: Teacher;
};

export type DeleteTeacherRes = {
  success: boolean;
  message?: string;
};

export enum TeachersApi {
  GetAll = "/teacher",
  Create = "/teacher",
  Update = "/teacher/:id",
  Delete = "/teacher/:id",
}

const getTeachers = () =>
  apiClient.get<{ success: boolean; data: Teacher[] }>({
    url: TeachersApi.GetAll,
  });

const createTeachers = (data: CreateAndUpdateTeacherPayload) =>
  apiClient.post<CreateAndUpdateTeacherRes>({ url: TeachersApi.Create, data });

const updateTeachers = (id: string, data: CreateAndUpdateTeacherPayload) =>
  apiClient.put<CreateAndUpdateTeacherRes>({
    url: TeachersApi.Update.replace(":id", id),
    data,
  });

const deleteTeachers = (id: string) =>
  apiClient.delete<DeleteTeacherRes>({
    url: TeachersApi.Delete.replace(":id", id),
  });

export default {
  getTeachers,
  createTeachers,
  updateTeachers,
  deleteTeachers,
};
