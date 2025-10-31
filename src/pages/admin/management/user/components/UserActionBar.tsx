import { Button, Space, Popconfirm } from "antd";
import {
  DeleteOutlined,
  UndoOutlined,
  InfoCircleOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface UserActionBarProps {
  selectedUsers: string[];
  tabType: "active" | "deleted" | "new";
  onDeleteMany?: () => void;
  onRestore?: (ids: string[]) => void;
}

export default function UserActionBar({
  selectedUsers,
  tabType,
  onDeleteMany,
  onRestore,
}: UserActionBarProps) {
  const { t } = useTranslation();

  if (selectedUsers.length === 0) {
    return null;
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        {/* Selected Info */}
        <div className="flex items-center gap-2 text-blue-700">
          <InfoCircleOutlined />
          <span className="font-medium">
            {t("sys.user-management.selected-count", {
              count: selectedUsers.length,
            })}
          </span>
        </div>

        {/* Action Buttons */}
        <Space>
          {/* Actions for Deleted Tab */}
          {tabType === "deleted" && (
            <>
              <Popconfirm
                title={t("sys.user-management.confirm-restore")}
                description={t(
                  "sys.user-management.confirm-restore-description",
                  {
                    count: selectedUsers.length,
                  }
                )}
                onConfirm={() => onRestore?.(selectedUsers)}
                okText={t("sys.user-management.restore")}
                cancelText={t("sys.user-management.cancel")}
              >
                <Button color="primary" variant="outlined" icon={<UndoOutlined />} size="large">
                  {t("sys.user-management.restore")} ({selectedUsers.length})
                </Button>
              </Popconfirm>

              <Popconfirm
                title={t("sys.user-management.confirm-permanent-delete")}
                description={t(
                  "sys.user-management.confirm-permanent-delete-description",
                  {
                    count: selectedUsers.length,
                  }
                )}
                onConfirm={onDeleteMany}
                okText={t("sys.user-management.permanent-delete")}
                cancelText={t("sys.user-management.cancel")}
                okButtonProps={{ danger: true }}
              >
                <Button color="danger" variant="outlined" icon={<DeleteOutlined />} size="large">
                  {t("sys.user-management.permanent-delete")} (
                  {selectedUsers.length})
                </Button>
              </Popconfirm>
            </>
          )}

          {/* Actions for Active and New Users */}
          {(tabType === "active" || tabType === "new") && (
            <Popconfirm
              title={t("sys.user-management.confirm-delete")}
              description={t("sys.user-management.confirm-delete-description", {
                count: selectedUsers.length,
              })}
              onConfirm={onDeleteMany}
              okText={t("sys.user-management.delete")}
              cancelText={t("sys.user-management.cancel")}
              okButtonProps={{ danger: true }}
            >
              <Button color="danger" variant="outlined" icon={<DeleteOutlined />} size="large">
                {t("sys.user-management.delete")} ({selectedUsers.length})
              </Button>
            </Popconfirm>
          )}
        </Space>
      </div>
    </div>
  );
}
