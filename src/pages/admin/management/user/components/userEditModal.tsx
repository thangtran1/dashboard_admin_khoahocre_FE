import { Modal, Form, Input, Select, Space, Button } from "antd";
import { useEffect } from "react";
import { Icon } from "@/components/icon";
import { User, UpdateUserReq } from "@/api/services/userManagementApi";
import { UserOutlined, MailOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Option } = Select;

interface UserEditModalProps {
  isOpen: boolean;
  editingUser: User;
  loading: boolean;
  onClose: () => void;
  onSubmit: (values: UpdateUserReq) => Promise<boolean>;
}

export default function UserEditModal({
  isOpen,
  editingUser,
  loading,
  onClose,
  onSubmit,
}: UserEditModalProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  // Set form values khi editingUser thay đổi
  useEffect(() => {
    if (isOpen && editingUser) {
      form.setFieldsValue({
        name: editingUser.name,
        email: editingUser.email,
        role: editingUser.role,
        status: editingUser.status,
        phone: editingUser.phone,
        address: editingUser.address,
        bio: editingUser.bio,
      });
    }
  }, [isOpen, editingUser, form]);

  const handleClose = () => {
    form.resetFields();
    onClose();
  };

  const handleSubmit = async (values: UpdateUserReq) => {
    try {
      return await onSubmit(values);
    } catch (error) {
      console.error("❌ handleSubmit ~ error:", error);
      return false;
    }
  };

  return (
    <Modal
      title={
        <div className="flex items-center gap-2">
          <Icon icon="lucide:edit" className="h-5 w-5 text-primary" />
          {t("sys.user-management.edit-user")}
        </div>
      }
      open={isOpen}
      onCancel={loading ? undefined : handleClose}
      closable={!loading}
      maskClosable={!loading}
      footer={null}
      width={700}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        className="mt-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="name"
            label={t("sys.user-management.name")}
            rules={[
              {
                required: true,
                message: t("sys.user-management.name-required"),
              },
              { min: 2, message: t("sys.user-management.name-min-length") },
            ]}
          >
            <Input
              size="large"
              prefix={<UserOutlined />}
              placeholder={t("sys.user-management.name")}
            />
          </Form.Item>

          <Form.Item
            name="email"
            label={t("sys.user-management.email")}
            rules={[
              {
                required: true,
                message: t("sys.user-management.email-required"),
              },
              {
                type: "email",
                message: t("sys.user-management.email-invalid"),
              },
            ]}
          >
            <Input
              size="large"
              prefix={<MailOutlined />}
              placeholder={t("sys.user-management.email")}
            />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="role"
            label={t("sys.user-management.role")}
            rules={[
              {
                required: true,
                message: t("sys.user-management.role-required"),
              },
            ]}
          >
            <Select size="large" placeholder={t("sys.user-management.role")}>
              <Option value="user">
                <Space>
                  <Icon icon="lucide:user" className="w-4 h-4" />
                  {t("sys.user-management.role-user")}
                </Space>
              </Option>
              <Option value="moderator">
                <Space>
                  <Icon icon="lucide:shield-check" className="w-4 h-4" />
                  {t("sys.user-management.role-moderator")}
                </Space>
              </Option>
              <Option value="admin">
                <Space>
                  <Icon icon="lucide:shield" className="w-4 h-4" />
                  {t("sys.user-management.role-admin")}
                </Space>
              </Option>
            </Select>
          </Form.Item>

          <Form.Item name="status" label={t("sys.user-management.status")}>
            <Select
              size="large"
              placeholder={t("sys.user-management.status")}
              defaultValue="active"
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
          </Form.Item>
        </div>

        <Form.Item name="phone" label={t("sys.user-management.phone")}>
          <Input size="large" placeholder={t("sys.user-management.phone")} />
        </Form.Item>

        <Form.Item name="address" label={t("sys.user-management.address")}>
          <Input size="large" placeholder={t("sys.user-management.address")} />
        </Form.Item>

        <Form.Item name="bio" label={t("sys.user-management.bio")}>
          <Input.TextArea rows={3} placeholder={t("sys.user-management.bio")} />
        </Form.Item>

        <div className="flex gap-3 pt-4">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            loading={loading}
            className="flex-1"
          >
            💾 {t("sys.user-management.update")}
          </Button>
          <Button size="large" onClick={handleClose} disabled={loading}>
            ❌ {t("sys.user-management.cancel")}
          </Button>
        </div>
      </Form>
    </Modal>
  );
}
