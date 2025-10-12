import { useState, useCallback } from "react";
import {
  notificationAdminService,
  CreateNotificationDto,
  Notification,
} from "../api/services/notificationApi";
import { useUserInfo } from "@/store/userStore";

export const useAdminNotifications = () => {
  const userInfo = useUserInfo();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [limit] = useState<number>(20);

  const isAdmin = userInfo?.role === "admin";

  const loadNotifications = useCallback(
    async (pageNum: number = 1) => {
      if (!isAdmin) return;

      setLoading(true);
      setError(null);

      try {
        const response = await notificationAdminService.getAll(pageNum, limit);
        setNotifications(response.data.notifications);
        setTotal(response.data.total);
        setPage(response.data.page);
      } catch (err: any) {
        setError(err.message || "Failed to load notifications");
        console.error("Error loading notifications:", err);
      } finally {
        setLoading(false);
      }
    },
    [isAdmin, limit]
  );

  const createNotification = useCallback(
    async (
      data: CreateNotificationDto
    ): Promise<{ success: boolean; message: string; data: Notification }> => {
      if (!isAdmin) throw new Error("Unauthorized");

      try {
        const notification = await notificationAdminService.create(data);

        setNotifications((prev) => [notification.data, ...prev]);
        setTotal((prev) => prev + 1);

        return notification;
      } catch (err: any) {
        setError(err.message || "Failed to create notification");
        throw err;
      }
    },
    [isAdmin]
  );

  const updateNotification = useCallback(
    async (
      id: string,
      data: Partial<CreateNotificationDto>
    ): Promise<Notification> => {
      if (!isAdmin) throw new Error("Unauthorized");

      try {
        const notification = await notificationAdminService.update(id, data);

        setNotifications((prev) =>
          prev.map((n) => (n._id === id ? notification : n))
        );

        return notification;
      } catch (err: any) {
        setError(err.message || "Failed to update notification");
        throw err;
      }
    },
    [isAdmin]
  );

  const deleteNotification = useCallback(
    async (id: string): Promise<void> => {
      if (!isAdmin) throw new Error("Unauthorized");

      try {
        await notificationAdminService.delete(id);

        setNotifications((prev) => prev.filter((n) => n._id !== id));
        setTotal((prev) => Math.max(0, prev - 1));
      } catch (err: any) {
        setError(err.message || "Failed to delete notification");
        throw err;
      }
    },
    [isAdmin]
  );

  const getNotification = useCallback(
    async (id: string): Promise<Notification> => {
      if (!isAdmin) throw new Error("Unauthorized");

      try {
        return await notificationAdminService.getById(id);
      } catch (err: any) {
        setError(err.message || "Failed to get notification");
        throw err;
      }
    },
    [isAdmin]
  );

  return {
    notifications,
    loading,
    error,
    total,
    page,
    limit,
    isAdmin,
    loadNotifications,
    createNotification,
    updateNotification,
    deleteNotification,
    getNotification,
    refresh: () => loadNotifications(page),
    nextPage: () => loadNotifications(page + 1),
    prevPage: () => loadNotifications(page - 1),
  };
};
