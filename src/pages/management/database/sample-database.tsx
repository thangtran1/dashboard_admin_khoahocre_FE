import { useState } from "react";
import { Modal, message } from "antd";
import { Card, CardContent } from "@/ui/card";
import { Icon } from "@/components/icon";

export default function SampleData() {
  const [open, setOpen] = useState(false);

  const handleDownload = () => {
    message.info("📦 File mẫu đang được tải xuống...");
    setOpen(false);
  };

  return (
    <>
      <Card
        onClick={() => setOpen(true)}
        className="cursor-pointer transition hover:shadow-md bg-gradient-to-br from-green-50 to-green-100 border-green-200 dark:from-green-900/20 dark:to-green-800/30 dark:border-green-700"
      >
        <CardContent className="px-4 py-6 flex justify-between items-center">
          <div>
            <p className="text-lg font-semibold text-green-800 dark:text-green-300">
              File mẫu dữ liệu
            </p>
            <p className="text-sm text-green-700 dark:text-green-400 mt-1">
              Tải file mẫu CSV/JSON để nhập dữ liệu dễ dàng hơn.
            </p>
          </div>
          <div className="p-2 bg-green-500 rounded-full">
            <Icon icon="lucide:file-down" className="h-6 w-6 text-white" />
          </div>
        </CardContent>
      </Card>

      <Modal
        title="Tải file mẫu"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={handleDownload}
        okText="Tải file"
      >
        <p>Bạn có muốn tải file mẫu CSV hoặc JSON để nhập dữ liệu không?</p>
      </Modal>
    </>
  );
}
