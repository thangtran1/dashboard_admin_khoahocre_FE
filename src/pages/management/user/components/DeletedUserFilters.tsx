import { Input, Select, Button, Space, Popconfirm, Divider } from "antd";
import { QueryUserParams } from "@/api/services/userManagementApi";
import {
  SearchOutlined,
  FilterOutlined,
  UndoOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Search } = Input;
const { Option } = Select;

interface DeletedUserFiltersProps {
  filters: QueryUserParams;
  selectedUsers: string[];
  onFilterChange: (key: keyof QueryUserParams, value: string) => void;
  onClearFilters: () => void;
  onRestoreMany: (ids: string[]) => void;
  onDeleteMany: (ids: string[]) => void;
}

export default function DeletedUserFilters({
  filters,
  selectedUsers,
  onFilterChange,
  onClearFilters,
  onRestoreMany,
  onDeleteMany,
}: DeletedUserFiltersProps) {
  const { t } = useTranslation();

  return (
    <>
      {/* Main Filters */}
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="flex-1">
          <Search
            placeholder={t("sys.user-management.search-placeholder")}
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            size="large"
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>
        <Select
          value={filters.role}
          onChange={(value) => onFilterChange("role", value)}
          size="large"
          style={{ width: 150 }}
          placeholder={t("sys.user-management.filter-by-role")}
          allowClear
        >
          <Option value="">{t("sys.user-management.all-roles")}</Option>
          <Option value="admin">{t("sys.user-management.role-admin")}</Option>
          <Option value="moderator">
            {t("sys.user-management.role-moderator")}
          </Option>
          <Option value="user">{t("sys.user-management.role-user")}</Option>
        </Select>
        <Select
          value={filters.status}
          onChange={(value) => onFilterChange("status", value)}
          size="large"
          style={{ width: 150 }}
          placeholder={t("sys.user-management.filter-by-status")}
          allowClear
        >
          <Option value="">{t("sys.user-management.all-statuses")}</Option>
          <Option value="active">
            {t("sys.user-management.status-active")}
          </Option>
          <Option value="inactive">
            {t("sys.user-management.status-inactive")}
          </Option>
          <Option value="banned">
            {t("sys.user-management.status-banned")}
          </Option>
        </Select>
        <Button icon={<FilterOutlined />} size="large" onClick={onClearFilters}>
          {t("sys.user-management.cancel")}
        </Button>
      </div>

      {/* Bulk Actions for Deleted Users */}
      {selectedUsers.length > 0 && (
        <>
          <Divider />
          <div className="flex items-center justify-between bg-orange-50 p-3 rounded-lg border border-orange-200">
            <span className="text-sm font-medium text-orange-800">
              {t("sys.user-management.selected-deleted-count", {
                count: selectedUsers.length,
              })}
            </span>
            <Space>
              <Popconfirm
                title={t("sys.user-management.confirm-bulk-restore")}
                description={t(
                  "sys.user-management.confirm-bulk-restore-description",
                  { count: selectedUsers.length }
                )}
                onConfirm={() => onRestoreMany(selectedUsers as string[])}
                okText={t("sys.user-management.restore")}
                cancelText={t("sys.user-management.cancel")}
              >
                <Button
                  size="middle"
                  icon={<UndoOutlined />}
                  className="text-green-600 border-green-300 bg-green-50 hover:bg-green-100"
                >
                  {t("sys.user-management.restore-selected")} (
                  {selectedUsers.length})
                </Button>
              </Popconfirm>
              <Popconfirm
                title={t("sys.user-management.confirm-bulk-permanent-delete")}
                description={t(
                  "sys.user-management.confirm-bulk-permanent-delete-description",
                  { count: selectedUsers.length }
                )}
                onConfirm={() => onDeleteMany(selectedUsers as string[])}
                okText={t("sys.user-management.delete")}
                cancelText={t("sys.user-management.cancel")}
                okButtonProps={{ danger: true }}
              >
                <Button
                  size="middle"
                  danger
                  icon={<DeleteOutlined />}
                  className="text-destructive border-destructive bg-destructive/10"
                >
                  {t("sys.user-management.permanent-delete-selected")} (
                  {selectedUsers.length})
                </Button>
              </Popconfirm>
            </Space>
          </div>
        </>
      )}
    </>
  );
}
