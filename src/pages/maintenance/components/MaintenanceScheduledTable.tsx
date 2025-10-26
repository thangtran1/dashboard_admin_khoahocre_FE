import {
  Table,
  Tag,
  Checkbox,
  Pagination,
  Tooltip,
  Button,
  Popconfirm,
  Space,
} from "antd";
import {
  CalendarOutlined,
  PlayCircleOutlined,
  CloseCircleOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import {
  Maintenance,
  MaintenanceType,
  MaintenanceStatus,
  UpdateMaintenanceDto,
} from "@/api/services/maintenanceApi";
import MaintenanceModal from "./MaintenanceModal";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useState } from "react";

interface MaintenanceScheduledTableProps {
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
  onStartNow: (id: string) => void;
  onCancel: (id: string) => void;
  onPageChange: (page: number, pageSize?: number) => void;
  onUpdate: (id: string, values: UpdateMaintenanceDto) => Promise<boolean>;
}

export default function MaintenanceScheduledTable({
  maintenances,
  loading,
  selectedMaintenances,
  pagination,
  onSelectMaintenance,
  onSelectAll,
  onDetail,
  onStartNow,
  onCancel,
  onPageChange,
  onUpdate,
}: MaintenanceScheduledTableProps) {
  const [editingMaintenance, setEditingMaintenance] =
    useState<Maintenance | null>(null);
  const { t } = useTranslation();
  const getTypeColor = (type: MaintenanceType) => {
    switch (type) {
      case MaintenanceType.DATABASE:
        return "purple";
      case MaintenanceType.SYSTEM:
        return "cyan";
      case MaintenanceType.NETWORK:
        return "geekblue";
      case MaintenanceType.OTHER:
        return "default";
      default:
        return "default";
    }
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
      dataIndex: "select",
      key: "select",
      width: 50,
      render: (_: any, record: Maintenance) => (
        <Checkbox
          checked={selectedMaintenances.includes(record._id)}
          onChange={(e) => onSelectMaintenance(record._id, e.target.checked)}
        />
      ),
    },
    {
      title: t("sys.maintenance.title"),
      dataIndex: "title",
      key: "title",
      render: (_: any, record: Maintenance) => (
        <div>
          <div className="font-medium text-foreground">{record.title}</div>
          {record.description && (
            <div className="text-sm text-muted-foreground line-clamp-1">
              {record.description}
            </div>
          )}
        </div>
      ),
    },
    {
      title: t("sys.maintenance.type"),
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: MaintenanceType) => (
        <Tag color={getTypeColor(type)}>
          {t(`sys.maintenance.type-${type}`)}
        </Tag>
      ),
    },
    {
      title: t("sys.maintenance.scheduled-time"),
      dataIndex: "startTime",
      key: "startTime",
      width: 180,
      render: (startTime: string, record: Maintenance) => (
        <Tooltip
          title={`${new Date(startTime).toLocaleString("vi-VN")} - ${new Date(
            record.endTime
          ).toLocaleString("vi-VN")}`}
        >
          <div className="flex items-center gap-1 text-sm">
            <CalendarOutlined className="text-muted-foreground" />
            <div>
              <div>{new Date(startTime).toLocaleDateString("vi-VN")}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(startTime).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            </div>
          </div>
        </Tooltip>
      ),
    },
    {
      title: t("sys.maintenance.duration"),
      key: "duration",
      width: 100,
      render: (_: any, record: Maintenance) => {
        const duration =
          record.duration ||
          (new Date(record.endTime).getTime() -
            new Date(record.startTime).getTime()) /
            (1000 * 60);
        return (
          <div className="text-sm">
            {duration > 60
              ? `${Math.round(duration / 60)}h`
              : `${Math.round(duration)}m`}
          </div>
        );
      },
    },
    {
      title: t("sys.maintenance.created-at"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (createdAt: string) => (
        <Tooltip title={new Date(createdAt).toLocaleString("vi-VN")}>
          <div className="text-sm text-muted-foreground">
            {formatDistanceToNow(new Date(createdAt), {
              addSuffix: true,
              locale: vi,
            })}
          </div>
        </Tooltip>
      ),
    },
    {
      title: t("sys.maintenance.actions"),
      key: "actions",
      width: 180,
      render: (_: any, record: Maintenance) => (
        <Space>
          <Tooltip title={t("sys.maintenance.detail")}>
            <Button
              type="text"
              size="small"
              icon={<EyeOutlined />}
              onClick={() => onDetail(record)}
              className="text-blue-600 hover:bg-blue-50"
            />
          </Tooltip>

          {record.status === MaintenanceStatus.SCHEDULED && (
            <Tooltip title={t("sys.maintenance.edit")}>
              <Button
                type="text"
                size="small"
                icon={<EditOutlined />}
                onClick={() => setEditingMaintenance(record)}
                className="text-yellow-600 hover:bg-yellow-50"
              />
            </Tooltip>
          )}

          <Tooltip title={t("sys.maintenance.start-now")}>
            <Popconfirm
              title={t("sys.maintenance.confirm-start")}
              description={t("sys.maintenance.confirm-start-description")}
              onConfirm={() => onStartNow(record._id)}
              okText={t("sys.maintenance.start")}
              cancelText={t("sys.maintenance.cancel-action")}
            >
              <Button
                type="text"
                size="small"
                icon={<PlayCircleOutlined />}
                className="text-green-600 hover:bg-green-50"
              />
            </Popconfirm>
          </Tooltip>

          <Tooltip title={t("sys.maintenance.cancel-maintenance")}>
            <Popconfirm
              title={t("sys.maintenance.confirm-cancel")}
              description={t("sys.maintenance.confirm-cancel-description")}
              onConfirm={() => onCancel(record._id)}
              okText={t("sys.maintenance.confirm")}
              cancelText={t("sys.maintenance.cancel-action")}
              okButtonProps={{ danger: true }}
            >
              <Button
                type="text"
                size="small"
                icon={<CloseCircleOutlined />}
                className="text-orange-600 hover:bg-orange-50"
              />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-card rounded-lg border">
      <Table
        columns={columns}
        dataSource={maintenances}
        loading={loading}
        rowKey="_id"
        pagination={false}
        scroll={{ x: 1000 }}
        className="maintenance-table"
      />

      {/* Custom Pagination */}
      <div className="justify-end flex p-4 border-t">
        <Pagination
          current={pagination.page}
          total={pagination.total}
          pageSize={pagination.limit}
          onChange={onPageChange}
          showSizeChanger
          showQuickJumper
          pageSizeOptions={["10", "20", "50", "100"]}
          showTotal={(total, range) =>
            t("sys.maintenance.pagination-total", {
              start: range[0],
              end: range[1],
              total,
            })
          }
        />
      </div>

      {/* Edit Modal */}
      <MaintenanceModal
        isOpen={!!editingMaintenance}
        maintenance={editingMaintenance}
        onClose={() => setEditingMaintenance(null)}
        onUpdate={onUpdate}
      />
    </div>
  );
}
