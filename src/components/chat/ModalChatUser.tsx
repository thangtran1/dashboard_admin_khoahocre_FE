import React, { useState, useRef, useEffect } from "react";
import { Button, Input, Avatar, List, Typography, Space } from "antd";
import { SendOutlined, CloseOutlined, UserOutlined } from "@ant-design/icons";
import { ChatMessage, CurrentUser } from "@/types/entity";
import { useChat } from "@/hooks/useChat";

const { Text } = Typography;

interface ModalChatUserProps {
  open: boolean;
  onClose: () => void;
  currentUser: CurrentUser;
}

const ModalChatUser: React.FC<ModalChatUserProps> = ({
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
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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

  const formatTime = (timestamp: string) =>
    new Date(timestamp).toLocaleTimeString("vi-VN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-background/50 z-[1000] flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="w-4/5 max-w-xl h-3/5 bg-background rounded-lg fixed right-[70px] bottom-[70px] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b border-border bg-muted">
          <div>
            <Text strong>Chat Support</Text>
            <div>
              <Text
                type={isConnected ? "success" : "danger"}
                className="text-[12px]"
              >
                {isConnected ? "Connected" : "Disconnected"}
              </Text>
            </div>
          </div>
          <Button type="text" icon={<CloseOutlined />} onClick={onClose} />
        </div>

        <div className="flex flex-1 overflow-hidden">
          {currentUser.role === "admin" && (
            <div className="w-64 border-r border-border flex flex-col">
              <div className="px-3 py-2 border-b border-gray-200">
                <Text strong>Online Users</Text>
              </div>
              <div className="flex-1 overflow-auto">
                <List
                  dataSource={onlineUsers}
                  renderItem={(userId: string) => (
                    <List.Item
                      className={`cursor-pointer ${
                        selectedUserId === userId ? "bg-blue-50" : ""
                      }`}
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

          <div className="flex-1 flex flex-col">
            <div className="flex-1 p-4 overflow-auto bg-muted">
              {messages.length === 0 ? (
                <div className="text-center text-gray-400 mt-12">
                  No messages yet. Start a conversation!
                </div>
              ) : (
                messages.map((message: ChatMessage) => (
                  <div
                    key={message.id}
                    className={`flex mb-3 ${
                      message.senderId === currentUser.id
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[70%] px-3 py-2 rounded-xl shadow-sm ${
                        message.senderId === currentUser.id
                          ? "bg-blue-500 text-white"
                          : "bg-background text-foreground"
                      }`}
                    >
                      <div>{message.content}</div>
                      <div className="text-[11px] opacity-70 mt-1 text-right">
                        {formatTime(message.timestamp)}
                      </div>
                    </div>
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className=" py-3 border-t border-border bg-background">
              <Space.Compact className="w-full">
                <Input
                  placeholder="Nhập tin nhắn..."
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
                  Gửi tin nhắn
                </Button>
              </Space.Compact>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalChatUser;
