import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";
import {
  notificationAdminService,
  CreateNotificationDto,
  Notification,
} from "../api/services/notificationApi";
import { useUserInfo } from "@/store/userStore";

export const useAdminNotifications = () => {
  const userInfo = useUserInfo();
  const [searchParams, setSearchParams] = useSearchParams();

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  // Get initial values from URL params
  const getInitialSearchOptions = (): {
    search?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  } => ({
    search: searchParams.get("search") || undefined,
    type: searchParams.get("type") || undefined,
    startDate: searchParams.get("startDate") || undefined,
    endDate: searchParams.get("endDate") || undefined,
  });

  const getInitialPage = () => {
    const pageParam = searchParams.get("page");
    return pageParam ? parseInt(pageParam, 10) : 1;
  };

  const getInitialLimit = () => {
    const limitParam = searchParams.get("limit");
    return limitParam ? parseInt(limitParam, 10) : 10;
  };

  const [page, setPage] = useState<number>(getInitialPage());
  const [limit, setLimit] = useState<number>(getInitialLimit());
  const [searchOptions, setSearchOptions] = useState<{
    search?: string;
    type?: string;
    startDate?: string;
    endDate?: string;
  }>(getInitialSearchOptions());

  const isAdmin = userInfo?.role === "admin";

  // Update URL params
  const updateUrlParams = useCallback(
    (newPage: number, newOptions: any, newLimit?: number) => {
      const params = new URLSearchParams();

      // Always set page, even if it's 1
      params.set("page", newPage.toString());

      // Set limit if different from default
      if (newLimit && newLimit !== 20) params.set("limit", newLimit.toString());

      // Set search options
      if (newOptions.search) params.set("search", newOptions.search);
      if (newOptions.type) params.set("type", newOptions.type);
      if (newOptions.startDate) params.set("startDate", newOptions.startDate);
      if (newOptions.endDate) params.set("endDate", newOptions.endDate);

      setSearchParams(params);
    },
    [setSearchParams]
  );

  const loadNotifications = useCallback(
    async (
      pageNum: number = 1,
      limitNum: number = limit,
      options?: {
        search?: string;
        type?: string;
        startDate?: string;
        endDate?: string;
      }
    ) => {
      if (!isAdmin) return;

      setLoading(true);
      setError(null);

      try {
        const searchParams = options || searchOptions;
        const response = await notificationAdminService.getAll(
          pageNum,
          limitNum,
          searchParams
        );
        setNotifications(response.data.notifications);
        setTotal(response.data.total);
        setPage(pageNum);

        // Update search options and URL
        const finalOptions = options || searchOptions;
        if (options) {
          setSearchOptions(options);
        }
        updateUrlParams(pageNum, finalOptions, limitNum);
      } catch (err: any) {
        setError(err.message || "Failed to load notifications");
        console.error("Error loading notifications:", err);
      } finally {
        setLoading(false);
      }
    },
    [isAdmin, limit, searchOptions, updateUrlParams]
  );

  const createNotification = useCallback(
    async (
      data: CreateNotificationDto
    ): Promise<{ success: boolean; message: string; data: Notification }> => {
      if (!isAdmin) throw new Error("Unauthorized");

      try {
        const notification = await notificationAdminService.create(data);

        setNotifications((prev) => [notification.data, ...prev]);
        setTotal((prev) => prev + 1);

        return notification;
      } catch (err: any) {
        setError(err.message || "Failed to create notification");
        throw err;
      }
    },
    [isAdmin]
  );

  const updateNotification = useCallback(
    async (
      id: string,
      data: Partial<CreateNotificationDto>
    ): Promise<Notification> => {
      if (!isAdmin) throw new Error("Unauthorized");

      try {
        const notification = await notificationAdminService.update(id, data);

        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? notification : n))
        );

        return notification;
      } catch (err: any) {
        setError(err.message || "Failed to update notification");
        throw err;
      }
    },
    [isAdmin]
  );

  const deleteNotification = useCallback(
    async (id: string): Promise<void> => {
      if (!isAdmin) throw new Error("Unauthorized");

      try {
        await notificationAdminService.delete(id);

        setNotifications((prev) => prev.filter((n) => n._id !== id));
        setTotal((prev) => Math.max(0, prev - 1));
      } catch (err: any) {
        setError(err.message || "Failed to delete notification");
        throw err;
      }
    },
    [isAdmin]
  );

  const getNotification = useCallback(
    async (id: string): Promise<Notification> => {
      if (!isAdmin) throw new Error("Unauthorized");

      try {
        return await notificationAdminService.getById(id);
      } catch (err: any) {
        setError(err.message || "Failed to get notification");
        throw err;
      }
    },
    [isAdmin]
  );

  // Search and filter functions
  const handleSearch = useCallback(
    (searchText: string) => {
      const newOptions = { ...searchOptions, search: searchText };
      // Keep current page when searching
      loadNotifications(page, limit, newOptions);
    },
    [loadNotifications, searchOptions, limit, page]
  );

  const handleFilterChange = useCallback(
    (filterOptions: {
      search?: string;
      type?: string;
      startDate?: string;
      endDate?: string;
    }) => {
      const newOptions = { ...searchOptions, ...filterOptions };
      // Keep current page when filtering
      loadNotifications(page, limit, newOptions);
    },
    [loadNotifications, searchOptions, limit, page]
  );

  const clearFilters = useCallback(() => {
    const emptyOptions = {};
    setSearchOptions(emptyOptions);
    setPage(1);
    setLimit(10);
    // Clear URL params
    setSearchParams(new URLSearchParams());
    loadNotifications(1, 20, emptyOptions);
  }, [loadNotifications, setSearchParams]);

  // Handle page size change
  const handlePageSizeChange = useCallback(
    (newPageSize: number) => {
      setLimit(newPageSize);
      // Keep current page when changing page size (if possible)
      loadNotifications(page, newPageSize, searchOptions);
    },
    [loadNotifications, searchOptions, page]
  );

  // Load data from URL params on mount
  useEffect(() => {
    if (isAdmin) {
      const initialOptions = getInitialSearchOptions();
      const initialPage = getInitialPage();
      const initialLimit = getInitialLimit();

      // Set initial states
      setSearchOptions(initialOptions);
      setPage(initialPage);
      setLimit(initialLimit);

      // Load data
      loadNotifications(initialPage, initialLimit, initialOptions);
    }
  }, [isAdmin]); // Only depend on isAdmin to avoid infinite loops

  return {
    notifications,
    loading,
    error,
    total,
    page,
    limit,
    isAdmin,
    searchOptions,
    loadNotifications,
    createNotification,
    updateNotification,
    deleteNotification,
    getNotification,
    handleSearch,
    handleFilterChange,
    handlePageSizeChange,
    clearFilters,
    refresh: () => loadNotifications(page, limit, searchOptions),
    nextPage: () => loadNotifications(page + 1, limit, searchOptions),
    prevPage: () => loadNotifications(page - 1, limit, searchOptions),
  };
};
