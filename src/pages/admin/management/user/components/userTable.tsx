import {
  Table,
  Checkbox,
  Avatar,
  Space,
  Button,
  Tooltip,
  Popconfirm,
  Tag,
  Pagination,
  Select,
} from "antd";
import {
  getRoleColor,
  getStatusColor,
  User,
} from "@/api/services/userManagementApi";
import {
  UserOutlined,
  EditOutlined,
  DeleteOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import TableAntd from "@/components/common/tables/custom-table-antd";

interface UserTableProps {
  users: User[];
  loading: boolean;
  selectedUsers: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onSelectUser: (userId: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number, pageSize?: number) => void;
}

export default function UserTable({
  users,
  loading,
  selectedUsers,
  pagination,
  onSelectUser,
  onSelectAll,
  onEdit,
  onDelete,
  onPageChange,
}: UserTableProps) {
  const { t } = useTranslation();
  const columns = [
    {
      title: (
        <Checkbox
          checked={selectedUsers.length === users.length && users.length > 0}
          indeterminate={
            selectedUsers.length > 0 && selectedUsers.length < users.length
          }
          onChange={(e) => onSelectAll(e.target.checked)}
        />
      ),
      key: "select",
      width: 50,
      render: (_: React.ReactNode, user: User) => (
        <Checkbox
          checked={selectedUsers.includes(user.id)}
          onChange={(e) => onSelectUser(user.id, e.target.checked)}
        />
      ),
    },
    {
      title: t("sys.user-management.user-info"),
      key: "user",
      width: 250,
      render: (_: React.ReactNode, user: User) => {
        const avatarUrl = user?.avatar
          ? `${import.meta.env.VITE_API_URL}${user.avatar}`
          : undefined;

        return (
          <div className="flex items-center gap-3">
            <Avatar src={avatarUrl} size={40} icon={<UserOutlined />} />

            <div>
              <div className="font-semibold text-foreground">{user.name}</div>
              <div className="text-sm text-muted-foreground">{user.email}</div>
            </div>
          </div>
        );
      },
    },
    {
      title: t("sys.user-management.role"),
      key: "role",
      render: (_: React.ReactNode, user: User) => (
        <Tag color={getRoleColor(user.role)}>
          {t(`sys.user-management.role-${user.role}`)}
        </Tag>
      ),
    },
    {
      title: t("sys.user-management.status"),
      key: "status",
      render: (_: React.ReactNode, user: User) => (
        <Tag color={getStatusColor(user.status || "active")}>
          {t(`sys.user-management.status-${user.status || "active"}`)}
        </Tag>
      ),
    },
    {
      title: t("sys.user-management.created-at"),
      key: "createdAt",
      render: (_: React.ReactNode, user: User) => (
        <Tooltip title={new Date(user.createdAt).toLocaleString("vi-VN")}>
          <div className="flex items-center gap-1 text-sm">
            <CalendarOutlined className="text-muted-foreground" />
            {formatDistanceToNow(new Date(user.createdAt), {
              addSuffix: true,
              locale: vi,
            })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: t("sys.user-management.info"),
      key: "info",
      width: 220,
      render: (_: React.ReactNode, user: User) => (
        <div className="text-sm text-foreground">
          {user.phone && (
            <div>
              {t("sys.user-management.phone")}: {user.phone}
            </div>
          )}
          <div>
            {t("sys.user-management.login-count")}: {user.loginCount}
          </div>
        </div>
      ),
    },

    {
      title: t("sys.user-management.actions"),
      key: "actions",
      width: 120,
      render: (_: React.ReactNode, user: User) => (
        <Space>
          <Tooltip title={t("sys.user-management.edit")}>
            <Button
              type="text"
              size="middle"
              icon={<EditOutlined />}
              onClick={() => onEdit(user)}
              className="text-primary hover:bg-primary/10"
            />
          </Tooltip>

          <Popconfirm
            title={t("sys.user-management.confirm-delete")}
            description={t("sys.user-management.confirm-delete-description")}
            onConfirm={() => onDelete(user.id)}
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
