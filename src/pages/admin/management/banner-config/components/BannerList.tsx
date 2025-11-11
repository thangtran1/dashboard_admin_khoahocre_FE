import { useState, useEffect } from "react";
import { Button, Popconfirm, Modal } from "antd";
import { Badge } from "@/ui/badge";
import { Switch } from "@/ui/switch";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { Icon } from "@/components/icon";
import { useBanner } from "@/hooks/useBanner";
import type {
  BannerConfig,
  CreateBannerRequest,
  UpdateBannerRequest,
} from "@/api/services/bannerApi";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

export default function BannerList() {
  const { t } = useTranslation();
  const {
    banners,
    loading,
    pagination,
    settings,
    fetchBanners,
    createBanner,
    updateBanner,
    deleteBanner,
    toggleBanner,
    updateBannerOrder,
  } = useBanner();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<BannerConfig | null>(null);

  const [formData, setFormData] = useState<CreateBannerRequest>({
    content: "",
    isActive: true,
    order: 0,
  });

  useEffect(() => {
    const handleCreateModalEvent = () => {
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

    window.addEventListener("openCreateModal", handleCreateModalEvent);
    return () => {
      window.removeEventListener("openCreateModal", handleCreateModalEvent);
    };
  }, [banners]);

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
      toast.error(t("management.banner.banner-content-required"));
      return;
    }

    const success = await createBanner(formData);
    if (success) {
      resetForm();
      toast.success(t("management.banner.create-banner-success"));
    }
  };

  // Handle update banner
  const handleUpdateBanner = async () => {
    if (!editingBanner) return;
    if (!formData.content.trim()) {
      toast.error(t("management.banner.banner-content-required"));
      return;
    }

    const bannerData: UpdateBannerRequest = {
      id: editingBanner.id,
      ...formData,
    };

    const success = await updateBanner(bannerData);
    if (success) {
      resetForm();
      toast.success(t("management.banner.update-banner-success"));
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

  // Handle delete banner
  const handleDelete = async (id: string) => {
    const success = await deleteBanner(id);
    if (success) {
      toast.success(t("management.banner.delete-banner-success"));
    }
  };

  // Handle toggle banner
  const handleToggle = async (id: string, isActive: boolean) => {
    const success = await toggleBanner(id, isActive);
    if (success) {
      fetchBanners(pagination.page, pagination.limit);
      toast.success(t("management.banner.toggle-banner-success"));
    }
  };

  // Handle order change
  const handleOrderChange = async (id: string, newOrder: number) => {
    const success = await updateBannerOrder(id, newOrder);
    if (success) {
      fetchBanners(pagination.page, pagination.limit);
      toast.success(t("management.banner.update-banner-order-success"));
    }
  };

  // Handle page change
  const handlePageChange = (newPage: number) => {
    fetchBanners(newPage, pagination.limit);
  };

  return (
    <div className="space-y-6">
      <Modal
        title={
          <div className="flex items-center gap-2">
            {editingBanner
              ? t("management.banner.edit-banner")
              : t("management.banner.create-banner")}
          </div>
        }
        open={isModalOpen}
        onCancel={resetForm}
        width={800}
        footer={[
          <Button danger key="cancel" onClick={resetForm}>
            {t("management.banner.cancel")}
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={editingBanner ? handleUpdateBanner : handleCreate}
            loading={loading}
            disabled={!formData.content.trim()}
            className="bg-blue-600 hover:bg-blue-700"
          >
            {editingBanner
              ? t("management.banner.update-banner")
              : t("management.banner.create-banner")}
          </Button>,
        ]}
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  {t("management.banner.banner-content")}
                </Label>
                <Textarea
                  placeholder={t(
                    "management.banner.banner-content-placeholder"
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
                  <Label className="text-sm font-semibold text-foreground">
                    {t("management.banner.banner-order")}
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
                  <Label className="text-sm font-semibold text-foreground">
                    {t("management.banner.banner-status")}
                  </Label>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Switch
                      checked={formData.isActive}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, isActive: checked })
                      }
                    />
                    <Label className="text-sm font-medium text-foreground">
                      {formData.isActive
                        ? t("management.banner.active-banner")
                        : t("management.banner.paused-banner")}
                    </Label>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  {t("management.banner.preview-banner")}
                </Label>
                <div
                  className="rounded-lg p-4 border-2 border-dashed border-border min-h-[100px] flex items-center justify-center overflow-hidden"
                  style={{
                    backgroundColor: settings?.backgroundColor || "#1890ff",
                    color: settings?.textColor || "#ffffff",
                  }}
                >
                  <div className="whitespace-nowrap animate-marquee text-sm font-medium">
                    {formData.content ||
                      t("management.banner.banner-content-placeholder")}
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">
                  {t("management.banner.banner-info")}
                </h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• {t("management.banner.banner-color-description")}</li>
                  <li>
                    • {t("management.banner.banner-spacing-description")}:{" "}
                    {settings?.bannerSpacing || 30}px
                  </li>
                  <li>
                    • {t("management.banner.banner-scroll-speed-description")}:{" "}
                    {settings?.scrollSpeed || 60}px/s
                  </li>
                  <li>
                    • {t("management.banner.banner-status-description")}:{" "}
                    {formData.isActive
                      ? t("management.banner.active-banner")
                      : t("management.banner.paused-banner")}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Modal>

      <div>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Icon
                icon="lucide:loader-2"
                className="h-12 w-12 animate-spin mx-auto text-blue-600"
              />
              <p className="text-muted-foreground">
                {t("management.banner.loading-banner")}
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
                {t("management.banner.no-banner")}
              </p>
              <p className="text-muted-foreground mt-2">
                {t("management.banner.create-banner-description")}
              </p>
            </div>
          </div>
        ) : (
          <div className="max-h-[650px] overflow-y-auto">
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
                            ? t("management.banner.active-banner")
                            : t("management.banner.paused-banner")}
                        </Badge>
                        <span className="text-sm text-muted-foreground font-mono">
                          #{banner.order || index + 1}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {t("management.banner.banner-id")}: {banner.id}
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
                          {t("management.banner.create-banner")}:{" "}
                          {new Date(banner.createdAt || "").toLocaleDateString(
                            "vi-VN"
                          )}
                        </span>
                        {banner.updatedAt && (
                          <span className="flex items-center gap-1">
                            <Icon icon="lucide:edit" className="w-4 h-4" />
                            {t("management.banner.update-banner")}:{" "}
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
                          {t("management.banner.banner-order")}
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
                            ? t("management.banner.active-banner")
                            : t("management.banner.paused-banner")}
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
                          {t("management.banner.update-banner")}
                        </Button>
                        <Popconfirm
                          title={t("management.banner.delete-banner")}
                          description={t(
                            "management.banner.delete-banner-description"
                          )}
                          onConfirm={() => handleDelete(banner.id)}
                          okText={t("management.banner.delete-banner")}
                          cancelText={t("management.banner.cancel")}
                          okButtonProps={{ danger: true }}
                        >
                          <Button
                            danger
                            size="small"
                            icon={<DeleteOutlined />}
                            className=" !rounded-[0.25rem] text-primary hover:bg-red/60"
                          >
                            {t("management.banner.delete-banner")}
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
              {t("management.banner.display")}{" "}
              {(pagination.page - 1) * pagination.limit + 1} -{" "}
              {Math.min(pagination.page * pagination.limit, pagination.total)}{" "}
              {t("management.banner.banner-total")} {pagination.total}
            </div>
            <div className="flex gap-2">
              <Button
                size="small"
                onClick={() => handlePageChange(pagination.page - 1)}
                disabled={pagination.page <= 1}
                icon={<Icon icon="lucide:chevron-left" className="h-4 w-4" />}
              >
                {t("management.banner.previous")}
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
                icon={<Icon icon="lucide:chevron-right" className="h-4 w-4" />}
              >
                {t("management.banner.next")}
              </Button>
            </div>
          </div>
        )}
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
