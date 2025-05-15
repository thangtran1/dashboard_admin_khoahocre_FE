import { Button } from "@heroui/react";
import { Image } from "antd";
import { Menu, Search, ShoppingCart, User, X } from "lucide-react";
import { useState } from "react";

const HeaderTop = () => {
  const [menuOpen, setMenuOpen] = useState(false);

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
                <User className="w-5 h-5" />
                <span className="text-sm font-medium">Đăng Nhập</span>
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
              <ShoppingCart className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                0
              </span>
            </div>

            <div className="hidden md:flex items-center gap-1 ml-4">
              <User className="w-5 h-5" />
              <span className="font-semibold">Đăng Nhập</span>
            </div>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10 mt-4 text-sm font-medium">
          <Button className="bg-primary text-primary-foreground px-4 py-2 rounded-md">
            Danh Mục Khóa Học
          </Button>
          <a href="/" className="text-primary font-semibold">
            Trang Chủ
          </a>
          <a href="/">Shop Khóa Học Rẻ</a>
          <a href="/">Khóa Học Free</a>
          <a href="/">Gói Hội Viên</a>
          <a href="/">Combo Tiết Kiệm</a>
          <a href="/">Thông Tin ▾</a>
        </nav>

        {menuOpen && (
          <>
            <div
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/40 z-40"
            />
            <div className="fixed top-0 left-0 h-full w-64 bg-background text-foreground shadow-lg z-50">
              <div className="flex justify-between items-center px-4 py-3 border-b border-border">
                <span className="font-semibold text-lg">Menu</span>
                <button onClick={() => setMenuOpen(false)} className="p-2">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="flex flex-col gap-4 px-4 py-6 text-sm font-medium">
                <a href="/" className="text-primary">
                  Trang Chủ
                </a>
                <a href="/">Shop Khóa Học Rẻ</a>
                <a href="/">Khóa Học Free</a>
                <a href="/">Combo Tiết Kiệm</a>
                <a href="/">Gói Hội Viên</a>
                <a href="/">Thông Tin</a>
                <a href="/">Hướng Dẫn Mua Khóa Học</a>
                <a href="/">Đăng Ký</a>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default HeaderTop;
