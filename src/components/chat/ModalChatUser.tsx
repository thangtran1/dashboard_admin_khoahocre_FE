import React, { useState, useEffect, useRef, useMemo } from "react";
import { Input, Button, Tooltip, Popover, Avatar, Space } from "antd";
import {
  InfoCircleOutlined,
  SendOutlined,
  AudioOutlined,
  PictureOutlined,
  CameraOutlined,
  PlusOutlined,
  SmileOutlined,
  RobotOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { useChat } from "@/hooks/useChat";
import { ChatMessage, CurrentUser } from "@/types/entity";
import { format, isToday, isYesterday, differenceInMinutes } from "date-fns";
import { vi } from "date-fns/locale";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

const userChatCss = `
.chat-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(0, 0, 0, 0.4); backdrop-filter: blur(2px); z-index: 999;
}
.chat-window {
  position: fixed; bottom: 70px; right: 60px; width: 380px; height: 520px;
  background-color: #fff; box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  border-radius: 20px; display: flex; flex-direction: column; z-index: 1000;
  overflow: hidden; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
.chat-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 12px 16px; border-bottom: 1px solid #f0f0f0; background-color: #fafafa; flex-shrink: 0;
}
.header-info { display: flex; align-items: center; gap: 10px; }
.header-info-name { font-weight: 600; font-size: 15px; }
.header-info-status { font-size: 12px; color: #52c41a; line-height: 1.3; }
.header-actions { display: flex; gap: 4px; }
.chat-messages {
  flex: 1; padding: 8px 16px; overflow-y: auto; display: flex; flex-direction: column; background-color: #f0f2f5;
}
.date-separator { text-align: center; margin: 12px 0; }
.date-separator span {
  color: #888; font-size: 12px; padding: 2px 10px; background-color: #e0e5eb; border-radius: 12px;
}
.chat-bubble-container { display: flex; gap: 8px; margin-top: 2px; }
.chat-bubble-container.user { justify-content: flex-end; }
.chat-bubble-container.admin { justify-content: flex-start; }
.bubble-wrapper { display: flex; flex-direction: column; max-width: 75%; }
.bubble-content { padding: 10px 16px; word-break: break-word; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
.bubble-content.user {
  background: linear-gradient(135deg, #0084ff, #006bb3); color: #fff; border-radius: 18px 18px 0 18px;
}
.bubble-content.admin { background: #fff; color: #000; border-radius: 18px 18px 18px 0; }
.bubble-timestamp { font-size: 11px; color: #999; margin-top: 5px; padding: 0 5px; }
.chat-bubble-container.user .bubble-timestamp { text-align: right; }
.chat-bubble-container.admin .bubble-timestamp { text-align: left; }
.chat-footer {
  display: flex; align-items: center; padding: 10px 12px;
  border-top: 1px solid #f0f0f0; background-color: #fafafa; gap: 6px; flex-shrink: 0;
}
.footer-input-wrapper { position: relative; flex: 1; }
.footer-input {
  width: 100% !important; border-radius: 22px !important; padding: 8px 40px 8px 16px !important;
  background-color: #f0f2f5 !important; border: none !important; box-shadow: none !important; outline: none !important;
}
.emoji-popover-icon {
  position: absolute; right: 12px; top: 50%; transform: translateY(-50%);
  cursor: pointer; color: #888; font-size: 20px;
}
`;

interface ModalChatUserProps {
  open: boolean;
  onClose: () => void;
  currentUser: CurrentUser;
}
const leftIcons = [
  { icon: <PlusOutlined />, title: "Thêm" },
  { icon: <CameraOutlined />, title: "Camera" },
  { icon: <PictureOutlined />, title: "Hình ảnh" },
  { icon: <AudioOutlined />, title: "Mic" },
];

const ChatBubble = ({
  msg,
  currentUserId,
  showTimestamp,
}: {
  msg: ChatMessage;
  currentUserId: string;
  showTimestamp: boolean;
}) => {
  const isUser = msg.senderId === currentUserId;
  const time = new Date(msg.timestamp);
  const timeStr = format(time, "HH:mm");

  return (
    <div className={`chat-bubble-container ${isUser ? "user" : "admin"}`}>
      <div className="bubble-wrapper">
        <div className={`bubble-content ${isUser ? "user" : "admin"}`}>
          {msg.content}
        </div>
        {showTimestamp && <div className="bubble-timestamp">{timeStr}</div>}
      </div>
    </div>
  );
};

const ModalChatUser: React.FC<ModalChatUserProps> = ({
  open,
  onClose,
  currentUser,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [showLeftIcons, setShowLeftIcons] = useState(true);
  const listRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage } = useChat(currentUser);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue.trim());
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setInputValue((prev) => prev + emojiData.emoji);
  };

  const groupedMessages = useMemo(() => {
    const groups: { [key: string]: ChatMessage[] } = {};
    messages.forEach((msg) => {
      const date = format(new Date(msg.timestamp), "yyyy-MM-dd");
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    return groups;
  }, [messages]);

  const formatDateHeader = (dateStr: string) => {
    const date = new Date(dateStr);
    if (isToday(date)) return "Hôm nay";
    if (isYesterday(date)) return "Hôm qua";
    return format(date, "dd/MM/yyyy", { locale: vi });
  };

  if (!open) return null;

  return (
    <>
      <style>{userChatCss}</style>
      <div className="chat-overlay" onClick={onClose} />
      <div className="chat-window" onClick={(e) => e.stopPropagation()}>
        <div className="chat-header">
          <div className="header-info">
            <Avatar
              size={32}
              icon={<RobotOutlined />}
              style={{ backgroundColor: "#1890ff" }}
            />
            <div>
              <div className="header-info-name">Hỗ trợ khách hàng</div>
              <div className="header-info-status">Trực tuyến</div>
            </div>
          </div>
          <div className="header-actions">
            <Tooltip title="Thông tin">
              <Button type="text" size="small" icon={<InfoCircleOutlined />} />
            </Tooltip>
            <Tooltip title="Đóng">
              <Button
                type="text"
                size="small"
                icon={<CloseOutlined />}
                onClick={onClose}
              />
            </Tooltip>
          </div>
        </div>

        <div className="chat-messages" ref={listRef}>
          {Object.entries(groupedMessages).map(([date, msgs]) => (
            <div key={date}>
              <div className="date-separator">
                <span>{formatDateHeader(date)}</span>
              </div>
              {msgs.map((msg, index) => {
                const prevMsg = index > 0 ? msgs[index - 1] : null;
                const currentTime = new Date(msg.timestamp);
                const prevTime = prevMsg ? new Date(prevMsg.timestamp) : null;
                const showTimestamp =
                  !prevTime || differenceInMinutes(currentTime, prevTime) >= 5;

                return (
                  <ChatBubble
                    key={msg.id}
                    msg={msg}
                    currentUserId={currentUser.id}
                    showTimestamp={showTimestamp}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="chat-footer">
          {showLeftIcons && (
            <Space size="small">
              {leftIcons.map((item, index) => (
                <Tooltip key={index} title={item.title}>
                  <Button type="text" size="small" icon={item.icon} />
                </Tooltip>
              ))}
            </Space>
          )}
          <div className="footer-input-wrapper">
            <Input
              className="footer-input"
              placeholder="Nhập tin nhắn..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              onFocus={() => setShowLeftIcons(false)}
              onBlur={() => setShowLeftIcons(true)}
            />
            <Popover
              content={
                <EmojiPicker
                  onEmojiClick={handleEmojiClick}
                  theme={Theme.LIGHT}
                  width={300}
                  height={400}
                />
              }
              title="Chọn emoji"
              trigger="click"
              placement="topRight"
            >
              <SmileOutlined className="emoji-popover-icon" />
            </Popover>
          </div>
          <Button
            type="primary"
            shape="circle"
            icon={<SendOutlined />}
            onClick={handleSendMessage}
            disabled={!inputValue.trim()}
          />
        </div>
      </div>
    </>
  );
};

export default ModalChatUser;
