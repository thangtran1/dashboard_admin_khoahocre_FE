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

export interface BannerStats {
  total: number;
  active: number;
  inactive: number;
}

// ========== CACHE ==========
let bannerSettingsCache: BannerSettings | null = null;
let activeBannersCache: BannerConfig[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 30000; // 30 seconds

const isCacheValid = () => {
  return Date.now() - cacheTimestamp < CACHE_DURATION;
};

const clearCache = () => {
  bannerSettingsCache = null;
  activeBannersCache = null;
  cacheTimestamp = 0;
};

const transformBanner = (banner: any): BannerConfig => ({
  id: banner._id || banner.id,
  content: banner.content,
  isActive: banner.isActive,
  order: banner.order,
  createdAt: banner.createdAt,
  updatedAt: banner.updatedAt,
});

const transformBannerSettings = (settings: any): BannerSettings => ({
  id: settings._id || settings.id,
  backgroundColor: settings.backgroundColor,
  textColor: settings.textColor,
  scrollSpeed: settings.scrollSpeed,
  bannerSpacing: settings.bannerSpacing,
  isActive: settings.isActive,
  createdAt: settings.createdAt,
  updatedAt: settings.updatedAt,
});

export const getBannerSettings = async (
  useCache = true
): Promise<BannerSettings> => {
  // Sử dụng cache nếu có và còn hiệu lực
  if (useCache && bannerSettingsCache && isCacheValid()) {
    return bannerSettingsCache;
  }

  const response = await apiClient.get({ url: "/banners/settings" });
  const settings = transformBannerSettings(response.data.data);

  // Cache settings
  bannerSettingsCache = settings;
  cacheTimestamp = Date.now();

  return settings;
};

export const updateBannerSettings = async (
  settings: UpdateBannerSettingsRequest
): Promise<BannerSettings> => {
  const response = await apiClient.put({
    url: "/banners/settings",
    data: settings,
  });

  const updatedSettings = transformBannerSettings(response.data.data);

  // Update cache
  bannerSettingsCache = updatedSettings;
  cacheTimestamp = Date.now();

  return updatedSettings;
};

export const resetBannerSettings = async (): Promise<BannerSettings> => {
  const response = await apiClient.post({ url: "/banners/settings/reset" });
  const settings = transformBannerSettings(response.data.data);

  // Update cache
  bannerSettingsCache = settings;
  cacheTimestamp = Date.now();

  return settings;
};

// ========== BANNER API ==========

export const createBanner = async (
  banner: CreateBannerRequest
): Promise<BannerConfig> => {
  const response = await apiClient.post({
    url: "/banners",
    data: banner,
  });

  // Clear cache khi có thay đổi
  clearCache();

  return transformBanner(response.data.data);
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

export const getActiveBanners = async (
  useCache = true
): Promise<BannerConfig[]> => {
  // Sử dụng cache nếu có và còn hiệu lực
  if (useCache && activeBannersCache && isCacheValid()) {
    return activeBannersCache;
  }

  const response = await apiClient.get({ url: "/banners/active" });
  const banners = response.data.data.map(transformBanner);

  // Cache active banners
  activeBannersCache = banners;
  if (!bannerSettingsCache) {
    cacheTimestamp = Date.now();
  }

  return banners;
};

export const getBannerStats = async (): Promise<BannerStats> => {
  const response = await apiClient.get({ url: "/banners/stats" });
  return response.data.data;
};

export const getBannerById = async (id: string): Promise<BannerConfig> => {
  const response = await apiClient.get({ url: `/banners/${id}` });
  return transformBanner(response.data.data);
};

export const updateBanner = async (
  banner: UpdateBannerRequest
): Promise<BannerConfig> => {
  const { id, ...updateData } = banner;
  const response = await apiClient.put({
    url: `/banners/${id}`,
    data: updateData,
  });

  // Clear cache khi có thay đổi
  clearCache();

  return transformBanner(response.data.data);
};

export const toggleBanner = async (
  id: string,
  isActive: boolean
): Promise<BannerConfig> => {
  const response = await apiClient.put({
    url: `/banners/${id}/toggle`,
    data: { isActive },
  });

  // Clear cache khi có thay đổi
  clearCache();

  return transformBanner(response.data.data);
};

export const updateBannerOrder = async (
  id: string,
  order: number
): Promise<BannerConfig> => {
  const response = await apiClient.patch({
    url: `/banners/${id}/order`,
    data: { order },
  });

  // Clear cache khi có thay đổi
  clearCache();

  return transformBanner(response.data.data);
};

export const deleteBanner = async (id: string): Promise<void> => {
  await apiClient.delete({ url: `/banners/${id}` });

  // Clear cache khi có thay đổi
  clearCache();
};

// ========== BATCH OPERATIONS ==========

export const batchUpdateBanners = async (
  updates: Array<{ id: string; data: Partial<UpdateBannerRequest> }>
): Promise<BannerConfig[]> => {
  const promises = updates.map(({ id, data }) => updateBanner({ id, ...data }));

  const results = await Promise.all(promises);

  // Clear cache một lần sau khi batch update
  clearCache();

  return results;
};

// ========== UTILITY FUNCTIONS ==========

export const prefetchBannerData = async (): Promise<void> => {
  // Prefetch cả settings và active banners cùng lúc
  await Promise.all([
    getBannerSettings(false), // Force refresh
    getActiveBanners(false), // Force refresh
  ]);
};

export const clearBannerCache = (): void => {
  clearCache();
};
