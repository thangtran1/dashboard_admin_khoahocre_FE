import React, { useState, useEffect } from "react";
import {
  Card,
  Table,
  Button,
  Space,
  Input,
  DatePicker,
  Row,
  Col,
  Typography,
  Popconfirm,
  Form,
  Divider,
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
import { Link } from "react-router";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useAdminNotifications } from "../../hooks/useAdminNotifications";
import { useTranslation } from "react-i18next";
import { Notification } from "../../types/entity";

const { RangePicker } = DatePicker;
const { Title } = Typography;

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

  const columns = [
    {
      title: t("sys.notification.id"),
      dataIndex: "_id",
      key: "_id",
      width: 150,
      ellipsis: true,
    },
    {
      title: t("sys.notification.title"),
      dataIndex: "title",
      key: "title",
      width: 200,
      ellipsis: true,
    },
    {
      title: t("sys.notification.content"),
      dataIndex: "content",
      key: "content",
      width: 200,
      ellipsis: true,
    },
    {
      title: t("sys.notification.short-description"),
      dataIndex: "shortDescription",
      key: "shortDescription",
      width: 200,
      ellipsis: true,
    },
    {
      title: t("sys.notification.image-video"),
      dataIndex: "actionUrl",
      key: "actionUrl",
      width: 200,
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
      render: (date: string) => dayjs(date).format("DD/MM/YYYY HH:mm:ss"),
    },
    {
      title: t("sys.notification.actions"),
      key: "actions",
      width: 200,
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
    <Card>
      <div style={{ marginBottom: "24px" }}>
        <div className="flex justify-between items-center">
          <Title level={3}>{t("sys.notification.management")}</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div></div>
            <Link to="/notifications/new-notification">
              <Button type="primary" icon={<PlusOutlined />} size="middle">
                {t("sys.notification.new-notification")}
              </Button>
            </Link>
          </div>
        </div>
        <Divider style={{ margin: "12px 0" }} />

        <Row gutter={16} align="middle">
          <Col span={6}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontWeight: 500,
                }}
              >
                {t("sys.notification.search")}
              </label>
              <Input
                placeholder={t("sys.notification.search-placeholder")}
                value={searchTitle}
                onChange={(e) => setSearchTitle(e.target.value)}
                prefix={<SearchOutlined />}
              />
            </div>
          </Col>
          <Col span={6}>
            <div>
              <label
                style={{
                  display: "block",
                  marginBottom: "4px",
                  fontWeight: 500,
                }}
              >
                {t("sys.notification.created-at")}
              </label>
              <RangePicker
                style={{ width: "100%" }}
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
          </Col>
          <Col span={12}>
            <div style={{ display: "flex", gap: "8px", marginTop: "24px" }}>
              <Button
                type="primary"
                onClick={handleSearch}
                icon={<SearchOutlined />}
              >
                {t("sys.notification.search")}
              </Button>
              <Button onClick={handleClearFilter}>
                {t("sys.notification.clear-filter")}
              </Button>
            </div>
          </Col>
        </Row>
      </div>

      <Table
        columns={columns}
        dataSource={notifications}
        rowKey="_id"
        loading={loading}
        pagination={{
          total: notifications.length,
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: (total, _range) =>
            `${t("sys.notification.total")} ${total} ${t(
              "sys.notification.items"
            )}`,
        }}
      />

      {/* Edit Modal */}
      <Modal
        title={t("sys.notification.edit-notification")}
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
                {t("sys.notification.cancel")}
              </Button>
              <Button type="primary" htmlType="submit">
                {t("sys.notification.update")}
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </Card>
  );
};

export default NotificationManagement;
