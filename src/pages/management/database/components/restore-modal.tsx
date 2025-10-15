import React, { useState } from "react";
import { Modal, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

export default function RestoreModal({
  visible,
  onCancel,
  onRestore,
}: {
  visible: boolean;
  onCancel: () => void;
  onRestore: (file: File) => void;
}) {
  const [file, setFile] = useState<File | null>(null);

  return (
    <Modal
      title="Khôi phục dữ liệu từ bản sao lưu"
      open={visible}
      onCancel={onCancel}
      onOk={() => {
        if (file) onRestore(file);
      }}
      okText="Khôi phục"
      cancelText="Hủy"
      okButtonProps={{ disabled: !file }}
    >
      <Upload
        beforeUpload={(f) => {
          setFile(f);
          return false;
        }}
        maxCount={1}
        accept=".zip,.json"
      >
        <Button icon={<UploadOutlined />}>Chọn file backup</Button>
      </Upload>
      {file && (
        <p className="mt-3 text-sm text-green-600">Đã chọn: {file.name}</p>
      )}
    </Modal>
  );
}
