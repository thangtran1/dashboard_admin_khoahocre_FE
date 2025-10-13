import { Button, Form, Input } from "antd";
import { toast } from "sonner";
import {
  AdminChangePasswordReq,
  adminChangePassword,
} from "@/api/services/profileApi";

interface SecurityTabProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export default function SecurityTab({ loading, setLoading }: SecurityTabProps) {
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
      toast.success("Đổi mật khẩu thành công!");
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.message ||
        "Lỗi khi đổi mật khẩu";
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
      <h3 className="text-lg font-semibold mb-4">Đổi mật khẩu</h3>
      <Form
        form={passwordForm}
        layout="vertical"
        onFinish={handlePasswordChange}
      >
        <Form.Item
          name="currentPassword"
          label="Mật khẩu hiện tại"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="newPassword"
          label="Mật khẩu mới"
          rules={[
            { required: true, message: "Vui lòng nhập mật khẩu mới!" },
            { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Xác nhận mật khẩu mới"
          dependencies={["newPassword"]}
          rules={[
            { required: true, message: "Vui lòng xác nhận mật khẩu!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("newPassword") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Mật khẩu xác nhận không khớp!")
                );
              },
            }),
          ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Button type="primary" htmlType="submit" size="large" loading={loading}>
          🔒 Đổi mật khẩu
        </Button>
      </Form>
    </div>
  );
}
