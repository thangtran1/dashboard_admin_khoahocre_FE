import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "react-router";
import { feedbackService, Feedback } from "../api/services/feedback";

export interface FeedbackPagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface FeedbackSearchOptions {
  search?: string;
  startDate?: string;
  endDate?: string;
}

export const useAdminFeedbacks = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<FeedbackPagination>({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Get initial values from URL params
  const getInitialSearchOptions = (): FeedbackSearchOptions => ({
    search: searchParams.get("search") || undefined,
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

  const [, setPage] = useState<number>(getInitialPage());
  const [limit, setLimit] = useState<number>(getInitialLimit());
  const [searchOptions, setSearchOptions] = useState<FeedbackSearchOptions>(
    getInitialSearchOptions()
  );

  // Update URL params
  const updateUrlParams = useCallback(
    (newPage: number, newOptions: FeedbackSearchOptions, newLimit?: number) => {
      const params = new URLSearchParams();

      params.set("page", newPage.toString());

      if (newLimit && newLimit !== 10) {
        params.set("limit", newLimit.toString());
      }

      if (newOptions.search) params.set("search", newOptions.search);
      if (newOptions.startDate) params.set("startDate", newOptions.startDate);
      if (newOptions.endDate) params.set("endDate", newOptions.endDate);

      setSearchParams(params);
    },
    [setSearchParams]
  );

  const loadFeedbacks = useCallback(
    async (
      pageNum: number = 1,
      limitNum: number = limit,
      options?: FeedbackSearchOptions
    ) => {
      setLoading(true);
      setError(null);

      try {
        const searchParams = options || searchOptions;
        const response = await feedbackService.getAll(pageNum, limitNum, {
          search: searchParams.search,
          startDate: searchParams.startDate,
          endDate: searchParams.endDate,
        });

        setFeedbacks(response.data);
        setPage(pageNum);
        setLimit(limitNum);
        setPagination({
          page: response.meta.page,
          limit: response.meta.limit,
          total: response.meta.total,
          totalPages: response.meta.totalPages,
        });

        const finalOptions = options || searchOptions;
        if (options) {
          setSearchOptions(options);
        }
        updateUrlParams(pageNum, finalOptions, limitNum);
      } catch (err: any) {
        setError(err.message || "Không thể tải danh sách feedback");
        console.error("Error loading feedbacks:", err);
      } finally {
        setLoading(false);
      }
    },
    [limit, searchOptions, updateUrlParams]
  );

  const deleteFeedback = useCallback(async (id: string): Promise<void> => {
    try {
      await feedbackService.delete(id);
      setFeedbacks((prev) => prev.filter((f) => f._id !== id));
      setPagination((prev) => ({
        ...prev,
        total: Math.max(0, prev.total - 1),
      }));
    } catch (err: any) {
      setError(err.message || "Không thể xóa feedback");
      throw err;
    }
  }, []);

  const getFeedback = useCallback(async (id: string): Promise<Feedback> => {
    try {
      return await feedbackService.getById(id);
    } catch (err: any) {
      setError(err.message || "Không thể lấy thông tin feedback");
      throw err;
    }
  }, []);

  const handleFilterChange = useCallback(
    (filterOptions: FeedbackSearchOptions) => {
      const newOptions = { ...filterOptions };
      setSearchOptions(newOptions);
      loadFeedbacks(1, limit, newOptions);
    },
    [loadFeedbacks, limit]
  );

  const clearFilters = useCallback(() => {
    const emptyOptions: FeedbackSearchOptions = {};
    setSearchOptions(emptyOptions);
    setPage(1);
    setLimit(10);
    setSearchParams(new URLSearchParams());
    loadFeedbacks(1, 10, emptyOptions);
  }, [loadFeedbacks, setSearchParams]);

  const onPageChange = useCallback(
    (newPage: number, newPageSize?: number) => {
      const newLimit = newPageSize || limit;
      loadFeedbacks(newPage, newLimit, searchOptions);
    },
    [loadFeedbacks, limit, searchOptions]
  );

  // Load data on mount
  useEffect(() => {
    const initialOptions = getInitialSearchOptions();
    const initialPage = getInitialPage();
    const initialLimit = getInitialLimit();

    setSearchOptions(initialOptions);
    setPage(initialPage);
    setLimit(initialLimit);

    loadFeedbacks(initialPage, initialLimit, initialOptions);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    feedbacks,
    loading,
    error,
    pagination,
    searchOptions,
    loadFeedbacks,
    deleteFeedback,
    getFeedback,
    handleFilterChange,
    clearFilters,
    onPageChange,
    refresh: () => loadFeedbacks(pagination.page, pagination.limit, searchOptions),
  };
};
