import apiClient from "../apiClient";

export const getStatusConfig = (status: MaintenanceStatus) => {
  switch (status) {
    case MaintenanceStatus.SCHEDULED:
      return {
        color: "blue",
        icon: "lucide:calendar-clock",
        textClass: "text-blue-700",
      };
    case MaintenanceStatus.IN_PROGRESS:
      return {
        color: "orange",
        icon: "lucide:settings",
        textClass: "text-orange-700",
      };
    case MaintenanceStatus.COMPLETED:
      return {
        color: "green",
        icon: "lucide:check-circle",
        textClass: "text-green-700",
      };
    case MaintenanceStatus.CANCELLED:
      return {
        color: "red",
        icon: "lucide:x-circle",
        textClass: "text-red-700",
      };
    default:
      return {
        color: "default",
        icon: "lucide:circle",
        textClass: "text-gray-700",
      };
  }
};

export const getTypeConfig = (type: MaintenanceType) => {
  switch (type) {
    case MaintenanceType.DATABASE:
      return { color: "purple", icon: "lucide:database" };
    case MaintenanceType.SYSTEM:
      return { color: "cyan", icon: "lucide:settings" };
    case MaintenanceType.NETWORK:
      return { color: "geekblue", icon: "lucide:network" };
    case MaintenanceType.OTHER:
      return { color: "default", icon: "lucide:more-horizontal" };
    default:
      return { color: "default", icon: "lucide:circle" };
  }
};
export enum MaintenanceStatus {
  SCHEDULED = "scheduled",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum MaintenanceType {
  DATABASE = "database",
  SYSTEM = "system",
  NETWORK = "network",
  OTHER = "other",
}

export interface Maintenance {
  _id: string;
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  status: MaintenanceStatus;
  type: MaintenanceType;
  isActive: boolean;
  autoAdjusted: boolean;
  duration?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateMaintenanceDto {
  title: string;
  description?: string;
  startTime: string;
  endTime: string;
  type: MaintenanceType;
}

export interface UpdateMaintenanceDto extends Partial<CreateMaintenanceDto> {}

export interface MaintenanceFilter {
  title?: string;
  status?: MaintenanceStatus;
  type?: MaintenanceType;
  from?: string;
  to?: string;
  page?: number;
  limit?: number;
}

export interface MaintenanceResponse {
  success: boolean;
  message: string;
  data: {
    maintenance: Maintenance;
    success: boolean;
    message: string;
  };
}

export interface MaintenanceListResponse {
  success: boolean;
  message: string;
  data: {
    pagination: {
      total: number;
      page: number;
      totalPages: number;
      limit: number;
    };
    success: boolean;
    data: Maintenance[];
  };
}
export interface MaintenanceStats {
  labels: string[];
  series: { name: string; data: number[] }[];
}

export interface MaintenanceStatusResponse {
  success: boolean;
  message: string;
  data: {
    data: {
      isUnderMaintenance: boolean;
      maintenance: Maintenance;
      estimatedDuration: number | null;
    };
  };
}

const maintenanceApi = {
  getList: (params?: MaintenanceFilter) =>
    apiClient.get<MaintenanceListResponse>({
      url: "/maintenance",
      params,
    }),

  getById: (id: string) =>
    apiClient.get<MaintenanceResponse>({
      url: `/maintenance/${id}`,
    }),

  create: (data: CreateMaintenanceDto) =>
    apiClient.post<MaintenanceResponse>({
      url: "/maintenance",
      data,
    }),

  update: (id: string, data: UpdateMaintenanceDto) =>
    apiClient.patch<MaintenanceResponse>({
      url: `/maintenance/${id}`,
      data,
    }),

  remove: (ids: string | string[]) =>
    apiClient.delete<MaintenanceResponse>({
      url: `/maintenance`,
      data: { ids: Array.isArray(ids) ? ids : [ids] },
    }),

  startNow: (id: string) =>
    apiClient.post<MaintenanceResponse>({
      url: `/maintenance/${id}/start`,
    }),

  stop: (id: string) =>
    apiClient.post<MaintenanceResponse>({
      url: `/maintenance/${id}/stop`,
    }),

  cancel: (id: string) =>
    apiClient.post<MaintenanceResponse>({
      url: `/maintenance/${id}/cancel`,
    }),

  getCurrentStatus: () =>
    apiClient.get<MaintenanceStatusResponse>({
      url: "/maintenance/current-status",
    }),

  getMaintenanceStats: async (): Promise<MaintenanceStats> => {
    const response = await apiClient.get({
      url: "/maintenance/stats",
    });
    return response.data.data as MaintenanceStats;
  },
};

export default maintenanceApi;
