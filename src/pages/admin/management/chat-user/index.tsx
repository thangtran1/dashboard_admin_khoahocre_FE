import { Icon } from "@/components/icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/ui/card";
import { Badge } from "@/ui/badge";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/ui/select";
import { Textarea } from "@/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface ChatMessage {
  id: string;
  sender: string;
  receiver: string;
  content: string;
  timestamp: string;
  status: "sent" | "delivered" | "read";
  type: "text" | "image" | "file";
}

interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  status: "online" | "offline" | "busy";
  lastMessage: string;
  unreadCount: number;
  lastSeen: string;
}

const mockUsers: ChatUser[] = [
  {
    id: "1",
    name: "Nguyễn Văn A",
    avatar: "👨‍💼",
    status: "online",
    lastMessage: "Xin chào, tôi cần hỗ trợ về sản phẩm",
    unreadCount: 3,
    lastSeen: "2 phút trước",
  },
  {
    id: "2",
    name: "Trần Thị B",
    avatar: "👩‍💻",
    status: "busy",
    lastMessage: "Cảm ơn bạn đã hỗ trợ",
    unreadCount: 0,
    lastSeen: "1 giờ trước",
  },
  {
    id: "3",
    name: "Lê Văn C",
    avatar: "👨‍🎓",
    status: "offline",
    lastMessage: "Tôi sẽ liên hệ lại sau",
    unreadCount: 1,
    lastSeen: "3 giờ trước",
  },
];

const mockMessages: ChatMessage[] = [
  {
    id: "1",
    sender: "user1",
    receiver: "admin",
    content: "Xin chào, tôi cần hỗ trợ về sản phẩm ABC",
    timestamp: "10:30",
    status: "read",
    type: "text",
  },
  {
    id: "2",
    sender: "admin",
    receiver: "user1",
    content: "Chào bạn! Tôi có thể giúp gì cho bạn?",
    timestamp: "10:32",
    status: "delivered",
    type: "text",
  },
  {
    id: "3",
    sender: "user1",
    receiver: "admin",
    content: "Tôi muốn biết thông tin chi tiết về sản phẩm",
    timestamp: "10:35",
    status: "read",
    type: "text",
  },
];

export default function ManagerChatUserPage() {
  const { t } = useTranslation();
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch = user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "busy":
        return "bg-yellow-500";
      case "offline":
        return "bg-gray-400";
      default:
        return "bg-gray-400";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "online":
        return "Trực tuyến";
      case "busy":
        return "Bận";
      case "offline":
        return "Ngoại tuyến";
      default:
        return "Không xác định";
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      const message: ChatMessage = {
        id: Date.now().toString(),
        sender: "admin",
        receiver: selectedUser.id,
        content: newMessage,
        timestamp: new Date().toLocaleTimeString("vi-VN", {
          hour: "2-digit",
          minute: "2-digit",
        }),
        status: "sent",
        type: "text",
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleSelectUser = (user: ChatUser) => {
    setSelectedUser(user);
    // Reset messages khi chọn user mới (có thể load messages từ API)
    setMessages(mockMessages);
  };

  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full border border-border shadow-lg bg-card">
          <CardHeader>
            <div className="flex items-center space-x-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Icon
                  icon="solar:chat-round-dots-bold"
                  className="w-6 h-6 text-primary"
                />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {t("management.chat.manager-chat-user")}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {t("management.chat.manager-chat-user-description")}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="h-[500px] flex bg-background rounded-lg overflow-hidden">
              {/* Sidebar - Danh sách người dùng */}
              <div className="w-1/3 border-r border-border bg-muted/30 flex flex-col">
                {/* Header */}
                <div className="p-3 border-b border-border bg-background">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-foreground">
                      {t("management.chat.conversation")}
                    </h3>
                    <Badge variant="secondary" className="text-xs">
                      {filteredUsers.length}
                    </Badge>
                  </div>

                  {/* Search và Filter */}
                  <div className="space-y-2">
                    <Input
                      placeholder={t("management.chat.search")}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-8 text-sm"
                    />
                    <Select
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger className="h-8 text-sm">
                        <SelectValue
                          placeholder={t("management.chat.filter-status")}
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">
                          {t("management.chat.all")}
                        </SelectItem>
                        <SelectItem value="online">
                          {t("management.chat.online")}
                        </SelectItem>
                        <SelectItem value="busy">
                          {t("management.chat.busy")}
                        </SelectItem>
                        <SelectItem value="offline">
                          {t("management.chat.offline")}
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Danh sách người dùng */}
                <div className="flex-1 overflow-y-auto">
                  {filteredUsers.map((user) => (
                    <motion.div
                      key={user.id}
                      whileHover={{
                        backgroundColor: "hsl(var(--muted))",
                        scale: 1.01,
                      }}
                      whileTap={{ scale: 0.99 }}
                      className={`p-3 border-b border-border cursor-pointer transition-all duration-200 ${
                        selectedUser?.id === user.id
                          ? "bg-blue-200 border-blue-300 shadow-md ring-2 ring-blue-200"
                          : "hover:bg-muted/50"
                      }`}
                      style={{
                        backgroundColor:
                          selectedUser?.id === user.id
                            ? "#1e3a8a"
                            : "transparent",
                        borderColor:
                          selectedUser?.id === user.id
                            ? "#3b82f6"
                            : "transparent",
                      }}
                      onClick={() => handleSelectUser(user)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="relative">
                          <div className="text-xl">{user.avatar}</div>
                          <div
                            className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-background ${getStatusColor(
                              user.status
                            )}`}
                          ></div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h3
                              className={`font-medium text-sm truncate transition-colors ${
                                selectedUser?.id === user.id
                                  ? "text-primary font-semibold"
                                  : "text-foreground"
                              }`}
                            >
                              {user.name}
                            </h3>
                            <span className="text-xs text-muted-foreground">
                              {user.lastSeen}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground truncate mt-0.5">
                            {user.lastMessage}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs text-muted-foreground">
                              {getStatusText(user.status)}
                            </span>
                            {user.unreadCount > 0 && (
                              <Badge
                                variant="destructive"
                                className="text-xs h-4 px-1"
                              >
                                {user.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Main Chat Area */}
              <div className="flex-1 flex flex-col bg-background">
                {selectedUser ? (
                  <>
                    {/* Chat Header */}
                    <div className="p-3 border-b border-border bg-primary/5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="relative">
                            <div className="text-xl">{selectedUser.avatar}</div>
                            <div
                              className={`absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-background ${getStatusColor(
                                selectedUser.status
                              )}`}
                            ></div>
                          </div>
                          <div>
                            <h3 className="font-semibold text-primary">
                              {selectedUser.name}
                            </h3>
                            <p className="text-xs text-muted-foreground">
                              {getStatusText(selectedUser.status)}
                            </p>
                          </div>
                        </div>
                        <div className="flex space-x-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                          >
                            <Icon
                              icon="solar:phone-bold"
                              className="w-3.5 h-3.5"
                            />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                          >
                            <Icon
                              icon="solar:video-camera-bold"
                              className="w-3.5 h-3.5"
                            />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 w-7 p-0"
                          >
                            <Icon
                              icon="solar:settings-bold"
                              className="w-3.5 h-3.5"
                            />
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-3 space-y-3">
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className={`flex ${
                            message.sender === "admin"
                              ? "justify-end"
                              : "justify-start"
                          }`}
                        >
                          <div
                            className={`max-w-xs lg:max-w-md px-3 py-2 rounded-lg text-sm ${
                              message.sender === "admin"
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-foreground"
                            }`}
                          >
                            <p className="text-sm">{message.content}</p>
                            <div
                              className={`flex items-center justify-between mt-1 text-xs ${
                                message.sender === "admin"
                                  ? "text-primary-foreground/70"
                                  : "text-muted-foreground"
                              }`}
                            >
                              <span>{message.timestamp}</span>
                              {message.sender === "admin" && (
                                <Icon
                                  icon={
                                    message.status === "read"
                                      ? "solar:check-read-bold"
                                      : message.status === "delivered"
                                      ? "solar:check-circle-bold"
                                      : "solar:check-bold"
                                  }
                                  className="w-3 h-3"
                                />
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Message Input */}
                    <div className="p-3 border-t border-border bg-muted/30">
                      <div className="flex space-x-2">
                        <div className="flex-1">
                          <Textarea
                            placeholder={t("management.chat.enter-message")}
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              !e.shiftKey &&
                              handleSendMessage()
                            }
                            className="min-h-[40px] resize-none text-sm"
                          />
                        </div>
                        <Button
                          onClick={handleSendMessage}
                          disabled={!newMessage.trim()}
                          size="sm"
                          className="h-10 w-10 p-0"
                        >
                          <Icon icon="solar:plain-2-bold" className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center">
                    <div className="text-center">
                      <Icon
                        icon="solar:chat-round-dots-bold"
                        className="w-12 h-12 text-muted-foreground mx-auto mb-3"
                      />
                      <h3 className="font-medium text-foreground mb-1">
                        {t("management.chat.select-conversation")}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {t("management.chat.select-user-to-start-chat")}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
