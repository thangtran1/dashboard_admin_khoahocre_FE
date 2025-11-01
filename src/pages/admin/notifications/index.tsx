import React, { useState, useEffect } from "react";
import {
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
const { Search } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
import {
  PlusOutlined,
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ClearOutlined,
} from "@ant-design/icons";
import { Tooltip } from "antd";
import { Link } from "react-router";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { Separator } from "@/ui/separator";
import { Icon } from "@/components/icon";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import { Notification } from "@/types/entity";
import TableAntd from "@/components/common/tables/custom-table-antd";

const NotificationManagement: React.FC = () => {
  const {
    notifications,
    loading,
    pagination,
    searchOptions,
    loadNotifications,
    updateNotification,
    deleteNotification,
    handleFilterChange,
    clearFilters,
  onPageChange,

  } = useAdminNotifications();
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs] | null>(
    null
  );
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editingNotification, setEditingNotification] =
    useState<Notification | null>(null);
  const [editForm] = Form.useForm();

  // Sync local state with searchOptions from hook
  useEffect(() => {
    setSearchText(searchOptions.search || "");
    setSelectedType(searchOptions.type || "");
    if (searchOptions.startDate && searchOptions.endDate) {
      setDateRange([
        dayjs(searchOptions.startDate),
        dayjs(searchOptions.endDate),
      ]);
    } else {
      setDateRange(null);
    }
  }, [searchOptions]);

  const handleSearchClick = () => {
    const searchParams: any = {};

    if (searchText.trim()) {
      searchParams.search = searchText.trim();
    }

    if (selectedType) {
      searchParams.type = selectedType;
    }

    if (dateRange && dateRange[0] && dateRange[1]) {
      searchParams.startDate = dateRange[0].format("YYYY-MM-DD");
      searchParams.endDate = dateRange[1].format("YYYY-MM-DD");
    }

    handleFilterChange(searchParams);
  };

  const handleClearFilter = () => {
    setSearchText("");
    setSelectedType("");
    setDateRange(null);
    clearFilters();
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
      render: (date: string) =>
        renderWithTooltip(dayjs(date).format("DD/MM/YYYY HH:mm")),
    },
    {
      title: t("sys.notification.actions"),
      key: "actions",
      width: 120,
      align: "center",
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

      <div className="pb-2">
        <div className="flex flex-col lg:flex-row lg:items-end gap-3">
          <div className="flex-1 flex flex-col sm:flex-row gap-3">
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("sys.notification.search")}
              </label>
              <Search
                placeholder={t("sys.notification.search-placeholder")}
                size="large"
                prefix={<SearchOutlined />}
                allowClear
                className="flex-[1.3]"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                onSearch={handleSearchClick}
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                {t("sys.notification.date-range")}
              </label>
              <RangePicker
                size="large"
                allowClear
                className="flex-[0.7]"
                style={{ minWidth: 220 }}
                value={dateRange}
                onChange={(dates) =>
                  setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs] | null)
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {t("sys.notification.type")}
            </label>
            <Select
              size="large"
              style={{ width: 220 }}
              allowClear
              value={selectedType || undefined} 
              onChange={setSelectedType}
              placeholder={t("sys.notification.type-placeholder")} 
            >
              <Option value="system">{t("sys.notification.system")}</Option>
              <Option value="promotion">
                {t("sys.notification.promotion")}
              </Option>
              <Option value="maintenance">
                {t("sys.notification.maintenance")}
              </Option>
              <Option value="update">{t("sys.notification.update")}</Option>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button
              danger
              icon={<ClearOutlined />}
              size="large"
              onClick={handleClearFilter}
            >
              {t("sys.notification.clear-filter")}
            </Button>
            <Button
              icon={<SearchOutlined />}
              size="large"
              color="primary"
              variant="outlined"
              onClick={handleSearchClick}
            >
              {t("sys.notification.search")}
            </Button>
          </div>
        </div>
      </div>

      <Separator />

      <div className="pb-4">
        <div className="overflow-x-auto">
          <TableAntd
            columns={columns}
            data={notifications}
            loading={loading}
            pagination={pagination}
            onPageChange={onPageChange}
            scroll={{ y: 500, x: 600 }}
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
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-600 hover:bg-blue-700"
              >
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
