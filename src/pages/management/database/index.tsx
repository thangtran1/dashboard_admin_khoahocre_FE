import React, { useState, useEffect } from "react";
import { Button, Card, Table, message, Upload, Modal } from "antd";
import {
  UploadOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { databaseAdmin } from "@/api/services/databaseApi";

export default function DatabaseManagement() {
  const [dbInfo, setDbInfo] = useState<any>(null);
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [restoreModalVisible, setRestoreModalVisible] = useState(false);
  const [restoreFile, setRestoreFile] = useState<File | null>(null);

  const fetchDbInfo = async () => {
    try {
      const res = await databaseAdmin.getDatabaseInfo();
      setDbInfo(res.data.data);
    } catch (err) {
      message.error("Lấy thông tin DB thất bại");
    }
  };

  const fetchBackups = async () => {
    try {
      const res = await databaseAdmin.listBackups();
      setBackups(res.data.data || []);
    } catch (err) {
      message.error("Lấy danh sách backup thất bại");
    }
  };

  useEffect(() => {
    fetchDbInfo();
    fetchBackups();
  }, []);

  const handleBackup = async () => {
    setLoading(true);
    try {
      const res = await databaseAdmin.backupDatabase();
      message.success("Tạo backup thành công");
      fetchBackups();
    } catch {
      message.error("Tạo backup thất bại");
    } finally {
      setLoading(false);
    }
  };

  const handleRestore = async () => {
    if (!restoreFile) return message.warning("Chưa chọn file");
    setLoading(true);
    try {
      await databaseAdmin.restoreDatabase(restoreFile);
      message.success("Khôi phục thành công");
      setRestoreModalVisible(false);
      fetchDbInfo();
      fetchBackups();
    } catch {
      message.error("Khôi phục thất bại");
    } finally {
      setLoading(false);
      setRestoreFile(null);
    }
  };

  const handleDelete = async () => {
    Modal.confirm({
      title: "Xác nhận xóa toàn bộ dữ liệu?",
      onOk: async () => {
        setLoading(true);
        try {
          await databaseAdmin.deleteDatabase();
          message.success("Đã xóa dữ liệu");
          fetchDbInfo();
          fetchBackups();
        } catch {
          message.error("Xóa dữ liệu thất bại");
        } finally {
          setLoading(false);
        }
      },
    });
  };

  const columns = [
    { title: "Tên file", dataIndex: "filename", key: "filename" },
    { title: "Ngày tạo", dataIndex: "createdAt", key: "createdAt" },
    { title: "Kích thước", dataIndex: "size", key: "size" },
    {
      title: "Tác vụ",
      key: "action",
      render: (_: any, record: any) => (
        <Button
          icon={<DownloadOutlined />}
          onClick={() => window.open(record.filename, "_blank")}
          size="small"
        >
          Tải về
        </Button>
      ),
    },
  ];

  return (
    <div className="space-y-6 p-6">
      <Card title="Thông tin Database">
        {dbInfo ? (
          <div className="space-y-2">
            <p>
              <b>Tên DB:</b> {dbInfo.dbName}
            </p>
            <p>
              <b>Collections ({dbInfo.collectionsCount}):</b>{" "}
              {dbInfo.collections.join(", ")}
            </p>
            <p>
              <b>Dung lượng dữ liệu:</b> {dbInfo.dataSize} /{" "}
              {dbInfo.storageSize}
            </p>
            <p>
              <b>Số index:</b> {dbInfo.indexes}
            </p>
            <p>
              <b>Thời gian:</b> {dbInfo.timestamp}
            </p>
          </div>
        ) : (
          <p>Đang tải...</p>
        )}
      </Card>

      <Card title="Backup Database">
        <div className="flex space-x-2">
          <Button type="primary" loading={loading} onClick={handleBackup}>
            Tạo backup
          </Button>
          <Button onClick={() => setRestoreModalVisible(true)}>
            Khôi phục
          </Button>
          <Button danger onClick={handleDelete}>
            Xóa toàn bộ dữ liệu
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={backups}
          rowKey="filename"
          style={{ marginTop: 16 }}
        />
      </Card>

      <Modal
        title="Khôi phục Database"
        open={restoreModalVisible}
        onOk={handleRestore}
        onCancel={() => setRestoreModalVisible(false)}
        okText="Khôi phục"
      >
        <Upload
          beforeUpload={(file) => {
            setRestoreFile(file);
            return false; // không auto upload
          }}
        >
          <Button icon={<UploadOutlined />}>Chọn file backup</Button>
        </Upload>
        {restoreFile && <p>File đã chọn: {restoreFile.name}</p>}
      </Modal>
    </div>
  );
}
