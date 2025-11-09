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
            {t("management.user.selected-count", {
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
                title={t("management.user.confirm-restore")}
                description={t("management.user.confirm-restore-description", {
                  count: selectedUsers.length,
                })}
                onConfirm={() => onRestore?.(selectedUsers)}
                okText={t("management.user.restore")}
                cancelText={t("management.user.cancel")}
              >
                <Button
                  color="primary"
                  variant="outlined"
                  icon={<UndoOutlined />}
                  size="large"
                >
                  {t("management.user.restore")} ({selectedUsers.length})
                </Button>
              </Popconfirm>

              <Popconfirm
                title={t("management.user.confirm-permanent-delete")}
                description={t(
                  "management.user.confirm-permanent-delete-description",
                  {
                    count: selectedUsers.length,
                  }
                )}
                onConfirm={onDeleteMany}
                okText={t("management.user.permanent-delete")}
                cancelText={t("management.user.cancel")}
                okButtonProps={{ danger: true }}
              >
                <Button
                  color="danger"
                  variant="outlined"
                  icon={<DeleteOutlined />}
                  size="large"
                >
                  {t("management.user.permanent-delete")} (
                  {selectedUsers.length})
                </Button>
              </Popconfirm>
            </>
          )}

          {/* Actions for Active and New Users */}
          {(tabType === "active" || tabType === "new") && (
            <Popconfirm
              title={t("management.user.confirm-delete")}
              description={t("management.user.confirm-delete-description", {
                count: selectedUsers.length,
              })}
              onConfirm={onDeleteMany}
              okText={t("management.user.delete")}
              cancelText={t("management.user.cancel")}
              okButtonProps={{ danger: true }}
            >
              <Button
                color="danger"
                variant="outlined"
                icon={<DeleteOutlined />}
                size="large"
              >
                {t("management.user.delete")} ({selectedUsers.length})
              </Button>
            </Popconfirm>
          )}
        </Space>
      </div>
    </div>
  );
}
