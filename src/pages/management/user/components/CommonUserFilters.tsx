import { Button, Input, Select } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { QueryUserParams } from "@/api/services/userManagementApi";

interface CommonUserFiltersProps {
  filters: QueryUserParams;
  onFilterChange: (key: keyof QueryUserParams, value: any) => void;
  onClearFilters: () => void;
}

export default function CommonUserFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: CommonUserFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-card p-4 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.user-management.search")}
          </label>
          <Input
            size="large"
            placeholder={t("sys.user-management.search-placeholder")}
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.user-management.role")}
          </label>
          <Select
            size="large"
            placeholder={t("sys.user-management.all-roles")}
            value={filters.role || undefined}
            onChange={(value) => onFilterChange("role", value)}
            allowClear
            className="w-full"
          >
            <Select.Option value="admin">
              {t("sys.user-management.admin")}
            </Select.Option>
            <Select.Option value="moderator">
              {t("sys.user-management.moderator")}
            </Select.Option>
            <Select.Option value="user">
              {t("sys.user-management.user")}
            </Select.Option>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.user-management.status")}
          </label>
          <Select
            size="large"
            placeholder={t("sys.user-management.all-status")}
            value={filters.status || undefined}
            onChange={(value) => onFilterChange("status", value)}
            allowClear
            className="w-full"
          >
            <Select.Option value="active">
              {t("sys.user-management.active")}
            </Select.Option>
            <Select.Option value="inactive">
              {t("sys.user-management.inactive")}
            </Select.Option>
            <Select.Option value="banned">
              {t("sys.user-management.banned")}
            </Select.Option>
          </Select>
        </div>

        {/* Actions */}
        <div>
          {/* Clear Filters */}
          <Button
            size="large"
            danger
            icon={<ClearOutlined />}
            onClick={onClearFilters}
          >
            {t("sys.user-management.clear-filters")}
          </Button>
        </div>
      </div>
    </div>
  );
}
