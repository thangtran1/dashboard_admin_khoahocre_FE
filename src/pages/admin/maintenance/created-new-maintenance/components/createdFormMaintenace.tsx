import { Form, Input, Select, DatePicker, Button, Space } from "antd";
import { Icon } from "@/components/icon";
import maintenanceApi, {
  CreateMaintenanceDto,
  MaintenanceType,
} from "@/api/services/maintenanceApi";
import {
  CalendarOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import dayjs from "dayjs";

const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

export default function CreatedFormMaintenace() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: any) => {
    try {
      setLoading(true);

      const createData: CreateMaintenanceDto = {
        title: values.title,
        description: values.description,
        type: values.type,
        startTime: values.timeRange[0].toISOString(),
        endTime: values.timeRange[1].toISOString(),
      };

      const response = await maintenanceApi.create(createData);
      if (response.data.success) {
        toast.success(t("sys.maintenance.create-success"));
        form.resetFields();
        setTimeout(() => {
          navigate("/maintenance");
        }, 1000);
      } else {
        toast.error(t("sys.maintenance.create-error"));
      }
    } catch (error) {
      console.error("❌ handleSubmit ~ error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="p-8"
      initialValues={{
        type: MaintenanceType.SYSTEM,
      }}
    >
      {/* Title */}
      <Form.Item
        name="title"
        label={
          <span className="text-base font-semibold flex items-center gap-2">
            <FileTextOutlined className="text-primary" />
            {t("sys.maintenance.title")}
          </span>
        }
        rules={[
          {
            required: true,
            message: t("sys.maintenance.title-required"),
          },
          { min: 3, message: t("sys.maintenance.title-min-length") },
        ]}
      >
        <Input
          size="large"
          placeholder={t("sys.maintenance.title-placeholder")}
          className="rounded-lg"
        />
      </Form.Item>

      {/* Description */}
      <Form.Item
        name="description"
        label={
          <span className="text-base font-semibold flex items-center gap-2">
            <Icon icon="lucide:file-text" className="h-4 w-4 text-primary" />
            {t("sys.maintenance.description")}
          </span>
        }
      >
        <TextArea
          rows={4}
          placeholder={t("sys.maintenance.description-placeholder")}
          className="rounded-lg"
          showCount
          maxLength={500}
        />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Type */}
        <Form.Item
          name="type"
          label={
            <span className="text-base font-semibold flex items-center gap-2">
              <Icon icon="lucide:tag" className="h-4 w-4 text-primary" />
              {t("sys.maintenance.type")}
            </span>
          }
          rules={[
            {
              required: true,
              message: t("sys.maintenance.type-required"),
            },
          ]}
        >
          <Select
            size="large"
            placeholder={t("sys.maintenance.select-type")}
            className="rounded-lg"
          >
            <Option value={MaintenanceType.DATABASE}>
              <Space>
                <Icon
                  icon="lucide:database"
                  className="w-4 h-4 text-purple-500"
                />
                {t("sys.maintenance.type-database")}
              </Space>
            </Option>
            <Option value={MaintenanceType.SYSTEM}>
              <Space>
                <Icon
                  icon="lucide:settings"
                  className="w-4 h-4 text-cyan-500"
                />
                {t("sys.maintenance.type-system")}
              </Space>
            </Option>
            <Option value={MaintenanceType.NETWORK}>
              <Space>
                <Icon icon="lucide:network" className="w-4 h-4 text-blue-500" />
                {t("sys.maintenance.type-network")}
              </Space>
            </Option>
            <Option value={MaintenanceType.OTHER}>
              <Space>
                <Icon
                  icon="lucide:more-horizontal"
                  className="w-4 h-4 text-gray-500"
                />
                {t("sys.maintenance.type-other")}
              </Space>
            </Option>
          </Select>
        </Form.Item>

        {/* Time Range */}
        <Form.Item
          name="timeRange"
          label={
            <span className="text-base font-semibold flex items-center gap-2">
              <CalendarOutlined className="text-primary" />
              {t("sys.maintenance.time-range")}
            </span>
          }
          rules={[
            {
              required: true,
              message: t("sys.maintenance.time-range-required"),
            },
          ]}
        >
          <RangePicker
            size="large"
            showTime={{ format: "HH:mm" }}
            format="DD/MM/YYYY HH:mm"
            placeholder={[
              t("sys.maintenance.start-time"),
              t("sys.maintenance.end-time"),
            ]}
            className="w-full rounded-lg"
            disabledDate={(current) => {
              return current && current < dayjs().startOf("day");
            }}
            suffixIcon={<ClockCircleOutlined />}
          />
        </Form.Item>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 pt-6 border-t mt-8">
        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          className="flex-1 h-12 text-base font-semibold rounded-lg"
          icon={<Icon icon="lucide:check-circle" className="h-5 w-5" />}
        >
          {t("sys.maintenance.create-maintenance")}
        </Button>
        <Button
          danger
          size="large"
          onClick={() => navigate("/maintenance")}
          disabled={loading}
          className="flex-1 h-12 text-base font-semibold rounded-lg"
          icon={<Icon icon="lucide:x-circle" className="h-5 w-5" />}
        >
          {t("sys.maintenance.cancel")}
        </Button>
      </div>
    </Form>
  );
}
