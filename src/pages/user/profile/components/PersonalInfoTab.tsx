import { useState, useEffect } from "react";
import { Button, Avatar, Form, Input, DatePicker, Upload, Card } from "antd";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  HomeOutlined,
  CameraOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import {
  updateUserProfile,
  uploadAvatar,
  UserProfile,
} from "@/api/services/profileApi";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

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
      setIsChanged(false);
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
          ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
          : undefined,
      });

      onProfileUpdate(updatedProfile);

      // Dispatch event để cập nhật các component khác
      window.dispatchEvent(
        new CustomEvent("profileUpdated", { detail: updatedProfile })
      );

      toast.success(t("userProfile.update-profile-success"), {
        description: t("userProfile.update-profile-success-description"),
        duration: 3000,
      });
      setIsChanged(false);
    } catch (error: any) {
      toast.error(t("userProfile.update-profile-error"), {
        description: error.message || t("userProfile.please-try-again"),
        duration: 4000,
      });
      throw error;
    }
  };

  const handleAvatarUpload = async (file: File) => {
    try {
      setUploading(true);

      // Show loading toast
      const loadingToast = toast.loading(t("userProfile.uploading-avatar"), {
        description: t("userProfile.please-wait"),
      });

      const avatarUrl = await uploadAvatar(file);
      const updatedProfile = await updateUserProfile({ avatar: avatarUrl });

      // Dismiss loading toast
      toast.dismiss(loadingToast);

      // Update profile locally (không reload page)
      onProfileUpdate(updatedProfile);

      // Dispatch events để cập nhật header và các component khác
      window.dispatchEvent(
        new CustomEvent("profileUpdated", { detail: updatedProfile })
      );
      window.dispatchEvent(
        new CustomEvent("avatarUpdated", { detail: { avatar: avatarUrl } })
      );

      toast.success(t("userProfile.update-avatar-success"), {
        description: t("userProfile.update-avatar-success-description"),
        duration: 3000,
      });

      return false;
    } catch (error: any) {
      toast.error(t("userProfile.upload-avatar-error"), {
        description: error.message || t("userProfile.please-try-again"),
        duration: 4000,
      });
      return false;
    } finally {
      setUploading(false);
    }
  };

  const beforeUpload = (file: File) => {
    const isValidType = file.type === "image/jpeg" || file.type === "image/png";
    const isValidSize = file.size / 1024 / 1024 < 2;

    if (!isValidType) {
      toast.error(t("userProfile.only-upload-jpg-png"));
      return false;
    }
    if (!isValidSize) {
      toast.error(t("userProfile.avatar-must-be-less-than-2mb"));
      return false;
    }

    handleAvatarUpload(file);
    return false;
  };

  const avatarUrl = profile?.avatar
    ? `${import.meta.env.VITE_API_URL}${profile.avatar}`
    : undefined;

  return (
    <div className="space-y-6">
      {/* Avatar Section */}
      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-200">
        <div className="flex items-center gap-6">
          <div className="relative">
            <Avatar
              size={100}
              icon={<UserOutlined />}
              src={avatarUrl}
              className="border-4 border-white shadow-lg"
            />
            <Upload
              showUploadList={false}
              beforeUpload={beforeUpload}
              accept="image/*"
            >
              <Button
                shape="circle"
                size="large"
                icon={<CameraOutlined />}
                className="absolute -bottom-8 right-8 shadow-lg bg-blue-500 border-blue-500 text-white hover:bg-blue-600"
                loading={uploading}
              />
            </Upload>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">
              {profile?.name || t("userProfile.user")}
            </h3>
            <p className="text-muted-foreground mb-2">{profile?.email}</p>
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {profile?.role === "admin"
                  ? "👑 " + t("userProfile.admin")
                  : profile?.role === "moderator"
                  ? "🛡️ " + t("userProfile.moderator")
                  : "👤 " + t("userProfile.user")}
              </span>
              {profile?.isEmailVerified && (
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  ✅ {t("userProfile.verified")}
                </span>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Form Section */}
      <Card>
        <Form
          form={profileForm}
          layout="vertical"
          onValuesChange={handleValuesChange}
          onFinish={handleSave}
          className="space-y-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="name"
              label={
                <span className="text-foreground font-medium">
                  <UserOutlined className="mr-2 text-blue-500" />
                  {t("userProfile.name")}
                </span>
              }
              rules={[
                { required: true, message: t("userProfile.name-required") },
              ]}
            >
              <Input
                size="large"
                placeholder={t("userProfile.name-placeholder")}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="email"
              label={
                <span className="text-foreground font-medium">
                  <MailOutlined className="mr-2 text-green-500" />
                  {t("userProfile.email")}
                </span>
              }
            >
              <Input size="large" disabled className="rounded-lg bg-gray-50" />
            </Form.Item>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item
              name="phone"
              label={
                <span className="text-foreground font-medium">
                  <PhoneOutlined className="mr-2 text-purple-500" />
                  {t("userProfile.phone")}
                </span>
              }
            >
              <Input
                size="large"
                placeholder={t("userProfile.phone-placeholder")}
                className="rounded-lg"
              />
            </Form.Item>

            <Form.Item
              name="dateOfBirth"
              label={
                <span className="text-foreground font-medium">
                  🎂 {t("userProfile.date-of-birth")}
                </span>
              }
            >
              <DatePicker
                size="large"
                className="w-full rounded-lg"
                format="DD/MM/YYYY"
                placeholder={t("userProfile.date-of-birth-placeholder")}
              />
            </Form.Item>
          </div>

          <Form.Item
            name="address"
            label={
              <span className="text-foreground font-medium">
                <HomeOutlined className="mr-2 text-orange-500" />
                {t("userProfile.address")}
              </span>
            }
          >
            <Input
              size="large"
              placeholder={t("userProfile.address-placeholder")}
              className="rounded-lg"
            />
          </Form.Item>

          <Form.Item
            name="bio"
            label={
              <span className="text-foreground font-medium">
                📝 {t("userProfile.bio")}
              </span>
            }
          >
            <TextArea
              rows={4}
              placeholder={t("userProfile.bio-placeholder")}
              className="rounded-lg"
            />
          </Form.Item>

          <div className="flex justify-end pt-4">
            <Button
              type="primary"
              htmlType="submit"
              size="large"
              icon={<SaveOutlined />}
              loading={loading}
              disabled={!isChanged}
              className={`px-8 py-2 h-auto rounded-lg font-medium ${
                isChanged
                  ? "bg-gradient-to-r from-blue-500 to-indigo-600 border-0 shadow-lg hover:from-blue-600 hover:to-indigo-700"
                  : ""
              }`}
            >
              💾 {t("userProfile.save-changes")}
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
