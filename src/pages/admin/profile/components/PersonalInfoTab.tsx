import { useState, useEffect } from "react";
import { Button, Avatar, Form, Input, DatePicker, Upload, message } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  EditOutlined,
  CameraOutlined,
} from "@ant-design/icons";
import { toast } from "sonner";
import {
  UserProfile,
  UpdateProfileReq,
  updateUserProfile,
  uploadAvatar,
} from "@/api/services/profileApi";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

const { TextArea } = Input;

interface PersonalInfoTabProps {
  profile: UserProfile | null;
  loading: boolean;
  onProfileUpdate: (profile: UserProfile) => void;
}

export default function PersonalInfoTab({
  profile,
  loading,
  onProfileUpdate,
}: PersonalInfoTabProps) {
  const { t } = useTranslation();
  const [profileForm] = Form.useForm();
  const [uploading, setUploading] = useState(false);
  const [isChanged, setIsChanged] = useState(false);

  // Gán dữ liệu ban đầu khi có profile
  useEffect(() => {
    if (profile) {
      profileForm.setFieldsValue({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        bio: profile.bio,
        dateOfBirth: profile.dateOfBirth ? dayjs(profile.dateOfBirth) : null,
      });
      setIsChanged(false); // reset trạng thái thay đổi
    }
  }, [profile, profileForm]);

  // So sánh giá trị form với profile để biết có thay đổi không
  const handleValuesChange = () => {
    if (!profile) return;

    const currentValues = profileForm.getFieldsValue();
    const hasChanges =
      currentValues.name !== profile.name ||
      currentValues.phone !== profile.phone ||
      currentValues.address !== profile.address ||
      currentValues.bio !== profile.bio ||
      (currentValues.dateOfBirth &&
        dayjs(currentValues.dateOfBirth).format("YYYY-MM-DD") !==
          dayjs(profile.dateOfBirth).format("YYYY-MM-DD"));

    setIsChanged(hasChanges);
  };

  const handleSave = async (values: UpdateProfileReq) => {
    try {
      const updatedProfile = await updateUserProfile({
        ...values,
        dateOfBirth: values.dateOfBirth
          ? dayjs(values.dateOfBirth).toISOString()
          : undefined,
      });
      onProfileUpdate(updatedProfile);

      // Force refresh profile cache
      window.dispatchEvent(
        new CustomEvent("profileUpdated", { detail: updatedProfile })
      );

      toast.success(t("sys.profile.update-profile-success"));
      setIsChanged(false);
    } catch (error) {
      throw error;
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      setUploading(true);
      const avatarUrl = await uploadAvatar(file);

      const updatedProfile = await updateUserProfile({ avatar: avatarUrl });
      onProfileUpdate(updatedProfile);

      window.dispatchEvent(
        new CustomEvent("profileUpdated", { detail: updatedProfile })
      );

      toast.success(t("sys.profile.update-avatar-success"));
      return false;
    } catch (error) {
      throw error;
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isValidType = file.type === "image/jpeg" || file.type === "image/png";
    const isValidSize = file.size / 1024 / 1024 < 2;

    if (!isValidType) {
      message.error(t("sys.profile.upload-file-error"));
      return false;
    }
    if (!isValidSize) {
      message.error(t("sys.profile.upload-file-size-error"));
      return false;
    }

    handleAvatarUpload(file);
    return false;
  };

  const avatarUrl = profile?.avatar
    ? `${import.meta.env.VITE_API_URL}${profile.avatar}`
    : undefined;

  return (
    <div className="pb-6">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative">
          <Avatar size={80} icon={<UserOutlined />} src={avatarUrl} />
          <Upload
            showUploadList={false}
            beforeUpload={beforeUpload}
            accept="image/*"
          >
            <Button
              shape="circle"
              size="small"
              icon={<CameraOutlined />}
              className="absolute bottom-0 right-0"
              loading={uploading}
            />
          </Upload>
        </div>
        <div>
          <h3 className="text-lg font-semibold">
            {profile?.name || t("sys.profile.loading")}
          </h3>
          <p className="text-muted-foreground">
            {profile?.email || t("sys.profile.loading")}
          </p>
          <p className="text-sm text-muted-foreground">
            {profile?.role === "admin"
              ? t("sys.profile.role-admin")
              : profile?.role === "moderator"
              ? t("sys.profile.role-moderator")
              : t("sys.profile.role-user")}
          </p>
        </div>
      </div>

      <Form
        form={profileForm}
        layout="vertical"
        onValuesChange={handleValuesChange}
        onFinish={handleSave}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item
            name="name"
            label={t("sys.profile.name")}
            rules={[
              { required: true, message: t("sys.profile.name-required") },
            ]}
          >
            <Input size="large" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item name="email" label={t("sys.profile.email")}>
            <Input size="large" prefix={<MailOutlined />} disabled />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="phone" label={t("sys.profile.phone")}>
            <Input size="large" prefix={<PhoneOutlined />} />
          </Form.Item>

          <Form.Item name="dateOfBirth" label={t("sys.profile.date-of-birth")}>
            <DatePicker size="large" className="w-full" format="YYYY-MM-DD" />
          </Form.Item>
        </div>

        <Form.Item name="address" label={t("sys.profile.address")}>
          <Input size="large" prefix={<HomeOutlined />} />
        </Form.Item>

        <Form.Item name="bio" label={t("sys.profile.bio")}>
          <TextArea rows={4} placeholder={t("sys.profile.bio-placeholder")} />
        </Form.Item>

        <div className="flex gap-3 pt-4">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            icon={<EditOutlined />}
            loading={loading}
            disabled={!isChanged}
          >
            💾 {t("sys.profile.update-profile")}
          </Button>
        </div>
      </Form>
    </div>
  );
}
