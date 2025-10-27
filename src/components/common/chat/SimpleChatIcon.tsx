import React from "react";
import { Button } from "antd";
import { MessageOutlined } from "@ant-design/icons";

interface SimpleChatIconProps {
  onClick: () => void;
}

const SimpleChatIcon: React.FC<SimpleChatIconProps> = ({ onClick }) => {
  return (
    <Button
      type="primary"
      shape="circle"
      size="large"
      icon={<MessageOutlined />}
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 999,
        width: "60px",
        height: "60px",
        fontSize: "24px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      }}
    />
  );
};

export default SimpleChatIcon;
