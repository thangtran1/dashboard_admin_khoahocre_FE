import { useState } from "react";
import { Table, Button, Modal, message, Space } from "antd";
import {
  EyeOutlined,
  DeleteOutlined,
  CloudDownloadOutlined,
  DatabaseOutlined,
} from "@ant-design/icons";
import { databaseAdmin } from "@/api/services/databaseApi";
import dayjs from "dayjs";
import { toast } from "sonner";
import { Icon } from "@/components/icon";
import { useTranslation } from "react-i18next";
import { Separator } from "@/ui/separator";

interface Backup {
  filename: string;
  size: number;
  createdAt: string;
}

export default function BackupList({
  backups,
  reload,
}: {
  backups: Backup[];
  reload: () => Promise<void>;
}) {
  const { t } = useTranslation();
  const [viewModal, setViewModal] = useState(false);
  const [viewContent, setViewContent] = useState<string>("");

  const handleDeleteBackup = async (filename: string) => {
    try {
      const res = await databaseAdmin.deleteBackup(filename);
      if (res.success) {
        toast.success(res.message, { closeButton: true });
        await reload();
      } else {
        toast.error(res.message || t("sys.database.delete-backup-error"), {
          closeButton: true,
        });
      }
    } catch {
      message.error(t("sys.database.delete-backup-error"));
    }
  };

  const handleViewBackup = async (filename: string) => {
    try {
      const res = await databaseAdmin.viewBackup(filename);
      if (res.success) {
        setViewContent(JSON.stringify(res.data, null, 2));
        setViewModal(true);
      } else {
        message.error(t("sys.database.view-backup-error"));
      }
    } catch {
      message.error(t("sys.database.view-backup-error"));
    }
  };

  // backup-list.tsx
  const handleDownloadBackup = async (filename: string) => {
    try {
      const res = await databaseAdmin.downloadBackupJson(filename);
      if (!res.success)
        throw new Error(res.message || t("sys.database.download-backup-error"));

      const { filename: name, content } = res.data;

      // Base64 → Blob
      const byteCharacters = atob(content);
      const byteNumbers = new Array(byteCharacters.length);
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      const blob = new Blob([byteArray], { type: "application/json" });

      // Tạo link download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast.success(res.message);
    } catch (error: any) {
      toast.error(error.message || t("sys.database.download-backup-error"));
    }
  };

  const columns = [
    {
      title: t("sys.database.filename"),
      dataIndex: "filename",
      key: "filename",
    },
    {
      title: t("sys.database.created-at"),
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text: string) =>
        text ? dayjs(text).format("HH:mm:ss DD/MM/YYYY") : "—",
    },
    {
      title: t("sys.database.actions"),
      key: "actions",
      align: "center" as "center",
      render: (_: any, record: Backup) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => handleViewBackup(record.filename)}
          >
            {t("sys.database.view")}
          </Button>
          <Button
            icon={<CloudDownloadOutlined />}
            onClick={() => handleDownloadBackup(record.filename)}
          >
            {t("sys.database.download")}
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteBackup(record.filename)}
          >
            {t("sys.database.delete")}
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {/* Title */}
      <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
        <Icon icon="lucide:database" className="h-5 w-5 text-blue-600" />
        {t("sys.database.backup-list")}
      </h2>
      <Separator className="my-4" />
      {/* Backup Table */}
      <div className="overflow-x-auto bg-background shadow-md rounded-xl border border-border">
        <Table
          columns={columns}
          dataSource={backups}
          rowKey="filename"
          pagination={false}
          className="min-w-full"
          bordered
          size="middle"
          scroll={{ x: 800 }}
        />
      </div>

      {/* View Backup Modal */}
      <Modal
        title={
          <span className="text-blue-600 font-semibold flex items-center gap-2">
            <DatabaseOutlined /> {t("sys.database.backup-content")}
          </span>
        }
        open={viewModal}
        onCancel={() => setViewModal(false)}
        footer={[
          <Button
            key="close"
            onClick={() => setViewModal(false)}
            type="primary"
            className="bg-blue-600 hover:bg-blue-700"
          >
            {t("sys.database.close")}
          </Button>,
        ]}
        width={800}
        centered
        classNames={{ content: "!p-4" }}
        className="rounded-xl"
      >
        <pre className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg text-sm text-gray-700 dark:text-gray-200 overflow-auto max-h-[500px]">
          {viewContent}
        </pre>
      </Modal>
    </div>
  );
}
