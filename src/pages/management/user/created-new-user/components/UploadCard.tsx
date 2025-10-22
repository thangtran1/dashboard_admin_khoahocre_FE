import { Card, Button, Upload } from "antd";
import { Icon } from "@/components/icon";
import { UploadProps } from "antd";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

interface UploadCardProps {
  onUpload: (file: File) => void;
  onDownloadTemplate: () => void;
  uploading: boolean;
}

export default function UploadCard({
  onUpload,
  onDownloadTemplate,
  uploading,
}: UploadCardProps) {
  const { t } = useTranslation();
  const uploadProps: UploadProps = {
    name: "file",
    multiple: false,
    accept: ".xlsx,.xls,.csv",
    showUploadList: false,
    beforeUpload: (file) => {
      const isExcel =
        file.type ===
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
        file.type === "application/vnd.ms-excel" ||
        file.type === "text/csv";

      if (!isExcel) {
        toast.error(t("sys.user-management.invalid-file-type"));
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        toast.error(t("sys.user-management.file-too-large"));
        return false;
      }

      onUpload(file);
      return false;
    },
  };

  return (
    <Card>
      <div className="text-center">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {t("sys.user-management.upload-excel-text")}
          </h2>
          <p className="text-muted-foreground text-lg">
            {t("sys.user-management.bulk-create-description")}
          </p>
        </div>

        <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
          <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
            <Icon icon="lucide:info" className="h-5 w-5" />
            {t("sys.user-management.instruction")}
          </h3>
          <div className="space-y-2 text-blue-700">
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">1.</span>
              <span>{t("sys.user-management.download-template")}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">2.</span>
              <span>{t("sys.user-management.fill-data")}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">3.</span>
              <span>{t("sys.user-management.delete-guide-sheet")}</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="font-bold text-blue-600">4.</span>
              <span>{t("sys.user-management.upload-file")}</span>
            </div>
          </div>
        </div>

        <div>
          <Button
            type="default"
            size="large"
            onClick={onDownloadTemplate}
            className="min-w-[200px] h-12"
          >
            <Icon icon="lucide:download" className="mr-2" />
            {t("sys.user-management.download-template")}
          </Button>
          <p className="text-gray-500 text-sm mt-2">
            {t("sys.user-management.download-template-description")}
          </p>
        </div>

        <Upload.Dragger
          {...uploadProps}
          className="!bg-background !border-2 !border-dashed !border-border hover:!border-primary hover:!bg-background transition-all duration-300"
        >
          <div>
            {uploading ? (
              <>
                <div className="w-16 h-16 mx-auto mb-4 bg-blue-100 rounded-full flex items-center justify-center">
                  <Icon
                    icon="lucide:loader-2"
                    className="w-8 h-8 text-blue-600 animate-spin"
                  />
                </div>
                <p className="text-lg font-medium text-blue-600 mb-2">
                  {t("sys.user-management.processing-file")}
                </p>
                <p className="text-gray-500">
                  {t("sys.user-management.please-wait")}
                </p>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  {t("sys.user-management.drag-and-drop-file")}
                </h2>
                <p className="text-muted-foreground mb-4">
                  {t("sys.user-management.support-file-types")}
                </p>
                <Button color="primary" variant="outlined" size="large">
                  <Icon icon="lucide:upload" className="mr-2" />
                  {t("sys.user-management.select-file")}
                </Button>
              </>
            )}
          </div>
        </Upload.Dragger>

        <div className="mt-8 bg-warning-lighter border border-warning-light rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon
              icon="lucide:alert-triangle"
              className="h-5 w-5 text-yellow-600 mt-0.5"
            />
            <div className="text-left">
              <h4 className="font-semibold text-yellow-800 mb-2">
                {t("sys.user-management.important-notice")}
              </h4>
              <ul className="text-yellow-700 text-sm space-y-1">
                <li>• {t("sys.user-management.all-email-must-be-unique")}</li>
                <li>
                  •{" "}
                  {t(
                    "sys.user-management.if-one-row-error-all-will-not-be-created"
                  )}
                </li>
                <li>
                  •{" "}
                  {t(
                    "sys.user-management.password-must-be-at-least-6-characters"
                  )}
                </li>
                <li>
                  • {t("sys.user-management.role-must-be-user-moderator-admin")}
                </li>
                <li>
                  •{" "}
                  {t(
                    "sys.user-management.status-must-be-active-inactive-banned"
                  )}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
