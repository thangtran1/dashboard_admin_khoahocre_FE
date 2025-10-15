import apiClient from "../apiClient";

export interface ListBackupsParams {
  search?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  pageSize?: number;
}
export const databaseAdmin = {
  // 1. Lấy thông tin cơ sở dữ liệu
  getDatabaseInfo: async () => {
    const response = await apiClient.get({
      url: "/database/info",
    });
    return response.data;
  },

  // 2. Tạo bản sao lưu thông tin dữ liệu trong database
  backupDatabase: async () => {
    const response = await apiClient.post({
      url: "/database/backup",
    });
    return response.data;
  },
  // 3. Khôi phục thông tin dữ liệu trong database
  restoreDatabase: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post({
      url: "/database/restore",
      data: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },
  // 4. Xóa thông tin dữ liệu trong database
  deleteDatabase: async () => {
    const response = await apiClient.delete({
      url: "/database/delete",
    });
    return response.data;
  },

  // 5. Lấy danh sách bản sao lưu
  listBackups: async (params?: ListBackupsParams) => {
    const response = await apiClient.get({
      url: "/database/backups",
      params,
    });
    return response.data;
  },

  // 6. Xóa bản sao lưu
  deleteBackup: async (filename: string) => {
    const response = await apiClient.delete({
      url: `/database/backups/${filename}`,
    });
    return response.data;
  },
  // 7. Tải file backup
  downloadBackupJson: async (filename: string) => {
    const response = await apiClient.get({
      url: `/database/backups/download-json/${filename}`,
    });
    return response.data;
  },

  // 8. Xem nội dung file backup
  viewBackup: async (filename: string) => {
    const response = await apiClient.get({
      url: `/database/backups/view/${filename}`,
    });
    return response.data;
  },
};
