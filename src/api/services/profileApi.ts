import { BasicStatus } from "@/types/enum";
import apiClient from "../apiClient";

// ========== INTERFACES ==========
export interface UserProfile {
  _id: string;
  email: string;
  name: string;
  role: string;
  status: BasicStatus;
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

// Get user profile
export const getUserProfile = async (): Promise<UserProfile> => {
  const response = await apiClient.get({ url: ProfileApi.GetProfile });
  return response.data.data;
};

// Update user profile
export const updateUserProfile = async (
  data: UpdateProfileReq
): Promise<UserProfile> => {
  const response = await apiClient.patch({
    url: ProfileApi.UpdateProfile,
    data,
  });
  return response.data.data;
};

// User change password
export const changePassword = async (data: {
  currentPassword: string;
  newPassword: string;
}): Promise<void> => {
  await apiClient.patch({
    url: "/user/profile/password",
    data,
  });
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
  const response = await apiClient.get({ url: ProfileApi.GetSystemSettings });
  return response.data.data;
};

// Update system settings
export const updateSystemSettings = async (
  data: UpdateSystemSettingsReq
): Promise<SystemSettings> => {
  const response = await apiClient.put({
    url: ProfileApi.UpdateSystemSettings,
    data,
  });
  return response.data.data;
};

// Get default language
export const getDefaultLanguage = async (): Promise<string> => {
  const response = await apiClient.get({ url: ProfileApi.GetDefaultLanguage });
  return response.data.data.defaultLanguage;
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
