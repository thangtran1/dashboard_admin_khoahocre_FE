import { Link } from "react-router";

export default function CheckoutSuccessPage() {
  return (
    <div className="max-w-xl mx-auto border border-border rounded-lg px-4 py-16 text-center text-foreground">
      <div className="text-4xl mb-4">🎉</div>

      <h1 className="text-2xl font-bold text-primary mb-4">
        Đặt Hàng Thành Công!
      </h1>

      <p className="text-muted-foreground text-sm mb-6">
        Cảm ơn bạn đã đặt hàng tại <strong>Khoahocre.com</strong>. Khóa học đã
        được gửi vào hồ sơ cá nhân của bạn hoặc sẽ được kích hoạt trong vòng vài
        phút. Nếu có vấn đề, vui lòng liên hệ Zalo chăm sóc để được hỗ trợ.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
        <Link
          to="/"
          className="border border-primary text-primary px-6 py-2 rounded font-medium text-sm hover:bg-muted"
        >
          Quay lại trang chủ
        </Link>
        <Link
          to="/tai-khoan"
          className="border border-primary text-primary px-6 py-2 rounded font-medium text-sm hover:bg-muted"
        >
          Xem khoá học của tôi
        </Link>
      </div>
    </div>
  );
}
