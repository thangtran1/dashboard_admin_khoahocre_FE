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
            {t("management.user.search")}
          </label>
          <Input
            size="large"
            placeholder={t("management.user.search-placeholder")}
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("management.user.role")}
          </label>
          <Select
            size="large"
            placeholder={t("management.user.all-roles")}
            value={filters.role || undefined}
            onChange={(value) => onFilterChange("role", value)}
            allowClear
            className="w-full"
          >
            <Option value="admin">{t("management.user.admin")}</Option>
            <Option value="moderator">{t("management.user.moderator")}</Option>
            <Option value="user">{t("management.user.user")}</Option>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("management.user.status")}
          </label>
          <Select
            size="large"
            placeholder={t("management.user.all-status")}
            value={filters.status || undefined}
            onChange={(value) => onFilterChange("status", value)}
            allowClear
            className="w-full"
          >
            <Option value="active">{t("management.user.active")}</Option>
            <Option value="inactive">{t("management.user.inactive")}</Option>
          </Select>
        </div>

        {/* Actions */}
        <div>
          {/* Clear Filters */}
          <Button size="large" danger onClick={onClearFilters}>
            {t("management.user.clear-filters")}
          </Button>
        </div>
      </div>
      <Separator className="mt-8" />
    </div>
  );
}
