import CyanBlur from "@/assets/images/background/cyan-blur.png";
import RedBlur from "@/assets/images/background/red-blur.png";
import { Icon } from "@/components/icon";
import { themeVars } from "@/theme/theme.css";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/ui/sheet";
import { Tabs, type TabsProps, Avatar, Typography, Space, Tag } from "antd";
import { type CSSProperties, useState, useEffect } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";
import { notificationUserService } from "@/api/services/notificationApi";
import { NotificationType } from "@/types/enum";
import { useTranslation } from "react-i18next";
import { Notification } from "@/types/entity";

dayjs.extend(relativeTime);
dayjs.locale("vi");

const { Text } = Typography;

export default function NoticeButton() {
  const { t } = useTranslation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    loadUnreadCount();
  }, []);

  useEffect(() => {
    if (!drawerOpen) {
      loadUnreadCount();
    }
  }, [drawerOpen]);

  const loadUnreadCount = async () => {
    try {
      const response = await notificationUserService.getUnreadCount();
      setUnreadCount(response.unreadCount);
    } catch (error) {
      console.error("Error loading unread count:", error);
    }
  };

  const style: CSSProperties = {
    backdropFilter: "blur(20px)",
    backgroundImage: `url("${CyanBlur}"), url("${RedBlur}")`,
    backgroundRepeat: "no-repeat, no-repeat",
    backgroundColor: `rgba(${themeVars.colors.background.paperChannel} / 0.9)`,
    backgroundPosition: "right top, left bottom",
    backgroundSize: "50, 50%",
  };

  // Chỉ load notifications khi drawer mở và chưa có data
  useEffect(() => {
    if (drawerOpen && notifications.length === 0) {
      loadNotifications();
    }
  }, [drawerOpen, notifications.length]);

  const loadNotifications = async () => {
    setLoading(true);
    try {
      const response = await notificationUserService.getAll(1, 50);
      setNotifications(response.data.notifications as Notification[]);
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await notificationUserService.markAsRead(notificationId);
      setNotifications((prev) =>
        prev.map((n) =>
          n._id === notificationId ? { ...n, isReadByUser: true } : n
        )
      );
      setUnreadCount((prev) => Math.max(0, prev - 1));
      toast.success(t("notification.mark-as-read-success"));
    } catch (error) {
      console.error("Error marking as read:", error);
    }
  };

  // Đánh dấu tất cả đã đọc
  const handleMarkAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter((n) => !n.isReadByUser);
      await Promise.all(
        unreadNotifications.map((n) =>
          notificationUserService.markAsRead(n._id)
        )
      );
      setNotifications((prev) =>
        prev.map((n) => ({ ...n, isReadByUser: true }))
      );
      setUnreadCount(0);
      toast.success(t("notification.mark-all-as-read-success"));
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  };

  return (
    <div>
      <div className="relative">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={() => setDrawerOpen(true)}
        >
          <Icon icon="solar:bell-bing-bold-duotone" size={24} />
        </Button>
        {unreadCount > 0 && (
          <Badge
            variant="error"
            overlay="circle"
            className="absolute -right-2 -top-2"
          >
            {unreadCount > 99 ? "99+" : unreadCount}
          </Badge>
        )}
      </div>
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent
          side="right"
          className="w-[420px] p-0 [&>button]:hidden"
          style={style}
        >
          <SheetHeader className="flex flex-row items-center justify-between !pb-0">
            <SheetTitle className="text-2xl font-semibold">
              {t("notification.title")}
            </SheetTitle>
            <Space>
              <Button
                variant="ghost"
                size="icon"
                className="rounded-full text-primary"
                onClick={handleMarkAllAsRead}
                disabled={
                  activeTab !== "unread" ||
                  unreadCount === 0 ||
                  notifications.filter((n) => !n.isReadByUser).length === 0
                }
              >
                <Icon icon="solar:check-read-broken" size={28} />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="rounded-full"
                onClick={() => setDrawerOpen(false)}
              >
                <Icon icon="solar:close-circle-bold" size={28} />
              </Button>
            </Space>
          </SheetHeader>
          <NoticeTab
            notifications={notifications}
            loading={loading}
            onMarkAsRead={handleMarkAsRead}
            onTabChange={setActiveTab}
          />
          <SheetFooter className="border-t">
            <Link to="#">
              <div
                style={{ color: themeVars.colors.text.primary }}
                className="flex w-full items-center justify-center font-semibold cursor-pointer transition-colors"
              >
                {t("notification.view-all-notifications")}
              </div>
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}

interface NoticeTabProps {
  notifications: Notification[];
  loading: boolean;
  onMarkAsRead: (id: string) => void;
  onTabChange: (tab: string) => void;
}

function NoticeTab({
  notifications,
  loading,
  onMarkAsRead,
  onTabChange,
}: NoticeTabProps) {
  const { t } = useTranslation();

  // Memoize filtered notifications để tránh tính toán lại
  const allNotifications = notifications;
  const unreadNotifications = notifications.filter((n) => !n.isReadByUser);
  const readNotifications = notifications.filter((n) => n.isReadByUser);

  // Component hiển thị thông báo
  const NotificationItem = ({
    notification,
  }: {
    notification: Notification;
  }) => {
    const getTypeColor = (type: string) => {
      switch (type) {
        case NotificationType.SYSTEM:
          return "green";
        case NotificationType.NEWS:
          return "blue";
        case NotificationType.MAINTENANCE:
          return "red";
      }
    };
    const typeMap: Record<NotificationType, string> = {
      [NotificationType.SYSTEM]: t("notification.system"),
      [NotificationType.NEWS]: t("notification.news"),
      [NotificationType.MAINTENANCE]: t("notification.maintenance"),
    };
    return (
      <div
        className={`py-2 border-b hover:bg-muted/20 transition-colors cursor-pointer ${
          !notification.isReadByUser
            ? "bg-muted border-primary border-l-1"
            : "bg-muted"
        }`}
        onClick={() => {
          if (!notification.isReadByUser) {
            onMarkAsRead(notification._id);
          }
          if (notification.actionUrl) {
            // Navigate to action URL
          }
        }}
      >
        <div className="flex items-center gap-2 px-1">
          {/* Avatar */}
          <div className="relative inline-block">
            <Avatar size={48} className="flex-shrink-0">
              {notification.actionUrl && (
                <img
                  src={notification.actionUrl}
                  alt="preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = "none";
                  }}
                />
              )}
            </Avatar>

            {!notification.isReadByUser && (
              <span className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full"></span>
            )}
          </div>

          {/* Nội dung thông báo */}
          <div className="flex-1 flex flex-col gap-1">
            {/* Header: Loại thông báo */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-foreground font-semibold">
                {t("notification.type")}{" "}
                <Tag color={getTypeColor(notification.type)}>
                  {typeMap[notification.type as NotificationType]}
                </Tag>
              </div>
            </div>

            {/* Nội dung chính */}
            <div className="flex-1 text-sm text-foreground break-words">
              {notification.content}
            </div>

            {/* Ngày tạo */}
            <div className="text-xs  text-muted-foreground">
              {dayjs(notification.createdAt).format("DD/MM/YYYY HH:mm")}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Component hiển thị danh sách thông báo
  const NotificationList = ({
    notifications,
  }: {
    notifications: Notification[];
  }) => {
    if (loading) {
      return (
        <div className="p-4 text-center">
          <Icon icon="solar:loading-bold" size={24} className="animate-spin" />
          <Text className="block mt-2">{t("notification.loading")}</Text>
        </div>
      );
    }

    if (notifications.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)]">
          <Icon icon="solar:bell-off-bold" size={56} />
          <Text className="block mt-2">
            {t("notification.no-notifications")}
          </Text>
        </div>
      );
    }

    return (
      <div
        className="overflow-y-auto"
        style={{ maxHeight: "calc(100vh - 200px)" }}
      >
        {notifications.map((notification) => (
          <NotificationItem
            key={notification._id}
            notification={notification}
          />
        ))}
      </div>
    );
  };

  const items: TabsProps["items"] = [
    {
      key: "all",
      label: (
        <div className="flex gap-1">
          <span>{t("notification.all")}</span>
          <Badge variant="info">{allNotifications.length}</Badge>
        </div>
      ),
      children: <NotificationList notifications={allNotifications} />,
    },
    {
      key: "unread",
      label: (
        <div className="flex gap-1">
          <span>{t("notification.unread")}</span>
          <Badge variant="error">{unreadNotifications.length}</Badge>
        </div>
      ),
      children: <NotificationList notifications={unreadNotifications} />,
    },
    {
      key: "read",
      label: (
        <div className="flex gap-1">
          <span>{t("notification.read")}</span>
          <Badge variant="success">{readNotifications.length}</Badge>
        </div>
      ),
      children: <NotificationList notifications={readNotifications} />,
    },
  ];

  return (
    <div className="flex flex-col px-4">
      <Tabs
        defaultActiveKey="all"
        items={items}
        className="px-6"
        tabBarStyle={{ marginBottom: 0 }}
        onChange={onTabChange}
      />
    </div>
  );
}
