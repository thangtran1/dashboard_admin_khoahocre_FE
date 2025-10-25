import { useState, useEffect } from "react";
import { useSearchParams } from "react-router";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import maintenanceApi, {
  Maintenance,
  MaintenanceFilter,
  MaintenanceStatus,
  CreateMaintenanceDto,
  UpdateMaintenanceDto,
} from "@/api/services/maintenanceApi";

interface MaintenanceStats {
  total: number;
  scheduled: number;
  inProgress: number;
  completed: number;
  cancelled: number;
  newThisMonth: number;
}

export function useMaintence(isScheduled: boolean = false) {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedMaintenances, setSelectedMaintenances] = useState<string[]>([]);

  // Get initial filters from URL params
  const getInitialFilters = (): MaintenanceFilter => ({
    page: parseInt(searchParams.get("page") || "1", 10),
    limit: parseInt(searchParams.get("limit") || "10", 10),
    title: searchParams.get("title") || undefined,
    type: searchParams.get("type") as any || undefined,
    status: isScheduled ? MaintenanceStatus.SCHEDULED : (searchParams.get("status") as any || undefined),
    from: searchParams.get("from") || undefined,
    to: searchParams.get("to") || undefined,
  });

  const [filters, setFilters] = useState<MaintenanceFilter>(getInitialFilters());

  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });

  // Stats
  const [stats, setStats] = useState<MaintenanceStats>({
    total: 0,
    scheduled: 0,
    inProgress: 0,
    completed: 0,
    cancelled: 0,
    newThisMonth: 0,
  });

  // Update URL params when filters change
  const updateUrlParams = (newFilters: MaintenanceFilter) => {
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

  const fetchMaintenances = async (queryParams?: MaintenanceFilter) => {
    try {
      setLoading(true);
      const params = { ...filters, ...queryParams };
      const response = await maintenanceApi.getList(params);
      if (response.data.success) {
        setMaintenances(response.data.data);
        const pageInfo = response.data.pagination;
        setPagination({
          page: pageInfo.page || 1,
          limit: pageInfo.limit,
          total: pageInfo.total,
          totalPages: pageInfo.totalPages,
        });
      }
    } catch (error) {
      console.error("❌ fetchMaintenances ~ error:", error);
      toast.error(t("sys.maintenance.fetch-error"));
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await maintenanceApi.getList({ limit: 1000 });
      if (response.data.success) {
        const all = response.data.data;
        const now = new Date();
        const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        
        setStats({
          total: all.length,
          scheduled: all.filter(m => m.status === MaintenanceStatus.SCHEDULED).length,
          inProgress: all.filter(m => m.status === MaintenanceStatus.IN_PROGRESS).length,
          completed: all.filter(m => m.status === MaintenanceStatus.COMPLETED).length,
          cancelled: all.filter(m => m.status === MaintenanceStatus.CANCELLED).length,
          newThisMonth: all.filter(m => new Date(m.createdAt) >= thisMonth).length,
        });
      }
    } catch (error) {
      console.error("❌ fetchStats ~ error:", error);
    }
  };

  // ========== CRUD OPERATIONS ==========

  const handleCreate = async (values: CreateMaintenanceDto) => {
    try {
      setLoading(true);
      await maintenanceApi.create(values);

      toast.success(t("sys.maintenance.create-success"), {
        closeButton: true,
      });
      await Promise.all([fetchMaintenances(), fetchStats()]);
      return true;
    } catch (error) {
      console.error("❌ createMaintenance ~ error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id: string, values: UpdateMaintenanceDto) => {
    try {
      setLoading(true);
      await maintenanceApi.update(id, values);

      toast.success(t("sys.maintenance.update-success"), {
        closeButton: true,
      });
      await Promise.all([fetchMaintenances(), fetchStats()]);
      return true;
    } catch (error) {
      console.error("❌ updateMaintenance ~ error:", error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (ids: string | string[]) => {
    if (!ids) return;

    try {
      setLoading(true);
      const response = await maintenanceApi.remove(ids);
      if (response.data.success) {
        toast.success(t("sys.maintenance.delete-success"), {
          closeButton: true,
        });
        setSelectedMaintenances([]);
        await Promise.all([fetchMaintenances(), fetchStats()]);
        return true;
      } else {
        toast.error(response.data.message);
        return false;
      }
    } catch (error) {
      console.error("❌ deleteMaintenance ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStartNow = async (id: string) => {
    try {
      setLoading(true);
      await maintenanceApi.startNow(id);
      
      toast.success(t("sys.maintenance.start-success"), {
        closeButton: true,
      });
      await Promise.all([fetchMaintenances(), fetchStats()]);
    } catch (error) {
      console.error("❌ startMaintenance ~ error:", error);
      toast.error(t("sys.maintenance.start-error"));
    } finally {
      setLoading(false);
    }
  };

  const handleStop = async (id: string) => {
    try {
      setLoading(true);
      await maintenanceApi.stop(id);
      
      toast.success(t("sys.maintenance.stop-success"), {
        closeButton: true,
      });
      await Promise.all([fetchMaintenances(), fetchStats()]);
    } catch (error) {
      console.error("❌ stopMaintenance ~ error:", error);
      toast.error(t("sys.maintenance.stop-error"));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (id: string) => {
    try {
      setLoading(true);
      await maintenanceApi.cancel(id);
      
      toast.success(t("sys.maintenance.cancel-success"), {
        closeButton: true,
      });
      await Promise.all([fetchMaintenances(), fetchStats()]);
    } catch (error) {
      console.error("❌ cancelMaintenance ~ error:", error);
      toast.error(t("sys.maintenance.cancel-error"));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteMany = async (ids: string[]) => {
    await handleDelete(ids);
  };

  // ========== UI HANDLERS ==========

  const handleFilterChange = (key: keyof MaintenanceFilter, value: any) => {
    const newFilters = { ...filters, [key]: value, page: 1 };
    setFilters(newFilters);
    updateUrlParams(newFilters);
    fetchMaintenances(newFilters);
  };

  const handlePageChange = (page: number, pageSize?: number) => {
    const newFilters = { ...filters, page, limit: pageSize || filters.limit };
    setFilters(newFilters);
    updateUrlParams(newFilters);
    fetchMaintenances(newFilters);
  };

  const handleSelectMaintenance = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedMaintenances([...selectedMaintenances, id]);
    } else {
      setSelectedMaintenances(selectedMaintenances.filter((mId) => mId !== id));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedMaintenances(maintenances.map((m) => m._id));
    } else {
      setSelectedMaintenances([]);
    }
  };

  const handleClearFilters = () => {
    const defaultFilters: MaintenanceFilter = {
      page: 1,
      limit: 10,
      title: undefined,
      type: undefined,
      status: isScheduled ? MaintenanceStatus.SCHEDULED : undefined,
      from: undefined,
      to: undefined,
    };
    setFilters(defaultFilters);
    updateUrlParams(defaultFilters);
    fetchMaintenances(defaultFilters);
  };

  const refreshData = () => {
    Promise.all([fetchMaintenances(), fetchStats()]);
  };

  // ========== EFFECTS ==========

  useEffect(() => {
    const initialFetch = async () => {
      await Promise.all([fetchMaintenances(filters), fetchStats()]);
    };
    initialFetch();
  }, []);

  // Update filters when URL params change
  useEffect(() => {
    const newFilters = getInitialFilters();
    setFilters(newFilters);
    fetchMaintenances(newFilters);
  }, [searchParams]);

  return {
    // State
    maintenances,
    loading,
    selectedMaintenances,
    filters,
    pagination,
    stats,

    // Actions
    handleCreate,
    handleUpdate,
    handleDelete,
    handleStartNow,
    handleStop,
    handleCancel,
    handleDeleteMany,
    handleFilterChange,
    handlePageChange,
    handleSelectMaintenance,
    handleSelectAll,
    handleClearFilters,
    refreshData,
  };
}
