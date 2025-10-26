import { Button, Input, Select } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  MaintenanceFilter,
  MaintenanceStatus,
  MaintenanceType,
} from "@/api/services/maintenanceApi";

interface CommonMaintenanceFiltersProps {
  filters: MaintenanceFilter;
  onFilterChange: (key: keyof MaintenanceFilter, value: any) => void;
  onClearFilters: () => void;
}

export default function CommonMaintenanceFilters({
  filters,
  onFilterChange,
  onClearFilters,
}: CommonMaintenanceFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-card p-4 rounded-lg border">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.maintenance.search")}
          </label>
          <Input
            size="large"
            placeholder={t("sys.maintenance.search-placeholder")}
            value={filters.title}
            onChange={(e) => onFilterChange("title", e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>

        {/* Type Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.maintenance.type")}
          </label>
          <Select
            size="large"
            placeholder={t("sys.maintenance.all-types")}
            value={filters.type || undefined}
            onChange={(value) => onFilterChange("type", value)}
            allowClear
            className="w-full"
          >
            <Select.Option value={MaintenanceType.DATABASE}>
              {t("sys.maintenance.type-database")}
            </Select.Option>
            <Select.Option value={MaintenanceType.SYSTEM}>
              {t("sys.maintenance.type-system")}
            </Select.Option>
            <Select.Option value={MaintenanceType.NETWORK}>
              {t("sys.maintenance.type-network")}
            </Select.Option>
            <Select.Option value={MaintenanceType.OTHER}>
              {t("sys.maintenance.type-other")}
            </Select.Option>
          </Select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.maintenance.status")}
          </label>
          <Select
            size="large"
            placeholder={t("sys.maintenance.all-status")}
            value={filters.status || undefined}
            onChange={(value) => onFilterChange("status", value)}
            allowClear
            className="w-full"
          >
            <Select.Option value={MaintenanceStatus.SCHEDULED}>
              {t("sys.maintenance.status-scheduled")}
            </Select.Option>
            <Select.Option value={MaintenanceStatus.IN_PROGRESS}>
              {t("sys.maintenance.status-in-progress")}
            </Select.Option>
            <Select.Option value={MaintenanceStatus.COMPLETED}>
              {t("sys.maintenance.status-completed")}
            </Select.Option>
            <Select.Option value={MaintenanceStatus.CANCELLED}>
              {t("sys.maintenance.status-cancelled")}
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
            {t("sys.maintenance.clear-filters")}
          </Button>
        </div>
      </div>
    </div>
  );
}
