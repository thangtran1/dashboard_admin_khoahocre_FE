import { Button, Form, Input } from "antd";
import { toast } from "sonner";
import {
  AdminChangePasswordReq,
  adminChangePassword,
} from "@/api/services/profileApi";
import { useTranslation } from "react-i18next";
import { useState } from "react";

interface SecurityTabProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

interface FieldData {
  name: (string | number)[];
  value?: any;
  touched?: boolean;
  validating?: boolean;
  errors?: string[];
}

export default function SecurityTab({ loading, setLoading }: SecurityTabProps) {
  const { t } = useTranslation();
  const [passwordForm] = Form.useForm();
  const [isChanged, setIsChanged] = useState(false);

  const handlePasswordChange = async (values: any) => {
    try {
      setLoading(true);
      const passwordData: AdminChangePasswordReq = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
      };
      await adminChangePassword(passwordData);
      passwordForm.resetFields();
      setIsChanged(false);
      toast.success(t("sys.profile.change-password-success"));
    } catch (error) {
      const errorMessage = error?.message;
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleFieldsChange = (allFields: FieldData[]) => {
    const hasError = allFields.some((field) => (field.errors?.length ?? 0) > 0);
    const values = passwordForm.getFieldsValue();
    const allFilled = Object.values(values).every(
      (v) => v && v.toString().trim() !== ""
    );
    setIsChanged(!hasError && allFilled);
  };
  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        {t("sys.profile.change-password")}
      </h3>
      <Form
        form={passwordForm}
        layout="vertical"
        onFinish={handlePasswordChange}
        onFieldsChange={handleFieldsChange}
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

        <div className="flex justify-end">
          <Button
            color="primary"
            variant="outlined"
            htmlType="submit"
            size="large"
            loading={loading}
            disabled={!isChanged}
          >
            {t("sys.profile.change-password")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
