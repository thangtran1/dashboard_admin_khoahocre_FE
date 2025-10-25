import { Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface MaintenanceActionBarProps {
  selectedMaintenances: string[];
  tabType: "all" | "scheduled";
  onDeleteMany?: () => void;
}

export default function MaintenanceActionBar({
  selectedMaintenances,
  tabType,
  onDeleteMany,
}: MaintenanceActionBarProps) {
  const { t } = useTranslation();

  if (selectedMaintenances.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        {/* Selected Info */}
        <div className="flex items-center gap-2 text-blue-700">
          <InfoCircleOutlined />
          <span className="font-medium">
            {t("sys.maintenance.selected-count", {
              count: selectedMaintenances.length,
            })}
          </span>
        </div>

        {/* Action Buttons */}
        <Space>
          {/* Actions for Active and Scheduled */}
          {(tabType === "all" || tabType === "scheduled") && (
            <Popconfirm
              title={t("sys.maintenance.confirm-delete")}
              description={t("sys.maintenance.confirm-delete-many-description", {
                count: selectedMaintenances.length,
              })}
              onConfirm={onDeleteMany}
              okText={t("sys.maintenance.delete")}
              cancelText={t("sys.maintenance.cancel-action")}
              okButtonProps={{ danger: true }}
            >
              <Button danger icon={<DeleteOutlined />} size="large">
                {t("sys.maintenance.delete")} ({selectedMaintenances.length})
              </Button>
            </Popconfirm>
          )}
        </Space>
      </div>
    </div>
  );
}
