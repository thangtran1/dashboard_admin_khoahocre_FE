import { adminUpdateUserPassword } from "@/api/services/userManagementApi";
import { Input, Button, Typography, Form } from "antd";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { toast } from "sonner";
import CustomConfirmModal from "@/components/common/modals/custom-modal-confirm";

const { Text } = Typography;

export default function UpdatePassword({ userId }: { userId: string }) {
  const { t } = useTranslation();
  const [passwordValid, setPasswordValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{6,}$/;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPasswordValid(passwordRegex.test(value));
    setCurrentPassword(value);
  };

  const handleConfirmUpdate = async () => {
    setModalVisible(false);
    setLoading(true);
    try {
      const response = await adminUpdateUserPassword(userId, {
        newPassword: currentPassword,
      });

      if (response.data.success) {
        toast.success(t("management.user.user-detail.update-password-success"));
        form.resetFields();
        setPasswordValid(false);
      } else {
        toast.error(t("management.user.user-detail.update-password-error"));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-card text-card-foreground p-4 flex flex-col rounded-md border shadow-sm">
      <Text strong className="text-lg mb-2 block">
        {t("management.user.user-detail.password-level-1")}
      </Text>
      <Form
        layout="horizontal"
        form={form}
        className="flex items-start gap-3 w-full"
      >
        <Form.Item
          name="newPassword"
          className="!mb-0 flex-1"
          rules={[
            {
              pattern: passwordRegex,
              message: t("management.user.user-detail.password-level-1-error"),
            },
          ]}
        >
          <Input.Password
            size="large"
            placeholder={t(
              "management.user.user-detail.password-level-1-placeholder"
            )}
            onChange={handleInputChange}
            className="rounded-lg"
          />
        </Form.Item>

        <Form.Item className="!mb-0">
          <Button
            type="primary"
            size="large"
            disabled={!passwordValid}
            loading={loading}
            onClick={() => setModalVisible(true)}
          >
            {t("management.user.user-detail.update")}
          </Button>
        </Form.Item>
      </Form>

      <CustomConfirmModal
        title={t("modal-confirm.confirm-update-password")}
        description={t("modal-confirm.confirm-update-password-message")}
        visible={modalVisible}
        password={currentPassword}
        onConfirm={handleConfirmUpdate}
        onCancel={() => setModalVisible(false)}
      />
    </div>
  );
}
