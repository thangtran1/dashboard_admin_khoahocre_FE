import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { CurrentUser } from "@/types/entity";
import { useUserInfo } from "@/store/userStore";

interface ChatContextType {
  isChatOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  currentUser: CurrentUser | null;
  setCurrentUser: (user: CurrentUser | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const userInfo = useUserInfo();

  useEffect(() => {
    if (userInfo && userInfo.id) {
      setCurrentUser({
        id: userInfo.id,
        email: userInfo.email as string,
        username: userInfo.username as string,
        role: userInfo.role as string,
      });
    } else {
      setCurrentUser(null);
    }
  }, [userInfo]);

  const openChat = () => {
    setIsChatOpen(true);
  };
  const closeChat = () => {
    setIsChatOpen(false);
  };

  return (
    <ChatContext.Provider
      value={{
        isChatOpen,
        openChat,
        closeChat,
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};
