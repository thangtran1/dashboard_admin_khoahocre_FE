import {
  Table,
  Checkbox,
  Avatar,
  Space,
  Button,
  Tooltip,
  Popconfirm,
  Tag,
} from "antd";
import { Icon } from "@/components/icon";
import { User } from "@/api/services/userManagementApi";
import { UserOutlined, UndoOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

interface DeletedUserTableProps {
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
  onRestore: (id: string) => void;
  onDelete: (id: string) => void;
  onPageChange: (page: number, pageSize?: number) => void;
}

export default function DeletedUserTable({
  users,
  loading,
  selectedUsers,
  pagination,
  onSelectUser,
  onSelectAll,
  onRestore,
  onDelete,
  onPageChange,
}: DeletedUserTableProps) {
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
          <Avatar src={user.avatar} icon={<UserOutlined />} size={40} />
          <div>
            <div className="font-semibold text-foreground flex items-center gap-2">
              {user.name}
              <Tag color="red" className="text-xs">
                {t("sys.user-management.deleted")}
              </Tag>
            </div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: t("sys.user-management.role"),
      key: "role",
      render: (_: React.ReactNode, user: User) => (
        <Tag color="blue">{t(`sys.user-management.role-${user.role}`)}</Tag>
      ),
    },
    {
      title: t("sys.user-management.status"),
      key: "status",
      render: (_: React.ReactNode, user: User) => (
        <Tag color="default">
          {t(`sys.user-management.status-${user.status || "active"}`)}
        </Tag>
      ),
    },
    {
      title: t("sys.user-management.info"),
      key: "info",
      render: (_: React.ReactNode, user: User) => (
        <div className="text-sm text-muted-foreground">
          {user.phone && <div>📞 {user.phone}</div>}
          <div>📅 {new Date(user.createdAt).toLocaleDateString("vi-VN")}</div>
        </div>
      ),
    },
    {
      title: t("sys.user-management.actions"),
      key: "actions",
      width: 120,
      render: (_: React.ReactNode, user: User) => (
        <Space>
          <Popconfirm
            title={t("sys.user-management.confirm-restore")}
            description={t("sys.user-management.confirm-restore-description")}
            onConfirm={() => onRestore(user.id)}
            okText={t("sys.user-management.restore")}
            cancelText={t("sys.user-management.cancel")}
          >
            <Tooltip title={t("sys.user-management.restore")}>
              <Button
                type="text"
                size="middle"
                icon={<UndoOutlined />}
                className="text-green-600 hover:bg-green-50"
              />
            </Tooltip>
          </Popconfirm>

          <Popconfirm
            title={t("sys.user-management.confirm-permanent-delete")}
            description={t(
              "sys.user-management.confirm-permanent-delete-description"
            )}
            onConfirm={() => onDelete(user.id)}
            okText={t("sys.user-management.delete")}
            cancelText={t("sys.user-management.cancel")}
            okButtonProps={{ danger: true }}
          >
            <Tooltip title={t("sys.user-management.permanent-delete")}>
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
    <Table
      columns={columns}
      dataSource={users}
      rowKey="id"
      loading={loading}
      pagination={{
        current: pagination.page,
        pageSize: pagination.limit,
        total: pagination.total,
        showSizeChanger: true,
        showQuickJumper: true,
        showTotal: (total, range) =>
          t("sys.user-management.pagination-total", {
            start: range[0],
            end: range[1],
            total,
          }),
        onChange: onPageChange,
        onShowSizeChange: onPageChange,
      }}
      scroll={{ x: 800 }}
      locale={{
        emptyText: (
          <div className="py-12 text-center">
            <Icon
              icon="lucide:trash-2"
              className="h-16 w-16 mx-auto text-muted-foreground mb-4"
            />
            <p className="text-lg font-semibold text-foreground">
              {t("sys.user-management.no-deleted-users-found")}
            </p>
            <p className="text-muted-foreground mt-2">
              {t("sys.user-management.no-deleted-users-description")}
            </p>
          </div>
        ),
      }}
    />
  );
}
