import apiClient from "../apiClient";
import { CategoryStatus } from "@/types/enum";
export interface CreateCategoryDto {
  name: string;
  slug?: string;
  description?: string;
  image?: string;
  status?: CategoryStatus;
  sortOrder?: number;
}

export interface Category {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  status?: CategoryStatus;
  image?: string;
  productCount?: number;
  sortOrder?: number;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryListResponse {
  success: boolean;
  message: string;
  data: {
    data: Category[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const categoryService = {
  create: async (
    data: CreateCategoryDto
  ): Promise<{ success: boolean; message: string; data: Category }> => {
    const response = await apiClient.post({
      url: "/categories",
      data,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Category;
    };
  },

  getActive: async (
  ): Promise<{ success: boolean; message: string; data: Category[] }> => {
    const response = await apiClient.get({
      url: "/categories/active",
    });
    return response.data as {
      success: boolean;
      message: string;
    data: Category[];
    };
  },

  getCategoryBySlug: async (slug: string): Promise<{ success: boolean; message: string; data: Category }> => {
    const response = await apiClient.get({
      url: `/categories/slug/${slug}`,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Category;
    };
  },

  getAllCategories: async (
    page: number = 1,
    limit: number = 20,
    options: {
      search?: string;
      status?: CategoryStatus;
      isFeatured?: boolean;
    }
  ): Promise<CategoryListResponse> => {
    const response = await apiClient.get({
      url: "/categories",
      params: { page, limit, ...(options || {}) },
    });
    return response.data as {
      success: boolean;
      message: string;
      data: {
        data: Category[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
    };
  },

  getCategoryById: async (id: string): Promise<{ success: boolean; message: string; data: Category }> => {
    const response = await apiClient.get({
      url: `/categories/${id}`,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Category;
    };
  },

  updateCategory: async (id: string, data: CreateCategoryDto): Promise<{ success: boolean; message: string; data: Category }> => {
    const response = await apiClient.patch({
      url: `/categories/${id}`,
      data,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Category;
    };
  },

  deleteCategory: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete({
      url: `/categories/${id}`,
    });
    return response.data as {
      success: boolean;
      message: string;
    };
  },
};
