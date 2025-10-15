import React, { useEffect, useState } from "react";
import { Card, Button, Space, Modal, message, Spin, Popconfirm, Typography } from "antd";
import {
  DatabaseOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  FileAddOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { databaseAdmin, DatabaseInfoResponse } from "@/api/services/databaseApi";
import DatabaseInfo from "./components/inforCard";
import BackupList from "./components/backup-list";
import { toast } from "sonner";
const { Text } = Typography;  

export default function DatabaseManagement() {
  const [dbInfo, setDbInfo] = useState<any>(null);
  const [backups, setBackups] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const infoRes = await databaseAdmin.getDatabaseInfo();
      const backupRes = await databaseAdmin.listBackups();

      if (infoRes.data.success) setDbInfo(infoRes.data.data as unknown as DatabaseInfoResponse);
      if (backupRes.data.success) setBackups(backupRes.data.data as unknown as any[]);
    } catch (error) {
      message.error("Không thể tải thông tin cơ sở dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleBackup = async () => {
    setLoading(true);
    try {
      const res = await databaseAdmin.backupDatabase();
      if (res.data.success) {
        toast.success("Tạo bản sao lưu thành công!", {
          closeButton: true,
        });
        await fetchData();
      } else {
        toast.error(res.data.message || "Tạo bản sao lưu thất bại!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <Card
        title={
          <span className="text-blue-700 font-semibold">
            <DatabaseOutlined /> Quản lý cơ sở dữ liệu
          </span>
        }
        extra={
          <Space>
            <Button icon={<ReloadOutlined />} onClick={fetchData}>
              Làm mới
            </Button>
            <Button
              type="primary"
              icon={<FileAddOutlined />}
              onClick={handleBackup}
            >
              Tạo bản sao lưu
            </Button>
            <Button danger icon={<DeleteOutlined />} onClick={() => setDeleteModalVisible(true)}>
              Xóa toàn bộ dữ liệu
            </Button>
          </Space>
        }
      >
        {loading ? (
          <div className="text-center py-6">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <DatabaseInfo dbInfo={dbInfo} />
            <BackupList backups={backups} reload={fetchData} />
          </>
        )}
      </Card>



<Modal
  open={deleteModalVisible}
  onOk={async () => {
    setLoading(true);
    try {
      const res = await databaseAdmin.deleteDatabase();
      console.log(res);
    
      if (res?.data?.success) {
        await fetchData();
    
        if (res.data.message === "Đã xóa toàn bộ dữ liệu!") {
          toast.success(res.data.message, { closeButton: true });
        } else if (res.data.message === "Không có dữ liệu để xóa!") {
          toast.warning(res.data.message, { closeButton: true });
        }
      } else {
        message.error("Xóa thất bại!");
      }
    } catch (error) {
      message.error("Xóa thất bại!");
    } finally {
      setLoading(false);
      setDeleteModalVisible(false);
    }
  }}
  onCancel={() => setDeleteModalVisible(false)}
  okText="Xóa"
  okType="danger"
  cancelText="Hủy"
  centered
  confirmLoading={loading}
  className="rounded-xl"
>
  <div className="flex flex-col items-center justify-center text-center space-y-4">
    <ExclamationCircleOutlined className="text-red-500 text-5xl mb-2" />
    <Text className="text-lg font-semibold text-gray-800">
      Xác nhận xóa toàn bộ dữ liệu?
    </Text>
    <Text type="secondary">
      Hành động này sẽ <span className="text-red-500 font-medium">xóa vĩnh viễn</span> tất cả dữ liệu trong hệ thống.
      Bạn có chắc chắn muốn tiếp tục?
    </Text>
  </div>
</Modal>

    </div>
  );
}
