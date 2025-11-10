import { useState, useEffect } from "react";
import { Card, Avatar, Button, Drawer, Tooltip } from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  PhoneOutlined,
  MenuOutlined,
  LeftOutlined,
  RightOutlined,
} from "@ant-design/icons";
import { useUserProfile } from "@/hooks/useUserProfile";
import PersonalInfoTab from "./components/PersonalInfoTab";
import SecurityTab from "./components/SecurityTab";
import { type CSSProperties } from "react";
import { useTranslation } from "react-i18next";

function UserProfile() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState("profile");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const { profile, loading, error, updateProfile } = useUserProfile();

  // Listen for profile updates (không reload page)
  useEffect(() => {
    const handleProfileUpdate = (event: CustomEvent) => {
      // Chỉ cập nhật state, không reload page
      if (event.detail) {
        updateProfile(event.detail);
      }
    };

    window.addEventListener(
      "profileUpdated",
      handleProfileUpdate as EventListener
    );
    return () => {
      window.removeEventListener(
        "profileUpdated",
        handleProfileUpdate as EventListener
      );
    };
  }, [updateProfile]);

  const bgStyle: CSSProperties = {
    background: `linear-gradient(135deg, rgba(56,189,248,0.85), rgba(168,85,247,0.85)))`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };

  const avatarUrl = profile?.avatar
    ? `${import.meta.env.VITE_API_URL}${profile.avatar}`
    : undefined;

  const menuItems = [
    {
      key: "profile",
      icon: <UserOutlined />,
      label: t("userProfile.personal-info"),
      description: t("userProfile.manage-personal-info"),
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
    {
      key: "security",
      icon: <LockOutlined />,
      label: t("userProfile.security"),
      description: t("userProfile.manage-security"),
      color: "from-red-500 to-pink-600",
      bgColor: "bg-red-50",
      iconColor: "text-red-600",
    },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-border blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-border border-t-transparent mx-auto mb-4"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <UserOutlined className="text-2xl text-border" />
            </div>
          </div>
          <p className="text-muted text-lg font-medium">
            {t("userProfile.loading")}
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-border red-50 flex items-center justify-center p-4">
        <Card className="max-w-md text-center shadow-2xl border-0">
          <div className="text-muted text-6xl mb-4">⚠️</div>
          <h3 className="text-xl font-bold mb-2 text-muted">
            {t("userProfile.error")}
          </h3>
          <p className="text-muted mb-4">{error}</p>
          <Button
            type="primary"
            size="large"
            className="bg-gradient-to-r from-border to-border border-0"
            onClick={() => window.location.reload()}
          >
            {t("userProfile.try-again")}
          </Button>
        </Card>
      </div>
    );
  }

  const SidebarContent = ({ isMobile = false }) => (
    <div className={`flex flex-col border-r ${isMobile ? "px-2" : ""}`}>
      {/* Header */}
      <div
        className={` border-b pb-3 border-border flex items-center ${
          sidebarCollapsed && !isMobile ? "justify-center" : "px-1"
        }`}
      >
        {!sidebarCollapsed || isMobile ? (
          <div>
            <h2 className="text-lg font-bold text-foreground">
              ⚙️ {t("userProfile.settings")}
            </h2>
            <p className="text-xs text-muted-foreground">
              {t("userProfile.manage-personal-info")}
            </p>
          </div>
        ) : (
          <span className="text-xl text-foreground">⚙️</span>
        )}

        <Button
          type="text"
          icon={sidebarCollapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() =>
            isMobile
              ? setMobileDrawerOpen(false)
              : setSidebarCollapsed(!sidebarCollapsed)
          }
          className="ml-auto text-muted-foreground hover:text-foreground hover:bg-foreground/10 rounded-lg transition-all duration-200"
        />
      </div>

      {/* Menu Items */}
      <div
        className={`flex-1 py-3 ${
          sidebarCollapsed ? "flex flex-col items-center" : "px-1"
        } space-y-2`}
      >
        {menuItems.map((item) => (
          <Tooltip
            key={item.key}
            title={
              sidebarCollapsed && !isMobile ? (
                <div className="flex flex-col">
                  <span className="font-semibold text-sm">{item.label}</span>
                  <span className="text-xs text-muted-foreground mt-0.5">
                    {item.description}
                  </span>
                </div>
              ) : (
                ""
              )
            }
            placement="right"
          >
            <div
              onClick={() => {
                setActiveTab(item.key);
                if (isMobile) setMobileDrawerOpen(false);
              }}
              className={`group relative cursor-pointer w-full rounded-xl transition-all duration-300 flex items-center gap-3 ${
                activeTab === item.key
                  ? "bg-gradient-to-r from-indigo-500/10 to-indigo-600/10 border border-indigo-500 shadow-md"
                  : "hover:bg-foreground/10 border border-transparent"
              } ${sidebarCollapsed ? "p-3 justify-center" : "p-3"}`}
            >
              <div
                className={`flex items-center justify-center text-xl rounded-lg transition-all duration-300 ${
                  activeTab === item.key
                    ? "text-indigo-400 bg-indigo-500/10"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
              >
                {item.icon}
              </div>

              {!sidebarCollapsed && (
                <div className="flex-1">
                  <div className="font-medium text-foreground">
                    {item.label}
                  </div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {item.description}
                  </div>
                </div>
              )}
            </div>
          </Tooltip>
        ))}
      </div>

      {/* Footer Quick Info */}
      {!sidebarCollapsed && (
        <div className="py-4 px-1 border-t border-border bg-background/30">
          <h3 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-1">
            📊 {t("userProfile.quick-info")}
          </h3>
          <div className="space-y-3 text-sm">
            {profile?.email && (
              <div className="flex items-center gap-2">
                <MailOutlined className="text-muted-foreground" />
                <span className="truncate">{profile.email}</span>
              </div>
            )}
            {profile?.phone && (
              <div className="flex items-center gap-2">
                <PhoneOutlined className="text-muted-foreground" />
                <span>{profile.phone}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted to-card transition-colors duration-500">
      {/* Header */}
      <div className="relative h-80 mb-8 rounded-3xl overflow-hidden shadow-2xl">
        {/* Cover background (tùy bgStyle là ảnh hoặc gradient) */}
        <div style={bgStyle} className="h-full w-full object-cover">
          {/* Overlay gradient + blur effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-foreground/10 via-background/40 to-background/90 backdrop-blur-sm"></div>

          {/* Avatar & Info */}
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-8 text-center z-10">
            {/* Avatar */}
            <div className="relative inline-block mb-4">
              <Avatar
                size={120}
                icon={<UserOutlined />}
                src={avatarUrl}
                className="border-4 border-border bg-card shadow-xl transition-transform hover:scale-105 duration-300"
              />
            </div>

            {/* Name & Email */}
            <h1 className="text-3xl font-bold mb-1 text-foreground drop-shadow-sm">
              {profile?.name || t("userProfile.user")}
            </h1>
            <p className="text-foreground text-sm mb-3">
              {profile?.email || "example@email.com"}
            </p>

            {/* Role & Verification */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="px-4 py-1.5 rounded-full text-sm bg-primary/10 border border-primary/30 text-primary backdrop-blur-sm">
                {profile?.role === "admin"
                  ? "👑 " + t("userProfile.admin")
                  : profile?.role === "moderator"
                  ? "🛡️ " + t("userProfile.moderator")
                  : "👤 " + t("userProfile.user")}
              </span>

              {profile?.isEmailVerified && (
                <span className="px-4 py-1.5 rounded-full text-sm bg-primary/10 border border-primary/30 text-primary backdrop-blur-sm">
                  ✅ {t("userProfile.verified")}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="pb-12">
        {/* Mobile Menu Button */}
        <div className="lg:hidden mb-4">
          <Button
            type="primary"
            icon={<MenuOutlined />}
            onClick={() => setMobileDrawerOpen(true)}
            className="shadow-lg bg-primary hover:bg-primary/90 border-none transition"
            size="large"
          >
            {t("userProfile.settings")}
          </Button>
        </div>

        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <div
            className={`hidden lg:block transition-all duration-500 ${
              sidebarCollapsed ? "w-20" : "w-80"
            }`}
          >
            <Card className="sticky shadow-md bg-card border-border backdrop-blur-md h-fit">
              <SidebarContent />
            </Card>
          </div>

          {/* Mobile Drawer */}
          <Drawer
            title={
              <div className="flex items-center gap-2">
                <div className="p-2 bg-muted rounded-lg">
                  <UserOutlined className="text-foreground" />
                </div>
                <span className="text-foreground">
                  {t("userProfile.settings")}
                </span>
              </div>
            }
            placement="left"
            onClose={() => setMobileDrawerOpen(false)}
            open={mobileDrawerOpen}
            className="lg:hidden"
            width={320}
            styles={{
              body: { padding: 0 },
              header: { borderBottom: "1px solid var(--border)" },
            }}
          >
            <SidebarContent isMobile />
          </Drawer>

          {/* Main Content */}
          <div className="flex-1">
            <Card className="shadow-lg bg-card border-border backdrop-blur-md">
              {activeTab === "profile" && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-md">
                      <UserOutlined className="text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">
                        {t("userProfile.personal-info")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("userProfile.manage-personal-info")}
                      </p>
                    </div>
                  </div>
                  <PersonalInfoTab
                    profile={profile}
                    loading={loading}
                    onProfileUpdate={updateProfile}
                  />
                </section>
              )}

              {activeTab === "security" && (
                <section>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="p-4 rounded-2xl bg-primary/10 text-primary shadow-md">
                      <LockOutlined className="text-2xl" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-foreground">
                        {t("userProfile.security")}
                      </h2>
                      <p className="text-muted-foreground">
                        {t("userProfile.manage-security")}
                      </p>
                    </div>
                  </div>
                  <SecurityTab />
                </section>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
