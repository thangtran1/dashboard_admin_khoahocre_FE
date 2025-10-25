import apiClient from "../apiClient";

export enum MaintenanceStatus {
  SCHEDULED = 'scheduled',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum MaintenanceType {
  DATABASE = 'database',
  SYSTEM = 'system',
  NETWORK = 'network',
  OTHER = 'other',
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

export interface MaintenanceStatusResponse {
  success: boolean;
  message: string;
  data: {
    isUnderMaintenance: boolean;
    maintenance: Maintenance | null;
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

};

export default maintenanceApi;
