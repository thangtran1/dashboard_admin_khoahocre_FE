import { useState } from "react";
import { Button, Form, Input } from "antd";
import { toast } from "sonner";
import { changePassword } from "@/api/services/profileApi";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { FullPageLoading } from "@/components/common/loading";

interface ChangePasswordReq {
  currentPassword: string;
  newPassword: string;
  confirmPassword?: string;
}

export default function SecurityTab() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isChanged, setIsChanged] = useState(false);

  const { mutateAsync: submitChangePassword, isPending } = useMutation({
    mutationFn: (data: ChangePasswordReq) => changePassword({ currentPassword: data.currentPassword, newPassword: data.newPassword }),
    onSuccess: () => {
      form.resetFields();
      setIsChanged(false);
      toast.success(t("profile.password-updated-success"));
    },
    onError: (error: Error) => {
      toast.error(error.message || t("profile.password-updated-error"));
    },
  });

  const handleSubmit = async (values: ChangePasswordReq) => {
    await submitChangePassword(values);
  };

  const handleFieldsChange = (allFields: any[]) => {
    const hasError = allFields.some((f) => (f.errors?.length ?? 0) > 0);
    const values = form.getFieldsValue();
    const allFilled = Object.values(values).every((v) => v && v.toString().trim() !== "");
    setIsChanged(!hasError && allFilled);
  };

  return (
    <div>
      {isPending && <FullPageLoading message={t("profile.loading-password")} />}

      <h3 className="text-lg font-semibold mb-4">{t("profile.change-password")}</h3>

      <Form form={form} layout="vertical" onFinish={handleSubmit} onFieldsChange={handleFieldsChange}>
        <Form.Item
           name="currentPassword"
           label={t("profile.current-password")}
           rules={[
             { required: true, message: t("profile.current-password-error") },
           ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
        name="newPassword"
        label={t("profile.new-password")}
        rules={[
          { required: true, message: t("profile.new-password-error") },
          { min: 6, message: t("profile.new-password-error") },
        ]}
      >
          <Input.Password size="large" />
        </Form.Item>

        <Form.Item
           name="confirmPassword"
           label={t("profile.confirm-password")}
           dependencies={["newPassword"]}
           rules={[
             { required: true, message: t("profile.confirm-password-error") },
             ({ getFieldValue }) => ({
               validator(_, value) {
                 if (!value || getFieldValue("newPassword") === value) {
                   return Promise.resolve();
                 }
                 return Promise.reject(
                   new Error(t("profile.confirm-password-error"))
                 );
               },
             }),
           ]}
        >
          <Input.Password size="large" />
        </Form.Item>

        <div className="flex justify-end">
          <Button type="primary" htmlType="submit" size="large" loading={isPending} disabled={!isChanged}>
          {t("profile.change-password")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
