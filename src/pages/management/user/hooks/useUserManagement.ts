import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  User,
  CreateUserReq,
  UpdateUserReq,
  QueryUserParams,
  UserStats,
  getUsers,
  getUserStats,
  createUser,
  updateUser,
  updateUserRole,
  updateUserStatus,
  deleteUser,
  softDeleteUser,
  restoreUser,
} from "@/api/services/userManagementApi";

export function useUserManagement(isDeleted: boolean = false) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  // Get initial filters from URL params
  const getInitialFilters = (): QueryUserParams => ({
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "10", 10),
    search: searchParams.get("search") || "",
    role: searchParams.get("role") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    isDeleted,
  });

  const [filters, setFilters] = useState<QueryUserParams>(getInitialFilters());

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Stats
  const [stats, setStats] = useState<UserStats>({
    total: 0,
    active: 0,
    inactive: 0,
    banned: 0,
    admins: 0,
    users: 0,
    moderators: 0,
    newUsersThisMonth: 0,
  });

  // Update URL params when filters change
  const updateUrlParams = (newFilters: QueryUserParams) => {
    const params = new URLSearchParams(searchParams);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    setSearchParams(params);
  };

  // ========== FETCH DATA ==========

  const fetchUsers = async (queryParams?: QueryUserParams) => {
    try {
      setLoading(true);
      const params = { ...filters, ...queryParams };
      const response = await getUsers(params);

      if (response.data.success) {
        setUsers(response.data.data);
        if (response.data.pagination) {
          setPagination(response.data.pagination);
        }
      }
    } catch (error) {
      console.error("❌ fetchUsers ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const statsData = await getUserStats();
      setStats(statsData);
    } catch (error) {
      console.error("❌ fetchStats ~ error:", error);
    }
  };

  // ========== CRUD OPERATIONS ==========

  const handleCreate = async (values: CreateUserReq) => {
    try {
      setLoading(true);
      await createUser(values);

      toast.success(t("sys.user-management.create-success"), {
        closeButton: true,
      });
      await Promise.all([fetchUsers(), fetchStats()]);
      return true;
    } catch (error) {
      console.error("❌ createUser ~ error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (_values: UpdateUserReq) => {
    try {
      setLoading(true);
      await Promise.all([fetchUsers(), fetchStats()]);
    } catch (error) {
      console.error("❌ updateUser ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id: string, values: UpdateUserReq) => {
    try {
      setLoading(true);
      await updateUser(id, values);

      toast.success(t("sys.user-management.update-success"), {
        closeButton: true,
      });
      await fetchUsers();
      return true;
    } catch (error) {
      console.error("❌ updateUser ~ error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Soft delete for active users
  const handleSoftDelete = async (ids: string | string[]) => {
    if (!ids || (Array.isArray(ids) && ids.length === 0)) return;

    try {
      setLoading(true);
      await softDeleteUser(ids);

      toast.success(t("sys.user-management.delete-success"), {
        closeButton: true,
      });
      await Promise.all([fetchUsers(), fetchStats()]);
    } catch (error) {
      console.error("❌ softDeleteUser ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Permanent delete for deleted users
  const handleDelete = async (ids: string | string[]) => {
    if (!ids || (Array.isArray(ids) && ids.length === 0)) return;

    try {
      setLoading(true);
      await deleteUser(ids);

      toast.success(t("sys.user-management.permanent-delete-success"), {
        closeButton: true,
      });
      await Promise.all([fetchUsers(), fetchStats()]);
    } catch (error) {
      console.error("❌ deleteUser ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateRole = async (id: string, role: string) => {
    try {
      await updateUserRole(id, role);
      toast.success(t("sys.user-management.update-role-success"), {
        closeButton: true,
      });
      await fetchUsers();
    } catch (error) {
      console.error("❌ updateUserRole ~ error:", error);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      await updateUserStatus(id, status);
      toast.success(t("sys.user-management.update-status-success"), {
        closeButton: true,
      });
      await Promise.all([fetchUsers(), fetchStats()]);
    } catch (error) {
      console.error("❌ updateUserStatus ~ error:", error);
    }
  };

  const handleDeleteMany = async (ids: string | string[]) => {
    if (!ids || (Array.isArray(ids) && ids.length === 0)) return;

    try {
      if (isDeleted) {
        // Permanent delete for already soft-deleted users
        await deleteUser(ids);
        toast.success(
          t("sys.user-management.bulk-permanent-delete-success", {
            count: selectedUsers.length,
          }),
          {
            closeButton: true,
          }
        );
      } else {
        // Soft delete for active users
        await softDeleteUser(ids);
        toast.success(
          t("sys.user-management.bulk-delete-success", {
            count: selectedUsers.length,
          }),
          {
            closeButton: true,
          }
        );
      }
      setSelectedUsers([]);
      await Promise.all([fetchUsers(), fetchStats()]);
    } catch (error) {
      console.error("❌ deleteUser ~ error:", error);
    }
  };

  const handleRestore = async (ids: string | string[]) => {
    if (!ids || (Array.isArray(ids) && ids.length === 0)) return;

    try {
      setLoading(true);
      await restoreUser(ids);

      const count = Array.isArray(ids) ? ids.length : 1;
      toast.success(
        t("sys.user-management.restore-success", {
          count,
        }),
        {
          closeButton: true,
        }
      );
      setSelectedUsers([]);
      await Promise.all([fetchUsers(), fetchStats()]);
    } catch (error) {
      console.error("❌ restoreUser ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestoreMany = async (ids: string[]) => {
    await handleRestore(ids);
  };

  // ========== UI HANDLERS ==========

  const handleFilterChange = (key: keyof QueryUserParams, value: any) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    updateUrlParams(newFilters);
    fetchUsers(newFilters);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    const newFilters = { ...filters, page, limit: pageSize || filters.limit };
    setFilters(newFilters);
    updateUrlParams(newFilters);
    fetchUsers(newFilters);
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(users.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleClearFilters = () => {
    const defaultFilters: QueryUserParams = {
      page: 1,
      limit: 10,
      search: "",
      role: "",
      status: "",
      sortBy: "createdAt",
      sortOrder: "desc",
      isDeleted,
    };
    setFilters(defaultFilters);
    updateUrlParams(defaultFilters);
    fetchUsers(defaultFilters);
  };

  const refreshData = () => {
    Promise.all([fetchUsers(), fetchStats()]);
  };

  // ========== EFFECTS ==========

  useEffect(() => {
    const initialFetch = async () => {
      await Promise.all([fetchUsers(filters), fetchStats()]);
    };
    initialFetch();
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    const newFilters = getInitialFilters();
    setFilters(newFilters);
    fetchUsers(newFilters);
  }, [searchParams]);

  return {
    // State
    users,
    loading,
    selectedUsers,
    filters,
    pagination,
    stats,
    isDeleted,

    // Actions
    handleCreate,
    handleUpdate,
    handleUpdateUser,
    handleSoftDelete,
    handleDelete,
    handleUpdateRole,
    handleUpdateStatus,
    handleDeleteMany,
    handleRestore,
    handleRestoreMany,
    handleFilterChange,
    handlePageChange,
    handleSelectUser,
    handleSelectAll,
    handleClearFilters,
    refreshData,
  };
}
