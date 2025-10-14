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
import { useTranslation } from "react-i18next";

interface PasswordFormData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function SecurityTab() {
  const { t } = useTranslation();
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
      const loadingToast = toast.loading(t("userProfile.loading-password"), {
        description: t("userProfile.please-wait"),
      });

      const passwordData = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };

      await changePassword(passwordData);

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      toast.success(t("userProfile.password-updated-success"), {
        description: t("userProfile.password-updated-success-description"),
        duration: 3000,
      });

      passwordForm.resetFields();
      setPasswordStrength(0);
    } catch (error: any) {
      toast.error(t("userProfile.password-updated-error"), {
        description:
          error.message || t("userProfile.please-check-current-password"),
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
              {t("userProfile.security-status")}
            </h3>
            <p className="text-muted-foreground">
              {t("userProfile.security-status-description")}
            </p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                ✅ {t("userProfile.strong-password")}
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                🔐 {t("userProfile.secure-login")}
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
                {t("userProfile.change-password")}
              </h3>
              <p className="text-muted-foreground">
                {t("userProfile.change-password-description")}
              </p>
            </div>
          </div>

          <Alert
            message={t("userProfile.security-tips")}
            description={t("userProfile.security-tips-description")}
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
                {t("userProfile.current-password")}
              </span>
            }
            rules={[
              {
                required: true,
                message: t("userProfile.please-enter-current-password"),
              },
            ]}
          >
            <Input.Password
              size="large"
              placeholder={t("userProfile.current-password")}
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
                {t("userProfile.new-password")}
              </span>
            }
            rules={[
              {
                required: true,
                message: t("userProfile.please-enter-new-password"),
              },
              {
                min: 6,
                message: t(
                  "userProfile.password-must-be-at-least-6-characters"
                ),
              },
            ]}
          >
            <div>
              <Input.Password
                size="large"
                placeholder={t("userProfile.new-password")}
                className="rounded-lg"
                onChange={handleNewPasswordChange}
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
              {passwordStrength > 0 && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm text-foreground">
                      {t("userProfile.password-strength")}:
                    </span>
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
                {t("userProfile.confirm-new-password")}
              </span>
            }
            dependencies={["newPassword"]}
            rules={[
              {
                required: true,
                message: t("userProfile.please-confirm-new-password"),
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      t("userProfile.password-confirmation-does-not-match")
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              size="large"
              placeholder={t("userProfile.confirm-new-password")}
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
              🔐 {t("userProfile.update-password")}
            </Button>
          </div>
        </Form>
      </Card>

      {/* Security Tips */}
      <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
        <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
          💡{t("userProfile.security-tips")}
        </h3>
        <ul className=" flex gap-3 flex-col text-sm text-foreground">
          <li className="flex items-start gap-2">
            <span className="text-foreground ">✓</span>
            <span>{t("userProfile.use-unique-password-for-each-account")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">✓</span>
            <span>{t("userProfile.change-password-periodically")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">✓</span>
            <span>{t("userProfile.do-not-share-password-with-anyone")}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-foreground">✓</span>
            <span>
              {t("userProfile.use-password-manager-to-store-securely")}
            </span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
