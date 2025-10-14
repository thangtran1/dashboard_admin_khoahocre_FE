import { useState } from "react";
import { Form, Input, Button, Alert, Card, Progress } from "antd";
import {
  LockOutlined,
  EyeInvisibleOutlined,
  EyeTwoTone,
  SafetyOutlined,
} from "@ant-design/icons";
import { changePassword } from "@/api/services/profileApi";
import { toast } from "sonner";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SecurityTab() {
  const [passwordForm] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 20;
    if (password.length >= 8) strength += 20;
    if (/[a-z]/.test(password)) strength += 20;
    if (/[A-Z]/.test(password)) strength += 20;
    if (/[0-9]/.test(password)) strength += 10;
    if (/[^A-Za-z0-9]/.test(password)) strength += 10;
    return Math.min(strength, 100);
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 40) return "#ff4d4f";
    if (strength < 70) return "#faad14";
    return "#52c41a";
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 40) return "Yếu";
    if (strength < 70) return "Trung bình";
    return "Mạnh";
  };

  const handlePasswordChange = async (values: PasswordFormData) => {
    try {
      setLoading(true);

      // Show loading toast
      const loadingToast = toast.loading("🔐 Đang cập nhật mật khẩu...", {
        description: "Vui lòng đợi trong giây lát",
      });

      const passwordData = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      await changePassword(passwordData);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      toast.success("🔐 Đổi mật khẩu thành công!", {
        description: "Mật khẩu của bạn đã được cập nhật",
        duration: 3000,
      });

      passwordForm.resetFields();
      setPasswordStrength(0);
    } catch (error: any) {
      toast.error("❌ Đổi mật khẩu thất bại", {
        description: error.message || "Vui lòng kiểm tra lại mật khẩu hiện tại",
        duration: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleNewPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setPasswordStrength(calculatePasswordStrength(password));
  };

  return (
    <div className="max-w-3xl">
      {/* Security Status */}
      <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-full">
            <SafetyOutlined className="text-2xl text-green-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Trạng thái bảo mật
            </h3>
            <p className="text-muted-foreground">
              Tài khoản của bạn được bảo vệ tốt
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✅ Mật khẩu mạnh
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                🔐 Đăng nhập an toàn
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Password Change Form */}
      <Card>
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-100 rounded-lg">
              <LockOutlined className="text-xl text-red-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Đổi mật khẩu
              </h3>
              <p className="text-muted-foreground">
                Cập nhật mật khẩu để bảo vệ tài khoản
              </p>
            </div>
          </div>

          <Alert
            message="Lời khuyên bảo mật"
            description="Sử dụng mật khẩu có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt."
            type="info"
            showIcon
            className="mb-6"
          />
        </div>

        <Form
          form={passwordForm}
          layout="vertical"
          onFinish={handlePasswordChange}
          autoComplete="off"
          className="space-y-4"
        >
          <Form.Item
            name="currentPassword"
            label={
              <span className="text-foreground font-medium">
                <LockOutlined className="mr-2 text-foreground" />
                Mật khẩu hiện tại
              </span>
            }
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu hiện tại!" },
            ]}
          >
            <Input.Password
              size="large"
              placeholder="Nhập mật khẩu hiện tại"
              className="rounded-lg"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <Form.Item
            name="newPassword"
            label={
              <span className="text-foreground font-medium">
                <SafetyOutlined className="mr-2 text-primary" />
                Mật khẩu mới
              </span>
            }
            rules={[
              { required: true, message: "Vui lòng nhập mật khẩu mới!" },
              { min: 6, message: "Mật khẩu phải có ít nhất 6 ký tự!" },
            ]}
          >
            <div>
              <Input.Password
                size="large"
                placeholder="Nhập mật khẩu mới"
                className="rounded-lg"
                onChange={handleNewPasswordChange}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {passwordStrength > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-foreground">Độ mạnh:</span>
                    <span
                      className="text-sm font-medium"
                      style={{
                        color: getPasswordStrengthColor(passwordStrength),
                      }}
                    >
                      {getPasswordStrengthText(passwordStrength)}
                    </span>
                  </div>
                  <Progress
                    percent={passwordStrength}
                    strokeColor={getPasswordStrengthColor(passwordStrength)}
                    showInfo={false}
                    size="small"
                  />
                </div>
              )}
            </div>
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label={
              <span className="text-foreground font-medium">
                <LockOutlined className="mr-2 text-primary" />
                Xác nhận mật khẩu mới
              </span>
            }
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Vui lòng xác nhận mật khẩu mới!" },
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
            <Input.Password
              size="large"
              placeholder="Nhập lại mật khẩu mới"
              className="rounded-lg"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>

          <div className="pt-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}
              className="w-full h-12 rounded-lg bg-gradient-to-r from-primary to-primary border-0 font-medium text-lg shadow-lg hover:from-primary hover:to-primary"
              icon={<LockOutlined />}
            >
              🔐 Cập nhật mật khẩu
            </Button>
          </div>
        </Form>
      </Card>

      {/* Security Tips */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          💡Mẹo bảo mật
        </h3>
        <ul className=" flex gap-3 flex-col text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="text-foreground ">✓</span>
            <span>Sử dụng mật khẩu duy nhất cho mỗi tài khoản</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">✓</span>
            <span>Thay đổi mật khẩu định kỳ (3-6 tháng một lần)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">✓</span>
            <span>Không chia sẻ mật khẩu với bất kỳ ai</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">✓</span>
            <span>Sử dụng trình quản lý mật khẩu để lưu trữ an toàn</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
