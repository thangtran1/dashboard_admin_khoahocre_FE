import React, { useState } from "react";
import { Table, Button, Modal, message, Space } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { databaseAdmin } from "@/api/services/databaseApi";
import dayjs from "dayjs";
import { toast } from "sonner";

export default function BackupList({
  backups,
  reload,
}: {
  backups: any[];
  reload: () => Promise<void>;
}) {
  const [viewModal, setViewModal] = useState(false);
  const [viewContent, setViewContent] = useState<string>("");

  const handleDeleteBackup = async (filename: string) => {
        try {
          const res = await databaseAdmin.deleteBackup(filename);
          if (res.data.success) {
            toast.success(res.data.message, { closeButton: true });
            await reload();
          } else {
            toast.error(res.data.message || "Không thể xóa bản sao lưu!", { closeButton: true });
          }
        } catch {
          message.error("Lỗi khi xóa bản sao lưu!");
        } 
      }

  const handleViewBackup = async (filename: string) => {
    try {
      const res = await databaseAdmin.viewBackup(filename);
      if (res.data.success) {
        setViewContent(JSON.stringify(res.data.data, null, 2));
        setViewModal(true);
      } else {
        message.error("Không thể xem nội dung!");
      }
    } catch {
      message.error("Lỗi khi xem nội dung file!");
    }
  };

  const handleDownloadBackup = async (filename: string) => {
    try {
      const res = await databaseAdmin.downloadBackup(filename);
      console.log(res);
      if (res.data.data && res.data.success) {
        const blob = new Blob([res.data.data], {
          type: "application/octet-stream",
        });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        message.success("Tải file thành công!");
      } else {
        message.error(res.data.message || "Không thể tải file!");
      }
    } catch {
      message.error("Lỗi khi tải file!");
    }
  };

  const columns = [
    {
      title: "Tên file",
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: "Ngày tạo",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).format("HH:mm:ss DD/MM/YYYY") : "—",
    },
    {
      title: "Hành động",
      key: "actions",
      render: (_: any, record: any) => (
        
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewBackup(record.filename)}
          >
            Xem
          </Button>
          <Button
            icon={<CloudDownloadOutlined />}
            onClick={() => handleDownloadBackup(record.filename)}
          >
            Tải
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteBackup(record.filename)}
          >
            Xóa
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <h3 className="text-base font-semibold mb-3 text-gray-700">
        Danh sách bản sao lưu
      </h3>
      <Table
        columns={columns}
        dataSource={backups}
        rowKey="filename"
        pagination={{ pageSize: 5 }}
      />
      <Modal
        title="Nội dung bản sao lưu"
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={[
          <Button key="close" onClick={() => setViewModal(false)}>
            Đóng
          </Button>,
        ]}
        width={800}
      >
        <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-[500px]">
          {viewContent}
        </pre>
      </Modal>
    </>
  );
}
