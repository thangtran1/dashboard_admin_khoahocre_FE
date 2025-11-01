import { Button, Input, Select } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  MaintenanceFilter,
  MaintenanceStatus,
  MaintenanceType,
} from "@/api/services/maintenanceApi";

const { Option } = Select;
interface CommonMaintenanceFiltersProps {
  filters: MaintenanceFilter;
  onFilterChange: (key: keyof MaintenanceFilter, value: any) => void;
  onClearFilters: () => void;
  isScheduledTab?: boolean;
}

export default function CommonMaintenanceFilters({
  filters,
  onFilterChange,
  onClearFilters,
  isScheduledTab = false,
}: CommonMaintenanceFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="py-4">
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
            <Option value={MaintenanceType.DATABASE}>
              {t("sys.maintenance.type-database")}
            </Option>
            <Option value={MaintenanceType.SYSTEM}>
              {t("sys.maintenance.type-system")}
            </Option>
            <Option value={MaintenanceType.NETWORK}>
              {t("sys.maintenance.type-network")}
            </Option>
            <Option value={MaintenanceType.OTHER}>
              {t("sys.maintenance.type-other")}
            </Option>
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
            value={
              isScheduledTab
                ? MaintenanceStatus.SCHEDULED
                : filters.status || undefined
            }
            onChange={(value) =>
              !isScheduledTab && onFilterChange("status", value)
            }
            allowClear={!isScheduledTab}
            className="w-full"
          >
            <Option value={MaintenanceStatus.SCHEDULED}>
              {t("sys.maintenance.status-scheduled")}
            </Option>
            <Option
              value={MaintenanceStatus.IN_PROGRESS}
              disabled={isScheduledTab}
            >
              {t("sys.maintenance.status-in-progress")}
            </Option>
            <Option
              value={MaintenanceStatus.COMPLETED}
              disabled={isScheduledTab}
            >
              {t("sys.maintenance.status-completed")}
            </Option>
            <Option
              value={MaintenanceStatus.CANCELLED}
              disabled={isScheduledTab}
            >
              {t("sys.maintenance.status-cancelled")}
            </Option>
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
