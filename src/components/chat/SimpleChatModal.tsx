import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Avatar, List, Typography, Space } from "antd";
import { SendOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { ChatMessage, CurrentUser } from "@/types/entity";
import { useChat } from "@/hooks/useChat";

const { Text } = Typography;

interface SimpleChatModalProps {
  open: boolean;
  onClose: () => void;
  currentUser: CurrentUser;
}

const SimpleChatModal: React.FC<SimpleChatModalProps> = ({
  open,
  onClose,
  currentUser,
}) => {
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const {
    messages,
    isConnected,
    onlineUsers,
    selectedUserId,
    sendMessage,
    selectUser,
  } = useChat(open ? currentUser : null);

  useEffect(() => {
    if (messagesEndRef.current) {
      setTimeout(() => {
        if (messagesEndRef.current) {
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue.trim(), selectedUserId || undefined);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!open) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "80%",
          maxWidth: "800px",
          height: "80%",
          backgroundColor: "white",
          borderRadius: "12px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: "16px",
            borderBottom: "1px solid #f0f0f0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#fafafa",
          }}
        >
          <div>
            <Text strong>Chat Support</Text>
            <div>
              <Text
                type={isConnected ? "success" : "danger"}
                style={{ fontSize: "12px" }}
              >
                {isConnected ? "Connected" : "Disconnected"}
              </Text>
            </div>
          </div>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {currentUser.role === "admin" && (
            <div
              style={{
                width: "250px",
                borderRight: "1px solid #f0f0f0",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{ padding: "12px", borderBottom: "1px solid #f0f0f0" }}
              >
                <Text strong>Online Users</Text>
              </div>
              <div style={{ flex: 1, overflow: "auto" }}>
                <List
                  dataSource={onlineUsers}
                  renderItem={(userId: string) => (
                    <List.Item
                      style={{
                        cursor: "pointer",
                        backgroundColor:
                          selectedUserId === userId ? "#e6f7ff" : "transparent",
                      }}
                      onClick={() => selectUser(userId)}
                    >
                      <List.Item.Meta
                        avatar={<Avatar icon={<UserOutlined />} />}
                        title={`User ${userId.slice(-4)}`}
                        description="Online"
                      />
                    </List.Item>
                  )}
                />
              </div>
            </div>
          )}

          <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
            <div
              style={{
                flex: 1,
                padding: "16px",
                overflow: "auto",
                backgroundColor: "#f9f9f9",
              }}
            >
              {messages.length === 0 ? (
                <div
                  style={{
                    textAlign: "center",
                    color: "#999",
                    marginTop: "50px",
                  }}
                >
                  No messages yet. Start a conversation!
                </div>
              ) : (
                messages.map((message: ChatMessage) => (
                  <div
                    key={message.id}
                    style={{
                      display: "flex",
                      justifyContent:
                        message.senderId === currentUser.id
                          ? "flex-end"
                          : "flex-start",
                      marginBottom: "12px",
                    }}
                  >
                    <div
                      style={{
                        maxWidth: "70%",
                        padding: "8px 12px",
                        borderRadius: "12px",
                        backgroundColor:
                          message.senderId === currentUser.id
                            ? "#1890ff"
                            : "white",
                        color:
                          message.senderId === currentUser.id
                            ? "white"
                            : "black",
                        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                      }}
                    >
                      <div>{message.content}</div>
                      <div
                        style={{
                          fontSize: "11px",
                          opacity: 0.7,
                          marginTop: "4px",
                        }}
                      >
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div
              style={{
                padding: "16px",
                borderTop: "1px solid #f0f0f0",
                backgroundColor: "white",
              }}
            >
              <Space.Compact style={{ width: "100%" }}>
                <Input
                  placeholder="Type a message..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={handleKeyPress}
                  disabled={!isConnected}
                />
                <Button
                  type="primary"
                  icon={<SendOutlined />}
                  onClick={handleSendMessage}
                  disabled={!inputValue.trim() || !isConnected}
                >
                  Send
                </Button>
              </Space.Compact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleChatModal;
