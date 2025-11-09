import { Button } from "@heroui/react";
import { Image } from "antd";
import {
  ChevronDown,
  ChevronUp,
  Heart,
  LogOut,
  Menu,
  Search,
  Shield,
  User,
  UserCircle,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";
import CartDropdown from "../cart/CartDropdown";
import { useRouter } from "@/router/hooks";
import { useUserActions, useUserToken } from "@/store/userStore";
import { useFavoriteStore } from "@/store/favoriteStore";
import { toast } from "sonner";
import { Link, replace } from "react-router";
import { useUserProfile } from "@/hooks/useUserProfile";
import userApi from "@/api/services/userApi";
import { useTranslation } from "react-i18next";

const navLinks = [
  { label: "Trang Chủ", href: "/", className: "text-primary font-semibold" },
  { label: "Shop Khóa Học Rẻ", href: "/shop" },
  { label: "Khóa Học Free", href: "/free" },
  { label: "Gói Hội Viên", href: "/goi-hoi-vien" },
  { label: "Combo Tiết Kiệm", href: "/combo" },
];

const HeaderTop = () => {
  const { t } = useTranslation();
  const { profile, refetch } = useUserProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [infoOpen, setInfoOpen] = useState(false);
  const [subGuideOpen, setSubGuideOpen] = useState(false);
  const router = useRouter();
  const { accessToken } = useUserToken();
  const { clearUserInfoAndToken } = useUserActions();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { favorites } = useFavoriteStore();

  // Listen for avatar updates
  useEffect(() => {
    const handleAvatarUpdate = () => {
      refetch(); // Refresh profile data
    };

    window.addEventListener("avatarUpdated", handleAvatarUpdate);
    window.addEventListener("profileUpdated", handleAvatarUpdate);

    return () => {
      window.removeEventListener("avatarUpdated", handleAvatarUpdate);
      window.removeEventListener("profileUpdated", handleAvatarUpdate);
    };
  }, [refetch]);

  const handleClick = () => {
    router.push("/login");
  };

  const handleLogout = async () => {
    try {
      const response = await userApi.logout();
      if (response.data?.success) {
        clearUserInfoAndToken();
        toast.success(t("auth.login.logoutSuccess"));
        replace("/login");
      } else {
        toast.error(response.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <header className="bg-background px-2 text-foreground border-b border-border">
        <div className="flex flex-col  md:flex-row items-start md:items-center justify-between gap-3">
          <div className="flex w-full md:w-auto justify-between items-center">
            <div className="flex justify-between w-full items-center gap-4">
              <button
                onClick={() => setMenuOpen(true)}
                className="md:hidden p-2"
              >
                <Menu className="w-6 h-6" />
              </button>
              <Image
                src="https://khoahocre.com/wp-content/uploads/2023/05/noichiasenew-1.png"
                alt="logo"
                width={160}
                height={40}
              />
              <div className="flex items-center gap-2 md:hidden">
                {!accessToken ? (
                  <div
                    className="flex items-center gap-1 cursor-pointer"
                    onClick={handleClick}
                  >
                    <User className="w-5 h-5" />
                    <span className="font-semibold">Đăng Nhập</span>
                  </div>
                ) : (
                  <div
                    className="relative group"
                    onMouseEnter={() => setDropdownOpen(true)}
                    onMouseLeave={() => setDropdownOpen(false)}
                  >
                    {/* Avatar + Tên */}
                    <div className="flex items-center gap-2 cursor-pointer  rounded-md">
                      <UserCircle className="w-5 h-5" />
                      <span className="font-medium text-sm">
                        {profile?.name || "Hồ sơ"}
                      </span>
                    </div>

                    {/* Dropdown */}
                    {dropdownOpen && (
                      <div className="absolute right-0  w-56 bg-muted rounded-xl border border-border shadow-xl z-50 animate-fade-in">
                        {/* Logo + tên hiển thị trên cùng */}
                        <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                          <Image
                            src="data:image/png;base64,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"
                            alt="Logo"
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">
                              {profile?.name || "Hồ sơ"}
                            </span>
                            <span className="text-xs">Tài khoản cá nhân</span>
                          </div>
                        </div>

                        {/* Nút Hồ sơ */}
                        <button
                          onClick={() => router.push("/profile")}
                          className="flex justify-between items-center w-full px-4 py-2 text-sm hover:bg-primary transition"
                        >
                          <span>Hồ sơ</span>
                          <UserCircle className="w-4 h-4 " />
                        </button>

                        <button
                          onClick={() => router.push("/tai-khoan")}
                          className="flex justify-between items-center w-full px-4 py-2 text-sm hover:bg-blue-400 transition"
                        >
                          <span>Tài khoản</span>
                          <User className="w-4 h-4" />
                        </button>

                        <button
                          onClick={() => router.push("/wish-list")}
                          className="relative flex justify-between items-center w-full px-4 py-2 text-sm text-pink-600 hover:bg-pink-50 transition"
                        >
                          <span>Yêu thích 1</span>

                          {/* Icon + badge */}
                          <div className="relative">
                            <Heart className="w-5 h-5 text-pink-500" />
                            {favorites.length >= 0 && (
                              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 leading-tight shadow">
                                {favorites.length}
                              </span>
                            )}
                          </div>
                        </button>

                        {/* Nút Đăng xuất */}
                        <button
                          onClick={handleLogout}
                          className="flex justify-between items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                        >
                          <span>Đăng xuất</span>
                          <LogOut className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex w-full items-center gap-3">
            <div className="flex items-center bg-muted px-3 py-2 rounded-lg flex-1">
              <Search className="w-4 h-4 text-muted-foreground mr-2" />
              <input
                type="text"
                placeholder="Tìm kiếm khóa học hoặc giảng viên tại đây..."
                className="w-full bg-transparent outline-none text-sm text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="relative">
              <CartDropdown />
            </div>

            <div className="hidden md:flex items-center gap-1 ml-4">
              {!accessToken ? (
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={handleClick}
                >
                  <User className="w-5 h-5" />
                  <Link to={"/login"}>
                    <span className="font-semibold">Đăng Nhập</span>
                  </Link>
                </div>
              ) : (
                <div
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  {/* Avatar + Tên */}
                  <div className="flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-muted rounded-md transition">
                    {profile?.avatar ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${
                          profile?.avatar
                        }`}
                        alt="Avatar"
                        className="w-6 h-6 rounded-full object-cover border border-gray-200"
                      />
                    ) : (
                      <UserCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium text-sm">
                      {profile?.name || "Hồ sơ"}
                    </span>
                  </div>

                  {/* Dropdown */}
                  {dropdownOpen && (
                    <div className="absolute right-0  w-56 bg-muted rounded-xl border border-border shadow-xl z-50 animate-fade-in">
                      {/* Avatar + tên hiển thị trên cùng */}
                      <div className="flex items-center gap-3 px-4 py-3 border-b border-border">
                        {profile?.avatar ? (
                          <img
                            src={`${import.meta.env.VITE_API_URL}${
                              profile?.avatar
                            }`}
                            alt="Avatar"
                            className="w-8 h-8 rounded-full object-cover border border-gray-200"
                          />
                        ) : (
                          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                            <UserCircle className="w-5 h-5 text-gray-500" />
                          </div>
                        )}
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">
                            {profile?.name || "Hồ sơ"}
                          </span>
                          <span className="text-xs">Tài khoản cá nhân</span>
                        </div>
                      </div>

                      {profile?.role === "admin" && (
                        <Link to={"/dashboard/workbench"}>
                          <button
                            onClick={() => router.push("/dashboard/workbench")}
                            className="flex justify-between items-center w-full px-4 py-2 text-sm hover:bg-primary transition"
                          >
                            <span>Trang Quản Trị</span>
                            <Shield className="w-4 h-4" />
                          </button>
                        </Link>
                      )}

                      {/* Nút Hồ sơ */}
                      <button
                        onClick={() => router.push("/ho-so")}
                        className="flex justify-between items-center w-full px-4 py-2 text-sm hover:bg-primary transition"
                      >
                        <span>Hồ sơ</span>
                        <UserCircle className="w-4 h-4 " />
                      </button>

                      <button
                        onClick={() => router.push("/wish-list")}
                        className="relative flex justify-between items-center w-full px-4 py-2 text-sm text-pink-600 hover:bg-pink-50 transition"
                      >
                        <span>Yêu thích 2</span>

                        {/* Icon + badge */}
                        <div className="relative">
                          <Heart className="w-5 h-5 text-pink-500" />
                          {favorites.length >= 0 && (
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full px-1.5 leading-tight shadow">
                              {favorites.length}
                            </span>
                          )}
                        </div>
                      </button>

                      {/* Nút Đăng xuất */}
                      <button
                        onClick={handleLogout}
                        className="flex justify-between items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        <span>Đăng xuất</span>
                        <LogOut className="w-4 h-4 text-red-500" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10 mt-4 text-sm font-medium whitespace-nowrap relative">
          <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Danh Mục Khóa Học
          </Button>
          {navLinks.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={item.className || ""}
            >
              {item.label}
            </a>
          ))}

          {/* Dropdown Thông Tin */}
          <div className="relative group">
            <div className="relative">
              <button className="cursor-pointer text-primary">
                Thông Tin ▾
              </button>

              {/* Hiển thị khi hover */}
              <div className="absolute top-full left-0 min-w-[220px] rounded-md border bg-background shadow-lg z-50 hidden group-hover:block">
                <a
                  href="/gioi-thieu"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Về chúng tôi
                </a>
                <a
                  href="/contact"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Liên hệ
                </a>

                {/* Chính sách bảo mật lồng trong dropdown cha */}
                <div className="w-full group/sub">
                  <button className="w-full text-left flex justify-between items-center px-4 py-2 hover:bg-background">
                    Hướng dẫn
                    <span className="text-sm">▸</span>
                  </button>
                  <div className="hidden group-hover/sub:block ml-4 border-l border-border pl-2">
                    <a
                      href="/buy-course"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Hướng dẫn mua khóa học
                    </a>
                    <a
                      href="/clear-cache"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Hướng dẫn xóa bộ nhớ đệm trình duyệtttt
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>

        {menuOpen && (
          <>
            <div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <div className="fixed top-0 left-0 h-full w-64 bg-background text-foreground shadow-lg z-50 overflow-y-auto">
              <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                <span className="font-semibold text-lg">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-4 px-4 py-6 text-sm font-medium">
                {navLinks.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className={item.className || ""}
                  >
                    {item.label}
                  </a>
                ))}

                {/* Dropdown Thông Tin */}
                <div>
                  <button
                    onClick={() => setInfoOpen((v) => !v)}
                    className="flex items-center justify-between w-full"
                  >
                    <span className="text-primary">Thông Tin</span>
                    {infoOpen ? (
                      <ChevronUp className="w-4 h-4" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </button>

                  {infoOpen && (
                    <div className="ml-4 mt-2 flex flex-col gap-2 text-gray-500 text-[13px]">
                      <a
                        href="/gioi-thieu"
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        Về chúng tôi
                      </a>
                      <a
                        href="/contact"
                        className="flex items-center gap-2 hover:text-primary"
                      >
                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                        Liên hệ
                      </a>
                      <div>
                        <button
                          onClick={() => setSubGuideOpen((prev) => !prev)}
                          className="flex items-center justify-between w-full text-left hover:text-primary"
                        >
                          <div className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                            Hướng dẫn
                          </div>
                          <span className="text-sm">
                            {subGuideOpen ? "▾" : "▸"}
                          </span>
                        </button>
                        {subGuideOpen && (
                          <div className="ml-4 mt-2 flex flex-col gap-2 text-gray-500 text-[13px]">
                            <a
                              href="/buy-course"
                              className="flex items-center gap-2 hover:text-primary"
                            >
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                              Hướng dẫn mua khóa học
                            </a>
                            <a
                              href="/huong-dan/kich-hoat"
                              className="flex items-center gap-2 hover:text-primary"
                            >
                              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full" />
                              Hướng dẫn xóa bộ nhớ đệm trình duyệt
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default HeaderTop;
