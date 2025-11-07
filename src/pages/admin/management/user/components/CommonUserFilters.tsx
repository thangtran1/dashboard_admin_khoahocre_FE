import { Button, Input, Select } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { QueryUserParams } from "@/api/services/userManagementApi";
import { Separator } from "@/ui/separator";

const { Option } = Select;
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
    <div className="py-2 !mb-4">
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
            <Option value="admin">{t("sys.user-management.admin")}</Option>
            <Option value="moderator">
              {t("sys.user-management.moderator")}
            </Option>
            <Option value="user">{t("sys.user-management.user")}</Option>
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
            <Option value="active">{t("sys.user-management.active")}</Option>
            <Option value="inactive">
              {t("sys.user-management.inactive")}
            </Option>
          </Select>
        </div>

        {/* Actions */}
        <div>
          {/* Clear Filters */}
          <Button size="large" danger onClick={onClearFilters}>
            {t("sys.user-management.clear-filters")}
          </Button>
        </div>
      </div>
      <Separator className="mt-8" />
    </div>
  );
}
