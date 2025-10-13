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

      toast.success("Cập nhật thông tin thành công!");
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

      toast.success("Cập nhật ảnh đại diện thành công!");
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
      message.error("Chỉ có thể upload file JPG/PNG!");
      return false;
    }
    if (!isValidSize) {
      message.error("Ảnh phải nhỏ hơn 2MB!");
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
            {profile?.name || "Loading..."}
          </h3>
          <p className="text-muted-foreground">
            {profile?.email || "Loading..."}
          </p>
          <p className="text-sm text-muted-foreground">
            {profile?.role === "admin"
              ? "Quản trị viên"
              : profile?.role === "moderator"
              ? "Kiểm duyệt viên"
              : "Người dùng"}
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
            label="Họ và tên"
            rules={[{ required: true, message: "Vui lòng nhập họ tên!" }]}
          >
            <Input size="large" prefix={<UserOutlined />} />
          </Form.Item>

          <Form.Item name="email" label="Email">
            <Input size="large" prefix={<MailOutlined />} disabled />
          </Form.Item>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Form.Item name="phone" label="Số điện thoại">
            <Input size="large" prefix={<PhoneOutlined />} />
          </Form.Item>

          <Form.Item name="dateOfBirth" label="Ngày sinh">
            <DatePicker size="large" className="w-full" format="YYYY-MM-DD" />
          </Form.Item>
        </div>

        <Form.Item name="address" label="Địa chỉ">
          <Input size="large" prefix={<HomeOutlined />} />
        </Form.Item>

        <Form.Item name="bio" label="Tiểu sử">
          <TextArea rows={4} placeholder="Nhập giới thiệu về bản thân..." />
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
            💾 Cập nhật thông tin
          </Button>
        </div>
      </Form>
    </div>
  );
}
