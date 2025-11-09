import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import {
  User,
  CreateUserReq,
  UpdateUserReq,
  QueryUserParams,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  softDeleteUser,
  restoreUser,
} from "@/api/services/userManagementApi";

export function useUserManagement(
  isDeleted: boolean = false,
  isNewUsers: boolean = false
) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);

  const getInitialFilters = (): QueryUserParams => ({
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "10", 10),
    search: searchParams.get("search") || "",
    role: searchParams.get("role") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
    isDeleted,
    isNewUsers,
  });

  const [filters, setFilters] = useState<QueryUserParams>(getInitialFilters());

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

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

  const handleCreate = async (values: CreateUserReq) => {
    try {
      setLoading(true);
      await createUser(values);

      toast.success(t("management.user.create-success"));
      await fetchUsers();
      return true;
    } catch (error) {
      console.error("❌ createUser ~ error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUser = async (id: string, values: UpdateUserReq) => {
    try {
      setLoading(true);
      await updateUser(id, values);
      toast.success(t("management.user.update-success"));
      await fetchUsers();
      return true;
    } catch (error) {
      console.error("❌ updateUser ~ error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSoftDelete = async (ids: string | string[]) => {
    if (!ids || (Array.isArray(ids) && ids.length === 0)) return;

    try {
      setLoading(true);
      await softDeleteUser(ids);

      toast.success(t("management.user.delete-success"));
      await fetchUsers();
    } catch (error) {
      console.error("❌ softDeleteUser ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMany = async (ids: string | string[]) => {
    if (!ids || (Array.isArray(ids) && ids.length === 0)) return;

    try {
      if (isDeleted) {
        await deleteUser(ids);
        toast.success(
          t("management.user.bulk-permanent-delete-success", {
            count: selectedUsers.length,
          })
        );
      } else {
        await softDeleteUser(ids);
        toast.success(
          t("management.user.bulk-delete-success", {
            count: selectedUsers.length,
          })
        );
      }
      setSelectedUsers([]);
      await fetchUsers();
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
        t("management.user.restore-success", {
          count,
        })
      );
      setSelectedUsers([]);
      await fetchUsers();
    } catch (error) {
      console.error("❌ restoreUser ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

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
      isNewUsers,
    };
    setFilters(defaultFilters);
    updateUrlParams(defaultFilters);
    fetchUsers(defaultFilters);
  };

  useEffect(() => {
    const initialFetch = async () => {
      await fetchUsers(filters);
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
    users,
    loading,
    selectedUsers,
    filters,
    pagination,
    isDeleted,

    handleCreate,
    handleUpdateUser,
    handleSoftDelete,
    handleDeleteMany,
    handleRestore,
    handleFilterChange,
    handlePageChange,
    handleSelectUser,
    handleSelectAll,
    handleClearFilters,
  };
}
