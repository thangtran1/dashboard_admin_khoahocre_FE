import apiClient from "../apiClient";

export interface DatabaseInfoResponse {
  success: boolean;
  message: string;
  data: {
    dbName: string;
    collections: string[];
    collectionsCount: number;
    dataSize: string;
    storageSize: string;
    indexes: number;
    timestamp: string;
  };
}

export const databaseAdmin = {
  // 1. Lấy thông tin cơ sở dữ liệu
  getDatabaseInfo: async () => {
    const response = await apiClient.get<DatabaseInfoResponse>({
      url: "/database/info",
    });
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
  // 2. Tạo bản sao lưu thông tin dữ liệu trong database
  backupDatabase: async () => {
    const response = await apiClient.post<DatabaseInfoResponse>({
      url: "/database/backup",
    });
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
  // 3. Khôi phục thông tin dữ liệu trong database
  restoreDatabase: async (file: File) => {
    const response = await apiClient.post<DatabaseInfoResponse>({
      url: "/database/restore",
      data: file,
    });
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
  // 4. Xóa thông tin dữ liệu trong database
  deleteDatabase: async () => {
    const response = await apiClient.delete<DatabaseInfoResponse>({
      url: "/database/delete",
    });
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
  // 5. Lấy danh sách bản sao lưu
  listBackups: async () => {
    const response = await apiClient.get<DatabaseInfoResponse>({
      url: "/database/backups",
    });
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
  // 6. Xóa bản sao lưu
  deleteBackup: async (filename: string) => {
    const response = await apiClient.delete<DatabaseInfoResponse>({
      url: `/database/backups/${filename}`,
    });
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
  // 7. Tải file backup
  downloadBackup: async (filename: string) => {
        const response = await apiClient.get<Blob>({
      url: `/database/backups/download/${filename}`,
      responseType: 'blob',
    });
    return response; // blob ở đây
  },
  

  // 8. Xem nội dung file backup
  viewBackup: async (filename: string) => {
    const response = await apiClient.get<DatabaseInfoResponse>({
      url: `/database/backups/view/${filename}`,
    });
    return {
      success: response.success,
      message: response.message,
      data: response.data,
    };
  },
};
