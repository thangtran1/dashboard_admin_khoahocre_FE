import apiClient from "../apiClient";
import { BrandStatus } from "@/types/enum";
export interface CreateBrandDto {
  name: string;
  slug?: string;
  description?: string;
  logo?: string;
  website?: string;
  status?: BrandStatus;
  sortOrder?: number;
  isFeatured?: boolean;
}

export interface Brand {
  _id: string;
  name: string;
  slug?: string;
  description?: string;
  status?: BrandStatus;
  logo?: string;
  website?: string;
  productCount?: number;
  sortOrder?: number;
  isFeatured?: boolean;
  isDeleted?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BrandListResponse {
  success: boolean;
  message: string;
  data: {
    data: Brand[];
    pagination: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
}

export const brandService = {
  create: async (
    data: CreateBrandDto
  ): Promise<{ success: boolean; message: string; data: Brand }> => {
    const response = await apiClient.post({
      url: "/brands",
      data,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Brand;
    };
  },

  getActive: async (
  ): Promise<{ success: boolean; message: string; data: Brand[] }> => {
    const response = await apiClient.get({
      url: "/brands/active",
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Brand[];
    };
  },

  getAllBrands: async (
    page: number = 1,
    limit: number = 20,
    options: {
      search?: string;
      status?: BrandStatus;
      isFeatured?: boolean;
    }
  ): Promise<BrandListResponse> => {
    const response = await apiClient.get({
      url: "/brands",
      params: { page, limit, ...(options || {}) },
    });
    return response.data as {
      success: boolean;
      message: string;
      data: {
        data: Brand[];
        pagination: {
          total: number;
          page: number;
          limit: number;
          totalPages: number;
        };
      };
    };
  },

  getBrandBySlug: async (slug: string): Promise<{ success: boolean; message: string; data: Brand }> => {
    const response = await apiClient.get({
      url: `/brands/slug/${slug}`,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Brand;
    };
  },

  getBrandById: async (id: string): Promise<{ success: boolean; message: string; data: Brand }> => {
    const response = await apiClient.get({
      url: `/brands/${id}`,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Brand;
    };
  },

  getBrandsFeatured: async (): Promise<{ success: boolean; message: string; data: Brand[] }> => {
    const response = await apiClient.get({
      url: `/brands/featured`,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Brand[];
    };
  },

  updateBrand: async (id: string, data: CreateBrandDto): Promise<{ success: boolean; message: string; data: Brand }> => {
    const response = await apiClient.patch({
      url: `/brands/${id}`,
      data,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Brand;
    };
  },

  deleteBrand: async (id: string): Promise<{ success: boolean; message: string }> => {
    const response = await apiClient.delete({
      url: `/brands/${id}`,
    });
    return response.data as {
      success: boolean;
      message: string;
    };
  },
};
