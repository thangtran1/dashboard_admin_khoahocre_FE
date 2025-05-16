import Breadcrumbs from "@/utils/Breadcrumb";
import { Mail, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import QrCode from "@/assets/images/qrcode.jpg";
const fakeOrder = {
  id: "56482",
  date: "16 Tháng 5, 2025",
  email: "devzonea@theblackants.com",
  phone: "0389473754",
  name: "WEBSITE NHÓM",
  total: 1148000,
  method: "Thanh toán ACB",
  items: [
    {
      title:
        "Khóa Học Facebook Ads Funnel Update Noti Education | Pre-Order 2025",
      quantity: 1,
      price: 149000,
    },
    {
      title:
        "Khóa Học Truyền Nghề YouTube K3 – Bagi Academy (Độc Quyền Mới Nhất)",
      quantity: 1,
      price: 999000,
    },
  ],
};

export default function CheckoutConfirmPage() {
  const navigate = useNavigate();

  const handlePay = () => {
    navigate("/thanh-toan/thanh-cong");
  };

  return (
    <>
      <div className="p-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>
      <div className=" mx-auto text-foreground">
        <h1 className="text-2xl font-bold text-primary">Xác Nhận Thanh Toán</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 mt-4 gap-6">
          {/* Cột trái - Chi tiết đơn hàng */}
          <div className="bg-muted border border-border rounded-lg p-6 text-sm space-y-6">
            <h2 className="text-base font-semibold mb-3">Chi Tiết Đơn Hàng</h2>

            {/* Header table */}
            <div className="hidden sm:grid grid-cols-6 font-semibold text-muted-foreground border-b pb-2">
              <span className="col-span-4 text-base">Sản phẩm</span>
              <span className="col-span-2 text-right text-base">Tổng</span>
            </div>

            {/* Danh sách sản phẩm */}
            {fakeOrder.items.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-1 sm:grid-cols-6 items-center text-sm border-b py-2"
              >
                <div className="col-span-4">
                  {item.title} × {item.quantity}
                </div>
                <div className="text-right col-span-2 text-primary font-medium">
                  {(item.price * item.quantity).toLocaleString()} ₫
                </div>
              </div>
            ))}

            {/* Tổng */}
            <div className="text-sm space-y-2 pt-3 border-t">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tổng số phụ:</span>
                <span>{fakeOrder.total.toLocaleString()} ₫</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  Phương thức thanh toán:
                </span>
                <span className="text-foreground font-medium">
                  {fakeOrder.method}
                </span>
              </div>
              <div className="flex justify-between font-bold text-lg text-primary">
                <span>Tổng cộng:</span>
                <span>{fakeOrder.total.toLocaleString()} ₫</span>
              </div>
            </div>

            {/* Địa chỉ thanh toán */}
            <div className="mt-6 border border-border p-2 rounded-lg space-y-2">
              <h3 className="font-semibold text-base mb-2">
                Địa Chỉ Thanh Toán
              </h3>
              <div className="flex items-center gap-2">
                <User size={14} /> {fakeOrder.name}
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} /> {fakeOrder.phone}
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} /> {fakeOrder.email}
              </div>
            </div>

            {/* Nút thanh toán */}
            <div className="flex flex-col sm:flex-row gap-3 sm:justify-end mt-6">
              <button
                onClick={handlePay}
                className="bg-primary text-white px-6 py-2 rounded text-sm hover:bg-primary/90"
              >
                Thanh toán
              </button>
              <Link
                to={"/thanh-toan"}
                className="border border-border px-6 py-2 rounded text-sm text-muted-foreground hover:bg-muted"
              >
                Hủy
              </Link>
            </div>
          </div>

          {/* Cột phải - QR + Chuyển khoản */}
          <div className="bg-muted border border-border rounded-lg p-6 text-sm space-y-6">
            <h2 className="text-base font-semibold text-foreground">
              THÔNG TIN CHUYỂN KHOẢN
            </h2>
            <p className="text-muted-foreground text-sm">
              Hỗ trợ ví điện tử MoMo/ZaloPay hoặc app ngân hàng chuyển khoản
              24/7
            </p>

            <div className="flex flex-col items-center gap-2">
              <img
                src={QrCode}
                alt="QR chuyển khoản"
                className="w-48 h-48 rounded shadow border"
              />
              <a
                href={QrCode}
                download
                className="text-green-600 text-sm hover:underline"
              >
                ⬇️ Tải xuống QR
              </a>
              <p className="text-xs text-muted-foreground text-center">
                Bước 1: Mở ví / ngân hàng
                <br />
                Bước 2: Quét mã và thanh toán
                <br />
                Bước 3: Nhập đúng nội dung chuyển khoản
              </p>
            </div>

            <div className="border border-border rounded-lg p-4 bg-muted space-y-2 text-[15px]">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Ngân hàng:</span>
                <span className="font-bold text-blue-600">BIDV</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tài khoản:</span>
                <span className="font-medium">6261330376</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Số tiền:</span>
                <span className="text-primary font-semibold">
                  {fakeOrder.total.toLocaleString()} ₫
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Nội dung:</span>
                <span className="bg-red-100 text-red-600 font-bold px-2 py-1 rounded">
                  KHR{fakeOrder.id}
                </span>
              </div>
            </div>

            <div className="bg-red-100 text-red-600 p-3 rounded text-sm">
              <p>
                Vui lòng <strong>nhập đúng nội dung</strong> chuyển khoản. Sau
                khi chuyển, <strong>không tắt trình duyệt</strong> cho đến khi
                đơn hàng được xác nhận.
              </p>
            </div>

            <div className="text-center animate-pulse text-muted-foreground text-xs">
              Đang đợi xác nhận đơn hàng...
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
