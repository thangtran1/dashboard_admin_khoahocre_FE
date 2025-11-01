import { Form, Input, Select, Space, Button } from "antd";
import { Icon } from "@/components/icon";
import { CreateUserReq, createUser } from "@/api/services/userManagementApi";
import { UserOutlined, MailOutlined, KeyOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";

const { Option } = Select;

interface SingleCreateFormProps {
  onSuccess?: () => void;
}

export default function SingleCreateForm({ onSuccess }: SingleCreateFormProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: CreateUserReq) => {
    try {
      setLoading(true);
      const response = await createUser(values);

      if (response.data.success) {
        toast.success(t("sys.user-management.create-success"));
        form.resetFields();
        onSuccess?.();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-4"
      initialValues={{
        role: "user",
        status: "active",
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

      <Form.Item
        name="password"
        label={t("sys.user-management.password")}
        rules={[
          {
            required: true,
            message: t("sys.user-management.password-required"),
          },
          { min: 6, message: t("sys.user-management.password-min-length") },
        ]}
      >
        <Input.Password
          size="large"
          prefix={<KeyOutlined />}
          placeholder={t("sys.user-management.password")}
        />
      </Form.Item>

      <Form.Item name="phone" label={t("sys.user-management.phone")}>
        <Input size="large" placeholder={t("sys.user-management.phone")} />
      </Form.Item>

      <Form.Item name="address" label={t("sys.user-management.address")}>
        <Input size="large" placeholder={t("sys.user-management.address")} />
      </Form.Item>

      <Form.Item name="bio" label={t("sys.user-management.bio")}>
        <Input.TextArea rows={3} placeholder={t("sys.user-management.bio")} />
      </Form.Item>

      <div className="flex justify-end gap-4 pt-6">
        <Button danger size="large" onClick={() => form.resetFields()}>
          <Icon icon="lucide:x-circle" className="h-5 w-5" />
          {t("sys.user-management.cancel")}
        </Button>
        <Button type="primary" htmlType="submit" size="large" loading={loading}>
          <Icon icon="lucide:check-circle" className="h-5 w-5" />
          {t("sys.user-management.create")}
        </Button>
      </div>
    </Form>
  );
}
