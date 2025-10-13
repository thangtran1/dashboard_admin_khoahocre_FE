import apiClient from "../apiClient";

// ========== INTERFACES ==========
export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  role: string;
  status: string;
  bio?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  avatar?: string;
  loginCount: number;
  isEmailVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateProfileReq {
  name?: string;
  bio?: string;
  phone?: string;
  address?: string;
  dateOfBirth?: string;
  avatar?: string;
}

export interface AdminChangePasswordReq {
  currentPassword: string;
  newPassword: string;
}

export interface SystemSettings {
  _id: string;
  defaultLanguage: string;
  systemName: string;
  systemDescription: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateSystemSettingsReq {
  defaultLanguage?: string;
  systemName?: string;
  systemDescription?: string;
}

// ========== API ENDPOINTS ==========
export enum ProfileApi {
  GetProfile = "/user/profile",
  UpdateProfile = "/user/profile",
  AdminChangePassword = "/user/admin/change-password",
  GetSystemSettings = "/system/settings",
  UpdateSystemSettings = "/system/settings",
  GetDefaultLanguage = "/system/default-language",
}

// ========== API CALLS ==========

// Simple cache implementation
const cache = new Map<string, { data: any; timestamp: number }>();
const CACHE_DURATION = 30000; // 30 seconds

const getCachedData = (key: string) => {
  const cached = cache.get(key);
  return cached && Date.now() - cached.timestamp < CACHE_DURATION
    ? cached.data
    : null;
};

const setCachedData = (key: string, data: any) => {
  cache.set(key, { data, timestamp: Date.now() });
};

// Get user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  const cacheKey = "user-profile";
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const response = await apiClient.get({ url: ProfileApi.GetProfile });
  const data = response.data.data;
  setCachedData(cacheKey, data);
  return data;
};

// Update user profile
export const updateUserProfile = async (
  data: UpdateProfileReq
): Promise<UserProfile> => {
  const response = await apiClient.patch({
    url: ProfileApi.UpdateProfile,
    data,
  });
  // Clear cache khi update
  cache.delete("user-profile");
  return response.data.data;
};

// Admin change password
export const adminChangePassword = async (data: AdminChangePasswordReq) => {
  const response = await apiClient.patch({
    url: ProfileApi.AdminChangePassword,
    data,
  });
  return response.data;
};

// Get system settings
export const getSystemSettings = async (): Promise<SystemSettings> => {
  const cacheKey = "system-settings";
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const response = await apiClient.get({ url: ProfileApi.GetSystemSettings });
  const data = response.data.data;
  setCachedData(cacheKey, data);
  return data;
};

// Update system settings
export const updateSystemSettings = async (
  data: UpdateSystemSettingsReq
): Promise<SystemSettings> => {
  const response = await apiClient.put({
    url: ProfileApi.UpdateSystemSettings,
    data,
  });
  // Clear cache khi update
  cache.delete("system-settings");
  return response.data.data;
};

// Get default language
export const getDefaultLanguage = async (): Promise<string> => {
  const cacheKey = "default-language";
  const cached = getCachedData(cacheKey);
  if (cached) return cached;

  const response = await apiClient.get({ url: ProfileApi.GetDefaultLanguage });
  const data = response.data.data.defaultLanguage;
  setCachedData(cacheKey, data);
  return data;
};

// Upload avatar
export const uploadAvatar = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append("avatar", file);

  const response = await apiClient.post({
    url: "/user/upload-avatar",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });

  // Clear profile cache after upload
  cache.delete("user-profile");
  return response.data.data.avatarUrl;
};

export default {
  getUserProfile,
  updateUserProfile,
  adminChangePassword,
  getSystemSettings,
  updateSystemSettings,
  getDefaultLanguage,
  uploadAvatar,
};
