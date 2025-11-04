import apiClient from "../apiClient";

export interface BannerSettings {
  _id?: string;
  id?: string;
  backgroundColor: string;
  textColor: string;
  scrollSpeed: number;
  bannerSpacing: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface BannerConfig {
  _id?: string;
  id: string;
  content: string;
  isActive: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}
// 🧱 Kiểu dữ liệu cho thống kê banner
export enum BannerStatsPeriod {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export interface BannerStats {
  labels: string[];
  series: { name: string; data: number[] }[];
}

export interface CreateBannerRequest {
  content: string;
  isActive?: boolean;
  order?: number;
}

export interface UpdateBannerRequest {
  id: string;
  content?: string;
  isActive?: boolean;
  order?: number;
}

export interface UpdateBannerSettingsRequest {
  backgroundColor?: string;
  textColor?: string;
  scrollSpeed?: number;
  bannerSpacing?: number;
  isActive?: boolean;
}

const transformBanner = (banner: any): BannerConfig => ({
  id: banner._id || banner.id,
  content: banner.content,
  isActive: banner.isActive,
  order: banner.order,
  createdAt: banner.createdAt,
  updatedAt: banner.updatedAt,
});

export const getBannerSettings = async (): Promise<BannerSettings> => {
  const response = await apiClient.get({ url: "/banners/settings" });
  return response.data.data;
};

export const updateBannerSettings = async (
  settings: UpdateBannerSettingsRequest
): Promise<BannerSettings> => {
  const response = await apiClient.put({
    url: "/banners/settings",
    data: settings,
  });

  return response.data.data;
};

export const resetBannerSettings = async (): Promise<BannerSettings> => {
  const response = await apiClient.post({ url: "/banners/settings/reset" });
  return response.data.data;
};

// ========== BANNER API ==========

export const createBanner = async (
  banner: CreateBannerRequest
): Promise<BannerConfig> => {
  const response = await apiClient.post({
    url: "/banners",
    data: banner,
  });

  return response.data.data;
};

export const getAllBanners = async (
  page: number = 1,
  limit: number = 10
): Promise<{
  banners: BannerConfig[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}> => {
  const response = await apiClient.get({
    url: "/banners",
    params: { page, limit },
  });

  return {
    banners: response.data.data.map(transformBanner),
    pagination: response.data.pagination,
  };
};

export const getActiveBanners = async (): Promise<BannerConfig[]> => {
  const response = await apiClient.get({ url: "/banners/active" });
  return response.data.data;
};

export const getBannerById = async (id: string): Promise<BannerConfig> => {
  const response = await apiClient.get({ url: `/banners/${id}` });
  return response.data.data;
};

export const updateBanner = async (
  banner: UpdateBannerRequest
): Promise<BannerConfig> => {
  const { id, ...updateData } = banner;
  const response = await apiClient.put({
    url: `/banners/${id}`,
    data: updateData,
  });

  return response.data.data;
};

export const toggleBanner = async (
  id: string,
  isActive: boolean
): Promise<BannerConfig> => {
  const response = await apiClient.put({
    url: `/banners/${id}/toggle`,
    data: { isActive },
  });

  return response.data.data;
};

export const updateBannerOrder = async (
  id: string,
  order: number
): Promise<BannerConfig> => {
  const response = await apiClient.patch({
    url: `/banners/${id}/order`,
    data: { order },
  });

  return response.data.data;
};

export const deleteBanner = async (id: string): Promise<void> => {
  const response = await apiClient.delete({ url: `/banners/${id}` });
  return response.data.data;
};

// ========== BATCH OPERATIONS ==========

export const batchUpdateBanners = async (
  updates: Array<{ id: string; data: Partial<UpdateBannerRequest> }>
): Promise<BannerConfig[]> => {
  const promises = updates.map(({ id, data }) => updateBanner({ id, ...data }));

  const results = await Promise.all(promises);

  return results;
};

// ========== UTILITY FUNCTIONS ==========

export const prefetchBannerData = async (): Promise<void> => {
  await Promise.all([getBannerSettings(), getActiveBanners()]);
};

export const statsBanner = {
  getBannerStats: async (period: BannerStatsPeriod): Promise<BannerStats> => {
    const response = await apiClient.get({
      url: "/banners/stats",
      params: { period: period.toString() },
    });
    return response.data.data as BannerStats;
  },
};
