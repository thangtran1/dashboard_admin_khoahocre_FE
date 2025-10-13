import { useState, useEffect } from "react";
import { CardTitle } from "@/ui/card";
import { Tabs } from "antd";
import { Icon } from "@/components/icon";
import { useSearchParams } from "react-router";
import { useUserProfile } from "@/hooks/useUserProfile";
import { getSystemSettings, SystemSettings } from "@/api/services/profileApi";
import { Separator } from "@/ui/separator";
import PersonalInfoTab from "./components/PersonalInfoTab";
import SecurityTab from "./components/SecurityTab";
import PreferencesTab from "./components/PreferencesTab";

export default function ProfilePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { profile, loading: profileLoading, updateProfile } = useUserProfile();

  const [loading, setLoading] = useState(false);
  const [systemSettings, setSystemSettings] = useState<SystemSettings | null>(
    null
  );

  const activeTab = searchParams.get("tab") || "profile";

  const handleTabChange = (tab: string) => {
    setSearchParams({ tab });
  };

  // Fetch system settings
  const fetchSystemSettings = async () => {
    try {
      setLoading(true);
      const settingsData = await getSystemSettings();
      setSystemSettings(settingsData);
    } catch (error) {
      console.error("Error fetching system settings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSystemSettings();
  }, []);

  const tabItems = [
    {
      key: "profile",
      label: (
        <span className="flex items-center gap-2">
          <Icon icon="lucide:user" className="h-4 w-4" />
          Thông tin cá nhân
        </span>
      ),
      children: (
        <PersonalInfoTab
          profile={profile}
          loading={profileLoading || loading}
          onProfileUpdate={updateProfile}
        />
      ),
    },
    {
      key: "security",
      label: (
        <span className="flex items-center gap-2">
          <Icon icon="lucide:shield" className="h-4 w-4" />
          Bảo mật
        </span>
      ),
      children: <SecurityTab loading={loading} setLoading={setLoading} />,
    },
    {
      key: "preferences",
      label: (
        <span className="flex items-center gap-2">
          <Icon icon="lucide:settings" className="h-4 w-4" />
          Tùy chỉnh
        </span>
      ),
      children: (
        <PreferencesTab
          loading={loading}
          setLoading={setLoading}
          setSystemSettings={setSystemSettings}
          systemSettings={systemSettings}
        />
      ),
    },
  ];

  return (
    <div className="bg-card text-card-foreground px-6 flex flex-col gap-6 rounded-xl border shadow-sm">
      <div>
        <div className="flex pt-4 items-center justify-between">
          <div>
            <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Icon icon="lucide:user" className="h-7 w-7 text-primary" />
              Hồ sơ người dùng
            </CardTitle>
            <p className="text-muted-foreground mt-1">
              Quản lý thông tin cá nhân, bảo mật và tùy chỉnh hệ thống
            </p>
          </div>
        </div>

        <Separator className="my-6" />

        <Tabs
          defaultActiveKey={activeTab}
          activeKey={activeTab}
          onChange={handleTabChange}
          items={tabItems}
          className="mt-6"
        />
      </div>
    </div>
  );
}
