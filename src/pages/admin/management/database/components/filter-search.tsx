import { Button, Input, DatePicker } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { RangePicker } = DatePicker;

interface FilterSearchProps {
  filters: { search: string; startDate: string; endDate: string };
  setFilters: React.Dispatch<React.SetStateAction<any>>;
  onSearch: () => void;
  onClear: () => void;
}

export default function FilterSearch({
  filters,
  setFilters,
  onSearch,
  onClear,
}: FilterSearchProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-wrap gap-4 items-end">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium mb-2">
          {t("management.database.search-by-name")}
        </label>
        <Input
          size="large"
          placeholder={t("management.database.by-name")}
          value={filters.search}
          onChange={(e) =>
            setFilters((prev: any) => ({ ...prev, search: e.target.value }))
          }
          prefix={<SearchOutlined />}
          allowClear
        />
      </div>

      <div className="flex-1 min-w-[250px]">
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
          onChange={(dates) =>
            setFilters((prev: any) => ({
              ...prev,
              startDate: dates?.[0]?.format("YYYY-MM-DD") || "",
              endDate: dates?.[1]?.format("YYYY-MM-DD") || "",
            }))
          }
          style={{ width: "100%" }}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button danger size="large" onClick={onClear}>
          {t("management.database.clear-filters")}
        </Button>
        <Button
          color="primary"
          variant="outlined"
          size="large"
          onClick={onSearch}
        >
          {t("management.database.search")}
        </Button>
      </div>
    </div>
  );
}
