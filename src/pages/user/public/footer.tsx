import { contentWrapper } from "@/utils/use-always";
import { Image } from "antd";
import clsx from "clsx";
import {
  ChevronUp,
  Clock,
  Facebook,
  InstagramIcon,
  MessageCircleMore,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-background text-foreground">
        <div className={clsx("w-full px-4 lg:px-16 md:w-[70%] py-10 mx-auto")}>
          {/* Logo + Info: Mobile -> flex row | Desktop -> block */}
          <div className="flex flex-col md:block  md:grid-cols-5 gap-8">
            {/* Logo + Info */}
            <div className="flex md:block items-center gap-4 md:gap-0 md:col-span-1">
              <Image
                src="https://khoahocre.com/wp-content/uploads/2023/05/noichiasenew-1.png"
                alt="Logo"
                className="h-8 mb-0 md:mb-4"
              />
              <div className="flex flex-col justify-center text-sm text-muted-foreground">
                <div className="flex items-center gap-2 md:mb-1">
                  <Clock size={16} /> 7:00 - 24:00
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={16} /> 0888.993.991
                </div>
              </div>
            </div>

            {/* Grid for remaining 4 columns */}
            <div className="grid grid-cols-2 gap-8 md:col-span-4 md:grid-cols-4">
              {/* Danh Mục */}
              <div>
                <h3 className="font-semibold text-2xl mb-2">Danh Mục</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Đầu Tư</li>
                  <li>Marketing</li>
                  <li>Thiết Kế Đồ Họa</li>
                  <li>Dựng Phim - Nhiếp Ảnh</li>
                  <li>Ngoại Ngữ</li>
                  <li className="flex items-center gap-2">
                    Kinh Doanh{" "}
                    <span className="text-xs bg-yellow-400 text-white px-1 rounded">
                      SALE
                    </span>
                  </li>
                  <li>MMO - Kiếm Tiền</li>
                  <li>Người Nổi Tiếng</li>
                </ul>
              </div>

              {/* Nội Dung */}
              <div>
                <h3 className="font-semibold mb-2 text-2xl">Nội Dung</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Khóa Học Mới</li>
                  <li className="flex items-center gap-2">
                    Best Sell{" "}
                    <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                      POPULAR
                    </span>
                  </li>
                  <li>Khóa Học Sale</li>
                  <li>Khóa Học Free</li>
                  <li className="flex items-center gap-2">
                    Bài Viết{" "}
                    <span className="text-xs bg-green-200 text-green-800 px-1 rounded">
                      POPULAR
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    Mua Ebooks{" "}
                    <span className="text-xs bg-blue-200 text-blue-800 px-1 rounded">
                      NEW
                    </span>
                  </li>
                  <li>Sự Kiện</li>
                </ul>
              </div>

              {/* Thông Tin */}
              <div>
                <h3 className="font-semibold mb-2 text-2xl">Thông Tin</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Về Chúng Tôi</li>
                  <li>Bảo Mật</li>
                  <li>Liên Hệ</li>
                  <li className="flex items-center gap-2">
                    Chăm Sóc{" "}
                    <span className="text-xs bg-pink-200 text-pink-700 px-1 rounded">
                      HIRING
                    </span>
                  </li>
                  <li>Đăng Ký Bán Khóa Học</li>
                  <li>Điều Khoản Dịch Vụ</li>
                  <li>Chính Sách Riêng Tư</li>
                  <li>FEEDBACKS</li>
                </ul>
              </div>

              {/* Điểm Nổi Bật */}
              <div>
                <h3 className="font-semibold mb-2 text-2xl">Điểm Nổi Bật</h3>
                <ul className="space-y-1 text-muted-foreground">
                  <li>Quản lý người dùng</li>
                  <li>Thiết bị sử dụng</li>
                  <li>Báo Cáo</li>
                  <li>Group Khóa Học</li>
                  <li>Ngôn Ngữ</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Nút social nổi góc dưới bên trái */}
        <div className="fixed bottom-16 left-6 flex flex-col gap-2 z-50">
          <a
            href="https://facebook.com"
            className="w-12 h-12 rounded-full !bg-primary flex items-center justify-center shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Facebook size={20} className="text-white" />
          </a>
          <a
            href="https://zalo.me"
            className="w-12 h-12 rounded-full !bg-primary flex items-center justify-center shadow-lg"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircleMore size={20} className="text-white" />
          </a>
        </div>
      </footer>

      {/* Bottom footer */}
      <div className="bg-border/40">
        <div
          className={clsx(
            "w-full lg:px-16 mx-auto p-2 flex flex-col md:flex-row md:items-center md:justify-between gap-4",
            contentWrapper
          )}
        >
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © Copyright 2024
            <a
              href="#"
              className="text-primary text-md font-semibold hover:underline"
            >
              Khoahocre
            </a>
            – Nơi chia sẻ khóa học tiết kiệm chuẩn gốc
          </p>

          <div className="flex  md:h-[40px] flex-col md:flex-row md:pb-0 pb-12 items-center gap-2 md:gap-4 text-muted-foreground">
            <span>Kết nối với chúng tôi tại:</span>
            <div className="flex items-center gap-3">
              <a href="#" className="hover:text-primary">
                <Facebook size={22} />
              </a>
              <a href="#" className="hover:text-pink-600">
                <InstagramIcon size={22} />
              </a>
              <a href="#" className="hover:text-red-600">
                <Youtube size={22} />
              </a>
              <Image
                src="https://images.dmca.com/Badges/dmca-badge-w100-2x1-02.png?ID=27963a45-490d-46d3-89d8-492a06469df6"
                alt="DMCA Protected"
                className="h-6 w-auto"
              />
            </div>
          </div>
        </div>

        {/* Nút scroll lên đầu */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-16 right-8 z-50 w-12 h-12 rounded-full border border-primary text-primary hover:bg-primary hover:text-white transition flex items-center justify-center"
        >
          <ChevronUp size={16} />
        </button>
      </div>
    </>
  );
};

export default Footer;
