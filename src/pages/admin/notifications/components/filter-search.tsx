import { Button, Input, DatePicker, Select } from "antd";
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
import { SearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface FilterSearchProps {
  searchText: string;
  setSearchText: (value: string) => void;
  dateRange: [dayjs.Dayjs, dayjs.Dayjs] | null;
  setDateRange: (value: [dayjs.Dayjs, dayjs.Dayjs] | null) => void;
  selectedType: string;
  setSelectedType: (value: string) => void;
  handleSearchClick: () => void;
  handleClearFilter: () => void;
}
export default function FilterSearch({
  searchText,
  setSearchText,
  dateRange,
  setDateRange,
  selectedType,
  setSelectedType,
  handleSearchClick,
  handleClearFilter,
}: FilterSearchProps) {
  const { t } = useTranslation();
  return (
    <div className="grid grid-cols-1 items-end gap-4 pb-5 md:grid-cols-2 xl:grid-cols-4">
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("sys.notification.search")}
        </label>
        <Search
          placeholder={t("sys.notification.search-placeholder")}
          size="large"
          prefix={<SearchOutlined />}
          allowClear
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          onSearch={handleSearchClick}
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("sys.notification.date-range")}
        </label>
        <RangePicker
          size="large"
          allowClear
          style={{ width: "100%" }}
          value={dateRange}
          onChange={(dates) =>
            setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
          }
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">
          {t("sys.notification.type")}
        </label>
        <Select
          size="large"
          style={{ width: "100%" }}
          allowClear
          value={selectedType || undefined}
          onChange={setSelectedType}
          placeholder={t("sys.notification.type-placeholder")}
        >
          <Option value="system">{t("sys.notification.system")}</Option>
          <Option value="promotion">{t("sys.notification.promotion")}</Option>
          <Option value="maintenance">
            {t("sys.notification.maintenance")}
          </Option>
          <Option value="update">{t("sys.notification.update")}</Option>
        </Select>
      </div>
      <div className="flex gap-2">
        <Button danger size="large" onClick={handleClearFilter}>
          {t("sys.notification.clear-filter")}
        </Button>
        <Button
          size="large"
          color="primary"
          variant="outlined"
          onClick={handleSearchClick}
        >
          {t("sys.notification.search")}
        </Button>
      </div>
    </div>
  );
}
