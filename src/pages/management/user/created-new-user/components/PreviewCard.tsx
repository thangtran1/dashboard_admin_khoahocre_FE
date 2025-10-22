import { Card, Table, Alert, Button, Divider } from "antd";
import { Icon } from "@/components/icon";
import { PreviewUser } from "@/types/entity";
import { useTranslation } from "react-i18next";

interface PreviewCardProps {
  users: PreviewUser[];
  onConfirm: () => void;
  onBack: () => void;
  loading: boolean;
}

export default function PreviewCard({
  users,
  onConfirm,
  onBack,
  loading,
}: PreviewCardProps) {
  const { t } = useTranslation();
  const validUsers = users.filter((user) => user.isValid);
  const invalidUsers = users.filter((user) => !user.isValid);
  const canProceed = invalidUsers.length === 0;

  const columns = [
    {
      title: t("sys.user-management.row"),
      dataIndex: "row",
      key: "row",
      width: 60,
      render: (row: number) => (
        <span className="font-mono text-xs text-foreground px-2 py-1 rounded">
          {row}
        </span>
      ),
    },
    {
      title: t("sys.user-management.name"),
      dataIndex: "name",
      key: "name",
      width: 150,
      render: (name: string) => <span className="font-medium">{name}</span>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 200,
      render: (email: string) => (
        <span className="font-mono text-sm">{email}</span>
      ),
    },
    {
      title: t("sys.user-management.role"),
      dataIndex: "role",
      key: "role",
      width: 100,
      render: (role: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            role === "admin"
              ? "bg-red-100 text-red-800"
              : role === "moderator"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {role}
        </span>
      ),
    },
    {
      title: t("sys.user-management.status"),
      dataIndex: "status",
      key: "status",
      width: 100,
      render: (status: string) => (
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            status === "active"
              ? "bg-green-100 text-green-800"
              : status === "inactive"
              ? "bg-yellow-100 text-yellow-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      ),
    },
    {
      title: t("sys.user-management.result"),
      key: "validation",
      width: 120,
      render: (record: PreviewUser) =>
        record.isValid ? (
          <div className="flex items-center gap-1 text-green-600">
            <Icon icon="lucide:check-circle" className="h-4 w-4" />
            <span className="text-xs font-medium">
              {t("sys.user-management.valid")}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-error">
            <Icon icon="lucide:x-circle" className="h-4 w-4" />
            <span className="text-xs font-medium">
              {t("sys.user-management.error")}
            </span>
          </div>
        ),
    },
    {
      title: t("sys.user-management.error-details"),
      dataIndex: "error",
      key: "error",
      render: (error: string) =>
        error ? (
          <span className="text-red-600 text-xs">{error}</span>
        ) : (
          <span className="text-green-600 text-xs">✓</span>
        ),
    },
  ];

  return (
    <Card className="border-0 shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {t("sys.user-management.preview-data")}
        </h2>
        <p className="text-muted-foreground">
          {t("sys.user-management.check-data-before-creating-users")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center">
              <Icon icon="lucide:users" className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-800">
                {users.length}
              </div>
              <div className="text-sm text-blue-600">
                {t("sys.user-management.total-users-description")}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`border rounded-lg p-4 ${
            canProceed
              ? "bg-green-50 border-green-200"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                canProceed ? "bg-success" : "bg-muted-foreground"
              }`}
            >
              <Icon
                icon="lucide:check-circle"
                className="h-5 w-5 text-background"
              />
            </div>
            <div>
              <div
                className={`text-2xl font-bold ${
                  canProceed ? "text-green-800" : "text-gray-700"
                }`}
              >
                {validUsers.length}
              </div>
              <div
                className={`text-sm ${
                  canProceed ? "text-green-600" : "text-gray-500"
                }`}
              >
                {t("sys.user-management.valid")}
              </div>
            </div>
          </div>
        </div>

        <div
          className={`border rounded-lg p-4 ${
            invalidUsers.length > 0
              ? "bg-red-50 border-red-200"
              : "bg-gray-50 border-gray-200"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                invalidUsers.length > 0 ? "bg-error" : "bg-muted-foreground"
              }`}
            >
              <Icon
                icon="lucide:x-circle"
                className="h-5 w-5 text-background"
              />
            </div>
            <div>
              <div
                className={`text-2xl font-bold ${
                  invalidUsers.length > 0 ? "text-red-800" : "text-gray-700"
                }`}
              >
                {invalidUsers.length}
              </div>
              <div
                className={`text-sm ${
                  invalidUsers.length > 0 ? "text-red-600" : "text-gray-500"
                }`}
              >
                {t("sys.user-management.error")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {canProceed ? (
        <Alert
          message={t("sys.user-management.all-data-valid")}
          description={t(
            "sys.user-management.can-continue-to-create-all-users"
          )}
          type="success"
          showIcon
          className="mb-6"
        />
      ) : (
        <Alert
          message={t("sys.user-management.error-title")}
          description={`${invalidUsers.length} ${t(
            "sys.user-management.error-description"
          )}`}
          type="error"
          showIcon
          className="mb-6"
        />
      )}

      <Divider />

      <div className="mb-6">
        <Table
          columns={columns}
          dataSource={users}
          rowKey={(record) => `${record.row}-${record.email}`}
          pagination={{
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) =>
              `${range[0]}-${range[1]} ${t(
                "sys.user-management.of"
              )} ${total} ${t("sys.user-management.users")}`,
          }}
          size="small"
          scroll={{ x: 800 }}
          rowClassName={(record) => (record.isValid ? "" : "bg-blue-600")}
        />
      </div>

      <div className="flex gap-4 justify-center pt-4">
        <Button size="large" onClick={onBack} className="min-w-[140px]">
          <Icon icon="lucide:refresh-cw" className="h-5 w-5" />
          {t("sys.user-management.reload-file")}
        </Button>
        <Button
          type="primary"
          size="large"
          loading={loading}
          disabled={!canProceed}
          onClick={onConfirm}
          className="min-w-[140px]"
        >
          {!canProceed
            ? `${t("sys.user-management.cannot-create")} (${
                invalidUsers.length
              } ${t("sys.user-management.error")})`
            : `${t("sys.user-management.creates")} ${users.length} ${t(
                "sys.user-management.users"
              )}`}
        </Button>
      </div>
    </Card>
  );
}
