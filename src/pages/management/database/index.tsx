import { useEffect, useState } from "react";
import {
  Button,
  Spin,
  Typography,
  Modal,
  DatePicker,
  Input,
  Pagination,
  message,
} from "antd";
import {
  DatabaseOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
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

const { Text } = Typography;
const { RangePicker } = DatePicker;
const { Search } = Input;

export default function DatabaseManagement() {
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
    Number(searchParams.get("pageSize")) || 5
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

  // ================= Component mount =================
  useEffect(() => {
    fetchDbInfo(); // chỉ gọi 1 lần khi mount
    fetchBackups(); // fetch lần đầu theo appliedFilters
  }, []);

  // ================= Handlers =================
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setPage(1); // reset page khi filter thay đổi
  };

  const handleSearch = () => {
    setAppliedFilters(filters); // chỉ áp dụng khi nhấn tìm kiếm
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
        toast.success("Tạo bản sao lưu thành công!");
        fetchBackups();
      } else toast.error(res.message || "Tạo bản sao lưu thất bại!");
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
        toast.error(res.message || "Khôi phục thất bại!");
        return { success: false, message: res.message || "Thất bại" };
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
      } else message.error("Xóa thất bại!");
    } catch {
      message.error("Xóa thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // ================= Render =================
  return (
    <div className="bg-card text-card-foreground px-6 flex flex-col gap-6 rounded-xl border shadow-sm">
      {/* Header */}
      <div className="pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-blue-700 flex items-center gap-2">
            <DatabaseOutlined className="text-blue-600" />
            Quản lý cơ sở dữ liệu
          </h1>
          <p className="text-gray-500 mt-1">
            Quản lý thông tin cơ sở dữ liệu, tạo, khôi phục và xóa bản sao lưu.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button
            icon={<ReloadOutlined />}
            onClick={() => fetchBackups()}
            size="large"
          >
            Làm mới
          </Button>
          <Button
            icon={<FileAddOutlined />}
            onClick={handleBackup}
            size="large"
          >
            Tạo bản sao lưu
          </Button>
          <Button
            icon={<FileAddOutlined />}
            onClick={() => setRestoreModalVisible(true)}
            size="large"
          >
            Khôi phục dữ liệu
          </Button>
          <Button
            icon={<DeleteOutlined />}
            onClick={() => setDeleteModalVisible(true)}
            size="large"
            danger
          >
            Xóa toàn bộ dữ liệu
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
          <Separator className="my-6" />
          {/* Filters */}
          <div className="flex flex-col lg:flex-row gap-3 items-center">
            <div className="flex-1">
              <Search
                placeholder="Tìm theo tên file"
                value={filters.search}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                size="large"
                prefix={<SearchOutlined />}
                allowClear
              />
            </div>
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
            />
            <Button
              color="primary"
              variant="outlined"
              onClick={handleSearch}
              size="large"
            >
              Tìm kiếm
            </Button>
            <Button danger onClick={handleClearFilters} size="large">
              Xóa filter
            </Button>
          </div>
          <BackupList backups={backups} reload={fetchBackups} />
          <div className="flex justify-end mt-4">
            <Pagination
              current={page}
              pageSize={pageSize}
              total={total}
              showSizeChanger
              pageSizeOptions={["5", "10", "20", "50"]}
              onChange={(p, ps) => {
                setPage(p);
                setPageSize(ps);
                fetchBackups({ page: p, pageSize: ps });
              }}
            />
          </div>
        </>
      )}

      {/* Delete Modal */}
      <Modal
        open={deleteModalVisible}
        onOk={handleDelete}
        onCancel={() => setDeleteModalVisible(false)}
        okText="Xóa"
        okType="danger"
        cancelText="Hủy"
        centered
        confirmLoading={loading}
        className="rounded-xl"
      >
        <div className="flex flex-col items-center justify-center text-center space-y-4">
          <ExclamationCircleOutlined className="text-red-500 text-5xl mb-2" />
          <Text className="text-lg font-semibold text-gray-800">
            Xác nhận xóa toàn bộ dữ liệu?
          </Text>
          <Text type="secondary">
            Hành động này sẽ{" "}
            <span className="text-red-500 font-medium">xóa vĩnh viễn</span> tất
            cả dữ liệu.
          </Text>
        </div>
      </Modal>

      {/* Restore Modal */}
      <RestoreModal
        visible={restoreModalVisible}
        onCancel={() => setRestoreModalVisible(false)}
        onRestore={handleRestore}
      />
    </div>
  );
}
