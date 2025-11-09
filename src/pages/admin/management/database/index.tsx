import { useEffect, useState } from "react";
import { Button, Spin, DatePicker, Input } from "antd";
import {
  ClearOutlined,
  DatabaseOutlined,
  DeleteOutlined,
  FileAddOutlined,
  ReloadOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { useSearchParams } from "react-router";
import { databaseAdmin } from "@/api/services/databaseApi";
import DatabaseInfoCard from "./components/inforCard";
import BackupList from "./components/backup-list";
import RestoreModal from "./components/restore-modal";
import { toast } from "sonner";
import { Separator } from "@/ui/separator";
import { useTranslation } from "react-i18next";
import CustomConfirmModal from "@/components/common/modals/custom-modal-confirm";

const { RangePicker } = DatePicker;
const { Search } = Input;

export default function DatabaseManagement() {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const [dbInfo, setDbInfo] = useState<any>(null);
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  // ================= Filters + Pagination =================
  const [filters, setFilters] = useState({
    search: searchParams.get("search") || "",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  });
  const [appliedFilters, setAppliedFilters] = useState(filters);

  const [page, setPage] = useState(Number(searchParams.get("page")) || 1);
  const [pageSize, setPageSize] = useState(
    Number(searchParams.get("pageSize")) || 10
  );
  const [total, setTotal] = useState(0);

  // ================= Fetch DB Info =================
  const fetchDbInfo = async () => {
    const infoRes = await databaseAdmin.getDatabaseInfo();
    if (infoRes.success) setDbInfo(infoRes.data);
  };

  // ================= Fetch Backups =================
  const fetchBackups = async (queryParams?: any) => {
    setLoading(true);
    try {
      const params: any = {
        page,
        pageSize,
        ...appliedFilters,
        ...queryParams,
      };

      const backupRes = await databaseAdmin.listBackups(params);
      if (backupRes.success) {
        setBackups(backupRes.data);
        setTotal(backupRes.total);
        setPage(backupRes.page);
        setPageSize(backupRes.pageSize);
      }
    } finally {
      setLoading(false);
    }
  };

  // ================= Sync URL =================
  useEffect(() => {
    const params: any = {};
    if (appliedFilters.search) params.search = appliedFilters.search;
    if (appliedFilters.startDate) params.startDate = appliedFilters.startDate;
    if (appliedFilters.endDate) params.endDate = appliedFilters.endDate;
    if (page !== 1) params.page = page;
    if (pageSize !== 5) params.pageSize = pageSize;

    setSearchParams(params, { replace: true });
  }, [appliedFilters, page, pageSize]);

  useEffect(() => {
    fetchDbInfo();
    fetchBackups();
  }, []);

  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1);
  };

  const handleSearch = () => {
    setAppliedFilters(filters);
    setPage(1);
    fetchBackups({ page: 1 });
  };

  const handleClearFilters = () => {
    const cleared = { search: "", startDate: "", endDate: "" };
    setFilters(cleared);
    setAppliedFilters(cleared);
    setPage(1);
    fetchBackups({ page: 1 });
  };

  const handleBackup = async () => {
    setLoading(true);
    try {
      const res = await databaseAdmin.backupDatabase();
      if (res.success) {
        toast.success(t("management.database.create-backup-success"));
        fetchBackups();
      } else {
        toast.error(
          res.message || t("management.database.create-backup-error")
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async (file: File) => {
    setLoading(true);
    try {
      const res = await databaseAdmin.restoreDatabase(file);
      if (res.success) {
        toast.success(res.message);
        setRestoreModalVisible(false);
        fetchBackups();
        return { success: true, message: res.message };
      } else {
        toast.error(res.message || t("management.database.restore-error"));
        return {
          success: false,
          message: res.message || t("management.database.restore-error"),
        };
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await databaseAdmin.deleteDatabase();
      if (res.success) {
        toast.success(res.message);
        setDeleteModalVisible(false);
        fetchBackups();
      } else {
        toast.error(res.message || t("management.database.delete-error"));
      }
    } catch (error) {
      console.error("❌ handleDelete ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card text-card-foreground px-6 flex flex-col gap-6 rounded-xl border shadow-sm">
      {/* Header */}
      <div className="pt-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
            <DatabaseOutlined className="text-blue-600" />
            {t("management.database.title")}
          </h1>
          <p className="text-gray-500 mt-1">
            {t("management.database.description")}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 mt-4 md:mt-0">
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchBackups()}
            size="large"
          >
            {t("management.database.refresh")}
          </Button>
          <Button
            icon={<FileAddOutlined />}
            onClick={handleBackup}
            size="large"
          >
            {t("management.database.create-backup")}
          </Button>
          <Button
            icon={<FileAddOutlined />}
            onClick={() => setRestoreModalVisible(true)}
            size="large"
          >
            {t("management.database.restore-backup")}
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => setDeleteModalVisible(true)}
            size="large"
            danger
          >
            {t("management.database.delete-all-data")}
          </Button>
        </div>
      </div>

      <Separator />

      {/* Content */}
      {loading ? (
        <div className="text-center py-6">
          <Spin size="large" />
        </div>
      ) : (
        <>
          <DatabaseInfoCard dbInfo={dbInfo} />

          <div className="flex flex-col lg:flex-row gap-3 items-end">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2">
                {t("management.database.search-by-name")}
              </label>
              <Search
                placeholder={t("management.database.by-name")}
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                size="large"
                prefix={<SearchOutlined />}
                allowClear
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("management.database.date-range")}
              </label>
              <RangePicker
                size="large"
                value={
                  filters.startDate && filters.endDate
                    ? [dayjs(filters.startDate), dayjs(filters.endDate)]
                    : null
                }
                onChange={(dates) => {
                  handleFilterChange(
                    "startDate",
                    dates?.[0]?.format("YYYY-MM-DD") || ""
                  );
                  handleFilterChange(
                    "endDate",
                    dates?.[1]?.format("YYYY-MM-DD") || ""
                  );
                }}
                className="w-full"
              />
            </div>

            <div className="flex gap-2">
              <Button
                danger
                icon={<ClearOutlined />}
                onClick={handleClearFilters}
                size="large"
                className="h-[40px]"
              >
                {t("management.database.clear-filters")}
              </Button>
              <Button
                color="primary"
                variant="outlined"
                icon={<SearchOutlined />}
                onClick={handleSearch}
                size="large"
                className="h-[40px]"
              >
                {t("management.database.search")}
              </Button>
            </div>
          </div>

          <BackupList
            backups={backups}
            reload={fetchBackups}
            loading={loading}
            pagination={{
              page,
              limit: pageSize,
              total,
              totalPages: Math.ceil(total / pageSize),
            }}
            onPageChange={(page, pageSize) => {
              setPage(page);
              setPageSize(pageSize || 10);
              fetchBackups({ page, pageSize });
            }}
          />
        </>
      )}

      {/* Delete Modal */}
      <CustomConfirmModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={handleDelete}
        title={t("management.database.confirm-delete-all-data")}
        description={t(
          "management.database.confirm-delete-all-data-description"
        )}
      />

      {/* Restore Modal */}
      <RestoreModal
        visible={restoreModalVisible}
        onCancel={() => setRestoreModalVisible(false)}
        onRestore={handleRestore}
      />
    </div>
  );
}
