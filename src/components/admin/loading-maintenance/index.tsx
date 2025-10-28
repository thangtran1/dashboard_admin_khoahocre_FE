import React from "react";
import { Spin, Typography, Card } from "antd";
import { Loader } from "lucide-react";

const { Text } = Typography;

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
        className="shadow-xl rounded-2xl text-center w-full max-w-sm"
      >
        <Spin
          indicator={
            <Loader className="w-10 h-10 text-blue-500 animate-spin" />
          }
          size="large"
        />
        <div className="mt-5">
          <Text className="text-base text-gray-600">{message}</Text>
        </div>
      </Card>
    </div>
  );
};

export default LoadingMaintenance;
