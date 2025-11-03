import { useState, useEffect, useCallback, useRef } from "react";
import { toast } from "sonner";
import {
  BannerConfig,
  BannerSettings,
  CreateBannerRequest,
  UpdateBannerRequest,
  UpdateBannerSettingsRequest,
  getAllBanners,
  getActiveBanners,
  getBannerSettings,
  createBanner as createBannerApi,
  updateBanner as updateBannerApi,
  deleteBanner as deleteBannerApi,
  toggleBanner as toggleBannerApi,
  updateBannerOrder as updateBannerOrderApi,
  updateBannerSettings as updateBannerSettingsApi,
  resetBannerSettings as resetBannerSettingsApi,
  batchUpdateBanners,
  prefetchBannerData,
} from "@/api/services/bannerApi";

interface UseBannerReturn {
  // Banner data
  banners: BannerConfig[];
  activeBanners: BannerConfig[];
  loading: boolean;

  // Banner settings
  settings: BannerSettings | null;
  settingsLoading: boolean;

  // Pagination
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };

  // Banner methods
  fetchBanners: (page?: number, limit?: number) => Promise<void>;
  fetchActiveBanners: () => Promise<void>;
  createBanner: (banner: CreateBannerRequest) => Promise<boolean>;
  updateBanner: (banner: UpdateBannerRequest) => Promise<boolean>;
  deleteBanner: (id: string) => Promise<boolean>;
  toggleBanner: (id: string, isActive: boolean) => Promise<boolean>;
  updateBannerOrder: (id: string, order: number) => Promise<boolean>;

  // Settings methods
  fetchSettings: () => Promise<void>;
  updateSettings: (settings: UpdateBannerSettingsRequest) => Promise<boolean>;
  resetSettings: () => Promise<boolean>;

  // Batch operations
  batchUpdate: (
    updates: Array<{ id: string; data: Partial<UpdateBannerRequest> }>
  ) => Promise<boolean>;
}

export const useBanner = (): UseBannerReturn => {
  // Banner state
  const [banners, setBanners] = useState<BannerConfig[]>([]);
  const [activeBanners, setActiveBanners] = useState<BannerConfig[]>([]);
  const [loading, setLoading] = useState(false);

  // Settings state
  const [settings, setSettings] = useState<BannerSettings | null>(null);
  const [settingsLoading, setSettingsLoading] = useState(false);

  // Pagination state
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Debounce refs
  const fetchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const statsTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ========== OPTIMIZED FETCH METHODS ==========

  const fetchBanners = useCallback(async (page = 1, limit = 10) => {
    // Debounce để tránh gọi API liên tục
    if (fetchTimeoutRef.current) {
      clearTimeout(fetchTimeoutRef.current);
    }

    fetchTimeoutRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        const response = await getAllBanners(page, limit);

        setBanners(response.banners);
        setPagination(response.pagination);
      } catch (error) {
        console.error("❌ fetchBanners ~ error:", error);
      } finally {
        setLoading(false);
      }
    }, 100);
  }, []);

  const fetchActiveBanners = useCallback(async () => {
    try {
      const banners = await getActiveBanners();
      setActiveBanners(banners);
    } catch (error) {
      console.error("❌ fetchActiveBanners ~ error:", error);
    }
  }, []);

  const fetchSettings = useCallback(async () => {
    try {
      setSettingsLoading(true);
      const settingsData = await getBannerSettings();
      setSettings(settingsData);
    } catch (error) {
      console.error("❌ fetchSettings ~ error:", error);
      toast.error("Lỗi khi tải cài đặt banner");
    } finally {
      setSettingsLoading(false);
    }
  }, []);

  // ========== OPTIMIZED CRUD METHODS ==========

  const createBanner = useCallback(
    async (banner: CreateBannerRequest): Promise<boolean> => {
      try {
        setLoading(true);
        await createBannerApi(banner);

        // Batch refresh - chỉ refresh cần thiết
        await Promise.all([
          fetchBanners(pagination.page, pagination.limit),
          fetchActiveBanners(),
        ]);

        return true;
      } catch (error) {
        console.error("❌ createBanner ~ error:", error);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, pagination.limit, fetchBanners, fetchActiveBanners]
  );

  const updateBanner = useCallback(
    async (banner: UpdateBannerRequest): Promise<boolean> => {
      try {
        setLoading(true);
        await updateBannerApi(banner);

        // Optimistic update - cập nhật local state trước
        setBanners((prev) =>
          prev.map((b) => (b.id === banner.id ? { ...b, ...banner } : b))
        );

        // Batch refresh
        await Promise.all([fetchActiveBanners()]);

        return true;
      } catch (error) {
        console.error("❌ updateBanner ~ error:", error);
        await fetchBanners(pagination.page, pagination.limit);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, pagination.limit, fetchBanners, fetchActiveBanners]
  );

  const deleteBanner = useCallback(
    async (id: string): Promise<boolean> => {
      try {
        setLoading(true);

        // Optimistic update
        setBanners((prev) => prev.filter((b) => b.id !== id));

        await deleteBannerApi(id);

        // Batch refresh
        await Promise.all([fetchActiveBanners()]);

        return true;
      } catch (error) {
        console.error("❌ deleteBanner ~ error:", error);
        await fetchBanners(pagination.page, pagination.limit);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, pagination.limit, fetchBanners, fetchActiveBanners]
  );

  const toggleBanner = useCallback(
    async (id: string, isActive: boolean): Promise<boolean> => {
      try {
        // Optimistic update
        setBanners((prev) =>
          prev.map((b) => (b.id === id ? { ...b, isActive } : b))
        );

        await toggleBannerApi(id, isActive);

        // Batch refresh
        await Promise.all([fetchActiveBanners()]);

        return true;
      } catch (error) {
        console.error("❌ toggleBanner ~ error:", error);
        // Rollback
        await fetchBanners(pagination.page, pagination.limit);
        return false;
      }
    },
    [pagination.page, pagination.limit, fetchBanners, fetchActiveBanners]
  );

  const updateBannerOrder = useCallback(
    async (id: string, order: number): Promise<boolean> => {
      try {
        // Optimistic update
        setBanners((prev) =>
          prev.map((b) => (b.id === id ? { ...b, order } : b))
        );

        await updateBannerOrderApi(id, order);

        // Refresh active banners để cập nhật thứ tự
        await fetchActiveBanners();

        return true;
      } catch (error) {
        console.error("❌ updateBannerOrder ~ error:", error);
        await fetchBanners(pagination.page, pagination.limit);
        return false;
      }
    },
    [pagination.page, pagination.limit, fetchBanners, fetchActiveBanners]
  );

  // ========== SETTINGS METHODS ==========

  const updateSettings = useCallback(
    async (settingsData: UpdateBannerSettingsRequest): Promise<boolean> => {
      try {
        setSettingsLoading(true);
        const updatedSettings = await updateBannerSettingsApi(settingsData);
        setSettings(updatedSettings);

        // Refresh active banners để reflect settings mới
        await fetchActiveBanners();

        return true;
      } catch (error: any) {
        console.error("❌ updateSettings ~ error:", error);
        const errorMessage =
          error?.response?.data?.message || error?.message || "Có lỗi xảy ra";
        toast.error(`Lỗi khi cập nhật cài đặt: ${errorMessage}`);
        return false;
      } finally {
        setSettingsLoading(false);
      }
    },
    [fetchActiveBanners]
  );

  const resetSettings = useCallback(async (): Promise<boolean> => {
    try {
      setSettingsLoading(true);
      const defaultSettings = await resetBannerSettingsApi();
      setSettings(defaultSettings);

      await fetchActiveBanners();

      return true;
    } catch (error: any) {
      console.error("❌ resetSettings ~ error:", error);
      const errorMessage =
        error?.response?.data?.message || error?.message || "Có lỗi xảy ra";
      toast.error(`Lỗi khi đặt lại cài đặt: ${errorMessage}`);
      return false;
    } finally {
      setSettingsLoading(false);
    }
  }, [fetchActiveBanners]);

  // ========== BATCH OPERATIONS ==========

  const batchUpdate = useCallback(
    async (
      updates: Array<{ id: string; data: Partial<UpdateBannerRequest> }>
    ): Promise<boolean> => {
      try {
        setLoading(true);
        await batchUpdateBanners(updates);

        // Refresh all data
        await Promise.all([
          fetchBanners(pagination.page, pagination.limit),
          fetchActiveBanners(),
        ]);

        return true;
      } catch (error: any) {
        console.error("❌ batchUpdate ~ error:", error);
        toast.error("Lỗi khi cập nhật hàng loạt");
        return false;
      } finally {
        setLoading(false);
      }
    },
    [pagination.page, pagination.limit, fetchBanners, fetchActiveBanners]
  );

  // ========== INITIAL LOAD WITH PREFETCH ==========

  useEffect(() => {
    const initializeData = async () => {
      try {
        // Prefetch critical data
        await prefetchBannerData();

        // Load all data in parallel
        await Promise.all([
          fetchBanners(),
          fetchActiveBanners(),
          fetchSettings(),
        ]);
      } catch (error) {
        console.error("❌ initializeData ~ error:", error);
      }
    };

    initializeData();
  }, [fetchBanners, fetchActiveBanners, fetchSettings]);

  // Cleanup timeouts
  useEffect(() => {
    return () => {
      if (fetchTimeoutRef.current) {
        clearTimeout(fetchTimeoutRef.current);
      }
      if (statsTimeoutRef.current) {
        clearTimeout(statsTimeoutRef.current);
      }
    };
  }, []);

  return {
    // Banner data
    banners,
    activeBanners,
    loading,

    // Settings data
    settings,
    settingsLoading,

    // Pagination
    pagination,

    // Banner methods
    fetchBanners,
    fetchActiveBanners,
    createBanner,
    updateBanner,
    deleteBanner,
    toggleBanner,
    updateBannerOrder,

    // Settings methods
    fetchSettings,
    updateSettings,
    resetSettings,

    // Batch operations
    batchUpdate,
  };
};

// ========== LIGHTWEIGHT HOOK FOR USER BANNERS ==========

export const useActiveBanners = () => {
  const [banners, setBanners] = useState<BannerConfig[]>([]);
  const [settings, setSettings] = useState<BannerSettings | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);

      const [bannersData, settingsData] = await Promise.all([
        getActiveBanners(),
        getBannerSettings(),
      ]);

      setBanners(bannersData);
      setSettings(settingsData);
    } catch (error) {
      console.error("❌ useActiveBanners ~ error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();

    // Auto refresh mỗi 60 giây để đảm bảo data fresh
    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

  return {
    banners,
    settings,
    loading,
    refetch: fetchData,
  };
};
