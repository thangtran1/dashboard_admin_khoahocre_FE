import { Button, DatePicker, Input, Select } from "antd";
import { SearchOutlined, ClearOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { QueryUserParams } from "@/api/services/userManagementApi";
import { Separator } from "@/ui/separator";
import dayjs from "dayjs";

const { Option } = Select;
interface FilterSessionProps {
  filters: QueryUserParams;
  onFilterChange: (key: keyof QueryUserParams, value: any) => void;
  onClearFilters: () => void;
}
const { RangePicker } = DatePicker;

export default function FilterSession({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterSessionProps) {
  const { t } = useTranslation();

  return (
    <div className="py-2 !mb-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.auth-session.search")}
          </label>
          <Input
            size="large"
            placeholder={t("sys.auth-session.search-placeholder")}
            value={filters.search}
            onChange={(e) => onFilterChange("search", e.target.value)}
            prefix={<SearchOutlined />}
            allowClear
          />
        </div>

        {/* Role Filter */}
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.auth-session.status")}
          </label>
          <Select
            size="large"
            placeholder={t("sys.auth-session.all-status")}
            value={filters.role || undefined}
            onChange={(value) => onFilterChange("role", value)}
            allowClear
            className="w-full"
          >
            <Option value="active">{t("sys.auth-session.active")}</Option>
            <Option value="inactive">{t("sys.auth-session.inactive")}</Option>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.auth-session.exclude-admin")}
          </label>
          <Select
            size="large"
            placeholder={t("sys.auth-session.all-exclude-admin")}
            allowClear
            className="w-full"
          >
            <Option value={true}>
              {t("sys.auth-session.exclude-admin-true")}
            </Option>
            <Option value={false}>
              {t("sys.auth-session.exclude-admin-false")}
            </Option>
          </Select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.database.date-range")}
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
        {/* Actions */}
        <div className="flex gap-2">
          {/* Clear Filters */}
          <Button
            size="large"
            danger
            icon={<ClearOutlined />}
            onClick={onClearFilters}
          >
            {t("sys.auth-session.clear-filters")}
          </Button>
          <Button
            size="large"
            color="primary"
            variant="outlined"
            icon={<SearchOutlined />}
            onClick={onClearFilters}
          >
            {t("sys.auth-session.search-action")}
          </Button>
        </div>
      </div>
      <Separator className="mt-8" />
    </div>
  );
}
