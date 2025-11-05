import apiClient from "../apiClient";

export interface ResponseStats {
  labels: string[];
  series: { name: string; data: number[] }[];
}

export enum StatsPeriod {
  DAY = "day",
  WEEK = "week",
  MONTH = "month",
  YEAR = "year",
}

export const statsStatusUser = {
  getStatusUserStats: async (period: StatsPeriod): Promise<ResponseStats> => {
    const response = await apiClient.get({
      url: "/user/stats",
      params: { period: period.toString() },
    });
    return response.data.data as ResponseStats;
  },
};

export const statsBanner = {
  getBannerStats: async (period: StatsPeriod): Promise<ResponseStats> => {
    const response = await apiClient.get({
      url: "/banners/stats",
      params: { period: period.toString() },
    });
    return response.data.data as ResponseStats;
  },
};

export const statsNotification = {
  getNotificationStats: async (period: StatsPeriod): Promise<ResponseStats> => {
    const response = await apiClient.get({
      url: "/notifications/stats",
      params: { period: period.toString() },
    });
    return response.data.data as ResponseStats;
  },
};

export const statsActivityLog = {
  getActivityStats: async (period: StatsPeriod): Promise<ResponseStats> => {
    const response = await apiClient.get({
      url: "/activity-log/stats",
      params: { period: period.toString() },
    });
    return response.data.data as ResponseStats;
  },
};

export const statsMaintenance = {
  getMaintenanceStats: async (): Promise<ResponseStats> => {
    const response = await apiClient.get({
      url: "/maintenance/stats",
    });
    return response.data.data as ResponseStats;
  },
};
