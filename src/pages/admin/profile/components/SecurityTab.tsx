import { Button, Form, Input } from "antd";
import { toast } from "sonner";
import {
  AdminChangePasswordReq,
  adminChangePassword,
} from "@/api/services/profileApi";
import { useTranslation } from "react-i18next";

interface SecurityTabProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function SecurityTab({ loading, setLoading }: SecurityTabProps) {
  const { t } = useTranslation();
  const [passwordForm] = Form.useForm();

  const handlePasswordChange = async (values: any) => {
    try {
      setLoading(true);
      const passwordData: AdminChangePasswordReq = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      await adminChangePassword(passwordData);
      passwordForm.resetFields();
      toast.success(t("sys.profile.change-password-success"));
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        t("sys.profile.change-password-error");
      if (Array.isArray(errorMessage)) {
        toast.error(errorMessage.join(", "));
      } else {
        toast.error(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("sys.profile.change-password")}
      </h3>
      <Form
        form={passwordForm}
        layout="vertical"
        onFinish={handlePasswordChange}
      >
        <Form.Item
          name="currentPassword"
          label={t("sys.profile.current-password")}
          rules={[
            {
              required: true,
              message: t("sys.profile.current-password-error"),
            },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label={t("sys.profile.new-password")}
          rules={[
            { required: true, message: t("sys.profile.new-password-error") },
            { min: 6, message: t("sys.profile.new-password-error") },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label={t("sys.profile.confirm-password")}
          dependencies={["newPassword"]}
          rules={[
            {
              required: true,
              message: t("sys.profile.confirm-password-error"),
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error(t("sys.profile.confirm-password-error"))
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Button type="primary" htmlType="submit" size="large" loading={loading}>
          🔒 {t("sys.profile.change-password")}
        </Button>
      </Form>
    </div>
  );
}
