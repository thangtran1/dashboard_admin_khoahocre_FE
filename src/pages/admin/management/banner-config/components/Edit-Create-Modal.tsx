import { Button, Modal } from "antd";
import { Switch } from "@/ui/switch";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Textarea } from "@/ui/textarea";
import { useTranslation } from "react-i18next";
import {
  BannerConfig,
  BannerSettings,
  CreateBannerRequest,
} from "@/api/services/bannerApi";

export default function EditCreateModal({
  editingBanner,
  isModalOpen,
  resetForm,
  handleUpdateBanner,
  handleCreate,
  loading,
  formData,
  settings,
  setFormData,
}: {
  editingBanner: BannerConfig | null;
  isModalOpen: boolean;
  resetForm: () => void;
  handleUpdateBanner: () => void;
  handleCreate: () => void;
  loading: boolean;
  formData: CreateBannerRequest;
  setFormData: (data: CreateBannerRequest) => void;
  settings: BannerSettings | null;
}) {
  const { t } = useTranslation();
  return (
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
                placeholder={t("management.banner.banner-content-placeholder")}
                value={formData.content}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    content: e.target.value as string,
                  });
                }}
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
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value) || 0,
                    });
                  }}
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-semibold text-foreground">
                  {t("management.banner.banner-status")}
                </Label>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <Switch
                    checked={formData.isActive}
                    onCheckedChange={(checked) => {
                      setFormData({
                        ...formData,
                        isActive: checked as boolean,
                      });
                    }}
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
  );
}
