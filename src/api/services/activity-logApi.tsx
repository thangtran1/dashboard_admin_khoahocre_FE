import apiClient from "../apiClient";
export interface ActivityLog {
  id: string;
  ip?: string;
  timestamp: string;
  type: string;
  userAgent?: string;
}

export enum ActivityLogApi {
  GetById = "/activity-log/:id",
  GetAdmin = "/activity-log/admin",
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
