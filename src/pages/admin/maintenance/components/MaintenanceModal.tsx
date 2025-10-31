import {
  Modal,
  Tag,
  Descriptions,
  Form,
  Input,
  DatePicker,
  Select,
  Button,
} from "antd";
import { Icon } from "@/components/icon";
import {
  Maintenance,
  MaintenanceStatus,
  MaintenanceType,
  UpdateMaintenanceDto,
} from "@/api/services/maintenanceApi";
import { useTranslation } from "react-i18next";
import { useState, useCallback, useEffect } from "react";
import dayjs from "dayjs";

const { Option } = Select;
interface MaintenanceModalProps {
  isOpen: boolean;
  maintenance: Maintenance | null;
  onClose: () => void;
  onUpdate?: (id: string, values: UpdateMaintenanceDto) => Promise<boolean>;
}

export default function MaintenanceModal({
  isOpen,
  maintenance,
  onClose,
  onUpdate,
}: MaintenanceModalProps) {
  const { t } = useTranslation();
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsEditing(!!onUpdate);
    }
  }, [isOpen, onUpdate]);
  const [form] = Form.useForm();

  const handleSubmit = useCallback(async () => {
    try {
      if (!onUpdate) return;

      const { title, description, type, startTime, endTime } =
        form.getFieldsValue();
      const success = await onUpdate(maintenance?._id || "", {
        title,
        description,
        type: type as MaintenanceType,
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
      });

      if (success) {
        setIsEditing(false);
        form.resetFields();
        onClose();
      }
    } catch (error) {
      console.error("❌ handleSubmit ~ error:", error);
    }
  }, [form, maintenance, onUpdate]);

  // Reset form and edit mode when maintenance changes
  useEffect(() => {
    if (maintenance) {
      form.setFieldsValue({
        ...maintenance,
        startTime: dayjs(maintenance.startTime),
        endTime: dayjs(maintenance.endTime),
      });
    }
  }, [maintenance, form]);

  if (!maintenance) return null;

  const getStatusColor = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.SCHEDULED:
        return "blue";
      case MaintenanceStatus.IN_PROGRESS:
        return "orange";
      case MaintenanceStatus.COMPLETED:
        return "green";
      case MaintenanceStatus.CANCELLED:
        return "red";
      default:
        return "default";
    }
  };

  const getTypeColor = (type: MaintenanceType) => {
    switch (type) {
      case MaintenanceType.DATABASE:
        return "purple";
      case MaintenanceType.SYSTEM:
        return "cyan";
      case MaintenanceType.NETWORK:
        return "geekblue";
      case MaintenanceType.OTHER:
        return "default";
      default:
        return "default";
    }
  };

  const getDuration = () => {
    if (maintenance.duration) {
      return maintenance.duration > 60
        ? `${Math.round(maintenance.duration / 60)} ${t(
            "sys.maintenance.hours"
          )}`
        : `${Math.round(maintenance.duration)} ${t("sys.maintenance.minutes")}`;
    }
    const duration =
      (new Date(maintenance.endTime).getTime() -
        new Date(maintenance.startTime).getTime()) /
      (1000 * 60);
    return duration > 60
      ? `${Math.round(duration / 60)} ${t("sys.maintenance.hours")}`
      : `${Math.round(duration)} ${t("sys.maintenance.minutes")}`;
  };

  const renderContent = () => {
    if (isEditing) {
      return (
        <Form
          form={form}
          layout="vertical"
          className="mt-6"
          initialValues={{
            ...maintenance,
            startTime: dayjs(maintenance.startTime),
            endTime: dayjs(maintenance.endTime),
          }}
        >
          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="title"
              label={t("sys.maintenance.title")}
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="_id" label="ID">
              <Input disabled />
            </Form.Item>
          </div>

          <Form.Item
            name="description"
            label={t("sys.maintenance.description")}
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="startTime"
              label={t("sys.maintenance.start-time")}
              rules={[{ required: true }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                className="w-full"
              />
            </Form.Item>

            <Form.Item
              name="endTime"
              label={t("sys.maintenance.end-time")}
              rules={[{ required: true }]}
            >
              <DatePicker
                showTime
                format="YYYY-MM-DD HH:mm"
                className="w-full"
              />
            </Form.Item>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Form.Item
              name="type"
              label={t("sys.maintenance.type")}
              rules={[{ required: true }]}
            >
              <Select>
                {Object.values(MaintenanceType).map((type) => (
                  <Option key={type} value={type}>
                    {t(`sys.maintenance.type-${type}`)}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name="status" label={t("sys.maintenance.status")}>
              <Input disabled />
            </Form.Item>
          </div>
        </Form>
      );
    }

    return (
      <div className="mt-6">
        <Descriptions bordered column={2} size="middle">
          <Descriptions.Item label={t("sys.maintenance.title")} span={2}>
            <span className="font-semibold">{maintenance.title}</span>
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.description")} span={2}>
            {maintenance.description || t("sys.maintenance.no-description")}
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.status")}>
            <Tag color={getStatusColor(maintenance.status)}>
              {t(`sys.maintenance.status-${maintenance.status}`)}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.type")}>
            <Tag color={getTypeColor(maintenance.type)}>
              {t(`sys.maintenance.type-${maintenance.type}`)}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.start-time")}>
            {new Date(maintenance.startTime).toLocaleString("vi-VN")}
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.end-time")}>
            {new Date(maintenance.endTime).toLocaleString("vi-VN")}
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.duration")}>
            {getDuration()}
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.is-active")}>
            <Tag color={maintenance.isActive ? "green" : "default"}>
              {maintenance.isActive
                ? t("sys.maintenance.active")
                : t("sys.maintenance.inactive")}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.auto-adjusted")}>
            <Tag color={maintenance.autoAdjusted ? "blue" : "default"}>
              {maintenance.autoAdjusted
                ? t("sys.maintenance.yes")
                : t("sys.maintenance.no")}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.created-at")}>
            {new Date(maintenance.createdAt).toLocaleString("vi-VN")}
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.updated-at")}>
            {new Date(maintenance.updatedAt).toLocaleString("vi-VN")}
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.id")} span={2}>
            <code className="text-xs bg-muted px-2 py-1 rounded">
              {maintenance._id}
            </code>
          </Descriptions.Item>
        </Descriptions>
      </div>
    );
  };

  return (
    <Modal
      open={isOpen}
      footer={null}
      width={isEditing ? 700 : 800}
      onCancel={() => {
        setIsEditing(false);
        onClose();
      }}
      title={
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon
              icon={isEditing ? "lucide:edit" : "lucide:info"}
              className="h-5 w-5 text-primary"
            />
            {t(isEditing ? "sys.maintenance.edit" : "sys.maintenance.detail")}
          </div>
        </div>
      }
    >
      {renderContent()}

      <div className="flex justify-end mt-6 gap-3">
        {isEditing ? (
          <>
            <Button danger onClick={onClose}>
              {t("sys.maintenance.close")}
            </Button>

            <Button color="primary" variant="outlined" onClick={handleSubmit}>
              {t("sys.maintenance.update")}
            </Button>
          </>
        ) : (
          <>
            {onUpdate && !isEditing && (
              <Button
                type="text"
                icon={<Icon icon="lucide:edit" className="h-4 w-4" />}
                onClick={() => setIsEditing(true)}
              >
                {t("sys.maintenance.edit")}
              </Button>
            )}
            <Button danger onClick={onClose}>
              {t("sys.maintenance.close")}
            </Button>
          </>
        )}
      </div>
    </Modal>
  );
}
