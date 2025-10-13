import {
  Table,
  Checkbox,
  Avatar,
  Select,
  Space,
  Button,
  Tooltip,
  Popconfirm,
} from "antd";
import { Icon } from "@/components/icon";
import { User } from "@/api/services/userManagementApi";
import { UserOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Option } = Select;

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
  onUpdateRole: (id: string, role: string) => void;
  onUpdateStatus: (id: string, status: string) => void;
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
  onUpdateRole,
  onUpdateStatus,
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
      render: (_: any, user: User) => (
        <Checkbox
          checked={selectedUsers.includes(user.id)}
          onChange={(e) => onSelectUser(user.id, e.target.checked)}
        />
      ),
    },
    {
      title: t("sys.user-management.user-info"),
      key: "user",
      render: (_: any, user: User) => (
        <div className="flex items-center gap-3">
          <Avatar src={user.avatar} icon={<UserOutlined />} size={40} />
          <div>
            <div className="font-semibold text-foreground">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: t("sys.user-management.role"),
      key: "role",
      render: (_: any, user: User) => (
        <Select
          value={user.role}
          onChange={(value) => onUpdateRole(user.id, value)}
          size="middle"
          style={{ width: 120 }}
        >
          <Option value="user">{t("sys.user-management.role-user")}</Option>
          <Option value="moderator">
            {t("sys.user-management.role-moderator")}
          </Option>
          <Option value="admin">{t("sys.user-management.role-admin")}</Option>
        </Select>
      ),
    },
    {
      title: t("sys.user-management.status"),
      key: "status",
      render: (_: any, user: User) => (
        <Select
          value={user.status || "active"}
          onChange={(value) => onUpdateStatus(user.id, value)}
          size="middle"
          style={{ width: 120 }}
        >
          <Option value="active">
            {t("sys.user-management.status-active")}
          </Option>
          <Option value="inactive">
            {t("sys.user-management.status-inactive")}
          </Option>
          <Option value="banned">
            {t("sys.user-management.status-banned")}
          </Option>
        </Select>
      ),
    },
    {
      title: t("sys.user-management.info"),
      key: "info",
      render: (_: any, user: User) => (
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
      render: (_: any, user: User) => (
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
              icon="lucide:users-x"
              className="h-16 w-16 mx-auto text-muted-foreground mb-4"
            />
            <p className="text-lg font-semibold text-foreground">
              {t("sys.user-management.no-users-found")}
            </p>
            <p className="text-muted-foreground mt-2">
              {t("sys.user-management.no-users-description")}
            </p>
          </div>
        ),
      }}
    />
  );
}
