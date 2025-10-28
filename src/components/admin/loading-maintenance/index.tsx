import React from "react";
import { Spin, Card } from "antd";
import { Loader } from "lucide-react";


interface LoadingMaintenanceProps {
  message?: string;
}

const LoadingMaintenance: React.FC<LoadingMaintenanceProps> = ({
  message = "Đang kiểm tra trạng thái hệ thống...",
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 via-white to-blue-100 p-6">
      <Card
        bordered={false}
        className="shadow-xl rounded-2xl !bg-white/40 text-center  w-full max-w-sm"
      >
        <Spin
          indicator={
            <Loader className="w-10 h-10 text-blue-500 animate-spin" />
          }
          size="large"
        />
        <div className="mt-5">
          <div className="text-base text-gray-700">{message}</div>
        </div>
      </Card>
    </div>
  );
};

export default LoadingMaintenance;
