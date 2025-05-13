import { Home, BookOpen, Search, User } from "lucide-react";
import { useLocation, useNavigate } from "react-router";

const MobileBottomNav = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { icon: Home, label: "Trang Chủ", path: "/user" },
    { icon: BookOpen, label: "Khóa học", path: "/courses" },
    { icon: Search, label: "Tìm kiếm", path: "/search" },
    { icon: User, label: "Account", path: "/account" },
  ];

  const handleClick = (path: string): void => {
    navigate(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around items-center h-14 md:hidden z-50">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = location.pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => handleClick(item.path)}
            className={`flex flex-col items-center ${
              isActive ? "text-blue-600 font-bold" : "text-gray-600"
            }`}
          >
            <Icon size={20} />
            <span className="text-xs mt-1">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
