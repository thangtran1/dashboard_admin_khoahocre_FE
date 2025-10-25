import { Modal, Tag, Descriptions } from "antd";
import { Icon } from "@/components/icon";
import { Maintenance, MaintenanceStatus, MaintenanceType } from "@/api/services/maintenanceApi";
import { useTranslation } from "react-i18next";

interface MaintenanceDetailModalProps {
  isOpen: boolean;
  maintenance: Maintenance | null;
  onClose: () => void;
}

export default function MaintenanceDetailModal({
  isOpen,
  maintenance,
  onClose,
}: MaintenanceDetailModalProps) {
  const { t } = useTranslation();

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
        ? `${Math.round(maintenance.duration / 60)} ${t("sys.maintenance.hours")}`
        : `${Math.round(maintenance.duration)} ${t("sys.maintenance.minutes")}`;
    }
    const duration = (new Date(maintenance.endTime).getTime() - new Date(maintenance.startTime).getTime()) / (1000 * 60);
    return duration > 60 
      ? `${Math.round(duration / 60)} ${t("sys.maintenance.hours")}`
      : `${Math.round(duration)} ${t("sys.maintenance.minutes")}`;
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Icon icon="lucide:info" className="h-5 w-5 text-primary" />
          {t("sys.maintenance.detail")}
        </div>
      }
      open={isOpen}
      onCancel={onClose}
      footer={null}
      width={800}
    >
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
              {maintenance.isActive ? t("sys.maintenance.active") : t("sys.maintenance.inactive")}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.auto-adjusted")}>
            <Tag color={maintenance.autoAdjusted ? "blue" : "default"}>
              {maintenance.autoAdjusted ? t("sys.maintenance.yes") : t("sys.maintenance.no")}
            </Tag>
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.created-at")}>
            {new Date(maintenance.createdAt).toLocaleString("vi-VN")}
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.updated-at")}>
            {new Date(maintenance.updatedAt).toLocaleString("vi-VN")}
          </Descriptions.Item>

          <Descriptions.Item label={t("sys.maintenance.id")} span={2}>
            <code className="text-xs bg-muted px-2 py-1 rounded">{maintenance._id}</code>
          </Descriptions.Item>
        </Descriptions>
      </div>
    </Modal>
  );
}

