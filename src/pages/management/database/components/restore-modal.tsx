import { useState, useEffect } from "react";
import { Modal, Upload, Button, Typography, Space } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import type { UploadFile } from "antd/es/upload/interface";

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
          🔄 Khôi phục dữ liệu
        </Typography.Title>
      }
      open={visible}
      onCancel={onCancel}
      onOk={handleRestoreClick}
      okText="Khôi phục"
      cancelText="Hủy"
      okButtonProps={{ disabled: !file, loading }}
      width={500}
      centered
      bodyStyle={{ padding: "24px" }}
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
            Chọn file backup
          </Button>
        </Upload>

        {file ? (
          <Typography.Text type="success" className="block text-center">
            ✅ Đã chọn: {file.name}
          </Typography.Text>
        ) : (
          <Typography.Text type="danger" className="block text-center">
            ⚠️ Vui lòng chọn file để upload
          </Typography.Text>
        )}

        <Typography.Paragraph className="text-gray-500 text-sm text-center">
          Chỉ hỗ trợ file JSON hoặc ZIP từ bản sao lưu.
        </Typography.Paragraph>
      </Space>
    </Modal>
  );
}
