import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from "react";
import { Input, Button, Tooltip, Popover, Avatar, Space } from "antd";
import {
  VideoCameraOutlined,
  PhoneOutlined,
  HeartOutlined,
  AudioOutlined,
  PictureOutlined,
  CameraOutlined,
  PlusOutlined,
  SmileOutlined,
  CloseOutlined,
  EllipsisOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useChat } from "@/hooks/useChat";
import { ChatMessage, CurrentUser, Conversation } from "@/types/entity";

import { format, isToday, isYesterday, differenceInMinutes } from "date-fns";
import { vi } from "date-fns/locale";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

const adminChatCss = `
.admin-chat-overlay {
  position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
  background-color: rgba(0,0,0,0.6); z-index: 999;
}
.admin-chat-window {
  position: fixed; bottom: 70px; right: 70px; 
  width: 700px; height: 600px; max-width: 90vw; max-height: 85vh;
  background-color: #fff; box-shadow: 0 15px 40px rgba(0,0,0,0.35);
  border-radius: 16px; display: flex; z-index: 1000; overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.user-list-panel {
  width: 35%; border-right: 1px solid #f0f0f0; display: flex; flex-direction: column;
}
.user-list-header {
  padding: 15px 20px; border-bottom: 1px solid #f0f0f0; font-weight: 600; font-size: 16px;
  display: flex; justify-content: space-between; align-items: center;
}
.user-list-search { padding: 10px; border-bottom: 1px solid #f0f0f0; }
.user-list { flex: 1; overflow-y: auto; }
.user-list-item {
  cursor: pointer; padding: 12px 20px !important; border-radius: 8px;
  margin: 4px 8px; transition: background-color 0.2s; border: none !important;
}
.user-list-item:hover { background-color: #f5f5f5; }
.user-list-item.active { background-color: #e6f7ff; }
.user-list-item-title { font-weight: 500; }
.user-list-item-desc { font-size: 12px; color: #888; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.chat-panel {
  width: 65%; display: flex; flex-direction: column; background-color: #f6f6f6;
}
.chat-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 15px 20px; border-bottom: 1px solid #e0e0e0; background-color: #fff;
}
.chat-header-info { display: flex; align-items: center; }
.chat-header-name { font-weight: 600; font-size: 16px; }
.chat-header-status { font-size: 12px; transition: color 0.3s; }
.chat-content {
  flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column;
}
.date-separator { text-align: center; margin: 12px 0; }
.date-separator span { color: #888; font-size: 12px; padding: 2px 10px; background-color: #e9ebee; border-radius: 12px; }
.chat-bubble-container { display: flex; margin-top: 2px; }
.bubble-user { justify-content: flex-start; }
.bubble-admin { display: flex; justify-content: flex-end; }
.bubble-wrapper { display: flex; flex-direction: column; max-width: 70%; }
.bubble-wrapper.admin { align-items: flex-end; }
.bubble-wrapper.user { align-items: flex-start; }
.bubble-content {
  padding: 10px 14px; border-radius: 18px; word-break: break-word;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
}
.content-user { background-color: #fff; color: #000; border-bottom-left-radius: 4px; }
.content-admin { background-color: #1890ff; color: #fff; border-bottom-right-radius: 4px; }
.bubble-timestamp { font-size: 11px; color: #999; margin-top: 5px; padding: 0 5px; }
.chat-input-area {
  display: flex; align-items: center; padding: 12px 20px;
  background-color: #fff; border-top: 1px solid #e0e0e0;
}
.chat-input-wrapper { position: relative; flex: 1; margin: 0 8px; }
.chat-input {
  width: 100% !important; border-radius: 25px !important; padding: 10px 48px 10px 15px !important;
  background-color: #f0f2f5 !important; border: none !important; box-shadow: none !important; outline: none !important;
}
.emoji-popover-icon {
  position: absolute; right: 15px; top: 50%; transform: translateY(-50%);
  font-size: 22px; color: #888; cursor: pointer;
}
.no-user-selected {
  flex: 1; display: flex; justify-content: center; align-items: center; color: #888; font-size: 14px;
}
`;

interface ModalChatAdminProps {
  open: boolean;
  onClose: () => void;
  currentUser: CurrentUser;
}

const ChatBubble = ({
  msg,
  currentUserId,
  showTimestamp,
}: {
  msg: ChatMessage;
  currentUserId: string;
  showTimestamp: boolean;
}) => {
  const isAdmin = msg.senderId === currentUserId;
  const time = new Date(msg.timestamp);
  const timeStr = format(time, "HH:mm");

  return (
    <div
      className={`chat-bubble-container ${
        isAdmin ? "bubble-admin" : "bubble-user"
      }`}
    >
      <div className={`bubble-wrapper ${isAdmin ? "admin" : "user"}`}>
        <div
          className={`bubble-content ${
            isAdmin ? "content-admin" : "content-user"
          }`}
        >
          {msg.content}
        </div>
        {showTimestamp && <div className="bubble-timestamp">{timeStr}</div>}
      </div>
    </div>
  );
};

const ModalChatAdmin: React.FC<ModalChatAdminProps> = ({
  open,
  onClose,
  currentUser,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const {
    conversations,
    selectedUserId,
    onlineUsers,
    sendMessage,
    selectUser,
    messages,
  } = useChat(currentUser);

  const activeConversation = conversations.find(
    (conv: Conversation) => conv.userId === selectedUserId
  );

  const scrollToBottom = useCallback(() => {
    if (listRef.current) {
      setTimeout(() => {
        if (listRef.current) {
          listRef.current.scrollTop = listRef.current.scrollHeight;
        }
      }, 100);
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [activeConversation, messages, scrollToBottom]);

  const handleSendMessage = () => {
    if (inputValue.trim() && selectedUserId) {
      sendMessage(inputValue.trim(), selectedUserId);
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

  const filteredConversations = useMemo(() => {
    if (!debouncedSearchTerm) {
      return conversations;
    }

    return conversations.filter(
      (conv: Conversation) =>
        (conv.userName || conv.userEmail)
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        conv.userEmail.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [conversations, debouncedSearchTerm]);

  const groupedMessages = useMemo(() => {
    if (!messages || messages.length === 0) return {};
    const groups: { [key: string]: ChatMessage[] } = {};
    messages.forEach((msg: ChatMessage) => {
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
      <style>{adminChatCss}</style>
      <div className="admin-chat-overlay" onClick={onClose} />
      <div className="admin-chat-window" onClick={(e) => e.stopPropagation()}>
        <div className="user-list-panel">
          <div className="user-list-header">
            <span>Danh sách khách hàng</span>
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={onClose}
            />
          </div>
          <div className="user-list-search">
            <Input
              placeholder="Tìm kiếm khách hàng..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div
            className="user-list"
            key={`user-list-${filteredConversations.length}`}
          >
            {filteredConversations.map((conversation: Conversation) => (
              <div
                key={conversation.userId}
                className={`user-list-item ${
                  selectedUserId === conversation.userId ? "active" : ""
                }`}
                onClick={() => selectUser(conversation.userId)}
                style={{
                  cursor: "pointer",
                  padding: "12px 20px",
                  borderRadius: "8px",
                  margin: "4px 8px",
                  transition: "background-color 0.2s",
                  border: "none",
                  display: "flex",
                  alignItems: "center",
                  backgroundColor:
                    selectedUserId === conversation.userId
                      ? "#e6f7ff"
                      : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (selectedUserId !== conversation.userId) {
                    e.currentTarget.style.backgroundColor = "#f5f5f5";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedUserId !== conversation.userId) {
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                <Avatar
                  size={40}
                  style={{
                    backgroundColor: onlineUsers.includes(conversation.userId)
                      ? "#52c41a"
                      : "#d9d9d9",
                    marginRight: "12px",
                  }}
                >
                  {conversation.userEmail.charAt(0).toUpperCase()}
                </Avatar>
                <div style={{ flex: 1 }}>
                  <div
                    className="user-list-item-title"
                    style={{ fontWeight: 500 }}
                  >
                    {conversation.userName || conversation.userEmail}
                  </div>
                  <div
                    className="user-list-item-desc"
                    style={{
                      fontSize: "12px",
                      color: "#888",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }}
                  >
                    {conversation.lastMessage?.content ||
                      (conversation.hasConversation
                        ? "Chưa có tin nhắn"
                        : "Chưa bắt đầu chat")}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="chat-panel">
          {activeConversation ? (
            <>
              <div className="chat-header">
                <div className="chat-header-info">
                  <Avatar
                    size={40}
                    style={{
                      backgroundColor: onlineUsers.includes(
                        activeConversation.userId
                      )
                        ? "#52c41a"
                        : "#d9d9d9",
                      marginRight: 12,
                    }}
                  >
                    {activeConversation.userEmail.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <div className="chat-header-name">
                      {activeConversation.userName ||
                        activeConversation.userEmail}
                    </div>
                    <div
                      className="chat-header-status"
                      style={{
                        color: onlineUsers.includes(activeConversation.userId)
                          ? "#52c41a"
                          : "#999",
                      }}
                    >
                      {onlineUsers.includes(activeConversation.userId)
                        ? "Trực tuyến"
                        : "Ngoại tuyến"}
                    </div>
                  </div>
                </div>
                <Space>
                  <Tooltip title="Gọi video">
                    <Button type="text" icon={<VideoCameraOutlined />} />
                  </Tooltip>
                  <Tooltip title="Gọi thoại">
                    <Button type="text" icon={<PhoneOutlined />} />
                  </Tooltip>
                  <Tooltip title="Thêm vào yêu thích">
                    <Button type="text" icon={<HeartOutlined />} />
                  </Tooltip>
                  <Tooltip title="Thêm">
                    <Button type="text" icon={<EllipsisOutlined />} />
                  </Tooltip>
                </Space>
              </div>

              <div className="chat-content" ref={listRef}>
                {Object.entries(groupedMessages).map(([date, msgs]) => (
                  <div key={date}>
                    <div className="date-separator">
                      <span>{formatDateHeader(date)}</span>
                    </div>
                    {msgs.map((msg, index) => {
                      const prevMsg = index > 0 ? msgs[index - 1] : null;
                      const currentTime = new Date(msg.timestamp);
                      const prevTime = prevMsg
                        ? new Date(prevMsg.timestamp)
                        : null;
                      const showTimestamp =
                        !prevTime ||
                        differenceInMinutes(currentTime, prevTime) >= 5;

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

              <div className="chat-input-area">
                <Space size="small">
                  <Tooltip title="Thêm">
                    <Button type="text" icon={<PlusOutlined />} />
                  </Tooltip>
                  <Tooltip title="Camera">
                    <Button type="text" icon={<CameraOutlined />} />
                  </Tooltip>
                  <Tooltip title="Hình ảnh">
                    <Button type="text" icon={<PictureOutlined />} />
                  </Tooltip>
                  <Tooltip title="Mic">
                    <Button type="text" icon={<AudioOutlined />} />
                  </Tooltip>
                </Space>
                <div className="chat-input-wrapper">
                  <Input
                    className="chat-input"
                    placeholder="Nhập tin nhắn..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={handleKeyPress}
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
                  disabled={!inputValue.trim() || !selectedUserId}
                />
              </div>
            </>
          ) : (
            <div className="no-user-selected">
              Chọn một khách hàng để bắt đầu trò chuyện
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ModalChatAdmin;
