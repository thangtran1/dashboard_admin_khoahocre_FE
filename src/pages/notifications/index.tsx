import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Space,
  Input,
  DatePicker,
  Popconfirm,
  Form,
  Modal,
  Tag,
  Select,
} from "antd";
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { Link } from "react-router";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useAdminNotifications } from "../../hooks/useAdminNotifications";
import { useTranslation } from "react-i18next";
import { Notification } from "../../types/entity";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Separator } from "@/ui/separator";
import { Icon } from "@/components/icon";
import { Label } from "@/ui/label";

const { RangePicker } = DatePicker;

const NotificationManagement: React.FC = () => {
  const {
    notifications,
    loading,
    isAdmin,
    loadNotifications,
    updateNotification,
    deleteNotification,
  } = useAdminNotifications();
  const { t } = useTranslation();
  const [searchTitle, setSearchTitle] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingNotification, setEditingNotification] =
    useState<Notification | null>(null);
  const [editForm] = Form.useForm();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    if (isAdmin) {
      loadNotifications();
    }
  }, [isAdmin, loadNotifications]);

  const handleSearch = () => {
    // Implement search logic
    console.log("Searching:", { searchTitle, dateRange });
  };

  const handleClearFilter = () => {
    setSearchTitle("");
    setDateRange(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteNotification(id);
      toast.success(t("sys.notification.delete-notification-success"), {
        description: t("sys.notification.delete-notification-description"),
        duration: 3000,
      });
    } catch (error: any) {
      toast.error(t("sys.notification.delete-notification-error"), {
        description:
          error.message ||
          t("sys.notification.delete-notification-error-description"),
        duration: 3000,
      });
    }
  };

  const handleEdit = (record: Notification) => {
    setEditingNotification(record);
    editForm.setFieldsValue(record);
    setEditModalVisible(true);
  };

  const handleEditModalSubmit = async (values: any) => {
    try {
      if (editingNotification) {
        await updateNotification(editingNotification._id, values);
        await loadNotifications();
      }

      setEditModalVisible(false);
      editForm.resetFields();
      setEditingNotification(null);

      toast.success(t("sys.notification.update-notification-success"), {
        description: t("sys.notification.update-notification-description"),
        duration: 3000,
      });
    } catch (error: any) {
      toast.error(t("sys.notification.update-notification-error"), {
        description:
          error.message ||
          t("sys.notification.update-notification-error-description"),
        duration: 3000,
      });
    }
  };

  const handleEditModalCancel = () => {
    setEditModalVisible(false);
    editForm.resetFields();
    setEditingNotification(null);
  };


  const renderWithTooltip = (text?: string) =>
  text ? (
    <Tooltip placement="topLeft" title={text}>
      <span className="truncate block max-w-[140px]">{text}</span>
    </Tooltip>
  ) : (
    "-"
  );

  const columns = [
    {
      title: t("sys.notification.id"),
      dataIndex: "_id",
      key: "_id",
      width: 120,
      ellipsis: true,
      render: (text: string) => renderWithTooltip(text),
    },
    {
      title: t("sys.notification.title"),
      dataIndex: "title",
      key: "title",
      width: 150,
      ellipsis: true,
      render: (text: string) => renderWithTooltip(text),
    },
    {
      title: t("sys.notification.content"),
      dataIndex: "content",
      key: "content",
      width: 150,
      ellipsis: true,
      render: (text: string) => renderWithTooltip(text),
          },
    {
      title: t("sys.notification.short-description"),
      dataIndex: "shortDescription",
      key: "shortDescription",
      width: 150,
      ellipsis: true,
      render: (text: string) => renderWithTooltip(text),
          },
    {
      title: t("sys.notification.image-video"),
      dataIndex: "actionUrl",
      key: "actionUrl",
      width: 150,
      ellipsis: true,
      render: (url: string) => {
        if (!url) return null;

        return (
          <img
            src={url}
            alt="preview"
            style={{
              width: "100px",
              maxHeight: "100px",
              objectFit: "contain",
              borderRadius: 4,
            }}
          />
        );
      },
    },

    {
      title: t("sys.notification.type"),
      dataIndex: "type",
      key: "type",
      width: 120,
      render: (type: string) => (
        <Tag color={type === "system" ? "blue" : "green"}>
          {type === "system" ? t("sys.notification.system") : type}
        </Tag>
      ),
    },
    {
      title: t("sys.notification.read-by-users"),
      dataIndex: "readByUsers",
      key: "readByUsers",
      width: 120,
      render: (readByUsers?: string[]) => readByUsers?.length || 0,
    },
    {
      title: t("sys.notification.created-at"),
      dataIndex: "createdAt",
      key: "createdAt",
      width: 150,
      render: (date: string) => renderWithTooltip(dayjs(date).format("DD/MM/YYYY HH:mm:ss")),
    },
    {
      title: t("sys.notification.actions"),
      key: "actions",
      width: 150,
      render: (record: Notification) => {
        return (
          <Space>
            <Link to={`/notifications/${record._id}`}>
              <Button type="text" icon={<EyeOutlined />} />
            </Link>
            <Button
              type="text"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
            <Popconfirm
              title={t("sys.notification.delete-notification")}
              onConfirm={() => handleDelete(record._id)}
              okText={t("sys.notification.delete-notification")}
              cancelText={t("sys.notification.cancel")}
            >
              <Button type="text" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  // Tính toán thống kê
  const totalNotifications = notifications.length;
  const systemNotifications = notifications.filter(n => n.type === "system").length;
  const totalReadByUsers = notifications.reduce((sum, n) => sum + (n.readByUsers?.length || 0), 0);

  return (
    <div className="bg-card text-card-foreground px-6 flex flex-col gap-6 rounded-xl border shadow-sm">
      {/* Header */}
      <div className="pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              🔔 {t("sys.notification.management")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("sys.notification.management-description")}
            </p>
          </div>
          <Link to="/notifications/new-notification">
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {t("sys.notification.new-notification")}
            </Button>
          </Link>
        </div>
      </div>
      <Separator />

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              {t("sys.notification.total-notifications")}
            </CardTitle>
            <div className="p-2 bg-primary rounded-full">
              <Icon
                icon="lucide:bell"
                className="h-4 w-4 text-white"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {totalNotifications}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("sys.notification.total-notifications-description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              {t("sys.notification.system-notifications")}
            </CardTitle>
            <div className="p-2 bg-green-500 rounded-full">
              <Icon icon="lucide:shield-check" className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {systemNotifications}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("sys.notification.system-notifications-description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              {t("sys.notification.total-reads")}
            </CardTitle>
            <div className="p-2 bg-purple-500 rounded-full">
              <Icon icon="lucide:users" className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {totalReadByUsers}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("sys.notification.total-reads-description")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bộ lọc */}
      <div className="py-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Icon icon="lucide:filter" className="h-5 w-5 text-blue-600" />
          {t("sys.notification.filter")}
        </h2>
        <Separator className="my-4" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label className="text-sm font-semibold text-muted-foreground">
              {t("sys.notification.search")}
            </Label>
            <Input
              placeholder={t("sys.notification.search-placeholder")}
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              prefix={<SearchOutlined />}
              size="large"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-muted-foreground">
              {t("sys.notification.created-at")}
            </Label>
            <RangePicker
              style={{ width: "100%" }}
              size="large"
              placeholder={[
                t("sys.notification.created-at-placeholder"),
                t("sys.notification.created-at-placeholder"),
              ]}
              value={dateRange}
              onChange={(dates) =>
                setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs])
              }
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-semibold text-muted-foreground invisible">
              Actions
            </Label>
            <div className="flex gap-2">
              <Button
                type="primary"
                onClick={handleSearch}
                icon={<SearchOutlined />}
                size="large"
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t("sys.notification.search")}
              </Button>
              <Button onClick={handleClearFilter} size="large">
                {t("sys.notification.clear-filter")}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Separator />

      {/* Danh sách thông báo */}
      <div className="pb-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2 mb-4">
          <Icon icon="lucide:list" className="h-5 w-5 text-blue-600" />
          {t("sys.notification.notification-list")} ({totalNotifications})
        </h2>
        <Separator className="my-4" />

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            dataSource={notifications}
            rowKey="_id"
            loading={loading}
            scroll={{ x: 1500 }}
            pagination={{
              current: currentPage,
              pageSize: pageSize,
              total: totalNotifications,
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: ['5', '10', '20', '50'],
              onChange: (page, size) => {
                setCurrentPage(page);
                setPageSize(size);
              },
              showTotal: (total, range) =>
                `${t("sys.notification.showing")} ${range[0]}-${range[1]} ${t("sys.notification.of")} ${total} ${t("sys.notification.items")}`,
            }}
          />
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <Icon icon="lucide:edit" className="h-5 w-5 text-blue-600" />
            {t("sys.notification.edit-notification")}
          </div>
        }
        open={editModalVisible}
        onCancel={handleEditModalCancel}
        footer={null}
        width={600}
      >
        <Form
          form={editForm}
          layout="vertical"
          onFinish={handleEditModalSubmit}
        >
          <Form.Item
            name="title"
            label={t("sys.notification.title")}
            rules={[
              { required: true, message: t("sys.notification.title-required") },
              { max: 100, message: t("sys.notification.title-max") },
            ]}
          >
            <Input placeholder={t("sys.notification.title-placeholder")} />
          </Form.Item>

          <Form.Item
            name="shortDescription"
            label={t("sys.notification.short-description")}
            rules={[
              {
                required: true,
                message: t("sys.notification.short-description-required"),
              },
              {
                max: 200,
                message: t("sys.notification.short-description-max"),
              },
            ]}
          >
            <Input.TextArea
              placeholder={t("sys.notification.short-description-placeholder")}
              rows={3}
              maxLength={200}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="content"
            label={t("sys.notification.content")}
            rules={[
              {
                required: true,
                message: t("sys.notification.content-required"),
              },
              { max: 2000, message: t("sys.notification.content-max") },
            ]}
          >
            <Input.TextArea
              placeholder={t("sys.notification.content-placeholder")}
              rows={3}
              maxLength={2000}
              showCount
            />
          </Form.Item>

          <Form.Item
            name="type"
            label={t("sys.notification.type")}
            rules={[
              { required: true, message: t("sys.notification.type-required") },
            ]}
          >
            <Select
              placeholder={t("sys.notification.type-placeholder")}
              options={[
                { value: "system", label: t("sys.notification.system") },
                { value: "promotion", label: t("sys.notification.promotion") },
                {
                  value: "maintenance",
                  label: t("sys.notification.maintenance"),
                },
                { value: "update", label: t("sys.notification.update") },
              ]}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, textAlign: "right" }}>
            <Space>
              <Button onClick={handleEditModalCancel}>
                ❌ {t("sys.notification.cancel")}
              </Button>
              <Button type="primary" htmlType="submit" className="bg-blue-600 hover:bg-blue-700">
                💾 {t("sys.notification.update")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default NotificationManagement;
