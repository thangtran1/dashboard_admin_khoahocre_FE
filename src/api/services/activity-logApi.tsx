import { AuthSessionStatus, BasicStatus } from "@/types/enum";
import apiClient from "../apiClient";
export interface ActivityLog {
  id: string;
  ip?: string;
  timestamp: string;
  type: string;
  userAgent?: string;
}

export interface AuthSession {
  userId: string;
  sessionStatus: AuthSessionStatus;
  lastActivityType: "login" | "logout";
  lastActivityTime: string;
  ip: string;
  userAgent: string;
  userName: string;
  email: string;
  status: BasicStatus;
}

export interface AuthSessionListResponse {
  success: boolean;
  message: string;
  data: {
    authSessions: AuthSession[];
    total: number;
    page: number;
    limit: number;
  };
}


export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  onPageChange: (page: number, pageSize?: number) => void;
}

export enum ActivityLogApi {
  GetById = "/activity-log/:id",
  GetAdmin = "/activity-log/admin",
  GetAll = "/activity-log/sessions/all",
}

// Lấy lịch sử hoạt động của user
export const detailActivityLogForUser = async (userId: string) => {
  return await apiClient.get<{
    data: {
      success: boolean;
      message: string;
      data: ActivityLog[];
    };
  }>({
    url: ActivityLogApi.GetById.replace(":id", userId),
  });
};

// Lấy lịch sử hoạt động của admin
export const getActivityLogsAdmin = async () => {
  return await apiClient.get<{
    data: {
      success: boolean;
      message: string;
      data: ActivityLog[];
    };
  }>({
    url: ActivityLogApi.GetAdmin,
  });
};



// Admin API Services
export const getAllAuthSessions = {
  getAll: async (
    page: number = 1,
    limit: number = 20,
    options: {
      keyword?: string;
      sessionStatus?: AuthSessionStatus;
      from?: string;
      to?: string;
    }
  ): Promise<AuthSessionListResponse> => {
    const response = await apiClient.get({
      url: ActivityLogApi.GetAll,
      params: { page, limit, ...(options || {}) },
    });
    return response.data;
  },
};
