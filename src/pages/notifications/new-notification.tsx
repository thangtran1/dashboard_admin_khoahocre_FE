import React, { useState, useEffect } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  Typography,
  Divider,
  Breadcrumb,
} from "antd";
import { Link } from "react-router";
import { toast } from "sonner";
import { useAdminNotifications } from "../../hooks/useAdminNotifications";
import { PlusOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { Notification } from "../../types/entity";
import { NotificationType } from "@/types/enum";

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;

const NewNotification: React.FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const { createNotification } = useAdminNotifications();
  const [actionUrlFile, setActionUrlFile] = useState<string | null>(null);
  const [urlError, setUrlError] = useState<string>("");

  // Cleanup URL object khi component unmount
  useEffect(() => {
    return () => {
      if (actionUrlFile) {
        URL.revokeObjectURL(actionUrlFile);
      }
    };
  }, [actionUrlFile]);

  const validateUrl = (url: string): boolean => {
    try {
      const urlObj = new URL(url);
      return urlObj.protocol === "http:" || urlObj.protocol === "https:";
    } catch {
      return false;
    }
  };

  const handleSubmit = async (values: Notification) => {
    setLoading(true);
    try {
      console.log("Form values:", values);
      console.log("ActionUrl value:", values.actionUrl);
      console.log("ActionUrlFile state:", actionUrlFile);

      await createNotification({
        title: values.title,
        content: values.content,
        actionUrl: actionUrlFile || undefined, // Sử dụng actionUrlFile thay vì values.actionUrl
        type: values.type as NotificationType,
      });

      toast.success("Tạo thông báo thành công", {
        description: "Thông báo đã được tạo và gửi đến tất cả người dùng",
        duration: 4000,
      });
      form.resetFields();
      if (actionUrlFile) {
        URL.revokeObjectURL(actionUrlFile);
      }
      setActionUrlFile(null);
    } catch (error: any) {
      toast.error("Có lỗi xảy ra khi tạo thông báo", {
        description: error.message || "Vui lòng thử lại sau",
        duration: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSendForApproval = () => {
    form.setFieldsValue({ status: "pending" });
    form.submit();
  };

  return (
    <Card className="!bg-background">
      <Breadcrumb style={{ marginBottom: "8px" }}>
        <Breadcrumb.Item>
          <Link to="/notifications">{t("sys.notification.management")}</Link>
        </Breadcrumb.Item>
        <Breadcrumb.Item>
          {t("sys.notification.new-notification")}
        </Breadcrumb.Item>
      </Breadcrumb>

      <Title level={3}>{t("sys.notification.new-notification")}</Title>

      <Divider style={{ margin: "12px 0" }} />

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        initialValues={{
          type: "system",
        }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item
              name="type"
              label={t("sys.notification.type")}
              rules={[
                { required: true, message: "Vui lòng chọn loại thông báo" },
              ]}
            >
              <Select placeholder={t("sys.notification.select-type")}>
                <Option value="system">{t("sys.notification.system")}</Option>
                <Option value="promotion">
                  {t("sys.notification.promotion")}
                </Option>
                <Option value="maintenance">
                  {t("sys.notification.maintenance")}
                </Option>
                <Option value="update">{t("sys.notification.update")}</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Divider />

        <Title level={4} style={{ marginBottom: "16px" }}>
          {t("sys.notification.content")}
        </Title>

        <Row gutter={24}>
          <Col span={8}>
            <Form.Item
              name="actionUrl"
              label={t("sys.notification.image-video")}
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) return Promise.resolve();
                    if (validateUrl(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(t("sys.notification.url-invalid"))
                    );
                  },
                },
              ]}
            >
              <div
                style={{
                  border: "2px dashed #d9d9d9",
                  borderRadius: 8,
                  padding: 8,
                  textAlign: "center",
                  minHeight: 200,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 8,
                  position: "relative",
                }}
              >
                {actionUrlFile ? (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "relative",
                    }}
                  >
                    <img
                      src={actionUrlFile}
                      alt="preview"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "contain",
                        borderRadius: 4,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(0,0,0,0.6)",
                        color: "#fff",
                        padding: "4px 8px",
                        borderRadius: 4,
                        cursor: "pointer",
                        fontSize: 12,
                      }}
                      onClick={() => {
                        setActionUrlFile(null);
                        form.setFieldsValue({ actionUrl: undefined });
                      }}
                    >
                      Xóa
                    </div>
                  </div>
                ) : (
                  <div style={{ color: "#999" }}>
                    <PlusOutlined style={{ fontSize: 48, marginBottom: 8 }} />
                    <div>{t("sys.notification.preview-image-video")}</div>
                  </div>
                )}
              </div>

              {/* Input luôn hiển thị */}
              <Input
                placeholder={t("sys.notification.image-video-placeholder")}
                status={urlError ? "error" : ""}
                value={form.getFieldValue("actionUrl") || ""}
                onChange={(e) => {
                  const url = e.target.value.trim();
                  setUrlError("");

                  if (url) {
                    if (validateUrl(url)) {
                      setActionUrlFile(url);
                      form.setFieldsValue({ actionUrl: url });
                    } else {
                      setActionUrlFile(null);
                      form.setFieldsValue({ actionUrl: url });
                      setUrlError(t("sys.notification.url-invalid"));
                    }
                  } else {
                    setActionUrlFile(null);
                    form.setFieldsValue({ actionUrl: undefined });
                  }
                }}
              />
              {urlError && (
                <div
                  style={{
                    color: "#ff4d4f",
                    fontSize: 12,
                    marginTop: 4,
                    textAlign: "center",
                  }}
                >
                  {urlError}
                </div>
              )}
            </Form.Item>
          </Col>
          <Col span={16}>
            <div>
              <Title level={5} style={{ marginBottom: "16px" }}>
                {t("sys.notification.content")}
              </Title>

              <Form.Item
                name="title"
                label={t("sys.notification.title")}
                rules={[
                  {
                    required: true,
                    message: t("sys.notification.title-required"),
                  },
                  { max: 200, message: t("sys.notification.title-max") },
                ]}
              >
                <Input
                  placeholder={t("sys.notification.title")}
                  showCount
                  maxLength={200}
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
                  {
                    max: 2000,
                    message: t("sys.notification.content-max"),
                  },
                ]}
              >
                <TextArea
                  rows={8}
                  placeholder={t("sys.notification.content-placeholder")}
                  showCount
                  maxLength={2000}
                />
              </Form.Item>
            </div>
          </Col>
        </Row>

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
            marginTop: "24px",
            paddingTop: "24px",
            borderTop: "1px solid #f0f0f0",
          }}
        >
          <Button
            size="large"
            style={{ borderColor: "#ff4d4f", color: "#ff4d4f" }}
          >
            {t("sys.notification.cancel")}
          </Button>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            loading={loading}
            onClick={handleSendForApproval}
          >
            {t("sys.notification.add")}
          </Button>
        </div>
      </Form>
    </Card>
  );
};

export default NewNotification;
