import { useState } from "react";
import { Modal, Button, message } from "antd";
import { Card, CardContent } from "@/ui/card";
import { Icon } from "@/components/icon";

export default function BackupDatabase() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBackup = async () => {
    setLoading(true);
    setTimeout(() => {
      message.success("🎉 File backup đã được tải xuống thành công!");
      setLoading(false);
      setOpen(false);
    }, 1500);
  };

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="cursor-pointer transition hover:shadow-md bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 dark:from-blue-900/20 dark:to-blue-800/30 dark:border-blue-700"
      >
        <CardContent className="px-4 py-6 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
              Backup Database
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Tạo bản sao lưu toàn bộ dữ liệu để phục hồi khi cần.
            </p>
          </div>
          <div className="p-2 bg-blue-500 rounded-full">
            <Icon
              icon="lucide:database-backup"
              className="h-6 w-6 text-white"
            />
          </div>
        </CardContent>
      </Card>

      <Modal
        title="Tạo bản sao lưu"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleBackup}
        confirmLoading={loading}
        okText="Tải về"
      >
        <p>Bạn có chắc chắn muốn tạo bản sao lưu dữ liệu hiện tại không?</p>
      </Modal>
    </>
  );
}
