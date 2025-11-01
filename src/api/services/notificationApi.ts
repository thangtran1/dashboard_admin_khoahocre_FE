import apiClient from "../apiClient";
import { NotificationType } from "@/types/enum";
export interface CreateNotificationDto {
  title: string;
  content: string;
  actionUrl?: string;
  type: NotificationType;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

export interface Notification {
  _id: string;
  title: string;
  content: string;
  type: NotificationType;
  actionUrl?: string;
  readByUsers: string[];
  isReadByUser?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface NotificationListResponse {
  success: boolean;
  message: string;
  data: {
    notifications: Notification[];
    total: number;
    page: number;
    limit: number;
  };
}

export interface UnreadCountResponse {
  unreadCount: number;
}

// Admin API Services
export const notificationAdminService = {
  create: async (
    data: CreateNotificationDto
  ): Promise<{ success: boolean; message: string; data: Notification }> => {
    const response = await apiClient.post({
      url: "/notifications",
      data,
    });
    return response.data as {
      success: boolean;
      message: string;
      data: Notification;
    };
  },

  getAll: async (
    page: number = 1,
    limit: number = 20,
    options: {
      search?: string;
      type?: NotificationType;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<NotificationListResponse> => {
    const response = await apiClient.get({
      url: "/notifications/admin",
      params: { page, limit, ...(options || {}) },
    });
    return response.data;
  },

  getById: async (id: string): Promise<Notification> => {
    const response = await apiClient.get({
      url: `/notifications/admin/${id}`,
    });
    return response.data;
  },

  update: async (
    id: string,
    data: Partial<CreateNotificationDto>
  ): Promise<Notification> => {
    const response = await apiClient.put({
      url: `/notifications/admin/${id}`,
      data,
    });
    return response.data;
  },

  delete: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.delete({
      url: `/notifications/admin/${id}`,
    });
    return response.data;
  },
};

// User API Services
export const notificationUserService = {
  // Lấy thông báo với trạng thái đã đọc
  getAll: async (
    page: number = 1,
    limit: number = 20
  ): Promise<NotificationListResponse> => {
    const response = await apiClient.get({
      url: "/notifications",
      params: { page, limit },
    });
    return response.data;
  },

  // Số lượng thông báo chưa đọc
  getUnreadCount: async (): Promise<UnreadCountResponse> => {
    const response = await apiClient.get({
      url: "/notifications/unread-count",
    });
    return response.data;
  },

  // Đánh dấu đã đọc
  markAsRead: async (id: string): Promise<{ message: string }> => {
    const response = await apiClient.put({
      url: `/notifications/${id}/mark-read`,
    });
    return response.data;
  },
};
