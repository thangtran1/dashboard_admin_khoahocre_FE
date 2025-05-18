import Breadcrumbs from "@/utils/Breadcrumb";

export const ClearCache = () => {
  return (
    <>
      <div className="p-2 mb-4 rounded-lg bg-muted">
        <Breadcrumbs />
      </div>

      <div className="bg-background space-y-6">
        {/* Tiêu đề chính */}
        <h1 className="text-3xl text-primary font-bold">
          Hướng dẫn xóa bộ nhớ đệm trình duyệt
        </h1>

        {/* Giới thiệu */}
        <p className="text-xl">
          Chào mừng bạn đến với{" "}
          <strong className="!text-primary">Khóa Học Rê!</strong>
        </p>
        <p className="text-gray-700">
          Để mang đến trải nghiệm tốt nhất, hãy xóa bộ nhớ đệm trình duyệt theo
          hướng dẫn dưới đây để luôn cập nhật phiên bản mới nhất của trang web.
        </p>

        {/* Lợi ích */}
        <div>
          <h2 className="text-xl font-semibold">Lợi Ích Khi Xóa Bộ Nhớ Đệm</h2>
          <ul className="list-disc list-inside mt-2 space-y-2">
            <li>Truy cập được các tính năng mới nhất.</li>
            <li>Cải thiện tốc độ và hiệu suất duyệt web.</li>
            <li>Giải quyết các lỗi hiển thị trang.</li>
          </ul>
          <p className="text-sm italic mt-2">
            Lưu ý: Việc này không xóa cookie hay lịch sử đăng nhập.
          </p>
        </div>

        {/* Hướng dẫn chi tiết */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold">Hướng Dẫn Cho Từng Trình Duyệt</h2>

          {/* Google Chrome */}
          <div>
            <h3 className="text-lg font-semibold">1. Google Chrome</h3>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Mở trình duyệt Google Chrome.</li>
              <li>Nhấp vào biểu tượng ba chấm ở góc trên bên phải.</li>
              <li>
                Chọn <strong>Xóa dữ liệu duyệt web...</strong> hoặc nhấn{" "}
                <code className="bg-muted px-1 py-0.5 rounded">
                  Ctrl + Shift + Del
                </code>
                .
              </li>
              <li>
                Chuyển sang tab <strong>Nâng cao</strong>, đặt phạm vi thời gian
                là <strong>Từ trước đến nay</strong>.
              </li>
              <li>
                Chọn <strong>Tệp và hình ảnh được lưu trong bộ nhớ đệm</strong>.
              </li>
              <li>
                Nhấp vào nút <strong>Xóa dữ liệu</strong>.
              </li>
            </ol>
          </div>

          {/* Mozilla Firefox */}
          <div>
            <h3 className="text-lg font-semibold">2. Mozilla Firefox</h3>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Mở trình duyệt Mozilla Firefox.</li>
              <li>Nhấp vào biểu tượng ba gạch ngang ở góc trên bên phải.</li>
              <li>
                Chọn <strong>Lịch sử {">"} Xóa lịch sử gần đây…</strong> hoặc
                nhấn{" "}
                <code className="bg-muted px-1 py-0.5 rounded">
                  Ctrl + Shift + Del
                </code>
                .
              </li>
              <li>
                Chọn khoảng thời gian <strong>Mọi lúc</strong>.
              </li>
              <li>
                Chọn <strong>Bộ nhớ đệm</strong>, bỏ chọn các mục khác.
              </li>
              <li>
                Nhấp vào <strong>Xóa ngay</strong>.
              </li>
            </ol>
          </div>

          {/* Microsoft Edge */}
          <div>
            <h3 className="text-lg font-semibold">3. Microsoft Edge</h3>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Mở trình duyệt Microsoft Edge.</li>
              <li>Nhấp vào biểu tượng ba chấm ở góc trên bên phải.</li>
              <li>
                Chọn{" "}
                <strong>
                  Cài đặt {">"} Quyền riêng tư, tìm kiếm và dịch vụ
                </strong>
                .
              </li>
              <li>
                Trong phần <strong>Xóa dữ liệu duyệt web</strong>, nhấp vào{" "}
                <strong>Chọn mục cần xóa</strong>.
              </li>
              <li>
                Chọn khoảng thời gian <strong>Toàn bộ thời gian</strong>.
              </li>
              <li>
                Chọn{" "}
                <strong>Hình ảnh và tệp được lưu trong bộ nhớ cache</strong>.
              </li>
              <li>
                Nhấp vào <strong>Xóa ngay</strong>.
              </li>
            </ol>
          </div>

          {/* Safari MacOS */}
          <div>
            <h3 className="text-lg font-semibold">4. Safari (Trên MacOS)</h3>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Mở trình duyệt Safari.</li>
              <li>
                Nhấp vào menu <strong>Safari</strong> trên thanh menu.
              </li>
              <li>
                Chọn <strong>Tùy chọn {">"} Nâng cao</strong>.
              </li>
              <li>
                Kích hoạt <strong>Hiển thị menu Phát triển</strong>.
              </li>
              <li>
                Chọn <strong>Phát triển {">"} Dọn sạch nhớ đệm</strong>.
              </li>
            </ol>
          </div>

          {/* Trình duyệt di động */}
          <div>
            <h3 className="text-lg font-semibold">5. Trình Duyệt Di Động</h3>

            <h4 className="mt-2 font-bold">Chrome trên Android:</h4>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>Mở ứng dụng Chrome.</li>
              <li>Nhấp vào biểu tượng ba chấm.</li>
              <li>
                Chọn{" "}
                <strong>
                  Cài đặt {">"} Quyền riêng tư và bảo mật {">"} Xóa dữ liệu
                  duyệt web
                </strong>
                .
              </li>
              <li>
                Chọn phạm vi <strong>Từ trước đến nay</strong> và{" "}
                <strong>Tệp và hình ảnh được lưu trong bộ nhớ đệm</strong>.
              </li>
              <li>
                Nhấp vào <strong>Xóa dữ liệu</strong>.
              </li>
            </ol>

            <h4 className="mt-4 font-bold">Safari trên iOS:</h4>
            <ol className="list-decimal list-inside ml-4 space-y-1">
              <li>
                Mở <strong>Cài đặt</strong> trên iPhone.
              </li>
              <li>
                Chọn{" "}
                <strong>
                  Safari {">"} Nâng cao {">"} Dữ liệu trang web
                </strong>
                .
              </li>
              <li>
                Bấm <strong>Sửa</strong>, xóa dữ liệu cho{" "}
                <strong>Khóa Học Rê</strong>.
              </li>
            </ol>
          </div>

          <p className="text-sm mt-4">
            Sau khi xóa bộ nhớ đệm, hãy làm mới (F5) trang web để đảm bảo bạn
            truy cập phiên bản mới nhất. Nếu cần hỗ trợ, liên hệ với chúng tôi
            qua Khóa Học Rê.
          </p>
        </div>
      </div>
    </>
  );
};
