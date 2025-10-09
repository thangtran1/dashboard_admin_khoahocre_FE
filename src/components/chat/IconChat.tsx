import React from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";

interface IconChatProps {
  onClick: () => void;
}

const IconChat: React.FC<IconChatProps> = ({ onClick }) => {
  const circleSize = 50;

  const pingBadgeCss = `
    .chat-icon-wrapper { position: relative; width: 50px; height: 50px; }
    .ping-badge { position: absolute; top: 0; right: 0; z-index: 10; width: 12px; height: 12px; }
    .ping-badge-ping-effect { position: absolute; width: 100%; height: 100%; border-radius: 50%; background-color: #ff4d4f; animation: ping 1.5s cubic-bezier(0,0,0.2,1) infinite; }
    .ping-badge-dot { position: relative; width: 100%; height: 100%; border-radius: 50%; background-color: #ff4d4f; border: 2px solid white; }
    @keyframes ping { 75%, 100% { transform: scale(2.5); opacity: 0; } }
  `;

  return (
    <>
      <style>{pingBadgeCss}</style>

      <Tooltip title="Hỗ trợ trực tuyến" placement="left">
        <div
          onClick={onClick}
          style={{
            position: "fixed",
            bottom: 20,
            right: 30,
            zIndex: 1000,
            cursor: "pointer",
          }}
        >
          <div className="chat-icon-wrapper">
            <div className="ping-badge">
              <div className="ping-badge-ping-effect"></div>
              <div className="ping-badge-dot"></div>
            </div>

            <div
              style={{
                width: circleSize,
                height: circleSize,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #ff7e5f, #feb47b)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s",
                boxShadow: "0 6px 20px rgba(0, 0, 0, 0.4)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.15)";
                e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow =
                  "0 6px 20px rgba(0, 0, 0, 0.4)";
              }}
            >
              <MessageOutlined style={{ fontSize: 26, color: "#fff" }} />
            </div>
          </div>
        </div>
      </Tooltip>
    </>
  );
};

export default IconChat;
