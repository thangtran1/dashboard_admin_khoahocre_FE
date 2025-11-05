import { Space, Button, Tooltip, Popconfirm, Tag } from "antd";
import { getStatusColor, User } from "@/api/services/userManagementApi";
import { DeleteOutlined, CalendarOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import TableAntd from "@/components/common/tables/custom-table-antd";

interface UserTableProps {
  users: User[];
  loading: boolean;
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange: (page: number, pageSize?: number) => void;
}

export default function AuthSessionTable({
  users,
  loading,
  pagination,
  onPageChange,
}: UserTableProps) {
  const { t } = useTranslation();
  const columns = [
    {
      title: t("sys.auth-session.user-name"),
      key: "userName",
      render: (_: React.ReactNode, user: User) => (
        <div className="text-sm text-foreground">ABC</div>
      ),
    },
    {
      title: t("sys.auth-session.email"),
      key: "userName",
      render: (_: React.ReactNode, user: User) => (
        <div className="text-sm text-foreground">abc@gmail.com</div>
      ),
    },
    {
      title: t("sys.auth-session.browser"),
      key: "browser",
      render: (_: React.ReactNode, user: User) => (
        <div className="text-sm text-foreground">Chrome</div>
      ),
    },
    {
      title: t("sys.user-management.status"),
      key: "status",
      render: (_: React.ReactNode, user: User) => (
        <div className="text-sm text-foreground">Active</div>
      ),
    },
    {
      title: t("sys.auth-session.last-activity-time"),
      key: "lastActivityTime",
      render: (_: React.ReactNode, user: User) => (
        <div className="text-sm text-foreground">12:00:00</div>
      ),
    },
    {
      title: t("sys.auth-session.last-activity-type"),
      key: "lastActivityType",
      render: (_: React.ReactNode, user: User) => (
        <div className="text-sm text-foreground">Login</div>
      ),
    },

    {
      title: t("sys.user-management.actions"),
      key: "actions",
      align: "center",
      width: 150,
      render: (_: React.ReactNode, user: User) => (
        <Space>
          <Popconfirm
            title={t("sys.user-management.confirm-delete")}
            description={t("sys.user-management.confirm-delete-description")}
            okText={t("sys.user-management.delete")}
            cancelText={t("sys.user-management.cancel")}
            okButtonProps={{ danger: true }}
          >
            <Tooltip title={t("sys.user-management.delete")}>
              <Button
                type="text"
                size="middle"
                danger
                icon={<DeleteOutlined />}
              />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <TableAntd
      columns={columns}
      data={users}
      loading={loading}
      pagination={pagination}
      onPageChange={onPageChange}
      scroll={{ x: 800, y: 500 }}
    />
  );
}
