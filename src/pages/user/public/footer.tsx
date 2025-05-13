import { Image } from "antd";
import {
  ChevronUp,
  Clock,
  Facebook,
  Instagram,
  InstagramIcon,
  MessageCircleMore,
  Phone,
  Youtube,
} from "lucide-react";

const Footer = () => {
  return (
    <>
      <footer className="bg-gray-100  py-10 px-6 md:px-20">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-8  text-gray-800">
          <div>
            <Image
              src={
                "https://khoahocre.com/wp-content/uploads/2023/05/noichiasenew-1.png"
              }
              alt="Logo"
              className="h-8 mb-4"
              mb-4
            />
            <div className="flex items-center gap-2 mb-1 text-gray-700">
              <Clock size={16} /> 7:00 - 24:00
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={16} /> 0888.993.991
            </div>
          </div>

          {/* Danh Mục */}
          <div>
            <h3 className="font-semibold mb-2">Danh Mục</h3>
            <ul className="space-y-1">
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
            <h3 className="font-semibold mb-2">Nội Dung</h3>
            <ul className="space-y-1">
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
            <h3 className="font-semibold mb-2">Thông Tin</h3>
            <ul className="space-y-1">
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
            <h3 className="font-semibold mb-2">Điểm Nổi Bật</h3>
            <ul className="space-y-1">
              <li>Quản lý người dùng</li>
              <li>Thiết bị sử dụng</li>
              <li>Báo Cáo</li>
              <li>Group Khóa Học</li>
              <li>Ngôn Ngữ</li>
            </ul>
          </div>
        </div>

        <div className="fixed bottom-8 left-6 flex flex-col gap-3 z-50">
          <div className="bg-red-700 rounded-full">
            <a
              href="https://facebook.com"
              className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Facebook size={20} className="text-white" />
            </a>
          </div>
          <div className="bg-green-700 rounded-full">
            <a
              href="https://zalo.me"
              className="w-12 h-12 rounded-full bg-blue-400 flex items-center justify-center shadow-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircleMore size={20} className="text-white" />
            </a>
          </div>
        </div>
      </footer>

      <div className="bg-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Text bên trái */}
          <p className="text-black  text-center md:text-left">
            © Copyright 2024{" "}
            <a href="#" className="text-blue-600 font-semibold hover:underline">
              Khoahocre
            </a>{" "}
            – Nơi chia sẻ khóa học tiết kiệm chuẩn gốc
          </p>

          {/* Icon mạng xã hội + DMCA */}
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <span>Kết nối với chúng tôi tại:</span>
            <div className="flex items-center gap-3">
              <a href="#" className="text-blue-900 hover:text-blue-600">
                <Facebook size={22} />
              </a>
              <a href="#" className="text-blue-900 hover:text-pink-600">
                <InstagramIcon size={22} />
              </a>
              <a href="#" className="text-blue-900 hover:text-red-600">
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
          className="fixed bottom-14 right-8 z-50 w-12 h-12 rounded-full border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white transition flex items-center justify-center"
        >
          <ChevronUp size={16} />
        </button>
      </div>
    </>
  );
};
export default Footer;
