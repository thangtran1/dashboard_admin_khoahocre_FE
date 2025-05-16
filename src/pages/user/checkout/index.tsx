import Breadcrumbs from "@/utils/Breadcrumb";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

const fakeCartItems = [
  {
    id: "fb-ads",
    title:
      "Khóa Học Facebook Ads Funnel Update Noti Education | Pre-Order 2025",
    price: 149000,
    quantity: 1,
  },
  {
    id: "yt-k3",
    title:
      "Khóa Học Truyền Nghề YouTube K3 – Bagi Academy (Độc Quyền Mới Nhất)",
    price: 999000,
    quantity: 1,
  },
];

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [showTerms, setShowTerms] = useState(false);
  const total = fakeCartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    note: "",
    agree: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.agree) {
      alert("Vui lòng đồng ý với điều khoản.");
      return;
    }
    alert("✅ Đặt hàng thành công!");
    navigate("/thanh-toan/thanh-cong");
  };

  return (
    <>
      <div className="p-2 mb-2 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>
      <h1 className="text-2xl font-bold">Thông Tin Thanh Toán</h1>
      <form
        onSubmit={handleSubmit}
        className=" mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Form thông tin */}
        <div className="lg:col-span-2 space-y-6">
          {/* Tiêu đề nhóm: Thông tin cá nhân */}
          <div>
            <h2 className="text-lg font-semibold mb-3">Thông tin cá nhân</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Tên *</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Tên"
                  required
                  className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Họ *</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Họ"
                  required
                  className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Số điện thoại */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Số điện thoại / Zalo *
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Số điện thoại"
              required
              className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2">Email *</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Địa chỉ gmail"
              required
              className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>

          {/* Ghi chú */}
          <div>
            <h3 className="text-lg font-semibold mb-3">Thông tin bổ sung</h3>
            <label className="block text-sm font-medium mb-2">
              Ghi chú đơn hàng (tuỳ chọn)
            </label>
            <textarea
              name="note"
              value={form.note}
              onChange={handleChange}
              placeholder="Ghi chú về đơn hàng nếu có..."
              rows={15}
              className="w-full border rounded px-4 py-2 text-sm focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Tóm tắt đơn hàng */}
        <div className="bg-muted/30 border border-border rounded-lg p-4 space-y-4">
          <h2 className="text-lg font-bold">Đơn Hàng Của Bạn</h2>
          {/* Tiêu đề cột (chỉ hiện ở desktop) */}
          <div className="hidden md:grid grid-cols-6 text-sm font-semibold text-muted-foreground border-b pb-2 mb-4">
            <span className="col-span-3">Sản phẩm</span>
            <span className="text-center">Đơn giá</span>
            <span className="text-center">Số lượng</span>
            <span className="text-right">Tạm tính</span>
          </div>

          {/* Danh sách sản phẩm */}
          <div className="space-y-4">
            {fakeCartItems.map((item) => (
              <div
                key={item.id}
                className="grid grid-cols-1 md:grid-cols-6 gap-4 items-center border-b pb-4"
              >
                {/* Cột sản phẩm */}
                <div className="col-span-3 flex items-start gap-3">
                  <img
                    src={
                      "https://khoahocre.com/wp-content/plugins/acb-mh/public/images/acb.png"
                    }
                    className="w-14 h-14 object-cover rounded"
                  />
                  <div className="text-sm font-medium">{item.title}</div>
                </div>

                {/* Giá - desktop */}
                <div className="text-sm text-center hidden md:block">
                  {item.price.toLocaleString()} ₫
                </div>

                {/* Số lượng - desktop */}
                <div className="text-sm text-center hidden md:block">
                  {item.quantity}
                </div>

                {/* Tạm tính - desktop */}
                <div className="text-sm text-right font-semibold text-primary hidden md:block">
                  {(item.price * item.quantity).toLocaleString()} ₫
                </div>

                {/* Mobile layout */}
                <div className="md:hidden text-sm space-y-1 text-muted-foreground pl-[40px]">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      Đơn giá:
                    </span>
                    <div className="text-primary">
                      {item.price.toLocaleString()} ₫
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      Số lượng:
                    </span>
                    <div className="text-primary">{item.quantity}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">
                      Tạm tính:
                    </span>
                    <div className="text-primary">
                      {(item.price * item.quantity).toLocaleString()} ₫
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-3 text-sm">
            <div className="flex justify-between">
              <span>Tạm tính</span>
              <span>{total.toLocaleString()} ₫</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-primary">
              <span>Tổng</span>
              <span>{total.toLocaleString()} ₫</span>
            </div>
          </div>

          <div className="bg-muted p-3 text-sm rounded text-gray-700">
            <div className="font-semibold text-primary mb-1">
              Thanh toán ACB{" "}
              <img
                src="https://khoahocre.com/wp-content/plugins/acb-mh/public/images/acb.png"
                className="inline h-4"
              />
            </div>
            Thanh toán online qua ACB của shop, nhận ngay khóa học vào hồ sơ sau
            3 giây!
          </div>

          <p className="text-xs text-muted-foreground leading-relaxed">
            Thông tin cá nhân của bạn sẽ được sử dụng để xử lý đơn hàng, tăng
            trải nghiệm sử dụng website, và cho các mục đích cụ thể khác được mô
            tả trong{" "}
            <a href="/chinh-sach" className="text-primary underline">
              chính sách riêng tư
            </a>{" "}
            của chúng tôi.
          </p>

          <div className="mt-4 space-y-3 text-sm">
            {/* Phần nội dung điều khoản — hiển thị phía trên */}
            {showTerms && (
              <div className="max-h-60 overflow-y-auto border rounded p-3 bg-background shadow-inner">
                <div className="space-y-2 text-base">
                  <div>📜 ĐIỀU KHOẢN SỬ DỤNG WEBSITE – KHOAHOCRE.COM</div>
                  <p>
                    <strong>khoahocre.com</strong> là nền tảng chia sẻ học liệu
                    do cộng đồng đóng góp, giúp người học tiếp cận kiến thức một
                    cách tiết kiệm, nhanh chóng và tiện lợi.
                  </p>
                  <p>
                    1. 📦 Nội dung & phạm vi: chia sẻ Tất cả tài nguyên tại
                    website bao gồm video, tài liệu, học liệu điện tử,… được
                    tổng hợp từ các nguồn công khai hoặc do người dùng đóng góp.
                    Khoahocre.com không tuyên bố sở hữu bản quyền toàn bộ nội
                    dung được chia sẻ. Việc truy cập nội dung chỉ dành cho người
                    dùng đã thanh toán phí hỗ trợ hệ thống để duy trì máy chủ,
                    lưu trữ, và hỗ trợ kỹ thuật, hoàn toàn không mang tính
                    thương mại hóa nội dung.
                  </p>
                  <p>
                    2. 🔒 Bản quyền & khiếu nại: Chúng tôi không chịu trách
                    nhiệm bản quyền đối với nội dung do người dùng đóng góp hoặc
                    sưu tầm từ internet. Nếu bạn là chủ sở hữu hợp pháp và không
                    đồng ý với việc chia sẻ, hãy liên hệ qua email:
                    admin@khoahocre.com. Chúng tôi cam kết xử lý thiện chí và gỡ
                    bỏ nhanh chóng. ⚠️ Việc chia sẻ lại tài nguyên vì mục đích
                    thương mại hoặc vi phạm quyền sở hữu trí tuệ có thể dẫn đến
                    khóa tài khoản vĩnh viễn.
                  </p>
                  <p>
                    3. 👤 Quy định về tài khoản: Mỗi người dùng chỉ nên đăng ký
                    và sử dụng một tài khoản duy nhất. Không chia sẻ tài khoản
                    hoặc sử dụng cho mục đích thương mại. Người dùng chịu trách
                    nhiệm bảo mật và hành vi sử dụng tài khoản của mình.
                  </p>
                  <p>
                    4. 📬 Liên hệ Email: thangtrandz04@gmail.com Zalo CSKH:
                    0888.993.991 Fanpage: vanthang.io.vn
                  </p>
                </div>
              </div>
            )}

            {/* Checkbox — nằm dưới nội dung */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="agree"
                checked={form.agree}
                onChange={handleChange}
              />
              Tôi đã đọc và đồng ý với{" "}
              <span
                onClick={() => setShowTerms((prev) => !prev)}
                className="underline text-primary cursor-pointer"
              >
                điều khoản và điều kiện
              </span>{" "}
              của website
            </label>
          </div>

          <Link
            className="!text-white "
            to={"/thanh-toan/xac-nhan"}
            type="submit"
          >
            <div className="w-full mt-3 text-center bg-primary py-2 rounded hover:bg-primary/90 font-medium">
              Đặt hàng
            </div>
          </Link>
        </div>
      </form>
    </>
  );
}
