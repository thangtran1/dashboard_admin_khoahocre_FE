import apiClient from "../apiClient";

import type { Courses } from "#/entity";

export type CreateAndUpdateCoursesRes = {
  message: string;
  courses: Courses;
};
export type DeleteCoursesRes = { success: boolean; message?: string };

export enum CoursesApi {
  GetAll = "/courses", // GET tất cả courses
  Create = "/courses", // POST tạo courses mới
  Update = "/courses/:slug", // PUT cập nhật courses theo slug
  Delete = "/courses/:slug", // DELETE xóa courses theo slug
}

const getCourses = () => apiClient.get<Courses[]>({ url: CoursesApi.GetAll });

const createCourses = (data: CreateAndUpdateCoursesRes) =>
  apiClient.post<CreateAndUpdateCoursesRes>({ url: CoursesApi.Create, data });

const updateCourses = (slug: string, data: CreateAndUpdateCoursesRes) =>
  apiClient.put<CreateAndUpdateCoursesRes>({
    url: CoursesApi.Update.replace(":slug", slug),
    data,
  });

const deleteCourses = (slug: string) =>
  apiClient.delete<DeleteCoursesRes>({
    url: CoursesApi.Delete.replace(":slug", slug),
  });

export default {
  getCourses,
  createCourses,
  updateCourses,
  deleteCourses,
};
