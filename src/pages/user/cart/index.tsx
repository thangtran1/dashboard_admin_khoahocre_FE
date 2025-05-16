import { X } from "lucide-react";
import Breadcrumbs from "@/utils/Breadcrumb";
import { useNavigate } from "react-router";

const cartItems = [
  {
    id: "fx-dream",
    title:
      "Khóa Học FX Dream Trading 2025 – MACRO & TRADING KEYVOLUME MỚI NHẤT",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 999000,
    quantity: 1,
  },
  {
    id: "fb-ads",
    title:
      "Khóa Học Facebook Ads Funnel Update Noti Education | Pre-Order 2025",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 149000,
    quantity: 1,
  },
  {
    id: "yt-k3",
    title:
      "Khóa Học Truyền Nghề YouTube K3 – Bagi Academy (Độc Quyền Mới Nhất)",
    image:
      "https://khoahocre.com/wp-content/uploads/2025/05/Facebook-ads-Noti-360x360.png",
    price: 999000,
    quantity: 1,
  },
];

export default function CartPage() {
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="px-2 text-foreground">
      <div className="p-2 mb-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>

      <h1 className="text-2xl font-bold py-6">Giỏ Hàng Của Bạn</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Danh sách sản phẩm */}
        <div className="lg:col-span-2">
          {/* Tiêu đề cột (chỉ hiện ở desktop) */}
          <div className="hidden md:grid grid-cols-6 text-sm font-semibold text-muted-foreground border-b pb-2 mb-4">
            <span className="col-span-3 text-primary">Sản phẩm</span>
            <span className="text-center text-primary">Đơn giá</span>
            <span className="text-center text-primary">Số lượng</span>
            <span className="text-right text-primary">Tạm tính</span>
          </div>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b pb-4"
              >
                {/* Cột Sản phẩm (giữ nguyên) */}
                <div className="col-span-3 flex items-start gap-3">
                  <button className="text-muted-foreground hover:text-red-500 mt-1">
                    <X size={16} />
                  </button>
                  <img
                    src={item.image}
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="text-sm font-medium">{item.title}</div>
                </div>

                {/* Giá - chỉ hiện ở desktop */}
                <div className=" text-center hidden md:block">
                  {item.price.toLocaleString()} ₫
                </div>

                {/* Số lượng - chỉ hiện ở desktop */}
                <div className=" text-center hidden md:block">
                  {item.quantity}
                </div>

                {/* Tạm tính - chỉ hiện ở desktop */}
                <div className="text-xl text-right font-semibold text-primary hidden md:block">
                  {(item.price * item.quantity).toLocaleString()} ₫
                </div>

                {/* ✅ Phần mobile riêng */}
                <div className="md:hidden text-sm space-y-1 text-muted-foreground pl-[40px]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      Đơn giá:
                    </span>{" "}
                    <div className="text-base text-primary">
                      {item.price.toLocaleString()} ₫
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      Số lượng:
                    </span>{" "}
                    <div className="text-base text-primary">
                      {item.quantity}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      Tạm tính:
                    </span>{" "}
                    <div className="text-xl text-primary">
                      {(item.price * item.quantity).toLocaleString()} ₫
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mã giảm giá + thao tác */}
          <div className="mt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            {/* Mã giảm giá */}
            <div className="flex w-full md:w-2/3 gap-2">
              <input
                type="text"
                placeholder="Nhập mã giảm giá"
                className="w-full border border-border bg-background text-sm rounded-md px-4 py-2 placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              <button className="min-w-[100px] bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-600 transition">
                Áp dụng
              </button>
            </div>

            {/* Nút cập nhật giỏ hàng */}
            <div className="flex items-center gap-2 justify-center">
              <button className="w-full md:w-auto border border-border text-sm text-muted-foreground px-4 py-2 rounded-md hover:bg-muted transition whitespace-nowrap">
                Cập nhật giỏ hàng
              </button>

              <div className="text-base bg-muted p-2 rounded-lg  text-primary hover:underline cursor-pointer whitespace-nowrap">
                Tiếp tục mua sắm
              </div>
            </div>
          </div>
        </div>

        {/* Tổng đơn hàng */}
        <div className="bg-muted/30 border h-fit border-border rounded-lg p-4">
          <h3 className="font-bold mb-3 text-lg">
            🎁 Mã giảm giá của chúng tôi
          </h3>
          <div className="text-sm mb-4">
            <span className="bg-blue-100 text-blue-600 font-bold px-2 py-1 rounded">
              KHR10
            </span>
          </div>
          <div className="border-t border-border pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính:</span>
              <span>{total.toLocaleString()} ₫</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-primary">
              <span>Tổng:</span>
              <span>{total.toLocaleString()} ₫</span>
            </div>
          </div>
          <button
            onClick={() => navigate("/thanh-toan")}
            className="w-full mt-4 bg-primary text-white py-2 rounded hover:bg-primary/90 font-medium text-sm"
          >
            Tiến hành thanh toán
          </button>
        </div>
      </div>
    </div>
  );
}
