import apiClient from "../apiClient";

export interface ActivityLogStats {
  labels: string[];
  series: { name: string; data: number[] }[];
}
export enum ActivityLogPeriod {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

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

export const statsActivityLog = {
  getActivityStats: async (
    period: ActivityLogPeriod
  ): Promise<ActivityLogStats> => {
    const response = await apiClient.get({
      url: "/activity-log/stats",
      params: { period: period.toString() },
    });
    return response.data.data as ActivityLogStats;
  },
};

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
