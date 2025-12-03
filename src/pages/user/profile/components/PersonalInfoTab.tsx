import { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Row, Col } from "antd";
import { UserOutlined, PhoneOutlined, HomeOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import { useMutation } from "@tanstack/react-query";
import { UserProfile, updateUserProfile } from "@/api/services/profileApi";

const { TextArea } = Input;

interface UpdateProfileReq {
  name?: string;
  phone?: string;
  address?: string;
  bio?: string;
  dateOfBirth?: string;
}

interface PersonalInfoTabProps {
  profile: UserProfile | null;
  onProfileUpdate: (profile: UserProfile) => void;
}

export default function PersonalInfoTab({ profile, onProfileUpdate }: PersonalInfoTabProps) {
  const { t } = useTranslation();
  const [form] = Form.useForm<UpdateProfileReq>();
  const [isChanged, setIsChanged] = useState(false);

  useEffect(() => {
    if (profile) {
      form.resetFields();
      setIsChanged(false);
    }
  }, [profile]);

  const { mutateAsync: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (values: UpdateProfileReq) => updateUserProfile(values),
    onSuccess: (updated) => {
      onProfileUpdate(updated); // update ở index
      toast.success(t("profile.update-profile-success"));
      setIsChanged(false);
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });

  const handleSave = async (values: UpdateProfileReq) => {
    await updateProfile({
      ...values,
      dateOfBirth: values.dateOfBirth ? dayjs(values.dateOfBirth).toISOString() : undefined,
    });
  };

  const handleValuesChange = () => {
    if (!profile) return;
    const values = form.getFieldsValue();
    const changed =
      values.name !== profile.name ||
      values.phone !== profile.phone ||
      values.address !== profile.address ||
      values.bio !== profile.bio ||
      (values.dateOfBirth && !dayjs(values.dateOfBirth).isSame(dayjs(profile.dateOfBirth), "day"));
    setIsChanged(Boolean(changed));
  };

  return (
    <Form
      form={form}
      layout="vertical"
      initialValues={{
        ...profile,
        dateOfBirth: profile?.dateOfBirth ? dayjs(profile.dateOfBirth) : null,
      }}
      onValuesChange={handleValuesChange}
      onFinish={handleSave}
    >
      <Row gutter={16}>
        <Col xs={24} md={12}>
          <Form.Item
            name="name"
            label={t("profile.name")}
            rules={[{ required: true, message: t("profile.name-required") }]}
          >
            <Input size="large" prefix={<UserOutlined />} />
          </Form.Item>
        </Col>
        <Col xs={24} md={12}>
          <Form.Item name="phone" label={t("profile.phone")}>
            <Input size="large" prefix={<PhoneOutlined />} />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="dateOfBirth" label={t("profile.date-of-birth")}>
        <DatePicker size="large" className="w-full" format="YYYY-MM-DD" />
      </Form.Item>

      <Form.Item name="address" label={t("profile.address")}>
        <Input size="large" prefix={<HomeOutlined />} />
      </Form.Item>

      <Form.Item name="bio" label={t("profile.bio")}>
        <TextArea size="large" rows={4} />
      </Form.Item>

      <div className="flex justify-end">
        <Button size="large" type="primary" htmlType="submit" disabled={!isChanged} loading={isUpdating}>
          {t("profile.update-profile")}
        </Button>
      </div>
    </Form>
  );
}
