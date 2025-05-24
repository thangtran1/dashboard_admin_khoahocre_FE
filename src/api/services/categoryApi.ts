import apiClient from "../apiClient";

import type { Category } from "#/entity";

export type CreateAndUpdateCategoryRes = {
  message: string;
  category: Category;
};
export type DeleteCategoryRes = { success: boolean; message?: string };

export enum CategoryApi {
  GetAll = "/category", // GET tất cả categories
  Create = "/category", // POST tạo category mới
  Update = "/category/:code", // PUT cập nhật category theo code
  Delete = "/category/:code", // DELETE xóa category theo code
}

const getCategories = () =>
  apiClient.get<Category[]>({ url: CategoryApi.GetAll });

const createCategory = (data: CreateAndUpdateCategoryRes) =>
  apiClient.post<CreateAndUpdateCategoryRes>({ url: CategoryApi.Create, data });

const updateCategory = (oldCode: string, data: CreateAndUpdateCategoryRes) =>
  apiClient.put<CreateAndUpdateCategoryRes>({
    url: CategoryApi.Update.replace(":code", oldCode),
    data,
  });

const deleteCategory = (code: string) =>
  apiClient.delete<DeleteCategoryRes>({
    url: CategoryApi.Delete.replace(":code", code),
  });

export default {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};
