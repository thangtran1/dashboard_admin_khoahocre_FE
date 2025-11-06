import {
  Button,
  Input,
  DatePicker,
  Select,
} from "antd";
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
import {
  SearchOutlined,
  ClearOutlined,
} from "@ant-design/icons";
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
    <div className="pb-2">
    <div className="flex flex-col lg:flex-row lg:items-end gap-3">
      <div className="flex-1 flex flex-col sm:flex-row gap-3">
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.auth-session.search")}
          </label>
          <Search
            placeholder={t("sys.auth-session.search-placeholder")}
            size="large"
            prefix={<SearchOutlined />}
            allowClear
            className="flex-[1.3]"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onSearch={handleSearchClick}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">
            {t("sys.auth-session.date-range")}
          </label>
          <RangePicker
            size="large"
            allowClear
            className="flex-[0.7]"
            style={{ minWidth: 220 }}
            value={dateRange}
            onChange={(dates) =>
              setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
            }
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">
          {t("sys.auth-session.status")}
        </label>
        <Select
          size="large"
          style={{ width: 220 }}
          allowClear
          value={selectedType || undefined}
          onChange={setSelectedType}
          placeholder={t("sys.auth-session.all-status")}
        >
          <Option value="active">{t("sys.auth-session.active")}</Option>
          <Option value="revoked">{t("sys.auth-session.revoked")}</Option>
        </Select>
      </div>

      <div className="flex gap-2">
        <Button
          danger
          icon={<ClearOutlined />}
          size="large"
          onClick={handleClearFilter}
        >
          {t("sys.auth-session.clear-filter")}
        </Button>
        <Button
          icon={<SearchOutlined />}
          size="large"
          color="primary"
          variant="outlined"  
          onClick={handleSearchClick}
        >
          {t("sys.auth-session.search-action")}
        </Button>
      </div>
    </div>
  </div>
  );
}