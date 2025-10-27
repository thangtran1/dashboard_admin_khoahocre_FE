import { useState, useEffect } from "react";
import { Modal, Upload, Button, Typography, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";
import { useTranslation } from "react-i18next";

export default function RestoreModal({
  visible,
  onCancel,
  onRestore,
  loading,
}: {
  visible: boolean;
  onCancel: () => void;
  onRestore: (file: File) => Promise<{ success: boolean; message: string }>;
  loading?: boolean;
}) {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [fileList, setFileList] = useState<UploadFile[]>([]);

  useEffect(() => {
    if (!visible) {
      setFile(null);
      setFileList([]);
    }
  }, [visible]);

  const handleRestoreClick = async () => {
    if (!file) return;

    const result = await onRestore(file);
    if (result.success) {
      setFile(null);
      setFileList([]);
    }
  };

  return (
    <Modal
      title={
        <Typography.Title level={4} className="text-blue-600 m-0">
          🔄 {t("sys.database.restore-backup")}
        </Typography.Title>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleRestoreClick}
      okText={t("sys.database.restore-backup")}
      cancelText={t("sys.database.cancel")}
      okButtonProps={{ disabled: !file, loading }}
      width={500}
      centered
      className="p-6"
    >
      <Space direction="vertical" size="middle" className="w-full">
        <Upload
          beforeUpload={(f) => {
            setFile(f);
            setFileList([f]);
            return false;
          }}
          fileList={fileList}
          maxCount={1}
          accept=".zip,.json"
          onRemove={() => {
            setFile(null);
            setFileList([]);
          }}
          className="w-full"
        >
          <Button
            icon={<UploadOutlined />}
            type="primary"
            className="w-full hover:bg-blue-700 transition-colors"
          >
            {t("sys.database.select-backup-file")}
          </Button>
        </Upload>

        {file ? (
          <Typography.Text type="success" className="block text-center">
            ✅ {t("sys.database.selected-file")}: {file.name}
          </Typography.Text>
        ) : (
          <Typography.Text type="danger" className="block text-center">
            ⚠️ {t("sys.database.please-select-file")}
          </Typography.Text>
        )}

        <Typography.Paragraph className="text-gray-500 text-sm text-center">
          {t("sys.database.only-support-json-or-zip-file")}
        </Typography.Paragraph>
      </Space>
    </Modal>
  );
}
