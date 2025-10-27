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
import { User } from "@/api/services/userManagementApi";
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

  const getRoleColor = (role: string) => {
    switch (role) {
      case "admin":
        return "red";
      case "moderator":
        return "orange";
      case "user":
        return "blue";
      default:
        return "default";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "green";
      case "inactive":
        return "orange";
      case "banned":
        return "red";
      default:
        return "default";
    }
  };

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
      dataIndex: "select",
      key: "select",
      width: 50,
      render: (_: any, record: User) => (
        <Checkbox
          checked={selectedUsers.includes(record.id)}
          onChange={(e) => onSelectUser(record.id, e.target.checked)}
        />
      ),
    },
    {
      title: t("sys.user-management.user-info"),
      dataIndex: "user",
      key: "user",
      render: (_: any, record: User) => (
        <div className="flex items-center gap-3">
          <Avatar
            size={40}
            src={record.avatar}
            icon={<UserOutlined />}
            className="flex-shrink-0"
          />
          <div className="min-w-0 flex-1">
            <div className="font-medium text-foreground truncate">
              {record.name}
            </div>
            <div className="text-sm text-muted-foreground truncate">
              {record.email}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: t("sys.user-management.role"),
      dataIndex: "role",
      key: "role",
      width: 120,
      render: (role: string) => (
        <Tag color={getRoleColor(role)}>{t(`sys.user-management.${role}`)}</Tag>
      ),
    },
    {
      title: t("sys.user-management.status"),
      dataIndex: "status",
      key: "status",
      width: 120,
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {t(`sys.user-management.${status}`)}
        </Tag>
      ),
    },
    {
      title: t("sys.user-management.created-at"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 180,
      render: (createdAt: string) => (
        <Tooltip title={new Date(createdAt).toLocaleString("vi-VN")}>
          <div className="flex items-center gap-1 text-sm">
            <CalendarOutlined className="text-muted-foreground" />
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: vi,
            })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: t("sys.user-management.email-verified"),
      dataIndex: "isEmailVerified",
      key: "isEmailVerified",
      width: 120,
      render: (isEmailVerified: boolean) => (
        <Tag color={isEmailVerified ? "green" : "orange"}>
          {isEmailVerified
            ? t("sys.user-management.verified")
            : t("sys.user-management.not-verified")}
        </Tag>
      ),
    },
    {
      title: t("sys.user-management.actions"),
      key: "actions",
      width: 100,
      render: (_: any, record: User) => (
        <Popconfirm
          title={t("sys.user-management.confirm-delete")}
          description={t(
            "sys.user-management.confirm-delete-single-description"
          )}
          onConfirm={() => onDelete(record.id)}
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

      {/* Custom Pagination */}
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
