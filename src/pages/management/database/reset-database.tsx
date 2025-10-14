import { useState } from "react";
import { Modal, Button, message } from "antd";
import { Card, CardContent } from "@/ui/card";
import { Icon } from "@/components/icon";

export default function ResetDatabase() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    setLoading(true);
    setTimeout(() => {
      message.success("✅ Reset Database thành công!");
      setLoading(false);
      setOpen(false);
    }, 2000);
  };

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="cursor-pointer transition hover:shadow-md bg-gradient-to-br from-red-50 to-red-100 border-red-200 dark:from-red-900/20 dark:to-red-800/30 dark:border-red-700"
      >
        <CardContent className="px-4 py-6 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-red-800 dark:text-red-300">
              Reset Database
            </p>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              Xóa toàn bộ dữ liệu và khôi phục hệ thống về mặc định.
            </p>
          </div>
          <div className="p-2 bg-red-500 rounded-full">
            <Icon icon="lucide:trash-2" className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      <Modal
        title="Reset Database"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleReset}
        confirmLoading={loading}
        okText="Xác nhận Reset"
        okButtonProps={{ danger: true }}
      >
        <p className="text-red-600">
          ⚠️ Cảnh báo: Thao tác này sẽ xóa toàn bộ dữ liệu và không thể hoàn
          tác.
        </p>
      </Modal>
    </>
  );
}
