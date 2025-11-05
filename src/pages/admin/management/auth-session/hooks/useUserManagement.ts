import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  User,
  QueryUserParams,
  getUsers,
} from "@/api/services/userManagementApi";

export function useUserManagement() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const getInitialFilters = (): QueryUserParams => ({
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "10", 10),
    search: searchParams.get("search") || "",
    role: searchParams.get("role") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "asc" | "desc") || "desc",
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

  const handleClearFilters = () => {
    const defaultFilters: QueryUserParams = {
      page: 1,
      limit: 10,
      search: "",
      role: "",
      status: "",
      sortBy: "createdAt",
      sortOrder: "desc",
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
    filters,
    pagination,
    handleFilterChange,
    handlePageChange,
    handleClearFilters,
  };
}
