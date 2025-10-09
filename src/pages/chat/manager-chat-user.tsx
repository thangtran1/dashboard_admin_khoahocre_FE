import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Input,
  Button,
  Tooltip,
  Popover,
  Avatar,
  Space,
  Card,
  Typography,
} from "antd";
import {
  VideoCameraOutlined,
  PhoneOutlined,
  HeartOutlined,
  AudioOutlined,
  PictureOutlined,
  CameraOutlined,
  PlusOutlined,
  SmileOutlined,
  EllipsisOutlined,
  SearchOutlined,
  SendOutlined,
} from "@ant-design/icons";
import { useChat } from "@/hooks/useChat";
import { ChatMessage, CurrentUser } from "@/types/entity";
import { format, isToday, isYesterday, differenceInMinutes } from "date-fns";
import { vi } from "date-fns/locale";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";
import { useUserInfo } from "@/store/userStore";

const { Title } = Typography;

const managerChatCss = `
.manager-chat-container {
  height: calc(100vh - 120px);
  display: flex;
  background-color: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
}

.user-list-panel {
  width: 350px;
  border-right: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.user-list-header {
  padding: 16px 20px;
  border-bottom: 1px solid #f0f0f0;
  background-color: #fafafa;
}

.user-list-search {
  padding: 12px;
  border-bottom: 1px solid #f0f0f0;
}

.user-list {
  flex: 1;
  overflow-y: auto;
}

.user-list-item {
  cursor: pointer;
  padding: 12px 16px !important;
  border-radius: 0;
  margin: 0;
  transition: background-color 0.2s;
  border: none !important;
  border-bottom: 1px solid #f0f0f0 !important;
}

.user-list-item:hover {
  background-color: #f5f5f5;
}

.user-list-item.active {
  background-color: #e6f7ff;
  border-right: 3px solid #1890ff;
}

.user-list-item-title {
  font-weight: 500;
  font-size: 14px;
}

.user-list-item-desc {
  font-size: 12px;
  color: #888;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin-top: 4px;
}

.chat-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 7px 20px;
  border-bottom: 1px solid #e0e0e0;
  background-color: #fafafa;
}

.chat-header-info {
  display: flex;
  align-items: center;
}

.chat-header-name {
  font-weight: 600;
  font-size: 16px;
}

.chat-header-status {
  font-size: 12px;
  transition: color 0.3s;
  margin-top: 2px;
}

.chat-content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  background-color: #f6f6f6;
}

.date-separator {
  text-align: center;
  margin: 12px 0;
}

.date-separator span {
  color: #888;
  font-size: 12px;
  padding: 4px 12px;
  background-color: #e9ebee;
  border-radius: 12px;
}

.chat-bubble-container {
  display: flex;
  margin-top: 4px;
}

.bubble-user {
  justify-content: flex-start;
}

.bubble-admin {
  justify-content: flex-end;
}

.bubble-wrapper {
  display: flex;
  flex-direction: column;
  max-width: 70%;
}

.bubble-wrapper.admin {
  align-items: flex-end;
}

.bubble-wrapper.user {
  align-items: flex-start;
}

.bubble-content {
  padding: 12px 16px;
  border-radius: 18px;
  word-break: break-word;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.content-user {
  background-color: #fff;
  color: #000;
  border-bottom-left-radius: 4px;
}

.content-admin {
  background-color: #1890ff;
  color: #fff;
  border-bottom-right-radius: 4px;
}

.bubble-timestamp {
  font-size: 11px;
  color: #999;
  margin-top: 4px;
  padding: 0 8px;
}

.chat-input-area {
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: #fff;
  border-top: 1px solid #e0e0e0;
}

.chat-input-wrapper {
  position: relative;
  flex: 1;
  margin: 0 12px;
}

.chat-input {
  width: 100% !important;
  border-radius: 25px !important;
  padding: 12px 50px 12px 16px !important;
  background-color: #f0f2f5 !important;
  border: none !important;
  box-shadow: none !important;
  outline: none !important;
}

.emoji-popover-icon {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 20px;
  color: #888;
  cursor: pointer;
}

.no-user-selected {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #888;
  font-size: 16px;
  flex-direction: column;
  gap: 16px;
}

.no-user-icon {
  font-size: 48px;
  color: #d9d9d9;
}
`;

interface ManagerChatUserProps {}

const ChatBubble = ({
  msg,
  currentAdminId,
  showTimestamp,
}: {
  msg: ChatMessage;
  currentAdminId: string;
  showTimestamp?: boolean;
}) => {
  const isAdmin = msg.senderId === currentAdminId;
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
        {showTimestamp && (
          <span className="bubble-timestamp">
            {format(new Date(msg.timestamp), "HH:mm")}
          </span>
        )}
      </div>
    </div>
  );
};

const ManagerChatUser: React.FC<ManagerChatUserProps> = () => {
  const userInfo = useUserInfo();

  const currentUser: CurrentUser = useMemo(
    () => ({
      id: userInfo?.id || "",
      email: userInfo?.email || "",
      username: userInfo?.username || "",
      role: (userInfo?.role as string) || "user",
    }),
    [userInfo]
  );

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const listRef = useRef<HTMLDivElement>(null);

  const {
    conversations,
    selectedUserId,
    messages,
    sendMessage,
    selectUser,
    onlineUsers,
  } = useChat(currentUser);

  const isSelectedUserOnline =
    selectedUserId && onlineUsers?.includes(selectedUserId);

  const handleSend = () => {
    if (inputValue.trim() && selectedUserId) {
      sendMessage(inputValue, selectedUserId);
      setInputValue("");
    } else {
      console.log("❌ Cannot send message:", {
        hasContent: !!inputValue.trim(),
        hasSelectedUser: !!selectedUserId,
      });
    }
  };

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

  useEffect(() => {
    if (listRef.current)
      listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [groupedMessages]);

  if (!userInfo || userInfo.role !== "admin") {
    return (
      <div style={{ padding: "20px", textAlign: "center", color: "#666" }}>
        Vui lòng đăng nhập với tài khoản super admin để sử dụng tính năng chat
      </div>
    );
  }

  const selectedConversation = (conversations ?? []).find(
    (c) => c.userId === selectedUserId
  );

  const filteredConversations = conversations.filter((convo) =>
    convo.userName.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div>
      <style>{managerChatCss}</style>
      <Card style={{ height: "100%" }}>
        <div className="manager-chat-container">
          <div className="user-list-panel">
            <div className="user-list-header">
              <Title level={4} style={{ margin: 0 }}>
                Quản lý chat
              </Title>
            </div>
            <div className="user-list-search">
              <Input
                prefix={<SearchOutlined style={{ color: "#999" }} />}
                placeholder="Tìm kiếm người dùng..."
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                variant="filled"
              />
            </div>
            <div className="user-list">
              {filteredConversations.map((convo) => {
                const isOnline = onlineUsers?.includes(convo.userId);
                return (
                  <div
                    key={convo.userId}
                    className={`user-list-item ${
                      selectedUserId === convo.userId ? "active" : ""
                    }`}
                    onClick={() => {
                      selectUser(convo.userId);
                    }}
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
                        selectedUserId === convo.userId
                          ? "#e6f7ff"
                          : "transparent",
                    }}
                    onMouseEnter={(e) => {
                      if (selectedUserId !== convo.userId) {
                        e.currentTarget.style.backgroundColor = "#f5f5f5";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (selectedUserId !== convo.userId) {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }
                    }}
                  >
                    <Avatar
                      size={40}
                      style={{
                        backgroundColor: isOnline ? "#52c41a" : "#d9d9d9",
                        marginRight: "12px",
                      }}
                    >
                      {convo.userEmail.charAt(0).toUpperCase()}
                    </Avatar>
                    <div style={{ flex: 1 }}>
                      <div
                        className="user-list-item-title"
                        style={{ fontWeight: 500 }}
                      >
                        {convo.userName || convo.userEmail}
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
                        {convo.lastMessage?.content ||
                          (convo.hasConversation
                            ? "Chưa có tin nhắn"
                            : "Chưa bắt đầu chat")}
                      </div>
                    </div>
                    {convo.unreadCount > 0 && (
                      <div
                        style={{
                          backgroundColor: "#ff4d4f",
                          color: "white",
                          borderRadius: "10px",
                          minWidth: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "12px",
                          fontWeight: 500,
                        }}
                      >
                        {convo.unreadCount}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="chat-panel">
            {selectedConversation ? (
              <>
                <div className="chat-header">
                  <div className="chat-header-info">
                    <Avatar
                      size={40}
                      style={{
                        backgroundColor: isSelectedUserOnline
                          ? "#52c41a"
                          : "#d9d9d9",
                        marginRight: 12,
                      }}
                    >
                      {selectedConversation.userEmail.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <div className="chat-header-name">
                        {selectedConversation.userName ||
                          selectedConversation.userEmail}
                      </div>
                      <div
                        className="chat-header-status"
                        style={{
                          color: isSelectedUserOnline ? "#52c41a" : "#999",
                        }}
                      >
                        {isSelectedUserOnline ? "Trực tuyến" : "Ngoại tuyến"}
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
                            currentAdminId={currentUser.id}
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
                      onKeyPress={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                          e.preventDefault();
                          handleSend();
                        }
                      }}
                    />
                    <Popover
                      content={
                        <EmojiPicker
                          onEmojiClick={(emojiData: EmojiClickData) =>
                            setInputValue((prev) => prev + emojiData.emoji)
                          }
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
                    onClick={handleSend}
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
      </Card>
    </div>
  );
};

export default ManagerChatUser;
