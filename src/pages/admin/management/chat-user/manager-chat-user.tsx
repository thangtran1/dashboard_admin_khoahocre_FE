import React, { useState, useEffect, useRef, useMemo } from "react";
import {
  Input,
  Button,
  Tooltip,
  Popover,
  Avatar,
  Space,
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
import { useTranslation } from "react-i18next";

const { Title } = Typography;

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
    <div className={`flex mt-1 ${isAdmin ? "justify-end" : "justify-start"}`}>
      <div
        className={`flex flex-col max-w-[70%] ${
          isAdmin ? "items-end" : "items-start"
        }`}
      >
        <div
          className={`px-4 py-3 rounded-[18px] break-words shadow-sm ${
            isAdmin
              ? "bg-primary text-primary-foreground rounded-br-[4px]"
              : "bg-background text-muted-foreground rounded-bl-[4px]"
          }`}
        >
          {msg.content}
        </div>
        {showTimestamp && (
          <span className="text-xs text-muted-foreground mt-1 px-2">
            {format(new Date(msg.timestamp), "HH:mm")}
          </span>
        )}
      </div>
    </div>
  );
};

const ManagerChatUser: React.FC<ManagerChatUserProps> = () => {
  const userInfo = useUserInfo();
  const { t } = useTranslation();

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
      <div className="text-center text-muted-foreground text-sm p-4">
        {t("management.chat.please-login")}
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
    <div className="h-[calc(100vh-120px)] text-card-foreground rounded-xl border shadow-sm overflow-hidden">
      <div className="flex h-full">
        {/* Panel danh sách người dùng */}
        <div className="w-[350px] border-r border-border flex flex-col bg-background">
          <div className="px-5 py-4 border-b border-border bg-background">
            <Title level={4} style={{ margin: 0 }}>
              {t("management.chat.manager-chat-user")}
            </Title>
          </div>
          <div className="p-3 border-b border-border">
            <Input
              prefix={<SearchOutlined className="text-muted-foreground" />}
              placeholder={t("management.chat.search-user")}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              variant="filled"
            />
          </div>
          <div className="overflow-y-auto py-3" style={{ maxHeight: "650px" }}>
            {filteredConversations.map((convo) => {
              const isOnline = onlineUsers?.includes(convo.userId);
              return (
                <div
                  key={convo.userId}
                  className={`cursor-pointer px-5 py-3 rounded-lg mx-2 my-1 transition-colors border-none flex items-center ${
                    selectedUserId === convo.userId
                      ? "bg-primary/10 border-r-4 border-primary"
                      : "hover:bg-muted/50"
                  }`}
                  onClick={() => selectUser(convo.userId)}
                >
                  <div className="flex items-center gap-2">
                    <Avatar
                      size={40}
                      className={`mr-3 ${
                        isOnline ? "bg-success" : "bg-gray-400"
                      }`}
                    >
                      {convo.userEmail.charAt(0).toUpperCase()}
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium text-sm">
                        {convo.userName || convo.userEmail}
                      </div>
                      <div className="text-xs text-muted-foreground whitespace-nowrap overflow-hidden text-ellipsis mt-1">
                        {convo.lastMessage?.content ||
                          (convo.hasConversation
                            ? t("management.chat.no-message")
                            : t("management.chat.no-start-chat"))}
                      </div>
                    </div>
                  </div>
                  {convo.unreadCount > 0 && (
                    <div className="bg-error text-error-foreground rounded-full min-w-[20px] h-5 flex items-center justify-center text-xs font-medium">
                      {convo.unreadCount}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Panel chat */}
        <div className="flex-1 flex flex-col bg-background">
          {selectedConversation ? (
            <>
              <div className="flex justify-between items-center px-5 py-2 border-b border-border bg-background">
                <div className="flex gap-2 items-center">
                  <Avatar
                    size={40}
                    className={`mr-3 ${
                      isSelectedUserOnline ? "bg-success" : "bg-gray-400"
                    }`}
                  >
                    {selectedConversation.userEmail.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <div className="font-semibold text-base">
                      {selectedConversation.userName ||
                        selectedConversation.userEmail}
                    </div>
                    <div
                      className={`text-xs transition-colors mt-0.5 ${
                        isSelectedUserOnline
                          ? "text-success"
                          : "text-muted-foreground"
                      }`}
                    >
                      {isSelectedUserOnline
                        ? t("management.chat.online")
                        : t("management.chat.offline")}
                    </div>
                  </div>
                </div>
                <Space>
                  <Tooltip title={t("management.chat.call-video")}>
                    <Button type="text" icon={<VideoCameraOutlined />} />
                  </Tooltip>
                  <Tooltip title={t("management.chat.call-phone")}>
                    <Button type="text" icon={<PhoneOutlined />} />
                  </Tooltip>
                  <Tooltip title={t("management.chat.add-to-favorites")}>
                    <Button type="text" icon={<HeartOutlined />} />
                  </Tooltip>
                  <Tooltip title={t("management.chat.add")}>
                    <Button type="text" icon={<EllipsisOutlined />} />
                  </Tooltip>
                </Space>
              </div>

              <div
                className="flex-1 p-5 overflow-y-auto flex flex-col bg-muted/30"
                ref={listRef}
              >
                {Object.entries(groupedMessages).map(([date, msgs]) => (
                  <div key={date}>
                    <div className="text-center my-3">
                      <span className="text-muted-foreground text-xs px-3 py-1 bg-muted rounded-xl">
                        {formatDateHeader(date)}
                      </span>
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

              <div className="flex items-center px-5 py-4 bg-background border-t border-border">
                <Space size="small">
                  <Tooltip title={t("management.chat.add")}>
                    <Button type="text" icon={<PlusOutlined />} />
                  </Tooltip>
                  <Tooltip title={t("management.chat.camera")}>
                    <Button type="text" icon={<CameraOutlined />} />
                  </Tooltip>
                  <Tooltip title={t("management.chat.image")}>
                    <Button type="text" icon={<PictureOutlined />} />
                  </Tooltip>
                  <Tooltip title={t("management.chat.mic")}>
                    <Button type="text" icon={<AudioOutlined />} />
                  </Tooltip>
                </Space>
                <div className="relative flex-1 mx-3">
                  <Input
                    className="w-full rounded-[25px] px-4 py-3 pr-12 bg-input border-none shadow-none outline-none"
                    placeholder={t("management.chat.enter-message")}
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
                    title={t("management.chat.select-emoji")}
                    trigger="click"
                    placement="topRight"
                  >
                    <SmileOutlined className="absolute right-4 top-1/2 transform -translate-y-1/2 text-xl text-muted-foreground cursor-pointer" />
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
            <div className="flex-1 flex justify-center items-center text-muted-foreground text-base flex-col gap-4">
              {t("management.chat.select-user-to-start-chat")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagerChatUser;
