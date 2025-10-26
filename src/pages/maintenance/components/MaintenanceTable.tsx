import {
  Table,
  Checkbox,
  Tag,
  Space,
  Button,
  Tooltip,
  Popconfirm,
  Badge,
} from "antd";
import {
  DeleteOutlined,
  PlayCircleOutlined,
  StopOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  CalendarOutlined,
  ClockCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  Maintenance,
  MaintenanceStatus,
  MaintenanceType,
  UpdateMaintenanceDto,
} from "@/api/services/maintenanceApi";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { Icon } from "@/components/icon";
import { useState } from "react";
import MaintenanceModal from "./MaintenanceModal";

interface MaintenanceTableProps {
  maintenances: Maintenance[];
  loading: boolean;
  selectedMaintenances: string[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onSelectMaintenance: (id: string, checked: boolean) => void;
  onSelectAll: (checked: boolean) => void;
  onDetail: (maintenance: Maintenance) => void;
  onDelete: (id: string) => void;
  onStartNow: (id: string) => void;
  onStop: (id: string) => void;
  onCancel: (id: string) => void;
  onPageChange: (page: number, pageSize?: number) => void;
  onUpdate: (id: string, values: UpdateMaintenanceDto) => Promise<boolean>;
}

export default function MaintenanceTable({
  maintenances,
  loading,
  selectedMaintenances,
  pagination,
  onSelectMaintenance,
  onSelectAll,
  onDetail,
  onDelete,
  onStartNow,
  onStop,
  onCancel,
  onPageChange,
  onUpdate,
}: MaintenanceTableProps) {
  const [editingMaintenance, setEditingMaintenance] =
    useState<Maintenance | null>(null);
  const { t } = useTranslation();

  const getStatusConfig = (status: MaintenanceStatus) => {
    switch (status) {
      case MaintenanceStatus.SCHEDULED:
        return {
          color: "blue",
          icon: "lucide:calendar-clock",
          textClass: "text-blue-700",
        };
      case MaintenanceStatus.IN_PROGRESS:
        return {
          color: "orange",
          icon: "lucide:settings",
          textClass: "text-orange-700",
        };
      case MaintenanceStatus.COMPLETED:
        return {
          color: "green",
          icon: "lucide:check-circle",
          textClass: "text-green-700",
        };
      case MaintenanceStatus.CANCELLED:
        return {
          color: "red",
          icon: "lucide:x-circle",
          textClass: "text-red-700",
        };
      default:
        return {
          color: "default",
          icon: "lucide:circle",
          textClass: "text-gray-700",
        };
    }
  };

  const getTypeConfig = (type: MaintenanceType) => {
    switch (type) {
      case MaintenanceType.DATABASE:
        return { color: "purple", icon: "lucide:database" };
      case MaintenanceType.SYSTEM:
        return { color: "cyan", icon: "lucide:settings" };
      case MaintenanceType.NETWORK:
        return { color: "geekblue", icon: "lucide:network" };
      case MaintenanceType.OTHER:
        return { color: "default", icon: "lucide:more-horizontal" };
      default:
        return { color: "default", icon: "lucide:circle" };
    }
  };

  const renderActions = (maintenance: Maintenance) => {
    const { status, _id } = maintenance;

    return (
      <Space size="small">
        <Tooltip title={t("sys.maintenance.detail")}>
          <Button
            type="text"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => onDetail(maintenance)}
            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
          />
        </Tooltip>

        {status === MaintenanceStatus.SCHEDULED && (
          <>
            <Tooltip title={t("sys.maintenance.start-now")}>
              <Popconfirm
                title={t("sys.maintenance.confirm-start")}
                description={t("sys.maintenance.confirm-start-description")}
                onConfirm={() => onStartNow(_id)}
                okText={t("sys.maintenance.start")}
                cancelText={t("sys.maintenance.cancel-action")}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<PlayCircleOutlined />}
                  className="text-green-600 hover:text-green-700 hover:bg-green-50"
                />
              </Popconfirm>
            </Tooltip>

            <Tooltip title={t("sys.maintenance.cancel-maintenance")}>
              <Popconfirm
                title={t("sys.maintenance.confirm-cancel")}
                description={t("sys.maintenance.confirm-cancel-description")}
                onConfirm={() => onCancel(_id)}
                okText={t("sys.maintenance.confirm")}
                cancelText={t("sys.maintenance.cancel-action")}
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<CloseCircleOutlined />}
                  className="text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                />
              </Popconfirm>
            </Tooltip>

            <Tooltip title={t("sys.maintenance.edit")}>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => setEditingMaintenance(maintenance)}
                className="text-yellow-600 hover:bg-yellow-50"
              />
            </Tooltip>
          </>
        )}

        {status === MaintenanceStatus.IN_PROGRESS && (
          <>
            <Tooltip title={t("sys.maintenance.stop")}>
              <Popconfirm
                title={t("sys.maintenance.confirm-stop")}
                description={t("sys.maintenance.confirm-stop-description")}
                onConfirm={() => onStop(_id)}
                okText={t("sys.maintenance.stop")}
                cancelText={t("sys.maintenance.cancel-action")}
                okButtonProps={{ danger: true }}
              >
                <Button
                  type="text"
                  size="small"
                  icon={<StopOutlined />}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                />
              </Popconfirm>
            </Tooltip>
          </>
        )}

        {(status === MaintenanceStatus.COMPLETED ||
          status === MaintenanceStatus.CANCELLED) && (
          <Popconfirm
            title={t("sys.maintenance.confirm-delete")}
            description={t("sys.maintenance.confirm-delete-description")}
            onConfirm={() => onDelete(_id)}
            okText={t("sys.maintenance.delete")}
            cancelText={t("sys.maintenance.cancel-action")}
            okButtonProps={{ danger: true }}
          >
            <Tooltip title={t("sys.maintenance.delete")}>
              <Button
                type="text"
                size="small"
                danger
                icon={<DeleteOutlined />}
                className="hover:bg-red-50"
              />
            </Tooltip>
          </Popconfirm>
        )}
      </Space>
    );
  };

  const columns = [
    {
      title: (
        <Checkbox
          checked={
            selectedMaintenances.length === maintenances.length &&
            maintenances.length > 0
          }
          indeterminate={
            selectedMaintenances.length > 0 &&
            selectedMaintenances.length < maintenances.length
          }
          onChange={(e) => onSelectAll(e.target.checked)}
        />
      ),
      key: "select",
      width: 50,
      fixed: "left" as const,
      render: (_: React.ReactNode, maintenance: Maintenance) => (
        <Checkbox
          checked={selectedMaintenances.includes(maintenance._id)}
          onChange={(e) =>
            onSelectMaintenance(maintenance._id, e.target.checked)
          }
        />
      ),
    },
    {
      title: (
        <span className="font-semibold">
          {t("sys.maintenance.maintenance-info")}
        </span>
      ),
      key: "info",
      width: 300,
      fixed: "left" as const,
      render: (_: React.ReactNode, maintenance: Maintenance) => {
        const statusConfig = getStatusConfig(maintenance.status);
        return (
          <div className="py-2">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-lg bg-muted border border-border`}>
                <Icon
                  icon={statusConfig.icon}
                  className={`h-5 w-5  ${statusConfig.textClass}`}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-foreground text-base mb-1 line-clamp-1">
                  {maintenance.title}
                </div>
                {maintenance.description && (
                  <div className="text-sm text-muted-foreground line-clamp-2 mb-2">
                    {maintenance.description}
                  </div>
                )}
                <div className="flex items-center gap-2 flex-wrap">
                  {maintenance.isActive && (
                    <Badge
                      status="processing"
                      text={
                        <span className="text-xs font-medium">
                          {t("sys.maintenance.active")}
                        </span>
                      }
                    />
                  )}
                  {maintenance.autoAdjusted && (
                    <Tag color="blue" className="text-xs">
                      <Icon icon="lucide:zap" className="h-3 w-3 inline mr-1" />
                      {t("sys.maintenance.auto-adjusted")}
                    </Tag>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: <span className="font-semibold">{t("sys.maintenance.type")}</span>,
      key: "type",
      width: 120,
      render: (_: React.ReactNode, maintenance: Maintenance) => {
        const typeConfig = getTypeConfig(maintenance.type);
        return (
          <Tag color={typeConfig.color} className="font-medium">
            <Icon icon={typeConfig.icon} className="h-3 w-3 inline mr-1" />
            {t(`sys.maintenance.type-${maintenance.type}`)}
          </Tag>
        );
      },
    },
    {
      title: (
        <span className="font-semibold">{t("sys.maintenance.status")}</span>
      ),
      key: "status",
      width: 120,
      render: (_: React.ReactNode, maintenance: Maintenance) => {
        const statusConfig = getStatusConfig(maintenance.status);
        return (
          <Tag
            color={statusConfig.color}
            className="font-medium text-xs px-3 py-1"
          >
            <Icon icon={statusConfig.icon} className="h-3 w-3 inline mr-1" />
            {t(`sys.maintenance.status-${maintenance.status}`)}
          </Tag>
        );
      },
    },
    {
      title: (
        <span className="font-semibold">{t("sys.maintenance.schedule")}</span>
      ),
      key: "time",
      width: 150,
      render: (_: React.ReactNode, maintenance: Maintenance) => (
        <div className="text-sm space-y-1">
          <div className="flex items-center gap-2">
            <CalendarOutlined className="text-green-600" />
            <span className="font-medium text-green-700">
              {new Date(maintenance.startTime).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <ClockCircleOutlined className="text-red-600" />
            <span className="font-medium text-red-700">
              {new Date(maintenance.endTime).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <Icon icon="lucide:clock" className="h-3 w-3" />
            {maintenance.duration
              ? `${
                  maintenance.duration > 60
                    ? Math.round(maintenance.duration / 60) + " giờ"
                    : Math.round(maintenance.duration) + " phút"
                }`
              : `${Math.round(
                  (new Date(maintenance.endTime).getTime() -
                    new Date(maintenance.startTime).getTime()) /
                    (1000 * 60)
                )} phút`}
          </div>
        </div>
      ),
    },

    {
      title: (
        <span className="font-semibold">{t("sys.maintenance.created-at")}</span>
      ),
      key: "createdAt",
      width: 120,
      render: (_: React.ReactNode, maintenance: Maintenance) => (
        <Tooltip
          title={new Date(maintenance.createdAt).toLocaleString("vi-VN")}
        >
          <div className="text-sm">
            <div className="text-muted-foreground">
              {formatDistanceToNow(new Date(maintenance.createdAt), {
                addSuffix: true,
                locale: vi,
              })}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              {new Date(maintenance.createdAt).toLocaleDateString("vi-VN")}
            </div>
          </div>
        </Tooltip>
      ),
    },
    {
      title: (
        <span className="font-semibold text-center block">
          {t("sys.maintenance.actions")}
        </span>
      ),
      key: "actions",
      width: 120,
      fixed: "right" as const,
      render: (_: React.ReactNode, maintenance: Maintenance) => (
        <div className="flex justify-center">{renderActions(maintenance)}</div>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <MaintenanceModal
        isOpen={!!editingMaintenance}
        maintenance={editingMaintenance}
        onClose={() => setEditingMaintenance(null)}
        onUpdate={onUpdate}
      />
      <Table
        columns={columns}
        dataSource={maintenances}
        rowKey="_id"
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: pagination.total,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, range) =>
            `${range[0]}-${range[1]} ${t("sys.maintenance.of")} ${total} ${t(
              "sys.maintenance.items"
            )}`,
          onChange: onPageChange,
          onShowSizeChange: onPageChange,
          pageSizeOptions: ["10", "20", "50", "100"],
          className: "px-4 py-4",
        }}
        scroll={{ x: 1400, y: 600 }}
        className="maintenance-table"
        rowClassName={() => {
          return `hover:bg-muted cursor-pointer transition-colors`;
        }}
        locale={{
          emptyText: (
            <div className="py-16">
              <Icon
                icon="lucide:inbox"
                className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4"
              />
              <p className="text-base font-medium text-muted-foreground">
                {t("sys.maintenance.no-data")}
              </p>
            </div>
          ),
        }}
      />
    </div>
  );
}
