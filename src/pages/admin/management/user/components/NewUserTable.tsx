import {
  Table,
  Tag,
  Avatar,
  Checkbox,
  Pagination,
  Tooltip,
  Button,
  Popconfirm,
} from "antd";
import {
  UserOutlined,
  CalendarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { getRoleColor, getStatusColor, User } from "@/api/services/userManagementApi";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";

interface NewUserTableProps {
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
  onDelete: (ids: string | string[]) => void;
  onPageChange: (page: number, pageSize?: number) => void;
}

export default function NewUserTable({
  users,
  loading,
  selectedUsers,
  pagination,
  onSelectUser,
  onSelectAll,
  onDelete,
  onPageChange,
}: NewUserTableProps) {
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
      render: (_: React.ReactNode, user: User) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            src={user.avatar}
            icon={<UserOutlined />}
            className="flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground truncate">
              {user.name}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {user.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("sys.user-management.role"),
      key: "role",
      render: (_: React.ReactNode, user: User) => (
        <Tag color={getRoleColor(user.role)}>{t(`sys.user-management.${user.role}`)}</Tag>
      ),
    },
    {
      title: t("sys.user-management.status"),
      key: "status",
      render: (_: React.ReactNode, user: User) => (
        <Tag color={getStatusColor(user.status || "active")}>
          {t(`sys.user-management.${user.status || "active"}`)}
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
      title: t("sys.user-management.email-verified"),
      key: "isEmailVerified",
      render: (_: React.ReactNode, user: User) => (
        <Tag color={user.isEmailVerified ? "green" : "orange"}>
          {user.isEmailVerified
              ? t("sys.user-management.verified")
              : t("sys.user-management.not-verified")}
          </Tag>
        ),
    },
    {
      title: t("sys.user-management.actions"),
      key: "actions",
      align: "center" as const,
      width: 120,
      render: (_: React.ReactNode, user: User) => (
        <Popconfirm
          title={t("sys.user-management.confirm-delete")}
          description={t(
            "sys.user-management.confirm-delete-single-description"
          )}
            onConfirm={() => onDelete(user.id)}
          okText={t("sys.user-management.delete")}
          cancelText={t("sys.user-management.cancel")}
          okButtonProps={{ danger: true }}
        >
          <Button
            type="text"
            danger
            size="small"
            icon={<DeleteOutlined />}
            title={t("sys.user-management.delete")}
          />
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-lg border">
      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={false}
        scroll={{ x: 800 }}
        className="user-table"
      />

      <div className=" justify-end flex p-4 border-t">
        <Pagination
          current={pagination.page}
          total={pagination.total}
          pageSize={pagination.limit}
          onChange={onPageChange}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["10", "20", "50", "100"]}
          showTotal={(total, range) =>
            t("sys.user-management.pagination-total", {
              start: range[0],
              end: range[1],
              total,
            })
          }
        />
      </div>
    </div>
  );
}
