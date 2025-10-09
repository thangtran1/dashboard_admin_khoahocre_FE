import React from "react";
import { useChatContext } from "./ChatProvider";
import ModalChatUser from "./ModalChatUser";
import ModalChatAdmin from "./ModalChatAdmin";
import IconChat from "./IconChat";
import { CurrentUser } from "@/types/entity";

const ChatWrapper: React.FC = () => {
  const { isChatOpen, openChat, closeChat, currentUser } = useChatContext();

  const handleOpenChat = () => {
    openChat();
  };

  if (!currentUser) return null;

  const chatUser: CurrentUser = {
    id: currentUser.id,
    email: currentUser.email,
    username: currentUser.username,
    role: currentUser.role,
  };
  return (
    <>
      <IconChat onClick={handleOpenChat} />
      {currentUser.role === "admin" ? (
        <ModalChatAdmin
          open={isChatOpen}
          onClose={closeChat}
          currentUser={chatUser}
        />
      ) : (
        <ModalChatUser
          open={isChatOpen}
          onClose={closeChat}
          currentUser={chatUser}
        />
      )}
    </>
  );
};

export default ChatWrapper;
