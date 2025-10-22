import apiClient from "../apiClient";

// ========== TYPES ==========
export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  status?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  bio?: string;
  lastLoginAt?: string;
  loginCount?: number;
  isEmailVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateUserReq {
  email: string;
  name: string;
  password: string;
  role?: string;
  status?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  bio?: string;
}

export interface UpdateUserReq {
  email?: string;
  name?: string;
  role?: string;
  status?: string;
  avatar?: string;
  phone?: string;
  dateOfBirth?: string;
  address?: string;
  bio?: string;
}

export interface QueryUserParams {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  isDeleted?: boolean;
  isNewUsers?: boolean;
}

export interface GetUsersRes {
  success: boolean;
  message: string;
  data: User[];
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface UserStats {
  total: number;
  active: number;
  inactive: number;
  banned: number;
  admins: number;
  users: number;
  moderators: number;
  newUsersThisMonth: number;
}

// ========== TRANSFORM FUNCTIONS ==========
const transformUser = (user: any): User => ({
  id: user._id,
  email: user.email,
  name: user.name,
  role: user.role,
  status: user.status,
  avatar: user.avatar,
  phone: user.phone,
  dateOfBirth: user.dateOfBirth,
  address: user.address,
  bio: user.bio,
  lastLoginAt: user.lastLoginAt,
  loginCount: user.loginCount,
  isEmailVerified: user.isEmailVerified,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

// ========== API ENDPOINTS ==========
export enum UserManagementApi {
  GetAll = "/user",
  Create = "/user",
  GetById = "/user/:id",
  Update = "/user/:id",
  Delete = "/user",
  SoftDelete = "/user/soft-delete",
  Restore = "/user/restore",
  Stats = "/user/stats",
  UpdateRole = "/user/:id/role",
  UpdateStatus = "/user/:id/status",
  BulkUpdateStatus = "/user/bulk/status",
}

// ========== API CALLS ==========

// Get all users with pagination and filters
export const getUsers = async (params?: QueryUserParams) => {
  const response = await apiClient.get({
    url: UserManagementApi.GetAll,
    params,
  });

  // Transform the response data
  if (response.data.success && response.data.data) {
    return {
      ...response,
      data: {
        ...response.data,
        data: response.data.data.map(transformUser),
      },
    };
  }

  return response;
};

// Get user statistics
export const getUserStats = async (): Promise<UserStats> => {
  const response = await apiClient.get({ url: UserManagementApi.Stats });
  return response.data.data;
};

// Get user by ID
export const getUserById = async (id: string): Promise<User> => {
  const response = await apiClient.get({
    url: UserManagementApi.GetById.replace(":id", id),
  });
  return transformUser(response.data.data);
};

// Create new user
export const createUser = async (data: CreateUserReq) => {
  const response = await apiClient.post<any>({
    url: UserManagementApi.Create,
    data,
  });

  // Transform the response data if it contains user data
  if (response.data.success && response.data.data) {
    return {
      ...response,
      data: {
        ...response.data,
        data: transformUser(response.data.data),
      },
    };
  }

  return response;
};

// Bulk create users from Excel
export const bulkCreateUsers = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post<any>({
    url: "/user/bulk-create",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response;
};

// Update user
export const updateUser = async (id: string, data: UpdateUserReq) => {
  const response = await apiClient.put<any>({
    url: UserManagementApi.Update.replace(":id", id),
    data,
  });

  // Transform the response data if it contains user data
  if (response.data.success && response.data.data) {
    return {
      ...response,
      data: {
        ...response.data,
        data: transformUser(response.data.data),
      },
    };
  }

  return response;
};

// Update user role
export const updateUserRole = async (id: string, role: string) => {
  const response = await apiClient.patch<any>({
    url: UserManagementApi.UpdateRole.replace(":id", id),
    data: { role },
  });

  if (response.data.success && response.data.data) {
    return {
      ...response,
      data: {
        ...response.data,
        data: transformUser(response.data.data),
      },
    };
  }

  return response;
};

// Update user status
export const updateUserStatus = async (id: string, status: string) => {
  const response = await apiClient.patch<any>({
    url: UserManagementApi.UpdateStatus.replace(":id", id),
    data: { status },
  });

  if (response.data.success && response.data.data) {
    return {
      ...response,
      data: {
        ...response.data,
        data: transformUser(response.data.data),
      },
    };
  }

  return response;
};

// Delete one or many users
export const deleteUser = async (ids: string | string[]) => {
  return await apiClient.delete({
    url: UserManagementApi.Delete,
    data: { ids },
  });
};

// Bulk update status
export const bulkUpdateUserStatus = async (ids: string[], status: string) => {
  return await apiClient.patch({
    url: UserManagementApi.BulkUpdateStatus,
    data: { ids, status },
  });
};

// Soft delete users
export const softDeleteUser = async (ids: string | string[]) => {
  return await apiClient.delete({
    url: UserManagementApi.SoftDelete,
    data: { ids },
  });
};

// Restore users
export const restoreUser = async (ids: string | string[]) => {
  return await apiClient.patch({
    url: UserManagementApi.Restore,
    data: { ids },
  });
};

export default {
  getUsers,
  getUserStats,
  getUserById,
  createUser,
  updateUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  bulkUpdateUserStatus,
  softDeleteUser,
  restoreUser,
};
