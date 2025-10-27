import { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import { toast } from "sonner";
import { useSystemSettings } from "@/contexts/SystemSettingsContext";
import {
  UpdateSystemSettingsReq,
  updateSystemSettings,
  SystemSettings,
} from "@/api/services/profileApi";
import { useTranslation } from "react-i18next";

const { Option } = Select;
const { TextArea } = Input;

interface PreferencesTabProps {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setSystemSettings: (settings: SystemSettings) => void;
  systemSettings?: SystemSettings | null;
}

export default function PreferencesTab({
  loading,
  setLoading,
  setSystemSettings,
  systemSettings,
}: PreferencesTabProps) {
  const { t } = useTranslation();
  const [settingsForm] = Form.useForm();
  const { refreshSettings } = useSystemSettings();
  const [isChanged, setIsChanged] = useState(false);

  // Gán giá trị ban đầu vào form
  useEffect(() => {
    if (systemSettings) {
      settingsForm.setFieldsValue({
        defaultLanguage: systemSettings.defaultLanguage,
        systemName: systemSettings.systemName,
        systemDescription: systemSettings.systemDescription,
      });
      setIsChanged(false); // reset trạng thái thay đổi
    }
  }, [systemSettings, settingsForm]);

  // Kiểm tra khi giá trị form thay đổi
  const handleValuesChange = () => {
    if (!systemSettings) return;

    const currentValues = settingsForm.getFieldsValue();
    const hasChanges =
      currentValues.defaultLanguage !== systemSettings.defaultLanguage ||
      currentValues.systemName !== systemSettings.systemName ||
      currentValues.systemDescription !== systemSettings.systemDescription;

    setIsChanged(hasChanges);
  };

  const handleSystemSettingsChange = async (
    values: UpdateSystemSettingsReq
  ) => {
    try {
      setLoading(true);
      const updatedSettings = await updateSystemSettings(values);
      setSystemSettings(updatedSettings);
      await refreshSettings();

      toast.success(t("sys.profile.update-system-settings-success"));
      setIsChanged(false);
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pb-6">
      <h3 className="text-lg font-semibold mb-4">
        {t("sys.profile.preferences")}
      </h3>

      <Form
        form={settingsForm}
        layout="vertical"
        onValuesChange={handleValuesChange}
        onFinish={handleSystemSettingsChange}
      >
        <Form.Item
          name="defaultLanguage"
          label={t("sys.profile.default-language")}
        >
          <Select size="large">
            <Option value="vi">{t("sys.profile.vi")}</Option>
            <Option value="en">{t("sys.profile.en")}</Option>
          </Select>
        </Form.Item>

        <Form.Item name="systemName" label={t("sys.profile.system-name")}>
          <Input
            size="large"
            placeholder={t("sys.profile.system-name-placeholder")}
          />
        </Form.Item>

        <Form.Item
          name="systemDescription"
          label={t("sys.profile.system-description")}
        >
          <TextArea
            rows={3}
            placeholder={t("sys.profile.system-description-placeholder")}
          />
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          size="large"
          loading={loading}
          disabled={!isChanged}
        >
          ⚙️ {t("sys.profile.save-settings")}
        </Button>
      </Form>
    </div>
  );
}
