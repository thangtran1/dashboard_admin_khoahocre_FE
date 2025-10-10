import React, { useState, useEffect } from "react";
import {
  Card,
  Button,
  Descriptions,
  Typography,
  Row,
  Col,
  Divider,
  Breadcrumb,
  Spin,
  Alert,
} from "antd";
import { useParams, Link } from "react-router";
import dayjs from "dayjs";
import { notificationAdminService } from "../../api/services/notificationService";
import { Notifications } from "../../types/entity";
import { NotificationType } from "../../types/enum";

const { Title, Text } = Typography;

const Notification: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [notification, setNotification] = useState<Notifications | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (id) {
      fetchNotificationDetail(id);
    }
  }, [id]);

  const fetchNotificationDetail = async (notificationId: string) => {
    setLoading(true);
    setError("");
    try {
      const response = await notificationAdminService.getById(notificationId);
      setNotification(response as unknown as Notifications);
    } catch (error: any) {
      console.error("Error fetching notification detail:", error);
      setError(error.message || "Không thể tải chi tiết thông báo");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
        <div style={{ marginTop: "16px" }}>Đang tải chi tiết thông báo...</div>
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <Alert
          message="Lỗi"
          description={error}
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => fetchNotificationDetail(id!)}>
              Thử lại
            </Button>
          }
        />
      </Card>
    );
  }

  if (!notification) {
    return (
      <Card>
        <Alert
          message="Không tìm thấy thông báo"
          description="Thông báo không tồn tại hoặc đã bị xóa"
          type="warning"
          showIcon
        />
      </Card>
    );
  }

  const typeMap: Record<string, NotificationType> = {
    system: NotificationType.SYSTEM,
    promotion: NotificationType.PROMOTION,
    maintenance: NotificationType.MAINTENANCE,
    update: NotificationType.UPDATE,
  };

  return (
    <Card>
      <Breadcrumb style={{ marginBottom: "8px" }}>
        <Breadcrumb.Item>
          <Link to="/notifications">Quản lý thông báo</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>Chi tiết thông báo</Breadcrumb.Item>
      </Breadcrumb>
      <div>
        <Title level={3}>Chi tiết thông báo</Title>
      </div>

      <Descriptions bordered column={2} size="small">
        <Descriptions.Item label="ID" span={2}>
          {notification.data._id}
        </Descriptions.Item>
        <Descriptions.Item label="Loại thông báo" span={2}>
          {typeMap[notification.data.type] || notification.data.type}
        </Descriptions.Item>
        <Descriptions.Item label="Thời gian tạo" span={2}>
          {dayjs(notification.data.createdAt).format("DD/MM/YYYY HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Cập nhật lần cuối" span={2}>
          {dayjs(notification.data.updatedAt).format("DD/MM/YYYY HH:mm:ss")}
        </Descriptions.Item>
      </Descriptions>

      <Divider />

      <Row gutter={24}>
        <Col span={8}>
          <Title level={5} style={{ marginBottom: "16px" }}>
            Hình ảnh mô tả
          </Title>
          <div
            style={{
              border: "1px solid #f0f0f0",
              borderRadius: "8px",
              padding: "16px",
              backgroundColor: "#fafafa",
            }}
          >
            <Title level={5} style={{ marginBottom: "12px" }}>
              Hình ảnh/video
            </Title>
            {notification.data.actionUrl ? (
              <div style={{ textAlign: "center" }}>
                <img
                  src={notification.data.actionUrl}
                  alt="Notification"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "200px",
                    borderRadius: "4px",
                  }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://via.placeholder.com/200x200?text=Invalid+URL";
                  }}
                />
              </div>
            ) : (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 20px",
                  color: "#999",
                }}
              >
                <div style={{ fontSize: "24px", marginBottom: "8px" }}>📷</div>
                <div>Không có hình ảnh</div>
              </div>
            )}
          </div>
        </Col>
        <Col span={16}>
          <div>
            <Title level={5} style={{ marginBottom: "16px" }}>
              Nội dung thông báo
            </Title>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Tiêu đề:</Text>
              <div
                style={{
                  marginTop: "4px",
                  padding: "8px 12px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                }}
              >
                {notification.data.title}
              </div>
            </div>

            <div style={{ marginBottom: "16px" }}>
              <Text strong>Mô tả ngắn:</Text>
              <div
                style={{
                  marginTop: "4px",
                  padding: "8px 12px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                }}
              >
                {notification.data.shortDescription}
              </div>
            </div>

            <div>
              <Text strong>Nội dung:</Text>
              <div
                style={{
                  marginTop: "4px",
                  padding: "12px",
                  backgroundColor: "#f5f5f5",
                  borderRadius: "4px",
                  whiteSpace: "pre-wrap",
                }}
              >
                {notification.data.content}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};

export default Notification;
