import { useState, useEffect } from "react";
import { Button, Popconfirm, Modal } from "antd";
import { Badge } from "@/ui/badge";
import { Switch } from "@/ui/switch";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Separator } from "@/ui/separator";
import { Icon } from "@/components/icon";
import { useBanner } from "@/hooks/useBanner";
import type {
  BannerConfig,
  CreateBannerRequest,
  UpdateBannerRequest,
  UpdateBannerSettingsRequest,
} from "@/api/services/bannerApi";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function BannerConfigPage() {
  const { t } = useTranslation();
  const {
    banners,
    loading,
    pagination,
    stats,
    settings,
    settingsLoading,
    fetchBanners,
    createBanner,
    updateBanner,
    deleteBanner,
    toggleBanner,
    updateBannerOrder,
    updateSettings,
    resetSettings,
  } = useBanner();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerConfig | null>(null);

  // Banner form data - chỉ có content, isActive, order
  const [formData, setFormData] = useState<CreateBannerRequest>({
    content: "",
    isActive: true,
    order: 0,
  });

  // Global settings form data - màu sắc, tốc độ, khoảng cách
  const [settingsForm, setSettingsForm] = useState<UpdateBannerSettingsRequest>(
    {
      backgroundColor: "#1890ff",
      textColor: "#ffffff",
      scrollSpeed: 60,
      bannerSpacing: 30,
    }
  );

  // Sync settings form with fetched settings
  useEffect(() => {
    if (settings) {
      setSettingsForm({
        backgroundColor: settings.backgroundColor,
        textColor: settings.textColor,
        scrollSpeed: settings.scrollSpeed,
        bannerSpacing: settings.bannerSpacing,
      });
    }
  }, [settings]);

  // Reset form and close modal
  const resetForm = () => {
    setFormData({
      content: "",
      isActive: true,
      order: 0,
    });
    setEditingBanner(null);
    setIsModalOpen(false);
  };

  // Handle create banner
  const handleCreate = async () => {
    if (!formData.content.trim()) {
      toast.error(t("sys.banner-config.banner-content-required"));
      return;
    }

    const success = await createBanner(formData);
    if (success) {
      resetForm();
      fetchBanners(pagination.page, pagination.limit);
      toast.success(t("sys.banner-config.create-banner-success"));
    }
  };

  // Handle update banner
  const handleUpdate = async () => {
    if (!editingBanner) return;
    if (!formData.content.trim()) {
      toast.error(t("sys.banner-config.banner-content-required"));
      return;
    }

    const bannerData: UpdateBannerRequest = {
      id: editingBanner.id,
      ...formData,
    };

    const success = await updateBanner(bannerData);
    if (success) {
      resetForm();
      fetchBanners(pagination.page, pagination.limit);
      toast.success(t("sys.banner-config.update-banner-success"));
    }
  };

  // Handle edit banner
  const handleEdit = (banner: BannerConfig) => {
    setEditingBanner(banner);
    setFormData({
      content: banner.content,
      isActive: banner.isActive,
      order: banner.order || 0,
    });
    setIsModalOpen(true);
  };

  // Handle open create modal
  const handleOpenCreateModal = () => {
    setEditingBanner(null);
    // Tự động tính thứ tự tiếp theo
    const maxOrder =
      banners.length > 0 ? Math.max(...banners.map((b) => b.order || 0)) : 0;
    setFormData({
      content: "",
      isActive: true,
      order: maxOrder + 1,
    });
    setIsModalOpen(true);
  };

  // Handle delete banner
  const handleDelete = async (id: string) => {
    const success = await deleteBanner(id);
    if (success) {
      fetchBanners(pagination.page, pagination.limit);
      toast.success(t("sys.banner-config.delete-banner-success"));
    }
  };

  // Handle toggle banner
  const handleToggle = async (id: string, isActive: boolean) => {
    const success = await toggleBanner(id, isActive);
    if (success) {
      fetchBanners(pagination.page, pagination.limit);
      toast.success(t("sys.banner-config.toggle-banner-success"));
    }
  };

  // Handle order change
  const handleOrderChange = async (id: string, newOrder: number) => {
    const success = await updateBannerOrder(id, newOrder);
    if (success) {
      fetchBanners(pagination.page, pagination.limit);
      toast.success(t("sys.banner-config.update-banner-order-success"));
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    fetchBanners(newPage, pagination.limit);
  };

  // Handle update global settings
  const handleUpdateSettings = async () => {
    const success = await updateSettings(settingsForm);
    if (success) {
      toast.success(t("sys.banner-config.update-settings-success"));
    }
  };

  // Handle reset settings
  const handleResetSettings = async () => {
    const success = await resetSettings();
    if (success) {
      toast.success(t("sys.banner-config.reset-settings-success"));
    }
  };

  return (
    <div className="bg-card text-card-foreground px-6 flex flex-col gap-6 rounded-xl border shadow-sm">
      {/* Header */}
      <div className="pt-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              🎯 {t("sys.banner-config.manager-banner")}
            </h1>
            <p className="text-muted-foreground mt-2">
              {t("sys.banner-config.manager-banner-config-description")}
            </p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleOpenCreateModal}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {t("sys.banner-config.manager-banner-config-create")}
          </Button>
        </div>
      </div>
      <Separator />

      {/* Thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              {t("sys.banner-config.total-banner")}
            </CardTitle>
            <div className="p-2 bg-primary rounded-full">
              <Icon
                icon="lucide:layout-dashboard"
                className="h-4 w-4 text-white"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {stats.total}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("sys.banner-config.total-banner-description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              {t("sys.banner-config.active-banner")}
            </CardTitle>
            <div className="p-2 bg-green-500 rounded-full">
              <Icon icon="lucide:check-circle" className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {stats.active}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {t("sys.banner-config.active-banner-description")}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              {t("sys.banner-config.paused-banner")}
            </CardTitle>
            <div className="p-2 bg-red-500 rounded-full">
              <Icon icon="lucide:pause-circle" className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-foreground">
              {stats.inactive}
            </div>
            <p className="text-xs text-red-600 mt-1">
              {t("sys.banner-config.paused-banner-description")}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Modal tạo/chỉnh sửa banner */}
      <Modal
        title={
          <div className="flex items-center gap-2">
            <Icon
              icon={editingBanner ? "lucide:edit" : "lucide:plus"}
              className="h-5 w-5 text-blue-600"
            />
            {editingBanner
              ? t("sys.banner-config.edit-banner")
              : t("sys.banner-config.create-banner")}
          </div>
        }
        open={isModalOpen}
        onCancel={resetForm}
        width={800}
        footer={[
          <Button key="cancel" onClick={resetForm}>
            ❌ {t("sys.banner-config.cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={editingBanner ? handleUpdate : handleCreate}
            loading={loading}
            disabled={!formData.content.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {editingBanner
              ? t("sys.banner-config.update-banner")
              : t("sys.banner-config.create-banner")}
          </Button>,
        ]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  {t("sys.banner-config.banner-content")} *
                </Label>
                <Textarea
                  placeholder={t(
                    "sys.banner-config.banner-content-placeholder"
                  )}
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  className="min-h-[100px] resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    {t("sys.banner-config.banner-order")}
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    value={formData.order}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        order: parseInt(e.target.value) || 0,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-semibold text-gray-700">
                    {t("sys.banner-config.banner-status")}
                  </Label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                    <Label className="text-sm font-medium text-gray-700">
                      {formData.isActive
                        ? t("sys.banner-config.active-banner")
                        : t("sys.banner-config.paused-banner")}
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  {t("sys.banner-config.preview-banner")}
                </Label>
                <div
                  className="rounded-lg p-4 border-2 border-dashed border-gray-300 min-h-[100px] flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: settingsForm.backgroundColor,
                    color: settingsForm.textColor,
                  }}
                >
                  <div className="whitespace-nowrap animate-marquee text-sm font-medium">
                    {formData.content ||
                      t("sys.banner-config.banner-content-placeholder")}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  📋 {t("sys.banner-config.banner-info")}
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• {t("sys.banner-config.banner-color-description")}</li>
                  <li>
                    • {t("sys.banner-config.banner-spacing-description")}:{" "}
                    {settingsForm.bannerSpacing}px
                  </li>
                  <li>
                    • {t("sys.banner-config.banner-scroll-speed-description")}:{" "}
                    {settingsForm.scrollSpeed}px/s
                  </li>
                  <li>
                    • {t("sys.banner-config.banner-status-description")}:{" "}
                    {formData.isActive
                      ? t("sys.banner-config.active-banner")
                      : t("sys.banner-config.paused-banner")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      {/* Global Settings */}
      <div className="py-4">
        <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
          <Icon icon="lucide:settings" className="h-5 w-5 text-blue-600" />
          {t("sys.banner-config.global-settings")}
        </h2>
        <p className="text-muted-foreground mt-1">
          {t("sys.banner-config.global-settings-description")}
        </p>
        <Separator className="my-6" />

        <div>
          {settingsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Icon
                icon="lucide:loader-2"
                className="h-8 w-8 animate-spin text-blue-600"
              />
              <span className="ml-2 text-muted-foreground">
                {t("sys.banner-config.loading-settings")}
              </span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground">
                    {t("sys.banner-config.background-color")}
                  </Label>
                  <div className="flex gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer relative overflow-hidden"
                      style={{
                        backgroundColor: settingsForm.backgroundColor,
                      }}
                    >
                      <input
                        type="color"
                        value={settingsForm.backgroundColor}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            backgroundColor: e.target.value,
                          })
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <Input
                      value={settingsForm.backgroundColor}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          backgroundColor: e.target.value,
                        })
                      }
                      placeholder="#1890ff"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground">
                    {t("sys.banner-config.text-color")}
                  </Label>
                  <div className="flex gap-3">
                    <div
                      className="w-12 h-12 rounded-lg border-2 border-border cursor-pointer relative overflow-hidden"
                      style={{ backgroundColor: settingsForm.textColor }}
                    >
                      <input
                        type="color"
                        value={settingsForm.textColor}
                        onChange={(e) =>
                          setSettingsForm({
                            ...settingsForm,
                            textColor: e.target.value,
                          })
                        }
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <Input
                      value={settingsForm.textColor}
                      onChange={(e) =>
                        setSettingsForm({
                          ...settingsForm,
                          textColor: e.target.value,
                        })
                      }
                      placeholder="#ffffff"
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground">
                    {t("sys.banner-config.scroll-speed")}
                  </Label>
                  <Input
                    type="number"
                    min="10"
                    max="200"
                    value={settingsForm.scrollSpeed}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        scrollSpeed: parseInt(e.target.value) || 60,
                      })
                    }
                    className="w-full"
                  />
                </div>

                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-muted-foreground">
                    {t("sys.banner-config.banner-spacing")}
                  </Label>
                  <Input
                    type="number"
                    min="0"
                    max="100"
                    value={settingsForm.bannerSpacing}
                    onChange={(e) =>
                      setSettingsForm({
                        ...settingsForm,
                        bannerSpacing: parseInt(e.target.value) || 30,
                      })
                    }
                    className="w-full"
                  />
                </div>
              </div>

              {/* Preview */}
              <div className="mt-6">
                <Label className="text-sm font-semibold text-muted-foreground mb-3 block">
                  {t("sys.banner-config.preview-color")}
                </Label>
                <div
                  className="rounded-lg p-4 border-2 border-dashed border-border overflow-hidden"
                  style={{
                    backgroundColor: settingsForm.backgroundColor,
                    color: settingsForm.textColor,
                  }}
                >
                  <div className="whitespace-nowrap animate-marquee text-lg font-medium text-center">
                    🎨 {t("sys.banner-config.preview-color-description")} •{" "}
                    {t("sys.banner-config.scroll-speed")}:{" "}
                    {settingsForm.scrollSpeed}px/s • Khoảng cách:{" "}
                    {settingsForm.bannerSpacing}px
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <Button
                  type="primary"
                  onClick={handleUpdateSettings}
                  loading={settingsLoading}
                  className="bg-background hover:bg-muted/60"
                >
                  💾 {t("sys.banner-config.save-settings")}
                </Button>
                <Button onClick={handleResetSettings} loading={settingsLoading}>
                  🔄 {t("sys.banner-config.reset-settings")}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
      <Separator />

      <div className="pb-4">
        <div className="pt-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            <Icon icon="lucide:list" className="h-5 w-5 text-blue-600" />
            {t("sys.banner-config.banner-list")} ({banners.length})
          </h2>
        </div>
        <Separator className="my-4" />

        <div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <div className="text-center space-y-4">
                <Icon
                  icon="lucide:loader-2"
                  className="h-12 w-12 animate-spin mx-auto text-blue-600"
                />
                <p className="text-muted-foreground">
                  {t("sys.banner-config.loading-banner")}
                </p>
              </div>
            </div>
          ) : banners.length === 0 ? (
            <div className="text-center py-12 space-y-4">
              <Icon
                icon="lucide:inbox"
                className="h-16 w-16 mx-auto text-muted-foreground"
              />
              <div>
                <p className="text-xl font-semibold text-foreground">
                  {t("sys.banner-config.no-banner")}
                </p>
                <p className="text-muted-foreground mt-2">
                  {t("sys.banner-config.create-banner-description")}
                </p>
              </div>
              <Button
                type="primary"
                size="large"
                icon={<PlusOutlined />}
                onClick={handleOpenCreateModal}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {t("sys.banner-config.create-banner")}
              </Button>
            </div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto">
              <div className="space-y-4">
                {banners.map((banner, index) => (
                  <div
                    key={banner.id}
                    className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge
                            variant={banner.isActive ? "default" : "secondary"}
                            className="gap-1"
                          >
                            <Icon
                              icon={
                                banner.isActive
                                  ? "lucide:play-circle"
                                  : "lucide:pause-circle"
                              }
                              className="w-3 h-3"
                            />
                            {banner.isActive
                              ? t("sys.banner-config.active-banner")
                              : t("sys.banner-config.paused-banner")}
                          </Badge>
                          <span className="text-sm text-muted-foreground font-mono">
                            #{banner.order || index + 1}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {t("sys.banner-config.banner-id")}: {banner.id}
                          </span>
                        </div>

                        <div
                          className="p-4 rounded-lg mb-4 border-2 border-dashed overflow-hidden w-full"
                          style={{
                            backgroundColor:
                              settings?.backgroundColor || "#1890ff",
                            color: settings?.textColor || "#ffffff",
                            borderColor:
                              (settings?.backgroundColor || "#1890ff") + "40",
                          }}
                        >
                          <div className="font-medium text-center whitespace-nowrap animate-marquee">
                            {banner.content}
                          </div>
                        </div>

                        <div className="flex items-center gap-6 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Icon icon="lucide:calendar" className="w-4 h-4" />
                            {t("sys.banner-config.create-banner")}:{" "}
                            {new Date(
                              banner.createdAt || ""
                            ).toLocaleDateString("vi-VN")}
                          </span>
                          {banner.updatedAt && (
                            <span className="flex items-center gap-1">
                              <Icon icon="lucide:edit" className="w-4 h-4" />
                              {t("sys.banner-config.update-banner")}:{" "}
                              {new Date(banner.updatedAt).toLocaleDateString(
                                "vi-VN"
                              )}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col items-end gap-3 ml-6">
                        <div className="flex items-center gap-2">
                          <Label className="text-xs text-muted-foreground">
                            {t("sys.banner-config.banner-order")}
                          </Label>
                          <Input
                            type="number"
                            min="0"
                            value={banner.order || 0}
                            onChange={(e) =>
                              handleOrderChange(
                                banner.id,
                                parseInt(e.target.value) || 0
                              )
                            }
                            className="w-16 h-8 text-center"
                          />
                        </div>

                        <div className="flex items-center gap-2">
                          <Switch
                            checked={banner.isActive}
                            onCheckedChange={(checked) =>
                              handleToggle(banner.id, checked)
                            }
                          />
                          <span className="text-xs text-muted-foreground">
                            {banner.isActive
                              ? t("sys.banner-config.active-banner")
                              : t("sys.banner-config.paused-banner")}
                          </span>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            type="default"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() => handleEdit(banner)}
                            className=" !rounded-[0.25rem] text-primary hover:bg-primary/60"
                          >
                            {t("sys.banner-config.update-banner")}
                          </Button>
                          <Popconfirm
                            title={t("sys.banner-config.delete-banner")}
                            description={t(
                              "sys.banner-config.delete-banner-description"
                            )}
                            onConfirm={() => handleDelete(banner.id)}
                            okText={t("sys.banner-config.delete-banner")}
                            cancelText={t("sys.banner-config.cancel")}
                            okButtonProps={{ danger: true }}
                          >
                            <Button
                              danger
                              size="small"
                              icon={<DeleteOutlined />}
                              className=" !rounded-[0.25rem] text-primary hover:bg-red/60"
                            >
                              {t("sys.banner-config.delete-banner")}
                            </Button>
                          </Popconfirm>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="text-sm text-muted-foreground">
                {t("sys.banner-config.display")}{" "}
                {(pagination.page - 1) * pagination.limit + 1} -{" "}
                {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
                {t("sys.banner-config.banner-total")} {pagination.total}
              </div>
              <div className="flex gap-2">
                <Button
                  size="small"
                  onClick={() => handlePageChange(pagination.page - 1)}
                  disabled={pagination.page <= 1}
                  icon={<Icon icon="lucide:chevron-left" className="h-4 w-4" />}
                >
                  {t("sys.banner-config.previous")}
                </Button>
                <div className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-muted-foreground rounded">
                  <span className="text-sm font-medium">
                    {pagination.page} / {pagination.totalPages}
                  </span>
                </div>
                <Button
                  size="small"
                  onClick={() => handlePageChange(pagination.page + 1)}
                  disabled={pagination.page >= pagination.totalPages}
                  icon={
                    <Icon icon="lucide:chevron-right" className="h-4 w-4" />
                  }
                >
                  {t("sys.banner-config.next")}
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-marquee {
          animation: marquee 25s linear infinite;
        }
      `}</style>
    </div>
  );
}
